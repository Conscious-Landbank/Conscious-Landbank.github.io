# FE-207 · Huma rebrand · Transaction Tracker · Balance-card hierarchy

**Project:** Huma consumer web (`UNERA_Latest_Aug22`) · **Date:** 22 Aug 2026
**Brief:** `BRIEF-FE-207.md` §A (renames) · §B (waiting UX) · §C (hierarchy) · §D (deliverables)
**Jira:** FE-207 "UI/UX: update design for layer names and reduce user's cognitive [load]"

Every item below is tagged **[Rename]**, **[Waiting UX]** or **[Hierarchy]**.

Verified with headless Chromium over a local HTTP server: **38 pages, 0 console errors, 0 local 404s.**
Screenshots at 1366×900 and 390×844 in `screenshots/fe-207/`.

## 1. What an FE engineer needs to know first

| | |
|---|---|
| **New shared module** | `unera-pages/tx-tracker.css` + `unera-pages/tx-tracker.js`. The one waiting screen for every pending money movement. Do not fork it. |
| **New brand assets** | `assets/logos/huma-{black,white}-text{,-nav}.svg` and the same four in `unera-pages/NewLogo/` as `Huma {Black,White} Text{, Nav}.svg` |
| **New nav element** | `#txPendingPill`, first child of `.nav-right`, next to the bell. Driven entirely by `TxTracker.pill`. |
| **New page section** | `.attn-strip` (pending tx / KYC) on wallet and dashboard. `.bal-hero` was **REVERTED on 23 Aug**, see §4 |
| **Terminology contract** | `docs/UNERA-terminology-and-copy.md §0`: the full rename table and the deliberately-not-renamed list |
| **Two open decisions** | §7 below: the **HUMA governance token** name collision, and whether to rename code identifiers / support domains |

## 2. Rename mapping [Rename]

### 2.1 Brand text

| Old | New |
|---|---|
| UNERA / Unera (the consumer app) | **Huma** |
| Unera Platform · UNERA Platform · UNERA platform | **Huma Platform** |
| Stablecoin · Stablecoin Portal · UNERA Stablecoin | **Unera Stablecoin** · **Unera Stablecoin Portal** (token stays **hUSD**) |
| UNERA CAD · UNERA US Dollar | **Unera CAD** · **Unera US Dollar** (stablecoin layer) |
| Humanity Centres / Humanity Centre / Human Centres / Huma Centres | **Humanity Centers / Humanity Center** |
| Centres · CENTRES (nav) | **Centers · CENTERS** |
| UYT | **Huma Points** |
| "UNERA fee" · "Covered by UNERA" · "UNERA adds no markup" | "Huma fee" · "Covered by Huma" · "Huma adds no markup" |
| `<title>Wallet & Transactions - UNERA` | `<title>Wallet & Transactions - Huma` |
| `aria-label="UNERA Home"` · `alt="UNERA"` | `aria-label="Huma Home"` · `alt="Huma"` |

Applied to **110 files** by a word-boundary-aware transformer (not a blind sed): a candidate is skipped when it is adjacent to `[A-Za-z0-9_-]`, preceded by `/` or `@`, or followed by a `.ext`-style suffix. That is what protects `unera-pages/`, `NewUnera/`, `unera_paymentMethods_v1`, `UNERA_NOTIFICATION_CATALOG`, `.unera-checkmark`, `getCentre()`, `explore-centres.html` and `support@unera.org`.

### 2.2 Logo assets

| Old | New | Where |
|---|---|---|
| `assets/logos/unera-black-text-nav.svg` | `assets/logos/huma-black-text-nav.svg` | DS cards, templates, `Nav.jsx`, `thumbnail.html` |
| `assets/logos/unera-white-text-nav.svg` | `assets/logos/huma-white-text-nav.svg` | ″ |
| `assets/logos/unera-black-text.svg` | `assets/logos/huma-black-text.svg` | ″ |
| `assets/logos/unera-white-text.svg` | `assets/logos/huma-white-text.svg` | ″ |
| `unera-pages/NewLogo/Unera Black Text Nav.svg` (and the `-767d7d70` hashed twin) | `unera-pages/NewLogo/Huma Black Text Nav.svg` | every `unera-pages/*.html` nav |
| `unera-pages/NewLogo/Unera White Text Nav.svg` (and the `-c03133e7` twin) | `unera-pages/NewLogo/Huma White Text Nav.svg` | ″ |
| `unera-pages/NewLogo/Unera Black Text.svg` | `unera-pages/NewLogo/Huma Black Text.svg` | footers, receipts, e-mail preview |
| `unera-pages/NewLogo/Unera White Text.svg` | `unera-pages/NewLogo/Huma White Text.svg` | footers |

**How the wordmark was made.** No Huma logo exists yet, so the lockup is the existing teal arc device plus a **Huma** wordmark whose outlines were extracted from `fonts/TestFoundersGrotesk-Regular.otf` (the weight that matches the retired Unera wordmark: cap height 60.3 units, 48.9-unit `U`). It is drawn on the **same `viewBox="0 0 361.1 113.22"`**, with the wordmark ink starting at x = 138.65 and ending at x = 360.30 (the exact left and right edges of the old lockup) so `height:24px; width:auto` in the nav renders at an identical size. Four variants, black and white, nav and full. **Treat as an interim asset** until brand delivers a real mark.

The Unera lockups stay in `assets/logos/` and `unera-pages/NewLogo/`. They are the **issuer/stablecoin** brand and are still used by `brand-style-guide.html`.

### 2.3 Deliberately NOT renamed

| Kept | Why |
|---|---|
| `explore-centres.html`, `centre-detail.html`, `unera-pages/`, `docs/UNERA-*.md`, `screenshots/pages/` | file names; renaming breaks every inbound link and the brief says "only visible text changes" |
| CSS classes `.centre-pick*`, `.centres-grid`, `.unera-checkmark`, `.unera-notif__*`, `.uyt-pill` | internal identifiers, not user-facing |
| JS symbols `UNERA_DON`, `UNERA_NOTIFICATION_CATALOG`, `UNERA_CHECKMARK_SVG`, `getCentre`, `renderCentres`, `MAX_CENTRES`, `uyt: {…}` data keys | ″ |
| localStorage keys `unera_paymentMethods_v1`, `unera_activity_filter_presets_v1`, `unera_user_name` | renaming them silently wipes every prototype's saved state |
| `support@unera.org` / `.io` / `.ca` / `.finance`, `unera.com` letterhead | needs a real domain decision + DNS; see §7 |
| `unera-pages/brand-style-guide.html` | it **is** the Unera brand book ("Unera Stablecoin"), so it keeps the Unera lockup, title and copy |
| `UNERA Wallet (standalone).html` | a serialized export with UUID asset refs, not a servable page; text rebranded only, no hero work |

## 3. Transaction Tracker [Waiting UX]

### 3.1 Where it runs

| Flow | Page | Mount point | Trigger |
|---|---|---|---|
| Donate with crypto **and** by card | `donate.html` | `#txTrackerMount` inside `#stepProcessing` | `confirmDonation()` in `donate-flow.js` |
| Buy hUSD with fiat | `add-money.html` | `#txTrackerMount` inside the new `#step-status` | `showPurchaseStatus()`, called by `processTransaction()` |
| Swap | `exchange.html` | `#txTrackerMount` inside the new `#step-status` | `runSwapProcessing()` |

`exchange.html`'s modal `#processingOverlay` was **removed**: the ① Approve -> ② Swap chips survive verbatim as the tracker's first two stages, but they now live on the page, where the user can read, scroll and leave.

### 3.2 API

```js
const t = TxTracker.mount(hostEl, config);   // renders + starts
t.setOutcome('normal' | 'delayed' | 'failed' | 'done');
t.destroy();

TxTracker.pill.start({ label: 'Donation pending', href: '#main-content' });
TxTracker.pill.stop('done' | 'failed');      // resolves for 4s, then hides
```

`config` keys: `kind` (`donation` | `purchase` | `swap`), `journey {alt,a,b,c}`, `headline`, `eta`, `headlineDelayed`, `etaDelayed`, `headlineFailed`, `etaFailed`, `headlineDone`, `etaDone`, `delayedCopy`, `failCopy`, `stages[{title,sub,conf?}]`, `confirmations {target,label,everyMs}`, `reassure[]`, `wait[{eyebrow,title,body}]`, `explain[]`, `facts[]`, `support {label,href}`, `trackHref`, `trackLabel`, `retryLabel`, `retryHref`, `pill {label,href}`, `notify {title,message,ref,ctaUrl,ctaLabel}`, `timings {stages:[ms…], delayedAfter?}`, `devControls`, `onStage(i)`, `onFinish('success' | 'failed')`.

### 3.3 States, copy and timings

| State | Headline | Sub | Visual |
|---|---|---|---|
| **running** | "Your donation is on its way" / "Creating your hUSD" / "Swapping your hUSD for USDC" | "Usually takes 2–5 minutes" (donate) · "This may take a few minutes" (buy) · "Usually takes 1–3 minutes" (swap) · **live `m:ss` elapsed** | travelling-value illustration, current stage in Deep Blue with a spinner |
| **delayed** | "Taking a little longer than usual. That is normal when the network is busy. Nothing to do." | "Still working. We will finish this for you" | amber banner: "Networks get busy. Your money is safe and the donation is still queued. There is nothing to resend and nothing to pay again." + **Contact support** / **Track in history** |
| **failed** | "We couldn't complete this donation / purchase / swap" | "Nothing left your wallet. You can safely try again" | red banner, failed stage gets a ✕ marker, **Try again** + **Contact support** |
| **done** | "Donation delivered. Thank you" / "500.00 hUSD is in your wallet" / "USDC is back in your wallet" | "Completed" | all stages fin-up, tracker hands off to the page's receipt |

**Stages**

- *Donate, crypto:* Sent from your wallet -> Being confirmed by the network `(conf)` -> Checked by Huma -> Delivered to the Humanity Center
- *Donate, card:* Payment received -> Checks `(conf)` -> Routed to the Humanity Center -> Delivered
- *Buy (fiat):* Payment received -> Checks `(conf)` -> hUSD minted to your wallet -> In your wallet
- *Swap:* ① Approve hUSD -> ② Confirm swap -> Being confirmed by the network `(conf)` -> USDC landed in your wallet

Each stage carries one sentence that says what is happening **and** that nothing is needed from the user.

**Confirmation depth** is never in the headline. It is a secondary bar under the stages, shown only while a `conf: true` stage is current: "Network is double-checking · 4 of 12" (donate/swap, 12 confirmations, +1 per 700 ms) or "Running routine checks · 2 of 4" (buy, +1 per 900 ms).

**Reassurance block** (three rows, always): "**Your money is safe**. The network is slow, not your funds." · "You can leave this page. We'll email you and ring the bell when it's done." · "Nothing to do right now."

**"While you wait"** is a rotating card, 6 s per card, with clickable dots:

- *Donate:* the impact of this exact gift (pulled from `donation-data.js` `impactHints` for the selected center and the entered amount) -> Huma Points earned (**Direct donation 1.5×**, recurring **3×**) -> where it lands -> "Funds arrive instantly. Impact is verified on-chain."
- *Buy:* Donate from just $1 -> Send it anywhere in seconds -> Swap between stablecoins -> Huma Points (holding hUSD **1×**)
- *Swap:* what you will receive (**estimated**) -> "We adjust, you don't redo" -> where it lands -> Huma Points (trading **0.5×**)

Plus a **"What is happening?"** `<details>` expander written in everyday language (no DeFi jargon) and a rotating micro-fact line (5 s).

**Mock timings** (`timings.stages`, milliseconds per stage): donate `[3200, 4200, 3600, 800]`, buy `[3200, 4400, 3400, 800]`, swap `[2600, 3000, 4200, 800]`. `timings.delayedAfter` is available to flip to *delayed* automatically once the ETA is exceeded; the prototypes drive it from the dev pills instead so the state is reproducible.

**Dev controls** (in-memory, stripped for production): `Normal (default) · Taking longer · Failed · Done now`. *Taking longer* **holds**, which is the point: the user is meant to be able to walk away. `donate.html` also maps its existing outcome pills onto the tracker (`Awaiting confirmation` / `Timeout` -> delayed; `Payment failed` / `Order expired` / `Wallet rejected` / `Transaction reverted` -> failed -> the matching terminal receipt).

### 3.4 Persistent pending pill

```html
<a class="tx-pill" id="txPendingPill" href="#main-content" hidden>
  <span class="tx-pill-dot" aria-hidden="true"></span>
  <span class="tx-pill-text">Donation pending</span>
  <span class="tx-pill-time"></span>
</a>
```

First child of `.nav-right`, before the bell. `TxTracker.pill` shows it on start, refreshes "· just now -> · 2 min" every 15 s, and on finish flips it to *Transaction complete* (fin-up dot) or *Transaction failed* (red dot) for 4 s before hiding. Core sizing is **inlined in each page's `<style>`** as well as in `tx-tracker.css`, per the CLAUDE.md "nav is infrastructure" rule. Note the required `.tx-pill[hidden] { display: none }` pairing: the pill is `display:inline-flex`, which otherwise beats the UA `[hidden]` rule. The label is hidden below 560px, leaving dot + timer.

### 3.5 Bell notifications

- On mount the tracker fires `window.addNotification({ level: 'progressing', … })`, the same feed `notifications-bell.js` owns (`clb_notifications_v2`).
- A seed entry `up_don_pending` ("Donation pending · usually takes 2–5 minutes · nothing to do") was added to `notifications-bell.js` `DEFAULT`, and `n_tx_pending` to `shared/notification-catalog.js` `buildConsumerSeeds()`, so the pattern is visible in the bell without running a flow.

### 3.6 Huma Platform swap: estimated vs actual [Waiting UX]

`exchange.html` now stores **both** numbers (`appState.estimatedReceive`, `appState.actualReceive`, drift `±0.1%`) and the receipt shows three new rows before the transaction id:

- Estimated at review: `498.35 USDC`
- Actually received: `498.08 USDC` (fin-up)
- Difference: `−0.053% · adjusted automatically, no new order needed`

…followed by a calm note: *"Swaps are **estimated, not fixed**. The pool price can move by up to **±0.1%** between review and settlement. We adjust the amount you receive automatically; you never have to create a new order."*

### 3.7 Documented in the design system

- `ui_kits/consumer-app/transact-flows.card.html`: full tracker anatomy plus the delayed and failed variants and the estimated-vs-actual receipt (card viewport bumped to 1180×3400).
- `ui_kits/consumer-app/notifications-patterns.card.html`: the pending pill in all three states with usage rules (viewport 980×1060).

## 4. Balance hero + hierarchy [Hierarchy]

> **REVERTED on 23 Aug 2026, consumer app only.** Eric's "hero card / balance card is too large" feedback was about the Unera Stablecoin portal, so applying a balance hero to the consumer Wallet and Dashboard was over-reach. `.bal-hero` and its markup are gone from `wallet-enhanced.html` and `dashboard-enhanced.html`, the Balances section header, its show/hide toggle (hidden by default) and the four-tile `.quick-actions` row are back on the wallet, and the dashboard's `Buy Stablecoins` card is primary again. What stays from this section: the attention strip, the Impact & Huma Points strip, the "Your impact" placement below Recent Activity, and the Huma Points tile. Decision: Renol, 23 Aug 2026. The compact hero spec below still holds for the Unera Stablecoin portal.

New shared blocks, inlined into both pages so they stay self-sufficient: `.bal-hero`, `.attn-strip` / `.attn-row`, `.impact-strip`.

**Spec**

| Property | Value |
|---|---|
| Balance figure | `2.5rem` / `--font-display` / 700 / `-0.015em` / tabular numerals (was `3rem`, and a `5rem`-class hero elsewhere) |
| Layout | one row: medallion + label + amount + change chip + age chip on the left, actions on the right; `flex-wrap` |
| Meta line | one small line: `0x742d…3a8f · Ethereum · 4 assets` |
| Actions | exactly **one** primary (`Add money`, deep-blue filled) + ghost secondaries (`Send` `Swap` `Trade`, or `Wallet` `Donate` on dashboard) |
| Decoration | ≤ **44px** medallion (spec allows ≤ 56px). The 300px floating disc behind `.balance-card.total` and its `@keyframes float` were deleted |
| Measured height | **132px** desktop on both pages (target ≤ 160px); 248–281px at 390px wide where it stacks |
| Card padding | `.balance-card` `2rem -> 1.5rem`, `min-height: 200px` removed; `.balance-card.total` `3rem 2.5rem -> 1.75rem` |

**Order of the page**, both screens: balance -> primary actions -> **attention strip** (pending transaction + KYC) -> holdings / activity -> learn & impact. Since the 23 Aug revert the consumer order starts at the page title, then the attention strip; the balance order above applies to the Unera Stablecoin portal.

- `wallet-enhanced.html`: the KYC banner moved out of the top of `<main>` into the attention strip (and lost its container-bleeding negative margins there); a new `Impact & Huma Points` strip (Huma Points 1,284 with the earn rates · Donated $5,240 · Lives impacted 1,240+) was added last. Two items here were **reverted on 23 Aug**: the four-tile `.quick-actions` grid is back under the Balances header, and `balancesHidden` is `true` again so balances start hidden behind "Show Balances".
- `dashboard-enhanced.html`: attention strip; the 4-card impact grid **moved below Recent Activity** and is now titled "Your impact"; its *Total Portfolio* tile was replaced by a **Huma Points** tile (1,284, +96 this month, with the full multiplier table in its detail modal). **Reverted on 23 Aug**: the `Buy Stablecoins` action card carries `primary` again, because with the hero gone the screen needs its one primary CTA back.
- `UNERA Wallet (standalone).html` was **not** restructured. It is a serialized single-file export whose assets are UUID references, not a page the app serves. Text was rebranded; the hero work belongs in `wallet-enhanced.html`, which that file was exported from.

## 5. File-by-file

### New

| File | What |
|---|---|
| `unera-pages/tx-tracker.css` | Transaction Tracker styles + the nav pending pill. Token-only, solid fills, `[hidden]` pairings, full `prefers-reduced-motion` collapse, every `var()` carries a fallback so it is correct on a page with a narrower token set. **[Waiting UX]** |
| `unera-pages/tx-tracker.js` | The controller: render, stage machine, elapsed timer, confirmation counter, card/fact rotation, delayed/failed/done, nav pill, bell notification, dev pills. **[Waiting UX]** |
| `assets/logos/huma-{black,white}-text{,-nav}.svg` | Interim Huma lockups, same viewBox and ink extents as the Unera lockups. **[Rename]** |
| `unera-pages/NewLogo/Huma {Black,White} Text{, Nav}.svg` | Same four files under the names the pages reference. **[Rename]** |
| `CHANGES-FE-207.md` | This hand-off. |
| `screenshots/fe-207/*.png` | 20 captures: 10 views × 1366×900 and 390×844. |

### Substantially changed

| File | What | Tag |
|---|---|---|
| `unera-pages/donate.html` | tracker CSS/JS + inline pill sizing; `#txPendingPill` in the nav; `#stepProcessing` spinner/`#txSeq` replaced by `#txTrackerMount` | [Waiting UX] [Rename] |
| `unera-pages/donate-flow.js` | `chips()` and the hand-rolled timer chain removed; `trackerConfig()` + tracker-driven `confirmDonation()`; outcome pills mapped onto tracker states; `pointsFor()` applies the **1.5×** direct-donation multiplier on the receipt and in the bell | [Waiting UX] [Rename] |
| `unera-pages/add-money.html` | new `#step-status` step (added to `stepContents`); `showPurchaseStatus()`; tracker config for the fiat purchase; pending pill; "Choose which HUMA stablecoin" copy bug fixed | [Waiting UX] [Rename] |
| `unera-pages/exchange.html` | `#processingOverlay` removed; new `#step-status`; `runSwapProcessing()` rewritten onto the tracker with the Approve/Swap chips as stages; receipt gains estimated / actual / difference + the ±0.1% note; pending pill | [Waiting UX] [Rename] |
| `unera-pages/wallet-enhanced.html` | `.attn-strip`, `.impact-strip`; KYC banner relocated; decorative disc removed. The `.bal-hero`, the removal of the quick-action grid and the visible-by-default balances were **REVERTED on 23 Aug** | [Hierarchy] [Rename] |
| `unera-pages/dashboard-enhanced.html` | `.attn-strip`; impact grid moved below activity and re-titled; Huma Points tile + detail entry. The `.bal-hero` and the demoted Buy card were **REVERTED on 23 Aug** | [Hierarchy] [Rename] |
| `unera-pages/notifications-bell.js` | `up_don_pending` seed | [Waiting UX] |
| `unera-pages/shared/notification-catalog.js` | `n_tx_pending` consumer seed | [Waiting UX] |
| `unera-pages/governance.html` | de-circularised the HUMA-token copy (see §7) | [Rename] |
| `unera-pages/_all-screens.html` | the 42 `screenshots/pages/*.png` thumbnails were 404ing on every load (the capture folder is not in the repo); replaced with a CSS-only name tile, no requests | fix |
| `ui_kits/consumer-app/transact-flows.card.html` | Transaction Tracker + swap-receipt documentation | [Waiting UX] |
| `ui_kits/consumer-app/notifications-patterns.card.html` | pending-pill documentation | [Waiting UX] |
| `docs/UNERA-terminology-and-copy.md` | new **§0 rename table** + the three-layer model at the top | [Rename] |
| `CLAUDE.md` | naming callout in the persona; new **§4b** (Transaction Tracker) and **§4c** (balance hero + hierarchy); three new checklist rows | [Rename] [Waiting UX] [Hierarchy] |
| `skills/build-or-edit-a-page.md` | tracker step in the build recipe + hero check in the trap-check list | [Waiting UX] [Hierarchy] |
| `readme.md`, `SKILL.md` | logo paths and the Huma/Unera split | [Rename] |
| `_ds_manifest.json`, `thumbnail.html` | brand text + the two bumped card viewports | [Rename] |

### Text-only rebrand

Every other modified file is a mechanical `[Rename]`: the remaining `unera-pages/*.html`, `components/**`, `guidelines/**`, `templates/**`, `tokens/**`, `styles.css`, `ui_kits/**`, `docs/**`, `skills/**`, `MERGE-AUDIT.md`, `_ds_bundle.js`, `UNERA Wallet (standalone).html`.

## 6. Verification

- Served the folder over `python3 -m http.server`; loaded **38 pages** in headless Chromium (Playwright) at 1366×900 with a logged-in session seeded into `localStorage` the way `js/legacy/auth-flow.js` expects (`isLoggedIn`, `userName`, `kycStatus`, `walletAddress`), so `dashboard-*.html` no longer bounce to `login_2.html`.
- 0 console errors, 0 local 404s. Off-host requests (Unsplash photos, unpkg React/Babel in the DS template) are stubbed by the sandbox, which has no outbound network, and those failures are environmental, not page defects.
- Measured `.bal-hero` height live: **132px** on both wallet and dashboard at 1366×900. That hero was removed from both consumer pages on 23 Aug. The measurement is the spec for the Unera Stablecoin portal.
- Screenshots in `screenshots/fe-207/`, each at both viewports:
  `01-wallet-balance-hero` · `02-dashboard-balance-hero` · `03-donate-tracker-pending` · `04-donate-tracker-delayed` · `05-donate-tracker-done-receipt` · `06-nav-pending-pill` · `07-add-money-status-tracker` · `08-exchange-status-tracker` · `09-exchange-receipt-estimated-vs-actual` · `10-explore-centres`.

## 7. Decisions still needed

1. "HUMA" the governance token vs "Huma" the platform. The app already ships a governance token literally named **HUMA** (`wallet-edge.html` portfolio row and Earn-More modal, `governance.html`, `instructions.html`, the two KYC dashboards, "+25 HUMA earned" activity rows). After this rebrand the two collide. I did **not** silently rename the token; I only de-circularised the copy ("Huma Platform governance is powered by the **HUMA governance token**, issued by an independent governance entity"). Product needs to pick: rename the token, or always qualify it as "the HUMA governance token".
2. Domains and support addresses. `support@unera.org / .io / .ca / .finance` and the `unera.com` letterhead are unchanged. They need a real domain decision before the copy can move.
3. Code identifiers. CSS classes, JS symbols and localStorage keys still say `unera` / `centre` / `uyt`. Safe to leave (nothing user-facing), but if the team wants them clean it is a separate mechanical ticket. Do it in one pass with tests, not piecemeal.
4. The Huma wordmark is interim. It is TestFoundersGrotesk Regular converted to outlines on the old lockup's geometry. It is deliberately conservative so nav sizing is untouched; it is not a designed mark.
5. `brand-style-guide.html` kept the Unera identity because it documents the Unera Stablecoin brand. If Huma needs its own brand book, that is a new page, not an edit to this one.
6. **`screenshots/pages/*.png`** (the `_all-screens.html` thumbnails) were never committed. They are now CSS name tiles. If the team wants real thumbnails back, regenerate them into `screenshots/pages/` and restore the `<img>`.
