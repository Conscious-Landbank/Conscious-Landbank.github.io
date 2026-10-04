# Stablecoin Feedback 07-24 — Analysis, Status & Improvements

**Sources analyzed:** `video1434687912.mp4` (51:36 grooming call, Vietnamese — verified topic walkthrough + 17 sampled video frames reviewed directly + STT reference), the 10 Slack screenshots (`2026-07-26 14.18.11` → `14.19.06`), **new: `Screenshot 2026-08-01 at 15.51.24.png` (Kevin, Thursday 11:54 AM — personalization)**, `transcript-vi.md`, `topics.json`, `feedback-07-24.html`, and the July26 `_audit/` docs (PRD gap analysis).
**Design audited:** `Stablecoin July26` — `UNERA hUSD Portal.dc.html` + `ui_kits/auth/index.html` (the files behind the Claude Design share links).
**Last updated:** 2026-08-03 (round 3 — full audio re-transcription of the meeting recording; recovered the spoken feedback the earlier walkthrough missed. See §7 for the new items and §8 for the detailed improvement specs.)

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

---

# ROUND 3 (2026-08-03) — Audio deep-dive: the missed spoken feedback

**Method:** the meeting audio (`audio1434687912.m4a`, 51:36) was re-transcribed in full with a Whisper multilingual model (the earlier vosk transcript was unusable). The second half of the recording is much quieter (mic/gain change ~22 min in), which is exactly why earlier passes missed it — it required loudness normalization + chunked decoding to recover. Every item below carries its timestamp so you can verify against the recording. Confidence: **[H]** = clear from transcript + on-screen frame; **[M]** = clear topic, phrasing partially reconstructed; **[?]** = needs confirmation with the team.
**Unrecoverable zones:** ~26:46–29:00 and ~50:20–51:36 remain unintelligible (very low audio); if you remember other decisions from those minutes, add them manually.

## 7. Newly recovered feedback items (from the recording)

| # | Time | Feedback (reconstructed) | Conf. |
|---|------|--------------------------|-------|
| V1 | 01:05–01:56 | **Proof of Reserve should be the homepage.** Make the brand/home icon (logo) lead to PoR and treat PoR as the landing page; drop the separate "Proof of Reserve" text item from the nav menu (icon-only / logo entry, no small "Proof of Reserve" label). Kevin also had feedback on this nav area. | H |
| V2 | 09:24–09:58 | PoR **charts section needs more research/brainstorming** — as-is it's under-informative ("còn phải customize… nó thiếu thông tin"). | M |
| V3 | 09:51–11:30 | **Add values on chart hover.** When hovering the PoR charts (composition donut, custodians, maturity ladder, supply trend) show the underlying number/ratio ("khi hover phải hiện số… donut này bao nhiêu, ratio bao nhiêu… thêm thông tin ở đây — cái này cũng vậy"). | H |
| V4 | 12:07–15:28 | **Bank-transfer funding needs a real "transfer instructions" step.** When the user picks Bank transfer: let them pick the UNERA receiving account (payee-management-like), then show the transfer details **with a QR code** the user can scan in their mobile banking app (VietQR-style); success state after the transfer is detected. Don't hard-code the receiving bank — it can change. | H |
| V5 | 06:02–07:51 & 18:51–19:30 | **Move the funding-method choice to a later step.** Amount step should be just amount/currency; the Card vs Bank-transfer choice belongs at the pay step (consistent with guest checkout: Amount → Review soft-lock → Pay, where you pick method and enter card or see wire instructions). | M |
| V6 | 17:57–18:26 | **Activity shouldn't be only a simplified list** — keep the compact "Recent activity" widget but there must be a dedicated page/view for the full history. *(The current build already has the Activity page — verify it satisfies this.)* | M |
| V7 | 20:00–21:07 | **Notifications should include KYC/verification status events** (approved / needs action / rejected → notify with next step), not just purchase/redeem/payout/service notices. | M |
| V9 | 22:59–24:15 | **Sign-up + KYC must mirror the existing UNERA Platform flow exactly** ("y chang cái bên kia") — don't invent a custom flow; only diverge where the stablecoin entity legally requires it. | H |
| V10 | 25:00–25:16 | The first version showed **too much information — keep the decluttered version** (the stripped-down iteration was the right call). | M |
| V11 | 29:40–31:20 | **Balance freshness should be automatic.** Manual refresh is fine but the ideal is auto-refresh (periodic re-poll); the "updated Xs ago" age must restart from each refresh. | H |
| V12 | 31:46–32:22 | The networks card **implies one contract address across all networks** — confirm with BE/SC whether that's real (Ducke's smart-contract question); don't imply it in UI if untrue. | M |
| V13 | 32:30–33:44 | **Show the hUSD contract address per network** (each chain has its own contract), each with a verify/explorer link — e.g., under each row of "Your balance across networks", or better placed on the Proof-of-Reserve page. | H |
| V14 | 33:49–34:37 | Wallet views display **one network at a time** — per-network transaction counts/details should follow the selected network (Ethereum shows Ethereum's tx, Base shows Base's). | M |
| V15 | 42:40–44:40 | **Mid-transfer rate movement (crypto deposits):** rate is locked at initiation; if it moves before the transfer confirms, surface the updated rate and let the user **continue or cancel**; refund path if the outcome is unacceptable (ties to Ducke's refund question). | M |
| V16 | 44:51–46:50 | **Add a small slippage disclaimer** under the crypto quote: a one-line note **with a concrete number** (e.g., "actual amount received may differ by up to ±0.5%") — explicitly **not** a user-selectable slippage control (that's a future plan; needs contract changes). | H |
| V17 | 49:25–50:20 | "Under review" is specifically the **AML / anti-money-laundering screening** before mint — the step copy should say so ("Identity & AML checks"); BE task exists for this status. | M |
| V18 | 40:04–40:37, 48:45–48:55 | Process: timeline depends on BE + legal/compliance; design stays as-is for now, feedback continues after implementation starts; nothing above is "final-final" yet. | M |

*(V8 — 2FA verify demo at 22:18 was walkthrough, not feedback. Numbering kept for timestamp traceability.)*

## 8. Detailed improvement specs (what to change in `UNERA hUSD Portal.dc.html`)

**8.1 — PoR as homepage (V1) · Priority: HIGH**
Make the logo/home icon navigate to Proof of Reserve for all users (it is already the public landing); remove "Proof of Reserve" from the nav's text menu items (Portfolio · Get hUSD · Redeem · Activity remain). Keep a compact "Proof of reserve" chip-button on the Portfolio hero (already exists) so signed-in users still reach it in one click. Acceptance: no "PROOF OF RESERVE" text item in the nav; clicking the UNERA logo opens PoR; browser-back returns to the previous screen.

**8.2 — Chart hover values (V3) · Priority: HIGH**
Add hover/focus tooltips to every PoR chart: composition donut (asset type, $ amount, % of reserves per slice), "Where reserves are held" bars (custodian, $, %), maturity ladder (bucket, %), circulating-supply trend (date, supply value at cursor), reserve-yield split ($ per destination). Include keyboard-focusable equivalents (`tabindex` + visible value readout) for accessibility, and show the same value as a caption on tap for touch devices. Acceptance: hovering any chart element shows its exact value; nothing is hover-only-invisible on mobile.

**8.3 — Bank-transfer instructions step (V4) · Priority: HIGH**
For Get hUSD → Pay with cash → Bank transfer, after Review & confirm add a "Make your transfer" step mirroring the crypto deposit card: UNERA receiving account picker (bank name, account, reference code), a **QR code** encoding the transfer for mobile-banking scan (VietQR-style), unique reference per request + validity window, copy buttons per field, and a "Transfer detected" → "Under review" → "Completed" tracker identical to the crypto path. Receiving account must come from data (not hard-coded) since it can change.

**8.4 — Funding method placement (V5) · Priority: MED**
Remove the FUNDING METHOD (Card | Bank transfer) selector from the Amount step; keep Amount = amount + currency + receive network + quote only. Ask for the method on the Pay step: Card → existing guest-checkout hosted fields; Bank transfer → the 8.3 instructions screen. Review step shows "Funding method · chosen at payment".

**8.5 — Per-network contract addresses (V13, V12) · Priority: MED**
Replace the single "hUSD contract" row with per-network rows (Ethereum / Arbitrum / Base), each with its full address, copy button, and explorer link — and surface the same list on the PoR page ("Proof & audit" section). If BE confirms a single deterministic address across chains, keep one row but label it "same address on all supported networks" explicitly (don't leave it ambiguous).

**8.6 — Slippage disclaimer (V16) · Priority: MED**
Under the crypto-quote rows (Amount + Review steps), add one muted line: "The exact hUSD received can differ slightly (up to ±0.5%) if the market moves while your transfer confirms — your receipt shows the final rate." Number comes from config; no user control. Pairs with the existing ErrQuoteMismatch banner and refund copy.

**8.7 — Auto-refresh balance (V11) · Priority: LOW (mostly done)**
Current build already simulates periodic auto-refresh (age resets ~every 40 s) and has the manual refresh icon. Spec for production: poll on a fixed interval + on window refocus + after any transaction; age counts from last successful poll; manual refresh forces one.

**8.8 — KYC notifications (V7) · Priority: LOW**
Add verification events to the notification centre mock: "Identity verified — Level 2 unlocked" (success) and "Verification needs attention — resubmit your document" (warning, links to settings → Your identity verification).

**8.9 — AML wording on "Under review" (V17) · Priority: LOW**
Change the mint/burn timeline sub-copy "Identity and safety checks" → "Identity & AML screening" (matches what the step actually is; still pending its Platform ticket).

**8.10 — Confirmations (V9, V6, V14)**
V9: cross-check the auth kit's sign-up/KYC screens against the live Platform flow screen-by-screen before implementation (kit already mirrors it structurally — verify field-level parity). V6: current Activity page satisfies "not just a list" — confirm with the team. V14: wallet cards already show per-wallet tx counts; ensure counts are per-network once BE lands.

## 9. Audit — current build vs the new items (2026-08-03)

| Item | Status in current `UNERA hUSD Portal.dc.html` |
|------|----------------------------------------------|
| V1 PoR as homepage | ❌ Gap — nav still has a "Proof of Reserve" text item; logo goes to portfolio when signed in |
| V3 Chart hover values | ❌ Gap — no tooltips on any PoR chart (0 occurrences) |
| V4 Bank-transfer instructions + QR | ❌ Gap — bank path has no wire-details/QR step |
| V5 Funding method at later step | ❌ Gap — FUNDING METHOD sits on the Amount step |
| V6 Activity dedicated page | ✅ Exists ("Your activity" page + View all) |
| V7 KYC notifications | ❌ Gap — mock notifications lack verification events |
| V9 KYC mirrors Platform | ✅ Structurally (auth kit follows Auth/KYC spec §4) — needs team confirmation |
| V10 Keep decluttered version | ✅ Current build is the decluttered iteration |
| V11 Auto-refresh | ✅ Simulated (age auto-resets ~40 s) + manual refresh built in round 1 |
| V12 One-address assumption | ⚠️ Open BE/SC question — UI currently shows a single contract row |
| V13 Per-network contract addresses | ❌ Gap — single "hUSD contract" row, no explorer links |
| V15 Mid-transfer rate change | ✅ Partially — ErrQuoteMismatch banner + refund copy cover it; per-tx "continue or cancel" state not mocked |
| V16 Slippage disclaimer | ❌ Gap — no slippage note anywhere |
| V17 AML wording | ⚠️ Minor copy change pending ("Identity and safety checks" today) |
| V18 Not final yet | — Process note |

**Suggested build order:** 8.1 → 8.2 → 8.3 (high, user-visible) → 8.4/8.5/8.6 (medium) → 8.7/8.8/8.9 (low). Items 8.3–8.5 should be confirmed with Ducke/PM first since they touch BE contracts (receiving-account API, per-network contracts, checkout sequence).
