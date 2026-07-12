# NotificationCenter

Nav bell + unread badge + dropdown for important stablecoin service events.
Source: *hUSD Issuance & Redemption* (62259435) §11; *Dashboard* (66912287) §4.

## Event kinds → `kind`
- Mint completed → `success`
- Redeem burn completed / payout processing → `progress`
- Bank payout completed → `success`
- Payment or processing issue → `alert` ("check transaction details or contact support")
- Service announcement (maintenance / update) → `info`

## Rules
- Messages must be **user-safe** — never expose compliance reason codes, sanctions, wallet risk scores, or provider secrets.
- Controlled component: parent owns `open`, `items`, and read state.
