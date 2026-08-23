# FE-207 — Unera Stablecoin design update

**Jira:** FE-207 "UI/UX — Update design for layer names and reduce user's cognitive"
**Sources:** Slack #C0ABB2Q3BJS (Aug 14–22 2026 — Kevin Aug 19/20/21, Eric Aug 19), `Business/Ecosystem_Overview`
**Scope of this document:** the **Unera Stablecoin** design project (`sc/`). The Huma Platform consumer app is covered by its own change log.

Every item is tagged **[Rename]**, **[Waiting UX]** or **[Hierarchy]** so it can be picked up independently.

Verified headlessly with Playwright / Chromium at 1366×900 and 390×844: **zero JS console errors, zero 404s** on every page touched. Screenshots in `screenshots/fe-207/`.

---

## 1. Changed files

| File | What changed | Tags |
|---|---|---|
| `UNERA hUSD Portal.dc.html` | Compact balance header replaces the 5rem/248px-coin hero; attention block (pending tx → account state) moved directly under it; new crypto **Confirm receiving wallet** first step; new crypto **Deposit** step with the permanent personal address; **Transaction Tracker** on the status step for both paths; persistent pending pill in the nav + synthesized bell item; USDC/USDT-only picker with ETH/BTC "Soon"; 1:1 economics, estimate-vs-actual copy, 5% auto-adjust rules, 1,000 minimum; layer renames throughout; SVG `d` bindings moved into JS so the page boots with no console noise. | [Rename] [Waiting UX] [Hierarchy] |
| `ui_kits/stablecoin-app/index.html` | Same three changes in the self-contained click-through: `.bal-head` compact header + quiet secondary stats, attention card + level banner directly beneath, receiving-wallet confirm and permanent deposit address on the crypto tab, "How this works" rules, 1,000 minimum, full Transaction Tracker on the Issue status step with demo controls, nav pending pill + bell item. | [Rename] [Waiting UX] [Hierarchy] |
| `ui_kits/auth/index.html` | Product-name copy and `<title>`/tab titles → **Unera Stablecoin**. | [Rename] |
| `ui_kits/auth/README.md` | Product name. | [Rename] |
| `ui_kits/stablecoin-app/README.md` | Product name, "yield → Humanity Centers". | [Rename] |
| `readme.md` | Product name, consumer layer → **Huma Platform**, Humanity Centres → **Centers**. | [Rename] |
| `SKILL.md` | Skill description names the Unera Stablecoin Portal. | [Rename] |
| `components/stablecoin/StatusTimeline.jsx` / `.d.ts` / `.prompt.md` | Documented as the stage list inside the Transaction Tracker; FE-207 plain-language stage vocabulary replaces the internal status codes in the guidance. | [Rename] [Waiting UX] |
| `components/stablecoin/AccountStateBanner.jsx` | Doc comment names the Unera Stablecoin Portal. | [Rename] |
| `components/core/Button.jsx` / `.prompt.md` | Product name. | [Rename] |
| `guidelines/type-specimen.html` | Eyebrow reads "Unera Stablecoin Portal". | [Rename] |
| `screenshots/fe-207/*` | 28 new verification screenshots (14 screens × desktop/mobile). | — |

Untouched on purpose: `_audit/`, the archived `v1` / `v2 (pre-…)` canvases, existing `screenshots/`, and the design-token CSS files.

---

## 2. Rename mapping [Rename]

| Old | New | Notes |
|---|---|---|
| UNERA Platform / Unera Platform (the consumer neo-bank layer) | **Huma Platform** (short form "Huma") | Never conflate with the issuer. |
| Stablecoin / Stablecoin Portal / UNERA Stablecoin (the issuer layer) | **Unera Stablecoin** — product name **Unera Stablecoin Portal** | Token stays **hUSD**. The existing UNERA wordmark SVG stays: this product keeps the Unera brand. |
| Humanity Centres / Centre / Centres | **Humanity Centers / Humanity Center / Centers** | US spelling, incl. the PoR "yield → Humanity Centers" block. |
| UYT | **Huma Points** | Earned by activity on Huma Platform. |
| UGT / "UNERA Governance" | **Impact Points** (issued by the Association, redeemed at Humanity Centers) | |
| Layer chips on the PoR page | "Stablecoin layer · Unera Stablecoin · hUSD" · "Consumer layer · Huma Platform · Huma Points" · "Association layer · Humanity Centers · Impact Points" | |
| Tab-title suffix `· UNERA hUSD` | `· Unera Stablecoin` | Canvas, app kit and auth kit. |

Legal/entity strings ("Unera Stablecoin Trust Company"), custody assurances ("Unera Stablecoin never takes custody of your keys") and issuer attributions on the docs and PoR pages follow the same mapping. Filenames were not changed — only visible text.

---

## 3. Transaction Tracker spec [Waiting UX]

The tracker is one component used identically on the fiat and crypto on-ramps, styled with the product's dark reserve tokens (`--gold`, `--teal`, `--up`, `--down`, `--panel`, `--ink2`, `--line`).

### 3.1 Layout order

1. Headline block (status icon → headline → sub-line → ETA chip + elapsed chip)
2. Calm travelling-value illustration (waiting states only)
3. "Amount adjusted" notice (crypto, when it applies)
4. Confirmation-depth bar (crypto, waiting states only)
5. Named stages
6. Reassurance block
7. "While you wait" rotating card
8. "What is happening?" expander
9. "Learn while you wait" micro-facts (4 cards)
10. Failure / delayed next-step box
11. Secondary + primary buttons
12. Demo controls (prototype only — delete before production)

### 3.2 States

| State | Trigger | Headline | Sub-line |
|---|---|---|---|
| `pending` | entering the status step | **Creating your hUSD** | Nothing is needed from you. You can leave this page. |
| `delayed` | `elapsed > 300 s`, or the demo control | **Taking a little longer than usual** | That's normal when the network is busy. Nothing to do — we'll keep going and tell you the moment it lands. Plus: "Still nothing after 30 minutes? Contact support with reference `HUSD-C8F3K2A`." |
| `failed` | backend failure | **We couldn't finish this one** | Nothing was minted and nothing was taken. Your USDC is untouched. Plus a "What to do next" box: retry, or support traces the deposit. |
| `done` | all stages complete | **{amount} hUSD is yours** | Now in your wallet 0x742d…3a8f on Ethereum. Success medallion animates in (`uRise`). |
| `adjusted` | crypto only, received amount ≠ ordered, within 5% | **{amount} hUSD is yours** + an "Amount adjusted" alert | "We received 4,910.00 USDC instead of 5,000.00 — within 5%, so we adjusted the order to match and minted 4,910.00 hUSD. No new order needed." |

The whole headline block is `role="status" aria-live="polite" aria-atomic="true"`, so every state change is announced once.

### 3.3 Copy — chips and timings

- ETA chip (waiting only): crypto **"Usually takes 2–5 minutes"**, fiat **"Usually takes 1–2 minutes"**.
- Elapsed chip: `0:07` under a minute, then `3 min`. On success it becomes `Took 4 min`. Tabular numerals; ticks once a second and keeps ticking while the user is on other screens.
- Delay threshold: `TX_DELAY_AFTER = 300 s`.
- Demo stage cadence: 1.3 s per stage in the canvas, 4 s per stage in the UI kit.
- "While you wait" rotates every 6 s across 3 cards.

### 3.4 Named stages (plain language, one human sentence each, every sentence says nothing is needed)

**Crypto**
1. **Deposit seen** — "We spotted 5,000.00 USDC arriving at your deposit address."
2. **Network confirmations** — "The Ethereum network is confirming the transfer. This is the slow part — nothing is needed from you."
3. **Compliance checks** — "A quick automatic check of your limit, quota and sanctions screening."
4. **hUSD minted to your confirmed wallet** — "Sent to 0x742d…3a8f on Ethereum · tx 0x8c…42a."

**Fiat**
1. **Payment received** — "$5,000.00 arrived by bank transfer · ref HUSD-8F3K2A" (card: "Your card payment cleared · Visa •••• 4242 · $5,000.00").
2. **Checks** — "A quick automatic check of your limit, quota and sanctions screening."
3. **Minting your hUSD** — "We create the hUSD and send it to your wallet."
4. **hUSD minted** — "Sent to 0x742d…3a8f on Ethereum · tx 0x8c…42a."

Colours: done = `--up` filled with a check, current = gold ring with a dot, upcoming = `--ink2` with `--mute` text.

### 3.5 Confirmation depth

Never in the headline. Secondary bar labelled **"Network is double-checking · 5 of 12"** with the line "Each check makes your deposit harder to reverse. Nothing is needed from you." Crypto only, hidden once resolved.

### 3.6 Reassurance block (three lines, verbatim)

- Your money is safe — the network is just slow, not your funds.
- You can leave this page. We'll email you and ring the bell when it's done.
- Nothing to do right now.

### 3.7 Engagement beyond text

- **Travelling value illustration** — CSS-only. A gold bead runs a 3.4 s loop along a rail between three nodes: *You send → Network → Your hUSD* (`@keyframes uTravel`). The page-level `prefers-reduced-motion: reduce` rule already collapses every animation to 0.01 ms, so the bead simply rests. `aria-hidden="true"`.
- **"While you wait"** — 3 rotating cards on what hUSD is for: *Send it anywhere, in seconds* · *Swap or spend without leaving crypto* · *Cash out 1:1, any time*. Dot indicators show position.
- **"What is happening?"** — one-click expander, `aria-expanded` toggled, everyday language, no DeFi jargon. Separate copy for the crypto and fiat paths.
- **"Learn while you wait"** — 4 micro-facts: *1 hUSD = 1 dollar* · *Confirmations, in plain English* · *Redeem any time* · *Proof, not promises*.

### 3.8 Persistence

- **Nav pending pill** — sits between the preview selector and the bell: pulsing dot + "hUSD pending · 2 min", gold; turns amber in the delayed state. Below 720 px the words collapse and only the dot + timer remain. Clicking it returns to the tracker with the stage intact.
- **Portfolio attention card** — same information as a full-width card immediately under the balance header, with a "Track it" button.
- **Bell item** — a synthesized notification ("Creating your hUSD" / "Purchase taking a little longer", with the live elapsed time) sits at the top of the feed while the purchase is in flight and cannot be dismissed; it disappears when the purchase resolves.
- Navigating away no longer tears down the flow: `go()` keeps the mint timers and stage while a pending transaction exists.

### 3.9 Demo controls

A "Demo" row at the bottom of the tracker jumps to **Delayed**, **Failed**, **Done** and (crypto only) **Amount adjusted**. Remove before production.

---

## 4. Crypto on-ramp changes [Waiting UX]

| Rule | Implementation |
|---|---|
| **USDC / USDT only** | Segmented "Pay with" row on the amount step: USDC and USDT selectable, ETH and BTC rendered as disabled dashed chips reading "ETH · Soon" / "BTC · Soon". `RATES` now holds only `{ USDC: 1, USDT: 1 }`. |
| **New first step: confirm the receiving wallet** | Step order becomes **Wallet → Amount → Review → Deposit → Status**. The wallet step lists every linked wallet (default = the connected one), badges Connected / Verify first, blocks unverified wallets, offers "Link another wallet" and an escape hatch to the cash path. Fiat keeps **Amount → Review → Pay → Status**. |
| **One permanent deposit address** | The address card moved out of Review into its own Deposit step. Copy: *"Your personal deposit address — send USDC/USDT here any time. It belongs to your account, never expires and never changes."* All "expires in 60 min" / "unique to this request" copy removed. |
| **Estimate vs actual** | Amount step labels the output "You'll receive (estimated)"; the rate reads "Reference rate · 1 USDC = 1.0000 hUSD" with no countdown; Review shows "Estimated hUSD" and "Estimated total". Warning everywhere that the final figure comes from the amount actually received on-chain, because exchanges deduct their withdrawal fee. |
| **1:1, auto-adjust within 5%, refund beyond** | Review shows a calm "How this works" list: *Always 1:1* · *This figure is an estimate* · *Small difference? We adjust it* (within 5%, no new order) · *Big difference? You choose* (refund to the sending address, user pays gas, authorised with a signed message). The Status screen carries the matching "Amount adjusted" state. |
| **Minimum 1,000** | `MIN_CRYPTO = 1000`. Inline error: "Minimum is 1,000 USDC per crypto purchase." Stated up front next to the asset picker. Fiat minimum unchanged at $10. |
| **No purchase fee on the crypto path** | The 0.10% fee applies to fiat only; crypto is a straight 1:1 exchange. |

---

## 5. Balance-card / hierarchy spec [Hierarchy]

### 5.1 Compact balance header

| Property | Value |
|---|---|
| Container | `--panel` on `--line`, `border-radius: 18px`, `padding: 1.15rem 1.5rem` |
| Measured height | **123 px** desktop (target ≤ 160 px), 225 px at 390 px wide where it wraps |
| Balance number | `2.5rem` (was 5rem), `--font-display` 700, tabular numerals, solid `--txt` — the gradient text fill is gone. `2.1rem` below 720 px, `1.85rem` below 460 px |
| Left, row 1 | Label "Your hUSD balance" + freshness chip ("Updated 16 s ago") + refresh button |
| Left, row 2 | Balance + `hUSD` suffix (`1rem`, gold) |
| Left, row 3 | One small meta line: network dot + name · wallet address + copy · "Proof of reserve" text link |
| Medallion | 48 px flat hUSD disc (was a 248 px animated 3D coin) |
| Right | **One** gold-filled primary CTA "Get hUSD"; "Redeem" is a ghost outline. The two extra pill buttons ("View activity", "Proof of reserve") are gone — Activity lives in the nav, PoR is a text link in the meta row |

### 5.2 Content order

1. Balance header (with its primary actions)
2. **What needs attention** — pending transaction card, then the account/service state banner. On the portfolio screen the global banner is suppressed and re-rendered here, so it is never shown twice.
3. Holdings by network + recent activity
4. Learn / proof — "What backs your hUSD" with a quiet link to Proof of reserve

Page padding tightened from `3rem` to `2rem` at the top.

### 5.3 Transactional forms

Single-column, `max-width: 480px` (was 520–540 px) on every Get-hUSD step. The amount input stays the hero of its step; token and network selectors are compact pills; one summary line; one button.

### 5.4 UI kit equivalent

`.bal-head` mirrors the same anatomy in the light Deep-Blue system: 48 px gold medallion, `2.4rem` balance, one meta line, "Issue hUSD" primary + "Redeem" ghost. The three competing KPI hero cards became a single quiet `.quiet-stats` strip (circulating supply · reserve ratio · last attestation) placed *after* the attention row.

---

## 6. Accessibility

- Tracker headline block is `role="status" aria-live="polite" aria-atomic="true"`; the "Amount adjusted" and failure notices are `role="alert"`.
- "What is happening?" toggles `aria-expanded`.
- The nav pending pill carries an `aria-label` with the elapsed time; the decorative illustration is `aria-hidden`.
- All new motion sits inside the existing `@media (prefers-reduced-motion: reduce)` reset that clamps animations to 0.01 ms in both files.
- Focus-visible outlines, forced-colors handling and 44 px minimum touch targets are inherited unchanged.

---

## 7. Verification

```
node + playwright, executablePath /opt/pw-browsers/chromium
1366×900 and 390×844
```

Clean (zero console errors, zero 404s) on: `UNERA hUSD Portal.dc.html`, `ui_kits/stablecoin-app/index.html`, `ui_kits/auth/index.html`, `guidelines/type-specimen.html`.

The two `components/**/**.card.html` gallery cards still 404 on `_ds_bundle.js` — that bundle is injected by the Claude Design host and is missing from a plain static server. Pre-existing and untouched by FE-207.

Screenshots (`screenshots/fe-207/`, `-desktop` and `-mobile` for each):

`01-portfolio-connected` · `02-get-crypto-step0-wallet` · `03-get-crypto-amount` · `04-get-crypto-review` · `05-get-crypto-deposit` · `06-get-crypto-status-pending` · `07-get-crypto-status-delayed` · `08-get-crypto-status-adjusted` · `09-get-crypto-status-done` · `10-get-fiat-status-pending` · `11-kit-dashboard` · `12-kit-dashboard-l2` · `13-kit-issue-crypto` · `14-kit-issue-status`

---

## 8. Open questions for PM

1. Refund flow — the copy promises an EIP-712-signed refund the user pays gas for. The signing screen itself is not designed yet; the existing wallet-signature gate can host it.
2. The "well outside 5%" notification wording is not final — the tracker currently only demonstrates the within-tolerance "Amount adjusted" state.
3. Bank-transfer reference codes are still per-request while crypto deposit addresses are now permanent. Worth confirming that asymmetry is intended.
