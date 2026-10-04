# Huma — Notifications Gap Audit

Audited: `unera-pages/notifications.html` (the bell's "View all" target) and the notification
**bell + panel** on `unera-pages/account-settings.html`, against
`docs/UNERA-Notification-Services.md` (PRD page 65634349 v8).

Legend: ✅ meets · ⚠️ partial · ❌ gap → all ❌/⚠️ fixed in this pass unless marked *(backend)*.

## A. Semantic model
| # | PRD | Before | Action |
|---|---|---|---|
| A1 | §3 + AC-06 — visual treatment maps to **level** (completed/progressing/info/warning/error) | ❌ keyed to content *type* (transaction/donation/listing/remittance/verification/system) | Add `level` as the primary semantic: level icon + level color + **level text label**; type kept only as optional content tag |
| A2 | §7.1 unread = stronger weight **+ subtle left indicator bar** | ⚠️ unread dot + tinted bg, top accent bar by type | Add left indicator bar colored by level; keep weight |
| A3 | §7.3 color **never alone** — icon + text cue | ⚠️ icon only, no text level label | Add visible level label per row + descriptive icon `aria-label` |

## B. Events & copy (Huma Platform = §5.2)
| # | PRD | Before | Action |
|---|---|---|---|
| B1 | §5.2 events = Buy OTC / Trade filled / Swap completed / issue / service announcements | ⚠️ generic "Transaction Confirmed", plus donations/remittances/listings/stake | Reframe default feed to NOTI-UP-01..06 w/ platform language; keep impact items as `info` announcements |
| B2 | AC-03 — no mint/burn/cash-out in Huma copy | ✅ none present | Hold the line; add guard note |
| B3 | §6 + AC-04 — every tx notification carries tx/order ref + deep link | ⚠️ some items lack CTA/ref | Every transactional item gets a reference line + single primary CTA |
| B4 | Filter tabs | ⚠️ All/Unread/Transactions/Stablecoin/Donations/Remittances/Verification/Security (not PRD buckets) | Retabbed to PRD buckets: All · Unread · Transactions · Announcements · Issues |

## C. Bell panel (§7.5.2.2 / 7.5.2.3)
| # | PRD | Before | Action |
|---|---|---|---|
| C1 | Panel width **400px** desktop | ❌ 360px | 400px |
| C2 | Max height **70vh** | ❌ min(520px, 85vh) | 70vh |
| C3 | Empty state **"You're all caught up"** | ❌ "No notifications" | Illustration + "You're all caught up" |
| C4 | **Skeleton loader** rows while fetching | ❌ none | Skeleton rows on open/initial load |
| C5 | Badge cap **"99+"** | ❌ "9+" | "99+" |
| C6 | Badge hides at zero | ✅ | keep |
| C7 | Header: title + unread count + "Mark all as read" | ✅ | keep (label → "Mark all as read") |

## D. Toasts (§7.5.2.1) — ❌ none existed
Added: top-right stack, max 3 (oldest drops on 4th); auto-dismiss completed/info 5s, progressing 8s,
warning/error persistent; level icon + title + body + dismiss; click opens detail; `role=alert`
(error/warning) / `role=status` (else); top-center < 768px. Prototype demo bar fires one per level.

## E. Browser tab indicator (§7.5.2.4) — ❌ none existed
Added: `document.title` shows "(N) …"; reverts at zero. Favicon dot = optional, skipped.

## F. Accessibility (§7.5.2.6)
| # | PRD | Before | Action |
|---|---|---|---|
| F1 | Bell focusable + Enter/Space | ✅ | keep |
| F2 | Panel **arrow-key navigable** | ❌ | Up/Down moves between items, Home/End, Esc closes |
| F3 | Escape returns focus to bell | ✅ | keep |
| F4 | Level icons descriptive labels | ⚠️ `aria-hidden` only | add level label text + `aria-label` |

## G. Real-time (§7.5.2.5) — *(backend)* prototype note only
WebSocket/polling/backoff are backend concerns; prototype keeps localStorage + demo triggers and
documents the contract. Not built.

## H. Out of scope (§9) — confirm NOT added
No email, no SMS, no channel-preference matrix, no marketing. (account-settings "Notification
Preferences" card pre-dates this PRD; left as-is, not expanded.)
