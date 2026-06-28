# QuoteCard

Issuance/redemption quote with a hard **60-second expiry**.
Source: *hUSD Issuance & Redemption* (62259435) §3.

## Rules
- Quotes expire after 60s; an expired quote **cannot be confirmed** — disable the confirm CTA and show "Refresh quote".
- Always show input/output, FX rate where applicable, fee/markup, **rate source + timestamp**, and the live countdown.
- Rate source is an **off-chain FX provider** (exchangerate-api.com / fastforex.io) — never an on-chain oracle.
- Parent owns the 1s countdown and passes `secondsLeft` + `expired`.

## Pairs with
Bidirectional amount input (enter funding **or** hUSD; the side edited last is the source of truth).
