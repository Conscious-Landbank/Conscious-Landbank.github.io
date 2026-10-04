import React from 'react';
const CSS = `
.ua-tabs{font-family:var(--font-body);display:flex;gap:2px;border-bottom:1px solid var(--line);overflow-x:auto}
.ua-tab{font:inherit;font-size:var(--fs-sm);font-weight:var(--fw-medium);color:var(--text-secondary);background:none;border:none;border-bottom:2px solid transparent;padding:9px 12px;margin-bottom:-1px;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px}
.ua-tab:hover{color:var(--text-primary)}
.ua-tab[aria-selected="true"]{color:var(--brand-deep-blue);border-bottom-color:var(--brand-deep-blue);font-weight:var(--fw-semibold)}
.ua-tab:focus-visible{outline:2px solid var(--focus-on-light);outline-offset:-2px;border-radius:4px}
.ua-tab__count{font-size:var(--fs-2xs);font-weight:var(--fw-semibold);padding:0 6px;border-radius:980px;background:var(--n-100);color:var(--text-secondary);line-height:16px}
.ua-tab[aria-selected="true"] .ua-tab__count{background:var(--tone-info-bg);color:var(--brand-deep-blue)}
`;
if (typeof document !== 'undefined' && !document.getElementById('ua-tabs-css')) { const el = document.createElement('style'); el.id = 'ua-tabs-css'; el.textContent = CSS; document.head.appendChild(el); }

/** Underline tabs for entity detail pages and module sub-views. Counts are optional. */
export function Tabs({ items = [], value, onChange, className = '', ...rest }) {
  return (
    <div role="tablist" className={['ua-tabs', className].filter(Boolean).join(' ')} {...rest}>
      {items.map(it => <button key={it.value} role="tab" type="button" aria-selected={it.value === value} className="ua-tab" onClick={() => onChange && onChange(it.value)}>{it.label}{it.count != null && <span className="ua-tab__count">{it.count}</span>}</button>)}
    </div>
  );
}
