/**
 * UNERA Stablecoin — shared app nav (bell panel, user menu, mobile menu).
 * Expects page :root tokens (--brand-deep-blue, --text-primary, etc.).
 */
(function () {
    'use strict';

    var DEFAULT_NOTIFICATIONS = [
        { id: 'nkyc_retry', type: 'verification', title: 'Verification needs another try', message: 'Additional information is needed to complete your identity check. Please resume the verification flow to resubmit.', timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(), read: false, ctaUrl: 'kyc-verify.html', ctaLabel: 'Resume verification' },
        { id: 'nkyc_blocked', type: 'system', title: 'Identity verification unavailable', message: 'You\'re not able to complete identity verification on this account while we review it. Please contact support for next steps.', timestamp: new Date(Date.now() - 28 * 60 * 1000).toISOString(), read: false, ctaUrl: 'mailto:support@unera.ca', ctaLabel: 'Contact support' },
        { id: 'n1', type: 'transaction', title: 'Transaction Confirmed', message: 'Sent 12.5 CTC — confirmed on Ethereum', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), read: false },
        { id: 'n2', type: 'listing', title: 'New Listing Available', message: 'Lot 7B at Conscious Landbank is now open', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), read: false },
        { id: 'n3', type: 'system', title: 'Security Notice', message: 'New device login detected for your account', timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), read: false },
        { id: 'n4', type: 'donation', title: 'Donation Received', message: 'Your 50 CTC donation to Nairobi Centre has been processed', timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), read: false, ctaUrl: '../dashboard-enhanced.html', ctaLabel: 'View impact' },
        { id: 'n5', type: 'remittance', title: 'Remittance Sent', message: '25 CTC sent to family wallet — delivered on Polygon', timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), read: false, ctaUrl: '../wallet-enhanced.html', ctaLabel: 'View transaction' },
        { id: 'n6', type: 'verification', title: 'Identity Verified', message: 'Your KYC verification has been approved', timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), read: false },
        { id: 'n7', type: 'transaction', title: 'Stake Rewards', message: 'Earned 2.3 CTC from staking — added to wallet', timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), read: false },
        { id: 'n8', type: 'listing', title: 'Lot Pre-sale Opens', message: 'Lot 12A at Kampala Centre opens for pre-sale tomorrow', timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(), read: false },
        { id: 'n9', type: 'system', title: 'Password Updated', message: 'Your account password was successfully changed', timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), read: false },
        { id: 'n10', type: 'donation', title: 'Monthly Recurring', message: 'Recurring donation of 10 CTC to Lagos Centre processed', timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), read: false }
    ];

    var PANEL_ICON_PATHS = {
        transaction: 'M444-200h70v-50q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-50h-70v50q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26q14 48 43.5 77.5T444-252v52Zm36 120q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
        system: 'M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280Z',
        listing: 'M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z',
        donation: 'm480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z',
        remittance: 'M120-160q-33 0-56.5-23.5T40-240v-440h80v440h680v80H120Zm160-160q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80q0-33-23.5-56.5T280-480v80h80Zm400 0h80v-80q-33 0-56.5 23.5T760-400Zm-200-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM280-640q33 0 56.5-23.5T360-720h-80v80Zm560 0v-80h-80q0 33 23.5 56.5T840-640Z',
        verification: 'm438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z'
    };

    var NAV_ACTIVE_MAP = {
        dashboard: 'dashboard.html',
        purchase: 'get-unera-cad.html',
        redeem: 'redeem-unera-cad.html',
        por: 'proof-of-reserve-public.html'
    };

    var notifications = JSON.parse(localStorage.getItem('clb_notifications') || '[]');
    var existingIds = new Set(notifications.map(function (n) { return n.id; }));
    var toAdd = DEFAULT_NOTIFICATIONS.filter(function (n) { return !existingIds.has(n.id); });
    if (toAdd.length > 0) {
        var PRIORITY_DEFAULT_IDS = ['nkyc_retry', 'nkyc_blocked'];
        var priorityIdSet = new Set(PRIORITY_DEFAULT_IDS);
        var priority = PRIORITY_DEFAULT_IDS.map(function (id) {
            return toAdd.find(function (n) { return n.id === id; });
        }).filter(Boolean).map(function (n) { return JSON.parse(JSON.stringify(n)); });
        var rest = toAdd.filter(function (n) { return !priorityIdSet.has(n.id); }).map(function (n) {
            return JSON.parse(JSON.stringify(n));
        });
        notifications = priority.concat(notifications, rest);
        localStorage.setItem('clb_notifications', JSON.stringify(notifications));
    }

    function syncNkycCopy(id, payload) {
        var i = notifications.findIndex(function (n) { return n.id === id; });
        if (i === -1) return;
        var n = notifications[i];
        var changed = Object.keys(payload).some(function (k) { return n[k] !== payload[k]; });
        if (changed) {
            notifications[i] = Object.assign({}, n, payload);
            localStorage.setItem('clb_notifications', JSON.stringify(notifications));
        }
    }

    syncNkycCopy('nkyc_blocked', {
        type: 'system',
        title: 'Identity verification unavailable',
        message: 'You\'re not able to complete identity verification on this account while we review it. Please contact support for next steps.',
        ctaUrl: 'mailto:support@unera.ca',
        ctaLabel: 'Contact support'
    });

    syncNkycCopy('nkyc_retry', {
        type: 'verification',
        title: 'Verification needs another try',
        message: 'Additional information is needed to complete your identity check. Please resume the verification flow to resubmit.',
        ctaUrl: 'kyc-verify.html',
        ctaLabel: 'Resume verification'
    });

    function formatRelativeTime(isoStr) {
        var d = new Date(isoStr);
        var now = new Date();
        var diffMs = now - d;
        var diffSec = Math.floor(diffMs / 1000);
        var diffMin = Math.floor(diffSec / 60);
        var diffHr = Math.floor(diffMin / 60);
        var diffDay = Math.floor(diffHr / 24);
        if (diffSec < 60) return 'just now';
        if (diffMin < 60) return diffMin + ' min ago';
        if (diffHr < 24) return diffHr + ' hr ago';
        if (diffDay === 1) return 'yesterday';
        if (diffDay < 7) return diffDay + ' days ago';
        return d.toLocaleDateString();
    }

    function saveNotifications() {
        localStorage.setItem('clb_notifications', JSON.stringify(notifications));
    }

    function updateNotificationBadges(count) {
        var badge = document.getElementById('notifBadge');
        var bell = document.getElementById('notificationBell');
        var unreadLabel = document.getElementById('notifUnreadLabel');
        var label = count === 0 ? 'Notifications' : 'Notifications, ' + count + ' unread';
        var badgeText = count > 9 ? '9+' : String(count);
        if (badge) {
            badge.textContent = badgeText;
            badge.setAttribute('data-count', count);
        }
        if (bell) bell.setAttribute('aria-label', label);
        if (unreadLabel) {
            unreadLabel.textContent = count === 0 ? '' : count + ' unread';
            unreadLabel.style.display = count === 0 ? 'none' : '';
        }
    }

    function markNotificationRead(id) {
        var n = notifications.find(function (x) { return x.id === id; });
        if (n) {
            n.read = true;
            saveNotifications();
            updateNotificationBadges(notifications.filter(function (x) { return !x.read; }).length);
        }
    }

    function handleNotificationClick(e, id) {
        if (e.target.closest('a.notification-card-cta') || e.target.closest('a.notif-item-cta')) return;
        var n = notifications.find(function (x) { return x.id === id; });
        if (!n) return;
        markNotificationRead(id);
        if (n.ctaUrl) window.location.href = n.ctaUrl;
        else {
            renderNotificationPanel();
            if (typeof window.renderPageList === 'function') window.renderPageList();
        }
    }

    function markAllNotificationsRead() {
        notifications.forEach(function (n) { n.read = true; });
        saveNotifications();
        updateNotificationBadges(0);
        if (typeof window.renderPageList === 'function') window.renderPageList();
    }

    function clearAllNotifications() {
        notifications = [];
        saveNotifications();
        updateNotificationBadges(0);
        if (typeof window.renderPageList === 'function') window.renderPageList();
    }

    function clearNotification(id) {
        notifications = notifications.filter(function (n) { return n.id !== id; });
        saveNotifications();
        updateNotificationBadges(notifications.filter(function (x) { return !x.read; }).length);
    }

    function renderNotificationPanel() {
        var unreadCount = notifications.filter(function (n) { return !n.read; }).length;
        updateNotificationBadges(unreadCount);
        var itemsHtml = notifications.length === 0
            ? '<li style="padding: 1.5rem; text-align: center; color: var(--text-secondary); font-size: 0.875rem;">No notifications</li>'
            : notifications.map(function (n) {
                var type = n.type || 'system';
                var iconPath = PANEL_ICON_PATHS[type] || PANEL_ICON_PATHS.system;
                var readClass = n.read ? ' read' : '';
                var dot = n.read ? '' : '<span class="notif-unread-dot" aria-hidden="true"></span>';
                var ctaHtml = (n.ctaUrl && n.ctaLabel)
                    ? '<a href="' + n.ctaUrl + '" class="notif-item-cta" onclick="event.stopPropagation(); markNotificationRead(\'' + n.id + '\')">' + n.ctaLabel + '</a>'
                    : '';
                return '<li class="notif-item' + readClass + '" data-id="' + n.id + '">' +
                    '<span class="notif-item-icon notif-type-' + type + '"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="' + iconPath + '"/></svg></span>' +
                    '<div class="notif-item-body" onclick="handleNotificationClick(event, \'' + n.id + '\')">' +
                    '<p class="notif-item-title">' + n.title + '</p>' +
                    '<p class="notif-item-msg">' + n.message + '</p>' +
                    '<time class="notif-item-time" datetime="' + n.timestamp + '">' + formatRelativeTime(n.timestamp) + '</time>' + ctaHtml +
                    '</div>' + dot +
                    '<button type="button" class="notif-item-dismiss" aria-label="Dismiss: ' + n.title + '" onclick="event.stopPropagation(); clearNotification(\'' + n.id + '\'); renderNotificationPanel(); if(typeof renderPageList===\'function\')renderPageList();">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button></li>';
            }).join('');

        var list = document.getElementById('notificationList');
        if (list) list.innerHTML = itemsHtml;

        var clearBtn = document.getElementById('clearAllNotificationsBtn');
        var footer = document.getElementById('notifPanelFooter');
        var divider = document.getElementById('notifPanelDivider');
        var isEmpty = notifications.length === 0;
        if (clearBtn) clearBtn.hidden = isEmpty;
        if (footer) footer.hidden = isEmpty;
        if (divider) divider.hidden = isEmpty;
    }

    function toggleNotificationPanel() {
        var userDropdown = document.getElementById('userDropdown');
        if (userDropdown && userDropdown.classList.contains('show')) userDropdown.classList.remove('show');
        var panel = document.getElementById('notificationPanel');
        var bell = document.getElementById('notificationBell');
        if (!panel || !bell) return;
        var isOpen = panel.classList.contains('show');
        if (isOpen) {
            panel.classList.remove('show');
            bell.setAttribute('aria-expanded', 'false');
        } else {
            panel.classList.add('show');
            bell.setAttribute('aria-expanded', 'true');
            renderNotificationPanel();
        }
    }

    function toggleUserDropdown() {
        closeNotificationPanel();
        var dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.classList.toggle('show');
    }

    function closeNotificationPanel() {
        var panel = document.getElementById('notificationPanel');
        var bell = document.getElementById('notificationBell');
        if (panel) panel.classList.remove('show');
        if (bell) bell.setAttribute('aria-expanded', 'false');
    }

    function logout() {
        localStorage.clear();
        window.location.href = 'index.html';
    }

    function toggleMobileUserDropdown() {
        var el = document.getElementById('mobileUserDropdown');
        if (el) el.classList.toggle('open');
    }

    function applyNavActiveState() {
        var active = document.body.getAttribute('data-nav-active');
        if (!active) return;
        document.querySelectorAll('.nav-links .nav-link[data-nav-key], .mobile-nav-links .nav-link[data-nav-key]').forEach(function (link) {
            if (link.getAttribute('data-nav-key') === active) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    function initMobileMenu() {
        var hamburger = document.getElementById('hamburgerBtn') || document.querySelector('.hamburger');
        var mobileMenu = document.getElementById('mobileMenu') || document.querySelector('.mobile-menu');
        var mobileMenuOverlay = document.getElementById('mobileOverlay') || document.querySelector('.mobile-menu-overlay');
        var mobileMenuClose = document.getElementById('mobileClose') || document.querySelector('.mobile-menu-close');
        var body = document.body;
        if (!hamburger || !mobileMenu || !mobileMenuOverlay) return;

        function openMenu() {
            hamburger.classList.add('active');
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            mobileMenuOverlay.setAttribute('aria-hidden', 'false');
            body.style.overflow = 'hidden';
        }

        function closeMenu() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenuOverlay.setAttribute('aria-hidden', 'true');
            body.style.overflow = '';
        }

        hamburger.addEventListener('click', function () {
            if (mobileMenu.classList.contains('active')) closeMenu();
            else openMenu();
        });
        if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
        mobileMenuOverlay.addEventListener('click', closeMenu);
        document.querySelectorAll('.mobile-nav-links .nav-link').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
    }

    document.addEventListener('click', function (e) {
        var wrapper = document.getElementById('notificationBellWrapper');
        var panel = document.getElementById('notificationPanel');
        var userProfile = document.getElementById('userProfile');
        if (panel && panel.classList.contains('show') && wrapper && !wrapper.contains(e.target) &&
            !(userProfile && userProfile.contains(e.target))) {
            closeNotificationPanel();
        }
        if (userProfile && !userProfile.contains(e.target)) {
            var dropdown = document.getElementById('userDropdown');
            if (dropdown && dropdown.classList.contains('show')) dropdown.classList.remove('show');
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeNotificationPanel();
    });

    var userProfile = document.getElementById('userProfile');
    if (userProfile) {
        userProfile.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleUserDropdown();
            }
        });
    }

    window.notifications = notifications;
    window.formatRelativeTime = formatRelativeTime;
    window.saveNotifications = saveNotifications;
    window.updateNotificationBadges = updateNotificationBadges;
    window.markNotificationRead = markNotificationRead;
    window.handleNotificationClick = handleNotificationClick;
    window.markAllNotificationsRead = markAllNotificationsRead;
    window.clearAllNotifications = clearAllNotifications;
    window.clearNotification = clearNotification;
    window.renderNotificationPanel = renderNotificationPanel;
    window.toggleNotificationPanel = toggleNotificationPanel;
    window.toggleUserDropdown = toggleUserDropdown;
    window.closeNotificationPanel = closeNotificationPanel;
    window.logout = logout;
    window.toggleMobileUserDropdown = toggleMobileUserDropdown;

    applyNavActiveState();
    initMobileMenu();
    renderNotificationPanel();
})();
