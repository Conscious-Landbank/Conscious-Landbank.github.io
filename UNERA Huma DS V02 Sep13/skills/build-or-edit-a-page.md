# Skill: Build or Edit a Huma Page

A repeatable procedure for creating a new consumer page or editing an existing one so it meets this project's bar on the first pass. `CLAUDE.md` is the *why* and the rules; this is the *how*: the step order to follow. Invoke it whenever the task is "make/edit a Huma screen or flow."

## A. Orient (before writing any code)

1. Locate the requirement. Find the governing doc in `docs/` for this exact page/flow. Quote the Transaction Preview table + User Flow steps. If none exists, **ask** which doc or section governs. Don't invent one.
2. Locate the source of truth. Open the canonical implementation in `unera-pages/` (all consumer pages live there; `_archive/` holds superseded drafts). For anything nav-related, `account-settings.html` is the single source.
3. Pick the reference sibling. Most flows should mirror an existing one. Default reference = **`send-enhanced.html`** for shared patterns (tip box, review callout, summary rows). For a transactional flow, the closest sibling is Buy, Swap or Trade. Copy its spine, don't start blank.
4. State the system out loud. One short paragraph: which layout, which tokens, which components, which reference page. Then build.

## B. Build / edit

5. Work in `unera-pages/`. Keep the page self-sufficient: inline the nav lockup + its icon sizing (don't rely on `consumer-app-nav.css` loading), link `styles.css` for tokens.
6. Compose, don't reinvent. Reuse components/patterns from the design system and the reference sibling. Match the page-header spec, the stepper, the amount-section (no double `.card` wrap), the rounded no-left-border tip box.
7. Honor the flow anatomy (see `CLAUDE.md §4`): prereq gate -> amount -> grouped review (Order group, Costs group with the PRD's exact gas/fee rows, rate-lock line, "N wallet confirmations" hint, single irreversibility callout) -> asymmetric terminal.
8. If the step can leave the user waiting (crypto donation, fiat purchase, swap), mount the shared **Transaction Tracker** (`unera-pages/tx-tracker.css` + `tx-tracker.js`, `TxTracker.mount(host, config)`) plus the nav pending pill (`#txPendingPill`) and a `progressing` bell notification. Never write a second waiting screen. See `CLAUDE.md §4b`.
9. Wire edge/error cases with the demo-pill bar (`guidelines/edge-case-demo-bar.md`), in-memory only, each pill marked blocking or non-blocking, always including a happy-path pill.
10. Match copy to the page's verb (send / swap / trade / buy). Delete any leftover copy from the page you forked.

## C. Trap-check (the bugs that recur here)

11. For **every** element toggled with the `hidden` attribute, confirm there's a paired `.class[hidden] { display: none }`, because author display rules beat the UA `[hidden]` rule.
12. For **every** button inside a horizontal flex banner, confirm `width: auto` (the base `.btn` is `width:100%`) + `flex-wrap` + a ≤560px stack rule.
13. Scan for **anti-patterns**: V1 colors, hardcoded hex where a token exists, gradients on product UI, per-page nav forks, brand color used for money (or vice-versa), Heroicons in Material wrappers.
14. Confirm the **balance hero** is ≤ 160px on desktop with a 2.5rem figure and exactly one primary CTA, and that the attention strip
    (pending tx / KYC) sits directly beneath it (`CLAUDE.md §4c`).
15. Confirm **prototype state is never persisted** (auto-verify, demo pills, edge state are in-session only, so the flow resets on reload).

## D. Verify (DOM, not vibes)

16. Use `eval_js` to measure: computed styles, element widths, class state across steps, that each edge pill drives the banner + CTA correctly, that terminals render the right variant. Screenshots are flaky here, so prove behavior by querying the DOM.
17. Run `get_webview_logs` for console errors. Run the **§5 consistency checklist** in `CLAUDE.md`.
18. If it's a design-system change, run `check_design_system` until clean.

## E. Hand off

19. Lead the summary with **what changed** and any **decision the user still needs to make** (e.g. a PRD conflict you flagged but didn't silently resolve). Keep deliverables in `unera-pages/` with their deps so they preview standalone.
