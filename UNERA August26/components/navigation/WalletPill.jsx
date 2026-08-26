import React from 'react';
import { Avatar } from '../core/Avatar.jsx';

const CSS = `
.unera-wallet-pill {
  display: inline-flex; align-items: center; gap: 0.3125rem;
  padding: 0.125rem 0.375rem 0.125rem 0.25rem;
  background: var(--brand-white); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill); box-shadow: 0 1px 4px rgba(23,61,71,0.08);
  color: var(--text-primary); font-family: var(--font-body);
}
.unera-wallet-pill--disconnected { padding: 0.125rem; }
.unera-wallet-pill__info { display: flex; flex-direction: column; min-width: 0; padding: 0 0.125rem; cursor: pointer; }
.unera-wallet-pill__addr { font-size: var(--fs-2xs); font-weight: var(--fw-semibold); line-height: 1.2; white-space: nowrap; }
.unera-wallet-pill__bal { font-size: var(--fs-3xs); line-height: 1.2; color: var(--text-secondary); white-space: nowrap; }
.unera-wallet-pill__net {
  display: inline-flex; align-items: center; gap: 0.25rem;
  padding: 0.25rem 0.5rem; margin-left: 0.125rem;
  background: var(--neutral-200); border: none; border-radius: var(--radius-sm);
  font-family: var(--font-body); font-size: var(--fs-3xs); font-weight: var(--fw-semibold);
  color: var(--text-secondary); cursor: pointer;
}
.unera-wallet-pill__net:hover { background: color-mix(in srgb, var(--neutral-300) 70%, var(--brand-white)); }
.unera-wallet-pill__net-dot { width: 8px; height: 8px; border-radius: var(--radius-full); background: #627EEA; flex-shrink: 0; }
.unera-wallet-pill__connect {
  background: transparent; border: none; cursor: pointer; font-family: var(--font-body);
  font-size: var(--fs-2xs); font-weight: var(--fw-semibold); letter-spacing: 0.02em; text-transform: uppercase;
  color: var(--brand-deep-blue); padding: 0.45rem 0.6rem; border-radius: var(--radius-pill);
}
.unera-wallet-pill__connect:hover { background: rgba(23,61,71,0.06); }
`;

if (typeof document !== 'undefined' && !document.getElementById('unera-wallet-pill-css')) {
  const el = document.createElement('style');
  el.id = 'unera-wallet-pill-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Dual-session wallet pill for the consumer nav. `connected` shows the full
 * three-part pill (avatar+connector badge, truncated address, network switcher);
 * disconnected shows an avatar-only pill with a CONNECT affordance.
 */
export function WalletPill({
  connected = false,
  address = '0x742d…3a8f',
  balance = '$10,240',
  network = 'Ethereum',
  initials = 'JS',
  onConnect,
  className = '',
  ...rest
}) {
  if (!connected) {
    return (
      <span className={`unera-wallet-pill unera-wallet-pill--disconnected ${className}`.trim()} {...rest}>
        <Avatar initials={initials} size="md" />
        <button type="button" className="unera-wallet-pill__connect" onClick={onConnect}>Connect</button>
      </span>
    );
  }
  return (
    <span className={`unera-wallet-pill ${className}`.trim()} {...rest}>
      <Avatar blockie size="md" badge="🦊" />
      <span className="unera-wallet-pill__info">
        <span className="unera-wallet-pill__addr">{address}</span>
        <span className="unera-wallet-pill__bal">{balance}</span>
      </span>
      <button type="button" className="unera-wallet-pill__net">
        <span className="unera-wallet-pill__net-dot" aria-hidden="true" />
        {network}
      </button>
    </span>
  );
}
