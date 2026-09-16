**CompositionDonut** is a donut of reserve composition by asset type, with fixed `--por-*` colors and an optional center total. Pair with a legend or `ReserveBar`.

```jsx
<CompositionDonut centerValue="$3.0M" centerLabel="Reserves" items={[
  { asset:'bank', pct:60 }, { asset:'stablecoin', pct:30 },
  { asset:'treasury', pct:8 }, { asset:'cash', pct:2 },
]} />
```
