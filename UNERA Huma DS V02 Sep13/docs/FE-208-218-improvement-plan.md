# Improvement plan: FE-208 and FE-218

**Date:** 26 Aug 2026
**Tickets:** FE-208 "UI/UX - Update design of HC and Donation features" (READY) · FE-218 "UI/UX - Update swap flow to serve AMM swap approach" (In Progress)
**Sources read live:**

- Confluence: Huma Platform - Humanity Centers (88768526, v4) and Huma Platform - Donation (74579981, v16, both 21 Aug)
- Slack #ecosystem thread (Kevin, 13-25 Aug): AMM approach, swap UI review, Kevin's rulings of 25 Aug
- Slack Huma design thread (Eric, 24 Aug): dashboard restructure, donation method changes, multisig visibility
- Slack buy-token thread (Renol's update, 23-25 Aug): method-first fiat, deposit address per account, refund and FIFO rules
- This project at current state, checked by grep against `unera-pages/`

**Baseline:** the 22 Aug FE-208 pass (`CHANGES-FE-208.md`, `docs/FE-208-audit.md`) closed the PRD gaps as of 21 Aug. Everything below is what the 24-25 Aug decisions added or reversed, plus what was never closed.

**Re-audit, 26 Aug (second pass, after implementation):** §2.1, §2.3, §3.3, §3.4, §3.5 and §3.6 are now built and marked DONE below. Still open: the nav-label ruling (§3.1), the swap prompt-copy ruling (§2.2), the BTC/donationRouter architecture ruling (§3.7), and the §4 carried-over rulings.

## 1. Already done, verified in the current build

No action needed on these; listed so nobody re-does them.

**Swap (`exchange.html`), FE-218:**
- Platform fee kept, shows **FREE** in green uppercase (Kevin, 25 Aug)
- "Price refreshes in Xs" replaces "Price held for X seconds"
- Net received removed; Minimum received (after slippage) kept
- Single "Estimated gas" row replaces the Approve/Swap gas split
- "Once submitted, this swap can't be canceled" removed
- "Swap tokens through the AMM" subtitle removed
- Fixed-amount chips (100 / 500 / 1,000) + Max on the pay amount
- Slippage row inline on the form, advanced gear for deadline
- Success shows **Transaction hash** as an Etherscan link

**Wallet (`wallet-enhanced.html`):**
- Trade replaced by Donate in TRANSACT nav and quick actions (Kevin, 24 Aug)
- Portfolio value-over-time chart added

**Dashboard restructure (`dashboard-enhanced.html`), re-audited 26 Aug — DONE:**
- The Dashboard is donation-first: total donated / lives impacted / Huma Points summary cards, recent donations, an HC picker with a Donate CTA, and the value-proposition hero with the six funding streams
- It is the first page after login: `login_2.html` redirects every path (password, wallet, social) to `dashboard-enhanced.html`
- Dashboard and Portfolio are split: only a minimal "Available to donate" balance card lives on the Dashboard, with a "Full portfolio in Wallet Dashboard" link; balances, holdings, and the portfolio chart live in `wallet-enhanced.html`
- Activities are split: Dashboard shows recent donations linking to `donation-history.html`; wallet transaction activity stays on the wallet page
- Role-distinct actions exist: the personal summary section is hidden for public visitors, the hero swaps "Log in to see your impact" for "Donate now" by session, and the balance card has connected / disconnected / unavailable states

## 2. FE-218 swap: remaining work

### 2.1 Custom slippage and deadline entry — DONE (26 Aug)
Ducke asked for free-entry values; Kevin approved. Now built: a "Custom %" input sits beside the slippage preset pills and a "Custom min" input beside the deadline presets in the advanced popover. Custom entry clears the preset selection, feeds the same quote/summary/warning pipeline (the ≥1% high-slippage warning fires on custom values too), and presets clear the custom field. Clamped at 50% / 4320 min.

### 2.2 Wallet-prompt copy — conflict, needs a ruling before editing
The review step still says *"This needs 2 wallet confirmations: approve, then confirm the swap"*, and a while-you-wait fact repeats it. Thanh Son's position: with Permit2 it is 1 off-chain signature + 1 confirmation; with multicall it is 1 transaction. Kevin's 25 Aug ruling explicitly removed the gas split and the irreversibility text but did not rule on the prompt-count line, and `CLAUDE.md` §3 still binds Phase 1 to 2 transactions with Permit2 as Phase 2. **Do not change the copy until Product picks approve-then-swap vs Permit2/multicall for phase 1.** Whichever wins, update the review line, the tooltip, the tracker fact, and the `CLAUDE.md` §3 table together.

### 2.3 Retire the order-book Trade surface — DONE
Confirmed done (25–26 Aug): Trade is out of the navs and quick actions; Donate replaced it.

### 2.4 Verify slippage placement
Kevin wanted the slippage option obvious on the amount step, coexisting with the advanced control. The inline row exists; **confirm it renders on the amount step (not only at review) at desktop and ≤640px widths.**

## 3. FE-208 HC and Donation: remaining work

The 22 Aug pass matches the 21 Aug PRDs. The 24 Aug Slack thread (Eric, +1'd by Kevin) changes and extends them. FE-208 is still READY, so these are the ticket's real scope now.

### 3.1 IA restructure — DONE, one residual
**Done (verified 26 Aug):** the donation-first Dashboard is built, is the post-login landing page, is split from Portfolio, and splits activities (see §1). §3.2's role-distinct actions are also in place: public visitors get no personal summary or history, and the hero routes them to login.

**Residual, still open:** the desktop nav entry is still labelled **DASHBOARD**. Eric asked for **Humanity Centers** or **Donation**; the label was never ruled. Once ruled, rename it in the nav lockup on every page (source of truth `account-settings.html`) and restate `CLAUDE.md` §4c against the final page names.

### 3.3 HC detail popup from the list — DONE (26 Aug)
Eric: each item in the HC list gets a button to view the HC detail in a popup. Built in `explore-centres.html`: every card now has a **Quick view** button opening a modal (hero image, name, location + category, description, total donated / lives impacted with the "Coming soon" fallback, programs, Donate + Full details actions). Escape/backdrop close, focus restore, `[hidden]` display pair. The full `centre-detail.html` page stays for deep links.

### 3.4 Bank transfer as a second fiat method — DONE (26 Aug)
Built in `donate.html` / `donate-flow.js` / `donation-data.js`: the fiat path now opens with a **Card / Bank transfer** selector. Bank transfer shows the receiving account (holder, bank, IBAN, BIC — prototype details) at review, and confirming produces a **"Waiting for your bank transfer"** pending terminal with the exact transfer amount, the reference (the donation ID, per "match your transfer"), and an **expiry** (72 h, per Kevin's expiration rule), status `pending_payment`. Bank fee is a labelled prototype rate (0.8%, TBD Finance). History rows with source = bank transfer are not yet seeded — minor follow-up.

### 3.5 Method first, then currency; no exchange rate for card — DONE (26 Aug)
The fiat step now picks the **method (rail) first**; the currency selector appears **only for bank transfer**. Card is any-currency: the review states the card issuer converts to USD at its own rate and that the rate is only known at settlement — **no exchange-rate row is shown for card**. Bank transfer keeps the DON-FIAT-04 original-currency + rate rows (the rail's rate is known there).

### 3.6 Hide the multisig wallet — DONE (26 Aug)
The "Wallet address" row is removed from the crypto review. The destination is now a neutral "Humanity Center settlement wallet · Managed by Huma, routed through the DonationRouter" — the word "multisig" and the address no longer appear anywhere user-facing. `settlement_destination` stays in the data layer as a BE field.

### 3.7 Crypto donation = approve + transfer via donationRouter — partial
The review's destination line now names the **DonationRouter** (26 Aug). Still open, blocked on an architecture ruling: `promptCount()` treats ETH as a 1-prompt native send (via a router it is a payable contract call — still 1 prompt, so likely fine) and **BTC cannot pass through an EVM donationRouter** — either BTC gets a deposit-address flow like buy-token or it drops from the asset list. The tracker's first stage covers the approve signature; an explicit separate Approve stage for ERC-20s can follow once the transaction model is ruled.

### 3.8 "What your donation does" and unverified HC data
Eric: the "what your donation does" insight is good but **we do not have that data**; other HC data needs clarification with HCA and can be mocked for MVP. **Remove or clearly TBD-tag any per-donation impact breakdown; keep aggregate metrics; mark mocked HCA data with the existing `tbd-tag` pattern** so QA and stakeholders can tell demo data from committed scope.

### 3.9 Shared pattern with buy-token
Eric: donation and buy-token share common UI; make use of it. The buy-token thread also settled rules that will echo into any crypto-receive pattern: one deposit address **per account** (Kevin, final), pending pages carry an **expiration date**, BTC/ETH priced at the rate **when the transaction is processed**, amount mismatch beyond ±5% surfaces a **refund option**, and orders are **FIFO: an incomplete transfer blocks creating a new order**. Donation's crypto path is wallet-signed (not deposit-address) so most of these land in `add-money.html`/purchase flows, but the review layout, method-first step, receiving-account panel, and pending/expiry components should be one shared pattern, not two forks.

## 4. Carried-over items, still open from the 22 Aug pass

Product rulings requested in `CHANGES-FE-208.md` §6 and still unanswered:

1. Multi-HC split: retire it or reinstate it in the spec (spec says out of scope; UI parked behind `?multi=1`)
2. Processing-fee schedule (placeholder rates shipping, labelled)
3. hUSD as a donation asset (spec settlement table excludes it; value prop markets it)
4. OQ-01 anonymous on-chain donations in public totals
5. OQ-02 MVP fiat currency list
6. OQ-03 approved networks
7. OQ-04 Huma Points placement (success, dashboard, or both)
8. HC OQ-03 suspended-HC deep links
9. Per-centre wallets in seed data vs the single defined multisig
10. `requires_resolution` status has no producing flow

Engineering/QA debt: WCAG AA contrast not re-measured for the new chips; receipt PDF is a prototype alert; cross-device and screen-reader passes deferred.

## 5. Suggested order of attack

| Priority | Item | Why first |
|---|---|---|
| ~~P1~~ Done | §3.1 + §3.2 IA restructure and role-split Dashboard | Shipped and verified 26 Aug; only the nav-label rename remains, blocked on a naming ruling |
| ~~P1~~ Done | §3.6 hide multisig | Removed 26 Aug |
| ~~P1~~ Done | §3.5 method-first, no card rate | Built 26 Aug |
| ~~P2~~ Done | §3.4 bank transfer | Built 26 Aug (history seed rows pending) |
| P2 | §3.7 donationRouter prompt model + BTC ruling | Blocks correct confirm-step copy |
| ~~P2~~ Done | §2.1 custom slippage/deadline | Built 26 Aug |
| ~~P2~~ Done | §2.3 retire Trade everywhere | Confirmed done |
| P3 | §3.3 ~~HC popup~~ (done 26 Aug), §3.8 TBD tags, §3.9 shared components | Valuable, not blocking |
| Ruling needed | §2.2 swap prompt copy, §4 items 1-10 | Cannot be designed unilaterally; flag, do not pick |

## 6. Decisions the team still owes us

- Swap phase 1 transaction model: approve+swap (2 prompts) vs Permit2/multicall (§2.2)
- The renamed nav label: "Humanity Centers" vs "Donation" (§3.1, the only piece of the IA restructure still open)
- BTC's place in the crypto donation path once donationRouter is the mechanism (§3.7)
- The ten carried-over rulings in §4
