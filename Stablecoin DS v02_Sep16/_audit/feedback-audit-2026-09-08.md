# Feedback audit — 2026-09-08 (Movmint direction, Kevin + Eric)

Sources: Slack #C0A524F4P7F (Kevin, 2026-09-02→09-07) and #C0ABB2Q3BJS (review thread,
2026-09-07→09-08), plus the attached `uploads/Movmint.mp4` screen recording (47s walkthrough
of movmint.io). Kevin is the decision maker; Eric is secondary.

## What was asked

**Kevin**
1. Movmint (Vancouver, payments + FX) is the design reference worth exploring; he "would love
   everything like movmint, but the interactions must be more humane and softer than them,
   because our main theme is for humanity center."
2. 09-08: current state is good; next step is to **simplify the stablecoin layer like movmint**,
   and **add a page for use cases** covering *everyday transactions and humane purposes*.
3. Structure to follow: (a) the **mission** of UNERA stablecoin, high level — the unique
   value proposition ("for humanity"), with **ethena.fi** as the structural/topological
   reference; (b) **how UNERA Stablecoin creates value** — everyday-transaction use cases,
   referencing **PayPal PYUSD** and **usdc.com**. "Use movmint to represent data and
   interactive components, but use the above to highlight and structure components."

**Eric**
- Animation + component structure of those sites are great; apply to both Huma and
  Stablecoin portals. Additional references: stripe.com, world.org, stellar.org.
- While requirements for Huma point / Admin portal are being prepared, improve UI/UX:
  overall looks, component structure, animation, interactive components.
- No blocking feedback on the Sep-06 build.

## Movmint motion inventory (from the video)

Frames extracted to `_audit/movmint-frames/`. What carries the page:

1. **Hero globe** — dark navy hero, rotating sphere of glowing dots; arcs light up between
   points, a bright head travels the arc, endpoints bloom, then the arc breathes out.
2. **MoneyGrid flow diagram** — currency chips on both sides of a central hub; dots travel
   along bezier connectors through the hub (their signature "chart with moving effect").
3. **Live data cards** — transactions list with Completed/Processing status pills; live FX
   rate rows ticking. Data presented as evidence, animated subtly.
4. **Scroll reveals** — sections fade/rise in on scroll; tabbed "how it works" switcher
   (Cross-Border / FX / Multi-Currency / APIs) with a demo card per tab.
5. Stat chips row under the hero headline (180+ countries, 130+ currencies, settle in minutes).
6. Big grotesk headline with a gradient-tinted phrase; green CTA; talk-to-sales modal.

## How it was translated (softer + humane, per Kevin)

New motion library `assets/motion/husd-motion.js` (web components, canvas, all pause
offscreen/hidden; `prefers-reduced-motion` renders static frames):

- `<husd-globe>` — Movmint's globe, softened: very slow rotation (~80s/turn), warm gold +
  teal instead of neon green, gentle eased arcs. Gold dots = communities the yield reaches
  (legend under the hero ties the visual to the mission).
- `<husd-flow>` — the MoneyGrid equivalent: deposit chips → hUSD hub → wallet / everyday
  value / bank payout / Humanity Centers, with unhurried comet dots (≈5.3s per crossing,
  eased, faded at the ends) and a "breathing" ring on the hub every ~3.6s.
- `<husd-trend>` — draw-in area chart (1.9s ease) with a slow travelling glow retracing the
  line and a soft endpoint pulse; used for supply growth and the $1.00 peg.
- `<husd-reveal>` — gentle rise-on-scroll wrapper (0.9s, soft-landing cubic-bezier), used
  once per section, not per card.

Softening choices vs Movmint: longer durations, ease-in-out everywhere, no neon, no
infinite hero text effects, comet tails short and dim, one ambient motion per viewport.

## Screens added to `UNERA hUSD Portal.dc.html`

1. **Overview / Mission** (`mission`, public home; ethena-style topology):
   hero (statement + globe + stat chips) → how hUSD works (flow diagram + fee/scope facts)
   → proof band (live counters + supply chart, links to PoR) → For humanity (Passive
   Reserve Yield, Swiss Association, monthly routing receipts, Huma link-outs) → Built like
   infrastructure (mint/burn-only · independent KYC · layer separation) → CTA.
2. **Use cases** (`usecases`; PYUSD/USDC topology): tabbed switcher (Pay & get paid ·
   Send to anyone · Save & settle · Give & fund good) each with copy + a live-feeling demo
   card (payments list w/ status pills, single-path flow, peg chart, yield routing) →
   "Where hUSD fits" grid → honest scope note → CTA.
3. **Nav**: public visitors now see the simplified marketing spine (Overview · Use cases ·
   Proof of reserve); signed-in nav unchanged. Public landing screen moved PoR → Overview;
   logo click for public goes to Overview (signed-in keeps the 07-24 PoR decision).

## Guardrails kept

- All figures reuse the PoR page's numbers ($1,315.2M reserves / $1,284.6M outstanding /
  102.4% / $12.64M routed / $1.42M July). No "fully backed" status language; redemption
  stated as ~1 business day; issuer never chooses HC allocation (Swiss Association named).
- Use cases describe **token-level** activity (wallet, on-chain); the scope note repeats
  that this portal only issues, redeems and proves the reserve. No donation flow, no HC
  directory in-portal — link-outs to Huma Platform only.
- Motion respects `prefers-reduced-motion`; loops stop offscreen; product screens
  (Get/Redeem/PoR/Activity) untouched.

## Round 2 self-audit (0908, later): what still lagged Movmint, and the fix

- Hero entered as one slab → staggered entrance, 70–90ms steps (`uFadeRise`).
- Globe read flat → faint graticule ellipses, arc-landing ripples, larger canvas.
- Flow chart sparse vs MoneyGrid → two lights per lane, varied lane pace, arrival glow at chips.
- Charts lacked Movmint's pinned value → `data-tag` endpoint value chips on both charts.
- Sections revealed as one block → `husd-reveal data-stagger` cascades header → cards (110ms).

## Open items

- Ethena/Stripe/World/Stellar references (Eric) suggest a later pass: sticky section
  transitions and richer interactive components on the *Huma* portal too — out of scope here.
- Hero claim chips are conservative (no country/currency counts, unlike Movmint) until
  marketing signs off real numbers.
- Movmint has a "Talk to Sales" modal; our equivalent is the signup CTA. If an
  institutional-contact form is wanted, say the word.
