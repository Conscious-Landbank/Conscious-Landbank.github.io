import React from 'react';

/**
 * NotificationBell — the consumer nav's notification control, as a reusable
 * React component. This is the design-system mirror of the runtime controller
 * `unera-pages/notifications-bell.js` (which is the single source of truth the
 * vanilla product pages load). Keep the two in sync: same LEVEL model, 400px
 * panel, 99+ badge cap, level-colored unread left bar, "You're all caught up".
 */

const LEVELS = {
  completed:   { label: 'Completed',   ink: 'var(--fin-up)',          well: 'var(--fin-up-bg)',          path: 'm424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z' },
  progressing: { label: 'In progress', ink: 'var(--brand-deep-blue)', well: 'rgba(23,61,71,0.10)',        path: 'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm112-192 56-56-148-148v-184h-80v216l172 172Z' },
  info:        { label: 'Info',        ink: 'var(--fin-neutral)',     well: 'var(--fin-neutral-bg)',     path: 'M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z' },
  warning:     { label: 'Warning',     ink: 'var(--warning)',         well: 'rgba(184,160,48,0.14)',     path: 'm40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z' },
  error:       { label: 'Error',       ink: 'var(--error)',           well: 'var(--error-bg)',           path: 'M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z' },
};

const SAMPLE_ITEMS = [
  { id: 'e1', level: 'error',       title: 'Swap couldn\u2019t be completed', message: 'We couldn\u2019t finalize your 100 USDC \u2192 USDT swap. No funds left your wallet.', time: '6 min ago',  ctaLabel: 'View details',     read: false },
  { id: 'c1', level: 'completed',   title: 'Buy order completed',             message: 'Your OTC purchase of 500 hUSD is complete and added to your balance.',                 time: '22 min ago', ctaLabel: 'View order',       read: false },
  { id: 'p1', level: 'progressing', title: 'Swap is settling',                message: 'Your USDC \u2192 USDT swap is confirmed. Balances are updating now.',                  time: '25 min ago', ctaLabel: 'View transaction', read: false },
  { id: 'i1', level: 'info',        title: 'New network supported',           message: 'You can now hold and move hUSD on Base.',                                            time: 'yesterday',  ctaLabel: 'Learn more',       read: true  },
];

const BELL_PATH = 'M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0';
const X_PATH = 'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z';

const CSS = `
.unera-notif { position: relative; display: inline-block; }
.unera-notif__bell { width: 36px; height: 36px; border-radius: 50%; border: none; background: transparent; cursor: pointer; position: relative; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
.unera-notif--on-dark .unera-notif__bell:hover { background: rgba(255,255,255,0.1); }
.unera-notif--on-dark .unera-notif__bell-icon { color: rgba(255,255,255,0.85); }
.unera-notif--on-dark .unera-notif__bell:hover .unera-notif__bell-icon { color: var(--brand-yellow); }
.unera-notif__bell:focus-visible { outline: 2px solid var(--brand-yellow); outline-offset: 2px; }
.unera-notif__bell-icon { width: 20px; height: 20px; color: var(--brand-deep-blue); transition: color 0.2s; }
.unera-notif__badge { min-width: 18px; height: 18px; padding: 0 3px; border-radius: 9px; position: absolute; top: 0; right: 0; background: var(--brand-yellow); color: var(--brand-deep-blue); font-size: 0.625rem; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid var(--brand-deep-blue); box-sizing: border-box; }
.unera-notif__panel { position: absolute; top: calc(100% + 0.75rem); right: 0; width: 400px; max-height: 70vh; background: var(--brand-white); border-radius: 0.75rem; box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08); display: none; flex-direction: column; overflow: hidden; z-index: 10002; }
.unera-notif__panel.is-open { display: flex; }
.unera-notif__head { padding: 1.25rem; flex-shrink: 0; background: color-mix(in srgb, var(--brand-cloud-blue) 30%, var(--brand-white)); border-bottom: 1px solid rgba(0,0,0,0.06); }
.unera-notif__head-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.unera-notif__title { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
.unera-notif__unread { font-size: 0.75rem; color: var(--brand-deep-blue); font-weight: 600; }
.unera-notif__actions { display: flex; align-items: center; gap: 0.75rem; }
.unera-notif__link { background: none; border: none; cursor: pointer; font-size: 0.75rem; color: var(--text-secondary); text-decoration: none; font-weight: 500; padding: 0; font-family: var(--font-body); }
.unera-notif__link:hover { text-decoration: underline; }
.unera-notif__link--all { color: var(--brand-deep-blue); font-weight: 600; }
.unera-notif__wrap { padding: 0.5rem; flex: 1; min-height: 0; overflow-y: auto; }
.unera-notif__sect { font-size: 0.688rem; font-weight: 700; color: var(--neutral-600); letter-spacing: 0.05em; padding: 0.75rem 0.75rem 0.5rem; text-transform: uppercase; }
.unera-notif__list { list-style: none; padding: 0; margin: 0; }
.unera-notif__item { display: flex; align-items: flex-start; gap: 0.625rem; padding: 0.75rem; border-radius: 0.5rem; transition: background 0.15s; font-size: 0.875rem; }
.unera-notif__item:hover { background: rgba(23,61,71,0.08); }
.unera-notif__item:hover .unera-notif__dismiss { opacity: 1; }
.unera-notif__item:not(.is-read) { box-shadow: none; }
.unera-notif__icon { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.unera-notif__icon svg { width: 14px; height: 14px; fill: currentColor; }
.unera-notif__body { flex: 1; min-width: 0; }
.unera-notif__item-title { font-size: 0.8125rem; font-weight: 500; color: var(--text-primary); margin: 0; }
.unera-notif__item.is-read .unera-notif__item-title { font-weight: 400; color: var(--neutral-600); }
.unera-notif__msg { font-size: 0.75rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0.125rem 0 0; }
.unera-notif__time { font-size: 0.6875rem; color: var(--text-secondary); display: block; margin-top: 0.125rem; }
.unera-notif__cta { font-size: 0.75rem; font-weight: 600; color: var(--brand-deep-blue); text-decoration: none; margin-top: 0.25rem; display: inline-block; }
.unera-notif__cta:hover { text-decoration: underline; }
.unera-notif__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brand-deep-blue); flex-shrink: 0; margin-top: 6px; }
.unera-notif__dismiss { width: 20px; height: 20px; min-width: 20px; border: none; background: none; cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); opacity: 0; transition: opacity 0.2s; }
.unera-notif__dismiss:hover { color: var(--error); }
.unera-notif__dismiss svg { width: 14px; height: 14px; fill: currentColor; }
.unera-notif__empty { padding: 1.5rem; text-align: center; color: var(--text-secondary); font-size: 0.875rem; }
.unera-notif__divider { height: 1px; background: rgba(0,0,0,0.06); flex-shrink: 0; }
.unera-notif__foot { padding: 0.5rem; flex-shrink: 0; }
.unera-notif__foot-btn { width: 100%; padding: 0.875rem 1.5rem; border-radius: 0.75rem; font-weight: 600; font-size: 0.938rem; display: flex; align-items: center; justify-content: center; border: 2px solid var(--border-subtle); background: var(--brand-white); color: var(--text-primary); cursor: pointer; font-family: var(--font-body); }
.unera-notif__foot-btn:hover { border-color: var(--brand-deep-blue); color: var(--brand-deep-blue); }
`;

if (typeof document !== 'undefined' && !document.getElementById('unera-notif-bell-css')) {
  const el = document.createElement('style');
  el.id = 'unera-notif-bell-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

function NotifItem({ item, onDismiss }) {
  const lvl = LEVELS[item.level] || LEVELS.info;
  return (
    <li
      className={`unera-notif__item ${item.read ? 'is-read' : ''}`.trim()}
      role="listitem"
      style={{ '--nlvl': lvl.ink }}
    >
      <span className="unera-notif__icon" role="img" aria-label={lvl.label} style={{ background: lvl.well, color: lvl.ink }}>
        <svg viewBox="0 -960 960 960" aria-hidden="true"><path d={lvl.path} /></svg>
      </span>
      <div className="unera-notif__body">
        <p className="unera-notif__item-title">{item.title}</p>
        <p className="unera-notif__msg">{item.message}</p>
        <time className="unera-notif__time">{item.time}</time>
        {item.ctaLabel ? <a className="unera-notif__cta" href={item.ctaUrl || '#'}>{item.ctaLabel}</a> : null}
      </div>
      {!item.read ? <span className="unera-notif__dot" aria-hidden="true" /> : null}
      <button type="button" className="unera-notif__dismiss" aria-label={`Dismiss: ${item.title}`} onClick={() => onDismiss && onDismiss(item.id)}>
        <svg viewBox="0 -960 960 960" aria-hidden="true"><path d={X_PATH} /></svg>
      </button>
    </li>
  );
}

/**
 * @param onDark  Render the bell tinted for the deep-blue nav (white icon, yellow hover).
 */
export function NotificationBell({
  unreadCount = 3,
  items = SAMPLE_ITEMS,
  open = false,
  onDark = true,
  onBellClick,
  onMarkAllRead,
  onClearAll,
  onDismiss,
  viewAllHref = '#',
  className = '',
  ...rest
}) {
  const count = typeof unreadCount === 'number' ? unreadCount : (items.filter((n) => !n.read).length);
  const badge = count > 99 ? '99+' : String(count);
  const empty = !items || items.length === 0;
  return (
    <div className={`unera-notif ${onDark ? 'unera-notif--on-dark' : ''} ${className}`.trim()} {...rest}>
      <button
        type="button"
        className="unera-notif__bell"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
        aria-label={count === 0 ? 'Notifications' : `Notifications, ${count} unread`}
        onClick={onBellClick}
      >
        <svg className="unera-notif__bell-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d={BELL_PATH} />
        </svg>
        {count > 0 ? <span className="unera-notif__badge" aria-hidden="true">{badge}</span> : null}
      </button>

      <div className={`unera-notif__panel ${open ? 'is-open' : ''}`.trim()} role="dialog" aria-label="Notifications">
        <div className="unera-notif__head">
          <div className="unera-notif__head-row">
            <span className="unera-notif__title">Notifications</span>
            {count > 0 ? <span className="unera-notif__unread">{count} unread</span> : null}
          </div>
          <div className="unera-notif__actions">
            <a href={viewAllHref} className="unera-notif__link unera-notif__link--all">View all</a>
            <button type="button" className="unera-notif__link" onClick={onMarkAllRead}>Mark all read</button>
          </div>
        </div>

        <div className="unera-notif__wrap">
          {empty ? (
            <p className="unera-notif__empty">You’re all caught up</p>
          ) : (
            <>
              <div className="unera-notif__sect">NEW</div>
              <ul className="unera-notif__list" role="list" aria-live="polite">
                {items.map((it) => <NotifItem key={it.id} item={it} onDismiss={onDismiss} />)}
              </ul>
            </>
          )}
        </div>

        {!empty ? (
          <>
            <div className="unera-notif__divider" />
            <div className="unera-notif__foot">
              <button type="button" className="unera-notif__foot-btn" onClick={onClearAll}>Clear all notifications</button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
