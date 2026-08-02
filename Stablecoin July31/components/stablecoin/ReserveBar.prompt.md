**ReserveBar** — Proof-of-Reserve composition: a stacked segment bar of reserve asset classes with an optional legend.

```jsx
<ReserveBar items={[
  { asset: 'bank',       label: 'Bank deposits (CAD)', pct: 60, value: '$1,796,550' },
  { asset: 'stablecoin', label: 'Stablecoins (USDC)',  pct: 30, value: '$898,275' },
  { asset: 'treasury',   label: 'Treasury bonds',       pct: 8,  value: '$239,540' },
  { asset: 'cash',       label: 'Cash equivalent',      pct: 2,  value: '$59,885' },
]} />
```

Asset-class colors are fixed via `--por-*` — never recolor them. `showLegend={false}` renders just the bar.
