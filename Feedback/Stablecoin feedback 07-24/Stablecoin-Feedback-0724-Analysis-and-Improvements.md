# Stablecoin Feedback 07-24 — Analysis, Status & Improvements

**Sources analyzed:** `video1434687912.mp4` (51:36 grooming call, Vietnamese — verified topic walkthrough + 17 sampled video frames reviewed directly + STT reference), the 10 Slack screenshots (`2026-07-26 14.18.11` → `14.19.06`), **new: `Screenshot 2026-08-01 at 15.51.24.png` (Kevin, Thursday 11:54 AM — personalization)**, `transcript-vi.md`, `topics.json`, `feedback-07-24.html`, and the July26 `_audit/` docs (PRD gap analysis).
**Design audited:** `Stablecoin July26` — `UNERA hUSD Portal.dc.html` + `ui_kits/auth/index.html` (the files behind the Claude Design share links).
**Last updated:** 2026-08-01 (round 2 — added video-frame verification, Kevin's personalization feedback, and a full item-by-item audit)

---

## 1. Who said what (feedback log)

### Kevin (Slack, Mon 3:06–3:44 PM) — Portfolio & rates
1. **Remove "1:1 USD-backed" as a status** — it's an invariant we must always maintain, not a state to display.
2. **Add "updated X seconds ago"** freshness to the total hUSD balance.
3. **Remove the "Ethereum" label** beside the wallet — hUSD is multi-chain.
4. **Show the full wallet address on desktop** (large screens) **+ a copy button**.
5. **Rate terminology:** stablecoin payments (USDC/USDT) use **FX rate**; volatile assets (ETH/BTC) use **exchange rate**, and when an exchange rate is applied, **cite CoinGecko as the source with a hyperlink**.
6. Human Centre content fine for now; details may change after the lawyer reviews donation mechanisms.

### Kevin (Slack, Thu 11:54 AM — NEW, Screenshot 2026-08-01) — Personalization
7. **Personalize the after-login dashboard copy** — e.g., "**Your** hUSD balance" instead of "hUSD balance" — and "**please apply for all the widget and text in the page wherever you see appropriate**". (His screenshot shows the current build — the freshness pill, refresh icon, and full address are already in — so this is feedback on the latest iteration. Note: the thread contains a "…" between his two messages; if more messages exist in that gap, capture them next sync.)

### Eric (Slack, Tue–Thu) — Process
- No further comments; requested final portal review (Hue, Phuong, Ducke, Thanh Son); HC/Donation docs update after Kevin finalizes legal; set up the 07-24 3 PM grooming call. Terminology rule: user copy says **Purchase**, never "mint".

### Ducke Tran (BE review thread, Tue 4:07–4:39 PM) — Backend feasibility
1. **Balance number:** is `$24,180` the Total hUSD for the connected account? All networks or connected network only? (PRD decision.)
2. **Refresh:** feasible — wrapper around `eth_call`; time-age computed on FE.
3. **Smart contract:** "1 address for all networks" — contract change needed if so.
4. **BE options for cross-network balance:** get-balance API + cache (invalidate on transfer) vs event aggregator + RPC override (complex, error-prone).
5. **Sign up/in PRD gaps:** wallet login not in UI — wanted? Homepage layout spec? Resend-code & magic-link not in PRD — intentional?
6. **Fee collection (Pay with cash):** via BE (source-fixed vs target-fixed; floor decimals; neutral rate; **server verifies quote — `ErrQuoteMismatch`**) or via smart contract (% of tokens).
7. **Card Vault → One-Time Guest Checkout** (Paysafe, same as Platform): drop vault UI; 3-step flow — Enter Amount → Review & Confirm (soft-lock) → Card entry.
8. **Pay with crypto:** don't assume USDC/USDT = 1:1 hUSD — only hUSD is pegged to USD.
9. **"Your unique deposit address":** 1 address ↔ 1 user (PRD Fund Mgmt) vs 1 address ↔ 1 deposit request (design: "unique to this request", 60-min expiry). **Edge cases:** more/less than exact amount sent? Crypto refunds at undesired rate?
10. **"Under review" order status** not implemented on Platform — needs a ticket.

### Video walkthrough (visually verified from frames)
- July19 build showed the issues Kevin flagged: `1:1 USD-backed · reserve data current · updated 14s ago` chip, `Wallet 0x74…3a8f · Ethereum` row, truncated address, `Balance refreshed 30s ago · Refresh` (frame 32:00).
- July19 crypto flow displayed `1.0000 USDC = 1.0000 hUSD · live FX rate` — the hard-coded 1:1 Ducke rejected (frame 38:00).
- July19 review CTA said **"Confirm & mint"** (frame 08:00) — later corrected to "Confirm & purchase" per Eric's rule.
- Rate-source label must reflect the real provider (KuCoin appeared for USDT in the call; Kevin's rule is CoinGecko — align on one).
- Redeem $6,045 → $6,038.96 USD to RBC ···4821, fee 0.10 %, ~1 business day (frame 17:30).
- Auth: Create account step 1 of 4, password checklist, "Every hUSD is backed 1:1" marketing panel (frame 23:00); notifications panel; KYC-in-review + Connect-wallet nav states while browsing Get hUSD read-only (frame 10:00).
- Audio note: the machine STT (vosk-small-vn) is unreliable; the verified walkthrough (Phần 1 of `transcript-vi.md`) + frame review are the authoritative record.

---

## 2. Item-by-item audit — current design vs all feedback (2026-08-01)

Verified by code inspection **and** Chromium render of the current files.

| # | Feedback item | Status | Evidence in current build |
|---|---------------|--------|---------------------------|
| K1 | 1:1 chip not a status | ✅ Done | 0 occurrences of the chip; hero pill = freshness only |
| K2 | "Updated Xs ago" on balance | ✅ Done | Hero pill, FE-ticked `dataAge` |
| K3 | No "Ethereum" beside wallet | ✅ Done | Network dot only; balance scoped "connected network" |
| K4 | Full address on desktop + copy | ✅ Done | `addr-full`/`addr-short` responsive swap + copy w/ "Copied" state |
| K5 | FX vs exchange rate + CoinGecko link | ✅ Done | USDC 0.9998 / USDT 0.9996 market FX; ETH/BTC → "exchange rate" + hyperlink to coingecko.com |
| **K7** | **Personalized "Your …" copy** | ✅ **Built this round** | See §3 |
| D1 | Balance scope surfaced | ✅ Done | "connected network" label + "Your balance across networks" card + total row |
| D2 | Balance refresh (eth_call) | ✅ Done (prev. round) | Refresh icon-button in hero pill |
| D5 | Wallet login | ✅ Done (auth kit) | MetaMask/WalletConnect/Coinbase + SIWE, wrong-network & not-installed states |
| D5 | Magic link (not in PRD) | ✅ Removed | Comment: "not in PRD (Ducke 07-24)"; resend-code kept (with 3-attempt invalidation + lockout) |
| D6 | Server quote verification UI | ✅ Done (prev. round) | `ErrQuoteMismatch` banner on Review; demo trigger in account menu; quote auto-refresh; re-confirm proceeds |
| D7 | Guest checkout (no vault) | ✅ Done | 3-step, soft-lock 60 s → card hard-lock 180 s, Paysafe copy; Settings explains no saved cards |
| D8 | USDC/USDT ≠ 1:1 | ✅ Done | Market FX rates in quote + review rows |
| D9 | Deposit address semantics + edge cases | ✅ Done (prev. round) | "Unique to this request", 60-min expiry, network warning, wrong-amount/late-arrival/refund copy (**policy proposed — PM to confirm**) |
| D10 | "Under review" status | ✅ In design (Platform ticket still open) | Mint & burn timelines include "Under review · identity and safety checks" |
| E1 | "Purchase", not "mint" | ✅ Done | CTAs "Review purchase" / "Confirm & purchase"; 0 user-facing "mint" CTAs |
| — | Quote expired state | ✅ Done | Badge + "Refresh rate to continue" |
| — | KYC read-only browse | ✅ Done | "KYC in review" nav state; issue/redeem gated, browsing free |
| — | Redeem parity | ✅ Done | Fee row, bank picker, ~1-business-day SLA, queue copy |

**Auth kit (`ui_kits/auth/index.html`): unchanged & fully compliant** — audited this round: lockout after 5 attempts (SAD-3), OTP 3-attempt invalidation, backup codes, KYC handoff flow (doc + selfie + review), post-signup Level 1/Level 2 gating copy, session/idle screens. No changes required.

## 3. Changes built this round (2026-08-01) — `UNERA hUSD Portal.dc.html`

Personalization pass (Kevin K7), signed-in surfaces only — public PoR untouched:

1. Hero: "hUSD balance · connected network" → "**Your** hUSD balance · connected network"
2. "Balance across networks" → "**Your** balance across networks"
3. "Total across networks" → "**Your** total across networks"
4. "Recent activity" → "**Your** recent activity"
5. Activity page h1: "Activity" → "**Your** activity"
6. Redeem screen: "Balance $24,180.42 hUSD" → "**Your** balance …"
7. Settings: "Payment methods" → "**Your** payment methods"
8. Settings: "Identity verification" → "**Your** identity verification"
9. Settings + modal: "Bank accounts" → "**Your** bank accounts" (×2)

Already-personal copy left as-is ("Your linked wallets", "Your unique deposit address", "Your access level", "You pay / You'll receive / You redeem", "Now in your wallet"). All changes render-verified in Chromium.

### Previous round (built 2026-08-01 AM)
- Manual balance refresh in the hero freshness pill (Ducke: eth_call wrapper; age restarts at 0 s).
- `ErrQuoteMismatch` Review-step banner + "Simulate quote mismatch" demo trigger + auto-refresh + re-confirm flow.
- Deposit-address wrong-amount / late-arrival / auto-refund disclosure (proposed policy).

## 4. Remaining suggestions (optional polish — not blockers)

1. **Settings h1 "Payment & payouts"** could read "Your payments & payouts" if Kevin wants the pattern on page titles too — left unchanged to avoid over-applying.
2. **Notifications panel** header left as "Notifications" (convention; personalizing it adds noise).
3. When BE picks the balance mechanism (API vs aggregator), revisit whether "Your total across networks" becomes the headline number with a per-network drill-down — Ducke's Option 1 + cache supports either.
4. The "…" gap in Kevin's Thursday thread: confirm no additional personalization examples were posted between the two captured messages.

## 5. Still open — decisions needed (PM/BE, not design)

1. **Balance PRD:** connected account vs all bound wallets; single vs aggregated total (D1/D3/D4). Design supports both.
2. **Contract:** one address across all networks?
3. **Deposit-address semantics:** per-user vs per-request (design shows per-request) — reconcile with PRD Fund Management.
4. **Partial-payment & refund policy:** confirm/amend the proposed copy.
5. **Rate provider:** CoinGecko (in design, Kevin's rule) vs KuCoin (mentioned in call) — one source of truth, truthful label.
6. **"Under review":** create the Platform BE/FE ticket.
7. **Homepage layout:** still unspecified in PRD.
8. **HC/Donation copy:** pending legal (Kevin), then Eric updates docs.

## 6. Applying this to Claude Design

The updated `UNERA hUSD Portal.dc.html` has been saved to your local `Stablecoin July26` folder (the synced copy of the Claude Design project). To update Claude Design, replace the file `UNERA hUSD Portal.dc.html` in the project with this version (drag-and-drop), or paste §3 as instructions. `ui_kits/auth/index.html` needs no changes.
