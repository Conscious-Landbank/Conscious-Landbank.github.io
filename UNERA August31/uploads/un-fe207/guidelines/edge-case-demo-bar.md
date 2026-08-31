# Edge-Case Demo Bar — canonical pattern

**Purpose.** A prototype-only control strip that lets a reviewer flip a screen between its
happy path and its edge/error/terminal states without needing real backend conditions.
Use it on **every flow or screen that has edge cases** (Add Tokens, Send, Swap, Trade,
KYC, Wallet connect, account states, …). This is the single source of truth for how Huma
prototypes expose edge cases — match it exactly so every page feels the same.

Canonical reference implementation: `unera-pages/account-settings.html`
(`#accountSettingsDemoBar`). Sibling implementations: `add-money.html`, `send-enhanced.html`,
`trade.html`, `exchange.html`.

---

## Rules (non-negotiable)

1. **Placement: top of the page's main content**, as the first child of `<main class="container">`
   (or the flow card for a single-step flow). A reviewer should see it before anything else.
2. **In-memory only.** Never write demo state to `localStorage`/`sessionStorage`. A refresh
   always returns to the happy path. (Real state — KYC, wallet — may persist; the *demo
   selector* never does.)
3. **First pill is `Happy path`** and is active by default.
4. **One concern per bar.** The label names what it simulates ("simulate account state",
   "simulate OTC edge case", "simulate send result"). If a screen has two independent axes
   (e.g. terminal outcome *and* a review blocker), use two labelled `.demo-btns` rows inside
   the same bar — never two separate bars.
5. **Edge UI lives in dedicated, `hidden` banner/branch elements** that the selector toggles.
   The selector itself only sets state and calls an `apply…()` function; it never contains the
   edge markup.
6. **Accessibility:** include a `.visually-hidden` `aria-live="polite"` announcer and update it
   on every state change. Pills are real `<button>`s in a `role="group"` with an `aria-label`.
   Active pill also reads as selected via its filled style.
7. **Blocking vs non-blocking:** a blocking edge disables the primary CTA
   (`disabled` + `opacity:.5` + `pointer-events:none`); a non-blocking edge (e.g. "held for
   review") leaves the CTA enabled. Always pair the banner with the matching CTA state.
8. **Never use `hidden` alone on a flex/grid banner** — a class with `display:flex` overrides the
   `[hidden]` attribute. Always add `.your-banner[hidden]{ display:none !important; }`.

---

## HTML

```html
<!-- First child of <main class="container"> (or the flow card) -->
<div class="flow-demo-bar" id="xxxDemoBar">
    <p class="demo-label">Prototype — simulate <thing>:</p>
    <div class="demo-btns" id="xxxDemoBtns" role="group" aria-label="<thing> demo selector"></div>
    <!-- optional second axis:
    <p class="demo-label" style="margin-top:0.875rem;">Simulate <other axis>:</p>
    <div class="demo-btns" id="xxxEdgeBtns" role="group" aria-label="..."></div> -->
</div>
<div id="xxxDemoAnnouncer" class="visually-hidden" aria-live="polite" aria-atomic="true"></div>
```

## CSS (token-driven; drop into the page's `<style>`)

```css
.flow-demo-bar { margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1.5px dashed var(--neutral-300); }
.demo-label { font-size: 0.688rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem; text-align: left; }
.demo-btns { display: flex; flex-wrap: wrap; gap: 0.375rem; }
.demo-btn { padding: 0.25rem 0.75rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 600;
  border: 1.5px solid var(--border-subtle); background: var(--brand-white); color: var(--text-secondary);
  min-height: 34px; cursor: pointer; font-family: var(--font-body); transition: all 0.2s; }
.demo-btn:hover { border-color: var(--brand-deep-blue); color: var(--brand-deep-blue); }
.demo-btn:focus, .demo-btn:focus-visible { outline: 2px solid var(--brand-deep-blue); outline-offset: 2px; }
.demo-btn.active { border-color: var(--brand-deep-blue); background: var(--brand-deep-blue); color: var(--brand-white); }
@media (max-width: 768px) { .demo-btn { min-height: 44px; padding: 0.375rem 0.875rem; } }
.visually-hidden { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
/* every edge banner: */
.your-edge-banner[hidden] { display: none !important; }
```

## JS (page-scoped; no persistence)

```js
// 1) Declare the scenarios. First entry is the happy path.
var XXX_DEMO_PILLS = [
  { label: 'Happy path',            state: null },
  { label: 'Inventory unavailable', state: 'inventory' },
  { label: 'Rate expired',          state: 'rateExpired' }
];
var xxxDemoState = null;

// 2) Build + sync the pills.
function renderXxxDemoPills() {
  var c = document.getElementById('xxxDemoBtns');
  if (!c) return;
  c.innerHTML = XXX_DEMO_PILLS.map(function (p) {
    var arg = p.state === null ? 'null' : "'" + p.state + "'";
    return '<button type="button" class="demo-btn" data-state="' +
      (p.state === null ? 'null' : p.state) + '" onclick="applyXxxDemoState(' + arg + ')">' +
      p.label + '</button>';
  }).join('');
  syncXxxDemoPills();
}
function syncXxxDemoPills() {
  document.querySelectorAll('#xxxDemoBtns .demo-btn').forEach(function (b) {
    var s = b.getAttribute('data-state');
    b.classList.toggle('active', (s === 'null' && !xxxDemoState) || s === String(xxxDemoState));
  });
}

// 3) Apply the scenario: toggle banners + CTA, announce.
function applyXxxDemoState(state) {
  xxxDemoState = state;
  syncXxxDemoPills();
  updateXxxEdge();
}
function updateXxxEdge() {
  var cfg = xxxDemoState ? XXX_EDGE_CONFIG[xxxDemoState] : null;
  var banner = document.getElementById('xxxEdgeBanner');
  var cta = document.getElementById('primaryCta');
  if (!cfg) { if (banner) banner.hidden = true; if (cta) { cta.disabled = false; cta.style.opacity=''; cta.style.pointerEvents=''; } announceXxx('Happy path'); return; }
  if (banner) { banner.hidden = false; /* set title/body/icon/action from cfg */ }
  if (cta) { cta.disabled = !!cfg.blocking; cta.style.opacity = cfg.blocking ? '0.5' : ''; cta.style.pointerEvents = cfg.blocking ? 'none' : ''; }
  announceXxx(cfg.title);
}
function announceXxx(msg) {
  var a = document.getElementById('xxxDemoAnnouncer');
  if (a) a.textContent = 'Simulating: ' + msg;
}

// 4) Init (NOT from localStorage):
renderXxxDemoPills();
```

---

## Authoring checklist

- [ ] Bar is the first child of main content; dashed bottom border.
- [ ] First pill `Happy path`, active by default; in-memory only.
- [ ] Each edge has a dedicated `hidden` banner/branch element with `[hidden]{display:none!important}`.
- [ ] Blocking edges disable the CTA; non-blocking ones don't.
- [ ] `aria-live` announcer updates on every change; pills in a labelled `role="group"`.
- [ ] Warning vs error styling uses tokens (`--surface-warning-soft` / `--surface-error-soft`,
      `--warning` / `--error`) — never hardcoded hex.
- [ ] Mobile: pills ≥44px touch target.

## Per-flow scenario menus (current)

| Flow / file | Scenarios |
|---|---|
| `account-settings.html` | Happy path · Unsupported Network |
| `add-money.html` (Buy OTC) | Happy path · Inventory unavailable · Rate expired · Daily limit reached · Payment under review |
| `send-enhanced.html` | Outcome: Success · Failed · Pending · Under review — plus review blockers (daily limit, fee changed) |
| `trade.html` (Order Book) | Happy path · Market halted · Insufficient liquidity · Order rejected |
| `exchange.html` (Swap) | Happy path · Rate moved (safety net) · Deadline passed |
