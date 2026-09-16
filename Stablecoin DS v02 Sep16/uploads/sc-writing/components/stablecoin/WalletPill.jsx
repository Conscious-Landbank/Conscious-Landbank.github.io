import React from 'react';

/**
 * WalletPill is the progressive Web3 identity control in the nav.
 * Disconnected shows a "Connect wallet" button. Connected shows a pill with a blockie
 * tile, truncated address, balance, and network. Lives on the Deep-Blue nav.
 */
export function WalletPill({ connected = false, address = '', balance = '', network = 'Ethereum', initials = 'JS', onConnect, onClick, onNetwork, style }) {
  const short = address ? `${address.slice(0, 6)}…${address.slice(-4)}` : '';

  if (!connected) {
    return (
      <button type="button" onClick={onConnect} style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        background: 'var(--reserve-gold)', color: 'var(--brand-deep-blue)',
        border: 'none', borderRadius: 'var(--radius-pill, 980px)', padding: '0.4rem 0.9rem',
        fontWeight: 700, fontSize: '0.8rem', fontFamily: 'var(--font-body)', cursor: 'pointer',
        minHeight: 34, ...style,
      }}>
        <svg width="16" height="16" viewBox="0 -960 960 960" fill="currentColor"><path d="M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-480h480q22 0 42 5t38 15v-40q0-33-23.5-56.5T720-740H240q-33 0-56.5 23.5T160-660v40q18-10 38-15t42-5Z" /></svg>
        Connect wallet
      </button>
    );
  }
  // Connected: single boxed white pill of avatar · wallet (address + balance) · network badge
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3125rem',
      padding: '0.125rem 0.375rem 0.125rem 0.25rem', background: 'var(--brand-white)',
      border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-pill, 980px)',
      boxShadow: '0 1px 4px rgba(23,61,71,0.08)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', ...style,
    }}>
      <span style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: 'var(--brand-deep-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600 }}>{initials}</span>
      <button type="button" onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', padding: '0.0625rem 0.125rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.125rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{short}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.55 }}><path d="M6 9l6 6 6-6" /></svg></span>
        <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{balance}</span>
      </button>
      <button type="button" onClick={onNetwork} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', background: 'var(--neutral-200)', border: 'none', borderRadius: 'var(--radius-lg, 8px)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#627EEA' }} />
        <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{network}</span>
      </button>
    </div>
  );
}
