import React from 'react';
const CSS = `
.ua-callout{font-family:var(--font-body);display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border-radius:var(--radius-md);font-size:var(--fs-sm);line-height:1.45;border:none}
.ua-callout--info{background:var(--tone-info-bg);color:var(--tone-info-fg)}
.ua-callout--warning{background:var(--tone-pending-bg);color:#5e4510}
.ua-callout--danger{background:var(--tone-bad-bg);color:#7a3550}
.ua-callout--neutral{background:var(--n-100);color:var(--text-primary)}
.ua-callout__icon{width:16px;height:16px;flex-shrink:0;margin-top:1px}
.ua-callout__title{font-weight:var(--fw-semibold);margin-bottom:2px}
`;
if (typeof document !== 'undefined' && !document.getElementById('ua-callout-css')) { const el = document.createElement('style'); el.id = 'ua-callout-css'; el.textContent = CSS; document.head.appendChild(el); }

const Icon = ({ tone }) => tone === 'danger' || tone === 'warning'
  ? <svg className="ua-callout__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
  : <svg className="ua-callout__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>;
/** Inline context box (fully rounded, no left border). Use for consequences, failure reasons, and permission notes. */
export function Callout({ tone = 'info', title, children, className = '', ...rest }) {
  return <div role={tone === 'danger' ? 'alert' : 'note'} className={['ua-callout', 'ua-callout--' + tone, className].filter(Boolean).join(' ')} {...rest}><Icon tone={tone} /><div>{title && <div className="ua-callout__title">{title}</div>}{children}</div></div>;
}
