# Slack feedback round · 28 Aug 2026

Source: Slack #design thread (Kevin, Eric). Second batch; the first batch (naming typo and
related fixes) landed earlier the same day. Prototype-only behaviors stay in-memory.

## What changed

### Donations (Kevin)
- "Ready to give?" shortcut card (`donations.html`, `dashboard-enhanced.html`): new optional
  **Amount (USD)** input with $10/$25/$50/$100 quick picks. With an amount set, the button links
  `donate.html?hc=<id>&amt=<usd>` and the Donate page skips step 1, landing on the amount step
  prefilled. Empty amount keeps the old behavior. Styles in `donation-shared.css`
  (`.give-amt-*`, `.quick-give*`).
- `donate-flow.js`: reads `?amt=` (valid only with an active `?hc=` and a value inside the
  $1–$10,000 USD range); prefills and calls `goToStep(2)`.
- Step-2 live summary now shows **2–3 impact lines** (the tier reached in `--fin-up`, the next
  tiers as "At $50 · …") with a **"Show all N impact levels"** toggle revealing the full ladder
  from `impactHints`. Styles `.impact-lines` / `.impact-more-btn` in `donation-shared.css`.

### Swap transaction tracker (Eric · swap first, then all tracker flows)
- `exchange.html`: the two final stages ("Being confirmed by the network" + "landed in your
  wallet") are merged into one: "Network confirms, then <TOKEN> lands in your wallet"
  (`conf: true`). Confirmation ticks at 500 ms so 12 of 12 completes inside the stage dwell.
- `tx-tracker.js`: new optional `cfg.interactive` — when the confirmation stage has been current
  for more than `afterMs` (12 s), an interactive step-through card appears between the network
  progress bar and the rest of the screen: Back/Next frames with small token-colored SVG scenes.
  Hidden again on done/failed. Only the swap passes this config; donate and add-money are
  unchanged.
- `tx-tracker.js` timing fix: the last `timings.stages` value is now the dwell on the final
  stage (it was silently ignored; a hard-coded 600 ms was used). Donate (800) and add-money
  (800) inherit a 200 ms longer final dwell, nothing else.
- `tx-tracker.css`: `.txt-media*` styles, `[hidden]` pair included, entry animation collapses
  under `prefers-reduced-motion`.

- 28 Aug follow-up (Eric: "apply it to the waiting step of all transactions"): the same two
  changes now cover every tracker flow.
  - Donate, crypto: "Awaiting confirmation" + "Delivered" merged (direct assets); for
    convertible assets the delivery merges into the conversion stage ("Converting to USDC,
    then delivered…"). Confirmation ticks at 450 ms.
  - Donate, card: "Routed" + "Delivered" merged.
  - Buy hUSD (`add-money.html`): "minted" + "in your wallet" merged.
  - All three pass `interactive` frames themed to their flow (blocks/conversion/heart for
    donations; card/checks/wallet for purchases). Send and Trade don't mount the tracker, so
    nothing to apply there.

### Wallet portfolio chart (Kevin)
- `wallet-enhanced.html`: chart history now starts at the join date (prototype constant
  `JOIN = 2025-11-20`). One master daily series runs join → today; every range slices it. A
  range longer than the membership (1Y today) is clipped and the delta reads
  "+X% since you joined · Nov 20, 2025". X-axis labels are computed from real dates.
- Huma Points stat card stays FE dummy data (74.2, +7.8 pending) per FE-207; copy checked.
  Aligned the donate tracker's wait card to the same phrasing: "Points pay up to 60% of
  platform fees."

### Donation review rows removed (Kevin, 28 Aug 1:28 PM)
- "Card currency" (one card can hold multiple currencies), "Destination" (fiat and crypto:
  users assume it reaches the right account for the center) and "Tax receipt" (not issued for
  now) are gone from the review step in `donate-flow.js`.
- Follow-through: the Tax receipt rows on the success and conversion-pending terminals, the
  "Tax receipt available" notification, and the "Receipt not eligible" demo blocker pill are
  removed with it. Copy about the digital donation record (tied to the transaction id) stays.

## Files touched
`unera-pages/donations.html` · `unera-pages/dashboard-enhanced.html` ·
`unera-pages/donation-shared.css` · `unera-pages/donate-flow.js` ·
`unera-pages/exchange.html` · `unera-pages/tx-tracker.js` · `unera-pages/tx-tracker.css` ·
`unera-pages/wallet-enhanced.html`

## Open items
- The join date is a prototype constant; wire it to the profile's real signup date when the BE
  field exists.
- The 12 s threshold for the swap media is Eric's number; confirm it against telemetry once
  real confirmation times exist.
