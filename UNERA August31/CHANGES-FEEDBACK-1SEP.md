# Feedback fixes · 1 Sep 2026

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
