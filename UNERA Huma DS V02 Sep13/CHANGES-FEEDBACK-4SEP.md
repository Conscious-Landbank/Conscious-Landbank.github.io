# Feedback fixes · 4 Sep 2026

Source: the 31 Aug Slack status thread, replies 20-27 (Eric 3 Sep, Kevin + Eric 4 Sep). Earlier replies (1-19) were already shipped; see CHANGES-FEEDBACK-1SEP.md.

## 1. Phase-1 method gating (Eric, reply 20)

Phase 1 ships Card only; every method stays visible so users know what arrives next.

- add-money.html: Bank transfer, Wise and MoneyGram render disabled with a "Coming soon" badge, `aria-disabled`, hidden check, no hover affordance; Card stays preselected so the happy path costs zero extra taps. A "Release phase" demo pill group (Phase 1 · Card only / Phase 2 preview · all methods) flips the gate in-memory; flipping back snaps the selection to Card.
- donate.html + donate-flow.js: the fiat rail chips (Card | Bank transfer) replaced with the buy-style method card list Eric praised: Card enabled; Bank transfer gated behind the same phase pill (flow stays fully built); Wise and MoneyGram shown as display-only "Coming soon" rows (no donate flow exists for them yet). Disabled rows read "Arrives in a later release. Card works today."
- Gating is prototype state, in-memory only, never persisted.

## 2. Rate lock extended, refresh explained (Kevin, replies 22-25)

- HARD_LOCK_SECS 180 -> 300 in add-money's card checkout (Kevin: raise to 240-300 so card entry fits inside the locked price). Chip and button counters updated (5:00 / 300).
- The countdown starts when the user lands on card entry, i.e. when they pick how to pay, which matches Kevin's "count down from the time users select the payment". The review step keeps its 60s auto-refreshing rate chip, so the price also "winds down from review" (reply 24).
- Checkout copy now says what expiry means: "If the timer runs out, the price refreshes to the latest rate and you can confirm again." The expired state was already a refresh-and-retry, not a dead end.

## 3. Structure ruling (Kevin reply 26, Eric reply 27)

Eric closed the thread: keep buy as 2 steps (Review, then payment with retry) for release 1, revisit after launch. No structural change made; donate keeps its merged Review & pay step (it has no rate lock, so the merge costs nothing). Kevin's consistency concern ("if we merge donation, we merge buying") stands as a post-release evaluation item, flagged to the user.

## 4. Responsiveness standards captured as a skill

- New `skills/responsive-mobile.md`: Eric's mobile bar distilled into acceptance criteria (zero overflow at 360/414 on every state, right-aligned wrapping values, one-line labels, thin full-width stacked CTAs, 44px+ targets, no hover-only controls, the known CSS traps).
- CLAUDE.md: skill declared mandatory for every page task and added to the §5 checklist.

## 5. Saved-card CVV re-entry in donate (Eric's inline comment, 4 Sep)

Audit of every card-charging surface against the buy checkout's rule (saved-card reuse re-enters the CVV, never stored):
- add-money checkout: already had it (`#coSavedCvvWrap`) - the pattern Eric pointed at.
- payment-methods add-card modal: collects CVV to verify the card, stores only brand + last4 + expiry + name - correct, no change.
- donate Review & pay: charged a saved card with NO CVV - the gap. Added the same field under the card picker (shown once a card is picked, digits-only, cleared on every render, never stored). Paying without it blocks with "Enter your card security code" and focuses the field; the error clears when payment proceeds.
- send / exchange / stake are wallet flows, no cards - nothing to add.
`_donate-flow-test.html` now asserts the block-then-pass behavior and that no stale error banner survives into the success terminal.

## 6. Waiting-state motion (Kevin, 28-29 Aug thread: animated media, no mascots)

The shared Transaction Tracker's route illustration (wallet · network · destination) now animates: small deep-blue dots travel along each dashed connector segment while the transaction runs, movmint-style, two per segment on a staggered loop. A completed leg turns into a solid fin-up line and its dots stop; done and failed states stop all motion. CSS-only, collapses under `prefers-reduced-motion`. Because the tracker is shared (tx-tracker.js/.css), donate, buy and swap waits all pick it up with no per-page work.

## Verification

- New `unera-pages/_responsive-audit-flows.html`: walks every step of donate, add-money, exchange and send at 360 and 414 px. Zero horizontal overflow on any step of any flow.
- `_donate-flow-test.html` extended with a phase-gating leg (4 method rows, 3 disabled with badges, gated click ignored, smallest row 84px, phase-2 pill enables bank only) and its bank leg now previews phase 2 first. All card, bank, crypto and failed-retry paths pass with real values; EUR quote line renders; bank terminal reached.
- add-money: phase pills gate/ungate the three methods, selection snaps to Card, checkout countdown runs from 5:00.
- donate: rail list renders 4 rows, only Card selectable in phase 1, phase 2 pill enables Bank transfer and re-renders the amount UI; card and bank flows still reach their terminals.
- No horizontal overflow at 360/414 on the changed steps.
