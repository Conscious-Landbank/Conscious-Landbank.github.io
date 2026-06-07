# Feedback Summary — June 5, 2026

Three areas of feedback were captured in Slack threads: **CAD & Buy Stablecoins**, **Transaction Filters**, and **Send Tokens**. Below is a plain-language summary of each, followed by focused questions a designer should bring to the next discussion.

---

## 1. CAD & Buy Stablecoins

**Source:** Eric (screenshot + screen recording, Jun 3)

### What was said

- The app currently shows "CAD" as the currency option, but it should only show **hUSD** — there is no CAD in this context.
- The "Buy Stablecoin" quick action on the dashboard currently leads to a stablecoin portal page. That portal **no longer exists**. The correct behavior should let users buy multiple stablecoins: **hUSD, USDC, USDT**, and potentially others.
- The current flow is broken — clicking the button takes users somewhere that doesn't work anymore.

### What is unresolved

- Where exactly does the "Buy Stablecoin" flow go now? Does a new page/flow need to be designed, or does the button just need to point somewhere else?
- Is the currency always hUSD, or does the user choose between hUSD, USDC, USDT?

### Designer follow-up questions

1. What is the intended destination when a user clicks "Buy Stablecoin" today? Is there a confirmed new flow, or is this still being figured out?
2. Should the user select which stablecoin they want to buy before entering the flow, or does the flow let them choose inside?
3. Should "Buy Stablecoin" on the dashboard rename to something like "Buy Crypto" or stay as-is?
4. Are there any stablecoins that should be hidden or shown only under certain conditions (e.g., KYC level, region)?

---

## 2. Transaction Filters

**Source:** Thanh Son Le, Eric, Hue Dinh, Ducke Tran, Kevin, Renol (long Slack thread, early Jun)

### What was said

**On the filter modal itself:**
- The "Bank Transfers" category option in the filter is redundant for this screen — the screen was designed for sending money (Web3), not bank transfers. Eric suggested just removing it.
- The "Status" filter (Completed / Pending / Failed) is also redundant for Web3 transactions, because **all indexed on-chain transactions are already Completed by design** — failed blockchain transactions don't emit events, so they never appear in the history.

**On mixing Web3 and Web2 transaction history:**
- On-chain (Web3) transactions only show finalized events — no pending, no failed. This is intentional.
- Off-chain (Web2) payment provider transactions (e.g., Paysafe bank payments) DO have pending/processing/failed states that matter for users.
- The team agreed the transaction history UI should eventually have **two separate views** — one for on-chain activity, one for off-chain/payment flows.
- Eric raised a concern: splitting into two separate records could confuse users who need to track one on-ramp transaction across both views. He suggested combining them on the frontend while keeping them separate on the backend, and renaming the feature from "Transaction History" to **"Activity"**.

**On the "All Wallets" vs "Current Wallet" filter:**
- The UI design shows two tabs: current wallet and all wallets. The backend already supports returning transactions across multiple wallet addresses using the existing API — so this is achievable.

**On Saved Presets:**
- The "Saved Presets" feature in the filter panel allows users to bookmark a set of filter criteria for quick reuse.
- After long discussion, the team concluded: **presets should be stored only as a browser-side cache (not synced to backend or across devices)** for now, and should expire after about a week.
- Limit presets to a maximum of **3**, with the ability to edit and delete them.
- Cross-device sync was deprioritized — it's nice-to-have but too complex for MVP, especially because it introduces version conflict problems between web and mobile app filter schemas.
- If a saved preset becomes incompatible (e.g., after a filter schema update), the UI should show a **signal that the preset is invalid** and prompt the user to delete and recreate it — rather than forcing an app update.

**On label naming:**
- "Money In" should be renamed to **"Recipient"** and "Money Out" to **"Sender"** (raised by Thanh Son Le).

### Designer follow-up questions

1. Should "Transaction History" be renamed to "Activity" across the whole app, or just in certain contexts? What does that mean for the navigation label?
2. If Web3 (on-chain) and Web2 (off-chain/bank) transactions are visually combined in one feed, how do we help users understand why one shows a pending state and the other doesn't? What visual treatment signals the difference?
3. If a saved preset becomes invalid, what exactly should the UI say? And where — inline in the preset list, as a banner, or as a modal?
4. How should the preset limit of 3 be communicated before the user hits it? What happens when they try to save a 4th?
5. For the "All Wallets" toggle — if a user has 5 linked wallets and filters by all of them, could the data volume be overwhelming? Does the design need any guardrails (e.g., a loading state, pagination signal)?
6. Should "Recipient" and "Sender" labels appear in the filter panel, in the transaction row itself, or both?

---

## 3. Send Tokens

**Source:** Thanh Son Le, Eric, Ducke Tran, Kevin, Renol (multiple threads, Jun 1–4)

### What was said

**Step 1 — Choose Method:**
- The screen currently shows three transfer options: UNERA User, External Wallet, Bank Account.
- Only **External Wallet (sending to a crypto address)** is available for this flow. The other two options do not apply here.
- The label "External Wallet" should be changed — the team suggested alternatives like "Enter an address" or "Select from saved address/contact." The exact wording is still open.
- A **contact/address book** feature was discussed: users should be able to save wallet addresses with a name and description for quick reuse. No signature is needed when adding a contact (consistent with MetaMask / Safe Wallet behavior).

**Step 3 — Amount:**
- The token should be the correct stablecoin (hUSD, USDC, USDT), not "UNERA."
- The "Transaction Fee: Free" row and the info tip saying "UNERA-to-UNERA transfers are free. Network (gas) fees apply for external wallet sends." should both be **removed** from this step. This is a blockchain transfer and is not free.

**Step 4 — Review Transaction:**
- "Send Type" label needs updating (pending the outcome of the method renaming discussion above).
- "Transaction Fee" row should be removed — the user will see the actual gas fee in their wallet popup when they sign. Showing it in two places causes confusion and potential mismatches.
- "Note" row should be removed — there is no note feature for token transfers.
- The "Instant transfer · Recipient notified by email · No fees" tip should be removed — it's inaccurate for blockchain transfers.
- The "2FA enabled — extra security" note should be removed — 2FA cannot be enforced for this type of wallet interaction.
- "Transaction ID" should become a **clickable link to the block explorer** (e.g., Etherscan) rather than a plain text ID.
- Ducke Tran flagged: if "Recipient notified by email" is real functionality, the team needs safeguards against spam via micro-transactions (e.g., email threshold limits or digest-based notifications).

**Step 5 — Success screen:**
- "Money Sent Successfully!" should be renamed to **"Token Sent"** (or similar).
- "Transaction ID" should show the actual **full transaction hash** and link to a block explorer.
- "Note" field should be removed.
- Token name should display the actual token (e.g., hUSD), not "UNERA."
- A **Nonce** field should be added.
- The team needs to decide what blockchain confirmation state triggers this screen: submitted to mempool (1–3 seconds), mined in a block (~2–12 seconds), or fully finalized on L1 (~3–15 minutes). This affects what "success" actually promises the user.

**A signing screen is needed:**
- Before the transaction is processed, there should be a dedicated screen where the user signs the transaction via their connected wallet.

### Designer follow-up questions

1. What is the confirmed label for the transfer method on Step 1? "Enter an address," "External address," "Send to wallet address"? Who owns this decision?
2. What does the address book / contact list look like? Is it a separate section in settings, or does it appear inline in the Send flow (e.g., a "select from saved" dropdown)?
3. On the signing step — is this a modal triggered by the wallet (MetaMask popup), or does our app show an intermediate screen before handing off to the wallet? What does the user see between clicking "Confirm" and the wallet popup appearing?
4. What confirmation state is considered "success"? Submitted, mined, or finalized? This directly affects the copy ("Your transaction is submitted" vs. "Your transaction is confirmed") and any waiting UI needed.
5. If a transaction is submitted but fails to mine, what does the user see? Is there an error recovery flow we need to design?
6. Is "Recipient notified by email" a real feature? If yes, what are the rules for when it triggers? This affects whether we need to communicate it to the user at all during the send flow.
7. Should the transaction hash on the success screen be a full hash or truncated (e.g., 0x742d...a8f0), and what happens when the user taps it — open block explorer in a new tab?
8. For the Nonce field — is this primarily for power users / developers, or is it expected in the standard user flow? Should it be visible by default or collapsed under an "Advanced" toggle?
