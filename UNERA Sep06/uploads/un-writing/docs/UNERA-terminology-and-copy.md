# Huma terminology, copy and currency: cross-product notes

## 0. FE-207 rename table (22 Aug 2026, apply everywhere) [Rename]

The consumer app is **Huma**. "Unera" survives only as the stablecoin / issuer layer.

| Old | New | Notes |
|---|---|---|
| UNERA / Unera (the consumer "crypto neo-bank" app) | **Huma** | wordmark, nav logo, `<title>`s, aria-labels, alt text, body copy, emails |
| Unera Platform / UNERA Platform / UNERA platform | **Huma Platform** | short form "Huma" |
| Stablecoin / Stablecoin Portal / UNERA Stablecoin | **Unera Stablecoin** / **Unera Stablecoin Portal** | issuer layer: the token stays **hUSD** |
| UNERA CAD · UNERA US Dollar | **Unera CAD** · **Unera US Dollar** | token names belong to the stablecoin layer |
| Humanity Centres / Humanity Centre / Human Centres / Huma Centres | **Humanity Centers / Humanity Center** | US spelling everywhere |
| Centres / CENTRES (nav) | **Centers / CENTERS** | US spelling |
| UYT | **Huma Points** | the old token is gone; points are non-transferable |
| `assets/logos/unera-*.svg` · `unera-pages/NewLogo/Unera *.svg` | `assets/logos/huma-*.svg` · `unera-pages/NewLogo/Huma *.svg` | same viewBox `0 0 361.1 113.22`, same nav height 24px |

**Not renamed on purpose**

- File names: `explore-centres.html`, `centre-detail.html`, `unera-pages/`, `docs/UNERA-*.md` keep their names so no link breaks. Only visible text changed.
- Code identifiers: CSS classes (`.centre-pick`, `.unera-checkmark`, `.uyt-pill`), JS symbols (`UNERA_DON`, `UNERA_NOTIFICATION_CATALOG`, `getCentre`), localStorage keys (`unera_paymentMethods_v1`) and support e-mail domains (`support@unera.org`) are untouched. Renaming them is a separate, mechanical FE ticket, see `CHANGES-FE-207.md`.
- `unera-pages/brand-style-guide.html`: it *is* the Unera brand book ("Unera Stablecoin"), so it keeps the Unera lockup and title.

**Open naming conflict:** the app already ships a governance token literally called **HUMA** (`wallet-edge.html`, `governance.html`, `instructions.html`, the KYC dashboards). "HUMA the token" now collides with "Huma the platform". Copy has been de-circularised ("the HUMA governance token, issued by an independent governance entity") but **the token needs a decision from product**, rename it, or always qualify it. Flagged, not silently resolved.

## 1. The three layers of the ecosystem

| Layer | Entity | Issues | Vocabulary |
|---|---|---|---|
| **Unera Stablecoin** | licensed issuer | hUSD: issuance / redemption, reserve, PoR, its own KYC | Mint · Burn · Issuance · Redemption (issuer UI only) |
| **Huma Platform** | Huma AG, Switzerland | wallet, exchange, DeFi, remittance, donations, cards; earns **Huma Points** | Buy · Sell · Send · Swap · Trade · Donate |
| **Humanity Centers** | Swiss Association | **Impact Points**, real-world venues | Donate · Impact · Center |

Never conflate the layers. **Huma Points** are earned by activity. Trading 0.5×, holding hUSD 1×, Round-up 1×, Direct donation 1.5×, Yield-to-Donate 2×, Hedge-to-Donate 2.5×, Recurring giving 3×, and spend against platform fees (up to 60% off). **Impact Points** are issued by the Association and redeemed at Humanity Centers (tiers Seedling / Steward / Champion / Patron). Donation minimum is **$1 in hUSD**, with an instant digital receipt tied to the on-chain tx id.

Source of truth: Confluence **Token Management** (62259420), **Stablecoin Portal PRD** (61276166), FE-126/FE-127, and the 20 Jun review. Apply these to every consumer-facing surface in `unera-pages/`. **Take this as the canonical copy contract.**

## 1. The two layers, never blur them in UI copy

| Layer | Product | Owns | Vocabulary it uses |
|---|---|---|---|
| **Stablecoin Layer** | **Unera Stablecoin Portal** (issuer, licensed) | hUSD **issuance / redemption**, reserves, KYC/AML | **Mint · Burn · Issuance · Redemption**: issuer-internal only, in the Portal's *own* UI |
| **Platform Layer** | **Huma Platform** (the consumer app = `unera-pages/`) | Buy, Send, Swap, Trade, payments, Activity | **Buy · Sell · Send · Swap · Trade · Purchase** |

**The wallet and Token-Management screens are Platform Layer.** Mint/Burn/Issuance/Redemption must **never** appear in them (Token Mgmt §1.4). They were still present as `mint`/`burn` checkboxes in the Activity filter, that's a copy violation to remove.

## 2. Approved verbs (consumer UI)

- Buy: acquire hUSD with fiat (CEX-style OTC). Replaces old "Issue / Add Money / Buy Stablecoins / Add Tokens".
- Sell: dispose to fiat (where offered).
- Send: ERC-20 transfer to another wallet. (Page may title "Send Tokens"; action label is "Send".)
- Swap: DeFi AMM token-for-token (Uniswap model). Replaces "Exchange".
- Trade: mini-CEX order book (Binance model). New.
- Receive · Approval · Deposit · Rewards: Activity/filter taxonomy labels.
- Purchase is acceptable as a synonym for Buy in body copy.

**Banned in consumer UI:** Mint, Burn, Issue, Issuance, Redeem, Redemption, Stake (removed per FE-126), "Add Money", "Unera CAD", "Exchange" (as the swap verb).

## 3. Coins / tokens

| Token | What | Use |
|---|---|---|
| **hUSD** | Huma's **USD-pegged, fiat-backed** stablecoin (the primary). Peg = USD (hCAD/hEUR are *future*, not launch). | Default buy/hold asset |
| **USDC** | USD Coin (Circle). Accepted crypto stablecoin. | Hold / Swap / Trade / Send |
| **USDT** | Tether USD. Accepted crypto stablecoin. | Hold / Swap / Trade / Send |
| **ETH** | Native gas token (Ethereum / Base). | Gas only: "held for network fees", excluded from stablecoin distribution |

- Launch stablecoin set on the wallet = **hUSD, USDC, USDT** (+ ETH gas). **No CAD hub / no "Unera CAD".**
- Symbol casing exactly: `hUSD`, `USDC`, `USDT`, `ETH`.

## 4. Fiat currencies

- ISO-4217 codes. In play: **VND, CAD, USD** (Buy demo region = Vietnam/VND; peg currencies USD/CAD).
- Format examples from spec: `1,000,000 VND` · `₫1,315,620` · `$2,500.00`.
- Dollar amounts: `$` prefix, 2 dp, thousands separators (`$5,050.00`). hUSD ≈ 1 USD.

## 5. Fees & gas

- Platform Fee = 0% at launch (configurable later). Always show the "0%" explicitly.
- Gas (Phase 1): user pays via wallet; **show estimate in native token + fiat** (e.g. `~0.00045 ETH · ~$1.30`); **Huma adds no markup**.
- Phase 2 (EIP-3009 / gasless): out of scope, never shown in Phase-1 UI.

## 6. Wallet-prompt counts (state explicitly on confirm)
- Buy (fiat OTC): 0 prompts at buy time (linked wallet = "Receive To").
- Send: 1 prompt (transfer). "You'll confirm once… no approval step."
- Swap: up to 2 (approve -> swap); collapses to 1 if the allowance is sufficient.
- Trade: TBD by implementation, only if fund authorization or locking is needed; **no deposit/withdraw** language.

## 7. Status labels (Activity / Transaction History)
User-facing: **Pending · Processing · Completed · Failed** (issuer-internal states are not surfaced). Toolbar chips: **Successful · All · Pending · Failed**.

## 8. Activity filter taxonomy (Thanh Son Le, Slack)
Approval · Transfer (outbound, user=from) · Receive (inbound, user=to) · Deposit (bank fiat + OTC) · Exchange (bundled pool tx, e.g. approve+swap same hash) · Rewards. Keep filter sections to **Transaction Type + Action** only (Eric, FE-127), drop mint/burn function names.

## 9. Other naming
- "Humanity Centers" / "CENTERS": first-class IA, British spelling "Centers".
- "On-chain" vs "Off-chain" rail badges on Activity rows.
- Wallet states: Not Connected · Unverified · Verified · Disconnected.
- Supported wallets: **MetaMask, WalletConnect, Coinbase Wallet**.
- Networks: Ethereum, Base (L2), Sepolia (Testnet).

## 10. Donation copy contract (FE-208 Donation spec §6.4, 21 Aug 2026) [Rename/Copy]

Source: Confluence **Huma Platform – Donation** (pageId 74579981) §6.4 and **Huma Platform – Humanity Centers** (pageId 88768526). Take these as binding on every donation surface: `donations.html`, `donate.html`, `explore-centres.html`, `centre-detail.html`, `donation-history.html`, the bell feed, and receipts.

### 10.1 Required terms: use these exact words

| Term | Use it for | Never say |
|---|---|---|
| **Donation** | The act and the record. | "gift transaction", "contribution order" |
| **Humanity Center** | The recipient. US spelling, always both words. | "HC" in user copy, "centre", "charity", "NGO" |
| **total donated** | Aggregate USD value given. | "raised", "volume" |
| **lives impacted** | The approved impact metric. Nullable -> **"Coming soon"**, never `0`. | "beneficiaries", "people helped" |
| **Huma Points** | Platform loyalty points from eligible activity. | "UYT", "rewards tokens" |
| **Impact Points** | Association-issued points redeemed at Humanity Centers. | conflating with Huma Points |
| **Donate by Fiat** / **Donate by Crypto** | The two donation options (§5.1 step 3, AC-DON-02). | "Card" / "Crypto", "Pay with…" |
| **processing fee** | The fee applied **on top** of the donation. | "service charge", "Huma fee" |
| **total charged** | donation amount **+** processing fee. | "grand total", "you pay" |
| **Humanity Center multisig wallet** | Crypto settlement destination. | "center wallet", "the charity's address" |
| **Payment Rail settlement account** | Fiat settlement destination. | "our bank", "the center's bank" |
| **settlement asset** | USD_FIAT / USDC / USDT. | "the coin", "output token" |

### 10.2 Banned in donation copy

- mint · burn · cash-out: issuer-layer vocabulary. Only permitted inside literal wallet transaction details, never in donation prose (§6.4).
- "converted to USD" for crypto donations. Crypto is converted to **USDC or USDT**, not to fiat. USD is the *reporting* value. Fiat is **never** converted to crypto.
- "guaranteed tax receipt" or any wording implying a legal receipt before it is generated (DON-HIST-05).
- Donor-level figures on any public surface: public totals are **aggregate** only (§6.4, AC-DON-09).

### 10.3 Fee and amount presentation (DON-DASH-08 / AC-DON-07)

Every review screen shows, in this order:

1. Donation amount (in USD; plus the original currency/asset amount above it when not USD)
2. Processing fee: prefixed `+`, with the note "Applied on top of your donation"
3. Conversion fee: only when the asset needs converting (BTC/ETH -> USDC/USDT)
4. Estimated network fee / gas: crypto only, in native token *and* USD
5. Total charged: `donation amount + processing fee`, styled as the total row

Network fees are paid separately from the wallet and are excluded from "total charged". Say so in the row note.

### 10.4 Status labels (user-facing)

`Pending payment` · `Processing` · `Awaiting signature` · `Submitted` · `Awaiting confirmation` · `Conversion pending` · `Completed` · `Failed` · `Expired` · `Rejected by user` · `Needs attention`.

Never rely on colour alone: every status chip pairs an icon and a text label (§6.4).

### 10.5 Huma Points state labels (DON-HP-02, §7.1.4)

`Estimated` · `Pending` · `Confirmed` · `Not awarded` · `Unavailable`. The UI **displays** the value the Huma Points service returns; it must not calculate multipliers, tiers, fee discounts or Impact Point exchange rates (DON-HP-03).

### 10.6 Receipt states (§4.1, DON-HIST-05)

| State | Copy |
|---|---|
| pending | "Pending · being generated. We'll notify you when it is ready." |
| available | "Receipt `<number>`: tied to this donation's transaction ID" |
| unavailable | "A receipt is not available for this donation." *(verbatim §6.3)* |

### 10.7 §6.3 error strings: use verbatim, no paraphrase

These live in `unera-pages/donation-data.js` as `UNERA_DON.ERR` and must be referenced from there, never retyped:

| Key | String |
|---|---|
| `invalidAmount` | Enter a valid donation amount. |
| `outOfRange(max)` | Donation amount must be between $1 and [max]. |
| `notLoggedIn` | Log in to complete your donation. |
| `kycRequired` | Complete verification to continue with this donation. |
| `walletRequired` | Connect your wallet to donate crypto. |
| `insufficient(sym)` | You do not have enough [crypto] for this donation. |
| `gas` | You may need more gas token to complete this transaction. |
| `rejected` | Donation was not submitted because the wallet request was rejected. |
| `reverted` | Unable to complete this donation. Please try again. |
| `expired` | This donation request expired. Please start a new donation. |
| `provider` | We could not process the payment right now. Please try again. |
| `converting` | Your donation is being processed. We'll update the status when conversion is complete. |
| `noReceipt` | A receipt is not available for this donation. |
| `timeout` | This is taking longer than expected. We'll update the status when confirmation is available. |

Reassurance may be appended **after** the verbatim string ("… Nothing left your wallet."), never spliced into it.

### 10.8 Value-proposition lines approved for donor-facing surfaces

- "Huma is not asking donors to trust a charity. It is offering a transparent, governed, structurally sound giving infrastructure."
- "Every dollar, publicly auditable at any time."
- "Micro-donations from $1."
- "hUSD pegged 1:1, no volatility risk."
- "Tax receipts are issued upon donation confirmation, tied to the transaction ID."
- "Anyone with a wallet can donate: no bank required."
- Six streams, named exactly: **Passive Reserve Yield · Yield-to-Donate · Hedge-to-Donate · Round-Up Giving · Recurring Donations · 2× Corporate Match**.
- Huma Points multipliers: Direct donation **1.5×**, Recurring giving **3×**, Yield-to-Donate **2×**, Hedge-to-Donate **2.5×**, Round-up **1×**.
- Allocation: "Donors take part in defined voting on allocation through Impact Points; final allocation authority rests with the Swiss Association."
