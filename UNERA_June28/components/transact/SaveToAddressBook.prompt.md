Success-screen CTA that lets the user save a freshly-entered recipient address to a labelled address book — for external-transfer flows only (Send, withdraw, remittance).

```jsx
const { SaveToAddressBook } = window.UNERADesignSystem_679671;

<SaveToAddressBook
  address="0x0822aEf3...7B75"
  network="Ethereum"
  addressType="EVM"
  manageHref="payee-management.html#wallets"
  onSaved={(entry) => console.log('saved', entry)}
/>
```

- Shows a secondary "Save to address book" button; opens a modal (Label, read-only address, type · network, optional Description, "No wallet signature required" hint).
- On save it upserts into a localStorage address book (`storageKey`) and swaps the button for a green "Saved as …" chip with a Manage link.
- **When to show:** only when the recipient address was typed/pasted (not already saved). **When NOT to use:** Buy / Swap / Trade — no recipient address exists in those flows, so there is nothing to save.
- Esc and overlay-click close the modal; the Label field is required.
