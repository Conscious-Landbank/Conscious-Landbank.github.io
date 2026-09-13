# FE-217 · Buy with transfer — bank account info + other platforms

Source: [FE-217](https://conscious-landbank.atlassian.net/browse/FE-217) (Bank transfer: show bank
account info; other platforms: Wise, MoneyGram). Applies to `UNERA hUSD Portal.dc.html`,
Get hUSD → fiat → bank-transfer Pay step. Builds on the FE-219 structure (method picked on the
Amount step; currency only for transfers).

## Changes

1. **"Send via" picker** on the transfer step: Bank account · Wise · MoneyGram.
2. **Bank account** (existing, kept): selectable receiving accounts (wire/ACH, USD/CAD), full
   detail rows with per-field copy, QR to pre-fill mobile banking, reference-code warning.
3. **Wise**: Unera's Wise recipient (Wisetag, account name), amount and reference rows with copy;
   note that any Wise balance currency works (Wise converts; its fee is user-side); "usually
   minutes" ETA.
4. **MoneyGram**: receiver name/city/country + amount rows; required **MoneyGram reference
   number** input — the confirm button stays disabled until it's entered (that number is how the
   transfer is matched); "same day–2 days" ETA.
5. Intro line and confirm-button label adapt per platform.

## Notes / follow-ups
- Wise/MoneyGram receiving identities are placeholders (`WISE`, `MGRAM` in the logic) — wire to BE.
- Reference-matching for Wise reuses the same per-request reference code as bank wires.
