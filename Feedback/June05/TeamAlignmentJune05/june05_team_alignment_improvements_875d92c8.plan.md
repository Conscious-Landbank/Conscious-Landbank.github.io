---
name: June05 Team Alignment Improvements
overview: Implementation-ready design plan from the June 5 team alignment meeting (Eric + Minh as decision makers), Slack feedback threads, and feedback screenshots — covering Send Tokens, filters/Activity, dashboard Buy flow, nav/chrome, wallet states, and deferred next-sprint items.
todos:
  - id: send-step1
    content: "Rebuild send-enhanced.html Step 1: remove Choose Method (UNERA User/Bank Account), replace with Recipient step (Enter Address + Select from Contacts)"
    status: completed
  - id: send-step3
    content: "Clean up send-enhanced.html Amount step: token labels hUSD/USDC/USDT only; remove fee row, USD conversion, and UNERA-to-UNERA tip"
    status: completed
  - id: send-step4
    content: "Fix send-enhanced.html Review step: remove Send Type, Note, email/2FA chips; Network fee applies + info tooltip (no dollar amount)"
    status: completed
  - id: send-remove-sign
    content: Remove in-app Sign step (step6) from send-enhanced.html — Confirm opens MetaMask/WalletConnect directly per Ducke/Son/Eric
    status: completed
  - id: send-step5
    content: "Fix send-enhanced.html Success step: title Tokens Sent Successfully!, Status Submitted, block explorer link on tx hash, keep Nonce row"
    status: completed
  - id: send-stepper
    content: Update send-enhanced.html stepper to Recipient → Amount → Confirm → Success (Prerequisites stays as pre-flow gate, not in stepper)
    status: completed
  - id: send-contacts
    content: Wire Select from Contacts to payee-management.html mock data or inline picker; saved address = name + 0x… + network, no signature to add
    status: completed
  - id: filter-cleanup
    content: "Fix wallet-enhanced.html filter modal: remove Status, remove Bank Transfers, rename Money In→Received / Money Out→Sent, presets local-only max 3"
    status: completed
  - id: filter-wallet-scope
    content: Ensure wallet-enhanced.html Activity section has All Wallets vs current wallet tabs; mock multi-wallet for design
    status: completed
  - id: activity-rename
    content: Rename Transaction History → Activity in wallet-enhanced.html section title (nav label TBD — Eric Slack thread)
    status: completed
  - id: dashboard-buy
    content: "Update dashboard-enhanced.html: Buy Stablecoins sub-label Buy hUSD, USDC or USDT; in-app destination; remove/rebrand UNERA CAD banner"
    status: completed
  - id: token-list
    content: Audit token lists in wallet-enhanced.html and dashboard-enhanced.html — only USDC, USDT, hUSD; remove HBAR and other tokens
    status: completed
  - id: nav-merge
    content: "OldUnera/account-settings.html FIRST: collapse wallet trigger + network badge into one combined dropdown; add Unsupported network warning; add Connect CTA when disconnected. NewUnera pages follow after."
    status: completed
  - id: mobile-nav-bell
    content: "OldUnera/account-settings.html: remove bell SVG from mobile drawer notification accordion — badge/count as text only; hamburger + close button touch target to 44×44px min"
    status: completed
  - id: wallet-states
    content: Port wallet-edge.html edge-case panels (disconnected, empty, wrong network, errors) into wallet-enhanced.html production states
    status: cancelled
  - id: account-settings-mobile
    content: Fix mobile nav menu in account-settings.html only — reference page for mobile nav QA (Minh scope decision)
    status: completed
  - id: notification-tv-defer
    content: "DEFER to next week: Eric's Notification TV spec — do not implement in this sprint"
    status: cancelled
  - id: token-mgmt-defer
    content: "DEFER until Eric's Token Management actions spec ships: wallet action list per token row will change"
    status: cancelled
isProject: false
---

# June 05 Team Alignment — Design Improvement Plan (v2)

## Goal and scope

Ship design/UX improvements agreed in the **June 5, 2026 team alignment call** (decision makers: **Eric**, **Minh Nguyen Hoang**) plus correlated Slack feedback (`Feedback/June05/`). All work targets `**NewUnera/`** HTML prototypes only.

### In scope (this sprint — Eric “chốt chắc chắn” ~01:27:19)


| Priority | Area                                                     | Primary file(s)                                                       |
| -------- | -------------------------------------------------------- | --------------------------------------------------------------------- |
| P0       | Send Tokens flow rebuild                                 | `NewUnera/send-enhanced.html`                                         |
| P0       | Transaction filter / Activity cleanup                    | `NewUnera/wallet-enhanced.html`                                       |
| P0       | Buy Stablecoins + token list + CAD banner                | `NewUnera/dashboard-enhanced.html`, `NewUnera/wallet-enhanced.html`   |
| P1       | Nav chrome (wallet + network merge, unsupported network) | `**OldUnera/account-settings.html` first** — NewUnera pages follow    |
| P1       | Mobile notification bell + touch targets                 | `**OldUnera/account-settings.html` first**                            |
| P1       | Wallet disconnected/empty/error states                   | `NewUnera/wallet-enhanced.html` (source: `NewUnera/wallet-edge.html`) |
| P1       | Saved address / contacts in Send                         | `NewUnera/send-enhanced.html`, `NewUnera/payee-management.html`       |


### Explicit non-goals

- Backend APIs, server logic, `consumer-app-nav.js` behavior contracts (treat as black box; mock data only)
- `NewUnera/brand-style-guide.html` (no product gradient changes)
- **Notification TV** — Eric wrote spec; target **next week** after current sprint (~00:31:15–00:31:46)
- **Token Management action matrix** — Eric writing spec (~00:18:44); wallet per-token actions blocked until spec lands
- **Swap / Exchange UI** — deferred (~01:21:15, ~01:25:48); only USDC↔USDT when built; no HBAR
- **Marketing / landing pages** — Renol owns frontend landing; no Dashboard/Wallet nav on marketing surfaces (~00:27:10–00:29:54) — note for Renol, not this sprint
- **Mint history label changes** (Minting → Receipt, Mint Audit → Send) — Son flagged outdated; defer until spec refresh (~01:26:11)

---

## Source of truth


| Source                       | Path                                                                                                  | How used                                                                                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Meeting transcript (~99 min) | `Feedback/June05/TeamAlignmentJune05/GMT20260605-080131_Recording.transcript.vtt`                     | Primary decisions + timestamps below                                                                                                                         |
| Meeting video                | `Feedback/June05/TeamAlignmentJune05/GMT20260605-080131_Recording_1920x974.mp4`                       | Screen-share walkthrough; cross-checked via transcript timestamps (frame extraction attempted; transcript + screenshots used where video frames unavailable) |
| Send feedback                | `Feedback/June05/SendTokens/*.png`                                                                    | Step-by-step annotations (Eric, Ducke, Kevin threads)                                                                                                        |
| Filter feedback              | `Feedback/June05/Filters/*.png`                                                                       | Filter modal, presets, wallet scope                                                                                                                          |
| CAD / Buy feedback           | `Feedback/June05/CAD&BuyStablecoins/Screenshot 2026-06-05 at 14.05.35.png`                            | hUSD-only, Buy flow                                                                                                                                          |
| Prior synthesis              | `markdown/feedback-summary-june05.md`                                                                 | Slack threads + open questions                                                                                                                               |
| Wallet state prototype       | `NewUnera/wallet-edge.html`                                                                           | Edge-case demo pills Minh added (~01:20:00)                                                                                                                  |
| Canonical UI patterns        | `NewUnera/dashboard-enhanced.html`, `NewUnera/wallet-enhanced.html`, `NewUnera/account-settings.html` | Nav, cards, tables, steppers                                                                                                                                 |


### Applicable project rules

- `/.cursor/rules/new-brand-output.mdc` — tokens, no gradients, TestFoundersGrotesk, `NewUnera/` only
- `/.cursor/rules/newunera-icons.mdc`, `newunera-dropdown.mdc`, `newunera-accessibility-wcag.mdc`
- `/.cursor/rules/table-no-scrollbar.mdc` — Activity table wrappers
- `/.cursor/rules/wallet-action-pages.mdc` — transactional flow patterns
- `/.cursor/rules/newunera-success-screen-hero.mdc` — success step hero
- `/.cursor/rules/newunera-inline-icon-lead.mdc` — fee tooltip / info rows

---

## Decision log (Eric + Minh) — with timestamps


| #   | Decision                                                                                                                        | Speakers                    | Transcript time                        |
| --- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------------------------------------- |
| 1   | Send: only on-chain external wallet; remove UNERA User + Bank Account                                                           | Eric, Minh, Son             | ~00:36:00–00:38:21                     |
| 2   | Send Step 1 = Enter address OR Select from Contacts (payee book)                                                                | Eric, Kevin (Slack), Minh   | ~00:36:42–00:41:46                     |
| 3   | Networks for send: **Ethereum + Base** only (clip picker per chain)                                                             | Minh, Eric                  | ~00:34:35–00:34:48                     |
| 4   | Amount: tokens **hUSD, USDC, USDT** — not “UNERA”; no `$` fiat conversion on amount step                                        | Eric (Slack), Minh          | ~00:42:27–00:42:47, ~01:16:57          |
| 5   | Remove transaction fee dollar amounts; Review shows **“Network fee applies”** + info tooltip only                               | Son, Ducke, Eric, Minh      | ~00:43:08–00:54:48                     |
| 6   | Tooltip copy (Son): fee is paid to **network**, not UNERA; exact amount in wallet at sign                                       | Son                         | ~00:48:02–00:48:26                     |
| 7   | Remove Send Type, Note, email chip, 2FA chip from Review                                                                        | Ducke (screenshots), Eric   | Screenshots + ~00:55:04                |
| 8   | **No in-app Sign / Approve Transaction step** — Confirm → MetaMask/WalletConnect popup → return to app                          | Ducke, Son, Eric            | ~01:07:31–01:08:06, ~00:58:28–00:59:47 |
| 9   | Keep **Processing** step after wallet signs; then Success with Status **Submitted**                                             | Son, Eric                   | ~00:59:17–00:59:47                     |
| 10  | Success: tx hash links to block explorer; **Nonce** row (Slack; already in `send-enhanced.html`)                                | Slack thread                | —                                      |
| 11  | View-only wallet connect cannot Send — gate actions (read-only vs sign-capable)                                                 | Huệ, Son                    | ~01:01:28–01:03:19                     |
| 12  | Filters: remove **Status**; remove **Bank Transfers**                                                                           | Son, Eric (Slack + meeting) | Slack screenshots                      |
| 13  | Filter type labels: **Received / Sent** (meeting); Slack also said Recipient/Sender — **use Received/Sent** per Eric in meeting | Son, Eric                   | Slack + align with meeting             |
| 14  | Presets: **FE localStorage only**, ~**1 week TTL**, max **3** presets, edit/delete, invalid-preset warning                      | Kevin, Eric (Slack)         | `14.10.08.png` thread                  |
| 15  | Activity wallet scope: **All Wallets** vs current address tabs                                                                  | Huệ, Son                    | `14.09.13.png`                         |
| 16  | Rename section **Transaction History → Activity** (broader app rename TBD)                                                      | Eric (Slack)                | `feedback-summary-june05.md`           |
| 17  | Buy Stablecoins: stay in-app; **hUSD, USDC, USDT**; no Stablecoin portal redirect                                               | Eric, Minh                  | ~01:22:00–01:23:36, CAD screenshot     |
| 18  | Buy (Black Form) ≠ Mint (Stablecoin) — **independent flows**, do not merge                                                      | Eric                        | ~01:22:46–01:23:08                     |
| 19  | Token list: **USDC, USDT, hUSD only** — no HBAR                                                                                 | Eric                        | ~01:25:09–01:25:17                     |
| 20  | Swap: only USDC↔USDT future; **not this sprint**                                                                                | Eric                        | ~01:25:41–01:25:58                     |
| 21  | Nav: merge **wallet pill + network dropdown** (too close)                                                                       | Huệ, Eric                   | ~00:30:28–00:30:56                     |
| 22  | Swap in user dropdown — **rejected** (Minh + Eric)                                                                              | ATZ DEV, Minh, Eric         | ~00:16:52–00:17:23                     |
| 23  | Unsupported network: show warning; tap opens network clip                                                                       | Eric                        | ~00:32:39–00:33:16                     |
| 24  | Mobile burger: **one notification badge outside** — not duplicated inside drawer                                                | Huệ, Minh                   | ~01:30:30–01:30:52                     |
| 25  | Mobile nav fixes scoped to `**account-settings.html`** as reference                                                             | Minh                        | ~01:29:08–01:29:52                     |
| 26  | Dollar prefix before amounts — **already fixed** (Eric confirmed)                                                               | Eric, Minh                  | ~01:16:57–01:17:02                     |
| 27  | Notification TV — **next week**                                                                                                 | Eric, Minh                  | ~00:31:15–00:31:46                     |
| 28  | Wallet edge states page added by Minh — team to review & integrate                                                              | Minh, Eric                  | ~01:20:00–01:28:10                     |


---

## Current vs target: `send-enhanced.html`

### Current structure (as of repo)

```
Prerequisites (step1) → Choose Method (step2) → Recipient (step3) → Amount (step4)
→ Confirm (step5) → Sign hidden (step6) → Processing (step7) → Success (step8)
```

Stepper shows 7 visible steps + hidden Sign. Page subtitle still says “Choose how you'd like to transfer tokens.”

### Target structure

```
[Gate] Prerequisites — KYC + wallet connected (NOT counted in main stepper)
Step 1 Recipient — Enter Address | Select from Contacts
Step 2 Amount — token + amount (hUSD/USDC/USDT)
Step 3 Confirm — review rows + irreversibility warning + network fee applies
[MetaMask / WalletConnect popup — no UNERA screen]
Step 4 Processing — broadcasting / awaiting confirmation (brief)
Step 5 Success — Submitted + explorer link + nonce
```

### Step 1 — Recipient (replaces Choose Method)

**Remove entirely:**

- Step 2 “Choose Method” content (`UNERA User`, `External Wallet`, `Bank Account` cards)
- `RECOMMENDED` badge on UNERA User
- Copy implying email notification or free UNERA-to-UNERA transfer

**New Step 1 — two cards (same card pattern as current method cards):**


| Card | Label                | Subtext                               | Selected state                                              |
| ---- | -------------------- | ------------------------------------- | ----------------------------------------------------------- |
| A    | Enter Wallet Address | Paste any Ethereum-compatible address | Address input `0x…` + network clip (**Ethereum**, **Base**) |
| B    | Select from Contacts | Send to a saved wallet address        | Searchable list: Name — `0x742d…3a8f` — Network             |


**Contacts source:** Reuse mock rows from `NewUnera/payee-management.html` or inline list. Adding a contact requires **no wallet signature** (Eric ~00:40:48 — bank payee analogy).

**Network picker:** Only Ethereum + Base per meeting (~00:34:41). Polygon/other chains out of scope for this sprint.

**Copy deck:**

- Page title: `Send Tokens`
- Page subtitle: `Send stablecoins to an external wallet address`
- Step label: `Recipient`
- Continue CTA: `Continue`
- Address placeholder: `0x…`
- Contact search placeholder: `Search contacts…`

### Step 2 — Amount

**Remove (Eric Slack `20.46.05.png`):**

```html
<!-- DELETE -->
<div class="fee-row">… TRANSACTION FEE … Free …</div>
<div class="fee-note">UNERA-to-UNERA transfers are free…</div>
```

**Also remove:**

- `≈ $0.00 USD` conversion under amount input (Ducke ~00:49:01 — mixed units mislead users)
- Token label `UNERA` → use **hUSD**, **USDC**, **USDT**
- Available balance suffix `UNERA` → match selected token

**Keep:** Available balance, quick amounts (50, 100, 250, 500, Max), token dropdown (custom dropdown per `newunera-dropdown.mdc`).

### Step 3 — Confirm (Review)

**Remove rows / chips (Ducke `20.47.08.png`):**

- SEND TYPE
- NOTE
- TRANSACTION FEE dollar value / “Free”
- Chip: `Instant transfer · Recipient notified by email · No fees`
- Chip: `2FA enabled – extra security`

**Keep:**

- RECIPIENT / DESTINATION — show **wallet address** (truncated), not `alice@example.com`
- NETWORK — show selected chain (e.g. `Base`)
- AMOUNT — `X.XX USDC` (token units)
- TOTAL — same as amount (fee not added to total)
- Warning: `Once sent, this cannot be undone. Please review carefully.`

**Add — Network fee row:**

```
NETWORK FEE    [info icon]    Applies on-chain
```

Tooltip (`aria-describedby` + keyboard accessible):

> Network (gas) fee is paid to the blockchain network, not UNERA. The exact amount will be shown in your wallet when you confirm.

Per `newunera-inline-icon-lead.mdc` for the info row.

**Primary CTA:** `Confirm` (not “Sign in Wallet” on this screen).

### Remove Sign step (critical — was missing from v1 plan)

Delete **step 6** (`#step6`, “Sign in Wallet”, `signTransaction()` intermediate UI). Flow after Confirm:

1. Disable button + show inline “Confirm in your wallet…” hint (optional, non-blocking)
2. Trigger wallet provider popup (mock: `setTimeout` 1.5s)
3. On mock resolve → `goToStep(processing)`
4. Processing → poll mock tx hash → Success

Ducke (~01:07:31): *cannot insert intermediate sign UI between app and MetaMask*.

### Processing step

Keep `#step7` processing UI. Copy:

- Title: `Processing Transaction…`
- Subtext: `Broadcasting to network…`
- Optional block confirmation progress (already in file) — OK to keep for design; Success still shows **Submitted** not **Completed**

### Success step


| Field            | Target                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------- |
| Title            | `Tokens Sent Successfully!` (file already has `Token Sent` — normalize to plural **Tokens**) |
| Status           | `Submitted` + sub-note `Awaiting blockchain confirmation`                                    |
| Transaction Hash | Truncated `0x742d…a8f0` + `↗` link to Etherscan/Basescan (mock URL by network)               |
| Nonce            | Keep row (`#successNonce`) — populate mock                                                   |
| Remove           | Note row, Send type, “recipient notified by email”                                           |


Use `newunera-success-screen-hero.mdc` for hero block.

### Prerequisites gate

Keep KYC + Connect Wallet gate **before** main stepper (existing `step1`). When both satisfied, auto-advance to Recipient. Do **not** show Prerequisites in the 4-step stepper labels.

### Read-only wallet gate

If connection is view-only (no `wallet_write` / mock flag `appState.walletCanSign === false`):

- Disable Send CTAs on Amount/Confirm
- Show inline callout: `Connect a sign-capable wallet to send tokens.`

Son/Huệ (~01:02:55–01:03:19).

---

## Feature 2 — Activity & filters (`NewUnera/wallet-enhanced.html`)

### Section rename

- `Transaction History` heading → `**Activity`**
- Subtitle can stay or become: `On-chain token movements across your wallets`
- Nav label change deferred (Eric Slack — confirm with Eric before changing top nav)

### Filter modal — target structure

```
Filter Activity [×]

Date Range
  From: [ dd/mm/yyyy ]    To: [ dd/mm/yyyy ]

Transaction Type
  ○ All Transactions
  ○ Received          ← was Money In
  ○ Sent              ← was Money Out

Category
  □ Received
  □ Donations
  □ In-Transfers
  □ Yield/Interest
  [ REMOVED: □ Bank Transfers ]

Token
  [ All Tokens ▾ ]    → only hUSD, USDC, USDT

Saved Presets
  Helper: Saved locally on this device · expires after 7 days · max 3
  [ preset chips with edit/delete ]
  [ ✓ Save Current Filters ]   → disabled when 3 presets exist

[ Clear All ]    [ Apply Filters ]
```

**Removed:** entire Status section (Completed / Pending / Failed).

**Naming resolution:** Slack thread proposed Recipient/Sender; **June 5 meeting Eric agreed Received/Sent**. Implement **Received / Sent** unless Eric reopens in Slack.

### Saved Presets — behavioral contract (FE mock)


| Rule           | Implementation                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------- |
| Storage        | `localStorage` key `unera_activity_filter_presets_v1`                                           |
| Max count      | 3 — on 4th save, show toast: `You can save up to 3 presets. Delete one to continue.`            |
| TTL            | 7 days from `savedAt` — auto-hide expired; show `This preset expired` if user clicks stale chip |
| Invalid schema | Chip shows warning icon + `Preset outdated — delete and save again`                             |
| Edit/delete    | `×` delete per chip; long-press or edit icon to rename (design only)                            |


Eric initially wanted BE sync (Slack); Kevin/Eric final: **FE cache only**.

### Wallet scope tabs

Above Activity table (per `14.09.13.png`):

```
[ All Wallets ]  [ 0x742d…3a8f ▾ ]   ← active wallet truncated
```

- Default: current connected wallet tab selected
- All Wallets: mock combined feed (design stub — annotate “BE: pass addresses from GET /v1/users/me/wallets”)
- Preselect active wallet on load

### Table rules

Apply `table-no-scrollbar.mdc` on `.activity-table-wrap` / `.history-table-wrap`.

---

## Feature 3 — Dashboard & wallet token surfaces

### Buy Stablecoins quick action (`dashboard-enhanced.html`)

**Before (CAD screenshot):**

```
Buy Stablecoins
Buy with INTERAC, card, or crypto
→ external Stablecoin portal (broken)
```

**After:**

```
Buy Stablecoins
Buy hUSD, USDC or USDT
→ add-money.html?intent=buy (or in-app token picker modal)
```

Eric (~01:22:05): Buy on wallet platform stays in-app; **does not jump to Stablecoin portal**.

### UNERA CAD banner (dashboard)

Screenshot shows bottom **UNERA CAD** hub with Get/Redeem. Given Eric “No CAD, only hUSD”:


- **Option B — CHOSEN (Minh):** Remove the entire banner. Delete the `.unera-cad-hub-card` block (~lines 2873–2891 in `dashboard-enhanced.html`). Do not rebrand — wait for Token Management spec before re-introducing any Get/Redeem CTA.


### Token list cleanup

`**wallet-enhanced.html` + `dashboard-enhanced.html` portfolio rows:**


| Keep                                    | Remove                                    |
| --------------------------------------- | ----------------------------------------- |
| hUSD (UNERA CAD label → **hUSD** in UI) | HBAR                                      |
| USDC                                    | CTC, ETH display tokens, other demo coins |
| USDT                                    |                                           |


Per-token actions (Send, Stake, View transactions) — **hold** until Token Management spec (~00:18:44).

### Exchange / Swap

Eric (~01:25:41): swap only **USDC ↔ USDT** in future; no HBAR. **Do not build exchange UI this sprint.** Remove HBAR from any exchange preview if present.

---

## Feature 4 — Nav & chrome (`account-settings.html` first — other pages deferred)

> **Scope:** All nav/chrome fixes this sprint land in `OldUnera/account-settings.html` only. Other pages (wallet, dashboard, send) use this as the canonical nav specimen; do not block the sprint on updating them.

### Merge wallet + network controls (~00:30:28)

**Problem:** Wallet address pill and network badge sit too close to profile dropdown.

**Target:** Single combined trigger (Eric: "gom hai cái dropdown lại thành một"):

```
[ 0x742d…3a8f · Base ▾ ]
```

Dropdown sections:

1. Connected wallet (copy address, disconnect)
2. Network list (Ethereum, Base) + switch
3. If unsupported chain → unsupported network state (see below)

**Rejected:** Moving Swap into user avatar dropdown (~00:17:00).

### Unsupported network state (~00:32:39)

When `wallet.chainId` not in allowlist `{1, 8453}` (mock):

- Replace network label with: `Unsupported network`
- Amber warning style (use `--warning` token)
- Click opens same dropdown to switch network

### CONNECT vs WALLET nav toggle (~00:16:08)

When disconnected, nav shows **Connect** entry; when connected, **Wallet** pill. States must not collapse into one ambiguous control (Eric + Huệ concern). Add a comment in the nav markup documenting both states.

### Mobile notification bell (~01:30:30)

- Badge count on **bell icon in header only**
- Burger drawer: **no second bell**, no duplicate badge row
- If a notifications link is needed in the drawer, use plain text `Notifications` — no icon, no badge

### Mobile burger & drawer QA checklist (Minh ~01:29:08)

- Burger opens full-height drawer without layout jump
- Focus trap active; Escape closes drawer
- No duplicate notification bell
- Hamburger + close button touch targets ≥ 44 × 44 px
- `font-size: 1rem` on inputs (prevent iOS zoom)

### Landing / marketing nav (~00:27:10) — note for Renol

Marketing pages: **no** Dashboard, Wallet, Centres app nav. Login CTA only. **Out of Minh's Stablecoin HTML scope** — log as dependency on Renol frontend.

---

## Feature 7 — Contacts / payees (`payee-management.html`)

Kevin/Slack: address book with name + description; no signature to add.

**Send flow integration:**

- “Select from Contacts” opens inline panel or links to `payee-management.html` with `?return=send-enhanced.html`
- Mock 3–5 payees with `name`, `address`, `network`, optional `note`
- “Save address” checkbox on Enter Address path → append to mock localStorage list

---

## Files in scope


| File                               | Action                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------- |
| `NewUnera/send-enhanced.html`      | Major flow rebuild (steps, stepper, sign removal, copy)                   |
| `NewUnera/wallet-enhanced.html`    | Filters, Activity rename, wallet scope, token list, edge states           |
| `NewUnera/dashboard-enhanced.html` | Buy action, CAD banner, token preview                                     |
| `NewUnera/payee-management.html`   | Align payee rows with Send contact picker (mock data)                     |
| `NewUnera/account-settings.html`   | Mobile nav fixes                                                          |
| `NewUnera/wallet-edge.html`        | Reference only — do not delete; keep as state specimen                    |
| `NewUnera/add-money.html`          | Buy flow destination (sub-label/token preselect if linked from dashboard) |


### Do NOT edit

- `NewUnera/brand-style-guide.html`
- `consumer-app-nav.js`, backend, Swagger implementations
- Root-level legacy `wallet-enhanced.html` (non-NewUnera)
- Marketing/landing pages (Renol scope)

---

## Script / logic notes (`send-enhanced.html`)

Preserve existing IDs where possible for minimal diff:


| ID / function             | Change                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-step` labels        | Renumber: Recipient=2, Amount=3, Confirm=4, Processing=5, Success=6 (or keep DOM ids, update labels only — prefer updating `goToStep` map in one place) |
| `#step6` Sign             | **Delete** step content + stepper node                                                                                                                  |
| `signTransaction()`       | Remove UI step; call wallet mock directly from Confirm handler                                                                                          |
| `updateReview()`          | Strip removed rows; set network fee row                                                                                                                 |
| `goToStep(5)` Confirm     | → trigger wallet → processing → success                                                                                                                 |
| `appState.selectedMethod` | Remove; always `external`                                                                                                                               |
| `appState.recipientMode`  | `'address'                                                                                                                                              |


Accessibility: focus moves to step heading on step change; `aria-live="polite"` on processing status.

---

## Styling contract

- Tokens only (`--brand-deep-blue`, `--brand-yellow`, `--fin-up`, etc.)
- No new `linear-gradient` on product HTML
- Cards: `border-radius: 1.25rem`, `border: 1px solid var(--border-subtle)`
- Focus: `outline: 2px solid var(--brand-deep-blue); outline-offset: 2px`
- Breakpoints: 768px, 480px — match `dashboard-enhanced.html`
- Skip link `#main-content` preserved

---

## Sprint sequencing (from meeting close ~01:31:36)


| When             | Work                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| **This week**    | Send token set, filter set, Buy/token list, nav merge, mobile bell, wallet states, account-settings mobile |
| **Next week**    | Notification TV (Eric spec), Token Management actions (Eric spec), Swap UI                                 |
| **Already done** | Dollar `$` prefix removal (Eric confirmed ~01:16:57) — verify only                                         |


Eric (~01:31:57): Kevin to help Send Token set; filter set Minh owns.

---

## Verification checklist

### Send (`send-enhanced.html`)

- No UNERA User / Bank Account anywhere
- Step 1 = Enter Address + Select from Contacts
- Amount: hUSD/USDC/USDT only; no fee row; no USD conversion
- Review: no Send Type, Note, fee $, email chip, 2FA chip; has Network fee applies + tooltip
- No in-app Sign step; Confirm opens wallet mock
- Processing shows between wallet sign and success
- Success: Tokens Sent Successfully!, Status Submitted, explorer link, Nonce
- Stepper: 4 steps (+ Prerequisites gate)
- View-only wallet cannot proceed

### Activity / filters (`wallet-enhanced.html`)

- Section titled Activity
- No Status filter; no Bank Transfers
- Received / Sent labels
- Presets: local only, max 3, 7-day copy, invalid state
- All Wallets / current wallet tabs
- Token filter: hUSD, USDC, USDT only

### Dashboard

- Buy sub-label: Buy hUSD, USDC or USDT
- No portal redirect
- UNERA CAD banner rebranded or removed
- Token list: no HBAR

### Nav

- Wallet + network merged dropdown
- Unsupported network warning
- Mobile: single notification badge

### Wallet states

- Disconnected, empty, wrong network, error states render

### General

- 768px + 480px QA
- WCAG: skip link, focus, reduced motion
- No V1 colors (`#10B981`, etc.)

---

## Anti-patterns (do not ship)

- In-app “Sign in Wallet” or “Approve Transaction” screen before MetaMask
- Showing gas fee in USD on Amount or Confirm (mismatch with MetaMask)
- Mixing Buy and Mint into one flow or portal redirect
- BE-synced filter presets in this sprint
- Bank Transfers or Status filters on Web3 Activity
- HBAR or non-stablecoin tokens in wallet/dashboard lists
- Duplicate notification bell in mobile drawer
- Dashboard/Wallet nav on marketing landing pages
- CSS gradients on product HTML (except brand guide)

---

## Open items for Eric / Minh (before build if needed)

1. **Activity nav label** — rename in top nav or section only? ==> dont touch this now
2. **UNERA CAD banner** — rebrand to hUSD vs remove entirely? remove for me.
3. **Prerequisites step** — keep as gate or fold into wallet-connected check only? ==> dont change this step, keep it as it it ok
4. **Recipient/Sender vs Received/Sent** — confirm Received/Sent is final (meeting) over Slack Recipient/Sender ==> recommend best option for me.
5. **Processing duration** — show block progress on Processing or jump straight to Success after mock sign? show block progress first please

---

## Video analysis note

Meeting video duration: **~99 min** (`kMDItemDurationSeconds = 5948`). Screen shares were aligned to transcript timestamps cited above. Feedback PNGs in `Feedback/June05/` match the screens walked through in the call (Send flow ~00:36–00:58, Filters via Slack screens, Dashboard CAD ~01:22, Wallet states ~01:20, Nav ~00:30–00:33, Mobile ~01:29–01:31).