# Planning handoff — Composer-grade specification bar

**Purpose:** Canonical text for Cursor project rules. To enforce in Cursor IDE, duplicate this frontmatter block into **[`.cursor/rules/planning-handoff-composer-grade.mdc`](/Users/minhnguyenhoang/009 Conscious Landbank/Cursor/CLB/.cursor/rules/planning-handoff-composer-grade.mdc)** (`alwaysApply: true`) or merge into AGENTS/RULE docs.

---

```yaml
---
description: Implementation plans must be Composer-grade detailed so fast models ship the same UX quality as Claude Sonnet.
alwaysApply: true
---
```

Whenever an agent produces or extends an **implementation plan**, **spec**, or **ticket handoff** for this repository (Markdown in Cursor Plans, `markdown/*`, PR bodies intended as sole design doc), the document MUST be detailed enough that **Composer 2** implements **without ambiguity** while matching repo rules and sibling files.

Plans that state intent only (“move the stepper”, “improve a11y”) are insufficient.

## Required sections (adapt headings; preserve information)

1. **Scope contract** — Goal, non-goals, primary file paths (workspace-relative).
2. **Canonical references** — Specific files implementers MUST open + `.cursor/rules/*.mdc` to obey.
3. **Visual & token checklist** — Breakpoints, tokens, gradients ban, typography/button minimums for `NewUnera/*`.
4. **Behavioral contract** — Quote or summarize existing JS/session APIs (function names, localStorage keys) and per-action state deltas.
5. **DOM structure** — Before/after or final HTML scaffold; preserved IDs/selectors listed if scripts depend on them.
6. **CSS delta** — New class blocks, moved margins, mobile `font-size: 1rem` on OTP inputs where required.
7. **Accessibility matrix** — Table: heading order, `aria-current`, `aria-live`, focus targets, fieldset/legend, decorative labeling.
8. **JavaScript state machine** — Branches (`setStep`, completion flags), announcement strings.
9. **Acceptance criteria** — Binary QA checks (DOM queries, navigation, no regressions).

## Quality bar parity

Comparable to Claude Sonnet 4.x: respect **`newunera-admin-pages.mdc`**, **`newunera-accessibility-wcag.mdc`**, **design-only scope** (no backend), minimal file touch.

Append a one-line **execution constraint** (“only edit X file; do not change Y”) when it prevents scope creep.
