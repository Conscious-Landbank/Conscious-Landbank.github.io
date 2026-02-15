# Exchange Page Planning Document

## 1. Executive Summary

- **Purpose:** Align Exchange UX with industry best practices (MetaMask, Uniswap, Coinbase, Revolut)
- **Core flow:** (1) Currency pair selection → (2) Amount entry + quote → (3) Confirm → (4) Success/Failure
- **Key principles:** Numeric input, live quote, inline errors, ARIA labels, WCAG contrast

---

## 2. Competitive UX Patterns

### Flow Steps
Canonical 4-step swap pattern: pair selection → amount → review → confirm (MetaMask, Uniswap, Coinbase)

### Inputs & Validation
- Numeric fields, two decimals
- Dropdowns/tiles for currency choice
- Min/max enforcement: "Enter a valid amount" / "Insufficient funds"

### Exchange Rate & Fees
- Live rate + fee display before confirm (Add Money style)
- Summary: Exchange rate, Processing fee, You receive

### Error States
- Inline errors with `aria-live="assertive"`
- Place near offending control

### Accessibility
- Labels/ARIA for all interactive fields
- `role="radiogroup"` (with accessible label), each option `role="radio"`
- Keyboard: Arrow keys + Enter/Space for currency selectors
- Single-column on narrow screens (tiles stack)

### Security Cues
- Lock icon + VoPay/FINTRAC note on confirm step

---

## 3. Proposed Exchange Flow

### Screen 1 – Currency Selection
- **Title:** "Choose currencies to exchange"
- **UI:** From/To radiogroups with `.currency-option` tiles, flag emojis (USD/CAD/EUR)
- **Validation:** Two different currencies required
- **Error:** "Please choose two different currencies."

### Screen 2 – Amount Entry
- **Title:** "Enter amount to exchange"
- **Context:** "From: [USD] → To: [EUR]"
- **Input:** `type="number"`, min 0.01, prefix symbol, `aria-label="Amount in FROM_CURRENCY"`
- **Summary:** Exchange rate, Processing fee, You receive (in `.conversion-summary`)
- **Errors:** Empty/zero → "Enter a valid amount"; > balance → "Insufficient funds"

### Screen 3 – Confirmation
- **Title:** "Confirm Details"
- **Rows:** From, To, Exchange Rate, Fee, Net Received
- **Security note:** Lock + "Powered by VoPay. All transactions comply with FINTRAC regulations."
- **Buttons:** Back, Confirm & Exchange

### Screen 4 – Success / Failure
- **Success:** Green check, "Exchange Successful!", "You sent X USD and received Y EUR", Transaction ID, timestamp
- **Failure:** Red icon, "Exchange Failed", message, Try Again + Return to Wallet

### Validation Rules
- Currency: Required, two different
- Amount: Required, numeric, ≥0.01, ≤ balance, two decimals
- Rate: From API or mock; on failure show "Unable to get rates"

---

## 4. Design Alignment

| Element | Reference | Implementation |
|---------|-----------|----------------|
| Progress bar | send-enhanced | `.progress-bar`, `.progress-step`, `.progress-dot` |
| Card | send-enhanced | `border-radius: 1.25rem`, `border: 2px` |
| Summary block | add-money | `.conversion-summary` with green tint |
| Security note | donate | Lock SVG + VoPay/FINTRAC text |
| Success state | send-enhanced | 80px icon, green gradient |
| Failure state | kyc-verify | Red error icon, `.error-state` |

---

## 5. References

- [add-money.html](add-money.html) – conversion-summary, summary-row, confirm-detail
- [send-enhanced.html](send-enhanced.html) – progress-bar, card, success-state
- [donate.html](donate.html) – security-note VoPay/FINTRAC
- [kyc-verify.html](kyc-verify.html) – error-state for failure screen
