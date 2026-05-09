# Design Audit — May 09 Roadmap vs `OldUnera/` & `NewUnera/`

> **Scope:** Design / UX / UI only (per `.cursor/rules/design-only-scope.mdc`).
> **Source of truth (roadmap):** [`Roadmap/roadmap_May09.md`](../Roadmap/roadmap_May09.md)
> **Implementations compared:** [`OldUnera/`](../OldUnera) (production reference, original brand) vs [`NewUnera/`](../NewUnera) (V2 brand rebuild — March 2026 brand guidelines)
> **Out of scope:** the `NewUnera/Mobile App/` native track and historical backups (`*_Feb*.html`, `*_Mar*.html`, `*_Apr*.html`, `*-backup.html`, `*BACKUP*`, `001testing.html`).

---

## 1. Executive Summary

OldUnera is a **near-complete MVP surface** (~95% of roadmap features have at least a working screen, including the entire Operator portal). NewUnera is a **brand-faithful re-skin of the user-facing surface** (~75% of roadmap user features), but the **Operator portal, the dedicated Donation flow, and the Donation History page** have not been ported yet. Both implementations share two roadmap blind spots: **operator Account Management (lock/unlock, force reset password)** and **operator KYC Management (view, update KYC status)** — neither folder has a screen for them. **Crypto‑to‑crypto matching for cashing** in remittance is also missing in both.

**Top 5 NewUnera blockers vs roadmap (in build order)**

1. **Operator suite (4 pages)** — `operator-dashboard`, `operator-hc-management`, `operator-issuance` (Mint + Audit Log + Supply), `operator-por` are all absent from `NewUnera/`. Without these, the "Concisous Landbank Operator" persona has no V2 product surface.
2. **Donation flow** — `NewUnera/` has no `donate.html`; "Donate Now" buttons in `NewUnera/explore-centres.html` deep-link to `send-enhanced.html` (a remittance flow), which is a UX category mismatch.
3. **`donation-history.html`** — referenced by `NewUnera/dashboard-enhanced.html` notification CTAs (`ctaUrl: 'donation-history.html'`) but the file does not exist → **broken link in V2**.
4. **Operator login + RBAC entry** — no `operator-login.html` in `NewUnera/`; the roadmap's "Role-based access control for users and operators" sub-feature has no V2 UI.
5. **Operator Account Management & KYC Management screens** — missing in both, but specifically blocking V2 launch since `NewUnera/` will need them de novo.

**Top 5 OldUnera-only assets to port to NewUnera (V2 rebuild priority)**

1. [`OldUnera/operator-issuance.html`](../OldUnera/operator-issuance.html) — Mint form, Supply health, Minting Audit Log.
2. [`OldUnera/operator-por.html`](../OldUnera/operator-por.html) — Operator-side PoR mgmt, Backing Ratio panel.
3. [`OldUnera/operator-hc-management.html`](../OldUnera/operator-hc-management.html) — HC create/edit drawer, image upload + cropper, activate/deactivate confirm.
4. [`OldUnera/donate.html`](../OldUnera/donate.html) — standalone donation flow (centre selection → amount → review → success).
5. [`OldUnera/donation-history.html`](../OldUnera/donation-history.html) — donor history table.

---

## 2. Methodology

- **Status legend**

  - **Done** — page exists, all roadmap sub-features visibly present and reachable from primary nav (or canonically deep-linked).
  - **Partial** — page exists, but at least one roadmap sub-feature is missing, broken, or merged into an unrelated flow.
  - **Missing** — no page or no UI surface for this feature in this folder.
  - **N/A** — feature is design-irrelevant (pure backend); not assessed under the design-only rule.

- **Evidence** — Every status call cites a specific file and, where useful, a line range so reviewers can verify quickly.
- **Quality bar reference** — Done assumes the page meets the canonical reference quality of `account-settings.html`, `dashboard-enhanced.html`, `wallet-enhanced.html`, `add-money.html`, `exchange.html`, `brand-style-guide.html` per `.cursor/rules/design-request-quality.mdc`. Where Done-but-below-bar, that's flagged in the gap notes.

---

## 3. Roadmap Coverage Matrix

### 3.1 Base System Features

#### 3.1.1 Authentication Service

> Roadmap: Account Creation · Authentication Service incl. 2FA · Role-based access control for users and operators

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| Account creation | **Done** — [`OldUnera/signup_2.html`](../OldUnera/signup_2.html), with social via [`connect-social.html`](../OldUnera/connect-social.html) | **Done** — [`NewUnera/signup_2.html`](../NewUnera/signup_2.html), [`connect-social.html`](../NewUnera/connect-social.html) |
| Login (incl. magic link) | **Done** — [`login_2.html`](../OldUnera/login_2.html), [`magic-link-sent.html`](../OldUnera/magic-link-sent.html) | **Done** — [`login_2.html`](../NewUnera/login_2.html), [`magic-link-sent.html`](../NewUnera/magic-link-sent.html) |
| Password recovery | **Done** — [`forgot-password.html`](../OldUnera/forgot-password.html), [`password-reset.html`](../OldUnera/password-reset.html) | **Done** — [`forgot-password.html`](../NewUnera/forgot-password.html), [`password-reset.html`](../NewUnera/password-reset.html) |
| 2FA setup + verify | **Done** — [`setup-2fa.html`](../OldUnera/setup-2fa.html), [`verify-2fa.html`](../OldUnera/verify-2fa.html), [`verify-email.html`](../OldUnera/verify-email.html) | **Done** — [`setup-2fa.html`](../NewUnera/setup-2fa.html), [`verify-2fa.html`](../NewUnera/verify-2fa.html), [`verify-email.html`](../NewUnera/verify-email.html) |
| RBAC — operator entry | **Partial** — [`operator-login.html`](../OldUnera/operator-login.html) exists as a separate entry point | **Missing** — no operator-login or role switch in V2 |

**Design gap notes**

- NewUnera auth set is brand-faithful but the **operator role has no V2 entry door**. Recommend a V2 `NewUnera/operator-login.html` reusing the same form pattern as [`NewUnera/login_2.html`](../NewUnera/login_2.html) with a clearly different chrome/breadcrumb so operators can't be phished into the consumer flow.

#### 3.1.2 KYC Service

> Roadmap: KYC Services (optional for MVP)

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| KYC verification flow | **Done** — [`OldUnera/kyc-verify.html`](../OldUnera/kyc-verify.html) | **Done** — [`NewUnera/kyc-verify.html`](../NewUnera/kyc-verify.html) |
| KYC status banner on dashboard | **Done** — alert-cta to `kyc-verify.html` in [`OldUnera/dashboard-enhanced.html`](../OldUnera/dashboard-enhanced.html) | **Done** — alert-cta in [`NewUnera/dashboard-enhanced.html`](../NewUnera/dashboard-enhanced.html) line ~2984 |

#### 3.1.3 Notification Service

> Roadmap: Real-time notifications · Email alerts · **SMS for major events**

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| Real-time notification inbox | **Done** — [`OldUnera/notifications.html`](../OldUnera/notifications.html) + dropdown on dashboard | **Done** — [`NewUnera/notifications.html`](../NewUnera/notifications.html) + dropdown |
| Email alert templates | **Done** — [`OldUnera/email-notification-templates.html`](../OldUnera/email-notification-templates.html) | **Done** — [`NewUnera/email-notification-templates.html`](../NewUnera/email-notification-templates.html) |
| SMS preference toggles | **Done** — `prefTransactionSms` etc. in [`OldUnera/account-settings.html`](../OldUnera/account-settings.html) | **Done** — same toggle in [`NewUnera/account-settings.html`](../NewUnera/account-settings.html) line ~4631 |
| SMS in 2FA recovery | **Done** — "Email + SMS" in [`OldUnera/account-security.html`](../OldUnera/account-security.html) | **Done** — same in [`NewUnera/account-security.html`](../NewUnera/account-security.html) line ~878 |

**Design gap notes**

- The **standalone `notifications.html` is purely an inbox** in both folders — there is **no per-channel preference matrix** there (preferences live only in `account-settings.html`). For the V2 polish, recommend a small "Manage notification channels →" link from `NewUnera/notifications.html` to the relevant `account-settings.html` anchor for discoverability.

#### 3.1.4 Security & Audit Logging

> Roadmap: Events and activities logs · Alerts for suspicious or unusual activity

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| User-side activity log (recent transactions) | **Done** — `Recent Activity` in [`OldUnera/dashboard-enhanced.html`](../OldUnera/dashboard-enhanced.html) and [`wallet-enhanced.html`](../OldUnera/wallet-enhanced.html) | **Done** — same patterns in NewUnera dashboard + wallet |
| Operator-side audit log | **Done** — `Minting Audit Log` in [`OldUnera/operator-issuance.html`](../OldUnera/operator-issuance.html) line ~1331 | **Missing** — operator portal not ported |
| Suspicious-activity alerts UI | **Partial** — [`OldUnera/account-security.html`](../OldUnera/account-security.html) shows recent device/login events; no dedicated "suspicious activity" surface | **Partial** — same as Old; brand-faithful |

**Design gap notes**

- A V2 **dedicated "suspicious activity" alert pattern** is missing on both. Recommend a banner spec in `NewUnera/brand-style-guide.html` (yellow-tinted caution surface using `color-mix(in srgb, var(--brand-yellow) 30%, var(--brand-white))` per `.cursor/rules/new-brand-output.mdc` "No CSS gradients" guidance) and a single instance on `account-security.html`.

---

### 3.2 UNERA Platform — Public Users

#### 3.2.1 Humanity Centre Directory

> Roadmap: Adaptive grid · Search & filter

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| Adaptive grid of HCs | **Done** — [`OldUnera/explore-centres.html`](../OldUnera/explore-centres.html) | **Done** — [`NewUnera/explore-centres.html`](../NewUnera/explore-centres.html) |
| Search & filter | **Done** | **Done** (more filter UI matches present per grep counts) |

#### 3.2.2 HC Detail Page

> Roadmap: HC overview · Donation info · Stats by day/week/month/year · Donate function

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| Overview + gallery | **Done** — [`OldUnera/centre-detail.html`](../OldUnera/centre-detail.html) | **Done** — [`NewUnera/centre-detail.html`](../NewUnera/centre-detail.html) |
| Donation info section | **Done** | **Done** ("Make an impact" widget, line ~1330) |
| Stats by day/week/month/year | **Done** — both pages match 118 time-period tokens | **Done** — `Donation Statistics` section, line ~1284 |
| Inline donate function | **Done** | **Partial** — donate widget present, but the standalone follow-through (`donate.html`) is missing in V2 (see 3.2.6) |

#### 3.2.3 Wallet Connection

> Roadmap: Metamask Integration · WalletConnect Integration

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| Metamask connect | **Done** — standalone [`OldUnera/connect-metamask.html`](../OldUnera/connect-metamask.html) + modal on dashboard | **Done** — modal-only via `openConnectModal()` on [`NewUnera/dashboard-enhanced.html`](../NewUnera/dashboard-enhanced.html) line ~3657 |
| WalletConnect | **Done** — standalone [`OldUnera/connect-walletconnect.html`](../OldUnera/connect-walletconnect.html) + modal | **Done** — modal-only (`data-provider="walletconnect"`) |
| Wallet creation (custodial) | **Done** — [`OldUnera/wallet-creation.html`](../OldUnera/wallet-creation.html) | **Done** — [`NewUnera/wallet-creation.html`](../NewUnera/wallet-creation.html) |

**Design gap notes**

- NewUnera **dropped the standalone connect screens** in favour of a modal. That's a defensible UX choice (lower friction), but two issues for design coverage:

  1. The V2 `brand-style-guide.html` should document the connect modal as a **canonical pattern** with the deep-blue chrome + yellow CTA so the whole team has one reference.
  2. For deep-link / SEO / sharing scenarios (e.g. an email saying "tap to reconnect your wallet"), the standalone screens still have value. Recommend keeping the modal as the primary UX but adding **slim V2 standalone screens** that simply auto-open the modal on load (essentially shell pages).

#### 3.2.4 Stablecoin Management

> Roadmap: Balance · Recent tx · Quick actions · Visual summaries · Alerts · Donation/remittance history hub

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| Balance display | **Done** — [`OldUnera/dashboard-enhanced.html`](../OldUnera/dashboard-enhanced.html) + [`wallet-enhanced.html`](../OldUnera/wallet-enhanced.html) | **Done** — same surfaces, more refined (109 vs 63 stat-card / quick-actions matches in wallet) |
| Recent tx with status | **Done** | **Done** |
| Quick actions (send / purchase) | **Done** | **Done** — plus an additional Governance card |
| Visual summaries | **Done** | **Done** — KPI hero, tooltips |
| Transaction status alerts | **Done** | **Done** |
| Single hub for donation + remittance history | **Partial** — separate [`donation-history.html`](../OldUnera/donation-history.html) page | **Missing as a hub** — donation history page does not exist; remittance history is in wallet activity |

**Design gap notes**

- NewUnera dashboard is the **strongest reference page** in the V2 set. The single roadmap gap is the **history hub**: V2 needs a way to see donations and remittances together. Cleanest path is a single tabbed `NewUnera/wallet-enhanced.html` activity table with **Donations / Remittances / All** tabs, complying with `.cursor/rules/table-no-scrollbar.mdc`.

#### 3.2.5 Stablecoin Remittance

> Roadmap: Send to wallet address · Payee management · Crypto-to-Crypto matching for cashing · Transfer confirmation

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| Send to wallet address | **Done** — [`OldUnera/send-enhanced.html`](../OldUnera/send-enhanced.html) | **Done** — [`NewUnera/send-enhanced.html`](../NewUnera/send-enhanced.html) |
| Payee mgmt (saved recipients) | **Partial** — `Saved accounts` UI exists in `send-enhanced.html` line ~2080, but no separate payee-management surface | **Partial** — same `Saved accounts` UI line ~2199, no dedicated mgmt page |
| Crypto-to-Crypto matching for cashing | **Missing** — no UI in any wallet/exchange/redeem page mentions matching/cashable | **Missing** — same |
| Transfer confirmation / receipt | **Done** — review + success steps in stepper | **Done** — review step, success-screen-hero pattern |

**Design gap notes**

- A **dedicated "Recipients" / "Payees" page** is the cleanest port — list view, add/edit/delete, with a fresh V2 form pattern reusing [`NewUnera/account-settings.html`](../NewUnera/account-settings.html) sections.
- **Crypto-to-Crypto matching** is the design's hardest miss — this needs a small UX spike: surface the recipient's preferred cashable token (e.g. USDC/USDT in their region) in step 2 of the send flow, with a one-line educational copy block (`.info-box` per `.cursor/rules/newunera-inline-icon-lead.mdc`).

#### 3.2.6 Donation

> Roadmap: Donation service · Donation history

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| Donation service (standalone flow) | **Done** — [`OldUnera/donate.html`](../OldUnera/donate.html) "Make a Donation" page | **Missing** — no `donate.html`; "Donate Now" CTAs in [`NewUnera/explore-centres.html`](../NewUnera/explore-centres.html) (lines 1308, 1350, …) point to `send-enhanced.html`, which is a remittance flow, not a donation flow |
| Donation history | **Done** — [`OldUnera/donation-history.html`](../OldUnera/donation-history.html) | **Missing** — referenced by `ctaUrl: 'donation-history.html'` in [`NewUnera/dashboard-enhanced.html`](../NewUnera/dashboard-enhanced.html) line ~4222 and [`account-settings.html`](../NewUnera/account-settings.html) line ~7895 → **broken link** |
| Inline donation widget on HC detail | **Done** | **Done** — `Make an impact` section on `centre-detail.html` |

**Design gap notes — most user-visible regression in V2**

- The **`Donate Now` button hijack** is a significant UX category bug: tapping "Donate" should not lead to "Send" (different mental model, different copy, different review screen). The send flow does not say "you're donating to X HC", and there's no donation-receipt artifact.
- The **broken `donation-history.html` link** in notifications is a near-term bug (404 on click).
- Both must be in the V2 build before any external demo.

---

### 3.3 UNERA Platform — Operator / Admin Portal

#### 3.3.1 HC Management (Create / Edit)

> Roadmap: Create HC · Edit HC · Upload images · Activate/Deactivate

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| Create HC | **Done** — drawer in [`OldUnera/operator-hc-management.html`](../OldUnera/operator-hc-management.html) line ~1355 | **Missing** — no operator portal in NewUnera |
| Edit HC | **Done** — same drawer | **Missing** |
| Image upload (drag/drop, crop, replace) | **Done** — line ~1387–1461 | **Missing** |
| Activate / Deactivate (with confirm) | **Done** — line ~1440 | **Missing** |

#### 3.3.2 Account Management (operator)

> Roadmap: Lock/Unlock Account · Force reset password

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| Lock/Unlock user account | **Missing** — no operator-accounts page | **Missing** |
| Force reset password | **Missing** | **Missing** |

#### 3.3.3 KYC Management (operator)

> Roadmap: View KYC · Update KYC Status

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| View KYC submissions | **Missing** — no operator-kyc page | **Missing** |
| Update KYC Status | **Missing** | **Missing** |

**Design gap notes — shared blind spot**

- Both folders are missing the **Operator Account Management** and **Operator KYC Management** screens entirely. These need to be designed from scratch. Recommended pattern: a paginated table (no scrollbars per `.cursor/rules/table-no-scrollbar.mdc`) with row-level actions opening a side drawer (mirroring the `operator-hc-management.html` drawer) — built directly in `NewUnera/` with no OldUnera precedent to port from.

---

### 3.4 UNERA Stablecoin Platform — Public Users

#### 3.4.1 Purchase Stablecoins (Fiat → hCAD)

> Roadmap: INTERAC e-transfer · Card payment · Crypto payment (USDC/USDT) · Exchange rate API

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| INTERAC e-Transfer | **Done** — `Interac e-Transfer` method, [`OldUnera/get-unera-cad.html`](../OldUnera/get-unera-cad.html) line ~1553 | **Done** — same pattern, [`NewUnera/get-unera-cad.html`](../NewUnera/get-unera-cad.html) |
| Credit/Debit Card | **Done** — line ~1582 | **Done** |
| Crypto payment (USDC/USDT) | **Done** — swap-from-USDC/USDT path, line ~1394–1413 | **Done** |
| Exchange rate (live + countdown) | **Done** — `swapRatePreview`, `mintRatePreview`, `Next update in 15s` | **Done** |
| Live FX line chart | **Done** — `chart-svg-wrap` with role="img" line ~1806 | **Done** |

#### 3.4.2 Stablecoin Delivery Confirmation

> Roadmap: Status tracker · Transaction history · Receipt generation

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| Status tracker | **Done** — stepper in `get-unera-cad.html` + success step | **Done** — same |
| Transaction history (mint) | **Done** — [`OldUnera/mint-history.html`](../OldUnera/mint-history.html) | **Done** — [`NewUnera/mint-history.html`](../NewUnera/mint-history.html) |
| Transaction history (swap) | **Done** — [`OldUnera/swap-history.html`](../OldUnera/swap-history.html) | **Done** — [`NewUnera/swap-history.html`](../NewUnera/swap-history.html) |
| Receipt | **Done** — [`OldUnera/purchase-receipt.html`](../OldUnera/purchase-receipt.html) | **Done** — [`NewUnera/purchase-receipt.html`](../NewUnera/purchase-receipt.html) |

#### 3.4.3 Stablecoin Tracking

> Roadmap: Metamask · WalletConnect · Balance query · Graph for stablecoin circulation

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| Metamask + WalletConnect for tracking | **Done** | **Done** (via modal) |
| Balance query (user's connected wallet) | **Done** — wallet-enhanced + dashboard | **Done** |
| Public Proof of Reserve display | **Done** — [`OldUnera/proof-of-reserve-public.html`](../OldUnera/proof-of-reserve-public.html) — Backing Ratio + composition | **Done** — [`NewUnera/proof-of-reserve-public.html`](../NewUnera/proof-of-reserve-public.html) — Backing Ratio gauge line ~1177, Reserve Composition line ~1250 |
| Circulation graph (time series) | **Partial** — circulation values are shown but no dedicated time-series chart | **Partial** — same; "$2,845,290 hCAD in circulation" stat exists, no chart |

**Design gap notes**

- A **circulation-over-time line chart** (similar to the FX chart already in `get-unera-cad.html` line ~1806) would close the gap on both. NewUnera should be the build target since it already has the chart pattern in V2 brand colors.

---

### 3.5 UNERA Stablecoin Platform — Operator / Admin

#### 3.5.1 Stablecoin Issuance Dashboard

> Roadmap: Minting Service · Minting audit logs · Supply

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| Mint form | **Done** — [`OldUnera/operator-issuance.html`](../OldUnera/operator-issuance.html) `Mint Form` line ~611 | **Missing** |
| Minting audit log | **Done** — `Minting Audit Log` line ~1331, with audit-trail field in form line ~1270 | **Missing** |
| Supply overview + health badge | **Done** — `Supply Overview` line ~1216, `supply-health-badge` line ~573 | **Missing** |
| Burn (related — not in roadmap) | **Done (extra)** — `.burn-section` line ~612 | **Missing** |

#### 3.5.2 Proof of Reserve (PoR) Management — operator side

> Roadmap: PoR Recording · PoR Display · Backing ratio · Update/Add Stablecoin addresses & supported chains

| Sub-feature | OldUnera | NewUnera |
|---|---|---|
| PoR recording surface | **Partial** — operator [`OldUnera/operator-por.html`](../OldUnera/operator-por.html) has PoR display + backing ratio, light recording UI | **Missing** |
| Backing ratio panel | **Done** — `Backing Ratio` line ~830 | **Missing** |
| Update/Add Stablecoin addresses + chains | **Partial** — limited admin form on operator-por; chain-selector UI is light | **Missing** |
| Public PoR display (read-only) | **Done** — `proof-of-reserve-public.html` (both folders) | **Done** — also `proof-of-reserve-public.html` |

#### 3.5.3 Operator Account Management & KYC Management (Stablecoin Admin Portal)

> These mirror 3.3.2 and 3.3.3 — the roadmap repeats them in the Stablecoin Admin Portal.

- **Both Missing** in both folders (same blind spot as UNERA Admin Portal).

---

## 4. NewUnera Gaps vs Roadmap (deep)

### 4.1 Critical (blocks MVP launch)

1. **Operator suite (entire portal) — 4 pages.** No `NewUnera/operator-*.html`. Build: `operator-login.html`, `operator-dashboard.html`, `operator-hc-management.html`, `operator-issuance.html`, `operator-por.html`. Reference for visuals: V2 brand chrome from `NewUnera/dashboard-enhanced.html`. Reference for IA, drawers, tabs, audit-log table: `OldUnera/operator-*` files. **Quality bar:** match `account-settings.html` form patterns, `wallet-enhanced.html` data-table chrome (no scrollbars, `.cursor/rules/table-no-scrollbar.mdc`), and `brand-style-guide.html` semantics (no CSS gradients on product HTML).

2. **`NewUnera/donate.html` — standalone donation flow.** Currently "Donate Now" buttons in `explore-centres.html` (10 instances at lines 1308, 1350, 1392, 1434, 1476, 1518, 1560, 1602, 1644, 1686) deep-link to `send-enhanced.html`, mixing remittance and donation contexts. Build a 3‑step stepper (Centre → Amount → Review/Success) reusing the [`get-unera-cad.html`](../NewUnera/get-unera-cad.html) stepper pattern and the success-screen-hero from `.cursor/rules/newunera-success-screen-hero.mdc`. Pull copy and confirmation receipt from [`OldUnera/donate.html`](../OldUnera/donate.html).

3. **`NewUnera/donation-history.html` — missing target page (broken link).** Two `ctaUrl: 'donation-history.html'` references (in `dashboard-enhanced.html` line ~4222 and `account-settings.html` line ~7895) currently 404. Build with the `wallet-enhanced.html` activity-table pattern, scrollbars hidden per the table rule.

4. **Operator Account Management (lock/unlock, force reset password).** No precedent in either folder. Design from scratch: paginated user table + row-level "Lock", "Unlock", "Force reset password" actions opening a side drawer with a confirm step (same drawer system as `operator-hc-management.html` deactivate confirm).

5. **Operator KYC Management (view, update KYC status).** Same: build new. List view + drill-down to a read-only KYC summary panel + status dropdown ("Pending / Approved / Needs review / Rejected") with audit-trail note field.

### 4.2 Important (degraded UX vs roadmap)

6. **Suspicious-activity surface.** `account-security.html` shows recent device events but has no roadmap-aligned "Alerts for suspicious or unusual activity" banner pattern. Add a caution surface using `color-mix(in srgb, var(--brand-yellow) 30%, var(--brand-white))` per `new-brand-output` "No CSS gradients" guidance.

7. **Circulation-over-time chart** on PoR public + tracking. Reuse the FX line-chart pattern from `get-unera-cad.html` line ~1806. Stat already exists at `proof-of-reserve-public.html` line ~1185.

8. **Donation + Remittance unified history hub.** Add Donations / Remittances / All tabs on `wallet-enhanced.html` activity table OR add a "View all donations" link from the wallet activity to the new `donation-history.html`.

9. **Payee / Recipients management surface.** Currently inline `Saved accounts` only inside `send-enhanced.html`; no persistent CRUD. Add a `NewUnera/recipients.html` (or settings sub-page) listing payees, with add/edit/delete drawers reusing the `account-settings.html` form chrome.

10. **`brand-style-guide.html` documentation for the connect-wallet modal.** The modal pattern is functional in `dashboard-enhanced.html` line ~3439 but is not canonicalised. Add a section to `NewUnera/brand-style-guide.html` showing the modal's anatomy (header, provider rows, footer disclaimer).

### 4.3 Nice-to-have / parity

11. **Standalone connect-metamask / connect-walletconnect screens** as deep-link "shell" pages that auto-open the modal — useful for emails and KYC re-prompts.

12. **`withdraw.html` and `convert.html`** (present in OldUnera, not in NewUnera). Likely consolidated into `redeem-unera-cad.html` and `exchange.html` in V2 — verify with PM that this consolidation is intentional and remove the OldUnera files from any "port" plan if so.

13. **`notifications.html` → `account-settings.html` cross-link** for channel preferences (small discoverability improvement).

---

## 5. OldUnera Gaps vs Roadmap (deep)

### 5.1 Critical

1. **Operator Account Management** — missing entirely. No `operator-accounts.html` or equivalent.
2. **Operator KYC Management** — missing entirely. No `operator-kyc.html`.
3. **Crypto-to-Crypto matching for remittance cashing** — missing in `send-enhanced.html`; the roadmap explicitly calls this out for the recipient experience.

### 5.2 Important

4. **Circulation-over-time chart** on `proof-of-reserve-public.html` and operator `operator-por.html`. Stat-only today.
5. **Update/Add Stablecoin addresses + supported chains** UI on `operator-por.html` is light. Recommend a chain-list table with add/edit/delete actions, similar in pattern to the HC management drawer.
6. **Suspicious-activity alerts pattern** — same gap as NewUnera; recent-device events exist on `account-security.html` but no roadmap-aligned alert banner.

### 5.3 Nice-to-have

7. **`notifications.html` channel-preference cross-link** to `account-settings.html` (same minor improvement as NewUnera).
8. **Operator audit log breadth** — `operator-issuance.html` has `Minting Audit Log`; consider a unified "Operator Activity Log" combining HC actions, account-management actions, KYC status changes, and minting events for compliance reviews.

---

## 6. Already in `OldUnera/`, Not Yet in `NewUnera/` — Port-Priority Backlog

> The headline of this audit. Each item is a V2-brand rebuild target — **do not copy/paste OldUnera HTML** into `NewUnera/`. Rebuild fresh using `NewUnera/brand-style-guide.html` tokens, TestFoundersGrotesk, no CSS gradient functions, Material Symbols Outlined inline SVGs, and the canonical reference pages (`account-settings.html`, `dashboard-enhanced.html`, `wallet-enhanced.html`, `add-money.html`, `exchange.html`).

### 6.1 Donation surface

1. **`NewUnera/donate.html`** — standalone donation flow.
   - Source: [`OldUnera/donate.html`](../OldUnera/donate.html) ("Make a Donation" page title at line 1027).
   - V2 spec: 3‑step stepper (Centre selection → Amount → Review/Success), success hero per `.cursor/rules/newunera-success-screen-hero.mdc`, deep-link from each `centre-detail.html` "Make an impact" CTA and from each `explore-centres.html` "Donate Now" button.
   - Replaces the current `Donate Now → send-enhanced.html` hijack.

2. **`NewUnera/donation-history.html`** — donor history page.
   - Source: [`OldUnera/donation-history.html`](../OldUnera/donation-history.html).
   - V2 spec: activity-table pattern (no scrollbars per table rule), filter by HC / date range / amount, link out to per-row receipt.
   - Closes the broken `ctaUrl: 'donation-history.html'` link from notifications.

### 6.2 Wallet connection (optional shell pages)

3. **`NewUnera/connect-metamask.html`** + **`NewUnera/connect-walletconnect.html`** — shell pages that auto-open the existing connect modal.
   - Source: [`OldUnera/connect-metamask.html`](../OldUnera/connect-metamask.html) + [`OldUnera/connect-walletconnect.html`](../OldUnera/connect-walletconnect.html).
   - V2 spec: minimal page (deep-blue chrome, single explanatory card, auto-open modal), useful for email deep-links.
   - Decision needed: keep modal as primary UX (yes) and decide whether shell pages are worth the maintenance.

### 6.3 Operator portal (UNERA Admin)

4. **`NewUnera/operator-login.html`** — operator entry door.
   - Source: [`OldUnera/operator-login.html`](../OldUnera/operator-login.html).
   - V2 spec: same form pattern as `NewUnera/login_2.html` but with operator-distinct hero copy and a security badge; deep-blue chrome.

5. **`NewUnera/operator-dashboard.html`** — operator KPIs + quick actions.
   - Source: [`OldUnera/operator-dashboard.html`](../OldUnera/operator-dashboard.html) (Operator nav + tabs, `Review now` HC alert, stat-cards, Quick Actions).
   - V2 spec: KPI grid, alert banners using token-only color-mix, mobile menu mirror.

6. **`NewUnera/operator-hc-management.html`** — HC create/edit/upload/activate.
   - Source: [`OldUnera/operator-hc-management.html`](../OldUnera/operator-hc-management.html) (drawer at line ~1355, image upload + cropper at lines ~1387–1461, deactivate confirm at line ~1440).
   - V2 spec: drawer pattern reusing `account-settings.html` form chrome; image upload follows the `wallet-creation.html` step-card visual treatment.

### 6.4 Stablecoin Admin

7. **`NewUnera/operator-issuance.html`** — Mint + Audit Log + Supply.
   - Source: [`OldUnera/operator-issuance.html`](../OldUnera/operator-issuance.html) (Mint section line ~611, Supply Overview line ~1216, Minting Audit Log line ~1331, supply-health-badge line ~573).
   - V2 spec: large stat hero (current supply + health badge), mint form drawer with audit-trail reference field, audit-log table with no scrollbars per `.cursor/rules/table-no-scrollbar.mdc`.

8. **`NewUnera/operator-por.html`** — PoR Management.
   - Source: [`OldUnera/operator-por.html`](../OldUnera/operator-por.html) (Backing Ratio panel line ~830).
   - V2 spec: Backing Ratio gauge (reuse the public-PoR gauge component from `proof-of-reserve-public.html` line ~1178), Reserve composition donut, Update/Add Stablecoin addresses + supported chains table with row-level edit drawer.

### 6.5 New design (no OldUnera precedent — build fresh)

9. **`NewUnera/operator-accounts.html`** — Lock/Unlock account, force reset password.
10. **`NewUnera/operator-kyc.html`** — View KYC, update KYC status.

> Items 9 and 10 are "OldUnera also missing"; listed here because they belong in the same V2 operator portal sprint.

### 6.6 Decisions needed (do not auto-port)

11. **`OldUnera/withdraw.html`** and **`OldUnera/convert.html`** — confirm with PM whether these are intentionally consolidated in V2 (`redeem-unera-cad.html`, `exchange.html`). If yes, no port. If no, port as separate V2 pages.

---

## 7. Cross-cutting Design Quality Notes

These apply to **every** V2 page that gets built or ported:

- **WCAG 2.2 AA.** Skip link first in body, `prefers-reduced-motion` overrides set animations to `0.01ms`, focus rings `outline: 2px solid var(--brand-deep-blue); outline-offset: 2px`, contrast ≥ 4.5:1 text / 3:1 UI. See `.cursor/rules/newunera-accessibility-wcag.mdc`.
- **Typography.** TestFoundersGrotesk only; weights Light/Regular/Medium/Semibold/Bold + matching italics, loaded via `@font-face` from `Brand Guide/`. No Space Grotesk imports.
- **Color tokens.** `--brand-deep-blue`, `--brand-yellow`, `--brand-cloud-blue`, `--brand-earth`, `--brand-light-blue`, `--brand-purple`, `--brand-red` only. Tints via `color-mix(in srgb, …)`. **No CSS gradient functions on product HTML** (`brand-style-guide.html` is the only exception). See `.cursor/rules/new-brand-output.mdc`.
- **Iconography.** Material Symbols Outlined as inline SVG with `fill="currentColor"`, weight 400, GRAD 0, opsz 24. No emojis, lucide, heroicons, or font icons. See `.cursor/rules/newunera-icons.mdc`.
- **Tables.** No vertical scrollbars (let height grow), no horizontal scrollbars (hide via `scrollbar-width: none` + WebKit pseudo) — see `.cursor/rules/table-no-scrollbar.mdc`. Apply on the new operator audit-log table, donation history, recipients list, KYC list, and chain/address management table.
- **Logo.** App nav uses `NewLogo/Unera White Text Nav.svg` on deep-blue chrome and `NewLogo/Unera Black Text Nav.svg` on light chrome. Never use `../Brand Guide/Unera-Horizontal.png` for new V2 work.
- **Touch targets and breakpoints.** ≤768px nav becomes hamburger, ≤480px compact; min 44px nav rows, 46px buttons; inputs `font-size: 1rem` on mobile to prevent iOS zoom.
- **No backend touched.** All "data" is mocked in-page per the design-only rule.

---

## 8. Recommended Build Order

A pragmatic sequence (PD-Manager voice — severity × dependency × risk-of-demo-blocker):

1. **Fix the broken donation surface in V2 first** — `donate.html` + `donation-history.html` + repoint "Donate Now" buttons in `explore-centres.html` away from `send-enhanced.html`. (Critical user-facing bug. ~1 sprint.)
2. **Operator login + dashboard shell** — `operator-login.html` + `operator-dashboard.html`. Establish operator chrome and nav before content. (Foundation for items 3–6.)
3. **Stablecoin Admin: issuance + PoR** — `operator-issuance.html` + `operator-por.html`. The roadmap's Stablecoin Portal cannot ship without these.
4. **UNERA Admin: HC mgmt** — `operator-hc-management.html`. Heaviest single-page lift (drawer + upload + cropper + activate confirm).
5. **Operator account & KYC** — `operator-accounts.html` + `operator-kyc.html`. Net-new design; aligns with the "Account Management" + "KYC Management" rows in both Admin Portal columns of the roadmap.
6. **Suspicious-activity banner pattern** — small but unblocks roadmap "Alerts for suspicious or unusual activity." Add to `account-security.html` and document in `brand-style-guide.html`.
7. **Recipients / Payees management page** + **history hub tabs** on wallet activity — closes Stablecoin Management and Remittance gaps.
8. **Circulation-over-time chart** on `proof-of-reserve-public.html` + Stablecoin Tracking surfaces.
9. **Connect-wallet shell pages** (optional) + `notifications.html` cross-link to settings.
10. **Crypto-to-Crypto matching for cashing** in remittance — last because it requires a UX spike on recipient-token preference UI; ship a stub with copy first if needed.

---

## 9. Open Questions (for PM / Eng / Compliance)

1. **Operator portal launch scope.** Is the V2 operator portal in the same launch window as the V2 user surface, or a follow-on? This audit assumes same launch (per roadmap structure).
2. **`withdraw.html` and `convert.html`.** Are these intentionally consolidated into `redeem-unera-cad.html` / `exchange.html` for V2? If yes, drop them from any port list.
3. **Donation flow location.** Should `donate.html` be an HC-scoped page (one centre per donation) or allow multi-centre selection in a single flow? OldUnera was single-centre; recommend continuing that.
4. **Crypto-to-Crypto matching UX.** Roadmap mentions "matching" without specifying the recipient-side UX. Need a small product decision: does the sender pick the recipient's cashable token, or does the recipient see a "claim as USDC/USDT" choice on receipt?
5. **Audit log compliance level.** Should the operator audit log be exportable (CSV/PDF) for regulators? Affects table chrome and any "Export" CTA.
6. **Operator KYC update flow.** What statuses are allowed (Pending / Approved / Needs review / Rejected)? What audit-trail field is required when changing status?
7. **Notifications page redesign.** Is it worth investing in a richer `notifications.html` (filters, mark-all-read by category, channel-preference panel) for V2, or keep it as the current inbox-only?

---

*Audit prepared by the Product Design function on May 09, 2026. All page citations refer to live files in this repository at audit time.*
