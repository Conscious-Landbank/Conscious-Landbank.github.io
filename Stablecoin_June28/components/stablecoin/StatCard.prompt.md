**StatCard** — a KPI figure tile (Deep-Blue icon well, uppercase label, large tabular value, optional trend pill).

```jsx
<StatCard label="Circulating supply" value="2,845,290" currency="hCAD"
  icon={<svg .../>} />
<StatCard label="Reserve ratio" value="105.2%" trend="Fully backed" trendVariant="reserve"
  href="proof-of-reserve.html" icon={<svg .../>} />
```

`trendVariant`: `up` (fin-up), `reserve` (gold), `verify` (teal). Pass `href`/`onClick` to make it an interactive (lifting) card.
