# Responsive mobile / PWA standards (Eric's bar, distilled 1-4 Sep 2026)

Every consumer page ships PWA-ready. Eric reviews on a real Android phone (Chrome, ~360-414 px), so these are acceptance criteria, not polish. Apply them while building, then verify. Never wait to be asked.

## Hard gates (fail any of these = not done)

1. **Zero horizontal overflow at the Kevin device matrix (Slack, 27 Aug 2026).** Phones from 6.1 in per statcounter Canada/US top resolutions: 414, 390, 393, 375, 402, 360 CSS px. Computers and iPads 9 to 14 in: 768, 834, 1024, 1280 CSS px. The project has breakpoints at 375 and 400 px, so 360 alone does not prove the 376 to 400 band; test at least 360, 390 and 414. The harness defaults now cover all six phone widths; pass `?w=768,834,1024,1280` for the tablet band. Run `unera-pages/_responsive-audit.html` (it logs offending elements) or an equivalent `eval_js` scroll-width probe on every step, modal and terminal state of the page, not just the first screen.
2. **Touch targets 44px+**, and no hover-only controls: anything that opens on hover needs a tap path (`hover:none` media check; e.g. the donate eye button opens a centered sheet on touch).
3. Test EVERY flow state at mobile width: each stepper step, each demo/edge pill, modals, terminals. Most regressions hide mid-flow.

## Row and value layout (receipts, summaries, confirm/detail rows)

- Labels stay on ONE line (`white-space:nowrap` where needed); wordy labels get shortened or moved into a ⓘ tooltip (keep the full label for screen readers).
- Values are RIGHT-aligned. A long value drops to its own right-aligned line under the label; it never squeezes into a one-character column. Root cause to avoid: `flex-shrink:0` on labels.
- Two-part values ("1 hUSD = $1.00", "~0.00002 ETH · ~$0.05") split at the dot into two stacked right-aligned lines on ≤560px, the second line smaller.
- Copy buttons next to LONG values (hashes, addresses) drop below the value, right-aligned, on ≤560px. Next to short values they stay inline.

## Buttons, chips, fields

- CTAs: thin and full-width when stacked. Trap: `.btn-actions .btn{flex:1 1 10rem}` turns 10rem into HEIGHT once the layout goes column — use `flex:0 0 auto` in column layouts. Base `.btn` carries `width:100%`; inside flex rows reset to `width:auto` + `flex-wrap:wrap`, with a ≤560px rule that stacks full-width.
- Chip rows (quick amounts, currency pills): wrap cleanly or horizontal-scroll with hidden scrollbar; never overlap a neighbor.
- Field + button groups (address + Paste + QR, card inputs): each stretches to the full line on ≤480px.
- Card/method pickers: uniform full-width rows with one shared height when stacked. Icon-topped stacked cards center heading, sub line and check with the icon (watch specificity against a later `text-align:left` base rule).

## Structure at phone widths

- Steppers fit the viewport: steps share the line equally, labels wrap, connectors shrink. No fixed-width steps behind an unsignposted scroll.
- Decorative outlines/padding drop on mobile when an inner box already frames the content (swap panel, confirm summary boxes); reclaimed space goes to the inputs. Amount inputs keep a ch-based floor (5-8ch) so typed values never clip.
- Terminal/receipt wrappers use 0 side padding ≤640px (product standard); one callout family, icon LEFT of text (force `flex-direction:row` if a shared class sets column).
- Grid pages: `min-width:0` on tracks AND cards; wrap on header rows.

## Known traps that caused real regressions

- `[hidden]` vs class display: any class with `display:flex|grid` needs a paired `.x[hidden]{display:none}` (or `!important`).
- Absolutely-centered controls over variable-height siblings (swap flip button) land wrong at phone widths — put them in flow at the seam.
- Nav must be self-sufficient per page (dropdown CSS inlined), or the account menu renders open in flow and forces overflow.

## Verify by DOM, not vibes

`eval_js` at 360/390/414 (and the tablet band when layout changed above 640 px): `document.documentElement.scrollWidth <= innerWidth`, computed styles on the rows above, and walk the flow programmatically. Log the result in the change note.
