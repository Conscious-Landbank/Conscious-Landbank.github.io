# Skill: Apply an inline review comment (mentioned-element)

Use whenever the turn carries a `<webview_inline_comments>` / `<mentioned-element>` block — the user is pointing at a specific DOM node and asking for a change there. These are the bulk of iteration requests.

---

## Read the pointer precisely
1. Parse the `dom:` ancestry chain and `selector:` to locate the element in source — the `id:` (cc-1…) is a runtime handle, NOT in your files. Map it to the real class/id via `grep`.
2. The `text:` line tells you which instance (which card, which slide) — match on content, not array index.
3. If the comment references another file/section as inspiration ("like the transactions in wallet"), open that too and follow the reuse-existing-patterns skill.
4. If genuinely ambiguous which element or what behavior, ask — but usually the chain is enough to infer.

## Make ONLY the requested change
5. Change exactly what's asked; leave surrounding layout, spacing, colours, and content alone. Prefer `str_replace_edit` over rewriting the file.
6. Keep any `data-comment-anchor` on the element through the edit; carry it to the semantic equivalent if you restructure; drop it only when deleting.
7. If a broader improvement would help, finish the ask first, then SUGGEST the rest — don't apply it unprompted.

## Recurring intents seen here (and the fix)
- "add space, it sticks to the title" → the label+meta are inline; make each `display:block` with a small `margin-top`.
- "use a nicer dropdown from the design system" → swap the raw `<select>` for the wallet-scope dropdown pattern.
- "make this like <section> in <page>" → lift that component's CSS+markup+JS wholesale into the shared file.
- "use real image / use this image for all" → set it once in the data module so every instance updates.
- "reuse this <thing> for all others" → factor it into shared CSS/JS and apply across the feature's pages.

## Close the loop
8. Verify the specific element rendered as asked (screenshot or `eval_js`), then `ready_for_verification`. Keep the summary to what changed — the user is iterating fast and wants terse confirmation.
9. Snip resolved comment rounds from context as you go.
