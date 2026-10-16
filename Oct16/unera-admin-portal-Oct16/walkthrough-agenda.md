# UNERA Admin Portal — Feedback Walkthrough

**Duration:** 45 min · **Build:** `UNERA-Admin-Portal-offline.html` (13 Oct)
**Attendees:** Kevin (PO), Eric (QA/spec owner), Son & Ducke (BE), Hue & Phuong (FE), Renol (design)
**Goal:** Confirm every item from the 04–12 Oct Slack thread and spec v16 is reflected, close the one open question, agree what FE/BE build next.

**Prep (presenter):** open the offline file, sign in as `superadmin`, keep a second window at 390 px wide. Have the Slack thread and Confluence §5.6 open in tabs.

---

## Agenda

| # | Block | Time | Owner |
|---|---|---|---|
| 0 | Framing + what changed since Oct 11 | 0:00–0:03 | Renol |
| 1 | Huma Points › Configuration — per-pathway rules (Eric's thread) | 0:03–0:17 | Renol |
| 2 | Huma Points › Accounts / Claims / Ledger (Son & Kevin's feedback) | 0:17–0:25 | Renol |
| 3 | Spec v16 items: Swap eligibility, tiers, Phase-2 utilities | 0:25–0:31 | Renol |
| 4 | Roles, audit, remaining modules (fast pass) | 0:31–0:36 | Renol |
| 5 | Responsive check at phone + iPad widths (Kevin's targets) | 0:36–0:39 | Renol |
| 6 | Open question + decisions + next steps | 0:39–0:45 | Kevin / Eric |

Ground rule: questions in-line for blocks 1–3 (they are the point of the session); hold blocks 4–5 questions to the end.

---

## Script

### 0 · Framing (3 min)

> "Everything in this session traces back to one of two sources: the Slack thread from 4 October, and spec v16 that Eric published on 12 October. I'll name the source for each change as we go. Per Eric's note we review the Huma side only; Unera/Stablecoin modules are shown for completeness, not for feedback today."

What changed since the Oct 11 build (one slide / say out loud):
- Cancel-scheduled rule now has the optional effective time (§5.6.2).
- Swap pairs/routes removed; Swap fields and defaults follow §5.6.4.
- Impact Points tier card added (§5.8).
- Phase-2 utilities renamed to the spec's five; "HP-to-IP Swap" retired.

---

### 1 · Configuration — per-pathway earning rules (14 min)

**Navigate:** Huma Points › Configuration.

**1.1 Independent pathway cards — Eric, 05–08 Oct** (2 min)
> "Eric asked for one configuration per pathway so a change in Donation can't touch Swap, and so new pathways can be added without growing a single form. Donation and Swap are now separate cards, each with its own active rule, rate, caps, next change, and its own New / Clone buttons."

Point at: Active rule · Earning rate · Caps · Next change facts on each card.
Ask Eric: *"Is this the 'one item per activity' shape you described?"*

**1.2 Append-only history, lifecycle — Son 06 Oct, Eric 07 Oct, spec §5.6.1** (3 min)
> "Son's point stands: rules that have run are immutable. Eric's final action set is New / Close / Clone — spec calls Close 'Cancel Scheduled Rule'. There is no enable/disable flag."

Scroll the Swap history table. Point out the four statuses: Scheduled, Active, Historical, Cancelled.
Click an **Active** row → drawer shows read-only note and only "Clone as new rule". Click a **Historical** row → same.
> "No edit, delete or manual close on anything that has started — AC-UAP-09."

**1.3 New rule — validation (§5.6.2, §5.6.3)** (4 min)
Click **New rule** on Swap.
- Point at the context block: current active rule + list of scheduled rules.
- Walk the fields: enabled toggle, HP per USD (note multiplier hint vs 10 HP/$1 base), per-txn cap, daily cap, 7-day rolling cap, min token-out USD, token-out symbols.
- Leave `apply_from` empty, press Create → required error.
- Enter a past time → "must be after now" error.
- Enter the same time as HPR-S-0003 (20 Oct 00:00 UTC) → duplicate error.
- Enter 15 Oct → warning: *"HPR-S-0003 is already scheduled… this rule applies only until it starts."*
> "That is Son's T-1 case and Eric's 'inform users' requirement in one message. The system does not block it — spec §5.6.3 allows it as long as the timestamp is unique."
- Reason + notes required; Idempotency-Key shown. Create → toast, row appears as Scheduled, audit entry.

**1.4 Clone** (1 min)
Click **Clone** on the Active Swap rule → form opens pre-filled, `apply_from` empty, reason/notes empty.
> "Clone cannot save until a new apply_from, reason and notes are given — §5.6.2."

**1.5 Cancel scheduled — includes the open question** (3 min)
Click **Cancel** on HPR-S-0003.
- Consequence text: which rule keeps applying, that cancellation is permanent.
- Show the new optional **Cancellation effective (UTC)** field. Try a time after 20 Oct → blocked. Leave empty → cancels now.
> "Spec says 'effective date is optional'. Ducke also asked for an effective time on Close. We implemented it as audit metadata: `cancelled_at`. Earning is unaffected either way because the rule never started. **Eric — is that the intended meaning, or should a dated cancel do something else?**" → park for block 6.

**1.6 Role gate** (1 min)
Switch role to Huma Operator → New / Clone / Cancel disabled with tooltip "Requires hp.rules.write (Super Admin)". Switch back.

---

### 2 · Accounts, Claims, Ledger (8 min)

**2.1 Header tile — Son 07 Oct, Eric 08 Oct** (1 min)
> "Son asked whether 'Linked wallets' should be claimed users. Eric: both. Tile now reads **Claimed wallets · users**."

**2.2 Accounts tab — Son 07 Oct** (2 min)
Columns: `claimable_points_balance`, `huma_points_balance`, `lifetime_points_earned`, `claimed_wallet`, `claimed_user`, Last claim.
> "Active/Restricted column removed — Eric agreed it belongs to Users & Wallets."

**2.3 Last claim keeps status — Eric 08 Oct, Kevin 12 Oct** (1 min)
> "Son suggested datetime only. Eric and Kevin ruled to keep status: HP becomes an ERC-20 later and the status is a defensive signal if BE misbehaves. Kept."

**2.4 Claims tab + claim drawer (UAP-15, AC-UAP-13)** (2 min)
Open a claim → status, amount, before/after balances, `claimed_wallet`, `claimed_user`, failure reason, idempotency key, audit id. Explicit note: no txHash, no minting in Phase 1.

**2.5 Ledger + rectification (UAP-09, UAP-14, §5.5)** (2 min)
Ledger columns incl. `attribution_wallet_address`, pathway, rule id. Open **Record rectification**: adjustment/reversal only, supporting reference required, before/after preview, restricted-user warning, four-eyes approval.
> "No refund action exists anywhere — by design."

---

### 3 · Spec v16 items (6 min)

**3.1 Swap eligibility — §5.6.4 / UAP-10** (2 min)
Reopen Swap › New rule.
> "v16 says: no token-in, pair or route whitelist. The pairs/routes picker is gone. Fields now map 1:1 to the spec with defaults pre-filled on a first rule: min token-out $1, `max_earned_hp_per_txn` 500, `max_earned_hp_7d_rolling_per_user` 2,000. Daily cap stays as Eric's common column."
Ask Son: *"Does the payload shape match what BE expects — rate, perTxn, daily, weekly in common columns, the rest in `config`?"*

**3.2 Impact Points tiers — §5.8 / UAP-17** (2 min)
Scroll to the **Impact Points tiers** card. Supporter → Guardian with IP ranges and badges, labelled read-only.
> "Spec is explicit: display only, no tier-change workflow yet. Tier execution stays with the Impact Points service."

**3.3 Phase-2 block** (1 min)
> "Renamed to the five utilities in UAP-16 plus Impact Points conversion — the term that replaces 'HP-to-IP Swap'. All marked not available in Phase 1."

**3.4 Donation pathway extras** (1 min)
Open Donation › New rule: min donation, supported assets, campaign ID, campaign status, campaign cap — §5.6.4 Donation list.

---

### 4 · Fast pass — everything else (5 min)

One sentence each, no clicks unless asked:
- **Users & Wallets:** search by ID / email / phone / wallet / tx / KYC / status / tag; KYC read-only with Sumsub link; blacklist with reason + audit.
- **Transactions & Reports:** layer/type/token/amount/date/status filters; Needs-action segment; Retry / Trigger with reason code; export with 7-year retention note.
- **Reserve & PoR:** draft → submit → approve & publish; stablecoin side, not for feedback today.
- **Humanity Centers:** publish checks, archive instead of delete when donations exist.
- **Settings:** admin users, layer-scoped roles, token whitelist (now worded as "token-out symbols in the Swap rule"), audit log.
- **Compliance screen:** every UAP row and every Slack item with status — use this as the sign-off checklist after the call.

---

### 5 · Responsive — Kevin's targets (3 min)

Kevin's standard (27 Aug): computers & iPads 9–14″, phones from 6.1″.
Resize the second window:
- **390 px:** nav becomes drawer, pathway cards stack, rule form opens as bottom sheet, tables scroll inside their frame, tier card goes single column, all targets ≥44 px.
- **820 px (iPad portrait):** icon rail, two-column forms.
- **1024+:** full layout, 1440 max width.
> "No horizontal overflow at any of the three."

---

### 6 · Decisions + next steps (6 min)

**Decision needed**
1. Cancel-scheduled "effective date": audit metadata only (current), or something else? — **Eric**

**Confirmations to collect**
2. Per-pathway card layout is final — **Eric / Kevin**
3. Swap payload shape (common columns + `config`) — **Son**
4. Last-claim status stays — **Kevin** (already ruled, confirm in minutes)

**Next steps (proposed)**
- FE: build Configuration tab from this build; BE: earning-rule endpoints per §6.2 incl. duplicate-`apply_from` rejection and cancel-before-start guard.
- Renol: fold any changes from today into one more build before Tuesday.
- Eric: bump spec if decision 1 changes §5.6.2 wording.

---

## Appendix — Feedback → change map

| Source | Feedback | Where to see it |
|---|---|---|
| Eric 05 Oct | Separate config per pathway | Configuration › two cards |
| Eric 05 Oct | One config per pathway, enable/disable | Superseded → append-only + Cancel (Eric 07 Oct) |
| Son 06 Oct | Cannot disable past rules; cancel future before inserting earlier | Read-only drawers; overlap warning |
| Eric 06 Oct | Effective dates must be future | `apply_from` validation |
| Eric 07 Oct | Common columns rate / daily / weekly / txn + config | Rule form field order |
| Eric 07 Oct | New / Close / Clone, no reopen | Row actions; cancelled note |
| Ducke 07 Oct | Close needs effective time | Optional cancel effective field |
| Son 07 Oct | Linked wallets → claimed users | Header tile |
| Son 07 Oct | Drop Active/Restricted on Accounts | Accounts columns |
| Son / Eric / Kevin | Last claim: keep status | Accounts › Last claim |
| Eric 08 Oct | Spec updated: multiple schedules | Scheduled list per card |
| Spec v16 §5.6.4 | No pair/route whitelist; defaults $1 / 500 / 2,000 | Swap rule form |
| Spec v16 §5.8 | Display IP tiers only | Impact Points tiers card |
| Spec v16 §1.5 | "Impact Points conversion" term | Phase-2 block |
| Kevin 27 Aug | 6.1″ phones, 9–14″ iPad/computer | Block 5 |
