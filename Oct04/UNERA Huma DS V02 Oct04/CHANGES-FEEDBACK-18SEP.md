# Changes: Slack feedback, 16 Sep thread (Kevin + Eric)

Source: #ecosystem thread on the 13 Sep compact-flow update.

## What changed

1. Process bar removed on all six flow pages (Kevin, reply 2). `shared/flow-shell.css` now hides `.stepper` and `.mobile-stepper-compact` and collapses the desktop rail column, so donate, add-money, exchange, trade, send-enhanced and stake all lose it in one place. Step headings and Back/Continue carry orientation. Markup and step JS are untouched, so the bar can come back by deleting one rule.
2. Word cuts on the donate amount step (Kevin, replies 3-4). "Make your donation" is now screen-reader-only (focus management still lands on it); the "Donation method" and "Amount" group labels are gone; method subs, rail subs, tip boxes and the amount hint are shorter. "Coming soon" rails show the badge only, no repeated sentence.
3. Payment methods render as a single-column list at desktop (Eric, reply 5). Removed the 2-up grid override in donate.html; the buy-style `rail-list` column now applies at every width.
4. Crypto method card lists assets only: "USDC · USDT · BTC · ETH" (Eric, reply 6). Token chips drop the Direct/Converted tags, and the crypto conversion tip on the amount step is gone. Conversion detail stays on Review as the "Settlement asset" row ("No conversion needed" / "converted before it is routed"), which the spec requires before confirmation.

## Files

- `unera-pages/shared/flow-shell.css`: stepper removal, rail column collapsed, content column kept at 50rem
- `unera-pages/donate.html`: step-2 heading/labels, method subs, tbd-notes, grid override removed
- `unera-pages/donate-flow.js`: RAILS copy, renderTokens without tags, conversionTip logic, amount hint

## Verified

- `_responsive-audit-flows.html` run on 18 Sep: all six flows report done, FLOW AUDIT COMPLETE, zero overflow offenders at the phone width matrix.
- Spec guardrails kept: Donate by Fiat / Donate by Crypto labels, $1 to $50,000 bounds, fee-on-top rows, §6.3 strings untouched.

## Open point

Kevin's comment was about the flow pages. kyc-verify, password-reset and forgot-password keep their steppers; say the word if those should lose them too.
