import React from 'react';

/**
 * Badge — pill for financial direction, proof, and reserve status.
 * Money direction uses fin colors; proof uses verify-teal; "fully backed"
 * uses reserve-gold. Never a brand-decoration color for money.
 */
export function Badge({ variant = 'neutral', icon, children, style, ...rest }) {
  const variants = {
    up:      { background: 'var(--fin-up-bg)', color: 'var(--fin-up)' },
    down:    { background: 'var(--fin-down-bg)', color: 'var(--fin-down)' },
    neutral: { background: 'var(--fin-neutral-bg)', color: 'var(--fin-neutral)' },
    verify:  { background: 'var(--verify-teal-bg)', color: 'var(--verify-teal)' },
    reserve: { background: 'var(--reserve-gold-bg)', color: 'var(--reserve-gold-deep)' },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
      padding: '0.2rem 0.625rem', borderRadius: 'var(--radius-pill, 980px)',
      fontSize: 'var(--text-xs, 0.75rem)', fontWeight: 700, letterSpacing: '0.03em',
      lineHeight: 1.5, fontFamily: 'var(--font-body)',
      ...variants[variant], ...style,
    }} {...rest}>
      {icon}{children}
    </span>
  );
}
