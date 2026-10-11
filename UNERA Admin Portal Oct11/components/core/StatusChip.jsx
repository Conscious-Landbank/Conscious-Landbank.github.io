import React from 'react';
const CSS = `
.ua-chip{display:inline-flex;align-items:center;gap:6px;padding:2px 8px 2px 7px;border-radius:var(--radius-pill);font-family:var(--font-body);font-size:var(--fs-xs);font-weight:var(--fw-semibold);line-height:18px;white-space:nowrap;background:var(--tone-neutral-bg);color:var(--tone-neutral-fg)}
.ua-chip::before{content:'';width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0}
.ua-chip--ok{background:var(--tone-ok-bg);color:var(--tone-ok-fg)}
.ua-chip--pending{background:var(--tone-pending-bg);color:var(--tone-pending-fg)}
.ua-chip--info{background:var(--tone-info-bg);color:var(--tone-info-fg)}
.ua-chip--bad{background:var(--tone-bad-bg);color:var(--tone-bad-fg)}
.ua-chip--attention{background:var(--tone-attention-bg);color:var(--tone-attention-fg)}
.ua-chip--pulse::before{animation:ua-pulse 1.6s ease-in-out infinite}
@keyframes ua-pulse{0%,100%{opacity:.5}50%{opacity:1}}
`;
if (typeof document !== 'undefined' && !document.getElementById('ua-chip-css')) { const el = document.createElement('style'); el.id = 'ua-chip-css'; el.textContent = CSS; document.head.appendChild(el); }

const MAP = { completed:'ok', active:'ok', approved:'ok', published:'ok', whitelisted:'ok', enabled:'ok', verified:'ok', operational:'ok', claimed:'ok',
  pending:'pending', 'pending approval':'pending', 'on hold':'pending', awaiting:'pending', requested:'pending', unclaimed:'pending',
  processing:'info', retrying:'info', draft:'info', queued:'info', scheduled:'info',
  failed:'bad', rejected:'bad', stuck:'bad', blacklisted:'bad', restricted:'bad', blocked:'bad', suspended:'bad', disabled:'bad', reversed:'bad',
  archived:'neutral', closed:'neutral', superseded:'neutral', unpublished:'neutral', 'not available':'neutral', expired:'neutral', unwhitelisted:'neutral',
  'action required':'attention', delayed:'attention', 'needs review':'attention' };
/** Resolve a requirement-vocabulary status label to a tone. */
export function toneFor(label) { return MAP[String(label || '').toLowerCase()] || 'neutral'; }
/** Status chip: label + tone tint + dot. The label is always the requirement's own word. */
export function StatusChip({ status, tone, pulse = false, className = '', ...rest }) {
  const t = tone || toneFor(status);
  return <span className={['ua-chip', 'ua-chip--' + t, pulse ? 'ua-chip--pulse' : '', className].filter(Boolean).join(' ')} {...rest}>{status}</span>;
}
