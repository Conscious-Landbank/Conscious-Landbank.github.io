import React from 'react';

const CSS = `
.unera-stepper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  padding: 0 1rem;
  max-width: 700px;
  margin: 0 auto 3rem;
}
.unera-stepper__track {
  content: ''; position: absolute; top: 24px; left: 24px; right: 24px;
  height: 2px; background: var(--neutral-300); z-index: 0;
}
.unera-stepper__progress {
  position: absolute; top: 24px; left: 24px; height: 2px;
  background: var(--brand-deep-blue); z-index: 1;
  transition: width var(--dur-prog) ease; max-width: calc(100% - 48px);
}
.unera-step {
  display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
  position: relative; z-index: 2; flex: 1;
}
.unera-step__circle {
  width: 48px; height: 48px; border-radius: var(--radius-full);
  background: var(--brand-white); border: 2px solid var(--neutral-300);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-weight: var(--fw-bold); font-size: 1.125rem;
  color: var(--text-secondary);
  transition: background var(--dur-slow), border-color var(--dur-slow), color var(--dur-slow), transform var(--dur-slow);
}
.unera-step__circle svg { width: 22px; height: 22px; }
.unera-step--active .unera-step__circle {
  background: var(--brand-deep-blue); border-color: transparent;
  color: var(--brand-white); transform: scale(1.1);
}
.unera-step--done .unera-step__circle {
  background: var(--brand-deep-blue); border-color: transparent; color: var(--brand-white);
}
.unera-step__label { font-size: var(--fs-sm); color: var(--neutral-600); font-weight: var(--fw-medium); text-align: center; }
.unera-step--active .unera-step__label { color: var(--brand-deep-blue); font-weight: var(--fw-semibold); }
.unera-step--done .unera-step__label { color: var(--fin-up); }

@media (max-width: 640px) {
  .unera-stepper { display: none; }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('unera-stepper-css')) {
  const el = document.createElement('style');
  el.id = 'unera-stepper-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

/**
 * Multi-step flow stepper (Send / Add / Exchange). Stepper progression is
 * brand Deep Blue; completed steps show fin-up checkmarks. Collapses below 640px.
 */
export function Stepper({ steps = [], current = 0, className = '', ...rest }) {
  const last = Math.max(steps.length - 1, 1);
  const pct = Math.min(current / last, 1) * 100;
  return (
    <div className={`unera-stepper ${className}`.trim()} role="list" aria-label="Progress" {...rest}>
      <div className="unera-stepper__track" aria-hidden="true" />
      <div className="unera-stepper__progress" style={{ width: `calc(${pct}% - ${pct === 0 ? 0 : 0}px)` }} aria-hidden="true" />
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'todo';
        return (
          <div key={i} className={`unera-step unera-step--${state}`} role="listitem" aria-current={state === 'active' ? 'step' : undefined}>
            <div className="unera-step__circle">{state === 'done' ? CHECK : i + 1}</div>
            <div className="unera-step__label">{label}</div>
          </div>
        );
      })}
    </div>
  );
}
