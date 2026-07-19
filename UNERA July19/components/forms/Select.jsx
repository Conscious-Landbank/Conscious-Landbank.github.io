import React from 'react';

const CSS = `
.unera-select { position: relative; font-family: var(--font-body); }
.unera-select__label { display: block; font-size: var(--fs-label); font-weight: var(--fw-semibold); color: var(--text-primary); margin-bottom: 0.5rem; }
.unera-select__trigger {
  width: 100%; min-height: var(--control-h);
  display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
  background: var(--brand-white); border: 2px solid var(--border-subtle);
  border-radius: var(--radius-md); padding: 0.75rem 0.875rem;
  font-family: var(--font-body); font-size: var(--fs-body); color: var(--text-primary);
  cursor: pointer; text-align: left;
  transition: border-color var(--dur-base), box-shadow var(--dur-base);
}
.unera-select__trigger[aria-expanded="true"], .unera-select__trigger:focus-visible {
  outline: none; border-color: var(--brand-deep-blue); box-shadow: 0 0 0 3px rgba(23,61,71,0.12);
}
.unera-select__placeholder { color: var(--neutral-500); }
.unera-select__chev { width: 18px; height: 18px; color: var(--text-secondary); flex-shrink: 0; transition: transform var(--dur-base); }
.unera-select__trigger[aria-expanded="true"] .unera-select__chev { transform: rotate(180deg); }
.unera-select__menu {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: var(--z-dropdown);
  background: var(--brand-white); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md); box-shadow: var(--shadow-pop);
  padding: 0.35rem; margin: 0; list-style: none; max-height: 280px; overflow-y: auto;
}
.unera-select__opt {
  display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
  padding: 0.625rem 0.75rem; min-height: var(--touch-min);
  border-radius: var(--radius-sm); font-size: var(--fs-sm); color: var(--text-primary); cursor: pointer;
}
.unera-select__opt:hover, .unera-select__opt--active { background: color-mix(in srgb, var(--brand-cloud-blue) 60%, var(--brand-white)); color: var(--brand-deep-blue); }
.unera-select__opt[aria-selected="true"] { font-weight: var(--fw-semibold); background: color-mix(in srgb, var(--brand-yellow) 30%, var(--brand-white)); }
.unera-select__check { width: 16px; height: 16px; color: var(--brand-deep-blue); flex-shrink: 0; }
`;

if (typeof document !== 'undefined' && !document.getElementById('unera-select-css')) {
  const el = document.createElement('style');
  el.id = 'unera-select-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

const CHEV = <svg className="unera-select__chev" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>;
const CHECK = <svg className="unera-select__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>;

/**
 * Custom select — the system bans native <select>. Keyboard-accessible
 * (arrows, Enter, Esc), hidden input mirrors value for forms.
 */
export function Select({ label, options = [], value, defaultValue, onChange, placeholder = 'Select…', name, className = '' }) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue ?? '');
  const [active, setActive] = React.useState(0);
  const ref = React.useRef(null);
  const current = value !== undefined ? value : internal;
  const opts = options.map(o => (typeof o === 'string' ? { value: o, label: o } : o));
  const selected = opts.find(o => o.value === current);

  React.useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  function choose(opt) {
    if (value === undefined) setInternal(opt.value);
    onChange && onChange(opt.value);
    setOpen(false);
  }
  function onKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive(a => Math.min(a + 1, opts.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter' && open) { e.preventDefault(); choose(opts[active]); }
    else if (e.key === 'Escape') setOpen(false);
  }

  return (
    <div className={`unera-select ${className}`.trim()} ref={ref}>
      {label && <span className="unera-select__label">{label}</span>}
      <input type="hidden" name={name} value={current} readOnly />
      <button type="button" className="unera-select__trigger" aria-haspopup="listbox" aria-expanded={open}
        onClick={() => setOpen(o => !o)} onKeyDown={onKey}>
        <span className={selected ? '' : 'unera-select__placeholder'}>{selected ? selected.label : placeholder}</span>
        {CHEV}
      </button>
      {open && (
        <ul className="unera-select__menu" role="listbox">
          {opts.map((o, i) => (
            <li key={o.value} role="option" aria-selected={o.value === current}
              className={`unera-select__opt ${i === active ? 'unera-select__opt--active' : ''}`}
              onMouseEnter={() => setActive(i)} onClick={() => choose(o)}>
              <span>{o.label}</span>
              {o.value === current && CHECK}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
