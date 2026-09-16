import React from 'react';

/**
 * AccountStateBanner — the single, honest banner that communicates a user's
 * access state and operational notices on the Unera Stablecoin Portal (Dashboard spec
 * pageId 66912287, §7 user states + §11 operational notices).
 *
 * It NEVER exposes a compliance reason — only a safe guidance message and a next
 * step. One banner at a time, directly under the nav spine.
 *
 * states:
 *   'public'        — not logged in; viewing public transparency data
 *   'kyc_not_started' — logged in, KYC required before issue/redeem
 *   'kyc_pending'   — verification in review; confirmation disabled
 *   'blocked'       — unsupported jurisdiction / suspended (generic message)
 *   'maintenance'   — service maintenance; affected actions disabled
 *   'data_unavailable' — reserve/supply data delayed (never show "fully backed")
 */
const TONE = {
  info:    { bg: 'var(--surface-sky, #eef6fb)',  bd: 'var(--brand-deep-blue)', ic: 'var(--brand-deep-blue)' },
  accent:  { bg: 'var(--accent-bg)',             bd: 'var(--accent-strong)',   ic: 'var(--accent-deep)' },
  warning: { bg: 'var(--warning-bg, #fbf3e2)',   bd: 'var(--warning)',         ic: 'var(--warning)' },
  blocked: { bg: 'var(--error-bg, #fbeef0)',     bd: 'var(--error)',           ic: 'var(--error)' },
};
const PRESET = {
  public:          { tone: 'info',    title: 'Viewing public transparency data', body: 'Supply, reserves and audit reports are open to everyone. Log in to see your balance and to issue or redeem hUSD.', cta: 'Create account' },
  kyc_not_started: { tone: 'accent',  title: 'Complete KYC to issue or redeem hUSD', body: 'Verify your identity (Level 2) to unlock issuance and redemption. You can still view public reserve data.', cta: 'Verify identity' },
  kyc_pending:     { tone: 'accent',  title: 'Verification in review', body: 'Your identity check is being reviewed — usually within minutes. Issuing and redeeming unlock once you are approved.', cta: 'View status' },
  blocked:         { tone: 'blocked', title: 'hUSD actions are not available for your account', body: 'You can still view public transparency data. Contact support if you believe this is an error.', cta: 'Contact support' },
  maintenance:     { tone: 'warning', title: 'Scheduled maintenance', body: 'Issuance and redemption are paused briefly. Public reserve data remains available.', cta: 'See announcement' },
  data_unavailable:{ tone: 'warning', title: 'Reserve data updating', body: 'Live reserve data is briefly unavailable. We show the last known snapshot timestamp below.', cta: null },
};

export function AccountStateBanner({ state = 'public', onAction, title, body, cta, style }) {
  const p = PRESET[state] || PRESET.public;
  const t = TONE[p.tone];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: t.bg,
      border: `1px solid ${t.bd}`, borderRadius: 'var(--radius-2xl, 14px)', padding: '0.85rem 1.1rem',
      fontFamily: 'var(--font-body)', ...style }}>
      <span aria-hidden style={{ width: 30, height: 30, borderRadius: 9, flexShrink: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center', background: '#fff', color: t.ic }}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title || p.title}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>{body || p.body}</div>
      </div>
      {(cta || p.cta) && (
        <button onClick={onAction} style={{ flexShrink: 0, cursor: 'pointer', fontFamily: 'var(--font-body)',
          fontSize: '0.8rem', fontWeight: 700, padding: '0.55rem 1.05rem', borderRadius: 980,
          border: `1px solid ${t.bd}`, background: '#fff', color: 'var(--text-primary)' }}>{cta || p.cta}</button>
      )}
    </div>
  );
}
