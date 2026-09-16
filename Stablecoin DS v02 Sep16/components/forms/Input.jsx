import React from 'react';

/**
 * Input — labelled text field. Label always visible, Deep-Blue focus ring,
 * 16px base font (stops iOS zoom). Optional prefix (e.g. "$") and hint/error.
 */
export function Input({ label, hint, error, prefix, suffix, id, style, ...rest }) {
  const inputId = id || `in-${Math.random().toString(36).slice(2, 8)}`;
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontFamily: 'var(--font-body)' }}>
      {label && <label htmlFor={inputId} style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</label>}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        background: 'var(--brand-white)', borderRadius: 'var(--radius-lg, 12px)',
        border: `1.5px solid ${error ? 'var(--error)' : focus ? 'var(--brand-deep-blue)' : 'var(--border-subtle)'}`,
        padding: '0 0.875rem', minHeight: 48,
        boxShadow: focus ? '0 0 0 3px rgba(23,61,71,0.12)' : 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}>
        {prefix && <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{prefix}</span>}
        <input id={inputId} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontSize: '1rem', fontFamily: 'var(--font-body)', color: 'var(--text-primary)',
            padding: '0.75rem 0', minWidth: 0, ...style }} {...rest} />
        {suffix && <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{suffix}</span>}
      </div>
      {(hint || error) && <span style={{ fontSize: '0.75rem', color: error ? 'var(--error)' : 'var(--text-secondary)' }}>{error || hint}</span>}
    </div>
  );
}
