# FE-208 audit — Humanity Centers, donations & the association layer in the Unera Stablecoin project

**Jira:** FE-208 "UI/UX — Update design of HC and Donation features"
**Brief:** `/root/work/specs/FE-208-brief.md` — this audit scores the Stablecoin project against **section D**
(what the Stablecoin portal must reflect), using sections A–C as the source of truth for facts and vocabulary.
**Scope:** the Unera Stablecoin design project (`sc/`) only. The donation flows themselves are Huma Platform
surfaces and are out of scope here by design — this audit checks that the Stablecoin portal *says the right
thing about them and hands off cleanly*.

**Date:** 22 Aug 2026 · **Baseline:** `da86ab2` (FE-207)

---

## 1. Where the project talks about HCs / donations / yield / Huma Platform / points

Live (non-archived) files only. The `v1 (pre-audit)` / `v2 (pre-0724-round3)` canvases and everything else in
`_audit/` are frozen history and are deliberately excluded.

| # | Location | What it says today |
|---|---|---|
| L1 | `UNERA hUSD Portal.dc.html` **L1465–1487** — PoR page, "yield to humanity centers" card | Eyebrow "Reserve yield · month to date"; `$4.62M` MTD; a two-bar split **Operations & buffer $3.23M · 70%** / **Humanity Centers $1.39M · 30%**; footnote "A share of reserve income funds community well-being — value, shared by design." |
| L2 | `UNERA hUSD Portal.dc.html` **L1565–1582** — PoR page, "An independent issuer, by design" | Three columns: *One job, done well* · *Own KYC & AML* · *Reserve yield, kept in-layer*. Third column: "Interest earned on reserve assets (HQLA) funds portal operations and Humanity Centers directly. Huma Platform earnings, Huma Points and Impact Points sit in separate legal entities." |
| L3 | `UNERA hUSD Portal.dc.html` **L1579–1581** — layer chips under L2 | "Stablecoin layer · Unera Stablecoin · hUSD · you are here" / "Consumer layer · Huma Platform · Huma Points" / "Association layer · Humanity Centers · Impact Points" |
| L4 | `UNERA hUSD Portal.dc.html` **L1571** | "No external party, including Huma Platform, can access or override it." (KYC independence) |
| L5 | `UNERA hUSD Portal.dc.html` **L1184** — Notifications screen eyebrow | "Notification **centre**" — British spelling |
| L6 | `UNERA hUSD Portal.dc.html` **L2169–2175** — notification seed feed | Six items: purchase, redemption, payout, maintenance, verification, "hUSD now on Base". **No** HC / yield / donation item. |
| L7 | `UNERA hUSD Portal.dc.html` **L1591+** — Docs (hUSD token specs) page | Token, networks, contract addresses. **No** HC content. |
| L8 | `ui_kits/stablecoin-app/index.html` **L1093–1101** — PoR, "Reserve yield → mission" card | "HQLA yield funds portal operations and Humanity Centers — never the Huma Platform layer." + `$58,200` ops / `$96,800` HCs (Feb) + "Monthly aggregate · gross yield $155,000" |
| L9 | `ui_kits/auth/index.html` | **No** HC / donation / yield / points copy at all. |
| L10 | `readme.md` **L30** (Product context) | "Reserve yield (interest on HQLA holdings) funds portal operations and Humanity Centers." |
| L11 | `readme.md` **L243** (Index → UI kits) | lists "yield→Humanity Centers" as a PoR feature |
| L12 | `readme.md` **L201** (anti-patterns) | "Out-of-scope surfaces (Earn/yield, Bridge, Rewards, crypto payout, issuer API, swap)" — the layer boundary rule |
| L13 | `ui_kits/stablecoin-app/README.md` **L31** | lists "yield → Humanity Centers" |
| L14 | `SKILL.md` | No HC/donation copy. Describes the layer as Mint + Burn only. |

---

## 2. Scorecard against brief §D

| ID | Requirement (brief §D, with the §A/§B/§C fact it rests on) | Status | Evidence |
|---|---|---|---|
| **D-1** | The PoR yield block names the stream **"Passive Reserve Yield"** (§A stream 1 of six) | **Missing** | L1 calls it "Reserve yield · month to date". The stream name appears nowhere in the project (`grep -i "passive reserve"` → 0 hits). A reader cannot connect this block to the multiplier-stream story donors see on Huma Platform. |
| **D-2** | Describes the mechanism accurately: **interest on HQLA reserves flows to Humanity Centers automatically** | **Partial** | L2 gets the substance right ("Interest earned on reserve assets (HQLA) funds portal operations and Humanity Centers directly") but the word/idea **automatic** is absent, and the PoR yield card itself (L1) — the block a visitor actually reads — mentions neither HQLA nor automation, only a percentage split. L8 says "HQLA yield funds…" but again no automation. |
| **D-3** | **Allocation authority = the Swiss Association** (§A key features; §B out-of-scope note that Huma does not run allocation) | **Missing** | `grep -i "swiss"` → 0 hits across the whole project. L3's chip says "Association layer" but never says the Association is Swiss, nor that it holds final allocation authority over the yield. The portal currently implies the *issuer* decides where the 30% goes. |
| **D-4** | Routing is **traceable on-chain** / "Every dollar, publicly auditable at any time" (§A) | **Missing** | The PoR page proves the *reserve* on-chain in detail (contract list, BaseScan links, SHA-256 attestation checksums, "How you can check this yourself" at L1518–1527) but that verification apparatus stops at the reserve. Nothing in L1/L2/L8 tells the reader the yield **routed to Humanity Centers** is itself publicly auditable. |
| **D-5** | **Dual funding model** — HCs receive direct donations (Huma Platform) **+** ecosystem yield (§A) | **Missing** | No file mentions direct donations at all. The portal presents reserve yield as if it were the whole of HC funding, which overstates the issuer's role and drops half of §A's model. |
| **D-6** | **No donation flow implied inside the Stablecoin portal** | **Met** | No Donate CTA, amount field, HC picker, receipt, or Huma/Impact Points balance exists anywhere in the canvas or either kit (`grep -i "donat"` over live files → 0 hits). L12's anti-pattern table actively forbids the surfaces §C would need. |
| **D-7** | **Links out** to the Huma Platform Humanity Centers directory / Donation page instead | **Missing** | L1 and L2 are dead ends — no link, no "see them on Huma Platform" affordance. `grep 'href='` over the canvas returns only auth-kit links, explorer links and the docs button. A reader who is moved by "$1.39M went to Humanity Centers" has nowhere to go. |
| **D-8a** | Terminology: **Humanity Centers, Huma Platform, Huma Points, Impact Points** | **Met** | All four strings correct at L1/L2/L3/L8/L10/L13. FE-207 §2 already did this mapping. |
| **D-8b** | No stale **"Centres"**, **"UNERA platform"**, **"UYT"**, **"UGT"** | **Partial** | Zero hits for UYT / UGT / "UNERA Platform" / "Humanity Centres" in every live file. One residual British **"Notification centre"** (L5, visible UI copy) sits three screens away from "Humanity Cent**ers**" — an internal spelling inconsistency FE-207 left behind. Archived canvases still carry "Association Layer · UNERA Governance · UGT" — correct, they are frozen. |
| **D-9** | **No mint/burn** in donor-facing HC copy | **Met** | The HC copy at L1/L2/L8 uses "funds", "share of reserve income", never mint/burn. The portal's own transaction language is already plain-English ("creates and redeems", "Purchase complete", "Removal confirmed") after FE-207 §3.4; `mint`/`burn` survive only in `readme.md`/`SKILL.md` as design-system vocabulary, which is not donor-facing. |
| **D-10** | The block reports **cumulative yield routed**, not only a month-to-date snapshot | **Missing** | L1 is MTD-only ("1–6 Aug 2026 · counted from the 1st, resets each month") — six days into a month it reads as a small number and resets to zero every 1st, so the page can never state a running total. L8 is a single February month. Neither supports the §A claim that giving compounds. |
| **D-11** | Layer-separation card names **three layers with the correct names and roles** | **Partial** | The three chips (L3) are correctly named but carry **no roles** — they are labels only, and the third is the least self-explanatory of the three. The card's three prose columns describe the *Stablecoin* layer three times over (scope, KYC, yield) and never say what the Huma Platform or Association layers actually do, so "Impact Points" and "Association layer" arrive unexplained. |

**Totals: 3 Met · 3 Partial · 5 Missing.**

---

## 3. Implementation plan (what FE-208 changes)

| Fix | Target | Addresses |
|---|---|---|
| F1 | Canvas L1 — rebuild the PoR yield card: stream name **"Passive Reserve Yield"**, **cumulative** routed figure as the hero with MTD demoted to a sub-line, mechanism sentence (HQLA → HCs, automatic), "allocated by the Swiss Association", "every dollar publicly auditable", on-chain routing chip, and an outbound **"Humanity Centers on Huma Platform ↗"** link | D-1, D-2, D-3, D-4, D-7, D-10 |
| F2 | Canvas L2/L3 — rewrite the layer-separation card so each of the three columns describes **one** layer (issuer / Huma Platform / Swiss Association) with its role, and give each chip a role sub-label | D-2, D-3, D-11 |
| F3 | Canvas — add a **dual funding model** note next to the yield card: reserve yield *plus* direct donations on Huma Platform, with the explicit "donations do not happen in this portal" boundary line | D-5, D-6, D-7 |
| F4 | Canvas L5 — "Notification centre" → "Notification center" | D-8b |
| F5 | Canvas L6 — one notification seed item announcing the quarterly Passive Reserve Yield routing, deep-linking to PoR | D-1, D-4 |
| F6 | Kit L8 — same treatment in the light system: stream name, cumulative + monthly, Swiss Association, auditable, Huma Platform link | D-1..D-5, D-7, D-10 |
| F7 | `readme.md` L10/L11 + `ui_kits/stablecoin-app/README.md` L13 — describe the stream by name and record the layer boundary + link-out rule | D-1, D-3, D-5, D-6 |

**Deliberately not done:** no HC directory, HC cards, HC detail page, donation amount/asset/review/receipt UI, Huma
Points or Impact Points balances, and no fiat/crypto donation rails inside this project. §B and §C are Huma
Platform work; building any of it here would break D-6 and `readme.md`'s own out-of-scope rule (L12).

---

## 4. Open questions for PM

1. **Huma Platform URL.** The link-outs need a real host. The canvas ships `https://huma.example/humanity-centers`
   and `.../donate` — a reserved, non-resolving TLD chosen so a placeholder can never be mistaken for production.
   Confirm the domain and the two paths.
2. **Cumulative baseline.** "Since launch" figures (`$41.8M` gross / `$12.6M` routed) are placeholders in the
   same class as the existing PoR figures. Confirm the epoch the real number counts from.
3. **The 70/30 split.** The portal states it as fixed. If the Association can vary the allocation ratio, the
   card should say "current period" rather than presenting 30% as a standing rule.
4. **Impact Points and yield.** §A says donors get defined voting on allocation via Impact Points, while §B puts
   Impact Point signalling out of scope for Huma. The portal therefore says only that the Association allocates —
   confirm whether it may also mention donor signalling.
