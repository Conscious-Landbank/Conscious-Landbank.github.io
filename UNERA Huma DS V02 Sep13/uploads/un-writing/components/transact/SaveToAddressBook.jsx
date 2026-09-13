import React from 'react';

/* Self-contained "Save to address book" pattern - success CTA + modal + localStorage store.
   Belongs to EXTERNAL-TRANSFER flows only (Send / withdraw / remittance): flows where the
   user enters a recipient address worth reusing. NOT for Buy / Swap / Trade (no recipient). */

const STAB_CSS = `
.stab-block { margin: 1.25rem 0 0; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; width: 100%; }
.stab-block > [hidden] { display: none !important; }
.stab-btn, .stab-chip { width: 100%; max-width: 22rem; box-sizing: border-box; }
.stab-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  min-height: 46px; padding: 0 1.25rem; border-radius: var(--radius-md, 0.75rem);
  border: 2px solid var(--border-subtle); background: var(--brand-white);
  color: var(--text-primary); font-family: var(--font-body); font-size: 0.938rem; font-weight: 600;
  cursor: pointer; transition: border-color .2s, color .2s, background .2s;
}
.stab-btn:hover { border-color: var(--brand-deep-blue); color: var(--brand-deep-blue); }
.stab-btn:focus-visible { outline: 2px solid var(--brand-deep-blue); outline-offset: 2px; }
.stab-btn svg { width: 18px; height: 18px; fill: currentColor; flex-shrink: 0; }
.stab-chip {
  display: inline-flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.375rem;
  padding: 0.625rem 1rem; border-radius: var(--radius-md, 0.75rem);
  background: var(--fin-up-bg); color: var(--fin-up); font-size: 0.875rem; font-weight: 600; margin: 0;
}
.stab-chip svg { width: 16px; height: 16px; flex-shrink: 0; }
.stab-chip__manage {
  margin-left: 0.5rem; font-size: 0.8125rem; color: var(--brand-deep-blue); font-weight: 600; text-decoration: none;
}
.stab-chip__manage:hover { text-decoration: underline; }
.stab-chip__manage:focus-visible { outline: 2px solid var(--brand-deep-blue); outline-offset: 2px; }

/* Modal */
.stab-overlay {
  position: fixed; inset: 0; z-index: 10010; background: rgba(15,32,38,0.55);
  display: flex; align-items: center; justify-content: center; padding: 1rem;
}
.stab-modal {
  width: 100%; max-width: 460px; background: var(--brand-white); border-radius: 1.25rem;
  box-shadow: 0 24px 64px rgba(0,0,0,0.28); display: flex; flex-direction: column;
  max-height: 90vh; overflow: hidden;
}
.stab-modal__header { display: flex; align-items: flex-start; gap: 1rem; padding: 1.5rem 1.5rem 0.75rem; }
.stab-modal__header-text { flex: 1; min-width: 0; }
.stab-modal__title { font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0 0 0.25rem; }
.stab-modal__desc { font-size: 0.875rem; color: var(--text-secondary); margin: 0; line-height: 1.5; }
.stab-modal__close {
  flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%; border: none; background: var(--neutral-100);
  color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.stab-modal__close:hover { background: var(--neutral-200); color: var(--text-primary); }
.stab-modal__close svg { width: 20px; height: 20px; fill: currentColor; }
.stab-modal__body { padding: 0.75rem 1.5rem 1.25rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; }
.stab-field { display: flex; flex-direction: column; gap: 0.375rem; }
.stab-label { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
.stab-label__hint { font-weight: 400; color: var(--text-secondary); }
.stab-input, .stab-textarea {
  width: 100%; box-sizing: border-box; padding: 0.75rem 1rem; border: 2px solid var(--border-subtle);
  border-radius: 0.75rem; font-family: var(--font-body); font-size: 1rem; color: var(--text-primary); background: var(--brand-white);
}
.stab-input:focus, .stab-textarea:focus { outline: none; border-color: var(--brand-deep-blue); }
.stab-textarea { resize: vertical; min-height: 72px; line-height: 1.5; }
.stab-static {
  display: flex; align-items: center; min-height: 52px; padding: 0.75rem 1rem;
  background: var(--neutral-100); border: 2px solid var(--border-subtle); border-radius: 0.75rem;
  font-size: 0.875rem; color: var(--text-primary); word-break: break-all;
}
.stab-static--mono { font-family: ui-monospace, monospace; }
.stab-modal__hint { font-size: 0.813rem; color: var(--text-secondary); margin: 0; }
.stab-modal__footer { padding: 1rem 1.5rem 1.5rem; display: flex; gap: 0.75rem; }
.stab-modal__footer .stab-foot-btn { flex: 1; min-height: 46px; border-radius: 0.75rem; font-family: var(--font-body); font-size: 0.938rem; font-weight: 600; cursor: pointer; border: 2px solid transparent; }
.stab-foot-btn--secondary { background: var(--brand-white); border-color: var(--border-subtle); color: var(--text-primary); }
.stab-foot-btn--secondary:hover { border-color: var(--brand-deep-blue); color: var(--brand-deep-blue); }
.stab-foot-btn--primary { background: var(--brand-deep-blue); color: var(--brand-white); }
.stab-foot-btn--primary:hover { background: var(--neutral-800, #0f2026); }
`;

if (typeof document !== 'undefined' && !document.getElementById('unera-stab-css')) {
  const el = document.createElement('style');
  el.id = 'unera-stab-css';
  el.textContent = STAB_CSS;
  document.head.appendChild(el);
}

const ICON_PERSON_ADD = (
  <svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" /></svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
);
const ICON_CLOSE = (
  <svg viewBox="0 -960 960 960" aria-hidden="true"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
);

function loadBook(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { return []; }
}
function upsertEntry(key, entry) {
  const list = loadBook(key);
  const i = list.findIndex(e => (e.address || '').toLowerCase() === entry.address.toLowerCase() && e.network === entry.network);
  if (i >= 0) list[i] = { ...list[i], ...entry, lastUsedAt: new Date().toISOString() };
  else list.push({ ...entry, id: 'addr_' + Date.now(), addedAt: new Date().toISOString(), lastUsedAt: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(list));
}

/**
 * Save-to-address-book success CTA + modal. Render on the SUCCESS/receipt screen of an
 * external-transfer flow when the user sent to a freshly-entered recipient address.
 * Clicking the button opens a labelling modal; on save it persists to a localStorage
 * address book and swaps the button for a "Saved as …" confirmation chip.
 */
export function SaveToAddressBook({
  address,
  network = 'Ethereum',
  addressType = 'EVM',
  storageKey = 'unera_addressBook_v1',
  manageHref = '#',
  buttonLabel = 'Save to address book',
  onSaved,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [savedLabel, setSavedLabel] = React.useState('');
  const [label, setLabel] = React.useState('');
  const [description, setDescription] = React.useState('');
  const labelRef = React.useRef(null);

  React.useEffect(() => {
    if (open && labelRef.current) { const t = setTimeout(() => labelRef.current.focus(), 60); return () => clearTimeout(t); }
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  function openModal() { setLabel(''); setDescription(''); setOpen(true); }
  function confirmSave() {
    const l = label.trim();
    if (!l) { if (labelRef.current) labelRef.current.focus(); return; }
    const entry = { label: l, description: description.trim(), address, addressType, network };
    upsertEntry(storageKey, entry);
    setSavedLabel(l); setSaved(true); setOpen(false);
    if (typeof onSaved === 'function') onSaved(entry);
  }

  return (
    <div className="stab-block" {...rest}>
      {!saved && (
        <button type="button" className="stab-btn" onClick={openModal}>
          {ICON_PERSON_ADD}{buttonLabel}
        </button>
      )}
      {saved && (
        <p className="stab-chip" role="status">
          {ICON_CHECK}
          <span>Saved as "{savedLabel}"</span>
          <a href={manageHref} className="stab-chip__manage">Manage wallets</a>
        </p>
      )}

      {open && (
        <div className="stab-overlay" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="stab-modal" role="dialog" aria-modal="true" aria-label="Save wallet">
            <header className="stab-modal__header">
              <div className="stab-modal__header-text">
                <h2 className="stab-modal__title">Save wallet</h2>
                <p className="stab-modal__desc">Label this address so you can recognize it when sending. Double-check the network before saving.</p>
              </div>
              <button type="button" className="stab-modal__close" onClick={() => setOpen(false)} aria-label="Close">{ICON_CLOSE}</button>
            </header>
            <div className="stab-modal__body">
              <div className="stab-field">
                <label className="stab-label" htmlFor="stab-label-input">Label</label>
                <input ref={labelRef} id="stab-label-input" className="stab-input" type="text" value={label}
                  onChange={(e) => setLabel(e.target.value)} maxLength={60} placeholder="e.g. Ledger (personal), Exchange hot wallet" />
              </div>
              <div className="stab-field">
                <span className="stab-label">Wallet address</span>
                <div className="stab-static stab-static--mono">{address || '–'}</div>
              </div>
              <div className="stab-field">
                <span className="stab-label">Address type &amp; network</span>
                <div className="stab-static">{addressType} · {network}</div>
              </div>
              <div className="stab-field">
                <label className="stab-label" htmlFor="stab-desc-input">Description <span className="stab-label__hint">(optional)</span></label>
                <textarea id="stab-desc-input" className="stab-textarea" value={description}
                  onChange={(e) => setDescription(e.target.value)} maxLength={120} rows={2} placeholder="e.g. Cold storage, Exchange deposit wallet" />
              </div>
              <p className="stab-modal__hint">No wallet signature is required to save an address.</p>
            </div>
            <footer className="stab-modal__footer">
              <button type="button" className="stab-foot-btn stab-foot-btn--secondary" onClick={() => setOpen(false)}>Cancel</button>
              <button type="button" className="stab-foot-btn stab-foot-btn--primary" onClick={confirmSave}>Save Wallet</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
