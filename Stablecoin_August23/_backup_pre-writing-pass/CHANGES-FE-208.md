# FE-208 — Humanity Centers & donation features, Unera Stablecoin side

**Jira:** FE-208 "UI/UX — Update design of HC and Donation features" (Minh, READY)
**Sources:** `specs/FE-208-brief.md` — Donation Value Proposition (§A), Confluence *Huma Platform – Humanity
Centers* pageId 88768526 (§B), Confluence *Huma Platform – Donation* pageId 74579981 (§C), and **§D — what the
Stablecoin project must reflect**, which is the only part of the ticket that lands in this repo.
**Baseline:** `da86ab2` (FE-207) · **Audit:** `_audit/FE-208-audit.md` (3 Met · 3 Partial · 5 Missing)
**Scope of this document:** the **Unera Stablecoin** design project (`sc/`). The Humanity Center directory, HC
detail pages and the fiat/crypto donation flows described in §B and §C are **Huma Platform** surfaces and are
deliberately *not* built here — see §5.

Verified headlessly with Playwright / Chromium at **1366×900** and **390×844**: **zero JS console errors, zero
local 404s** on the canvas, the stablecoin-app kit and the auth kit. Screenshots in `screenshots/fe-208/`.

Every item is tagged **[Stream]** (Passive Reserve Yield accuracy), **[Layers]** (layer separation),
**[Handoff]** (link-out / no-donation-flow boundary) or **[Fix]**.

---

## 1. Changed files

| File | What changed | Spec IDs | Tags |
|---|---|---|---|
| `UNERA hUSD Portal.dc.html` | PoR yield card rebuilt as the **Passive Reserve Yield** block: stream name, mechanism sentence (HQLA interest reaches Humanity Centers *automatically*, routed by rule), **cumulative routed** figure promoted to the hero with MTD demoted to a sub-line, "Allocated by the Swiss Association", "Every dollar publicly auditable", the dual funding model, and two outbound links to Huma Platform. Layer-separation card: third column re-titled and corrected; the three bare layer chips replaced by three labelled cells carrying each layer's role. One new notification seed item. "Notification centre" → "center". One responsive rule: `[data-r="g2"] > *{min-width:0}`. | D-1 · D-2 · D-3 · D-4 · D-5 · D-7 · D-8b · D-10 · D-11 | [Stream] [Layers] [Handoff] [Fix] |
| `ui_kits/stablecoin-app/index.html` | The light-system twin of the same card: "Reserve yield → mission" → **"Passive Reserve Yield → Humanity Centers"**, cumulative routed figure, automatic routing, Swiss Association, on-chain auditability, dual-funding note, two Huma Platform links. Split realigned to the canvas's 70/30, and the HC figure moved off `--fin-up`. | D-1 · D-2 · D-3 · D-4 · D-5 · D-7 · D-10 | [Stream] [Handoff] [Fix] |
| `readme.md` | Product context now describes the Passive Reserve Yield stream, the Swiss Association's allocation authority, on-chain auditability and the dual funding model; the PoR index entry lists the rebuilt block; three new rows in the governance/anti-pattern table. | D-1 · D-2 · D-3 · D-5 · D-6 | [Stream] [Handoff] |
| `ui_kits/stablecoin-app/README.md` | PoR feature list names the stream and states that no donation flow runs in the kit. | D-1 · D-6 | [Stream] [Handoff] |
| `SKILL.md` | "never swaps, payments, governance, **or donations**", plus a Humanity-Center paragraph so a future agent invoking the skill cannot invent donation UI here. | D-1 · D-3 · D-6 · D-8a · D-9 | [Handoff] |
| `_audit/FE-208-audit.md` | New. Inventory of every HC / donation / yield / Huma Platform / points mention, the Met/Partial/Missing scorecard against brief §D with evidence, the implementation plan, and four open questions. | — | — |
| `screenshots/fe-208/*` | New. 10 verification screenshots (5 views × desktop/mobile). | — | — |

Untouched on purpose: `_audit/` (other than the new audit), the archived `v1` / `v2 (pre-…)` canvases,
`ui_kits/auth/` (no HC, donation, yield or points copy exists there — confirmed by grep), `components/`,
`guidelines/`, the token CSS, and `screenshots/fe-207/`.

---

## 2. Passive Reserve Yield block — before / after [Stream]

The PoR page's yield card was the one place the Stablecoin portal speaks about Humanity Centers, and it was
saying four things wrong at once.

| | Before | After | Why |
|---|---|---|---|
| Name | "Reserve yield · month to date" | **"Passive Reserve Yield · to Humanity Centers"** | §A names six giving streams; this block *is* stream 1. Naming it lets a donor connect what they read on Huma Platform to the evidence here. (D-1) |
| Mechanism | not stated on the card | "Interest earned on the HQLA reserve reaches Humanity Centers **automatically**. It is routed by rule at the close of every period — no request, no discretionary step at the issuer." | §A/§D: the stream is passive and automatic. The old card showed a split with no explanation of how the money moves. (D-2) |
| Headline figure | `$4.62M` month-to-date, "counted from the 1st, resets each month" | `$12.64M` **routed to Humanity Centers, cumulative** — "Since the first mint, Jan 2025 · $1.39M of it this month" | An MTD number resets to zero on the 1st, so the page could never state a running total. The cumulative figure is the one that supports §A's "your giving compounds". MTD survives as a sub-line and as the label on the split. (D-10) |
| Split | Operations & buffer 70% / Humanity Centers 30%, unlabelled period | unchanged bars, now under "This month's reserve yield · $4.62M gross · 1–6 Aug 2026" | Keeps the honest short-period framing without letting it be the headline. |
| Authority | silent — implied the issuer decides | **"Allocated by the Swiss Association."** Which Centers receive the yield, and in what proportion, is decided by the Association — final allocation authority sits with it, never with the issuer. | §A: final allocation authority = Swiss Association. The old card let a reader assume the issuer chose the recipients, which is both wrong and a governance claim the issuer must not make. (D-3) |
| Auditability | silent | **"Every dollar publicly auditable."** Each routing transfer is recorded on-chain and falls inside the quarterly attestation, so the path from reserve income to the receiving Center can be traced at any time. | §A's "Every dollar, publicly auditable at any time". The PoR page proved the *reserve* in forensic detail and then stopped short of the yield leaving it. (D-4) |
| Funding model | implied reserve yield was all of it | "Humanity Centers are funded two ways: this ecosystem yield, and **direct donations made on Huma Platform**." | §A dual funding model. Also the honest framing of the issuer's contribution. (D-5) |
| Hand-off | dead end | Boundary line — "Giving happens there — this portal only issues, redeems and proves hUSD" — plus **Humanity Centers directory ↗** and **Donate on Huma Platform ↗** | §D: link out rather than implying donations happen here. A reader moved by the number now has somewhere to go, and the sentence next to the links says why it is not here. (D-6, D-7) |

Removed: *"A share of reserve income funds community well-being — value, shared by design."* Six concrete
statements replaced one unfalsifiable one.

The kit (`ui_kits/stablecoin-app/index.html`) carries the same seven points in the light Deep-Blue system,
sized for a `.por-grid` cell: heading, mechanism paragraph, cumulative figure (`$1,842,400`), the 70/30 split,
the dual-funding note and the two `.ex-link` hand-offs.

---

## 3. Layer separation [Layers]

`An independent issuer, by design` kept its three prose columns — they are the *issuer's* independence claims
and still earn their place — with one correction:

- **"Reserve yield, kept in-layer"** → **"Reserve yield, routed by rule"**. The yield does not stay in the
  layer; it leaves it automatically. Body now reads "…funds portal operations and flows **automatically** to
  Humanity Centers, where the **Swiss Association** allocates it." (D-2, D-3)

Below it, the three bare pills became three labelled cells — name, participants, and the role each layer
actually plays (D-11):

| Layer | Participants | Role as stated |
|---|---|---|
| **Stablecoin layer** *(you are here)* | Unera Stablecoin · hUSD | Issues and redeems hUSD, holds and proves the reserve, runs its own KYC. |
| **Consumer layer** | Huma Platform · Huma Points | Where people hold, spend and give. **Donations to Humanity Centers are made here — never in this portal.** |
| **Association layer** | Swiss Association · Humanity Centers · Impact Points | Allocates the reserve yield across Humanity Centers and issues Impact Points. **Final allocation authority.** |

The dot colours (teal / treasury / gold) and the "you are here" marker are carried over unchanged, so the
strip still reads as the same three-layer diagram FE-207 established.

---

## 4. Smaller changes

- **Notification** (D-1, D-4) — one new seed item, `n7`, `info` / `announcement`, dated Aug 1, deep-linking to
  PoR: *"Reserve yield routed to Humanity Centers — Passive Reserve Yield for July — $1.42M — reached Humanity
  Centers automatically. The Swiss Association allocates it; every transfer is on-chain."* CTA "See the routing".
- **"Notification centre" → "Notification center"** (D-8b) — the last British spelling in visible copy, three
  screens away from "Humanity Cent**ers**". FE-207's rename mapping had covered the HC spelling only.
- **`--fin-up` misuse** [Fix] — the kit painted the Humanity Centers allocation in money-green. The design
  system reserves `--fin-up` for money *direction*; an allocation is not a gain. Moved to `--accent-deep`, the
  light-surface accent ink (`readme.md` "brand-vs-money color is the #1 mistake").
- **70/30 consistency** [Fix] — the kit split read 38/62 against the canvas's 70/30. Realigned to 70/30
  (`$108,500` / `$46,500` of the same `$155,000` gross) and the percentages are now printed on the cells.

### 4.1 Responsive fix [Fix]

```css
@media (max-width:1080px){ [data-r="g2"] > *{ min-width:0; } }
```

A `1fr` grid track's automatic minimum is `min-content`, so at 390 px the PoR two-column cards kept a 693 px
intrinsic width inside a 362 px container and had their right-hand third clipped off-screen. **Pre-existing** —
reproduced on the `da86ab2` baseline before any FE-208 edit — but it would have hidden most of the new copy, so
it is fixed here. Side effects are all improvements: the contract-address rows and SHA-256 checksums on the
same page now ellipsize instead of overflowing. Page `scrollWidth` stays 390 (no horizontal page scroll) and
the portfolio, hero, coverage and chart grids were re-checked at both viewports for regressions.

---

## 5. Explicitly not built here

§B and §C describe a full Humanity Center directory and a two-rail donation product. None of it belongs in the
Stablecoin project, and building any of it would break §D's core instruction:

- no HC directory (HC-DIR-01…06), HC detail page (HC-DETAIL-02…07) or HC search/filters
- no donation flow — fiat or crypto — no amount step, review, fee breakdown, processing-fee-on-top, $1 minimum,
  wallet-connect-to-donate, multisig destination, Uniswap quote or Crypto Swap Worker states (DON-DASH-01…09)
- no donation history, donation receipts, or receipt states
- no Huma Points or Impact Points balances, multipliers or reward states

`readme.md`'s anti-pattern table now carries this as a standing rule alongside the existing "Stablecoin Layer is
Mint + Burn + reserve + KYC only" row, and `SKILL.md` repeats it so a future skill invocation cannot drift.

**Copy rules honoured** (§C 6.4): "Humanity Center(s)", "Huma Platform", "Huma Points", "Impact Points",
"total donated"; **no mint/burn/cash-out anywhere in the donor-facing HC copy** — the new block says "funds",
"routed", "reaches", "allocated". `mint` / `burn` survive only as design-system vocabulary in `readme.md` and
`SKILL.md` and in the portal's own transaction machinery, never in HC copy.

---

## 6. Verification

```
node + playwright, executablePath /opt/pw-browsers/chromium-1194/chrome-linux/chrome
static server over sc/, viewports 1366×900 and 390×844
```

Clean — **zero console errors, zero 404s / failed local requests** — on `UNERA hUSD Portal.dc.html`
(Proof of reserve, Notifications), `ui_kits/stablecoin-app/index.html` (PoR) and `ui_kits/auth/index.html`.

> **Harness note.** The canvas loads React 18.3.1, ReactDOM 18.3.1 and `@babel/standalone` 7.26.4 from
> `unpkg.com`, which this sandbox's egress proxy blocks. The verification run serves byte-identical pinned
> copies of those three files from a local mirror via a Playwright route so the component actually boots; no
> project file was modified for testing, and the mirror lives outside the repo.

Screenshots (`screenshots/fe-208/`, `-desktop` and `-mobile` for each):

| File | View |
|---|---|
| `01-por-full` | Proof of reserve, full page |
| `02-por-passive-reserve-yield-card` | the rebuilt Passive Reserve Yield card |
| `03-por-layer-separation` | "An independent issuer, by design" + the three-layer strip |
| `04-notifications` | Notification center with the new routing item |
| `05-kit-por-passive-reserve-yield` | stablecoin-app kit, PoR screen |

---

## 7. Open questions for PM

1. **Huma Platform URL.** The two link-outs ship as `https://huma.example/humanity-centers` and
   `https://huma.example/donate`. `.example` is a reserved, non-resolving TLD, picked so a placeholder can never
   be mistaken for a production link. Confirm the real domain and the two paths; they appear in the canvas and
   the kit and are a two-line change.
2. **Cumulative baseline.** `$12.64M` (canvas) and `$1,842,400` (kit) are placeholders in the same class as the
   existing PoR figures, counted "since the first mint, Jan 2025". Confirm the epoch the real number counts from,
   and whether it should be gross yield routed or net of anything.
3. **Is 70/30 fixed?** Both surfaces state it as a standing rule. If the Association can vary the allocation
   ratio between periods, the split needs a "current period" qualifier.
4. **Impact Points and yield allocation.** §A says donors get defined voting on allocation via Impact Points;
   §B puts Impact Point signalling out of scope for Huma. The portal therefore says only that the Association
   allocates. Confirm whether it may also mention donor signalling — one sentence in the Association cell.
5. **Where the donor lands.** §B flow 5.1 sends an unauthenticated Donate click to login first. Both link-outs
   here open in a new tab against the public directory; confirm that is the intended entry point rather than a
   deep link into the donation flow.
