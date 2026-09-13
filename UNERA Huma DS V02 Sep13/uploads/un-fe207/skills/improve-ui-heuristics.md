# Skill: Improve UI with research-backed heuristics (small change, big impact)

Use when the user says something "looks plain / not good enough / do proper research and improve." They want tasteful, credible-product-grade lifts — NOT a redesign, NOT new colours or components.

---

## Rules of engagement
1. **Smallest change, biggest impact.** One well-placed treatment beats a rework. Never introduce a new colour, font, or component — only the design system's tokens/patterns.
2. **Cite the principle** you're applying (NN/g heuristic, a Law of UX, or a named product's pattern) so the improvement is defensible, then implement it with existing styles.
3. **Money vs brand colour** stays sacred: `--fin-up` for money/impact, Deep Blue for structure/steps, Yellow as accent. No gradients on product UI.

## High-leverage moves that worked here
- **Elevation for hierarchy** (Material): flat 2px borders → 1px border + `--shadow-card`; stronger lift + tinted border on hover for clickable cards.
- **Von Restorff / scannability:** give stat cards a coloured 3px top accent (green=money, blue=structure, yellow=Huma Points) instead of identical tinted boxes; display-font numerals with `-0.01em` tracking.
- **Aesthetic-usability:** replace flat metric strips with the brand graphic-device hero panel (Deep Blue + organic blobs, yellow eyebrow + KPIs).
- **Recognition over recall (checkout UX):** real photo thumbnails on selectable rows; a persistent "order" context strip mid-flow ("Donating to … · Change"); explicit checkmark on the selected option, not just a border.
- **Impact framing (charity: water / GoFundMe):** show "$50 ≈ school supplies for 5" live as the amount changes — turns an abstract number into a decision.
- **Jakob's law / consistency:** use the platform's own empty-state, dropdown, list-row, and terminal-state patterns so the feature feels native.
- **Segmented control** for in-page tab groups (contained pill group on `--neutral-100`, elevated active pill) beats loose underlined links.

## Guardrails
- No data slop: add a stat/number/icon only if it aids a decision. One thousand no's for every yes.
- Ask before adding whole new sections or copy — the user knows their audience.
- Keep copy matched to the page verb (donate/send/swap); delete leftover copy from any forked page.

## Verify
- Screenshot before/after at desktop + mobile; confirm contrast and touch targets survive the change (run the responsive-a11y pass).
