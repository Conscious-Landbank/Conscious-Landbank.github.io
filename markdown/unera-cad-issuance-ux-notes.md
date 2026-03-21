# UNERA CAD Issuance Exchange — UX Notes & Handoff

> Design-only document. No backend implementation is included here. All API contracts, database schemas, and authentication logic are out of scope and must be implemented separately.

---

## Pages delivered

| File | Purpose | Items covered |
|---|---|---|
| `get-unera-cad.html` | Hub page — acquire UNERA CAD | (c) Mint, (f) AMM Swap |
| `redeem-unera-cad.html` | Hub page — exit UNERA CAD | (d) Burn-to-CAD, (e) Burn-to-USDT |

---

## Glossary

| Term | Definition |
|---|---|
| **UNERA CAD** | UNERA's native stablecoin, notionally pegged to the Canadian dollar (CAD) |
| **Mint** | Creating new UNERA CAD by depositing USDC or USDT at the official FX rate |
| **Burn** | Destroying UNERA CAD tokens to redeem their underlying value in CAD fiat or USDT |
| **AMM Swap** | Trading USDC/USDT for UNERA CAD via an Automated Market Maker pool; rate varies continuously |
| **Official FX Rate** | The CAD/USD rate sourced from the fiat exchange rate API, refreshed every 15 seconds |
| **Slippage** | The difference between quoted price and executed price in an AMM; absent in the Mint flow |
| **Price Impact** | The effect a trade has on the pool price, expressed as a percentage; larger trades have higher impact |
| **Settlement** | The time required for funds to arrive after a redeem transaction is confirmed |
| **Offramp** | The process of converting crypto (UNERA CAD) back to fiat (CAD) |

---

## Mint vs Swap — key distinctions

This table is critical for engineering and QA. The two flows live in the same widget shell on `get-unera-cad.html` but have fundamentally different backend contracts.

| Attribute | Mint tab (item c) | Swap tab (item f) |
|---|---|---|
| Rate source | Fiat exchange rate API | AMM pool reserves |
| Rate change interval | Every **15 seconds** | **Continuous** (no fixed interval) |
| Swap fee | **None** | 0.3% AMM fee |
| Slippage | **None** — rate is guaranteed | 0.5% default; user-configurable 0.1–50% |
| Price impact | **None** | Yes — grows with trade size |
| Direction | Always USDC/USDT → UNERA CAD | USDC/USDT → UNERA CAD (can flip between USDC and USDT) |
| Rate display | CAD/USD exchange rate (e.g. 1.3847) | UNERA CAD per USDC (e.g. 1.3612) |
| Review modal rate note | "Rate locked at confirmation" | "Quote updates in real-time" |
| Button label | **Mint UNERA CAD** | **Swap [TOKEN] → UNERA CAD** |
| Typical rate vs FX | = official FX rate | slightly below FX rate (pool depth dependent) |

---

## Rate refresh rules

### Swap tab (f)
- Rate updates on every JS tick (`setInterval(750ms)` in mock).
- Production: subscribe to AMM pool price feed or poll every 1–2 seconds.
- No rate lock — the review screen explains that execution is in a **future block** and the amount may differ slightly if the pool moves before confirmation.
- **Slippage**: Default **Auto** (dynamic from mock impact/size); optional **Custom** in swap settings. **Transaction deadline** (e.g. 10–60 min) is configurable in the same settings panel.
- **Price impact**: Inline banner on the swap widget when impact is elevated; review step requires acknowledgment from **≥2%** impact, and **≥5%** opens an additional confirmation modal.
- No countdown display needed.

### Mint tab (c)
- Rate refreshes exactly every **15 seconds**.
- UI shows a circular countdown SVG ring that depletes from full → empty over 15 seconds.
- On refresh: brief green flash animation on the rate display (`aria-live="polite"` so screen readers announce "Rate updated").
- Review screen copy: **rate locks when the user confirms** the mint; if the live feed moves during review, show the rate-expired banner and require **Update quote** before submit.
- **Chart + headline + % change**: In production, drive all three from **one** FX time-series (same API / same series ID) so the graph, numeric headline, and period change never contradict each other. The static mock uses a deterministic series anchored to the current mint rate.
- Production: poll the fiat exchange rate API every 15 seconds. Cache response server-side to prevent API overuse.

### Redeem flows (d and e)
- Same 15-second refresh as Mint (both are official rate conversions, not AMM).
- Countdown mini-ring shown next to the rate display in the redeem widget.
- Rate logic: `1 UNERA CAD = 1 CAD` for CAD redemption; `1 UNERA CAD = (1 / FX_RATE) USDT` for USDT unlock.

---

## Full transaction state inventory

All six states must be handled in the UI. The `redeem-unera-cad.html` transaction tracker implements all six via `renderTxState(state, data)`.

| State | Trigger | UI treatment | Auto-advance? |
|---|---|---|---|
| **Submitted** | User confirms in review modal | Spinner + "Processing…" + step 1 active | Yes — auto-advances to Confirming |
| **Confirming** | Burn transaction broadcast | Auto-advancing stepper (3 steps) | Yes — auto-advances to Completed or Pending |
| **Completed** | All steps done, funds released | Success animation + transaction details + CTA | No — user dismisses |
| **Failed** | Transaction reverted | Error icon + friendly message + "Try Again" | No |
| **Pending settlement** | CAD redemption only — funds dispatched but bank hasn't settled | Info banner with estimated date + partial stepper | No — external process |
| **Cancelled** | User cancels (future) or timeout | Neutral icon + restart option | No |

### Auto-advancing stepper rule (per web3ux.design)
> "Make each step follow on automatically from the last."

Steps advance without requiring user action. Timing in mock: 900ms, 1000ms, 1100ms, 1200ms (with random jitter). Production: advance on real blockchain event callbacks.

---

## Backend contract assumptions

These are design-only assumptions. The backend team must confirm or adjust each one.

| Assumption | Notes |
|---|---|
| Fiat exchange rate API refreshes every ≤15s | Used for Mint rate and Redeem rate. Production endpoint TBD. |
| AMM pool price feed is available | Required for Swap tab continuous quote updates. |
| Minting is atomic and instant | UI states "Instant (< 30 seconds)". If this changes, update copy. |
| CAD redemption settlement is 1–2 business days | Settlement banner and tracker use this. Update if SLA changes. |
| USDT redemption is < 5 minutes | On-chain confirmation assumed. |
| Redemption fee is zero (v1) | "None" is displayed explicitly in all summary and review screens. If fees are introduced, update `sumRate` rows. |
| Wallet address is available from connected wallet | `redeem-unera-cad.html` auto-fills wallet address for USDT destination. |
| UNERA CAD balance is provided by wallet/API | Mock balance: 1,240.00 UNERA CAD. |
| USDC and USDT are the only supported input tokens | Token selector is limited to USDC and USDT. |

---

## Component reuse map (brief)

Full line-level references are in the [design plan](../markdown/unera_c-f_design_plan_v2_88320e65.plan.md).

| Component | Source | Used in |
|---|---|---|
| Nav + hamburger + mobile menu | `exchange.html` | Both new pages |
| Page header (gradient title) | `exchange.html` | Both new pages |
| Token dropdown (searchable) | `exchange.html` | `get-unera-cad.html` token selectors |
| Amount input (large font) | `exchange.html` | All amount input fields |
| Conversion summary rows | `exchange.html` / `add-money.html` | Widget summaries |
| Slippage controls | `exchange.html` | Swap tab details accordion |
| Review modal pattern | `exchange.html` | Swap and Mint review modals |
| Success screen + lightning badge | `exchange.html` / `stake.html` | Success states on both pages |
| Saved method card (selected state) | `add-money.html` | CAD bank selector in redeem |
| Send option cards | `send-enhanced.html` | Destination selector in redeem |
| Processing stepper (auto-advance) | `stake.html` | Transaction tracker in redeem |

---

## Accessibility notes

- All rate changes use `aria-live="polite"` regions so screen readers announce updates without interrupting.
- The countdown ring is `aria-hidden="true"` — the text label next to it carries the accessible information.
- Destination selector cards use `role="radio"` and `aria-checked` for screen reader navigation.
- The transaction tracker uses `aria-live="assertive"` on the processing modal.
- All interactive elements have visible focus rings (2–3px solid `var(--primary-green)`, 2px offset).
- `@media (prefers-reduced-motion: reduce)` collapses all animations to 0.01ms.
- Skip link is the first element in `<body>`, targeting `#main-content`.

---

*Last updated: March 2026. Design by UNERA product design team.*
