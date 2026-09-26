import React from 'react';

/**
 * MaturityLadder — horizontal bar chart grouping reserve bond/repo holdings by
 * maturity bucket to show the liquidity profile (PRD §6.6 "Reserve Maturity
 * Ladder"). Bars use Deep Blue; the shortest bucket reads as most liquid.
 */
export function MaturityLadder({ buckets = [], style }) {
  const maxPct = Math.max(...buckets.map(b => b.pct), 1);
  return (
    <div style={{ fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: '0.7rem', ...style }}>
      {buckets.map((b, k) => (
        <div key={k} style={{ display: 'grid', gridTemplateColumns: '92px 1fr auto', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{b.label}</span>
          <span style={{ height: 18, borderRadius: 'var(--radius-sm)', background: 'var(--neutral-200)', overflow: 'hidden', display: 'block' }}>
            <span style={{ display: 'block', height: '100%', width: `${(b.pct / maxPct) * 100}%`,
              background: b.color || 'var(--brand-deep-blue)', borderRadius: 'var(--radius-sm)',
              transition: 'width 0.5s cubic-bezier(0.28,0.11,0.32,1)' }} />
          </span>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', minWidth: 38, textAlign: 'right' }}>{b.pct}%</span>
        </div>
      ))}
    </div>
  );
}
