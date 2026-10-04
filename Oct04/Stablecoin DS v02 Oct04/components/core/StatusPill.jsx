import React from 'react';

/**
 * StatusPill — transaction / service state. Completed = fin-up,
 * pending = warning, failed = error, processing = light-blue on Deep Blue ink.
 */
export function StatusPill({ status = 'completed', dot = false, children, style, ...rest }) {
  const map = {
    completed:  { background: 'var(--fin-up-bg)', color: 'var(--fin-up)', label: 'Completed' },
    pending:    { background: 'color-mix(in srgb, var(--warning) 18%, var(--brand-white))', color: 'var(--warning)', label: 'Pending' },
    failed:     { background: 'var(--error-bg)', color: 'var(--error)', label: 'Failed' },
    processing: { background: 'color-mix(in srgb, var(--brand-light-blue) 20%, var(--brand-white))', color: 'var(--brand-deep-blue)', label: 'Processing' },
    operational:{ background: 'var(--verify-teal-bg)', color: 'var(--verify-teal)', label: 'Operational' },
  };
  const s = map[status] || map.completed;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
      padding: '0.2rem 0.625rem', borderRadius: 'var(--radius-pill, 980px)',
      fontSize: 'var(--text-xs, 0.75rem)', fontWeight: 600, letterSpacing: '0.03em',
      fontFamily: 'var(--font-body)', background: s.background, color: s.color, ...style,
    }} {...rest}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />}
      {children || s.label}
    </span>
  );
}
