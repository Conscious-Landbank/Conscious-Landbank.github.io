---
name: 3-App IA Restructure (May 10, 2026 — Boss Update)
overview: "Single canonical plan, restructured per the May 10 boss-updated planning table (Confluence Feature Tracking database, source: `/Users/minhnguyenhoang/Desktop/Feature Tracking.html`). Splits UNERA into 3 main apps — (1) UNERA Consumer App, (2) UNERA Stablecoin App, (3) Admin / Operator Portal — which together cover the four `Web App` tags from the boss's table (UNERA, UNERA Stablecoin, UNERA Admin, UNERA Stablecoin Admin). The previous Governance App from the May 09 plan is REMOVED: the boss's update contains no governance entries. Each app's features are ranked highest → lowest priority (P1 Top → P2 High → P3 Medium → P4 Low) per the boss's `Priority` column. Includes per-app `brand-style-guide.html` forks (Consumer baseline, Liquidity fork for Stablecoin, Operator fork for Admin Portal), NewUnera component reuse map, WCAG/responsive discipline, page specs ranked by priority, and cross-app handoff flows."
todos:
  - id: app1-consumer-p1
    content: "App 1 Consumer — P1 Top: trim mint/redeem CTAs from `dashboard-enhanced.html` and `wallet-enhanced.html` (replace with cross-app links to Stablecoin App + app switcher); verify Authentication, KYC, Wallet Connection (Metamask + WalletConnect — UI for wallet login still missing per FE 7/5), Stablecoin Management, Stablecoin Remittance flows are roadmap-aligned"
    status: pending
  - id: app2-stablecoin-folder-fork
    content: "App 2 Stablecoin: create `NewUnera/StablecoinApp/`, fork `brand-style-guide.html` → Liquidity tokens; migrate `get-unera-cad.html`, `redeem-unera-cad.html`, `mint-history.html`, `swap-history.html`, `purchase-receipt.html`, `proof-of-reserve-public.html` into StablecoinApp/"
    status: pending
  - id: app2-stablecoin-p1
    content: "App 2 Stablecoin — P1 Top: Authentication (with SSO from Consumer app), KYC Service (data shared from Consumer app — align with key-feature gating)"
    status: pending
  - id: app2-stablecoin-p2
    content: "App 2 Stablecoin — P2 High: complete Purchase Stablecoins flow (INTERAC, Card, Crypto USDC/USDT, Exchange rate API + chart); add 4-step delivery status tracker on `purchase-receipt.html`; complete Stablecoin Tracking (balance query panel + circulation graph with 7D/30D/90D/1Y chips on `proof-of-reserve-public.html`)"
    status: pending
  - id: app3-admin-folder-fork
    content: "App 3 Admin Portal: create `NewUnera/AdminPortal/` with sub-folders `UneraAdmin/` and `StablecoinAdmin/`; fork `brand-style-guide.html` → Operator tokens (denser layout, table-first, neutral shell)"
    status: pending
  - id: app3-admin-p1
    content: "App 3 Admin — P1 Top (both UNERA Admin + UNERA Stablecoin Admin): build `operator-login.html` (email + 2FA only — no social, no magic-link) and shared `operator-dashboard.html` shell"
    status: pending
  - id: app3-stablecoin-admin-p2
    content: "App 3 Stablecoin Admin — P2 High: build `operator-issuance.html` (minting form + audit log table + supply KPI strip); `operator-por.html` (PoR recording + backing ratio gauge + chain table)"
    status: pending
  - id: app1-consumer-p3
    content: "App 1 Consumer — P3 Medium: notification inbox + channel preferences cross-link + suspicious-activity alerts banner on `account-security.html`"
    status: pending
  - id: app2-stablecoin-p3
    content: "App 2 Stablecoin — P3 Medium: notification + audit log surfaces (parity with Consumer; BE note 6/5: Email alerts for account service, SMS not deprecated for MVP)"
    status: pending
  - id: app1-consumer-p4
    content: "App 1 Consumer — P4 Low: HC Directory (search/filter), HC Detail (overview + donation info + stats by D/W/M/Y + inline SVG donation chart + donate widget), Donation flow (`donate.html`) + Donation history (`donation-history.html` — closes the 404 from dashboard CTA)"
    status: pending
  - id: app3-admin-p4
    content: "App 3 Admin — P4 Low: `operator-hc-management.html` (Create/Edit, image drag-drop, activate/deactivate); `operator-accounts.html` (Lock/Unlock + Force reset — shared by UNERA Admin + Stablecoin Admin); `operator-kyc.html` (View + Update status — shared)"
    status: pending
  - id: a11y-pass-3apps
    content: "Accessibility pass: axe/Lighthouse + keyboard pass on one representative page per app — Consumer `dashboard-enhanced.html`, Stablecoin `dashboard.html`, Admin `operator-issuance.html`"
    status: pending
isProject: false
---

# UNERA — Three-App Platform (May 10, 2026 Boss Update)

This file is the **only** plan you need to build against. It supersedes the May 09 IA restructure: the previous Governance App is removed and replaced by the **Admin / Operator Portal**, per the boss's updated Confluence Feature Tracking database (`Desktop/Feature Tracking.html`).

---

## The Big Picture

The boss's planning table contains **four `Web App` tags**. Per the user-confirmed framing of "3 main apps", the two operator-side tags are grouped under one Admin / Operator Portal:

```
                          UNERA Platform
                                │
   ┌────────────────────────────┼────────────────────────────────┐
   ↓                            ↓                                ↓
App 1: UNERA Consumer    App 2: UNERA Stablecoin     App 3: Admin / Operator Portal
(`UNERA` web app tag)    (`UNERA Stablecoin` tag)    (`UNERA Admin` + `UNERA Stablecoin Admin` tags)

Folder: NewUnera/        Folder: NewUnera/           Folder: NewUnera/AdminPortal/
        (existing)               StablecoinApp/              ├── UneraAdmin/
                                 (new)                       └── StablecoinAdmin/
                                                             (new)
```

**Removed from this update:** the May 09 plan's Governance App (proposals / voting / delegates). The boss's table contains zero governance entries; treat governance as deferred / out of scope until reintroduced.

---

## Boss's planning table — at a glance

Compact reference of every row in the boss's table, grouped by `Web App` and ordered by `Priority`. Source columns: `Feature`, `Sub-Features`, `Web App`, `Priority`. Status / Requirement State / BE / FE / QA columns are out of design scope (per `.cursor/rules/design-only-scope.mdc`) and are not reproduced here.

### App 1 — UNERA Consumer (`UNERA` tag)

| # | Priority | Feature | Sub-features (boss's wording) |
|---|---|---|---|
| C1 | **P1 Top** | Authentication Service | Account creation (email + pw); Login (email + pw); Magic-link login; Verify email; Forgot password; Password reset; 2FA setup; 2FA verify; RBAC for users + operators |
| C2 | **P1 Top** | KYC Service | KYC verification flow; KYC status banner on dashboard (Alert-CTA) |
| C3 | **P1 Top** | Wallet Connection | Metamask Integration; Wallet Connect Integration |
| C4 | **P1 Top** | Stablecoin Management | Balance display (KPI hero); Recent transactions w/ status; Quick send/purchase buttons; Visual summaries; Status alerts; Donation + remittance history hub |
| C5 | **P1 Top** | Stablecoin Remittance | Send to wallet address; Payee management (wallet payee book — saved external addresses); Crypto-to-Crypto matching for cashing; Transfer confirmation / receipt |
| C6 | **P3 Medium** | Notification Service | Real-time notifications (transactions, donations, account updates); Email alerts; SMS notifications for major events |
| C7 | **P3 Medium** | Security & Audit Logging | User-side activity log (recent transactions); Alerts for suspicious or unusual activity |
| C8 | **P4 Low** | Humanity Centre Directory | Adaptive grid layout for all HCs; Search & filter |
| C9 | **P4 Low** | HC Detail Page | Overview; Donation info; Stats by day / week / month / year; Donation activity chart (inline SVG); Donation function |
| C10 | **P4 Low** | Donation | Donation service; Donation history |

### App 2 — UNERA Stablecoin (`UNERA Stablecoin` tag)

| # | Priority | Feature | Sub-features |
|---|---|---|---|
| S1 | **P1 Top** | Authentication Service | Account Creation; Auth + 2FA; RBAC; SSO from UNERA app |
| S2 | **P1 Top** | KYC Service | KYC Services; KYC data shared from UNERA app |
| S3 | **P2 High** | Purchase Stablecoins (Fiat → hCAD/hUSD) | INTERAC e-transfer; Card payment service; Crypto payment (USDC/USDT or any whitelisted stablecoin); Exchange rate API integration |
| S4 | **P2 High** | Stablecoin Delivery Confirmation | Status tracker; Transaction history; Receipt generation |
| S5 | **P2 High** | Stablecoin Tracking | Metamask Integration; Wallet Connect Integration; Balance query; Graph for stablecoin circulation |
| S6 | **P3 Medium** | Notification Service | Real-time notifications; Email alerts; SMS notifications |
| S7 | **P3 Medium** | Security & Audit Logging | Events and activities logs; Alerts for suspicious or unusual activity |

### App 3 — Admin / Operator Portal

#### 3.1 — UNERA Admin (`UNERA Admin` tag) — operator side of Consumer App

| # | Priority | Feature | Sub-features |
|---|---|---|---|
| UA1 | **P1 Top** | Authentication Service | Account Creation; Auth + 2FA; RBAC |
| UA2 | **P4 Low** | HC Management (Create / Edit) | Create HC; Edit HC; Upload images (drag/drop, crop, replace); Activate / Deactivate (with confirm) |
| UA3 | **P4 Low** | Account Management | Lock / Unlock Account; Force reset password |
| UA4 | **P4 Low** | KYC Management | View KYC; Update KYC Status |

#### 3.2 — UNERA Stablecoin Admin (`UNERA Stablecoin Admin` tag) — operator side of Stablecoin App

| # | Priority | Feature | Sub-features |
|---|---|---|---|
| SA1 | **P1 Top** | Authentication Service | Account Creation; Auth + 2FA; RBAC |
| SA2 | **P2 High** | Stablecoin Issuance Dashboard | Minting Service; Minting audit logs; Supply |
| SA3 | **P2 High** | Proof of Reserve (PoR) Management | PoR Recording Service; PoR Display Service; Backing ratio |
| SA4 | **P4 Low** | Account Management | Lock / Unlock Account; Force reset password |
| SA5 | **P4 Low** | KYC Management | View KYC; Update KYC Status |

---

## Build order (by priority band, across all 3 apps)

The boss's `Priority` column is the single source of truth for sequencing. Build top-to-bottom; do not start a lower band until the prior band has at least design-complete coverage.

### Band 1 — P1 Top (foundational; ship first)

Identity, KYC, wallet connect, balance/remittance, and operator entry door. Without these the rest of the platform is unusable.

1. **Auth surfaces (all 3 apps)** — `login_2.html`, `signup_2.html`, `verify-email.html`, `forgot-password.html`, `password-reset.html`, `setup-2fa.html`, `verify-2fa.html`, `magic-link-sent.html` (Consumer + Stablecoin only — Admin is email + 2FA only), `connect-social.html` (Consumer + Stablecoin only). New: `AdminPortal/operator-login.html`.
2. **KYC surfaces** — `kyc-verify.html` + dashboard banner; KYC sharing copy from Consumer → Stablecoin.
3. **Wallet Connection** — Metamask + WalletConnect modal on `dashboard-enhanced.html` and `wallet-enhanced.html`. **FE gap (7/5/2026): no UI for wallet login method yet** — design + build.
4. **Stablecoin Management (Consumer)** — balance hero, recent activity table, quick actions (cross-app links to Stablecoin App), status alerts.
5. **Stablecoin Remittance (Consumer)** — `send-enhanced.html` polish: wallet payee book, crypto-to-crypto matching "Recipient receives" card, success-screen-hero per `.cursor/rules/newunera-success-screen-hero.mdc`.

### Band 2 — P2 High (Stablecoin core: purchase, delivery, tracking, issuance, PoR)

Everything that makes UNERA CAD/USD actually circulate.

1. **Purchase Stablecoins** — `StablecoinApp/get-unera-cad.html` (INTERAC, Card, Crypto via USDC/USDT, exchange rate API + FX chart).
2. **Delivery Confirmation** — 4-step status tracker on `purchase-receipt.html`; `mint-history.html`; `swap-history.html`.
3. **Stablecoin Tracking** — public PoR page: connected-wallet panel + balance query + inline SVG circulation graph with 7D/30D/90D/1Y chips on `StablecoinApp/proof-of-reserve-public.html`.
4. **Stablecoin Issuance Dashboard (Admin)** — `AdminPortal/StablecoinAdmin/operator-issuance.html`: minting form, audit log table (per `.cursor/rules/table-no-scrollbar.mdc`), supply KPI strip.
5. **PoR Management (Admin)** — `AdminPortal/StablecoinAdmin/operator-por.html`: PoR snapshot recording, backing ratio gauge (reuse public PoR component), chain-list table with add/edit/delete.

### Band 3 — P3 Medium (Notifications + Audit Logging)

Trust + transparency layer; needed before public launch but can ship after the Band 2 financial loop is closed.

1. **Notifications (Consumer + Stablecoin)** — `notifications.html` inbox; email templates (`email-notification-templates.html`); SMS toggle in `account-settings.html`; cross-link from inbox → channel preferences.
2. **Security & Audit Logging (Consumer + Stablecoin)** — recent activity tables already shipped; add suspicious-activity alerts banner on `account-security.html` using brand red `--brand-red` for critical severity.

### Band 4 — P4 Low (Humanity Centres + Donation + Operator admin tools)

Community / philanthropy surfaces and routine operator chores.

1. **HC Directory + HC Detail (Consumer)** — adaptive grid; search & filter; donation chart (inline SVG with D/W/M/Y toggle); donate widget.
2. **Donation flow + history (Consumer)** — `donate.html` + `donation-history.html` (closes the 404 referenced from dashboard CTA).
3. **HC Management (UNERA Admin)** — `operator-hc-management.html`: drawer pattern; image drag/drop; activate/deactivate confirm modal.
4. **Account Management + KYC Management (both Admin contexts)** — `operator-accounts.html`, `operator-kyc.html`; one build target each, configured per role for UNERA Admin vs UNERA Stablecoin Admin.

---

## Cross-cutting — design system forks per app

Each app ships its **own fork** of `NewUnera/brand-style-guide.html`: same layout, sections, fonts, icon rules; only `:root` token adjustments and specimen labels reflecting the fork. Keep TestFoundersGrotesk from `Brand Guide/`, no CSS gradients on product HTML (guide may still document specimens), Material inline SVG discipline (`.cursor/rules/newunera-icons.mdc`), WCAG baseline (`.cursor/rules/newunera-accessibility-wcag.mdc`).

### App 1 — UNERA Consumer App — **baseline tokens**

Existing `NewUnera/brand-style-guide.html` is the canonical reference. Consumer keeps the brand baseline as defined in March 2026 V2 guidelines.

### App 2 — UNERA Stablecoin App — **Liquidity** fork

**Positioning:** Cooler than Consumer — aligns with regulated transparency tone (Circle/Paxos-class), expressed only through UNERA tokens.

**Liquidity-specific aliases (document in forked guide + reuse on Stablecoin pages):**

| Token | Recommended value | UX role |
|-------|-------------------|---------|
| `--app-chrome` | `color-mix(in srgb, var(--brand-deep-blue) 93%, var(--brand-light-blue) 7%)` | Nav / shell — cooler institutional cast vs pure `--brand-deep-blue` |
| `--page-wash` | `color-mix(in srgb, var(--brand-cloud-blue) 62%, var(--brand-white))` | `body` background — brighter than Consumer cloud-blue |
| `--surface-trust` | `color-mix(in srgb, var(--brand-light-blue) 14%, color-mix(in srgb, var(--brand-cloud-blue) 38%, var(--brand-white)))` | PoR hero strips, verified reserve modules |
| `--surface-attestation` | `color-mix(in srgb, var(--brand-earth) 10%, var(--brand-white))` | Receipts / reports — subtle warm paper cue, **deep-blue ink** for all text on this surface |

**Canonical semantic tokens — keep unchanged:** `--brand-yellow` (nav hover/active/focus on dark chrome only), `--fin-up`/`--fin-down`/`--warning`/`--error` (reserve backing deltas, supply health, attestations lifecycle), `--text-secondary` `#3d6b78` (body/meta on white and light washes — re-verify after changing `--page-wash`).

### App 3 — Admin / Operator Portal — **Operator** fork (NEW)

**Positioning:** Denser, table-first, neutral shell — operators scan large datasets all day. Differentiates from Consumer by **calmer surfaces** and **higher data density**, not by recolouring primary CTAs.

**Operator-specific aliases:**

| Token | Recommended value | UX role |
|-------|-------------------|---------|
| `--app-chrome` | `color-mix(in srgb, var(--brand-deep-blue) 96%, var(--brand-earth) 4%)` | Nav / shell — slightly **warmer** institutional feel; signals "operator workspace" without abandoning Deep Blue |
| `--page-wash` | `color-mix(in srgb, var(--brand-white) 94%, var(--brand-cloud-blue) 6%)` | `body` — near-white canvas so dense tables float without cloud-blue noise |
| `--surface-table-row` | `var(--brand-white)` / zebra: `color-mix(in srgb, var(--brand-deep-blue) 2%, var(--brand-white))` | Audit logs, mint history, KYC queue |
| `--surface-action-strip` | `color-mix(in srgb, var(--brand-deep-blue) 3%, var(--brand-white))` | Sticky filter / action bars above tables |
| `--surface-critical` | `color-mix(in srgb, var(--brand-red) 8%, var(--brand-white))` | Lock-account / KYC-rejected / PoR-publish destructive contexts; pair with text label, never colour-only |

**Canonical semantic tokens — keep unchanged:** primary buttons stay **`--brand-deep-blue` fill, white label** (operators must not mistake the primary action); `--brand-yellow` is reserved for nav hover/active/focus and the **PoR "Publish snapshot"** hero CTA per `.cursor/rules/new-brand-output.mdc`.

**Compliance checks after implementing both forks**

- **Yellow × dark chrome:** every nav/focus/active pair on `--app-chrome` (Liquidity & Operator) still passes WCAG contrast targets.
- **`--text-secondary` × `--page-wash`:** re-spot-check both forked washes (Liquidity brighter; Operator near-white).
- **Warm / yellow-tint surfaces:** copy remains `--brand-deep-blue` ink; no yellow/white glyphs on pale yellow mixes.

**Deliverables**

- `NewUnera/StablecoinApp/brand-style-guide.html` — fork + Liquidity tokens.
- `NewUnera/AdminPortal/brand-style-guide.html` — fork + Operator tokens.

---

## Cross-cutting — NewUnera component reuse map

Reuse **structures and CSS clusters** (design layer only):

| UI need | Canonical source (paths relative to project root `CLB/`) |
|---------|------------------------------------------------------------|
| App shell, sticky nav, hamburger breakpoint, KPI grid | `NewUnera/dashboard-enhanced.html` |
| Multi-step flow, stepper (deep blue progression), quote/review banners, processing chips | `NewUnera/get-unera-cad.html`, `NewUnera/redeem-unera-cad.html` |
| Transparency hero (ratio gauge, LIVE badge, last updated, stat cards), distribution bars | `NewUnera/proof-of-reserve-public.html` |
| Dense tables + hidden horizontal scrollbar | `.cursor/rules/table-no-scrollbar.mdc`; `mint-history.html` / `swap-history.html` / `wallet-enhanced.html` |
| Drawer / overlay z-index (operator confirm modals, side sheets) | `.cursor/rules/side-sheet-z-index.mdc`; `NewUnera/account-security.html` |
| Form chrome (operator HC create/edit, account settings) | `NewUnera/account-settings.html` |
| Success hero (donate, mint complete, PoR publish) | `.cursor/rules/newunera-success-screen-hero.mdc` |
| Inline review callouts (irreversible warns, rate notes) | `.cursor/rules/newunera-review-callout-icons.mdc`, `.cursor/rules/newunera-inline-icon-lead.mdc` |
| Checkmark icon (steppers, success, processing chips) | `.cursor/rules/newunera-checkmark-icon.mdc` |

**Icons** — per `.cursor/rules/newunera-icons.mdc`. Operator-leaning glyphs: **account_balance**, **verified**, **description**, **fact_check**, **inventory**, **lock**, **lock_open**, **password**, **assignment_ind**.

---

## Cross-cutting — accessibility, responsiveness, cognitive load

Applies to **all three apps**.

- **WCAG 2.2 AA** baseline: focus-visible on every interactive; do **not** use `--neutral-500` mapped to `--brand-light-blue` for small body text on light surfaces; warm-surface pills → `--brand-deep-blue` ink; touch targets ≥ **44–46px** for primary actions where possible.
- **Skip link** first in DOM → `#main-content`; **`prefers-reduced-motion`**; logical h1 → h2 → h3 per template.
- **Charts/gauges:** pair with `aria-label` / `role="img"` plus visible numerics (PoR gauge, circulation chart, donation chart).
- **Inputs on mobile:** `font-size: 1rem` to avoid iOS zoom.
- **Responsive:** align with existing NewUnera breakpoints (`≤768` nav collapse, single-column KPIs; grids `repeat(auto-fit, minmax(min(280px, 100%), 1fr))`).
- **Operator tables (Admin Portal):** apply `.cursor/rules/table-no-scrollbar.mdc` to every audit log / mint history / KYC queue / accounts list. Sticky first column on mobile if spec allows.
- **Cognitive load:** `font-variant-numeric: tabular-nums` in tables/KPI rows; explicit `CAD` on financial figures; relative + UTC for timestamps (`<time datetime>`).

---

## App 1 — UNERA Consumer App

> Public, end-user app. Folder: **`NewUnera/`** (existing). Maps to boss's `UNERA` web app tag.

Apply Consumer baseline tokens (canonical `NewUnera/brand-style-guide.html`).

### Scope changes from May 09 plan

- **Trim `dashboard-enhanced.html`** — Remove the "Get UNERA CAD" and "Redeem UNERA CAD" buttons from Quick Actions. Replace with two equal-weight cards linking to the Stablecoin App.
- **Trim `wallet-enhanced.html`** — Remove "Get UNERA CAD" / "Redeem UNERA CAD" action buttons from the UNERA CAD section. Add a compact "Manage in Stablecoin App →" link with `aria-label` describing the cross-app destination.
- **Drop `governance.html`** — Boss's update has no governance entries. The page can be removed from the Consumer app entirely (or kept as a deprecated marketing stub if PM wants to preserve copy).
- **App switcher (nav, all pages)** — Disclosure or `role="menu"` pattern with `aria-expanded`, keyboard support, visible label "UNERA apps". Items: Consumer (current), Stablecoin, Admin Portal — each row: app name + one-line descriptor.
- **Migrate out** — `get-unera-cad.html`, `redeem-unera-cad.html`, `mint-history.html`, `swap-history.html`, `purchase-receipt.html`, `proof-of-reserve-public.html` move to `NewUnera/StablecoinApp/`.

### Pages at a glance — ranked highest → lowest priority

| # | Page (file) | Boss's feature | Priority | New / Migrated / Updated |
|---|---|---|---|---|
| 1 | `login_2.html`, `signup_2.html`, `verify-email.html`, `forgot-password.html`, `password-reset.html`, `setup-2fa.html`, `verify-2fa.html`, `magic-link-sent.html`, `connect-social.html` | C1 Authentication Service | **P1 Top** | Existing — verify roadmap parity |
| 2 | `kyc-verify.html` + KYC banner on `dashboard-enhanced.html` | C2 KYC Service | **P1 Top** | Existing — verify alert-CTA on dashboard |
| 3 | `dashboard-enhanced.html` (wallet connect modal) + `wallet-enhanced.html` + new `wallet-creation.html` | C3 Wallet Connection | **P1 Top** | **Updated — needs new UI for wallet login method** (FE gap 7/5/2026); modal-based; cross-app safe |
| 4 | `dashboard-enhanced.html` + `wallet-enhanced.html` (balance hero, recent activity, quick actions) | C4 Stablecoin Management | **P1 Top** | Existing — trim mint/redeem CTAs; add Donations / Remittances / All tabs to wallet activity table |
| 5 | `send-enhanced.html` (+ wallet payee book + crypto-to-crypto matching review card) | C5 Stablecoin Remittance | **P1 Top** | Existing — extend with "Saved wallets" panel and "Recipient receives" review card; success-screen-hero on completion |
| 6 | `notifications.html` + `email-notification-templates.html` + SMS toggle on `account-settings.html` | C6 Notification Service | **P3 Medium** | Existing — add cross-link from inbox → `account-settings.html` preferences anchor |
| 7 | `wallet-enhanced.html` activity + `account-security.html` events log + new alerts banner | C7 Security & Audit Logging | **P3 Medium** | Updated — add "Alerts" section above events log with severity pills (`--brand-red` only for critical) |
| 8 | `explore-centres.html` | C8 Humanity Centre Directory | **P4 Low** | Existing — verify search/filter polish |
| 9 | `centre-detail.html` (+ inline SVG donation activity chart) | C9 HC Detail Page | **P4 Low** | Existing — **add chart with D/W/M/Y toggle** between overview and donate widget (reuse `get-unera-cad.html` FX-chart pattern) |
| 10 | `donate.html` (new) + `donation-history.html` (new) + inline donate widget on `centre-detail.html` | C10 Donation | **P4 Low** | **NEW** — closes broken `donation-history.html` link from `dashboard-enhanced.html` and `account-settings.html` |

### Per-page detail — P1 Top tier

#### 1. Authentication Service (existing pages — verify parity)

**Goal:** Frictionless and secure account creation, login, recovery, and 2FA for Consumer users.

- All 9 auth surfaces already exist in `NewUnera/`.
- **BE note (6/5/2026):** 2FA is implemented as not required for wallet login (not currently in PRD). Decision needed from product on whether wallet-connect users must still pass 2FA.
- **QA note (7/5/2026):** Email service is stubbed with mock OTP; FE behind latest design. Design responsibility: ensure the latest token/icon/spacing pass is reflected in `verify-email.html`, `setup-2fa.html`, `verify-2fa.html`.

#### 2. KYC Service

**Goal:** Pre-onboarding verification + persistent dashboard banner that drives un-verified users to complete KYC.

- `kyc-verify.html` — multi-step document/selfie flow (existing).
- `dashboard-enhanced.html` — Alert-CTA banner near top: "Complete verification to unlock send + purchase"; uses `--surface-warning-soft` not `--brand-red`.

#### 3. Wallet Connection — **Has FE gap**

**Goal:** Let users link an existing self-custody wallet (Metamask) or relay wallet (WalletConnect) so balance + tx queries work cross-app.

- Modal opens from `dashboard-enhanced.html` and `wallet-enhanced.html` (existing `openConnectModal()`).
- **Gap (FE 7/5/2026): no UI for the wallet login *method* yet** — i.e., choosing wallet-as-login vs email-as-login at sign-in. Design needed: a method-picker step in `login_2.html` and corresponding "connect wallet to sign in" surface. Reuse the auth-page chrome from `login_2.html` and the connect-modal markup from `dashboard-enhanced.html`.
- **Optional P2 backlog (boss did not flag, kept for PM):** standalone `connect-metamask.html` / `connect-walletconnect.html` deep-link shells for email re-prompts.

#### 4. Stablecoin Management

**Goal:** Single-glance picture of the user's UNERA holdings + quick paths to send / purchase / track.

- Balance KPI hero on `dashboard-enhanced.html` and `wallet-enhanced.html`.
- Recent transactions table (status pills: completed / pending / failed) — reuse `table-no-scrollbar`.
- Quick actions: Send (in-app), Purchase (cross-app to Stablecoin App), Connect wallet.
- **Donation + remittance hub:** Add Donations / Remittances / All tabs on the wallet activity table OR link to `donation-history.html` (new — see C10).

#### 5. Stablecoin Remittance

**Goal:** Send UNERA CAD/USD or supported assets to a wallet address or saved payee, with clear confirmation.

- Existing `send-enhanced.html` covers the happy path.
- **Gaps to close:**
  - **Wallet payee book** — extend "Send to External Wallet" branch with a "Saved wallets" panel mirroring the bank `.saved-methods-list` pattern (host: `send-enhanced.html#L2199` region).
  - **Crypto-to-crypto matching for cashing** — "Recipient receives" card in the review step (e.g. USDC on Base) using `redeem-unera-cad.html` `.rate-note` callout pattern + `.cursor/rules/newunera-review-callout-icons.mdc` for icon alignment.
  - **Confirmation / receipt** — review step retains the triple block (amount + recipient + fee); on success use the canonical success-screen-hero (`.cursor/rules/newunera-success-screen-hero.mdc`).

### Per-page detail — P3 Medium tier

#### 6. Notification Service

**Goal:** Keep users informed of money movement, donations, and account events without overwhelming them.

- `notifications.html` — real-time inbox; severity grouping (Security / Money / Donations); `aria-live="polite"` for new arrivals.
- `email-notification-templates.html` — template gallery (already exists; verify token alignment).
- **Cross-link gap (rule 17 in May 09 audit):** add "Manage notification channels →" link from inbox footer to `account-settings.html#notification-preferences` anchor.
- SMS preference toggle: `prefTransactionSms` already in Notification Preferences; "Email + SMS" recovery option already in `account-security.html`.
- **BE note (6/5/2026):** Email alerts shipped for account service; SMS NOT deprecated for MVP.

#### 7. Security & Audit Logging

**Goal:** Let users see their own activity and receive proactive alerts when something looks suspicious.

- User-side activity log already on `wallet-enhanced.html` + `dashboard-enhanced.html` recent activity row.
- **Gap (rule 20):** add an "Alerts" section above the events log on `account-security.html` with severity pills + acknowledge/lock-account chips. Use brand red `--brand-red` ONLY for critical severity; warning yellow for medium; informational green/blue for resolved.

### Per-page detail — P4 Low tier

#### 8. Humanity Centre Directory

**Goal:** Browse all participating Humanity Centres.

- `explore-centres.html` — adaptive grid, search & filter (exists in V2 with more filter UI than OldUnera).

#### 9. HC Detail Page — **needs donation chart**

**Goal:** Give a donor enough trust signal to act: who runs the HC, what they spend on, and how donations have trended.

- Overview, donation info ("Make an impact" widget), Donation Statistics section (chips for D/W/M/Y) all exist.
- **Gap (rule 26):** **add the donation activity chart** (inline SVG bar/line) with a D/W/M/Y toggle, sitting between overview and the donate widget. Reuse the `chart-svg-wrap` pattern from `get-unera-cad.html`. Provide a visually-hidden paired data table for screen readers.
- Donation function: kept inline today; once `donate.html` ships, the standalone CTA path takes over (see C10).

#### 10. Donation flow + history — **NEW pages, closes 404**

**Goal:** A dedicated donation flow (selectable amount, optional recurring, success state) and a history page that shows every past donation.

- **`donate.html` (NEW)** — pattern: `get-unera-cad.html` stepper + `redeem-unera-cad.html` review-callout + success hero per `.cursor/rules/newunera-success-screen-hero.mdc`.
- **`donation-history.html` (NEW)** — pattern: `wallet-enhanced.html` activity table + `.cursor/rules/table-no-scrollbar.mdc`. **Closes the broken link** referenced from `dashboard-enhanced.html` and `account-settings.html` (`ctaUrl: 'donation-history.html'` → 404 today).
- Once both ship, repoint the "Donate Now" CTAs in `explore-centres.html` (currently hijacking to `send-enhanced.html`) to `donate.html`.

---

## App 2 — UNERA Stablecoin App

> Public stablecoin app. Folder: **`NewUnera/StablecoinApp/`** (NEW). Maps to boss's `UNERA Stablecoin` web app tag.

Apply **Liquidity** fork tokens site-wide (per `:root` in `StablecoinApp/brand-style-guide.html`).

### Scope

This is the public face of the stablecoin product: account, KYC handoff from Consumer, purchase flows, delivery confirmation, and supply tracking. Operator-only surfaces (minting, PoR recording) live in App 3 — Stablecoin Admin.

### Pages at a glance — ranked highest → lowest priority

| # | Page (file) | Boss's feature | Priority | New / Migrated / Updated |
|---|---|---|---|---|
| 1 | `StablecoinApp/login.html`, `signup.html`, `verify-email.html`, `setup-2fa.html`, `verify-2fa.html` (+ SSO bridge from Consumer) | S1 Authentication Service | **P1 Top** | Migrated from Consumer auth pages — adapt nav shell + Liquidity tokens; add SSO entry point |
| 2 | `StablecoinApp/kyc-verify.html` + KYC handoff banner | S2 KYC Service | **P1 Top** | Migrated — copy KYC payload from Consumer; gate key features on `kycVerified === true` |
| 3 | `StablecoinApp/dashboard.html` (NEW) + `get-unera-cad.html` (migrated; flows: INTERAC, Card, Crypto, FX rate + chart) | S3 Purchase Stablecoins | **P2 High** | Updated — `get-unera-cad.html` already covers all four sub-features; new `dashboard.html` adds KPI hero + entry points |
| 4 | `purchase-receipt.html` (with NEW 4-step status tracker) + `mint-history.html` + `swap-history.html` + `redeem-unera-cad.html` | S4 Stablecoin Delivery Confirmation | **P2 High** | Updated — **add status tracker (Submitted → Payment received → Minting → Delivered) on receipt** using checkmark icon per `.cursor/rules/newunera-checkmark-icon.mdc` |
| 5 | `proof-of-reserve-public.html` (with NEW connected-wallet panel + circulation chart) | S5 Stablecoin Tracking | **P2 High** | Updated — **add "Your wallet" panel** (connected address + per-chain hCAD balance, "Connect wallet" empty state); **add inline SVG circulation line chart with 7D/30D/90D/1Y chips** (reuse FX-chart pattern from `get-unera-cad.html`) |
| 6 | `StablecoinApp/notifications.html` + `email-notification-templates.html` (shared/forked) | S6 Notification Service | **P3 Medium** | Forked from Consumer — Liquidity tokens; same severity grouping |
| 7 | `StablecoinApp/account-security.html` events + audit log | S7 Security & Audit Logging | **P3 Medium** | Forked — same alerts banner pattern as Consumer |

### Per-page detail — P1 Top tier

#### 1. Authentication Service — with SSO from Consumer

**Goal:** Let a user who already has an UNERA Consumer account sign in to the Stablecoin App without re-creating credentials, while still supporting standalone signup for stablecoin-only users.

- Reuse Consumer auth pages (login, signup, 2FA, verify-email, forgot-password, password-reset) with Liquidity nav shell.
- **SSO entry point** on `login.html`: "Continue with my UNERA account" button (primary) + email/password fallback. Hand off uses backend SSO hub (out of design scope; design provides the UI).
- 2FA setup + challenge identical to Consumer.

#### 2. KYC Service — data shared from UNERA app

**Goal:** Avoid making the user re-do KYC if they've already verified on the Consumer app; gate key features (purchase, redeem, large transfers) on KYC status.

- `kyc-verify.html` — same multi-step doc/selfie flow as Consumer; pre-fill from Consumer profile when available.
- KYC handoff banner on Stablecoin `dashboard.html` similar to Consumer's Alert-CTA pattern.
- **Boss's note:** "Should be aligned with accessing key features." Translate to design: any P2 action (Purchase, Redeem, Tracking with wallet connect) must check KYC status and surface a friendly gate ("Verify your identity to continue") instead of a raw error.

### Per-page detail — P2 High tier

#### 3. Purchase Stablecoins (Fiat → hCAD/hUSD)

**Goal:** Walk a user through buying UNERA CAD/USD with INTERAC, card, or another stablecoin (USDC/USDT swap), with a live FX quote and clear timing/SLA.

- `get-unera-cad.html` — already covers all four sub-features (INTERAC, Card, Crypto-from-USDC/USDT, FX rate countdown + chart). Migrate as-is + adapt nav + Liquidity tokens.
- **Preflight policy card** at the top of the stepper: min/max purchase, eligibility (KYC tier), settlement time bands per rail.
- New `dashboard.html` provides the entry point: KPI hero (My UNERA balance, supply circulating), two primary CTAs (Purchase, Redeem), recent activity feed, links to PoR + history.

#### 4. Stablecoin Delivery Confirmation — **add status tracker on receipt**

**Goal:** Make the post-payment state legible at a glance: where is the user's money in the mint pipeline, when will tokens land in their wallet?

- `mint-history.html` and `swap-history.html` — migrated as-is; user-facing minting / swap audit.
- `purchase-receipt.html` — **GAP (rule 62):** add the 4-step processing tracker (Submitted → Payment received → Minting → Delivered) using the canonical checkmark icon per `.cursor/rules/newunera-checkmark-icon.mdc`. Each step shows ETA + relative time; pending steps use the deep-blue active ring; complete steps use the checkmark.
- `redeem-unera-cad.html` — migrated; same multi-step flow; "On-chain settled" vs "Bank sent" two-phase status in processing chips.

#### 5. Stablecoin Tracking — **add wallet panel + circulation chart**

**Goal:** Public, transparent view of UNERA CAD/USD supply, backing, and what the user's own wallet holds.

- `proof-of-reserve-public.html` — already has Backing Ratio gauge + Reserve Composition.
- **GAP (rule 67):** add a "Your wallet" panel — connected address + per-chain hCAD balance, "Connect wallet" empty state. Reuse `openConnectModal()` from `dashboard-enhanced.html#L3657`.
- **GAP (rule 69):** static `$2,845,290` stat is replaced by an inline SVG circulation line chart + 7D/30D/90D/1Y chips. Reuse `chart-svg-wrap` pattern from `get-unera-cad.html#L1806`. Provide screen-reader-paired data table.
- Cross-link to (operator-only) PoR Management + attestations archive — but the public PoR page is the canonical user-facing surface.

### Per-page detail — P3 Medium tier

Notification Service (S6) and Security & Audit Logging (S7) — fork the Consumer patterns, swap nav + Liquidity tokens, keep severity grouping and `<table-no-scrollbar>` discipline.

---

## App 3 — Admin / Operator Portal

> Operator-only app for both UNERA and UNERA Stablecoin operators. Folder: **`NewUnera/AdminPortal/`** (NEW), with sub-folders **`UneraAdmin/`** and **`StablecoinAdmin/`**. Maps to boss's `UNERA Admin` + `UNERA Stablecoin Admin` web app tags.

Apply **Operator** fork tokens site-wide.

### Scope

Single shared shell (login, dashboard, account-mgmt, kyc-mgmt) configurable for either operator role; role-specific surfaces live in their sub-folder. Auth is locked to **email + 2FA only** — no social login, no magic-link — per the operator entry-door rule (May 09 row 10).

### 3.1 — UNERA Admin (operator side of Consumer App) — pages at a glance

| # | Page (file) | Boss's feature | Priority | New / Updated |
|---|---|---|---|---|
| 1 | `AdminPortal/operator-login.html` (shared) + `AdminPortal/UneraAdmin/operator-dashboard.html` | UA1 Authentication Service | **P1 Top** | **NEW** — derive `operator-login.html` from `login_2.html`; lock to email + 2FA |
| 2 | `AdminPortal/UneraAdmin/operator-hc-management.html` | UA2 HC Management (Create/Edit) | **P4 Low** | **NEW** — drawer pattern; image drag/drop; activate/deactivate confirm modal |
| 3 | `AdminPortal/operator-accounts.html` (shared with 3.2) | UA3 Account Management | **P4 Low** | **NEW** — paginated user table + side drawer with Lock/Unlock + Force reset |
| 4 | `AdminPortal/operator-kyc.html` (shared with 3.2) | UA4 KYC Management | **P4 Low** | **NEW** — list view + read-only KYC summary (reuse `kyc-verify.html` doc layout) + status dropdown + audit-trail note |

### 3.2 — UNERA Stablecoin Admin (operator side of Stablecoin App) — pages at a glance

| # | Page (file) | Boss's feature | Priority | New / Updated |
|---|---|---|---|---|
| 1 | `AdminPortal/operator-login.html` (shared) + `AdminPortal/StablecoinAdmin/operator-dashboard.html` | SA1 Authentication Service | **P1 Top** | **NEW** — same login as 3.1; role-specific dashboard |
| 2 | `AdminPortal/StablecoinAdmin/operator-issuance.html` | SA2 Stablecoin Issuance Dashboard | **P2 High** | **NEW** — minting form + minting audit log (`table-no-scrollbar`) + supply overview KPI strip with `--font-stat-size` |
| 3 | `AdminPortal/StablecoinAdmin/operator-por.html` | SA3 PoR Management | **P2 High** | **NEW** — PoR snapshot recording surface ("Publish snapshot" CTA in `--brand-yellow`); backing-ratio gauge (reuse public-PoR component); chain-list table with add/edit/delete |
| 4 | `AdminPortal/operator-accounts.html` (shared with 3.1) | SA4 Account Management | **P4 Low** | Same as UA3 — same target file, role-aware |
| 5 | `AdminPortal/operator-kyc.html` (shared with 3.1) | SA5 KYC Management | **P4 Low** | Same as UA4 — same target file, role-aware |

### Per-page detail — P1 Top tier (both 3.1 + 3.2)

#### `operator-login.html` (shared)

**Goal:** Locked-down operator entry with no consumer-grade login affordances.

- Derive markup from `NewUnera/login_2.html`.
- **Strip** social login, magic-link, "Sign up" link.
- **Keep** email + password, 2FA challenge, "Forgot password" (admin-routed reset).
- Distinct nav shell: Operator fork chrome + role badge in header (UNERA Admin vs UNERA Stablecoin Admin) chosen post-login.

#### `operator-dashboard.html` (per role)

**Goal:** Single-glance operator KPIs + jump-off to the operator's daily tasks.

- KPI hero with `--font-stat-size`: for UNERA Admin → active HCs / pending KYC / locked accounts; for Stablecoin Admin → circulating supply / backing ratio / pending mints / pending KYC.
- Quick actions row: for UNERA Admin → Create HC, Review KYC queue; for Stablecoin Admin → New mint, Publish PoR snapshot, Review KYC queue.
- Recent activity table for the operator's role (HC edits, mint events, KYC decisions).

### Per-page detail — P2 High tier (3.2 only)

#### `operator-issuance.html` — Stablecoin Issuance Dashboard

**Goal:** Mint UNERA CAD/USD against verified reserve deposits and keep an immutable audit trail.

- **Mint form:** amount, target chain, recipient address (validated), reference note, dual-approval checkbox if 4-eyes is on. Primary CTA "Submit mint" in `--brand-deep-blue`.
- **Minting audit log table:** date, operator, amount, chain, tx hash (monospace truncate + copy), status. Apply `.cursor/rules/table-no-scrollbar.mdc`. Filters: date range, status, operator.
- **Supply overview:** KPI strip — Total minted to date, Burned, Circulating; gauge or sparkline for trend (reuse PoR gauge pattern). Use `--font-stat-size` from forked guide.

#### `operator-por.html` — PoR Management

**Goal:** Record a new PoR snapshot, manage the backing-ratio panel, and maintain the list of stablecoin contract addresses + supported chains.

- **PoR recording surface:** asset class breakdown form (Cash, T-bills, etc.) with custodian + jurisdiction + maturity bucket fields; "Publish snapshot" CTA in `--brand-yellow` per `.cursor/rules/new-brand-output.mdc` (operator dashboard exception).
- **Backing ratio panel:** reuse the public PoR gauge component; show current ratio + delta vs last snapshot.
- **Chain-list table:** address, chain, status, supported features (mint/burn/transfer), last verified at. Add/edit/delete via drawer using `.cursor/rules/side-sheet-z-index.mdc` and `account-settings.html` form chrome.

### Per-page detail — P4 Low tier (shared 3.1 + 3.2)

#### `operator-accounts.html` (shared)

**Goal:** Find a user and lock/unlock their account or trigger a forced password reset, with confirmations and an audit trail.

- Paginated user table: email, KYC status, account status (Active / Locked), last login, role (User / Operator).
- Filters: search by email/ID, KYC status, account status.
- Row action → side drawer with Lock/Unlock toggle + Force reset password button (mocks "Send reset email").
- Destructive confirm modal: focus trap, Escape, `--surface-critical` accent.

#### `operator-kyc.html` (shared)

**Goal:** Review submitted KYC documents and update status with an audit-trail note.

- List view: pending / verified / rejected / re-verification queue.
- Detail page: read-only KYC summary reusing `kyc-verify.html` document layout.
- Status dropdown: Pending / Verified / Rejected / Re-verification required.
- Audit-trail note field (mandatory on Rejected / Re-verification required).

#### `operator-hc-management.html` (UNERA Admin only)

**Goal:** Create + edit Humanity Centres, upload imagery, and toggle public visibility.

- Drawer pattern from OldUnera reference.
- Form chrome reused from `account-settings.html`.
- Image upload card: drag/drop, crop, replace via `.btn-secondary`.
- Activate / Deactivate toggle with destructive confirm modal.

---

## Cross-app handoff flows

| Flow | Apps involved | Recommendation |
|------|---------------|----------------|
| Consumer **CAD awareness** → Stablecoin **purchase / redeem** | 1 ↔ 2 | Wallet row "Manage in Stablecoin App →" (`?from=consumer`); reciprocal "← Back to Consumer" tertiary in Stablecoin nav. App switcher in nav on every page. |
| Consumer **SSO** → Stablecoin login | 1 ↔ 2 | "Continue with my UNERA account" primary CTA on Stablecoin `login.html`; falls back to email/password if SSO unavailable. |
| Consumer **KYC** → Stablecoin **gating** | 1 ↔ 2 | KYC payload shared at backend; design surfaces a friendly gate ("Verify your identity to continue") on any P2 Stablecoin action when status is not Verified. |
| Operator **mint** → Public **circulation chart refresh** | 3.2 → 2 | After `operator-por.html` "Publish snapshot", the public `proof-of-reserve-public.html` gauge + chart should reflect within copy ("Last updated …"). Design provides the data-freshness ribbon; backend handles refresh cadence. |
| Operator **KYC approve** → User **dashboard banner clears** | 3.1/3.2 → 1/2 | When `operator-kyc.html` flips status to Verified, the user-side KYC banner on `dashboard-enhanced.html` and `StablecoinApp/dashboard.html` resolves to a brief success toast on next load. |
| Cross-role operator switch | 3.1 ↔ 3.2 | If the same person holds both UNERA Admin + Stablecoin Admin roles, the post-login role picker remembers last choice; both contexts use the same `operator-accounts.html` and `operator-kyc.html` build target. |

---

## Folder & file inventory (post-restructure)

```
NewUnera/                               ← App 1: UNERA Consumer App
├── (existing pages: dashboard-enhanced.html, wallet-enhanced.html, send-enhanced.html,
│    explore-centres.html, centre-detail.html, account-settings.html, account-security.html,
│    notifications.html, login_2.html, signup_2.html, kyc-verify.html, etc.)
├── donate.html                         ← NEW (P4)
├── donation-history.html               ← NEW (P4)
├── brand-style-guide.html              ← canonical baseline (unchanged)
│
├── StablecoinApp/                      ← App 2: UNERA Stablecoin App (NEW folder)
│   ├── brand-style-guide.html          ← NEW (Liquidity fork)
│   ├── dashboard.html                  ← NEW (P2)
│   ├── login.html, signup.html, …      ← MIGRATED (with SSO bridge)
│   ├── kyc-verify.html                 ← MIGRATED
│   ├── get-unera-cad.html              ← MIGRATED
│   ├── redeem-unera-cad.html           ← MIGRATED
│   ├── purchase-receipt.html           ← MIGRATED + status tracker
│   ├── mint-history.html               ← MIGRATED
│   ├── swap-history.html               ← MIGRATED
│   ├── proof-of-reserve-public.html    ← MIGRATED + wallet panel + circulation chart
│   ├── notifications.html              ← FORKED
│   └── account-security.html           ← FORKED
│
└── AdminPortal/                        ← App 3: Admin / Operator Portal (NEW folder)
    ├── brand-style-guide.html          ← NEW (Operator fork)
    ├── operator-login.html             ← NEW (shared, email + 2FA only)
    ├── operator-accounts.html          ← NEW (shared 3.1 + 3.2)
    ├── operator-kyc.html               ← NEW (shared 3.1 + 3.2)
    ├── UneraAdmin/                     ← 3.1 — UNERA Admin
    │   ├── operator-dashboard.html     ← NEW
    │   └── operator-hc-management.html ← NEW (P4)
    └── StablecoinAdmin/                ← 3.2 — UNERA Stablecoin Admin
        ├── operator-dashboard.html     ← NEW
        ├── operator-issuance.html      ← NEW (P2)
        └── operator-por.html           ← NEW (P2)
```

---

## Sources & references

- **Boss's planning table (canonical):** `/Users/minhnguyenhoang/Desktop/Feature Tracking.html` — Confluence database `conscious-landbank.atlassian.net/wiki/spaces/.../database/56623253`, exported May 10, 2026.
- **Roadmap PRD:** [`Roadmap/roadmap_May09.md`](roadmap_May09.md).
- **Implementation audit (Done / Partial / Missing):** [`markdown/DesignAuditMay09.md`](../markdown/DesignAuditMay09.md).
- **Sub-feature → URL tracker:** [`markdown/FeatureTrackingMay09.md`](../markdown/FeatureTrackingMay09.md) — same row IDs referenced inline above (rule 17, 20, 26, 62, 67, 69, etc.).
- **Brand guidelines (V2):** `Brand Guide/UNERA_BRAND_GUIDELINES_V2.pdf` (March 2026); CSS source of truth `NewUnera/brand-style-guide.html`.
- **Workspace rules used in this plan:** `.cursor/rules/new-brand-output.mdc`, `.cursor/rules/newunera-icons.mdc`, `.cursor/rules/newunera-accessibility-wcag.mdc`, `.cursor/rules/newunera-checkmark-icon.mdc`, `.cursor/rules/newunera-success-screen-hero.mdc`, `.cursor/rules/newunera-review-callout-icons.mdc`, `.cursor/rules/newunera-inline-icon-lead.mdc`, `.cursor/rules/table-no-scrollbar.mdc`, `.cursor/rules/side-sheet-z-index.mdc`, `.cursor/rules/wallet-action-pages.mdc`, `.cursor/rules/design-only-scope.mdc`, `.cursor/rules/design-request-quality.mdc`.

---

## Reference — superseded plan files

- **May 09 plan (3-app with Governance):** the previous version of this file — Governance App removed in this rewrite per boss update. Prior content (Tally / Snapshot / delegate UX research, Protocol fork tokens) lives in the file's git history if reintroduced.
- [`3-app_ia_enhanced_plan_46160048.plan.md`](/Users/minhnguyenhoang/.cursor/plans/3-app_ia_enhanced_plan_46160048.plan.md) is **deprecated for execution** — its contents are merged herein.
