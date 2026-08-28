# Huma skills index

How to work most effectively on this project, distilled from real sessions. `CLAUDE.md` is the standing rulebook (the *why* + non-negotiables); these skills are the *how* for recurring tasks. Read the one that matches the request before starting.

| When the task is… | Use |
| --- | --- |
| Make / edit any consumer screen or flow | `build-or-edit-a-page.md` |
| "Audit / check against the requirements", or before improving anything | `audit-against-confluence-prd.md` |
| "Make it like <section> in <page>", "keep consistent", "use 100% DS components" | `reuse-existing-patterns.md` |
| "Fully responsive", "pass accessibility" | `responsive-a11y-pass.md` |
| "Looks plain / not good enough / research and improve the visual" | `improve-ui-heuristics.md` |
| A `<mentioned-element>` / inline comment points at a specific element | `apply-inline-comment.md` |
| Writing or editing any text a person will read: UI copy, docs, change logs, tickets | `human-writing/SKILL.md` |

## The through-line (applies to every task)
1. Source of truth before pixels. Governing Confluence PRD (`docs/` mirror) + the canonical implementation in `unera-pages/` (single canonical location since the Aug 22 consolidation). Never design from memory or a screenshot when code exists.
2. Reuse over invent. Lift the real component (CSS + markup + JS) from wallet / account-settings / send; one shared stylesheet + one data module per feature so "reuse this for all" is a one-line change.
3. Tokens only, money≠brand colour, no gradients on product UI. (CLAUDE.md §2.)
4. Prototype state is in-memory only. Demo bars, edge pills and auto-verify all reset on reload.
5. Verify by DOM, not vibes (`eval_js`, `get_webview_logs`), run the responsive-a11y pass, then `ready_for_verification`.
6. Write like a person. Every string, every heading and every doc line follows `skills/human-writing/SKILL.md`. Run `python3 skills/human-writing/scripts/ai_tells.py --summary <paths>` and clear it before hand-off.
7. Keep summaries terse and honest: lead with what changed and any decision still needed, and flag conflicts instead of silently choosing. Snip settled rounds from context as you go.
