import React from 'react';

const CSS = `
.unera-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
  line-height: 1;
  white-space: nowrap;
}
.unera-badge svg { width: 14px; height: 14px; flex-shrink: 0; fill: currentColor; }

/* Financial direction - always pair with a directional icon */
.unera-badge--up      { background: var(--fin-up-bg);      color: var(--fin-up); }
.unera-badge--down    { background: var(--fin-down-bg);    color: var(--fin-down); }
.unera-badge--neutral { background: var(--fin-neutral-bg); color: var(--fin-neutral); }

/* Status */
.unera-badge--success { background: var(--fin-up-bg);  color: var(--fin-up); }
.unera-badge--warning { background: var(--warning-bg); color: var(--warning); }
.unera-badge--error   { background: var(--error-bg);   color: var(--error); }
.unera-badge--info    { background: color-mix(in srgb, var(--brand-deep-blue) 10%, var(--brand-white)); color: var(--brand-deep-blue); }

.unera-badge--solid   { background: var(--brand-deep-blue); color: var(--brand-white); }
`;

if (typeof document !== 'undefined' && !document.getElementById('unera-badge-css')) {
  const el = document.createElement('style');
  el.id = 'unera-badge-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

const ARROW_UP = <svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/></svg>;
const ARROW_DOWN = <svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg>;

/**
 * Pill badge for financial direction (up/down/neutral) and status. For
 * up/down it auto-prepends a directional arrow unless `icon` is given.
 */
export function Badge({ variant = 'info', icon, children, className = '', ...rest }) {
  let leading = icon;
  if (leading === undefined) {
    if (variant === 'up') leading = ARROW_UP;
    else if (variant === 'down') leading = ARROW_DOWN;
  }
  return (
    <span className={`unera-badge unera-badge--${variant} ${className}`.trim()} {...rest}>
      {leading}
      {children}
    </span>
  );
}
