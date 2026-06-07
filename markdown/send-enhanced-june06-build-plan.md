# Send Tokens (`send-enhanced.html`) — Composer Build Plan

**Created:** 2026-06-06  
**Purpose:** Implementation-ready handoff for Composer 2.5 (or Agent) to finish the June 5 team-alignment Send Tokens rebuild at **Opus-level quality**.  
**Primary target file:** `NewUnera/send-enhanced.html` (the live browser tab at `http://127.0.0.1:8765/NewUnera/send-enhanced.html`)  
**Diff reference (already ~90% correct):** `NewUnera/send-enhanced_June06.html` — treat as the **source of truth for remaining gaps**, not a second product page.

---

## 1. Goal and scope

### Goal

Ship the **on-chain Send Tokens flow** agreed in the June 5, 2026 alignment call (Eric + Minh) and Slack/screenshot feedback: external wallet only, stablecoins **hUSD / USDC / USDT**, no in-app Sign step, wallet popup between Confirm and Processing, success at **Submitted** (not Completed), block explorer link on tx hash, contacts/address book, read-only wallet gate.

### In scope

| Area | File |
|------|------|
| Send flow UI, stepper, copy, mock JS | `NewUnera/send-enhanced.html` |
| Align saved-address mock rows (optional sync) | `NewUnera/payee-management.html` — only if contact labels/networks drift |

### Explicit non-goals

- Backend, APIs, `consumer-app-nav.js` contract changes (mock only)
- Nav merge / unsupported network (separate sprint; do not block Send on nav chrome)
- Filter modal, dashboard Buy, wallet Activity (other June 5 items — see `Feedback/June05/TeamAlignmentJune05/june05_team_alignment_improvements_875d92c8.plan.md`)
- Email notification on send (Ducke flagged spam risk — **no UI** for “recipient notified by email” in this flow)
- Deleting `send-enhanced_June06.html` after merge (optional cleanup; not required for DoD)
- `NewUnera/brand-style-guide.html`

### Resolved product decisions (do not re-open in build)

| Decision | Resolution |
|----------|------------|
| Prerequisites gate | **Keep as-is** (`#step1` Before You Send) — not in 4-step stepper |
| Success trigger state | **Submitted** (tx broadcast to mempool) — not “Completed” / mined / L1 finalized |
| Processing step | **Show block progress** on `#step7` before Success (~2s mock, then `#step8`) |
| Filter labels Received/Sent | Out of scope for Send page |
| Recipient card label | **“Select from Contacts”** (Eric: Enter address OR Select from Contact; Son: “saved address” — current copy is acceptable) |

---

## 2. Gap analysis — live page vs target

Audit date: **2026-06-06**. Compare `send-enhanced.html` (live) vs `send-enhanced_June06.html` + feedback PNGs.

### Already correct on live `send-enhanced.html` ✅

| Item | Evidence |
|------|----------|
| Page title/subtitle | `Send Tokens` / `Send stablecoins to an external wallet address` (~L2920–2921) |
| 4-step stepper | Recipient → Amount → Confirm → Success (~L2925–2942) |
| No Choose Method cards in UI | Step 2 is Recipient with two cards (~L3016–3086) |
| Amount tokens hUSD/USDC/USDT | Token selector ~L3137–3149; no UNERA label on dropdown |
| No amount-step fee row / USD conversion | Amount section ~L3117–3161 has no `fee-row` or `≈ $` |
| Recipient: Enter Address + Contacts | Inline sections `#enterAddressSection`, `#contactsSection` |
| Save address success CTA + modal | `#saveAddressSuccessBtn`, `openSaveAddressModal` |
| Processing + block progress UI | `#step7`, `#blockConfirmInfo` (~L3285–3306) |
| Success hero (check + bolt) | `#sendSuccessWrap` (~L3312–3318) |
| Tx hash link + Nonce row | `#transactionHashLink`, `#successNonce` |
| Mock contacts + localStorage address book | `MOCK_CONTACTS`, `SEND_ADDRESS_BOOK_KEY` (~L3525–3531) |

### Still wrong or incomplete on live `send-enhanced.html` ❌

| # | Gap | Feedback source | Target (June06 / meeting) |
|---|-----|-----------------|---------------------------|
| G1 | **`#step6` Sign in Wallet** still in DOM + JS | Ducke ~01:07; Son 20.46.42 | Delete step; Confirm → wallet mock → Processing |
| G2 | Confirm CTA **`Review & Sign`** + `onclick="processSend()"` | Ducke | **`Confirm`** + `confirmAndProcess()` |
| G3 | **`signTransaction()`**, `updateSignSummary()`, `goToStep(6)` refs | Meeting | Remove; wallet mock inside `confirmAndProcess` |
| G4 | Success title **`Token Sent`** (singular) | Eric/plan | **`Tokens Sent Successfully!`** |
| G5 | Status **`Completed`** (green success) | Son/Ducke; Minh: Submitted | **`Submitted`** + sub-note “Awaiting blockchain confirmation” |
| G6 | Review **Network fee** row = plain “Applied” | Eric 20.46.15; Son tooltip | **NETWORK FEE · Applies on-chain · info tooltip** (no $ amount) |
| G7 | **`#reviewExternalSoftWarn`** banner (network fee applies chip row) | Ducke 20.47.08 — remove duplicate “instant/no fees” pattern | **Remove**; irreversibility callout only |
| G8 | **`reviewTotal`** uses `formatNetworkFeeTotal` (ETH + $ fee in total) | Son: no fee $ in app | Total = **amount in token units only** |
| G9 | Success receipt vague **Destination** (“Ethereum wallet”) | June 06 review parity | **Recipient, Network, Amount, Network fee, Total** + Hash↗, Nonce, Date, Status |
| G10 | **No `walletCanSign` gate** | Huệ/Son ~01:02 | `appState.walletCanSign`; gates on Amount + Confirm |
| G11 | Legacy JS: **`selectUneraUser`**, **`showAddBankMock`**, bank CSS, **`formatNetworkFeeTotal`** in review/outcome | Removed flows | Delete dead code paths |
| G12 | **`#step3`** orphan panel + `renderStep3` bank/unera injectors | Flow simplification | Remove from navigation path; optional delete dead DOM |
| G13 | Nav balance still **`2,500.00 UNERA`** | Token list cleanup | Display mock token balance or generic label (align with selected token if easy) |
| G14 | `appState.balances` includes **hCAD, hEUR** | Eric: hUSD/USDC/USDT only | Remove unused balance keys |
| G15 | Fee tooltip icon not **Material Symbols** | `newunera-icons.mdc` | Use Material `info` path in `viewBox="0 -960 960 960"` |

**Composer strategy:** Port the **delta** from `send-enhanced_June06.html` into `send-enhanced.html` section-by-section below. Do **not** rewrite the whole 5,900-line file unless a merge conflict forces it.

---

## 3. Canonical references

| Reference | Path | Use for |
|-----------|------|---------|
| **Primary diff source** | `NewUnera/send-enhanced_June06.html` | Confirm step, success, confirmAndProcess, wallet gates, fee tooltip CSS |
| Live file to edit | `NewUnera/send-enhanced.html` | All edits land here |
| Meeting plan | `Feedback/June05/TeamAlignmentJune05/june05_team_alignment_improvements_875d92c8.plan.md` | Decision log, step structure |
| Transcript | `Feedback/June05/TeamAlignmentJune05/GMT20260605-080131_Recording.transcript.vtt` | Send ~00:36–00:58, view-only wallet ~01:01–01:03 |
| Screenshot feedback | `Feedback/June05/SendTokens/*.png` | Annotated removals (Ducke/Eric/Son/Kevin) |
| Slack synthesis | `markdown/feedback-summary-june05.md` | Cross-thread summary |
| Contacts / payees | `NewUnera/payee-management.html` | Row shape: name + 0x… + network |
| Success hero | `.cursor/rules/newunera-success-screen-hero.mdc` | Check + lightning badge |
| Fee info row | `.cursor/rules/newunera-inline-icon-lead.mdc` | Tooltip alignment |
| Flow outcomes | `.cursor/rules/newunera-flow-edge-outcomes.mdc` | Demo pills, outcome screens |
| Stepper | `.cursor/rules/newunera-flow-stepper.mdc` | Processing maps to last stepper node active |
| Selection checkmarks | `.cursor/rules/newunera-selection-check.mdc` | Recipient card checks |
| Brand / a11y | `.cursor/rules/new-brand-output.mdc`, `newunera-accessibility-wcag.mdc` | Tokens, focus, no gradients |

---

## 4. Target flow architecture

```
[Gate] #step1 Prerequisites (KYC + wallet) — NOT in stepper
Step 1  #step2 Recipient — Enter Wallet Address | Select from Contacts
Step 2  #step4 Amount — hUSD / USDC / USDT
Step 3  #step5 Review — summary + irreversibility + NETWORK FEE tooltip row
        [MetaMask / WalletConnect — NO #step6 screen]
Step 4  #step7 Processing — broadcast + block progress bar
Step 5  #step8 Success — Submitted + explorer hash + nonce
```

**DOM step IDs (keep stable — do not renumber HTML ids):**

| Content step | `#stepN` id | Stepper label |
|--------------|-------------|---------------|
| Prerequisites | 1 | (hidden) |
| Recipient | 2 | Recipient |
| (legacy unused) | 3 | — |
| Amount | 4 | Amount |
| Confirm | 5 | Confirm |
| ~~Sign~~ | ~~6~~ | **DELETE** |
| Processing | 7 | (maps to Success node active) |
| Success | 8 | Success |

---

## 5. Files in scope

| File | Action |
|------|--------|
| `NewUnera/send-enhanced.html` | **Edit** — all items in §6–§9 |
| `NewUnera/payee-management.html` | **Optional** — ensure wallet payee mock names match `MOCK_CONTACTS` |
| `NewUnera/send-enhanced_June06.html` | **Read-only reference** — do not ship as production URL |

### Do NOT edit

- `consumer-app-nav.js`, backend, root-level non-`NewUnera/` HTML
- `NewUnera/brand-style-guide.html`

---

## 6. Structural / markup plan (paste-ready)

### 6.1 Delete `#step6` entirely

**Remove** block starting at:

```html
<!-- STEP 6: Sign Transaction -->
<div class="step-content" id="step6">
```

through closing `</div>` before `<!-- STEP 7: Processing -->` (~L3242–3283 in current live file).

Also remove CSS scoped to sign step if any (`.sign-summary-chip`, `.sign-waiting-inner`, etc.) — grep `sign-` in `<style>`.

### 6.2 Replace Confirm step markup (`#step5`)

Copy structure from `send-enhanced_June06.html` ~L3198–3270. Key differences from live:

**A. Summary labels** — use uppercase labels consistent with wallet review pages:

```html
<span class="summary-label">RECIPIENT</span>
<span class="summary-label">NETWORK</span>
<span class="summary-label">AMOUNT</span>
```

**B. Network fee row** — replace live ~L3191–3194:

```html
<div class="summary-item" id="reviewNetworkFeeRow">
    <span class="summary-label">NETWORK FEE</span>
    <span class="summary-value fee-info-wrap">
        Applies on-chain
        <button class="fee-info-btn" type="button"
                aria-label="Network fee information"
                aria-describedby="fee-tooltip-text"
                onclick="toggleFeeTooltip(this)"
                onkeydown="feeTooltipKeydown(event, this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                 viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
                <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
            </svg>
        </button>
        <span class="fee-tooltip" id="fee-tooltip-text" role="tooltip">
            Network (gas) fee is paid to the blockchain network, not UNERA. The exact amount will be shown in your wallet when you confirm.
        </span>
    </span>
</div>
```

**C. Remove** `#reviewExternalSoftWarn` block (~L3200–3204 live) entirely.

**D. Add wallet sign gate** before demo pills (copy from June06 ~L3248–3252):

```html
<div id="walletSignGate5" class="wallet-sign-gate" hidden>
    <!-- warning SVG -->
    <span>Connect a sign-capable wallet to send tokens.</span>
</div>
```

**E. Confirm CTA** — change button:

```html
<button class="btn btn-primary" onclick="confirmAndProcess()" id="confirmSendBtn">
    Confirm
    <!-- chevron SVG -->
</button>
```

### 6.3 Amount step — add wallet sign gate

After presets / before `.btn-actions` on `#step4`, add (from June06 ~L3180–3184):

```html
<div id="walletSignGate4" class="wallet-sign-gate" hidden>
    <!-- same copy as gate5 -->
</div>
```

### 6.4 Success step (`#step8`)

Align with June06 ~L3307–3340:

| Element | Live (wrong) | Target |
|---------|--------------|--------|
| `#successScreenHeading` | `Token Sent Successfully!` | **`Tokens Sent Successfully!`** |
| Status badge | none | `<div class="outcome-badge outcome-badge--pending">Submitted</div>` under amount |
| Sub-note | none | `<p>…Awaiting blockchain confirmation</p>` centered, `--text-secondary` |
| `#successRecipient` row | absent / vague Destination | **Recipient** (truncated address or `Label (0x…)` — mirrors `#reviewDestination`) |
| `#successNetwork` row | absent | **Network** (mirrors `#reviewNetwork`) |
| `#successReceiptAmount` row | absent | **Amount** (token units — mirrors `#reviewAmount`) |
| Network fee row | absent | **Network fee · Applies on-chain** (static; no $ amount) |
| `#successTotal` row | present | **Total** (token amount only — mirrors `#reviewTotal`) |
| Status row value | `Completed` / `--success` | **`Submitted`** / `--brand-deep-blue` font-weight 600 |
| Hash link | present | Keep + external-link SVG (June06 ~L3322–3325) |

**Success receipt rows (order):**

1. Recipient (truncated address or saved contact label)
2. Network
3. Amount (token units)
4. Network fee — `Applies on-chain`
5. Total (token amount only)
6. Transaction Hash (truncated + link + ↗ icon)
7. Nonce
8. Date & time
9. Status: Submitted

### 6.5 Optional dead code cleanup

- `#step3` / `#step3Card` — flow never calls `goToStep(3)` after recipient refactor. **Safe to delete** HTML block + `renderStep3Content` bank/unera branches if grep confirms no callers except legacy.
- CSS `.send-option[data-option="bank"]` (~L843) — delete.

---

## 7. Styling contract

Add to live `<style>` (copy from June06 ~L793–820):

```css
.wallet-sign-gate {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.875rem 1rem;
    border-radius: 0.75rem;
    background: color-mix(in srgb, var(--warning) 12%, var(--brand-white));
    border: 1px solid color-mix(in srgb, var(--warning) 35%, transparent);
    color: var(--text-primary);
    font-size: 0.875rem;
}
.wallet-sign-gate svg { flex-shrink: 0; color: var(--warning); margin-top: 0.1em; }

.fee-info-wrap { display: inline-flex; align-items: center; gap: 0.375rem; position: relative; flex-wrap: wrap; justify-content: flex-end; }
.fee-info-btn { background: none; border: none; cursor: pointer; color: var(--text-secondary); padding: 2px; display: inline-flex; align-items: center; border-radius: 4px; min-width: 24px; min-height: 24px; }
.fee-info-btn:focus-visible { outline: 2px solid var(--brand-deep-blue); outline-offset: 2px; }
.fee-tooltip {
    display: none;
    position: absolute;
    right: 0;
    top: calc(100% + 0.35rem);
    z-index: 20;
    max-width: 260px;
    padding: 0.625rem 0.75rem;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.45;
    color: var(--text-primary);
    background: var(--brand-white);
    border: 1px solid var(--border-subtle);
    border-radius: 0.5rem;
    box-shadow: 0 4px 16px rgba(23, 61, 71, 0.12);
}
.fee-tooltip.is-open { display: block; }
@media (max-width: 480px) {
    .fee-tooltip { max-width: min(260px, calc(100vw - 2rem)); }
}
```

**Tokens only** — no new gradients. Focus rings: `outline: 2px solid var(--brand-deep-blue)`.

**Responsive:** `@media (max-width: 768px)` — amount input `font-size: 1rem`; demo pills min-height 44px (existing).

---

## 8. Script / logic plan

### 8.1 `appState` additions

In the main `appState` object (~L3630 live), add:

```javascript
walletCanSign: true,  // mock: set false to demo read-only wallet
```

**Demo toggle (prototype):** Add optional query param handler on load:

```javascript
if (new URLSearchParams(location.search).get('viewOnly') === '1') {
    appState.walletCanSign = false;
}
```

### 8.2 Remove Sign step functions

**Delete entirely:**

- `updateSignSummary()`
- `signTransaction()`
- `window.signTransaction = signTransaction`
- Any `if (step === 6)` branch in `goToStep()` (~L3828)
- `validateStepTransition` check for `step === 6` (~L3845)

### 8.3 Add `confirmAndProcess()` (copy from June06 ~L5493–5513)

```javascript
function confirmAndProcess() {
    if (!appState.walletCanSign) {
        showNotification('Connect a sign-capable wallet to send tokens.', 'warning');
        return;
    }
    if (isReviewEdgeBlocking()) {
        showNotification('Please resolve the flagged issue before proceeding.', 'warning');
        return;
    }
    var btn = document.getElementById('confirmSendBtn');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Confirming…';
    }
    var actions = btn && btn.closest('.btn-actions');
    var hint = document.getElementById('confirmingHint');
    if (!hint && actions) {
        hint = document.createElement('p');
        hint.id = 'confirmingHint';
        hint.className = 'input-hint';
        hint.setAttribute('role', 'status');
        hint.setAttribute('aria-live', 'polite');
        hint.style.cssText = 'margin-top:0.5rem;color:var(--text-secondary);text-align:right;width:100%;';
        hint.textContent = 'Confirm in your wallet…';
        actions.parentNode.insertBefore(hint, actions.nextSibling);
    }
    setTimeout(function() { processSend(); }, 1500);
}
window.confirmAndProcess = confirmAndProcess;
```

**Wire Confirm button:** `onclick="confirmAndProcess()"` — **not** `processSend()`.

### 8.4 Update `processSend()` (~L5542 live)

1. Call `updateProcessingSubtext()` then `goToStep(7)`.
2. After **2000ms** (keep block progress visible — Minh decision), generate mock hash, call `showSendSuccess(txHash)` or `renderSendOutcome(...)`, then `goToStep(8)`.
3. On entry, clear `#confirmingHint` and re-enable Confirm button text in `resetFlow()`.

Use June06 mock hash prefix pattern for realistic demo: `0x742d35Cc6634C0532925a3b8f…`.

### 8.5 Fix `updateReview()` (~L5442 live)

```javascript
// TOTAL — token amount only; gas is wallet-side
document.getElementById('reviewTotal').textContent =
    formatTokenAmount(appState.amount) + ' ' + currency;

// Remove any formatNetworkFeeTotal usage in reviewTotal
```

Keep `calculateFee()` for **demo edge case** `feeChanged` blocker only — do not surface `$` fee in review rows.

Call `updateWalletSignGates()` at end of `updateReview()`.

### 8.6 `updateWalletSignGates()`

Copy pattern from June06 (~L4973, ~L5465):

```javascript
function updateWalletSignGates() {
    var readOnly = appState.walletCanSign === false;
    ['walletSignGate4', 'walletSignGate5'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.hidden = !readOnly;
    });
    var continueBtn4 = document.getElementById('continueFromStep4');
    var confirmBtn = document.getElementById('confirmSendBtn');
    if (continueBtn4 && readOnly) continueBtn4.disabled = true;
    if (confirmBtn && readOnly) {
        confirmBtn.disabled = true;
        confirmBtn.setAttribute('aria-disabled', 'true');
    }
}
```

Call from: `goToStep(4)`, `goToStep(5)`, `validateAmount()`, page init.

### 8.7 Fee tooltip a11y

```javascript
function toggleFeeTooltip(btn) {
    var tip = document.getElementById('fee-tooltip-text');
    var open = tip && tip.classList.toggle('is-open');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
function feeTooltipKeydown(e, btn) {
    if (e.key === 'Escape') {
        var tip = document.getElementById('fee-tooltip-text');
        if (tip) tip.classList.remove('is-open');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }
}
document.addEventListener('click', function(e) {
    if (!e.target.closest('.fee-info-wrap')) {
        var tip = document.getElementById('fee-tooltip-text');
        if (tip) tip.classList.remove('is-open');
        document.querySelectorAll('.fee-info-btn[aria-expanded="true"]').forEach(function(b) {
            b.setAttribute('aria-expanded', 'false');
        });
    }
});
```

### 8.8 `buildSendReceiptRows` / success panel

- Remove `networkFeeStr` from success HTML template (keep for outcome error demos if needed).
- `totalStr`: **amount + token only**.
- `renderOutcomeDetailsPanel`: drop **Network fee** row for happy-path parity (optional for error outcomes).

### 8.9 `goToStep()` stepper mapping

Ensure `updateStepperAndMobile()` (~L3849):

| `appState.currentStep` | Stepper visual |
|------------------------|----------------|
| 2 | Step 1 active (Recipient) |
| 4 | Step 2 active (Amount) |
| 5 | Step 3 active (Confirm) |
| 7 | Step 4 active (Success label — processing) |
| 8 + success | All 4 completed + checks, progress 100% |
| 8 + outcome error | Step 4 active (no false check — per `newunera-flow-edge-outcomes.mdc`) |

### 8.10 Legacy cleanup (grep-driven)

Remove if unreferenced after edits:

| Symbol | Reason |
|--------|--------|
| `selectUneraUser` | UNERA User flow removed |
| `showAddBankMock`, `selectBankMethod` | Bank flow removed |
| `selectOption` (method cards) | Choose Method removed |
| `formatNetworkFeeTotal` in review/success | No fee in totals |
| `appState.selectedMethod` | Always external |
| `appState.note` | No note field |
| `hCAD`, `hEUR` in `balances` | Token scope |

### 8.11 Contacts / address book contract

| Rule | Implementation |
|------|----------------|
| Storage key | `unera_sendAddressBook_v2` (existing) |
| Add contact | **No wallet signature** (Kevin/Eric Slack 22.00.45); optional post-send save on success screen |
| Save affordance | `#saveAddressSuccessBtn` below `.success-details` on happy-path success **only when** `sendOption === 'enterAddress'` and address is new; opens `#saveAddressModal` |
| Row shape | `label`, optional `description`, `address`, `network` |
| Mock seed | `MOCK_CONTACTS` + merge with localStorage on render |
| Manage link | `payee-management.html#wallets` (existing ~L4129) |
| Networks | **Ethereum + Base** enabled in `SUPPORTED_SEND_NETWORKS` — disable Polygon/BSC/etc. for send picker if still listed |

---

## 9. Copy deck (exact strings)

| Location | String |
|----------|--------|
| Page title | `Send Tokens` |
| Subtitle | `Send stablecoins to an external wallet address` |
| Recipient card A | `Enter Wallet Address` / `Paste any Ethereum-compatible address` |
| Recipient card B | `Select from Contacts` / `Send to a saved wallet address` |
| Contact search placeholder | `Search contacts…` |
| Address placeholder | `0x…` |
| Success save button | `Save to address book` |
| Success saved chip | `Saved to address book` |
| Save modal dismiss | `Cancel` |
| Save modal confirm | `Save` |
| Amount label | `Amount` |
| Available balance | `Available Balance` |
| Review title | `Review Transaction` |
| Network fee value | `Applies on-chain` |
| Fee tooltip | `Network (gas) fee is paid to the blockchain network, not UNERA. The exact amount will be shown in your wallet when you confirm.` |
| Irreversibility | `Once sent, this cannot be undone.` / `Please review carefully.` |
| Confirm CTA | `Confirm` |
| Confirming hint | `Confirm in your wallet…` |
| Processing title | `Processing Transaction…` |
| Processing sub (phase 1) | `Broadcasting to network…` |
| Processing sub (phase 2) | `Waiting for confirmation…` |
| Block status | `Confirming on-chain (12 blocks required)…` |
| Success title | `Tokens Sent Successfully!` |
| Success badge | `Submitted` |
| Success sub | `Awaiting blockchain confirmation` |
| Success receipt — Recipient | (dynamic; mirrors review destination) |
| Success receipt — Network | (dynamic; mirrors review network) |
| Success receipt — Amount | (dynamic; e.g. `100.00 USDC`) |
| Success receipt — Network fee | `Applies on-chain` |
| Success receipt — Total | (dynamic; token amount only) |
| Success receipt — Transaction Hash | (truncated `0x…` + explorer link) |
| Success receipt — Nonce | (mock number) |
| Success receipt — Date & time | (locale string) |
| Success receipt — Status | `Submitted` |
| Success follow-up | `The recipient will see the transfer in their wallet. You can send again anytime.` |
| Read-only gate | `Connect a sign-capable wallet to send tokens.` |
| Explorer link `title` | Full tx hash |

**Forbidden strings anywhere in Send flow:**

- `UNERA User`, `Bank Account`, `Choose Method`, `RECOMMENDED`, `Free` (as fee), `2FA enabled`, `Recipient notified by email`, `Instant transfer`, `Sign in Wallet`, `Review & Sign`, `Completed` (success status), `UNERA-to-UNERA`, `≈ $`, `TX-` fake IDs without `0x` hash

---

## 10. Verification (definition of done)

### 10.1 Functional walkthrough

1. Open `send-enhanced.html` — prerequisites show if KYC/wallet incomplete; else lands on Recipient.
2. **Recipient → Enter Address:** paste valid `0x…`, select network (Ethereum/Base), Continue → Amount.
3. **Recipient → Contacts:** pick mock row, Continue → Amount.
4. **Amount:** switch hUSD/USDC/USDT; balance label updates; presets work; no fee row.
5. **Confirm:** rows = Recipient, Network, Amount, NETWORK FEE (tooltip), Total (token only); irreversibility callout; **no** soft “instant/email/no fees” banner.
6. Click **Confirm** → button disables + “Confirm in your wallet…” → **no #step6** → Processing with **progress bar animating** ~2s → Success.
7. Success: **Tokens Sent Successfully!**, badge **Submitted**, hash links to Etherscan/Basescan by network, Nonce populated.
8. `?viewOnly=1` → gates visible; Continue/Confirm disabled.

### 10.2 Regression grep (must return zero)

Run from repo root:

```bash
rg -n "UNERA User|Bank Account|Choose Method|Sign in Wallet|Review & Sign|signTransaction|step6|Completed|UNERA-to-UNERA|Recipient notified|2FA enabled" NewUnera/send-enhanced.html
```

Allowed exceptions: comments documenting removal, demo outcome configs mentioning unrelated strings.

### 10.3 Accessibility

- [ ] Skip link `#main-content` first in body
- [ ] Tab through Recipient cards, token dropdown, Confirm, fee info button
- [ ] Fee tooltip: keyboard + Escape dismiss
- [ ] `aria-live="polite"` on processing subtext and confirming hint
- [ ] Focus moves to `#successScreenHeading` on success
- [ ] `prefers-reduced-motion: reduce` — spinner/progress animations 0.01ms

### 10.4 Responsive

- [ ] 768px: mobile stepper compact; amount input 1rem
- [ ] 480px: fee tooltip doesn’t clip off-screen

### 10.5 Brand

- [ ] No `#10B981`, Space Grotesk, CSS gradients on product UI
- [ ] TestFoundersGrotesk only
- [ ] Success hero per `newunera-success-screen-hero.mdc`

---

## 11. Anti-patterns (do not ship)

- In-app **Sign Transaction** screen between Confirm and MetaMask
- **Gas fee in USD** or ETH added to Review Total or Success Total
- **Completed** status for v1 success (use **Submitted**)
- **Send Type / Note / email / 2FA** chips on review
- Re-introducing **UNERA User** or **Bank Account** paths
- **`processSend()`** directly on Confirm click without wallet mock delay
- Persisting demo outcome to localStorage
- Using Heroicons stroke paths inside Material `fill="currentColor"` wrappers for fee info icon

---

## 12. Suggested Composer execution order

Execute in this order to minimize broken intermediate states:

1. **CSS** — add `.wallet-sign-gate`, `.fee-info-*` (§7)
2. **Confirm markup** — fee row, remove `#reviewExternalSoftWarn`, Confirm button (§6.2)
3. **Success markup** — title, Submitted badge, remove fee/recipient rows (§6.4)
4. **Delete `#step6`** HTML (§6.1)
5. **JS** — `confirmAndProcess`, fix `updateReview` total, remove sign functions (§8.2–8.5)
6. **JS** — `updateWalletSignGates` + Amount gate HTML (§6.3, §8.6)
7. **JS** — fee tooltip handlers (§8.7)
8. **Cleanup** — dead bank/unera code (§8.10)
9. **Verify** — §10 checklist + grep

**Estimated diff size:** ~400–700 lines changed (mostly deletion + port from June06).

---

## 13. Feedback screenshot index (SendTokens folder)

| File | Key takeaway for Send page |
|------|----------------------------|
| `20.37.08.png` | Remove UNERA User + Bank Account; only external send |
| `20.37.18.png` | Two options: enter address / saved address; no “External Wallet” label |
| `20.46.05.png` | Amount: hUSD/USDC/USDT; remove fee row + UNERA tip |
| `20.46.15.png` | Review: rename fee → Network fee; remove Note |
| `20.47.08.png` | Remove fee $ row, Note, instant/email banner, 2FA chip |
| `20.46.35.png` | Success: Token Sent, tx hash, nonce; remove note |
| `20.46.42.png` | Tx hash → explorer; remove fee from UI |
| `20.47.16.png` | Success trigger = Submitted (design choice — adopted) |
| `22.00.45.png` | Contacts: no signature to add; name + description |

---

## 14. Open question for Minh (optional — default applied)

| Question | Default if no reply |
|----------|---------------------|
| After merge, delete `send-enhanced_June06.html`? | **Keep** as archive until live page passes §10 checklist |
| Card B label: “Select from Contacts” vs “Select from saved address”? | **Keep “Select from Contacts”** (already shipped; Eric deferred final wording) |

No other blockers — Composer can proceed with defaults above.
