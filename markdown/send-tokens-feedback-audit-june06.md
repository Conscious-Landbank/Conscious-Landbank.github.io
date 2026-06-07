# Send Tokens — Feedback Audit (June 5–6, 2026)

**Audited:** 2026-06-06  
**Live page:** [`NewUnera/send-enhanced.html`](NewUnera/send-enhanced.html) (`http://127.0.0.1:8765/NewUnera/send-enhanced.html`)  
**Sources reviewed:**
- Video: [`Feedback/June05/TeamAlignmentJune05/GMT20260605-080131_Recording_1920x974.mp4`](Feedback/June05/TeamAlignmentJune05/GMT20260605-080131_Recording_1920x974.mp4)
- Transcript: [`Feedback/June05/TeamAlignmentJune05/GMT20260605-080131_Recording.transcript.vtt`](Feedback/June05/TeamAlignmentJune05/GMT20260605-080131_Recording.transcript.vtt) — Send discussion ~`00:36:00`–`01:06:00`
- Screenshots: [`Feedback/June05/SendTokens/`](Feedback/June05/SendTokens/) (15 PNGs)
- Prior plans: [`markdown/send-enhanced-june06-build-plan.md`](send-enhanced-june06-build-plan.md), [`Feedback/June05/TeamAlignmentJune05/june05_team_alignment_improvements_875d92c8.plan.md`](../Feedback/June05/TeamAlignmentJune05/june05_team_alignment_improvements_875d92c8.plan.md)

---

## Executive summary

The **Send Tokens** flow on the live browser tab is **largely aligned** with June 5 team feedback. The major structural changes from Slack and the alignment call are implemented: external-wallet-only flow, 4-step stepper, stablecoin amount step, review without misleading fee/email/2FA rows, wallet-handoff signing (no in-app Sign step), **Submitted** success state, explorer-linked tx hash, nonce, contacts UI, and 12-block confirmation education on Processing.

**Remaining work is small but real** — not a full rebuild. Three items matter for product correctness:

| Priority | Gap | Effort |
|----------|-----|--------|
| **P1** | Read-only / view-only wallet gate (`walletCanSign`) | ~1–2 h |
| **P2** | Contact list does not merge saved address book (`localStorage`) | ~2–3 h |
| **P3** | Nav wallet balance still shows `UNERA`; prerequisites marketing copy | ~30 min |

Everything else is optional polish, dead-code cleanup, or explicitly out of scope (filters, dashboard Buy, nav merge).

---

## Verdict by feedback source

### A. Team alignment video + transcript (Send segment)

| Timestamp / topic | Decision | Live page status |
|-------------------|----------|------------------|
| ~36:00 Remove UNERA User + Bank Account | External send only | ✅ No Choose Method; Recipient is step 1 |
| ~36:42 Two recipient paths | Paste address OR saved contact | ✅ Enter Wallet Address + Select from Contacts |
| ~41:00 Amount tokens | hUSD / USDC / USDT | ✅ Token dropdown; balances keyed correctly |
| ~42:32 No USD conversion | Remove `≈ $` on amount | ✅ No USD row on amount step |
| ~43:08–54:13 Network fee | Label only (“Applies on-chain”) + info tooltip; **no $ amount**; total = token only | ✅ Review + success receipt match |
| ~56:30–57:00 Signing | MetaMask / WalletConnect popup — **not** in-app Sign screen | ✅ `confirmAndProcess()` → hint → Processing; no `#step6` |
| ~57:00 Review total | Transfer amount only | ✅ `reviewTotal` = token amount |
| ~59:00 Success after wallet sign | Show success when tx submitted (mempool), not “Completed” | ✅ Badge + status **Submitted**; sub-note “Awaiting blockchain confirmation” |
| ~01:01–01:03 Huệ view-only wallet | Read-only connected wallet cannot send | ❌ **Missing** `walletCanSign` gate |
| Kevin (via screenshot) 12-block wait | User education on confirmation wait | ✅ Processing shows 12-block copy + progress + “Why do we wait?” note |

**Superseded feedback (do not re-implement):**

- Eric’s early Slack point *“We need a screen of signing before processing”* (`20.46.35.png`) was **overridden in the call** (~56:30): signing happens in the **wallet extension/app**, not on a UNERA screen. The live flow is correct.

---

### B. SendTokens screenshot threads

| Screenshot | Key feedback | Status |
|------------|--------------|--------|
| `20.37.08.png` | Only External Wallet; remove UNERA User + Bank | ✅ |
| `20.37.18.png` | Enter address + Select from Contact/saved address | ✅ Label “Select from Contacts” (wording deferred — acceptable) |
| `20.46.05.png` | hUSD/USDC/USDT; remove fee row + UNERA tip | ✅ |
| `20.46.15.png` | Rename fee → Network fee; remove Note | ✅ NETWORK FEE + tooltip; no Note row |
| `20.47.08.png` | Remove fee $, Note, instant/email banner, 2FA | ✅ Only irreversibility callout remains |
| `20.46.35.png` | Token Sent title, tx hash, nonce, remove note/fee $ | ✅ Mostly — title is **“Tokens Sent Successfully!”** (plural; see note below) |
| `20.46.42.png` | Tx hash → explorer; no fee in app UI | ✅ |
| `20.47.16.png` | Success trigger = Submitted vs Completed | ✅ Submitted adopted |
| `20.47.08.png` (Ducke email) | No “recipient notified by email” UI | ✅ Not shown |
| `22.00.45.png` | Save contacts name + description; **no signature** to add | ⚠️ Save modal ✅; **contact picker does not load saved book** (see P2) |

**Not Send-page scope** (correctly ignored here):

- `20.47.34.png`, `20.47.43.png` — transaction **filters** / Activity
- `20.47.43.png`, `20.47.51.png` — dashboard **Buy Stablecoins** / UNERA CAD banner

---

## What is already correct (evidence on live page)

### Flow architecture

```
[Gate] Prerequisites (#step1) — not in stepper
Step 1  Recipient — Enter Wallet Address | Select from Contacts
Step 2  Amount — hUSD / USDC / USDT
Step 3  Confirm — review + irreversibility + NETWORK FEE tooltip
        [Wallet popup mock — no #step6]
Step 4  Processing — broadcast + 12-block progress
Step 5  Success — Submitted + explorer hash + nonce + save-to-book CTA
```

### Confirmed markup / behavior

- Page title: **Send Tokens** / subtitle external wallet
- Stepper: **Recipient → Amount → Confirm → Success** (4 visible steps)
- Confirm CTA: **Confirm** + `confirmAndProcess()` with “Confirm in your wallet…” hint
- Review rows: RECIPIENT, NETWORK, AMOUNT, NETWORK FEE (Applies on-chain + Material info icon), TOTAL (token only)
- Success: lightning hero, **Tokens Sent Successfully!**, **Submitted** badge, full receipt rows, truncated hash with ↗ link, nonce, date/time
- Processing: block progress, ETA copy for Base/Ethereum with **12 block confirmations**
- Address book save on success (no wallet signature); modal with nickname + optional description
- Demo edge outcomes + `feeChanged` review blocker (prototype)

### Regression grep (forbidden strings)

Live page no longer contains: `UNERA User`, `Bank Account`, `Choose Method`, `Sign in Wallet`, `Review & Sign`, `step6`, success **Completed**, `UNERA-to-UNERA`, `Recipient notified`, `2FA enabled`, in-flow `≈ $` fee display.

---

## Remaining gaps — detail + implementation plan

### G1 — Read-only wallet gate (P1) ❌

**Feedback:** Huệ ~01:01–01:03; Son ~01:03 — view-only / non-sign-capable wallet connection must block send actions. Frontend should gate before Amount/Confirm.

**Current:** No `walletCanSign` in `appState`; no `#walletSignGate4` / `#walletSignGate5`; `confirmAndProcess()` does not check sign capability.

**Target:** Port from [`markdown/send-enhanced-june06-build-plan.md`](send-enhanced-june06-build-plan.md) §6.3, §8.1, §8.6.

| Step | Action |
|------|--------|
| 1 | Add to `appState`: `walletCanSign: true` |
| 2 | On load: `if (new URLSearchParams(location.search).get('viewOnly') === '1') appState.walletCanSign = false` |
| 3 | Add `.wallet-sign-gate` CSS (warning tint, min 44px touch) |
| 4 | Insert gate HTML on `#step4` (after presets) and `#step5` (before demo pills) |
| 5 | Implement `updateWalletSignGates()` — show gates, disable `#continueFromStep4` and `#confirmSendBtn` when read-only |
| 6 | Call from `goToStep(4)`, `goToStep(5)`, `validateAmount()`, page init, end of `updateReview()` |
| 7 | In `confirmAndProcess()`: early return + `showNotification('Connect a sign-capable wallet to send tokens.', 'warning')` |

**Copy:** `Connect a sign-capable wallet to send tokens.`

**Verify:** Open `send-enhanced.html?viewOnly=1` → gates visible; Continue/Confirm disabled.

---

### G2 — Contact list ignores saved address book (P2) ⚠️

**Feedback:** Kevin/Eric (`22.00.45.png`) — users save wallet + name + description; contacts should be reusable without signing.

**Current:**
- `seedSendAddressBookIfEmpty()` seeds `localStorage` key `unera_sendAddressBook_v2`
- **Select from Contacts** uses `renderContactList()` → **only `MOCK_CONTACTS`** (3 rows)
- Dead code: `renderSavedAddressList()` targets `#savedAddressList` which **does not exist** in DOM (`#contactList` is used instead)
- User-saved addresses from success modal **never appear** in the contact picker

**Target behavior:**

| Rule | Implementation |
|------|----------------|
| Merge sources | `MOCK_CONTACTS` + `loadSendAddressBook()` deduped by `address` + `network` |
| Row shape | `label` (or `name`), optional `description`, truncated `0x…`, network pill |
| Search | Filter name, description, address, network |
| No signature | Keep current save modal (already correct) |
| Payee parity | Optional sync labels with [`NewUnera/payee-management.html`](../NewUnera/payee-management.html) `#wallets` mock rows |

**Implementation sketch:**

```javascript
function getMergedContactEntries() {
  var book = loadSendAddressBook().map(function(e) {
    return { name: e.label, description: e.description || '', address: e.address, network: e.network };
  });
  var seen = {};
  var merged = [];
  MOCK_CONTACTS.concat(book).forEach(function(c) {
    var key = (c.address || '').toLowerCase() + '|' + (c.network || '');
    if (!key || seen[key]) return;
    seen[key] = true;
    merged.push(c);
  });
  return merged;
}
```

Replace `MOCK_CONTACTS.filter(...)` in `renderContactList` with `getMergedContactEntries().filter(...)`.

**Cleanup:** Remove or repoint `renderSavedAddressList`, `renderSavedAddressListAll`, `#savedAddressList` references — they are orphaned.

**Verify:** Save a new address on success → Send again → contact appears under Select from Contacts without refresh beyond re-entering step.

---

### G3 — Nav balance label still “UNERA” (P3) ⚠️

**Feedback:** Eric amount step — show hUSD/USDC/USDT, not UNERA.

**Current:** `#navWalletBalance` and `#drawerWalletBalance` hardcoded **2,500.00 UNERA** in nav HTML.

**Target (mock):** Either:
- **Option A (simple):** `2,500.00 hUSD` static label aligned with default token, or
- **Option B (better):** Update balance text when `selectToken()` changes to `{balance} {token}`

**Files:** Nav markup in `send-enhanced.html` (~L2716, ~L2877); optional hook in `selectToken()`.

---

### G4 — Prerequisites marketing copy (P3, optional)

**Current** `#step1` info box includes:
- “Instant transfers to any wallet”
- “Low network fees”

**Issue:** On-chain sends are neither instant nor universally low-fee; copy predates external-wallet-only scope.

**Suggested replacement:**
- “Send stablecoins to any Ethereum-compatible address”
- “Network fees apply and are paid in your connected wallet”

Low risk; improves trust alignment with Ducke/Eric review messaging.

---

### G5 — Dead / legacy JS (P4, cleanup)

| Symbol | Issue |
|--------|-------|
| `renderSavedAddressList*` | Targets missing `#savedAddressList` |
| `selectOption` | Alias only — keep or remove |
| `validateStep3AndContinue` | Alias to recipient validate — harmless |
| `appState.note` | Unused field — optional delete |

No user-visible bug if G2 is fixed; reduces maintainer confusion.

---

### G6 — Open product choices (no action unless you decide)

| Topic | Slack / call | Live choice | Notes |
|-------|--------------|-------------|-------|
| Success title | “Token Sent” (Eric) | “Tokens Sent Successfully!” | Build plan chose plural; both acceptable |
| Card B label | “Select from saved address” (Son) vs “Select from Contacts” | Contacts | Eric deferred final wording |
| Kevin transfer button | Per-contact “transfer” on payee list | Inline select in Send | Equivalent UX; dedicated button is **nice-to-have** on `payee-management.html` only |
| Email on micro-tx | Ducke spam concern | No UI | Correct — backend policy if ever built |

---

## Out of scope (confirmed)

Do **not** track these as Send Tokens gaps:

- Transaction filter modal (Money In/Out → Recipient/Sender, Status removal, Bank Transfers)
- Dashboard Buy Stablecoins / UNERA CAD banner
- Nav wallet+network merge / unsupported network chrome (separate sprint per alignment plan)
- In-app Sign Transaction screen (explicitly rejected in call)
- Gas fee USD in review/success totals
- “Recipient notified by email” or 2FA chips on review

---

## Verification checklist (definition of done)

After G1–G2 (minimum):

### Functional

1. Prerequisites → Recipient → Amount → Confirm → Processing → Success (happy path)
2. Token switch updates balance label on amount step
3. Review: NETWORK FEE tooltip works (keyboard + Escape)
4. Confirm → wallet hint → no Sign step → Processing 12-block UI → Success **Submitted**
5. Tx hash opens Etherscan/Basescan by network
6. Save address on success → reappears in contact list (G2)
7. `?viewOnly=1` blocks send (G1)

### Regression grep

```bash
rg -n "UNERA User|Bank Account|Choose Method|Sign in Wallet|Review & Sign|id=\"step6\"|Completed|UNERA-to-UNERA|Recipient notified|2FA enabled" NewUnera/send-enhanced.html
```

Expect zero matches in product copy (comments/demo configs may mention strings in isolation).

### Accessibility

- Skip link, focus rings, `aria-live` on processing/confirming hints
- Fee info `aria-expanded` + Escape dismiss
- `prefers-reduced-motion` on spinner/progress

---

## Recommended execution order

1. **G1** — `walletCanSign` gate (unblocks Huệ/Son security requirement)
2. **G2** — merge contact list + remove dead `savedAddressList` code
3. **G3** — nav balance label
4. **G4** — prerequisites copy (optional same PR)
5. **G5** — dead code cleanup

**Estimated diff:** ~150–250 lines (mostly G2 contact merge + G1 gates).

Reference implementation deltas: [`NewUnera/send-enhanced_June06.html`](../NewUnera/send-enhanced_June06.html) (read-only; June06 also lacks G1/G2 merge).

---

## Questions for Minh (only if you want to change defaults)

1. **Success title:** Keep “Tokens Sent Successfully!” or shorten to Eric’s “Token Sent”?
2. **Card B label:** Keep “Select from Contacts” or switch to “Select from saved address”?
3. **After G1–G2 pass verification:** Archive/delete `send-enhanced_June06.html`?

If no reply, **keep current copy** and ship G1 + G2 as the only required fixes.
