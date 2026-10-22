import React from 'react';
const CSS = `
.ua-metric{font-family:var(--font-body);background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-lg);padding:14px 16px;display:flex;flex-direction:column;gap:6px;min-width:0;text-align:left}
.ua-metric--button{cursor:pointer;transition:border-color var(--dur-fast) var(--ease),background var(--dur-fast) var(--ease)}
.ua-metric--button:hover{border-color:var(--brand-deep-blue);background:var(--surface-hover)}
.ua-metric--button:focus-visible{outline:2px solid var(--focus-on-light);outline-offset:2px}
.ua-metric__label{font-size:var(--fs-xs);font-weight:var(--fw-medium);color:var(--text-secondary);display:flex;justify-content:space-between;gap:8px}
.ua-metric__value{font-size:var(--fs-stat);font-weight:var(--fw-semibold);line-height:1.1;font-variant-numeric:tabular-nums;color:var(--text-primary);letter-spacing:-0.01em}
.ua-metric__meta{font-size:var(--fs-xs);color:var(--text-secondary);display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.ua-metric__delta{font-weight:var(--fw-semibold);font-variant-numeric:tabular-nums}
.ua-metric__delta--up{color:var(--fin-up)}.ua-metric__delta--down{color:var(--fin-down)}.ua-metric__delta--flat{color:var(--fin-neutral)}
.ua-metric--alert .ua-metric__value{color:var(--tone-bad-fg)}
`;
if (typeof document !== 'undefined' && !document.getElementById('ua-metric-css')) { const el = document.createElement('style'); el.id = 'ua-metric-css'; el.textContent = CSS; document.head.appendChild(el); }

/** Operational metric: current value + comparison + period + drill-down. Not a vanity chart. */
export function MetricTile({ label, value, delta, deltaDirection = 'flat', meta, alert = false, onClick, right, className = '', ...rest }) {
  const Comp = onClick ? 'button' : 'div';
  const cls = ['ua-metric', onClick ? 'ua-metric--button' : '', alert ? 'ua-metric--alert' : '', className].filter(Boolean).join(' ');
  return (
    <Comp className={cls} onClick={onClick} type={onClick ? 'button' : undefined} {...rest}>
      <div className="ua-metric__label"><span>{label}</span>{right}</div>
      <div className="ua-metric__value">{value}</div>
      {(delta || meta) && <div className="ua-metric__meta">{delta && <span className={'ua-metric__delta ua-metric__delta--' + deltaDirection}>{delta}</span>}{meta && <span>{meta}</span>}</div>}
    </Comp>
  );
}
