# Writing pass: human-sounding copy across the project

Every human-facing string in the canvas, the two UI kits, the guideline cards, the component
docs and the project prose was rewritten against `skills/human-writing/SKILL.md`. No binding,
class, id, handler, layout rule or product fact was changed. `{{ }}` bindings, `sc-if` / `sc-for`
attributes and every identifier are untouched; the diff is text nodes, attribute copy, JS string
literals and comments only.

## Kinds of edit

**Punctuation.** 133 literal em dashes and 46 `—` escapes in the canvas, 29 in each kit and
about 100 across the docs became full stops, commas, colons, semicolons or a middle dot where the
text is UI metadata ("Level 2 · Verified · issue & redeem unlocked"). Ten curly quotes in HTML text
and every `’` escape in a JS string became straight quotes, escaped as `\'` inside
single-quoted literals. The `'—'` placeholder used for an empty table cell stays: it is a
typographic glyph, not prose.

**Arrows.** Trailing arrows on link and CTA labels ("View all →", "Manage cards →", "Full token
specs →", "{{ n.cta }} →", "Create an account →") are gone. Arrows that carry a real flow stay:
the redeem "amount → destination" line, the `USD→hUSD` rate pair. Step-order arrows in comments and
docs became comma lists, since the step indices already carry the order.

**Sentence-level tells.** Participle tails ("making it harder to undo"), negative parallelism
("Honest progress, not just a 'done' celebration"), copula dodges ("**StatusTimeline** — vertical
tracker" became "**StatusTimeline** is the vertical tracker"), gravitas words ("simply adjust",
"elevates to Level 2") and one round of over-reassurance ("the network is just slow") were rewritten
to lead with the fact.

**Copy defects found on the way.** "Large redemptions may be may wait briefly" (duplicated words),
"so the reserve stays clean and trusted — that's what keeps hUSD trusted" (the word twice in one
sentence), and a caveat paragraph in `readme.md` that appeared twice verbatim.

**Docs.** Thematic-break lines between sections removed from `readme.md`, `SKILL.md`,
`CHANGES-FE-207.md` and `CHANGES-FE-208.md`. Headings put in sentence case ("## CONTENT
FUNDAMENTALS" became "## Content fundamentals"). Bold-first bullets unbolded, and two lists that
were really matrices (the notification event kinds, the tracker stage copy) became tables. The
"Harness note" callout is now "Test-rig note", since *harness* is on the banned list. The 🦊 in
`readme.md` prose is now "the MetaMask fox glyph"; the glyph itself stays in the markup where it is
an icon.

**Writing rule wired in.** `SKILL.md` and `readme.md` now both point at
`skills/human-writing/SKILL.md` and require
`python3 skills/human-writing/scripts/ai_tells.py --summary <paths>` before hand-off.

## Ten UI examples

| Where | Before | After |
|---|---|---|
| PoR hero (canvas) | What backs every hUSD — and how to check it yourself. | What backs every hUSD, and how to check it yourself. |
| Tracker reassurance | Your money is safe — the network is just slow, not your funds. | Your money is safe. The network is slow, not your funds. |
| Card payment note | This is a one-time payment — your card is only charged when you confirm — never automatically. | This is a one-time payment. Your card is charged only when you confirm, never automatically. |
| Crypto deposit step | Your personal deposit address — send USDC/USDT here any time. | Your personal deposit address. Send USDC/USDT here any time. |
| Yield notification | Passive Reserve Yield for July — $1.42M — reached Humanity Centers automatically. | $1.42M of Passive Reserve Yield for July reached Humanity Centers automatically. |
| Verify identity page | We check every account so the reserve stays clean and trusted — that's what keeps hUSD trusted. | We check every account so the reserve stays clean, and that is what keeps hUSD worth holding. |
| Redeem queue notice | Large redemptions may be may wait briefly … protected the whole way — estimated arrival ~1–2 business days. | Large redemptions may wait briefly … protected the whole way. Estimated arrival ~1–2 business days. |
| Notifications empty state | No notifications right now — purchase, redemption and verification updates will appear here. | No notifications right now. Purchase, redemption and verification updates will appear here. |
| "Learn while you wait" card | Each one is another block stacked on top of yours, making it harder to undo. | Each one is another block stacked on top of yours, so undoing it gets harder. |
| PoR liquidity line | Redeeming isn’t instant — most requests arrive within one business day. | Redeeming isn't instant. Most requests arrive within one business day. |

Two more worth naming: the compliance stage now reads "A quick automatic check of your limits and
quota, plus sanctions screening" in all three places it appears, and the account-level chip reads
"Level 2 · Verified · issue & redeem unlocked" instead of using a dash as the separator.

## Exceptions

15 checker hits remain across the scoped files. Each is deliberate.

| File | Hits | What it is |
|---|---|---|
| `UNERA hUSD Portal.dc.html` | 1 arrow | The redeem summary `{{ redeemReceiveStr }} {{ redeemOutCcy }} → {{ redeemDestLabel }}`: a from → to pair, which the skill allows in UI. |
| `ui_kits/stablecoin-app/index.html` | 3 arrows | The rate-pair labels `USD→hUSD` and `` suf + '→hUSD (1:1)' ``: the same from → to pair. |
| `ui_kits/stablecoin-app/index.html` | 1 emoji | The MetaMask fox in the wallet-connect row. It is a provider mark used as an icon in markup, and `readme.md` already names it as the one sanctioned glyph. |
| `SKILL.md` | 2 thematic breaks | The `---` fences of the YAML frontmatter. Removing them breaks the skill manifest. |
| `CHANGES-FE-207.md` | 2 (1 em dash, counted twice) | The Jira ticket title `FE-207 "UI/UX — Update design for layer names and reduce user's cognitive"`, quoted verbatim. |
| `CHANGES-FE-208.md` | 6 | Verbatim quotes: the Jira title `FE-208 "UI/UX — Update design of HC and Donation features"`, the removed strapline *"A share of reserve income funds community well-being — value, shared by design."*, the old kit heading `"Reserve yield → mission"`, and the product line "issues, redeems and proves hUSD" (a real three-item list, not a rhetorical triple). |

Out of scope for the sweep: `skills/human-writing/SKILL.md` itself, which quotes the banned
vocabulary and therefore scores 99 hits by design; this file, which quotes the before-copy and so
scores 53; `_audit/`; the archived `v1` and
`v2 (pre-…)` canvases; `screenshots/`; `fonts/`; `tokens/`; `base.css`; `styles.css`; `support.js`;
`uploads/`.

## Checker and render verification

```
python3 skills/human-writing/scripts/ai_tells.py --summary "UNERA hUSD Portal.dc.html" \
  ui_kits guidelines components readme.md SKILL.md CHANGES-FE-207.md CHANGES-FE-208.md
```

15 hits, all listed above. `readme.md`, `ui_kits/auth/*`, `guidelines/`, `components/` and the
project prose apart from the two quoted ticket titles are at zero.

The `<script type="text/x-dc">` block was extracted and passed `node --check`, as did both kits'
script blocks. Playwright / Chromium at 1366×900 served the folder over HTTP and clicked through
Portfolio, Get hUSD on the fiat path (Amount, Review, Pay, card, Status) and the crypto path
(Wallet, Amount, Review, Deposit, Status), Redeem, Proof of reserve, Activity, Notifications, plus
both kits: **zero console errors, zero local 404s**, and no screen rendered an unresolved `{{ }}`,
`undefined`, `NaN` or `[object Object]`. Screenshots in `screenshots/writing-pass/`.

The two edited guideline cards were loaded the same way. They each log one 404 console line for a
resource the static server does not hold; that reproduces on the stashed `5af4050` baseline, so it
predates this pass.

> The canvas pulls React 18.3.1, ReactDOM 18.3.1 and `@babel/standalone` 7.26.4 from `unpkg.com`,
> which the sandbox proxy blocks. The run serves pinned local copies through a Playwright route so
> the component boots. No project file was changed for testing.
