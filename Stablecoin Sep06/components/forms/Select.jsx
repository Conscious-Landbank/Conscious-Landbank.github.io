import React from 'react';

/**
 * Select — custom dropdown (UNERA never uses a native <select>).
 * Keyboard accessible (↑ ↓ Enter Esc). Options are strings or {value,label}.
 */
export function Select({ label, options = [], value, defaultValue, onChange, placeholder = 'Select…', style }) {
  const norm = options.map(o => typeof o === 'string' ? { value: o, label: o } : o);
  const [open, setOpen] = React.useState(false);
  const [val, setVal] = React.useState(value ?? defaultValue ?? '');
  const [active, setActive] = React.useState(0);
  const ref = React.useRef(null);
  const current = val !== undefined ? val : value;
  const selected = norm.find(o => o.value === current);

  React.useEffect(() => {
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const pick = o => { setVal(o.value); onChange && onChange(o.value); setOpen(false); };
  const onKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive(a => Math.min(a + 1, norm.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (open) pick(norm[active]); else setOpen(true); }
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontFamily: 'var(--font-body)', position: 'relative', ...style }}>
      {label && <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</label>}
      <button type="button" onClick={() => setOpen(o => !o)} onKeyDown={onKey} aria-haspopup="listbox" aria-expanded={open}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
          background: 'var(--brand-white)', borderRadius: 'var(--radius-lg, 12px)', minHeight: 48,
          border: `1.5px solid ${open ? 'var(--brand-deep-blue)' : 'var(--border-subtle)'}`,
          padding: '0 0.875rem', fontSize: '1rem', fontFamily: 'var(--font-body)', cursor: 'pointer',
          color: selected ? 'var(--text-primary)' : 'var(--text-secondary)', textAlign: 'left',
          boxShadow: open ? '0 0 0 3px rgba(23,61,71,0.12)' : 'none' }}>
        <span>{selected ? selected.label : placeholder}</span>
        <svg width="18" height="18" viewBox="0 -960 960 960" fill="var(--text-secondary)" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" /></svg>
      </button>
      {open && (
        <ul role="listbox" style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 10002,
          listStyle: 'none', margin: 0, padding: '0.35rem', background: 'var(--brand-white)',
          border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg, 12px)', boxShadow: 'var(--shadow-menu)' }}>
          {norm.map((o, i) => (
            <li key={o.value} role="option" aria-selected={o.value === current} onClick={() => pick(o)} onMouseEnter={() => setActive(i)}
              style={{ padding: '0.625rem 0.75rem', borderRadius: 'var(--radius-md, 8px)', cursor: 'pointer', fontSize: '0.9rem',
                background: i === active ? 'color-mix(in srgb, var(--brand-cloud-blue) 60%, var(--brand-white))' : 'transparent',
                color: o.value === current ? 'var(--brand-deep-blue)' : 'var(--text-primary)',
                fontWeight: o.value === current ? 600 : 400 }}>{o.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
