import React from 'react';

const ASSET = { bank: 'var(--por-bank)', stablecoin: 'var(--por-stable)', treasury: 'var(--por-treasury)', cash: 'var(--por-cash)' };

/**
 * CompositionDonut — donut chart of reserve composition by asset type
 * (PRD §6.6 "Reserve Composition Chart"). Fixed --por-* asset colors.
 * Center shows the total. Pair with a legend (or ReserveBar) for labels.
 */
export function CompositionDonut({ items = [], size = 200, thickness = 26, centerLabel, centerValue }) {
  const total = items.reduce((s, i) => s + i.pct, 0) || 100;
  const r = (size - thickness) / 2, c = 2 * Math.PI * r, cx = size / 2;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ fontFamily: 'var(--font-body)' }}>
      <g transform={`rotate(-90 ${cx} ${cx})`}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--neutral-200)" strokeWidth={thickness} />
        {items.map((i, k) => {
          const len = (i.pct / total) * c;
          const seg = (
            <circle key={k} cx={cx} cy={cx} r={r} fill="none"
              stroke={i.color || ASSET[i.asset] || 'var(--por-bank)'} strokeWidth={thickness}
              strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset}
              style={{ transition: 'stroke-dasharray 0.5s cubic-bezier(0.28,0.11,0.32,1)' }} />
          );
          offset += len;
          return seg;
        })}
      </g>
      {(centerValue || centerLabel) && (
        <>
          <text x={cx} y={cx - 2} textAnchor="middle" fontSize={size * 0.13} fontWeight="700"
            fill="var(--text-primary)" style={{ fontFamily: 'var(--font-display)', fontVariantNumeric: 'tabular-nums' }}>{centerValue}</text>
          <text x={cx} y={cx + size * 0.1} textAnchor="middle" fontSize={size * 0.058} fontWeight="700"
            fill="var(--text-secondary)" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>{centerLabel}</text>
        </>
      )}
    </svg>
  );
}
