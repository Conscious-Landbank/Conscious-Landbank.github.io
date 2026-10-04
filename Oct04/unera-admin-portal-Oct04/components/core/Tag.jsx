import React from 'react';
const CSS = `
.ua-tag{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-body);font-size:var(--fs-2xs);font-weight:var(--fw-semibold);padding:1px 7px;border-radius:5px;background:var(--n-100);color:#2e4a53;white-space:nowrap;line-height:18px}
.ua-tag--layer-huma{background:#e8f2ee;color:#1a5c4a}
.ua-tag--layer-stablecoin{background:#efe8d7;color:#6b5112}
.ua-tag button{border:none;background:none;padding:0;margin-left:2px;cursor:pointer;color:inherit;opacity:.6;line-height:1;font-size:12px}
.ua-tag button:hover{opacity:1}
`;
if (typeof document !== 'undefined' && !document.getElementById('ua-tag-css')) { const el = document.createElement('style'); el.id = 'ua-tag-css'; el.textContent = CSS; document.head.appendChild(el); }

/** Small label: user tags (Donor, Partner), layer markers (Huma / Stablecoin), chain names. */
export function Tag({ children, layer, onRemove, className = '', ...rest }) {
  const cls = ['ua-tag', layer ? 'ua-tag--layer-' + layer : '', className].filter(Boolean).join(' ');
  return <span className={cls} {...rest}>{children}{onRemove && <button type="button" aria-label={'Remove ' + children} onClick={onRemove}>×</button>}</span>;
}
