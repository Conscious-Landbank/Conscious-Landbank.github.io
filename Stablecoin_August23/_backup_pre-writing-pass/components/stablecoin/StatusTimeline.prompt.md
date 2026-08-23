**StatusTimeline** — vertical state-machine tracker for an issuance or redemption (PRD §6.1/§6.3); the stage list inside the FE-207 Transaction Tracker. Shows honest progress in plain language, with one human sentence per stage that also says nothing is required from the user.

```jsx
{/* crypto on-ramp — FE-207 stage names */}
<StatusTimeline steps={[
  { label:'Deposit seen', state:'done', detail:'We spotted 5,000.00 USDC arriving at your deposit address.' },
  { label:'Network confirmations', state:'current', detail:'The network is confirming the transfer. This is the slow part — nothing is needed from you.' },
  { label:'Compliance checks', state:'pending', detail:'A quick automatic check of your limit, quota and sanctions screening.' },
  { label:'hUSD minted to your confirmed wallet', state:'pending' },
]} />
```

Fiat on-ramp uses **Payment received → Checks → hUSD minted**. Confirmation depth never appears in a stage title — it belongs in the tracker's secondary bar ("Network is double-checking · 4 of 12").

States: `done`, `current`, `pending`, `blocked` (failed), `queued` (e.g. liquidity queue on redemption).
