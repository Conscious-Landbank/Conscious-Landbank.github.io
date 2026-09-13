# Feedback fixes · 5 Sep 2026

Source: the 31 Aug Slack status thread, final replies (Kevin reply 26, Eric reply 27, Renol reply 28). Everything earlier in the thread was already shipped; see CHANGES-FEEDBACK-1SEP.md and CHANGES-FEEDBACK-4SEP.md. This note supersedes CHANGES-FEEDBACK-4SEP.md §3, which kept donate's merged Review & pay step.

## 1. Donate reverted to separate Review and Payment steps

Kevin's rule: if donate merges review and payment, buy must merge too. Eric closed the thread keeping buy at 2 steps, so donate reverts to match (Renol, reply 28).

- donate.html + donate-flow.js: the flow is 5 steps again — Center · Amount · Review · Payment · Done. Review shows the order, costs, callouts and "Continue to payment"; the Payment step holds the card picker + CVV re-entry, or the receiving account, reference and expiry for bank transfer. Crypto confirms from Review (payment = wallet signatures; the tracker runs in the Payment slot).
- Failed or expired card payments retry on the Payment step with the error banner and the reviewed order intact.
- Method and currency stay on the Amount step (Kevin reply 11: bank transfer needs the currency before the USD conversion).
- All 4 Sep work carried through unchanged: phase-1 gating (all methods shown, Card enabled), platform fee FREE, single network-fee row, quick-view eye on review, CVV re-entry.

## 2. Buy review names the pay window (Kevin reply 25)

- add-money.html review step: a card-only note under the rate chip reads "Once you continue to payment, the price locks for 5:00 while you enter card details. It refreshes after that." Hidden for transfer methods, which hold no rate. The 300s lock and its start-at-card-entry behavior were already in place (4 Sep §2).

## Verification

- `_donate-flow-test.html` updated to the 5-step flow and re-run end to end at 360 px: card (review → payment → CVV block-then-pass → success terminal), phase-1 gating (4 rows, 3 gated, 84px min height), bank with EUR quote line (payment step shows 7 transfer rows + DON- reference → pending terminal), crypto (confirm from review → tracker → terminal), failed card retry (fail terminal → "Try payment again" → Payment step with error banner). All pass, stepper reports 5 steps, no stale banners.
- `_responsive-audit-flows.html` (now 360/390/414) re-run over donate, add-money, exchange, send: zero horizontal overflow on any step, including the new Payment step and the new buy review note.
