import React from 'react';

/**
 * Stepper — progress rail for Purchase / Redeem / KYC / password-reset flows.
 * Progression is DEEP BLUE (never fin-up green). Completed steps show a
 * checkmark; the current step is filled; future steps are outlined.
 */
export function Stepper({ steps = [], current = 0, style }) {
  const total = steps.length;
  const pct = total > 1 ? (current / (total - 1)) * 100 : 0;
  return (
    <div role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current + 1}
      style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', ...style }}>
      <div style={{ position: 'absolute', top: 16, left: 0, right: 0, height: 2, background: 'var(--border-subtle)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: 16, left: 0, width: `${pct}%`, height: 2, background: 'var(--brand-deep-blue)', zIndex: 1, transition: 'width 0.5s cubic-bezier(0.28,0.11,0.32,1)' }} />
      {steps.map((label, i) => {
        const done = i < current, active = i === current;
        const filled = done || active;
        return (
          <div key={i} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: filled ? 'var(--brand-deep-blue)' : 'var(--brand-white)',
              border: `2px solid ${filled ? 'var(--brand-deep-blue)' : 'var(--border-subtle)'}`,
              color: filled ? '#fff' : 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '0.875rem', transition: 'all 0.2s cubic-bezier(0.28,0.11,0.32,1)',
            }}>
              {done
                ? <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                : i + 1}
            </div>
            <span style={{
              fontSize: 'var(--text-xs, 0.75rem)', textAlign: 'center',
              fontWeight: active ? 700 : 500,
              color: active ? 'var(--brand-deep-blue)' : done ? 'var(--text-primary)' : 'var(--text-secondary)',
            }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
