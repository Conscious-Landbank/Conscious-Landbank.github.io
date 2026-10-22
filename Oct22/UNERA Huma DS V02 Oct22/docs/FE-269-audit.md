# FE-269 gap audit: Humanity Centers on real network data

**Ticket:** FE-269 (Ready, 13 Oct 2026). **Spec:** Confluence *Huma Platform - Humanity Centers* 88768526 v7 (12 Oct). **Decisions:** 13 Oct feedback meeting, Part 2 (H1 to H8); Slack #collab-fe thread from Kevin, 6 Oct (humanitycentres.com/all-programs). **Sources read:** humanitycentres.com/places, circlesinthesquare.ca/about and /program/*, bethlehemcentre.com/about and /program/*, surreynhs.org. Audited 14 and 15 Oct 2026 against `unera-pages/explore-centres.html`, `centre-detail.html`, `donate.html` + `donate-flow.js`, `donation-data.js`, `dashboard-enhanced.html`, `donations.html`, `huma-points.html`.

## 1. Meeting decisions (H1 to H8)

| # | Decision | Status | Evidence |
|---|---|---|---|
| H1 | Redesign HC pages to match the real HC sites | Met | Detail page mirrors a center's About page: hero, kicker, tagline, long description, values, people, programs, source links, address. Data read from the sites on 14 Oct. |
| H2 | Take only what helps a user understand the center | Met | Per center: short and full description, tagline, up to 6 values, hosts, address, website. No events calendar, no booking, no blog. |
| H3 | No impact metrics without a source | Met | `livesImpacted`, donor counts, outcomes, stories, testimonials, fund use, milestones, impact hints and trend charts removed from data and every page. Total donated remains (Huma's own figure). |
| H4 | Some programs per HC, each linking out | Met, with a call to make | All active programs are carried; the detail page shows 4, then "Show all N programs". Every row links to its program page. Phú said "some", Eric and the spec (HC-DETAIL-04) say "all active". Showing all behind a fold satisfies both until someone picks. |
| H5 | Scraping script after the design | n/a | BE-301. Field names follow §7.1 and §7.2 so the script can map 1:1. |
| H6 | Ask the Swiss team about an API | n/a | Phú. |
| H7 | Hide tiers until box coin exists | Met | Donate-flow teaser removed; Huma Points tier ring and ladder hidden; wallet value-prop card reworded to Impact Points; `UNERA_HP.TIERS_ENABLED = false`. |
| H8 | Admin HC page mirrors HC site data, add Pause | n/a here | Admin Portal prototype. Consumer side models `pause` per §3.3. |

## 2. Spec requirements

| ID | Requirement | Status | Evidence |
|---|---|---|---|
| HC-DIR-01 | Directory lists active and paused; draft, suspended, deactivated never | Met | `D.visibleCentres()`; demo pill "One center paused". |
| HC-DIR-02 | Card: name, image, location, total donated, lives impacted ("Coming soon" fallback) | Met except lives impacted | Lives impacted removed per H3. **Conflict with spec v7**, see §5. |
| HC-DIR-03 | Search by name; data-driven geography or category filters | Met | Location (city) and category options derived from the records. |
| HC-DIR-04 | Card opens the detail page | Met | Whole card is a link; keyboard operable. |
| HC-DIR-05 | Loading, empty, error states | Met | Demo pills: Loading, No active centers, Service unavailable. |
| HC-DIR-06 | Scannable, comparable cards | Met | Name, location + category chip, one-line description, two stats, one CTA. |
| HC-DIR-07 | Card may indicate active programs exist | Met | "N active programs" stat. |
| HC-DETAIL-01 | Public page for active and paused HCs, direct link works | Met | `centre-detail.html?hc=<id>`. |
| HC-DETAIL-02 | Name, overview, description, location, media, canonical source link | Met | Hero + About; "Visit <host>", Source and contact card (website, About page, humanitycentres.com listing, address). |
| HC-DETAIL-03 | Total donated and lives impacted, with fallback | Met except lives impacted | "Metrics unavailable" pill degrades total donated to a safe label. |
| HC-DETAIL-04 | All active programs: title, category, summary, status, IP redemption when applicable, source link | Met | Only active programs render (status implied). `ip_redemption_enabled` renders a "Bookable with Impact Points" chip; no program has it today. |
| HC-DETAIL-05 | Donate CTA routes with HC prefilled; disabled for paused | Met | `donate.html?hc=<id>&step=2`; paused: disabled, `aria-disabled`, §6.3 tooltip. |
| HC-DETAIL-06 | Paused page stays up with a notice; draft, suspended, deactivated return unavailable | Met | Resolves OQ-03 in favour of "unavailable". |
| HC-DETAIL-07 | No internal notes exposed | Met | `status_reason` is not in the public model. |
| HC-DETAIL-08 | Separate donating from booking with Impact Points | Met | Programs card note: donations go to the center, never to a program. |
| HC-SYNC-03 | Status enforced across directory, detail, messaging, donate | Met | One `normalise()`; donate step 1 lists active only; `?hc=` guard uses the §6.3 string. |
| HC-SYNC-04 | Only active programs shown | Met | `activePrograms` filter + `display_order` sort. |
| §6.2 states | Loading, empty, no active programs, error, metrics unavailable, paused, hidden statuses | Met | Directory: 5 pills. Detail: Active, Paused, Suspended, Deactivated, No active programs, Metrics unavailable, Loading, Service error. |
| §6.3 copy | Badge, card helper, banner, tooltip, guard | Met, verbatim | `UNERA_DON.PAUSED_COPY`. |
| §5.1 step 8 | Unauthenticated Donate routes to login first | Met | Login banner with return to `donate.html?hc=<id>&step=2`. |
| AC-HC-10 | Program context never changes the donation target | Met | Donation target is the HC id only. |

## 3. Data model (§7.1, §7.2)

Field names used in `donation-data.js` match the spec: `id, name, slug, source_url, website_url, status, country, region, city, category, short_description, full_description, hero_image_url, gallery_image_urls, programs[], total_donated`; programs carry `id, hc_id, title, slug, category, short_description, source_url, status, ip_redemption_enabled, required_ip, display_order`. Extras read from the sites and kept because they help users (H2): `tagline, values[], people[], address, founded, charity_reg_no, cost`. Not modelled on purpose: `lives_impacted`, `latitude`, `longitude`, `status_reason`.

## 4. Source data notes for the HC team

- humanitycentres.com/all-programs links "Group Listening Circles" and "Nathan's Book Club" to the False Creek Friends page. Left out until fixed.
- Dimension (Me / Us / All of us) is stated for 8 of 21 Circles programs. Others carry no category.
- Images are the humanitycentres.com listing images; Sebastian is to provide real ones. The hero hides itself if an image fails.
- Bethlehem's Island Dharma ran 27 Aug to 3 Sep 2026 and is still listed as active on the source. Program status must come from the CSV or script.

## 5. Open conflicts and decisions needed

1. **Lives impacted.** Spec v7 (HC-DIR-02, HC-DETAIL-03, HC-SYNC-06, AC-HC-04) still asks for it with a "Coming soon" fallback. The 13 Oct meeting (H3) removed it because no source exists. The build follows the meeting. The spec should drop the field, or someone names a source.
2. **How many programs.** "Some" (Phú) vs "all active" (Eric, HC-DETAIL-04). Built: all, folded after 4.
3. **Category.** Spec §7.2 suggests domains (environment, education...). The network itself uses Me / Us / All of us. Built: the network's dimension where stated. Confirm which the Admin Portal should offer.
