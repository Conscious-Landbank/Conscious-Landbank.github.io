# Changes · Slack thread 2026-09-16 (Eric / Kevin)

## Eric 09-16 — "boxes less crowded of texts" (Proof of reserve)
- Passive Reserve Yield card: one-sentence intro, two bullets shortened, split label trimmed, redundant "this portal only…" sentence removed.
- Reserve reports & attestations: one-line intro, attestation metas trimmed, SHA-256 shown truncated (full hash still copies), "check it yourself" steps one clause each.

## Kevin / Eric 09-27 → 09-30 — Redeem is one user transaction
Agreed model: user sends hUSD to Unera's dedicated redemption wallet → Unera verifies wallet + identity → Unera burns and pays USD to the bank. No sign/approve from the user.
- Stepper: Amount → Review → **Send** → Done.
- Review CTA renamed "Continue to send"; the "Approve transaction" wallet dialog is no longer used in Redeem.
- New Send step (mirrors Eric's mockup / the Get-hUSD deposit step): Unera's redemption wallet (QR, address, Copy), send-from verified wallet line, 24h open window, amount/receive summary, "no signature needed" note, hUSD-only warning, Back / "I've sent it".
- Status timeline reordered: hUSD received → Identity confirmed → hUSD removed → (queue) → USD sent. Settlement rail middle node reads "Unera verifies".
- Left-rail chip: "1:1 · one transaction from you · Unera verifies, removes and pays out".
- Direct burn for low-risk users is deferred (legal) and not shown.

## Responsive
Send step reuses the audited scaffolding: 508px column, `flexwrap` row at ≤720px (QR stacks above the address), 44px `tap` target on Copy, flow grid → single column at ≤1080px, settlement-rail guard at ≤460px.
