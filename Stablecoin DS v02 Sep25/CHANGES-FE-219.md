# FE-219 · Buying-token flow update

Source: [FE-219](https://conscious-landbank.atlassian.net/browse/FE-219) → Kevin's Slack review
(#-thread 2026-08-23, replies 1–10) plus the thread's resolutions with Eric & Ducke (replies 26–33).
Applies to `UNERA hUSD Portal.dc.html` (Get hUSD flow). Prior version archived as
`UNERA hUSD Portal v3 (pre-FE-219).dc.html`.

## Changes

1. **Reserve footer removed** (Kevin r2, screenshot): the "Held in separate reserve accounts ·
   attested quarterly" line under the Amount-step CTA is gone — only data users act on stays.
2. **Fiat restructured: method before currency** (r3–r4). Card/Bank is now picked on the Amount
   step. Currency (USD/CAD) appears **only for bank transfer**. Card shows no exchange rate — any
   card currency is accepted and the card issuer converts at a rate we can't see pre-payment
   (note states this). The Pay step no longer re-asks the method; it shows "Paying by X · Change".
3. **Crypto assets extended** (r5, r10): USDC · USDT · ETH · BTC are all selectable ("Soon" chips
   removed, toggle sublabel updated) so crypto ≠ stablecoins-only. ETH/BTC are volatile: reference
   rate shown, copy everywhere states the final rate is the asset→USD exchange rate **at
   processing time**; per-asset presets and 4-decimal amounts; $1,000-of-value minimum.
4. **Wallet step keeps no network info** (r6): wallet rows show address + linked-date only; the
   hUSD network is chosen once, on the Amount step. Step kept per Eric r27#2 (re-select the
   receiving wallet at flow start; pre-filled from settings).
5. **"How this works" slimmed** (r7): estimate explainer became a tooltip next to the estimated
   amount on Review; small/big-difference mechanics removed; replaced with a plain "full refund
   before completion" line. Small-difference adjustment is explained on the completed tracker.
6. **"Show my deposit address" renamed** to "Continue to payment" (r8–r9); the Deposit step now
   states the address's purpose (Unera's receiving address, one per account — Kevin/Eric r27–r29),
   shows the receiving wallet chosen in step 1 with an in-place **Change** control, and BTC gets
   its own Bitcoin deposit address.
7. **Order expiry** (r10): deposit step + tracker show "order open until <24h stamp>"; waiting
   copy acknowledges minutes-to-longer timing; BTC ETA widened. Completed volatile orders show a
   "Rate applied · 1 BTC = … USD at processing" chip.
8. **FIFO gate** (r32): while an order is in flight, the Get flow blocks new order creation with a
   "Finish your current order first" card linking to the tracker.
9. **±5% mismatch choice** (r31 + r7): new tracker state (demo chip "Mismatch · over 5%") where the
   user picks *Accept the adjusted amount* or *Request a full refund*.
10. **Refund destination = user-picked wallet** (r23–24, audit 09-07): refunds never return to the
    sending address (it may be a CEX). Requesting a refund opens a linked-wallet picker; the user
    signs and covers the network fee. All refund copy ("how this works", refunded tracker state)
    updated to match.

## Not done / follow-ups
- Receipt rows in Activity don't yet carry the adjustment explanation for historical orders.
- ETH/BTC reference rates are placeholders (`RATES`); wire to a market feed.
- Refund flow is a tracker state only; no standalone refund screen.
