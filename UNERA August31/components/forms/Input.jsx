import React from 'react';

const CSS = `
.unera-field { display: flex; flex-direction: column; gap: 0.5rem; font-family: var(--font-body); }
.unera-field__label { font-size: var(--fs-label); font-weight: var(--fw-semibold); color: var(--text-primary); }
.unera-field__label .req { color: var(--error); margin-left: 2px; }
.unera-input {
  font-family: var(--font-body);
  font-size: var(--fs-body); /* 16px - prevents iOS zoom */
  color: var(--text-primary);
  background: var(--brand-white);
  border: 2px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.75rem 0.875rem;
  min-height: var(--control-h);
  width: 100%;
  transition: border-color var(--dur-base), box-shadow var(--dur-base);
}
.unera-input::placeholder { color: var(--neutral-500); }
.unera-input:focus {
  outline: none;
  border-color: var(--brand-deep-blue);
  box-shadow: 0 0 0 3px rgba(23,61,71,0.12);
}
.unera-input:disabled { background: var(--neutral-100); cursor: not-allowed; opacity: 0.7; }
.unera-input--error { border-color: var(--error); }
.unera-input--error:focus { box-shadow: 0 0 0 3px var(--error-bg); }
.unera-field__hint { font-size: var(--fs-xs); color: var(--text-secondary); }
.unera-field__error { font-size: var(--fs-xs); color: var(--error); font-weight: var(--fw-medium); }
.unera-field__prefix-wrap { position: relative; display: flex; align-items: center; }
.unera-field__prefix { position: absolute; left: 0.875rem; color: var(--text-secondary); font-size: var(--fs-body); pointer-events: none; }
.unera-field__prefix-wrap .unera-input { padding-left: 1.85rem; }
`;

if (typeof document !== 'undefined' && !document.getElementById('unera-input-css')) {
  const el = document.createElement('style');
  el.id = 'unera-input-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

let _uid = 0;

/**
 * Labelled text input. Label is always visible; Deep Blue focus ring; 16px
 * font on mobile to prevent iOS zoom. Supports hint, error, and a fixed prefix.
 */
export function Input({
  label,
  hint,
  error,
  required = false,
  prefix,
  id,
  className = '',
  ...rest
}) {
  const fieldId = id || `unera-input-${++_uid}`;
  const inputCls = `unera-input ${error ? 'unera-input--error' : ''}`.trim();
  const input = <input id={fieldId} className={inputCls} aria-invalid={!!error} {...rest} />;
  return (
    <div className={`unera-field ${className}`.trim()}>
      {label && (
        <label className="unera-field__label" htmlFor={fieldId}>
          {label}{required && <span className="req" aria-hidden="true">*</span>}
        </label>
      )}
      {prefix ? (
        <div className="unera-field__prefix-wrap">
          <span className="unera-field__prefix">{prefix}</span>
          {input}
        </div>
      ) : input}
      {error ? <span className="unera-field__error">{error}</span>
        : hint ? <span className="unera-field__hint">{hint}</span> : null}
    </div>
  );
}
