# Changes: Huma Points Slack feedback (25 Sep 2026)

Source: Slack thread "updated Unera Huma product" (22 to 24 Sep, Eric and Kevin) and Eric's 24 Sep rewrite of the Huma Points model in the tokenomics thread.

## Model change: HP is a ledger in this phase

Kevin and Eric agreed on 24 Sep: no HP token yet, no minting, no transfer. Claiming turns claimable HP into ready-to-use Huma Points and links them to a wallet the user proved they own. Claims are full claims only; each claim takes everything accrued since the last one, and each claim can pick a different verified wallet.

- `huma-points-data.js`: removed the HPT ratio, token amounts and tx hashes. Summary is now `ready` (claimed) + `claimable` + `lifetime`. Added verified `WALLETS`, a `NEW_WALLET` for the sign flow, swap rewards and `SWAP_RATE`.
- §6.3 strings that named HPT are reworded (`claimFailed`, `processedFinal`); `invalidWallet` is replaced by `signRejected`. The spec needs the same update.

## Feedback items

1. Separate entry to Huma Points (Eric). Added a Huma Points card in `account-settings.html` with balance, claimable amount and "Manage Huma Points". The donations entry stays.
2. Internal wording removed (Eric). No "Admin Portal" copy left on the Huma Points page or in the data strings shown to users.
3. Sign to prove ownership (Eric, Kevin). The claim modal no longer takes a typed address. It lists verified wallets (no prompt) plus "Link a new wallet", which runs a signature step: 1 signature, free, no gas, no funds moved. "Signature cancelled" is a new demo state.
4. Status icons and "My balance" (Eric). Claim complete and claim failed now carry a check or cross badge. Claim history rows use status icons (check for completed, cross for failed). The success panel has a "My balance" button to `wallet-enhanced.html#huma-points-balance`.
5. HP on the wallet portfolio (Eric, Kevin). The "Portfolio" header is gone. One Huma Points box sits on top: Huma Points as the primary figure, claimable HP as the secondary line, and a "Claim points" link. Total portfolio follows. HP is never added to the dollar total because it has no monetary value.
6. Rate info icon (Eric). The HP estimate on the donation amount step and on review has an info button: "$1 donated = 10 HP". Swap review gets the same row and icon.
7. Long lists (Kevin). Claimable rewards show the top 5, an ellipsis row ("2 more"), then the last item, plus "View all N rewards in History". History holds the full claim list and a new "All rewards earned" list.

Also updated: copy on dashboard, donations, add-money, donate flow and exchange no longer says "claim as HPT". The exchange waiting card says swaps earn HP.

## Decisions still open

- Swap earning rate. `$1 swapped = 1 HP` is a placeholder; Eric's note says the Admin Portal sets it but gives no value.
- Confluence 88932370 still describes HPT claims. Eric said he will update the doc; the §6.3 wording here should be checked against it once revised.

## Responsive pass (Kevin matrix)

`unera-pages/_hp-audit.html` loads each page at 360, 375, 390, 393, 402, 414 and 768 px and checks horizontal overflow and tap targets under 44 px, across 13 states: the three tabs, claim form, new-wallet sign, claim done, claim failed, claim detail, logged out, wallet HP box, account settings card, exchange and donate.

Fixed from the run: claim detail close button 36 to 44 px; exchange "Verify Now" button 36 to 44 px. Re-run: 91 page/state/width combinations, 0 failing.

## Re-audit, 25 Sep (same thread, no new comments)

All 7 items re-checked against the thread; each is in place. The earlier run missed states where the new HP touchpoints are active, so the audit now also opens every HP info tooltip, runs the sign, sign-cancelled and timeout claim paths, and measures info-icon hit areas.

Fixed:
- Info tooltips (260px, left-anchored) ran 116px off a 360px screen when opened from the "Claimable rewards" title, and could do the same from the donate and swap HP rows. Tooltips now cap at the viewport width and shift back inside it on open, hover or focus (`huma-points.html`, `donate-flow.js`, `exchange.html`, `donation-shared.css`).
- Info icons were 20px targets. They keep the same look but get a 44px hit area (`::after` inset 12px), shared across every screen using `.fee-info-btn`.
- Quick-give chips on dashboard and donations 38 to 44px; featured-center Donate buttons 40/42 to 44px.

Result: 154 combinations (22 states, 7 widths), 0 failing after the button fix.

## Visual pass v3, 25 Sep

Thread re-checked. One gap: Eric asked for status icons "like other flows". The claim terminals used their own small icons. They now reuse the shared flow badges: `.success-icon-animated` + `.lightning-badge` on success, `.fail-icon` on failure, `.pending-icon` while signing, sized to 84px for the dialog.

Huma Points page, visual layer (CSS block "Visual layer v3", tokens only):
- Hero rebuilt around one figure. Huma Points is the large number (56px desktop, 40px phone, tabular). "Ready to claim" sits in its own panel with the Claim all button. Tier is a progress ring (SVG stroke, solid colour, no gradient) with the next-tier line. Donate and Swap links move to a quiet footer row. Desktop hero height drops from 598px to 392px.
- Phones: the claim panel stacks with a full-width button; the tier ring becomes a compact row.
- Cards: 20px radius, hairline border, soft two-layer shadow.
- Lists: hairlines start after the icon, flat icon wells without rings, sentence-case status chips, tabular amounts, a chevron on tappable history rows.
- Dialogs: 20px radius, no header rule, grouped summary block. At 560px or less both the claim dialog and claim detail open as bottom sheets with a grabber and safe-area padding.
- Wallet choices: 56px rows with a crisp selected ring.

Responsive re-run after the visual pass: 154 combinations (22 states, 7 widths), 0 failing. Measured hero heights: 392px at 1280, 438px at 768, 558px at 414, 579px at 360 (stacked).

## Thread re-audit and hero layout v4, 25 Sep

No new replies in the thread. Gaps found against the 14 replies:
- `wallet-edge.html` (the wallet edge-state page) still had the "Portfolio" header and no Huma Points box (Kevin, Eric). It now carries the same box as `wallet-enhanced.html`: Huma Points primary, claimable secondary, "Claim points".
- Dashboard and Donations cards still showed "Huma Points earned" with a donation-derived figure (1 decimal), which did not match the wallet or the Huma Points page. Both now read the shared ledger (`huma-points-data.js`): "Huma Points 3,460 HP" with "2,190 HP ready to claim", link "Claim points". Estimated, pending and unavailable states keep their existing labels.
- About tab fine print: confirmed by DOM that "Admin Portal", "Thresholds and benefits are set in the Admin Portal" and every HPT line are gone. The screenshot showing them came from the 22 Sep deploy.

Hero layout v4: the balance and the claim panel share the top row (claim panel 22rem on the right, full-width button); tier ring (52px) and "Earn more" links share one footer strip. Desktop height 392 to 327px. Between 561 and 820px the claim panel runs as one row with the button on the right; at 560px or less everything stacks with full-width buttons.

Audit widths extended to Kevin's full matrix: 360, 375, 390, 393, 402, 414, 768, 834, 1024, 1280.

## Kevin's top-5 rule applied to the claim dialog, 25 Sep

Kevin's screenshot was the Claim all dialog, not the Rewards list. The dialog had become a two-line summary (from donations / from swaps). It now lists each reward: the top 5, a "··· N more" row, then the last reward, then "You claim". Title reads "Claim all · N rewards". When there are more than 6, "View all N rewards in History" closes the dialog and opens History. The HPT conversion rows in his screenshot are gone under the ledger model.

Wallet order re-checked on `wallet-enhanced.html` and `wallet-edge.html`: no Portfolio header, Huma Points box first, then Total portfolio.

## About tab layout, claim accordion, list icons, 25 Sep

- About tab re-laid out: three step tiles in a row (stacked below 700px), two rate tiles ("Donate $1 · 10 HP", "Swap $1 · 1 HP"), then Tiers | Benefits side by side from 900px, then one "Every donation counts twice" strip with its button, then fine print. Benefits are four bordered rows, each marked "Not yet enabled".
- Claim dialog "··· N more" is now a button (44px+, aria-expanded). It expands the hidden rewards in place, reads "Show less" with the chevron turned, and collapses again.
- List icons: claim history rows used a thin check or cross glyph. They now use a solid wallet glyph tinted by status (green completed, red failed), the same pattern as the rewards list (heart, swap arrows). The 2px tinted ring from the donation history and transaction lists is back on all list icons, at 44px.

## Per-reward Claim restored, 25 Sep

Nobody in the thread asked to remove single-reward claims; Confluence 88932370 §6.1 still lists Claim and Claim All. Each claimable row now has a "Claim" button (44px) that opens the same dialog with that one reward ("Claim reward", "Claim 120 HP"). Claim all stays the primary action in the hero. History rows and the detail read "Claim · 1 reward" or "Claim all · N rewards".

Per Renol: the "··· N more" ellipsis on the Rewards list is removed; the list shows every claimable reward. Kevin's top-5 rule stays on the Claim all dialog, where he asked for it.

## One rewards list, 26 Sep (Renol)

"All rewards earned" is removed from History. The Rewards tab now holds the whole reward record in one list: the latest 5 claimable rewards by default (with their Claim buttons); "Show 5 more · N remaining" loads five at a time, continuing into the claimed and adjusted ones under an "Earlier rewards" divider; "Show less" collapses back to 5. History is claims only, as §6.1 describes. The Claim all dialog's "View all N rewards" link now closes the dialog and expands that list.

Load more, 26 Sep (Renol): the Rewards list footer is the transactions page pattern, verbatim: "Showing 5 of 14 rewards", a filled Deep Blue "Load More Rewards" pill (spinner while loading, 350ms), and a "Show Less" outline pill once expanded that collapses to 5 and scrolls back to the list. Full width on phones.
