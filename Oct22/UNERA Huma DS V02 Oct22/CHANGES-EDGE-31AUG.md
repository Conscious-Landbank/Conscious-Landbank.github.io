# Edge-case audit, 31 Aug 2026

Audit of every page in `unera-pages/` against the CLAUDE.md §4 demo-bar rule: a prototype edge/error simulator as the first child of `<main>`, happy-path pill first, one shared banner per case, blocking cases disable the primary CTA, in-memory only.

## Already covered (no change)

- add-money, exchange, trade, send-enhanced: full flow edge bars
- wallet-edge: reference implementation
- wallet-enhanced, portfolio: edge bars added earlier today (wallet/portfolio states + load outcomes)
- dashboard-enhanced, donate, donations, donation-history, explore-centres, centre-detail: user-state + data-state pills (FE-208)
- account-settings, payee-management, payment-methods, notifications: page-state bars
- kyc-verify, kyc-verify-new: Sumsub result simulators (mid-flow placement is the allowed confirm-only exception)
- index, login, signup wallet-auth modal: DEV scenario pills (happy / wrong network / not installed / user rejected)
- dashboard-kyc-blocked, dashboard-kyc-retry: are themselves edge-state variants

## Added in this pass (14 pages)

Each gets the standard bar plus the cases listed. Blocking cases disable `main` primary CTAs.

- login_2: invalid credentials, account locked (blocking), rate limited (blocking), server error
- signup_2: email already registered, weak password, rate limited (blocking), server error
- verify-email: wrong code, code expired, too many attempts (blocking), server error
- setup-2fa: wrong code, code not arriving, server error
- verify-2fa: wrong code, code expired, too many attempts (blocking), server error
- forgot-password: unknown email (info: no account enumeration), rate limited (blocking), server error
- password-reset: link expired (blocking), link already used (blocking), weak password, server error
- magic-link-sent: resend cooldown (blocking), delivery delayed, server error
- wallet-creation: creation failed, network error
- account-security: sessions load error, revoke failed, re-auth required (info)
- stake: approval rejected, stake tx failed, not enough CTC for gas (blocking), pool paused (blocking), network busy
- governance: not connected (blocking), no voting power (blocking), proposals unavailable, vote failed
- proof-of-reserve-public: attestation feed unavailable, attestation stale (warning)
- purchase-receipt: receipt not found (blocking, hides the receipt)

## Deliberately skipped

Docs, specimens and internal utilities: brand-style-guide, email-notification-templates, instructions, connect-social, reset-storage, flow-stablecoin-management, flow-stablecoin-remittance, _all-screens.

## Open questions

- login/signup/verify pages: exact lockout windows (15 min) and code lifetimes (10 min email, 60 min reset link) are placeholders. Confirm against the auth PRD when it lands.
- stake: gas and pause copy assumes the swap wallet model (2 prompts, user pays gas). Flag if the staking PRD differs.
