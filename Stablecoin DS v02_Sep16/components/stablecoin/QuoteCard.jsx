import React from 'react';

/**
 * QuoteCard is the issuance/redemption quote summary with a hard 60-second expiry
 * (hUSD Issuance & Redemption spec pageId 62259435, §3): "Quotes expire after 60
 * seconds. Expired quotes cannot be confirmed." Always shows input/output, FX rate
 * where applicable, fee/markup, **rate source + timestamp**, and a live countdown.
 *
 * The parent owns the countdown (a 1s interval) and passes `secondsLeft`; when it
 * reaches 0, pass `expired` and disable the confirm CTA, surfacing "Refresh quote".
 * Rate source depends on the funding asset (Kevin, 2026-07): fiat & stablecoins
 * use an **FX rate** from an off-chain FX provider (exchangerate-api.com /
 * fastforex.io); ETH/BTC use an **exchange rate** sourced from **CoinGecko** —
 * pass `sourceHref` so the source renders as a link. Never an on-chain oracle.
 */
export function QuoteCard({
  rateLabel = 'Rate · 1.0000 USD = 1.0000 hUSD',
  rateSource = 'exchangerate-api.com',
  rateType = 'FX rate',   // 'FX rate' (fiat/stablecoin) | 'exchange rate' (ETH/BTC)
  sourceHref = '',        // link to the rate source (required when rateType is 'exchange rate', e.g. CoinGecko)
  rows = [],            // [{ label, value }]: fee, markup, daily limit, etc.
  secondsLeft = 60,
  expired = false,
  onRefresh,
  style,
}) {
  const danger = expired || secondsLeft <= 10;
  return (
    <div style={{ background: 'var(--brand-white)', border: `1px solid ${expired ? 'var(--error)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-2xl, 14px)', padding: '1rem 1.2rem', fontFamily: 'var(--font-body)', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingBottom: '0.7rem', borderBottom: '1px solid var(--border-subtle)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: expired ? 'var(--error)' : 'var(--fin-up)' }} />
          {rateLabel}
        </span>
        <span style={{ fontSize: '0.78rem', fontVariantNumeric: 'tabular-nums',
          color: danger ? (expired ? 'var(--error)' : 'var(--accent-deep)') : 'var(--text-secondary)' }}>
          {expired ? 'Quote expired' : `Expires in ${secondsLeft}s`}
        </span>
      </div>

      {expired && (
        <button onClick={onRefresh} style={{ width: '100%', marginTop: '0.7rem', cursor: 'pointer',
          background: 'var(--brand-white)', border: '1px solid var(--accent-strong)', color: 'var(--accent-deep)',
          borderRadius: 9, padding: '0.55rem', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700 }}>
          Refresh quote
        </button>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.7rem' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Rate source · {rateType}</span>
        {sourceHref
          ? <a href={sourceHref} target="_blank" rel="noopener" style={{ fontSize: '0.82rem', color: 'var(--accent-deep, #2f7682)', textDecoration: 'none' }}>{rateSource} ↗</a>
          : <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary, #8a9a9a)' }}>{rateSource}</span>}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{r.label}</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)' }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}
