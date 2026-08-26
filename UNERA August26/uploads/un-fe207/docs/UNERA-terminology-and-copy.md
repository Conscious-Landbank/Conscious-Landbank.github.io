# Huma — Terminology, Copy & Currency Notes (cross-product)

## 0. FE-207 rename table (22 Aug 2026 — apply everywhere) [Rename]

The consumer app is **Huma**. "Unera" survives only as the stablecoin / issuer layer.

| Old | New | Notes |
|---|---|---|
| UNERA / Unera (the consumer "crypto neo-bank" app) | **Huma** | wordmark, nav logo, `<title>`s, aria-labels, alt text, body copy, emails |
| Unera Platform / UNERA Platform / UNERA platform | **Huma Platform** | short form "Huma" |
| Stablecoin / Stablecoin Portal / UNERA Stablecoin | **Unera Stablecoin** / **Unera Stablecoin Portal** | issuer layer — the token stays **hUSD** |
| UNERA CAD · UNERA US Dollar | **Unera CAD** · **Unera US Dollar** | token names belong to the stablecoin layer |
| Humanity Centres / Humanity Centre / Human Centres / Huma Centres | **Humanity Centers / Humanity Center** | US spelling everywhere |
| Centres / CENTRES (nav) | **Centers / CENTERS** | US spelling |
| UYT | **Huma Points** | the old token is gone; points are non-transferable |
| `assets/logos/unera-*.svg` · `unera-pages/NewLogo/Unera *.svg` | `assets/logos/huma-*.svg` · `unera-pages/NewLogo/Huma *.svg` | same viewBox `0 0 361.1 113.22`, same nav height 24px |

**Not renamed on purpose**

- **File names** — `explore-centres.html`, `centre-detail.html`, `unera-pages/`, `docs/UNERA-*.md` keep their names so no link breaks. Only visible text changed.
- **Code identifiers** — CSS classes (`.centre-pick`, `.unera-checkmark`, `.uyt-pill`), JS symbols (`UNERA_DON`, `UNERA_NOTIFICATION_CATALOG`, `getCentre`), localStorage keys (`unera_paymentMethods_v1`) and support e-mail domains (`support@unera.org`) are untouched. Renaming them is a separate, mechanical FE ticket — see `CHANGES-FE-207.md`.
- **`unera-pages/brand-style-guide.html`** — it *is* the Unera brand book ("Unera Stablecoin"), so it keeps the Unera lockup and title.

**Open naming conflict:** the app already ships a governance token literally called **HUMA** (`wallet-edge.html`, `governance.html`, `instructions.html`, the KYC dashboards). "HUMA the token" now collides with "Huma the platform". Copy has been de-circularised ("the HUMA governance token, issued by an independent governance entity") but **the token needs a decision from product** — rename it, or always qualify it. Flagged, not silently resolved.

## 1. The three layers of the ecosystem

| Layer | Entity | Issues | Vocabulary |
|---|---|---|---|
| **Unera Stablecoin** | licensed issuer | hUSD — issuance / redemption, reserve, PoR, its own KYC | Mint · Burn · Issuance · Redemption (issuer UI only) |
| **Huma Platform** | Huma AG, Switzerland | wallet, exchange, DeFi, remittance, donations, cards; earns **Huma Points** | Buy · Sell · Send · Swap · Trade · Donate |
| **Humanity Centers** | Swiss Association | **Impact Points**, real-world venues | Donate · Impact · Center |

Never conflate the layers. **Huma Points** are earned by activity — Trading 0.5×, holding hUSD 1×, Round-up 1×, Direct donation 1.5×, Yield-to-Donate 2×, Hedge-to-Donate 2.5×, Recurring giving 3× — and spend against platform fees (up to 60% off). **Impact Points** are issued by the Association and redeemed at Humanity Centers (tiers Seedling / Steward / Champion / Patron). Donation minimum is **$1 in hUSD**, with an instant digital receipt tied to the on-chain tx id.

---

Source of truth: Confluence **Token Management** (62259420), **Stablecoin Portal PRD** (61276166), FE-126/FE-127, and the 20 Jun review. Apply these to every consumer-facing surface in `unera-pages/`. **Take this as the canonical copy contract.**

---

## 1. The two layers — never blur them in UI copy

| Layer | Product | Owns | Vocabulary it uses |
|---|---|---|---|
| **Stablecoin Layer** | **Unera Stablecoin Portal** (issuer, licensed) | hUSD **issuance / redemption**, reserves, KYC/AML | **Mint · Burn · Issuance · Redemption** — issuer-internal only, in the Portal's *own* UI |
| **Platform Layer** | **Huma Platform** (the consumer app = `unera-pages/`) | Buy, Send, Swap, Trade, payments, Activity | **Buy · Sell · Send · Swap · Trade · Purchase** |

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

**Banned in consumer UI:** Mint, Burn, Issue, Issuance, Redeem, Redemption, Stake (removed per FE-126), "Add Money", "Unera CAD", "Exchange" (as the swap verb).

---

## 3. Coins / tokens

| Token | What | Use |
|---|---|---|
| **hUSD** | Huma's **USD-pegged, fiat-backed** stablecoin (the primary). Peg = USD (hCAD/hEUR are *future*, not launch). | Default buy/hold asset |
| **USDC** | USD Coin (Circle). Accepted crypto stablecoin. | Hold / Swap / Trade / Send |
| **USDT** | Tether USD. Accepted crypto stablecoin. | Hold / Swap / Trade / Send |
| **ETH** | Native gas token (Ethereum / Base). | Gas only — "held for network fees", excluded from stablecoin distribution |

- Launch stablecoin set on the wallet = **hUSD, USDC, USDT** (+ ETH gas). **No CAD hub / no "Unera CAD".**
- Symbol casing exactly: `hUSD`, `USDC`, `USDT`, `ETH`.

---

## 4. Fiat currencies

- ISO-4217 codes. In play: **VND, CAD, USD** (Buy demo region = Vietnam/VND; peg currencies USD/CAD).
- Format examples from spec: `1,000,000 VND` · `₫1,315,620` · `$2,500.00`.
- Dollar amounts: `$` prefix, 2 dp, thousands separators (`$5,050.00`). hUSD ≈ 1 USD.

---

## 5. Fees & gas

- **Platform Fee = 0% at launch** (configurable later). Always show the "0%" explicitly.
- **Gas (Phase 1):** user pays via wallet; **show estimate in native token + fiat** (e.g. `~0.00045 ETH · ~$1.30`); **Huma adds no markup**.
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
- "Humanity Centers" / "CENTERS" — first-class IA, British spelling "Centers".
- "On-chain" vs "Off-chain" rail badges on Activity rows.
- Wallet states: Not Connected · Unverified · Verified · Disconnected.
- Supported wallets: **MetaMask, WalletConnect, Coinbase Wallet**.
- Networks: Ethereum, Base (L2), Sepolia (Testnet).
