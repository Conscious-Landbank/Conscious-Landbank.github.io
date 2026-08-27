import React from 'react';

const CSS = `
.unera-card {
  background: var(--surface-card);
  border: 2px solid var(--border-subtle);
  border-radius: var(--radius-card);
  padding: 2rem;
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
  transition: border-color var(--dur-slow), box-shadow var(--dur-slow), transform var(--dur-slow);
  color: var(--text-primary);
  display: block;
  text-decoration: none;
}
/* Surface tint variants - never flat grey, never rainbow */
.unera-card--impact { background: var(--surface-impact); }
.unera-card--action { background: var(--surface-action); }
.unera-card--warm   { background: var(--surface-warm); }
.unera-card--sky    { background: var(--surface-sky); }
.unera-card--cad    { background: var(--surface-cad-hub); }
.unera-card--inverse { background: var(--brand-deep-blue); color: var(--brand-white); border-color: transparent; }

/* Interactive lift */
.unera-card--interactive { cursor: pointer; }
.unera-card--interactive:hover {
  border-color: var(--brand-deep-blue);
  box-shadow: var(--shadow-hover);
  transform: var(--lift-hover-lg);
}
.unera-card--interactive:focus-visible,
.unera-card--interactive:focus-within { outline: 2px solid var(--brand-deep-blue); outline-offset: 2px; }

/* Top accent rule that wipes in on hover (impact / center pattern) */
.unera-card--accent::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: var(--brand-deep-blue); transform: scaleX(0);
  transition: transform var(--dur-slow); transform-origin: left;
}
.unera-card--accent:hover::before { transform: scaleX(1); }
`;

if (typeof document !== 'undefined' && !document.getElementById('unera-card-css')) {
  const el = document.createElement('style');
  el.id = 'unera-card-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Surface card with Huma geometry (20px radius, tinted border, soft shadow).
 * Pick a `surface` tint to signal card type; `interactive` adds the hover lift.
 */
export function Card({
  surface = 'card',
  interactive = false,
  accent = false,
  href,
  children,
  className = '',
  ...rest
}) {
  const cls = [
    'unera-card',
    `unera-card--${surface}`,
    interactive ? 'unera-card--interactive' : '',
    accent ? 'unera-card--accent' : '',
    className,
  ].filter(Boolean).join(' ');

  if (href) {
    return <a href={href} className={cls} {...rest}>{children}</a>;
  }
  return <div className={cls} {...rest}>{children}</div>;
}
