# Auth — UI kit

The **UNERA Stablecoin Portal** authentication flows (Coinbase-style, per the *Authentication &
KYC* spec). Split layout: a Deep-Blue brand panel beside the form.

**Entry:** `index.html`

### Screens / states
- **Login** — email + password, "Forgot?", magic-link alternative.
- **Sign up** — email-first (email, first/last name, country, password). Creates a **Level 1**
  account; identity verification (Sumsub) later unlocks **Level 2**.
- **Verify email** — 6-digit OTP, auto-advance, anti-enumeration.
- **Magic link sent** / **Forgot password** (reset link valid 15 min).
- **Two-factor** — **email-based one-time code by default**, with an **Authenticator (TOTP)**
  toggle so both options are represented (resolving the spec conflict).
- **Done** — signed-in success showing the **access level** (L1: hold/view) with a prompt to
  verify for L2; links into the Stablecoin App kit.

Access levels: L0 public PoR → L1 email+password (hold/view) → L2 KYC (issue & redeem).
