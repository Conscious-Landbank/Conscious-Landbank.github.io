# Audit fixes · 31 Aug 2026

Source: re-audit of FE-207 / FE-208 / FE-217 / FE-218 / FE-219 (Jira + linked Slack threads) against the pages, after the 30 Aug pass.

## Verified, no change needed
- FE-207: all description + comment items shipped (smaller quick actions under Portfolio, Get Started / Launch App by login state, merged donation-first Dashboard, 1200px width standard, portfolio value-over-time graph on portfolio.html).
- FE-217: method before currency, currency selector only for bank transfer, no FX for card, receiving account + Wise / MoneyGram shipped in add-money.html. Wallet quick actions already read Buy · Send · Swap · Donate (Kevin: "change trade to donate").
- FE-218: every accepted point from the #collab-agile swap thread is live in exchange.html.
- FE-219: Backlog, Low, deferred by Renol. Kevin's buy-with-crypto notes (deposit address per account, expiration date, BTC/ETH rate note, drop wallet-select step) belong to this ticket; carry them into the stablecoin-portal buy flow when it starts.

## Changed in this pass — Kevin's 28 Aug "remove these 3" propagated everywhere
Kevin (FE-217/219 thread, after Renol shared the 28 Aug build): remove card currency, destination, tax receipt. The donate review step already complied; these spots still leaked:

- `donate-flow.js`: "Destination type" row removed from the conversion-pending and success terminals; success subline no longer names the multisig / fiat account, it says the donation was routed to the center.
- `donation-history.html`: "Destination type" row and `destLabel()` removed; the three "Tax receipt" detail rows and the "Download receipt (PDF)" action removed.
- `notifications-bell.js` + `shared/notification-catalog.js`: "Tax receipt available" seed notifications removed.
- `donate.html`: KYC gate copy no longer promises tax receipts.
- Card currency was already compliant (selector only for bank transfer, no card-currency row).

Data fields (`receipt`, `destination` in donation-data.js) stay on the records for BE parity; they are just not rendered.

## Still open (decisions for Eric / Renol)
- Whether hUSD should leave the Huma buy picker entirely (call notes: USDC/USDT are the Huma release; hUSD is the stablecoin portal / FE-219).
- FE-218 ticket can move out of READY: design-side work is complete.
- FE-207 items that only exist as comments on a Done ticket (landing touchpoint, width standard, Trade unlink) may deserve a small follow-up ticket so they are not lost.
