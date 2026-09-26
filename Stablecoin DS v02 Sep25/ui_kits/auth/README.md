# Auth UI kit

The **Unera Stablecoin Portal** authentication flows (Coinbase-style, per the *Authentication &
KYC* spec v7, the *Session Management PRD* v8, and **SAD-3: Authentication Architecture v27**,
the authoritative tie-breaker). Split layout: a Deep-Blue brand panel beside the form.

**Entry:** `index.html`

### Canonical decisions (per SAD-3)
- **2FA is email-only in v1** (SMS/TOTP explicitly out of scope). Recovery = **10 single-use
  backup codes** (`XXXX-XXXX-XXXX`), generated at setup and saved before 2FA activates
  (three-phase commit). No authenticator option.
- **Remember Me is mobile-only** (7 days, absolute expiry, skips 2FA). Desktop ignores the flag,
  since the checkbox only renders at mobile widths, and auto-logs-out after **30 min** inactivity.
- Password policy: NIST-aligned, **min 8 chars** + complexity (bcrypt cost 12 backend).

### Screens / states
- Login: email + password, "Forgot?", magic-link alternative; **Remember me (7 days)**
  checkbox appears at mobile widths only.
- Sign up: email-first per spec §4.1: **email + password + consent only**, live
  password-requirement checklist. Creates a **Level 1 (Unverified)** account.
- Verify email: 6-digit OTP, auto-advance, anti-enumeration.
- About you: first/last name + country (IP-suggested default), collected **after**
  email verification per spec step 5.
- Protect your account: the §4.1 step-6 prompt: enable email 2FA / verify identity
  (Sumsub, L2), **skippable** to the Level-1 dashboard.
- 2FA setup (§4.4 + SAD-3): email setup code (5-min expiry), then **Save your backup codes**
  (10 codes, download/copy, confirm-saved gate), then "Email 2FA is on".
- Two-factor: email one-time code (5-min expiry) with **"Use a backup code"** fallback.
- Magic link sent / Forgot password: anti-enumeration reset confirmation
  ("If an account exists… valid 15 minutes, single use").
- Set new password (§4.3): new + confirm with live checklist and the "signs you out on
  all devices" outcome, then **Password updated** (sign in again; no auto-login).
- Done: signed-in success showing the **access level** (L1: hold/view) with a prompt to
  verify for L2; links into the Stablecoin App kit. Includes session-state previews.
- Idle-warning modal (Session PRD): 60-second countdown + progress bar, "Stay signed in" /
  "Sign out now".
- Signed out (Session PRD): post-logout page explaining the cause (30-min inactivity vs
  security) with re-login action.

Access levels: L0 public PoR, L1 email+password (hold/view), L2 KYC (issue & redeem).
