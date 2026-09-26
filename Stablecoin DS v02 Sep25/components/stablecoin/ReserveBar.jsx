import React from 'react';

const ASSET_COLORS = {
  bank: 'var(--por-bank)', stablecoin: 'var(--por-stable)',
  treasury: 'var(--por-treasury)', cash: 'var(--por-cash)',
};

/**
 * ReserveBar — Proof-of-Reserve composition. A stacked segment bar of reserve
 * asset classes with an optional legend. Asset-class colors are fixed (--por-*).
 */
export function ReserveBar({ items = [], showLegend = true, height = 16, style }) {
  const total = items.reduce((s, i) => s + i.pct, 0) || 100;
  return (
    <div style={{ fontFamily: 'var(--font-body)', ...style }}>
      <div role="img" aria-label={`Reserve composition: ${items.map(i => `${i.pct}% ${i.label}`).join(', ')}`}
        style={{ display: 'flex', height, borderRadius: 'var(--radius-pill, 980px)', overflow: 'hidden', gap: 2 }}>
        {items.map((i, k) => (
          <div key={k} style={{ flex: i.pct, background: ASSET_COLORS[i.asset] || 'var(--por-bank)' }} />
        ))}
      </div>
      {showLegend && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 20px', marginTop: 16 }}>
          {items.map((i, k) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 150 }}>
              <span style={{ width: 14, height: 14, borderRadius: 4, flexShrink: 0, background: ASSET_COLORS[i.asset] || 'var(--por-bank)' }} />
              <span>
                <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{i.label}</span>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                  {Math.round((i.pct / total) * 100)}%{i.value ? ` · ${i.value}` : ''}
                </span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
