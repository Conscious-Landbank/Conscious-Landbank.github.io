/* ============================================================================
   UNERA — Notification Bell (self-contained controller)
   Single source of truth for pages that don't already implement the bell
   inline (currently wallet-edge.html, wallet-enhanced.html). Implements the
   Notification Services PRD: LEVEL model (completed/progressing/info/warning/
   error), shared feed on clb_notifications_v2, badge cap 99+, browser-tab
   unread count, "You're all caught up" empty state, arrow-key panel nav.
   Injects its own CSS so the host page needs no notification styles.
   Reads the SAME storage key + item shape as the inline implementations on the
   other pages, so notifications stay consistent app-wide.
   ============================================================================ */
(function () {
  if (window.__uneraBellLoaded) return;
  window.__uneraBellLoaded = true;

  /* ── Injected panel CSS (chrome + items + level treatment) ─────────────── */
  var css = `
    /* ── Bell button + badge — self-sufficient chrome so the bell is correct even if
       consumer-app-nav.css fails to load on a standalone serve (CLAUDE.md nav rule). ── */
    .notification-bell-wrapper { position: relative; }
    .notification-bell-btn { width: 36px; height: 36px; border-radius: 50%; border: none; background: transparent; cursor: pointer; position: relative; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
    .notification-bell-btn:hover { background: rgba(255,255,255,0.1); }
    .notification-bell-btn:hover .notif-bell-icon { color: var(--brand-yellow); }
    .notification-bell-btn:focus { outline: none; }
    .notification-bell-btn:focus-visible { outline: 2px solid var(--brand-yellow); outline-offset: 2px; }
    .notification-bell-btn .notif-bell-icon { width: 20px; height: 20px; color: rgba(255,255,255,0.85); transition: color 0.2s; }
    @keyframes notifRing { 0%,100% { transform: rotate(0); } 20% { transform: rotate(15deg); } 40% { transform: rotate(-13deg); } 60% { transform: rotate(10deg); } 80% { transform: rotate(-8deg); } }
    .notification-bell-btn.ring .notif-bell-icon { animation: notifRing 0.5s ease-in-out; }
    .notif-badge { min-width: 18px; height: 18px; padding: 0 3px; border-radius: 9px; position: absolute; top: 0; right: 0; background: var(--brand-yellow); color: var(--brand-deep-blue); font-size: 0.625rem; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid var(--brand-deep-blue); box-sizing: border-box; }
    .notif-badge[data-count="0"] { display: none; }
    /* ── Panel shell — PRD §7.5.2.2: 400px desktop / 70vh; full-width drawer < 768px.
       Compound selector + injected-last guarantees it beats any stale inline 360px. ── */
    .user-dropdown-nav.notification-panel { width: 400px; max-height: 70vh; display: flex; flex-direction: column; overflow: hidden; }
    @media (max-width: 768px) { .user-dropdown-nav.notification-panel { width: 100%; max-height: 72vh; } }
    .notification-panel .dropdown-divider-nav { flex-shrink: 0; }
    .notif-panel-header { padding: 1.25rem; flex-shrink: 0; }
    .notif-panel-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .notif-panel-title { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
    .notif-unread-label { font-size: 0.75rem; color: var(--brand-deep-blue); font-weight: 600; }
    .notif-panel-actions { display: flex; align-items: center; gap: 0.5rem; }
    .notif-action-link { background: none; border: none; cursor: pointer; font-size: 0.75rem; color: var(--text-secondary); text-decoration: none; font-weight: 500; padding: 0; }
    .notif-action-link:hover { text-decoration: underline; }
    .notif-action-link.view-all-link { color: var(--brand-deep-blue); font-weight: 600; }
    .notif-close-btn { width: 24px; height: 24px; border-radius: 50%; background: none; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; color: var(--neutral-600); transition: background 0.2s; }
    .notif-close-btn:hover { background: rgba(0, 0, 0, 0.06); }
    .notif-list-wrapper { padding: 0.5rem; flex: 1; min-height: 0; overflow-y: auto; }
    .notif-list { list-style: none; padding: 0; margin: 0; }
    .notif-item { display: flex; align-items: flex-start; gap: 0.625rem; padding: 0.75rem; border-radius: 0.5rem; transition: all 0.15s; cursor: default; font-size: 0.875rem; }
    .notif-item:hover { background: rgba(23, 61, 71, 0.08); }
    .notif-item:hover .notif-item-dismiss { opacity: 1; }
    .notif-item-icon { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .notif-item-icon svg { width: 14px; height: 14px; }
    /* LEVEL wells (PRD §3 / AC-06) */
    .notif-type-completed   { background: var(--fin-up-bg);      color: var(--fin-up); }
    .notif-type-progressing { background: rgba(23,61,71,0.10);   color: var(--brand-deep-blue); }
    .notif-type-info        { background: var(--fin-neutral-bg); color: var(--text-secondary); }
    .notif-type-warning     { background: rgba(184,160,48,0.14); color: var(--warning); }
    .notif-type-error       { background: var(--error-bg);       color: var(--error); }
    /* unread = subtle left indicator bar, level-colored (PRD §7.1) */
    .notif-item.notif-lvl-completed   { --nlvl: var(--fin-up); }
    .notif-item.notif-lvl-progressing { --nlvl: var(--brand-deep-blue); }
    .notif-item.notif-lvl-info        { --nlvl: var(--fin-neutral); }
    .notif-item.notif-lvl-warning     { --nlvl: var(--warning); }
    .notif-item.notif-lvl-error       { --nlvl: var(--error); }
    .notif-item:not(.read) { box-shadow: none; }
    .notif-item-body { flex: 1; min-width: 0; cursor: pointer; }
    .notif-item-cta { font-size: 0.75rem; font-weight: 600; color: var(--brand-deep-blue); text-decoration: none; margin-top: 0.25rem; display: inline-block; }
    .notif-item-cta:hover { text-decoration: underline; }
    .notif-item-cta:focus { outline: 2px solid var(--brand-deep-blue); outline-offset: 2px; }
    .notif-item-title { font-size: 0.8125rem; font-weight: 500; color: var(--text-primary); margin: 0; }
    .notif-item.read .notif-item-title { font-weight: 400; color: var(--neutral-600); }
    .notif-item-msg { font-size: 0.75rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0.125rem 0 0; }
    .notif-item-time { font-size: 0.6875rem; color: var(--text-secondary); display: block; margin-top: 0.125rem; }
    .notif-unread-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brand-deep-blue); flex-shrink: 0; margin-top: 6px; }
    .notif-item.read .notif-unread-dot { display: none; }
    .notif-item-dismiss { opacity: 0; width: 20px; height: 20px; min-width: 20px; border: none; background: none; cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); transition: opacity 0.2s; }
    .notif-item-dismiss:hover { color: var(--error); }
    .notif-empty { padding: 1.5rem; text-align: center; color: var(--text-secondary); font-size: 0.875rem; }
    .notif-panel-footer { padding: 0.5rem; flex-shrink: 0; }
    .notif-panel-footer .notif-footer-btn { width: 100%; padding: 0.875rem 1.5rem; border-radius: 0.75rem; font-weight: 600; font-size: 0.938rem; display: flex; align-items: center; justify-content: center; }
    .notif-panel-footer .notif-footer-btn[hidden], .notif-panel-footer[hidden], .notif-panel-divider[hidden] { display: none !important; }
  `;
  var st = document.createElement('style');
  st.id = 'unera-bell-css';
  st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  /* ── Level model (PRD §3) ──────────────────────────────────────────────── */
  var LEVEL_ICON_PATHS = {
    completed:   'm424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z',
    progressing: 'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm112-192 56-56-148-148v-184h-80v216l172 172Z',
    info:        'M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z',
    warning:     'm40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z',
    error:       'M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z'
  };
  var LEVEL_META = { completed: { label: 'Completed' }, progressing: { label: 'In progress' }, info: { label: 'Info' }, warning: { label: 'Warning' }, error: { label: 'Error' } };
  function levelOf(n) { return (n && LEVEL_ICON_PATHS[n.level]) ? n.level : 'info'; }
  function iconPathOf(l) { return LEVEL_ICON_PATHS[l] || LEVEL_ICON_PATHS.info; }
  function levelLabelOf(l) { return (LEVEL_META[l] || LEVEL_META.info).label; }

  /* ── Shared feed (clb_notifications_v2) ────────────────────────────────── */
  var NOTIF_KEY = 'clb_notifications_v2';
  var DEFAULT = [
    { id: 'up_err_swap',  level: 'error',       category: 'issue',        title: 'Swap couldn\u2019t be completed', message: 'We couldn\u2019t finalize your 100 USDC \u2192 USDT swap. No funds left your wallet \u2014 please try again.', ref: 'Ref SWP-9F2C', timestamp: new Date(Date.now() - 6 * 60 * 1000).toISOString(), read: false, ctaUrl: 'exchange.html', ctaLabel: 'Try again' },
    { id: 'up_buy_done',  level: 'completed',   category: 'transaction',  title: 'Buy order completed', message: 'Your OTC purchase of 500 hUSD is complete and added to your balance.', ref: 'Order OTC-48210', timestamp: new Date(Date.now() - 22 * 60 * 1000).toISOString(), read: false, ctaUrl: 'wallet-enhanced.html', ctaLabel: 'View order' },
    { id: 'up_swap_prog', level: 'progressing', category: 'transaction',  title: 'Swap is settling', message: 'Your USDC \u2192 USDT swap is confirmed. Balances are updating now.', ref: 'Tx 0x7a3f\u20262b9c', timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(), read: false, ctaUrl: 'wallet-enhanced.html', ctaLabel: 'View transaction' },
    { id: 'up_buy_slow',  level: 'warning',     category: 'issue',        title: 'Buy order is taking longer than usual', message: 'Your OTC purchase is still processing. We\u2019ll let you know as soon as it settles.', ref: 'Order OTC-48233', timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(), read: false, ctaUrl: 'wallet-enhanced.html', ctaLabel: 'View order' },
    { id: 'up_trade_fill', level: 'completed',  category: 'transaction',  title: 'Order filled', message: 'Your limit order to buy 1,200 USDC filled at 1.0001.', ref: 'Order TRD-10573', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), read: false, ctaUrl: 'trade.html', ctaLabel: 'View order' },
    { id: 'up_ann_base',  level: 'info',        category: 'announcement', title: 'New network supported', message: 'You can now hold and move hUSD on Base.', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), read: false, ctaUrl: 'dashboard-enhanced.html', ctaLabel: 'Learn more' },
    { id: 'up_swap_done', level: 'completed',   category: 'transaction',  title: 'Swap completed', message: 'Swapped 250 USDC \u2192 249.8 USDT. Balances updated.', ref: 'Tx 0x4c81\u20269af0', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), read: true, ctaUrl: 'wallet-enhanced.html', ctaLabel: 'View transaction' },
    { id: 'up_ann_maint', level: 'info',        category: 'announcement', title: 'Scheduled maintenance', message: 'hUSD services will pause for about 30 minutes on Sunday 22:00 UTC for an upgrade.', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), read: true, ctaUrl: 'dashboard-enhanced.html', ctaLabel: 'Learn more' }
  ];
  var notifications = JSON.parse(localStorage.getItem(NOTIF_KEY) || 'null');
  if (!Array.isArray(notifications) || notifications.length === 0) {
    notifications = DEFAULT.map(function (n) { return JSON.parse(JSON.stringify(n)); });
    localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications));
  }
  function save() { localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications)); }

  /* ── Helpers ───────────────────────────────────────────────────────────── */
  function formatRelativeTime(iso) {
    var d = new Date(iso), now = new Date(), s = Math.floor((now - d) / 1000);
    var m = Math.floor(s / 60), h = Math.floor(m / 60), day = Math.floor(h / 24);
    if (s < 60) return 'just now';
    if (m < 60) return m + ' min ago';
    if (h < 24) return h + ' hr ago';
    if (day === 1) return 'yesterday';
    if (day < 7) return day + ' days ago';
    return d.toLocaleDateString();
  }
  function updateTabTitle(c) {
    if (!window.__notifBaseTitle) window.__notifBaseTitle = document.title.replace(/^\(\d+\+?\)\s*/, '');
    document.title = c > 0 ? '(' + (c > 99 ? '99+' : c) + ') ' + window.__notifBaseTitle : window.__notifBaseTitle;
  }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function updateNotificationBadges(count) {
    var badge = document.getElementById('notifBadge');
    var badgeMobile = document.getElementById('notifBadgeMobile');
    var bell = document.getElementById('notificationBell');
    var unreadLabel = document.getElementById('notifUnreadLabel');
    var label = count === 0 ? 'Notifications' : 'Notifications, ' + count + ' unread';
    var badgeText = count > 99 ? '99+' : String(count);   /* PRD §7.5.2.3 — cap at 99+ */
    if (badge) { badge.textContent = badgeText; badge.setAttribute('data-count', count); }
    if (badgeMobile) { badgeMobile.textContent = badgeText; badgeMobile.setAttribute('data-count', count); }
    if (bell) bell.setAttribute('aria-label', label);
    if (unreadLabel) { unreadLabel.textContent = count === 0 ? '' : count + ' unread'; unreadLabel.style.display = count === 0 ? 'none' : ''; }
    updateTabTitle(count);                                /* PRD §7.5.2.4 — browser tab count */
  }

  function handleNotificationItemClick(e, id) {
    if (e.target.closest('a.notif-item-cta') || e.target.closest('button.notif-item-dismiss')) return;
    var n = notifications.find(function (x) { return x.id === id; });
    if (!n) return;
    markNotificationRead(id);
    if (n.ctaUrl) window.location.href = n.ctaUrl;
  }

  function renderNotificationItem(n) {
    var level = levelOf(n);
    var readClass = n.read ? ' read' : '';
    var dot = n.read ? '' : '<span class="notif-unread-dot" aria-hidden="true"></span>';
    var cta = (n.ctaUrl && n.ctaLabel) ? '<a href="' + esc(n.ctaUrl) + '" class="notif-item-cta" onclick="event.stopPropagation(); markNotificationRead(\'' + n.id + '\')">' + esc(n.ctaLabel) + '</a>' : '';
    return '<li class="notif-item' + readClass + ' notif-lvl-' + level + '" role="listitem" data-id="' + n.id + '">' +
      '<span class="notif-item-icon notif-type-' + level + '" role="img" aria-label="' + levelLabelOf(level) + '"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 -960 960 960" fill="currentColor"><path d="' + iconPathOf(level) + '"/></svg></span>' +
      '<div class="notif-item-body" role="button" tabindex="0" onclick="handleNotificationItemClick(event,\'' + n.id + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();handleNotificationItemClick(event,\'' + n.id + '\');}">' +
        '<p class="notif-item-title">' + esc(n.title) + '</p>' +
        '<p class="notif-item-msg">' + esc(n.message) + '</p>' +
        '<time class="notif-item-time" datetime="' + esc(n.timestamp) + '">' + formatRelativeTime(n.timestamp) + '</time>' +
        cta +
      '</div>' + dot +
      '<button type="button" class="notif-item-dismiss" aria-label="Dismiss: ' + esc(n.title) + '" onclick="event.stopPropagation(); clearNotification(\'' + n.id + '\')">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>' +
      '</button></li>';
  }

  function renderNotificationPanel(variant) {
    var unread = notifications.filter(function (n) { return !n.read; }).length;
    updateNotificationBadges(unread);
    var ordered = notifications.slice().sort(function (a, b) { return new Date(b.timestamp) - new Date(a.timestamp); });
    var itemsHtml = notifications.length === 0
      ? '<li class="notif-empty">You\u2019re all caught up</li>'
      : ordered.map(renderNotificationItem).join('');

    if (variant === 'mobile') {
      var bellSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960" fill="currentColor"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z"/></svg>';
      var badgeDisplay = unread > 0 ? '<span class="notif-badge notif-badge-mobile" id="notifBadgeMobile" data-count="' + unread + '" aria-hidden="true">' + (unread > 99 ? '99+' : unread) + '</span>' : '';
      return '<div class="mobile-notif-profile mobile-user-profile">' +
        '<div class="mobile-user-profile-header" onclick="toggleMobileNotificationPanel()">' +
          '<div class="notif-mobile-header-left">' +
            '<span style="width:40px;height:40px;border-radius:50%;background:var(--brand-deep-blue);display:flex;align-items:center;justify-content:center;color:white;">' + bellSvg + '</span>' +
            '<span style="font-weight:600;font-size:0.938rem;color:var(--neutral-900);">Notifications</span>' + badgeDisplay +
          '</div>' +
          '<svg class="mobile-user-chevron" id="mobileNotifChevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>' +
        '</div>' +
        '<div class="mobile-user-dropdown" id="mobileNotificationDropdown"><div class="mobile-user-dropdown-content">' +
          (notifications.length > 0 ? '<a href="notifications.html" class="dropdown-item-nav view-all-link" style="display:flex;align-items:center;gap:0.75rem;width:100%;margin-bottom:0.5rem;">View all</a>' : '') +
          '<ul class="notif-list" id="mobileNotificationList" role="list" aria-live="polite">' + itemsHtml + '</ul>' +
          (notifications.length > 0 ? '<div class="dropdown-divider-nav"></div><button type="button" class="btn btn-secondary" onclick="clearAllNotifications()" style="width:100%;margin-bottom:0.5rem;">Clear all</button><button type="button" class="dropdown-item-nav" onclick="markAllNotificationsRead()" style="display:flex;align-items:center;gap:0.75rem;width:100%;">Mark all as read</button>' : '') +
        '</div></div></div>';
    }

    var list = document.getElementById('notificationList');
    if (list) list.innerHTML = itemsHtml;
    var isEmpty = notifications.length === 0;
    var clearBtn = document.getElementById('clearAllNotificationsBtn');
    var footer = document.getElementById('notifPanelFooter');
    var divider = document.getElementById('notifPanelDivider');
    if (clearBtn) clearBtn.hidden = isEmpty;
    if (footer) footer.hidden = isEmpty;
    if (divider) divider.hidden = isEmpty;
    return '';
  }

  function renderMobile() {
    var ms = document.getElementById('mobileNotificationsSection');
    if (ms) ms.innerHTML = renderNotificationPanel('mobile');
  }

  function toggleNotificationPanel() {
    var userDropdown = document.getElementById('userDropdown');
    if (userDropdown && userDropdown.classList.contains('show')) userDropdown.classList.remove('show');
    var panel = document.getElementById('notificationPanel');
    var bell = document.getElementById('notificationBell');
    if (!panel || !bell) return;
    if (panel.classList.contains('show')) {
      panel.classList.remove('show');
      bell.setAttribute('aria-expanded', 'false');
      bell.focus();
    } else {
      panel.classList.add('show');
      bell.setAttribute('aria-expanded', 'true');
      var closeBtn = panel.querySelector('.notif-close-btn');
      if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 50);
    }
  }
  function closeNotificationPanel() {
    var panel = document.getElementById('notificationPanel');
    var bell = document.getElementById('notificationBell');
    if (panel) panel.classList.remove('show');
    if (bell) { bell.setAttribute('aria-expanded', 'false'); bell.focus(); }
  }
  function toggleMobileNotificationPanel() {
    var dd = document.getElementById('mobileNotificationDropdown');
    var ch = document.getElementById('mobileNotifChevron');
    if (dd) dd.classList.toggle('open');
    if (ch) ch.classList.toggle('open');
  }
  function markNotificationRead(id) {
    var n = notifications.find(function (x) { return x.id === id; });
    if (n) { n.read = true; renderNotificationPanel('desktop'); renderMobile(); save(); }
  }
  function markAllNotificationsRead() {
    notifications.forEach(function (n) { n.read = true; });
    renderNotificationPanel('desktop'); renderMobile(); save();
  }
  function clearNotification(id) {
    notifications = notifications.filter(function (n) { return n.id !== id; });
    renderNotificationPanel('desktop'); renderMobile(); save();
  }
  function clearAllNotifications() {
    notifications = [];
    renderNotificationPanel('desktop'); renderMobile(); save();
  }
  function addNotification(data) {
    notifications.unshift({ id: 'n' + Date.now(), level: (LEVEL_ICON_PATHS[data.level] ? data.level : 'info'), category: data.category || 'transaction', title: data.title || 'Notification', message: data.message || '', ref: data.ref || '', timestamp: new Date().toISOString(), read: false, ctaUrl: data.ctaUrl, ctaLabel: data.ctaLabel });
    renderNotificationPanel('desktop'); renderMobile(); save();
    var bell = document.getElementById('notificationBell');
    if (bell) { bell.classList.add('ring'); setTimeout(function () { bell.classList.remove('ring'); }, 500); }
  }

  /* ── Arrow-key panel nav (PRD §7.5.2.6) ────────────────────────────────── */
  function wireKeyNav() {
    var np = document.getElementById('notificationPanel');
    if (!np || np._keyNavWired) return;
    np._keyNavWired = true;
    np.addEventListener('keydown', function (e) {
      if (['ArrowDown', 'ArrowUp', 'Home', 'End'].indexOf(e.key) === -1) return;
      var items = Array.prototype.slice.call(np.querySelectorAll('.notif-item-body'));
      if (!items.length) return;
      e.preventDefault();
      var idx = items.indexOf(document.activeElement), next;
      if (e.key === 'ArrowDown') next = items[idx < 0 ? 0 : Math.min(items.length - 1, idx + 1)];
      else if (e.key === 'ArrowUp') next = items[idx < 0 ? 0 : Math.max(0, idx - 1)];
      else if (e.key === 'Home') next = items[0];
      else next = items[items.length - 1];
      if (next) next.focus();
    });
  }

  /* ── Dismiss: click-outside + Escape (bound once; makes the module fully self-contained) ── */
  function wireDismiss() {
    if (window.__uneraBellDismissWired) return;
    window.__uneraBellDismissWired = true;
    document.addEventListener('click', function (e) {
      var panel = document.getElementById('notificationPanel');
      var wrap = document.getElementById('notificationBellWrapper');
      if (panel && panel.classList.contains('show') && wrap && !wrap.contains(e.target)) {
        panel.classList.remove('show');
        var bell = document.getElementById('notificationBell');
        if (bell) bell.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var panel = document.getElementById('notificationPanel');
      if (panel && panel.classList.contains('show')) closeNotificationPanel();
    });
  }

  /* ── Expose globals used by inline onclick handlers ────────────────────── */
  window.updateNotificationBadges = updateNotificationBadges;
  window.renderNotificationItem = renderNotificationItem;
  window.renderNotificationPanel = renderNotificationPanel;
  window.toggleNotificationPanel = toggleNotificationPanel;
  window.closeNotificationPanel = closeNotificationPanel;
  window.toggleMobileNotificationPanel = toggleMobileNotificationPanel;
  window.markNotificationRead = markNotificationRead;
  window.markAllNotificationsRead = markAllNotificationsRead;
  window.clearNotification = clearNotification;
  window.clearAllNotifications = clearAllNotifications;
  window.addNotification = addNotification;
  window.handleNotificationItemClick = handleNotificationItemClick;
  window.formatRelativeTime = formatRelativeTime;

  function init() { renderNotificationPanel('desktop'); renderMobile(); wireKeyNav(); wireDismiss(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
