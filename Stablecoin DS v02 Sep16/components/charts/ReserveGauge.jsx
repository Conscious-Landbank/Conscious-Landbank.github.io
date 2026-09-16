import React from 'react';

/**
 * ReserveGauge — semicircular gauge for the hUSD reserve ratio against the
 * 100% floor. Color-coded: fin-up at/above floor, warning just above, error
 * below. Proof-of-Reserve hero metric (PRD §6.6 "Reserve Ratio Gauge").
 */
export function ReserveGauge({ value = 105, floor = 100, max = 120, size = 240, label = 'Reserve ratio', onDark = false }) {
  const R = size * 0.42, cx = size / 2, cy = size / 2, stroke = Math.max(10, size * 0.06);
  const a0 = 180, a1 = 360; // semicircle (left → right, top half)
  const pol = (deg) => {
    const r = (deg * Math.PI) / 180;
    return { x: cx + R * Math.cos(r), y: cy + R * Math.sin(r) };
  };
  const arc = (start, end) => {
    const s = pol(start), e = pol(end), large = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${R} ${R} 0 ${large} 1 ${e.x} ${e.y}`;
  };
  const clamped = Math.max(0, Math.min(value, max));
  const valAngle = a0 + (clamped / max) * (a1 - a0);
  const floorAngle = a0 + (floor / max) * (a1 - a0);
  const color = value >= floor ? 'var(--fin-up)' : value >= floor - 3 ? 'var(--warning)' : 'var(--error)';
  const track = onDark ? 'rgba(255,255,255,0.16)' : 'var(--neutral-200)';
  const floorPt = pol(floorAngle);

  return (
    <div style={{ fontFamily: 'var(--font-body)', textAlign: 'center', width: size }}>
      <svg width={size} height={size * 0.62} viewBox={`0 0 ${size} ${size * 0.62}`}>
        <path d={arc(a0, a1)} fill="none" stroke={track} strokeWidth={stroke} strokeLinecap="round" />
        <path d={arc(a0, valAngle)} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          style={{ transition: 'all 0.5s cubic-bezier(0.28,0.11,0.32,1)' }} />
        {/* 100% floor tick */}
        <circle cx={floorPt.x} cy={floorPt.y} r={stroke * 0.42} fill={onDark ? '#fff' : 'var(--brand-deep-blue)'} />
        <text x={cx} y={cy - size * 0.02} textAnchor="middle" fontSize={size * 0.17} fontWeight="700"
          fill={onDark ? '#fff' : 'var(--text-primary)'} style={{ fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-display)' }}>
          {value.toFixed(1)}%
        </text>
      </svg>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: onDark ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)', marginTop: -size * 0.06 }}>
        {label} · floor {floor}%
      </div>
    </div>
  );
}
