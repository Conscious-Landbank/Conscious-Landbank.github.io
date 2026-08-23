# Auth & KYC + Session Management — audit (2026-07, Pass 5)

**Specs re-fetched:** *Authentication & KYC* (pageId 20152341, **v7**, unchanged since 2026-06-03)
and its child page *Session Management PRD: Auto Logout & Remember Me* (pageId 22806563, **v8**).
**Artifacts audited:** `UNERA hUSD Portal.dc.html` (portal-side states) and `ui_kits/auth/index.html`
(auth flows). Cross-checked against the earlier UNERA build (`uploads/EarlyUneraDesign/` —
login_2, setup-2fa, account-security) and 2026 best practice (OWASP Forgot-Password cheat sheet,
NIST password guidance, PatternFly/SEB session-timeout patterns, anti-enumeration norms).

## Verdict

The **portal app** already conforms (Passes 1–4): 9 account/service states incl. all four KYC
statuses (§4.6), L1/L2 gating on Issue/Redeem, Sumsub wording, connect-before-confirm. No changes.

The **auth kit** had 8 gaps vs the two specs — all fixed this pass in `ui_kits/auth/index.html`,
reusing only existing tokens/classes (Deep Blue, `--warning`, `--fin-up`, `--surface-*`,
method-seg, sent-ic, otp, existing card/button/link styles):

| # | Gap | Spec ref | Fix |
|---|---|---|---|
| 1 | Signup collected name + country **before** email verification | §4.1 flow steps 4–5 | Signup = email + password + consent only; new **About you** pane (first/last/country) after OTP verification |
| 2 | No IP-default hint on country | §4.1 "use IP address to default location" | "Suggested from your location" helper under the pre-filled country |
| 3 | No 2FA + KYC prompt with skip after registration | §4.1 step 6/6a | New **Protect your account** pane: email-2FA card, Sumsub (L2) card, "Skip for now — Level 1 dashboard" |
| 4 | No password-strength feedback | §4.1 NIST rules; NNG error prevention | Live 4-item requirement checklist on signup and reset (length-first, per NIST) |
| 5 | No 2FA **setup** flow (settings-initiated) | §4.4 | New setup pane (one-time email code, single-use/expiry copy, cancel) + "Email 2FA is on" confirmation w/ email-notified outcome |
| 6 | Reset flow reused magic-link pane: 10-min copy, no anti-enumeration, no set-new-password step | §4.3 | New **reset-sent** pane ("If an account exists… valid 15 minutes, single use"), **Set new password** (confirm + checklist + "signs you out on all devices"), **Password updated** → sign in again (OWASP: no auto-login) |
| 7 | No Remember Me | Session PRD UX req | Login checkbox + tooltip "Keep me signed in for 7 days on this device." |
| 8 | No idle-warning modal or signed-out cause page | Session PRD UX req | 60-s countdown modal (progress bar, Stay signed in / Sign out now) + **Signed out** pane with inactivity vs security cause copy |

## Notes / open items — RESOLVED (Pass 5b, same day)

Both open questions were settled by re-reading **SAD-3: Authentication Architecture Design**
(pageId 21987332, v27, 2026-05-04) — the newest, most detailed authoritative doc — plus the
earlier UNERA build (`setup-2fa.html` / `verify-2fa.html` backup-code flow, `login_2.html`):

- **2FA = email-only + backup codes.** SAD-3 scope: in — "Email 2FA + Backup Codes (Recovery)";
  out — "SMS/TOTP 2FA (v1)". → Removed the authenticator toggle. Login 2FA is an email code
  (5-min expiry per SAD-3 OTP table) with a "Use a backup code" fallback pane; 2FA setup now
  follows SAD-3's three-phase commit: email code → **save 10 backup codes** (`XXXX-XXXX-XXXX`,
  download/copy, confirm-saved gate) → 2FA on. Mirrors the early-UNERA setup-2fa pattern.
- **Remember Me = mobile-only, 7 days.** SAD-3 terminology + TTL policy table: mobile ON = 7d
  absolute expiry + 2FA skip; **desktop ignores the flag** and auto-logs-out after **30 min**
  inactivity. → The checkbox now renders only at mobile widths (where the brand panel
  collapses); tooltip keeps the PRD's 7-day copy. Signed-out/inactivity copy updated 15 → 30 min.
  (The Session PRD's "up to 2 weeks" exec-summary line and 15-min threshold are superseded.)
- **Password policy aligned to SAD-3:** min 8 chars + complexity (was 12 in the kit); checklist
  and placeholders updated.

Rate-limiting, token hashing, cookie policy remain backend concerns — represented only in copy.

## Pass 5c — edge & error cases (early-UNERA parity)

Ported the error vocabulary from the early UNERA build (`login_2`, `password-reset`, `verify-2fa`,
`setup-2fa`) into the dark auth kit, mapped to spec/SAD-3 rules:

- **Login** — inline field errors (required / invalid email), show-password eye toggle, generic
  failure banner ("That email or password doesn't look right" — anti-enumeration), and
  **lockout after 5 failed attempts** (SAD-3 throttling; demo: password `wrong`).
- **Signup** — inline email/password validation + required ToS consent error.
- **OTP screens** (verify email, login 2FA, 2FA setup) — incomplete-code error, wrong-code error
  with **3-attempt limit → code invalidated + re-sent** (SAD-3 2FA rate limit; demo: `000000`).
- **Password reset** — **"Link expired or invalid"** error screen (15-min/single-use copy +
  "Request a new link"), live confirm-password mismatch validation, submit guards.


This extends `Stablecoin-Audit-and-Changes-2026-06.md` (Passes 1–4); portal file untouched.
