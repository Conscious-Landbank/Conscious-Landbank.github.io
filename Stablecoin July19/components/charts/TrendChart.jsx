import React from 'react';

/**
 * TrendChart — compact area+line chart for a rolling window (e.g. 90-day
 * reserve ratio or outstanding supply; PRD §6.6 "Historical Reserve Trend").
 * Pure SVG, no libraries. Pass an array of numbers.
 */
export function TrendChart({ data = [], width = 520, height = 140, color = 'var(--brand-teal)', floor, pad = 6, style }) {
  if (!data.length) return null;
  const min = Math.min(...data, floor ?? Infinity), max = Math.max(...data, floor ?? -Infinity);
  const span = max - min || 1;
  const x = (i) => pad + (i / (data.length - 1)) * (width - pad * 2);
  const y = (v) => pad + (1 - (v - min) / span) * (height - pad * 2);
  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L ${x(data.length - 1).toFixed(1)} ${height - pad} L ${x(0).toFixed(1)} ${height - pad} Z`;
  const gid = 'tg' + Math.random().toString(36).slice(2, 7);
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ display: 'block', ...style }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.20" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {floor != null && (
        <line x1={pad} x2={width - pad} y1={y(floor)} y2={y(floor)} stroke="var(--neutral-300)" strokeWidth="1" strokeDasharray="4 4" />
      )}
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
