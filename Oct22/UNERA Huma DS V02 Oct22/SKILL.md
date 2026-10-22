---
name: unera-design
description: Use this skill to generate well-branded interfaces and assets for Huma (Unera Stablecoin), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets plus the UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

**Start with `CLAUDE.md`.** It is the Principal Product Designer operating manual for this project: how to create/edit Huma pages, the source-of-truth files, the wallet-prompt model, the transactional-flow anatomy, the recurring bug traps, and the pre-ship consistency checklist. Treat it as the agent persona and rulebook; this SKILL.md is the quick-reference beneath it. For the step-by-step build/edit recipe, follow `skills/build-or-edit-a-page.md`.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Huma in one breath
Institutional teal-navy stablecoin app. **One Flow. Many Lives. · Value, Shared by Design.** Calm, trustworthy, human. Deep Blue chrome, solid fills (no product gradients), one grotesk family, explicit financial semantics, Humanity Centers front and center.

## Must-not-break rules
- Deep Blue `#173d47` anchors everything; **Yellow `#ffffab`** is an accent on dark surfaces only.
- Brand color ≠ money color. Use `--fin-up #1a7a5e` / `--fin-down (#ab5770)` / `--fin-neutral` for amounts, always with a directional icon. Stepper progression is Deep Blue, not green.
- No CSS gradients on product UI: white canvas + per-card `color-mix()` tints. Page titles are solid Deep Blue (no gradient text).
- No left-border accent boxes. Inline tip / info / callout boxes use the **send-action rounded style**: fully rounded (`border-radius: 0.5rem`), `border: none`, soft tinted fill (`--surface-fee-green-soft` for tips, `--surface-warning-soft` / `--surface-error-soft` for warnings/errors), `padding: 0.75rem 1rem`, flex row with a 20px leading icon. Never `border-left: 4px solid` + half radius. Reference: `unera-pages/send-enhanced.html` `.amount-tip`.
- One font: TestFoundersGrotesk (Oakes Grotesk fallback). Weight/size make hierarchy.
- Icons: Material Symbols, inline SVG, `fill="currentColor"`. No emoji except the MetaMask fox in the wallet badge.
- Accessibility is baseline: skip link, visible focus (Deep Blue on light, Yellow on nav), 44–46px targets, reduced-motion, semantic HTML.
- Cards: 20px radius, subtle tinted border, soft shadow, hover lift. The nav is a 44px sticky Deep Blue spine. Don't fork it per page.

## How to build
1. Link `styles.css` for all tokens + the brand font.
2. Reuse components from `components/` (Button, Badge, Card, Avatar, Stepper, Input, Select, Checkbox, WalletPill) via `window.<Namespace>`, or copy the patterns from `ui_kits/consumer-app/` (its `consumer-app.css` + `icons.jsx` are a ready product CSS layer).
3. Pull logos from `assets/logos/` (`huma-*.svg` for the consumer app; `unera-*.svg` only for stablecoin/issuer surfaces). Keep copy in Huma's voice (sentence case, `you`/`we`, explicit financial reassurance, periods on taglines).
4. Read `readme.md` for the full content + visual + iconography foundations and the anti-pattern table.

## Writing

Copy is part of the design. Follow `skills/human-writing/SKILL.md` for every string, every heading and every doc line: lead with the fact, keep em dashes out of UI copy (use a full stop, a comma, a colon, or `·` for metadata), clear the skill's §2.1 word list, use straight quotes, keep headings in sentence case, and treat the MetaMask fox as the only sanctioned emoji. Run `python3 skills/human-writing/scripts/ai_tells.py --summary <files>` and clear it before hand-off.

## Edge cases & error states (prototypes)
Any flow/screen with edge cases must expose them through the **edge-case demo bar**: a prototype-only control strip at the top of the page content with `Happy path` pills that toggle each error/terminal state. Follow `guidelines/edge-case-demo-bar.md` exactly (HTML/CSS/JS template + rules); the live specimen is `guidelines/edge-case-demo-bar.card.html`, and the reference implementations are `unera-pages/account-settings.html`, `add-money.html`, `send-enhanced.html`, `trade.html`, `exchange.html`. Demo state is in-memory only. Never persist it.
