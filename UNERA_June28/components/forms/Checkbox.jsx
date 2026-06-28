import React from 'react';

const CSS = `
.unera-checkbox {
  display: flex; align-items: flex-start; gap: 0.75rem;
  min-height: var(--row-tap); /* whole 48px row is tappable */
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: var(--font-body);
  transition: background var(--dur-fast);
}
.unera-checkbox:hover { background: rgba(23,61,71,0.04); }
.unera-checkbox input { position: absolute; opacity: 0; width: 0; height: 0; }
.unera-checkbox__box {
  flex-shrink: 0; width: 22px; height: 22px; margin-top: 1px;
  border: 2px solid var(--border-strong); border-radius: 6px;
  background: var(--brand-white);
  display: flex; align-items: center; justify-content: center;
  color: var(--brand-white);
  transition: background var(--dur-fast), border-color var(--dur-fast);
}
.unera-checkbox__box svg { width: 14px; height: 14px; opacity: 0; }
.unera-checkbox input:checked + .unera-checkbox__box {
  background: var(--brand-deep-blue); border-color: var(--brand-deep-blue);
}
.unera-checkbox input:checked + .unera-checkbox__box svg { opacity: 1; }
.unera-checkbox input:focus-visible + .unera-checkbox__box { outline: 2px solid var(--brand-deep-blue); outline-offset: 2px; }
.unera-checkbox--radio .unera-checkbox__box { border-radius: var(--radius-full); }
.unera-checkbox--radio input:checked + .unera-checkbox__box { background: var(--brand-deep-blue); }
.unera-checkbox__text { font-size: var(--fs-label); color: var(--text-primary); line-height: 1.45; }
.unera-checkbox__sub { display: block; font-size: var(--fs-xs); color: var(--text-secondary); margin-top: 2px; }
`;

if (typeof document !== 'undefined' && !document.getElementById('unera-checkbox-css')) {
  const el = document.createElement('style');
  el.id = 'unera-checkbox-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

const CHECK = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>;
const DOT = <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="6" /></svg>;

/**
 * Tappable checkbox / radio row — the entire 48px row is the hit target,
 * never a bare input. Pass `type="radio"` for single-select groups.
 */
export function Checkbox({ label, sublabel, type = 'checkbox', className = '', ...rest }) {
  const isRadio = type === 'radio';
  return (
    <label className={`unera-checkbox ${isRadio ? 'unera-checkbox--radio' : ''} ${className}`.trim()}>
      <input type={type} {...rest} />
      <span className="unera-checkbox__box">{isRadio ? DOT : CHECK}</span>
      <span className="unera-checkbox__text">
        {label}
        {sublabel && <span className="unera-checkbox__sub">{sublabel}</span>}
      </span>
    </label>
  );
}
