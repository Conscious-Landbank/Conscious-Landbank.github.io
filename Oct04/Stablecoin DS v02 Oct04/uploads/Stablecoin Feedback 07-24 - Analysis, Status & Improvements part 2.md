# Stablecoin Feedback 07-24 — Analysis, Status & Improvements — Part 2

**Round 2 audit — 2026-08-01**
**Scope:** re-analysis of the feedback folder (video frames verified directly, new Aug 1 screenshot), full item-by-item audit of the current Claude Design files, and the changes built in response.
**Design audited:** `Stablecoin July26` — `UNERA hUSD Portal.dc.html` + `ui_kits/auth/index.html` (the files behind the Claude Design share links).
**Companion doc:** Part 1 = `Stablecoin-Feedback-0724-Analysis-and-Improvements.md` (full feedback log from the 07-24 call and Slack threads).

---

## 1. What was analyzed this round

- **Video (visuals):** 17 frames sampled across the full 51:36 recording (from `_transcript_work/frames30/`, one per key topic) reviewed directly to verify every claim in the walkthrough. All confirmed — see §2.
- **Video (audio):** the machine STT transcript (vosk-small-vn, Phần 2 of `transcript-vi.md`) is unreliable for Vietnamese/English mix; the verified topic walkthrough (Phần 1) plus the frame review are the authoritative record of the call.
- **New screenshot:** `Screenshot 2026-08-01 at 15.51.24.png` — Kevin, Thursday 11:54 AM (new feedback, see §3).
- **Current design files:** re-staged fresh from disk and byte-verified (a stale sync-cache was detected and worked around; the on-disk portal was confirmed as the current 311,833-byte version containing the round-1 improvements).
- **Supporting files:** `topics.json`, `feedback-07-24.html`, `client_config.json`, `recording.conf`, and the July26 `_audit/` docs (PRD gap analysis, test cases).

## 2. Video-frame verification (visual evidence)

| Frame (time) | What it shows | Confirms |
|---|---|---|
| 08:00 | July19 review screen, CTA **"Confirm & mint"** | Terminology issue — now "Confirm & purchase" per Eric's rule |
| 10:00 | Get hUSD browsed with **KYC in review** + Connect wallet nav states | Read-only browsing while gated — kept in current build |
| 13:00 | Get hUSD Amount: $1,000 → 999 hUSD, USD/CAD funding, rate + expiry | Quote TTL flow |
| 17:30 | Redeem 6,045 hUSD → $6,038.96, RBC ···4821, fee $6.05, ~1 business day | Redeem parity requirements |
| 23:00 | Auth "Create your account" step 1 of 4, password checklist, 1:1 marketing panel | Auth kit baseline |
| 32:00 | July19 portfolio: **"1:1 USD-backed · updated 14s ago"** chip, **"Wallet 0x74…3a8f · Ethereum"**, truncated address, "Balance refreshed 30s ago · Refresh" | Exactly the four things Kevin flagged (chip, network label, short address, freshness/refresh placement) |
| 38:00 | Crypto pay 5,000 USDC → 4,995 hUSD, **"1.0000 USDC = 1.0000 hUSD · live FX rate"** | The hard-coded 1:1 assumption Ducke rejected |
| 45:00 | Review & confirm with deposit-address QR, **"Rate expired — refresh"** state | Quote-expired + deposit-address design |
| 50:30 | Public PoR (signed out), reserve yield $4.62M, Slack scheduling thread | Public/signed-out state; meeting logistics |

Other sampled frames (02:00 PoR gauge/composition/custodians; 05:00 Your linked wallets + account menu; 20:00 notifications panel; 26:00/29:30/35:00 Slack BE threads on fees, guest checkout, sign-up gaps) all match the walkthrough in Part 1.

## 3. New feedback found (Kevin — Thu 11:54 AM, Screenshot 2026-08-01)

> "…we should use the text to make the after login dashboard more personalized — for example: **Your hUSD balance** instead of hUSD balance … please apply for all the widget and text in the page wherever you see appropriate."

His screenshot shows the **current** build (freshness pill, refresh icon, and full wallet address already visible) — so all round-1 changes were seen and this was the only new request. Note: the captured thread has a "…" between his two messages; if messages exist in that gap, capture them next sync.

## 4. Full audit — every feedback item vs the current files

Verified by code inspection **and** Chromium render of the current files.

| # | Feedback item | Status | Evidence in current build |
|---|---------------|--------|---------------------------|
| K1 | 1:1 chip not a status | ✅ Pass | 0 occurrences; hero pill = freshness only |
| K2 | "Updated Xs ago" on balance | ✅ Pass | Hero pill, FE-ticked age |
| K3 | No "Ethereum" beside wallet | ✅ Pass | Network dot only; balance scoped "connected network" |
| K4 | Full address on desktop + copy | ✅ Pass | `addr-full`/`addr-short` responsive swap + copy w/ "Copied" state |
| K5 | FX vs exchange rate + CoinGecko link | ✅ Pass | USDC 0.9998 / USDT 0.9996 market FX; ETH/BTC → "exchange rate" + coingecko.com hyperlink |
| K7 | Personalized "Your …" copy (NEW) | ✅ **Built this round** | See §5 |
| D1 | Balance scope surfaced | ✅ Pass | "connected network" label + networks card + total row |
| D2 | Balance refresh (eth_call) | ✅ Pass (round 1) | Refresh icon-button in hero pill |
| D5 | Wallet login | ✅ Pass (auth kit) | MetaMask/WalletConnect/Coinbase + SIWE; wrong-network & not-installed states |
| D5 | Magic link (not in PRD) | ✅ Removed | Comment "not in PRD (Ducke 07-24)"; resend-code kept |
| D6 | Server quote verification UI | ✅ Pass (round 1) | `ErrQuoteMismatch` banner on Review + demo trigger + auto-refresh + re-confirm |
| D7 | Guest checkout (no vault) | ✅ Pass | 3-step soft-lock/hard-lock Paysafe flow; Settings explains no saved cards |
| D8 | USDC/USDT ≠ 1:1 | ✅ Pass | Market FX rates in quote + review rows |
| D9 | Deposit address + edge cases | ✅ Pass (round 1) | "Unique to this request", 60-min expiry, network warning, wrong-amount/refund copy (policy proposed — PM to confirm) |
| D10 | "Under review" status | ✅ In design | Mint & burn timelines include it (Platform ticket still open) |
| E1 | "Purchase", not "mint" | ✅ Pass | 0 user-facing "mint" CTAs |
| — | Quote expired state | ✅ Pass | Badge + "Refresh rate to continue" |
| — | KYC read-only browse | ✅ Pass | "KYC in review" nav state; gating on actions only |
| — | Redeem parity | ✅ Pass | Fee row, bank picker, ~1-business-day SLA, queue copy |

**Auth kit (`ui_kits/auth/index.html`):** audited in depth this round — lockout after 5 attempts (SAD-3), OTP 3-attempt invalidation + resend, backup codes, 2FA setup/verify, KYC handoff (doc + selfie + review), Level 1/Level 2 gating copy, session/idle/signed-out screens. **Fully compliant — no changes required.** Headings already appropriately personal ("Your backup codes", "You're in", …).

## 5. Changes built this round — personalization pass (Kevin K7)

In `UNERA hUSD Portal.dc.html`, signed-in surfaces only (public Proof of Reserve untouched):

1. Hero: "hUSD balance · connected network" → "**Your** hUSD balance · connected network"
2. "Balance across networks" → "**Your** balance across networks"
3. "Total across networks" → "**Your** total across networks"
4. "Recent activity" → "**Your** recent activity"
5. Activity page h1: "Activity" → "**Your** activity"
6. Redeem screen: "Balance $24,180.42 hUSD" → "**Your** balance …"
7. Settings: "Payment methods" → "**Your** payment methods"
8. Settings: "Identity verification" → "**Your** identity verification"
9. Settings section + modal: "Bank accounts" → "**Your** bank accounts" (×2)

Already-personal copy left as-is ("Your linked wallets", "Your unique deposit address", "Your access level", "You pay / You'll receive / You redeem", "Now in your wallet"). All changes render-verified in Chromium against Kevin's mock.

## 6. Remaining suggestions (optional polish — not blockers)

1. Settings page title "Payment & payouts" could become "Your payments & payouts" if Kevin wants the pattern on page titles too — deliberately not applied to avoid overreach.
2. "Notifications" header left unpersonalized (convention; lower noise).
3. Once BE picks the balance mechanism (API + cache vs aggregator), consider making "Your total across networks" the headline number with per-network drill-down.
4. Check the "…" gap in Kevin's Thursday thread for any uncaptured messages.

## 7. Open decisions (PM/BE — unchanged from Part 1)

Balance scope (connected vs all wallets; single vs aggregated) · one contract address across networks · deposit-address semantics (per-user vs per-request) · partial-payment/refund policy confirmation · rate provider (CoinGecko vs KuCoin) · "Under review" Platform ticket · homepage layout spec · HC/Donation legal copy.

## 8. File state

- `Stablecoin July26/UNERA hUSD Portal.dc.html` — updated on disk (round 1 + round 2 changes). Replace the same-named file in the Claude Design project to publish.
- `ui_kits/auth/index.html` — unchanged; no action needed.
- Part 1 doc (`Stablecoin-Feedback-0724-Analysis-and-Improvements.md`) — updated 2026-08-01 with the combined log; this Part 2 is the round-2 audit record.
