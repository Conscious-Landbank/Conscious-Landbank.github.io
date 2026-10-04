import React from 'react';

/**
 * Card — the surface primitive. 20px radius, 1px tinted border, soft shadow,
 * white-canvas tints. Interactive cards lift + border → Deep Blue on hover.
 */
export function Card({ surface = 'card', interactive = false, href, children, style, ...rest }) {
  const surfaces = {
    card: 'var(--surface-card)',
    impact: 'var(--surface-impact)',
    action: 'var(--surface-action)',
    sky: 'var(--surface-sky)',
    warm: 'var(--surface-warm)',
    reserve: 'var(--surface-reserve)',
    verify: 'var(--surface-verify)',
    'cad-hub': 'var(--surface-cad-hub)',
    deep: 'var(--brand-deep-blue)',
  };
  const [hover, setHover] = React.useState(false);
  const onDeep = surface === 'deep';

  const base = {
    background: surfaces[surface] || surfaces.card,
    color: onDeep ? '#fff' : 'var(--text-primary)',
    border: `1px solid ${onDeep ? 'var(--brand-deep-blue)' : 'var(--border-subtle)'}`,
    borderRadius: 'var(--radius-2xl, 1.25rem)', padding: '1.75rem',
    boxShadow: 'var(--shadow-card)', textDecoration: 'none', display: 'block',
    transition: 'all 0.2s cubic-bezier(0.28,0.11,0.32,1)',
    ...(interactive && hover ? {
      borderColor: 'var(--brand-deep-blue)', boxShadow: 'var(--shadow-hover)', transform: 'translateY(-4px)',
    } : {}),
    ...style,
  };
  const handlers = {
    style: base,
    ...(interactive ? { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } : {}),
    ...rest,
  };
  return href ? <a href={href} {...handlers}>{children}</a> : <div {...handlers}>{children}</div>;
}
