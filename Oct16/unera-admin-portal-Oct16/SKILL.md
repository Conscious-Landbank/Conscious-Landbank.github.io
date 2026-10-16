---
name: unera-admin-design
description: Use this skill to generate well-branded interfaces and assets for the UNERA Admin Portal (Huma + Stablecoin internal operations console), either for production or throwaway prototypes/mocks. Contains design guidelines, tokens, fonts, status system, admin components and the full portal UI kit.
user-invocable: true
---

Read the readme.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view, linking `styles.css` for tokens and fonts. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

Key rules:
- Deep Blue `#173d47` chrome, near-black ink, Signal Yellow on dark only, Verified Teal for on-chain proof, fin-up / fin-down for money. No gradients, no shadows on panels, no left-border callouts, no emoji.
- Every privileged action = confirmation with reason code (+ notes when consequential) + consequence callout + audit entry. Danger styling only for irreversible or financially consequential actions.
- Statuses use requirement vocabulary and render as label + tone + dot. Tables: sticky header, right-aligned numerics, one row action, loading / empty / error states.
- Respect the boundaries: KYC read-only (Sumsub), no analytics, no refunds, no direct balance edits, Phase 1 Huma Points = DB ledger only.

If the user invokes this skill without any other guidance, ask what they want to build, ask some questions, and act as an expert designer who outputs HTML artifacts or production code.
