# CHANGES — 0908 public layer (Movmint-inspired mission + use cases)

Decision source: Kevin (Slack, 09-07/09-08) with Eric seconding — "everything like movmint,
but more humane and softer"; simplify the public stablecoin layer; add a use-cases page
(everyday transactions + humane purposes); ethena.fi for mission topology, PYUSD/usdc.com
for use-case structure; movmint for data/interactive components.
Full analysis: `_audit/feedback-audit-2026-09-08.md`.

## Round 2 — motion polish (0908, user request: "audit, identify what can be improved about effect/motion/animation, improve accordingly")

Self-audit vs the Movmint recording found five gaps; all implemented:

1. **Hero entrance was one slab** → staggered entrance (eyebrow → headline → copy → CTAs →
   chips → globe), 70–90ms steps on a soft-landing curve (`uFadeRise`).
2. **Globe read flat** → faint equator/meridian graticule for depth, landing ripple where an
   arc arrives, canvas bumped to 560px.
3. **Flow chart was too sparse vs MoneyGrid** → two staggered lights per lane, per-lane pace
   variation (4.6–6.5s), and an arrival glow that blooms at the destination chip.
4. **Charts had no live "value" anchor** (Movmint pins a rate to the line) → `husd-trend`
   gained `data-tag`: an endpoint value chip ($1,284.6M on supply, $1.00 on the peg).
5. **Sections revealed as one block** → `husd-reveal` gained `data-stagger` /
   `data-stagger-items`: header first, then cards one after another (110ms apart); applied
   to "Built like infrastructure" and "Where hUSD fits".

All additions keep the softness rules: eased, unhurried, reduced-motion-safe, paused offscreen.

## Added

- `assets/motion/husd-motion.js` — motion library (web components, canvas):
  `<husd-globe>` rotating dot-globe with gentle arcs · `<husd-flow>` value-flow diagram
  with travelling comet dots · `<husd-trend>` draw-in area chart with travelling glow ·
  `<husd-reveal>` rise-on-scroll wrapper. All pause when offscreen or the tab is hidden;
  `prefers-reduced-motion` gets static frames.
- **Overview / Mission screen** (`mission`) — public home: hero + globe, how-hUSD-works
  flow diagram, live proof band (counters + supply chart), For-humanity yield section with
  monthly routing receipts, infrastructure cards, CTA.
- **Use cases screen** (`usecases`) — tabbed (Pay · Send · Save · Give) with demo cards,
  "Where hUSD fits" grid, honest scope note, CTA.

## Changed

- Public nav simplified to Overview · Use cases · Proof of reserve (mobile drawer too);
  signed-in nav unchanged.
- Public landing + public logo click: PoR → Overview. Signed-in logo click still goes to
  PoR (Kevin 07-24 decision preserved). Log-out lands on Overview with the signed-out notice.
- State: `ucTab` added.

## Not changed

- All authenticated screens (Portfolio, Get, Redeem, Activity, PoR, Docs, Settings,
  Wallets, Notifications), tokens, components, auth kit.

Backup: `UNERA hUSD Portal v4 (pre-0908-mission).dc.html`.
