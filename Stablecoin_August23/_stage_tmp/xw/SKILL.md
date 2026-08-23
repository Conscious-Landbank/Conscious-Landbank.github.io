---
name: unera-stablecoin-design
description: Use this skill to generate well-branded interfaces and assets for the Unera Stablecoin Portal: issuance, redemption and proof-of-reserve surfaces, for production or throwaway prototypes/mocks. Contains the design guidelines, colors, type, fonts, logos, and UI-kit components.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out
and create static HTML files for the user to view, linking `styles.css` for the design
tokens. If working on production code, copy assets and read the rules here to become an
expert in designing with this brand.

Key things to honor (see `readme.md` for the full system):
- **Near Black `#1d1d1f`** is the institutional spine (Apple-style chrome: nav, primary buttons, titles); **Signal Yellow `#ecd6a0`** is the
  Stablecoin signature accent (a soft warm yellow, on dark surfaces only); **Verified Teal
  `#127c72`** is for on-chain proof / attestation. Depth tones: **Ink `#102b32`** + **Teal `#2f7682`**.
- Money direction is `--fin-up` / `--fin-down`, never a brand accent. Stepper progression
  is Deep Blue, never green. Proof-of-Reserve asset classes use the fixed `--por-*` colors.
- One grotesk family (TestFoundersGrotesk); weight + size make hierarchy. Crisp near-white
  canvas, 14px card radius (toned down), tight blue-tinted shadows, restrained motion. No
  product gradients, no decorative emoji.
- The launch token is **hUSD** (USD-pegged, fiat-backed). The layer does exactly two things:
  **Mint** (issue) and **Burn** (redeem). Never swaps, payments, governance, or donations.
- Reserve interest reaches **Humanity Centers** automatically via the **Passive Reserve Yield**
  stream; the **Swiss Association** holds final allocation authority. Donations themselves are a
  **Huma Platform** surface. This portal describes and evidences the stream and links out; it
  never hosts a donation flow. Say "Humanity Centers", "Huma Platform", "Huma Points",
  "Impact Points"; never "mint/burn" in donor-facing Humanity Center copy.
- The nav is the shared 44px Deep-Blue spine with a "STABLECOIN" app-pill.
- Writing: every human-facing string (UI copy, microcopy, errors, empty states, docs,
  change logs, hand-off notes) follows `skills/human-writing/SKILL.md`. Run
  `python3 skills/human-writing/scripts/ai_tells.py --summary <paths>` before hand-off and
  clear every hit or record it in the exception list in `CHANGES-WRITING.md`.

If the user invokes this skill without other guidance, ask what they want to build, ask a
few questions, and act as an expert designer who outputs HTML artifacts or production code.
