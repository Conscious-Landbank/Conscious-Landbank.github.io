---
name: Design Audit May 09
overview: Produce a detailed roadmap-vs-implementation audit at `markdown/DesignAuditMay09.md` that (a) maps every Roadmap May 09 feature/sub-feature to existing pages in `OldUnera/` and `NewUnera/`, (b) flags what's missing on each, and (c) calls out what's already shipped in `OldUnera/` but not yet ported to `NewUnera/` so the V2 brand catches up to MVP scope.
todos:
  - id: verify
    content: Run targeted read-only checks on notifications (SMS), send-enhanced (payee + matching), get-unera-cad (rails + FX), proof-of-reserve-public (ratio + graph), operator-* pages, donate widget, and wallet connect screens to confirm Done/Partial/Missing calls
    status: completed
  - id: matrix
    content: Build the roadmap coverage matrix (Base System, UNERA Platform user, UNERA Platform operator, Stablecoin Platform user, Stablecoin Platform operator) with per-page citations and Done/Partial/Missing for both OldUnera and NewUnera
    status: completed
  - id: newunera-gaps
    content: Write the NewUnera gaps section grouped Critical / Important / Nice-to-have with design-pattern recommendations
    status: completed
  - id: oldunera-gaps
    content: Write the OldUnera gaps section vs roadmap (SMS, FX surface, circulation graph, backing-ratio module, etc.)
    status: completed
  - id: port-list
    content: Write the headline 'In OldUnera, not yet in NewUnera' port-priority backlog with target file paths and design briefs
    status: completed
  - id: quality-and-order
    content: Write the cross-cutting quality notes (a11y, brand tokens, table rule) and a recommended build order
    status: completed
  - id: save
    content: Save the final document to markdown/DesignAuditMay09.md
    status: completed
  - id: port-backlog-build
    content: Build V2 ports of OldUnera→NewUnera roadmap-required pages (donate, donation-history, operator-login, operator-dashboard, operator-hc-management, operator-issuance, operator-por; standalone connect-metamask/walletconnect screens are optional vs the existing inline modal)
    status: pending
  - id: newunera-feature-fill
    content: Fill remaining roadmap sub-features inside existing NewUnera pages (SMS toggle on notifications, wallet payee book + crypto-to-crypto matching on send-enhanced, circulation graph + balance query on proof-of-reserve-public, status tracker on purchase-receipt, donation stats chart on centre-detail, search & filter on explore-centres, suspicious-activity alerts on account-security)
    status: pending
isProject: false
---

# Design Audit — May 09 Roadmap vs OldUnera & NewUnera

## Goal

Produce **`markdown/DesignAuditMay09.md`** — a single, design-focused audit that scores every roadmap feature against the two implementations and surfaces concrete porting/build gaps for the NewUnera V2 brand release.

> Per `.cursor/rules/markdown-organization.mdc`, the file is created in `markdown/` (not the project root).

## Audit scope

Source of truth: [`Roadmap/roadmap_May09.md`](Roadmap/roadmap_May09.md).

Implementations compared:

- **OldUnera** — production reference, original brand (`OldUnera/*.html`)
- **NewUnera** — V2 brand rebuild in progress (`NewUnera/*.html`, excluding `Mobile App/`)

Out of scope (per `design-only-scope` rule): backend, APIs, data models. Audit focuses on **screen presence, flow completeness, and UX coverage** of each roadmap sub-feature.

## Pre-audit verification (read-only, before drafting)

A small parallel `explore` subagent pass to confirm presence/absence of nuanced sub-features that aren't obvious from filenames:

1. **Notifications channels** — does `NewUnera/notifications.html` and `OldUnera/notifications.html` expose **SMS** preference toggles (roadmap requires "SMS notifications for major event")?
2. **Remittance** — do `send-enhanced.html` (both folders) implement **payee management** (saved recipients) and any UI for **crypto-to-crypto matching for cashing**?
3. **Purchase rails** — does `get-unera-cad.html` (both folders) cover **INTERAC e-transfer**, **card payment**, **crypto payment (USDC/USDT)**, and surface an **exchange rate** (API-driven UI)?
4. **PoR Public** — does `proof-of-reserve-public.html` show **backing ratio**, **per-chain breakdown**, and a **circulation graph**?
5. **Operator suite (OldUnera only)** — what's actually in `operator-dashboard.html`, `operator-hc-management.html`, `operator-issuance.html`, `operator-por.html` (mint/audit log, supply, lock/unlock account, force-reset password, KYC view/update, address & chain management)?
6. **Standalone Donate flow** — confirm `NewUnera` only has the embedded donate widget on `centre-detail.html` and no `donate.html` / `donation-history.html`.
7. **Wallet connection screens** — confirm `NewUnera` uses an inline modal (`openConnectModal()` on `dashboard-enhanced.html`) instead of standalone `connect-metamask.html` / `connect-walletconnect.html`.

These confirmations are needed so the audit's "Missing/Partial/Done" calls are evidence-based, not filename-based.

## Audit document structure (`markdown/DesignAuditMay09.md`)

Sections, in order:

### 1. Executive Summary
- One-paragraph scorecard
- Bullet list: top 5 NewUnera blockers vs roadmap, top 5 OldUnera-only assets to port

### 2. Methodology
- Source files, status legend (Done / Partial / Missing / N/A), and how a feature qualifies as "Done"

### 3. Roadmap Coverage Matrix
For every roadmap feature group, a sub-section with bullet lists (no markdown tables for compact data per request) — but a clean one for the master matrix is acceptable since this *is* a structured audit. Layout per feature:

- **Feature** — roadmap description
- **Sub-features** — bullet list from roadmap
- **OldUnera status** — Done/Partial/Missing + page link(s) + notes
- **NewUnera status** — Done/Partial/Missing + page link(s) + notes
- **Design gap notes** — concrete UX/UI deltas vs `brand-style-guide.html`, `dashboard-enhanced.html`, `wallet-enhanced.html`

Feature groups covered (matching roadmap headings):

1. **Base System Features**
   - Authentication Service (Account creation, 2FA, RBAC for users vs operators)
   - KYC Service
   - Notification Service (real-time, email, **SMS**)
   - Security & Audit Logging (events log, suspicious-activity alerts)
2. **UNERA Platform — Public Users**
   - Humanity Centre Directory
   - HC Detail Page (overview, donation info, stats by day/week/month/year, inline donate)
   - Wallet Connection (Metamask, WalletConnect)
   - Stablecoin Management (balance, recent tx, quick actions, alerts, history hub)
   - Stablecoin Remittance (send to wallet, **payee management**, **crypto-to-crypto matching**, confirmation)
   - Donation (service + history)
3. **UNERA Platform — Operator/Admin Portal**
   - HC Management (create/edit, image upload, activate/deactivate)
   - Account Management (lock/unlock, force reset password)
   - KYC Management (view, update status)
4. **UNERA Stablecoin Platform — Public Users**
   - Purchase Stablecoins (INTERAC, card, crypto, exchange rate API)
   - Delivery Confirmation (tracker, history, receipt)
   - Stablecoin Tracking (Metamask, WalletConnect, balance query, **circulation graph**)
5. **UNERA Stablecoin Platform — Operator/Admin**
   - Issuance Dashboard (minting, audit log, supply)
   - PoR Management (recording, display, backing ratio, addresses/chains)
   - Account Management
   - KYC Management

### 4. NewUnera Gaps vs Roadmap (deep)
Concrete list of every Missing/Partial item, grouped by:

- **Critical (blocks MVP launch)** — e.g. all four Operator portals, donation history page, SMS preferences, crypto-payment rail in Get UNERA CAD if missing, circulation graph on PoR if missing
- **Important (degraded UX vs roadmap)** — e.g. payee management on Send, standalone wallet-connect screens for non-modal flows, donation history aggregation
- **Nice-to-have / parity** — e.g. exchange/convert/withdraw split

For each item: 1–2 sentence design recommendation citing existing NewUnera patterns to leverage (`account-settings.html` forms, `wallet-enhanced.html` activity tables, `get-unera-cad.html` stepper, `redeem-unera-cad.html` review callouts, `proof-of-reserve-public.html` charts).

### 5. OldUnera Gaps vs Roadmap (deep)
What `OldUnera/` is missing or only partially covers (e.g. SMS settings, exchange rate API surface, circulation graph, backing-ratio module on PoR, audit-log browser for operator). Same Critical/Important/Nice-to-have grouping.

### 6. Already-in-OldUnera, Not-yet-in-NewUnera (port priority list)
The headline section the user asked for. Numbered backlog of pages/flows present in `OldUnera/` that should be re-built under V2 brand and dropped into `NewUnera/`:

1. `OldUnera/donate.html` → standalone V2 `NewUnera/donate.html` (centre-aware, deep-link from centre-detail)
2. `OldUnera/donation-history.html` → V2 `NewUnera/donation-history.html` (mirrors `wallet-enhanced.html` activity table pattern, no scrollbars per `table-no-scrollbar` rule)
3. `OldUnera/connect-metamask.html` + `OldUnera/connect-walletconnect.html` → either V2 standalone screens or formal connect modal coverage in V2 brand-style-guide
4. `OldUnera/operator-login.html` → V2 operator entry
5. `OldUnera/operator-dashboard.html` → V2 operator dashboard
6. `OldUnera/operator-hc-management.html` → V2 HC create/edit/upload/activate
7. `OldUnera/operator-issuance.html` → V2 minting + audit log + supply (Stablecoin Admin)
8. `OldUnera/operator-por.html` → V2 PoR management (backing ratio, addresses, chains)
9. Any wallet ops (`withdraw.html`, `convert.html`) the team still wants split out under V2 — flagged as design decision, not auto-port

For each item, a one-paragraph design brief: target file path, reference patterns (cite `brand-style-guide.html`, `account-settings.html`, `wallet-enhanced.html`, `get-unera-cad.html` per `design-request-quality` rule), responsiveness/a11y reminders.

### 7. Cross-cutting design quality notes
- WCAG 2.2 AA, focus, reduced-motion, skip-link checks across the new operator surface
- TestFoundersGrotesk + Material Symbols Outlined consistency reminder for any ported page
- No CSS gradient functions on product HTML (per `new-brand-output` rule)
- `--brand-deep-blue`, `--brand-yellow`, `--brand-cloud-blue` token discipline
- Tables with horizontal overflow follow `table-no-scrollbar`

### 8. Recommended Build Order
A short, opinionated sequence (PD-Manager voice) merging severity + dependency, e.g. Donate → Operator Stablecoin → Operator UNERA → SMS settings → Tracking graph → PoR backing-ratio.

### 9. Open Questions
Anything that needs clarification from PM/eng (e.g. is Operator portal in scope for the same launch as user-side, or a follow-on?). Listed but not blocking.

## Deliverable

- **One file**: `markdown/DesignAuditMay09.md`
- **No code changes**, no edits to `OldUnera/` or `NewUnera/` HTML/CSS/JS
- **Read-only** verification only

## Out of plan / not doing

- No backend or data-layer commentary (per `design-only-scope`)
- No new HTML pages built or scaffolded — audit only
- No edits to `Roadmap/roadmap_May09.md`
- Mobile App folder under `NewUnera/Mobile App/` excluded (it's a separate native track, not the web MVP)

---

## Audit findings (May 09, 2026) — populated

> Verified by reading the live HTML. `OldUnera/` and `NewUnera/` filename diff confirmed; backups (`*_Feb*`, `*_Mar*`, `*_Apr*`, `*-BACKUP*`, `*backup*`, `001testing.html`, `test-dropdown.html`, `reset-storage.html`, `_gen_main.html`) excluded from comparison.

### A. In OldUnera, required by roadmap, NOT yet in NewUnera

These are the **port-priority pages**. Each one already exists in `OldUnera/`, is explicitly required by [`Roadmap/roadmap_May09.md`](roadmap_May09.md), and currently has **no V2 equivalent** in `NewUnera/`.

#### A1. Critical — blocks MVP launch under V2 brand

1. **`OldUnera/donate.html` → `NewUnera/donate.html`**
   - Roadmap source: *UNERA Platform → Public Users → Donation → "Donation service"*.
   - Why critical: Donation is one of the four headline user activities for Community Members (per Core User Groups table). NewUnera only exposes an **inline donate widget** on `centre-detail.html`; no standalone, centre-aware confirm/receipt flow exists.
   - V2 brief: re-use the `get-unera-cad.html` stepper shell (Amount → Review → Confirm → Success), the `redeem-unera-cad.html` review-callout pattern (`.irrevers-warn`, `.rate-note`), centre header card from `centre-detail.html`, and the canonical success hero (per `.cursor/rules/newunera-success-screen-hero.mdc`). Deep-link `?centreId=…` from `centre-detail.html`.

2. **`OldUnera/donation-history.html` → `NewUnera/donation-history.html`**
   - Roadmap source: *UNERA Platform → Public Users → Donation → "Donation history"*; also referenced by *Stablecoin Management → "Access donation and remittance history in one place"*.
   - V2 brief: clone the `wallet-enhanced.html` activity-table layout, apply `.cursor/rules/table-no-scrollbar.mdc` (no vertical scrollbar; hide horizontal scrollbar but keep scrollable). Columns: Date, Centre, Amount (hCAD), Tx hash, Receipt. Filter chips: All / This month / This year / By centre. Add CTA back to `donate.html`.

3. **`OldUnera/operator-login.html` → `NewUnera/operator-login.html`**
   - Roadmap source: *Base System → Authentication Service → "Role-based access control for users and operators"*.
   - Why critical: every operator-portal page below requires a separate operator entry point. RBAC is in roadmap.
   - V2 brief: derive from `NewUnera/login_2.html`; swap the brand subtitle to "Operator Portal", add an **operator-only** badge in the hero, lock the page to email + 2FA only (no social, no magic link). Deep-blue hero, yellow primary CTA per `new-brand-output` rule.

4. **`OldUnera/operator-dashboard.html` → `NewUnera/operator-dashboard.html`**
   - Roadmap source: cross-cuts *UNERA Admin Portal* and *Stablecoin Admin Portal* (HC mgmt, Account mgmt, KYC mgmt, Issuance, PoR).
   - V2 brief: use the `dashboard-enhanced.html` shell (deep-blue nav, KPI cards using `--font-stat-size`, activity table). KPI cards: Total Supply, Reserve Ratio, Active HCs, KYC Pending, Locked Accounts, Suspicious Events (24h). Quick-actions row mirrors the user dashboard but routes to operator surfaces. Reuse `.activity-section` table pattern from `dashboard-enhanced.html` for "Recent Operator Actions" audit feed.

5. **`OldUnera/operator-hc-management.html` → `NewUnera/operator-hc-management.html`**
   - Roadmap source: *UNERA Admin Portal → HC Management* — Create / Edit / Upload images / Activate-Deactivate.
   - V2 brief: list view = `wallet-enhanced.html` activity-table pattern with status pill (Active/Inactive). Detail / edit form = `account-settings.html` section pattern (sectioned cards: "Profile", "Media", "Programs", "Status"). Image upload = drag-and-drop card with `.btn-secondary` "Replace" — keep within the `border-radius: 1.25rem` card system. Activate/Deactivate = destructive confirm modal, deep-blue primary, yellow accent.

6. **`OldUnera/operator-issuance.html` → `NewUnera/operator-issuance.html`**
   - Roadmap source: *Stablecoin Admin Portal → Stablecoin Issuance Dashboard* — Minting / Minting audit logs / Supply.
   - V2 brief: top KPI strip — Total Supply (hCAD), Circulating, Locked in Treasury, Last Mint. Mint form on the right (Amount → Backing reference → Confirm), audit log table fills the rest using the same `.activity-section`/`.history-section` pattern as user wallet — apply `table-no-scrollbar` rule. Status pill: Pending / Confirmed / Failed. Reuse the `mint-history.html` row composition.

7. **`OldUnera/operator-por.html` → `NewUnera/operator-por.html`**
   - Roadmap source: *Stablecoin Admin Portal → PoR Management* — Recording, Display, Backing ratio, Update/Add stablecoin addresses & supported chains.
   - V2 brief: split layout — left: backing-ratio summary card (large numeric using `--font-stat-size`, target ≥ 100%, deep-blue/cloud-blue stack), reserves-by-asset table; right: chain & address management (`account-settings.html` form pattern + chip list of chains). Surface a "Publish snapshot" CTA (yellow) — design-only mock, no backend wiring. Mirror values to public `proof-of-reserve-public.html`.

#### A2. Important — present in OldUnera, design-decision pending for V2

8. **`OldUnera/connect-metamask.html` and `OldUnera/connect-walletconnect.html`**
   - Roadmap source: *UNERA Platform → Public Users → Wallet Connection → Metamask / WalletConnect*; also *Stablecoin Tracking* same sub-features.
   - Verified state: `NewUnera/dashboard-enhanced.html` already implements an inline `openConnectModal()` with MetaMask, WalletConnect, Coinbase, Brave options (lines 2767, 3420, 3437, 3439, 3445, 3447, 3456). Roadmap requirement is **functionally met** by the modal.
   - Recommendation: **do not auto-port** as standalone HTML pages unless we want deep-linkable connect URLs (e.g. for marketing or recovery flows). If we do, derive from `NewUnera/wallet-creation.html` + the modal markup; otherwise document the modal in `brand-style-guide.html` as the canonical wallet-connect pattern.

#### A3. Nice-to-have — in OldUnera but not in roadmap MVP

These exist in `OldUnera/` but the May 09 roadmap does **not** require them for MVP. Treat as backlog, not port-priority:

- `OldUnera/withdraw.html` — partly subsumed by `NewUnera/redeem-unera-cad.html`; keep redeem flow as the V2 canonical off-ramp unless PM requests a separate "withdraw to bank" surface.
- `OldUnera/convert.html` — token-swap; not in roadmap MVP.
- `OldUnera/logos.html` — brand asset reference; superseded by `NewUnera/brand-style-guide.html` and `NewUnera/NewLogo/`.

---

### B. What else to do on NewUnera to meet roadmap requirements

Roadmap sub-features that are required but **not yet present** in existing NewUnera pages. These are **fill-in-place edits**, not new pages.

#### B1. Critical sub-feature gaps (visible to MVP scope)

1. **SMS notification toggle on `NewUnera/notifications.html`**
   - Roadmap: *Base System → Notification Service → "SMS notifications for major event"*.
   - Verified: page contains **no** SMS / text-message preference (grep confirms). Email + in-app only.
   - Action: add a "Channels" section under preferences with three toggles — In-app, Email, SMS — using the `account-settings.html` toggle pattern. Add a phone-number field (mock) and a "Verify number" `.btn-secondary` action. Material Symbols `sms` icon per `.cursor/rules/newunera-icons.mdc`.

2. **Stablecoin circulation graph on `NewUnera/proof-of-reserve-public.html`**
   - Roadmap: *Stablecoin Tracking → "Graph for stablecoin circulation"*.
   - Verified: page only shows "hCAD in circulation: $2,845,290" as a static stat (line 1185). No chart.
   - Action: insert a sparkline / area chart card above the FAQ — inline SVG line chart (no chart libs), tabular-nums axis labels, Cloud Blue fill, Deep Blue stroke. Time-range chips (7D / 30D / 90D / 1Y). Mock data only; document the data contract for engineering.

3. **Connected-wallet balance query surface (Stablecoin Tracking)**
   - Roadmap: *Stablecoin Tracking → "Balance query"* under the public Stablecoin Portal.
   - Action: add a "Your wallet" panel to `NewUnera/proof-of-reserve-public.html` (if user has connected via the modal) that shows the connected address (truncated) + hCAD balance + per-chain breakdown. Empty state = "Connect wallet" CTA opening the same `openConnectModal()` from `dashboard-enhanced.html`.

4. **Status tracker on `NewUnera/purchase-receipt.html`**
   - Roadmap: *Stablecoin Delivery Confirmation → "Status tracker"*.
   - Verified: grep finds no tracker/step markup on this page.
   - Action: add the canonical 4-step processing tracker (Submitted → Payment received → Minting → Delivered) using the checkmark icon per `.cursor/rules/newunera-checkmark-icon.mdc`. Reuse the `get-unera-cad.html` step-circle styling.

5. **Donation statistics chart on `NewUnera/centre-detail.html`**
   - Roadmap: *HC Detail Page → "Statistics on donation (by day, weeks, months and years)"*.
   - Action: add a "Donation activity" card with day/week/month/year toggle chips and an inline SVG bar/line chart (mock data). Place it between the centre overview and the inline donate widget so context flows naturally.

#### B2. Important sub-feature gaps (degraded UX vs roadmap)

6. **Wallet payee book on `NewUnera/send-enhanced.html`**
   - Roadmap: *Stablecoin Remittance → "Payee wallet management"*.
   - Verified: page has **Recent Contacts** for UNERA-user sends and **Saved accounts** for bank withdrawals, but no first-class **wallet** payee book (saved external wallet addresses with labels, networks, last-used).
   - Action: extend the "Send to External Wallet" branch with a "Saved wallets" panel mirroring the bank `.saved-methods-list` pattern (lines ~2202–). Each row: label · network chip · truncated address · "Send again" CTA. Add "Save this wallet" checkbox in step 4 with a label input.

7. **Crypto-to-crypto matching for cashing on `NewUnera/send-enhanced.html`**
   - Roadmap: *Stablecoin Remittance → "Crypto-to-Crypto matching for cashing"*.
   - Action: in the external-wallet review step, surface a "Recipient receives" card showing: hCAD amount → matched cashable crypto for recipient's region (e.g. USDC on Base) with rate, slippage, and ETA. Use the `redeem-unera-cad.html` review-callout pattern (`.rate-note`) and rule `.cursor/rules/newunera-review-callout-icons.mdc` for the leading SVG.

8. **Search & filter on `NewUnera/explore-centres.html`**
   - Roadmap: *Humanity Centre Directory → "Search & filter"*.
   - Action: verify presence; if absent, add a sticky filter bar (search input + region chip group + cause-tag multi-select). Empty-state card if no results. Maintain the existing adaptive grid.

9. **Suspicious-activity alerts surface on `NewUnera/account-security.html`**
   - Roadmap: *Security & Audit Logging → "Alerts for suspicious or unusual activity"*.
   - Action: add an "Alerts" section above the events log with severity pills (Info / Warning / Critical), action chips ("Acknowledge", "Lock account"), and a link to "Activity log". Use brand red `--brand-red` only for critical severity, never as primary fill.

#### B3. Operator sub-features that need their own NewUnera surface

These ride on the operator pages listed in section A1 but are explicit roadmap line items — call them out so they aren't forgotten when porting:

10. **Operator → Account Management (Lock/Unlock + Force reset password)**
    - Surface on `operator-dashboard.html` (or a dedicated `operator-account-management.html` if PM prefers separation). Action menu per user row; force-reset = confirm modal that mocks "Send reset email".

11. **Operator → KYC Management (View + Update KYC status)**
    - Surface on operator dashboard. Detail view reusing the `kyc-verify.html` document layout but in **read-only + status-update** mode for operators. Status pills: Pending / Verified / Rejected / Re-verification required.

#### B4. Already handled — no action needed (sanity confirmed)

- **Wallet connection (Metamask, WalletConnect, Coinbase, Brave)** — covered by inline modal on `NewUnera/dashboard-enhanced.html`.
- **Inline donation widget on centre detail** — present on `NewUnera/centre-detail.html` (118 donation references).
- **Purchase rails** — `NewUnera/get-unera-cad.html` covers INTERAC, card, and crypto (USDC/USDT) payment rails per stepper.
- **2FA + Auth flows** — `setup-2fa.html`, `verify-2fa.html`, `signup_2.html`, `login_2.html`, `forgot-password.html`, `password-reset.html`, `verify-email.html`, `magic-link-sent.html` all present.

---

### C. Recommended build order (PD-Manager call)

Sequencing optimized for user-visible value first, then operator readiness, then polish:

1. **A1.1 `donate.html`** + **A1.2 `donation-history.html`** — closes the only end-user MVP loop currently broken.
2. **B1.1 SMS toggle** on notifications + **B1.4 status tracker** on purchase-receipt — small surface fixes, big trust signal.
3. **B2.6 wallet payee book** + **B2.7 crypto-to-crypto matching** on send-enhanced — completes Remittance.
4. **B1.5 donation stats chart** on centre-detail — informs donors before they donate.
5. **A1.3 `operator-login.html`** + **A1.4 `operator-dashboard.html`** — unlocks operator workstream.
6. **A1.5 `operator-hc-management.html`** + **B3.10 + B3.11** (Account & KYC mgmt surfaces).
7. **A1.6 `operator-issuance.html`** + **A1.7 `operator-por.html`** — Stablecoin Admin Portal.
8. **B1.2 circulation graph** + **B1.3 wallet balance query** on `proof-of-reserve-public.html` — public transparency layer.
9. **B2.8 search & filter** on explore-centres + **B2.9 suspicious-activity alerts** on account-security — polish.
10. **A2.8 standalone connect-metamask / connect-walletconnect** — only if PM requests deep-linkable wallet entry points.
