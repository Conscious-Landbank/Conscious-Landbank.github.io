# Audit fixes · 30 Aug 2026

Source: `uploads/Archive/UNERA-Aug25-task-review.md` (Eric ↔ Minh call, 25 Aug) audited against the current pages. Decisions taken by Renol on the 30 Aug form: keep the DASHBOARD nav label, skip the Portfolio page split, unlink Trade without deleting the page, keep `donations.html`, no History tab, standard content width 1200px, FE-219 later.

## Verified as already shipped
- FE-207: quick actions smaller and under the Portfolio block, landing menu Get Started / Launch app by login state, Trade out of the TRANSACT dropdown, login lands on `dashboard-enhanced.html`.
- FE-208: donation fiat flow (Card + Bank transfer, method before currency, receiving account with reference and expiry) and crypto flow (USDC/USDT, background settlement), merged donation-first Dashboard with My Impact · Centers tabs, guest hide rules, HC preview popup in donate step 1, multisig block and donation-tier table removed from the HC detail page.
- FE-217: buy flow is method first, currency selector only for bank transfer, no FX shown for card, bank account details plus Wise and MoneyGram on the transfer step.

## Changed in this pass

### Trade unlinked (§1.6 follow-through)
- `wallet-edge.html`: the "Trade on the order book" quick action and the four per-asset Trade buttons are removed. Rows now carry Buy · Send · Swap.
- `_all-screens.html`: the trade.html card is removed from the index.
- `notifications-bell.js`, `notifications.html`: the `up_trade_fill` "Order filled" seed is removed.
- `trade.html` itself stays in the folder, unlinked, per Renol's call. Epic FE-144 stays Backlog.

### Standard content width 1200px (§1.5)
- `.container` max-width 1100 → 1200 in: `wallet-enhanced`, `wallet-edge`, `account-settings`, `account-security`, `dashboard-kyc-blocked`, `dashboard-kyc-retry`, `add-money`, `governance`, `proof-of-reserve-public`, `email-notification-templates`, and `donation-shared.css` (covers dashboard, donations, explore-centres, centre-detail, donation-history, donate).
- Deliberately untouched: flow pages at 720px (`send-enhanced`, `exchange`, `stake`, `trade`), `purchase-receipt` at 800px, auth cards, and the marketing `index.html` (owned by marketing).

### Trade wording sweep (FE-218 §4, partial)
- `notifications.html` subtitle: "buy, trade, and swap activity" → "buy, swap, and donation activity".
- `kyc-verify.html` benefit: "Basic Trading & Staking" → "Buy, Swap & Staking".

### FE-218 verified against the ticket's Slack thread (30 Aug, via Jira + Slack)
The only FE-218 comment is a link to the #collab-agile swap-review thread (Son · Ducke · Kevin). Every accepted point is already live in `exchange.html`:
- Platform fee kept, shown as FREE in green uppercase when 0 (Kevin's counter to Son's removal).
- "Price held for X seconds" → "Price refreshes in Xs" countdown.
- Net Received removed; only "Minimum received · after slippage".
- Approve/Swap gas split collapsed into one "Estimated gas" row with an ⓘ tooltip.
- "Once submitted, this swap can't be canceled" text gone.
- "Swap tokens through the AMM" copy gone.
- Amount quick actions: fixed chips (100/500/1,000) + Max.
- Slippage row visible on the amount step with a custom % input; deadline with custom minutes behind the advanced gear.
- Receipt shows the transaction hash as an Etherscan link.
Custom slippage/deadline "advanced" enhancement (Kevin: needs BE support) exists as the gear popover; fine for the prototype.

### Jira link notes (captured 30 Aug)
- FE-207 (Done, Highest): description links Business/index.html + two #collab-fe threads. Comment adds two bullets beyond the call notes: "Merge Dashboard + Centers ⇒ Main page {name}" (done: merged donation-first Dashboard) and "Use current Centers page as width standard - update Wallet, Transaction" plus "Include a graph for the total portfolio values over time" (done: portfolio chart, now on portfolio.html). Width: all app pages now share one 1200px standard (Renol's 30 Aug pick), which satisfies the consistency intent.
- FE-208 (READY, Medium): description links Donation_Value_Proposition.html + Confluence wiki/x/DoBKBQ and wiki/x/DQByB (the Humanity Centers 88768526 / Donation 74579981 PRDs already captured in docs/). Comment links the #collab-fe thread; read in full — one item beyond the call notes: crypto donation = user approves + transfers, then the DonationRouter forwards to the defined address. Already modeled (`promptCount()` 2 for ERC-20 / 1 for native, "Routing · DonationRouter · donateMulti" row).
- FE-217 (READY, High): description = bank transfer, show account info, Wise/MoneyGram + a #collab-agile thread link (Kevin's method-before-currency rule). All shipped in add-money.html.
- FE-218 (READY, Highest): one comment linking the #collab-agile swap thread (see above). Design-side work is complete; ticket can move.
- FE-219 (Backlog, Low): description links the same Kevin thread; stablecoin-portal buy flow (card / crypto-marked-slower / bank transfer for hUSD). Deferred by Renol.

### Portfolio split (§2.4, added later on 30 Aug)
- New `portfolio.html`, carved out of the Wallet page: summary stats (Total Portfolio / Total Assets / Largest Holding), the value-over-time chart, and the Balances rows with per-asset actions. Balances still start hidden behind Show Balances. Quick actions and the Activity feed are suppressed there with a cross-link to Wallet.
- `wallet-enhanced.html` keeps its send/receive focus: quick actions and Activity stay; the Balances header, stats, chart and asset rows are suppressed with a cross-link to Portfolio. Subtitle updated.
- PORTFOLIO added to the desktop nav on 22 consumer pages, right after WALLET. Its visibility mirrors the WALLET link's logged-in state via a small observer script; `add-money.html` uses its static logged-in nav, so it got a plain link.
- Prototype note: the moved blocks are hidden with `[hidden]` (CSS pairs added), not deleted, so both pages' scripts keep running untouched. Strip the hidden markup when this goes to build.
- Mobile drawers were not extended; PORTFOLIO is desktop-nav only for now.

## Still open
- FE-219 stablecoin portal buy flow: deferred, Backlog, Low.
- Dashboard menu rename (§2.3): done 30 Aug per Renol — the nav label is now DONATION (desktop nav, mobile drawers, account-menu item) on every consumer page; the merged page itself keeps the title "Dashboard" and the file stays `dashboard-enhanced.html`. Also fixed a mislabeled add-money nav entry (Centers link said DASHBOARD).
- Buy asset scope (§3.3): the Huma buy picker offers hUSD + USDC + USDT. The call notes say USDC/USDT are the Huma release and hUSD remains on the stablecoin portal (FE-219). Page subtitle generalized to "Buy stablecoins with fiat" on 30 Aug; whether hUSD should leave the Huma picker entirely needs Renol/Eric.
- `wallet-edge.html` activity filters still offer a "trade" type for historical entries; remove with the mock trade rows in one pass if the team wants a full purge.
