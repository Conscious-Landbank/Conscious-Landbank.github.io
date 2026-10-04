# UNERA Admin Portal design system

## Run locally
**Quickest:** double-click `UNERA-Admin-Portal-offline.html`. It is a single self-contained file (fonts, data, tables inlined) and works straight from disk.

**Editable source:** `UNERA Admin Portal.dc.html` loads `DataTable.dc.html` at runtime, which browsers block on `file://` (tables appear as grey boxes). Serve the folder over HTTP instead:

```bash
npx serve .        # or: python3 -m http.server 8000
```
Then open `http://localhost:3000` (or `:8000`). `index.html` redirects to `UNERA Admin Portal.dc.html`.

## Publish on GitHub
```bash
git init
git add .
git commit -m "UNERA Admin Portal design + design system"
git branch -M main
git remote add origin https://github.com/<org>/unera-admin-portal.git
git push -u origin main
```
Optional live preview: repo **Settings → Pages → Deploy from branch → main / root**. `.nojekyll` is included so files are served as-is.

**Project layout:** `UNERA Admin Portal.dc.html` (portal) · `DataTable.dc.html` (shared table) · `portal-data.js` (demo data) · `support.js` (Design Component runtime, required) · `styles.css` + `tokens/` · `components/` · `guidelines/` · `ui_kits/` · `assets/` · `fonts/`.

> **Fonts:** `fonts/TestFoundersGrotesk-*.otf` are *trial* files from Klim. Check the licence before pushing to a public repo; keep the repo private or swap the font if unsure.

Visual and interaction language for the **UNERA Admin Portal**: the single internal operations console covering the **Huma Platform** layer and the **Stablecoin (hUSD)** layer. Built for operators who search, investigate, retry, approve and audit all day.

> Clarity, efficiency, accuracy, traceability. Decision-making before decoration.

## Product context

One portal, two layers, layer-based RBAC (Super Admin across both; Huma / Stablecoin Operator and Viewer per layer). Modules, straight from the requirements: **Users & Wallets · Transactions & Reports · Reserve & PoR · Humanity Centers · Huma Points · Settings**, plus an operational **Overview** (an attention queue, deliberately not an analytics dashboard).

Hard boundaries (do not design around them): KYC review lives in **Sumsub**; analytics in **Google Analytics**; support ticketing in the helpdesk; **no user-requested refunds**; **no direct balance edits** (append-only `adjustment` / `reversal` ledger entries); **Phase 1 Huma Points are a DB ledger** with no HPT token, minting or utility/conversion configuration.

### Sources
- Requirements (source of truth): Confluence *Unera Admin Portal* page 84869123, v12, 25 Sep 2026 (+ Eric's inline comments, 10 Aug: fewer roles, no analytics / support).
- Stakeholder direction: Slack C0A524F4P7F / 1790347593.707219 (Eric, 25 Sep: structure first; phase 1–2 = manage users, monitor & retry txn, manage HC, manage HP; keep it simple) and C0ABB2Q3BJS thread (29 Sep: generic admin-portal references, "simple version first, then extend").
- Son's mock portal (Slack C0A96SW2JLC / 1790824659.781079, 1 Oct): BE/API validation mock for internal accounts per role, HP earn-rate configuration and scheduled enable/disable. Login-gated; **not inspected directly** (see caveats). Eric confirmed its APIs follow the requirements document.
- Visual references: *UNERA hUSD Portal* project dd22ef68 (Stablecoin: near-black chrome, Signal Yellow `#ecd6a0`, Verified Teal, PoR palette, tabular financial figures) and *Huma* project 96945e73 (Deep Blue `#173d47`, TestFoundersGrotesk, status/financial semantics, rounded callouts, Material icons).

## Design principles (audit 04 Oct 2026)
Apple-grade restraint applied to UNERA: large titles (28px, -0.02em), sentence-case labels (no all-caps), borderless white groups on a tinted canvas (#eff2f3), hairline separators, translucent toolbar, segmented controls for single-choice filters, filled selection pill in the sidebar (no left-border accent). Status in tables is dot + label; tinted chips only in entity headers. Field names are captions under plain-language labels. Audited against NN/g's 10 heuristics, Gestalt principles, Laws of UX and documented AI-design tells; the full table lives in Portal structure → Design audit.

### Table rule: pagination (04 Oct 2026)
Every table in the product uses `DataTable.dc.html` and paginates as soon as it holds more than 10 rows. One footer everywhere: "Showing 1–10 of 80" · Rows per page 10 / 25 / 50 / 100 (larger options appear only when there is data for them) · first / previous / numbered pages with ellipsis / next / last. Changing filters or search returns to page 1; page size persists while you stay on the table. On phones (≤560px) the page numbers collapse to "Page 2 of 8" and the footer wraps. Overview previews (attention queue, recent actions) show the latest items with a link to the full, paginated list instead of their own pager.

### Requirements re-audit (04 Oct 2026, Confluence v12)
Closed gaps: column sorting on every table (§6.2 "pagination, sorting, filters"); live date-range filters on Transactions, Huma Points ledger and Audit log with start-after-end validation; ledger pathway and audit action-type filters; Huma Points search by campaign and claim/idempotency reference (§5.5.1); claim drawer shows its audit ID (UAP-15); Humanity Center impact metrics and images can be added (§5.6); reserve snapshot drafts are editable with live total/ratio and submit validation (§5.4.3). Touch devices show the reason under disabled buttons instead of a hover-only tooltip.

### States rule (04 Oct 2026)
Every page designs three paths: happy, error, edge. Errors follow NN/g: say what happened in plain words, that nothing was changed, what to do next, and give a reference ID. Dialogs stay open on failure with inputs kept; conflicts offer "Reload latest version". Empty states distinguish first use from no results (with Clear filters). Offline shows cached data and disables confirms with the reason; session expiry warns before sign-out; unknown IDs land on a Not-found page with a way back. Reversible low-risk actions (tags) offer Undo. The per-page matrix lives in Portal structure → Scenario coverage.

### Controls & motion (04 Oct 2026)
- **Dropdowns:** custom chevron 12px, inset 14px from the right edge, 40px right padding so text never runs under it; same treatment on every select including table pagination. Date inputs get 12px side padding and an inset calendar icon.
- **Icons:** every page title carries a 40px Deep Blue icon tile (yellow glyph); panel titles a 24px tinted icon chip; metric tiles, integrations and user summary tiles use the same 1.9–2.1px stroke set.
- **Motion:** screens fade up (300ms), metric tiles and table rows stagger in (≤300ms total), progress and status-mix bars grow from the left, the reserve sparkline draws in, toasts pop. All respect reduced motion.

## Content fundamentals
- **Voice:** fact first, calm, exact. The verb names the outcome: "Retry transaction", "Blacklist wallet", "Record reversal", "Approve & publish". Never "Submit", "OK", "View".
- **Casing:** sentence case everywhere, including table headers and labels. No uppercase eyebrows. Requirement field names stay in `snake_case` where the data model uses them (`claimable_points_balance`, `linked_wallet_address`) so engineering and ops share one vocabulary.
- **Consequences stated once**, in a rounded callout inside the confirmation, in plain words: what changes, for whom, whether it can be undone.
- **Statuses** use the requirement's words (Failed, Stuck, Pending approval, Blacklisted, Superseded, Not available). Never color alone.
- **Numbers:** tabular numerals, explicit sign on money and points (`+500.00 hUSD`, `−200 HP`), IDs and addresses in mono with a copy affordance, timestamps as `03 Oct 2026, 09:14 UTC`.
- No emoji, no exclamation marks, no marketing adjectives.

## Visual foundations
- **Color.** Chrome is Huma **Deep Blue `#173d47`** (sidebar, primary buttons, active tab) so the portal belongs to the ecosystem; text ink is Stablecoin **near-black `#1d1d1f`** for dense-table legibility. **Signal Yellow `#ecd6a0`** only on dark chrome (active nav marker, ADMIN pill, focus on dark). **Verified Teal `#127c72`** for on-chain / explorer links and "Live" proof. Money direction is `--fin-up` / `--fin-down`, never a brand color. PoR asset classes keep the fixed Stablecoin palette.
- **Status tones** (tokens/status.css): ok · pending · info · bad · neutral · attention; each a tint + ink pair, rendered as chip with dot + label.
- **Type.** TestFoundersGrotesk (400/500/600) at 11/12/13/14/16/20/24; mono for identifiers. Weight and size make hierarchy, never a second face.
- **Surfaces.** Canvas `#f3f5f6`, white panels with a 1px `rgba(23,61,71,0.13)` border and **no shadow**. Shadows exist only for popovers, drawers and modals. Not every container is a card: summary strips are bordered grids, filters sit bare on the canvas.
- **Radii.** 6 buttons / 8 inputs / 10 panels & tables / 14 modals / pill chips.
- **Density.** 38px table rows, 34px controls (30px inline), 24px page padding, 1440px max width. Tables are first-class: sticky header inside a scroll region, right-aligned numerics, status chips, row click to detail, one contextual action per row, pagination footer, loading / empty / error states.
- **Motion.** 120–180ms, `cubic-bezier(0.28,0.11,0.32,1)`; only toasts, drawers and a pulse on in-flight status. Reduced motion collapses everything.
- **States.** Hover = surface-hover; focus = 2px Deep Blue ring (yellow on chrome); disabled = 45% opacity + `title` naming the required role (never hidden, so Viewers learn what Operators can do); danger buttons only for blacklist, reversal, archive, unwhitelist, publish-replace.
- **Layout.** 232px sidebar (60px icon rail under 1180px), 52px top bar with global search (⌘K) and role switcher, breadcrumbs on detail pages, right drawers (460px) for small supporting records, centered modals (560px) for consequential actions.

## Iconography
Minimal 24px stroke icons (1.9px) drawn inline, `fill="none" stroke="currentColor"`: search, copy, external link, chevron, close, check, alert, info, download. No icon font, no PNGs, no emoji. The UNERA wordmark is `assets/unera-white-text-nav.svg` (inherited from the Huma system).

## What's in this system
- `styles.css` → `tokens/typography.css`, `colors.css`, `spacing.css`, `status.css` (+ `@font-face`, fonts in `fonts/`).
- `guidelines/` specimen cards: brand & chrome, neutral ramp, financial semantics, PoR classes, status tones, type scale, identifiers, radii & controls, layout, sidebar lockup, operator voice.
- `components/core/`: **Button**, **StatusChip** (+ `toneFor`), **Tag**, **MetricTile**, **Panel**, **Callout**. `components/forms/`: **Input**, **Select**, **ReasonCodeField**, **Tabs**.
- **Intentional additions** (no source inventory exists for the admin portal): all of the above are new primitives sized to admin density; `ReasonCodeField` exists because every privileged action captures reason + notes identically.
- `DataTable.dc.html`: the reusable table Design Component used throughout the portal (cols / rows / state / footer props).
- `UNERA Admin Portal.dc.html` + `portal-data.js`: the full click-through portal (all modules, five roles, every privileged action with reason-coded confirmation, drawers, toasts, loading / empty / error states, and a "Portal structure" reference screen). `ui_kits/admin-portal/index.html` registers it in the Design System tab.

## Caveats
- Son's mock portal and Swagger are behind a login the agent cannot reach; the data model here follows the Confluence §6 entities instead. Field names were kept verbatim so alignment should be mechanical.
- Native `<select>` is used (admin density, keyboard-native). Swap for the Huma custom Select if product wants parity.
- Date-range pickers, pathway/action filters in the audit log and the HC image upload are visual only.
