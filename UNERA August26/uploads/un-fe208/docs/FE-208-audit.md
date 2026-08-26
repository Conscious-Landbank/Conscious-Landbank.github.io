# FE-208 — Gap audit: Humanity Centers & Donation

**Ticket:** FE-208 "UI/UX - Update design of HC and Donation features" (Jira, Minh, READY).
**Sources of truth (fetched live, 22 Aug 2026):**

- Confluence **Huma Platform – Humanity Centers**, pageId `88768526` (Eric, modified 21 Aug) — HC-DIR / HC-DETAIL / HC-SYNC / HC-CRUD, §5 flows, §6.2 states, §7 data model, §8 AC-HC.
- Confluence **Huma Platform – Donation**, pageId `74579981` (Eric, modified 21 Aug) — DON-DASH / DON-FIAT / DON-CRYPTO / DON-HIST / DON-HP, §5.1–5.5 flows, §6.2 states, §6.3 error copy, §6.4 copy rules, §7 data model, §8 AC-DON, §9.2 open questions.
- Business page **Donation Value Proposition** (via FE-208 brief §A) — positioning, six multiplier streams, key features, Huma Points multipliers.

**Build audited:** `unera-pages/` at git `b364bdc` (FE-207).
**Legend:** **Met** = shipped and matches the spec · **Partial** = present but incomplete/wrong wording · **Missing** = absent.

---

## 0. Headline findings

1. **The processing fee does not exist anywhere in the product.** DON-DASH-08 and AC-DON-07 require *"total charged = donation amount + processing fee"* on every review screen. `donate-flow.js` renders `row('Huma fee', 'None')` for fiat and no processing fee at all for crypto. This is the single biggest gap — it touches fiat review, crypto review, success receipt, history detail and the data model.
2. **The minimum is wrong.** DON-DASH-09 / AC-DON-08 say **$1 USD**; `donate-flow.js` hardcodes `MIN_USD = 5` and the hint copy says "between $5 and $50,000".
3. **The crypto asset model predates the 21 Aug settlement table.** §1.7 + DON-CRYPTO-01/04/05 define USDC/USDT direct-to-multisig, and BTC/ETH **converted to USDC or USDT** via the Crypto Swap Worker using the better **Uniswap** route. The build offers `hUSD, USDC, USDT, ETH`, treats every asset as "converted to USD", has no BTC, no Uniswap attribution, no conversion fee, no `conversion_pending` state and no destination-type row.
4. **Method labels are not the spec's labels.** §5.1 step 3 and AC-DON-02 name the two options **"Donate by Fiat"** and **"Donate by Crypto"**. The build says "Card" / "Crypto".
5. **Only 4 of the 14 §6.3 error strings are verbatim.** Several are close-but-wrong ("Unable to complete this **action**" vs "this **donation**"), and the conversion, timeout and receipt strings are absent.
6. **Spec conflict — multi-HC donation.** Donation §1.4 now puts *"Multiple-HC donation allocation in a single transaction"* **out of scope**; §1.4 In-Scope reads *"Single-HC donation flow: one donation targets one selected active HC."* The build ships a "Split one donation across multiple centers" toggle (added under an earlier PRD revision; test cases TC-CRY-27→29 still reference it). **Flagged, not silently deleted** — see §8 Open questions.

---

## 1. Humanity Centers — Directory (§3.1)

| ID | Requirement (abridged) | Status | Page / evidence |
|---|---|---|---|
| HC-DIR-01 | Public directory lists **all active** HCs; inactive/suspended **must not appear** | **Partial** | `explore-centres.html` defaults to `fStatus='active'`, but the status dropdown offers **"Include paused"** which surfaces suspended HCs in the public directory — a direct HC-DIR-01 violation. Cards even render a "Paused" badge. |
| HC-DIR-02 | Card shows name, primary image, country/location, total donated, lives impacted; **"Coming soon"** fallback | **Partial** | `card()` renders name, hero photo, country tag, `Total donated`, `Lives impacted`. **No city** (§7.1 `city`), and `livesImpacted` is never null in `donation-data.js`, so the "Coming soon" fallback path is unreachable/unproven. |
| HC-DIR-03 | Search by name **and filtering by geography or category**, **data-driven** | **Partial** | Name search ✔ (`#dirSearch`). Country filter ✔ (derived from data). **Category filter missing entirely** — `donation-data.js` has no `category` field. |
| HC-DIR-04 | Selecting a card navigates to the HC detail page | **Met** | "View details" → `centre-detail.html?hc=<id>`. |
| HC-DIR-05 | Clear **loading / empty / error** states | **Met** | `dirStatePills` drive skeletons (`.sk-card`), the "No active Humanity Centers right now" empty state, and a retry-friendly `#unavailableBanner` with no internals. |
| HC-DIR-06 | Scannable, comparable, uncluttered cards | **Met** | Uniform `.hc-card` geometry, two-metric `.hc-card-stats`, one primary + one secondary action. |

## 2. Humanity Centers — Detail page (§3.2)

| ID | Requirement (abridged) | Status | Page / evidence |
|---|---|---|---|
| HC-DETAIL-01 | Public detail page per active HC, from directory **and direct link** | **Met** | `centre-detail.html?hc=` resolves via `D.getCentre()`. |
| HC-DETAIL-02 | Name, overview, mission/description, **location**, media (hero + gallery) | **Partial** | Name/lead/about/hero/6-image gallery ✔. **Location is country only** — no `city`, no category. |
| HC-DETAIL-03 | Public total donated + lives impacted; cached; **fallback when unavailable** | **Partial** | Both metrics render; `statsOk=false` shows "Statistics unavailable". But total donated degrades to a bare em-dash and the copy is "Donation statistics are temporarily delayed", not a **"metrics unavailable"** fallback tied to the metric cards themselves. |
| HC-DETAIL-04 | Program highlights / focus areas | **Met** | `#programList` from `programsDetail`, plus `fundUse`, `milestones`, `outcomes`. |
| HC-DETAIL-05 | Clear Donate CTA routing into the donation flow **with HC prefilled** | **Met** | `#donateCta` → `donate.html?hc=<id>`; `donate-flow.js` reads `D.qs('hc')` into `selected`. |
| HC-DETAIL-06 | Inactive/suspended HC opened by direct link → **CTA disabled + safe message** | **Partial** | CTA disables and `#inactiveBanner` shows, driven by `hc.active`. But the data model has no `status` enum (§7.1 `active/suspended/inactive/deactivated`) — only a boolean — so "suspended" cannot be distinguished from "inactive", and the demo pill is labelled "Inactive / paused" only. |
| HC-DETAIL-07 | No internal governance / compliance / operational notes | **Met** | Only public trust items (charity registration number, on-chain traceability, audit statement). No compliance codes, no operator notes. |

## 3. HC status handling & flows (§3.3, §5.1, §5.2)

| Item | Status | Evidence |
|---|---|---|
| HC-SYNC-02 status enforced consistently across directory / detail / donation routing | **Partial** | Directory can show paused HCs; `donate-flow.js` `renderCentres()` disables inactive rows ✔; detail disables CTA ✔. Enum missing (see HC-DETAIL-06). |
| HC-SYNC-03 public total donated is an aggregate | **Met** | `platTotal` sums `totalDonatedUSD`; no donor-level data anywhere public. |
| §5.1 step 7 — unauthenticated Donate → **login first**, then donation flow with HC prefilled | **Partial** | Both directory and detail show a "Log in to complete your donation" banner with a **Log in** link, but the link is a bare `login_2.html` — it does **not** carry the HC back, so step 8 ("routes the user into the Donation feature with the selected HC prefilled") is broken after login. |
| §5.2 step 2 — two options **"Donate by Fiat" / "Donate by Crypto"** | **Missing** | `donate.html` labels them **"Card"** and **"Crypto"**. |

## 4. Donation page / impact dashboard (§3.1 DON-DASH)

| ID | Requirement (abridged) | Status | Page / evidence |
|---|---|---|---|
| DON-DASH-01 | Donation page focused on donation + impact, **separate from Wallet Dashboard** | **Met** | `donations.html` is its own page; links out to `wallet-enhanced.html`. |
| DON-DASH-02 | Show user's **total donated** after login | **Met** | `#sumTotal` from `SUMMARY.totalDonatedUSD`. |
| DON-DASH-03 | **Lives impacted** when available, else "Coming soon"/hide | **Met** | `#sumLives` + `lives_soon` demo pill renders "Coming soon". |
| DON-DASH-04 | Lightweight **Huma Points reward state** | **Partial** | Card exists but only models **pending / confirmed**. §4.1 + DON-HP-02 require **estimated / pending / confirmed / unavailable**. Label also has a typo: **"Huma Points earneds"**. |
| DON-DASH-05 | **Recent donation history** + link to full history | **Met** | `#recentList` (top 3) + "View all history". |
| DON-DASH-06 | Donate to **one selected active HC** | **Partial** | Featured-centre rows deep-link with `?hc=`, but the page's own primary CTA is a bare `donate.html` with no HC — the user lands on the flow with nothing selected. |
| DON-DASH-07 | **Only minimal** donatable balance (supported crypto + gas awareness) | **Partial** | Minimal list ✔, gas coverage line ✔, "last updated" ✔, Wallet link ✔. But the list is `hUSD, USDC, USDT, ETH` — it does not match the §1.7 supported-donation set (USDC/USDT direct; BTC/ETH converted) and has no BTC. |
| DON-DASH-08 | **All fees shown before confirmation; processing fee on top; total charged = donation + processing fee** | **Missing** | No processing fee exists. Fiat review says "Huma fee — None" and "Total charged to card" = the donation amount. Crypto review shows gas only. |
| DON-DASH-09 | **Minimum $1 USD** validated before submit | **Missing** | `MIN_USD = 5`; hint and error copy both say $5. |
| — | Value-proposition content on the Donation page (brief §A) | **Missing** | The hero is one generic line. No traceability claim, no $1 minimum, no 1:1 hUSD peg, no "receipt tied to transaction ID", no "no bank required", **no six multiplier streams**, no Huma Points multiplier table. |

## 5. Donation flow — fiat path (§3.2 DON-FIAT, §5.2)

| ID | Requirement (abridged) | Status | Evidence |
|---|---|---|---|
| DON-FIAT-01 | Donate to one selected HC by supported fiat rail (card, Phase 1) | **Met** | Saved-card selector reads the shared `unera_paymentMethods_v1` store. |
| DON-FIAT-02 | Review shows **donation amount, processing fee, total charged, USD value, receipt eligibility** | **Partial** | Donation amount ✔, USD value ✔, receipt eligibility ✔ ("Available once completed" / "May not be available in your region"). **Processing fee and a correct total charged are missing.** |
| DON-FIAT-03 | USD fiat → defined Payment Rail account, **no fiat-to-crypto conversion** | **Partial** | No mint/convert language ✔, but the destination is never named. The review shows a **center wallet address** even for card donations, which contradicts "fiat is NOT converted to crypto" and §1.7 (fiat settles to a defined *account*, not a wallet). |
| DON-FIAT-04 | **Non-USD fiat**: rail converts to USD; store original currency + amount + rate; show USD equivalent | **Missing** | The flow is USD-only. No currency selector, no rate row, no USD-equivalent row. |
| DON-FIAT-05 | Statuses pending payment / processing / awaiting confirmation / completed / failed / expired / requires resolution, friendly labels | **Partial** | `STATUS_META` covers all seven ✔, but the flow itself only reaches awaiting-confirmation / completed / failed / expired. `requires_resolution` is never produced. |
| DON-FIAT-06 | Completed fiat donation written to history with `source = fiat` | **Met** | Seeded rows carry `source:'fiat'`. |
| DON-FIAT-07 | Receipt generation / eligibility evaluation | **Met** | Receipt state modelled (`pending`/`available`/`unavailable`) with a "Receipt not eligible" demo blocker. |

## 6. Donation flow — crypto path (§3.3 DON-CRYPTO, §5.3)

| ID | Requirement (abridged) | Status | Evidence |
|---|---|---|---|
| DON-CRYPTO-01 | Supported assets **USDC/USDT first, then BTC, ETH** | **Partial** | Offers `hUSD, USDC, USDT, ETH` in balance order, no ordering rule, **no BTC**, and `hUSD` is not in the §1.7 settlement table. |
| DON-CRYPTO-02 | Show balance, **estimated USD value using Uniswap data comparing USDC vs USDT routes**, and gas awareness | **Partial** | Balance ✔, USD estimate ✔, gas warning ✔. The quote is a flat `PRICES[token]` with **no Uniswap attribution and no USDC-vs-USDT route comparison**. |
| DON-CRYPTO-03 | Review: HC, asset, original crypto amount, USD quote, **processing fee**, network fee/gas, **conversion fee if applicable**, **wallet address** | **Partial** | HC ✔, asset ✔, original amount ✔, USD quote ✔, gas ✔, wallet address ✔ (short form). **Processing fee missing. Conversion fee missing. Destination type not stated** (it is labelled "Center wallet", not "Humanity Center multisig wallet"). |
| DON-CRYPTO-04 | USDC/USDT go **directly to the defined multisig wallet** | **Missing** | Copy says every asset is "converted to USD before it reaches the center" — wrong for USDC/USDT, which need no conversion. No multisig concept in the UI. |
| DON-CRYPTO-05 / 06 | BTC/ETH **converted to USDC or USDT** by the Swap Worker, better route | **Missing** | ETH is described as converted to *USD*; there is no settlement-asset concept and no swap-worker stage. |
| DON-CRYPTO-07 | States: awaiting signature, submitted, awaiting confirmation, **conversion pending**, completed, failed, rejected by user; **never show completed early** | **Partial** | Tracker covers sent → confirming → checked → delivered, plus delayed/failed. **No "awaiting signature", no "submitted", no "conversion pending"** stage or state. |
| DON-CRYPTO-08 | History preserves original amount/currency, USD value, **settlement asset**, settlement amount, txHash | **Partial** | Original amount/currency, USD value and txHash ✔. **Settlement asset / amount absent.** |
| DON-CRYPTO-09 | Receipt eligibility from confirmed USD value | **Met** | Receipt row on the success terminal + history detail. |

## 7. History, receipts, Huma Points (§3.4 DON-HIST, §3.5 DON-HP)

| ID | Requirement (abridged) | Status | Evidence |
|---|---|---|---|
| DON-HIST-01 | User-scoped history after login | **Met** | `#loginGate` blocks the list for `USER_PUBLIC`. |
| DON-HIST-02 | Row: HC name, original amount/currency, USD equivalent, source, status, date; **crypto rows show settlement asset, txHash, explorer** | **Partial** | HC, original amount + currency, USD, source badge, status, date, txHash + explorer ✔. **Settlement asset missing.** |
| DON-HIST-03 | Filter by **status, HC, source, date range** | **Met** | Filter modal + quick tabs + centre-scope dropdown cover all four; AND-combined. |
| DON-HIST-04 | Detail view: donation ID, HC, status, original amount, USD value, **fees**, **destination type**, receipt, txHash/explorer | **Partial** | ID, HC, status, original amount, rate, USD, receipt, txHash ✔. **Fees missing. Destination type missing.** |
| DON-HIST-05 | Receipt download when available/eligible; do not imply a guaranteed legal receipt | **Met** | Three receipt states; download button only when `available`; wording is "Being generated…" / "A receipt is not available for this donation". |
| DON-HP-01 | Show Huma Points from donation activity | **Met** | Success terminal, dashboard card, history detail all show points. |
| DON-HP-02 | Success screen shows **estimated / pending / confirmed** with clear labels | **Partial** | Success shows "pending confirmation" only; dashboard shows pending/confirmed. **"estimated" and "unavailable" states are not modelled.** |
| DON-HP-03 | UI must not define calculation / tier / fee-discount / Impact Point exchange rules | **Partial** | `donate-flow.js` hardcodes `POINTS_MULTIPLIER = 1.5` and `pointsFor()` computes `usd * 0.05 * 1.5` in the front end — exactly what DON-HP-03 forbids. Should be presented as a service-returned value. |

## 8. §6.2 UI states (Donation spec)

| State | Status | Evidence |
|---|---|---|
| Loading | **Met** | Skeletons on directory + history; donations page has no loading pill but no async fetch either. |
| Unauthenticated | **Met** | Public content + login prompt on all four pages; donate flow shows `#gateLogin`. |
| Wallet not connected | **Met** | `#gateWallet` "Connect your wallet to donate crypto". |
| Insufficient crypto balance | **Met** | `balance` blocker → verbatim §6.3 message; submit blocked. |
| Insufficient gas | **Met** | `#gasWarnBanner`, non-blocking warning. |
| Pending / awaiting confirmation | **Met** | Shared Transaction Tracker + nav pending pill + `progressing` bell notification; user may leave. |
| **Conversion pending** | **Missing** | Not represented anywhere (see DON-CRYPTO-07). |
| Completed | **Met** | Asymmetric success terminal with receipt block. |
| Failed / expired | **Met** | Distinct fail/pending terminal shells, no lightning badge. |
| Unavailable / maintenance | **Partial** | Directory and history have a service-unavailable banner; **the donate flow and the donations page have none**. |

## 9. §6.3 error copy — verbatim check

| # | Spec string | Status | Build |
|---|---|---|---|
| 1 | "Enter a valid donation amount." | **Met** | `validateAmount()` exact. |
| 2 | "Donation amount must be between $1 and [max]." | **Partial** | Renders "between **$5** and $50,000 **(USD value)**" — wrong minimum, extra suffix. |
| 3 | "Log in to complete your donation." | **Met** | Gate heading + both login banners. |
| 4 | "Complete verification to continue with this donation." | **Met** | `#gateKyc` heading. |
| 5 | "Connect your wallet to donate crypto." | **Met** | `#gateWallet` heading. |
| 6 | "You do not have enough [crypto] for this donation." | **Met** | Exact, token interpolated. |
| 7 | "You may need more gas token to complete this transaction." | **Met** | `#gasWarnBanner` title. |
| 8 | "Donation was not submitted because the wallet request was rejected." | **Met** | `fails.rejected`. |
| 9 | "Unable to complete this donation. Please try again." | **Partial** | Server-error banner says "Unable to complete this **action**. Please try again."; the reverted terminal paraphrases it mid-sentence. |
| 10 | "This donation request expired. Please start a new donation." | **Partial** | Paraphrased: "This donation request expired **before payment was completed**. Please start a new donation." |
| 11 | "We could not process the payment right now. Please try again." | **Met** | `fails.pay_failed`. |
| 12 | "Your donation is being processed. We'll update the status when conversion is complete." | **Missing** | No conversion state exists. |
| 13 | "A receipt is not available for this donation." | **Partial** | History detail says "A receipt is not available for this donation" (no full stop); the flow's not-eligible copy differs. |
| 14 | "This is taking longer than expected. We'll update the status when confirmation is available." | **Partial** | Timeout terminal embeds it inside a longer sentence rather than leading with it. |

## 10. §6.4 copy & accessibility rules

| Rule | Status | Evidence |
|---|---|---|
| Consistent "Donation", "Humanity Center", "total donated", "lives impacted", "Huma Points", "Impact Points" | **Partial** | Consistent except the **"Huma Points earneds"** typo on `donations.html` and "Impact Points" never appearing on the donation surface. |
| **Never** mint / burn / cash-out in donation copy | **Met** | Grep across the four pages + `donate-flow.js` + `donation-data.js`: no occurrences. |
| Show donation amount, processing fee, total charged clearly before confirmation | **Missing** | See DON-DASH-08. |
| Public totals aggregate, never donor-level | **Met** | Directory/detail expose aggregates only. |
| Donation CTA easy to find | **Met** | One primary CTA per card/page. |
| Keyboard navigable | **Met** | Roving listbox dropdowns, Escape handling, focus moves to step headings, modal focus trap + restore. |
| Status never by colour alone | **Met** | `statusChip()` always pairs an icon + text label with the colour. |
| WCAG 2.1 AA | **Met** (structurally) | Skip link, focus rings, reduced-motion, semantic landmarks, live regions. Contrast not re-measured in this pass. |

## 11. Notifications (§4.3)

| Event | Status | Evidence |
|---|---|---|
| Donation submitted | **Met** | `notifyDonation('info','Donation submitted',…)` on confirm. |
| Donation awaiting confirmation | **Partial** | The tracker fires a generic "Donation pending" at level `progressing`; there is no distinct **awaiting confirmation** event. |
| Donation completed | **Met** | Fired on the success terminal. |
| Donation failed | **Met** | Fired for `pay_failed` / `expired` / `reverted`. |
| Receipt available | **Met** | Fired 2.2 s after success. |
| Huma Points reward updated | **Partial** | Fired at runtime as "Huma Points earned", but **the bell seed catalog (`shared/notification-catalog.js`) has no donation-lifecycle seeds at all** — a cold page load shows none of these six events. Its only donation entries are legacy "Donation Received — 50 CTC" and "Monthly Recurring — 10 CTC to Lagos Center", which use a retired token and a centre that does not exist in `donation-data.js`. |

## 12. Value-proposition items (brief §A / Donation Value Proposition)

| Item | Status | Where it should live |
|---|---|---|
| Positioning: transparent, governed, structurally sound giving infrastructure; every dollar traceable | **Missing** | Donation page hero. |
| Six multiplier streams (Passive Reserve Yield, Yield-to-Donate, Hedge-to-Donate, Round-Up, Recurring, 2× Corporate Match) | **Missing** | Donation page "how your giving multiplies". |
| Huma Points multipliers (1.5× / 3× / 2× / 2.5× / 1×) | **Partial** | Only 1.5×/3× appear, inside tracker copy. |
| Micro-donations from $1 | **Partial** | Stated in a tracker "while you wait" fact, contradicted by the $5 minimum in validation. |
| hUSD pegged 1:1, no volatility risk | **Missing** | — |
| On-chain transparency — "every dollar publicly auditable" | **Partial** | Centre-detail trust card says "on-chain traceable". Not on the Donation page. |
| Automatic tax receipts **tied to the transaction ID** | **Partial** | Tracker fact mentions it; the receipt UI never states the tie. |
| Global access — "anyone with a wallet can donate: no bank required" | **Missing** | — |
| Dual funding model (direct donations + ecosystem yield) | **Missing** | — |
| Impact Points → donor voting; final authority = Swiss Association | **Missing** | — (governance is out of Huma scope, but the *statement* belongs on the Donation page) |

---

## 13. Score

| Area | Met | Partial | Missing |
|---|---|---|---|
| HC directory (6) | 3 | 3 | 0 |
| HC detail (7) | 4 | 3 | 0 |
| HC flows/sync (4) | 1 | 2 | 1 |
| DON-DASH (9 + VP) | 4 | 4 | 2 |
| DON-FIAT (7) | 3 | 3 | 1 |
| DON-CRYPTO (9) | 1 | 5 | 3 |
| DON-HIST / DON-HP (8) | 4 | 4 | 0 |
| §6.2 states (10) | 8 | 1 | 1 |
| §6.3 errors (14) | 7 | 5 | 2 |
| §6.4 copy (8) | 6 | 1 | 1 |
| Notifications (6) | 4 | 2 | 0 |
| Value proposition (10) | 0 | 4 | 6 |
| **Total (98)** | **45** | **37** | **16** |

---

## 14. Open questions — carried into the design as visible **TBD**

These come from Donation §9.2 and Humanity Centers §9.2 and must **not** be invented:

| Ref | Question | How the design handles it |
|---|---|---|
| DON OQ-01 | Should anonymous on-chain donations to the multisig be included in public HC total donated? | Public totals footnoted "TBD" on the directory hero. |
| DON OQ-02 | Which fiat currencies does the Payment Rail support at MVP? | Fiat currency selector ships USD + a demonstrative non-USD set, labelled "MVP currency list TBD". |
| DON OQ-03 | Which networks are approved for USDC/USDT, BTC, ETH? | Network row on the crypto review marked "approved network list TBD". |
| DON OQ-04 | Huma Points state on success only, dashboard only, or both? | **Designed for both**, as the brief instructs, with the duplication flagged as pending a decision. |
| HC OQ-03 | Should direct-link access to a suspended HC detail page remain visible, or return unavailable? | Currently remains visible with a disabled CTA (§6.2 "if detail page is opened directly"); flagged TBD. |
| — | Processing-fee schedule | The spec mandates the fee but gives **no rate**. The prototype uses a clearly-labelled placeholder (card 2.9% + $0.30, crypto 1.0%, conversion 0.30%) marked "prototype rates — TBD Finance". |
| — | **Multi-HC split** | Donation §1.4 now lists multi-HC allocation as out of scope while the build ships it. Default is now single-HC; the split UI is retained behind `?multi=1` for the existing test cases. **Product decision required: retire it or reinstate it in the spec.** |
| — | hUSD as a donation asset | §1.7's settlement table lists only USD_FIAT / USDC / USDT. hUSD is absent, yet the value proposition markets "$1 minimum in hUSD". Removed from the donate asset list pending confirmation. |
