# Validation, edge & error-case audit (2026-07)

**Specs re-fetched (Confluence, conscious-landbank.atlassian.net):**
UNERA Stablecoin Portal PRD (61276166, v14) · Authentication & KYC (20152341, v7).
**Artifacts audited:** `UNERA hUSD Portal.dc.html` (issuance/redemption/wallets) and the
prior auth-kit passes (`ui_kits/auth/index.html`, covered in `Auth-Session-audit-2026-07.md`
Pass 5c — login lockout, OTP attempt limits, reset-link expiry, anti-enumeration — no new gaps).

## Gaps found in the portal (now fixed)

The transaction flows rendered a conversion preview but performed **no amount validation** —
the CTA was gated only on connection / KYC / network / quote-freshness, so a user could submit
$0, an amount below the minimum, above the per-tx cap, over the daily limit, or (on redeem)
more than their balance.

| # | Flow | Missing case | Spec ref | Fix |
|---|---|---|---|---|
| 1 | Issuance | Below `min_issue_amount` | §5 | Inline error "Minimum issuance is $10." + CTA disabled |
| 2 | Issuance | Above `max_issue_amount_per_tx` | §5 | Inline error "Maximum per transaction is $50,000." |
| 3 | Issuance | Over `daily_issue_limit_per_user` remaining | §5 | Inline error "Over your remaining daily limit of $45,000." |
| 4 | Issuance | Empty / zero amount | ISS-09 | CTA reads "Enter an amount", stays disabled |
| 5 | Redemption | Amount exceeds hUSD balance | §6.3 | Inline error "Amount exceeds your balance of 24,180.42 hUSD." + CTA disabled |
| 6 | Redemption | Below minimum redemption | §6.3 | Inline error "Minimum redemption is 10 hUSD." |
| 7 | Redemption | No bank account on file | RED-01 | CTA "Add a bank account to continue", disabled |
| 8 | Redemption | Not connected on redeem screen | Dashboard §7 | CTA now mirrors issuance (Connect / reason gating) |

Validation reuses the existing dark token set (`--down` for errors) and the same disabled-CTA
treatment already used by the issuance button. Amount errors surface live under the input as the
user types; the review CTA label states the specific blocker.

## Already conformant (verified, no change)

- Issuance rate freshness: 60-s countdown + `quoteExpired` gate (ISS-10).
- Redemption liquidity queue + SLA copy (`willQueue`, RED-02/RED-05).
- Account/service states incl. 4 KYC statuses, L1/L2 gating, region/maintenance/data-down
  banners, unsupported-network banner (Passes 1–4).
- Wallets page edge/error set (empty state, remove/disconnect confirm, bind limit, duplicate,
  unsupported-network switch, verifying state) — added this cycle.

Backend-enforced controls (server-side rate limits, sanctions/PEP screening, compliance holds,
webhook signature validation) remain backend concerns, represented in copy only.

## Responsiveness pass (2026-07)

Audited both artifacts across phone → large-desktop widths.

**Auth kit** — well covered: split grid collapses and hides the brand panel at ≤820px;
form padding/card radius reduce at ≤520px; OTP boxes switch from fixed 50px to flex; the
password checklist and backup-code grid drop to a single column at ≤520/≤360px. No changes.

**Portal** — comprehensive `data-r` media layer already present (g2 @1080 → 1 col; g3 @900 → 2,
@720 → 1; g4 @720 → 2, @460 → 1; activity table horizontal-scroll with min-width row; hero
balance/coin/H1 scale-downs; nav → hamburger drawer at ≤960 with the new Wallets entry; wallet
cards stack at ≤640). Verified clean at tablet (909px).

- **Fix:** the Proof-of-Reserve 4-up stat grid (`Total reserves / Excess / Avg. maturity /
  Last audit`) was a hard `1fr 1fr` with no breakpoint — at phone widths the 2.1rem figures
  (e.g. `$1,315.2M`) crowded. Added a `g2phone` hook that collapses it to one column at ≤560px.

All other multi-column regions already carry a responsive hook or wrap with flex-`gap`.
