# Huma consumer web consolidation audit (22 Aug 2026)

This folder (`UNERA_Latest_Aug22`) is the **single latest consumer web platform**, assembled from every version of the project that existed on 22 Aug 2026. It keeps the Claude Design project structure of `Huma July19` (CLAUDE.md, styles.css, tokens/, components/, ui_kits/, docs/, skills/, guidelines/, templates/, fonts/, assets/) and gathers **all 42 consumer pages** into `unera-pages/`.

Scope: **consumer web app only.** The Stablecoin institutional app plus the UneraAdmin and USAdmin consoles are separate products and were deliberately left out (they live in `CLB/Stablecoin *` and `NewUnera/UneraAdmin|USAdmin`).

## Sources examined

| Source | What it is | Used for |
|---|---|---|
| `Unera.zip` (uploaded) | Original consumer pages; identical content to `UneraClaude.zip` -> `Unera-Claude/NewUnera/` (mtimes 7–14 Jun) | Latest version of every **legacy page** not re-issued later |
| `UneraClaude.zip` | Same pages + `js/wallet/*`, `shared/*`, scripts, markdown notes | `shared/`, `js/wallet/config|manager|mock-data|ui.js` |
| `NewUnera June07.zip` | Consumer pages at 06:21 on 7 Jun + Stablecoin/USAdmin/UneraAdmin apps | Checked; its consumer pages are **older** than `Unera.zip`'s 09:38 versions (no skip-link, "Add Money" copy, 3-tab nav) -> not used |
| `NewUnera June21.zip` | 9 pages (wallet, send, trade, exchange, add-money, payee, settings, wallet-edge) | Superseded by June 28 / July 19 -> archived as `*_June21.html` |
| `CLB/UNERA_June28` | Claude Design export | Strict subset of July 12 (only differences: July 12 adds payment-methods + token-tx-validation) |
| `CLB/UNERAJuly12` | Claude Design export | Strict subset of July 19 |
| `CLB/UNERA July19` | Claude Design export | **Base of this folder.** Newest for 30 pages; adds donate / donations / donation-history / centre-detail / explore-centres redesign, ws-select.js, skills/, standalone wallet |
| `CLB/OldUnera` | Pre-V2 app | `auth-flow.js`, `code-input-handler.js`, `wallet-prompt.js` (legacy pages depend on them) |
| `CLB/Brand Guide` | Brand assets | `assets/brand/` PNG + PDF referenced by brand-style-guide |

Version resolution rule: for each page, the copy with the **latest real content** wins (verified by MD5 hash and full-minute mtime, not folder name). Every later export was confirmed to be a superset of the previous one, so nothing from an earlier version was lost.

## Page provenance (42 pages)

**From July 19 (latest design-system export, 30):** account-settings, add-money, centre-detail, donate, donation-history, donations, exchange, explore-centres, notifications, payee-management, payment-methods, send-enhanced, trade, wallet-edge, wallet-enhanced + support files (consumer-app-nav.css/js, auth-enhancements.css/js, donate-flow.js, donation-data.js, donation-shared.css, notifications-bell.js, token-tx-validation.js, ws-select.js, js/wallet/providers.js, NewLogo/).

**From Unera.zip (latest legacy version, 27):** account-security, brand-style-guide, connect-social, dashboard-enhanced, dashboard-kyc-blocked, dashboard-kyc-retry, email-notification-templates, flow-stablecoin-management, flow-stablecoin-remittance, forgot-password, governance, index, instructions, kyc-verify, kyc-verify-new, login_2, magic-link-sent, password-reset, proof-of-reserve-public, purchase-receipt, reset-storage, setup-2fa, signup_2, stake, verify-2fa, verify-email, wallet-creation.

**Archived (`unera-pages/_archive/`, 26 files):** all `_June04/06/07`, `_2` drafts, plus the June 14 and June 21 versions of the 8 pages that were re-issued, and the June 7 notifications page. Kept for reference, paths rewritten so they still open.

## Changes made to files (all minimal, path-only unless noted)

- Legacy pages: `../Brand Guide/*.otf` -> `../fonts/*.otf`; `../Brand Guide/*.png|pdf` -> `../assets/brand/`; `../OldUnera/*.js` and bare `auth-flow.js` / `wallet-prompt.js` -> `js/legacy/`.
- Bug fix: `js/legacy/auth-flow.js` line 333 had `async checkAnd Verify2FA()` (a syntax error that broke the script on 7 pages: dashboards, login, signup, connect-social, verify-2fa). Renamed to `checkAndVerify2FA`.
- `CLAUDE.md` and `skills/*.md`: source-of-truth pointer updated from `Unera-Claude/NewUnera/` to `unera-pages/`.
- Added `unera-pages/_all-screens.html` (visual index of every page) and `screenshots/pages/` (1366×900 captures).

## Verification

All 42 pages were rendered headlessly (Chromium, 1366×900): **0 JavaScript errors, 0 missing local assets (404s)**. Remaining dangling links are intentional: `Stablecoin/*.html` (other product, out of scope) and `connect-metamask.html` / `connect-walletconnect.html` (never existed in any version, so the wallet modal handles them instead).

Note: `dashboard-*.html` redirect to `login_2.html` when there is no session (the original auth guard). Sign in with any email, or use `reset-storage.html` to clear state.

## Open items you may want to decide later

- `CLB/NewUnera/notifications.html` carries an Aug 7 mtime but is byte-identical to the June 7 version; July 19's notifications page is used.
- `connect-metamask.html` / `connect-walletconnect.html` are linked from an archived draft (`_archive/wallet-enhanced_2.html`) but never existed in any version.
- Stablecoin app links on legacy pages (`Stablecoin/get-unera-cad.html` etc.) will only work if the Stablecoin folder is placed next to `unera-pages/`.
