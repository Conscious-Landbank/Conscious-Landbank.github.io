# UNERA hUSD Portal — Feature Audit, Gap Analysis & Change Log

**Date:** 2026-06 · **Artifact audited:** `UNERA hUSD Portal.dc.html`
**Requirements:**
- *Stablecoin — hUSD Issuance & Redemption* (Confluence pageId **62259435**, v4)
- *Stablecoin — Dashboard* (Confluence pageId **66912287**, v4)

**Method:** Every feature of the portal was checked against the two specs, then
against **Nielsen Norman Group usability heuristics** and **Gestalt grouping
principles**. Pre-audit snapshot preserved at
`_audit/UNERA hUSD Portal (pre-audit v1).dc.html`.

---

## 1. Executive summary

The pre-audit portal was visually strong but **materially out of scope** and carried
**several trust-copy claims that contradict the specs**. The single largest problem was
scope: the app shipped Earn/Savings (yield), cross-chain Bridge, a Rewards programme, an
issuer/Treasury "business" console, crypto (USDC) redemption payout, auto-earn,
auto-sweep, and recurring buys — *every one of which is explicitly listed as out of scope*
by both specs. Several "trust" strings ("Fully reserved", "no queue", "always redeemable
instantly", "Every hUSD, fully backed") directly violate the Dashboard copy guidelines and
the redemption SLA rules.

This pass removed the out-of-scope surfaces, corrected the trust copy, and implemented the
highest-value missing spec requirements (60-second quote expiry, bidirectional amount
input, spec status-label vocabulary, public/KYC-pending/verified account states, a
notification center, contract-info + audit-status metadata, and last-updated timestamps).

---

## 2. Scope conformance (Issuance §1, Dashboard §2) — **HIGH**

Both specs enumerate an identical out-of-scope list: *remittance, swap, trade, lending,
DeFi, donation UX, crypto payout, hCAD, organization-redemption API, governance voting,
DeFi yield products*. The pre-audit portal violated this with full working screens.

| Feature shipped pre-audit | Spec verdict | NNG heuristic | Action |
|---|---|---|---|
| **Earn · Savings** (shUSD, 4.8% APY, fixed terms) | Out of scope (DeFi/yield) | #2 Match to real world / #10 minimalism | **Removed** (screen, nav, KPI card, hero chip) |
| **Bridge · cross-chain** | Out of scope (not issuance/redemption) | #2, #10 | **Removed** |
| **Rewards** programme + tiers + referral | Out of scope | #10 | **Removed** |
| **Business / Treasury / Issuance-API console** | Out of scope (org-redemption API; Platform Layer) | #2 | **Removed** (screen + mode toggle) |
| **Redeem → USDC on-chain** (crypto payout) | Out of scope ("crypto payout") | #2, #9 error prevention | **Removed** — redemption is bank-only fiat |
| **Auto-earn** toggle on mint | Out of scope (yield) | #10 | **Removed** |
| **Auto-sweep to bank** | Not in spec; implies automated redemption | #10 | **Removed** |
| **Recurring buy** (weekly/monthly auto-mint) | Not in spec | #10 | **Removed** |
| "Yield to you · APY" dashboard KPI + "earned 30d" | Out of scope | #2 | **Replaced** with "In progress" txn KPI |

> Reserve **yield → Humanity Centres** allocation is retained on Proof of Reserve: it is an
> in-layer reserve-income disclosure (Dashboard OQ-07), not a user yield product.

---

## 3. Trust & safety copy (Dashboard §8, Issuance §3/§7.3) — **HIGH**

The specs are explicit: *avoid "Fully backed" as a dashboard status; redemption is not
instant and may be queued; never imply an instant/no-queue redemption.*

| Pre-audit string | Problem | Replacement |
|---|---|---|
| "Fully reserved · 1:1 USD · attested daily" (hero badge) | "Fully reserved" used as status | "1:1 USD-backed · reserve data current · updated 14s ago" |
| "Every hUSD, fully backed." (PoR H1) | "Fully backed" as status | "Reserve transparency for every hUSD." |
| "100% on demand … no gates, no queues, no lockups" | Implies instant redemption | "$355.1M ready … Redemptions are not instant — standard requests target one business day." |
| "Always redeemable 1:1 · no minimum, no queue" | Contradicts §7.3 (queued + ~1 day) | "Redeem 1:1 to fiat · burn confirmed on-chain before any payout · ~1 business day" |
| "fully backed, always" (Get subhead) | Status claim | "…so every token is backed 1:1 at issuance." |
| "Instant · cash & USDC" (coverage bar) | "Instant" | "Available now · cash & USDC" |

NNG #1 (visibility of system status) and #9 (help users recognize reality) both favor honest,
hedged language; over-promising erodes trust on a regulated product.

---

## 4. Missing spec requirements implemented this pass — **HIGH/MED**

| Requirement | Spec ref | NNG / Gestalt | Status |
|---|---|---|---|
| **60-second quote expiry** with visible countdown, rate source, and disabled confirm on expiry + "Refresh quote" | Issuance §3 ("Quotes expire after 60s; expired cannot be confirmed") | #1 visibility, #5 error prevention | **Added** |
| **Bidirectional amount input** (enter funding *or* hUSD, other side computed live) | Issuance §3, §4 | #3 user control, #7 efficiency | **Added** (You-pay ↔ You-receive both editable) |
| **Spec status-label vocabulary** on mint/burn timelines (Received → Under review → Processing → Completed) | Issuance §8 | #2 match real world, #1 visibility | **Added** |
| **Public / KYC-pending / Verified account states** with a context banner + gated CTAs | Dashboard §3, §7 | #1 visibility, #5 prevention | **Added** (state switcher + banner; Issue CTA gated to L2) |
| **Notification center** (mint completed, redemption progress, bank payout, service announcement) | Issuance §4/§11, Dashboard §4 | #1 visibility | **Added** (bell + unread badge + panel) |
| **Contract info** (network, decimals, status, explorer) | Dashboard §5.6 | #2, #6 recognition | **Added** to PoR |
| **Audit report status** (Latest / Archived) | Dashboard §5.5 | #6 recognition | **Added** |
| **Last-updated timestamps / data-source labels** | Dashboard §5.1/§8/§10 | #1 visibility | **Added** on hero, PoR composition, balance, quote |
| **Wallet/sign-in reflects auth state** (Log in vs wallet pill) | Common Rules §3 | #1 visibility | **Added** (public shows Log in) |

---

## 5. Gestalt review (layout integrity)

- **Proximity / common region:** card grouping is strong — KPI strip, PoR panels, and the
  quote summary read as units. Retained.
- **Similarity:** status pills now share one vocabulary and color language (teal=good,
  gold=in-progress, pink=down), so users learn the system once. Improved by unifying labels.
- **Continuity:** the vertical status timeline (dot + connector) is a good use of continuity;
  kept and re-used for both mint and burn.
- **Figure/ground:** the dark theme + ambient glows keep adequate contrast; the disabled
  Get CTA now recedes (panel/mute) so the enabled state is the clear figure.

---

## 6. Recommended next (not built this pass)

These are spec-valid but were de-scoped to keep this pass focused and low-risk:

1. **Crypto deposit-address experience** (Issuance §6.2): unique address, **QR code**,
   network/asset allowlist note, and **confirmation-depth** progress on the Get→crypto path.
   (Today the review step shows a copyable address but no QR/confirmation meter.)
2. **Wallet verify-by-signature gate** (Common Rules §3): an explicit "verify ownership by
   signed message" step before the first confirm, beyond the connect state.
3. **Redemption "Queued" state** surfaced in the burn timeline + a safe SLA message when
   liquidity is short (§7.3 LIQUIDITY_QUEUED).
4. **Transaction detail + downloadable receipt** view (Issuance §4, §9.2
   `/transactions/{id}/receipt`) with the locked rate/fee snapshot.
5. **Activity filters** (date range + type) and explicit `Failed/Expired` rows (§8).
6. **CAD funding as FX + markup** (OQ-01 / Acceptance "CAD displays FX and markup, not a
   swap") once dual-currency is confirmed at launch.
7. **Maintenance / data-unavailable / blocked-jurisdiction** banners (Dashboard §7, §11) —
   the banner component now exists; only the public & pending states are wired.
8. **2FA = email one-time code** and **Sumsub-hosted KYC** wording in the Verify screen, per
   the Authentication & KYC page (flagged in the prior gap analysis).

---

## 7. Change log (files touched)

- `UNERA hUSD Portal.dc.html` — removed 4 out-of-scope screens (~67k chars); reworked nav
  (dropped More menu + issuer mode; surfaced Activity; added account-state switcher +
  notification center); rebuilt the logic class (pruned earn/bridge/rewards/business state &
  handlers; added quote-expiry, bidirectional input, account states, notifications); fixed
  trust copy across Portfolio, Get, Redeem, PoR; added contract-info + audit statuses.
- `_audit/UNERA hUSD Portal (pre-audit v1).dc.html` — preserved snapshot.
- Design system (`readme.md`, `guidelines/`, `components/`) — updated to match (see §8 below).

This document supersedes `_audit/PRD-gap-analysis.md` (which referenced the earlier combined
PRD v14, pageId 61276166) for the two pages above.

---

## 8. Pass 2 — gap closure (2026-06, FE-155)

Re-audited `UNERA hUSD Portal.dc.html` against the two specs (both v4) and the prior §6
"Recommended next" list. All eight remaining gaps were built in place, using only existing
design-system tokens, patterns, and the dark Portal chrome — no new colors or components.

| # | Gap (spec ref) | What was built |
|---|---|---|
| 1 | **Crypto deposit experience** (Issuance §6.2/§6.5) | Review step now shows a **QR code**, the **unique deposit address** ("expires in 60 min · never reused"), and a red **allowlist warning** ("Only send {asset} on {network}…"). Mint status step gained a **confirmation-depth meter** (X/12) and the spec's crypto state-flow labels (Transfer detected → Confirming on-chain → Under review → Minting → Completed). |
| 2 | **Wallet verify-by-signature gate** (Common Rules §3) | A **sign-message modal** now intercepts the first Confirm (mint *and* burn): gasless ownership proof of `0x74…3a8f` with a nonce, "Sign to verify ownership", then the action proceeds. Verified once per session. |
| 3 | **Redemption Queued state** (§7.3 LIQUIDITY_QUEUED) | Redemptions above the liquidity threshold (~$20k) surface a **Queued-for-liquidity** banner on the amount step, an honest **~1–2 business day** ETA, and an extra **"Queued for liquidity"** stage in the burn timeline. |
| 4 | **Transaction detail + receipt** (§4, §9.2 `/receipt`) | Every Activity row (and the mint "View receipt") opens a **receipt modal** with the locked rate/fee snapshot, method, destination, tx hash, safe failure note, and a Download action. |
| 5 | **Activity filters + Failed/Expired** (§8) | **Filter chips** (All / Issuance / Redemption / In progress / Failed-expired) + a "Last 90 days" range pill, an **empty state**, and **Failed** + **Expired** example rows with safe copy. |
| 6 | **Public aggregate activity feed** (Dashboard §5.4) | New **"Network activity"** card on the dashboard — anonymized aggregate Mint/Redeem events ("Mint completed — +12,500 hUSD — 2 min ago"), cumulative issued/redeemed + 24h volume, with a no-PII disclaimer. |
| 7 | **Blocked / maintenance / data-unavailable states** (Dashboard §7, §11) | The nav account toggle became a 6-state **preview selector**. Added **Blocked region** (red banner, actions gated, generic copy), **Maintenance** (actions paused), and **Data unavailable** (neutral banner, dynamic hero label "Reserve data unavailable · last snapshot 6m ago", transactions unaffected). CTA reasons updated per state. |
| 8 | **CAD funding as FX + markup** (§5, Acceptance) | Fiat path gained a **USD / CAD** funding-currency toggle. CAD shows the live **FX rate (1 CAD = 0.7300 USD)**, computes hUSD via FX + markup bidirectionally, and carries the explicit "**issuance — not a swap or trade**" note. A completed CAD issuance also appears in history. |

**Scope & copy guardrails honored:** no out-of-scope surfaces added; redemption stays
bank-only fiat; no "fully backed"/"instant" claims; compliance reason codes never exposed
(failures show generic safe copy). The QR is a deterministic placeholder matrix — wire to a
real address-encoder for production.

**Files touched:** `UNERA hUSD Portal.dc.html` (template + logic class, edited in place).

---

## 9. Pass 3 — related-pages audit (2026-06, FE-155 re-check)

Re-fetched FE-155 and both specs (still **v4**, unchanged) and audited deeply against the
**linked pages** the two specs reference: *Wallet Connection* (pageId 30081028, **v15**),
*Authentication & KYC* (20152341, **v7**), and *UNERA Transaction History* (68583557, v5,
Platform-layer — informational only). This surfaced cross-cutting requirements the two main
specs only imply. All built in place with existing design-system tokens/patterns.

| Gap (spec ref) | What was built |
|---|---|
| **Connect-wallet flow** (Wallet Connection §5/§6: "single Connect-wallet entry: MetaMask, WalletConnect, Coinbase; QR modal; never hold keys") | A **Connect-wallet modal** with **MetaMask / WalletConnect / Coinbase**, a **WalletConnect QR sub-step** (scan → "I've scanned it" → connecting), and a "read-only until you sign" reassurance. The disconnected nav shows a **Connect wallet** button. |
| **Wallet management** (Wallet Connection §6.6 switch/disconnect, §9.3 network detection/validation) | Connected pill gained a **dropdown**: address + provider, a **verified-by-signature chip**, **network row + Ethereum/Arbitrum/Base switch**, a "simulate unsupported network" demo, and **Disconnect**. An **Unsupported-network banner** ("Switch to Ethereum") appears when the wallet is on an out-of-list chain, and the pill border/dot turn red. Hero wallet line now reflects the live network. |
| **"KYC not started" state** (Dashboard §7; Auth/KYC §4.6 status = Not Started → L1) | New dashboard state: logged-in L1 user sees a **"Complete KYC to issue or redeem hUSD"** banner + Complete-KYC CTA, distinct from in-review. |
| **"KYC approved, no wallet connected" state** (Dashboard §7; Issuance Common Rules §3) | New state: verified user with no wallet sees a **"Connect your wallet to issue or redeem"** banner, and the Issue/Redeem CTAs become an enabled **"Connect wallet to continue"** that opens the modal — issue/redeem entry points shown but gated to connect-before-confirm. |
| **"KYC rejected" state** (Auth/KYC §4.6 status = Rejected → Restricted) | New state: **"Verification needs attention"** banner with review/support next step; issuance & redemption disabled. |
| **Connect-before-confirm gate** (Issuance Common Rules §3: "cannot confirm until the wallet is connected *and* verified by signature") | The confirm path now requires **connection first, then signature**: if no wallet, the confirm/CTA opens the connect modal; after connecting it chains into the existing sign-message gate. |

The preview-state selector now covers **9 states** (Public · KYC-not-started · KYC-in-review ·
KYC-rejected · Approved-no-wallet · Verified-connected · Blocked · Maintenance · Data-unavailable),
fully matching Dashboard §7 + Auth/KYC §4.6.

**Scope note:** FE-155 frames Auth/KYC/Wallet-Connection as *foundational* features specced
under their own tickets (FE-2, FE-26). The connect modal, wallet picker, and network logic
here are the **portal-side representation** of those states that Dashboard §7 and Issuance
Common Rules §3 require the dashboard/flows to handle — not a replacement for the foundational
implementation. The WalletConnect QR is a deterministic placeholder; wire to a real WC relay
for production.

**Files touched:** `UNERA hUSD Portal.dc.html` (template + logic class, edited in place).
