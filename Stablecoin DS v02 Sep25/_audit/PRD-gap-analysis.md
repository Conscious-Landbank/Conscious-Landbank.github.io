# UNERA Stablecoin Portal — PRD gap analysis & UX audit

Audit of the current design-system UI kits (`ui_kits/stablecoin-app/`, `ui_kits/auth/`)
and patterns against the **UNERA Stablecoin Portal PRD** (Confluence, v14, 2026-06-11)
and the **UNERA Ecosystem** overview, cross-referenced with 2026 stablecoin-issuer
best practice (Circle/USDC transparency, GENIUS Act disclosure norms, on/off-ramp UX).

Sources:
- PRD: conscious-landbank.atlassian.net/wiki/.../61276166 (pageId 61276166, v14)
- Ecosystem: conscious-landbank.github.io/Business/UNERA-Overview.html
- Best practice: Circle transparency page, GENIUS Act monthly-disclosure norm,
  Lightspark/Onramper/Stripe onramp UX (locked-quote windows, transparent fees).

All proposed fixes reuse **only** existing design-system tokens, components, and patterns
(Deep Blue spine, Reserve Gold accent, Verified Teal, fin-* semantics, `--por-*`,
Stepper, StatCard, ReserveBar, Badge, StatusPill, Card, Input, Select, Checkbox, WalletPill).

---

## A. HIGH — token identity is wrong vs PRD

- **Finding:** the kits brand the product as **UNERA CAD / hCAD**. The PRD's launch token is
  **hUSD** (US-dollar-pegged, fiat-backed); `peg_currency` may be USD **or** CAD, and
  *additional coins (hCAD, hEUR) are an explicit future-phase, separate-approval item*
  (Goals G2; Non-Goals "Issuance of any stablecoin other than hUSD"; §5; §6.8).
- **Impact:** every screen (nav, dashboard KPIs, purchase/redeem, PoR, history, auth panel)
  names the wrong token. This is the single largest divergence.
- **Fix:** reposition to **hUSD** as the primary token; fiat input CAD/USD → hUSD output.
  Keep the visual system identical.

## B. HIGH — crypto-stablecoin onramp flow missing (PRD §6.2)

- **Finding:** the Purchase flow only models fiat funding. The PRD defines a **second
  issuance path**: send whitelisted **USDC/USDT** to a UNERA deposit address → confirmations
  → compliance → mint hUSD. The current flow has no deposit address, source-asset choice,
  network/confirmation-depth display, or address screening notice.
- **Fix:** add a "Pay with crypto" branch: source-asset Select (USDC/USDT), network Select,
  a copy-able unique deposit address (CISS-10), confirmation-depth progress, and the same
  conversion preview. Reuse Stepper + Input + Select + StatusPill.

## C. HIGH — issuance/redemption status is not surfaced (PRD §6.1, §6.3, §6.9)

- **Finding:** the flow ends at a generic "Done". The PRD defines explicit state machines:
  - Issuance: INITIATED → PAYMENT_PENDING → PAYMENT_SETTLED → COMPLIANCE_CLEARED →
    MINT_ELIGIBLE → MINTED (blocked: COMPLIANCE_BLOCKED, PAYMENT_FAILED, EXPIRED).
  - Redemption: REDEMPTION_INITIATED → BURN_PENDING → TOKENS_BURNED → DISBURSEMENT_APPROVED
    → DISBURSEMENT_PENDING → REDEEMED (+ LIQUIDITY_QUEUED).
- **Impact:** users can't see *where* a mint/burn is (settlement vs compliance vs hold vs
  on-chain mint). Best practice (and trust) demands visible, honest progress.
- **Fix:** a **transaction-status timeline** (vertical stepper of states with timestamps,
  StatusPill per state) on a transaction-detail view and the post-confirm screen. Redemption
  adds a liquidity-check / queue state + "~1 business day" SLA copy (RED-05).

## D. HIGH — Transparency Dashboard is thin vs PRD §6.6

Current PoR has: ratio number, asset-type composition bar, total reserves, two PoR-service
cards. The PRD + best practice require materially more:

| PRD requirement | Present? | Fix (reusing tokens) |
|---|---|---|
| Reserve **ratio gauge** vs 100% floor, color-coded | ✗ (number only) | Radial/linear gauge; fin-up ≥100%, warning band near floor |
| Composition **donut** by asset type | ~ (bar) | Add donut using `--por-*`; keep bar too |
| **Reserve by custodian** (concentration risk) | ✗ | Bar list of custodians (cash banks, fund) — best practice (Circle CUSIP/custodian granularity) |
| **Maturity ladder** (bond/repo buckets) | ✗ | Bar chart by maturity bucket |
| **90-day historical trend** (ratio + supply) | ✗ | Line/area, export control |
| **Yield generated + allocation** (ops vs Humanity Centres), monthly | ✗ | Two-part split card; ties to mission |
| **On-chain hUSD contract address** | ✗ | Mono address + copy + explorer link |
| **Cumulative issuance/redemption volumes** | ✗ | StatCards (no user data) |
| **Downloadable quarterly attestation** PDFs | ~ (verify links) | Document list w/ download + date |
| **Last-updated timestamp + data-source label** per chart (DASH-02) | ✗ | Caption row on every chart |

## E. MED-HIGH — Conversion preview lacks rate freshness (PRD ISS-09/10, CISS-07, RED-08)

- **Finding:** preview shows amount + fee but no **exchange-rate timestamp** and no **60-second
  auto-refresh** (PRD requires refresh before confirm if rate >60s old). Best practice =
  locked-quote window (1–15 min) with a visible countdown; reduces support tickets + FX risk.
- **Fix:** add a "Rate 1.00 USD→hUSD · updated 12s ago · refreshes in 48s" line with a small
  countdown, and a soft re-fetch on expiry. Forex source noted as exchangerate-api/fastforex.

## F. MED-HIGH — Transaction history shape & scope (PRD §6.9, §6.8)

- **Findings:**
  - History includes **Swap** rows (`USDC→hCAD`, `hCAD→USDC`). **Swaps are out of scope** for
    the Stablecoin Layer (§6.8 — only Mint/Burn; swaps/exchange are Platform Layer). The nav's
    "HISTORY → Swap History" is likewise out of scope.
  - Missing fields: `amount_in`/`amount_out` split, `fee`, `rate`, `completed_at`,
    explorer-linked `on_chain_tx_hash`; missing **date-range + type filters**; types should be
    ISSUANCE_FIAT / ISSUANCE_CRYPTO / REDEMPTION_FIAT (user-facing labels Pending/Processing/
    Completed/Failed).
- **Fix:** remove swap; restructure columns to in→out, fee, rate, on-chain hash (explorer
  link), initiated/completed; add date-range + type filter. Reuse StatusPill + Select.

## G. MED — KYC / Auth depth (PRD §6.10 + "Authentication & KYC" page v7)

- **Findings (now grounded in the dedicated Auth & KYC spec, stablecoin-applicable):**
  - **Three access levels gate everything:** L0 (none) → public transparency dashboard;
    **L1** (email + password) → *hold, receive, view balance + history only*; **L2** (KYC
    approved) → **issue & redeem hUSD**, plus receipts/tax documents. Issue/Redeem must be
    gated behind L2 — the dashboard's "verify to unlock" banner is correct in spirit.
  - **2FA is EMAIL-BASED, not authenticator/TOTP** ("avoid phone/SMS dependency in v1").
    The current auth kit's 2FA screen says "authenticator app" — **wrong**; must be a one-time
    code emailed to the registered address. (Note: the main PRD AUTH-02 mentions TOTP; the
    dedicated, newer Auth & KYC page specifies email-based — follow the latter, flag the conflict.)
  - **KYC is a Sumsub hosted flow**, not a manual ID-upload form. Status states:
    Not Started / In Review / Approved / Rejected → account-state + permission mapping.
    UNERA stores only status/timestamps/jurisdiction, never raw documents.
  - Registration is **email-first** (Level 1 Unverified → verify email → First/Last/Country →
    prompt 2FA + KYC, *skippable* to L1 dashboard). Password-reset link valid **15 min**,
    single-use, invalidates sessions. Anti-enumeration on email everywhere. Coinbase-style feel.
- **Fix:** (1) swap 2FA to email-based one-time code; (2) make KYC a Sumsub-style handoff with
  the four status states + an "In Review" dashboard state; (3) add **access-level gating** — L1
  dashboard shows balance/history but Issue/Redeem are locked with a "Verify (KYC Level 2)"
  prompt; (4) add a KYC-tier/limits card. Keep the existing Stepper/Input/Card/Badge/StatusPill.

## H. MED — scope hygiene (separation rules, §4, §6.7 exclusions)

- **Finding:** anything implying Platform-Layer features must not appear in issuer UI
  (remittances, payments, exchange/swap, DeFi, governance voting, other coins).
- **Fix:** audit nav + copy; the only transaction surface is hUSD Mint / Burn + the public
  reserve dashboard + KYC + transaction history. Remove swap entirely. The dashboard's reserve
  yield → Humanity Centres line is *in scope* (RES-04) and worth surfacing as the mission tie.

## I. LOW — small conformance items

- Wallet-connect: PRD names MetaMask, Coinbase Wallet, WalletConnect (current kit also shows
  Ledger/Brave — harmless, but MetaMask/Coinbase/WalletConnect are the canonical three).
- Conversion/issuance must store the displayed rate+fee in the record (audit) — surface on the
  receipt ("rate locked at confirmation").
- Redemption Phase-1 has **no bank-account ownership verification** (RED-01) — copy should not
  imply a verified account; Phase-2 adds it.
- Donation Service (G7): direct redemption/cash-out for trusted orgs (Humanity Centres) — a
  future surface; note only.

---

## Related Confluence pages reviewed (space ~Conscious Landbank Product Development)
- **UNERA Stablecoin Portal PRD** (61276166, v14) — primary spec.
- **Authentication & KYC** (20152341, v7) — stablecoin-applicable; 3 access levels, email 2FA,
  Sumsub KYC, Coinbase-style. (Folded into §G above.)
- **Standard Stablecoin** (68321283) — ERC-20 hUSD contract PRD, non-upgradeable, 1:1 USD.
- **Wallet Connection** (30081028) — MetaMask (extension + mobile deep link) + WalletConnect v2
  (QR/deep link). Coinbase Wallet appears in PRD §6.7 but the wallet-connection spec centers on
  MetaMask + WalletConnect v2.
- **Notification Services** (65634349) — stablecoin notifications are separate from Platform;
  per-product events/templates (relevant to the nav bell + notifications surface).
- **Stablecoin - Dashboard** (66912287) — empty placeholder at audit time.
- Platform-layer pages (Token Management, Wallet Dashboard, Transaction History, Payee Address) —
  out of scope for the Stablecoin Layer; used only as pattern reference.

## Proposed build order (all within the existing design system)
1. Reposition token → **hUSD** across kits (A, H).
2. Purchase: add **crypto onramp** branch + **rate-freshness** preview (B, E).
3. Add **transaction-status timeline** + redemption queue/SLA (C).
4. Rebuild **Transparency Dashboard** to PRD spec (D).
5. Restructure **transaction history**; remove swap (F).
6. Deepen **KYC tiers + dashboard tier/limits card** (G).
