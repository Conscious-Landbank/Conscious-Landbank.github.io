import React from 'react';
const CSS = `
.ua-field{font-family:var(--font-body);display:flex;flex-direction:column;gap:5px;min-width:0}
.ua-field__label{font-size:var(--fs-xs);font-weight:var(--fw-semibold);color:var(--text-primary);display:flex;gap:4px}
.ua-field__req{color:var(--fin-down)}
.ua-field__hint{font-size:var(--fs-xs);color:var(--text-secondary)}
.ua-field__error{font-size:var(--fs-xs);color:var(--tone-bad-fg);font-weight:var(--fw-medium)}
.ua-input{font:inherit;font-size:var(--fs-base);height:var(--control-h);padding:0 10px;border-radius:var(--radius-md);border:1px solid var(--line-strong);background:#fff;color:var(--text-primary);width:100%;outline:none;transition:border-color var(--dur-fast) var(--ease),box-shadow var(--dur-fast) var(--ease)}
.ua-input:hover{border-color:var(--brand-deep-blue)}
.ua-input:focus{border-color:var(--brand-deep-blue);box-shadow:0 0 0 3px rgba(23,61,71,.15)}
.ua-input[aria-invalid="true"]{border-color:var(--tone-bad-fg)}
.ua-input[disabled]{background:var(--n-100);color:var(--text-secondary);cursor:not-allowed}
.ua-input--mono{font-family:var(--font-mono);font-size:var(--fs-sm)}
textarea.ua-input{height:auto;min-height:72px;padding:8px 10px;resize:vertical;line-height:1.4}
.ua-input-wrap{position:relative;display:flex;align-items:center}
.ua-input-wrap svg{position:absolute;left:10px;width:14px;height:14px;color:var(--text-tertiary);pointer-events:none}
.ua-input-wrap .ua-input{padding-left:30px}
.ua-input-wrap__suffix{position:absolute;right:10px;font-size:var(--fs-xs);color:var(--text-secondary)}
`;
if (typeof document !== 'undefined' && !document.getElementById('ua-input-css')) { const el = document.createElement('style'); el.id = 'ua-input-css'; el.textContent = CSS; document.head.appendChild(el); }

/** Labelled text input / textarea with hint, required marker and inline validation. */
export function Input({ label, hint, error, required, multiline = false, mono = false, icon, suffix, id, className = '', ...rest }) {
  const uid = id || 'ua-' + Math.random().toString(36).slice(2, 8);
  const cls = ['ua-input', mono ? 'ua-input--mono' : ''].filter(Boolean).join(' ');
  const control = multiline ? <textarea id={uid} className={cls} aria-invalid={!!error} {...rest} /> : <input id={uid} className={cls} aria-invalid={!!error} {...rest} />;
  return (
    <div className={['ua-field', className].filter(Boolean).join(' ')}>
      {label && <label htmlFor={uid} className="ua-field__label">{label}{required && <span className="ua-field__req" aria-hidden="true">*</span>}</label>}
      {(icon || suffix) ? <div className="ua-input-wrap">{icon}{control}{suffix && <span className="ua-input-wrap__suffix">{suffix}</span>}</div> : control}
      {error ? <div className="ua-field__error" role="alert">{error}</div> : hint ? <div className="ua-field__hint">{hint}</div> : null}
    </div>
  );
}
