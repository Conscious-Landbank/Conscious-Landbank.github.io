# hUSD Portal — feedback audit, 6 Aug 2026

Sources checked: Confluence *Stablecoin - Dashboard (PoR)* v5 body **and its 4 open inline comments**;
`PoR-Review-Notes.pdf` (5 Aug); Slack #collab-agile threads (Kevin, Renol, Thanh Son, Eric, 3–4 Aug);
Circle *USDC contract addresses* doc; the favicon / tab-title / logo question.

## Closed in this pass (V6)

| # | Ask | Source | Where |
|---|-----|--------|-------|
| 1 | "backed 1:1 by cash and short-term U.S. government bonds" is wrong — reserve also holds USDC/USDT. Use "cash and cash-equivalent assets" | PDF §1 | PoR header, public hero, portfolio strip, Get screen |
| 2 | Quarterly, not daily; separate *reserve report* / *attestation* / *audit*; remove the word "audit" | PDF §2 + PRD | All copy; reports card retitled *Reserve reports & attestations*; "Last audit · Today" → "Latest attestation · Q2 2026" |
| 3 | "1:1" next to "102.4%" reads as a contradiction — pick one | PDF §3 | Gauge now reads 102.4% reserve ratio / 100% minimum |
| 4 | One global "Live · 14s" badge implies everything is live; give each block its own as-of | PDF §4 | Badge removed; 3-key source legend + per-block as-of on coverage, composition, custodians, maturity, activity |
| 5 | Chart missing daily reserve-ratio line, dashed 100% line, and export | PDF §5, PRD §6.6 | Ratio line + dashed 100% minimum + CSV export of the selected window |
| 6 | SHA-256 per PDF so anyone can prove the file is unaltered | PDF §6 | Checksum + copy on every report row |
| 7 | "Status · Active" is unexplained → *In current attestation* / *Superseded* | PDF §7 | Status chips + tooltips |
| 8 | 18 decimals is clutter on PoR; put stablecoin specs on a docs page like Circle's | Thanh Son + Eric/Kevin | **New `docs` screen — hUSD token specs**: symbol, name, standard, decimals, issuer, status; mainnet + testnet address tables with copy and explorer links; address-safety warning; provenance note |
| 9 | Do not use "Fully backed" as a dashboard status — being backed is a compliance must, not a badge | **Confluence inline comment (Eric, 22 Jun)** + spec §8 | Removed "fully backed" / "100% backed" from hero h1, trust chip, medallion, portfolio strip |
| 10 | Favicon + tab title per page; confirm the UNERA logo | Kevin, last message | hUSD medallion favicon + theme-color on all 3 pages; every screen/pane names itself in the tab. Nav uses the UNERA wordmark |
| 11 | Reserve yield "this month" = from the 1st | Eric | "month to date · counted from the 1st, resets each month" |

## Verified already correct (earlier rounds)

Excess reserves and Avg. maturity boxes removed · Total reserves + Latest attestation swapped into the
smaller slot beside Reserve composition · activity uses grouped bars, ranges 30D / Quarterly / Yearly ·
redemption-coverage tooltips double as the BE data spec · 24h volume split into 24h issuance + 24h
redemption · live feed single column, prepends new events, each row links its tx hash to BaseScan ·
maturity ladder labelled as the liquidity profile sourced from the reserve system · no forecast on any
chart (inline comment 4) · composition donut covers cash / treasuries / repo / USDC (inline comment 3) ·
HQLA only appears with a tooltip (spec §8).

## Open — needs a decision, not design

1. **Legal sign-off on attestation wording.** PDF §2: "This should go to legal before FE changes any text."
   Current wording is a placeholder.
2. **OQ-03 — can Grant Thornton be named?** Spec §13 leaves this with Legal/Finance. The name is on the
   page today.
3. **Which documents actually exist at launch?** The three report rows (Q2 attestation, July reserve
   report, Q1 attestation) and their hashes are placeholders. If only quarterly attestations are
   published, drop the monthly reserve-report row.
4. **Status vocabulary conflict.** Spec §5.5 says Latest / Archived / Pending; PDF §7 says
   In current attestation / Superseded. Followed the newer PDF.
5. **OQ-01 / OQ-02 / OQ-04 / OQ-05 / OQ-06 / OQ-07** in the spec are still unanswered; the page currently
   assumes custodian names and exact values are publishable, monthly composition cadence, individual
   anonymized activity events, all PoR on one page, and that reserve yield is shown.
6. **Chainlink PoR feed** is presented as roadmap copy only — confirm it belongs on a public page before launch.
