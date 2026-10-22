# Changes: Humanity Centers rebuilt on real network data (FE-269, 14 Oct 2026)

Sources: Jira FE-269; Confluence *Huma Platform - Humanity Centers* 88768526 v7 (12 Oct); Slack #collab-fe thread from Kevin (6 to 14 Oct); 13 Oct feedback meeting notes (Part 2, H1 to H8); humanitycentres.com/places and /all-programs; circlesinthesquare.ca/about; bethlehemcentre.com.

## Audit findings

| # | Source | Finding | Fix |
|---|---|---|---|
| 1 | H1, H2, Kevin 6 Oct | All 13 centers were invented (Kibera, Tondo, Dhaka...). The real network is three places in BC, Canada. | `donation-data.js` now carries Circles in the Square (Vancouver), Surrey Neighbourhood House (Surrey) and Bethlehem Centre (Nanaimo), with text and images read from the source sites. |
| 2 | H3, A16 | Lives impacted, donor counts, outcomes, stories, testimonials, fund-use splits, milestones, impact hints and giving-trend charts have no source on any HC site. | All removed from data, directory, detail, donate flow, dashboard and donations pages. Total donated stays: it is Huma's own figure (HC-SYNC-05). |
| 3 | H4, HC-DETAIL-04, Eric 10 Oct 2b | No real programs, no links out. | Each center carries its active programs (19, 1 and 6) with the spec's fields: title, category (the network's Me / Us / All of us dimension when the source states one), short description, cost, `source_url`, status, `ip_redemption_enabled`, `display_order`. Detail page shows 4, then "Show all N programs"; every program links to its own page (Kevin: fine to link). |
| 4 | HC-DETAIL-02, Eric 2c | No canonical source link. | Detail hero has "Visit <site>"; a Source and contact card lists the website, the About page used as source, the humanitycentres.com listing and the address. The hero also carries a "Part of the Humanity Centres network" link. |
| 5 | §3.3 v7 | Status enum was active / suspended / inactive / deactivated. Spec is draft / active / pause / suspended / deactivated. | Model updated. Paused centers show in the directory with the §6.3 badge and helper text, keep a detail page with the §6.3 banner, and have Donate disabled with the §6.3 tooltip. Draft, suspended and deactivated centers return an "not available" page (HC-DETAIL-06, resolves OQ-03) and never appear in the directory. The donate flow guard uses the §6.3 string verbatim. |
| 6 | H7, FE-269 #2, Eric 2d | Tier teaser in the donate waiting screen and the tier ring and ladder on the Huma Points page are HP-based. Tiers will be Impact Point based and configured in the Admin Portal. | Hidden everywhere (`UNERA_HP.TIERS_ENABLED = false`; markup kept). The About tab's right column is now "What HP unlocks" with the benefits list and a note that tiers come later. |
| 7 | HC-DETAIL-08, AC-HC-10 | Nothing told users that programs are not donation targets. | Programs card opens with: donations always go to the center, never to a program; booking with Impact Points is planned. |
| 8 | HC-DIR-03 | Country filter was meaningless once every center is in Canada. | Filter is by location (city), data-driven; category filter stays (gathering space, community hub, retreat centre). |
| 9 | Eric 14 Oct | HC team will send a CSV; design must reflect the correct structure. | Field names follow §7.1 and §7.2 (`source_url`, `website_url`, `short_description`, `full_description`, `hero_image_url`, `gallery_image_urls`, `programs[]`, `total_donated`), with legacy aliases set in one `normalise()` so older pages keep working. |

Not in this project: the Admin Portal items (A16, H8: match HC site fields, add Pause, keep Archive) live in the UNERA Admin Portal prototype.

## Source data notes for the HC team

- On humanitycentres.com/all-programs, "Group Listening Circles" and "Nathan's Book Club" both link to the False Creek Friends page. Left out until the links are fixed.
- Dimension (Me / Us / All of us) is stated for 8 of 21 Circles programs on the source page. The rest carry no category rather than a guess.
- Images are the humanitycentres.com listing images. Kevin: Sebastian will provide images later; the hero hides itself if an image fails to load.
- Bethlehem's "Island Dharma" ran 27 Aug to 3 Sep 2026 and is still listed as active on the source. Program status should come from the CSV.

## Responsive pass (Kevin matrix)

`unera-pages/_hc-audit.html` loads 18 page states at 360, 375, 390, 393, 402, 414, 768, 834, 1024 and 1280 px and checks JS errors, horizontal overflow and tap targets under 44 px. States: directory (default, one center paused, loading, empty, unavailable, public visitor with login prompt), detail for each center (default, all programs expanded, paused, suspended, public visitor), donate step 2 prefilled, dashboard, donations, Huma Points (Rewards, How it works).

Fixed from the run: the "Part of the Humanity Centres network" pill on the detail hero was 30 px tall, now 44 px; the shared `.btn-sm` (Donate, Browse centers, Log in, Change center) was 40 px, now 44 px everywhere; the donate flow's disabled rail option was 40 px at desktop widths, now 44 px; the detail page's "All Humanity Centers" back link was 22 px, now 44 px (verifier catch; the harness now checks `a.back-link`). A `CITS is not defined` error in the new data file was caught by the harness's JS check and fixed.

Result: 180 page/state/width combinations, 0 failing after the fixes.

## Second pass, 14 Oct (same sources, no new replies in the thread or on FE-269)

Gaps closed:
- Donate flow step 1 still computed a "lives impacted" line per center row. Now "N programs". Search placeholder says "name or location".
- Legacy center names ("Kibera Community Center", "Nairobi Humanity Center", "Nairobi Hope Center", "Lagos Center", Toronto / Mumbai HC) survived in shared seeds and sample rows: bell seed catalog, wallet transaction rows (wallet-enhanced, wallet-edge), account activity, email templates, stake and the two legacy KYC dashboards. All swapped for the real centers.
- Detail page gains the two §6.2 states that had no demo: "No active programs" (lightweight message, HC-DETAIL-04) and "Metrics unavailable" (total donated degrades, profile and programs unaffected).

## Product-wide responsive pass (Kevin matrix, screen by screen)

`unera-pages/_responsive-audit.html` now defaults to all ten widths (360, 375, 390, 393, 402, 414, 768, 834, 1024, 1280), checks JS errors and tap targets under 44 px as well as horizontal overflow, and runs the 26 consumer pages. Result before fixes: zero horizontal overflow and zero JS errors on every page at every width; 15 pages had controls under 44 px. All fixed:

- wallet-enhanced: scope trigger 40 to 44; chart period tabs and alert dismiss get 44 px hit areas.
- wallet-edge: scope buttons and alert dismiss.
- donation-history: center scope trigger 40 to 44.
- add-money, exchange, send, trade, stake: the prerequisite "Verify Now" / "Connect" buttons.
- account-settings: base `.btn` 42 to 44, wallet nickname edit icon 22 to 44, demo pills.
- account-security: alert link buttons. notifications: filter tabs. kyc-verify-new: demo pills. proof-of-reserve-public: copy buttons. payment-methods and payee-management: demo bar buttons, row icon buttons 38 to 44, link buttons. signup: password eye 32 to 44.

Re-run after fixes: 260 page/width combinations, 0 failing.

## Third pass, 15 Oct (sources unchanged; FE-269 still Ready, no thread replies)

Found and fixed:
- The 14 Oct donate-flow batch never saved (the script aborted on a later file). Re-applied: center preview shows programs instead of lives impacted and links to the detail page; tier teaser removed from the waiting screen; the `?hc=` guard uses the §6.3 string; search also matches city.
- Detail page had no §6.2 Loading or Error demo. Added skeletons and a retry-friendly error state as pills.
- HC-DETAIL-04: a "Bookable with Impact Points" chip renders when a program's `ip_redemption_enabled` is true (none today).
- Wallet value-prop card still read "Tier-Based Rewards / higher donor tiers". Reworded to Impact Points, tiers planned.
- Terminology doc §10 marks "lives impacted" retired; CLAUDE.md §0 points at the new `docs/FE-269-audit.md` (requirement-by-requirement table plus the three open conflicts: lives impacted in spec v7, some vs all programs, program category vocabulary).
