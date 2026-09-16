import React from 'react';

/**
 * Checkbox — checkbox/radio where the ENTIRE 48px row is tappable, not a bare
 * input. Supports a sublabel (e.g. rail descriptions in Redeem).
 */
export function Checkbox({ label, sublabel, type = 'checkbox', name, checked, defaultChecked, onChange, disabled, style }) {
  const [on, setOn] = React.useState(defaultChecked || false);
  const isOn = checked !== undefined ? checked : on;
  const toggle = () => {
    if (disabled) return;
    const next = type === 'radio' ? true : !isOn;
    if (checked === undefined) setOn(next);
    onChange && onChange(next);
  };
  return (
    <label onClick={toggle} style={{
      display: 'flex', alignItems: sublabel ? 'flex-start' : 'center', gap: '0.75rem',
      minHeight: 48, padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-lg, 12px)',
      cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)',
      border: `1.5px solid ${isOn ? 'var(--brand-deep-blue)' : 'var(--border-subtle)'}`,
      background: isOn ? 'color-mix(in srgb, var(--brand-cloud-blue) 40%, var(--brand-white))' : 'var(--brand-white)',
      opacity: disabled ? 0.5 : 1, transition: 'all 0.15s', ...style,
    }}>
      <span aria-hidden style={{
        width: 22, height: 22, flexShrink: 0, marginTop: sublabel ? 2 : 0,
        borderRadius: type === 'radio' ? '50%' : '6px',
        border: `2px solid ${isOn ? 'var(--brand-deep-blue)' : 'var(--neutral-400)'}`,
        background: isOn ? 'var(--brand-deep-blue)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
      }}>
        {isOn && (type === 'radio'
          ? <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
          : <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>)}
      </span>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>
        {sublabel && <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>{sublabel}</span>}
      </span>
      <input type={type} name={name} checked={isOn} readOnly style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
    </label>
  );
}
