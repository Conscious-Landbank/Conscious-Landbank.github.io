---
name: human-writing
description: Rules for writing that does not read as machine-generated. Apply to every piece of text in any of Minh's projects (UI copy, microcopy, docs, READMEs, specs, hand-off notes, Slack/Jira updates, Claude Design canvases). Sources - Grammarly "common AI words", ossa-ma "AI writing tropes" gist, Wikipedia "Signs of AI writing", r/WritingWithAI AI-isms megathread (all read Aug 2026).
---

# Human writing rules

Use this skill before writing or editing any text a person will read. It applies to product copy, error messages, empty states, tooltips, onboarding, README and spec files, change logs, tickets, chat messages, and the prose inside design canvases.

The goal is not to hide that a tool helped. The goal is text that a careful person would write: specific, plain, with a point of view, and free of the tics readers now recognise as machine output.

## 1. The one principle

Machine text regresses to the mean. It swaps the specific fact for the generic, positive, important-sounding phrase. Every rule below is a symptom of that. So the first question is always: **what is the concrete thing here?** Name it. The number, the place, the person, the step, the cause. If you cannot name anything concrete, cut the sentence.

## 2. Hard bans (search and remove)

### 2.1 Vocabulary

Never use these in any register. Replace with the plain word in brackets or cut.

delve (look at / read), tapestry, landscape (as an abstract noun), realm, paradigm, synergy, ecosystem (unless it is literally the Unera/Huma ecosystem product name), harness (use), leverage as a verb (use), utilize (use), facilitate (help / let), endeavor (try), streamline (simplify / shorten), bolster (support / back), underscore / highlight as verbs of emphasis (show), showcase (show), testament, pivotal, crucial, vital, essential, fundamental, key as an adjective (main), robust, seamless / seamlessly, intricate, meticulous, vibrant, profound, myriad, nuanced, transformative, revolutionize, game-changing, cutting-edge, innovative, groundbreaking, renowned, boasts (has), nestled, in the heart of, rich (heritage / history), diverse array, valuable insights, enhance (improve, or say what gets better), foster / cultivate, garner, interplay, enduring, align with / resonate with, navigate (the complexities of), unlock (the potential), embark (on a journey), deep dive, elevate, empower, holistic, comprehensive, impactful.

### 2.2 Openers, transitions, and sign-offs

Never start a sentence with: Additionally, Moreover, Furthermore, Importantly, Notably, Interestingly, Ultimately, In conclusion, To sum up, In summary, That being said, At its core, To put it simply, From a broader perspective, When it comes to, In the context of, In today's ..., In the ever-evolving ..., It is worth noting, It bears mentioning, Here's the thing, Here's the kicker, Here's where it gets interesting, Here's why, Let's break this down, Let's dive in, Let's unpack, Let's explore, Imagine a world where, Think of it as, A small point, but, The path is clear, A key takeaway is, This underscores the importance of.

Never end with a summary that restates the section, a "reflection" beat ("as the team moves forward..."), an offer ("Let me know if...", "I hope this helps"), or "In conclusion".

### 2.3 Sentence patterns

- **Negative parallelism.** "It's not X, it's Y." "Not just X but Y." "Not X. Not Y. Just Z." "X rather than Y" used for drama. Say what it is.
- **Rhetorical question answered at once.** "The result? A faster wallet." Write the statement.
- **Rule of three on autopilot.** Three adjectives, three noun phrases, three bullets, every time. Use the real number of things. Two is fine. Five is fine.
- **Anaphora.** Three sentences starting with the same word for rhythm.
- **Fragment. For. Emphasis.** Short verb-less fragments as their own paragraph.
- **Participle tails.** "..., highlighting its importance." "..., reflecting broader trends." "..., ensuring a smooth experience." Cut the tail; if the claim matters, make it its own sentence with evidence.
- **Copula dodging.** "serves as", "stands as", "functions as", "represents", "marks", "refers to", "features", "offers" where "is" or "has" is meant.
- **Vague connection.** "associated with", "in connection with" instead of of / for / by / used in.
- **False ranges.** "From X to Y" where X and Y are not ends of a scale.
- **Prophetic narrator.** "And then everything changed." "This is where it gets interesting."
- **Interpretive commentary.** Explaining what an obvious action or number means ("a gesture more defensive than welcoming").
- **Hedging stacks.** "generally speaking", "to some extent", "arguably", "it can be argued", "one might say", "in many cases" piled on a claim you could simply make or drop.
- **Gravitas padding.** Words that change nothing if removed: truly, genuinely, honestly, really, very, incredibly, remarkably, deeply, fundamentally, quietly.
- **Despite its challenges formula.** "Despite X, Y faces challenges... Despite these challenges, the future is bright."
- **Vague authority.** "experts say", "observers note", "industry reports", "many users". Name the source or drop the claim.
- **Invented concept labels.** Coining a capitalised or quoted term ("the Supervision Paradox") and treating it as established.
- **Stakes inflation.** A settings page is not "a journey"; a fee row is not "a commitment to transparency".
- **Listicle in prose.** "The first... The second... The third..." Use a list or write the paragraph.
- **Numbered phase labels** in prose ("Phase 1:", "Step 2:") when the text is not actually a procedure.
- **Fake casual quotes.** 'users go "nope"'.
- **Compliment sandwich.** Say the problem.
- **Historical analogy stacking.** "Apple didn't build Uber. Facebook didn't build Spotify."

### 2.4 Punctuation and formatting

- **Em dashes:** at most one per screen of UI copy and at most two per page of prose, never spaced ( — ), never as the pivot of a "not X — Y" sentence. Prefer a comma, a full stop, a colon, or parentheses. In UI copy use a middle dot (·) or a full stop for metadata separators, not a dash.
- **No bold-first bullets** ("**Fast:** the page loads..."). Either a plain list or a short heading plus a sentence.
- **No emoji as bullets or heading decoration.** No decorative unicode arrows (→ ➜ ✨ 🚀) in prose. Arrows are fine inside a diagram or a step indicator in the UI.
- **Headings in sentence case**, not Title Case. No "X and Y" catch-all headings ("Awards and Recognition", "Challenges and Legacy").
- **No thematic-break lines (---) between every section.** No heading that only contains other headings. No level-1 title heading repeating the document name.
- **No curly quotes in UI strings or code.** Straight quotes. (Curly quotes are fine in typeset documents when used consistently.)
- **No "Key takeaways" / "Summary" boxes** that repeat what was just said. No fractal summaries (summary inside each section plus a final one).
- **No tables for two facts.** Tables are for real grids of comparable data.

### 2.5 Chat leakage

Never leave assistant voice in a deliverable: "Certainly!", "Of course!", "Great question", "You're absolutely right", "Here is a...", "Would you like...", "as of my last update", "based on the available information", "while specific details are limited". Never leave notes to the user inside the artifact ("delete this section before submission").

## 3. What to do instead

- **Lead with the fact.** "Your hUSD arrives in 2 to 5 minutes." not "We are committed to a seamless experience."
- **Use is, are, has, does.** They are the honest verbs.
- **One idea per sentence; vary length** by what the idea needs, not to sound lively.
- **Prefer the concrete noun** (USDC, Nairobi, 12 confirmations, Grant Thornton) over the category (asset, region, checks, auditor).
- **Name the actor.** "We hold your deposit until checks pass." not "Deposits are held until checks are passed."
- **Say the number once and do not dress it.** "$1 minimum." not "a modest minimum of just $1".
- **Keep a point of view.** A human writer prefers things and says so: "Use USDC if you can; it settles fastest."
- **Cut the first and last paragraph** of any draft and see if anything was lost.
- **Read it aloud.** If you would not say it to a colleague across a desk, rewrite it.
- **Contractions are allowed** in product copy and chat ("you'll", "we'll", "can't"). Formal docs may avoid them; either way, be consistent.
- **Specific beats safe.** A sentence that could be pasted into any other product's docs is a sentence to rewrite.

## 4. Product-copy specifics (UI, microcopy, errors, empty states)

- Buttons: verb + object, two or three words. "Get hUSD", "Copy address", "Try again". Never "Let's go!", "Unlock", "Elevate".
- Status lines: state + what happens next + what the user must do (often nothing). "Confirming on Ethereum · nothing to do" beats "Your transaction is being seamlessly processed".
- Errors: what went wrong, what to do, in that order. No apology stacks, no "Oops".
- Empty states: say what will appear here and the one action that fills it.
- Reassurance: one sentence, factual ("The network is slow, not your funds.") rather than three sentences of comfort.
- Never explain the UI to itself ("This card shows your balance.").
- Keep product names exact and do not decorate them: Unera Stablecoin, hUSD, Huma Platform, Humanity Centers, Huma Points, Impact Points.

## 5. Docs, specs, change logs, tickets

- Open with what changed or what is decided, in one sentence. No preamble about context or importance.
- Use tables only for real matrices (file → change, requirement → status).
- Headings in sentence case. No heading for a single paragraph.
- Decisions and open questions: plain lists, owner named, no "key risks to consider".
- No closing "Summary" or "Next steps" that restate the body. If there are next steps, list them once, with owners.
- Dates and versions as facts, not as drama ("as of the 22 Aug revision").

## 6. Self-check before you ship

Run the checker (`scripts/ai_tells.py <files>`) and fix every hit, then read the text once more for the patterns it cannot catch (parallelism, rule of three, stakes inflation, participle tails). The checker is a floor, not the bar.

Quick manual pass, in order:
1. Search for em dashes. Keep at most the allowed count.
2. Search for the §2.1 words and the §2.2 openers.
3. Look for "not ... but", "It's not", "isn't just", "rather than".
4. Look for sentences ending in an "-ing" clause.
5. Look for three-item lists and ask if the number is real.
6. Look for "serves as / stands as / represents / refers to".
7. Delete every sentence that tells the reader how important something is.
8. Delete the closing summary.

## 7. Exceptions

- Quoting a source verbatim (a spec, a Slack message, a law).
- Established product or technical terms (ecosystem as a product name, "key" as in cryptographic key, "robust" in a quoted audit).
- Code identifiers, CSS, test names. The rules are for human-facing text only.
