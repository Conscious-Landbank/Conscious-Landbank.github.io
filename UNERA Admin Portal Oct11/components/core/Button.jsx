import React from 'react';
const CSS = `
.ua-btn{font-family:var(--font-body);font-size:var(--fs-sm);font-weight:var(--fw-semibold);height:var(--control-h);padding:0 12px;border-radius:var(--radius-sm);border:1px solid transparent;display:inline-flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;line-height:1;white-space:nowrap;transition:background var(--dur-fast) var(--ease),border-color var(--dur-fast) var(--ease)}
.ua-btn svg{width:14px;height:14px;flex-shrink:0}
.ua-btn:focus-visible{outline:2px solid var(--focus-on-light);outline-offset:2px}
.ua-btn[disabled]{opacity:.45;cursor:not-allowed}
.ua-btn--primary{background:var(--brand-deep-blue);color:#fff}
.ua-btn--primary:hover:not([disabled]){background:var(--brand-deep-blue-hover)}
.ua-btn--secondary{background:#fff;color:var(--text-primary);border-color:var(--line-strong)}
.ua-btn--secondary:hover:not([disabled]){background:var(--surface-hover);border-color:var(--brand-deep-blue)}
.ua-btn--ghost{background:transparent;color:var(--brand-deep-blue)}
.ua-btn--ghost:hover:not([disabled]){background:var(--surface-hover)}
.ua-btn--danger{background:var(--fin-down);color:#fff}
.ua-btn--danger:hover:not([disabled]){background:#934a60}
.ua-btn--danger-outline{background:#fff;color:var(--fin-down);border-color:var(--fin-down)}
.ua-btn--danger-outline:hover:not([disabled]){background:var(--fin-down-bg)}
.ua-btn--sm{height:var(--control-h-sm);padding:0 10px;font-size:var(--fs-xs)}
.ua-btn--lg{height:var(--control-h-lg);padding:0 16px;font-size:var(--fs-base)}
.ua-btn--loading{position:relative;color:transparent!important}
.ua-btn--loading::after{content:'';position:absolute;width:14px;height:14px;border-radius:50%;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;animation:ua-spin .7s linear infinite}
.ua-btn--secondary.ua-btn--loading::after,.ua-btn--ghost.ua-btn--loading::after{border-color:rgba(23,61,71,.25);border-top-color:var(--brand-deep-blue)}
@keyframes ua-spin{to{transform:rotate(360deg)}}
`;
if (typeof document !== 'undefined' && !document.getElementById('ua-btn-css')) { const el = document.createElement('style'); el.id = 'ua-btn-css'; el.textContent = CSS; document.head.appendChild(el); }

/** Admin action button. Primary = Deep Blue. Danger is reserved for consequential actions (blacklist, reversal, archive). */
export function Button({ variant = 'primary', size = 'md', loading = false, icon, iconRight, children, className = '', ...rest }) {
  const cls = ['ua-btn', 'ua-btn--' + variant, size !== 'md' ? 'ua-btn--' + size : '', loading ? 'ua-btn--loading' : '', className].filter(Boolean).join(' ');
  return <button className={cls} disabled={rest.disabled || loading} {...rest}>{icon}{children}{iconRight}</button>;
}
