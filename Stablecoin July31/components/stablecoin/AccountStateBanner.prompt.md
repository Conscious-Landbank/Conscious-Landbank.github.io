# AccountStateBanner

One honest banner for the user's access state + operational notices.
Source: *Stablecoin — Dashboard* (66912287) §7 user states, §11 operational notices.

## When to use
Directly under the nav spine, **one at a time**. Drives the difference between a public
visitor, a KYC-pending user, a blocked user, and a service interruption.

## Rules
- Never expose a compliance reason, sanctions detail, or risk score — safe guidance + a next step only.
- Never show "Fully backed" health labels in the `data_unavailable` state; show the last-known timestamp.
- Pair with gating: when state is not `verified`, the Issue/Redeem confirm CTA must be disabled.

## States
`public` · `kyc_not_started` · `kyc_pending` · `blocked` · `maintenance` · `data_unavailable`
(each carries preset title/body/cta; override via props when needed).
