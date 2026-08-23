import React from 'react';

/**
 * Button — UNERA Stablecoin's primary action control.
 * Deep Blue fill by default. The "accent" (Reserve Gold) variant is for
 * Deep-Blue surfaces only. Never a gradient CTA on product UI.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  icon,
  iconRight,
  fullWidth = false,
  onClick,
  children,
  style,
  ...rest
}) {
  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem', minHeight: 40 },
    md: { padding: '0.75rem 1.5rem', fontSize: '0.938rem', minHeight: 46 },
    lg: { padding: '0.875rem 1.75rem', fontSize: '1rem', minHeight: 52 },
  };
  const variants = {
    primary:   { background: 'var(--brand-deep-blue)', color: '#fff', border: 'none' },
    secondary: { background: 'transparent', color: 'var(--text-secondary)', border: '2px solid var(--border-subtle)' },
    accent:    { background: 'var(--reserve-gold)', color: 'var(--brand-deep-blue)', border: 'none' },
    ghost:     { background: 'transparent', color: 'var(--brand-deep-blue)', border: 'none' },
  };
  const [hover, setHover] = React.useState(false);

  const hoverStyle = !disabled && hover ? ({
    primary:   { background: 'var(--neutral-800)', boxShadow: '0 4px 12px rgba(23,61,71,0.30)' },
    secondary: { borderColor: 'var(--brand-deep-blue)', color: 'var(--brand-deep-blue)' },
    accent:    { background: 'var(--reserve-gold-strong)' },
    ghost:     { background: 'rgba(23,61,71,0.06)' },
  }[variant]) : {};

  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    borderRadius: 'var(--radius-md, 8px)', fontWeight: 600, fontFamily: 'var(--font-body)',
    cursor: disabled ? 'not-allowed' : 'pointer', textDecoration: 'none', lineHeight: 1,
    transition: 'all 0.2s cubic-bezier(0.28,0.11,0.32,1)',
    width: fullWidth ? '100%' : undefined, opacity: disabled ? 0.5 : 1,
    ...sizes[size], ...variants[variant], ...hoverStyle, ...style,
  };

  const content = (<>{icon}{children}{iconRight}</>);
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: base, ...rest,
  };

  if (href && !disabled) {
    return <a href={href} onClick={onClick} {...handlers}>{content}</a>;
  }
  return <button type={type} disabled={disabled} onClick={onClick} {...handlers}>{content}</button>;
}
