# UNERA — Token Management

> Source: [UNERA - Token Management](https://conscious-landbank.atlassian.net/wiki/spaces/~7120206e88bad7379045fb808e0bd72c8daf86/pages/62259420/UNERA+-+Token+Management) (Confluence) · v17, last updated 2026-06-11

---

# 1. Introduction

## 1.1 Purpose

This document defines the user-facing token transaction actions in the UNERA Platform: wallet connection, Buy hUSD via OTC, Trade, Swap, and Send Token.

Portfolio, Transaction History, and detailed BE / smart contract implementation are maintained in separate documents.

## 1.2 Scope

| Feature | Scope |
| --- | --- |
| Wallet Connection | One-time wallet onboarding and ownership verification. |
| Buy hUSD via OTC | User sends fiat via bank/e-Transfer; platform transfers hUSD from inventory to the linked wallet. |
| Trade | Order book trading; system matches and settles orders. |
| Swap | AMM swap for supported stablecoin tokens. |
| Send Token | Transfer token from linked wallet to another wallet. |

## 1.3 Out of Scope

- Portfolio and dashboard.
- Transaction history.
- Detailed BE / smart contract implementation.
- Stablecoin reserve management, issuance, and redemption details.
- Compliance / audit export.

## 1.4 Key Rules

- FE must not call blockchain RPC directly.
- Wallet must be connected and verified before transaction actions.
- UNERA Platform user-facing copy should avoid Stablecoin Layer terms such as mint, burn, issuance, and redemption. Use Purchase / Sell where applicable.

---

# 2. Wallet Connection

Wallet connection is a one-time onboarding step. The user connects a wallet and signs a simple message to prove ownership. This can be completed in advance, separate from any transaction flow.

- Supported wallets: MetaMask, WalletConnect, Coinbase Wallet.
- After verification, the wallet address is linked to the user's account and reused for future transactions.
- If the wallet is disconnected, transaction features are blocked until the wallet is reconnected.

| State | Description |
| --- | --- |
| Not Connected | No wallet linked to the account. |
| Unverified | Wallet linked but ownership signature has not been verified yet. |
| Verified | Wallet linked and verified. |
| Disconnected | Previously linked wallet removed or unavailable. |

**Reference:** [Wallet Connection](https://conscious-landbank.atlassian.net/wiki/spaces/~7120206e88bad7379045fb808e0bd72c8daf86/pages/30081028)

---

# 3. Transaction Architecture

## 3.1 Phase 1 — Current Wallet Patterns

This section defines the current Phase 1 wallet interaction patterns. Swap and Trade use **approve + transferFrom** because a contract needs to move tokens on the user's behalf. Send / Transfer uses a standard ERC-20 `transfer()` because the user is sending tokens directly.

**How it works:**

| Flow | Phase 1 Pattern | Wallet Interaction | Gas |
| --- | --- | --- | --- |
| Swap | `approve` + `transferFrom` | 2 wallet interactions | User pays gas |
| Trade | `approve` + `transferFrom` | 2 wallet interactions | User pays gas |
| Send / Transfer | `transfer` | 1 wallet interaction | User pays gas |

**Characteristics:**

- Swap and Trade require 2 wallet interactions: approve transaction + action transaction.
- Send / Transfer requires 1 wallet interaction: transfer transaction only.
- User pays gas directly via wallet for Phase 1 on-chain transactions.
- Works with standard ERC-20 tokens.

## 3.2 Phase 2 — EIP-3009 (Future, Not Current Scope)

**Phase 2 is not currently being implemented.** This section documents the planned future optimization.

EIP-3009 (`transferWithAuthorization`) provides an **alternative** to approve + transferFrom for **specific tokens that support it** (e.g., hCAD, USDC). Instead of 2 on-chain transactions, the user signs a single off-chain authorization and the system submits the transaction on their behalf. **Not all ERC-20 tokens support EIP-3009**, so both methods coexist in Phase 2 — the method used depends on the specific flow + token pair.

**Characteristics:**

- 1 off-chain signature only; no on-chain transaction from user.
- System pays gas; user pays nothing.
- **Per flow + per token pair only** — not a global platform migration.
- Only tokens with native `transferWithAuthorization` support qualify.
- Chosen for UX simplicity, 1 signature vs 2 transactions.
- Doesn't accept fee parameter in the authorization itself.
- Can switch back to approve + transfer anytime if economics change.

**Planning note:** EIP-3009 may be considered later for supported swap flows involving hCAD/USDC. Exact flow and token-pair scope must be confirmed before implementation.

## 3.3 Gasless Approaches Evaluated

| Approach | Status | Reason |
| --- | --- | --- |
| **EIP-3009** | Phase 2 only | 1 signature, system pays gas. Only for tokens with native support. |
| **EIP-2771 / Forwarder** | Rejected for standard ERC-20 transfers | Standard ERC-20 tokens do not support the required context/signing behavior. Otherwise users still need an on-chain transfer first, which defeats gasless UX. |
| **EIP-4337** | Future option | Broader gasless option, but not a current priority. |
| **Approve + TransferFrom** | Phase 1 current | 2 wallet interactions, user pays gas, works with all ERC-20 tokens. |

## 3.4 Fee Structure

| Fee | Description |
| --- | --- |
| Swap Fee | Paid to liquidity providers, Uniswap model. |
| Platform Fee | Configurable fee paid to UNERA. Set to **0 at launch**, adjustable later. |
| Gas Fee — Phase 1 | `approve + transferFrom` flows: user pays gas directly via wallet. Standard transfer flows: user pays gas directly via wallet. Preview shows estimated gas in native token and fiat equivalent. The platform does not collect gas markup. |
| Gas Fee — Phase 2 | EIP-3009 flows: platform absorbs gas and does not charge it to users. |

## 3.5 Wallet Interaction Summary

| Feature | Phase 1 Current | Phase 2 Future |
| --- | --- | --- |
| Buy OTC Fiat | No wallet interaction at buy time; fiat payment, system transfers tokens. | Same. |
| Swap AMM | `approve + transferFrom`. 2 wallet interactions, user pays gas. | Potential EIP-3009 for confirmed supported flow + token pairs only. |
| Trade Order Book | `approve + transferFrom`. 2 wallet interactions, user pays gas. | TBD. |
| Send Token | `transfer`. 1 wallet interaction, user pays gas. | TBD. |

---

# 4. Stablecoin Portal Transactions — Reference Only

The Stablecoin Portal owns hUSD issuance and redemption. This section is only a short cross-reference. Full details belong in the Stablecoin Portal PRD.

| Flow | Summary | Wallet Interaction |
| --- | --- | --- |
| Buy hUSD via Fiat | User sends fiat (bank/e-Transfer), system mints hUSD to linked wallet. | None at buy time; wallet already verified. |
| Buy hUSD via Crypto | User prepares txn on web app → triggers wallet → user signs & submits standard transfer to treasury → system mints. | User signs transaction and pays gas. |
| Sell hUSD to Fiat | User prepares txn on web app → triggers wallet → user signs & submits standard transfer to treasury → system burns token and sends fiat to bank. | User signs transaction and pays gas; bank details collected during preparation. |

**Reference:** [Stablecoin Portal PRD](https://conscious-landbank.atlassian.net/wiki/spaces/~7120206e88bad7379045fb808e0bd72c8daf86/pages/61276166)

---

# 5. UNERA Platform Transactions

## 5.1 Buy hUSD via OTC Fiat

User agrees on OTC terms, sends fiat via bank/e-Transfer, and the system transfers hUSD from platform inventory to the user's linked wallet.

### Requirements

- No wallet interaction at buy time.
- Wallet must already be linked and verified during onboarding.
- Platform transfers hUSD from inventory; this is not Stablecoin Portal issuance.
- Transaction preview shows fiat amount, hUSD amount, rate, platform fee, and total cost.
- If inventory is insufficient, the buy flow is blocked with a clear message.

### User Flow

1. User selects Buy hUSD.
2. User reviews OTC terms and payment instructions.
3. User sends fiat via bank/e-Transfer.
4. System confirms fiat settlement.
5. System transfers hUSD to the linked wallet.
6. User sees purchase completion.

### Transaction Preview

The preview screen is displayed before the user confirms the OTC Buy. No wallet interaction is required — OTC Buy is settled via fiat payment.

| Field | Description |
| --- | --- |
| You Pay | Fiat amount + currency, for example 100.00 CAD. |
| You Receive | Token amount, for example 72.35 hUSD. |
| Exchange Rate | TWAP rate, for example 1 hUSD = 1.382 CAD. |
| Platform Fee | Configurable fee paid to UNERA, set to 0% at launch. |
| Estimated Gas | Estimated gas for platform token transfer, shown in native token + fiat equivalent. |
| Total Cost | Fiat amount + platform fee. |
| Rate Validity | Countdown timer showing quote expiry, for example 60 seconds. |
| Wallet Prompts | None — payment is processed via bank/e-Transfer or 3rd-party payment provider. |

**Notes:**

- If the quote expires, the preview auto-refreshes with the latest rate before the user can confirm.
- No wallet prompts are shown to the user.
- Gas is incurred by the platform when transferring tokens from inventory to the user wallet.

## 5.2 Swap — AMM Stablecoin Tokens

User swaps supported stablecoin tokens through the AMM flow.

### Phase 1 Wallet Pattern

- Current implementation: **approve + transferFrom**.
- User pays gas directly via wallet.
- Wallet prompts for 2 interactions: approve transaction, then swap/action transaction.
- User approves the AMM contract to spend tokens; the contract executes the swap internally via `transferFrom`.

### Phase 2 Note

EIP-3009 may be introduced later for specific supported swap flow + token pairs only. It is not part of the current Phase 1 implementation.

### Requirements

- Transaction preview shows input token, output token, exchange rate, price safety/slippage setting, deadline, and estimated gas.
- Preview must make clear that the user pays gas in Phase 1.
- If liquidity is insufficient, swap is blocked with a clear message.

### User Flow

1. User selects pay token and receive token.
2. User enters amount.
3. System displays preview.
4. User confirms.
5. Wallet prompts for approve.
6. Wallet prompts for swap/action transaction.
7. System shows pending status and final result.

### Transaction Preview

The preview screen is displayed before the user confirms the swap.

| Field | Description |
| --- | --- |
| You Pay | Input token symbol + amount. |
| You Receive | Output token symbol + estimated amount. |
| Exchange Rate | Token A to Token B rate. |
| Price Impact | Percentage impact on pool price. |
| Slippage Tolerance | User-configurable, default 0.5%. |
| Deadline | Transaction expiry time. |
| Swap Fee | Fee paid to liquidity providers. |
| Platform Fee | Configurable fee paid to UNERA, set to 0% at launch. |
| Estimated Gas — Approve | Gas cost in native token + fiat equivalent. |
| Estimated Gas — Swap | Gas cost in native token + fiat equivalent. |
| Total Estimated Gas | Sum of approve + swap gas in native token + fiat equivalent. |
| Wallet Prompts | 2 — approve transaction, then swap/action transaction. |

**Phase 2 note:** If EIP-3009 is enabled in the future for a confirmed flow + token pair, the preview changes to one off-chain signature and shows gas as covered by the platform. This is not part of Phase 1.

## 5.3 Trade — Order Book

User places buy or sell orders. The system matches orders and settles according to the order book flow.

### Requirements

- Supports market and limit orders.
- System displays transaction preview before order submission.
- Token movement uses **approve + transferFrom**.
- User pays gas directly via wallet.
- Order states and matching details are owned by the Trade / Order Book implementation document if more detail is needed.

### User Flow

1. User selects trading pair.
2. User chooses order type and enters amount.
3. System displays preview.
4. User confirms.
5. Wallet prompts for approve.
6. Wallet prompts for trade/action transaction.
7. System submits order and shows status.

### Transaction Preview

The preview screen is displayed before the user confirms the order.

| Field | Description |
| --- | --- |
| Trading Pair | Selected trading pair, for example hUSD/USDC. |
| Order Type | Market or limit order. |
| Price | Market price or limit price set by user. |
| Amount | Token amount to buy or sell. |
| Total Value | Price × amount. |
| Platform Fee | Configurable fee paid to UNERA, set to 0% at launch. |
| Estimated Gas — Approve | Gas cost in native token + fiat equivalent. |
| Estimated Gas — Trade | Gas cost in native token + fiat equivalent. |
| Total Estimated Gas | Sum of approve + trade gas in native token + fiat equivalent. |
| Wallet Prompts | 2 — approve transaction, then trade/action transaction. |

## 5.4 Send / Transfer Token

User transfers a supported token from their linked wallet to another wallet address.

### Requirements

- Uses standard ERC-20 `transfer()`.
- User pays gas directly via wallet.
- Requires 1 wallet interaction: transfer transaction only.
- No approval is needed because the user is sending their own tokens directly.
- Recipient address must be validated.
- Self-send is blocked.
- Transaction preview shows token, amount, sender address, recipient address, estimated gas, and total deduction.
- After successful send, user may save the recipient to Address Book.

### User Flow

1. User selects token and amount.
2. User enters or selects recipient address.
3. System validates address and displays preview.
4. User confirms.
5. Wallet prompts for transfer transaction only.
6. System broadcasts transaction and shows result.

### Transaction Preview

The preview screen is displayed before the user confirms the token transfer.

| Field | Description |
| --- | --- |
| Token | Token symbol. |
| Amount | Amount to send. |
| Sender Address | Source linked wallet address, validated. |
| Recipient Address | Destination wallet address, validated. |
| Estimated Gas | Gas cost for the transfer transaction in native token + fiat equivalent. |
| Total Deduction | Token amount + gas paid directly through wallet. |
| Wallet Prompts | 1 — transfer transaction only. |

---

# 6. Common UX Rules

- Swap and Trade Phase 1 flows follow: Preview → Confirm → Approve in Wallet → Confirm Action Transaction in Wallet → Pending → Result.
- Send / Transfer Phase 1 flow follows: Preview → Confirm → Confirm Transfer Transaction in Wallet → Pending → Result.
- Preview must clearly show who pays gas.
- Phase 1 flows show estimated gas in native token and fiat equivalent.
- Do not show EIP-3009 / gasless UX in Phase 1 screens.
- Wallet rejection returns the user to the preview screen with a clear message.
- Errors should be short, actionable, and specific to the failed step.

---

# 7. Acceptance Criteria

| ID | Criterion |
| --- | --- |
| AC-WALL-01 | User can connect a wallet and sign a message to prove ownership. |
| AC-WALL-02 | Unverified wallet cannot perform transactions. |
| AC-WALL-03 | Verified wallet can perform transactions. |
| AC-WALL-04 | Connected wallet persists across sessions until disconnected. |
| AC-BUY-01 | OTC Buy hUSD requires no wallet interaction at buy time after wallet onboarding. |
| AC-BUY-02 | Transaction Preview displays fiat amount, hUSD amount, exchange rate, platform fee, total cost, rate validity, and no wallet prompts. |
| AC-BUY-03 | Platform fee is configurable, set to 0 at launch, and displayed on the Buy Transaction Preview when applicable. |
| AC-BUY-04 | If the quoted rate expires, the Buy preview auto-refreshes with the latest rate before confirmation. |
| AC-SWAP-01 | Swap uses `approve` + `transferFrom` in Phase 1. |
| AC-SWAP-02 | Swap requires 2 wallet interactions in Phase 1: approve transaction, then swap/action transaction. |
| AC-SWAP-03 | User pays gas directly via wallet for both Swap Phase 1 transactions. |
| AC-SWAP-04 | Swap Transaction Preview shows estimated gas as two separate line items: approve gas and swap gas. |
| AC-SWAP-05 | Swap fee is paid to liquidity providers and displayed on the Transaction Preview. |
| AC-SWAP-06 | Platform fee is configurable, set to 0 at launch, and displayed on the Swap Transaction Preview when applicable. |
| AC-SWAP-07 | Phase 1 Swap UI does not show EIP-3009 or gasless flow options. |
| AC-SWAP-08 | User can configure slippage tolerance before confirming a swap. Default is 0.5%. |
| AC-SWAP-09 | Slippage tolerance is displayed on the Swap Transaction Preview. |
| AC-SWAP-10 | If the user sets slippage above a threshold, for example 5%, a warning is shown that the transaction may be front-run. |
| AC-SWAP-11 | If the user sets slippage to 0% or an unreasonably low value, a warning is shown that the transaction may fail. |
| AC-SWAP-12 | Slippage setting persists for the session but resets to default 0.5% on next login. |
| AC-TRADE-01 | Trade uses `approve` + `transferFrom` in Phase 1. |
| AC-TRADE-02 | Trade requires 2 wallet interactions in Phase 1: approve transaction, then trade/action transaction. |
| AC-TRADE-03 | User pays gas directly via wallet for both Trade Phase 1 transactions. |
| AC-TRADE-04 | Trade Transaction Preview shows estimated gas as two separate line items: approve gas and trade gas. |
| AC-TRADE-05 | Platform fee is configurable, set to 0 at launch, and displayed on the Trade Transaction Preview when applicable. |
| AC-TRADE-06 | Phase 1 Trade UI does not show EIP-3009 or gasless flow options. |
| AC-SEND-01 | Send uses standard ERC-20 `transfer()` in Phase 1. |
| AC-SEND-02 | Send requires 1 wallet interaction only: transfer transaction. |
| AC-SEND-03 | No approval step is required for Send because the user sends tokens directly. |
| AC-SEND-04 | User pays gas directly via wallet for the Send transfer transaction. |
| AC-SEND-05 | Send Transaction Preview shows estimated gas as a single line item. |
| AC-SEND-06 | Recipient address is validated in real time, invalid addresses are blocked, and self-send is blocked. |
| AC-CROSS-01 | FE does not call blockchain RPC directly. |
| AC-CROSS-02 | The platform does not collect or mark up gas fees. User pays actual gas via wallet in Phase 1. |
| AC-CROSS-03 | EIP-3009 remains Phase 2 only and may be enabled per flow + per token pair only, not globally. |

---

# 8. References

- [Stablecoin Portal PRD](https://conscious-landbank.atlassian.net/wiki/spaces/~7120206e88bad7379045fb808e0bd72c8daf86/pages/61276166)
- [System Architecture Blueprint](https://conscious-landbank.atlassian.net/wiki/spaces/~7120206e88bad7379045fb808e0bd72c8daf86/pages/63143954)
- [UNERA - Token Swap](https://conscious-landbank.atlassian.net/wiki/spaces/~7120206e88bad7379045fb808e0bd72c8daf86/pages/56525008)
- [Wallet Connection](https://conscious-landbank.atlassian.net/wiki/spaces/~7120206e88bad7379045fb808e0bd72c8daf86/pages/30081028)
