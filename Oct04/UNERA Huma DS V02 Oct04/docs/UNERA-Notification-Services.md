# Huma notification services (captured PRD)

> Source: Confluence "Notification Services" (page 65634349), version 8 (2026-06-04).
> Captured via Atlassian connector because the live page is auth-gated. This is the
> source of truth for notification work on the Huma **Platform** (consumer app).

**Purpose:** Defines user-facing notification requirements for two *separate* products -
the **Unera Stablecoin** (issuer portal) and the **Huma Platform** (consumer
exchange/wallet app). Notifications are **not reusable across the two**. Each product owns
its own UI rules, events, templates, records and channels. The `unera-pages/` consumer app
is the **Huma Platform** product: use §5.2 events and platform journey language.

## 3. Notification Levels (the primary semantic, visual treatment maps to LEVEL, not content type)

| Level | Meaning | Examples |
|---|---|---|
| `completed`   | Action finished successfully | Mint completed, OTC buy completed, swap completed |
| `progressing` | A follow-up task started after a prior step completed | Redeem burned and bank payout started |
| `info`        | Neutral informational update | Maintenance, product update, service announcement |
| `warning`     | Attention needed or delayed, not final failure | Processing delay, partial degradation, review pending |
| `error`       | Failure or blocked action | Payment issue, settlement failure, unable to complete swap |

## 5.2 Huma Platform Required Events (THIS app)

| ID | Event | Level | Trigger | Outcome |
|---|---|---|---|---|
| NOTI-UP-01 | Buy hUSD (OTC) completed | completed | OTC purchase flow completes | Confirm purchase; update portfolio/activity/order detail |
| NOTI-UP-02 | Trade stablecoin order filled | completed | Exchange engine fully fills order | Confirm fill; updated balances + trade history |
| NOTI-UP-03 | Swap stablecoin completed | completed | Swap engine returns final success | Confirm swap w/ reference + updated balances |
| NOTI-UP-04 | Stablecoin buy/trade/swap issue | warning OR error | Platform detects user-facing issue in OTC/trade/swap | Summarize issue in platform language; link to order/tx detail |
| NOTI-UP-05 | Stablecoin service announcement surfaced on platform | info OR warning | Stablecoin notice affects Huma users | Inform of impact w/o reusing Stablecoin records |
| NOTI-UP-06 | General Platform service notification | info OR warning | Operator announcement | Maintenance, interruption, product update, Platform news |

(§5.1 Stablecoin Layer events NOTI-SC-01..06 are the **issuer portal**, not this app.)

## 6. Content & messaging rules
- Every transaction notification includes a **transaction ID / order ID / deep link** to details.
- Never expose compliance reason codes, sanctions results, internal queue names, operator notes.
- Plain language: what happened, what it means, what to do next.
- `progressing` only when a meaningful downstream user-visible step begins.
- Huma copy uses platform journey language, not issuer language (no mint/burn/cash-out; AC-03).

## 7. UI/UX
### 7.1 Notification center
- Reverse chronological.
- Each row: **level icon, title, short body, timestamp, unread state, primary action**.
- Unread = stronger text weight + **subtle left indicator bar**.
- Click opens related transaction/order/announcement detail.

### 7.3 Visual rules
- Title = one-line summary; Body = 1–2 short sentences; Action = single primary CTA
  (View transaction / View order / Contact support).
- Color mapped to level, **never color alone**: always icon + text cue.

### 7.4 Interaction states
- Unread · Read · Archived/auto-expired (low-priority info) · Persistent (critical tx outcomes until viewed).

### 7.5.2 Web App UX
- Toasts (7.5.2.1): top-right; auto-dismiss `completed`/`info` 5s, `progressing` 8s, `warning`/`error` persistent;
  max 3 stacked (oldest dismissed on 4th); each has level icon + title + short body + dismiss button;
  click body opens detail; must not block nav. Below 768px -> top-center.
- Panel (7.5.2.2): bell-anchored dropdown/slide-out; **width 400px desktop, full-width drawer < 768px**;
  **max height 70vh** w/ scroll; lazy-load/infinite scroll; header = "Notifications" + unread count + "Mark all as read";
  empty state illustration + "You're all caught up"; **skeleton loader rows while fetching**.
- Badge (7.5.2.3): unread count on bell; **cap "99+"**; real-time (WebSocket); **hide at zero**.
- Browser tab (7.5.2.4): document title shows unread count, e.g. "(3) Huma Dashboard"; revert when all read; optional favicon dot.
- Real-time (7.5.2.5): WebSocket primary, 30s polling fallback, exponential backoff reconnect, fetch missed on reconnect. *(backend; prototype simulates)*
- A11y (7.5.2.6): bell Tab-focusable + Enter/Space; panel **arrow-key navigable**; Escape closes + returns focus to bell;
  toasts `role="alert"` for error/warning, `role="status"` otherwise; level icons have descriptive labels; never color-only.
- Responsive (7.5.2.7): >1024 dropdown; 768–1024 wider drawer; <768 full-screen drawer w/ back/close; toast top-center <768.

## 8. Acceptance criteria
- AC-01 Stablecoin & Huma notifications stored as separate records/IDs.
- AC-02 Mint completion supports fiat- AND crypto-funded issuance. *(issuer portal)*
- AC-03 **Huma never shows mint/burn/cash-out terminology in user copy.**
- AC-04 Each notification links to a relevant transaction/order/announcement detail page.
- AC-05 Warning/error copy hides sensitive internal/compliance info.
- AC-06 Center supports read/unread + clear **level-based** visual treatment.

## 9. Out of scope
Operator-only alerts/routing · channel preference management · **email** · **SMS-first** workflows · marketing/promo.
