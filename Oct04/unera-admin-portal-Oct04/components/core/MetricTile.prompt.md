Operational metric with context (comparison, period, drill-down). Use for counts that drive action, not vanity totals.
```jsx
<MetricTile label="Failed transactions" value="4" alert delta="+2 vs yesterday" deltaDirection="down" meta="last 24h" onClick={openFailed} />
```
