# Stablecoin Feedback 07-24 — Analysis, Status & Improvements

**Sources analyzed:** `video1434687912.mp4` (51:36 grooming call, Vietnamese — walkthrough + STT transcript), the 10 Slack screenshots (`Screenshot 2026-07-26 at 14.18.11` → `14.19.06`), `transcript-vi.md` (28-topic verified walkthrough), `topics.json`, and the prior `feedback-07-24.html` report.
**Design reviewed:** `Stablecoin July26` — `UNERA hUSD Portal.dc.html` + `ui_kits/auth/index.html` (the files behind the Claude Design share links).
**Date:** 2026-08-01

---

## 1. Who said what (feedback log)

### Kevin (Slack, Mon 3:06–3:44 PM) — Portfolio & rates
1. **Remove "1:1 USD-backed" as a status** — it's an invariant we must always maintain, not a state to display.
2. **Add "updated X seconds ago"** freshness to the total hUSD balance.
3. **Remove the "Ethereum" label** beside the wallet — hUSD is multi-chain.
4. **Show the full wallet address on desktop** (large screens) **+ a copy button**.
5. **Rate terminology:** stablecoin payments (USDC/USDT) use **FX rate**; volatile assets (ETH/BTC) use **exchange rate**, and when an exchange rate is applied, **cite CoinGecko as the source with a hyperlink**.
6. Human Centre content is fine for now; details may change after the lawyer reviews donation mechanisms.

### Eric (Slack, Tue–Thu) — Process
- No further comments; requested final portal review from Hue, Phuong, Ducke, Thanh Son; HC/Donation docs update after Kevin finalizes legal. Proposed the Friday grooming call → became the 07-24 3 PM "collect thoughts" session.

### Ducke Tran (BE review thread, Tue 4:07–4:39 PM) — Backend feasibility
1. **Balance number:** does `$24,180` reflect Total hUSD for the connected account? Across **all networks or the connected network only**? (PRD decision needed.)
2. **Refresh:** feasible — a wrapper around `eth_call`; time-age should be computed on FE.
3. **Smart contract:** does hUSD need the "1 address for all networks" approach? (Contract change if so.)
4. **BE options for cross-network balance:** get-balance API (+cache) vs. event aggregator (+RPC override; error-prone). Decision pending.
5. **Sign up / in PRD gaps:** wallet login missing in UI — is it wanted? Homepage layout spec? Resend-code & magic-link not in PRD — intentional?
6. **Fee collection (Pay with cash):** collect via BE (source-fixed vs target-fixed; floor decimals; neutral rate; **server verifies quote — `ErrQuoteMismatch`**) or via smart contract (% of tokens).
7. **Card Vault → One-Time Guest Checkout** (Paysafe, matching Platform): drop vault UI; 3-step flow separating rate confirmation (soft-lock) from card entry.
8. **Pay with crypto:** don't assume USDC/USDT = 1:1 with hUSD — only hUSD is pegged to USD; USDC/USDT fluctuate.
9. **"Your unique deposit address":** clarify semantics — 1 address ↔ 1 user (PRD Fund Mgmt) vs 1 address ↔ 1 deposit request (design shows the latter: "unique to this request", 60-min expiry). **Edge cases:** what if the user sends more/less than the exact amount? Crypto refunds if minted at an undesired rate?
10. **Order status "Under review"** is not implemented on the Platform yet — needs a ticket.

### From the call itself (walkthrough highlights)
- Rate-source labels must reflect the real provider (the USDT demo showed KuCoin; Kevin's standing rule is CoinGecko — align on one).
- User-facing copy should say **Purchase**, not "mint" (Eric's terminology rule).
- Settings still showed a saved-card vault — clashes with guest checkout this phase.
- Quote-expired state (badge + "Refresh quote" CTA) confirmed as required.
- KYC states: Level-gating shouldn't block read-only browsing; "KYC in review" nav state kept.

---

## 2. Status vs. the current design (July 26 files)

Already implemented in `UNERA hUSD Portal.dc.html` / `ui_kits/auth/index.html` (verified in code):

| # | Feedback | Where it's handled |
|---|----------|--------------------|
| K1 | 1:1 chip removed as status | Hero pill now shows freshness only; code comment "1:1 backing is an invariant, not a status (Kevin 2026-07)" |
| K2 | "Updated Xs ago" | Hero data pill, `dataAge` ticks on FE |
| K3 | "Ethereum" label removed | Hero shows network dot + "Wallet" + address only; balance labeled "connected network" |
| K4 | Full address + copy | Responsive `addr-full` (desktop) / `addr-short` (mobile) + copy button w/ "Copied" state |
| K5 | FX vs exchange rate + CoinGecko link | `RATES` uses market FX for USDC (0.9998) / USDT (0.9996); volatile assets show "exchange rate" + linked CoinGecko source; stablecoins show "FX rate · currency conversion" |
| D1 | Balance scope | Decision surfaced in UI: headline = connected network; "Balance across networks" card shows per-chain + total |
| D5 | Wallet login | Auth kit has "Continue with wallet" (MetaMask / WalletConnect / Coinbase) with SIWE signature, wrong-network & not-installed states |
| D5 | Magic link | Removed — "not in PRD (Ducke 07-24)"; resend-code flows kept |
| D7 | Guest checkout | Card vault dropped; 3-step Amount → Review (soft-lock 60s) → Card (hard-lock 180s, Paysafe hosted fields); Settings explains no saved cards |
| D8 | USDC/USDT not 1:1 | Market FX rates in quotes and review rows |
| D9 (partial) | Deposit address semantics | "Unique to this request · never reused across users" + 60-min expiry + network warning |
| D10 | "Under review" | Kept in success tracker for grooming (Platform ticket still needed) |
| — | "Purchase" terminology | CTAs are "Review purchase" / "Confirm & purchase" — no user-facing "mint" |
| — | Quote expired | Badge + "Refresh rate to continue" CTA |

## 3. Gaps found → improvements built today (in `UNERA hUSD Portal.dc.html`)

1. **Manual balance refresh** (Kevin freshness + Ducke "refresh is feasible — eth_call wrapper"): added a refresh icon-button inside the hero freshness pill; resets the age counter (FE-computed, per BE guidance).
2. **`ErrQuoteMismatch` state** (Ducke's server-side quote verification had no UI): added a Review-step alert banner — "The rate changed while you were reviewing… quote refreshed, review and confirm again." Confirm is intercepted, quote auto-refreshes, second confirm proceeds. A demo trigger "Simulate quote mismatch (ErrQuoteMismatch) →" was added to the account menu next to "Simulate unsupported network".
3. **Deposit-address edge-case copy** (Ducke's "sent more/less?" and refund questions): added a disclosure under the deposit card — hUSD is created for the amount that actually arrives at the locked rate; overpayments and post-expiry transfers auto-return to the sending address (network fees deducted). **Proposed policy — PM to confirm before implementation.**

All three verified by rendering the updated file in Chromium (screenshots reviewed; banner appears on confirm and clears on re-confirm).

**Auth kit (`ui_kits/auth/index.html`): no changes needed** — all auth feedback from the 07-24 round is already implemented there.

## 4. Still open — decisions needed (PM/BE, not design)

1. **Balance PRD:** connected account vs all bound wallets; single vs aggregated network total (D1/D3/D4). Design supports both states; BE must pick API vs aggregator.
2. **Contract:** one address across all networks? (Affects the smart contract, not the UI.)
3. **Deposit-address semantics:** per-user vs per-request (design currently shows per-request). PM to reconcile with PRD Fund Management.
4. **Partial-payment & refund policy:** confirm (or amend) the proposed copy added today.
5. **Rate provider:** CoinGecko (Kevin's rule, currently in design) vs KuCoin (mentioned for USDT in the call) — pick one and keep the label truthful.
6. **"Under review" status:** create the Platform BE/FE ticket.
7. **Homepage layout:** still unspecified in PRD.
8. **HC/Donation copy:** pending legal review (Kevin), Eric to update docs after.

## 5. Applying this to Claude Design

The updated `UNERA hUSD Portal.dc.html` replaces the same-named file in your local `Stablecoin July26` folder (already saved back to disk). To update the Claude Design project, replace the file `UNERA hUSD Portal.dc.html` in the project with this updated version (drag-and-drop in Claude Design), or paste section 3 above as instructions to Claude Design. `ui_kits/auth/index.html` needs no changes.
