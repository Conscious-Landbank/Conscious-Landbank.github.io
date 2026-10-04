# Huma payee address management

> Captured from Confluence (page 66945025, v7): durable source of truth. The Platform users-to-users **Address Book** for saving/managing recipient wallet addresses for P2P token transfers. **Not** applicable to the Stablecoin module (no user-to-user transfer).

## 1. Summary
| Aspect | Detail |
|---|---|
| Nav Entry | **Address Book** |
| Access | Standalone page + inline picker from Send Token flow |
| Storage | Server-side, persisted across sessions and devices |
| Limit | **100 payees** per user |
| Module | Platform only (P2P transfer). Not Stablecoin. |

**In scope:** save/edit/delete payee addresses; label/nickname + optional description; address-format validation on save; quick-select payee from Send; search/filter; **ENS reverse resolution** (auto friendly name).
**Out of scope:** shared/team books, cross-platform sync, on-chain registry, external contact import, Stablecoin module.

**Prerequisites:** Wallet connected (MetaMask/WalletConnect/Coinbase); KYC verified (trusted from Stablecoin Layer via SSO, or Platform's own); Platform account.

## 2. Functional Requirements
- ADDR-01 Add payee = wallet address + **label (required, unique per user)** + optional description.
- ADDR-02 Validate address format on save (valid EVM, **checksummed**). Reject duplicate addresses.
- ADDR-03 Edit label/description only. **Address itself cannot be edited**; delete and re-add to change.
- ADDR-04 Delete requires a confirmation dialog.
- ADDR-05 Searchable by **label and address**.
- ADDR-06 Integrated into Send: select a saved payee as recipient via dropdown/modal.
- ADDR-07 After a successful send to a new address, **prompt to save** with a label.
- ADDR-08 Stored server-side, per Platform account, persists across sessions/devices.
- ADDR-09 Support ≥ **100** saved payees.
- ADDR-10 On save, **ENS reverse lookup** (Ethereum RPC); if found, store + display ENS name as friendly name.
- ADDR-11 ENS resolution is **non-blocking**: on fail/timeout, save normally without ENS; may retry in background.
- ADDR-12 ENS names are **read-only, auto-resolved**: user cannot input/edit.
- ADDR-13 Re-resolve ENS periodically / on each Address Book load (ownership can change on-chain).
- ADDR-14 Platform P2P only; not in Stablecoin module.

## 3. Data Model
`id` (UUID) · `user_id` (UUID) · `label` (req, max 50, unique/user) · `address` (req, EVM checksummed, unique/user) · `description` (opt, max 120) · `ens_name` (nullable, auto-resolved, read-only, max 255) · `address_type` (Enum: EVM, SUI…) · `created_at` · `updated_at` · `created_by` · `updated_by`.

## 4. User Flows
**4.1 Manage:** nav -> list (label + ENS if resolved + truncated address + description) -> search by label/address -> **Add** (label, address, optional desc -> Save; validate format + uniqueness) -> **Edit** (label/desc only) -> **Delete** (confirm dialog).
**4.2 Picker from Send:** tap **Address Book** button next to recipient input -> searchable modal/popover -> select row -> recipient field populated + label shown -> continue.
**4.3 Save-after-send:** complete send to unsaved address -> success-screen prompt "Save this address?" -> **address autofilled, read-only** -> enter label + optional desc -> Save.
**4.4 ENS reverse resolution:** validate format -> background reverse lookup (Infura/Alchemy) -> found (`alice.eth`) store+display / not-found save normally / timeout-fail save + retry next load. Read-only mainnet call, no gas, ~200–500ms. Re-resolve on each load.

## 5. States
EMPTY ("No saved addresses. Add your first payee.") · LIST (Address Book) · ADDING (Add Payee) · EDITING (Edit Payee) · SAVING (Saving…) · DELETING (Delete Payee?).

## 6. UI/UX
**Principles:** Lightweight (minimal chrome), Simplified (single-purpose, no wizards), Scannable (list optimised for quick scan/select).
**6.2 Page:** single-column card list, responsive, no sidebar. Sticky search ("Search by name or address"). **Payee card:** Label (bold) · ENS name (accent, if resolved) · truncated address (monospace, secondary) · description (tertiary grey) · Edit + Delete icons right. Empty state = centered illustration + text + primary **+ Add Payee**. Pagination = infinite scroll, batches of 20.
**6.3 Add/Edit form:** inline sheet/drawer (mobile) or inline expand (desktop), **no full-page nav**. Fields: Label (req, max 50, auto-focus); Wallet Address (req, **read-only on edit**); Description (opt, max 120). Real-time validation, highlight invalid on blur, **disable Save until valid**. Save (primary) · Cancel (text).
**6.4 Delete confirm:** inline banner or compact modal (no heavy overlay). "Remove **[label]** from your address book?" Delete (destructive/red) · Cancel.
**6.5 Picker (Send):** "Address Book" icon-button next to recipient. Bottom sheet (mobile) / dropdown popover (desktop). Search + scrollable list (label + ENS + truncated address). Tap -> populate + close. Empty -> "No saved addresses" + link to page.
**7.6 Save-after-send prompt:** inline card on Send success. "Save this address for next time?" Fields: Address (autofilled, read-only, greyed) · Label (pre-focused) · Description (opt). Save (primary) · **Skip** (text link).

## 7. Error Handling
Invalid format -> block + highlight, "Invalid wallet address format." · Duplicate address -> block, "This address is already saved as '[label]'." · Duplicate label -> block, "A payee with this label already exists. Please use a different name." · Label > 50 -> block, char limit msg · Desc > 120 -> block, char limit msg · Server error save -> inline retry "Unable to save. Please try again." · Server error delete -> inline retry · Max payees -> block "Address book is full (100 payees)…" · ENS timeout/fail -> silent save + retry · ENS changed -> silent auto-update.

## 8. Acceptance Criteria (key)
Add: AC-01 valid label+EVM saves; AC-02 invalid format blocked + inline error; AC-03 dup label blocked; AC-04 dup address blocked referencing existing label; AC-05 100-payee cap blocks add.
Edit: AC-06 label updates; AC-07 address read-only; AC-08 dup label blocked.
Delete: AC-09 confirm before removal; AC-10 confirm removes; AC-11 cancel keeps.
Search: AC-12 real-time filter by label/address substring; AC-13 no match -> "No matching addresses found."
Send integration: AC-14 Address Book button -> searchable picker; AC-15 select populates recipient + shows label; AC-16 send to new address -> success prompt with address autofilled+read-only; AC-17 save adds payee; AC-18 Skip dismisses; AC-28 autofilled read-only address, user only adds label+desc.
Persistence: AC-19 persists across sessions/devices; AC-20 ≥100 without degradation.
ENS: AC-21 found -> display; AC-22 none -> save silent; AC-23 timeout -> save + retry next load; AC-24 ownership change -> re-resolve next load; AC-25 read-only.
Scope: AC-26 Platform only; AC-27 not Stablecoin.

## 9. References
Send token by saved address -> Huma Token Management §6 Send Token.
