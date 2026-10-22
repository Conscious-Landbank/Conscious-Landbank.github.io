import React from 'react';
const CSS = `
.ua-panel{font-family:var(--font-body);background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-lg);min-width:0}
.ua-panel__head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;border-bottom:1px solid var(--line)}
.ua-panel__title{font-size:var(--fs-base);font-weight:var(--fw-semibold);color:var(--text-primary);display:flex;align-items:center;gap:8px}
.ua-panel__sub{font-size:var(--fs-xs);color:var(--text-secondary);font-weight:var(--fw-regular)}
.ua-panel__body{padding:14px}
.ua-panel__body--flush{padding:0}
.ua-panel__actions{display:flex;gap:8px;align-items:center}
`;
if (typeof document !== 'undefined' && !document.getElementById('ua-panel-css')) { const el = document.createElement('style'); el.id = 'ua-panel-css'; el.textContent = CSS; document.head.appendChild(el); }

/** Bordered content region with a title row. Panels have borders, not shadows; not every container needs one. */
export function Panel({ title, subtitle, actions, flush = false, children, className = '', ...rest }) {
  return (
    <section className={['ua-panel', className].filter(Boolean).join(' ')} {...rest}>
      {(title || actions) && <header className="ua-panel__head"><div className="ua-panel__title">{title}{subtitle && <span className="ua-panel__sub">{subtitle}</span>}</div>{actions && <div className="ua-panel__actions">{actions}</div>}</header>}
      <div className={'ua-panel__body' + (flush ? ' ua-panel__body--flush' : '')}>{children}</div>
    </section>
  );
}
