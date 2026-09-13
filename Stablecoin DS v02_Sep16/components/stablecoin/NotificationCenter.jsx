import React from 'react';

/**
 * NotificationCenter — the nav bell + unread badge + dropdown panel for important
 * Stablecoin service events (hUSD Issuance & Redemption spec pageId 62259435, §11;
 * Dashboard §4). Event types: mint completed, redeem burn completed, bank payout
 * completed, payment/processing issue, service announcement. Messages must be
 * user-safe — never expose compliance reason codes, sanctions, or risk scores.
 *
 * Controlled: parent owns `open`, `items` and read state.
 *   items: [{ id, kind:'success'|'progress'|'info'|'alert', title, body, time, read }]
 */
const KIND = {
  success:  { ic: 'var(--fin-up)',     bg: 'var(--fin-up-bg, #e7f5ef)' },
  progress: { ic: 'var(--accent-deep)', bg: 'var(--accent-bg)' },
  info:     { ic: 'var(--brand-teal, #2f7682)', bg: 'var(--surface-sky, #eef6fb)' },
  alert:    { ic: 'var(--warning)',     bg: 'var(--warning-bg, #fbf3e2)' },
};
const ICON = {
  success:  'M20 6L9 17l-5-5',
  progress: 'M12 8v4l3 2M12 22a10 10 0 110-20 10 10 0 010 20z',
  info:     'M12 16v-4M12 8h.01M12 22a10 10 0 110-20 10 10 0 010 20z',
  alert:    'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
};

export function NotificationCenter({ open, items = [], onToggle, onClose, onMarkAllRead }) {
  const unread = items.filter((i) => !i.read).length;
  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-body)' }}>
      <button onClick={onToggle} aria-label="Notifications" style={{ position: 'relative', width: 38, height: 38,
        borderRadius: '50%', background: 'var(--brand-white)', border: '1px solid var(--border-subtle)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" /></svg>
        {unread > 0 && <span style={{ position: 'absolute', top: 7, right: 8, minWidth: 15, height: 15, padding: '0 3px',
          borderRadius: 980, background: 'var(--accent)', color: 'var(--accent-deep)', fontSize: '0.58rem',
          fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</span>}
      </button>

      {open && (
        <>
          <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 55 }} />
          <div style={{ position: 'absolute', top: 'calc(100% + 0.6rem)', right: 0, width: 340, zIndex: 60,
            background: 'var(--brand-white)', border: '1px solid var(--border-subtle)', borderRadius: 14,
            boxShadow: 'var(--shadow-popover, 0 24px 50px -12px rgba(16,43,50,0.2))', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.85rem 1rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700 }}>Notifications</span>
              <button onClick={onMarkAllRead} style={{ background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent-deep)' }}>Mark all read</button>
            </div>
            <div style={{ maxHeight: 340, overflow: 'auto' }}>
              {items.map((n) => {
                const k = KIND[n.kind] || KIND.info;
                return (
                  <div key={n.id} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start',
                    padding: '0.8rem 1rem', borderBottom: '1px solid var(--border-subtle)',
                    background: n.read ? 'transparent' : 'var(--accent-bg)' }}>
                    <span style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', background: k.bg, color: k.ic }}>
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2"><path d={ICON[n.kind] || ICON.info} /></svg>
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{n.title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginTop: 1 }}>{n.body}</div>
                      <div style={{ fontSize: '0.66rem', color: 'var(--text-tertiary, #8a9a9a)', marginTop: 3 }}>{n.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
