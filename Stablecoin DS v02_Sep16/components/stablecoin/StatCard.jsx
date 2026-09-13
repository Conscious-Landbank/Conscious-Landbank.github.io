import React from 'react';

/**
 * StatCard — a KPI figure tile. Deep-Blue icon well, uppercase label, large
 * tabular value, optional currency suffix and trend badge. Optionally a link.
 */
export function StatCard({ icon, label, value, currency, trend, trendVariant = 'up', href, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const interactive = !!(href || onClick);
  const trendColors = {
    up: { background: 'var(--fin-up-bg)', color: 'var(--fin-up)' },
    reserve: { background: 'var(--reserve-gold-bg)', color: 'var(--reserve-gold-deep)' },
    verify: { background: 'var(--verify-teal-bg)', color: 'var(--verify-teal)' },
  }[trendVariant];

  const base = {
    background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-2xl, 1.25rem)', padding: '1.75rem', boxShadow: 'var(--shadow-card)',
    textDecoration: 'none', color: 'inherit', display: 'block', fontFamily: 'var(--font-body)',
    transition: 'all 0.2s cubic-bezier(0.28,0.11,0.32,1)',
    ...(interactive && hover ? { borderColor: 'var(--brand-deep-blue)', boxShadow: 'var(--shadow-hover)', transform: 'translateY(-4px)' } : {}),
    ...style,
  };
  const inner = (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg, 12px)', flexShrink: 0,
          background: 'color-mix(in srgb, var(--brand-deep-blue) 10%, var(--brand-white))',
          color: 'var(--brand-deep-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        {trend && <span style={{ ...trendColors, fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-pill, 980px)' }}>{trend}</span>}
      </div>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-stat-size, 2.5rem)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>
        {value}{currency && <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}> {currency}</span>}
      </div>
    </>
  );
  const handlers = interactive ? { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), onClick } : {};
  return href ? <a href={href} style={base} {...handlers}>{inner}</a> : <div style={base} {...handlers}>{inner}</div>;
}
