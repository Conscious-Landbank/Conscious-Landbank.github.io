# UNERA / Conscious Landbank MVP – Progress Evaluation

**Date:** 07 Mar 2026  
**Status:** Frontend MVP ~70–75% complete; backend and integrations mostly mock

---

## How to Access the Product

### Start the server

```bash
cd "/Users/minhnguyenhoang/009 Conscious Landbank/Cursor/CLB"
node server.js
```

The app runs at **http://localhost:8080/**

### Entry points

| Page | File |
|------|------|
| Landing | `index.html` (or `/`) |
| User signup | `signup_2.html` |
| User login | `login_2.html` |
| Operator login | `operator-login.html` |
| Explore Humanity Centres | `explore-centres.html` |
| Public Proof of Reserve | `proof-of-reserve-public.html` |

### User flow

- **Email flow:** Sign up → Email verification → Name → 2FA (optional) → KYC (optional) → Dashboard
- **Wallet flow:** Connect MetaMask / WalletConnect → 2FA → Dashboard

---

## MVP Achievement Summary

| Category | MVP Plan | Status | Notes |
|----------|----------|--------|-------|
| **Base System** | | | |
| Authentication Service | Account creation, 2FA, role-based access | ~90% | UI complete; backend is mock/localStorage |
| KYC Service | Optional for MVP | ~85% | UI and flow; no real provider integration |
| Notification Service | Real-time, email, SMS | ~40% | In-app only; no email/SMS |
| Security & Audit Logging | Events, alerts | ~50% | UI only; no real logging backend |
| **Product – Public Users** | | | |
| Humanity Centre Directory | Grid, search, filter | ~95% | UI complete |
| HC Detail Page | Overview, donation info, stats, donate | ~90% | UI complete; stats likely mock |
| Purchase Stablecoins | INTERAC, card, crypto, exchange rate | ~60% | UI flows; no real payment APIs |
| Wallet Connection | MetaMask, WalletConnect | ~85% | Real integration |
| Stablecoin Management | Balances, transactions, quick actions | ~75% | UI + mock data |
| Delivery Confirmation | Status, history, receipt | ~70% | UI only |
| Remittance | Send, payee, crypto-to-crypto | ~65% | UI flows; no real settlement |
| Donation | Service, history | ~85% | UI complete |
| **Product – Operator** | | | |
| Stablecoin Issuance Dashboard | Mint, audit logs, supply | ~70% | UI only |
| HC Management | Create, edit, upload, activate | ~75% | UI only |
| PoR Management | Recording, display, backing ratio | ~75% | UI + static data |

**Overall MVP completion:** ~70–75% (UI-heavy; backend and integrations mostly mock).

---

## What's Done vs. What's Missing

### Implemented

**Auth**

- Signup, login, email verification, 2FA (SMS/email/app), password reset, magic link
- MetaMask and WalletConnect
- Operator vs user role separation

**Humanity Centre**

- Directory with search/filter (`explore-centres.html`)
- Detail page with overview, donation info, stats, donate CTA (`centre-detail.html`)

**Purchase flows**

- Payment method selection (Interac, card, bank)
- `add-money.html`, `exchange.html`, `convert.html` with guided flows
- Exchange rate display (likely static/mock)

**Wallet**

- MetaMask and WalletConnect via `js/wallet/manager.js`
- `wallet-enhanced.html` with balances, transactions, quick actions

**Donation**

- `donate.html` and `donation-history.html`

**Send / Remittance**

- `send-enhanced.html` with send-to-wallet and payee management

**Operator tools**

- Issuance (`operator-issuance.html`), HC management (`operator-hc-management.html`), PoR (`operator-por.html`)

**Proof of Reserve**

- Public page (`proof-of-reserve-public.html`) with backing ratio and audit info

**Notifications**

- In-app notification bell and panel (localStorage)

**Security**

- `account-security.html` with activity log and suspicious-activity alerts

### Gaps vs. MVP Plan

**Backend**

- `server.js` is a static file server only
- No API, database, or real auth/KYC/payment logic

**Payment integrations**

- No INTERAC e-Transfer API (e.g. VoPay, Plaid)
- No card processor (Stripe, etc.)
- No crypto on-ramp (MoonPay, Ramp, etc.)

**Notifications**

- No email (SendGrid, Resend, etc.)
- No SMS (Twilio, etc.)
- Only in-app notifications

**KYC**

- No integration with SumSub, Jumio, Onfido, etc.

**Audit / logging**

- No server-side event logging or alerting

**Exchange rate**

- No live FX API (e.g. Open Exchange Rates, Fixer)

**Blockchain**

- No hCAD/hUSD smart contracts or on-chain minting

---

## Comparison With Similar Products

| Feature | UNERA (Current) | The Giving Block | CHEQs | Circle / Ethena PoR |
|---------|-----------------|------------------|-------|---------------------|
| Crypto donations | UI only | Yes, live | Yes | N/A |
| Fiat on-ramp | UI only | Card | N/A | N/A |
| INTERAC (Canada) | UI only | Via partners | N/A | N/A |
| KYC integration | UI only | Yes | Yes | Yes |
| Real-time PoR | Static UI | N/A | Yes | Yes |
| Email/SMS notifications | No | Yes | Yes | Yes |
| Audit trail | UI only | Yes | Yes | Yes |
| Multi-chain | Config only | Yes | Yes | Yes |

---

## Recommended Next Steps (Prioritized)

### Phase 1: Backend & Auth (2–3 weeks)

**Backend**

- Add Node/Express (or similar) API
- Use PostgreSQL or MongoDB for users, HCs, transactions
- Implement JWT-based auth and session handling

**Auth**

- Move from localStorage to server-side sessions
- Integrate a real 2FA provider (e.g. Twilio Verify, Authy)

**KYC**

- Integrate SumSub, Jumio, or Onfido
- Store verification status in DB and expose via API

### Phase 2: Payments (3–4 weeks)

**INTERAC e-Transfer**

- Integrate VoPay or Plaid (Canada)
- Implement request-money flow and webhooks

**Card payments**

- Integrate Stripe or similar
- Implement 3DS and PCI-compliant flows

**Crypto on-ramp**

- Integrate MoonPay, Ramp, or Transak for USDC/USDT → hCAD

**Exchange rate**

- Integrate Open Exchange Rates or Fixer
- Show live rates and lock quotes at confirmation

### Phase 3: Notifications & Audit (1–2 weeks)

**Email**

- Integrate SendGrid or Resend
- Send: verification, purchase confirmation, donation receipt

**SMS**

- Integrate Twilio
- Use for 2FA and critical alerts

**Audit logging**

- Log all important events (auth, payments, donations, operator actions)
- Add alerts for suspicious patterns

### Phase 4: Blockchain & PoR (4–6 weeks)

**Smart contracts**

- Deploy hCAD/hUSD on Base or Ethereum
- Implement mint/burn and basic access control

**Proof of Reserve**

- Connect PoR UI to on-chain data
- Add third-party attestation (e.g. Chainlink, Circle-style reports)

### Phase 5: Polish & Launch (2–3 weeks)

**Testing**

- E2E tests (Playwright/Cypress)
- Security review (OWASP, auth, payments)

**Deployment**

- Deploy frontend and API (e.g. Vercel + Railway, or similar)
- Configure production env vars and secrets

**Compliance**

- FINTRAC registration (Canada)
- Privacy policy and terms of service

---

## Quick Wins (1–2 days each)

- Add a simple backend API and replace critical localStorage usage
- Integrate one email provider for verification and receipts
- Add a basic exchange rate API for display
- Add error boundaries and clearer error messages
- Add loading states for wallet connection and payments

---

## Summary

You have a strong frontend MVP (~70–75% of the plan) with clear flows for auth, Humanity Centres, purchase, wallet, donation, remittance, and operator tools. The main gaps are:

1. No real backend or database
2. No real payment integrations (INTERAC, card, crypto)
3. No email/SMS notifications
4. No KYC provider integration
5. No blockchain or smart contracts for hCAD/hUSD

Focusing on Phase 1 (backend + auth) and Phase 2 (payments) will move the product closest to a launchable MVP.
