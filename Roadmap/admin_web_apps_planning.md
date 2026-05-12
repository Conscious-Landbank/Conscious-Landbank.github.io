# Admin Web Apps Planning

Source: `Roadmap/Feature Tracking.html` (extracted May 12, 2026)

Two admin web apps are tracked separately. Both are **Status: Not-Started**. Features and sub-features below are regrouped by admin app, ranked by priority within each.

---

## Part 1 — UNERA Admin

Operates on the **consumer UNERA app** side: customer accounts, KYC reviews, and the Humanity Centre (HC) directory content.

### Priority 1 — Top

#### 1. Authentication Service

Sub-features:

- Account Creation
- Authentication Service including 2FA
- Role-based access control for users and operators

Requirement: Confirmed · Status: Not-Started

> Depends on the base Authentication Service (currently In-Progress for the consumer UNERA app). Same service, but admin scope requires elevated RBAC and operator roles.

### Priority 4 — Low

#### 2. HC Management (Create/Edit)

Sub-features:

- Create HC
- Edit HC
- Upload images
- Activate/deactivate

Requirement: Confirmed But May Change · Status: Not-Started

#### 3. Account Management

Sub-features:

- Lock/Unlock Account
- Force reset password

Requirement: Confirmed · Status: Not-Started

#### 4. KYC Management

Sub-features:

- View KYC
- Update KYC Status

Requirement: Confirmed · Status: Not-Started

### One-glance ranking — UNERA Admin

| Rank | Priority | Feature |
|---|---|---|
| 1 | 1 - Top | Authentication Service |
| 2 | 4 - Low | HC Management (Create/Edit) |
| 3 | 4 - Low | Account Management |
| 4 | 4 - Low | KYC Management |

---

## Part 2 — UNERA Stablecoin Admin

Operates on the **issuance / treasury** side: minting controls, Proof of Reserve, stablecoin-side accounts and KYC.

### Priority 1 — Top

#### 1. Authentication Service

Sub-features:

- Account Creation
- Authentication Service including 2FA
- Role-based access control for users and operators

Requirement: Confirmed · Status: Not-Started

> Same dependency note as UNERA Admin auth — operator-scoped RBAC layered on top of the base Authentication Service.

### Priority 2 — High

#### 2. Stablecoin Issuance Dashboard

Sub-features:

- Minting Service
- Minting audit logs
- Supply

Requirement: Confirmed But May Change · Status: Not-Started

#### 3. Proof of Reserve (PoR) Management

Sub-features:

- PoR Recording Service
- PoR Display Service
- Backing ratio

Requirement: Confirmed But May Change · Status: Not-Started

> These two are the pillars of operator trust in the stablecoin — minting (supply control) and PoR (reserves transparency). UX-wise they're inseparable and should be designed as a connected workspace.

### Priority 4 — Low

#### 4. Account Management

Sub-features:

- Lock/Unlock Account
- Force reset password

Requirement: Confirmed · Status: Not-Started

#### 5. KYC Management

Sub-features:

- View KYC
- Update KYC Status

Requirement: Confirmed · Status: Not-Started

### One-glance ranking — UNERA Stablecoin Admin

| Rank | Priority | Feature |
|---|---|---|
| 1 | 1 - Top | Authentication Service |
| 2 | 2 - High | Stablecoin Issuance Dashboard |
| 3 | 2 - High | Proof of Reserve (PoR) Management |
| 4 | 4 - Low | Account Management |
| 5 | 4 - Low | KYC Management |

---

## Side-by-side comparison

| Feature | UNERA Admin | UNERA Stablecoin Admin |
|---|---|---|
| Authentication Service | P1 - Top | P1 - Top |
| Stablecoin Issuance Dashboard | — | P2 - High |
| Proof of Reserve (PoR) Management | — | P2 - High |
| HC Management (Create/Edit) | P4 - Low | — |
| Account Management | P4 - Low | P4 - Low |
| KYC Management | P4 - Low | P4 - Low |

## What changes when you read it this way

1. **UNERA Admin is a lighter app.** Four features, only one P1, no P2. It is essentially: operator login + content management (HC) + customer support tools (account, KYC). A "back-office CMS + helpdesk" footprint.
2. **UNERA Stablecoin Admin is the heavier, higher-stakes app.** Five features, with both P2 items concentrated here. Issuance Dashboard + PoR Management together form the institutional-grade core — that's where finance-floor UX standards apply.
3. **The duplicate features (Auth, Account Management, KYC Management) are still flagged.** Even kept as two apps per the current decision, you'll want a shared design-system pass on these patterns so both apps look and behave the same — operators shouldn't have to relearn lock/unlock or KYC review when switching contexts.
