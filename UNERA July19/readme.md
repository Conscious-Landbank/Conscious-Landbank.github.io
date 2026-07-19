# UNERA Design System

**UNERA Design System V2** — the visual and interaction language for **Unera Stablecoin**, a social-purpose fintech platform.
Officially: *UNERA Brand Guidelines, Version 1 (March 2026).*

> **One Flow. Many Lives.** — *Value, Shared by Design.*

UNERA is the institutional identity behind Unera Stablecoin: stable digital infrastructure that connects people, strengthens communities, and moves value with purpose. One unified flow of stable digital value supports many lives through **Humanity Centres**, donations, remittances, and community well-being. This system makes high-stakes financial actions feel **institutional, calm, and human**.

It is not a generic fintech skin. It encodes a mission: reduce cognitive load, signal trust, and keep humanity visible without sacrificing data density.

---

## Sources

This system was reverse-engineered from, and should stay faithful to, the following (you may not have access — recorded for provenance):

- **Codebase** — `Unera-Claude/` (mounted). Canonical product lives in `NewUnera/`: `brand-style-guide.html` (the specimen authority), `dashboard-enhanced.html`, `wallet-enhanced.html`, `send-enhanced.html`, `add-money.html`, `exchange.html`, `explore-centres.html`, `account-settings.html`, plus the shared spine `consumer-app-nav.css` + `consumer-app-nav.js`.
- **GitHub** — [Conscious-Landbank/Conscious-Landbank.github.io](https://github.com/Conscious-Landbank/Conscious-Landbank.github.io) — the full repository (Brand Guide, NewUnera, Mobile App, Roadmap). Explore it for deeper context when building new UNERA work.
- **Brand fonts** — TestFoundersGrotesk OTF family (Light→Bold, normal + italic), supplied by the brand.
- **Logos** — UNERA wordmark lockups (white/black, full + nav), supplied by the brand.

> The brand-style-guide is the **specimen authority**; the consumer pages are the **behavioral authority**.

---

## Design philosophy

1. **Clarity over cleverness.** Finance users need scannable hierarchy, not decorative novelty. Type, spacing, and color carry meaning before copy does.
2. **Trust through restraint.** Deep Blue institutional chrome, **solid fills (no product gradients)**, consistent card geometry, explicit financial semantics — closer to a custody dashboard than a crypto meme app.
3. **Humanity in the architecture.** Impact stats, centre discovery, donation flows, and warm earth/cloud tints remind users value has a destination beyond the ledger.
4. **Accessibility as architecture.** Skip links, visible focus rings, WCAG AA contrast, 44–46px touch targets, reduced-motion support, semantic HTML — baseline, not polish.

---

## CONTENT FUNDAMENTALS

**Voice.** Calm, institutional, quietly humane. Confidence without hype. The product should *read* "Value, Shared by Design" through restraint, not marketing adjectives.

- **Person.** Speak to the user as **you** ("Track your impact", "Choose where your value lands"). The institution is **UNERA / we** in narrative copy ("UNERA builds stable digital infrastructure…").
- **Casing.** Sentence case for body, labels, and buttons ("Add Tokens", "Buy Stablecoins"). **UPPERCASE only** for nav links and small eyebrow labels (`DASHBOARD`, `WALLET`, `TRANSACT`, `CENTRES`, section eyebrows). Page titles are Title/sentence case in solid Deep Blue.
- **Taglines** are short, declarative, period-terminated: *"Value in harmony." "Where stability connects us." "One network. Shared progress."* The signature lockup is **"One Flow. Many Lives."**
- **Financial copy is explicit and reassuring.** Name irreversibility ("On-chain transfers are irreversible. Double-check the recipient address"), show receipts (Tx ID, datetime, status), confirm outcomes ("Sent successfully", "They receive").
- **Numbers** use tabular figures and clear signs (`+$2,400`, `−$180`). Direction is always reinforced with copy + an icon, never color alone.
- **Emoji.** Avoid — with one sanctioned exception: the 🦊 MetaMask glyph in the wallet badge. No decorative emoji, no emoji cards.
- **Vibe:** trustworthy infrastructure with a human pulse. Mission-forward but never preachy.

---

## VISUAL FOUNDATIONS

**Color.** Anchored on **Deep Blue `#173d47`** — a teal-navy that reads institutional, grounded, and distinct from fintech emerald or sky-blue clichés. It carries nav, primary buttons, page titles, and stepper emphasis.
- **Yellow `#ffffab`** is an accent **on dark surfaces only** (nav hover/active, notification badge, skip-link focus, accent CTAs on Deep Blue). Never yellow text on pale warm tints.
- **Cloud Blue `#ebfcf5`** and **Earth `#cec4b8`** supply environmental warmth.
- **Secondary** colors (Red/mauve `#ab5770`, Purple `#6a5770`, Light Blue `#90c2b8`) are **semantic, not decorative**.
- **Financial semantics (critical):** P&L direction is split from brand decoration. `--fin-up #1a7a5e` for gains/inflows/"you receive"/completed; `--fin-down` (= `--brand-red`) for losses/outflows; `--fin-neutral #6b9090` for flat. **Stepper progression is Deep Blue; money outcomes are fin-up** — do not paint stepper numbers green, and never use Light Blue for amount ink.

**Type.** One grotesk family for display and body — **TestFoundersGrotesk** (brand intent: Oakes Grotesk; Oakes is the named fallback). **Weight and size create hierarchy, not font switching.** Page titles are **solid Deep Blue — no gradient text on product screens**. KPI figures use `--font-stat-size` (2.5rem) with tabular numerals. Body ~1.6 line-height, antialiased. CJK → Noto Sans SC; Arabic → Mada (Google Fonts, loaded when needed).

**Surfaces & backgrounds.** Product pages use a **white canvas**. Cards are white (or a subtle per-card `color-mix()` tint — `--surface-impact`, `--surface-action`, `--surface-warm`, `--surface-sky`, `--surface-cad-hub`) — **never flat grey, never rainbow UI**. No background images or textures on product chrome; the brand guide/marketing collateral may use the brand gradients and circular "blob" graphic devices, but **product UI uses solid fills only**.

**Cards.** `border-radius: 1.25rem` (20px), 1–2px subtle tinted border, soft resting shadow (`--shadow-card`). On hover: border → Deep Blue, shadow deepens (`--shadow-hover`), and the card **lifts** (`translateY(-4px)`, impact/centre cards `-6px`). Impact & centre cards add a Deep Blue top rule that wipes in on hover.

**Borders & focus.** Subtle border = `rgba(23,61,71,0.13)`. Focus rings: **Deep Blue on light surfaces, Yellow on the dark nav** — always visible.

**Shadows.** A small ladder: resting card → hover lift → menu/popover → modal. Soft, blue-tinted, never harsh black.

**Radii.** 6 / 8 / 12 / 16 / 20px + pill (`980px`) for trend pills, wallet pill, and badges + full circle for avatars and step circles. Inputs are 12px; buttons 8px.

**Motion.** Restrained. `0.15–0.3s` transitions on `cubic-bezier(0.28,0.11,0.32,1)`; the stepper progress bar fills over `0.5s`. Card lift on hover; chevrons rotate 180°; dropdowns fade/slide a few px. **No bounces, no infinite decorative loops on content.** `prefers-reduced-motion: reduce` collapses animations to ~0.01ms.

**Hover / press.** Buttons darken (primary → `--neutral-800`) and gain a shadow; secondary/outline buttons swap their border + ink to Deep Blue. Cards lift. Nav links go Yellow. No shrink-on-press; no opacity-only states.

**Transparency & blur.** Sparingly: the centre "Verified" badge uses `backdrop-filter: blur(10px)` over imagery; nav menus and modals use solid surfaces with soft shadows, not glass.

**Imagery vibe.** Warm, human, documentary photography of communities and Humanity Centres (full-bleed inside rounded card tops, subtle zoom on hover). Not cold stock fintech, not b&w, not heavy grain.

**Layout.** Responsive grids `repeat(auto-fit, minmax(280px, 1fr))` collapsing to single column ≤768px. Container padding ~22px; section rhythm ~110px. The nav is a **44px sticky Deep Blue bar** — the product spine. Z-index ladder: skip 10000 → nav 10001 → dropdowns 10002 → modals 10010+.

---

## ICONOGRAPHY

- **System: Material Symbols (Outlined)** — used as **inline SVG only**, `fill="currentColor"`. No icon fonts, no PNG icons, no emoji (except the sanctioned 🦊 MetaMask wallet badge).
- **FILL policy.** **Filled** for impact wells, activity rows, notifications, and success/error states. **Outlined** for nav, stepper checks, and inline button icons. Mixing breaks recognition at small sizes.
- **Do not** drop Heroicons stroke paths into Material wrappers (they render invisible), and do not hand-draw icon SVGs.
- The kit's reusable icon set lives in `ui_kits/consumer-app/icons.jsx` (a curated Material Symbols subset). Copy from there when building new screens.
- **Logos:** `assets/logos/` — `unera-white-text.svg` / `unera-black-text.svg` (primary lockups) and `…-nav.svg` (tighter nav lockups). White lockup on Deep Blue; black on light. Never recolor the wordmark.

---

## Governance & anti-patterns

| Never | Why |
|---|---|
| V1 colors (`#10B981`, `#0EA5E9`, `#EC4899`) | Wrong brand generation |
| Space Grotesk | Superseded by V2 typography |
| CSS gradients on product pages | V2 uses solids + `color-mix()` only |
| Hardcoded hex when a token exists | Breaks theming + audit |
| `--brand-light-blue` for amount ink | Money direction is `--fin-up` / `--fin-down` |
| fin-up green on stepper numbers | Stepper progression is Deep Blue |
| White/Yellow text on warm pale tints | Silent accessibility failure |
| A simplified/custom nav per page | Fragments the dual-session UX |
| Native `<select>` | Use the custom keyboard-accessible Select |

**Principal designer's reminders:** brand-vs-money color is the #1 implementation mistake — teach it early. Nav is infrastructure, not a per-page experiment. Receipts need density (proof, not just celebration). Flow terminal states are **asymmetric** — success and failure are different components, not recolored heroes. Humanity Centres are first-class IA (in the primary nav). Wallet connection is **progressive** (CONNECT → pill → dropdown) — don't skip the disconnected state.

---

## Index — what's in this system

**Foundations (root):**
- `styles.css` — the single entry point consumers link (an `@import` manifest).
- `tokens/colors.css` · `tokens/typography.css` · `tokens/surfaces.css` · `tokens/spacing.css` — all CSS custom properties + `@font-face`.
- `fonts/` — TestFoundersGrotesk OTF family. `assets/logos/` — UNERA wordmarks.

**Specimen cards** (`guidelines/`, shown in the Design System tab): Colors (primary, secondary, financial semantics, surfaces, neutral ramp, status & gradients), Type (specimen, scale, weights, KPI figures, multilingual), Spacing (radii, shadows, scale), Brand (logos, nav lockup, voice & tagline), **Iconography** (canonical 28-icon Material Symbols table with slugs + outlined/filled variants, sizes, FILL policy, product glyphs), **Illustrations** (graphic-device blobs, empty states, success hero, payment-card concept, social badge).

**Components** (`components/`, bundled to `window.<Namespace>`):
- `core/` — **Button**, **Badge**, **Card**, **Avatar**, **Stepper**
- `forms/` — **Input**, **Select**, **Checkbox**
- `navigation/` — **WalletPill** (dual-session wallet pill), **NotificationBell** (bell + level-model panel; the DS mirror of the runtime controller `unera-pages/notifications-bell.js`, which is the single source of truth every vanilla product page loads — keep the two in sync)
- `transact/` — **SaveToAddressBook** (success-screen "save recipient" CTA + modal; **external-transfer flows only** — Send/withdraw/remittance, never Buy/Swap/Trade)
- Each ships `.jsx` + `.d.ts` + `.prompt.md`; see the card HTML in each directory for live states.

**UI kits** (`ui_kits/`):
- `consumer-app/` — interactive click-through of the consumer stablecoin app: nav (dual-session wallet pill), Dashboard (impact KPIs + quick actions), Wallet (balance hero + tokens + activity), Humanity Centres (discovery + donate), and the multi-step Send flow (stepper → review → success receipt). Entry: `index.html`. Pattern cards: Wallet Patterns, Notifications, Popups & Modals, **Transact Flows** (the four TRANSACT actions — Add Tokens, Send, Exchange, Stake — with shared patterns + per-action components).

**`SKILL.md`** — makes this system usable as a downloadable Agent Skill.

---

## Notes & open items

- **Font substitution:** none — the genuine TestFoundersGrotesk OTFs are bundled. CJK (Noto Sans SC) and Arabic (Mada) load from Google Fonts when those scripts are present; if you need them offline, supply the binaries and add `@font-face` rules.
- The **Oakes Grotesk** brand-intent face is referenced as a fallback name only; no Oakes binary is bundled.
