# Unera Stablecoin Design System

**The visual and interaction language for the Unera Stablecoin Portal** — the
issuance, redemption, and reserve-transparency surface of the Unera / Huma ecosystem.

> **Backed 1:1. Verifiable on-chain. Redeemable any time.**

This system extends the **UNERA V2** brand family (Deep Blue institutional spine,
TestFoundersGrotesk, calm-and-human fintech restraint) and gives the Stablecoin
Portal its own **distinct, reserve-grade identity**: a **Signal Yellow** signature
accent (a soft, light yellow in the UNERA family), plus a **Verified Teal** for
on-chain proof and attestation. Where the consumer app is warm and community-first,
the Unera Stablecoin Portal reads **institutional, audited, and proof-driven** — a custody
dashboard, not a crypto meme app.

---

## Product context

The **Unera Stablecoin Portal** is owned by a dedicated holding company whose sole
purpose is stablecoin issuance — no other financial services run inside this entity.
Its job is narrow and high-trust:

- **Issue** fiat-backed stablecoins (mint to the user's wallet against a fiat deposit)
- **Redeem** stablecoins 1:1 back to the user's bank account
- **Manage the reserve** backing every outstanding token
- **Prove the reserve** publicly and continuously (Proof of Reserve)
- Operate its **own independent KYC/AML** programme — no other layer can access or override it

Reserve yield (interest on HQLA holdings) funds portal operations and, through the
**Passive Reserve Yield** stream, Humanity Centers. That stream is automatic: interest on
the HQLA reserve is routed at the close of every period with no request and no
discretionary step at the issuer, and the **Swiss Association** — not the issuer — holds
final authority over which Humanity Centers receive it and in what proportion. Every
routing transfer is recorded on-chain and falls inside the quarterly attestation, so the
path from reserve income to the receiving Center is publicly auditable.

Humanity Centers have a **dual funding model**: this ecosystem yield *plus* direct
donations. Donations are made on **Huma Platform** and never inside this portal — the
Stablecoin Portal describes the yield stream, evidences it, and **links out** to the Huma
Platform Humanity Centers directory and Donation page. It hosts no donation flow, HC
directory, HC detail page, receipt, or Huma/Impact Points balance.

The Portal does **not** run governance, remittance, payments, exchange, or DeFi — those
live in the separate **Huma Platform** layer and must never appear in stablecoin
licensing or UI.

**Launch token:** **hUSD** — a US-dollar-pegged, fiat-backed stablecoin (issue, redeem,
Proof of Reserve, mint/burn history). Per the PRD (v14) and the *Standard Stablecoin* and
*Authentication & KYC* specs, hUSD is the only coin at launch (`peg_currency` may be USD or
CAD); additional coins (hCAD, hEUR) are an explicit future phase. The earlier codebase draft
used hCAD — this system was repositioned to **hUSD** to match the specs. The Stablecoin Layer
performs exactly two transaction types: **Mint** (issuance) and **Burn** (redemption) — swaps,
remittance, payments, exchange, DeFi, and governance are Platform-Layer concerns and never
appear here.

### Sources (provenance — you may not have access)

- **Codebase** — `Stablecoin-Claude/` (mounted under `uploads/`). Key files:
  `dashboard.html`, `get-unera-cad.html` (Purchase flow), `redeem-unera-cad.html`,
  `proof-of-reserve-public.html`, `mint-history.html`, `swap-history.html`,
  `purchase-receipt.html`, the auth set (`login`, `signup`, `verify-email`,
  `magic-link-sent`, `forgot-password`, `password-reset`, `verify-2fa`, `setup-2fa`,
  `kyc-verify`, `account-security`), and the shared spine
  `stablecoin-app-nav.{css,js,inc.html}` + `wallet-connect-parity.{css,js}`.
- **Brand family** — built on the UNERA V2 Design System (`679671c0-…`); the genuine
  TestFoundersGrotesk OTFs and UNERA wordmark lockups are inherited and bundled here.
- **GitHub** — [Conscious-Landbank/Conscious-Landbank.github.io](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io)
  (`Business/UNERA-Overview.html` — the three-layer ecosystem overview).
- **PRD** — Unera Stablecoin Portal Product Requirements (Confluence, access-gated;
  not retrievable at build time — see Caveats).

---

## CONTENT FUNDAMENTALS

**Voice.** Calm, institutional, exact. Trust is earned through precision and proof, not
adjectives. The Portal sounds like a regulated issuer that happens to be pleasant to use.

- **Person.** Speak to the user as **you** ("Verify your identity to start", "You receive").
  The issuer is **Unera Stablecoin Portal / we** in narrative copy.
- **Casing.** Sentence case for body, labels, and buttons ("Purchase UNERA CAD",
  "Redeem", "Verify identity"). **UPPERCASE only** for nav links and small eyebrow
  labels (`DASHBOARD`, `PURCHASE`, `REDEEM`, `POR`, `HISTORY`). Page titles are
  Title/sentence case in solid Deep Blue.
- **Proof-first copy.** Every high-stakes action names its guarantees and shows its
  receipts: "Backed 1:1 by audited reserves", "On-chain transfers are irreversible —
  double-check the address", "Recorded to block #21,456,789", Tx IDs, attestation dates,
  reserve ratios. Reassure with *evidence*, not reassurance.
- **Numbers** use tabular figures and explicit signs (`+250.00 hCAD`, `−100.00 hCAD`,
  `105.2%`, `$2,845,290`). Direction is reinforced with copy + icon, never color alone.
- **Reserve language.** "Reserve composition", "Reserve ratio", "1:1 redeemable",
  "Reserve data current / Updating / Data unavailable", "Bank deposits / Stablecoins /
  Treasury bonds / Cash equivalents", "Independently audited", "Operational".
  **Do not use "Fully backed" / "Fully reserved" as a dashboard *status*** (Dashboard spec
  §8) — you may *describe the model* ("backed 1:1 by cash & Treasuries") but let the
  **evidence** (reserve ratio, attestation date, last-updated timestamp) carry the trust
  claim. **Never imply instant or no-queue redemption**: redemption is not instant and may be
  queued (Issuance §7.3) — say "~1 business day". Use "Issue / Get hUSD" and "Redeem hUSD",
  never swap/trade/cash-out language.
- **Emoji.** Avoid — the one sanctioned exception is the 🦊 MetaMask glyph in the
  wallet-connect grid. No decorative emoji.
- **Vibe:** regulated issuer infrastructure — transparent, exact, quietly confident.

---

## VISUAL FOUNDATIONS

**Color.** Anchored on **Near Black `#1d1d1f`** (Apple-grade chrome; replaced the earlier teal-navy) — institutional,
grounded, carrying nav, primary buttons, page titles, and **stepper progression**.

- **Signal Yellow `#ecd6a0`** is the Stablecoin signature accent and the system's
  point of difference — a soft, warm yellow (echoing the Level-1 banner). It appears **on dark surfaces only**
  (nav hover/active, badges on Deep Blue, accent CTAs, reserve-status emphasis).
  On light surfaces, the amber INK variant `--accent-deep #7e6410` carries AA contrast.
  Never light-yellow text on pale tints. (Evolved from the earlier gold/coral accents at the
  user's direction; kept distinct from the amber "warning" tone by lightness.)
- **Verified Teal `#127c72`** carries on-chain proof / attestation chips, "verified"
  marks, and PoR live/operational dots. It is intentionally distinct from money-green so
  *proof* never reads as *profit*.
- **Ink `#102b32`** (new) deepens headers and the darkest chrome; **Teal `#2f7682`** (new)
  is the supporting mid-tone for secondary chrome, icon wells, and links — both keep the
  family analogous to Deep Blue while adding the depth a one-note palette lacked.
- **Cloud Blue `#eafaf4`** + **Earth `#cabfb1`** supply environmental warmth; the app canvas
  is a crisp near-white `#f7fafa` (V2 — cleaner than washing every page in Cloud Blue).
- **Neutral ramp** is a refined cool-slate with a faint teal undertone (V2 — cleaner and less
  muddy than V1's heavily teal-tinted greys), still never a flat grey.
- **Financial semantics (critical):** P&L direction is split from brand decoration.
  `--fin-up #1a7a5e` for gains / inflows / "you receive" / completed; `--fin-down`
  (= `--brand-red #ab5770`) for losses / outflows; `--fin-neutral #6b9090` for flat.
  **Stepper progression is Deep Blue; money outcomes are fin-up.** Never paint stepper
  numbers green; never use a brand accent for amount ink.
- **Proof-of-Reserve composition** has its own four-asset palette: `--por-bank`
  (= fin-up), `--por-stable #2f7682` (= brand teal), `--por-treasury #6a5770`, `--por-cash #b8862f`.

**Type.** One grotesk family — **TestFoundersGrotesk** (brand intent Oakes Grotesk,
named fallback). **Weight + size create hierarchy, never font switching.** Page titles
are solid Deep Blue — no gradient text on product screens. KPI figures use
`--font-stat-size` (2.5rem) with tabular numerals. Body line-height ~1.6, antialiased.

**Surfaces & backgrounds.** Product pages use a **white canvas** (the dashboard wash is
Cloud Blue; flows are white). Cards are white or a subtle per-card `color-mix()` tint
(`--surface-impact`, `--surface-action`, `--surface-cad-hub`, `--surface-reserve`,
`--surface-verify`, `--surface-warm`, `--surface-sky`) — **never flat grey, never rainbow
UI, never product gradients.** No background images/textures on product chrome.

**Cards.** `border-radius: 14px` (`--radius-2xl`; V2 toned down from 20px for a crisper, more institutional feel), 1px subtle tinted border
(`rgba(23,61,71,0.13)`), soft resting shadow (`--shadow-card`). On hover: border → Deep
Blue, shadow deepens (`--shadow-hover`), card **lifts** (`translateY(-3px)`). Buttons 6px, inputs/small-cards 8px, modals 10px; pills + avatars stay fully round.

**Borders & focus.** Subtle border `rgba(23,61,71,0.13)`. Focus rings: **Deep Blue on
light surfaces, Signal Yellow on the dark nav** — always visible.

**Shadows.** A small soft, blue-tinted ladder: resting card → hover lift → menu/popover
→ modal. Never harsh black.

**Radii.** 6 / 8 / 12 / 16 / 20px + pill (`980px`) for trend/status pills, wallet pill,
badges + full circle for avatars and step circles. Inputs 12px; buttons 8px; modals 16px.

**Motion.** Restrained. `0.15–0.3s` on `cubic-bezier(0.28,0.11,0.32,1)`; the stepper
progress bar fills over `0.5s`; modals fade + slide-up a few px; chevrons rotate 180°.
**No bounces, no infinite decorative loops** on content. `prefers-reduced-motion`
collapses animations to ~0.01ms.

**Hover / press.** Primary buttons darken to `--neutral-800` + gain a shadow; secondary
buttons swap border + ink to Deep Blue; cards lift; nav links go Signal Yellow; wallet
cards lift 2px. No shrink-on-press, no opacity-only states.

**Transparency & blur.** Sparingly — the connect-modal overlay uses a light
`backdrop-filter: blur(4px)`; "verified" badges may blur over imagery. Menus and modals
are solid surfaces with soft shadows, not glass.

**Layout.** Responsive grids `repeat(auto-fit, minmax(220–280px, 1fr))` collapsing to one
column ≤768px. Container padding ~22px. The nav is a **44px sticky Deep Blue bar** — the
product spine, identical on every screen (an `app-pill` reading "STABLECOIN" sits beside
the wordmark). Z-index: skip 10000 → nav 10001 → dropdowns 10002 → modals 10010+.

---

## ICONOGRAPHY

- **System: Material Symbols (Outlined)** for product chrome — used as **inline SVG only**,
  `viewBox="0 -960 960 960"`, `fill="currentColor"`. No icon fonts, no PNG icons.
  Proof-of-Reserve / marketing illustrative icons use a **stroke** style
  (`fill="none" stroke="currentColor"`, `viewBox="0 0 24 24"`).
- **FILL policy.** Filled glyphs for activity rows, notifications, KPI wells, and
  success/error states; outlined for nav and inline button icons; stroke for PoR
  asset-class and "how it works" cards. Don't mix within one cluster.
- **Wallet-connect glyphs** are each provider's own mark (MetaMask 🦊, WalletConnect,
  Coinbase, Brave, Ledger) drawn as inline SVG in the connect modal.
- **Do not** hand-draw new icon SVGs or drop Heroicons stroke paths into Material wrappers.
- **Logos:** `assets/logos/` — the clean lockups are the **nav variants**
  (`unera-white-text-nav.svg` — mint `#6cc6b8` symbol + white wordmark; `unera-black-text-nav.svg`).
  Use these everywhere (the system does). White lockup on Deep Blue; black on light.
  The "STABLECOIN" app-pill (Cloud Blue chip, uppercase, Deep Blue ink) sits beside the
  nav wordmark to mark the Portal. Never recolor the wordmark.

---

## Governance & anti-patterns

| Never | Why |
|---|---|
| Consumer soft-yellow `#ffffab` as the Stablecoin accent | Stablecoin's signature is Signal Yellow `#ecd6a0` |
| CSS gradients on product pages | Solids + `color-mix()` only |
| fin-up green on stepper numbers | Stepper progression is Deep Blue |
| Verified Teal for P&L / amounts | Teal = proof, not profit |
| A brand accent for amount ink | Money direction is `--fin-up` / `--fin-down` |
| Light-yellow/White text on pale tints | Silent accessibility failure |
| A simplified/custom nav per page | The 44px Deep Blue spine is shared infrastructure |
| Native `<select>` | Use the custom keyboard-accessible Select |
| Reserve-composition recolored ad hoc | Asset classes have fixed `--por-*` colors |
| "Fully backed" / "Fully reserved" / "no queue" / "instant redemption" as a status or claim | Dashboard §8 + Issuance §7.3 — lead with evidence (ratio, attestation, timestamp) and an honest "~1 business day" SLA |
| Out-of-scope surfaces (Earn/yield, Bridge, Rewards, crypto payout, issuer API, swap) | Stablecoin Layer is Mint + Burn + reserve + KYC only (both specs §1) |
| A donation flow, Humanity Center directory/detail page, donation receipt, or Huma/Impact Points balance inside this portal | Giving is a Huma Platform surface (FE-208 §D) — describe the Passive Reserve Yield stream, evidence it, and link out |
| "mint" / "burn" / "cash out" in donor-facing Humanity Center copy | Donation copy rules (FE-208 §C 6.4) — say "funds", "routed", "issue", "redeem" |
| Implying the issuer chooses which Humanity Centers get the yield | Final allocation authority is the **Swiss Association**; the issuer only routes |

**Principal designer's reminders:** (1) brand-vs-money color is the #1 mistake — yellow and
teal are brand/proof; green and red are money. (2) Proof of Reserve needs *density and
evidence* (block numbers, audit links, asset breakdown), not celebration. (3) The nav is
infrastructure, not a per-page experiment. (4) Wallet connection is progressive
(CONNECT → pill → dropdown) — never skip the disconnected state.

---

## Index — what's in this system

**Foundations (root):**
- `styles.css` — the single entry point consumers link (`@import` manifest).
- `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` ·
  `tokens/surfaces.css` — all CSS custom properties + `@font-face`.
- `base.css` — resets + foundational classes mirroring the React primitives.
- `fonts/` — TestFoundersGrotesk OTF family. `assets/logos/` — UNERA wordmarks.

**Specimen cards** (`guidelines/`, shown in the Design System tab): Colors (brand core,
reserve gold, verified teal, financial semantics, PoR composition, neutral ramp,
surfaces), Type (specimen, scale, weights, KPI figures), Spacing (radii, shadows, scale),
Brand (logo lockups, nav spine, voice).

**Components** (`components/`, bundled to `window.<Namespace>`):
- `core/` — **Button**, **Badge**, **StatusPill**, **Card**, **Stepper**
- `forms/` — **Input**, **Select**, **Checkbox**
- `stablecoin/` — **WalletPill** (connect states), **ReserveBar** (PoR composition),
  **StatCard** (KPI figure), **StatusTimeline** (issuance/redemption state machine, spec
  §8 vocabulary), **NotificationCenter** (bell + unread + service events, Issuance §11),
  **AccountStateBanner** (public / KYC-pending / blocked / maintenance, Dashboard §7),
  **QuoteCard** (60-second expiry countdown + rate source, Issuance §3)
- `charts/` — **ReserveGauge** (ratio vs 100% floor), **CompositionDonut**,
  **MaturityLadder**, **TrendChart** (90-day) — pure-SVG, no libraries

**UI kits** (`ui_kits/`):
- `stablecoin-app/` — the authenticated Portal (hUSD): Dashboard with KYC-tier card +
  L1/L2 gating, public/KYC-pending/verified **account states** + context banner,
  **notification center**, **Issue** flow (fiat + USDC/USDT crypto onramp, **bidirectional**
  amount input, **60-second live-rate quote** with expiry, status timeline), **Redeem**
  (bank-only fiat; burn → liquidity → disbursement; honest ~1-day SLA), public **Proof of
  Reserve** (ratio gauge, composition donut, custodian + maturity, 90-day trend,
  **Passive Reserve Yield → Humanity Centers** (cumulative routed, Swiss Association as
  allocation authority, on-chain auditability, dual-funding note + Huma Platform link-outs),
  the three-layer separation card, contract address + network/decimals/status, attestations with
  Latest/Archived status), **History** (mint/burn, filters).
- `auth/` — login, signup (email-first), magic link, **email-based 2FA (+authenticator
  option)**, password reset, partner-framed verification, access-level success state.

**`_audit/`** — **`Stablecoin-Audit-and-Changes-2026-06.md`** is the current feature audit,
gap analysis (NNG heuristics + Gestalt) and change log against the *hUSD Issuance &
Redemption* (62259435) and *Dashboard* (66912287) specs. `PRD-gap-analysis.md` is the
earlier analysis against the combined PRD v14.

**`SKILL.md`** — makes this system usable as a downloadable Agent Skill.

---

## Caveats / open items

- **Token = hUSD.** Repositioned from the codebase's earlier hCAD draft to match the PRD
  (hUSD is the only launch coin; `peg_currency` may be USD or CAD). Say the word if you want
  a CAD-pegged variant surfaced.
- **2FA conflict (resolved in favour of email):** the *Authentication & KYC* spec mandates
  **email-based** 2FA ("avoid SMS in v1"); the main PRD mentions TOTP. The auth kit defaults
  to email and offers an authenticator toggle so both are represented — confirm the canonical one.
- **Signal Yellow accent** (`#ecd6a0`, a soft warm yellow matching the Level-1 banner; evolved from the earlier
  gold/coral at the user's direction) is the signature accent; surface tints derive from
  brand teal + the yellow accent (cooler, less minty than UNERA) — open to tuning the hue.
- **PoR figures, custodians, attestations** are realistic placeholders — wire to the real
  reserve pipeline / verification partner / payment-rail provider for production.
- Fonts are the genuine UNERA assets (no substitution).
- **Logo assets:** the supplied "primary" lockups (`unera-white-text.svg` /
  `unera-black-text.svg`) are contaminated Illustrator spec-sheet exports (stray
  "Elements overview" artwork), so the system standardizes on the clean **`-nav` lockups**.
  Send clean primary wordmark SVGs and I'll swap them in.
- **Logo assets:** the supplied "primary" lockups (`unera-white-text.svg` /
  `unera-black-text.svg`) are contaminated Illustrator spec-sheet exports (stray
  "Elements overview" artwork), so the system standardizes on the clean **`-nav` lockups**.
  Send clean primary wordmark SVGs and I'll swap them in.
