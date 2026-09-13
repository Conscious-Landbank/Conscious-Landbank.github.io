# CHANGES — FE-208 · Humanity Centers & Donation design update

**Ticket:** FE-208 "UI/UX - Update design of HC and Donation features" (Jira, Minh, READY)
**Date:** 22 Aug 2026 · **Baseline:** git `b364bdc` (FE-207) · **Not committed.**

**Specs applied (fetched live from Confluence, both revised 21 Aug 2026):**

| Doc | Page ID |
|---|---|
| Huma Platform – Humanity Centers | `88768526` |
| Huma Platform – Donation | `74579981` |
| Donation Value Proposition (business page) | via FE-208 brief §A |

**Read first:** `docs/FE-208-audit.md` — the requirement-by-requirement gap table this work closes (45 Met / 37 Partial / 16 Missing at baseline).

---

## 1. The five things that actually changed the product

1. **The processing fee now exists.** DON-DASH-08 / AC-DON-07 require `total charged = donation amount + processing fee`, shown before confirmation. The baseline had no fee anywhere and told fiat donors "Huma fee — None". Every review, live summary, success receipt and history detail now itemises **Donation amount → Processing fee (+) → Conversion fee (when applicable) → Network fee → Total charged**.
2. **The minimum is $1, not $5.** `MIN_USD` was hardcoded to 5 and the copy said "$5 and $50,000", contradicting DON-DASH-09, AC-DON-08 and the value proposition's headline "micro-donations from $1".
3. **The crypto model now matches the 21 Aug settlement table.** USDC/USDT settle **directly** to the Humanity Center multisig; BTC/ETH are **converted to USDC or USDT** by the Crypto Swap Worker on the better Uniswap route. The baseline offered `hUSD/USDC/USDT/ETH`, claimed every asset was "converted to USD", had no BTC, no route comparison, no conversion fee, no destination type and no `conversion_pending`.
4. **The two options are named as the spec names them** — "Donate by Fiat" / "Donate by Crypto", not "Card" / "Crypto".
5. **All 14 §6.3 error strings are now verbatim** and served from one place: `UNERA_DON.ERR` in `donation-data.js`. Nothing retypes them.

---

## 2. Changed files

| File | Type | What changed |
|---|---|---|
| `unera-pages/donation-data.js` | **Data layer — largest change** | Added the §7.1 HC fields (`status` enum, `city`, `category`, `slug`, `location`) via a normalisation pass over the 12 seeded centres; made `hc-hanoi` `livesImpacted: null` to prove the "Coming soon" path and `hc-dhaka` `status:'suspended'`. Added `SETTLEMENT` (multisig address + label, fiat account label, network, explorer), reordered `BALANCES` to USDC → USDT → BTC → ETH with a `settles: direct\|converted` flag, added BTC pricing, added `FEES` + `processingFee()` + `conversionFee()`, added `FIAT` currencies + `fmtCcy()`, added `uniswapQuote()` (compares USDC vs USDT routes, returns the better), added `HP_STATE` + `hpChip()` for the five reward states, added the verbatim `ERR` catalogue, added `MIN_USD = 1`. Extended `HISTORY` rows with `fee / conversionFee / totalCharged / settlementAsset / settlementAmount / destination` and added two rows: a **non-USD fiat (EUR)** donation and a **BTC conversion-pending** donation. Added `awaiting_signature`, `submitted`, `conversion_pending`, `rejected` to `STATUS_META`. |
| `unera-pages/donate-flow.js` | **Flow controller — largest change** | $1 minimum from `D.MIN_USD`; fiat currency selection with rate + USD equivalent; the whole fee model (`feeUSD` / `convFeeUSD` / `totalChargedUSD`); Uniswap quote wiring + attribution line; asset ordering, tags and BTC support; review rebuilt (settlement asset, destination type, wallet address, network + TBD, fiat "not converted to crypto"); all validation and terminal copy switched to `D.ERR`; tracker stages rebuilt for DON-CRYPTO-07 (**Waiting for your signature → Submitted → Awaiting confirmation → Converting to USDC/USDT → Delivered**, conversion stage only for convertible assets); new `conversion` outcome + conversion-pending terminal; success receipt now carries fees, settlement asset, destination type, txHash + explorer, receipt status and Huma Points state; `pointsFor()` replaced by `hpFromService()` so the FE presents a service value instead of computing rules (DON-HP-03); active-HC-only picker; suspended-HC deeplink guard; multi-HC split gated behind `?multi=1`. |
| `unera-pages/donate.html` | Markup | Method labels + subtitles; fiat currency selector + OQ-02 TBD note; Uniswap quote line; suspended-HC banner; service-unavailable banner; gate headings made verbatim (trailing full stops matter); amount hint `$1`; multi-toggle hidden by default with a comment naming the §1.4 scope change; page subtitle "by fiat or by crypto". |
| `unera-pages/donations.html` | Markup + logic | Hero rewritten to the value proposition (positioning line + six items: publicly auditable, from $1, hUSD 1:1, receipts tied to the transaction ID, no bank required, dual funding) plus the Impact Points / Swiss Association footnote; new **"How your giving multiplies"** section with all six streams and their multipliers, visible to public visitors; Huma Points card now models **estimated / pending / confirmed / unavailable** (and the "earneds" typo is gone); balance card lists only the supported donation assets with Direct / Converted tags and a "Last updated" line; loading skeletons; **Donate CTA now targets one selected active HC** via a picker. |
| `unera-pages/explore-centres.html` | Markup + logic | HC-DIR-01 enforced — the "Include paused" status filter is **deleted**, the list is active-only; status filter replaced by a **data-driven category filter**; cards gained city + country and a category chip; lives impacted falls back to "Coming soon"; login prompt now carries a `?next=` return URL; hero footnote carries the OQ-01 TBD; hero copy corrected (no "converted to USD"). |
| `unera-pages/centre-detail.html` | Markup + logic | Status enum with **Suspended / Inactive** demo states and status-named banner copy; CTA disabled + `aria-disabled`; location shows city + country + category chip; "**Metrics unavailable**" fallback on both metric cards and the trend chart; a suspended centre no longer shows live inflow in the period chart; settlement row relabelled to the Humanity Center multisig wallet; login prompt carries the `?next=` return URL. |
| `unera-pages/donation-history.html` | Markup + logic | Rows show the **settlement asset** and non-USD original amounts; conversion-pending label; detail view rebuilt for DON-HIST-04 (donation ID, HC, status, original amount, rate, USD value, **processing fee**, conversion fee, **total charged**, settlement asset + amount, **destination type**, wallet address, txHash + explorer, Huma Points state, receipt); receipt-unavailable copy verbatim; source/status filter labels corrected. |
| `unera-pages/donation-shared.css` | Styles | New tokens-only blocks: `.hc-card-loc`, `.hc-cat-chip`, `.hc-stat-soon`, `.tbd-tag` / `.tbd-note` / `.don-hero-foot`, `.vp-grid` / `.vp-item`, `.stream-grid` / `.stream-card` / `.stream-mult`, `.asset-tag`, `.summary-row-note`, `.quote-line`, `.ccy-select` / `.ccy-chip`, `.uyt-pill.is-*`, `.hc-suspended-badge`, `.dir-select`. No gradients, no hardcoded hex outside the existing token set. |
| `unera-pages/notifications-bell.js` | Notifications | Added the six §4.3 donation lifecycle seeds (`up_don_submitted / awaiting / completed / receipt / points / failed`) and a **seed-version merge** so an existing stored feed picks them up without losing read state. |
| `unera-pages/shared/notification-catalog.js` | Notifications | Same six events for the notification-centre catalog; retired the CTC/"Lagos Center" legacy donation seeds; catalog `VERSION` 2 → 3. |
| `docs/FE-208-audit.md` | **New** | The gap table this work closes, plus the open questions carried as visible TBD. |
| `docs/UNERA-terminology-and-copy.md` | Doc | New **§10 Donation copy contract** — required terms, banned vocabulary, fee presentation order, status labels, Huma Points states, receipt states, the verbatim §6.3 table, and the approved value-proposition lines. |
| `docs/test-cases-human-centres-donation.md` | Doc | New **Suite 13** — 13 sub-suites, ~70 cases covering the fee model, $1 minimum, method naming, non-USD fiat, settlement/Uniswap routing, HC status enum, login return path, value proposition, Huma Points states, history detail, notifications, the remaining §6.2 states, and the multi-HC scope conflict. |
| `CLAUDE.md` | Doc | §0 pointer to the FE-208 audit, the two binding rules (fee on top, $1 minimum) and the `UNERA_DON.ERR` single source. |
| `screenshots/fe-208/` | **New** | 45 screenshots, 1366×900 and 390×844. |

---

## 3. Requirement → screen map

| Requirement | Where it now lives |
|---|---|
| HC-DIR-01 active only | `explore-centres.html` — status filter removed, `ACTIVE` list is the only source |
| HC-DIR-02 card fields + "Coming soon" | `explore-centres.html` `card()`; proven by `hc-hanoi` |
| HC-DIR-03 search + data-driven filters | `#dirSearch`, `#countryDD`, `#categoryDD` (from `D.categories()`) |
| HC-DIR-05 loading / empty / error | `#dirStatePills` → skeletons, empty state, `#unavailableBanner` |
| HC-DETAIL-02 name/overview/location/media | `centre-detail.html` hero + `#hcCountry` (city, country, category) + 6-image gallery |
| HC-DETAIL-03 metrics + fallback | `#statTotal` / `#statLives` → "Metrics unavailable" / "Coming soon" |
| HC-DETAIL-04 program highlights | `#programList`, `#fundBars`, `#milestoneList` |
| HC-DETAIL-05 Donate CTA with HC prefilled | `#donateCta` → `donate.html?hc=<id>` |
| HC-DETAIL-06 suspended → CTA disabled + safe message | `#inactiveBanner` + disabled `#donateCta`; demo pills Suspended / Inactive |
| HC-DETAIL-07 no internal notes | Public trust card only — verified by assertion |
| Flow 5.1 login → return with HC | `#loginReturnBtn` `?next=donate.html%3Fhc%3D<id>` on both directory and detail |
| Flow 5.2 / AC-DON-02 two options | `#methodFiat` "Donate by Fiat" · `#methodCrypto` "Donate by Crypto" |
| DON-DASH-01…07 | `donations.html` — hero, summary cards, recent list, featured centers, minimal balance, HC picker |
| DON-DASH-08 fees on top | `#reviewCostRows` + `#amountLive` + success receipt + history detail |
| DON-DASH-09 $1 minimum | `validateAmount()` → `D.ERR.outOfRange()` |
| DON-FIAT-02 review fields | `#reviewOrderRows` / `#reviewCostRows` |
| DON-FIAT-03 defined account, no crypto conversion | Destination row + note |
| DON-FIAT-04 non-USD | `#ccySelect` → original amount, rate, USD value, "Charged to your card" |
| DON-CRYPTO-01 asset ordering | `renderTokens()` — USDC, USDT, BTC, ETH with Direct / Converted tags |
| DON-CRYPTO-02 Uniswap quote | `#quoteLine` + `D.uniswapQuote()` |
| DON-CRYPTO-03 review fields | Settlement asset, destination type, wallet address, network, all fees |
| DON-CRYPTO-04/05/06 settlement | Direct for USDC/USDT; "Converting to USDC/USDT" stage + conversion fee for BTC/ETH |
| DON-CRYPTO-07 states | Tracker stages + `conversion` outcome + conversion-pending terminal |
| DON-HIST-02/03/04/05 | `donation-history.html` rows, filters, detail modal, receipt states |
| DON-HP-01/02/03 | `hpChip()` states on dashboard, success screen and history detail; no FE rule maths |
| §6.2 states | Directory pills, donations data pills, donate blocker pills (incl. Service unavailable), tracker |
| §6.3 error copy | `UNERA_DON.ERR` — 14/14 verbatim |
| §4.3 notifications | 6 seeds in the bell + catalog; runtime events on submit / awaiting / complete / receipt / points / fail |
| Value proposition §A | `donations.html` hero `vp-grid` + `#streamGrid` |

---

## 4. New states and copy introduced

**New UI states**

- Directory: category-filtered result set (loading / empty / error already existed).
- HC detail: **Suspended**, **Inactive**, **Metrics unavailable**; a paused centre's trend chart reads "No new donations".
- Donate flow: **Service unavailable** (page banner + disabled Review), **suspended-HC deeplink** guard on step 1, **Huma Points unavailable**, **Conversion pending** (tracker stage *and* terminal).
- Tracker: **Waiting for your signature**, **Submitted to the network**, **Converting to USDC/USDT** (convertible assets only).
- Donation page: **Loading** skeletons; Huma Points **Estimated / Pending / Confirmed / Unavailable**.
- History: **Conversion pending** rows; settlement asset "Not settled yet".

**New copy rules** — captured in full in `docs/UNERA-terminology-and-copy.md §10`. The two that will bite a future edit:

- Crypto is converted to **USDC or USDT**, never "to USD". USD is the *reporting* value. Fiat is **never** converted to crypto.
- §6.3 strings are verbatim. Reassurance is appended **after** the string, never spliced into it.

---

## 5. Verification

Local `python3 -m http.server` on `:8208`, Chromium via Playwright, session seeded the way `js/legacy/auth-flow.js` expects (`isLoggedIn`, `emailVerified`, `kycStatus=completed`, user fields) plus a seeded `unera_paymentMethods_v1` card so the fiat path is reachable.

- **99 / 99 DOM assertions pass** across HC-DIR, HC-DETAIL, flows 5.1–5.3, DON-DASH, DON-FIAT, DON-CRYPTO, DON-HIST, DON-HP, §6.2, all 14 §6.3 strings and the §6.4 banned-word scan.
- **Zero local HTTP ≥ 400** on every touched page.
- **Zero genuine console errors.** The console log is non-empty only because the harness deliberately aborts outbound requests (no egress in this environment), so the Unsplash card photos report `net::ERR_FAILED`. Those are the seed data's external image URLs, unchanged by this ticket — nothing else errors.
- **45 screenshots** in `screenshots/fe-208/` at 1366×900 and 390×844: directory (default / loading / empty / error / filtered), HC detail (active / suspended), donations dashboard, donate fiat (amount / review / EUR review / minimum validation), donate crypto (amount / USDC review / BTC review), tracker converting, conversion-pending terminal, success terminal, history list and three detail variants (receipt available / conversion pending / receipt unavailable), plus the notification bell.

---

## 6. Open questions left as TBD — **please rule on these**

| # | Question | Current design | Who decides |
|---|---|---|---|
| **1** | **Multi-HC split.** Donation §1.4 now lists "Multiple-HC donation allocation in a single transaction" as **out of scope**, while the shipped build had a split toggle and test cases TC-CRY-27→29 still cover it. | Default is **single-HC**. The split UI is retained behind `?multi=1` so the existing tests can still run. **Nothing was deleted.** | Product — retire it, or put it back in the spec |
| **2** | **Processing-fee schedule.** The spec mandates the fee but sets no rate. | Prototype placeholders, visibly labelled: card 2.9% + $0.30, crypto 1.0%, conversion 0.30%. | Finance / Payment Rail |
| **3** | **hUSD as a donation asset.** §1.7's settlement table lists only `USD_FIAT / USDC / USDT`, but the value proposition markets "$1 minimum in hUSD". | hUSD **removed** from the donate asset list; still shown in the wallet pill and in value-proposition copy. | Product / Tokenomics |
| **4** | **OQ-01** — anonymous on-chain donations in public HC totals? | Directory hero carries a visible `TBD` footnote. | Product / Legal / Data |
| **5** | **OQ-02** — MVP fiat currencies. | USD + EUR / GBP / VND demonstrative set, labelled `TBD`. | Product / Finance |
| **6** | **OQ-03** — approved networks for USDC/USDT/BTC/ETH. | Network row on the crypto review carries a visible `TBD`. | Product / Architecture |
| **7** | **OQ-04** — Huma Points state on success only, dashboard only, or both? | **Designed for both**, as the brief instructs. Flagged as duplication pending a decision. | Product / Tokenomics |
| **8** | **HC OQ-03** — should a suspended HC's detail page stay reachable by direct link, or return unavailable? | Stays reachable with a disabled CTA, per §6.2 ("if detail page is opened directly"). | Product / Compliance |
| 9 | **Per-centre wallet addresses.** The seed data gives each HC its own `wallet`, but §1.7 defines a **single defined multisig** for all crypto settlement. | UI now shows the **shared multisig**; the per-HC `wallet` field is left in the data untouched. | Architecture |
| 10 | **`requires_resolution` status.** Modelled in `STATUS_META` and named in DON-FIAT-05, but no flow produces it. | Left unreachable — no user journey in the spec reaches it. | Product |

---

## 7. Not done / out of scope

- **Real receipt PDFs.** The download button is still a prototype alert (`donation_receipts.pdf_url` is a backend concern).
- **Contrast re-measurement.** Structural a11y is in place (skip link, focus rings, live regions, keyboard-operable dropdowns, status never by colour alone, `aria-disabled` on the blocked CTA), but WCAG AA contrast ratios were not re-measured for the new chips — worth a pass before hand-off to QA.
- **Cross-device / screen-reader verification.** Still deferred, as noted in the test-case doc's earlier execution logs.
- **`purchase-receipt.html`** was reviewed and left untouched — it belongs to the stablecoin purchase flow, not donations.
