# Huma wallet dashboard

> Captured from Confluence (page 68714527, v5): durable source of truth. The primary wallet view: real-time token holdings, USD valuations, 1-week price change, served from a BE cache (Indexer-triggered) to minimize RPC. Read-only display.

## 1. Overview & Scope
- Nav: Wallet Dashboard. Read-only portfolio view.
- Supported tokens: **USDC, USDT, hUSD** (all stablecoins; hUSD = Huma's Human-backed USD).
- Native gas token (HIGHLIGHT): Balances must ALSO show the chain's **native gas token** (e.g. **ETH** on Ethereum / configured network native) alongside ERC-20s, for wallet visibility & gas-awareness, **not** for issue/redeem ops.
- Objective: show per-token balance + **native gas token balance** + USD value + 1-week price change %, plus total wallet value.
- In scope: balance display (ERC-20 + native + total USD), 1-week change %, read from BE cache, Indexer-triggered refresh, **Distribution view** (per-token share of total).
- Out of scope: Issue/Redeem lock rate, real-time WebSocket prices, NFTs, multi-chain aggregation (Phase 1 = single chain).
- Prereqs: Platform account; wallet connected (MetaMask / WalletConnect / Coinbase).

## 2. Architecture (why FE must not call RPC)
BE-side balance via **Indexer-triggered caching**: on connect, BE Multicalls `balanceOf()` for ERC-20s + fetches native balance, caches in Redis (no TTL, invalidated by Indexer events). FE always reads BE API, **never touches chain**. Prices cached 60s TTL; daily snapshot cron for 7-day-ago price. Latency target: cache updated within **60s** of on-chain tx.

## 3. User Flow
1. Open Wallet Dashboard. 2. FE -> BE `/v1/balances` (cached, incl. native). 3. FE -> BE `/v1/prices`. 4. Filter `balance > 0`. 5. Compute USD per token + total. 6. Render.

## 5. Frontend Logic (what the UI must do)
- APIs: `GET /v1/balances?wallet=` (ERC-20 + native), `GET /v1/prices` (current + 1w change %).
- Compute: USD per asset = `balance × price`; total = Σ ERC-20 USD + native USD (when price available).
- Distribution: each token `token_usd / total_usd × 100`.
- Filter: only `balance > 0` rendered.
- Empty: if no token has balance -> empty Wallet Dashboard state.
- Error: balance API error -> **"Unable to load balances. Please try again"** + **retry** button. Never fall back to on-chain.

## 8. UI/UX
- Principles: lightweight, clarity over decoration, progressive disclosure (advanced behind gear/toggle).
- Responsiveness: Desktop ≥1024 two-col (sidebar + main); Tablet 768–1023 single-col collapsible nav; Mobile <768 full-width cards + bottom tabs.
- Components: Token Selector (icon + symbol + balance), Status Badge (green Completed / yellow Pending / red Failed / gray Cancelled), Toast (auto-dismiss 5s).
- Loading: **skeleton loaders** for data fetches (dashboard, prices); spinner only for wallet interactions.
- Empty: friendly illustration + actionable CTA ("No tokens in your wallet. Make your first purchase").
- Error: inline below field; toast for transient.
- A11y: keyboard nav; states have **text labels not color alone**; screen-reader support for dashboard data.

## 9. Acceptance Criteria
- AC-PORT-01 Loads <3s; shows all assets balance>0, incl. ERC-20s **and native gas token**.
- AC-PORT-02 Each row: icon, symbol, balance, USD value, **1-week change %**.
- AC-PORT-03 Total wallet USD shown, equals sum of token values.
- AC-PORT-04 No balances -> empty state.
- AC-PORT-05 Unavailable price -> **"–" not "$0.00"**.
- AC-PORT-06 All balances from BE cache: FE must not call RPC.
- AC-PORT-07 Cache refreshed within 60s of relevant on-chain tx.
- AC-DIST-01 Distribution shows all tokens balance>0 with % share.
- AC-DIST-02 % = `token_usd/total_usd×100`, sum 100% (±0.1%).
- AC-DIST-03 Only USDC, USDT, hUSD in distribution. *(native shown in Balances, not Distribution)*
- AC-DIST-04 One token -> 100%.
- AC-DIST-05 No balances -> distribution hidden, empty state shown.
- AC-CROSS-01 Wallet disconnect mid-flow -> error + return to connect prompt.
- AC-CROSS-04 Meets responsive breakpoints.
- AC-CROSS-05 Keyboard navigable + WCAG AA contrast.

## Native token row: display detail
`/v1/balances` returns native as `{ token:"native", symbol:"ETH", balance:"0.125…", decimals:18, assetType:"native" }`. Show it in **Balances** with icon + symbol + balance + USD value + 1w change; **exclude from Distribution** (AC-DIST-03 lists only the 3 stablecoins). Native with no price -> "-".
