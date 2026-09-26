# UNERA hUSD — Full product audit · 2026-09-13

**Scope:** every screen of `UNERA hUSD Portal.dc.html` (Overview, Use cases, Portfolio, Get hUSD,
Redeem, Notifications, Proof of Reserve, Docs, Activity, Verification, Settings, Wallets + all
modals), plus `ui_kits/auth/index.html` and `ui_kits/stablecoin-app/index.html`.
**Expectations audited against:** `_audit/Responsive-Test-Cases-2026-07.md` (the team/Kevin
9-width matrix: 320/360/390/430/768/1024/1280/1440/1920, no h-scroll, ≥44px touch targets,
no body copy <13px, reduced motion), WCAG 2.2 AA, and the design-system rules in `readme.md`
(color roles, trust copy, radii, spacing, casing).
**Method:** source-level verification of every `@media` rule and `data-r` hook against the
matrix; ARIA/label/keyboard inventory; copy sweep against the governance table. Per-device-width
rendering still needs the DevTools pass the matrix prescribes (the authoring tool cannot resize
the viewport); every expectation below is traced to an actual source rule.

---

## 1 · Fixed in this pass

| ID | Sev | Area | Finding | Fix |
|---|---|---|---|---|
| **A-01** | **P1** | Functional (all timed UI) | The logic class declared `componentDidMount` and `componentDidUpdate` **twice**; the later (tweaks-flag) pair silently overrode the primary pair, killing the live network feed, 60-s quote countdown, card hard-lock countdown, tracker elapsed timer, `animateAll()` and tab-title updates. | Folded the tweaks flags into `syncMotionFlags()`, called from the single merged lifecycle pair. |
| **A-02** | P1 | Accessibility | The three headline amount inputs (Get "You pay", "You receive", Redeem amount) and the wallet-rename input had **no accessible name** (visual label is a nearby div). | `aria-label` on all four. |
| **A-03** | P2 | Accessibility | Only the confirm dialog carried `role`/`aria-modal`. Connect-wallet, signature gate, bank-accounts, receipt and add-card modals were plain divs. | `role="dialog" aria-modal="true"` + `aria-label` on all five. |
| **A-04** | P2 | Accessibility / keyboard | No **Escape** handling: modals, the notification panel, nav drawer and wallet menu could only be closed by pointer. | Global `keydown` listener closes the top-most overlay (removed on unmount). |
| **A-05** | P2 | Copy / governance | Tracker "While you wait" cards said **"Swap or spend"**, **"Cash out 1:1"** and **"you never have to queue"** — three direct hits on the readme governance table (no swap/cash-out language, never imply no-queue redemption). | Rewritten: "Spend or send…", "Redeem 1:1, any time · usually within one business day". |
| **A-06** | P3 | Legibility (X-04) | 0.68 rem (≈10.9 px) micro-labels on rail status chips and badges. | Bumped to 0.72 rem (12 per file). |
| **A-07** | P2 | Responsive (new layout) | The new two-up tracker/status splits carry `white-space:nowrap` rail labels; between 1080–1260 px the columns drop under ~380 px and labels could collide. | New `≤1260px` rule collapses `trackgrid`/`red2grid` a step earlier than the rest of the flow layout. |

## 2 · Responsive verification (vs the 2026-07 matrix)

**PORT.** All matrix breakpoints present and unchanged: 1080 (`g2`), 960 (nav → hamburger,
`hidemobile`), 900 (`g3`), 820 (hero address truncation), 720 (padding, `g3`/`g4`, `flexwrap`,
activity h-scroll min-width 600), 640 (wallet cards), 560 (`g2phone`), 460 (`g4` 1-col, `bal`,
`h1`, auth buttons), 380 (Log in hidden), reduced-motion collapse, notification panel clamped
to `min(340px, 100vw−24px)` (F-04 fix intact).

**Matrix updates for the new compact Get/Redeem layout** (supersedes the old centered-hero rows
in §B3/B4 — hero h1 is now a 1.7 rem rail title, so the ≤720 `h1→1.95rem` row no longer applies
to these two screens):

| Hook | Breakpoint | Expected |
|---|---|---|
| `flowgrid` (290px rail + content) | ≤1080 | 1 col, rail stacks above content, `position:static` |
| `flowside` flow strip | ≤960 | hidden (`hidemobile`) |
| `flowstepper` | ≤1080 | vertical → horizontal wrap row, 22px connectors |
| `get0grid` (form + quote), `red0grid` (form + fee card), `rev1grid` (table + rules) | ≤1080 | 1 col |
| `trackgrid`, `red2grid` (rail + stages) | **≤1260** | 1 col (nowrap rail labels, A-07) |

**AUTH.** 820 (single col, brand hidden, Remember-Me shown) / 520 / 360 rules intact;
reduced-motion + forced-colors present.

**KIT.** F-01 hamburger + drawer, F-02 `≤520`/`≤380` rules, F-07 reduced-motion — all present.

## 3 · Accessibility state after this pass

Present and verified: visible `:focus-visible` outline on all interactive elements (gold, 2px,
offset); `forced-colors` button borders; `role="alert"` on every inline error; `role="status"
aria-live="polite"` on the tracker headline; decorative rails/dust `aria-hidden`; icon-only
buttons all labelled (nav, bell, dismiss, copy, rename, close ×, back); estimate tooltip works
on focus as well as hover; all form fields in modals wrapped in real `<label>`s; `alt` on the
wordmark; reduced-motion collapse.

Contrast (dark theme): `--dim #c4cecd` ≈ 10:1 and `--mute #9ca9a8` ≈ 7:1 on `--panel`;
`--gold` ≈ 10:1; `--down #df7e98` ≈ 6.5:1 — all pass AA. `#3a2c08` on the gold CTA ≈ 8:1.

## 4 · Open items (recommendations, not regressions)

| ID | Sev | Item |
|---|---|---|
| O-01 | P3 | **No focus trap / focus return** in modals: Tab can leave an open dialog; closing does not restore focus to the trigger. Needs a small focus-management helper (all 6 dialogs). |
| ~~O-02~~ | — | **FIXED (second pass, same day):** hero `bal`/`h1` scale-down + activity-table h-scroll moved from ≤720 to a new **≤768** block, closing the F-05 tablet gap. Grid collapses (`g3`/`g4`) intentionally stay at 720. |
| ~~O-03~~ | — | **FIXED (second pass):** 17 small controls (copy chips, dismiss ×, close ×, remove, rename, back) tagged `data-r~="tap"`; new ≤768 rule gives them `min-width/min-height:44px` (F-06 / X-02). |
| O-07 | — | **NEW, fixed:** dialogs get `max-height:calc(100dvh − 40px); overflow:auto` — tall modals (receipt, bank list) scroll internally on short/landscape phones instead of clipping (X-05 / X-07 / X-10). |
| O-08 | — | **NEW, fixed:** the Get/Redeem settlement rails (`data-r="rail"`, nowrap node labels) become opt-in horizontal-scroll regions inside their card at ≤460 px; the page itself never h-scrolls (X-01). |
| O-09 | — | **NEW (footer):** the shared footer uses `data-r="container"` + `flexwrap` hooks, so it inherits the 720/460 padding + wrap rules; link columns wrap under the brand block on mobile. |
| O-04 | P3 | **Radius drift**: primary cards use 18 px on flows but 20 px on PoR/Portfolio (`border-radius:20px`), with 14/16 for sub-cards. Recommend standardizing primary=18, sub=14 in the next visual pass. |
| O-05 | P3 | Container top padding is 1.8 rem on the compact Get/Redeem flows vs 2.6 rem elsewhere — intentional (viewport-fit goal), documented here so it isn't "fixed" back. |
| O-06 | P3 | True per-width screenshots (320→1920) still require the DevTools pass per the matrix's capture note; this audit verified the rules, not rendered pixels, below the preview width. |

## 5 · Verification

Source-rule audit + live preview at authoring width; all fixes hot-reloaded with zero console
errors. Backup of the pre-audit file: `UNERA hUSD Portal v5 (pre-compact-flows).dc.html`.
