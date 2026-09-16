# Stablecoin feedback 08-04 — analysis & changes

Sources: Slack thread (Kevin = decision maker; Thanh Son Le = UI/UX + BE; Eric = product/data)
+ Confluence spec "Stablecoin - Dashboard (PoR)" page 66912287 v5 (fetched via Atlassian, 2026-08-04). Both shared links resolve to this same page.

## Point-by-point audit

1. **Kevin — swap Total Reserves & Last Audit with Reserve Composition** → DONE (earlier today). Composition sits beside the 1:1 gauge; the 2 stat boxes moved to the smaller slot beside "Where reserves are held".
2. **Thanh Son — Redemption coverage tooltips** → DONE. ⓘ on all three items; hover/focus tooltips define each metric AND name the data source (reserve system balances, T-bill holdings, redemption ledger) so BE knows exactly what to show.
3. **Thanh Son/Eric — Network activity metrics** → DONE. 24H VOLUME split into 24H ISSUANCE ($2.6M) and 24H REDEMPTION ($1.6M) per Eric. Supply/issued/redeemed stay "Live"; footer states near-real-time refresh (a few minutes).
4. **Thanh Son/Eric — feed items link to tx** → DONE. Each feed item carries a short tx hash linking to BaseScan (Eric: "display the single transaction with according txn_hash => basescan").
5. **Thanh Son — Live feed single column + prepend animation** → DONE. Single column; a new completed issuance/redemption prepends every ~9 s with a slide-in; list capped at 6.
6. **Eric/Kevin — Proof & audit: 18 decimals redundant** → DONE. "Decimals · 18" chip removed; added "hUSD token specs" docs row (decimals, networks & contract addresses — à la Circle's USDC contract-addresses page). "Status · Active" kept with tooltip: Active = in current auditing scope; Inactive = not used.
7. **Kevin/Eric — Reserve yield "This month"** → DONE. Renamed "Reserve yield · last 30 days" (Kevin: rolling 30 days from date of view, no time component; Eric: if 30 days, rename the label).
8. **Eric — Maturity ladder meaning/source** → DONE. Subtitle added: "Liquidity profile — how quickly reserves convert to cash · from the reserve system".
9. **Thanh Son/Eric/Kevin — Your activity ranges** → DONE. Ranges now 30D / Quarterly / Yearly (Kevin's decision). Grouped bars kept (already replaced the line chart on 08-03; Eric's "or a line chart" was an alternative, bars remain the better fit for discrete events).

## Spec cross-check (Confluence PoR spec v5)

- §5.3 chart ranges (default 30d; 7d/90d/1y options) → supply trend conforms. Personal "Your activity" now 30D/Quarterly/Yearly per Kevin (user-scoped chart, outside §5.3's public-chart scope).
- §5.6 contract info (token, network, shortened address + copy + explorer, status) → conforms; Decimals·18 moved to the token-specs docs row per Eric/Kevin (spec allows "18, if following standard spec" — docs page satisfies it).
- §5.5 audit rows (period, auditor, date, link, Latest/Archived status) → conforms.
- §8 "avoid HQLA unless explained with a tooltip" → FIXED: layer-separation copy now reads "Interest earned on reserve assets (HQLA)" with a tooltip.
- §8 "always show timestamps" → FIXED: added snapshot timestamp to "Where reserves are held"; composition, hero, and balance already had them.
- ⚠ §5.4 "Do not show wallet addresses or transaction IDs in the public activity feed unless Product and Legal approve" → CONFLICT with Eric's tx_hash→BaseScan decision (newer than spec v5). Links kept per Eric, but Legal sign-off is required before launch (matches OQ-04). Raise in #collab-agile.

## Unresolved / needs answers (suggested replies)

- **Reserve-composition data sync (Eric → Kevin, reconciliation):** agree with Eric — manual DB inserts alone will drift; recommend a daily reconciliation job against the reserve system with a "last reconciled" timestamp surfaced on the page. BE decision, no UI change yet.
- **"This month" vs "last 30 days":** Kevin decided rolling 30 days → label updated. If finance later prefers calendar months (Eric's comparison argument), only the label + query window change.
- **Docs page for token specs:** the "hUSD token specs" row is a stub link — needs a real docs page (owner: ?).
- **Confluence PoR spec:** not accessible from here; share an export if the dashboard should be re-checked against it.
