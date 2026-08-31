# Skill: Audit a page/flow against its Confluence PRD

Use when the task is "audit / check / make sure X matches the requirements," or before improving any Huma screen. Turns a vague "is it right?" into a field-by-field verdict.

---

## A. Pull the source of truth
1. Read the exact Confluence page with the Atlassian tools (`atlassianrovo__getConfluencePage`, `contentFormat:"markdown"`, pass the numeric page id). Also check `atlassianrovo__getConfluencePageDescendants` for child specs and `...FooterComments` for reviewer notes.
2. If the page is long and truncates, re-fetch and page through — do NOT audit from memory of a partial read. The tail often holds Open Questions / Acceptance Criteria that change scope.
3. Mirror the captured PRD in `docs/` when one exists; the live page is auth-gated for the user.

## B. Build the checklist
4. Extract every requirement ID (e.g. `DON-DASH-01`, `HC-DETAIL-07`), each Acceptance Criterion (`AC-DON-*`), the state table (§6.2), the error table (§6.3), the notification events (§4.3.1), and the closed/open Open Questions.
5. For each, mark **Present / Partial / Missing** against the current build. Cite the section id in your findings ("§5.3 step 7", "AC-DON-05").

## C. Report, don't silently fix scope
6. Lead with what's **missing or not good enough**, each tied to its requirement id.
7. When two specs conflict (e.g. AMM vs Oracle pricing), **surface both and ask** — never pick silently.
8. Respect closed Open Questions as settled decisions (e.g. cards-only, USD display, multi-HC not MVP). Flag anything that contradicts them.

## D. Then improve
9. Only after the spec gaps are closed do UX/visual improvements — smallest change, biggest impact, existing components/tokens only.

## Verify
10. Prove behavior by DOM (`eval_js`), not screenshots — measure computed styles, class state across steps, that each edge case drives the right banner + CTA.
