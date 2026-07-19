# FE-126 / FE-127 — Token Management UI/UX Audit & Change Log

Sources: Confluence **UNERA – Token Management** (62259420), **Transaction History** (68583557), Jira **FE-126** + **FE-127**, and the **20 Jun huddle recording** (transcript `uploads/Archive/…-transcript.md` + 69 frames).

> The video is a **reference walkthrough**: Eric screen-shares the Confluence spec and the reference apps for each flow — **MetaMask** (Send / Buy via MoonPay·Mercuryo·Banxa), **Uniswap** (Swap), **Binance + Coinbase** (Trade order book) — then the **Activity filter taxonomy** in `#collab-engineers`. It reinforces the PRD; the concrete *new* asks live in the FE-126/FE-127 comments + the Slack filter taxonomy.

---

## ✅ Shipped — full A→E pass (all verified live via DOM, 0 console errors)

- **A · Trade** (`trade.html`) — real Binance-style **order book**: Buy/Sell side toggle, live bids/asks with depth bars + **click-to-fill**, recent trades, **open orders** (with cancel), wired into the existing confirm/terminal. *(You asked to park deeper Trade polish — it's functional and parked.)*
- **B · Swap** (`exchange.html`) — already meets §5.3: "**2 wallet confirmations — approve, then swap**", Approve/Swap gas rows, sequenced ①Approve→②Swap processing overlay, approval-rejected edge. Confirmed, no change needed.
- **D · Activity sub-transactions** (`wallet-enhanced.html`) — transaction-detail modal now shows a **Sub-transactions** group: Buy hUSD → *Send Fiat → Receive hUSD*; Swap → *Approve → Swap*; Trade → *Authorize → Trade*; plain transfers show none.
- **E · Wallet-scope dropdown** (`wallet-enhanced.html`) — chips → scalable **dropdown** (fixes hue.dinh's >4–5 wallet overflow / mobile break).
- **Send** (`send-enhanced.html`) — filled the one §5.2 gap: **NETWORK FEE now shows estimated gas (native + fiat)** per network (e.g. `~0.00045 ETH · ~$1.30`, testnet `$0.00`) and folds it into Total Deduction. (1-prompt copy + callout were already present.)
- **Copy rule** — removed `mint`/`burn` from the Activity **Action** filter (Token Mgmt §1.4 violation).
- **Glossary** — `docs/UNERA-terminology-and-copy.md`: the cross-product copy/coin/currency contract (Mint/Burn = Stablecoin *Portal* only; consumer = Buy/Send/Swap/Trade; coins hUSD·USDC·USDT; no CAD hub; fees 0%; gas native+fiat).

### ⚠️ C · Buy — needs your decision (didn't silently pick — PRD conflict)
`add-money.html` already has the CEX-style OTC preview + "No wallet signature needed". Two open calls:
1. **Receive asset scope.** The receive list currently offers hCAD/hUSD/hEUR/hGBP/hAUD/hJPY/hCHF/hNZD. Per the Stablecoin PRD the fiat OTC flow **delivers hUSD only** at launch (USDC/USDT are crypto *inputs*, not OTC outputs; hCAD/hEUR are future). → **Should Buy deliver hUSD only, or hUSD + USDC + USDT?**
2. **Provider quotes.** The video's MetaMask refs show MoonPay/Mercuryo/Banxa because MetaMask aggregates third-party on-ramps. **UNERA is its own OTC provider (delivers from inventory)** — so third-party provider-quote UI would contradict §5.1. → **Confirm we keep the single-provider OTC preview (recommended) and drop the MoonPay/Banxa idea.**

Tell me 1 + 2 and I'll finish Buy in one pass.

---

## ✅ Earlier cycle

### 1. Action vocabulary unified → **Buy · Send · Swap · Trade** (FE-126 §10965, §11134)
Nav (desktop + mobile, all pages), wallet-hub quick-actions, per-token rows, and the Buy/Swap page titles. Removed Stake/Redeem; Issue→Buy, Exchange→Swap; added Trade everywhere; fixed a dead primary-CTA link.

### 2. Activity filters reworked (FE-127 §10923 + hue.dinh §10966)
On `wallet-enhanced.html` — verified live via DOM, no JS errors:
- **Removed redundant Direction + Category** sections (overlapped Transaction Type) → filter set is now **Transaction Type + Action** only.
- **"Counterparties" → "Sender / Recipient"** (familiar wording).
- **"Method / Action" → "Action"**.
- **Saved Presets** → Eric's model: a **"Save this filter as a preset"** checkbox that reveals a name field; **Apply runs the filter *and* saves it**.
- **Export Results** no longer hidden behind Filters — always visible in the toolbar.

---

## ◻️ Remaining backlog (prioritized — needs go-ahead)

These are larger; each warrants a focused pass. Recommended order:

### A. Trade → real order-book screen (PRD §5.4 · Binance ref) — **biggest gap**
Today `trade.html` is a swap-style *stepper*. Eric's Binance reference wants a true **order-book screen**: trading-pair header, live **bids/asks book**, **recent trades**, **open orders**, Buy/Sell side toggle, Price/Amount/Total grid, Trade From wallet. (Architecture note from the call: order signed **off-chain**, settlement **on-chain** via escrow — BE/PM follow-up, not FE.)

### B. Swap → explicit 2-prompt sequence (PRD §5.3 · Uniswap ref)
Confirm step must state **"Up to 2 wallet confirmations — approve, then swap"**, show **gas: Approve / Swap / Total**, and sequence ① Approve → ② Swap in the processing overlay. Collapse to 1 prompt when allowance is sufficient.

### C. Buy → CEX-style provider-quote (PRD §5.1 · MetaMask/Coinbase ref)
`add-money.html` is retitled **Buy** + OTC mechanics exist. Align fields to **Pay With / Receive / Payment Method / Receive To**, bidirectional amount entry, and a **provider-quote** row (MoonPay/Mercuryo/Banxa-style "best rate") on the preview. Copy stays **Purchase/Sell** (no mint/burn).

### D. Activity → grouped sub-transactions (FE-127 §10923 item 1)
Expandable rows: parent **"Buy hUSD"** → детали **Send Fiat → Receive hUSD**. Needs a detail/expand pattern in the Activity list.

### E. Wallet-scope filter scaling (hue.dinh §10966)
Wallet chips overflow past ~4–5 addresses / break on mobile → convert the wallet-scope tabs to a **dropdown/select**.

---

## Reference map (from the video)
| Flow | Reference Eric demoed | UNERA page |
|---|---|---|
| Buy hUSD via Fiat | MetaMask Buy (MoonPay/Mercuryo/Banxa), Coinbase Buy | `add-money.html` |
| Send | MetaMask Send | `send-enhanced.html` |
| Swap | Uniswap | `exchange.html` |
| Trade | Binance Spot / Coinbase Trade | `trade.html` |
| Activity filters | `#collab-engineers` taxonomy (Approval·Transfer·Receive·Deposit·Pool Exchange·Rewards) | `wallet-enhanced.html` |

**Decision for you:** confirm the order for A–E (default: A → B → C → D → E), and whether to tackle them one focused pass at a time.
