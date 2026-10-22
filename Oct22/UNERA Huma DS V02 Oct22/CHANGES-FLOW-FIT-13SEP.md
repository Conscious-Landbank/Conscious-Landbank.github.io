# Changes: action flows fit one screen (13 Sep 2026)

Request: Hue Dinh, Slack #design 11 Sep 2026. Transaction screens (Send, Swap, Trade, Buy, Donate, Stake) should fit the main content in one screen at desktop 1280x720 and iPad mini, with as little scrolling as possible. Follow-up from Renol: real desktop redesign, stepper moved to the side; two-column sections align with the Back and Continue buttons.

## What changed

New shared stylesheet: `unera-pages/shared/flow-shell.css`, linked by all six flow pages after their inline styles. Phone styles under 700px are untouched.

At 700px and up (iPad portrait and wider):
- Page header becomes one slim left-aligned row: title 1.625rem with the subtitle beside it.
- Demo bars compress to a slim pill row. Terminal, review and prereq states get tighter paddings and row heights.

At 960px and up (desktop, iPad landscape):
- The stepper becomes a vertical rail on the left, sticky, with the step content beside it. Progress still reads from circle states; the horizontal progress bar is hidden.
- Steps use a two-column grid (`.flow-cols` / `.flow-col`): primary interaction left, supporting info (summaries, tips, callouts, banners) right. Columns are 1fr/1fr with a 1rem gap, so each column edge lines up with the Back / Continue buttons below (Renol, 13 Sep).
- Demo bars stay on one line and scroll horizontally if long.

Per page:
- send-enhanced: two-column prereq, review and success. Success actions and the save-address block moved inside the success hero column.
- exchange: two-column prereq, swap (panel left, settings + summary right), confirm (details left, rate lock + prompts right), success (hero left, receipt right).
- trade: three-column terminal at 960px+ (chart + live summary left, ticket middle, order book + recent trades + open orders right, lists capped with inner scroll). Main widens to 76rem at 1140px+. Two-column confirm and success.
- add-money: two-column prereq, payment method, amount, confirm, checkout (summary + payment-result pills left, card form right), transfer, success.
- donate: two-column method + amount step; center list capped at 17rem with inner scroll; payment rails in a 2x2 grid; JS-rendered receipt lays out two-column via CSS.
- stake: two-column prereq, token, amount, review, success; lock periods in one 4-up row.

## Measured results (per step, scrollHeight vs viewport)

Baseline before: every step overflowed 380 to 1500px at 1280x720.
After, at 1280x720: Send, Stake, Donate (except method+amount step), Trade (except terminal step), and all terminal/status steps fit with zero scroll. Remaining overflow: trade terminal 200px (was 1474), add-money checkout 148 (was 883), donate method+amount 153 (was 1112), add-money amount 95 (was 901), exchange swap 51 / confirm 49 (were 938 / 760), other steps 0 to 30.
At 1024x744 the same steps fit or are within similar margins. iPad mini portrait (744x1133): everything fits except send success (117), donate method+amount (456, columns stack under 960) and trade terminal.

Width check after the change: zero horizontal overflow at 360, 390, 414, 768 and 834 on every step of all six pages (`_responsive-audit-flows.html`).

## Notes for review

- `_vheight-audit.html` measures per-step vertical fit; `_responsive-audit-flows.html` checks per-step horizontal overflow. Both prototype-only.
- The vertical rail restyles the same `.stepper` markup every page already had, including the JS-injected steppers on Buy, Swap and Trade.
- Demo bars, edge pills and their behaviors are unchanged, only restyled.
- Open question for Hue: the trade terminal step holds a chart, ticket, order book, recent trades and open orders. To reach a strict zero-scroll fit at 720px tall it would need to drop or collapse one module. Which one can go behind a toggle?
