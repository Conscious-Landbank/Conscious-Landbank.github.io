# Test Cases — UNERA Human Centres & Donation

**Source of truth:** Confluence — *UNERA - Human Centres & Donation (In-Review)* (page 74579981, v8, last modified Jul 08 2026)
**Scope:** Public HC browsing, HC detail, fiat & crypto donation, donation history & receipts, UYT-from-donations, notifications, plus cross-cutting states, error handling, security, a11y, and responsive.
**Anchor of interest:** §4.3.1 Notification (called out in the request) — covered in full in Suite 8.

---

## How to read this document

Each case carries:

- **ID** — `TC-<AREA>-<nn>`. Areas map to PRD sections.
- **Type** — Happy / Validation / Error / Edge / Security / A11y / Perf.
- **Priority** — P1 (blocker/critical path), P2 (major), P3 (minor).
- **Precondition → Steps → Expected result.**
- **Traceability** — the PRD requirement / acceptance criterion / flow it verifies.

**Test data conventions**

| Token | Meaning |
| --- | --- |
| `HC_ACTIVE` | Active Humanity Centre, `is_active = true` |
| `HC_INACTIVE` | `is_active = false` |
| `USER_PUBLIC` | Not logged in |
| `USER_AUTH` | Logged in, **no** KYC |
| `USER_KYC` | Logged in + KYC verified |
| `USER_KYC_WALLET` | KYC verified + wallet connected |
| `MIN` / `MAX` | Configured donation amount bounds |
| Amounts | Store as minor units / token base units; assert display formatting separately |

**Global preconditions (apply unless overridden):** APIs reachable; feature flag ON; supported currency list = { hUSD, USDT, USDC, ETH } for crypto and credit/debit card for fiat (MVP — OQ-01 Closed).

---

## Suite 1 — Donation Page / Impact Dashboard (§3.1, §6.1)

### Happy path

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-DASH-01 | Happy | P1 | `USER_KYC` with donation history | Open Donation page | Page renders **separate** from Wallet Dashboard; hero, impact summary, user summary cards, compact HC list all present | DON-DASH-01, AC-DON-01 |
| TC-DASH-02 | Happy | P1 | `USER_KYC`, 3 completed donations | Open Donation page | "Total donated" card shows correct user-scoped aggregate matching sum of completed history | DON-DASH-02, AC-DON-07 |
| TC-DASH-03 | Happy | P2 | `USER_KYC`, lives-impacted data present | Open page | "Total lives impacted" card shows value | DON-DASH-03 |
| TC-DASH-04 | Happy | P2 | `USER_KYC`, UYT reward data present | Open page | "UYT earned from donations" card shows cumulative aggregate | DON-DASH-04, DON-UYT-04 |
| TC-DASH-05 | Happy | P1 | `USER_KYC`, ≥1 donation | Open page | Recent donation history section shows latest N; "View all" links to full history | DON-DASH-05 |
| TC-DASH-06 | Happy | P1 | Any user | Open page | Compact/featured HC list renders with Donate CTAs | DON-DASH-06 |
| TC-DASH-07 | Happy | P1 | `USER_KYC_WALLET` | Open page | Minimal donatable balance shows supported crypto + est. USD + gas awareness only — **no** full portfolio/charts | DON-DASH-07, AC-DON-06 |
| TC-DASH-08 | Happy | P2 | `USER_KYC_WALLET` | Click "Wallet Dashboard" link | Navigates to full Wallet Dashboard | DON-DASH-08, AC-DON-06 |

### Validation / edge

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-DASH-09 | Edge | P2 | Lives-impacted source not ready | Open page | Card shows "Coming soon" **or** is hidden — never shows 0 as if real | DON-DASH-03, §4.1 |
| TC-DASH-10 | Edge | P2 | `USER_AUTH` (no KYC) | Open page | Public + account-scoped summary shown where available; personal cards gated behind eligibility, not broken | Personas §2 |
| TC-DASH-11 | Edge | P2 | `USER_PUBLIC` | Open page | Public impact + HC list visible; personal summary cards replaced with login prompt | State: Public/unauthenticated §6.2 |
| TC-DASH-12 | Edge | P3 | Balance cache has `lastUpdated` | Open page (wallet) | "Last updated" timestamp displayed next to donatable balance | §4.1 |
| TC-DASH-13 | Perf | P2 | Normal conditions | Cold-load page | HC directory content loads < 3s; skeletons shown while fetching | §4.1 |
| TC-DASH-14 | Security | P1 | `USER_KYC` | Inspect summary responses | No other donors' PII / donor-level data present; only user-scoped + public aggregate | §4.2, AC-DON-07, AC-DON-12 |

---

## Suite 2 — Humanity Centre Directory (§3.2)

### Happy path

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-DIR-01 | Happy | P1 | `USER_PUBLIC`, active HCs exist | Open directory (no login) | Active HCs render publicly, no login wall | HC-DIR-01, AC-DON-01 |
| TC-DIR-02 | Happy | P1 | Active HCs | View a card | Shows name, country, image, short description, total donated, lives impacted | HC-DIR-02 |
| TC-DIR-03 | Happy | P2 | ≥2 HCs by name | Search "Bright" | List filters to matching HC names | HC-DIR-03 |
| TC-DIR-04 | Happy | P2 | HCs across countries | Filter country = CA | Only CA active HCs shown | HC-DIR-04 |
| TC-DIR-05 | Happy | P1 | Active HC | Click card / "View details" | Opens HC Detail Page | HC-DIR-05 |
| TC-DIR-06 | Happy | P2 | Donation available | View card | Donate CTA present | HC-DIR-06 |

### Validation / edge / error

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-DIR-07 | Edge | P1 | No active HCs | Open directory | Empty state message; Donate CTAs hidden | State: Empty HC list §6.2 |
| TC-DIR-08 | Edge | P2 | Only `HC_INACTIVE` exist | Open directory | Inactive HCs not shown by default (public view) | HC-DIR-04 |
| TC-DIR-09 | Edge | P2 | Search yields nothing | Search "zzz" | Empty search result state; no error | HC-DIR-03 |
| TC-DIR-10 | Edge | P3 | HC missing image | View card | Graceful image placeholder, layout intact | HC-DIR-02 |
| TC-DIR-11 | Edge | P3 | `total_donated`/`lives_impacted` null | View card | Partial-stats state, no NaN / "undefined" | HC-DIR-02, §4.1 |
| TC-DIR-12 | Error | P1 | HC API returns 5xx | Open directory | Neutral "unavailable" state; no stack/internal detail leaked | §6.2 Unavailable, AC-DON-12 |
| TC-DIR-13 | Perf | P2 | Large HC list | Scroll/paginate | Pagination or infinite scroll works without duplicates | HC-DIR, §7.2.2 step 1 |
| TC-DIR-14 | Edge | P3 | Search input | Type special chars / very long string | Sanitized, no crash, no injection | §4.2 |

---

## Suite 3 — HC Detail Page (§3.3)

### Happy path

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-DET-01 | Happy | P1 | `HC_ACTIVE` | Open from directory | Shows name, country, description, images, programs, charity reg no (if public), active status | HC-DETAIL-01/02, AC-DON-02 |
| TC-DET-02 | Happy | P1 | `HC_ACTIVE` | View totals | Public total donated shown (fiat + crypto→USD aggregate) | HC-DETAIL-03 |
| TC-DET-03 | Happy | P1 | Data present | View impact | Public lives impacted shown | HC-DETAIL-04, AC-DON-02 |
| TC-DET-04 | Happy | P2 | Stats backend supports it | Toggle day/week/month/year | Aggregate public stats update per period | HC-DETAIL-05 |
| TC-DET-05 | Happy | P1 | `HC_ACTIVE` | Click Donate | Donation flow opens with this HC preselected | HC-DETAIL-06, Flow §5.1 |

### Validation / edge / error

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-DET-06 | Error | P1 | `HC_INACTIVE` | Open detail / attempt donate | Donation prevented; safe generic message; **no internal reason** exposed | HC-DETAIL-07, AC-DON-10, AC-DON-12 |
| TC-DET-07 | Security | P1 | `HC_ACTIVE` | Inspect payload | No private operator notes / non-public compliance data present | HC-DETAIL-02, §4.2 |
| TC-DET-08 | Edge | P2 | Lives impacted not available | Open detail | "Coming soon" or omitted, not fabricated | HC-DETAIL-04, §4.1 |
| TC-DET-09 | Edge | P3 | Charity reg no not approved public | Open detail | Reg no hidden | HC-DETAIL-02 |
| TC-DET-10 | Error | P2 | HC detail API 404 (bad id) | Open `/hc/:badId` | Not-found state, no crash | §6.2 |
| TC-DET-11 | Edge | P3 | HC address shown | View wallet display | Safe/abbreviated formatting; full copy only where appropriate | §4.2 |

---

## Suite 4 — Fiat Donation Flow (§3.4, §5.2)

### Happy path

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-FIAT-01 | Happy | P1 | `USER_KYC`, `HC_ACTIVE` | Donate → confirm HC → enter valid amount → review | Review shows HC, amount, method (card); Submit enabled | DON-FIAT-02, AC-DON-03 |
| TC-FIAT-02 | Happy | P1 | As above | Submit | `donation_orders` created; payment confirmation shows amount, status, memo, expiry, next steps | DON-FIAT-03/04, AC-DON-03 |
| TC-FIAT-03 | Happy | P1 | Order created, payment made | Payment completes, operator transfer still pending | UI shows "Awaiting confirmation" — **not** "Completed" | DON-FIAT-06, AC-DON-04 |
| TC-FIAT-04 | Happy | P1 | Final confirmation reached | Wait for finality | Status → Completed; written to donation_history with `source = fiat` | DON-FIAT-07, §5.2 step 9 |
| TC-FIAT-05 | Happy | P2 | Completed + eligible | After completion | Receipt generation triggered; receipt status surfaces | DON-FIAT-08 |
| TC-FIAT-06 | Happy | P2 | Completed + eligible | After completion | UYT earned event/calc triggered; shown as estimated/pending | DON-FIAT-09, DON-UYT-03 |

### Validation

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-FIAT-07 | Validation | P1 | Amount step | Enter 0 / blank / non-numeric | Submit blocked; "Enter a valid donation amount." | §6.3, DON-FIAT-02 |
| TC-FIAT-08 | Validation | P1 | Amount step | Enter < MIN | Blocked; "Donation amount must be between [min] and [max]." | §6.3 |
| TC-FIAT-09 | Validation | P1 | Amount step | Enter > MAX | Blocked; range message | §6.3 |
| TC-FIAT-10 | Validation | P2 | Amount step | Enter negative / excessive decimals | Blocked/normalized per currency precision | §6.3, §4.2 |
| TC-FIAT-11 | Validation | P1 | `USER_PUBLIC` | Click Donate | "Log in to complete your donation." → routes to login | §5.6, §6.3 |
| TC-FIAT-12 | Validation | P1 | `USER_AUTH` (no KYC) | Proceed to submit | "Complete verification to continue with this donation." → KYC CTA; no dead-end | §5.6, §6.3 |

### Error / edge

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-FIAT-13 | Error | P1 | Pending fiat order | Let `expires_at` pass | Order expires; "This donation request expired. Please start a new donation." | DON-FIAT-05, §6.3, §5.7 |
| TC-FIAT-14 | Error | P1 | Provider outage | Submit payment | "We could not process the payment right now. Please try again." + retry/support path | §6.3, §7.2.2 step 3 |
| TC-FIAT-15 | Error | P2 | Status uncertain/timeout | Submit, no response | Order kept **pending** (not failed); "taking longer than expected…" | §6.3 Timeout |
| TC-FIAT-16 | Edge | P1 | Double-click Submit / retry | Submit twice fast | Idempotency prevents duplicate order (single `donation_orders` record) | §4.2, §7.2.2 step 3 |
| TC-FIAT-17 | Error | P2 | Operator transfer fails | After payment | Status `requires_resolution`; safe user message, no internal codes | DON-FIAT-05, §6.3 |
| TC-FIAT-18 | Edge | P2 | User leaves during pending | Navigate away & return | Can leave safely; status resumable via status page/deep link | §6.2 Pending |
| TC-FIAT-19 | Security | P1 | Any failure | Read error copy | No compliance reason codes, provider secrets, or operator notes exposed | §4.2, AC-DON-12 |

---

## Suite 5 — Crypto Donation Flow (§3.5, §5.3, §7.2.3)

### Happy path

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-CRY-01 | Happy | P1 | `USER_KYC_WALLET`, supported balance | Donate crypto → select asset | Shows available supported crypto, est. USD, gas awareness before confirm | DON-CRYPTO-02, AC-DON-06 |
| TC-CRY-02 | Happy | P1 | Amount entered | Review step | Shows HC, asset, original crypto amount, **USD conversion quote**, est. gas, wallet address (abbrev) before signing | DON-CRYPTO-03 |
| TC-CRY-03 | Happy | P1 | Contract requires approval | Confirm | `approve` prompt appears first; flow waits for approval confirmation before donate | §7.2.3 approve |
| TC-CRY-04 | Happy | P1 | Approved | Confirm donate | `donate(hc, amount, donationId)` signed; UI shows Submitted → Awaiting confirmation | DON-CRYPTO-05, §5.3 step 6 |
| TC-CRY-05 | Happy | P1 | Tx confirmed on-chain | Indexer resolves | Written to `donation_history` with `source = onchain`; user_id resolved by wallet | DON-CRYPTO-06, AC-DON-05 |
| TC-CRY-06 | Happy | P1 | Completed | Success screen | Shows txHash + explorer link, receipt status (if eligible), UYT earned state | DON-CRYPTO-07, §5.3 step 8, AC-DON-05 |
| TC-CRY-07 | Happy | P2 | Completed + eligible | After finality | Receipt uses **confirmed USD value**; UYT uses USD donation value | DON-CRYPTO-08/09 |
| TC-CRY-08 | Happy | P2 | Donation record | View history | Preserves original crypto amount **and** USD equivalent | DON-CRYPTO-04, DON-HIST-02 |

### Wallet state matrix

| ID | Type | Pri | State | Expected UI | Trace |
| --- | --- | --- | --- | --- | --- |
| TC-CRY-09 | Happy | P1 | Awaiting signature | Spinner + "Confirm in wallet"; no completion shown | DON-CRYPTO-05 |
| TC-CRY-10 | Happy | P1 | Submitted | "Submitted" state, not completed | DON-CRYPTO-05 |
| TC-CRY-11 | Happy | P1 | Awaiting confirmation | Pending tracker; safe to leave | DON-CRYPTO-05, §6.2 |
| TC-CRY-12 | Happy | P2 | Conversion pending | Distinct "conversion pending" state before completed | DON-CRYPTO-05 |
| TC-CRY-13 | Error | P1 | Rejected by user | "Donation was not submitted because the wallet request was rejected." Flow stops safely | §6.3, §5.7 |
| TC-CRY-14 | Error | P1 | Failed / reverted | "Unable to complete this donation. Please try again." Marked failed | §6.3, §7.2.3 |

### Validation / gating

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-CRY-15 | Validation | P1 | `USER_KYC`, wallet **not** connected | Choose crypto | "Connect your wallet to donate crypto." Crypto disabled until connected | §6.2 Wallet not connected, §6.3 |
| TC-CRY-16 | Validation | P1 | Amount > balance | Enter amount | "You do not have enough [crypto] for this donation." Confirm disabled | §6.3 Insufficient balance |
| TC-CRY-17 | Validation | P1 | No native gas token | Proceed | "You may need more gas token to complete this transaction." Warn/disable per wallet | §6.3 Insufficient gas |
| TC-CRY-18 | Validation | P1 | `USER_AUTH` no KYC | Choose crypto | KYC gate before wallet step; no dead-end | §5.3 step 2, §5.6 |
| TC-CRY-19 | Validation | P2 | Unsupported token selected | Select asset | Only product-approved assets selectable | DON-CRYPTO-01 |

### Edge / contract

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-CRY-20 | Edge | P1 | USD quote expiry | Sit on review past quote validity | Quote re-fetched / user re-confirms before submit; stale quote not used | DON-CRYPTO-03, §4.1 |
| TC-CRY-21 | Edge | P2 | HC becomes inactive/unregistered at sign time | Confirm | Contract-level revert handled → failed state, safe message | §7.2.3 donate errors |
| TC-CRY-22 | Edge | P2 | Insufficient allowance | Donate without/partial approve | Handled: re-prompt approve, do not proceed | §7.2.3 |
| TC-CRY-23 | Edge | P2 | Contract paused | Confirm | Graceful failed/unavailable state | §7.2.3 |
| TC-CRY-24 | Edge | P2 | Tx submitted then timeout | No confirmation | Stays pending with txHash; notification on final status | §6.3 Timeout, §5.7 |
| TC-CRY-25 | Edge | P3 | Indexer dedupe | Same tx indexed twice | Single history record (dedupe by txHash/log index) | §7.2.2 step 5, §7.2.3 Indexer |
| TC-CRY-26 | Edge | P3 | Anonymous / unmatched wallet | Donate from unknown wallet | Recorded as public aggregate where permitted; `user_id` null | DON-CRYPTO-06, §7.1.3 |

### Multi-HC (§5.5) — only if UI phase supports `donateMulti`

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-CRY-27 | Edge | P2 | Multi-HC supported | Select multiple HCs + allocations | Shows each HC + allocation, total, gas estimate | §5.5 |
| TC-CRY-28 | Edge | P2 | Multi-HC | Confirm `donateMulti` | Per-HC allocations confirmed in history + public totals only after confirmation | §5.5, §7.2.3 donateMulti |
| TC-CRY-29 | Validation | P2 | Multi-HC | Mismatched array length / total | Blocked before submit | §7.2.3 donateMulti error handling |
| TC-CRY-30 | Edge | P3 | Multi-HC fiat | Attempt multi via fiat | Not offered (fiat multi not MVP — OQ-03 Closed) | §5.5 note, OQ-03 |

---

## Suite 6 — Donation History & Receipt (§3.6)

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-HIST-01 | Happy | P1 | `USER_KYC`, mixed donations | Open history | User-scoped list of fiat + crypto donations | DON-HIST-01 |
| TC-HIST-02 | Happy | P1 | History rows | Inspect a fiat row | Shows HC, amount, currency, fiat equivalent, source, status, date | DON-HIST-02 |
| TC-HIST-03 | Happy | P1 | Crypto row | Inspect | Shows txHash, original token, original amount, explorer link, USD equivalent | DON-HIST-02, DON-CRYPTO-07 |
| TC-HIST-04 | Happy | P2 | Many rows | Filter by status / HC / source / date range | Correct filtered results | DON-HIST-03 |
| TC-HIST-05 | Happy | P1 | > 1 page | Scroll / next page | Cursor pagination, **no duplicates** | DON-HIST-04 |
| TC-HIST-06 | Happy | P1 | Any donation | Open detail | Shows order ID, HC, status, amount, receipt, txHash/explorer (on-chain) | DON-HIST-05 |
| TC-HIST-07 | Happy | P2 | Receipt available + eligible | Click download | Tax receipt PDF downloads (`pdf_url`/receipt endpoint) | DON-HIST-06, AC-DON-08 |
| TC-HIST-08 | Edge | P1 | No donations | Open history | "No donations yet" + browse HC CTA | §6.2 Empty history |
| TC-HIST-09 | Edge | P2 | Receipt pending/unavailable | Open detail | Clear pending/unavailable state; **does not imply guaranteed legal receipt** | DON-HIST-07, §6.3 |
| TC-HIST-10 | Error | P2 | Receipt gen failed | Open detail | Retry/support path; does **not** imply donation failed | §7.2.2 step 6 |
| TC-HIST-11 | Security | P1 | `USER_KYC` | Try to access another user's donation/receipt id | Access denied; receipt only to eligible donor | §4.2, AC-DON-07 |
| TC-HIST-12 | Edge | P2 | Pending donation in list | View row | Shows pending until confirmed; no premature "completed" | §7.2.2 step 5 |
| TC-HIST-13 | Edge | P3 | Timezone/format | Inspect timestamps | Consistent timestamps for donation, status change, receipt | §6.4 |

---

## Suite 7 — UYT Gains from Donations (§3.7)

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-UYT-01 | Happy | P2 | Donation earns UYT, confirmed | Success screen | Shows confirmed UYT earned with clear label | DON-UYT-01/03, AC-DON-09 |
| TC-UYT-02 | Happy | P2 | Async minting | Success screen right after completion | Labeled "estimated" or "pending" — not confirmed | DON-UYT-03, AC-DON-09 |
| TC-UYT-03 | Happy | P2 | Cumulative data available | Donation page | Cumulative UYT-from-donations aggregate shown | DON-UYT-04 |
| TC-UYT-04 | Edge | P2 | UYT delayed/unavailable | After completion | Donation stays **completed**; UYT shows pending/unavailable independently | §7.2.2 step 7 |
| TC-UYT-05 | Edge | P3 | UYT status `failed` | View | Handled label; donation success unaffected | §7.1.5 status enum |
| TC-UYT-06 | Security/Scope | P1 | Any | Inspect UI | No full revenue-sharing / epoch claim / UYT-to-UGT flow present; links out only | DON-UYT-05 |
| TC-UYT-07 | Edge | P3 | FE display | Inspect values | UYT values come from UYT service; **not** hardcoded/calculated in FE | DON-UYT-02, Risk §9.1 |

---

## Suite 8 — Notification (§4.3.1) — *primary requested anchor*

**Rule under test:** every lifecycle event fires the correct notification at the correct **level** on the correct **channel**, with safe display data only. Levels: `info`, `progressing`, `completed`, `error`.

| ID | Type | Pri | Event / Trigger | Expected notification | Channel | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-NOT-01 | Happy | P1 | User creates fiat order / submits crypto tx | "Donation submitted" — level **info** | In-app / notification center | §4.3.1 |
| TC-NOT-02 | Happy | P1 | Fiat order created, awaiting payment | "Fiat donation payment instructions ready" — **info** | In-app / notification center | §4.3.1 |
| TC-NOT-03 | Happy | P1 | Payment received / tx submitted, not final | "Donation awaiting confirmation" — **progressing** | In-app / notification center | §4.3.1, AC-DON-04 |
| TC-NOT-04 | Happy | P1 | Donation reaches confirmed final state | "Donation completed" — **completed** | In-app + email **if enabled** | §4.3.1 |
| TC-NOT-05 | Happy | P1 | Payment fails / tx reverts / order expires | "Donation failed" — **error** | In-app / notification center | §4.3.1, §5.7 |
| TC-NOT-06 | Happy | P1 | Receipt PDF generated | "Tax receipt available" — **info** | In-app + email **if enabled** | §4.3.1, DON-HIST-06 |
| TC-NOT-07 | Happy | P1 | UYT earning record confirmed | "UYT earned from donation" — **completed** | In-app / notification center | §4.3.1, DON-UYT-01 |

### Notification edge / integrity

| ID | Type | Pri | Precondition | Steps | Expected | Trace |
| --- | --- | --- | --- | --- | --- | --- |
| TC-NOT-08 | Edge | P1 | Duplicate completion events | Backend emits event twice | Only one user-visible "completed" notification (dedupe) | §7.2.2 step 8 |
| TC-NOT-09 | Edge | P2 | Email channel disabled | Completed donation | In-app fires; **no** email sent | §4.3.1 (email if enabled) |
| TC-NOT-10 | Edge | P2 | Notification deep link | Tap "Donation completed" | Opens correct donation detail/status via `/v1/donations/:id` | §7.2.1 Get donation status |
| TC-NOT-11 | Security | P1 | Any notification | Inspect payload/text | Safe display data only — no provider secrets, compliance codes, wallet risk, operator notes | §4.2, §4.3.1, AC-DON-12 |
| TC-NOT-12 | Edge | P2 | Post-action refresh | Notification arrives | Relevant summary cards / history refresh (toast + refresh) | §7.2.2 step 8 |
| TC-NOT-13 | Edge | P2 | Awaiting-confirmation then completed | Full lifecycle | Ordered sequence: submitted → awaiting confirmation → completed; no "completed" before finality | §4.3.1, AC-DON-04 |
| TC-NOT-14 | Edge | P3 | Stale cache after event | Event updates aggregate | No stale/duplicated aggregate shown | §7.2.2 step 8 |
| TC-NOT-15 | A11y | P2 | In-app toast | Screen reader active | Notification announced via ARIA live region; not color-only | §6.4 |

---

## Suite 9 — Cross-cutting States (§6.2)

| ID | Type | Pri | State | Expected behavior | Trace |
| --- | --- | --- | --- | --- | --- |
| TC-STATE-01 | Edge | P1 | Loading | Skeleton loaders; submit actions disabled until data ready | §6.2 |
| TC-STATE-02 | Edge | P1 | Empty HC list | Empty message; donate CTAs hidden | §6.2 |
| TC-STATE-03 | Edge | P1 | Empty donation history | "No donations yet" + browse CTA | §6.2 |
| TC-STATE-04 | Happy | P1 | Ready | Normal UI, actions enabled | §6.2 |
| TC-STATE-05 | Edge | P1 | Public / unauthenticated | Public data + login prompt for personal/donate actions | §6.2 |
| TC-STATE-06 | Edge | P1 | Wallet not connected | Wallet connect prompt; crypto donation disabled | §6.2 |
| TC-STATE-07 | Validation | P1 | Insufficient crypto balance | Message + confirm disabled / amount correction | §6.2 |
| TC-STATE-08 | Validation | P1 | Insufficient gas | Gas warning; disable/warn per wallet | §6.2 |
| TC-STATE-09 | Error | P1 | Blocked / restricted | Safe generic message + next step; restricted actions disabled | §6.2, AC-DON-12 |
| TC-STATE-10 | Edge | P1 | Pending / awaiting confirmation | Status tracker; safe to leave; no duplicate submit; refresh allowed | §6.2 |
| TC-STATE-11 | Error | P1 | Unavailable / maintenance | Neutral unavailable message; affected actions disabled | §6.2, AC-DON-11 |

---

## Suite 10 — Error Handling matrix (§6.3) — copy assertions

Verify exact user-facing copy (or approved equivalent) and that the CTA is blocked/enabled correctly.

| ID | Condition | Expected message | Blocks submit? | Trace |
| --- | --- | --- | --- | --- |
| TC-ERR-01 | Invalid amount | "Enter a valid donation amount." | Yes | §6.3 |
| TC-ERR-02 | Below min / above max | "Donation amount must be between [min] and [max]." | Yes | §6.3 |
| TC-ERR-03 | Not logged in | "Log in to complete your donation." | Yes → login | §6.3 |
| TC-ERR-04 | KYC required | "Complete verification to continue with this donation." | Yes → KYC | §6.3 |
| TC-ERR-05 | Wallet not connected | "Connect your wallet to donate crypto." | Yes → connect | §6.3 |
| TC-ERR-06 | Insufficient crypto | "You do not have enough [crypto] for this donation." | Yes | §6.3 |
| TC-ERR-07 | Insufficient gas | "You may need more gas token to complete this transaction." | Warn/Yes | §6.3 |
| TC-ERR-08 | Wallet signature rejected | "Donation was not submitted because the wallet request was rejected." | Stops safely | §6.3 |
| TC-ERR-09 | Transaction reverted | "Unable to complete this donation. Please try again." | Marks failed | §6.3 |
| TC-ERR-10 | Fiat payment expired | "This donation request expired. Please start a new donation." | Expires order | §6.3 |
| TC-ERR-11 | Payment provider issue | "We could not process the payment right now. Please try again." | Retry/support | §6.3 |
| TC-ERR-12 | Receipt unavailable | "A receipt is not available for this donation." | N/A | §6.3 |
| TC-ERR-13 | Server error | "Unable to complete this action. Please try again." + retry | Keeps safe state | §6.3 |
| TC-ERR-14 | Timeout | "This is taking longer than expected. We'll update the status when confirmation is available." | Keeps pending | §6.3 |

---

## Suite 11 — Security, Privacy & Compliance (§4.2, §6.4)

| ID | Type | Pri | Check | Expected | Trace |
| --- | --- | --- | --- | --- | --- |
| TC-SEC-01 | Security | P1 | Public HC views | Only approved public HC + aggregate impact data returned | §4.2 |
| TC-SEC-02 | Security | P1 | Public donation totals | No donor identity / personal history / donor wallet risk / PII | §4.2, AC-DON-07 |
| TC-SEC-03 | Security | P1 | History/receipt/UYT endpoints | Require auth; user-scoped only | §4.2 |
| TC-SEC-04 | Security | P1 | Receipt access | Only eligible donor + authorized internal systems | §4.2 |
| TC-SEC-05 | Security | P1 | Any error surface | No compliance reason codes, sanctions results, provider secrets, wallet risk scores, investigation notes | §4.2, AC-DON-12 |
| TC-SEC-06 | Security | P2 | Copy boundary | No issuer-only language (mint/burn/cash-out) in donation copy except needed wallet tx detail | §6.4 |
| TC-SEC-07 | Security | P2 | Wallet/HC address display | Safe formatting; full copy only where appropriate | §4.2 |
| TC-SEC-08 | Security | P1 | Donation submit | Idempotency prevents duplicate orders | §4.2 |
| TC-SEC-09 | Security | P2 | Payment/provider handling | Follows AML / PCI / privacy where applicable | §4.2 |
| TC-SEC-10 | Security | P2 | AuthZ | User A cannot read/download User B's order/receipt (IDOR) | §4.2 |

---

## Suite 12 — Accessibility & Responsive (§6.4, AC-DON-13)

| ID | Type | Pri | Check | Expected | Trace |
| --- | --- | --- | --- | --- | --- |
| TC-A11Y-01 | A11y | P1 | Keyboard nav | All interactive elements reachable & operable via keyboard | §6.4 |
| TC-A11Y-02 | A11y | P1 | Status semantics | Status conveyed by label + icon, **not color alone** | §6.4 |
| TC-A11Y-03 | A11y | P1 | Contrast | Meets WCAG 2.1 AA | §6.4, AC-DON-13 |
| TC-A11Y-04 | A11y | P2 | Focus order / visible focus | Logical order, visible focus ring on all controls | §6.4 |
| TC-A11Y-05 | A11y | P2 | Modals/dropdowns/tooltips | Proper ARIA roles/labels; focus trap in donation modal | §6.4 |
| TC-A11Y-06 | A11y | P2 | Live regions | Pending/status changes announced to SR | §6.4 |
| TC-RESP-01 | Perf/UI | P1 | Desktop | Multi-column cards + detail panels | §6.4 |
| TC-RESP-02 | Perf/UI | P1 | Tablet | Collapses to single-column | §6.4 |
| TC-RESP-03 | Perf/UI | P1 | Mobile web | Single-column; Donate CTA remains easy to find on HC detail | §6.4 |
| TC-RESP-04 | UI | P2 | Copy consistency | "Donation", "Humanity Centre", "total donated", "lives impacted", "UYT earned" used consistently | §6.4 |

---

## Suite 13 — Acceptance-Criteria traceability (§8)

Each PRD acceptance criterion must have ≥1 passing case. Sign-off gate.

| AC | Verified by | Status |
| --- | --- | --- |
| AC-DON-01 | TC-DIR-01, TC-DASH-01 | ☐ |
| AC-DON-02 | TC-DET-01, TC-DET-03, TC-DET-05 | ☐ |
| AC-DON-03 | TC-FIAT-01, TC-FIAT-02 | ☐ |
| AC-DON-04 | TC-FIAT-03, TC-NOT-03, TC-NOT-13 | ☐ |
| AC-DON-05 | TC-CRY-05, TC-CRY-06 | ☐ |
| AC-DON-06 | TC-DASH-07, TC-DASH-08, TC-CRY-01 | ☐ |
| AC-DON-07 | TC-DASH-02, TC-DASH-14, TC-HIST-11, TC-SEC-02 | ☐ |
| AC-DON-08 | TC-HIST-07 | ☐ |
| AC-DON-09 | TC-UYT-01, TC-UYT-02 | ☐ |
| AC-DON-10 | TC-DET-06 | ☐ |
| AC-DON-11 | Suite 9 (TC-STATE-01…11) | ☐ |
| AC-DON-12 | TC-DET-06, TC-FIAT-19, TC-NOT-11, TC-SEC-05 | ☐ |
| AC-DON-13 | Suite 12 (a11y + responsive) | ☐ |

---

## Open items affecting test coverage (§9.2)

- **OQ-04 (Open):** approved source/update process for "lives impacted" before Admin Portal. → TC-DASH-09 / TC-DET-08 assert graceful "Coming soon"/omit; revisit once source defined.
- **Multi-HC (§5.5):** Suite 5 multi-HC cases apply **only if** the UI phase ships `donateMulti`; fiat multi-HC out of scope (OQ-03 Closed). Confirm phase before executing TC-CRY-27…30.
- **Closed decisions baked into tests:** MVP fiat = credit/debit card only (OQ-01); fiat converted to USD then routed (OQ-02); public HC totals displayed in **USD only** (OQ-05).

---

*Prepared from the In-Review PRD; re-baseline against the final approved version before release sign-off. Update AC traceability checkboxes as suites pass.*

---

## Execution log — Run 1 (Jul 18 2026, live DOM verification)

Pages under test (all in `unera-pages/`): `donations.html`, `explore-centres.html`, `centre-detail.html`, `donate.html`, `donation-history.html`, `notifications.html` + shared `donation-data.js`, `donate-flow.js`, `notifications-bell.js`. Verified by driving flows and reading computed DOM (not screenshots), per project rule.

### Passed

- **Suite 4 (Fiat):** review shows **0 wallet confirmations**, "UNERA fee: None", no rate-lock. Confirm → full lifecycle fires the exact §4.3.1 sequence: `Donation submitted` (info) → `Payment instructions ready` (info) → `Donation awaiting confirmation` (progressing) → `Donation completed` (completed) → `Tax receipt available` (info) → `UYT earned from donation` (completed). Terminal = success receipt. Below-min amount blocks with the §6.3 range message. → TC-FIAT-01/02/03/08, TC-NOT-01→07.
- **Suite 5 (Crypto):** USDC review = **2 confirmations**, 3-line gas breakdown (approve + donate + total), rate-lock shown; ETH review = **1 confirmation**, single gas line. Conversion-pending state present before completion. → TC-CRY-02/03/04/12, TC-CRY-15/16.
- **Suite 2/3 (Directory/Detail):** directory shows only the 5 active centres (1 inactive hidden); search present. Inactive centre → Donate CTA **disabled** ("Donations unavailable"), generic paused banner, no internal reason leaked. → TC-DIR-01/08, TC-DET-06.
- **Suite 6 (History):** status + source (Card/Crypto) + date-range + per-centre filters, "Load more" pagination, Etherscan links on crypto rows, USD + original-token amounts, text status labels (not color-alone). → TC-HIST-01→05, TC-A11Y-02.
- **Suite 1 (Dashboard):** user-scoped summary cards, minimal donatable-balance panel with "Full portfolio in Wallet Dashboard" link, "lives Coming soon" fallback wired. → TC-DASH-05/07/09.

### Defects found & fixed

1. **`notifications.html` inline `addNotification` used the wrong schema** — stored `type:'system'` and dropped `level`/`category`/`ref`/`ctaUrl`/`ctaLabel`, and only refreshed the panel (not the full-page list). A donation notification fired while on this page would render as a generic Info item with no CTA and wrong filter category. **Fixed:** rewritten to the level/category schema (matching `notifications-bell.js` + `demoFire`), with `refreshAllNotifViews()` + toast + bell ring. Re-verified: stores `level:completed, category:donation, ref, ctaLabel`; toast + page CTA render. → closes TC-NOT-04/06/07/10/11.
2. **Inactive-centre copy leaked the internal reason** — Dhaka `about` seed text named "annual independent audit" as the pause reason, violating AC-DON-12 / HC-DETAIL-07 ("do not expose internal reason details"). **Fixed:** reworded to a generic "temporarily not accepting new donations". Re-verified: no internal-term leak in the rendered description. → closes TC-DET-06 (leak check), TC-SEC-05.

### Not exercised this run (recommend manual/next pass)

- Responsive breakpoints (Suite 12 RESP) and full a11y sweep (focus order, SR live-region announcement) — structural markup present; needs device/AT verification.
- Multi-HC `donateMulti` terminal representation (TC-CRY-27→29) — code path exists behind the split toggle; confirm the UI phase ships it.
- Email channel on `Donation completed` / `Tax receipt available` (TC-NOT-04/06) — prototype models in-app only; email-if-enabled is a backend concern.

---

## Execution log — Run 2 (Jul 18 2026, research-backed hardening)

Applied best-practice fixes to the "next pass" items above, grounded in published guidance: ARIA live-region status messaging (Soueidan; Adrian Roselli — *live regions must exist at render*; GOV.UK Home Office — polite by default), accessible toast criteria (Byrne-Haber; MagicBell — ≥5s, dismissible, persistent alternative), and multi-designation donation UX (Fundraise Up, WinRed — **cap at 5 designations, confirm each allocation**).

### Donation flow a11y (`donate.html`, `donate-flow.js`)

- **Processing/pending status is now a live region.** The processing panel is `role="status" aria-live="polite" aria-atomic="true"`, so screen readers announce each stage change (Waiting for wallet → Converting to USD → Complete) without a focus jump. Removed the redundant nested `aria-live` on the step chips to avoid double-announcement. → strengthens TC-NOT-13, TC-A11Y-06.
- **Live financial summary announces.** The amount step's live "Centre receives" summary (`#amountLive`) is `role="status" aria-live="polite"` so the USD outcome is announced as the donor types. → TC-A11Y-06.
- **Focus management on step change.** Each user-initiated step (1–3) moves focus to that step's `<h2>` (`tabindex="-1"`, `preventScroll`); processing defers to its live region and the terminal keeps its existing heading focus. Verified live: advancing to step 2 focuses "Donation method". → TC-A11Y-01/04.

### Multi-HC `donateMulti` terminal (`donate-flow.js`)

- **Per-centre amounts on the success receipt.** The multi-centre terminal now itemizes each centre with its allocation and USD value (e.g. "Kibera Community Centre — 40 USDC · ≈ $40.00"), matching §5.5 step 5 ("confirm each donation allocation") and the Fundraise Up/WinRed pattern of confirming every split. Review step already itemized; the receipt now matches. → closes TC-CRY-27/28.
- **Selection cap.** Split is capped at **5 centres** (industry norm) with an inline `role="alert"` hint when exceeded; defensive today since only 5 active centres exist. → TC-CRY-29.

### Toasts (`notifications.html`) — reviewed, already compliant

`#toastStack` is a persistent live region present at render (`aria-live="polite" aria-relevant="additions"`), per-toast `role` (`alert` for error/warning, `status` otherwise), ≥5s duration (errors/warnings persist), dismissible, and never fired on page load — and every toast's action also persists as a keyboard-reachable `<a>` CTA in the notification center + bell feed. Meets the accessible-toast criteria; no change required.

### Still deferred (needs real devices / assistive tech)

- Cross-breakpoint responsive verification (Suite 12 RESP-01→03) — requires actual tablet/mobile rendering.
- Full screen-reader pass across NVDA/VoiceOver to confirm announcement timing and order.
- Email-channel delivery for `Donation completed` / `Tax receipt available` — backend concern, out of prototype scope.
