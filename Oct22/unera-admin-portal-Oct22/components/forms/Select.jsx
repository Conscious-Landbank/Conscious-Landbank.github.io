import React from 'react';
const CSS = `
.ua-select{font:inherit;font-size:var(--fs-base);height:var(--control-h);padding:0 30px 0 10px;border-radius:var(--radius-md);border:1px solid var(--line-strong);background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235b6b70' stroke-width='2.4'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 10px center;color:var(--text-primary);width:100%;appearance:none;-webkit-appearance:none;outline:none;cursor:pointer}
.ua-select:hover{border-color:var(--brand-deep-blue)}
.ua-select:focus{border-color:var(--brand-deep-blue);box-shadow:0 0 0 3px rgba(23,61,71,.15)}
.ua-select[aria-invalid="true"]{border-color:var(--tone-bad-fg)}
.ua-select[disabled]{background-color:var(--n-100);color:var(--text-secondary);cursor:not-allowed}
.ua-select--sm{height:var(--control-h-sm);font-size:var(--fs-sm);width:auto}
`;
if (typeof document !== 'undefined' && !document.getElementById('ua-select-css')) { const el = document.createElement('style'); el.id = 'ua-select-css'; el.textContent = CSS; document.head.appendChild(el); }

/** Labelled native select (admin density; keyboard-native). For filters use size="sm" without a label. */
export function Select({ label, hint, error, required, options = [], placeholder, size = 'md', id, className = '', ...rest }) {
  const uid = id || 'ua-' + Math.random().toString(36).slice(2, 8);
  return (
    <div className={['ua-field', className].filter(Boolean).join(' ')}>
      {label && <label htmlFor={uid} className="ua-field__label">{label}{required && <span className="ua-field__req" aria-hidden="true">*</span>}</label>}
      <select id={uid} className={'ua-select' + (size === 'sm' ? ' ua-select--sm' : '')} aria-invalid={!!error} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
      </select>
      {error ? <div className="ua-field__error" role="alert">{error}</div> : hint ? <div className="ua-field__hint">{hint}</div> : null}
    </div>
  );
}
