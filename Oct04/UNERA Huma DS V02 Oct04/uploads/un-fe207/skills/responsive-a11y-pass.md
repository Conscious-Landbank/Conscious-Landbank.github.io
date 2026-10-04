# Skill: Responsive + accessibility pass (WCAG 2.1 AA)

Run before declaring any Huma screen done, and whenever the user asks for "fully responsive" or "pass accessibility." Fast, DOM-verified, token-safe.

---

## Responsive — check three widths: ~360 (small mobile), 768 (tablet), 1440 (desktop)
- **Toolbars & filter rows** stack to full-width column ≤640px; search input goes full-width; dropdown triggers go `width:100%; justify-content:space-between`.
- **Multi-column grids** collapse: 2-up card/method grids → 1 column ≤480px; stat grids use `auto-fit minmax(220px,1fr)`.
- **Stepper**: hide the horizontal `.stepper` ≤640px and show the compact mobile stepper (current step number + "Step n of 4" + title); keep it in sync in `goToStep`.
- **List rows**: shrink icon medallion to 44px ≤480px; drop the amount to its own aligned row ≤400px (wallet narrow pattern).
- **Buttons in horizontal flex banners**: base `.btn` is often `width:100%` — reset to `width:auto` inside rows, add `flex-wrap`, and a ≤560px rule that stacks full-width.
- **Modals**: tighten padding ≤480px; cap height with scroll.

## Accessibility
- **Contrast (the recurring miss):** warning-tone text on yellow-soft surfaces fails at #8a7820 — use ~#6e5c15 for ≥4.5:1. Never rely on colour alone for status: always label + icon.
- **Touch targets ≥44px:** quick-amount chips, period/stat tabs, copy/remove icon buttons, dropdown options. Bump padding, don't shrink.
- **iOS zoom:** text inputs ≥16px font so focus doesn't zoom the viewport.
- **Keyboard:** dropdowns/rows/modals operable by Enter/Space; Escape closes; focus returns to the trigger on close; visible focus rings (deep blue on light, yellow on dark nav).
- **Semantics:** skip link first in `<body>`; `aria-live` on status/announcer regions; `aria-current`/`aria-selected`/`aria-expanded` on tabs/dropdowns; `role="dialog" aria-modal` on modals; `prefers-reduced-motion` honored.
- **Images:** decorative photos `alt=""`; never `src=""` (it refetches the page URL and throws a console error — set `src` from JS or omit the attribute).

## Verify
- `eval_js` to read computed styles/class state at each breakpoint rather than trusting a screenshot.
- `get_webview_logs` must be clean — a `src=""` or missing-ref error means the user can land on a broken view.
