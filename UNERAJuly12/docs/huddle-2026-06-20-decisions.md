# Huddle 2026-06-20 — Design Alignment: confirmed decisions (keyed to VTT)

Full reference transcript: docs/huddle-2026-06-20-design-alignment-transcript-part1.md
This file = the actionable, CONFIRMED decisions extracted from the 90-min huddle (Phú/PM, Minh/Renol, Đức/BE, Sơn, Huệ, Hoa).

## RESOLVES the open Buy blocker
- **Buy delivers hUSD + USDC + USDT** (not hUSD-only). Kevin: besides issuing hUSD, they may also sell USDC & USDT, so Buy's receive-asset list = **hUSD, USDC, USDT only** — remove hCAD/hEUR/hGBP/hAUD/hJPY/hCHF/hNZD. [VTT 239-244]
- **No third-party provider quotes** (no MoonPay/Banxa aggregator). UNERA is the OTC seller; BE adds a **quote/price-lock server** so the rate is held briefly → keep the single-provider OTC preview + quote countdown. [VTT 292]
- Page is **"Buy Stablecoin"**, never "Add Money"; copy "Purchase". [VTT 236-241, 513]

## Buy (add-money) — confirmed spec
- **Bidirectional amount**: user types fiat → token auto-calcs, OR types token → fiat auto-calcs (like Swap). [VTT 285-296]
- **Remove the ETH network-gas line** from the Buy preview — Buy is OTC/platform-covered, no on-chain gas at buy. Don't show "ATL/at-launch" wording either. [VTT 308-313]
- **Show + let user choose the Receive-To wallet**: display the receiving address and let them pick among their linked/"bought" wallets (or on the prior screen). Don't leave the destination implicit. [VTT 316-345, 356]
- Payment methods: credit card is the integrable one (bank transfer/Interac can't be directly integrated; credit card via 3rd party). [VTT 250-251]

## Wallet gating model — confirmed (Max-sen's proposal, agreed)
- **Do NOT block the user upfront** if they haven't linked/"bought" a wallet. Let them fill the form; **block only at the final (or near-final) step**, depending on flow. [VTT 477-479, 497-499, 650]
- At the gating step, show a **list of the user's "bought"/verified wallets** to connect/select quickly (re-connect). If none, give a path to link one. [VTT 480-486, 639]
- Verify-ownership rule unchanged: app-connect = signed/verified; extension-only connect may need a sign step. Keep current verified/unverified logic. [VTT 575-632]
- ⚠️ **Mobile**: the bought-wallet list can be long → must not overflow on mobile (Huệ). [VTT 947-955]

## Swap vs Trade — confirmed split
- **Swap = AMM** (Uniswap-style), slippage (default 0.5%), bidirectional input. Pairs limited: **hUSD↔USDC and hUSD↔USDT only** (select hUSD → list shows USDC/USDT; select USDC → list shows hUSD only). NOT USDC↔USDT. [VTT 127, 216, 158-172]
- Uniswap's "Limit" tab is actually an order-book feature → belongs to **Trade, not Swap**. Keep Swap slippage-based only. [VTT 198-207]
- **Trade = order book** (Binance-style: candlestick + order book + recent trades + open orders), separate menu item. [VTT 60, 84-90, 653] — DONE.

## Quick actions / naming — confirmed
- Canonical set everywhere: **Buy · Send · Swap · Trade**. Issue→Buy (issuance now lives on the Stablecoin Portal, turned off here). Move the action row above balances. [VTT 676-681, 671-672] — DONE.

## Transaction History / Filters (FE-127) — confirmed
- **Approve and Swap are TWO separate transactions** shown under one parent; each transaction detail lists its sub-transactions. Also index **approvals triggered by external dapps**. Design the indexer "lobo"/global, not just our-system. [VTT 770-793] — sub-tx grouping DONE.
- **Sender / Receiver semantics**: Sender = the party debited (loses money/tokens) in a completed tx; Receiver = the party credited — NOT necessarily the action-initiator. For Approve(owner/spender) it's edge; keep filter labelled "Sender / Recipient". [VTT 717-768] — rename DONE.
- **Remove Direction + Category** filters (overlap with Type/Action). [VTT 801-803] — DONE.
- **Remove mint/burn** function names (issuance/redemption not user-facing). [VTT — Token Mgmt §1.4] — DONE.
- **Saved Presets**: a checkbox "save this filter" + name; **save only when the filter applies successfully** (no server error); **max 3**; delete from the list. [VTT 815-873] — checkbox+name+save-on-apply + max-3 DONE.
- Activity rows/type filter align to the 4 actions Buy/Send/Swap/Trade. [VTT 704-707] — DONE.

## Priority (Renol/Minh, end of call)
1. **Buy Stablecoin** flow (highest). 2. Stablecoin webpage/landing. 3. remaining flows. Trade can come after. [VTT 918-921]
