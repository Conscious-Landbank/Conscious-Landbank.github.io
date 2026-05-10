# Planning — May 10, 2026

> **One‑sentence purpose.** Synthesise the boss's [Feature Tracking](Feature%20Tracking.html) table with the current `NewUnera/` build to answer two questions, per web app: **(1) what do I have now?** and **(2) what is the highest‑value thing to do next?**
>
> **Source of truth (priorities).** The boss's `Priority` column in [Feature Tracking.html](Feature%20Tracking.html) — `1 - Top` → `2 - High` → `3 - Medium` → `4 - Low`.
> **Source of truth (sub‑feature → URL).** [Roadmap/FeatureTrackingMay09.md](FeatureTrackingMay09.md).
> **Source of truth (IA / fork strategy).** [Roadmap/3-app_ia_restructure_a6857b33.plan.md](3-app_ia_restructure_a6857b33.plan.md).
> **Implementation under review.** [`NewUnera/`](../NewUnera) (V2 brand, March 2026).
> **Scope.** Design / UX / UI only, per [`.cursor/rules/design-only-scope.mdc`](../.cursor/rules/design-only-scope.mdc).

---

## TL;DR — what to do this sprint

If you only have time to start three things this week, do these — in order:

1. **Close the Consumer P1 Top gap: wallet‑login UI on `login_2.html`.** FE flagged on 7/5/2026 that there is no UI for the wallet login *method* yet. Auth is the gating P1 Top feature for every other app, and this is the only Consumer P1 Top with a known UI gap. (See [§3.1 → priority 3](#app-1--unera-consumer-top-priorities-ranked).)
2. **Stand up Folder forks for App 2 + App 3.** Create `NewUnera/StablecoinApp/` (Liquidity fork) and `NewUnera/AdminPortal/` (Operator fork) with `brand-style-guide.html` in each. This is a one‑afternoon job that unblocks every P2 High and P1 Top page on the operator/issuer side. (See [§4](#4-recommended-sprint-sequence-cross-app).)
3. **Ship `operator-login.html` + `operator-dashboard.html` shells.** Boss marks Authentication as P1 Top for *both* operator tags (`UNERA Admin` and `UNERA Stablecoin Admin`); today there are zero operator pages in `NewUnera/`. This is the biggest single hole in the build. (See [§3.3](#3-3-app-3-1--unera-admin-operator-side-of-consumer) and [§3.4](#3-4-app-3-2--unera-stablecoin-admin-operator-side-of-stablecoin).)

Everything else flows from these three.

---

## 1. The four web apps (boss's tracker → folder map)

The boss's table has **four** `Web App` tags. Per the [3‑app IA restructure](3-app_ia_restructure_a6857b33.plan.md), the two operator tags are grouped under one shared portal.

| # | Boss's `Web App` tag | App | Folder | Status |
|---|---|---|---|---|
| 1 | `UNERA` | UNERA Consumer App | `NewUnera/` | **Exists** — flat folder, mature build |
| 2 | `UNERA Stablecoin` | UNERA Stablecoin App | `NewUnera/StablecoinApp/` | **Not yet created** — pages live flat in `NewUnera/` today; need migration + Liquidity fork |
| 3 | `UNERA Admin` | UNERA Admin (operator side of Consumer) | `NewUnera/AdminPortal/UneraAdmin/` | **Does not exist** |
| 4 | `UNERA Stablecoin Admin` | UNERA Stablecoin Admin (operator side of Stablecoin) | `NewUnera/AdminPortal/StablecoinAdmin/` | **Does not exist** |

> **Mobile.** `NewUnera/Mobile App/Android/dashboard.html` is a single mobile stub from late April. Not in the boss's planning table; treat as out of scope until the boss adds a mobile column.

> **Brand fork rule.** Each app ships its **own** `brand-style-guide.html` fork: same layout, only `:root` token tweaks. Consumer = baseline; Stablecoin = Liquidity tokens (cooler, transparency tone); Admin = Operator tokens (denser, table‑first, neutral shell). See [3‑app plan §"design system forks"](3-app_ia_restructure_a6857b33.plan.md).

---

## 2. What you have now — `NewUnera/` snapshot (May 10, 2026)

### 2.1 Inventory by app

`NewUnera/` is currently a flat folder of **~38 HTML files** + the `NewLogo/` SVG wordmarks + a single `Mobile App/Android/dashboard.html` stub. Below, every file is mapped to the app it belongs to under the IA restructure.

#### App 1 — UNERA Consumer (lives in `NewUnera/`)

**Authentication (boss P1 Top)**

| Page | State | Notes |
|---|---|---|
| [`login_2.html`](../NewUnera/login_2.html) | Done | Email + password login |
| [`signup_2.html`](../NewUnera/signup_2.html) | Done | Account creation |
| [`magic-link-sent.html`](../NewUnera/magic-link-sent.html) | Done | Magic‑link confirmation |
| [`verify-email.html`](../NewUnera/verify-email.html) | Done | OTP entry |
| [`forgot-password.html`](../NewUnera/forgot-password.html) | Done | — |
| [`password-reset.html`](../NewUnera/password-reset.html) | Done | — |
| [`setup-2fa.html`](../NewUnera/setup-2fa.html) | Done | 2FA setup |
| [`verify-2fa.html`](../NewUnera/verify-2fa.html) | Done | 2FA challenge |
| [`connect-social.html`](../NewUnera/connect-social.html) | Done | Social provider connect |
| `login_2.html` — wallet‑as‑login method picker | **Missing (P1 Top gap)** | FE note 7/5/2026: no UI for wallet login method |

**KYC (P1 Top)**

| Page | State | Notes |
|---|---|---|
| [`kyc-verify.html`](../NewUnera/kyc-verify.html) | Done | Multi‑step doc + selfie flow |
| KYC banner on [`dashboard-enhanced.html`](../NewUnera/dashboard-enhanced.html) | Done | Alert‑CTA pattern |

**Wallet Connection (P1 Top)**

| Page | State | Notes |
|---|---|---|
| [`dashboard-enhanced.html`](../NewUnera/dashboard-enhanced.html) — connect modal | Done | `openConnectModal()` covers MetaMask + WalletConnect |
| [`wallet-enhanced.html`](../NewUnera/wallet-enhanced.html) — connect modal | Done | Same modal |
| [`wallet-creation.html`](../NewUnera/wallet-creation.html) | Done | Custodial wallet creation |
| [`wallet-enhanced_2.html`](../NewUnera/wallet-enhanced_2.html) | **Audit needed** | Looks like a duplicate / older variant; confirm or delete |
| Standalone `connect-metamask.html`, `connect-walletconnect.html` | Missing (P2 backlog) | Boss did not flag; deep‑link shells useful for email re‑prompts |

**Stablecoin Management — Consumer surface (P1 Top)**

| Page | State | Notes |
|---|---|---|
| [`dashboard-enhanced.html`](../NewUnera/dashboard-enhanced.html) | Done | Balance KPI hero, quick actions, recent activity |
| [`wallet-enhanced.html`](../NewUnera/wallet-enhanced.html) | **Partial** | Activity table shipped; Donations / Remittances / All tabs missing (boss row C4 → "donation + remittance history hub") |
| Quick actions trim (remove Get/Redeem CAD) | **Pending** | Per [3‑app plan](3-app_ia_restructure_a6857b33.plan.md): replace mint/redeem CTAs with cross‑app links to Stablecoin App |

**Stablecoin Remittance (P1 Top)**

| Page | State | Notes |
|---|---|---|
| [`send-enhanced.html`](../NewUnera/send-enhanced.html) | **Partial** | Happy path done; **wallet payee book missing**; **"Recipient receives" review card missing** (rows 41 + 42 in [FeatureTrackingMay09.md](FeatureTrackingMay09.md)) |
| Success hero on send completion | Done | Per [`.cursor/rules/newunera-success-screen-hero.mdc`](../.cursor/rules/newunera-success-screen-hero.mdc) |

**Notification + Audit (P3 Medium)**

| Page | State | Notes |
|---|---|---|
| [`notifications.html`](../NewUnera/notifications.html) | **Partial** | Inbox shipped; "Manage notification channels →" cross‑link to `account-settings.html#notification-preferences` missing (row 17) |
| [`email-notification-templates.html`](../NewUnera/email-notification-templates.html) | Done | — |
| [`account-settings.html`](../NewUnera/account-settings.html) | Done | Hosts SMS toggle (`prefTransactionSms`) and the `donation-history` notification CTA (currently 404, see C10) |
| [`account-security.html`](../NewUnera/account-security.html) | **Partial** | Recent device/login events present; **suspicious‑activity alerts banner missing** (row 20) |

**Humanity Centres + Donation (P4 Low)**

| Page | State | Notes |
|---|---|---|
| [`explore-centres.html`](../NewUnera/explore-centres.html) | Done | Adaptive grid + search/filter (V2 has more filter UI than legacy) |
| [`centre-detail.html`](../NewUnera/centre-detail.html) | **Partial** | Overview, "Make an impact" widget, D/W/M/Y stats chips present; **inline SVG donation activity chart missing** (row 26) |
| `donate.html` (standalone donation flow) | **Missing** | Row 44; "Donate Now" CTAs in `explore-centres.html` currently hijack to `send-enhanced.html` |
| `donation-history.html` | **Missing** | Row 45; **broken link** referenced from `dashboard-enhanced.html` and `account-settings.html` (`ctaUrl: 'donation-history.html'` → 404) |

**Out of MVP / appendix**

| Page | Status |
|---|---|
| [`index.html`](../NewUnera/index.html) | Marketing landing — kept |
| [`instructions.html`](../NewUnera/instructions.html) | Help content — kept |
| [`brand-style-guide.html`](../NewUnera/brand-style-guide.html) | V2 brand reference — kept (only NewUnera page allowed CSS gradients) |
| [`exchange.html`](../NewUnera/exchange.html), [`stake.html`](../NewUnera/stake.html), [`governance.html`](../NewUnera/governance.html) | Backlog / post‑MVP — boss's table contains **no** governance entries; governance is **deferred** |
| [`add-money.html`](../NewUnera/add-money.html) | Likely consolidate into `get-unera-cad.html` — confirm with PM |
| [`reset-storage.html`](../NewUnera/reset-storage.html) | Utility — keep |
| `_gen_main.html`, `_gen_script.js` | Generator scratch — clean up |

#### App 2 — UNERA Stablecoin (currently flat in `NewUnera/`, must migrate to `NewUnera/StablecoinApp/`)

| Page (today) | State | Notes |
|---|---|---|
| [`get-unera-cad.html`](../NewUnera/get-unera-cad.html) | Done (P2 High) | All four sub‑features covered: INTERAC, Card, Crypto via USDC/USDT, FX rate countdown + chart |
| [`redeem-unera-cad.html`](../NewUnera/redeem-unera-cad.html) | Done | V2 canonical off‑ramp; subsumes legacy `withdraw.html` |
| [`mint-history.html`](../NewUnera/mint-history.html) | Done | User‑facing minting history |
| [`swap-history.html`](../NewUnera/swap-history.html) | Done | User‑facing swap history |
| [`purchase-receipt.html`](../NewUnera/purchase-receipt.html) | **Partial (P2 High)** | Receipt shipped; **4‑step status tracker (Submitted → Payment received → Minting → Delivered) missing** (row 62) |
| [`proof-of-reserve-public.html`](../NewUnera/proof-of-reserve-public.html) | **Partial (P2 High)** | Backing Ratio gauge + Reserve Composition shipped; **"Your wallet" panel missing** (row 67); **inline SVG circulation chart with 7D/30D/90D/1Y chips missing** (row 69) |
| `StablecoinApp/dashboard.html` | **Missing** | New entry point for Stablecoin App per [3‑app plan §App 2](3-app_ia_restructure_a6857b33.plan.md) |
| `StablecoinApp/login.html` (with SSO from Consumer) | **Missing** | P1 Top — derive from `login_2.html`; add "Continue with my UNERA account" primary CTA |
| `StablecoinApp/kyc-verify.html` | **Missing** | P1 Top — fork; pre‑fill from Consumer KYC; gate P2 actions on `kycVerified === true` |
| `StablecoinApp/notifications.html` + `account-security.html` | **Missing** | P3 Medium — fork from Consumer with Liquidity tokens |
| `StablecoinApp/brand-style-guide.html` | **Missing** | Liquidity fork (cooler tones; `--surface-trust`, `--surface-attestation` tokens) |

#### App 3.1 — UNERA Admin (operator side of Consumer)

**Today: zero pages exist in `NewUnera/`. Folder `AdminPortal/UneraAdmin/` does not exist.**

| Page | State | Boss priority |
|---|---|---|
| `AdminPortal/operator-login.html` (shared with 3.2) | **Missing** | **P1 Top** |
| `AdminPortal/UneraAdmin/operator-dashboard.html` | **Missing** | P1 Top (auth landing) |
| `AdminPortal/UneraAdmin/operator-hc-management.html` | **Missing** | P4 Low |
| `AdminPortal/operator-accounts.html` (shared with 3.2) | **Missing** | P4 Low |
| `AdminPortal/operator-kyc.html` (shared with 3.2) | **Missing** | P4 Low |
| `AdminPortal/brand-style-guide.html` | **Missing** | Operator fork |

#### App 3.2 — UNERA Stablecoin Admin (operator side of Stablecoin)

**Today: zero pages exist in `NewUnera/`. Folder `AdminPortal/StablecoinAdmin/` does not exist.**

| Page | State | Boss priority |
|---|---|---|
| `AdminPortal/operator-login.html` (shared with 3.1) | **Missing** | **P1 Top** |
| `AdminPortal/StablecoinAdmin/operator-dashboard.html` | **Missing** | P1 Top (auth landing) |
| `AdminPortal/StablecoinAdmin/operator-issuance.html` | **Missing** | **P2 High** |
| `AdminPortal/StablecoinAdmin/operator-por.html` | **Missing** | **P2 High** |
| `AdminPortal/operator-accounts.html` (shared with 3.1) | **Missing** | P4 Low |
| `AdminPortal/operator-kyc.html` (shared with 3.1) | **Missing** | P4 Low |

### 2.2 Health summary (rolled up from §2.1)

| App | Done | Partial | Missing | Headline |
|---|---|---|---|---|
| **App 1 — Consumer** | 18 | 5 | 4 | Mature build; biggest holes are wallet‑login UI (P1 Top), payee book (P1 Top), donation flow + history (P4 Low closes a 404) |
| **App 2 — Stablecoin** | 4 | 2 | 5 | Page set is largely shipped but **flat** — needs folder + Liquidity fork; receipt tracker + PoR chart/wallet panel are the only P2 design gaps |
| **App 3.1 — UNERA Admin** | 0 | 0 | 6 | Greenfield — operator‑login + dashboard are P1 Top |
| **App 3.2 — Stablecoin Admin** | 0 | 0 | 6 | Greenfield — operator‑login + dashboard are P1 Top; issuance + PoR are P2 High |

---

## 3. Per‑app current state + top priorities (ranked)

For each app: a one‑line summary of where it stands, then **top priorities ordered exactly by the boss's `Priority` column** — `P1 Top` → `P2 High` → `P3 Medium` → `P4 Low`. Each priority lists the boss's feature, the concrete deliverable (page or in‑page edit), the pattern to copy from, and the rule(s) to honour.

### 3.1 App 1 — UNERA Consumer (`UNERA` tag) — top priorities ranked

> **Where it stands.** The most mature app. 18 pages Done, 5 Partial, 4 Missing. Five of the boss's ten Consumer features are P1 Top — four are largely Done and the fifth (Wallet Connection) has one known FE gap.

#### Priority 1 — Authentication Service (P1 Top)
- **What's there:** All 9 Consumer auth surfaces ship in V2.
- **What's next (design responsibility):**
  - Verify the latest token/icon/spacing pass is reflected on [`verify-email.html`](../NewUnera/verify-email.html), [`setup-2fa.html`](../NewUnera/setup-2fa.html), [`verify-2fa.html`](../NewUnera/verify-2fa.html). QA noted on 7/5/2026 that FE is behind latest design.
  - **Open product question (BE 6/5/2026).** 2FA is currently optional for wallet login but not in the PRD. Decision needed from product on whether wallet‑connect users must still pass 2FA — design should provide both UI states (required / optional) so engineering can flip a flag.
- **Reference:** [`.cursor/rules/newunera-icons.mdc`](../.cursor/rules/newunera-icons.mdc), [`.cursor/rules/newunera-accessibility-wcag.mdc`](../.cursor/rules/newunera-accessibility-wcag.mdc).

#### Priority 2 — KYC Service (P1 Top)
- **What's there:** [`kyc-verify.html`](../NewUnera/kyc-verify.html) and the dashboard alert‑CTA banner.
- **What's next (design responsibility):** None standalone — but **prepare** the KYC banner copy for the cross‑app gate ("Verify your identity to continue") used by App 2 (see [§3.2 Priority 2](#priority-2--kyc-service-p1-top-1)). The banner pattern stays the same; only the CTA destination differs.

#### Priority 3 — Wallet Connection (P1 Top) — **HAS A KNOWN UI GAP**
- **What's there:** Connect modal on [`dashboard-enhanced.html`](../NewUnera/dashboard-enhanced.html) and [`wallet-enhanced.html`](../NewUnera/wallet-enhanced.html). Custodial creation in [`wallet-creation.html`](../NewUnera/wallet-creation.html).
- **What's next (design responsibility — this is the one Consumer P1 Top with an open UI gap):**
  - **Build the wallet‑login *method* picker** on [`login_2.html`](../NewUnera/login_2.html). FE flagged on 7/5/2026 that there is no UI for the wallet login method yet. Add a "Sign in with…" group: Email + password (existing) → "Connect a wallet" branch → on click, open the existing connect modal but in a "sign‑in" mode (not "link wallet" mode).
  - **Optional P2 backlog (boss did not flag):** standalone deep‑link shells `connect-metamask.html` / `connect-walletconnect.html` for email re‑prompts.
- **Pattern to copy:** Auth chrome from [`login_2.html`](../NewUnera/login_2.html); modal markup from [`dashboard-enhanced.html`](../NewUnera/dashboard-enhanced.html) (`openConnectModal()`).
- **Audit duplicate:** Decide what to do with [`wallet-enhanced_2.html`](../NewUnera/wallet-enhanced_2.html) — looks like an older variant that should be deleted.

#### Priority 4 — Stablecoin Management (P1 Top)
- **What's there:** Balance KPI hero, recent activity, quick actions on [`dashboard-enhanced.html`](../NewUnera/dashboard-enhanced.html) + [`wallet-enhanced.html`](../NewUnera/wallet-enhanced.html).
- **What's next (design responsibility):**
  - **Trim mint/redeem CTAs** from `dashboard-enhanced.html` Quick Actions and `wallet-enhanced.html` UNERA CAD section. Replace with a compact cross‑app card/link "Manage in Stablecoin App →" carrying `aria-label` describing the cross‑app destination (per [3‑app plan §App 1 → Scope changes](3-app_ia_restructure_a6857b33.plan.md)).
  - **Add Donations / Remittances / All tabs** to the wallet activity table OR link out to new `donation-history.html` (closes the boss's "single hub for donation + remittance history" sub‑feature, row C4).
- **Rules:** [`.cursor/rules/table-no-scrollbar.mdc`](../.cursor/rules/table-no-scrollbar.mdc) for the activity table.

#### Priority 5 — Stablecoin Remittance (P1 Top)
- **What's there:** [`send-enhanced.html`](../NewUnera/send-enhanced.html) — happy path, including the success‑screen‑hero on completion.
- **What's next (design responsibility):**
  - **Wallet payee book** — extend the "Send to External Wallet" branch with a "Saved wallets" panel mirroring the bank `.saved-methods-list` pattern. Host: `send-enhanced.html` `~L2199` region. (Row 41.)
  - **"Recipient receives" review card** — on the review step show the destination asset (e.g. USDC on Base) with rate, slippage, ETA. Reuse the [`redeem-unera-cad.html`](../NewUnera/redeem-unera-cad.html) `.rate-note` callout pattern + [`.cursor/rules/newunera-review-callout-icons.mdc`](../.cursor/rules/newunera-review-callout-icons.mdc) icon alignment. (Row 42.)

#### Priority 6 — Notification Service (P3 Medium)
- **What's there:** [`notifications.html`](../NewUnera/notifications.html) inbox, [`email-notification-templates.html`](../NewUnera/email-notification-templates.html), SMS toggle in [`account-settings.html`](../NewUnera/account-settings.html), SMS recovery in [`account-security.html`](../NewUnera/account-security.html). BE 6/5/2026: Email alerts shipped for account service; SMS NOT deprecated for MVP.
- **What's next (design responsibility):** Add **"Manage notification channels →"** link in the inbox footer pointing to `account-settings.html#notification-preferences` anchor (row 17).

#### Priority 7 — Security & Audit Logging (P3 Medium)
- **What's there:** Recent activity on [`wallet-enhanced.html`](../NewUnera/wallet-enhanced.html) + dashboard; events log on [`account-security.html`](../NewUnera/account-security.html).
- **What's next (design responsibility):** Add an **"Alerts" section above the events log** on [`account-security.html`](../NewUnera/account-security.html) — severity pills + acknowledge/lock‑account chips. Use `--brand-red` ONLY for critical severity; warning yellow for medium; informational for resolved (row 20).

#### Priority 8 — Humanity Centre Directory (P4 Low)
- **What's there:** [`explore-centres.html`](../NewUnera/explore-centres.html) — adaptive grid + search/filter.
- **What's next:** Verify polish; once `donate.html` ships, repoint the "Donate Now" CTAs (currently hijacking to `send-enhanced.html`).

#### Priority 9 — HC Detail Page (P4 Low)
- **What's there:** [`centre-detail.html`](../NewUnera/centre-detail.html) — overview, "Make an impact" widget, D/W/M/Y stats chips.
- **What's next (design responsibility):** **Add the donation activity chart** — inline SVG bar/line with a D/W/M/Y toggle, sitting between overview and the donate widget (row 26). Reuse the `chart-svg-wrap` pattern from [`get-unera-cad.html`](../NewUnera/get-unera-cad.html) `~L1806`. Pair with a visually‑hidden data table for screen readers.

#### Priority 10 — Donation flow + history (P4 Low) — **CLOSES A 404**
- **What's there:** Inline donate widget on [`centre-detail.html`](../NewUnera/centre-detail.html).
- **What's next (design responsibility — this fixes a live broken link):**
  - **`NewUnera/donate.html` (NEW)** — pattern: [`get-unera-cad.html`](../NewUnera/get-unera-cad.html) stepper + [`redeem-unera-cad.html`](../NewUnera/redeem-unera-cad.html) review‑callout + success hero per [`.cursor/rules/newunera-success-screen-hero.mdc`](../.cursor/rules/newunera-success-screen-hero.mdc).
  - **`NewUnera/donation-history.html` (NEW)** — pattern: [`wallet-enhanced.html`](../NewUnera/wallet-enhanced.html) activity table + [`.cursor/rules/table-no-scrollbar.mdc`](../.cursor/rules/table-no-scrollbar.mdc). Closes the broken link `ctaUrl: 'donation-history.html'` referenced from `dashboard-enhanced.html` and `account-settings.html`.
  - **Repoint** "Donate Now" CTAs in [`explore-centres.html`](../NewUnera/explore-centres.html) to `donate.html` once the new file ships.

### 3.2 App 2 — UNERA Stablecoin (`UNERA Stablecoin` tag) — top priorities ranked

> **Where it stands.** All six core stablecoin pages exist in V2 quality, but they live **flat in `NewUnera/`** alongside Consumer pages. The biggest priority is structural: fork the brand guide and migrate. After that, only two design gaps remain in the P2 High band (receipt tracker + PoR chart/wallet panel).

#### Priority 0 (structural pre‑req, not in boss's list) — Fork + migrate
- **Why first:** Without `NewUnera/StablecoinApp/`, every P1 Top and P2 High Stablecoin deliverable below is blocked from carrying the **Liquidity** fork tokens. This is a one‑afternoon job.
- **Steps:**
  1. Create `NewUnera/StablecoinApp/`.
  2. Copy [`brand-style-guide.html`](../NewUnera/brand-style-guide.html) → `StablecoinApp/brand-style-guide.html`; add Liquidity tokens (`--app-chrome`, `--page-wash`, `--surface-trust`, `--surface-attestation`) per [3‑app plan §"design system forks → App 2"](3-app_ia_restructure_a6857b33.plan.md).
  3. Migrate `get-unera-cad.html`, `redeem-unera-cad.html`, `mint-history.html`, `swap-history.html`, `purchase-receipt.html`, `proof-of-reserve-public.html` into `StablecoinApp/`.
  4. Update intra‑app links; preserve `OldUnera/` URLs via 301 (out of design scope — flag for engineering).

#### Priority 1 — Authentication Service with SSO from Consumer (P1 Top)
- **What's there:** None in `StablecoinApp/`.
- **What's next (design responsibility):**
  - **`StablecoinApp/login.html` (NEW)** — derive markup from [`login_2.html`](../NewUnera/login_2.html). Lead with a primary CTA "**Continue with my UNERA account**" (SSO bridge); fall back to email/password.
  - **`StablecoinApp/signup.html`, `verify-email.html`, `setup-2fa.html`, `verify-2fa.html`, `forgot-password.html`, `password-reset.html`** — port from Consumer with Liquidity nav shell. 2FA setup + challenge identical to Consumer.

#### Priority 2 — KYC Service (P1 Top)
- **What's there:** None in `StablecoinApp/`.
- **What's next (design responsibility):**
  - **`StablecoinApp/kyc-verify.html` (NEW)** — clone Consumer `kyc-verify.html`; pre‑fill from Consumer KYC payload (backend handles the data; design provides the "Confirm your details" review step).
  - **KYC handoff banner** on `StablecoinApp/dashboard.html` mirroring Consumer's Alert‑CTA pattern.
  - **Friendly KYC gate** for any P2 action (Purchase, Redeem, wallet‑connect tracking) when status is not Verified — copy: "Verify your identity to continue" with a CTA back to `kyc-verify.html`.

#### Priority 3 — Purchase Stablecoins (Fiat → hCAD/hUSD) (P2 High)
- **What's there:** [`get-unera-cad.html`](../NewUnera/get-unera-cad.html) already covers all four sub‑features (INTERAC, Card, Crypto via USDC/USDT, FX rate countdown + chart).
- **What's next (design responsibility):**
  - **Migrate** `get-unera-cad.html` into `StablecoinApp/` with Liquidity tokens.
  - **Add a preflight policy card** at the top of the stepper: min/max purchase, eligibility (KYC tier), settlement time bands per rail.
  - **`StablecoinApp/dashboard.html` (NEW)** — entry point: KPI hero (My UNERA balance, supply circulating), two primary CTAs (Purchase, Redeem), recent activity feed, links to PoR + history.

#### Priority 4 — Stablecoin Delivery Confirmation (P2 High) — **MISSING TRACKER**
- **What's there:** [`mint-history.html`](../NewUnera/mint-history.html), [`swap-history.html`](../NewUnera/swap-history.html), [`purchase-receipt.html`](../NewUnera/purchase-receipt.html), [`redeem-unera-cad.html`](../NewUnera/redeem-unera-cad.html).
- **What's next (design responsibility):**
  - **Add the 4‑step processing tracker** on `purchase-receipt.html`: Submitted → Payment received → Minting → Delivered (row 62). Use the canonical checkmark icon per [`.cursor/rules/newunera-checkmark-icon.mdc`](../.cursor/rules/newunera-checkmark-icon.mdc). Pending steps use the deep‑blue active ring; complete steps use the checkmark; each step shows ETA + relative time.
  - **`redeem-unera-cad.html`** — add "On‑chain settled" vs "Bank sent" two‑phase status in processing chips.
  - **Migrate** all four files into `StablecoinApp/`.

#### Priority 5 — Stablecoin Tracking (P2 High) — **MISSING WALLET PANEL + CIRCULATION CHART**
- **What's there:** [`proof-of-reserve-public.html`](../NewUnera/proof-of-reserve-public.html) — Backing Ratio gauge + Reserve Composition.
- **What's next (design responsibility):**
  - **"Your wallet" panel (row 67)** — connected address + per‑chain hCAD balance, with a "Connect wallet" empty state. Reuse `openConnectModal()` from [`dashboard-enhanced.html`](../NewUnera/dashboard-enhanced.html) `~L3657`.
  - **Inline SVG circulation line chart with 7D/30D/90D/1Y chips (row 69)** — replaces the static `$2,845,290` stat. Reuse the FX‑chart `chart-svg-wrap` pattern from [`get-unera-cad.html`](../NewUnera/get-unera-cad.html) `~L1806`. Provide a screen‑reader paired data table.
  - **Migrate** into `StablecoinApp/`.

#### Priority 6 — Notification Service (P3 Medium)
- **What's there:** None in `StablecoinApp/`.
- **What's next (design responsibility):** Fork `notifications.html` + `email-notification-templates.html` with Liquidity tokens; same severity grouping (Security / Money / Donations); same `aria-live="polite"` for new arrivals.

#### Priority 7 — Security & Audit Logging (P3 Medium)
- **What's there:** None in `StablecoinApp/`.
- **What's next (design responsibility):** Fork `account-security.html` with Liquidity tokens; carry over the alerts banner pattern (when shipped on Consumer in [§3.1 → priority 7](#priority-7--security--audit-logging-p3-medium)).

### 3.3 App 3.1 — UNERA Admin (operator side of Consumer) — top priorities ranked

> **Where it stands.** Greenfield — zero pages, no folder. Boss marks Authentication as P1 Top; everything else is P4 Low. The single biggest deliverable is the shared operator entry door + role‑specific dashboard.

#### Priority 0 (structural pre‑req) — Fork + folder
- **Steps:**
  1. Create `NewUnera/AdminPortal/` and sub‑folders `UneraAdmin/` + `StablecoinAdmin/`.
  2. Copy `brand-style-guide.html` → `AdminPortal/brand-style-guide.html`; add **Operator** tokens (`--app-chrome` warmer, `--page-wash` near‑white, `--surface-table-row`, `--surface-action-strip`, `--surface-critical`) per [3‑app plan §App 3 fork](3-app_ia_restructure_a6857b33.plan.md).

#### Priority 1 — Authentication Service (P1 Top)
- **What's next (design responsibility):**
  - **`AdminPortal/operator-login.html` (NEW, shared with 3.2)** — derive from [`login_2.html`](../NewUnera/login_2.html). **Strip** social login, magic‑link, "Sign up" link. **Keep** email + password, 2FA challenge, "Forgot password" (admin‑routed reset).
  - **`AdminPortal/UneraAdmin/operator-dashboard.html` (NEW)** — KPI hero with `--font-stat-size`: active HCs / pending KYC / locked accounts. Quick actions row: Create HC, Review KYC queue. Recent activity table for the operator's role (HC edits, KYC decisions). Operator fork chrome + role badge in header.

#### Priority 2 — HC Management (P4 Low)
- **What's next (design responsibility):**
  - **`AdminPortal/UneraAdmin/operator-hc-management.html` (NEW)** — drawer pattern; image upload card with drag/drop, crop, replace via `.btn-secondary`; activate/deactivate destructive confirm modal.
  - **Pattern to copy:** [`account-settings.html`](../NewUnera/account-settings.html) form chrome; [`.cursor/rules/side-sheet-z-index.mdc`](../.cursor/rules/side-sheet-z-index.mdc) for the drawer.

#### Priority 3 — Account Management (P4 Low)
- **What's next (design responsibility):**
  - **`AdminPortal/operator-accounts.html` (NEW, shared with 3.2)** — paginated user table: email, KYC status, account status (Active / Locked), last login, role. Filters: search by email/ID, KYC status, account status. Row action → side drawer with Lock/Unlock toggle + Force reset password button (mocks "Send reset email"). Destructive confirm modal with focus trap, Escape, `--surface-critical` accent.
  - **Rules:** [`.cursor/rules/table-no-scrollbar.mdc`](../.cursor/rules/table-no-scrollbar.mdc), [`.cursor/rules/side-sheet-z-index.mdc`](../.cursor/rules/side-sheet-z-index.mdc).

#### Priority 4 — KYC Management (P4 Low)
- **What's next (design responsibility):**
  - **`AdminPortal/operator-kyc.html` (NEW, shared with 3.2)** — list view (Pending / Verified / Rejected / Re‑verification queue). Detail page: read‑only KYC summary reusing [`kyc-verify.html`](../NewUnera/kyc-verify.html) document layout. Status dropdown: Pending / Verified / Rejected / Re‑verification required. Audit‑trail note field (mandatory on Rejected / Re‑verification required).

### 3.4 App 3.2 — UNERA Stablecoin Admin (operator side of Stablecoin) — top priorities ranked

> **Where it stands.** Greenfield — zero pages. Boss marks two operator features as **P2 High** (Issuance Dashboard + PoR Management) — these are the highest‑priority operator builds on the platform after the shared `operator-login.html`.

#### Priority 0 (structural pre‑req) — Same as 3.3
Same folder + Operator fork as [§3.3 → Priority 0](#priority-0-structural-pre-req--fork--folder). The fork is shared across 3.1 and 3.2.

#### Priority 1 — Authentication Service (P1 Top)
- **What's next (design responsibility):**
  - Use the **same `AdminPortal/operator-login.html`** as 3.1 (shared).
  - **`AdminPortal/StablecoinAdmin/operator-dashboard.html` (NEW)** — KPI hero with `--font-stat-size`: circulating supply / backing ratio / pending mints / pending KYC. Quick actions row: New mint, Publish PoR snapshot, Review KYC queue. Recent activity table (mint events, KYC decisions, PoR snapshots).

#### Priority 2 — Stablecoin Issuance Dashboard (P2 High)
- **What's next (design responsibility):**
  - **`AdminPortal/StablecoinAdmin/operator-issuance.html` (NEW)** — three sections:
    - **Mint form:** amount, target chain, recipient address (validated), reference note, dual‑approval checkbox if 4‑eyes is on. Primary CTA "**Submit mint**" in `--brand-deep-blue`.
    - **Minting audit log table:** date, operator, amount, chain, tx hash (monospace truncate + copy), status. Filters: date range, status, operator. Apply [`.cursor/rules/table-no-scrollbar.mdc`](../.cursor/rules/table-no-scrollbar.mdc).
    - **Supply overview KPI strip:** Total minted to date, Burned, Circulating; gauge or sparkline for trend (reuse PoR gauge pattern). Use `--font-stat-size` from forked guide.

#### Priority 3 — Proof of Reserve (PoR) Management (P2 High)
- **What's next (design responsibility):**
  - **`AdminPortal/StablecoinAdmin/operator-por.html` (NEW)** — three sections:
    - **PoR recording surface:** asset class breakdown form (Cash, T‑bills, etc.) with custodian + jurisdiction + maturity bucket fields; "**Publish snapshot**" CTA in `--brand-yellow` per the operator dashboard exception in [`.cursor/rules/new-brand-output.mdc`](../.cursor/rules/new-brand-output.mdc).
    - **Backing ratio panel:** reuse the public PoR gauge component from [`proof-of-reserve-public.html`](../NewUnera/proof-of-reserve-public.html); show current ratio + delta vs last snapshot.
    - **Chain‑list table:** address, chain, status, supported features (mint/burn/transfer), last verified at. Add/edit/delete via drawer using [`.cursor/rules/side-sheet-z-index.mdc`](../.cursor/rules/side-sheet-z-index.mdc) + [`account-settings.html`](../NewUnera/account-settings.html) form chrome.

#### Priority 4 — Account Management (P4 Low)
Same `AdminPortal/operator-accounts.html` as 3.1, configured for the Stablecoin Admin role. Reuse — no new file.

#### Priority 5 — KYC Management (P4 Low)
Same `AdminPortal/operator-kyc.html` as 3.1, configured for the Stablecoin Admin role. Reuse — no new file.

---

## 4. Recommended sprint sequence (cross‑app)

Strictly ranked by boss's `Priority` band first, then by dependency (structural forks before content). Build top to bottom; do not start a band until the prior band has at least design‑complete coverage.

### Week 1 — Unblock everything

1. **Structural forks (one afternoon).** Create `NewUnera/StablecoinApp/` + `NewUnera/AdminPortal/` and their `brand-style-guide.html` Liquidity / Operator forks. Tokens only — no other content yet.
2. **Consumer P1 Top: wallet‑login UI gap.** `login_2.html` method picker + "Connect a wallet" sign‑in branch. Closes the only Consumer P1 Top with an open UI gap.
3. **Operator entry door (P1 Top × both 3.1 + 3.2).** `AdminPortal/operator-login.html` (shared, email + 2FA only) + role‑specific `operator-dashboard.html` shells in `UneraAdmin/` and `StablecoinAdmin/`.

### Week 2 — Stablecoin core (P2 High)

4. **Migrate Stablecoin pages** into `StablecoinApp/` with Liquidity tokens.
5. **`StablecoinApp/dashboard.html`** + preflight policy card on `get-unera-cad.html`.
6. **Receipt 4‑step status tracker** on `purchase-receipt.html` (row 62).
7. **PoR `proof-of-reserve-public.html`** — "Your wallet" panel (row 67) + circulation chart (row 69).
8. **`AdminPortal/StablecoinAdmin/operator-issuance.html`** + **`operator-por.html`** — minting + PoR management.

### Week 3 — Trust + transparency (P3 Medium)

9. **Consumer notifications cross‑link** (row 17) + **alerts banner on `account-security.html`** (row 20).
10. **Stablecoin notifications + audit fork** — port the same patterns into `StablecoinApp/`.

### Week 4 — Community + admin tools (P4 Low)

11. **Consumer Donate flow + history** — `donate.html` + `donation-history.html` (closes the live 404).
12. **Consumer HC Detail donation chart** (row 26).
13. **Operator HC management + accounts + KYC** — `operator-hc-management.html`, `operator-accounts.html`, `operator-kyc.html`.

### Backlog (boss did not flag)

- Standalone deep‑link wallet shells: `connect-metamask.html`, `connect-walletconnect.html` (rows 31, 32).
- Resolve the `wallet-enhanced_2.html` duplicate (delete or merge).
- Decide fate of `add-money.html` (likely consolidate into `get-unera-cad.html`).
- `governance.html`, `stake.html`, `exchange.html` are out of MVP per boss's table.

---

## 5. Quality bar — non‑negotiables for everything above

Every page or in‑page edit listed in this plan must pass these gates before review.

### 5.1 Brand (V2)

- Tokens only — never hardcode hex values that have a token. See [`.cursor/rules/new-brand-output.mdc`](../.cursor/rules/new-brand-output.mdc).
- TestFoundersGrotesk only (Latin: 10 OTF files). No Space Grotesk imports.
- **No CSS gradients on product HTML** under `NewUnera/` (only `brand-style-guide.html` may show gradient specimens).
- **Logo:** Use `NewLogo/Unera White Text Nav.svg` in app nav; `NewLogo/Unera White Text.svg` for full wordmark on dark; `NewLogo/Unera Black Text Nav.svg` / `Unera Black Text.svg` on light.

### 5.2 Accessibility (WCAG 2.2 AA)

Per [`.cursor/rules/newunera-accessibility-wcag.mdc`](../.cursor/rules/newunera-accessibility-wcag.mdc):

- Skip link first in DOM → `#main-content`.
- `prefers-reduced-motion` block on every page.
- `outline: 2px solid var(--brand-deep-blue); outline-offset: 2px` focus on all interactive elements.
- ARIA on every interactive component (`role`, `aria-label`, `aria-expanded`, `aria-current`).
- Touch targets ≥ 44–46px for primary actions.
- Charts/gauges paired with `aria-label` / `role="img"` plus visible numerics (PoR gauge, circulation chart, donation chart).
- `font-size: 1rem` minimum on inputs at mobile to prevent iOS zoom.

### 5.3 Responsive

- `≤768px`: nav collapses to hamburger; single‑column KPIs.
- `≤480px`: single‑column everything; larger tap targets.
- Grids: `repeat(auto-fit, minmax(min(280px, 100%), 1fr))` with `gap: 1.5rem`; collapse to `1fr` at 768px.

### 5.4 Component reuse — copy, don't reinvent

| Need | Canonical source |
|---|---|
| App shell, sticky nav, KPI grid | [`dashboard-enhanced.html`](../NewUnera/dashboard-enhanced.html) |
| Multi‑step flow, stepper, quote/review banners, processing chips | [`get-unera-cad.html`](../NewUnera/get-unera-cad.html), [`redeem-unera-cad.html`](../NewUnera/redeem-unera-cad.html) |
| Transparency hero (gauge, LIVE badge, stat cards) | [`proof-of-reserve-public.html`](../NewUnera/proof-of-reserve-public.html) |
| Dense tables + hidden horizontal scrollbar | [`.cursor/rules/table-no-scrollbar.mdc`](../.cursor/rules/table-no-scrollbar.mdc) + [`mint-history.html`](../NewUnera/mint-history.html) |
| Drawer / overlay z‑index | [`.cursor/rules/side-sheet-z-index.mdc`](../.cursor/rules/side-sheet-z-index.mdc) |
| Form chrome (operator HC, account settings) | [`account-settings.html`](../NewUnera/account-settings.html) |
| Success hero (donate, mint, PoR publish) | [`.cursor/rules/newunera-success-screen-hero.mdc`](../.cursor/rules/newunera-success-screen-hero.mdc) |
| Inline review callouts | [`.cursor/rules/newunera-review-callout-icons.mdc`](../.cursor/rules/newunera-review-callout-icons.mdc), [`.cursor/rules/newunera-inline-icon-lead.mdc`](../.cursor/rules/newunera-inline-icon-lead.mdc) |
| Checkmark icon (steppers, success, processing) | [`.cursor/rules/newunera-checkmark-icon.mdc`](../.cursor/rules/newunera-checkmark-icon.mdc) |
| Icons — Material Symbols Outlined inline SVG | [`.cursor/rules/newunera-icons.mdc`](../.cursor/rules/newunera-icons.mdc) |

---

## 6. References

- **Boss's planning table (canonical priorities):** [`Roadmap/Feature Tracking.html`](Feature%20Tracking.html) — Confluence database export, May 10, 2026.
- **Sub‑feature → live URL tracker:** [`Roadmap/FeatureTrackingMay09.md`](FeatureTrackingMay09.md).
- **3‑app IA restructure (folder + fork strategy):** [`Roadmap/3-app_ia_restructure_a6857b33.plan.md`](3-app_ia_restructure_a6857b33.plan.md).
- **Implementation audit (Done / Partial / Missing):** [`markdown/DesignAuditMay09.md`](../markdown/DesignAuditMay09.md) (referenced by FeatureTrackingMay09).
- **PRD:** [`Roadmap/roadmap_May09.md`](roadmap_May09.md).
- **Brand guidelines (V2):** `Brand Guide/UNERA_BRAND_GUIDELINES_V2.pdf` (March 2026); CSS source of truth [`NewUnera/brand-style-guide.html`](../NewUnera/brand-style-guide.html).
- **Workspace rules used in this plan:** [`new-brand-output`](../.cursor/rules/new-brand-output.mdc), [`newunera-icons`](../.cursor/rules/newunera-icons.mdc), [`newunera-accessibility-wcag`](../.cursor/rules/newunera-accessibility-wcag.mdc), [`newunera-checkmark-icon`](../.cursor/rules/newunera-checkmark-icon.mdc), [`newunera-success-screen-hero`](../.cursor/rules/newunera-success-screen-hero.mdc), [`newunera-review-callout-icons`](../.cursor/rules/newunera-review-callout-icons.mdc), [`newunera-inline-icon-lead`](../.cursor/rules/newunera-inline-icon-lead.mdc), [`table-no-scrollbar`](../.cursor/rules/table-no-scrollbar.mdc), [`side-sheet-z-index`](../.cursor/rules/side-sheet-z-index.mdc), [`wallet-action-pages`](../.cursor/rules/wallet-action-pages.mdc), [`design-only-scope`](../.cursor/rules/design-only-scope.mdc), [`design-request-quality`](../.cursor/rules/design-request-quality.mdc).

---

*Prepared by the Product Design function on May 10, 2026, against the boss's [Feature Tracking](Feature%20Tracking.html) table and the live `NewUnera/` build at audit time. Status calls (Done / Partial / Missing) cite live files in this repository. BE / QA / Engineering tracking belongs in their own tooling per [`design-only-scope`](../.cursor/rules/design-only-scope.mdc).*
