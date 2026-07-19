**StatusTimeline** — vertical state-machine tracker for an issuance or redemption (PRD §6.1/§6.3). Shows honest progress through settlement → compliance → hold → mint (or burn → liquidity → disbursement).

```jsx
<StatusTimeline steps={[
  { label:'Payment settled', state:'done', time:'2:30 PM' },
  { label:'Compliance cleared', state:'done', time:'2:31 PM' },
  { label:'Hold period', state:'current', detail:'Releases in ~10 min (risk tier: standard)' },
  { label:'hUSD minted', state:'pending' },
]} />
```

States: `done`, `current`, `pending`, `blocked` (failed), `queued` (e.g. liquidity queue on redemption).
