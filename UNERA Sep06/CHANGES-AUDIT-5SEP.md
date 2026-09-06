# Responsiveness audit, 5 Sep 2026

Trigger: Kevin's Slack note (27 Aug 2026, #C0A524F4P7F) setting the target devices: computers and iPads from 9 to 14 inches, and all phones from 6.1 inches per statcounter Canada (top widths 414, 390, 393, 375, 402, 360 CSS px; US is near identical).

## What was tested

- `unera-pages/_responsive-audit.html`: 25 consumer pages at 360, 375, 390, 393, 402 and 414 px, then at 768, 834, 1024 and 1280 px for the iPad and laptop band. Scroll-width probe per page, offenders logged by DOM path.
- `unera-pages/_responsive-audit-flows.html`: every stepper step of donate, add-money, exchange and send-enhanced at 360, 390 and 414 px.
- wallet-edge, donate and donations dropped frames on the first pass (iframe timing, not a page fault); re-run individually with a longer settle and confirmed clean at all six phone widths.

## Result

Zero horizontal overflow on every page, width and flow step. No design changes were needed.

## Files changed

- `unera-pages/_responsive-audit.html`: default widths now the six statcounter phone widths; tablet band via `?w=768,834,1024,1280`.
- `unera-pages/_responsive-audit-flows.html`: added 390 px so the 376 to 400 breakpoint band is covered (the project has breakpoints at 375 and 400).
- `skills/responsive-mobile.md`: hard gate now names the full Kevin device matrix instead of 360/414 only.
