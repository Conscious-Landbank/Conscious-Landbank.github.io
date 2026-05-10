# Feature Tracking — May 09 (NewUnera V2)

> **Purpose.** A single-glance tracker that lists every roadmap feature/sub-feature and maps each one to its live preview URL on GitHub Pages.
>
> **Source of truth (PRD):** [`Roadmap/roadmap_May09.md`](../Roadmap/roadmap_May09.md)
> **Implementation audit (Done/Partial/Missing calls):** [`markdown/DesignAuditMay09.md`](../markdown/DesignAuditMay09.md)
> **Implementation under review:** [`NewUnera/`](../NewUnera) — V2 brand (March 2026 brand guidelines)
>
> **Scope.** Design / UX / UI only, per [`.cursor/rules/design-only-scope.mdc`](../.cursor/rules/design-only-scope.mdc). Backend / QA / Engineering tracking belongs in the BE team's tooling — not in this design tracker.

---

## Status legend (used inline in **Notes** column)

- **Done** — Page (or in-page sub-feature) exists in `NewUnera/` and meets the roadmap line item. (No tag shown for these — they're the default.)
- **Partial** — Page exists but the sub-feature is missing, broken, or merged into an unrelated flow.
- **Missing** — No V2 surface yet; URL points to the `OldUnera/` reference (or — if no precedent).

> **Live URL convention.** The **URL** column links to the live GitHub Pages preview (e.g. `https://conscious-landbank.github.io/NewUnera/account-settings.html`). For Missing items, the URL points to the `OldUnera/` source pattern; the V2 build target is named in **Notes**.

---

## 1. Base System Features

| # | Feature | Sub Feature | URL | Notes |
|---|---|---|---|---|
| 1 | Authentication Service | Account creation (email + password) | https://conscious-landbank.github.io/NewUnera/signup_2.html | — |
| 2 | Authentication Service | Login (email + password) | https://conscious-landbank.github.io/NewUnera/login_2.html | — |
| 3 | Authentication Service | Magic-link login | https://conscious-landbank.github.io/NewUnera/magic-link-sent.html | — |
| 4 | Authentication Service | Social login (provider connect) | https://conscious-landbank.github.io/NewUnera/connect-social.html | — |
| 5 | Authentication Service | Verify email | https://conscious-landbank.github.io/NewUnera/verify-email.html | — |
| 6 | Authentication Service | Forgot password | https://conscious-landbank.github.io/NewUnera/forgot-password.html | — |
| 7 | Authentication Service | Password reset | https://conscious-landbank.github.io/NewUnera/password-reset.html | — |
| 8 | Authentication Service | 2FA setup | https://conscious-landbank.github.io/NewUnera/setup-2fa.html | — |
| 9 | Authentication Service | 2FA verify (challenge) | https://conscious-landbank.github.io/NewUnera/verify-2fa.html | — |
| 10 | Authentication Service | RBAC — operator entry door | https://conscious-landbank.github.io/OldUnera/operator-login.html | **Missing in V2.** Build `NewUnera/operator-login.html` from `login_2.html`; lock to email + 2FA only (no social, no magic link). |
| 11 | KYC Service | KYC verification flow | https://conscious-landbank.github.io/NewUnera/kyc-verify.html | — |
| 12 | KYC Service | KYC status banner on dashboard | https://conscious-landbank.github.io/NewUnera/dashboard-enhanced.html | Alert-CTA on dashboard. |
| 13 | Notification Service | Real-time notification inbox | https://conscious-landbank.github.io/NewUnera/notifications.html | Per-channel preferences live in `account-settings.html`. |
| 14 | Notification Service | Email alert templates | https://conscious-landbank.github.io/NewUnera/email-notification-templates.html | — |
| 15 | Notification Service | SMS preference toggles | https://conscious-landbank.github.io/NewUnera/account-settings.html | `prefTransactionSms` toggle in Notification Preferences. |
| 16 | Notification Service | SMS in 2FA recovery | https://conscious-landbank.github.io/NewUnera/account-security.html | "Email + SMS" recovery option. |
| 17 | Notification Service | Cross-link from inbox → channel preferences | https://conscious-landbank.github.io/NewUnera/notifications.html | **Missing.** Add "Manage notification channels →" link to `account-settings.html` preferences anchor. |
| 18 | Security & Audit Logging | User-side activity log (recent transactions) | https://conscious-landbank.github.io/NewUnera/wallet-enhanced.html | Also surfaced in `dashboard-enhanced.html` Recent Activity. |
| 19 | Security & Audit Logging | Operator-side audit log | https://conscious-landbank.github.io/OldUnera/operator-issuance.html | **Missing in V2.** Build `NewUnera/operator-issuance.html` (Minting Audit Log section). |
| 20 | Security & Audit Logging | Suspicious-activity alerts UI | https://conscious-landbank.github.io/NewUnera/account-security.html | **Partial.** Recent device/login events present; add roadmap-aligned "Alerts" banner using `color-mix(in srgb, var(--brand-yellow) 30%, var(--brand-white))`. |

---

## 2. UNERA Platform — Public Users

| # | Feature | Sub Feature | URL | Notes |
|---|---|---|---|---|
| 21 | Humanity Centre Directory | Adaptive grid of HCs | https://conscious-landbank.github.io/NewUnera/explore-centres.html | Responsive grid. |
| 22 | Humanity Centre Directory | Search & filter | https://conscious-landbank.github.io/NewUnera/explore-centres.html | More filter UI matches in V2 vs OldUnera. |
| 23 | HC Detail Page | Overview + gallery | https://conscious-landbank.github.io/NewUnera/centre-detail.html | — |
| 24 | HC Detail Page | Donation info section | https://conscious-landbank.github.io/NewUnera/centre-detail.html | "Make an impact" widget. |
| 25 | HC Detail Page | Stats by day/week/month/year (chips) | https://conscious-landbank.github.io/NewUnera/centre-detail.html | `Donation Statistics` section. |
| 26 | HC Detail Page | Donation activity chart (inline SVG) | https://conscious-landbank.github.io/NewUnera/centre-detail.html | **Missing.** Add bar/line chart with day/week/month/year toggle between overview and donate widget. |
| 27 | HC Detail Page | Inline donate widget | https://conscious-landbank.github.io/NewUnera/centre-detail.html | **Partial.** Widget present, but standalone `donate.html` follow-through missing in V2 (see row 44). |
| 28 | Wallet Connection | MetaMask connect | https://conscious-landbank.github.io/NewUnera/dashboard-enhanced.html | Inline modal via `openConnectModal()`. |
| 29 | Wallet Connection | WalletConnect | https://conscious-landbank.github.io/NewUnera/dashboard-enhanced.html | Same modal as row 28. |
| 30 | Wallet Connection | Custodial wallet creation | https://conscious-landbank.github.io/NewUnera/wallet-creation.html | — |
| 31 | Wallet Connection | Standalone connect-metamask deep-link page | https://conscious-landbank.github.io/OldUnera/connect-metamask.html | **Missing in V2 (P2).** Optional shell page that auto-opens the modal — useful for email re-prompts. PM decision needed. |
| 32 | Wallet Connection | Standalone connect-walletconnect deep-link page | https://conscious-landbank.github.io/OldUnera/connect-walletconnect.html | **Missing in V2 (P2).** Same pattern as row 31. |
| 33 | Stablecoin Management | Balance display | https://conscious-landbank.github.io/NewUnera/wallet-enhanced.html | KPI hero on dashboard + wallet. |
| 34 | Stablecoin Management | Recent transactions w/ status | https://conscious-landbank.github.io/NewUnera/wallet-enhanced.html | Activity table; respect `table-no-scrollbar` rule. |
| 35 | Stablecoin Management | Quick actions (send, purchase) | https://conscious-landbank.github.io/NewUnera/dashboard-enhanced.html | Plus an additional Governance card. |
| 36 | Stablecoin Management | Visual summaries (KPI / tooltips) | https://conscious-landbank.github.io/NewUnera/dashboard-enhanced.html | — |
| 37 | Stablecoin Management | Transaction status alerts | https://conscious-landbank.github.io/NewUnera/notifications.html | Surfaced via inbox + dashboard banner. |
| 38 | Stablecoin Management | Single hub for donation + remittance history | https://conscious-landbank.github.io/NewUnera/wallet-enhanced.html | **Missing.** Add Donations / Remittances / All tabs to wallet activity table OR link out to new `donation-history.html` (row 45). |
| 39 | Stablecoin Remittance | Send to wallet address | https://conscious-landbank.github.io/NewUnera/send-enhanced.html | — |
| 40 | Stablecoin Remittance | Payee (bank) — Saved accounts | https://conscious-landbank.github.io/NewUnera/send-enhanced.html | **Partial.** `Saved accounts` UI present; no dedicated CRUD page. |
| 41 | Stablecoin Remittance | Wallet payee book (saved external addresses) | https://conscious-landbank.github.io/NewUnera/send-enhanced.html | **Missing.** Extend "Send to External Wallet" branch with a "Saved wallets" panel mirroring the bank `.saved-methods-list` pattern. |
| 42 | Stablecoin Remittance | Crypto-to-Crypto matching for cashing | https://conscious-landbank.github.io/NewUnera/send-enhanced.html | **Missing.** Add "Recipient receives" card in review step (e.g. USDC on Base) using `redeem-unera-cad.html` `.rate-note` callout pattern. |
| 43 | Stablecoin Remittance | Transfer confirmation / receipt | https://conscious-landbank.github.io/NewUnera/send-enhanced.html | Review step + success-screen-hero per `.cursor/rules/newunera-success-screen-hero.mdc`. |
| 44 | Donation | Standalone donation flow | https://conscious-landbank.github.io/OldUnera/donate.html | **Missing in V2.** Build `NewUnera/donate.html`. "Donate Now" CTAs in `explore-centres.html` currently hijack to `send-enhanced.html` — fix once `donate.html` ships. |
| 45 | Donation | Donation history | https://conscious-landbank.github.io/OldUnera/donation-history.html | **Missing in V2.** Build `NewUnera/donation-history.html`. **Broken link** referenced from `dashboard-enhanced.html` and `account-settings.html` (`ctaUrl: 'donation-history.html'` → 404). |
| 46 | Donation | Inline donation widget on HC Detail | https://conscious-landbank.github.io/NewUnera/centre-detail.html | "Make an impact" section. |

---

## 3. UNERA Platform — Operator / Admin Portal

| # | Feature | Sub Feature | URL | Notes |
|---|---|---|---|---|
| 47 | HC Management | Create HC | https://conscious-landbank.github.io/OldUnera/operator-hc-management.html | **Missing in V2.** Build `NewUnera/operator-hc-management.html`. Drawer pattern from OldUnera. |
| 48 | HC Management | Edit HC | https://conscious-landbank.github.io/OldUnera/operator-hc-management.html | **Missing in V2.** Same drawer; reuse `account-settings.html` form chrome. |
| 49 | HC Management | Image upload (drag/drop, crop, replace) | https://conscious-landbank.github.io/OldUnera/operator-hc-management.html | **Missing in V2.** Drag/drop card with `.btn-secondary` "Replace". |
| 50 | HC Management | Activate / Deactivate (with confirm) | https://conscious-landbank.github.io/OldUnera/operator-hc-management.html | **Missing in V2.** Destructive confirm modal. |
| 51 | Account Management (operator) | Lock / Unlock user account | — | **Missing — no precedent.** Build `NewUnera/operator-accounts.html` from scratch. Paginated user table + row-level Lock/Unlock in side drawer. |
| 52 | Account Management (operator) | Force reset password | — | **Missing — no precedent.** Same target as row 51. Confirm modal that mocks "Send reset email". |
| 53 | KYC Management (operator) | View KYC submissions | — | **Missing — no precedent.** Build `NewUnera/operator-kyc.html`. Reuse `kyc-verify.html` document layout in read-only mode. |
| 54 | KYC Management (operator) | Update KYC Status | — | **Missing — no precedent.** Same target as row 53. Status pills (Pending / Verified / Rejected / Re-verification required) + audit-trail note field. |

---

## 4. UNERA Stablecoin Platform — Public Users

| # | Feature | Sub Feature | URL | Notes |
|---|---|---|---|---|
| 55 | Purchase Stablecoins (Fiat → hCAD) | INTERAC e-Transfer | https://conscious-landbank.github.io/NewUnera/get-unera-cad.html | Method selector in stepper. |
| 56 | Purchase Stablecoins (Fiat → hCAD) | Credit / Debit card | https://conscious-landbank.github.io/NewUnera/get-unera-cad.html | — |
| 57 | Purchase Stablecoins (Fiat → hCAD) | Crypto payment (USDC / USDT swap) | https://conscious-landbank.github.io/NewUnera/get-unera-cad.html | Swap-from-USDC/USDT path. |
| 58 | Purchase Stablecoins (Fiat → hCAD) | Exchange rate (live + countdown) | https://conscious-landbank.github.io/NewUnera/get-unera-cad.html | `swapRatePreview`, `mintRatePreview`, "Next update in 15s". |
| 59 | Purchase Stablecoins (Fiat → hCAD) | Live FX line chart | https://conscious-landbank.github.io/NewUnera/get-unera-cad.html | `chart-svg-wrap` section. |
| 60 | Stablecoin Off-ramp / Redemption | Redeem hCAD → fiat (off-ramp) | https://conscious-landbank.github.io/NewUnera/redeem-unera-cad.html | V2 canonical off-ramp flow. Subsumes legacy `OldUnera/withdraw.html`. |
| 61 | Stablecoin Delivery Confirmation | Status tracker (in stepper) | https://conscious-landbank.github.io/NewUnera/get-unera-cad.html | Stepper + success step. |
| 62 | Stablecoin Delivery Confirmation | Status tracker (on receipt page) | https://conscious-landbank.github.io/NewUnera/purchase-receipt.html | **Missing.** Add 4-step tracker (Submitted → Payment received → Minting → Delivered) using checkmark icon per `.cursor/rules/newunera-checkmark-icon.mdc`. |
| 63 | Stablecoin Delivery Confirmation | Transaction history (mint) | https://conscious-landbank.github.io/NewUnera/mint-history.html | — |
| 64 | Stablecoin Delivery Confirmation | Transaction history (swap) | https://conscious-landbank.github.io/NewUnera/swap-history.html | — |
| 65 | Stablecoin Delivery Confirmation | Receipt | https://conscious-landbank.github.io/NewUnera/purchase-receipt.html | — |
| 66 | Stablecoin Tracking | MetaMask + WalletConnect for tracking | https://conscious-landbank.github.io/NewUnera/dashboard-enhanced.html | Same connect modal as rows 28–29. |
| 67 | Stablecoin Tracking | Connected-wallet balance query | https://conscious-landbank.github.io/NewUnera/proof-of-reserve-public.html | **Partial.** Surfaced on wallet-enhanced; add a "Your wallet" panel to PoR public page (connected address + per-chain hCAD balance, "Connect wallet" empty state). |
| 68 | Stablecoin Tracking | Public Proof of Reserve display | https://conscious-landbank.github.io/NewUnera/proof-of-reserve-public.html | Backing Ratio gauge + Reserve Composition. |
| 69 | Stablecoin Tracking | Circulation graph (time series) | https://conscious-landbank.github.io/NewUnera/proof-of-reserve-public.html | **Partial.** Static stat ($2,845,290) only; add inline SVG line chart + 7D/30D/90D/1Y chips. Reuse FX-chart pattern from `get-unera-cad.html`. |

---

## 5. UNERA Stablecoin Platform — Operator / Admin

| # | Feature | Sub Feature | URL | Notes |
|---|---|---|---|---|
| 70 | Stablecoin Issuance Dashboard | Mint form (Minting Service) | https://conscious-landbank.github.io/OldUnera/operator-issuance.html | **Missing in V2.** Build `NewUnera/operator-issuance.html`. |
| 71 | Stablecoin Issuance Dashboard | Minting audit log | https://conscious-landbank.github.io/OldUnera/operator-issuance.html | **Missing in V2.** Apply `.cursor/rules/table-no-scrollbar.mdc`. |
| 72 | Stablecoin Issuance Dashboard | Supply overview + health badge | https://conscious-landbank.github.io/OldUnera/operator-issuance.html | **Missing in V2.** Use `--font-stat-size`. |
| 73 | PoR Management (operator) | PoR recording surface | https://conscious-landbank.github.io/OldUnera/operator-por.html | **Missing in V2.** Build `NewUnera/operator-por.html` with "Publish snapshot" CTA (yellow). |
| 74 | PoR Management (operator) | Backing ratio panel | https://conscious-landbank.github.io/OldUnera/operator-por.html | **Missing in V2.** Reuse public-PoR gauge component. |
| 75 | PoR Management (operator) | Update / Add Stablecoin addresses + supported chains | https://conscious-landbank.github.io/OldUnera/operator-por.html | **Missing in V2.** Chain-list table with add/edit/delete; reuse `account-settings.html` form chrome. |
| 76 | PoR Management (operator) | Public PoR display (read-only mirror) | https://conscious-landbank.github.io/NewUnera/proof-of-reserve-public.html | Already shipped (see row 68). |
| 77 | Account Management (Stablecoin Admin) | Lock / Unlock user account | — | **Missing — no precedent.** Mirrors row 51 — same `operator-accounts.html` build target. |
| 78 | Account Management (Stablecoin Admin) | Force reset password | — | **Missing — no precedent.** Mirrors row 52. |
| 79 | KYC Management (Stablecoin Admin) | View KYC submissions | — | **Missing — no precedent.** Mirrors row 53 — same `operator-kyc.html` build target. |
| 80 | KYC Management (Stablecoin Admin) | Update KYC Status | — | **Missing — no precedent.** Mirrors row 54. |

---

## Appendix A — NewUnera pages already in V2 but not enumerated as roadmap sub-features

These pages exist in `NewUnera/` and support MVP scope, but the roadmap does not list them as standalone sub-features. Tracked here for completeness so they aren't dropped from regression checks.

| # | Page | Role | URL | Notes |
|---|---|---|---|---|
| A1 | `index.html` | Marketing / public landing | [index.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/index.html) | Entry point for unauthenticated users. |
| A2 | `instructions.html` | Help / instructional content | [instructions.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/instructions.html) | Onboarding copy reference. |
| A3 | `brand-style-guide.html` | V2 brand spec (only NewUnera page allowed to use CSS gradients per `new-brand-output.mdc`) | [brand-style-guide.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/brand-style-guide.html) | Source of truth for tokens, typography, iconography, motion. |
| A4 | `account-settings.html` | User profile + preferences hub | [account-settings.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/account-settings.html) | Hosts the SMS toggle (row 15) and the `donation-history` notification CTA (row 45). |
| A5 | `account-security.html` | Security + 2FA + recent device events | [account-security.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/account-security.html) | Hosts SMS recovery (row 16) and the (partial) suspicious-activity surface (row 20). |
| A6 | `add-money.html` | Lightweight "add funds" alternate entry | [add-money.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/add-money.html) | Likely consolidated into `get-unera-cad.html` for V2 — confirm with PM. |
| A7 | `exchange.html` | Token swap (out of MVP roadmap scope) | [exchange.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/exchange.html) | Backlog / post-MVP. Not in roadmap MVP. |
| A8 | `governance.html` | Governance voting (out of MVP roadmap scope) | [governance.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/governance.html) | Backlog / post-MVP. Roadmap explicitly defers governance. |
| A9 | `stake.html` | Staking flow (out of MVP roadmap scope) | [stake.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/stake.html) | Backlog / post-MVP. |

---

## Appendix B — Build targets (file paths to create in `NewUnera/`)

Quick reference for sprint planning. Every row marked 🔴 Missing in the tables above resolves to one of the following file paths:

| Build target | Source / pattern reference | Roadmap rows it closes |
|---|---|---|
| `NewUnera/donate.html` | [`OldUnera/donate.html`](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/OldUnera/donate.html) — V2 spec uses `get-unera-cad.html` stepper + `redeem-unera-cad.html` review-callout pattern + success hero per `.cursor/rules/newunera-success-screen-hero.mdc` | 44 |
| `NewUnera/donation-history.html` | [`OldUnera/donation-history.html`](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/OldUnera/donation-history.html) — V2 spec mirrors `wallet-enhanced.html` activity table + `.cursor/rules/table-no-scrollbar.mdc` | 38 (hub link), 45 |
| `NewUnera/operator-login.html` | [`OldUnera/operator-login.html`](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/OldUnera/operator-login.html) — derive from `login_2.html`, lock to email + 2FA | 10 |
| `NewUnera/operator-dashboard.html` | [`OldUnera/operator-dashboard.html`](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/OldUnera/operator-dashboard.html) — `dashboard-enhanced.html` shell, KPI cards using `--font-stat-size` | (operator chrome host for rows 47–80) |
| `NewUnera/operator-hc-management.html` | [`OldUnera/operator-hc-management.html`](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/OldUnera/operator-hc-management.html) — `wallet-enhanced.html` table pattern + `account-settings.html` form chrome | 47, 48, 49, 50 |
| `NewUnera/operator-issuance.html` | [`OldUnera/operator-issuance.html`](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/OldUnera/operator-issuance.html) — KPI strip + audit log table | 19, 70, 71, 72 |
| `NewUnera/operator-por.html` | [`OldUnera/operator-por.html`](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/OldUnera/operator-por.html) — backing-ratio gauge from `proof-of-reserve-public.html` + chain table | 73, 74, 75 |
| `NewUnera/operator-accounts.html` | **No precedent** — design from scratch. Paginated user table + side drawer. | 51, 52, 77, 78 |
| `NewUnera/operator-kyc.html` | **No precedent** — design from scratch. List view + read-only KYC summary + status dropdown + audit-trail note. | 53, 54, 79, 80 |
| `NewUnera/connect-metamask.html` *(optional)* | [`OldUnera/connect-metamask.html`](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/OldUnera/connect-metamask.html) — shell page that auto-opens the existing modal | 31 |
| `NewUnera/connect-walletconnect.html` *(optional)* | [`OldUnera/connect-walletconnect.html`](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/OldUnera/connect-walletconnect.html) — same shell pattern | 32 |

---

## Appendix C — In-page edits (no new file needed)

Sub-feature gaps that should be added inside an existing NewUnera page rather than as a new file. Listed for sprint clarity.

| # | Host page | What to add | Pattern reference |
|---|---|---|---|
| 17 | [notifications.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/notifications.html) | "Manage notification channels →" link to `account-settings.html` preferences anchor | Existing footer-link pattern |
| 20 | [account-security.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/account-security.html) | "Alerts" section above the events log with severity pills + acknowledge/lock-account chips | Brand red `--brand-red` only for critical severity |
| 26 | [centre-detail.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/centre-detail.html) | Donation-activity inline SVG chart with day/week/month/year toggle | Reuse `get-unera-cad.html#L1806` chart pattern |
| 38 | [wallet-enhanced.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/wallet-enhanced.html) | Donations / Remittances / All tabs on activity table | `.cursor/rules/table-no-scrollbar.mdc` |
| 41 | [send-enhanced.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/send-enhanced.html) | "Saved wallets" panel mirroring the bank `.saved-methods-list` pattern | `send-enhanced.html#L2199` host section |
| 42 | [send-enhanced.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/send-enhanced.html) | "Recipient receives" card in review step (e.g. USDC on Base) with rate, slippage, ETA | `redeem-unera-cad.html` `.rate-note` callout + `.cursor/rules/newunera-review-callout-icons.mdc` |
| 62 | [purchase-receipt.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/purchase-receipt.html) | 4-step processing tracker (Submitted → Payment received → Minting → Delivered) | Checkmark icon per `.cursor/rules/newunera-checkmark-icon.mdc` |
| 67 | [proof-of-reserve-public.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/proof-of-reserve-public.html) | "Your wallet" panel (connected address + per-chain hCAD balance, "Connect wallet" empty state) | Reuse `openConnectModal()` from `dashboard-enhanced.html#L3657` |
| 69 | [proof-of-reserve-public.html](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io/blob/main/NewUnera/proof-of-reserve-public.html) | Inline SVG circulation line chart + 7D/30D/90D/1Y chips | Reuse `get-unera-cad.html#L1806` FX-chart pattern |

---

## Appendix D — Recommended sprint sequence (severity × dependency)

1. **Donate surface (rows 44, 45) + repoint "Donate Now" CTAs** — closes the only end-user MVP loop currently broken; fixes the 404.
2. **Receipt status tracker (row 62) + SMS toggle discoverability (row 17)** — small surface fixes, big trust signal.
3. **Wallet payee book + crypto-to-crypto matching (rows 41, 42)** — completes Remittance.
4. **Donation activity chart (row 26)** — informs donors before they donate.
5. **Operator login + dashboard shell** — unlocks operator workstream (operator chrome + nav).
6. **Operator HC Management (rows 47–50) + Operator Account Mgmt (rows 51, 52, 77, 78) + Operator KYC Mgmt (rows 53, 54, 79, 80)**.
7. **Stablecoin Admin: Issuance (rows 70–72) + PoR (rows 73–75)**.
8. **Public transparency layer: circulation chart (row 69) + connected-wallet panel (row 67) on `proof-of-reserve-public.html`**.
9. **Polish: search & filter validation on `explore-centres.html`, suspicious-activity alerts (row 20)**.
10. **Optional: standalone connect shell pages (rows 31, 32)** — only if PM requests deep-linkable wallet entry points.

---

*Tracker prepared by the Product Design function on May 09, 2026. Status calls cite live files in this repository at audit time. BE/QA columns are intentionally blanked under the design-only-scope rule and should be filled in by the Engineering / QA leads during sprint planning.*
