# UNERA — Terminology, Copy & Currency Notes (cross-product)

Source of truth: Confluence **Token Management** (62259420), **Stablecoin Portal PRD** (61276166), FE-126/FE-127, and the 20 Jun review. Apply these to every consumer-facing surface in `unera-pages/`. **Take this as the canonical copy contract.**

---

## 1. The two layers — never blur them in UI copy

| Layer | Product | Owns | Vocabulary it uses |
|---|---|---|---|
| **Stablecoin Layer** | **UNERA Stablecoin Portal** (issuer, licensed) | hUSD **issuance / redemption**, reserves, KYC/AML | **Mint · Burn · Issuance · Redemption** — issuer-internal only, in the Portal's *own* UI |
| **Platform Layer** | **UNERA Platform** (the consumer app = `unera-pages/`) | Buy, Send, Swap, Trade, payments, Activity | **Buy · Sell · Send · Swap · Trade · Purchase** |

➡️ **The wallet/Token-Management screens are Platform Layer.** Mint/Burn/Issuance/Redemption must **never** appear in them (Token Mgmt §1.4). They were still present as `mint`/`burn` checkboxes in the Activity filter — that's a copy violation to remove.

---

## 2. Approved verbs (consumer UI)

- **Buy** — acquire hUSD with fiat (CEX-style OTC). Replaces old "Issue / Add Money / Buy Stablecoins / Add Tokens".
- **Sell** — dispose to fiat (where offered).
- **Send** — ERC-20 transfer to another wallet. (Page may title "Send Tokens"; action label is "Send".)
- **Swap** — DeFi AMM token-for-token (Uniswap model). Replaces "Exchange".
- **Trade** — mini-CEX order book (Binance model). New.
- **Receive · Approval · Deposit · Rewards** — Activity/filter taxonomy labels.
- **Purchase** is acceptable as a synonym for Buy in body copy.

**Banned in consumer UI:** Mint, Burn, Issue, Issuance, Redeem, Redemption, Stake (removed per FE-126), "Add Money", "UNERA CAD", "Exchange" (as the swap verb).

---

## 3. Coins / tokens

| Token | What | Use |
|---|---|---|
| **hUSD** | UNERA's **USD-pegged, fiat-backed** stablecoin (the primary). Peg = USD (hCAD/hEUR are *future*, not launch). | Default buy/hold asset |
| **USDC** | USD Coin (Circle). Accepted crypto stablecoin. | Hold / Swap / Trade / Send |
| **USDT** | Tether USD. Accepted crypto stablecoin. | Hold / Swap / Trade / Send |
| **ETH** | Native gas token (Ethereum / Base). | Gas only — "held for network fees", excluded from stablecoin distribution |

- Launch stablecoin set on the wallet = **hUSD, USDC, USDT** (+ ETH gas). **No CAD hub / no "UNERA CAD".**
- Symbol casing exactly: `hUSD`, `USDC`, `USDT`, `ETH`.

---

## 4. Fiat currencies

- ISO-4217 codes. In play: **VND, CAD, USD** (Buy demo region = Vietnam/VND; peg currencies USD/CAD).
- Format examples from spec: `1,000,000 VND` · `₫1,315,620` · `$2,500.00`.
- Dollar amounts: `$` prefix, 2 dp, thousands separators (`$5,050.00`). hUSD ≈ 1 USD.

---

## 5. Fees & gas

- **Platform Fee = 0% at launch** (configurable later). Always show the "0%" explicitly.
- **Gas (Phase 1):** user pays via wallet; **show estimate in native token + fiat** (e.g. `~0.00045 ETH · ~$1.30`); **UNERA adds no markup**.
- **Phase 2 (EIP-3009 / gasless):** out of scope — never shown in Phase-1 UI.

## 6. Wallet-prompt counts (state explicitly on confirm)
- **Buy (fiat OTC):** 0 prompts at buy time (linked wallet = "Receive To").
- **Send:** 1 prompt (transfer). "You'll confirm once… no approval step."
- **Swap:** up to 2 (approve → swap) — collapses to 1 if allowance sufficient.
- **Trade:** TBD by implementation — only if fund authorization/locking needed; **no deposit/withdraw** language.

## 7. Status labels (Activity / Transaction History)
User-facing: **Pending · Processing · Completed · Failed** (issuer-internal states are not surfaced). Toolbar chips: **Successful · All · Pending · Failed**.

## 8. Activity filter taxonomy (Thanh Son Le, Slack)
Approval · Transfer (outbound, user=from) · Receive (inbound, user=to) · Deposit (bank fiat + OTC) · Exchange (bundled pool tx, e.g. approve+swap same hash) · Rewards. Keep filter sections to **Transaction Type + Action** only (Eric, FE-127) — drop mint/burn function names.

## 9. Other naming
- "Humanity Centres" / "CENTRES" — first-class IA, British spelling "Centres".
- "On-chain" vs "Off-chain" rail badges on Activity rows.
- Wallet states: Not Connected · Unverified · Verified · Disconnected.
- Supported wallets: **MetaMask, WalletConnect, Coinbase Wallet**.
- Networks: Ethereum, Base (L2), Sepolia (Testnet).
