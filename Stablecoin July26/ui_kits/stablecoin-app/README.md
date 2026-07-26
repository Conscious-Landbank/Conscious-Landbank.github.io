# Stablecoin App — UI kit

Interactive click-through of the **authenticated UNERA Stablecoin Portal (hUSD)**, aligned to
the Stablecoin Portal PRD (v14) + the Authentication & KYC spec. Self-contained HTML/CSS/JS
linking the design tokens. Latest visual system: Deep Blue `#163b44`, **Signal Yellow `#ecd6a0`**
accent, Verified Teal, teal/coral surfaces, toned-down radii.

**Entry:** `index.html`

### Nav spine (reuses UNERA account-settings cluster)
- **Notification bell + panel** — gold badge, "Mark all read" / "Clear all", stablecoin events
  (mint completed, redemption disbursed, identity verified, reserve attestation).
- **Profile / wallet / network** in a single boxed white pill: avatar → wallet (address +
  balance) → **network switcher** (Ethereum / Arbitrum / Base, for the crypto-onramp context).
  The avatar opens a profile dropdown with a **KYC-level chip** (L1/L2) + **Verified** chip, a
  copyable wallet address, and Account links (verification, security, history, disconnect, log out).
- **Connect-wallet modal** — full account-settings parity: DEV scenario pills (happy / wrong
  network / not installed / user rejected) and MetaMask · WalletConnect · Coinbase · Brave · Ledger.
- Disconnected shows the Cloud-Blue "Connect wallet" pill; connected reveals the wallet cluster.

### Screens
- **Dashboard** — hUSD balance, circulating supply, reserve ratio; KYC-tier card; **L1/L2
  access gating** (L1 = hold/view; L2 = issue & redeem). Dev Level toggle (bottom-left).
- **Issue** — **Prerequisites** (KYC + wallet, hides once complete — UNERA parity) → Amount →
  Review → Status → Done. Two funding paths: **Fiat** and **Crypto onramp** (USDC/USDT → unique
  deposit address + confirmations). Live conversion preview with a rate-freshness countdown;
  status timeline (settled → compliance → hold → mint).
- **Redeem** — same **Prerequisites** behaviour → Amount → Review → Status (burn → liquidity →
  disbursement, ~1-business-day SLA).
- **Proof of Reserve** (public) — ratio gauge vs the 100% floor, composition donut,
  reserve-by-custodian, maturity ladder, 90-day trend, yield → Humanity Centres, on-chain
  contract address, cumulative volumes, downloadable quarterly attestations, per-chart timestamps.
- **History** — summary KPIs (issued / redeemed / net / count), search + type filter +
  date-range + **Export CSV**, and the PRD-field table (Initiated · Type · In · Out · Fee · Rate
  · Tx · Status). Mint/burn only — no swaps (out of scope for this layer).
- **KYC** — Sumsub-framed handoff with an In-Review state that elevates to Level 2.

### Patterns
Reserve-grade palette, Deep-Blue stepper progression, status timelines, fixed `--por-*`
composition colors, pure-SVG charts, the boxed wallet cluster, and the notifications/profile
dropdowns — all token-driven so they track the design system.
