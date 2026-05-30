# User Flow Diagrams — Stablecoin Management & Remittance

**Last updated:** May 2026
**Source pages:** `NewUnera/dashboard-enhanced.html` · `NewUnera/wallet-enhanced.html` · `NewUnera/send-enhanced.html` · `NewUnera/notifications.html` · `NewUnera/purchase-receipt.html`
**Feature tracker rows:** Stablecoin Management · Stablecoin Remittance

---

## How to read these diagrams

| Node shape | Meaning |
|---|---|
| Rectangle `[ ]` | Screen, state, or action |
| Diamond `{ }` | Decision / branch point |
| Rounded `([ ])` | Start / end point |
| `⚠ MISSING` prefix | Feature identified in tracker but not yet implemented in the design prototype |
| `⚠ EDGE` prefix | Edge case — alternate or degenerate state |
| `⚠ PROTOTYPE` prefix | Stub behaviour present in prototype only; not production-ready |

---

## Flow 1 — Stablecoin Management

### Scope

This flow covers the six **Stablecoin Management** sub-features from the feature tracker:

1. Display current stablecoin balances — KPI hero on Dashboard + portfolio rows on Wallet
2. View recent transactions with status (completed, pending)
3. Quick buttons for sending or purchasing stablecoins
4. Simple visual summaries of activity and balances
5. Alerts for transaction statuses — notification bell + inbox
6. Access donation and remittance history in one place

**Entry points:** post-login redirect · direct URL to `dashboard-enhanced.html` · direct URL to `wallet-enhanced.html`

**Exits:** `get-unera-cad.html` · `redeem-unera-cad.html` · `send-enhanced.html` · `exchange.html` · `governance.html` · `notifications.html` · `explore-centres.html`

---

```mermaid
flowchart TD
    %% ── ENTRY ─────────────────────────────────────────────────────────────────────
    Start(["User — post-login or direct URL"])
    Start --> LoadDash["Load dashboard-enhanced.html"]
    LoadDash --> KycStatus{"KYC status?"}

    %% ── KYC ERROR PATH ────────────────────────────────────────────────────────────
    KycStatus -->|"Not verified"| KycBanner["#kycAlert banner displayed on dashboard"]
    KycBanner --> BannerChoice{"User action on banner"}
    BannerChoice -->|"Dismiss"| BannerDismissed["Banner hidden — persisted in localStorage"]
    BannerDismissed --> DashView["Dashboard main view"]
    BannerChoice -->|"Complete KYC"| KycVerifyPage["kyc-verify-new.html"]
    KycVerifyPage --> KycOutcome{"KYC review outcome"}
    KycOutcome -->|"Approved"| LoadDash
    KycOutcome -->|"Needs retry"| KycRetryPage["dashboard-kyc-retry.html"]
    KycRetryPage -->|"Re-submit documents"| KycVerifyPage
    KycOutcome -->|"Permanently blocked"| KycBlockedPage["dashboard-kyc-blocked.html"]
    KycBlockedPage --> SupportEmail["Contact: support@unera.ca"]

    %% ── DASHBOARD MAIN VIEW ───────────────────────────────────────────────────────
    KycStatus -->|"Verified"| DashView
    DashView --> ImpactCards["Impact Cards — balance · yield · donations · lives"]
    DashView --> QuickActionsGrid["Quick Actions Grid — Buy · Send · Exchange · Donate"]
    DashView --> UneraCadHub["UNERA CAD Hub Card — Get · Redeem"]
    DashView --> RecentActivity["Recent Activity table"]
    DashView --> NotifBell["Notification bell — badge count"]

    %% ── QUICK ACTIONS — WALLET GATE ──────────────────────────────────────────────
    QuickActionsGrid --> WalletGate{"Wallet connected?"}
    WalletGate -->|"No"| WalletModal["WalletPrompt modal opens"]
    WalletModal --> WalletProvider{"Select wallet provider"}
    WalletProvider -->|"MetaMask / WalletConnect / Coinbase / Brave / Ledger"| WalletResult{"Connect result"}
    WalletResult -->|"Wrong network"| WrongNet["⚠ EDGE: Error — switch network required"]
    WrongNet --> WalletProvider
    WalletResult -->|"Extension not installed"| NotInstalled["⚠ EDGE: Install extension prompt shown"]
    WalletResult -->|"User rejected"| UserRejected["⚠ EDGE: Rejected state — retry button shown"]
    UserRejected --> WalletProvider
    WalletResult -->|"Success"| KycGate{"KYC verified?"}
    WalletGate -->|"Yes"| KycGate
    KycGate -->|"No"| KycConfirmModal["Confirmation modal — redirect to KYC"]
    KycConfirmModal --> KycVerifyPage
    KycGate -->|"Yes"| QuickActionTarget{"Action selected"}
    QuickActionTarget -->|"Buy / Get stablecoins"| GetCadPage["get-unera-cad.html"]
    QuickActionTarget -->|"Send"| SendPage["send-enhanced.html"]
    QuickActionTarget -->|"Exchange"| ExchangePage["exchange.html"]
    QuickActionTarget -->|"Donate"| ExplorePage["explore-centres.html"]

    %% ── UNERA CAD HUB ─────────────────────────────────────────────────────────────
    UneraCadHub --> CadChoice{"Hub action"}
    CadChoice -->|"Get UNERA CAD"| GetCadPage
    CadChoice -->|"Redeem UNERA CAD"| RedeemPage["redeem-unera-cad.html"]

    %% ── RECENT ACTIVITY ───────────────────────────────────────────────────────────
    RecentActivity --> ActivityChoice{"Row interaction"}
    ActivityChoice -->|"View All →"| WalletPage["wallet-enhanced.html"]
    ActivityChoice -->|"Click tx row"| TxDetailStub["⚠ MISSING: Tx detail view — stub, not yet implemented"]

    %% ── NOTIFICATIONS ─────────────────────────────────────────────────────────────
    NotifBell --> NotifPanel["Notification panel opens — unread count updated"]
    NotifPanel --> NotifCategory{"Notification type"}
    NotifCategory -->|"transaction / donation / remittance"| NotifCta["CTA → relevant page"]
    NotifCategory -->|"verification"| KycVerifyPage
    NotifCategory -->|"system / security"| SupportEmail
    NotifCategory -->|"listing"| ListingNote["⚠ EDGE: All-tab only — no dedicated listing tab"]
    NotifPanel --> MarkReadClear["Mark all read / Clear all"]
    NotifPanel --> ViewAllNotif["View all → notifications.html"]
    ViewAllNotif --> NotifCenter["Notification Center — tabs: all · unread · transaction · donation · remittance · verification · system"]

    %% ── WALLET PAGE ───────────────────────────────────────────────────────────────
    WalletPage --> WalletBalances["Portfolio Balances — hCAD · hUSD · hEUR · HUMA"]
    WalletPage --> WalletHistory["Transaction History section"]

    WalletBalances --> PrivacyToggle{"Privacy toggle state"}
    PrivacyToggle -->|"ON — balance hidden"| MaskedBal["⚠ EDGE: Balances masked *** across KPI + all rows"]
    PrivacyToggle -->|"OFF — balance visible"| VisibleBal["Balances displayed normally"]

    WalletBalances --> WalletScope["⚠ EDGE: Wallet scope badge shown — list filtering not wired yet"]

    WalletBalances --> AssetAction{"Per-asset quick action"}
    AssetAction -->|"Issue / Get"| GetCadPage
    AssetAction -->|"Redeem"| RedeemPage
    AssetAction -->|"Send"| SendPage
    AssetAction -->|"Exchange"| ExchangePage
    AssetAction -->|"Governance — HUMA only"| GovPage["governance.html"]

    WalletHistory --> SearchFilter{"Search or filter"}
    SearchFilter -->|"Results found"| TxList["Paginated list — status badges: completed · pending"]
    SearchFilter -->|"No results"| EmptyState["⚠ EDGE: Empty state shown — clear filters prompt"]
    TxList --> LoadMoreCheck{"More rows available?"}
    LoadMoreCheck -->|"Yes — Load More / scroll sentinel"| TxList
    LoadMoreCheck -->|"No"| AllLoaded["All transactions displayed"]
    WalletHistory --> HistoryTabs["Tabs: All → Donations → Remittance history"]
```

### Missing features — Flow 1

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| 1 | Transaction detail view | Not implemented | Row click in activity table is a stub; `showTransactionDetail(txId)` is `/* ... */` |
| 2 | Wallet scope filtering | Not wired | `activeWalletScope` state exists but is not applied to transaction list query |
| 3 | `listing` notification tab | No dedicated tab | Listing notifications surface under All only |

---

## Flow 2 — Stablecoin Remittance (Send Flow)

### Scope

This flow covers the four **Stablecoin Remittance** sub-features from the feature tracker:

1. Send crypto to wallet address
2. Payee wallet management — **Saved wallets panel is missing** (noted in diagram)
3. Crypto-to-Crypto matching for cashing — **Recipient Receives card is missing** (noted in diagram)
4. Transfer confirmation / receipt

**Entry points:** Dashboard Quick Action "Send" · Wallet per-asset "Send" button · Top nav Transact link

**Exits:** `purchase-receipt.html` · `wallet-enhanced.html` · `kyc-verify-new.html` · support contact

---

```mermaid
flowchart TD
    %% ── ENTRY ─────────────────────────────────────────────────────────────────────
    EntryDash["Via Dashboard Quick Action"] --> LoadSend["Load send-enhanced.html"]
    EntryWallet["Via Wallet per-asset Send button"] --> LoadSend
    EntryNav["Via nav Transact direct link"] --> LoadSend

    %% ── STEP 1 — PREREQUISITES ────────────────────────────────────────────────────
    LoadSend --> PrereqCheck{"Prerequisites check"}
    PrereqCheck -->|"Both KYC + wallet met — auto-advance"| MethodSelect
    PrereqCheck -->|"KYC verified but no wallet"| PromptWallet["Prompt: connect wallet"]
    PrereqCheck -->|"Wallet connected but no KYC"| PromptKyc["Prompt: complete KYC → kyc-verify-new.html"]
    PrereqCheck -->|"Neither met — show step 1"| Step1Screen["Step 1 screen — checklist: KYC + wallet"]
    PromptWallet --> WalletConnResult{"Wallet connect result"}
    WalletConnResult -->|"Success"| MethodSelect
    WalletConnResult -->|"Failed / rejected"| PromptWallet
    PromptKyc --> KycDone{"KYC approved?"}
    KycDone -->|"Yes"| MethodSelect
    KycDone -->|"Retry / blocked"| PromptKyc
    Step1Screen --> PrereqCheck

    %% ── STEP 2 — CHOOSE SEND METHOD ───────────────────────────────────────────────
    MethodSelect["Step 2: Choose send method"]
    MethodSelect -->|"UNERA User"| UneraSearch
    MethodSelect -->|"External Wallet"| ExtAddressEntry
    MethodSelect -->|"Bank Account"| BankSelect

    %% ── STEP 3A — RECIPIENT: UNERA USER ──────────────────────────────────────────
    subgraph UneraBranch ["Step 3 — UNERA User"]
        UneraSearch["Search by username or email"]
        UneraSavedContact["Pick from saved contacts"]
        UneraRecipSet["Recipient confirmed"]
        UneraSearch --> UneraRecipSet
        UneraSavedContact --> UneraRecipSet
    end
    UneraRecipSet --> AmountEntry

    %% ── STEP 3B — RECIPIENT: EXTERNAL WALLET ─────────────────────────────────────
    subgraph ExternalBranch ["Step 3 — External Wallet"]
        ExtAddressEntry["Enter wallet address manually"]
        ExtNetworkPick["Pick network"]
        ExtBaseDisabled["⚠ EDGE: Base network disabled — option greyed out"]
        ExtQrScan["QR scan"]
        ExtQrResult{"QR scan result"}
        ExtQrValid["Valid payload — address auto-filled"]
        ExtQrError["⚠ EDGE: Invalid payload — QR error state shown"]
        ExtSavedWallets["⚠ MISSING: Saved Wallets panel — not yet implemented"]
        ExtAddressEntry --> ExtNetworkPick
        ExtNetworkPick --> ExtBaseDisabled
        ExtQrScan --> ExtQrResult
        ExtQrResult -->|"Valid"| ExtQrValid
        ExtQrValid --> ExtAddressEntry
        ExtQrResult -->|"Invalid"| ExtQrError
        ExtQrError --> ExtQrScan
    end
    ExtNetworkPick --> AmountEntry

    %% ── STEP 3C — RECIPIENT: BANK ACCOUNT ────────────────────────────────────────
    subgraph BankBranch ["Step 3 — Bank Account"]
        BankSelect["Select saved bank account"]
        BankAddNew["Add new bank account"]
        BankAddMock["⚠ PROTOTYPE: showAddBankMock — alert stub only, no real form"]
        BankSelect --> BankRecipSet["Bank recipient set"]
        BankAddNew --> BankAddMock
    end
    BankRecipSet --> AmountEntry

    %% ── STEP 4 — AMOUNT ───────────────────────────────────────────────────────────
    AmountEntry["Step 4: Enter amount"]
    AmountEntry --> AmountValidation{"Amount valid?"}
    AmountValidation -->|"Invalid — below min or exceeds balance"| AmountError["⚠ EDGE: Input error state — .amount-input.error shown"]
    AmountError --> AmountEntry
    AmountValidation -->|"Valid"| FeeBreakdown["Fee breakdown shown — platform fee + network fee"]
    FeeBreakdown --> ReviewStep

    %% ── STEP 5 — REVIEW ───────────────────────────────────────────────────────────
    ReviewStep["Step 5: Review — full transfer summary"]
    ReviewStep --> CryptoMatchMissing["⚠ MISSING: Recipient Receives card — Crypto-to-Crypto matching not shown"]
    ReviewStep --> SoftWarnCheck{"Method soft warn?"}
    SoftWarnCheck -->|"UNERA — #reviewUneraSoftWarn"| SoftWarn["Advisory shown — non-blocking"]
    SoftWarnCheck -->|"External — #reviewExternalSoftWarn"| SoftWarn
    SoftWarnCheck -->|"Bank — #reviewBankSoftWarn"| SoftWarn
    SoftWarnCheck -->|"None"| EdgeBannerCheck
    SoftWarn --> EdgeBannerCheck{"Review edge banner?"}
    EdgeBannerCheck -->|"No edge condition"| ConfirmEnabled["Confirm button enabled"]
    EdgeBannerCheck -->|"feeChanged — rate expired"| ConfirmBlocked["⚠ EDGE: Confirm disabled — resolve edge first"]
    EdgeBannerCheck -->|"recipientBlocked — compliance hold"| ConfirmBlocked
    EdgeBannerCheck -->|"dailyLimit — send cap reached"| ConfirmBlocked
    EdgeBannerCheck -->|"bankLimitPreview — bank limit warning"| ConfirmBlocked
    ConfirmBlocked --> EdgeResolution{"Resolution path"}
    EdgeResolution -->|"Re-quote or change method"| MethodSelect
    EdgeResolution -->|"Abandon"| FlowAbandoned["Flow abandoned — user exits"]
    ConfirmEnabled --> UserConfirms["User taps Confirm Send"]

    %% ── STEP 6 — PROCESSING ───────────────────────────────────────────────────────
    UserConfirms --> ProcessingState["Step 6: Processing — animated spinner state"]
    ProcessingState --> SendResult{"Send result"}

    %% ── STEP 7 — SUCCESS PATH ─────────────────────────────────────────────────────
    SendResult -->|"Success"| SuccessHero["Step 7: Success hero — lightning bolt + check badge"]
    SuccessHero --> PostSendAction{"Post-send action"}
    PostSendAction -->|"View receipt"| ReceiptPage["purchase-receipt.html"]
    PostSendAction -->|"Send again"| MethodSelect
    PostSendAction -->|"Go to wallet"| WalletReturn["wallet-enhanced.html"]

    ReceiptPage --> ReceiptView["Receipt: delivery tracker · tx details · on-chain accordion"]
    ReceiptView --> ReceiptAction{"Receipt action"}
    ReceiptAction -->|"Print / Download PDF"| PrintAction["window.print — Save as PDF dialog"]
    ReceiptAction -->|"Share"| ShareAction["navigator.share — clipboard fallback"]
    ReceiptAction -->|"Copy tx hash"| CopyHash["Hash copied — toast shown"]
    ReceiptAction -->|"Back"| WalletReturn

    %% ── STEP 7 — ERROR / PENDING OUTCOMES ────────────────────────────────────────
    SendResult -->|"Error or pending"| OutcomeScreen["Outcome screen — #sendOutcomeWrap · Contact Support visible"]
    OutcomeScreen --> OutcomeCategory{"Outcome category"}

    OutcomeCategory -->|"recipient_unavailable"| OE_Error["Error: recipient not found or inactive"]
    OutcomeCategory -->|"wallet_rejected"| OE_Error
    OutcomeCategory -->|"onchain_failed"| OE_Error
    OutcomeCategory -->|"bank_rejected"| OE_Error

    OutcomeCategory -->|"compliance_hold"| OE_Review["Review: held — awaiting compliance clearance"]
    OutcomeCategory -->|"daily_limit"| OE_Review
    OutcomeCategory -->|"withdrawal_limit"| OE_Review

    OutcomeCategory -->|"fee_spike_pending"| OE_Pending["Pending: queued — fee spike or bank processing"]
    OutcomeCategory -->|"bank_pending"| OE_Pending

    OE_Error --> OutcomeActions{"Next action"}
    OE_Review --> OutcomeActions
    OE_Pending --> OutcomeActions

    OutcomeActions -->|"Try again"| MethodSelect
    OutcomeActions -->|"Contact support"| SupportContact["Contact: support@unera.ca"]
    OutcomeActions -->|"Back to wallet"| WalletReturn

    %% Stepper note
    OutcomeScreen --> StepperNote["⚠ EDGE: Final stepper step stays active — not marked complete on non-success outcomes"]
```

### Missing features — Flow 2

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| 1 | Saved Wallets panel | Not implemented | Feature tracker: "Extend Send to External Wallet branch with Saved wallets panel mirroring `.saved-methods-list` pattern" |
| 2 | Recipient Receives card — Crypto-to-Crypto | Not implemented | Feature tracker: "Add Recipient receives card in review step — e.g. USDC on Base" |
| 3 | Add bank account form | Prototype stub only | `showAddBankMock()` fires `alert()` — no real modal or form |
| 4 | Deep-link asset pre-selection | Not wired | `?asset=` query param from Wallet page not read in send script |
| 5 | Dynamic receipt data | Not implemented | `purchase-receipt.html` amounts/IDs are hardcoded in HTML; no URL-driven receipt state machine |
| 6 | Pending/failed delivery states on receipt | Not implemented | Delivery tracker CSS classes exist but JS state machine not built; only success specimen rendered |
