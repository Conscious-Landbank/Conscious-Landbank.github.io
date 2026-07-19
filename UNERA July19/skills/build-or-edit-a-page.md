# Skill: Build or Edit a UNERA Page

A repeatable procedure for creating a new consumer page or editing an existing one so it meets this project's bar on the first pass. `CLAUDE.md` is the *why* and the rules; this is the *how* — the step order to follow. Invoke it whenever the task is "make/edit a UNERA screen or flow."

---

## A. Orient (before writing any code)

1. **Locate the requirement.** Find the governing doc in `docs/` for this exact page/flow. Quote the Transaction Preview table + User Flow steps. If none exists, **ask** which doc/section governs — don't invent one.
2. **Locate the source of truth.** Open the canonical implementation in `Unera-Claude/NewUnera/` (and the working copy in `unera-pages/`). For anything nav-related, `account-settings.html` is the single source.
3. **Pick the reference sibling.** Most flows should mirror an existing one. Default reference = **`send-enhanced.html`** for shared patterns (tip box, review callout, summary rows). For a transactional flow, the closest sibling is Buy/Swap/Trade — copy its spine, don't start blank.
4. **State the system out loud.** One short paragraph: which layout, which tokens, which components, which reference page. Then build.

## B. Build / edit

5. **Work in `unera-pages/`.** Keep the page self-sufficient: inline the nav lockup + its icon sizing (don't rely on `consumer-app-nav.css` loading), link `styles.css` for tokens.
6. **Compose, don't reinvent.** Reuse components/patterns from the design system and the reference sibling. Match the page-header spec, the stepper, the amount-section (no double `.card` wrap), the rounded no-left-border tip box.
7. **Honor the flow anatomy** (see `CLAUDE.md §4`): prereq gate → amount → grouped review (Order group, Costs group with the PRD's exact gas/fee rows, rate-lock line, "N wallet confirmations" hint, single irreversibility callout) → asymmetric terminal.
8. **Wire edge/error cases** with the demo-pill bar (`guidelines/edge-case-demo-bar.md`), in-memory only, each pill marked blocking or non-blocking, always including a happy-path pill.
9. **Match copy to the page's verb** (send / swap / trade / buy). Delete any leftover copy from the page you forked.

## C. Trap-check (the bugs that recur here)

10. For **every** element toggled with the `hidden` attribute, confirm there's a paired `.class[hidden] { display: none }` — author display rules beat the UA `[hidden]` rule.
11. For **every** button inside a horizontal flex banner, confirm `width: auto` (the base `.btn` is `width:100%`) + `flex-wrap` + a ≤560px stack rule.
12. Scan for **anti-patterns**: V1 colors, hardcoded hex where a token exists, gradients on product UI, per-page nav forks, brand color used for money (or vice-versa), Heroicons in Material wrappers.
13. Confirm **prototype state is never persisted** (auto-verify, demo pills, edge state are in-session only, so the flow resets on reload).

## D. Verify (DOM, not vibes)

14. Use `eval_js` to measure: computed styles, element widths, class state across steps, that each edge pill drives the banner + CTA correctly, that terminals render the right variant. Screenshots are flaky here — prove behavior by querying the DOM.
15. Run `get_webview_logs` for console errors. Run the **§5 consistency checklist** in `CLAUDE.md`.
16. If it's a design-system change, run `check_design_system` until clean.

## E. Hand off

17. Lead the summary with **what changed** and any **decision the user still needs to make** (e.g. a PRD conflict you flagged but didn't silently resolve). Keep deliverables in `unera-pages/` with their deps so they preview standalone.
