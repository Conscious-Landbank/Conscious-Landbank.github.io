# UNERA — Token Management: Feature Gap Audit & Improvement Plan

> **What this is.** A page-by-page audit of the current UNERA consumer pages against the requirements in [`docs/UNERA-Token-Management.md`](./UNERA-Token-Management.md) (Confluence v17). For each feature it lists: what the doc requires, what the page currently has, the **gaps**, and **detailed, design-system-consistent improvements** to close them.
>
> **Source of truth for design.** Every improvement below references the **UNERA Design System V2** in this project — its tokens, components, and pattern cards — so anything built stays 100% consistent with the uploaded files. Design-system anchors are cited inline as `→ DS:`.
>
> **Audited against** (in `Unera-Claude/NewUnera/`): `account-settings.html` (wallet connection — the confirmed source of truth), `add-money.html` (Buy OTC), `exchange.html` (Swap), `send-enhanced.html` (Send), and the absence of any Trade page.
>
> **Reference PRDs:** [UNERA — Token Management](https://conscious-landbank.atlassian.net/wiki/spaces/~7120206e88bad7379045fb808e0bd72c8daf86/pages/62259420) (v17) for the overall transaction set, and the dedicated [UNERA — Token Swap](https://conscious-landbank.atlassian.net/wiki/spaces/~7120206e88bad7379045fb808e0bd72c8daf86/pages/56525008) (v3) for Swap mechanics. **§3 reconciles the two where they conflict.**
>
> **Scope note.** This is a *planning* document — no page code is changed by it. Token-naming and Phase-1/2 gas semantics are called out because they are the doc's most-stressed correctness rules.

---

## 0. Executive summary

| # | Feature | Page | Status | Gap severity |
|---|---------|------|--------|--------------|
| 1 | **Wallet Connection** | `account-settings.html` | ✅ Strong — connect/verify/disconnect all present | 🟢 Low (polish) |
| 2 | **Buy hUSD via OTC** | `add-money.html` | 🟡 Partial — preview missing several required rows | 🟠 Medium |
| 3 | **Swap (Oracle mint/burn)** | `exchange.html` | 🟡 Partial — modelled as AMM; should be Oracle mint/burn + gear settings | 🔴 High |
| 4 | **Send / Transfer** | `send-enhanced.html` | ✅ Strong — one fix (self-send) + one add (sender row) | 🟢 Low |
| 5 | **Trade (Order Book)** | *(none)* | ❌ Missing entirely | 🔴 High (net-new) |

**The three things that matter most**

1. **Swap is mis-modelled as an AMM — it's actually Oracle mint/burn.** The detailed [Token Swap PRD](https://conscious-landbank.atlassian.net/wiki/spaces/~7120206e88bad7379045fb808e0bd72c8daf86/pages/56525008) is explicit: rates come from a **Chainlink Oracle**, the user gets the **fairest price regardless of trade size** (so there is **no price impact**), and supply is handled by **minting** (stablecoin → UNERA) and **burning** (UNERA → stablecoin). The current `exchange.html` borrows AMM concepts — "price impact", "net received", a percentage "network fee" — that don't apply. It also still needs the Phase-1 **`approve` + `transferFrom` → 2 wallet prompts, user-pays-gas** model from the Token Management doc, plus the **gear/cog advanced-settings** panel and a **live Oracle rate** on the card. (Full detail in §3.)
2. **Trade (Order Book) does not exist.** It's a full net-new surface (§5.3, AC-TRADE-01..06).
3. **Buy OTC preview is missing required rows** — platform fee (named, 0% at launch), estimated gas for the platform transfer, total cost, a **rate-validity countdown with auto-refresh**, an explicit **"no wallet prompts"** reassurance, and an **inventory-insufficient** block (§5.1, AC-BUY-01..04).

**Two cross-cutting issues**

- **Token naming drift.** `add-money.html`/`exchange.html` use **hCAD**; the doc and wallet pages use **hUSD**. Pick one canonical symbol per surface and apply it consistently (see §6).
- **"Who pays gas" must be explicit on every Phase-1 preview** (§6 common rules). Send does this well (fee tooltip: "paid to the network, not UNERA"); Swap/Buy do not yet.

---

## 1. Wallet Connection — `account-settings.html`

**Doc:** §2 + AC-WALL-01..04. One-time onboarding; connect MetaMask / WalletConnect / Coinbase; **sign a message to prove ownership**; states **Not Connected / Unverified / Verified / Disconnected**; persists across sessions; transactions blocked while disconnected.

### What the page already has ✅
- **Connect modal** with MetaMask (recommended), WalletConnect, Coinbase — plus Brave & Ledger (superset of the doc; fine). → matches AC-WALL-01.
- **Signature / ownership step** — a "Verify Wallet Ownership → Sign this message…" modal with the message body and a "Sign Message" action that binds the address. → AC-WALL-01.
- **Disconnect** — `btn-disconnect` with a confirm dialog; styled as a *reversible warning*, not a destructive error (correct semantics).
- **Disconnected session** — `data-wallet-session="disconnected"` swaps the nav to a `CONNECT` button and **hides wallet-enhanced links** while disconnected. → AC-WALL-03 / blocks transactions.
- **Persistence** — `localStorage.walletConnected` re-reads on load. → AC-WALL-04.

### Gaps 🟡 (low — polish only)
| Gap | Detail | AC |
|-----|--------|----|
| **G1.1 — "Unverified" is not a resting state** | Connect → sign happens in one flow. There's no explicit state for *"wallet linked but signature not yet completed"* (e.g. user closed the signature modal). The doc lists Unverified as a first-class state that must block transactions. | AC-WALL-02 |
| **G1.2 — Re-verify / re-connect affordance** | After a disconnect there's a clean reconnect, but no surfaced "needs re-verification" banner if a previously-linked wallet returns unverified. | §2 states table |

### Improvements (DS-consistent)
- **G1.1** — Add an **Unverified** chip + a gated state. Use the existing wallet-status badge pattern (`dropdown-wallet-status-nav[data-state]`) with a new `data-state="unverified"`:
  - Chip copy: **"Wallet linked · verification pending"**, on `--surface-warning-soft` with `--warning` ink and the `shield`/`verified` outline icon. → **DS: Edge & Error card** "unsupported / caution" banner pattern; `tokens/colors.css` `--warning`, `--surface-warning-soft`.
  - While `unverified`, transaction entry points (Send/Swap/Trade/Buy CTAs) render **disabled** with a helper line **"Verify your wallet to transact."** → **DS: Edge & Error card** "Prerequisite gates" (the *Verify your identity to send* gate is the exact template — reuse it for wallet verification).
- **G1.2** — On detecting a linked-but-unverified wallet at load, show the **KYC-style alert banner** (solid `--brand-deep-blue`, Deep-Blue→Yellow CTA) with **"Re-verify wallet"**. → **DS: Edge & Error card** "Identity (KYC) alert banners" — same component, different copy. (Note: banner is **solid Deep Blue**, not gradient, per the product rule.)

*No structural change needed — this feature is essentially complete; the work is adding one state and reusing two existing DS patterns.*

---

## 2. Buy hUSD via OTC — `add-money.html`

**Doc:** §5.1 + AC-BUY-01..04. User agrees OTC terms, pays **fiat via bank/e-Transfer**, system transfers hUSD from **inventory** (not issuance). **No wallet interaction at buy time.** Preview must show **You Pay, You Receive, Exchange Rate (TWAP), Platform Fee (0% launch), Estimated Gas (platform transfer, native + fiat), Total Cost, Rate Validity (countdown), Wallet Prompts = None**; **auto-refresh on quote expiry**; **block on insufficient inventory**.

### What the page already has ✅
- A stepped flow with **payment methods** (Interac e-Transfer = the OTC rail, plus bank, plus card).
- **Conversion Summary** with: **You pay**, **Exchange rate**, **Processing fee**, **You receive**.
- A **Confirm Details** step (payment method, currency, …).

### Gaps 🟠 (medium)
| Gap | Detail | AC |
|-----|--------|----|
| **G2.1 — "Processing fee" ≠ "Platform Fee"** | Doc wants a **Platform Fee** row, *configurable, shown as 0% at launch*. The page's "Processing fee" is a fiat-rail concept and is conceptually different. | AC-BUY-03 |
| **G2.2 — No Estimated Gas row** | Doc's preview lists estimated gas for the **platform's** token transfer (native + fiat). Even though the *user* pays nothing at buy time, the row is specified. | §5.1 preview |
| **G2.3 — No Total Cost row** | Doc wants an explicit **Total Cost = fiat + platform fee**. | §5.1 preview |
| **G2.4 — No rate-validity countdown / auto-refresh** | Doc requires a **quote-expiry countdown (e.g. 60s)** and **auto-refresh to the latest rate before confirm**. | AC-BUY-04 |
| **G2.5 — No explicit "No wallet prompts"** | Doc stresses the OTC buy has **zero wallet prompts**; the UI should reassure the user (no MetaMask popup is coming). | AC-BUY-02 |
| **G2.6 — No insufficient-inventory block** | If platform inventory can't cover the buy, the flow must block with a clear message. | §5.1 requirements |
| **G2.7 — TWAP not labelled** | Rate shows as `1 hCAD = $0.74 USD` with no indication it's a **TWAP** quote. | §5.1 preview |

### Improvements (DS-consistent)
- **G2.1 / G2.3 / G2.7 — Rebuild the Conversion Summary rows.** Use the existing summary-row pattern; final row order:
  1. **You pay** — fiat (e.g. `100.00 CAD`)
  2. **Exchange rate** — prefix label **"Rate (TWAP)"** with a small info `?` button. → **DS: Core card** `fee-info-btn` tooltip pattern (already used in Send's network-fee row).
  3. **Platform fee** — value **"0% · 0.00"** with a muted "Waived at launch" sublabel. → **DS:** `--text-secondary` label, `tokens/typography.css` `--fs-sm`.
  4. **Estimated network gas** — **"Covered by UNERA"** pill (this is the platform's transfer; user pays nothing). → **DS: Core card** badge; `--fin-up`/`--fin-up-bg` for the "covered" affirmative.
  5. **You receive** — token amount, emphasized with `--font-stat-size` tabular numerals. → **DS: Type card** "KPI / stat figures".
  6. **Total cost** — `highlight-total` treatment (bold, hairline top border). → **DS:** reuse Send's `.summary-item.highlight-total`.
- **G2.4 — Rate-validity countdown.** Add a countdown chip above the CTA: **"Rate locked for 0:57"**, ticking down; at 0:00 it **auto-refreshes** and flashes **"Rate updated"**. → **DS: Edge & Error card** `rate-expired-banner` already exists for the expired state in Send; reuse it. Countdown chip uses `--surface-warning-soft` as it approaches expiry. The confirm button is **disabled during refresh** for ~300ms.
- **G2.5 — "No wallet prompts" reassurance.** Below the CTA, an inline hint with the wallet/shield icon: **"No wallet signature needed — you'll pay by Interac e-Transfer."** → **DS: Core card** `input-hint` style (same component the page already uses for the "$100 is popular" hint).
- **G2.6 — Insufficient-inventory block.** When inventory < requested, replace the CTA with a disabled state + a soft error banner: **"Temporarily unavailable — we can't fill this amount right now. Try a smaller amount or check back shortly."** → **DS: Edge & Error card** "Partial failure — inline soft sync banner" (`soft-banner error`, `--surface-error-soft`).
- **Naming (see §6):** decide hUSD vs hCAD for this surface and apply to every row + helper.

**Net:** no new flow — this is **preview-row surgery + a countdown + two banners**, all from existing DS patterns.

---

## 3. Swap — `exchange.html`

> **Two PRDs, one feature — reconcile first.** The **Token Management** doc (§5.2) calls this "Swap — AMM Stablecoin Tokens" with *price impact* and a *Uniswap-model swap fee to LPs*. The dedicated **[Token Swap PRD](https://conscious-landbank.atlassian.net/wiki/spaces/~7120206e88bad7379045fb808e0bd72c8daf86/pages/56525008)** (v3, more specific) describes something different and authoritative: an **Oracle-priced mint/burn** exchange. **Where they conflict, the Token Swap PRD wins on *pricing mechanics*; the Token Management doc wins on *wallet/gas architecture* (Phase-1 `approve` + `transferFrom`, 2 prompts, user pays gas).** This section is rewritten around that reconciliation.

### 3.0 What Swap actually is (Token Swap PRD)
- **Oracle-priced, not pool-priced.** The rate is fetched from a **decentralized Oracle (e.g. Chainlink)** — *not* set by pool reserves. **Consequence: there is NO price impact and NO size-based slippage** — the user gets "the fairest price possible regardless of trade size." Any AMM "price impact" / "net received after pool curve" UI is **wrong for this product** and must be removed.
- **Two directions = Mint & Burn:**
  - **Mint** — stablecoin (USDC/USDT) → UNERA (hCAD): system locks the stablecoin in reserve and **mints** the equivalent UNERA to the user's wallet.
  - **Burn** — UNERA → stablecoin: system **burns** the user's UNERA and unlocks the equivalent stablecoin from reserve.
- **Price Change Protection = two safety mechanisms** (this is what "slippage" means here):
  1. **"Price Safety Net"** — an *execution slippage tolerance* (0.1% / 0.5% / 1%). If the **Oracle rate moves unfavourably beyond this limit before the tx finalizes on-chain, the system auto-cancels** to protect the user. (It is **not** AMM price-impact slippage.)
  2. **Transaction Deadline** — 10 / 20 min. If the chain is congested and the tx isn't minted before the deadline, the system **auto-cancels** so funds aren't locked waiting on a stale rate.
- **UI requirements (Token Swap §4):** minimalist **card** with *You Pay* / *You Receive* + **token-selection dropdowns**; the **live Oracle rate displayed at the bottom of the swap card**; a **gear/cog settings icon in the card's top-right** opening **Advanced Settings** (Price Safety Net + Transaction Deadline).
- **Related surfaces (scope-flag, not part of the swap card):** a public **Reserve Dashboard** (total stablecoins in reserve, total UNERA held, health ratio) and a **Liquidity Provider Portal** (deposit/withdraw, APY, dynamic withdrawal fee). See §3.4.

### What the page already has ✅
- **Safety-net control** — 0.1 / 0.5 / **1.0** with **0.5% default active** + `slippage` state. → maps to **Price Safety Net** (right control, wrong framing — see G3.5).
- **From / To / Exchange rate** rows + a "Min. received (incl. slippage)" row.
- A **deadline**-free confirm sheet with a single "Network fee (0.1%)" row.
- **Price impact (dummy calc)** — ⚠️ **this should be removed** (no price impact in an Oracle model).

### Gaps 🔴 (high — wrong pricing model + missing Phase-1 wallet/gas model + missing card chrome)
| Gap | Detail | Source |
|-----|--------|--------|
| **G3.1 — AMM concepts that don't belong** | "Price impact" and pool-style "net received" imply an AMM curve. The Oracle model has **no price impact**. Remove them; replace with the **live Oracle rate** + a plain *You Receive* at that rate. | Token Swap §2.1, §4 |
| **G3.2 — "Slippage" mis-framed** | Labelled like AMM slippage. It's the **"Price Safety Net"** — a *cancel-if-Oracle-moves* guard. Re-label and re-explain. | Token Swap §2.2 |
| **G3.3 — No gear/cog Advanced Settings** | Price Safety Net + Deadline must live behind a **cog icon, top-right of the card** (currently slippage sits inline; deadline is absent). | Token Swap §4.2 |
| **G3.4 — No Transaction Deadline** | 10 / 20-min deadline control missing entirely. | Token Swap §2.2 |
| **G3.5 — No live Oracle rate on the card** | Rate appears only in the confirm sheet; the PRD wants it **persistently at the bottom of the swap card**, labelled as the live Oracle rate. | Token Swap §4.1 |
| **G3.6 — No Mint vs Burn semantics** | UI treats both directions identically; nothing communicates lock-and-mint vs burn-and-unlock (matters for messaging + the reserve story). | Token Swap §2.1 |
| **G3.7 — No `approve` + `transferFrom` 2-step / 2 wallet prompts** | Single confirm shown. Phase-1 requires **two wallet interactions** (approve, then mint/burn) made explicit. | Token Mgmt §5.2, AC-SWAP-01/02 |
| **G3.8 — Gas not modelled as gas** | "Network fee (0.1%)" is a **percentage**, not blockchain **gas**. Need **Gas — Approve** and **Gas — Swap** as two line items **in native token + fiat**, plus **Total gas**, and "**user pays gas**" stated. | AC-SWAP-04, §6 |
| **G3.9 — Platform fee not shown** | **Platform Fee** row, *configurable, 0% at launch*, is absent. (No "swap fee to LPs" line is needed on the *user* card — LP yield is a reserve-side mechanic, not a per-swap user charge in the Oracle model.) | AC-SWAP-06 |
| **G3.10 — No safety-net edge warnings** | At **1%/high** → caution it may still cancel on a fast Oracle move; at **0%/too-low** → caution the tx will likely **auto-cancel/fail**. | Token Swap §2.2 |
| **G3.11 — Settings reset rule** | Safety Net + Deadline persist for the session, **reset to defaults (0.5% / 20 min) next login**. | AC-SWAP-12 |
| **G3.12 — Auto-cancel terminal states** | No distinct **"Cancelled — rate moved beyond your Price Safety Net"** or **"Cancelled — deadline expired"** outcomes. | Token Swap §2.2 |

### Improvements (DS-consistent)

**A. Re-shape the swap card (Token Swap §4)**
- **Card chrome** — keep the minimalist card on `--surface-impact`; add a **cog/settings IconButton top-right**. → **DS: Core card** `IconButton`; **Icon Library** has a `settings` gear (Material Symbols outlined). Opens a small popover/side-sheet. → **DS: Popups card** dropdown/side-sheet pattern.
- **You Pay / You Receive** with **token dropdowns** → **DS: forms `Select`** (custom, keyboard, modal-flip — no native `<select>`).
- **Live Oracle rate footer** — pinned at the card bottom: **"1 USDC = 1.382 hCAD · live Oracle rate"** with a subtle refresh tick. → **DS: Core card** `input-hint` style + `--text-secondary`; tabular numerals from **Type card** `--font-stat`.
- **Remove** `price impact` and pool-style `net received`. Replace "Min. received (incl. slippage)" with **"Minimum received (Price Safety Net 0.5%)"** computed off the Oracle rate, not a pool curve.

**B. Advanced Settings popover (gear)** → **DS: Popups card** + **exchange.html** `slippage-btn` pills
- **Price Safety Net** — pills **0.1% / 0.5% (default) / 1%** + optional custom. Active = `--fin-up`/`--fin-up-bg` (existing `slippage-btn.active`).
- **Transaction Deadline** — pills **10 min / 20 min (default)** + custom minutes. Same pill styling for consistency.
- Helper copy: **"If the Oracle rate moves beyond your Safety Net before your swap finalizes, we cancel it automatically."** → **DS: Core card** `input-hint`.

**C. Mint vs Burn semantics (G3.6)**
- A subtle directional line under You Receive: Mint → **"You'll receive newly-issued hCAD, backed 1:1 by reserves."**; Burn → **"Your hCAD is redeemed for USDC from reserves."** → **DS:** `--text-secondary`; the **shield** "100% Backed by Reserves" trust chip from the **Wallet Patterns** card can be reused on the card header.

**D. Phase-1 wallet + gas model (G3.7–G3.9, Token Mgmt §5.2)**
- **Two-step confirm** — mini-indicator **① Approve USDC → ② Confirm swap**, brand-blue "current" chip → `fin-up` "done" check per prompt. → **DS: Transact Flows card** processing chips + **Core card** `Stepper` (progression = `--brand-deep-blue`; money/done = `--fin-up`).
- **Fee/gas rows** in the confirm sheet:
  - **Platform fee** — **"0% · waived at launch"** (`--text-secondary`).
  - **Network gas — Approve** — `~0.0004 ETH · ~$1.20`.
  - **Network gas — Swap** — `~0.0009 ETH · ~$2.70`.
  - **Total gas** — sum, `highlight-total`.
  - One-line note: **"You pay network gas for both steps. UNERA adds no markup."** → mirrors Send's `fee-info-btn` tooltip language.
- **"Wallet prompts: 2"** stated on the confirm sheet (the doc's key user-education point — contrast Send's "1").

**E. Edge / terminal states (G3.10, G3.12)** → **DS: Edge & Error card**
- **Safety-net cautions** — `soft-banner warning` (`--surface-warning-soft`): high → "A fast Oracle move could still cancel this swap."; 0%/too-low → "Your swap will likely auto-cancel."
- **Auto-cancel terminals** — distinct **outcome panels** (not success heroes): "**Swap cancelled — the rate moved beyond your Price Safety Net.**" and "**Swap cancelled — your transaction deadline passed.**" Each with **Try again** (re-quote at the fresh Oracle rate). → `outcome-icon-wrap--timeout` / a neutral cancel variant; never the success lightning hero.
- **Settings reset (G3.11)** — session-only; reset to **0.5% / 20 min** next login (matches the DS "session-only, never persist" discipline).

**F. Phase-2 guard** — keep **EIP-3009 / gasless** UI **out** of Phase-1 (AC-SWAP-07); code-comment only.

### 3.4 Related surfaces (flag — confirm scope before building)
The Token Swap PRD §4 also specifies two surfaces that are **not** the swap card:
- **Reserve Dashboard** (public) — total stablecoins in reserve, total UNERA held, **health ratio**. *You already have `proof-of-reserve-public.html`* — audit it against this list as a follow-up; it likely covers most of it.
- **Liquidity Provider Portal** — deposit/withdraw stablecoins, **APY**, **dynamic withdrawal fee**. No page found — likely **net-new**, but it's an LP/admin surface, **out of scope for the consumer swap** unless you want it. → would reuse **DS: Transact Flows** (stepper) + **Wallet Patterns** (stat cards, distribution bars for pool share).

**Net:** more than a reskin — Swap needs **(1) the pricing model corrected to Oracle mint/burn (remove price-impact), (2) a gear-driven Advanced Settings with Safety Net + Deadline, (3) a live Oracle-rate card footer, (4) the Phase-1 2-step + gas confirm, and (5) auto-cancel terminal states** — all composable from existing DS components.

---

## 4. Send / Transfer — `send-enhanced.html`

**Doc:** §5.4 + AC-SEND-01..06. Standard **`transfer()`**, **1 wallet interaction**, **no approval**. Real-time recipient validation; **self-send blocked**. Preview: **Token, Amount, Sender Address, Recipient, Estimated Gas, Total Deduction, Wallet Prompts = 1**. Offer **save to Address Book**.

### What the page already has ✅ (this page is the model)
- Clean **stepper** flow (Recipient → Amount → Review → Done). → **DS: Core card** `Stepper` parity.
- **Real-time recipient validation** + QR scan with **chain-ID mismatch hint**. → AC-SEND-06 (validation).
- **Saved addresses / Address Book** + **"Save to address book"** after send. → §5.4.
- **Network fee row with tooltip**: *"Network (gas) fee is paid to the blockchain network, not UNERA…"* + **Total**. → AC-SEND-04/05, §6 (who pays gas) — **exemplary**.
- **Success receipt** with Tx details; **outcome states** (pending/failed) and rate-updated banner. → **DS: Edge & Error / Transact Flows** parity.

### Gaps 🟢 (low)
| Gap | Detail | AC |
|-----|--------|----|
| **G4.1 — Self-send is warned, not blocked** | Page shows **"This matches your connected wallet. Confirm you intend to send to yourself."** (allows with confirmation). Doc says **self-send is blocked**. | AC-SEND-06 |
| **G4.2 — No Sender Address row in preview** | Review shows Recipient/Network/Amount/Fee/Total but **not the Sender (source) address** the doc lists. | §5.4 preview |
| **G4.3 — "Wallet Prompts = 1" not explicit** | Implied by single confirm, but not stated. Minor. | §5.4 preview |

### Improvements (DS-consistent)
- **G4.1 — Decide block vs warn.** The doc says block. **Recommendation: keep a soft block** — disable Continue and show the warning inline rather than a hard refuse, because real wallets sometimes legitimately self-send (consolidation). If you want strict doc compliance, flip to a hard block: Continue stays disabled while recipient == connected address, with the message **"You can't send to your own wallet address."** → **DS: Edge & Error card** "Field validation — self-send" (that exact message is already in the card). *This is a product decision — flagging for your call.*
- **G4.2 — Add Sender row.** In the Review summary, add a **From** row above Recipient showing the connected wallet (truncated, mono), matching the Recipient row styling. → **DS:** reuse `success-detail-value--mono`; `WalletPill` truncation convention.
- **G4.3 — State the prompt count.** Small helper under the CTA: **"You'll confirm once in your wallet."** → **DS: Core card** `input-hint`. (Contrast with Swap/Trade's "two prompts" — reinforces the 1-vs-2 mental model the doc stresses.)

**Net:** one decision (self-send) + one row + one helper line. This page is otherwise the reference implementation.

---

## 5. Trade (Order Book) — **NET NEW**

**Doc:** §5.3 + AC-TRADE-01..06. **Market & limit orders.** Token movement via **`approve` + `transferFrom`** → **2 wallet interactions, user pays gas**. Preview: **Trading Pair, Order Type, Price, Amount, Total Value, Platform Fee (0% launch), Estimated Gas — Approve, Estimated Gas — Trade, Total Estimated Gas, Wallet Prompts = 2.**

### Gap 🔴 — the page does not exist.

### Build plan (DS-consistent, reuse Swap's spine)
Trade and the improved Swap share the Phase-1 **approve + transferFrom / 2-prompt / user-pays-gas** *wallet* model (so reuse that confirm/gas machinery), but Trade is **order-book priced**, not Oracle mint/burn — it keeps price/amount/total-value, and has **no** Price Safety Net / Oracle-rate footer. Build the ticket on the shared 2-step scaffold, not the swap pricing.

**Page: `trade.html`** → start from **`templates/consumer-page/`** (Deep-Blue nav spine + page header). Compose with DS components:

1. **Header & nav** — standard nav spine; active state on a new **TRADE** entry under the **TRANSACT ▾** dropdown (alongside Add/Send/Stake/Exchange). → **DS: Navigation card** (add one `nav-dd-item`).
2. **Trading-pair selector** — custom dropdown (no native `<select>`), e.g. `hUSD / USDC`. → **DS: forms `Select`** component (keyboard support, modal-flip).
3. **Order-type toggle** — segmented **Market | Limit**. → **DS: Core card** scope-tab / segmented pattern (`scope-tab`, active = `--brand-deep-blue`).
4. **Price field** — disabled+"Market" for market orders; editable for limit. → **DS: forms `Input`** (deep-blue focus ring, 16px no-zoom).
5. **Amount field** + balance helper + Max chip. → **DS: `Input`** + Wallet's asset-action mini-button styling for "Max".
6. **Order summary card** (live): **Trading Pair, Order Type, Price, Amount, Total Value, Platform Fee (0% · waived), Gas — Approve, Gas — Trade, Total Gas**. → **DS:** summary rows + `highlight-total`; tabular numerals; `--surface-impact` card.
7. **Two-step confirm** — same **① Approve → ② Confirm trade** indicator as Swap. → **DS: Transact Flows** processing chips + `Stepper`.
8. **Order book / depth (optional, read-only)** — bids in `--fin-up`, asks in `--fin-down`, mid-price neutral. → **DS: colors** financial-semantic tokens. Hide scrollbars (institutional density rule). *If real depth data isn't available, ship the order ticket only and leave the book as a labelled placeholder — don't fabricate market data.*
9. **States** — empty (no pair), validation (amount > balance → "Insufficient balance"), wrong-network caution, terminal success/failed. → **DS: Edge & Error card** (all of these exist as patterns).
10. **Phase-1 rules** — "You pay gas for both steps", **Wallet Prompts = 2**, **no EIP-3009 UI**. → §6 + AC-TRADE-06.

**Reuse, don't reinvent:** Trade ≈ Swap with (pair + order-type + price) added and (slippage/price-impact) removed. Estimated build = **one new screen** sharing ~70% of the improved Swap's confirm/fee/gas machinery.

---

## 6. Cross-cutting fixes (apply to all transact surfaces)

| ID | Issue | Fix | DS anchor |
|----|-------|-----|-----------|
| **X1** | **Token naming drift** (hCAD vs hUSD) | Choose the canonical symbol per surface and apply to every row, helper, and receipt. Doc + wallet use **hUSD**; if a surface is genuinely CAD-denominated, label it **hCAD** consistently — never mix within one flow. | `readme.md` content rules |
| **X2** | **"Who pays gas" inconsistent** | Every Phase-1 preview states gas payer explicitly. Send is the template ("paid to the network, not UNERA"). Apply the same `fee-info-btn` tooltip to Swap/Trade/Buy. | **Core card** `fee-info-btn` |
| **X3** | **Gas always native + fiat** | Show gas as `~0.0009 ETH · ~$2.70` everywhere, not a single number or a percentage. | §6, AC-*-04 |
| **X4** | **Phase-1 = no gasless UI** | Keep EIP-3009 / "gasless" out of all Phase-1 confirm sheets; code-comment only. | AC-SWAP-07, AC-CROSS-03 |
| **X5** | **Wallet-prompt count is a teaching tool** | Send says "confirm once"; Swap/Trade say "two prompts: approve, then action". Make the count explicit on each — it's the doc's most-stressed user-education point. | §3.1, §6 |
| **X6** | **Solid fills, never gradient on product** | Any new CTA/banner uses **solid `--brand-deep-blue`** (KYC banner, primary buttons). | `tokens/colors.css` gradient comment |
| **X7** | **Disconnected blocks transactions** | Buy/Swap/Send/Trade entry points must respect the disconnected/unverified gate from `account-settings.html`. | AC-WALL-02/03 |

---

## 7. Prioritised roadmap

| Priority | Item | Effort | Why |
|----------|------|--------|-----|
| **P0** | **Swap: correct to Oracle mint/burn** — remove price-impact, add gear Advanced Settings (Price Safety Net + Deadline), live Oracle-rate footer, Phase-1 2-step + gas confirm, auto-cancel terminals (§3) | L | Current screen uses the wrong (AMM) pricing model and is missing the card chrome the Token Swap PRD requires. |
| **P0** | **Trade (Order Book) net-new page** (§5) | L | Entire feature missing; reuses improved Swap spine. |
| **P1** | **Buy OTC preview rows + countdown + inventory block** (§2) | M | Several required rows + AC-BUY-04 auto-refresh. |
| **P1** | **Cross-cutting gas/naming/prompt-count pass** (§6) | S–M | Correctness + consistency across all four flows. |
| **P2** | **Send: sender row + self-send decision + prompt helper** (§4) | S | Page is strong; small compliance items. |
| **P2** | **Wallet: Unverified state + re-verify banner** (§1) | S | Polish; reuses existing patterns. |

**Suggested sequence:** P0 Swap → P0 Trade (shares Swap's machinery) → P1 Buy OTC → P1 cross-cutting → P2 Send/Wallet polish.

---

## 8. Design-system components & patterns each fix draws on

Everything above is buildable **without new primitives** — it composes existing DS assets:

- **Components:** `Button`, `Input`, `Select`, `Checkbox`, `Stepper`, `Card`, `Badge`, `WalletPill`.
- **Pattern cards:** **Transact Flows** (stepper, review, processing chips, success receipt), **Edge & Error Cases** (soft banners, validation, prerequisite gates, KYC banner, rate-expired banner, empty/inventory states), **Core** (summary rows, `fee-info-btn` tooltip, `scope-tab` segmented control, asset mini-buttons), **Navigation** (nav spine, TRANSACT dropdown, disconnected gate).
- **Tokens:** `--brand-deep-blue` (progression/CTAs), `--fin-up`/`--fin-down`/`--fin-neutral` (money direction only), `--warning`/`--surface-warning-soft` (cautions: slippage, wrong network), `--error`/`--surface-error-soft` (failures: insufficient balance/inventory), `--surface-impact` (summary cards), `--font-stat-size` (KPI figures, tabular numerals).
- **Template:** `templates/consumer-page/` as the scaffold for the net-new **Trade** page.

> **Open decisions for you (flagged, not assumed):**
> 1. **Send self-send** — hard block (strict doc) vs soft block with confirm (current). 
> 2. **Buy OTC token symbol** — hUSD vs hCAD on that surface. 
> 3. **Trade order book depth** — build the order ticket only, or also a (read-only) depth view? If the latter, I'll need a data source rather than fabricated market data.
