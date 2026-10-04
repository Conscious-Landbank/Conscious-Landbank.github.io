# Feedback fixes · 1 Sep 2026

Update 3 Sep (Eric's twenty-third batch — merged review callouts):
- Send review: the "You'll confirm once…" and "Once sent, this cannot be undone…" notes merged into ONE green callout, two lines separated by the callout's divider.
- Same merge on donate's Review & pay (prompt-count line + irreversibility note share one callout; the ⓘ tooltip and dynamic prompt text keep working — promptCountLine kept its id, lost its own background).
- Exchange keeps separate notes (its prompt note sits apart from the countdown line, no adjacent pair).

Update 3 Sep (evening) — full-product audit against Eric's mobile standards:
The day's feedback distilled into standards: no clipping/overflow at 360-440; receipt/summary rows keep labels one line with RIGHT-aligned values (long values on their own right-aligned line, two-part values stacked); wordy labels shortened or tooltipped; one callout family (icon left); stacked icon-cards center their text; CTAs thin and full-width; chip rows scroll or wrap without overlapping; steppers fit the width; decorative outlines dropped on mobile; copy buttons below long values; field+button groups stack full-width; touch-visible previews.
- Overflow harness re-run over all 20 pages at 360 and 414 px: zero horizontal overflow anywhere.
- Pattern sweep found and fixed three stragglers: payment-methods' add-card modal still used the half-width Paste-button layout (now full-line, like send/payee); purchase-receipt's mobile rows stacked left-aligned against the right-aligned standard (both `.receipt-dl-row` and `.confirm-detail` now wrap with right-aligned values); verified donation-history's receipt actions and the banner bodies use row-wrap (their rem flex-bases are widths, not heights — safe).

Update 3 Sep (Eric's twenty-second batch — swap panel outline + clipped numbers, follow-up):
- On ≤480px the swap panel drops its outline, background and padding entirely (the boxes carry the visual frame), and each box's padding tightens — the reclaimed ~50px goes to the amount inputs, whose floor rises to 8ch so "2,490.01" fits without clipping.
- Also repaired a corrupted `.swap-box` rule (`}5rem;` fragment) that was killing the border-color transition.

Update 3 Sep (Eric's twenty-first batch — copyable hash rows):
- In the transaction-detail modal the copy button now drops below the hash (right-aligned) on ≤560px, giving the value the full row width instead of a one-character column. Fixed in wallet-enhanced and wallet-edge (shared `copyValueRow` component); other copy buttons (add-money transfer details) sit beside short values and don't squeeze.

Update 3 Sep (Eric's twentieth batch — transaction-detail status stepper):
- The "On-chain status" stepper (Approved — Transfer — Settled) was clipping at the modal edge on 360px (fixed 68px steps + overflow scroll with no indicator). Steps now share the line equally with wrapping labels and shrinkable connector bars, so the whole stepper fits the width. Fixed in wallet-enhanced and wallet-edge (same component).

Update 3 Sep (Eric's nineteenth batch — add-money Review & Confirm two-part values):
- "1 hUSD = $1.00 USD" and "None · Huma delivers your tokens" now render as two stacked right-aligned lines on ≤560px ("1 hUSD" / "= $1.00 USD"; "None" / "Huma delivers your tokens" without the dot) — one line on desktop. Applied to the amount-step rate row, the confirm rate row, the checkout rate row and the wallet-prompts row (static + JS-written values).

Update 3 Sep (Eric's eighteenth batch — send review network fee):
- The network-fee value ("~0.00002 ETH · ~$0.05") right-aligns like every other value; on ≤560px it splits at the dot into two stacked right-aligned lines (ETH, then a smaller fiat line), matching the Total-deduction treatment. ⓘ button stays beside it.

Update 3 Sep (Eric's seventeenth batch — wallet-address row on small screens):
- Send: the address field, Paste and QR buttons each stretch to the full line on ≤480px (previously the field was squeezed beside Paste).
- Same fix on payee-management's add-payee modal (field + Paste).

Update 3 Sep (Eric's sixteenth batch — transfer-details rows in add-money):
- Labels ("You send", "Destination") stay on one line (`white-space:nowrap`); long values like "Zürich, Switzerland" or "250.00 USD · via MoneyGram" wrap onto their own right-aligned line(s) under 560px — same standard as the exchange confirm rows. Applies to all confirm/transfer/checkout rows on the page (shared `.confirm-detail`).

Update 3 Sep (Eric's fifteenth batch — method-card text centering, follow-up):
- The 480px centering rule for the payment-method cards was losing the cascade to the base `.pm-choice { text-align:left }` declared later in the sheet — headings looked centered (flex item centering) but wrapped sub lines stayed left-aligned. The rule now carries higher specificity (`.saved-method-card.pm-choice`), so heading, sub text and check all center under the icon.

Update 3 Sep (Eric's fourteenth batch — donate review callouts + center row):
- The two review callouts now share one layout: icon top-left, text beside it. The prompt-count card was inheriting the callout family's column direction, which centered its icon above the text; forced to row (icon left, text right), matching the irreversibility card.
- Humanity Center row on mobile: label on top, then a single line of eye + "name · location" — the text takes the remaining width beside the eye instead of dropping below it; row padding tightened.

Update 3 Sep (Eric's thirteenth batch — swap receipt wording on mobile):
- "Estimated at review" / "Actually received" shorten to "Est. at review" / "Act. received" on ≤560px (full wording stays on desktop; screen readers always get the full label).
- Difference row shows just the % — "adjusted automatically, no new order needed" moved into a ⓘ tooltip on the label (same fee-tooltip pattern).

Update 3 Sep (Eric's twelfth batch — swap confirm step):
- Confirm summary: on ≤560px the inner outlined box drops its border and 2rem padding (the step card already frames it), rows wrap with right-aligned values, sublabels ("to LPs", "after slippage") become sub-lines. No more one-word columns.
- "This needs 2 wallet confirmations" note: joined the send/donate green callout family, and its text now flows as a normal sentence — `.fee-info-wrap`'s inline-flex was tearing the words into columns on narrow screens (the ⓘ button stays inline).
- "Price refreshes in Xs" sits tighter above it for one organized block.

Update 3 Sep (Eric's eleventh batch — swap amount + rate/fee card at 360px):
- Amount inputs keep a 5ch floor on ≤480px (with a slightly smaller font and tighter token toggle), so a typed or quick-picked amount never clips.
- Rate/fee summary card: labels shrink and wrap, values right-aligned with long values dropping to their own right-aligned line (same standard as the receipts); "to liquidity providers" renders as a sub-line under "Swap fee" instead of inline.

Update 3 Sep (Eric's tenth batch — swap panel on small screens):
- Flip button: was absolutely centered on the whole swap panel, but the "You pay" box is taller (quick chips), so at phone widths the 50% midpoint landed on the chips. It now sits in flow at the seam between the two boxes (negative margins, self-centered) — correctly in the middle at every width and content height.
- Quick amounts (100 / 500 / 1,000 / Max): horizontally scrollable on ≤480px (no wrap, hidden scrollbar) per Eric's suggestion.
- Audited other chip rows: donate's quick amounts wrap cleanly with no overlapping neighbor; no other absolute-centered controls over variable-height siblings found.

Update 3 Sep (Eric's ninth batch — narrow send receipt):
- Send's success/processing wrapper carried 2.5rem side padding (exchange/add-money use 0), so its receipt rendered visibly narrower. On ≤640px the padding drops to match the product standard; donate's terminal-state got the same treatment in donation-shared.css.
- Fixed the verifier-caught scope bug: reviewTotal's gas figure now travels through `fields.gasFiat` instead of the out-of-scope `_sg`.

Update 3 Sep (Eric's eighth batch — send review):
- Total deduction on mobile breaks into two right-aligned lines: the amount, then "+ ~$0.05 gas" (smaller); desktop stays one line.
- The "You'll confirm once…" note and the irreversibility callout now share one card design (the green-soft rounded callout) — fixed on send review AND the same pair on donate review (prompt-count line). Exchange has no adjacent callout pair; its hint stays.

Update 3 Sep (Eric's seventh batch — success-page consistency):
- Audited every flow's success page against one standard: 2rem display gradient-clipped title, 2.5rem amount, `.success-details` on neutral-100 / 0.5rem radius / 1.5rem padding, 0.875rem label/value rows, right-aligned values on mobile. add-money, exchange and donate already matched; send-enhanced's amount was 3rem — normalized to 2.5rem with the shared margin.
- Removed the orphan closing braces the earlier receipt-rule replacement left in add-money, exchange and send (harmless to CSS parsers, but they were the "different from other pages" risk of breaking later rules).
- Eric's screenshot shows the small-caps stacked receipt from the deployed build; the current build already uses the unified right-aligned layout everywhere.

Update 3 Sep (Eric's sixth batch — confirm-step cards):
- add-money confirm step: the "Benefits of adding now" box now uses the same card family as the "No wallet signature needed" hint above it (same cloud-blue tint, radius, padding, icon-left layout). No other adjacent mismatched card pairs found in the flows.

Update 3 Sep (Eric's fifth batch — add-money method picker):
- Payment-method cards (Card · Bank transfer · Wise · MoneyGram): when they stack on ≤480px the icon self-centers, so the heading, sub line and check now center with it. Saved-card rows (no icon) stay left-aligned; exchange's wallet cards were already centered — no other icon-topped stacked cards in the product.

Update 3 Sep (Eric's fourth batch — receipt alignment):
- Mobile receipt rows keep values RIGHT-aligned for consistency (replaces the brief label-over-value-left layout); a long value drops to its own right-aligned line under the label. Applied in donation-shared.css and the local copies in exchange, send-enhanced, add-money.
- Huma Points row: amount on one line, the ESTIMATED/CONFIRMED chip on a second line, both right-aligned — on donate terminals (success + pending) and the donation-history detail modal.

Update 3 Sep (Eric's annotated mobile screenshots, third batch — terminal receipt):
- Mobile receipts (`.success-details`) now read as one uniform list: small-caps label on top, value below, every row the same shape with tighter rhythm. The previous wrap rule left short rows one-line right-aligned and long rows ragged — the clutter Eric circled.
- Applied product-wide: donation-shared.css (donate terminals + donation-history detail) and the local copies in exchange, send-enhanced and add-money. trade.html skipped (unlinked).
- The thick "Back to centers" in the screenshot is the same flex-basis bug fixed earlier today; the screenshot predates the fix.

Update 3 Sep (Eric's annotated mobile screenshots, second batch — Review & pay):
- Humanity Center review row: on ≤560px it stacks label over value, left-aligned (eye + "name · location" no longer center-wrap raggedly). Multi-center allocation rows stack the same way.
- Card picker on the payment block: on ≤560px the card chips and "Add new card" all stretch to full screen width with one shared height (64px), stacked vertically.
- Audited the rest of the product: add-money's saved-card/method pickers already render as uniform full-width rows; no other ragged chip pickers found.

Update 3 Sep (Eric's annotated mobile screenshots):
- Center list rows (donate step 1): on ≤640px the row becomes a grid with the eye button under the image, giving the name/meta text the full remaining width (per annotation) instead of one word per line.
- Eye button dead on touch: `#hcHoverCard` was `display:none` under `hover:none`. The preview now opens as a centered sheet on small screens (scrollable, "tap the eye again to close" hint); anchored popover stays on desktop.
- "Review donation" button ~160px tall on mobile: `.btn-actions .btn{flex:1 1 10rem}` made 10rem the HEIGHT once the ≤640px column layout kicked in. Now `flex:0 0 auto` in the column layout (donation-shared.css, fixes all donation pages at once).
- Amount live summary cluttered: impact rows ("Your impact / At $50…") now stack label over value, left-aligned, on ≤560px; money values right-aligned.
- Audited add-money, exchange, send for the same traps: their column button layouts use auto basis (no thick buttons), no hover-only controls found.

Update 3 Sep (Kevin's replies 11-15, donation flow):
- Review and Payment merged into ONE step: the flow is back to 4 steps (Center · Amount · Review & pay · Done). The payment block (card picker, or receiving account + reference + expiry for bank transfer) renders under the order and cost summaries on the same screen; one button pays ("Pay $X" / "I've started the transfer"), so going back is one click and nothing is re-entered.
- Currency selection stays on the Amount step (Kevin: bank transfer needs the currency before the USD conversion). Only the card entry sits at the end, inside Review & pay.
- Non-USD bank transfer now shows a suggested-rate quote line on the Amount screen, same pattern as crypto: "≈ $X USD we receive · suggested rate 1 EUR = $1.08".
- Failed card payments land on the fail terminal; "Try payment again" returns to the merged Review & pay step with the error banner and the reviewed order intact.
- `_donate-flow-test.html` updated to the merged flow.

Update 2 Sep (Eric's reply 10, donation review + amount screens):
- Quick-view eye added before the center name on the review screen; opens the same pinned preview as step 1.
- "via Uniswap, best of the USDC and USDT routes" removed everywhere a user reads it (amount quote line, review USD quote, conversion terminal, tracker copy). Conversion is described as handled by our system at the best available rate.
- "Processing fee" renamed "Platform fee" and shown as green FREE (fee = 0 for now, hook kept for a future rate) on the amount screen, review costs, payment step, and terminals. Fee note updated in donation-data.js.
- Approve is an off-chain signature: the two gas rows collapsed into one "Estimated network fee" with the note that the exact fee appears in the user's wallet at signing. Confirmation line now reads "2 wallet signatures: an approval that costs nothing, then the donation itself"; the ⓘ tooltip explains it.

Source: Eric's replies on the 31 Aug Slack status thread (#collab-agile).

## 1. Payment moved after review (donate.html + donate-flow.js)
Eric: users review the order, then process payment, then done — so a failed payment retries without redoing the order.
- Donate flow is now 5 steps: Center · Amount · Review · Payment · Done.
- Fiat: review shows "Card details / Receiving account — next step". "Continue to payment" leads to the new Payment step: card picker + total for card, or the receiving account + reference + expiry for bank transfer.
- Failed or expired card payments end on a terminal with "Try payment again", which returns to the Payment step with the reviewed order intact.
- Crypto: unchanged order (payment = wallet signatures, already after review); the tracker now runs inside the Payment step.
- Kevin's earlier rules kept: method before currency, fee on top, no destination/tax-receipt rows.
- add-money.html already had this order (amount → method → confirm → checkout/transfer with declined-card retry) — verified, no change.

## 2. Quick view removed (explore-centres.html)
Eric: the card already shows the quick-view information. Dialog, card button, CSS and JS removed. The quick preview stays only in the donate flow step 1 (eye button), which Eric called out as good.

## 3. Donation flow responsive on mobile (donation-shared.css)
Eric's PWA screenshot: review rows overflowed and squeezed values into one-character columns. Cause: `.summary-row-label{flex-shrink:0}` — long labels forced max-content width. Labels now shrink and wrap; values may drop to their own right-aligned line; terminal receipt rows wrap under 560px. Applies to donate, donation history and centre pages that share the stylesheet.

## 3b. Project-wide responsive audit (1 Sep, follow-up)
Every consumer page was loaded at 360, 390, 768 and 1280 px via `unera-pages/_responsive-audit.html` (keep it; it logs any horizontal overflow with the offending elements). Found and fixed:
- dashboard-enhanced.html + donations.html: `.dash-grid` children could not shrink below content width, overflowing small phones. Added `min-width:0` to tracks and cards, wrap on header rows.
- account-security.html, purchase-receipt.html, proof-of-reserve-public.html, kyc-verify-new.html: the base `.user-dropdown-nav` rules were missing (only the compound overrides load from consumer-app-nav.css), so the account menu rendered permanently open in flow and pushed the page wider than the desktop viewport. Injected the dropdown CSS family from account-settings.html (nav is infrastructure; each page must be self-sufficient).
- portfolio.html deleted (was a redirect stub); zero references remain.
Re-run after fixes: no overflow on any page at any tested width.

## 5. Functional verification (1 Sep, second audit pass)
`unera-pages/_donate-flow-test.html` drives donate.html end-to-end at 360 px: card (review → Pay $ → tracker → done), bank (review → transfer details with DON- reference → pending terminal), crypto (review → confirm → tracker), and the failed-card path (fail terminal → "Try payment again" → back to the Payment step with the error banner and the reviewed order intact). All pass, zero horizontal overflow at every step. 5-step stepper confirmed on all rails.

## 4. Wallet + Portfolio merged, separate Portfolio retired
Merged earlier today from Eric's edited file; edge/error machinery preserved. Follow-up (1 Sep audit): the PORTFOLIO nav item removed from all 21 pages, the per-page visibility sync script stripped, and portfolio.html replaced with a redirect stub to wallet-enhanced.html so old links keep working.
