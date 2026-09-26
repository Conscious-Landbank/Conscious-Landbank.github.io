# UNERA hUSD — Master QA Test-Case Matrix

**Version:** 2.0 · **Compiled:** 2026-07-18 · **Supersedes v1.0**
**Requirements re-fetched live from Confluence/Jira** (see source table for exact versions).
**Purpose:** Single source of truth for functional, validation, edge- and error-case testing
across all three UNERA stablecoin artifacts. Every screen, component, and field is enumerated
with happy-path, negative, boundary, empty, and error-recovery cases, each traced to a real
requirement ID.

> ⚠️ **Read Section 0 first.** Re-fetching the live specs surfaced concrete gaps where the
> current build diverges from spec. Those are logged as defect-candidates (`DISC-xx`) and must
> be triaged before/alongside functional testing.

## Artifacts under test (AUT)

| Key | File | What it is |
|---|---|---|
| **PORT** | `UNERA hUSD Portal.dc.html` | Live portal — issuance, redemption, PoR, activity, verify, wallets, account/service states |
| **AUTH** | `ui_kits/auth/index.html` | Authentication & KYC kit — sign-in, sign-up, 2FA, password reset, KYC handoff, session |
| **KIT** | `ui_kits/stablecoin-app/index.html` | Stablecoin-app reference kit — dashboard, issue, redeem, PoR, history, KYC (L1/L2) |

## Requirement sources (live, conscious-landbank.atlassian.net)

| Page/Issue ID | Title | Ver (live) | Used for |
|---|---|---|---|
| 61276166 | UNERA Stablecoin Portal PRD | **v14** | Scope, limits, states, §6.7 permitted UI, transaction index §6.9 |
| 62259435 | Stablecoin — hUSD Issuance & Redemption | **v5** | Issue/redeem flows, quotes, bidirectional input, status labels §8 |
| 66912287 | Stablecoin — Dashboard | **v4** | Dashboard, PoR, user states §7, copy guidelines §8, freshness §10 |
| 20152341 | Authentication & KYC | **v7** | 3 access levels, email 2FA, Sumsub KYC (4 statuses), registration §4.1 |
| 21987332 | SAD-3: Authentication Architecture Design | **v27** | Email-2FA + 10 backup codes, OTP TTLs, rate limits, password policy, 7 KYC statuses |
| 22806563 | Session Mgmt: Auto Logout & Remember Me | **v8** | Idle-warning modal, 30-min desktop logout, mobile 7-day Remember Me |
| 68321283 | Standard Stablecoin Smart Contract | **v5** | ERC-20, decimals 18, non-upgradeable, pause/blacklist, EIP-2612/3009 gasless |
| 30081028 | Wallet Connection | **v17** (upd. 2026-07-17) | Bind 1 email→N wallets, verified/unverified modes, networks, switching |
| 65634349 | Notification Services | **v8** | Stablecoin events NOTI-SC-01..06, notification-center + toast/badge web-app spec |
| FE-155 | Jira — UI/UX Design Stablecoin portal | (task, Highest) | Epic tying Auth/KYC/Wallet + Issuance/Redemption + Dashboard |

## How to use this doc

- Triage **Section 0** discrepancies first; each is a candidate defect to confirm or waive.
- Then run Sections 1–4 per artifact. **Preconditions** tell you what state to reach first.
- Fill **Status**: `PASS` / `FAIL` / `BLOCKED` / `N/A`. Log defects against the Test ID.
- **Priority:** `P1` blocker (compliance / money-movement / data-integrity / cannot-proceed),
  `P2` major (broken flow, wrong copy on a trust surface), `P3` minor (cosmetic).
- **Demo triggers** are wired shortcuts to reach error paths without a backend (listed per suite).

### Recurring expectations (legend)
- **Anti-enumeration** (Auth&KYC §4; SAD-3): UI never reveals whether an email is registered.
- **Trust-copy guardrail** (Dashboard §8): never "fully backed/reserved/instant/no-queue" as a
  status; redemption is "~1 business day" (Issuance RED-05); backing is a model ("backed 1:1").
- **Scope guardrail** (PRD §6.7/§6.8): no swap/trade, earn/yield, bridge, rewards, business
  console, crypto payout, remittance, governance, or non-hUSD coins anywhere.
- **Gating** (Auth&KYC §3): L0 = public PoR only; L1 (email+pw) = hold/receive/view; L2 (KYC
  approved) = issue & redeem.
- **No reason-code leak** (PRD CMP-01, IDX-05, RAIL-03): user copy never exposes compliance
  reasons, sanctions/PEP, risk scores, or provider secrets.

---

# 0 · Spec-vs-build discrepancies & open decisions (triage first)

Found by diffing the current build against the live specs. Each needs a verdict: **fix**,
**waive (product decision)**, or **confirm intended**.

| ID | Area | Spec says | Build does | Pri | Suggested action | Status |
|---|---|---|---|---|---|---|
| DISC-01 | Wallet networks | Supported networks = **Ethereum, Base, Sepolia** (Wallet Connection §6.3) | Portal `SUPPORTED_NETWORKS = ['Ethereum','Arbitrum','Base']` — includes **Arbitrum** (not in spec), omits **Sepolia** | P1 | Confirm Arbitrum is an approved L2 or replace with spec list; decide if Sepolia (staging) is shown | **FIXED** — network switch = Ethereum/Base/Sepolia; crypto-deposit networks = Ethereum/Base (mainnet + approved L2); banner copy updated |
| DISC-02 | Wallet bind limit | "We **do not restrict** the number of wallet addresses linked to a single email" (§6.1) | Portal caps `MAX_WALLETS = 6` and blocks the 7th | P2 | Confirm the 6-cap is a deliberate product decision; otherwise remove the cap | **FIXED** — cap removed; binding no longer limited |
| DISC-03 | Duplicate-bind rule | Reject only if the wallet is **already bound to a *different* email/account** (§6.1) | Portal blocks re-adding an address already on the *same* account | P2 | Add the cross-account rejection copy ("already linked to another account"); same-account dupe block is fine to keep | **FIXED** — cross-account rejection message added ("already linked to a different UNERA account") |
| DISC-04 | Verified vs unverified modes | **MetaMask = unverified/read-only, NO signing** (§6.1.1); **WalletConnect = verified via signature** EIP-4361/1271/6492 (§6.1.2); **Coinbase = both** (§6.1.3) | Portal treats the sign-message gate generically; "verified by signature" chip not clearly tied to provider mode | P1 | Distinguish modes: MetaMask connect must not force a signature; WalletConnect must; "verified" chip only for verified-mode wallets | **FIXED** — MetaMask/Coinbase connect read-only (no auto-sign); WalletConnect verifies at connect; sign gate still upgrades read-only wallets before any mint/redeem (Common Rules §3) |
| DISC-05 | Unbind scope | "Unbinding/changing wallet **associations is out of scope for this phase**" (§6.1); §6.6 allows disconnect/switch of the *active connection* | Portal Wallets page offers **Remove** (unbind from account) | P2 | User asked for management → likely waive as intended, but flag: account-level unbind is beyond spec Phase-1; keep connection-level disconnect/switch | **CONFIRMED (kept)** — user confirmed wallet management is wanted; Remove + Disconnect retained. Product decision to run ahead of Wallet-Connection Phase-1 scope |
| DISC-06 | KYC status model | SAD-3 §KYC = **7 statuses** (none, initiated, pending, on_hold, approved, retry_needed, blocked→L0 locked); Auth&KYC = 4 (Not Started/In Review/Approved/Rejected) | Portal models 4 (none, pending, rejected, approved) | P2 | Consider adding `retry_needed` (soft reject/resubmit) and `on_hold` (manual review), and `blocked`→locked; at minimum verify the 4 present states map correctly | **FIXED** — added `kyc_on_hold` (manual review), `kyc_retry` (resubmission), `kyc_blocked` (access locked) as portal states with banners, CTA reasons, and preview-selector entries |
| DISC-07 | KYC delivery | KYC is a **Sumsub-hosted SDK** handoff (Auth&KYC §4.6, SAD-3); UNERA never stores raw docs | Auth kit renders its own ID-front/back + selfie capture panes | P3 | Acceptable as visual placeholder, but the real flow is a provider-SDK handoff, not native capture; note in copy/behavior | **FIXED** — capture panes reframed as the verification partner's hosted secure flow ("documents go straight to them, never to UNERA"); partner-handoff framing on start/session/flow/selfie panes |
| DISC-08 | OTP expiry copy | Email-verify OTP = **24h**; login-2FA OTP = **5 min**; 2FA-setup OTP = **5 min**; reset link = 15 min (SAD-3 Config Ref) | Auth kit magic-link says "10 minutes"; OTP panes don't state TTL | P3 | Align stated expiries: verify-email 24h, login/setup 2FA 5 min; magic-link is a separate passwordless path | **FIXED** — verify-email states "valid for 24 hours"; 2FA setup states "expires in 5 minutes"; login-2FA already 5 min; magic-link left at 10 min (separate passwordless path) |
| DISC-09 | Notification web-app spec | Toasts (5s/8s/persistent, max 3, top-right→top-center <768px), badge "99+", browser-tab "(N) title", WebSocket + 30s poll, ARIA `role=alert`/`status`, "Mark all as read", "You're all caught up" empty state (Notif §7.5.2) | Portal has bell + panel + unread badge; toasts / tab-title / WebSocket likely absent | P3 | Prototype-acceptable; list which web-app behaviors are out of prototype scope vs to-build | **FIXED (design-scope)** — added "Mark all read", "You're all caught up" empty state, badge 99+ cap, per-row ARIA `role=status`/`alert`, panel `role=region`, and browser-tab "(N) UNERA hUSD Portal". **Out of prototype scope:** live toasts + WebSocket/30s-poll delivery (runtime infra) |
| DISC-10 | Ownership-proof terminology | Wallet ownership proof = **EIP-4361 (SIWE)** signed nonce (Wallet Connection §6.1.2); gasless approve/transfer = EIP-2612/EIP-3009 on the token contract (Contract §5) | Portal sign gate labels a "gasless ownership proof" | P3 | Keep ownership proof as a plain signed nonce (SIWE); don't conflate with EIP-2612/3009 gasless token ops | **FIXED** — ownership copy now "Sign a Sign-In with Ethereum message (EIP-4361)\u2026 off-chain, free, never moves funds"; dropped "gasless" from the ownership step |

---

# 1 · AUTH kit (`ui_kits/auth/index.html`)

**Demo triggers:** login password `wrong` → failure + lockout after **5** (SAD-3: 15-min lock;
demo lifts after 8s); OTP `000000` → wrong-code, invalidated after **3** (SAD-3 2FA max 3);
`show('pane')` navigates panes.
**Panes:** login, signup, verifyemail, aboutyou, secure, setup2fa, backupcodes, setup2fadone,
magic, twofa, backupverify, forgot, resetsent, resetexpired, newpass, resetdone, kycstart,
kycsession, kycflow, kycselfie, kycreview, done, signedout + idle overlay.

## 1.1 Sign-in (login) — Auth&KYC §4.2, SAD-3 login/lockout

| ID | Field / Case | Precondition | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|---|
| AUTH-LOGIN-01 | Happy path | login pane | Valid email+pw, Sign in | Advances to login-2FA (`twofa`) | P1 | |
| AUTH-LOGIN-02 | Email required | login | Clear email, submit | Inline "Email is required."; no nav | P2 | |
| AUTH-LOGIN-03 | Email format | login | `jane@`, submit | Inline invalid-email error | P2 | |
| AUTH-LOGIN-04 | Password required | login | Clear pw, submit | Inline "Password is required." | P2 | |
| AUTH-LOGIN-05 | Wrong credentials (anti-enum) | login | pw `wrong`, submit | Generic "That email or password doesn't look right" — no field-specific hint (SAD-3: 401 generic) | P1 | |
| AUTH-LOGIN-06 | Lockout after 5 (SAD-3 max 5 / 15 min) | login | `wrong` ×5 | "Too many failed attempts… locked for 15 minutes"; button disabled; reset still offered | P1 | |
| AUTH-LOGIN-07 | Lockout recovery | after -06 | wait (demo 8s) | Button re-enables, counter resets, banner clears | P2 | |
| AUTH-LOGIN-08 | Show/hide password | login | Toggle eye | Text toggles; icon reflects state | P3 | |
| AUTH-LOGIN-09 | Forgot link | login | "Forgot?" | → `forgot` | P2 | |
| AUTH-LOGIN-10 | Magic-link entry | login | email sign-in link | → `magic` | P3 | |
| AUTH-LOGIN-11 | Create-account | login | "Create an account" | → `signup` | P3 | |
| AUTH-LOGIN-12 | Remember Me = mobile-only, 7d (Session §UX; SAD-3 desktop ignores) | ≤820px | inspect | "Keep me signed in for 7 days on this device" checkbox present; **hidden at desktop widths** | P2 | |
| AUTH-LOGIN-13 | Error clears on edit | after error | type | Error clears on input | P3 | |

## 1.2 Sign-up (signup) — Auth&KYC §4.1, SAD-3 password policy

| ID | Field / Case | Precondition | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|---|
| AUTH-SIGNUP-01 | Email-first only (§4.1 flow) | signup | inspect | Only email + password + ToS consent — **no name/country here** | P1 | |
| AUTH-SIGNUP-02 | Happy path | signup | valid + accept ToS, submit | → `verifyemail` | P1 | |
| AUTH-SIGNUP-03 | Anti-enum existing email (SAD-3: always 201) | signup | existing email, submit | Still lands "check your inbox" — no "in use" leak | P1 | |
| AUTH-SIGNUP-04 | Password strength checklist | signup | type progressively | Live 4-item checklist, length-first; ticks green as met | P2 | |
| AUTH-SIGNUP-05 | Min length **8** (SAD-3, not 12) | signup | 7-char pw | Blocked; length rule unmet | P1 | |
| AUTH-SIGNUP-06 | Complexity (upper/lower/number/special) | signup | 8 chars missing a class | Blocked until satisfied | P2 | |
| AUTH-SIGNUP-07 | ToS consent required | signup | leave ToS off | Inline "Please accept the Terms…"; no nav | P1 | |
| AUTH-SIGNUP-08 | Email format | signup | malformed email | Inline invalid-email error | P2 | |

## 1.3 Verify email (verifyemail) + OTP behavior — SAD-3 OTP rules

| ID | Case | Precondition | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|---|
| AUTH-OTP-01 | Happy path | verifyemail | 6-digit code, submit | → `aboutyou` | P1 | |
| AUTH-OTP-02 | Incomplete code | verifyemail | <6 digits | "Enter the full 6-digit code." | P2 | |
| AUTH-OTP-03 | Wrong code | verifyemail | `000000` | Wrong-code error; counter increments | P1 | |
| AUTH-OTP-04 | 3-attempt invalidation (SAD-3 2FA max 3) | verifyemail | `000000` ×3 | Code invalidated + auto re-sent | P1 | |
| AUTH-OTP-05 | Expiry copy (DISC-08: verify-email = 24h) | verifyemail | inspect | Stated expiry matches 24h (not 10 min) | P3 | |
| AUTH-OTP-06 | Auto-advance / backspace nav | verifyemail | type / backspace | Focus hops fwd per digit; back on empty | P3 | |
| AUTH-OTP-07 | Resend | verifyemail | "Resend code" | Resend confirmation; counter resets | P3 | |

## 1.4 About you (aboutyou) — Auth&KYC §4.1 steps 5–6

| ID | Case | Precondition | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|---|
| AUTH-ABOUT-01 | Collected post-verify | after OTP | inspect | First/last name + country appear only after email verify | P1 | |
| AUTH-ABOUT-02 | IP-default country (§4.1) | aboutyou | inspect | Pre-filled + "Suggested from your location" helper | P2 | |
| AUTH-ABOUT-03 | Country search | aboutyou | type in combobox | Type-to-filter, keyboard-navigable | P3 | |
| AUTH-ABOUT-04 | Continue | aboutyou | fill + Continue | → `secure` | P2 | |

## 1.5 Protect your account (secure) — Auth&KYC §4.1 step 6/6a

| ID | Case | Precondition | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|---|
| AUTH-SEC-01 | Two optional paths | secure | inspect | Email-2FA card + Verify-identity (L2) card | P2 | |
| AUTH-SEC-02 | Enable 2FA | secure | 2FA card | → `setup2fa` | P2 | |
| AUTH-SEC-03 | Start KYC | secure | Verify card | → `kycstart` | P2 | |
| AUTH-SEC-04 | Skip to L1 (§4.1 step 6a) | secure | "Skip for now — Level 1 dashboard" | → `done` (L1) | P1 | |
| AUTH-SEC-05 | Completed card reflects state | after 2FA/KYC | return | Card marked done; CTA "Go to dashboard" | P3 | |

## 1.6 2FA setup (setup2fa → backupcodes → setup2fadone) — SAD-3 three-phase commit

| ID | Case | Precondition | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|---|
| AUTH-2FA-01 | Email code, **not TOTP** (SAD-3 out-of-scope SMS/TOTP) | setup2fa | inspect | One-time EMAIL code; no authenticator/QR/TOTP | P1 | |
| AUTH-2FA-02 | Verify code | setup2fa | code, continue | → `backupcodes` | P1 | |
| AUTH-2FA-03 | Wrong-code limit | setup2fa | `000000` ×3 | Invalidated + re-sent (setup OTP 5-min) | P1 | |
| AUTH-2FA-04 | **10** backup codes `XXXX-XXXX-XXXX` (SAD-3) | backupcodes | inspect | Exactly 10, 12-char uppercase alphanum; copy + download | P2 | |
| AUTH-2FA-05 | Confirm-saved gate (prevents lockout) | backupcodes | leave box off | "Finish — turn on 2FA" disabled until "I've saved…" checked | P1 | |
| AUTH-2FA-06 | Finish | backupcodes | check + Finish | → `setup2fadone` | P2 | |
| AUTH-2FA-07 | Confirmation copy | setup2fadone | read | Email code at sign-in + sensitive actions; backup fallback; confirmation email sent | P3 | |
| AUTH-2FA-08 | Cancel setup | setup2fa | Cancel | → `secure`, 2FA not enabled | P2 | |

## 1.7 Login 2FA (twofa) + backup fallback (backupverify)

| ID | Case | Precondition | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|---|
| AUTH-L2FA-01 | Email code login | post sign-in | code, verify | → `done` | P1 | |
| AUTH-L2FA-02 | 3-attempt lock (SAD-3) | twofa | `000000` ×3 | Invalidated + re-sent | P1 | |
| AUTH-L2FA-03 | Resend email code | twofa | resend | Confirmation | P3 | |
| AUTH-L2FA-04 | Backup-code fallback | twofa | "Use a backup code" | → `backupverify`; input `XXXX-XXXX-XXXX` | P2 | |
| AUTH-L2FA-05 | Backup verify (single-use) | backupverify | enter code | → `done` | P2 | |
| AUTH-L2FA-06 | Back to email code | backupverify | back | → `twofa` | P3 | |

## 1.8 Password reset — Auth&KYC §4.3, SAD-3 (15-min single-use, no auto-login)

| ID | Case | Precondition | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|---|
| AUTH-RESET-01 | Request (anti-enum) | forgot | email, send | "If an account exists…" — valid 15 min, single use | P1 | |
| AUTH-RESET-02 | 15-min single-use copy | resetsent | read | Explicit "valid 15 minutes… single use" | P2 | |
| AUTH-RESET-03 | Expired/used link | resetexpired | reach | "Link expired or invalid" + "Request a new link" | P1 | |
| AUTH-RESET-04 | New password strength (min 8) | newpass | type | Live checklist; min 8 enforced | P1 | |
| AUTH-RESET-05 | Confirm mismatch | newpass | mismatched confirm | Live "Passwords don't match." | P1 | |
| AUTH-RESET-06 | Save | newpass | valid matching | → `resetdone` | P1 | |
| AUTH-RESET-07 | Sign-out-all + **no auto-login** (OWASP) | resetdone | read | "All other sessions signed out," confirmation emailed, must sign in again | P1 | |

## 1.9 KYC handoff (kycstart→kycsession→kycflow→kycselfie→kycreview) — Auth&KYC §4.6

| ID | Case | Precondition | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|---|
| AUTH-KYC-01 | Verification-partner framing (no vendor name) | kycstart | read | Guided identity check by "our verification partner"; no "Sumsub" in user copy (DISC-07 note: real flow is provider SDK) | P1 | |
| AUTH-KYC-02 | Continue → session | kycstart | Continue | `kycsession` → `kycflow` (~1.6s) | P2 | |
| AUTH-KYC-03 | Verify-later skip | kycstart | "I'll verify later" | → `done` (L1) | P1 | |
| AUTH-KYC-04 | ID capture | kycflow | inspect | Front/back slots; Continue → `kycselfie` | P2 | |
| AUTH-KYC-05 | Selfie | kycselfie | submit | `kycsession` → `kycreview` | P2 | |
| AUTH-KYC-06 | In-review state (§4.6 In Review = L2 restricted) | kycreview | read | "Level 2 · In review"; dashboard reachable; **no regulated actions** yet | P1 | |
| AUTH-KYC-07 | Cancel mid-flow | kycflow/selfie | cancel/back | Returns without granting L2 | P2 | |

## 1.10 Session — done, idle, signed-out — Session PRD §UX, SAD-3 TTLs

| ID | Case | Precondition | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|---|
| AUTH-DONE-01 | L1 dashboard entry | done | read | "Level 1 — hold and view"; links to portal | P2 | |
| AUTH-SESS-01 | Idle-warning modal (1 min before) | done | "Idle warning" | Countdown modal + progress + Stay / Sign out now | P1 | |
| AUTH-SESS-02 | Stay signed in | modal open | Stay | Closes; session continues (resets idle timer) | P1 | |
| AUTH-SESS-03 | Idle → signed out | modal | lapse / Sign out now | `signedout` with inactivity cause | P1 | |
| AUTH-SESS-04 | Inactivity copy = **30 min** (SAD-3 desktop) | signedout (idle) | read | "Signed out after 30 minutes of inactivity" | P2 | |
| AUTH-SESS-05 | Security cause copy | signedout (security) | trigger | Security-specific cause copy | P2 | |
| AUTH-SESS-06 | Remember-me policy | — | review | Mobile ON = 7-day absolute; desktop ignores flag, 30-min idle logout | P2 | |
| AUTH-SESS-07 | Sign back in | signedout | click | → `login` | P3 | |

---

# 2 · PORT — Live portal (`UNERA hUSD Portal.dc.html`)

**Demo triggers:** nav **Preview state** selector → 9 account/service states. Limits (portal):
MIN_ISSUE $10, MAX_ISSUE_TX $50,000, DAILY_REMAIN $45,000, MIN_REDEEM 10 hUSD,
HUSD_BALANCE 24,180.42, MAX_WALLETS 6 (see DISC-02), networks Ethereum/Arbitrum/Base
(see DISC-01), FX 1 CAD = 0.7300 USD, quote TTL 60s (Issuance ISS-10).

## 2.1 Account & service states — Dashboard §7, Auth&KYC §4.6

| ID | State | Steps (Preview selector) | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-STATE-01 | Public visitor (L0) | "Public visitor" | Lands on PoR; balance/activity hidden; nav "Log in"; issue/redeem not offered (DASH-04 public no-auth) | P1 | |
| PORT-STATE-02 | Logged in · KYC not started (L1) | select | "Complete KYC to issue or redeem" banner + CTA; balance/history visible | P1 | |
| PORT-STATE-03 | KYC in review | select | Safe pending banner; issue/redeem confirmation disabled | P1 | |
| PORT-STATE-04 | KYC needs attention (Rejected → Restricted) | select | "Verification needs attention"; issue/redeem disabled | P1 | |
| PORT-STATE-05 | Approved · no wallet | select | "Connect your wallet" banner; issue/redeem CTAs become enabled "Connect wallet to continue" (§7 require verification before confirm) | P1 | |
| PORT-STATE-06 | Verified · connected | select | Full access; balance shown; issue/redeem enabled subject to amount validation | P1 | |
| PORT-STATE-07 | Blocked region | select | Red banner, generic copy, actions gated; public data still visible (Dashboard §7, no reason codes) | P1 | |
| PORT-STATE-08 | Maintenance | select | Actions paused banner; balance safe; public data available (§11) | P2 | |
| PORT-STATE-09 | Data unavailable | select | Neutral banner; hero "Reserve data unavailable · last snapshot"; transactions unaffected; **no "fully backed"** (§7) | P2 | |
| PORT-STATE-10 | State reset scroll | switch any | Scrolls to top; menus close | P3 | |
| PORT-STATE-11 | Missing states (DISC-06) | — | review | `retry_needed` (resubmit) and `on_hold` (manual review) not modeled — confirm intended | P2 | |

## 2.2 Global chrome — nav, notifications, signed-out, reduced motion

| ID | Component | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-NAV-01 | Hamburger drawer | ≤960px | Nav → drawer incl. Wallets entry | P2 | |
| PORT-NAV-02 | Wallet pill (connected) | verified-connected | Pill shows balance + `0x74…3a8f`; opens dropdown | P2 | |
| PORT-NAV-03 | Log-in button (public) | public | "Log in" links to auth kit | P2 | |
| PORT-NOTIF-01 | Notification panel (Notif §7.1) | click bell | Reverse-chron rows: level icon, title, body, timestamp, unread; primary action | P2 | |
| PORT-NOTIF-02 | Stablecoin events only (NOTI-SC-01..06) | inspect | Mint completed / redeem burned / payout started / payout completed / issue / announcement — no platform (OTC/trade/swap) events | P2 | |
| PORT-NOTIF-03 | Unread badge (99+ cap, Notif §7.5.2.3) | open panel | Badge count; "Mark all as read"; badge clears at 0 | P3 | |
| PORT-NOTIF-04 | Empty state (§7.5.2.2) | no notifs | "You're all caught up" | P3 | |
| PORT-NOTIF-05 | Web-app extras (DISC-09) | inspect | Toasts / browser-tab "(N)" / WebSocket likely absent — confirm out of prototype scope | P3 | |
| PORT-SIGNOUT-01 | Signed-out banner | log out | Teal "You've signed out" + dismiss + sign-in link on public view | P2 | |
| PORT-SIGNOUT-02 | Dismiss banner | shown | Click dismiss → removed | P3 | |
| PORT-MOTION-01 | Reduced motion | OS reduce-motion | Ambient animations collapse (~0.01ms) | P2 | |

## 2.3 Service banners — Dashboard §7/§11, Wallet Connection §9.3

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-BAN-01 | Unsupported network (§9.3 prompt switch) | wallet menu "simulate unsupported network" | Banner "Switch to Ethereum/Arbitrum/Base"; pill border/dot red; one-click switch (verify network list per DISC-01) | P1 | |
| PORT-BAN-02 | Blocked region | blocked state | Region banner; generic, no reason codes | P1 | |
| PORT-BAN-03 | Maintenance | maintenance | Maintenance banner; actions paused | P2 | |
| PORT-BAN-04 | Data unavailable | data-down | Reserve-data-updating banner; last snapshot | P2 | |
| PORT-BAN-05 | Banner precedence | multiple conditions | Single highest-priority banner | P3 | |

## 2.4 Portfolio / dashboard — Dashboard §6, §10

| ID | Case | Precondition | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|---|
| PORT-DASH-01 | Balance shown (§6.2) | verified-connected | view | 24,180.42 hUSD + network status + "refreshed 30s ago · Refresh" | P2 | |
| PORT-DASH-02 | Balance hidden (no wallet) | approved-no-wallet | view | Wallet-connection prompt / next-steps panel, not empty void | P2 | |
| PORT-DASH-03 | Balance across networks | connected | view | Per-network breakdown | P3 | |
| PORT-DASH-04 | My recent transactions (§6.4, latest 5) | connected | view | Personal recent txns; link to full history; hidden for public | P2 | |
| PORT-DASH-05 | Recent stablecoin activity (§5.4, anonymized) | any | view | Aggregate "Mint completed — +X hUSD — Ym ago" + cumulative issued/redeemed + no-PII note | P2 | |
| PORT-DASH-06 | Verify-to-unlock banner | L1/pending/rejected | view | State-appropriate banner + CTA (2.1) | P1 | |
| PORT-DASH-07 | Refresh balance | connected | Refresh | Timestamp updates (§10 freshness) | P3 | |
| PORT-DASH-08 | Timestamps everywhere (§8, §10) | view | inspect | Reserve/supply/balance/quote each show last-updated | P2 | |

## 2.5 Get / Issue flow — Issuance §5 (fiat), §6 (crypto), Common Rules §3

### Path & currency
| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-GET-01 | Fiat/crypto toggle (§5, §6.2) | toggle path | Fiat funding vs "Pay with crypto" (USDC/USDT) branches | P1 | |
| PORT-GET-02 | Funding methods (config: bank/e-transfer/card) | fiat path | Supported methods offered; no swap language (Dashboard §8) | P2 | |
| PORT-GET-03 | USD/CAD toggle | fiat | Switch USD↔CAD | P2 | |
| PORT-GET-04 | CAD = FX + markup, **not swap** (Acceptance §12) | select CAD | "1 CAD = 0.7300 USD"; hUSD via FX+markup; "issuance — not a swap" note | P1 | |
| PORT-GET-05 | Bidirectional input (Common Rules §3, ISS-09) | edit pay ↔ receive | Opposite side recomputes live; last-edited side is source of truth | P2 | |

### Amount validation (PRD §5 limits)
| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-GET-06 | Empty amount (ISS-09) | clear | CTA "Enter an amount", disabled | P1 | |
| PORT-GET-07 | Zero | 0 | Disabled | P1 | |
| PORT-GET-08 | Below min | $5 | "Minimum issuance is $10." + disabled | P1 | |
| PORT-GET-09 | At min boundary | $10 | Accepted | P2 | |
| PORT-GET-10 | Above per-tx cap | $60,000 | "Maximum per transaction is $50,000." | P1 | |
| PORT-GET-11 | At cap boundary | $50,000 | Accepted (subject to daily) | P2 | |
| PORT-GET-12 | Over daily remaining | $46,000 | "Over your remaining daily limit of $45,000." | P1 | |
| PORT-GET-13 | Non-numeric | letters | Rejected; no NaN in preview | P2 | |
| PORT-GET-14 | Live error + CTA reason | type invalid | Error live under input; CTA states blocker | P2 | |

### Quote freshness (ISS-10 / CISS-07)
| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-GET-15 | Preview contents (§3) | reach preview | Input amt, output hUSD, rate, fee, rate source, timestamp, expiry | P1 | |
| PORT-GET-16 | 60-s countdown | preview | Countdown from 60s | P1 | |
| PORT-GET-17 | Quote expiry (§3 "expired cannot be confirmed") | hit 0 | Confirm disabled + "Refresh quote" | P1 | |
| PORT-GET-18 | Refresh quote | after expiry | New 60s window; confirm re-enabled | P2 | |

### Crypto deposit (§6.2/§6.4/§6.5)
| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-GET-19 | Source asset/network (§6.1 USDC/USDT allowlist) | crypto path | USDC/USDT + network selectable | P2 | |
| PORT-GET-20 | Unique deposit address + QR (CISS-10) | review | Unique address + QR, "expires… never reused" | P1 | |
| PORT-GET-21 | Copy address | copy | Copied confirmation | P3 | |
| PORT-GET-22 | Allowlist warning (CISS-01) | review | Red "Only send {asset} on {network}…" | P1 | |
| PORT-GET-23 | Confirmation depth (CISS-02) | after transfer | X/12 meter + crypto states (Transfer detected → Confirming → Under review → Minting → Completed) | P2 | |
| PORT-GET-24 | Below-min after conversion (CISS-08) | tiny deposit | Rejection/notice per min-issue | P2 | |

### Connect + sign + status + receipt (Common Rules §3, §4)
| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-GET-25 | Connect-before-confirm (§3) | approved-no-wallet | click confirm | Opens connect modal first, then chains to sign gate | P1 | |
| PORT-GET-26 | Sign ownership (§3; SIWE nonce, DISC-10) | first confirm | Sign-message modal (nonce, ownership of address); verified once/session | P1 | |
| PORT-GET-27 | Mint status timeline (§8 labels) | post-confirm | Started → Waiting → Received → Under review → Processing → Completed w/ pills | P1 | |
| PORT-GET-28 | Receipt (§9.2 `/receipt`, ISS-11) | completed | Locked rate/fee snapshot, method, destination, on-chain hash, download | P2 | |

## 2.6 Redeem flow — Redemption §7, RED-01..09

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-RED-01 | Empty amount | clear | CTA disabled / enter-amount | P1 | |
| PORT-RED-02 | Below min | 5 | "Minimum redemption is 10 hUSD." | P1 | |
| PORT-RED-03 | At min boundary | 10 | Accepted | P2 | |
| PORT-RED-04 | Exceeds balance | 30,000 | "Amount exceeds your balance of 24,180.42 hUSD." + disabled | P1 | |
| PORT-RED-05 | At balance boundary | 24,180.42 | Accepted | P2 | |
| PORT-RED-06 | Bank details required (RED-01) | no bank on file | "Add a bank account to continue", disabled; copy must NOT imply verified account (Phase-1) | P1 | |
| PORT-RED-07 | Not connected on redeem | approved-no-wallet | CTA mirrors issuance connect/gating | P1 | |
| PORT-RED-08 | Preview (RED-08) | enter amount | hUSD to burn, fee, exact USD payout, settlement time | P1 | |
| PORT-RED-09 | Liquidity queue (RED-02, LIQUIDITY_QUEUED) | > ~$20k | "Queued for liquidity" banner + safe SLA + extra timeline stage | P1 | |
| PORT-RED-10 | SLA copy (RED-05) | any redeem | "~1 business day"; **never** "instant"/"on demand"/"no queue" | P1 | |
| PORT-RED-11 | Burn-before-payout (RED-03) | confirm | Timeline: burn confirmed on-chain before payout; sign gate applies | P2 | |
| PORT-RED-12 | Bank-only fiat (PRD §6.8) | inspect | No USDC/crypto payout option | P1 | |

## 2.7 Proof of Reserve — Dashboard §5, PRD §6.6 (DASH-01..05)

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-POR-01 | Reserve-ratio gauge vs 100% floor (§6.6) | view | Ratio vs floor, color-coded; "102.4% reserve ratio" in Verified Teal (not profit-green, not "fully reserved") | P1 | |
| PORT-POR-02 | Composition by asset type (§5.2) | view | Cash / treasuries / USDC-USDT etc., value + % + timestamp | P2 | |
| PORT-POR-03 | Total reserves / excess | view | Figures render; tabular nums | P2 | |
| PORT-POR-04 | Reserve by custodian (§6.6) | view | Concentration-risk bar (or link to detail) | P3 | |
| PORT-POR-05 | Maturity ladder (§6.6) | view | Bond/repo buckets (or detail link) | P3 | |
| PORT-POR-06 | 90-day historical trend (§6.6, §5.3 no forecast) | view | Ratio + supply line, ranges, no future projection | P3 | |
| PORT-POR-07 | Yield → Humanity Centres (RES-04, OQ-07) | view | Reserve-income allocation as mission tie (in-scope disclosure) | P2 | |
| PORT-POR-08 | Contract info (§5.6, Contract spec) | view | Token hUSD, network, **decimals 18**, status Active/Paused, shortened address + copy + explorer | P2 | |
| PORT-POR-09 | Audit status (§5.5, RES-06 quarterly) | view | Latest/Archived/Pending; downloadable attestation + date | P2 | |
| PORT-POR-10 | Last-updated + source per chart (DASH-02) | view | Caption row every figure/chart | P2 | |
| PORT-POR-11 | Trust H1 copy (§8) | view | "Backed 1:1 — and you can verify it" (model, not "fully reserved") | P1 | |
| PORT-POR-12 | Cumulative volumes (§5.4, no PII) | view | Issuance/redemption totals, anonymized | P2 | |
| PORT-POR-13 | Stat grid responsive | ≤560px | 4-up grid → 1 col | P2 | |
| PORT-POR-14 | Data-unavailable PoR | data-down | Graceful "last snapshot" fallback, no broken figures, no misleading label (§11) | P2 | |

## 2.8 Activity / history — PRD §6.9 (IDX), Issuance §8

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-ACT-01 | Type filters (IDX-06) | open Activity | Issuance-fiat / issuance-crypto / redemption / in-progress / failed-expired filter | P2 | |
| PORT-ACT-02 | Date-range filter (IDX-06) | Activity | "Last 90 days" range | P3 | |
| PORT-ACT-03 | Empty state | filter to empty | Empty-state message | P2 | |
| PORT-ACT-04 | Columns (§6.9 record) | view | type, status, amount_in, amount_out, fee, rate, on-chain hash (explorer), initiated/completed | P2 | |
| PORT-ACT-05 | Failed row (safe copy, IDX-05) | view | Failed row, generic copy, no reason codes | P1 | |
| PORT-ACT-06 | Expired row | view | Expired example | P2 | |
| PORT-ACT-07 | Receipt modal (§9.2) | click row | Rate/fee snapshot, method, destination, tx hash, download, safe failure note | P2 | |
| PORT-ACT-08 | **No swap/transfer rows** (§6.8, EXP-01) | inspect | Only mint/burn (issuance/redemption); no swap/exchange/transfer | P1 | |
| PORT-ACT-09 | User-scoped only (IDX-04) | inspect | Only current user's records | P1 | |
| PORT-ACT-10 | Table horizontal scroll | narrow | Row min-width preserved | P2 | |

## 2.9 Verify tiers — Auth&KYC §3, PRD tiers

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-VER-01 | L1 Starter | view | "Hold & receive only"; redeem not enabled | P2 | |
| PORT-VER-02 | L2 Verified | view | Issue + redeem-to-bank enabled; $50,000/day | P1 | |
| PORT-VER-03 | L3 Institutional | view | Higher/custom limits; KYB; upgrade CTA | P3 | |
| PORT-VER-04 | Current-tier marker | view | Correct tier flagged per state | P2 | |

## 2.10 Wallets page — multi-address binding & management — Wallet Connection §6.1, §6.6, §9.11

**Spec (v17):** authenticated users bind **1 email → many wallets** (no numeric limit),
ownership verified via signing; reject if the address is bound to a **different** account.

| ID | Case | Precondition | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|---|
| PORT-WAL-01 | Reach page | verified | open Wallets | Bound-address list renders | P2 | |
| PORT-WAL-02 | Empty state | none bound | view | Clear empty state + bind CTA | P2 | |
| PORT-WAL-03 | Bind wallet (§6.1) | authed | bind new address | Address added; success notice | P1 | |
| PORT-WAL-04 | Bind many (§9.11 1→n) | ≥2 bound | bind more | Multiple addresses coexist | P1 | |
| PORT-WAL-05 | **No numeric limit** (DISC-02) | 6 bound | bind 7th | Spec: allowed. Build caps at 6 → confirm decision or remove cap | P2 | |
| PORT-WAL-06 | Cross-account dupe (DISC-03) | address on another account | bind | Rejected: "already linked to another account" | P1 | |
| PORT-WAL-07 | Same-account dupe | already on this account | re-bind | Blocked with duplicate notice | P2 | |
| PORT-WAL-08 | Ownership signing (§6.1, verified mode) | binding | connect + sign | Wallet bound only after signature verifies (WalletConnect/Coinbase-verified) | P1 | |
| PORT-WAL-09 | Verified chip only for verified mode (DISC-04) | bound | view | "Verified by signature" chip on verified wallets; MetaMask-unverified shows read-only, not verified | P1 | |
| PORT-WAL-10 | Remove / unbind (DISC-05) | ≥1 bound | Remove → confirm | Confirmation then removal + notice — **note: account-level unbind is beyond spec Phase-1** | P2 | |
| PORT-WAL-11 | Disconnect active (§6.6) | connected | Disconnect | Confirmation; connection cleared; nav pill reflects | P1 | |
| PORT-WAL-12 | Network switch (§9.3) | wrong chain | switch control | Switches to supported chain; unsupported banner clears (verify list, DISC-01) | P1 | |
| PORT-WAL-13 | History scoped to bound wallets (§6.1) | multiple bound | view | Tx history only for wallets on this account | P2 | |
| PORT-WAL-14 | Address formatting | any bound | view | Shortened `0x…`; provider + mode shown | P3 | |
| PORT-WAL-15 | Notice auto-dismiss | after notice | wait | Status notices dismiss (no stale banners) | P3 | |
| PORT-WAL-16 | Responsive stack | ≤640px | narrow | Wallet cards stack single-column | P2 | |

## 2.11 Connect-wallet modal — Wallet Connection §5, §6.1.1–6.1.3

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-CON-01 | Providers (§5) | open connect | MetaMask / WalletConnect / Coinbase | P1 | |
| PORT-CON-02 | MetaMask = unverified/read-only (§6.1.1, DISC-04) | pick MetaMask | Connects, retrieves address + network, **no signature forced**; read-only | P1 | |
| PORT-CON-03 | WalletConnect = verified (§6.1.2) | pick WalletConnect | QR/deep-link → connect → **sign nonce** → verified | P1 | |
| PORT-CON-04 | Coinbase = both (§6.1.3) | pick Coinbase | Unverified without signing; upgrade to verified requires signing | P2 | |
| PORT-CON-05 | QR copy + deep link (§5) | WalletConnect | QR + copy-to-clipboard + mobile deep link | P2 | |
| PORT-CON-06 | Read-only reassurance (§8 security) | modal | "keys never stored" copy | P2 | |
| PORT-CON-07 | Rejection / error (§7) | reject in wallet | Clear error banner + retry | P2 | |
| PORT-CON-08 | Network mismatch (§7, §9.3) | connect on wrong chain | Prompt to switch | P2 | |
| PORT-CON-09 | Cancel | modal open | close | Returns unconnected | P3 | |

## 2.12 Scope & trust guardrails (regression) — PRD §6.7/§6.8, Dashboard §8

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| PORT-SCOPE-01 | No out-of-scope surfaces | search UI | No Earn/Savings, Bridge, Rewards, Business/Treasury, recurring/auto | P1 | |
| PORT-SCOPE-02 | No crypto payout on redeem | redeem | Bank-only fiat | P1 | |
| PORT-SCOPE-03 | No non-hUSD coins | search | No hCAD/hEUR issuance | P1 | |
| PORT-SCOPE-04 | No remittance/governance/lending | search | Absent | P1 | |
| PORT-TRUST-01 | No "fully reserved/backed" status | search copy | Model language only ("backed 1:1") | P1 | |
| PORT-TRUST-02 | No "instant/on-demand/no-queue" | search copy | Redemption hedged (~1 business day) | P1 | |
| PORT-TRUST-03 | No vendor names in user copy | search copy | No Sumsub/Paysafe/Interac/exchangerate-api — generic roles | P2 | |
| PORT-TRUST-04 | No reason-code leak (CMP-01, IDX-05) | failed txns | Generic safe copy | P1 | |
| PORT-TRUST-05 | No "swap/trade" for issuance; no "cash-out" for redeem (§8) | copy | "Issue/Get hUSD", "Redeem hUSD" | P2 | |

---

# 3 · KIT — Stablecoin-app reference kit (`ui_kits/stablecoin-app/index.html`)

**Screens:** dashboard, issue, redeem, por, history, kyc. Body `data-level` (L1/L2). `go('screen')`
navigates. Static reference kit — validate structure, copy, gating, scope.

## 3.1 Navigation & levels

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| KIT-NAV-01 | Nav routes | click each | Dashboard/Issue/Redeem/PoR/History switch | P2 | |
| KIT-NAV-02 | Active state | navigate | Active nav-link marked | P3 | |
| KIT-LVL-01 | L1 banner | data-level=L1 | KYC-to-unlock prompt | P1 | |
| KIT-LVL-02 | L2 gating (Auth&KYC §3) | L1 vs L2 | Issue/Redeem enabled only at L2 | P1 | |

## 3.2 Dashboard

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| KIT-DASH-01 | Balance/holdings | view | Balance + holdings render | P2 | |
| KIT-DASH-02 | Level banner | L1 | Verify-to-unlock prompt | P1 | |
| KIT-DASH-03 | Trust copy (§8) | view | No "fully backed/instant" status | P1 | |
| KIT-DASH-04 | Timestamps (§10) | view | Last-updated on reserve/supply/balance | P2 | |

## 3.3 Issue flow

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| KIT-ISS-01 | Fiat or stablecoin | view | Pay with fiat OR whitelisted stablecoin | P2 | |
| KIT-ISS-02 | Amount + preview (ISS-09) | enter | Conversion preview + fee | P2 | |
| KIT-ISS-03 | Rate + freshness (ISS-10) | preview | Rate + timestamp/expiry | P2 | |
| KIT-ISS-04 | L2 gate | L1 | Issue blocked, KYC prompt | P1 | |

## 3.4 Redeem flow

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| KIT-RED-01 | Bank fiat only (§6.8) | view | Burn → USD to bank, 1:1; no crypto payout | P1 | |
| KIT-RED-02 | SLA copy (RED-05) | view | ~1 business day; no "instant" | P1 | |
| KIT-RED-03 | L2 gate | L1 | Redeem blocked | P1 | |

## 3.5 Proof of Reserve

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| KIT-POR-01 | Ratio + composition (§5.2) | view | Reserve figures + composition | P2 | |
| KIT-POR-02 | Timestamps (DASH-02) | view | Last-updated labels | P2 | |
| KIT-POR-03 | Trust copy (§8) | view | Proof framing, not "fully reserved" status | P1 | |

## 3.6 History

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| KIT-HIS-01 | Rows render | view | Mint/redeem rows with status | P2 | |
| KIT-HIS-02 | Detail drawer | click row | Transaction drawer with detail | P2 | |
| KIT-HIS-03 | No swap rows (§6.8) | inspect | No swap/exchange/transfer | P1 | |
| KIT-HIS-04 | Failed/expired safe copy | inspect | Handled, no reason codes | P2 | |

## 3.7 KYC

| ID | Case | Steps | Expected | Pri | Status |
|---|---|---|---|---|---|
| KIT-KYC-01 | Verification-partner framing | view | Secure handoff to "regulated verification partner"; no vendor name; no raw-doc storage implied | P1 | |
| KIT-KYC-02 | Unlocks L2 | complete | Copy states L2 unlocks issue/redeem | P2 | |

---

# 4 · Cross-cutting

## 4.1 Responsive breakpoints

| ID | Artifact | Width | Expected | Pri | Status |
|---|---|---|---|---|---|
| RESP-01 | AUTH | ≤820px | Split grid collapses; brand panel hidden | P2 | |
| RESP-02 | AUTH | ≤520px | Padding/radius reduce; OTP boxes flex; checklist/backup grid 1-col | P2 | |
| RESP-03 | AUTH | ≤360px | Backup-code grid 1-col; no overflow | P3 | |
| RESP-04 | PORT | ≤960px | Nav → hamburger drawer w/ Wallets | P2 | |
| RESP-05 | PORT | 1080/900/720px | Grids step down (g2→1, g3→2→1, g4→2→1) | P2 | |
| RESP-06 | PORT | ≤640px | Wallet cards stack | P2 | |
| RESP-07 | PORT | ≤560px | PoR stat grid → 1-col | P2 | |
| RESP-08 | PORT | phone | Hero balance/coin/H1 scale down; activity table h-scroll | P2 | |
| RESP-09 | KIT | phone/tablet | Screens reflow, no overflow (Dashboard §8 responsive cards) | P2 | |
| RESP-10 | All | 320px min | No horizontal page scroll / clipped controls | P3 | |
| RESP-11 | Notif panel | <768px | Full-width drawer (Notif §7.5.2.7) | P3 | |

## 4.2 Accessibility & general robustness

| ID | Case | Expected | Pri | Status |
|---|---|---|---|---|
| A11Y-01 | Keyboard nav | All CTAs/fields/combobox/modals keyboard-operable | P2 | |
| A11Y-02 | Focus visible | Visible focus ring | P3 | |
| A11Y-03 | Contrast | Dark-theme text passes; disabled states distinguishable | P2 | |
| A11Y-04 | Labels | Inputs labelled; icon-only buttons aria-label | P2 | |
| A11Y-05 | Reduced motion | Ambient animation honored | P2 | |
| A11Y-06 | Notif ARIA (Notif §7.5.2.6) | `role=alert` for error/warning, `role=status` otherwise; color never sole cue; Esc closes panel | P3 | |
| GEN-01 | Console clean | No JS errors on load or nav across all screens | P1 | |
| GEN-02 | All preview states render | 9 states render without error | P2 | |
| GEN-03 | Status vocab consistency | teal=good, gold=in-progress, red=down | P3 | |

## 4.3 Requirements traceability

| Requirement | Spec ref | Covered by |
|---|---|---|
| 3 access levels gate features | Auth&KYC §3 | PORT-STATE-*, PORT-VER-*, KIT-LVL-* |
| Email 2FA + 10 backup codes (no TOTP/SMS) | SAD-3 scope + 2FA | AUTH-2FA-01/04/05, AUTH-L2FA-* |
| Registration email-first order | Auth&KYC §4.1 | AUTH-SIGNUP-01, AUTH-ABOUT-01 |
| Login lockout 5/15min; anti-enum | SAD-3; Auth&KYC §4.2 | AUTH-LOGIN-05/06 |
| Reset 15-min single-use; no auto-login | Auth&KYC §4.3; SAD-3 | AUTH-RESET-01/02/03/07 |
| Idle 30-min desktop; 7d mobile Remember Me | Session §UX; SAD-3 TTL | AUTH-SESS-04/06, AUTH-LOGIN-12 |
| Quote 60-s expiry; bidirectional; preview fields | Issuance §3, ISS-09/10 | PORT-GET-05/15/16/17/18 |
| Amount limits min/max/daily | PRD §5 | PORT-GET-06..14 |
| Crypto onramp: allowlist, unique addr, depth | Issuance §6, CISS-01/02/08/10 | PORT-GET-19..24 |
| Connect + sign before confirm | Issuance Common Rules §3 | PORT-GET-25/26, PORT-WAL-08 |
| Redemption burn-before-payout, queue, SLA, bank-only | Redemption §7, RED-01/02/03/05 | PORT-RED-06/09/10/11/12 |
| Status labels vocabulary | Issuance §8 | PORT-GET-27, PORT-ACT-04 |
| PoR full spec (gauge/composition/custodian/maturity/trend/contract/audit) | PRD §6.6; Dashboard §5 | PORT-POR-01..14 |
| Contract: decimals 18, status, explorer | Contract §3; Dashboard §5.6 | PORT-POR-08 |
| Tx history fields, filters, user-scoped, no swap | PRD §6.9 IDX-04/05/06; §6.8 | PORT-ACT-01/04/08/09 |
| Wallet: bind 1→n, verified/unverified modes, switch | Wallet Conn §6.1/6.6/9.11 | PORT-WAL-*, PORT-CON-* |
| Wallet networks | Wallet Conn §6.3 | DISC-01, PORT-BAN-01, PORT-WAL-12 |
| Notifications events + center UX | Notif §5.1, §7 | PORT-NOTIF-* |
| Scope exclusions | PRD §6.7/§6.8 | PORT-SCOPE-*, PORT-ACT-08, KIT-HIS-03 |
| Trust-copy guardrails | Dashboard §8 | PORT-TRUST-*, KIT-DASH-03 |
| Responsive desktop/tablet/mobile | Dashboard §12 | RESP-* |

---

## Known non-testable (backend / out of UI scope)

Server-side rate limiting (SAD-3 composite keys), bcrypt hashing, JWE/refresh-token rotation
& reuse detection, sanctions/PEP/Chainalysis screening, compliance holds, webhook signature
validation (RAIL-02), 7-year audit retention, on-chain mint/burn, real address encoding,
WalletConnect relay, live FX feed, contract pause/blacklist/EIP-2612/3009 gasless ops.
Represented in copy only — verify wording, not enforcement. QR and deposit address are
deterministic placeholders in the demo.
