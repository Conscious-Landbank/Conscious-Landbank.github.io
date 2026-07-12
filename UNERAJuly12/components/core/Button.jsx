import React from 'react';

/* Inject component CSS once (tokens come from the global stylesheet). */
const CSS = `
.unera-btn {
  font-family: var(--font-body);
  font-weight: var(--fw-semibold);
  font-size: var(--fs-label);
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  min-height: var(--control-h);
  padding: 0 1.5rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  line-height: 1;
  transition: all var(--dur-base);
}
.unera-btn:focus-visible { outline: 3px solid rgba(23,61,71,0.3); outline-offset: 2px; }
.unera-btn[disabled] { opacity: 0.5; cursor: not-allowed; }
.unera-btn svg { width: 18px; height: 18px; flex-shrink: 0; }

/* Primary — Deep Blue fill (solid; never gradient on product UI) */
.unera-btn--primary { background: var(--brand-deep-blue); color: var(--brand-white); }
.unera-btn--primary:hover:not([disabled]) { background: var(--neutral-800); box-shadow: 0 4px 12px rgba(23,61,71,0.3); }

/* Secondary — transparent, subtle border, hover to Deep Blue ink */
.unera-btn--secondary { background: transparent; color: var(--text-secondary); border-color: var(--border-subtle); }
.unera-btn--secondary:hover:not([disabled]) { border-color: var(--brand-deep-blue); color: var(--brand-deep-blue); background: rgba(23,61,71,0.02); }

/* Accent — Deep Blue fill + Yellow text (warm banners only) */
.unera-btn--accent { background: var(--brand-deep-blue); color: var(--brand-yellow); }
.unera-btn--accent:hover:not([disabled]) { background: var(--neutral-800); }

/* Sizes */
.unera-btn--sm { min-height: var(--control-h-sm); padding: 0 0.875rem; font-size: var(--fs-xs); }
.unera-btn--block { width: 100%; }
`;

if (typeof document !== 'undefined' && !document.getElementById('unera-btn-css')) {
  const el = document.createElement('style');
  el.id = 'unera-btn-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * UNERA primary action button. Deep Blue fill is the product default; never
 * a gradient CTA on product UI. Renders as <a> when `href` is supplied.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  href,
  icon,
  iconRight,
  children,
  className = '',
  ...rest
}) {
  const cls = [
    'unera-btn',
    `unera-btn--${variant}`,
    size === 'sm' ? 'unera-btn--sm' : '',
    block ? 'unera-btn--block' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon}
      {children}
      {iconRight}
    </>
  );

  if (href) {
    return <a href={href} className={cls} {...rest}>{content}</a>;
  }
  return <button className={cls} {...rest}>{content}</button>;
}
