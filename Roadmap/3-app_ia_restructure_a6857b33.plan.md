---
name: 3-App IA Restructure
overview: "Single canonical plan: split UNERA into 3 apps (Stablecoin, Governance, Consumer) plus market-aligned UX (transparency hubs, DAO/governor patterns), WCAG/responsive discipline, explicit NewUnera component reuse, and forked UNERA V2 token schemes via per-app brand-style-guide.html copies. Includes desk-researched benchmarks (Apr 2026 pulse: Circle/Paxos-class transparency + AICPA/GENIUS framing refs, Optimism Agora archive density, Fed stablecoin stability note, delegated-voting UX literature, neobank trust/recovery trends), per-page improvement tables + **flow-synthesized per-page backlogs**, **numbered expanded flow specs** (C/S/G), eight canonical journeys per app, cross-app handoff notes, trim/migration, IA, page specs, enrichment, and discovery questions."
todos:
  - id: trim-consumer-app
    content: "App 3: Update dashboard-enhanced.html and wallet-enhanced.html (remove CAD quick actions; add cross-app tiles/link); governance.html → Governance App; entity switcher in nav per enriched specs"
    status: pending
  - id: stablecoin-folder
    content: "App 1: Create NewUnera/StablecoinApp/, migrate 5 pages (get/redeem CAD, mint/swap history, proof-of-reserve), Liquidity fork tokens + nav shells"
    status: pending
  - id: fork-stablecoin-brand-guide
    content: Fork NewUnera/brand-style-guide.html → StablecoinApp/brand-style-guide.html (Liquidity token fork only)
    status: pending
  - id: stablecoin-dashboard
    content: "App 1: Build StablecoinApp/dashboard.html — KPI hero, composition strip + donut, quick actions, recent activity, trust row (per enrichment)"
    status: pending
  - id: stablecoin-reserve-upgrade
    content: "App 1: proof-of-reserve.html — merged PoR-public patterns + donut, breakdown table, supply chart/SR fallback, attestations cross-link"
    status: pending
  - id: stablecoin-attestations
    content: "App 1: attestations.html — archive table, schedule card, dl compliance, reading guide"
    status: pending
  - id: governance-folder
    content: "App 2: NewUnera/GovernanceApp/, shared nav, Protocol fork tokens, pages per plan + enrichment"
    status: pending
  - id: fork-governance-brand-guide
    content: Fork NewUnera/brand-style-guide.html → GovernanceApp/brand-style-guide.html (Protocol token fork only)
    status: pending
  - id: governance-home-proposals
    content: "App 2: index.html + proposals.html with tab a11y, CTAs, modals for inline voting, textual vote %"
    status: pending
  - id: governance-proposal-detail
    content: "App 2: proposal-detail.html — lifecycle stepper, sticky/disclosure voting aside, summaries, decoded actions, voters table"
    status: pending
  - id: governance-delegates
    content: "App 2: delegates.html + delegate-profile.html — search, chips, banners, profile CTA variants"
    status: pending
  - id: governance-my-voting
    content: "App 2: my-voting.html — power breakdown, delegation, outstanding votes priority"
    status: pending
  - id: a11y-pass-3apps
    content: "Accessibility pass: axe/Lighthouse + keyboard on one representative page per app"
    status: pending
isProject: false
---

# UNERA — Split Into 3 Apps

This file is the **only** plan you need to build against. It merges the original IA restructure with market-aligned UX, implementation detail (components, forks, a11y), without removing prior scope.

## The Big Picture

Right now, everything lives in one app. The boss wants it split into 3 separate apps, each owned by a different entity. Here's the split:

```
Current single UNERA App
         │
    ┌────┴────────────────────────────────────┐──────────────────────────────────────┐
    ↓                                         ↓                                      ↓
App 1: Stablecoin App               App 2: Governance App             App 3: UNERA Consumer App
Mint · Redeem · Reserve             Proposals · Voting                Dashboard · Wallet · Send
                                                                       Exchange · Centres · Account
```

Each app gets its own folder:

- `NewUnera/StablecoinApp/` — new folder (to be created)
- `NewUnera/GovernanceApp/` — new folder (to be created)
- `NewUnera/` — the existing folder, trimmed down to just the consumer app

---

## Where to Start: Build Order

1. **App 3 (Consumer App)** — quickest wins. Just trim existing pages and update the nav.
2. **App 1 (Stablecoin App)** — move 5 existing pages over, then build 2 new ones (plus forked brand guide).
3. **App 2 (Governance App)** — the most work. All 6 pages are brand new (plus forked brand guide).

---

## Cross-cutting — market patterns & UX benchmarks

Stakeholders compare stablecoin UX to **issuer transparency surfaces** (e.g. USDC transparency-style disclosures, Paxos monthly reserve reporting, issuer “how to read an attestation” explainers). Governance UX aligns with **Governor-style UIs** (Tally-like proposal lifecycle, Compound/Aave-style archives), **Snapshot** for lightweight signaling (tabs, card lists), and **delegate discovery** (leaderboard + profile proofs).

| Pattern | Stablecoin/transparency analog | Governance analog | Design takeaway |
|---------|-------------------------------|-------------------|-----------------|
| **Trust choreography** | “Last updated,” data freshness, segregation / custodian narrative | Timeline from draft → queue → exec | Always show **provenance + time** next to KPIs |
| **Progressive disclosure** | Summary hero → breakdown table → downloadable attestations | Card summary → detail + decoded actions | **Summary first**, expert detail on drill-down |
| **Plain language** | “Redeemable,” “backing ratio,” “point-in-time attestation” | “What happens on-chain,” quorum | Dedicated **explainers** (`section-content` prose style — copy from workspace `NewUnera/proof-of-reserve-public.html`) |
| **Operational honesty** | Attestation ≠ audit; related-party disclosures | Passed ≠ executed (timelock) | Risk/caveat callouts using caution surfaces — workspace `.cursor/rules/newunera-color-system.mdc` |

---

## Cross-cutting — market color research (transparency hubs vs DAO governance)

This section aligns **two new apps** (Stablecoin / Governance) with **how comparable products choreograph color**, then pins differentiation to **`NewUnera/brand-style-guide.html`** and **`Brand Guide/UNERA_BRAND_GUIDELINES_V2.pdf`** — **only** canonical swatches (`--brand-deep-blue`, `--brand-yellow`, `--brand-cloud-blue`, `--brand-earth`, `--brand-light-blue`, `--brand-purple`, `--brand-red`, plus documented semantic tokens such as `--text-secondary`, `--fin-up`). No new hues off-palette.

### Stablecoin / reserve transparency analogs — what the market tends to do

| Product / pattern | Role of color | Implication for App 1 (Liquidity fork) |
|-------------------|---------------|----------------------------------------|
| **Circle / USDC** (transparency hub + evolved brand work) | **Blue** as primary anchor; **green** evokes cash/stability; **high-chroma accents** used sparingly for “security / authenticity” cues, not paragraph text ([Circle Transparency](https://www.circle.com/transparency); industry coverage of USDC identity, e.g. [LBBOnline — Circle × Mother Design](https://lbbonline.com/news/Mother-Design-Brand-Identity-Circles-USDC-Stablecoin)). | Stay on **deep blue** chrome; express “health / backed” numerics with **`--fin-up`** (`#1a7a5e` per guide), **not** `--brand-light-blue` for amount ink — matches institutional “green means sound” convention without contradicting UNERA semantics. |
| **Paxos-class** issuer surfaces ([Paxos](https://www.paxos.com/)) | Cool **teal–navy** chrome, lots of **white** content wells, restrained warmth — regulated infrastructure read. | Use **cooler chrome** via `color-mix` of **`--brand-deep-blue` + `--brand-light-blue`**; lighten page canvas with **`--brand-cloud-blue` → white** mixes so KPIs float like disclosure pages. |
| **Monthly attestation / PDF-first** habits (Paxos, USDC disclosure pages, AICPA-style readers) | **Sparse** palettes; strongest color on **download**, **freshness**, **status**. | Charts and breakdown bars: **`--brand-deep-blue`**, **`--brand-light-blue`**, **`--brand-earth`**, **`--brand-purple`** as **tinted mixes into white**; pair with labels (not hue-only — WCAG + table-no-scrollbar patterns). |

**Stablecoin takeaway:** Competitors converge on **cool trust + restrained accent + semantic green/red for condition**. UNERA Liquidity fork should **push aquamarine/clinical** (`--brand-cloud-blue` / `--brand-light-blue`) **harder than Consumer**, keep **`--brand-yellow`** exclusively on **dark nav** interactions (per `newunera-color-system.mdc` §4).

### DAO governance / voting analogs — what the market tends to do

| Product / pattern | Role of color | Implication for App 2 (Protocol fork) |
|-------------------|---------------|----------------------------------------|
| **Tally-like** explorers ([Tally](https://www.tally.xyz/)) | Neutral or dark **shell**; **badge / state** colors carry meaning (Active, Succeeded, Defeated); heavy **numeric** emphasis for quorum and VP. | **Chrome shift** (`--brand-deep-blue` **`color-mix` with `--brand-purple`**) signals “protocol” without rainbow feeds; proposal states map to **`--fin-up` / `--fin-down-bg`**, **`--warning`**, **`--brand-earth`** mixes — **always text-labeled**. |
| **Snapshot-style** hubs ([snapshot.org](https://snapshot.org/)) | Minimal surfaces; ecosystem trope of **purple** as “DAO / coordination” accent (cultural, not mandatory). | **Intensify `--brand-purple` in icon wells + optional page-wash whisper** — still **`#6a5770`** from the PDF/guide, never a novel violet hex. |
| **Compound-style archives** | Long lists, muted rows, **timeline** readability. | Table zebra / hover: existing **`--surface-*`** discipline; lifecycle stepper retains **deep blue active ring** (brand progression, not `--fin-up` — see color-system §7.3). |

**Governance takeaway:** Peers prioritize **state legibility + low decoration**. UNERA Protocol fork differentiates Consumer by **purple-in-chrome / purple-tint wells**, not by recoloring primary CTAs away from **`--brand-deep-blue`**.

### Brand constraint recap (both apps)

- **Source of truth for hex / roles:** `NewUnera/brand-style-guide.html` (`:root` + specimens) and **`Brand Guide/UNERA_BRAND_GUIDELINES_V2.pdf`** (March 2026 V2): Deep Blue `#173d47`, Yellow `#ffffab`, Cloud Blue `#ebfcf5`, Earth `#cec4b8`, Purple `#6a5770`, Light Blue `#90c2b8`, Red `#ab5770`.
- **Product HTML:** no **`linear-gradient` / radial / conic** in app pages (forked guides follow `new-brand-output.mdc`; marketing specimens may remain in the guide specimen pages only).
- **Warm pale surfaces:** never white/yellow text on `--gradient-warm` (yellow-tint mixes); **`--brand-deep-blue`** ink (see `newunera-accessibility-wcag.mdc`).

---

## Cross-cutting — design system forks (reuse brand guide structure)

Each new app ships its **own fork** of workspace `NewUnera/brand-style-guide.html`: **same layout, sections, fonts, icon rules**; only **`:root` token adjustments** (and specimen labels reflecting the fork). Keep `TestFoundersGrotesk` from workspace `Brand Guide/`, **no CSS gradients on product HTML** (guide may still document specimens), Material inline SVG discipline (`.cursor/rules/newunera-icons.mdc`), WCAG baseline (`.cursor/rules/newunera-accessibility-wcag.mdc`).

Forks below are **slightly different from the current Consumer app** while remaining **purely palette-internal** (`color-mix` weights and semantic surface names only).

### App 1 — Stablecoin App — “Liquidity” fork (reserve / treasury / attestation read)

**Positioning:** Cooler than Consumer — aligns with Paxos-like **regulated transparency** + Circle-like **blue anchor + restrained “health” green** semantics, expressed only through UNERA tokens.

**Canonical semantic tokens — keep unchanged (do not remap for app personality):**

- **`--brand-yellow`:** nav hover / active / focus on dark chrome **only**.
- **`--fin-up` / `--fin-down` / `--warning` / `--error`:** reserve backing deltas, supply health, attestations lifecycle — same hex semantics as Consumer (`brand-style-guide.html` Financial semantics block).
- **`--text-secondary` (`#3d6b78`):** body/meta on white and light washes; verify after changing `--page-wash`.

**Liquidity-specific aliases (document in forked guide + reuse on Stablecoin pages):**

| Token | Recommended value | UX role |
|-------|-------------------|---------|
| `--app-chrome` | `color-mix(in srgb, var(--brand-deep-blue) 93%, var(--brand-light-blue) 7%)` | Nav / shell — **cooler institutional** cast vs pure `--brand-deep-blue`; re-check **Yellow on `--app-chrome`** (focus ring, `.nav-link.active`) meets **non-text contrast** where applicable. |
| `--page-wash` | `color-mix(in srgb, var(--brand-cloud-blue) 62%, var(--brand-white))` | `body` background — brighter than default cloud-blue-heavy Consumer; evokes disclosure **paper + air**. |
| `--surface-trust` | `color-mix(in srgb, var(--brand-light-blue) 14%, color-mix(in srgb, var(--brand-cloud-blue) 38%, var(--brand-white)))` | PoR hero strips, verified reserve modules — **aquatic**, distinct from Consumer `--surface-impact`. |
| `--surface-attestation` | `color-mix(in srgb, var(--brand-earth) 10%, var(--brand-white))` | Archive / PDF / schedule cards — subtle **warm paper** cue (Earth from PDF), **deep-blue ink** for all text on this surface. |
| `--surface-deep-liquidity` | `color-mix(in srgb, var(--brand-deep-blue) 5%, var(--brand-white))` | Dense tables footer / trust row — slightly **deeper** than Consumer `--surface-deep` (4%); still **no grey hex**. |

**Data visualization:** donut / bar fills = mixes of **`--brand-deep-blue`**, **`--brand-light-blue`**, **`--brand-earth`**, **`--brand-purple`** into white at **different percentages** so segments are distinguishable **with legend text** — matches transparency-hub **limited chroma** practice.

### App 2 — Governance App — “Protocol” fork (votes / delegates / timelines)

**Positioning:** **Violet-shifted chrome** + **purple-tinted surfaces** versus Consumer — parallels common **DAO** UI convention (purple = protocol/coordination) **using existing `--brand-purple` only.**

**Canonical semantic tokens — keep unchanged:**

- **`--brand-yellow`:** dark **`--app-chrome`** accents only — **never** substitute purple for nav hover (preserves scanned UNERA nav behavior across all three apps).
- **Primary buttons:** **`--brand-deep-blue` fill**, white label — Governance does **not** switch primary CTA to purple (readability + brand lock from PDF).
- **`--fin-up` / `--fin-down`:** FOR/AGAINST outcome ribbons and “passed” KPIs stay on **financial semantic** colors where they encode **directional** outcome; timelines / stepper **active ring** stays **`--brand-deep-blue`** (brand progression ≠ P&L — `newunera-color-system.mdc` §7.3).

**Protocol-specific aliases:**

| Token | Recommended value | UX role |
|-------|-------------------|---------|
| `--app-chrome` | `color-mix(in srgb, var(--brand-deep-blue) 82%, var(--brand-purple) 18%)` | Nav / shell — visible **protocol** differentiation vs Consumer **without** abandoning Deep Blue (~Snapshot-adjacent **within** `#6a5770`). |
| `--page-wash` | `color-mix(in srgb, var(--brand-cloud-blue) 48%, color-mix(in srgb, var(--brand-purple) 5%, var(--brand-white)))` | Slight **violeted mist** vs Consumer plain cloud-blue page — subtle; validate `--text-secondary` contrast. |
| `--surface-proposal` | `color-mix(in srgb, var(--brand-purple) 8%, var(--brand-white))` | Proposal cards at rest — scannable lilac-grey **within** palette. |
| `--surface-discussion` | `color-mix(in srgb, var(--brand-cloud-blue) 24%, color-mix(in srgb, var(--brand-purple) 4%, var(--brand-white)))` | “Plain English” / forum summary wells — cooler than `--surface-proposal`. |
| `--icon-well-governance` | `color-mix(in srgb, var(--brand-purple) 18%, var(--brand-white))` *(up to 22% for delegate avatars)* | Icon containers per §6 icon differentiation — **higher purple than Consumer** KPI wells. |

**Proposal status badges (always label + optional icon):**

- **Active / voting open:** `--brand-deep-blue` or `--surface-discussion` border + **`--brand-deep-blue`** text; optional pill bg `--page-wash`.
- **Succeeded:** `--fin-up` on `--fin-up-bg`.
- **Defeated / failed:** `--fin-down` on `--fin-down-bg`.
- **Pending / queued:** **`--warning`** (`#b8a030`) on white or very light `--brand-earth` mix — never **only** hue.

### Compliance checks after implementing both forks

- **Yellow × dark chrome:** every nav/focus/active pair still passes **WCAG contrast** targets used today on Consumer (`--brand-yellow` on `--app-chrome`).
- **`--text-secondary` × `--page-wash`:** re-spot-check **every** forked `--page-wash` recipe (Liquidity brighter wash; Governance purple whisper).
- **Warm / yellow-tint surfaces:** copy remains **`--brand-deep-blue`** ink (no yellow/white glyphs on pale yellow mixes).
- **`--neutral-500`:** if mapped to **`--brand-light-blue`**, do **not** use for small meta text on white (existing project rule).

**Deliverables**

- `NewUnera/StablecoinApp/brand-style-guide.html` — fork + **Liquidity** tokens + market notes above in sidebar/specimens.
- `NewUnera/GovernanceApp/brand-style-guide.html` — fork + **Protocol** tokens + market notes above in sidebar/specimens.

---

## Cross-cutting — NewUnera component reuse map

Reuse **structures and CSS clusters** (design layer only):

| UI need | Canonical source (paths relative to project root `CLB/`) |
|---------|------------------------------------------------------------|
| App shell, sticky nav, hamburger breakpoint, KPI grid | `NewUnera/dashboard-enhanced.html` |
| Multi-step flow, stepper (deep blue progression), quote/review banners, processing chips | `NewUnera/get-unera-cad.html`, `NewUnera/redeem-unera-cad.html` |
| Transparency hero (ratio gauge, LIVE badge, last updated, stat cards), distribution bars | `NewUnera/proof-of-reserve-public.html` |
| Dense tables + hidden horizontal scrollbar | `.cursor/rules/table-no-scrollbar.mdc`; `mint-history.html` / `swap-history.html` / `wallet-enhanced.html` |
| Drawer / overlay z-index | `.cursor/rules/side-sheet-z-index.mdc`; `NewUnera/account-security.html` |
| Governance cross-link shell to repoint | `NewUnera/governance.html` |

**Icons:** per `newunera-icons.mdc` — e.g. **how_to_vote**, **gavel** or **assignment** for governance; **account_balance**, **verified**, **description** for reserves/attestations.

---

## Cross-cutting — accessibility, responsiveness, cognitive load

Applies to **all three apps**.

- **WCAG 2.2 AA** baseline: focus-visible; do **not** use `--neutral-500` mapped to `--brand-light-blue` for **small body text** on light surfaces; warm-surface pills → `--brand-deep-blue` ink; touch targets ≥ **44–46px** for primary actions where possible.
- **Skip link** first in DOM → `#main-content`; **`prefers-reduced-motion`**; logical **h1→h2→h3** per template.
- **Charts/gauges:** pair with **`aria-label`/`role="img"`** plus **visible numerics** (see PoR gauge pattern).
- **Inputs on mobile:** `font-size: 1rem` to avoid iOS zoom.
- **Responsive:** align with existing NewUnera breakpoints (`≤768` nav collapse, single-column KPIs; grids `repeat(auto-fit, minmax(min(280px, 100%), 1fr))`).
- **Governance sticky voting sidebar:** on narrow viewports, **stack voting block below proposal intro** before long body / transcript — avoid clipped `sticky` + obscured CTAs.
- **Cognitive load:** **`font-variant-numeric: tabular-nums`** in tables/KPI rows; explicit **CAD** on financial figures; governance countdowns: **relative + UTC** (`<time datetime>`).

---

## App 3: UNERA Consumer App

> This is the current app. It stays mostly the same — we just remove the stablecoin-specific parts and add links to the other two apps.

**Folder:** `NewUnera/` (existing)

### Pages that stay exactly as they are

- `dashboard-enhanced.html`, `wallet-enhanced.html`
- `add-money.html`, `send-enhanced.html`, `exchange.html`, `stake.html`
- `explore-centres.html`, `centre-detail.html`
- `account-settings.html`, `account-security.html`
- `notifications.html`, `purchase-receipt.html`
- All login/signup/auth pages

### Pages that need changes

- **`dashboard-enhanced.html`** — Remove the "Get UNERA CAD" and "Redeem UNERA CAD" buttons from the Quick Actions section. Replace with link cards that take the user to the Stablecoin App and Governance App instead.
- **`wallet-enhanced.html`** — Remove the "Get UNERA CAD" and "Redeem UNERA CAD" action buttons from the UNERA CAD section. Add a small "Manage in Stablecoin App →" link in their place.
- **`governance.html`** — Change this from a page that links to an external HUMA portal into a page that links to our new Governance App.
- **Navigation (all pages)** — Add a way for users to switch between the 3 apps. A simple "Switch App" dropdown in the nav bar is enough.

### Pages that move out (go to the Stablecoin App)

- `get-unera-cad.html` → `StablecoinApp/`
- `redeem-unera-cad.html` → `StablecoinApp/`
- `mint-history.html` → `StablecoinApp/`
- `swap-history.html` → `StablecoinApp/`
- `proof-of-reserve-public.html` → `StablecoinApp/` (implement as/upgraded alongside `proof-of-reserve.html` per App 1)

### Consumer app — enriched implementation detail

Implement the bullet changes above with these UX/a11y refinements:

1. **Entity switcher (nav)** — Use disclosure or `role="menu"` pattern: `aria-expanded`, keyboard support, visible label **“UNERA apps”**. Items: Consumer (current), Stablecoin, Governance — each row: **app name + one-line descriptor** (“Mint & reserves”, “Vote & delegates”). Prefer explicit labels over icon-only menus.
2. **Dashboard replacement tiles** — Reuse **`action-card`** / quick-link card pattern from dashboard so layout **density matches** removed mint/redeem (no visual hole). Icons with outbound cue (e.g. Material pattern consistent with repo rules); annotate for screen readers (**opens separate application** context in copy or sr-only).
3. **Wallet CAD row** — “Manage in Stablecoin App →”: **compact text link + chevron** consistent with transactional review links in redeem flow; **`aria-label`** includes full destination semantics.
4. **`governance.html`** — Beyond URL swap: add **short benefit bullets** (e.g. vote on-chain, delegate voting power); optional **FAQ accordion** with `aria-labelledby` / `aria-expanded` if copy grows.
5. **Deep links** — Optionally reserve query params (e.g. `?from=consumer`) on cross-app URLs for future analytics (static mocks OK).

---

## App 1: Stablecoin App

> This app is for the entity that issues and manages UNERA CAD. It covers minting new tokens, redeeming them, and showing the public and internal reserve data.

**Folder:** `NewUnera/StablecoinApp/`

Apply **Liquidity fork** semantic tokens site-wide (`:root` per page or shared stylesheet extracted from forked guide).

### Pages at a glance

| # | Page | File | New or Migrated | Priority |
|---|------|------|-----------------|----------|
| 1 | Stablecoin Dashboard | `dashboard.html` | New | Must have |
| 2 | Get UNERA CAD | `get-unera-cad.html` | Migrated | Must have |
| 3 | Redeem UNERA CAD | `redeem-unera-cad.html` | Migrated | Must have |
| 4 | Proof of Reserve | `proof-of-reserve.html` | Migrated + upgraded | Must have |
| 5 | Mint History | `mint-history.html` | Migrated | Nice to have |
| 6 | Swap History | `swap-history.html` | Migrated | Nice to have |
| 7 | Attestation Reports | `attestations.html` | New | Nice to have |

### Page details

#### 1. Stablecoin Dashboard (`dashboard.html`) — New page

**Goal: Give operators and visitors a single-glance view of the stablecoin's health and recent activity.**

- Big numbers at the top: Total UNERA CAD in circulation, Reserve Ratio %, and when data was last updated.
- Two quick-action buttons: Mint and Redeem.
- A small donut chart showing what the reserves are made of.
- A short feed of the last 5 mint or redeem events.
- Links to the Proof of Reserve and Attestation Reports pages.

**Enriched implementation — Stablecoin Dashboard**

- **Hero / status ribbon:** model on PoR **`live-badge` + `refresh-countdown`** (may be mocked).
- **KPI strip:** **`stats-grid` / `stat-card`** from `proof-of-reserve-public.html` / `dashboard-enhanced.html` — circulation, ratio, reserves, **last attestation date** if available.
- **Composition:** horizontal **`composition-summary`** stacked bar **in addition to** donut — segment labels + **% and $** in legend (**color-blind safe**, not hue-only).
- **Quick actions:** two **`btn-primary`** (Mint, Redeem); tertiary links to Proof of Reserve and Attestations.
- **Recent activity table:** **`table-wrap`** + hidden scrollbar per `table-no-scrollbar.mdc`; columns: type, amount, timestamp, tx link (truncated monospace); optional future copy-for-hash.
- **Trust row:** small cards (“Segregated custodians,” “Monthly attestation,” etc.) using **`surface-deep`**-style tints from color-system.
- **Rationale:** Transparency hubs lead with freshness, backing, composition.

#### 2. Get UNERA CAD (`get-unera-cad.html`) — Migrated from consumer app

**Goal: Walk the user through minting or acquiring UNERA CAD step by step.**

- Same multi-step flow as the current page. Only the navigation header changes to match the Stablecoin App shell.

**Enriched implementation**

- Correct **relative paths** for `NewLogo/` and shared assets under `StablecoinApp/`.
- Reuse stepper, rate panels, irreversible warns from canonical `NewUnera/get-unera-cad.html`; rules: `.cursor/rules/wallet-action-pages.mdc`, `.cursor/rules/newunera-review-callout-icons.mdc`.

#### 3. Redeem UNERA CAD (`redeem-unera-cad.html`) — Migrated from consumer app

**Goal: Walk the user through burning UNERA CAD and receiving funds back step by step.**

- Same multi-step flow as the current page. Only the navigation header changes.

**Enriched implementation**

- Same nav/path rules as §2; full parity with `NewUnera/redeem-unera-cad.html` flows and banners.

#### 4. Proof of Reserve (`proof-of-reserve.html`) — Migrated and upgraded

**Goal: Show anyone — publicly — that every UNERA CAD in circulation is fully backed by real assets.**

- Big numbers: total supply, backing ratio, last updated timestamp.
- A "Fully Backed" trust badge.
- A donut chart of what assets back the reserves (cash, T-bills, etc.) with a table below it showing the breakdown by asset, dollar amount, and custodian.
- A 30-day supply chart to show the trend over time.
- A link to the Attestation Reports page.

**Enriched implementation**

- Merge **`proof-of-reserve-public.html`** patterns (**hero**, **gauge**, **stats-grid**, **distribution-bar** stack) with the upgraded donut + breakdown + chart above.
- **Explainer sections:** plain-language blocks for “backing ratio formula,” “point-in-time attestation” vs audit — reuse `.section` / `.section-content` rhythm from PoR-public.
- **Breakdown table columns (target):** Asset class | Amount | % of reserves | Custodian | Jurisdiction | Maturity bucket — allow **N/A** until data exists.
- **Supply chart:** if graphical-only for v1, add **accessible alternative** — data table disclosure or visually hidden paired table for SR.
- **CTA hierarchy:** “Verify on blockchain” + prominent **secondary** cross-link to `attestations.html`.

#### 5. Mint History (`mint-history.html`) — Migrated

**Goal: Let operators and auditors see a full log of every minting event.**

- Same table as the current page. Only the nav shell changes.

**Enriched implementation**

- **Table-wrap** + hidden scrollbar; **column priority** for small screens — start with horizontal scroll; optional future **card list** at `≤480px`.
- **Filter bar** (status, date range): reuse labeled controls from `account-settings.html` / wallet patterns — every input has **`label`** or **`aria-label`**.

#### 6. Swap History (`swap-history.html`) — Migrated

**Goal: Let operators and auditors see a full log of every swap event.**

- Same table as the current page. Only the nav shell changes.

**Enriched implementation**

- Same table/a11y guidance as Mint History.

#### 7. Attestation Reports (`attestations.html`) — New page

**Goal: Make it easy for anyone to find and download official third-party attestations proving the reserves are real.**

- A table of all attestation reports (date, period covered, auditor name, status, PDF download link).
- A card explaining the attestation schedule (how often, which standard, which firm).
- A section on regulatory compliance and licenses.

**Enriched implementation**

- **Archive table:** period end; **report type** (attestation vs examination); firm; **status** pills — `--fin-up` semantics for “Current,” `--warning` for “Superseded”; PDF links open new tab (`target`, `rel`) + plain-language warning in copy.
- **Schedule card:** cadence; standard naming (placeholder: AICPA-style criteria refs); **next expected** date field.
- **Compliance:** jurisdictions/licenses as `<dl>` (definition list) for accessible scanning.
- **Reading guide:** collapsible “How to read this report” (market-aligned explainer tone).

### Questions to answer before building the full Stablecoin App

These need answers to design the right experience. They don't block the minimal version but will shape the complete product.

**About the users**

- Who uses this app? Is it only the internal team/operator, or can any UNERA CAD holder mint and redeem here?
- Are there different user roles (e.g. viewer, approver, admin)?

**About the stablecoin itself**

- Is UNERA CAD backed by cash/T-bills, crypto collateral, or an algorithm? (This changes what the Reserve page shows.)
- What are the reserve custodians? Can they be named publicly?
- What is the minimum and maximum amount a user can mint or redeem?

**About compliance and operations**

- Is minting open to anyone, or gated behind KYC or a whitelist?
- Does the app need its own KYC flow, or does it reuse the consumer app's verification?
- Do large mints need multiple people to approve (a 4-eyes or multi-sig workflow)?
- What payment rails does redemption support? (bank wire, SEPA, Interac, etc.)
- What is the expected timeline for each phase of a mint or redeem? (e.g. on-chain in 2 minutes, bank settlement in 2 days)

**About transparency**

- Is the reserve ratio shown to the public, or only to logged-in operators?
- What is the planned attestation schedule? Which audit firm?
- Does the app need an API key management section for institutional users?

---

## App 2: Governance App

> This app is for the entity that governs the UNERA protocol. It lets token holders see proposals, vote, and delegate their voting power to others.

**Folder:** `NewUnera/GovernanceApp/`

Apply **Protocol fork** tokens consistently.

### Pages at a glance

| # | Page | File | New or Migrated | Priority |
|---|------|------|-----------------|----------|
| 1 | Governance Home | `index.html` | New | Must have |
| 2 | Proposal List | `proposals.html` | New | Must have |
| 3 | Proposal Detail + Vote | `proposal-detail.html` | New | Must have |
| 4 | Delegate Directory | `delegates.html` | New | Nice to have |
| 5 | Delegate Profile | `delegate-profile.html` | New | Nice to have |
| 6 | My Voting Power | `my-voting.html` | New | Nice to have |

### Page details

#### 1. Governance Home (`index.html`) — New page

**Goal: Give any visitor a quick sense of what governance is active right now and how the protocol makes decisions.**

- Four big stats at the top: Total Proposals ever, Unique Voters, Active Proposals right now, Total Votes Cast.
- Up to 3 active proposal cards with live vote counts and a countdown to when voting closes.
- A "Recent Decisions" section showing the last 3 proposals that passed or failed.
- A small widget showing the rules of governance (how many tokens to propose, quorum needed, how long voting lasts, timelock delay before execution).
- Links to the Stablecoin App and Consumer App for cross-app navigation.

**Enriched implementation**

- **Primary CTA row** under hero/stats: “Browse proposals” / “My voting power” — button hierarchy consistent with dashboard primary/secondary semantics.
- **Active cards:** **`time-to-close`** with `<time datetime>`; **quorum microcopy**; FOR/AGAINST bars with adjacent **numeric %** — never rely on color alone.
- **Parameters widget:** implement as `<dl>` or compact table + in-page anchor “Learn how governance works”.

#### 2. Proposal List (`proposals.html`) — New page

**Goal: Let users browse all proposals and quickly spot which ones need their vote.**

- Tabs at the top: Active (default) / Pending / Passed / Defeated / All.
- Each proposal shown as a card with: proposal number, color-coded status badge, title, who proposed it, deadline or result date, a FOR/AGAINST progress bar, and quorum progress.
- Filters: by status, date, or proposer.
- For simple Yes/No proposals, the user can vote directly from this list without opening the detail page.

**Enriched implementation**

- Tabs: **`role="tablist"`**, `aria-selected`, full keyboard traversal; default tab **Active**.
- Cards: status **badge includes text label** always; optional ENS + copy-safe address truncation for proposer.
- **Inline voting:** only for strictly binary proposals; gate with **confirm modal** (`z-index` per `side-sheet-z-index.mdc`, focus trap, Escape) — reduces mis-votes on touch.
- **Filters:** labeled `<select>` or combobox; **no placeholder-only** unlabeled controls.

#### 3. Proposal Detail + Vote (`proposal-detail.html`) — New page

**Goal: Give users everything they need to understand a proposal and cast an informed vote.**

- A timeline at the top showing the proposal's journey: Proposed → Voting Open → Passed/Failed → Queued → Executed. The current step is highlighted.
- A sticky sidebar (always visible as you scroll): FOR / AGAINST / ABSTAIN vote bars with token counts and percentages, quorum progress bar, the user's voting power for this specific proposal, and the voting buttons.
- The main body: full proposal description, a link to the community forum discussion, and a plain-English translation of what the proposal will actually do on-chain (not raw code).
- At the bottom: a table of everyone who has voted, with their choice, voting power, and optional comment.

**Enriched implementation**

- **Lifecycle UI:** reuse get/redeem **stepper visual language** (deep blue active ring) — icons e.g. `edit_note`, `how_to_vote`, `task_alt`, `bolt` (execution) per `newunera-icons.mdc`.
- **Voting aside:** sticky desktop; **`details`/`disclosure`** “Voting” section **first on mobile stack** below header area.
- **Body:** prose + highlighted **Plain English summary** card (`surface-warm` or `surface-sky` tints).
- **Decoded actions:** accordion per action; `<pre>` mock calldata + **copy** control with `aria-label`.
- **Voters table:** horizontal scroll wrapper + scrollbar hidden per project tables rule; optional sortable `<th>` with `aria-sort` when JS adds sorting.

#### 4. Delegate Directory (`delegates.html`) — New page

**Goal: Help token holders find and choose a trusted delegate to vote on their behalf.**

- A searchable grid/list of all delegates.
- Each delegate card shows: name or wallet address, total voting power delegated to them, how many people delegate to them, participation rate (% of proposals voted on), and their last few vote choices shown as colored chips.
- Filters: by participation rate, stakeholder type (team, independent, fund), whether they have a written statement.
- Sort by: voting power, participation rate, or recent activity.
- If the user's wallet is connected but they haven't delegated yet, show a banner at the top prompting them to act.

**Enriched implementation**

- **Search:** explicit `<label>` for query field.
- **Filter chips:** `button` toggles with `aria-pressed`.
- Cards: participation % + **relative “last voted”**; stance chips combine **hue + label text**.
- **Banner:** undelegated wallets — unless truly time-critical, prefer **`surface-sky`**/`surface-action` tint over warning yellow; reserve **`--surface-warning-soft`** for expiring deadlines.

#### 5. Delegate Profile (`delegate-profile.html`) — New page

**Goal: Let users evaluate a specific delegate before trusting them with their votes.**

- Header: photo/avatar, name, total voting power, number of delegators, participation rate.
- Their full governance statement — why they vote the way they do.
- A table of every proposal they have voted on, with their choice and the voting power they used.
- A "Delegate to this person" button.

**Enriched implementation**

- **Header layout** aligns with **`account-settings.html`** profile/header rhythm (avatar, meta stack).
- **Statement:** constrained reading measure for long text.
- **History table:** choice column uses **icon + visible text**.
- **CTA:** primary **Delegate**; if user already delegated elsewhere, secondary copy **Switch delegation to …**.

#### 6. My Voting Power (`my-voting.html`) — New page

**Goal: Give users a personal command center for their governance participation — see their power, manage delegation, and track their vote history.**

- Current voting power broken down into: tokens they hold directly + tokens others have delegated to them.
- Their delegation status (who they're delegated to, or "not delegated") with a button to delegate or change delegation.
- A "Delegate to myself" shortcut for users who want to vote with their own tokens.
- A table of every proposal they've voted on, with outcome.
- A list of upcoming or active proposals they haven't voted on yet.

**Enriched implementation**

- **Breakdown:** two **impact/stat cards** (“Direct,” “Received delegation”) from dashboard KPI patterns.
- **Delegation strip:** prominent status + **inline** change actions; **Delegate to myself** stays **secondary** emphasis (visible, not nested deep).
- **Outstanding votes:** list **above** historical votes table — addresses missed-vote churn common in DAO UX.

### Questions to answer before building the full Governance App

**About the governance token and mechanism**

- What is the governance token — HUMA, a UNERA-specific token, or something else?
- Is this on-chain governance (a smart contract like Governor Bravo), off-chain signaling (like Snapshot), or a mix of both?
- What blockchain is the governance contract on?

**About who can participate**

- Who can create a proposal? Any token holder above a threshold, a designated council, or a whitelist?
- What is the minimum number of tokens needed to submit a proposal?
- Who can vote — just token holders, or also anyone with delegated voting power?

**About voting rules**

- How is voting power calculated — by token balance, quadratic, or 1-person-1-vote?
- Is delegation supported? Can someone split their voting power across multiple delegates?
- Is voting free (gasless via a relay), or does the voter pay gas?
- What quorum is required for a proposal to be valid?
- What percentage of votes must be FOR for a proposal to pass?
- Is there a waiting period (timelock) before an approved proposal is executed? How long?

**About the scope of governance**

- What kinds of decisions go through governance? (e.g. reserve policy, fee changes, adding new Humanity Centres, upgrading smart contracts)
- Are there different proposal types with different rules or UIs?
- Is there an emergency fast-track process for urgent changes (a council or multisig)?
- Are there multiple governance bodies, or is it a single DAO?

**About the user experience**

- Is this app publicly viewable without logging in, with wallet-connect only needed for voting?
- Is there an existing community forum (like Discourse or Commonwealth) to link to from proposal pages?
- What does the token distribution look like — a few large holders, or widely distributed? (This shapes how to display voting power numbers.)
- What is the expected audience — crypto-native DeFi users, or mainstream users who may not be familiar with governance concepts?

---

## Competitive research — benchmark products & improvement backlog (2025–2026)

**Method:** Desk research against category leaders and regulatory-norm surfaces. **Not** feature parity checklists — patterns that reduce cognitive load, strengthen trust choreography, and align with UNERA V2 (NewUnera tokens, WCAG, no backend scope in this workspace).

**Comparable clusters**

| App | Primary analogs (public UX) | What they optimize for |
|-----|----------------------------|-------------------------|
| **App 3 Consumer** | Revolut-style neobank send/top-up flows; Coinbase / embedded-wallet “home + quick actions”; permissionless-neobank narratives (store / spend / grow) | Two-click money movement, biometric-friendly habits, dense-but-scannable activity |
| **App 1 Stablecoin** | [Circle — Transparency & Stability](https://www.circle.com/transparency), [Circle — USDC product/reports](https://www.circle.com/usdc); Paxos/regulated issuer tone; GENIUS / AICPA-style disclosure framing (industry summaries, e.g. [Forvis Mazars — stablecoin attestations](https://www.forvismazars.us/forsights/2025/11/stablecoin-reserve-attestations-key-considerations-for-compliance)) | Freshness + circulation vs reserves, attestations archive, flows/mint-redemption horizons, segregation narrative |
| **App 2 Governance** | [Tally](https://www.tally.xyz/) + [Tally docs — voting](https://docs.tally.xyz/how-to-use-tally/voting-on-proposals); [Snapshot](https://snapshot.org/); [Optimism Agora](https://vote.optimism.io/) (delegate + proposal archive density); Compound Governor / Aave-style lifecycle forums; gasless voting discussions (e.g. Uniswap + Tally) | Proposal lifecycle legibility, delegate analytics, abstain + optional vote rationale, quorum clarity |

**Supplementary research pulse (desk, 2025–2026)** — use for **copy/stub patterns** only; legal/compliance text is product-owned.

- **Stablecoin reporting framing:** [AICPA — Stablecoin Reporting Criteria (2025)](https://www.aicpa-cima.com/resources/download/stablecoin-reporting-criteria) encodes disclosure discipline around **redeemable tokens outstanding**, **redemption assets available**, and **reconciliation / comparison** — mirror as **plain-language labels** in PoR + attestations reading guide (not legal claims).
- **Regulatory context (industry commentary):** monthly independent examination norms and reserve disclosure expectations are widely summarized alongside **GENIUS Act** timing (e.g. [Forvis Mazars — stablecoin reserve attestations](https://www.forvismazars.us/forsights/2025/11/stablecoin-reserve-attestations-key-considerations-for-compliance)); use to justify **“next report”** and **report lag** microcopy on `attestations.html` / dashboard freshness.
- **Market transparency mechanics:** discussion of **on-chain proof-of-reserve / oracle-verified** reserve signals appears in industry stablecoin notes (e.g. academic/industry papers citing Chainlink-class PoR); UNERA can reserve a **tertiary “Verification methods”** footnote on `proof-of-reserve.html` (stub link) without promising a specific oracle.
- **Macro trust / stability:** [Federal Reserve — stablecoins in 2025 (FEDS Notes, 2026)](https://www.federalreserve.gov/econres/notes/feds-notes/stablecoins-in-2025-developments-and-financial-stability-implications-20260408.html) stresses intermediation and confidence — supports **caveat callouts** (attestation ≠ insurance) already in plan.
- **Consumer fintech:** trend summaries emphasize **explainable declines**, **outage fallback** messaging, **time-bounded** progress copy on multi-step flows, and **just-in-time** permissions (e.g. fintech UX trend pieces such as [Outcrowd — Fintech design trends 2026](https://outcrowd.medium.com/fintech-design-trends-2026-733bd55314d3)) — map to auth, add-money, send, exchange error/empty states.
- **DAO delegation:** scoping reviews on **delegated voting** stress accountability and cognitive load (e.g. [Frontiers — delegated voting in DAOs (2025)](https://www.frontiersin.org/journals/blockchain/articles/10.3389/fbloc.2025.1598283/full)) — reinforces **delegate profile proofs**, **participation rate definition**, and **anti-gaming** disclaimers on `delegates.html`.

Below: **page × component** improvements informed by benchmarks; **synthesized per-page backlog from the eight flows** per app; **expanded step-by-step flow specs**; then the **flow summary tables** with explicit links back to UI components.

---

### App 3: UNERA Consumer App — benchmarks, page-level improvements

**Benchmark takeaways**

- **Neobanks (e.g. Revolut-class “send money” breakdowns — see public UX teardowns)** — minimize steps between intent (amount → recipient → confirm); persistent amount entry UX; clear fee/summary before commit.
- **Consumer crypto wallets (Coinbase app, Phantom/Solflare-class patterns described in ecosystem UX literature)** — unified portfolio headline, segmented asset rows, pending-state honesty in activity, **Receive / Send / Swap** as primary jobs-to-be-done.
- **Industry direction (embedded wallets / account abstraction summaries)** — future-facing: clearer “trusted app” cues and recovery education in **account-security** flows (UI copy placeholders only).
- **Trust & recovery (fintech trend synthesis)** — **actionable** decline reasons (fraud/limit/rail) on review screens; **status + ETA** on outage/slow rail banners; **“Usually takes ~Xs”** on long-running steps; request **notifications permission** only when user enables alerts (not on first paint).

| Page / surface | Components / features (current plan) | Improvements from benchmarking (design layer) |
|----------------|--------------------------------------|--------------------------------------------------|
| **Nav + entity switcher** | “UNERA apps” disclosure, descriptors per app | Add **silent state**: show current app name in page title/h1 synergy; mirror Revolut-style **explicit destination** (“Opens Stablecoin App”) in menu rows; reserve **badge** optional for “Beta” governance app — text-labeled only. |
| **dashboard-enhanced.html** | KPI grid, quick actions (trim CAD), cross-app tiles | After removing mint/redeem: **preserve visual weight** with two equal-prominence outbound cards + one-line trust copy each (institutional reassurance). Add **pseudo–“total balance context”**: if UNERA exposes multi-asset rollup, mimic wallet **headline balance + drill-down** pattern. Recent activity row: **status pills** for pending/settled like wallet apps. |
| **wallet-enhanced.html** | Balances, actions, tables | **UNERA CAD row**: beside “Manage in Stablecoin App →”, add muted **estimated arrival / policy hint** (“Mint & redeem governed by issuer app”) — reduces support anxiety (Circle/Paxos-style operational honesty). Hidden-scrollbar tables: ensure **sticky first column** on mobile if spec allows (pattern from dense portfolio apps). |
| **add-money.html** | Stepper, amount UX | Benchmark **integrated keypad / clear primary** CTA sequencing; preserve `font-size: 1rem` on mobile inputs; reinforce **CAD** labeling on every confirmation chip. |
| **send-enhanced.html** | Recipient, amount, review | Echo **Revolut-style** confirm screen: duplicate amount + recipient + fee in one glance block; destructive **secondary** styling for irreversible reminders (already aligned with wallet-action rules — keep single primary). |
| **purchase-receipt.html** | Post-payment confirmation | After **Add Money** / rails (per flow C2): **share/save PDF** stub, **merchant/reference line** duplication, dispute/support link tertiary — aligns with Stripe/Apple Wallet receipt mental models (**design-only**, no rails). |
| **exchange.html** | Multi-step conversion | Surfacing **indicative rate hold time** in UI (“Indicative” label) mirrors neobank FX honesty; avoid implying locked price unless product guarantees it — static copy stubs OK. |
| **stake.html** | Yield / staking UI | Competitive wallets surface **APR source + unstake cooldown** upfront — add definition-list or info row pattern under hero stats. |
| **explore-centres.html** / **centre-detail.html** | Discovery maps/cards | Map to **localized discovery** norms: hours, eligibility, walking distance placeholder — borrows from “physical touchpoint” trust in regulated fintech maps. |
| **account-settings.html** / **account-security.html** | Profile, 2FA, sessions | MPC/passkey narratives in market — optional **education strip** (“Why passkeys”) in security page accordion; link to canonical brand guide security tone. |
| **notifications.html** | List / preferences | Governance-adjacent: **severity grouping** (Security / Money / Governance) prepares users if push ever spans apps — informational IA only on Consumer. |
| **governance.html** (gateway) | Link to Governance App + bullets | Mirror **Compound forum “how to vote”** simplicity: numbered 3-step **connect → delegate → vote** strip + link to Proposal list deep link stub `GovernanceApp/proposals.html#active`. |
| **Auth pages** | Login/signup | Neobanks emphasize **progressive profiling** — keep steps short; biometric affordance labels for screen readers (`aria-label` on icon buttons). |
| **Cross-page: empty, error, declined, offline** | Toasts, inline alerts, stepper dead-ends | **Explainable** one-line reason + **next action** (“Try card”, “Contact support”, “Retry”) per fintech trust patterns; **skeleton → content** for dashboard/wallet load; never **icon-only** error states — always text + token-safe colors. |

---

##### App 3 — Per-page backlog synthesized from flows C1–C8

| Page / surface | Flows | Consolidated improvements (ship with Consumer trim) |
|----------------|-------|------------------------------------------------------|
| **Nav + switcher** | C7, C8 | Keep **UNERA apps** labels identical to destination IA; optional **“You left Consumer”** toast on return from Stablecoin (stub). |
| **dashboard-enhanced.html** | C1, C2, C3 | KPI **tooltips or “i” disclosure** for first visit; activity rows **Pending / Settled** + relative time; quick actions **never orphan** after CAD removal (tile parity). |
| **wallet-enhanced.html** | C1, C3, C7 | Asset drill-down preserves **cadence** labels; CAD row **policy hint** + deep link; monospace **truncate + copy** for addresses/tx refs if shown. |
| **add-money.html** | C2 | **Time estimate** chip per step; **decline** panel with codes copyable for support; **primary disabled** until amount valid. |
| **purchase-receipt.html** | C2 | **Reference ID** repeated; share/save stubs; link **back to Wallet** / **Dashboard**. |
| **send-enhanced.html** | C3 | **Recents + saved beneficiaries** lane; review screen **triple block** amount / recipient / fee; post-send **timeline** (“Submitted → Clearing”). |
| **exchange.html** | C4 | **Indicative** rate + countdown or “refresh quote” tertiary; failure state **preserve form** values. |
| **stake.html** | C6 | **Risk accordion** above fold; **cooldown/unbond** numeric in stat row. |
| **explore-centres.html** / **centre-detail.html** | C5 | **Accessibility:** text address block beside map; **hours closed state** messaging. |
| **account-settings.html** / **account-security.html** | (cross-cutting trust) | **Sessions/devices** row pattern if not present; passkey/education accordion; **recovery** checklist link. |
| **notifications.html** | (cross-cutting) | **Channel toggles** with consequence copy (“Security alerts recommended on”). |
| **governance.html** | C8 | **3-step strip** connect → delegate → vote; deeplink **`GovernanceApp/proposals.html#active`**. |
| **Auth** | (onboarding/recovery) | **Step count visible**; **permission prompts** deferred until feature use; locked-out **single recovery path**. |

---

#### App 3 — Eight detailed user flows (ties to components above)

| # | Journey | Actor | Detailed steps | Surfaces improvements (implement in plan) |
|---|---------|-------|----------------|-------------------------------------------|
| **C1** | **First-session home orientation** | New holder | Lands on Consumer → reads dashboard KPIs → scans quick actions → opens wallet for asset detail → returns. | Dashboard: **explainers** microcopy near KPIs; Wallet: consistent **tabular nums** + CAD; Cross-app tiles: **one-line risk/reward** copy per tile. |
| **C2** | **Fund account (add money)** | Consumer | Opens Add Money → selects rail (mock) → enters amount (`1rem` input) → confirms fees/timing → sees success receipt link. | Add-money: **fee + SLA** disclosure block before final confirm (neobank norm); Receipt: persistent **download/view** affordance (`purchase-receipt.html` parity). |
| **C3** | **Send to counterparty** | Consumer | Opens Send → pick recipient → amount → review (amount+fee duplicate) → auth step (UI) → activity shows pending→settled. | Send: **address book / recent** prominence (wallet norm); Activity: **state timeline** chip on dashboard + wallet rows. |
| **C4** | **Swap / exchange asset** | Consumer | Opens Exchange → from/to → quote step → legal/risk acknowledgment → confirmation → ledger row. | Exchange: **rate disclaimer** + **cooling-off pattern** optional secondary link “Learn about spread”; table-no-scrollbar for quote history if present. |
| **C5** | **Centre discovery → visit intent** | Consumer | Explore centres → filter → detail page → save/share (stub) directions. | Centre detail: **trust module** (“Participating organisation”) analogous to Paxos issuer disclosure tone; WCAG focus on map alternative text. |
| **C6** | **Stake or earn (read-only educate)** | Curious holder | Opens Stake → reads APR/unbond → exits without staking (informational success). | Stake: **risk accordion** top of page (“Slashing”, “Liquidity”) — aligns with staking wallet patterns without promising yield. |
| **C7** | **Escalate to Stablecoin App for CAD** | CAD-aware user | From wallet UNERA CAD row → “Manage in Stablecoin App →” → lands Stablecoin mint/redeem entry (stub URL) → optionally returns via app switcher. | Wallet row link: **explicit external-app** semantics + optional `?from=consumer`; Stablecoin landing: mirrored **breadcrumb back to Consumer** in nav dropdown. |
| **C8** | **Governance curiosity from Consumer** | Token-curious user | Opens `governance.html` → reads bullets → launches Governance App → browses proposals without voting (logged out OK). | Gateway page: **FAQ accordion** anchors; outbound link opens **proposal list tab** focal point for continuity. |

**Expanded specifications (numbered steps → page impact)** — implement as copy/wire stubs in HTML mocks.

**C1 — First-session home orientation** — (1) Load `dashboard-enhanced.html`; (2) Skim KPI strip + announcements; (3) Tap primary quick action ≠ dead link; (4) Navigate `wallet-enhanced.html`; (5) Open one asset row; (6) Return via nav. **Impact:** dashboard KPI disclosures; wallet numerics/tabular alignment; outbound tiles visibly paired with destinations.

**C2 — Fund account (add money)** — (1) Start `add-money.html`; (2) Choose rail; (3) Enter amount (`1rem` input); (4) Review fees + SLA; (5) Confirm; (6) Success → `purchase-receipt.html`; (7) Shortcut to Wallet. **Impact:** time-estimate chips; decline reasons; receipt reference duplication.

**C3 — Send to counterparty** — (1) `send-enhanced.html`; (2) Select recent recipient or paste new; (3) Amount; (4) Review triple block; (5) Auth/biometric (UI); (6) Confirmation; (7) Activity pending state. **Impact:** recents rail; immutable review layout; timeline chips on dashboard/wallet feeds.

**C4 — Swap / exchange asset** — (1) `exchange.html`; (2) Pair selection; (3) Quote; (4) Risk/legal acknowledgment; (5) Confirm; (6) Post-trade ledger. **Impact:** indicative label + quote refresh; preserve fields on failure; hidden-scrollbar history if listed.

**C5 — Centre discovery → visit intent** — (1) `explore-centres.html` filter; (2) Card scan; (3) `centre-detail.html`; (4) Directions/share stub. **Impact:** textual address duplication; closed-hours state; participating org disclosure block.

**C6 — Stake (educational exit)** — (1) `stake.html` hero metrics; (2) Read APR/cooldown; (3) Open risk accordion; (4) Exit without staking. **Impact:** risks before CTAs; no implied guarantee copy.

**C7 — Hand off UNERA CAD to Stablecoin App** — (1) Wallet CAD row; (2) “Manage in Stablecoin App”; (3) Stablecoin landing; (4) Optional return via switcher `?from=consumer`. **Impact:** `aria-label` on cross-app jump; symmetrical nav labels.

**C8 — Gateway into Governance** — (1) `governance.html`; (2) FAQs; (3) Open Governance proposals `#active`; (4) Read-only propose/vote prerequisites. **Impact:** numbered connect→delegate→vote strip; no orphan external link icon.

---

### App 1: Stablecoin App — benchmarks, page-level improvements

**Benchmark takeaways**

- **Circle-class transparency** — circulating supply vs reserves, cadence disclosures (weekly/monthly language), examinations/attestations PDFs, flow windows (7/30/365), regulatory context snippets.
- **Regulatory framing** (industry pubs on GENIUS / AICPA criteria) — separate **point-in-time attestation** vs **audit** vs **management assertion** in UI prose; reconcile line-items “tokens outstanding” vs “reserve assets.” Optional reader education tone aligned with public explainers (e.g. [Gate Learn — how to read a stablecoin attestation](https://www.gate.com/learn/articles/how-to-read-a-stablecoin-attestation-report-and-why-it-matters/8674)) — **copy inspiration only**, not endorsement.
- **Operational transparency gap to close** — large issuers increasingly hint at **aggregation of redemption UX** metrics (timing, outages) — use **trust row / schedule card** for “service expectations” copy even if mocked.

| Page | Components / features | Improvements from benchmarking |
|------|------------------------|---------------------------------|
| **dashboard.html** | KPI strip, composition, donut, activity, trust row | Add **comparison windows selector** UI (7D / 30D / 1Y) beside circulation or flows — mirrors Circle reporting slices. **Issuer narrative** strip: segregation / FBO-style language placeholders. **Freshness**: dual display “Data as of” + “Next disclosure” (pairs with attestations schedule). |
| **get-unera-cad.html** | Multi-step mint | Preflight **policy card**: min/max mint, eligibility, settlement time bands — analogous to Paxos redemption rights disclosure summaries. Stepper retains **processing** honesty (chain vs fiat lag). |
| **redeem-unera-cad.html** | Multi-step redeem | Same as mint for **rail + SLA** expectations; reinforce **CAD** denomination on every confirmation; optional **FAQ** panel “Issuer vs secondary market liquidity.” |
| **proof-of-reserve.html** | Hero gauge, donut, breakdown, chart, attestations link | Include **footnotes row** keyed to table (custodian jurisdiction, tenor bucket) matching regulatory disclosure tables; **supply chart**: toggles gross vs circulating if copy allows; anchor **management assertion** teaser linking to attestations PDF list. Dual CTA: **Explorer tx** + **Download latest examination** (parity with Circle UX depth). |
| **mint-history.html** / **swap-history.html** | Dense tables | **Column presets** sticky control (minimal): “Auditor”, “Compliance” column sets — helps professionals; filters for **date range + type** labeled per account-settings patterns; Optional **CSV** affordance labeled “Request export” — UI stub (backend defer). |
| **attestations.html** | Archive table, schedule, compliance dl, reading guide | **Examination vs attestation badge** taxonomy (borrow AICPA language); CEO/CFO assertion **presence indicator** pill on row if applicable; **Superseded** chain (current row links to superseder). Compliance **dl**: also list **blocking regulations** placeholders (EU/US) Circle-style breadth but UNERA-neutral. Reading guide: **diagram-free** collapsible glossary (formula, reconcile adjustments); user-facing headings may mirror the **stablecoin disclosure trio** (tokens outstanding · reserve assets held · reconciliation) summarized in publicly described [AICPA stablecoin reporting criteria (2025)](https://www.aicpa-cima.com/resources/download/stablecoin-reporting-criteria) — **labels only**. Optional **lag** note (published vs period end). |

---

##### App 1 — Per-page backlog synthesized from flows S1–S8

| Page | Flows | Consolidated improvements |
|------|-------|---------------------------|
| **dashboard.html** | S1,S2,S3,S7,S8 | Freshness **Data as of + source**; window-selector slice tied to KPI footnotes; activity links to Mint/Swap history; trust row syncs attestations cadence. |
| **get-unera-cad.html** | S2 | Policy card → parity stepper with Consumer mint; terminal success paths to **Mint history** + dashboard. |
| **redeem-unera-cad.html** | S3 | **On-chain settled** vs **Fiat pending** trackers; SLA snippet per rail. |
| **proof-of-reserve.html** | S1,S6,S7 | Required **reconciliation** prose when explorer ≠ UI circulation; glossary links; tertiary **verification methods** stub (no vendor lock-in copy). |
| **mint-history.html** / **swap-history.html** | S4,S2,S3 | Row actions stubs: explorer link + attestation-period hint on hover/disclosure; labeled filters persist in spec. |
| **attestations.html** | S5,S8 | PDF rows: coverage period · publish date · supersedes; schedule card aligns with dashboard trust messaging. |

---

#### App 1 — Eight detailed user flows

| # | Journey | Actor | Detailed steps | Surfaces improvements |
|---|---------|-------|----------------|------------------------|
| **S1** | **Public transparency check** | Visitor / analyst | Hits Stablecoin home → verifies last-updated ribbon → scans ratio + composition bar → drills PoR → skims plain-English explainer → no login. | Dashboard + PoR: **hero provenance ribbon** mandatory; glossary links between pages; Liquidity **`--surface-trust`** usage for KPI wells. |
| **S2** | **Mint UNERA CAD (happy path)** | Eligible holder | Mint CTA → amount → banking/stable rail (mock) → compliance confirm → irreversible acknowledge → submitted → tracked in activity + mint-history link. | Get flow: **preflight policy** card; Recent activity table pulls **canonical tx format** from dashboard spec; timestamps `datetime` UTC + local. |
| **S3** | **Redeem to fiat rail** | Holder | Redeem CTA → amount → destination verification → SLA summary → confirms burn expectations → completes → redemption pending state in history. | Redeem: **two-phase status** (“On-chain settled” vs “Bank sent”) placeholders in processing chips — operational honesty benchmark. |
| **S4** | **Mint/swap forensic audit** | Operator / auditor | Opens mint-history → applies date filter → sorts by largest mint → opens tx explorer (stub) → cross-checks attestation period. | History tables: **filter bar** prominence; monospace hash **truncate + copy**; optional **column priority** documented for responsive. |
| **S5** | **Download & contextualize attestations** | Researcher | Attestations list → selects latest period → downloads PDF (`rel`/`target`) → reads “how to read” collapsible → returns to PoR breakdown to map line items. | Attestations: **reading guide first-time expand** suggestion; linkage **PDF ↔ period end ↔ PoR snapshot date** aligned in labels. |
| **S6** | **Blockchain verification path** | Sophisticated user | From PoR CTA → external explorer (stub) → compares on-chain supply to UI circulation → resolves mismatch via footnote (“timing cutoff”). | PoR: **reconciliation explainer** block (supply definition); footnotes for **adjusted vs raw** circulating if product needs it — copy-only in plan. |
| **S7** | **Liquidity composition trend read** | Risk-minded holder | Views donut + stacked bar legend → expands asset rows → scans maturity/jurisdiction cols → optionally toggles historical if chart permits. | Enforce **semantic fill colors + textual labels** (color-blind); chart SR alt table already in plan — add **CSV snapshot** caption stub optional. |
| **S8** | **Compliance & licenses scan** | Regulator-lite reader | Opens attestation archive → Compliance `<dl>` → schedule card “next examination” → back to dashboard trust row messaging. | Trust row cadence synced with schedule card copy; **`--surface-attestation`** for PDF-adjacent cards per Liquidity fork. |

**Expanded specifications (numbered steps → page impact)**

**S1 — Public transparency check** — (1) Load Stablecoin dashboard; (2) Read freshness ribbon; (3) Compare circulation vs reserves; (4) Open PoR hero; (5) Scan explainer accordion; (6) Exit logged out. **Impact:** ribbon + glossary links immutable on v1 launch.

**S2 — Mint (happy path)** — (1) Dashboard Mint CTA; (2) `get-unera-cad.html`; (3) Limits + rail; (4) Confirmation + irreversible; (5) Submitted state; (6) Drill mint-history/dashboard row. **Impact:** uniform tx columns across dashboard/history.

**S3 — Redeem to fiat** — (1) Redeem CTA; (2) `redeem-unera-cad.html`; (3) Destination; (4) SLA review; (5) Confirm burn semantics; (6) Pending bank phase. **Impact:** two-phase statuses visible in wallet-style list when mirrored from Consumer stubs.

**S4 — Forensic audit tables** — (1) Open mint-history; (2) Date filter; (3) Focus largest flows; (4) Tx link; (5) Align attestation coverage period externally. **Impact:** labeled filters; accessible sort announcements if JS.

**S5 — Attestation download narrative** — (1) Archive sort by date; (2) Download PDF; (3) Reading guide expand; (4) Map line items to PoR table mentally. **Impact:** anchored cross-links Period end ↔ snapshot.

**S6 — Blockchain verification** — (1) PoR explorer stub; (2) Compare circulating; (3) Read timing footnotes. **Impact:** reconcile explainer mandatory when two numbers diverge.

**S7 — Composition deep read** — (1) Donut/stacked bar; (2) Legends w/ amounts; (3) Maturity/geo columns; (4) Optional history toggle. **Impact:** textual labels dominate; WCAG-safe fills.

**S8 — Compliance scan** — (1) Attestations; (2) Compliance dl; (3) Licenses; (4) Return dashboard trust messaging. **Impact:** rhythm sync Trust row ⇄ Schedule card labels.

---

### App 2: Governance App — benchmarks, page-level improvements

**Benchmark takeaways**

- **Tally** — binary vote UX, comment-on-vote, delegate-to-self prerequisites explained; proposal pages with quorum + countdown clarity.
- **Snapshot** — fast tab mentally model (spaces, proposals lists); lightness suggests **density without chrome noise** — adopt for Protocol fork **muted rows + strong typography**.
- **Compound / Aave-adjacent** — separation **temperature / forum / formal vote** mentally modeled; timelines and **executable vs signalling** disclaimers critical.
- **Advanced** — **gasless voting** cues (if deferred backend, stub “may be subsidized”), **decoded calldata**, **delegation leaderboard** norms.
- **Delegate accountability (research synthesis)** — literature on DAO delegation emphasizes **transparent voting records** + **delegator trust fatigue** ([Frontiers scoping review on delegated voting, 2025](https://www.frontiersin.org/journals/blockchain/articles/10.3389/fbloc.2025.1598283/full)) — reinforce **participation rate** definition tooling, **changelog** stubs on delegate profiles, and **readable vote rationales**.

| Page | Components / features | Improvements from benchmarking |
|------|------------------------|---------------------------------|
| **index.html** | Stats, active cards, recent decisions, params widget | Add **delegation quorum health** miniature (delegated vs active voters) optional stat card — mirrors delegate-centric DAO dashboards. Params: hyperlink each term to glossary anchor (VP, quorum, timelock). **Recent decisions**: show **executed outcome** badge distinct from passed (timelock passed). |
| **proposals.html** | Tabs, cards, inline vote, filters | **Signal vs On-chain badge** per card if hybrid governance — avoids Snapshot/Tally confusion. Inline vote: follow Tally-ish confirm + **vote reason** textarea optional (collapsed). Tabs remember **keyboard focus return** after filter. Save **deeplink patterns** `#active`, `#pending`. |
| **proposal-detail.html** | Stepper, sticky vote, plaintext summary, decoded actions, voters table | Vote panel: explicit **delegation-required** banner with CTA delegate-to-self/link delegates. Actions accordion: human title + technical subtitle; voters table supports **verified delegate** badge (mock). Timeline: icons per `newunera-icons`; **Executed tx** link stub. |
| **delegates.html** | Search, cards, filters | Sort chips for **consistent URL query** stubs (`?sort=vp`) for shareability — Snapshot-like permalinks. Participation rate **definition tooltip** accessible (button + disclosure). Anti-gaming: muted copy “Self-reported badges” disclaimer row. |
| **delegate-profile.html** | Header, statement, history, CTA | **Conflict-of-interest optional field** stub (market norm for stewards); export statement as plaintext (UI). History table pagination pattern if long — design-only “Load more”. |
| **my-voting.html** | VP breakdown, delegation, outstanding votes, history | **Gasless readiness** banner placeholder; **Outstanding first** reinforced with countdown sort; delegated-to card shows **alternative delegates** carousel (max 3) — speeds re-delegation. |

---

##### App 2 — Per-page backlog synthesized from flows G1–G8

| Page | Flows | Consolidated improvements |
|------|-------|---------------------------|
| **index.html** | G1,G8,G5 | Visitor path: **Browse proposals** always visible above fold; homepage cards deep-link `#vote` anchors on detail stubs; distinguish **Executed** vs **Passed** ribbons in Recent decisions. |
| **proposals.html** | G1,G3,G7 | Tablist focus management return; inline vote gated by **proposal type chip** + modal; skeleton while counts load; empty states explain **wallet vs signalling** worlds. |
| **proposal-detail.html** | G1,G2,G4,G8 | Read-only pane never hides **Discuss** forum link; **Delegation required** inserts above vote buttons; abstain prominence matches Tally-style tri-choice; lifecycle includes **Executed** tx stub consistent with Explorer pattern in PoR. |
| **delegates.html** | G5 | Search debounce UX note (no layout shift); sticky filter strip on scroll; disclose **metrics methodology** modal. |
| **delegate-profile.html** | G5,G6 | Pre-delegate recap modal (“You delegate X VP to…”); changelog / statement version stub optional. |
| **my-voting.html** | G2,G6,G7 | Outstanding module pinned under header on mobile before history; countdown sort persists (UI state stub); delegation switch acknowledges **warm-up period** copy if contracts require it (placeholder). |

---

#### App 2 — Eight detailed user flows

| # | Journey | Actor | Detailed steps | Surfaces improvements |
|---|---------|-------|----------------|------------------------|
| **G1** | **Browse governance without wallet** | Visitor | Hits Governance home → scans stats/parameters → clicks active proposal preview → reads detail in read-only mode (vote gated). | Home + detail: **no dead-ends**: show “Connect wallet to vote”; params widget **/dl glossary** anchors. |
| **G2** | **Connect → delegating to self → vote For** | Token holder | Connect wallet banner → resolves delegation (self) flow (`my-voting` or modal) → returns to proposal → casts For → confirms tx (stub) → sees updated tallies mock. | Reuse wallet-action **confirmation modal** zoning; tally row **tabular nums** + label “For”. |
| **G3** | **Inline vote from list** | Rushed voter | Proposals Active tab → inline vote Against → modal confirm optional rationale → submits → card updates optimistic UI (mock). | Cards: modal **focus trap**, **Escape**, z-index rule; forbid inline on non-binary proposal types UI rule. |
| **G4** | **Evaluate complex upgrade proposal** | Super-user | Opens detail → reads Plain English summary → expands decoded actions accordion → verifies forum discussion link → skim voters table quorum → abstain decision. | Decoded actions: **copy calldata**; forum link **external icon** + `rel`; summary card **sticky mobile** stacking order per plan. |
| **G5** | **Delegate shopping** | Undecided holder | Opens delegates directory → searches name → applies participation filter → opens profile reads statement → verifies vote chips → taps Delegate. | Directory: chips `aria-pressed`; profile: COI stub; Delegate CTA warns **timelock to change**. |
| **G6** | **Delegation switch** | Delegating holder | From my-voting → sees current delegate → taps change → confirms new delegate profile → verifies VP breakdown refreshes stub. | `my-voting`: **comparison row** Old vs New delegate optional micro-modal — reduces error. |
| **G7** | **Outstanding vote triage** | Semi-active participant | Opens my-voting → sorts outstanding by soonest closing → jumps into detail → casts vote → backlog clears item. | Outstanding list: **`time`** elements + urgency border token (not hue-only — icon + label). |
| **G8** | **Lifecycle trace post-outcome** | Analyst | Opens passed proposal detail → observes timeline Executed checkpoint → verifies execution tx stub → archives note for audit. | Timeline: differentiation **Succeeded vs Executable** stages; footer link **Historical proposals CSV** labeled stub defer backend. |

**Expanded specifications (numbered steps → page impact)**

**G1 — Browse without wallet** — (1) `index.html` metrics; (2) Parameters widget; (3) Navigate `proposals.html`; (4) Open detail read-only; (5) CTA prompts connect. **Impact:** persistent **Connect wallet** insertion in vote pane + header.

**G2 — Self-delegate + vote For** — (1) Connect banner; (2) Route `my-voting.html` delegation self; (3) Confirm; (4) Return proposal; (5) Cast For + tx stub; (6) Tally refresh mock. **Impact:** shared modal/component with mint/redeem confirm z-index discipline.

**G3 — Inline vote from list** — (1) Active tab card; (2) Inline Against; (3) Optional rationale collapse; (4) Confirm modal focus trap; (5) Pending state overlay. **Impact:** disable inline for non-binary visually + `aria-disabled` rationale in spec.

**G4 — Evaluate complex proposal** — (1) Summary card; (2) Decoded actions accordion; (3) Forum tab; (4) Abstain path; (5) Voters quorum check. **Impact:** plaintext summary sticky offset below nav; forum links use **`rel="noopener noreferrer"`** on outbound anchors.

**G5 — Delegate shopping** — (1) `delegates.html` search; (2) Participation filter chips; (3) Profile thesis; (4) Review chips; (5) Delegate CTA recap. **Impact:** tooling tip + VP sort query param stub.

**G6 — Switch delegation** — (1) `my-voting.html` current delegate row; (2) Change opens profile compare; (3) Confirm micro-modal **Old→New**. **Impact:** carousel surfacing alternate delegates capped at three.

**G7 — Outstanding vote triage** — (1) Outstanding list countdown order; (2) Jump proposals; (3) Vote; (4) List refresh removes item; (5) If none, congratulatory subtle state. **Impact:** urgency uses icon + border token mixin, not hue alone.

**G8 — Lifecycle / audit trace** — (1) Passed proposal revisit; (2) Timeline verifies execution; (3) Copy tx hash; (4) Capture evidence note (external). **Impact:** differentiate **Succeeded (vote)** vs **Executed (timelock complete)** badges + doc link stubs.

---

### Cross-app flows surfaced by benchmarks (minimal extra IA)

| Flow | Apps involved | Recommendation |
|------|---------------|----------------|
| Consumer **CAD awareness** → Stablecoin **mint/redeem** | 3 ↔ 1 | Maintain **paired CTAs** in wallet row + Stablecoin dashboard “Return to Consumer wallet” reciprocal link stub in footer trust row optional. |
| Consumer **Governance gateway** ↔ Governance **browse** | 3 ↔ 2 | Use **explicit URL entry points** documented in gateway page + app switcher same labels. |
| Stablecoin **transparency skeptic** ↔ Governance **parameter change proposal** | 1 ↔ 2 | Optional future **deep link** from PoR footer “Discuss reserve policy” → forum stub — informational; no backend in design scope. |

**Design QA after implementing research backlog**

- Re-run accessibility spot checks on newly dense surfaces (delegates grid, attestations dl, Stablecoin KPI compare control).
- Ensure **every benchmark-inspired control** respects NewUnera constraints: tokens only, no CSS gradients on product HTML, `--fin-up/--fin-down` discipline for directional numerics/outcomes.

---

## Reference — superseded auxiliary plan file

[`3-app_ia_enhanced_plan_46160048.plan.md`](/Users/minhnguyenhoang/.cursor/plans/3-app_ia_enhanced_plan_46160048.plan.md) is **deprecated for execution** — its contents are merged herein. Optionally delete or archive that file to avoid drift.
