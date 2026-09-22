# Changes: Huma Points spec audit (Confluence 88932370, v156, 16 Sep 2026)

## Gaps found

1. The two-layer HP/HPT model had no surface. No dashboard, no claimable-activities list, no Claim or Claim All, no destination wallet, no claim history, no tiers. §6.1 lists five Must/Should components; only the donation success reward state existed.
2. Copy stated inactive utilities and pathways as live, against §6.4 and HP-UTIL-05: "Points pay up to 60% of platform fees" (exchange, add-money, wallet, donate tracker), multipliers for holding, trading, recurring and the six streams, and a made-up buy-time HP estimate in add-money.
3. The FE mock rate did not match the HP-EARN-02 review default of 10 HP per 1 USD.

## What was built

- `unera-pages/huma-points.html` (new): summary cards (claimable HP, lifetime HP earned, tier with next-tier progress), claimable rewards list with per-entry Claim and Claim All (HP-CLAIM-03/04), claim dialog with destination wallet choice and validation (HP-CLAIM-05, §6.3 invalid-wallet string), lock-then-process claim states (HP-CLAIM-06: pending, completed with tx hash, failed with release), claim history, tier table (proposed defaults, marked Admin-configurable), utilities marked "Not yet enabled" with the verbatim Impact Point message (AC-HP-08), how-it-works education with the §6.4 finality and not-cash notes. Demo bar simulates logged out, no rewards, restricted, loading, reward calculating, claim fail, timeout, service unavailable; every user message is verbatim §6.3, served from `UNERA_HP.ERR`.
- `unera-pages/huma-points-data.js` (new): display-only mock of the service. 10 HP per $1, 1 HP = 1 HPT, tiers, activity rewards, claim requests, §6.3 strings in one place.

## Copy corrections

- donate-flow.js: tracker card now says the donation earns ≈ N HP after confirmation, links to the Huma Points page; mock rate is 10 HP per $1.
- exchange.html and add-money.html: wait cards say donations earn HP and that swaps/buys do not earn HP yet. Fee-discount claims removed.
- wallet-enhanced.html: stat card shows claimable HP with a View-and-claim link.
- donations.html, explore-centres.html: stream multipliers replaced with "Coming soon"; intro states donations earn today, other streams are on the way.
- donations.html, dashboard-enhanced.html: HP summary card links to the new page.

## Verified

- `_responsive-audit.html` (huma-points.html added to its page list): huma-points, donations, explore-centres and wallet-enhanced pass 360/375/390/393/402/414 with zero overflow offenders, 18 Sep.
- Claim buttons and destination options are 44px+; act rows stack label-over-value at ≤560px; no hover-only controls.

## Decisions still open for the user

1. Tier names and thresholds (Supporter, Advocate, Champion, Guardian at 0 / 2.5k / 10k / 50k) are proposed defaults pending Tokenomics.

## Follow-up, 18 Sep (same day)

- Nav: "Huma Points" added to the account menu for every page via `USER_MENU_ITEMS` in `consumer-app-nav.js` (desktop dropdown + mobile accordion), with an active state driven by `data-user-menu-active="huma-points"` on the new page. No per-page nav forks.
- Donation success reward state (§6.1 Must): confirmed already met. Both terminals show a Huma Points row with the estimated or unavailable chip from `D.hpChip`, and the tracker card links to the Huma Points page.

## Spec-completeness pass (§6.2/§6.3 gaps closed)

- Unauthenticated state now keeps the "How it works" education visible above the login gate, as §6.2 allows public education.
- Claimed entries leave the claimable list on completion; they live in claim history. Reversed entries surface through the clawback banner only.
- The pending reward row has a "Refresh status" action that posts the confirmed HP at the current rate and updates claimable and lifetime totals.

## Re-audit, 21 Sep (v156 unchanged)

Five gaps found and closed on huma-points.html:

1. Utilities education showed two of the four HP-UTIL-01 utilities. LP-related bonuses and exchange-rate reductions added, both "Not yet enabled" (HP-UTIL-05).
2. The rate note said other activities "are on the way", which reads as a commitment (§6.4, §9.1 risk 1). Now: "Donating is the only way to earn HP today."
3. The unavailable state kept showing tier and next-tier progress from stale data. Tier now reads "Unavailable" with the progress bar cleared, matching the claimable and lifetime figures.
4. Claim history detail did not list the selected activities (§6.1 claim history; §7.2 returns selected activity IDs). Claims now carry `refs` in `huma-points-data.js` and the detail modal lists each reward with its donation reference and HP.
5. No bell notification for claim events (§7.3 routes `hpt_claim_requested` and `hpt_claim_completed` to Notification). The claim flow now emits progressing on submit, completed on delivery, error on failure, via the shared `addNotification`.
- The defensive not-claimable path shows the verbatim §6.3 message inline instead of a browser alert.

## Visual pass + second cross-page sweep, 18 Sep evening

Cross-page: removed the last multiplier and fee-discount claims (dashboard HP card footer line, donate tracker "recurring 3×" fact, "highest multiplier" stream note on donations and explore-centres). The wallet "Earn More HUMA" modal still mentions quarterly 2x HUMA bonuses; that is legacy HUMA-token copy outside the Huma Points spec. Flagged, not changed.

Huma Points page redesign: the three summary boxes became a brand hero panel (deep-blue, blob art, yellow KPI figures) holding claimable HP, lifetime HP, tier with progress and the page's one primary CTA (Claim All) plus a Donate ghost. How-it-works sits on a soft cloud-blue panel; tiers render as a connected ladder with the current tier filled. List rows keep the donation-history icon language.

Responsive audit re-run after the redesign: huma-points, dashboard-enhanced, donations, explore-centres pass 360/375/390/393/402/414 with zero overflow offenders.

## Comprehensive pass, 19-20 Sep (spec v156 re-audit + motivation)

Huma Points page: content now sits in three tabs under the hero (Rewards with a live count badge, History, How it works), keyboard-navigable per WAI tabs. Info tooltips (fee-tooltip pattern, click-toggled) explain claimable vs lifetime HP and each tier's planned benefits ("Planned:" wording keeps §6.4's no-implied-availability rule). Claim history expanded to five requests covering confirmed, failed and a submitted/Processing state (§7.1.4 status enum), with a matching locked activity and locked balance of 350 HP.

Earning hints across the site (donation pathway only; buy/swap/send stay silent per HP-EARN-03):
- Donate amount step: live "≈ N HP" row in the summary.
- Donate review: Huma Points row next to costs, with the posted-after-confirmation note.
- Donate waiting screen: the HP card now says how much closer the gift takes you to the next tier.
- Donations landing hero: one-line HP mention with a rewards link.
- Donation history subtitle and wallet HP stat card: quiet claim prompts.

## Note (20 Sep, user)

The `.giving-tabs` nav on dashboard-enhanced / donation-history ("My Impact | Centers") is the product's canonical section-tab component. Reuse or match it for any new tabbed surface — including the Huma Points tabs — instead of inventing a new tab style.

Responsive audit (Kevin matrix): huma-points, donate, donations, donation-history, wallet-enhanced — AUDIT COMPLETE, zero overflow offenders.
