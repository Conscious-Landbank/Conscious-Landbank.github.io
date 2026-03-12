# CLB Design Evaluation — March 12, 2025

Design/UX/UI evaluation of all Conscious Landbank (CLB) features. Scope: frontend only; no backend assessment.

---

## 1. Executive Summary

### Scope
- **Design/UX/UI only** — no backend, APIs, or smart contract evaluation
- Feature-by-feature assessment against the CLB feature list
- Gaps and improvement recommendations for each area

### Evaluation Approach
- Comparison against existing UI files in the codebase
- Alignment with [UNERA UI standards](.cursor/rules/unera-ui-standards.mdc)
- Canonical reference pages: `dashboard-enhanced.html`, `wallet-enhanced.html`, `add-money.html`, `send-enhanced.html`, `exchange.html`, `stake.html`, `centre-detail.html`
- Brand reference: `brand-style-guide.html`

### Key Findings
- **Strengths:** Consistent brand tokens on canonical pages, responsive patterns, accessibility (skip link, reduced-motion) on most flows
- **Gaps:** Token inconsistency on 3+ pages, missing accessibility on some pages, remittance payee management and location-based cash-out not implemented, crypto payment buried in purchase flow

---

## 2. Public Users / Community Members

### 2.1 Humanity Centre Directory

**Feature:** Browse and explore all Humanity Centres within the CLB network through a responsive web app.

**Current Implementation:** [explore-centres.html](explore-centres.html)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Adaptive grid layout | Done | `grid-template-columns: repeat(auto-fill, minmax(380px, 1fr))` (lines 216–217) |
| Search & filter | Done | Search input, filter chips (category), filter selects (location, sort) |
| Responsive (mobile/tablet/desktop) | Partial | Grid collapses; filter chips may overflow on small screens |

**Gaps:**
- **Token inconsistency:** Uses `--earth-deep`, `--earth-rich`, `--stone-dark` (lines 15–27) instead of full UNERA token set (`--primary-green`, `--text-primary`, etc.)
- **Accessibility:** No skip link; no `prefers-reduced-motion` media query
- **Empty state:** No explicit empty state when filters return no results
- **Location:** No map view for geographic exploration

**Improvements:**
1. Align `:root` with UNERA tokens from `unera-ui-standards.mdc`
2. Add skip link as first element inside `<body>`
3. Add `@media (prefers-reduced-motion: reduce)` block
4. Add empty-state message when `filterCentres()` returns no matches
5. Consider horizontal scroll or wrap for filter chips at ≤768px

---

### 2.2 HC Detail Page

**Feature:** Complete Humanity Centre information, donation info, statistics (daily/weekly/monthly/yearly), donate from same page.

**Current Implementation:** [centre-detail.html](centre-detail.html)

| Requirement | Status | Notes |
|-------------|--------|-------|
| HC overview pages | Done | Hero, impact cards, section cards |
| Donation info | Done | Donation container with trust badges |
| Statistics (daily, weekly, monthly, yearly) | Done | Tabs with chart (lines 1279–1285) |
| Donation function | Done | Inline donation form, mobile collapsible sheet |

**Gaps:**
- **Chart accessibility:** Canvas-based chart may lack screen-reader table fallback for donation data
- **Donation discoverability:** Donation CTA could be more prominent when user scrolls past stats

**Improvements:**
1. Add hidden data table for chart (e.g. `aria-describedby` linking to table with period/amount)
2. Add sticky or floating "Donate" CTA on scroll for long pages
3. Ensure mobile donation sheet has clear expand affordance

---

### 2.3 Purchase Stablecoins (Fiat → hCAD/hUSD)

**Feature:** Purchase stablecoins with guided flow; INTERAC, card, crypto payment; exchange rate API integration.

**Current Implementation:** [add-money.html](add-money.html), [exchange.html](exchange.html)

| Requirement | Status | Notes |
|-------------|--------|-------|
| INTERAC e-transfer | Done | Saved method cards, Request Money flow |
| Card payment service | Done | Visa/Mastercard saved methods |
| Crypto payment (USDC/USDT) | Partial | Via wallet modal; not surfaced as primary option |
| Exchange rate integration | Partial | exchange.html has rate + lock timer; add-money less prominent |
| Responsive flow | Done | Mobile step indicator, responsive layout |

**Gaps:**
- **Crypto payment:** Crypto option appears only after selecting "Add new" or in wallet prerequisite; not equal to fiat options
- **Exchange rate:** add-money does not show live rate or "rate valid for X seconds" before amount entry
- **Cognitive load:** Multi-step flow (KYC → Wallet → Payment → Amount → Confirm) may feel long

**Improvements:**
1. Surface crypto (USDC/USDT) as a primary payment method card alongside INTERAC and card
2. Show live rate + lock timer at top of amount step (mirror exchange.html pattern, lines 1169–1170, 1223)
3. Consider progress indicator or step summary to reduce perceived complexity

---

### 2.4 Wallet Connection

**Feature:** Connect crypto wallet to view, hold, and manage stablecoins. MetaMask and WalletConnect.

**Current Implementation:** [connect-metamask.html](connect-metamask.html), [connect-walletconnect.html](connect-walletconnect.html)

| Requirement | Status | Notes |
|-------------|--------|-------|
| MetaMask integration | Done | Dedicated page |
| WalletConnect integration | Done | Dedicated page |

**Gaps:**
- **External CSS:** connect-metamask depends on `auth-enhanced.css` (line 15); not self-contained
- **Unified entry:** No single "Choose your wallet" picker that routes to MetaMask vs WalletConnect
- **Parity:** WalletConnect flow may lack same polish as MetaMask (connection steps, error states)

**Improvements:**
1. Inline or copy required styles into connect-metamask so it works without external CSS
2. Add unified wallet picker modal (similar to add-money wallet modal, lines 2286–2302) as entry point
3. Align error/connecting/success states between both flows

---

### 2.5 Stablecoin Management

**Feature:** Overview of holdings and activity; balances, transactions, quick actions; alerts; donation and remittance history in one place.

**Current Implementation:** [wallet-enhanced.html](wallet-enhanced.html), [dashboard-enhanced.html](dashboard-enhanced.html)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Display current stablecoin balances | Done | Balance cards |
| View recent transactions (completed, pending) | Done | Transaction list with status |
| Quick buttons (send, donate, purchase) | Done | Action buttons |
| Simple visual summaries | Partial | No activity-over-time chart |
| Alerts for transaction statuses | Partial | KYC alert banner; notification modal for success/error |
| Donation and remittance history in one place | Gap | Donation history separate page; no unified view |

**Gaps:**
- **Unified history:** Donation history at `donation-history.html`; remittance/send history in wallet; not combined
- **Transaction alerts:** Modals are one-off; no persistent toast or banner for pending/failed
- **Activity summary:** No simple chart (e.g. last 7 days) for send/donate/purchase activity

**Improvements:**
1. Add "Donation & Remittance History" section in wallet or dashboard linking to unified view
2. Add persistent transaction status banner/toast for pending/failed (e.g. `aria-live` region)
3. Add minimal activity chart (e.g. bar chart for last 7 days) for visual summary

---

### 2.6 Stablecoin Delivery Confirmation

**Feature:** Delivery status, transaction details, receipts for stablecoin purchases.

**Current Implementation:** [purchase-receipt.html](purchase-receipt.html)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Status tracker | Gap | No stepper (Processing → Confirmed → Delivered) |
| Transaction history | Partial | Receipt shows single transaction |
| Receipt generation | Done | Receipt card, print/download actions |

**Gaps:**
- **Skip link:** Missing
- **Reduced motion:** No `prefers-reduced-motion` block
- **Status stepper:** No visual progress (Processing → Confirmed → Delivered)
- **Print on mobile:** Receipt layout may not be print-optimized on small screens

**Improvements:**
1. Add skip link and `prefers-reduced-motion`
2. Add status stepper at top of receipt (e.g. 3 steps with current step highlighted)
3. Add `@media print` styles for receipt card

---

### 2.7 Stablecoin Remittance

**Feature:** Send hCAD to others; location-based cash-out; crypto-to-crypto matching; payee wallet management; transfer confirmation.

**Current Implementation:** [send-enhanced.html](send-enhanced.html)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Send crypto to wallet address | Done | External wallet option with address input |
| Payee wallet management | Gap | Recent contacts shown but no add/edit/remove |
| Crypto-to-crypto matching for cashing | Gap | No location-based "available for cash-out" UI |
| Transfer confirmation | Partial | Confirmation step exists; no receipt after completion |

**Gaps:**
- **Payee management:** Recent contacts (lines 1941–1955) are static; no "Add payee", "Edit", "Remove"
- **Location-based cash-out:** No UI showing which stablecoins/cash-out options are available by region
- **Receipt:** No post-transfer receipt with transaction ID, amount, recipient

**Improvements:**
1. Add payee management: "Add contact", "Edit", "Remove" with modal or inline form
2. Add "Cash-out options by location" section (e.g. region selector + list of available methods)
3. Add receipt screen after successful transfer (mirror purchase-receipt pattern)

---

### 2.8 Donation

**Feature:** Donate stablecoins to Humanity Centres; view donation history.

**Current Implementation:** [donate.html](donate.html), [donation-history.html](donation-history.html)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Donation service | Done | donate.html flow; centre-detail inline donation |
| Donation history | Done | donation-history.html |

**Gaps:**
- **donation-history.html:** No skip link; no `prefers-reduced-motion`; uses `back-btn` instead of full nav
- **Token set:** donation-history missing `--success`, `--warning`, `--error` (lines 10–28)
- **Discoverability:** Donation history link may not be obvious from donate flow or wallet

**Improvements:**
1. Add skip link and `prefers-reduced-motion` to donation-history.html
2. Add full UNERA token set to donation-history
3. Add "View donation history" link in donate success state and in wallet/dashboard nav

---

## 3. Conscious Landbank Operator

### 3.1 Stablecoin Issuance Dashboard

**Feature:** Mint and issue stablecoins based on fiat deposits; minting service, audit logs, supply.

**Current Implementation:** [operator-issuance.html](operator-issuance.html)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Minting service | Done | Mint form/flow |
| Minting audit logs | Done | Log table |
| Supply | Done | Supply display |

**Gaps:**
- **Audit log UX:** No date range or action-type filters
- **Supply visualization:** Could use trend chart (e.g. supply over time)

**Improvements:**
1. Add audit log filters (date range, action type)
2. Add supply trend chart (e.g. line chart for last 30 days)

---

### 3.2 HC Management (Create/Edit)

**Feature:** Create and edit Humanity Centre profiles; media uploads; activate/deactivate.

**Current Implementation:** [operator-hc-management.html](operator-hc-management.html)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Create HC | Done | Form flow |
| Edit HC | Done | Edit form |
| Upload images | Done | Cropper.js integration |
| Activate/deactivate | Partial | May exist; flow could be clearer |

**Gaps:**
- **Activate/deactivate:** Toggle or control may not be prominent; no confirmation before deactivate
- **Validation:** Inline validation feedback could be stronger

**Improvements:**
1. Add clear activate/deactivate toggle with confirmation modal for deactivate
2. Add inline validation (e.g. real-time on blur) for required fields

---

### 3.3 Proof of Reserve (PoR) Management

**Feature:** Record and display total token supply, reserve backing, audit info; backing ratio.

**Current Implementation:** [operator-por.html](operator-por.html), [proof-of-reserve-public.html](proof-of-reserve-public.html)

| Requirement | Status | Notes |
|-------------|--------|-------|
| PoR Recording Service | Done | Operator recording flow |
| PoR Display Service | Done | Public display |
| Backing ratio | Partial | May be present; could be hero metric |

**Gaps:**
- **Backing ratio prominence:** Should be primary hero metric on public page
- **Audit clarity:** Audit timeline or "last verified" could be clearer

**Improvements:**
1. Make backing ratio the hero metric (e.g. large number + "100% backed" badge)
2. Add audit timeline (e.g. list of verification dates)
3. Add trust badges (e.g. "Independently verified")

---

## 4. Cross-Cutting Themes

### Token Consistency
| Page | Issue |
|------|-------|
| explore-centres.html | Uses `--earth-deep`, `--stone-*` instead of UNERA tokens |
| donation-history.html | Missing `--success`, `--warning`, `--error`; partial token set |
| purchase-receipt.html | Missing `--success`, `--warning`, `--error`; no `prefers-reduced-motion` |

### Accessibility
| Page | Skip Link | Reduced Motion | Focus Styles |
|------|-----------|----------------|--------------|
| explore-centres.html | No | No | Unknown |
| donation-history.html | No | No | Partial |
| purchase-receipt.html | No | No | Partial |
| centre-detail.html | Yes | Yes | Yes |
| add-money.html | Yes | Yes | Yes |
| wallet-enhanced.html | Yes | Yes | Yes |

### Responsive
- Nav collapse at ≤768px: verify hamburger on explore-centres, donation-history, purchase-receipt
- Mobile donation sheet: centre-detail has collapsible pattern
- Grid collapse: `repeat(auto-fit, minmax(280px, 1fr))` or `1fr` at 768px

### Trust Signals
- PoR: public page should emphasize backing ratio
- Donation: "100% to programs" messaging present on centre-detail
- Receipt: purchase-receipt provides proof; send flow should add receipt

---

## 5. Priority Recommendations

| Priority | Feature | Gap | Effort |
|----------|---------|-----|--------|
| P0 | Token consistency | explore-centres, donation-history, purchase-receipt use non-standard tokens | Low |
| P0 | Skip link + reduced-motion | Missing on explore-centres, donation-history, purchase-receipt | Low |
| P1 | Remittance: payee management | No add/edit/remove saved payees | Medium |
| P1 | Remittance: location-based cash-out | No "available for cash-out by region" UI | Medium |
| P1 | Purchase: crypto payment | Buried in wallet modal; not equal to fiat | Low |
| P2 | Unified donation/remittance history | Split across donation-history and wallet | Medium |
| P2 | Receipt: status stepper | purchase-receipt has no visual status tracker | Low |
| P2 | PoR: backing ratio | Should be hero metric on public page | Low |

---

## 6. File Reference Summary

| Feature | Primary File(s) |
|---------|-----------------|
| Humanity Centre Directory | explore-centres.html |
| HC Detail | centre-detail.html |
| Purchase Stablecoins | add-money.html, exchange.html |
| Wallet Connection | connect-metamask.html, connect-walletconnect.html |
| Stablecoin Management | wallet-enhanced.html, dashboard-enhanced.html |
| Delivery Confirmation | purchase-receipt.html |
| Remittance | send-enhanced.html |
| Donation | donate.html, donation-history.html |
| Operator Issuance | operator-issuance.html |
| HC Management | operator-hc-management.html |
| PoR | operator-por.html, proof-of-reserve-public.html |

---

*Evaluation date: March 12, 2025. Design/UX/UI only; no backend changes.*
