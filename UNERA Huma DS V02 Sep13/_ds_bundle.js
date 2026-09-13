/* @ds-bundle: {"format":4,"namespace":"UNERADesignSystem_679671","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Stepper","sourcePath":"components/core/Stepper.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"NotificationBell","sourcePath":"components/navigation/NotificationBell.jsx"},{"name":"WalletPill","sourcePath":"components/navigation/WalletPill.jsx"},{"name":"SaveToAddressBook","sourcePath":"components/transact/SaveToAddressBook.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"4c2e1dc6fe56","components/core/Badge.jsx":"7715f7ac607c","components/core/Button.jsx":"f12eb41a702d","components/core/Card.jsx":"a5ec3c05c889","components/core/Stepper.jsx":"bd4bc70e7c1e","components/forms/Checkbox.jsx":"f960309e9d57","components/forms/Input.jsx":"1d6d174609bb","components/forms/Select.jsx":"0f72e45c3676","components/navigation/NotificationBell.jsx":"5a983289ed56","components/navigation/WalletPill.jsx":"554a2c357a06","components/transact/SaveToAddressBook.jsx":"c2c1051af1cf","ui_kits/consumer-app/Nav.jsx":"c5c64ffd94cc","ui_kits/consumer-app/icons.jsx":"4046fb408a11","ui_kits/consumer-app/screens.jsx":"81a2c261911b","unera-pages/auth-enhancements.js":"c210c7f079c2","unera-pages/consumer-app-nav.js":"266b84212c28","unera-pages/donate-flow.js":"39473d99a8d7","unera-pages/donation-data.js":"6eec2da5fc0f","unera-pages/js/legacy/auth-flow.js":"8a535326cf24","unera-pages/js/legacy/code-input-handler.js":"b1734101b2e8","unera-pages/js/legacy/wallet-prompt.js":"3b53c7136b39","unera-pages/js/wallet/manager.js":"e4e9f14d1d35","unera-pages/js/wallet/providers.js":"cebaaf0f9def","unera-pages/js/wallet/ui.js":"f2e61cd42f35","unera-pages/notifications-bell.js":"d7f3ba639ef1","unera-pages/shared/notification-catalog.js":"75ebc23fcfc0","unera-pages/shared/wallet-auth.js":"329e559d207a","unera-pages/token-tx-validation.js":"3045ade0fd1d","unera-pages/tx-tracker.js":"c864411bd4b7","unera-pages/ws-select.js":"aab2d4048d95"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.UNERADesignSystem_679671 = window.UNERADesignSystem_679671 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.unera-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: var(--brand-deep-blue);
  color: var(--brand-white);
  font-family: var(--font-display);
  flex-shrink: 0;
  overflow: visible;
}
.unera-avatar img { width: 100%; height: 100%; border-radius: var(--radius-full); object-fit: cover; }
.unera-avatar--blockie { background: color-mix(in srgb, var(--brand-light-blue) 40%, var(--brand-deep-blue)); }
.unera-avatar__badge {
  position: absolute; bottom: -1px; right: -1px;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-full);
  background: #F6851B; /* MetaMask fox tile */
  border: 2px solid var(--brand-white);
  line-height: 1;
}
`;
if (typeof document !== 'undefined' && !document.getElementById('unera-avatar-css')) {
  const el = document.createElement('style');
  el.id = 'unera-avatar-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* Sizes mirror account-settings.html exactly:
   sm 28 (wallet pill) · md 32 (nav) · lg 48 (dropdown) · xl 80 (account hero).
   Small avatars are weight 600; large avatars 700 - per source. */
const SIZES = {
  sm: {
    px: 28,
    fs: '0.75rem',
    fw: 600
  },
  md: {
    px: 32,
    fs: '0.813rem',
    fw: 600
  },
  lg: {
    px: 48,
    fs: '1.125rem',
    fw: 700
  },
  xl: {
    px: 80,
    fs: '1.75rem',
    fw: 700
  }
};

/**
 * Circular identity mark. The user / account avatar is ALWAYS initials on a
 * Deep Blue tile in the display face (no photo upload in-product) - sizes match
 * account-settings.html. Pass `blockie` for the separate wallet identity tile,
 * with an optional connector `badge` (the sanctioned 🦊 MetaMask glyph).
 */
function Avatar({
  size = 'md',
  initials,
  src,
  alt = '',
  blockie = false,
  badge,
  className = '',
  style = {},
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const badgePx = Math.max(12, Math.round(s.px * 0.4));
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `unera-avatar ${blockie ? 'unera-avatar--blockie' : ''} ${className}`.trim(),
    style: {
      width: s.px,
      height: s.px,
      fontSize: s.fs,
      fontWeight: s.fw,
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt
  }) : !blockie && initials, badge && /*#__PURE__*/React.createElement("span", {
    className: "unera-avatar__badge",
    style: {
      width: badgePx,
      height: badgePx,
      fontSize: Math.round(badgePx * 0.58)
    }
  }, badge));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.unera-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
  line-height: 1;
  white-space: nowrap;
}
.unera-badge svg { width: 14px; height: 14px; flex-shrink: 0; fill: currentColor; }

/* Financial direction - always pair with a directional icon */
.unera-badge--up      { background: var(--fin-up-bg);      color: var(--fin-up); }
.unera-badge--down    { background: var(--fin-down-bg);    color: var(--fin-down); }
.unera-badge--neutral { background: var(--fin-neutral-bg); color: var(--fin-neutral); }

/* Status */
.unera-badge--success { background: var(--fin-up-bg);  color: var(--fin-up); }
.unera-badge--warning { background: var(--warning-bg); color: var(--warning); }
.unera-badge--error   { background: var(--error-bg);   color: var(--error); }
.unera-badge--info    { background: color-mix(in srgb, var(--brand-deep-blue) 10%, var(--brand-white)); color: var(--brand-deep-blue); }

.unera-badge--solid   { background: var(--brand-deep-blue); color: var(--brand-white); }
`;
if (typeof document !== 'undefined' && !document.getElementById('unera-badge-css')) {
  const el = document.createElement('style');
  el.id = 'unera-badge-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}
const ARROW_UP = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 -960 960 960",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"
}));
const ARROW_DOWN = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 -960 960 960",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"
}));

/**
 * Pill badge for financial direction (up/down/neutral) and status. For
 * up/down it auto-prepends a directional arrow unless `icon` is given.
 */
function Badge({
  variant = 'info',
  icon,
  children,
  className = '',
  ...rest
}) {
  let leading = icon;
  if (leading === undefined) {
    if (variant === 'up') leading = ARROW_UP;else if (variant === 'down') leading = ARROW_DOWN;
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `unera-badge unera-badge--${variant} ${className}`.trim()
  }, rest), leading, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inject component CSS once (tokens come from the global stylesheet). */
const CSS = `
.unera-btn {
  font-family: var(--font-body);
  font-weight: var(--fw-semibold);
  font-size: var(--fs-label);
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  min-height: var(--control-h);
  padding: 0 1.5rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  line-height: 1;
  transition: all var(--dur-base);
}
.unera-btn:focus-visible { outline: 3px solid rgba(23,61,71,0.3); outline-offset: 2px; }
.unera-btn[disabled] { opacity: 0.5; cursor: not-allowed; }
.unera-btn svg { width: 18px; height: 18px; flex-shrink: 0; }

/* Primary - Deep Blue fill (solid; never gradient on product UI) */
.unera-btn--primary { background: var(--brand-deep-blue); color: var(--brand-white); }
.unera-btn--primary:hover:not([disabled]) { background: var(--neutral-800); box-shadow: 0 4px 12px rgba(23,61,71,0.3); }

/* Secondary - transparent, subtle border, hover to Deep Blue ink */
.unera-btn--secondary { background: transparent; color: var(--text-secondary); border-color: var(--border-subtle); }
.unera-btn--secondary:hover:not([disabled]) { border-color: var(--brand-deep-blue); color: var(--brand-deep-blue); background: rgba(23,61,71,0.02); }

/* Accent - Deep Blue fill + Yellow text (warm banners only) */
.unera-btn--accent { background: var(--brand-deep-blue); color: var(--brand-yellow); }
.unera-btn--accent:hover:not([disabled]) { background: var(--neutral-800); }

/* Sizes */
.unera-btn--sm { min-height: var(--control-h-sm); padding: 0 0.875rem; font-size: var(--fs-xs); }
.unera-btn--block { width: 100%; }
`;
if (typeof document !== 'undefined' && !document.getElementById('unera-btn-css')) {
  const el = document.createElement('style');
  el.id = 'unera-btn-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Huma primary action button. Deep Blue fill is the product default; never
 * a gradient CTA on product UI. Renders as <a> when `href` is supplied.
 */
function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  href,
  icon,
  iconRight,
  children,
  className = '',
  ...rest
}) {
  const cls = ['unera-btn', `unera-btn--${variant}`, size === 'sm' ? 'unera-btn--sm' : '', block ? 'unera-btn--block' : '', className].filter(Boolean).join(' ');
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, icon, children, iconRight);
  if (href) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      className: cls
    }, rest), content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls
  }, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.unera-card {
  background: var(--surface-card);
  border: 2px solid var(--border-subtle);
  border-radius: var(--radius-card);
  padding: 2rem;
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
  transition: border-color var(--dur-slow), box-shadow var(--dur-slow), transform var(--dur-slow);
  color: var(--text-primary);
  display: block;
  text-decoration: none;
}
/* Surface tint variants - never flat grey, never rainbow */
.unera-card--impact { background: var(--surface-impact); }
.unera-card--action { background: var(--surface-action); }
.unera-card--warm   { background: var(--surface-warm); }
.unera-card--sky    { background: var(--surface-sky); }
.unera-card--cad    { background: var(--surface-cad-hub); }
.unera-card--inverse { background: var(--brand-deep-blue); color: var(--brand-white); border-color: transparent; }

/* Interactive lift */
.unera-card--interactive { cursor: pointer; }
.unera-card--interactive:hover {
  border-color: var(--brand-deep-blue);
  box-shadow: var(--shadow-hover);
  transform: var(--lift-hover-lg);
}
.unera-card--interactive:focus-visible,
.unera-card--interactive:focus-within { outline: 2px solid var(--brand-deep-blue); outline-offset: 2px; }

/* Top accent rule that wipes in on hover (impact / center pattern) */
.unera-card--accent::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: var(--brand-deep-blue); transform: scaleX(0);
  transition: transform var(--dur-slow); transform-origin: left;
}
.unera-card--accent:hover::before { transform: scaleX(1); }
`;
if (typeof document !== 'undefined' && !document.getElementById('unera-card-css')) {
  const el = document.createElement('style');
  el.id = 'unera-card-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Surface card with Huma geometry (20px radius, tinted border, soft shadow).
 * Pick a `surface` tint to signal card type; `interactive` adds the hover lift.
 */
function Card({
  surface = 'card',
  interactive = false,
  accent = false,
  href,
  children,
  className = '',
  ...rest
}) {
  const cls = ['unera-card', `unera-card--${surface}`, interactive ? 'unera-card--interactive' : '', accent ? 'unera-card--accent' : '', className].filter(Boolean).join(' ');
  if (href) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      className: cls
    }, rest), children);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Stepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.unera-stepper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  padding: 0 1rem;
  max-width: 700px;
  margin: 0 auto 3rem;
}
.unera-stepper__track {
  content: ''; position: absolute; top: 24px; left: 24px; right: 24px;
  height: 2px; background: var(--neutral-300); z-index: 0;
}
.unera-stepper__progress {
  position: absolute; top: 24px; left: 24px; height: 2px;
  background: var(--brand-deep-blue); z-index: 1;
  transition: width var(--dur-prog) ease; max-width: calc(100% - 48px);
}
.unera-step {
  display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
  position: relative; z-index: 2; flex: 1;
}
.unera-step__circle {
  width: 48px; height: 48px; border-radius: var(--radius-full);
  background: var(--brand-white); border: 2px solid var(--neutral-300);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-weight: var(--fw-bold); font-size: 1.125rem;
  color: var(--text-secondary);
  transition: background var(--dur-slow), border-color var(--dur-slow), color var(--dur-slow), transform var(--dur-slow);
}
.unera-step__circle svg { width: 22px; height: 22px; }
.unera-step--active .unera-step__circle {
  background: var(--brand-deep-blue); border-color: transparent;
  color: var(--brand-white); transform: scale(1.1);
}
.unera-step--done .unera-step__circle {
  background: var(--brand-deep-blue); border-color: transparent; color: var(--brand-white);
}
.unera-step__label { font-size: var(--fs-sm); color: var(--neutral-600); font-weight: var(--fw-medium); text-align: center; }
.unera-step--active .unera-step__label { color: var(--brand-deep-blue); font-weight: var(--fw-semibold); }
.unera-step--done .unera-step__label { color: var(--fin-up); }

@media (max-width: 640px) {
  .unera-stepper { display: none; }
}
`;
if (typeof document !== 'undefined' && !document.getElementById('unera-stepper-css')) {
  const el = document.createElement('style');
  el.id = 'unera-stepper-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}
const CHECK = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 13l4 4L19 7"
}));

/**
 * Multi-step flow stepper (Send / Add / Exchange). Stepper progression is
 * brand Deep Blue; completed steps show fin-up checkmarks. Collapses below 640px.
 */
function Stepper({
  steps = [],
  current = 0,
  className = '',
  ...rest
}) {
  const last = Math.max(steps.length - 1, 1);
  const pct = Math.min(current / last, 1) * 100;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `unera-stepper ${className}`.trim(),
    role: "list",
    "aria-label": "Progress"
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "unera-stepper__track",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "unera-stepper__progress",
    style: {
      width: `calc(${pct}% - ${pct === 0 ? 0 : 0}px)`
    },
    "aria-hidden": "true"
  }), steps.map((label, i) => {
    const state = i < current ? 'done' : i === current ? 'active' : 'todo';
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: `unera-step unera-step--${state}`,
      role: "listitem",
      "aria-current": state === 'active' ? 'step' : undefined
    }, /*#__PURE__*/React.createElement("div", {
      className: "unera-step__circle"
    }, state === 'done' ? CHECK : i + 1), /*#__PURE__*/React.createElement("div", {
      className: "unera-step__label"
    }, label));
  }));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.unera-checkbox {
  display: flex; align-items: flex-start; gap: 0.75rem;
  min-height: var(--row-tap); /* whole 48px row is tappable */
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: var(--font-body);
  transition: background var(--dur-fast);
}
.unera-checkbox:hover { background: rgba(23,61,71,0.04); }
.unera-checkbox input { position: absolute; opacity: 0; width: 0; height: 0; }
.unera-checkbox__box {
  flex-shrink: 0; width: 22px; height: 22px; margin-top: 1px;
  border: 2px solid var(--border-strong); border-radius: 6px;
  background: var(--brand-white);
  display: flex; align-items: center; justify-content: center;
  color: var(--brand-white);
  transition: background var(--dur-fast), border-color var(--dur-fast);
}
.unera-checkbox__box svg { width: 14px; height: 14px; opacity: 0; }
.unera-checkbox input:checked + .unera-checkbox__box {
  background: var(--brand-deep-blue); border-color: var(--brand-deep-blue);
}
.unera-checkbox input:checked + .unera-checkbox__box svg { opacity: 1; }
.unera-checkbox input:focus-visible + .unera-checkbox__box { outline: 2px solid var(--brand-deep-blue); outline-offset: 2px; }
.unera-checkbox--radio .unera-checkbox__box { border-radius: var(--radius-full); }
.unera-checkbox--radio input:checked + .unera-checkbox__box { background: var(--brand-deep-blue); }
.unera-checkbox__text { font-size: var(--fs-label); color: var(--text-primary); line-height: 1.45; }
.unera-checkbox__sub { display: block; font-size: var(--fs-xs); color: var(--text-secondary); margin-top: 2px; }
`;
if (typeof document !== 'undefined' && !document.getElementById('unera-checkbox-css')) {
  const el = document.createElement('style');
  el.id = 'unera-checkbox-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}
const CHECK = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 13l4 4L19 7"
}));
const DOT = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "6"
}));

/**
 * Tappable checkbox / radio row - the entire 48px row is the hit target,
 * never a bare input. Pass `type="radio"` for single-select groups.
 */
function Checkbox({
  label,
  sublabel,
  type = 'checkbox',
  className = '',
  ...rest
}) {
  const isRadio = type === 'radio';
  return /*#__PURE__*/React.createElement("label", {
    className: `unera-checkbox ${isRadio ? 'unera-checkbox--radio' : ''} ${className}`.trim()
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "unera-checkbox__box"
  }, isRadio ? DOT : CHECK), /*#__PURE__*/React.createElement("span", {
    className: "unera-checkbox__text"
  }, label, sublabel && /*#__PURE__*/React.createElement("span", {
    className: "unera-checkbox__sub"
  }, sublabel)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.unera-field { display: flex; flex-direction: column; gap: 0.5rem; font-family: var(--font-body); }
.unera-field__label { font-size: var(--fs-label); font-weight: var(--fw-semibold); color: var(--text-primary); }
.unera-field__label .req { color: var(--error); margin-left: 2px; }
.unera-input {
  font-family: var(--font-body);
  font-size: var(--fs-body); /* 16px - prevents iOS zoom */
  color: var(--text-primary);
  background: var(--brand-white);
  border: 2px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.75rem 0.875rem;
  min-height: var(--control-h);
  width: 100%;
  transition: border-color var(--dur-base), box-shadow var(--dur-base);
}
.unera-input::placeholder { color: var(--neutral-500); }
.unera-input:focus {
  outline: none;
  border-color: var(--brand-deep-blue);
  box-shadow: 0 0 0 3px rgba(23,61,71,0.12);
}
.unera-input:disabled { background: var(--neutral-100); cursor: not-allowed; opacity: 0.7; }
.unera-input--error { border-color: var(--error); }
.unera-input--error:focus { box-shadow: 0 0 0 3px var(--error-bg); }
.unera-field__hint { font-size: var(--fs-xs); color: var(--text-secondary); }
.unera-field__error { font-size: var(--fs-xs); color: var(--error); font-weight: var(--fw-medium); }
.unera-field__prefix-wrap { position: relative; display: flex; align-items: center; }
.unera-field__prefix { position: absolute; left: 0.875rem; color: var(--text-secondary); font-size: var(--fs-body); pointer-events: none; }
.unera-field__prefix-wrap .unera-input { padding-left: 1.85rem; }
`;
if (typeof document !== 'undefined' && !document.getElementById('unera-input-css')) {
  const el = document.createElement('style');
  el.id = 'unera-input-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}
let _uid = 0;

/**
 * Labelled text input. Label is always visible; Deep Blue focus ring; 16px
 * font on mobile to prevent iOS zoom. Supports hint, error, and a fixed prefix.
 */
function Input({
  label,
  hint,
  error,
  required = false,
  prefix,
  id,
  className = '',
  ...rest
}) {
  const fieldId = id || `unera-input-${++_uid}`;
  const inputCls = `unera-input ${error ? 'unera-input--error' : ''}`.trim();
  const input = /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: inputCls,
    "aria-invalid": !!error
  }, rest));
  return /*#__PURE__*/React.createElement("div", {
    className: `unera-field ${className}`.trim()
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "unera-field__label",
    htmlFor: fieldId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "req",
    "aria-hidden": "true"
  }, "*")), prefix ? /*#__PURE__*/React.createElement("div", {
    className: "unera-field__prefix-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "unera-field__prefix"
  }, prefix), input) : input, error ? /*#__PURE__*/React.createElement("span", {
    className: "unera-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "unera-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const CSS = `
.unera-select { position: relative; font-family: var(--font-body); }
.unera-select__label { display: block; font-size: var(--fs-label); font-weight: var(--fw-semibold); color: var(--text-primary); margin-bottom: 0.5rem; }
.unera-select__trigger {
  width: 100%; min-height: var(--control-h);
  display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
  background: var(--brand-white); border: 2px solid var(--border-subtle);
  border-radius: var(--radius-md); padding: 0.75rem 0.875rem;
  font-family: var(--font-body); font-size: var(--fs-body); color: var(--text-primary);
  cursor: pointer; text-align: left;
  transition: border-color var(--dur-base), box-shadow var(--dur-base);
}
.unera-select__trigger[aria-expanded="true"], .unera-select__trigger:focus-visible {
  outline: none; border-color: var(--brand-deep-blue); box-shadow: 0 0 0 3px rgba(23,61,71,0.12);
}
.unera-select__placeholder { color: var(--neutral-500); }
.unera-select__chev { width: 18px; height: 18px; color: var(--text-secondary); flex-shrink: 0; transition: transform var(--dur-base); }
.unera-select__trigger[aria-expanded="true"] .unera-select__chev { transform: rotate(180deg); }
.unera-select__menu {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: var(--z-dropdown);
  background: var(--brand-white); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md); box-shadow: var(--shadow-pop);
  padding: 0.35rem; margin: 0; list-style: none; max-height: 280px; overflow-y: auto;
}
.unera-select__opt {
  display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
  padding: 0.625rem 0.75rem; min-height: var(--touch-min);
  border-radius: var(--radius-sm); font-size: var(--fs-sm); color: var(--text-primary); cursor: pointer;
}
.unera-select__opt:hover, .unera-select__opt--active { background: color-mix(in srgb, var(--brand-cloud-blue) 60%, var(--brand-white)); color: var(--brand-deep-blue); }
.unera-select__opt[aria-selected="true"] { font-weight: var(--fw-semibold); background: color-mix(in srgb, var(--brand-yellow) 30%, var(--brand-white)); }
.unera-select__check { width: 16px; height: 16px; color: var(--brand-deep-blue); flex-shrink: 0; }
`;
if (typeof document !== 'undefined' && !document.getElementById('unera-select-css')) {
  const el = document.createElement('style');
  el.id = 'unera-select-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}
const CHEV = /*#__PURE__*/React.createElement("svg", {
  className: "unera-select__chev",
  viewBox: "0 -960 960 960",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"
}));
const CHECK = /*#__PURE__*/React.createElement("svg", {
  className: "unera-select__check",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 13l4 4L19 7"
}));

/**
 * Custom select - the system bans native <select>. Keyboard-accessible
 * (arrows, Enter, Esc), hidden input mirrors value for forms.
 */
function Select({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = 'Select…',
  name,
  className = ''
}) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue ?? '');
  const [active, setActive] = React.useState(0);
  const ref = React.useRef(null);
  const current = value !== undefined ? value : internal;
  const opts = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const selected = opts.find(o => o.value === current);
  React.useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  function choose(opt) {
    if (value === undefined) setInternal(opt.value);
    onChange && onChange(opt.value);
    setOpen(false);
  }
  function onKey(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive(a => Math.min(a + 1, opts.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && open) {
      e.preventDefault();
      choose(opts[active]);
    } else if (e.key === 'Escape') setOpen(false);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: `unera-select ${className}`.trim(),
    ref: ref
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "unera-select__label"
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: name,
    value: current,
    readOnly: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "unera-select__trigger",
    "aria-haspopup": "listbox",
    "aria-expanded": open,
    onClick: () => setOpen(o => !o),
    onKeyDown: onKey
  }, /*#__PURE__*/React.createElement("span", {
    className: selected ? '' : 'unera-select__placeholder'
  }, selected ? selected.label : placeholder), CHEV), open && /*#__PURE__*/React.createElement("ul", {
    className: "unera-select__menu",
    role: "listbox"
  }, opts.map((o, i) => /*#__PURE__*/React.createElement("li", {
    key: o.value,
    role: "option",
    "aria-selected": o.value === current,
    className: `unera-select__opt ${i === active ? 'unera-select__opt--active' : ''}`,
    onMouseEnter: () => setActive(i),
    onClick: () => choose(o)
  }, /*#__PURE__*/React.createElement("span", null, o.label), o.value === current && CHECK))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NotificationBell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NotificationBell - the consumer nav's notification control, as a reusable
 * React component. This is the design-system mirror of the runtime controller
 * `unera-pages/notifications-bell.js` (which is the single source of truth the
 * vanilla product pages load). Keep the two in sync: same LEVEL model, 400px
 * panel, 99+ badge cap, level-colored unread left bar, "You're all caught up".
 */

const LEVELS = {
  completed: {
    label: 'Completed',
    ink: 'var(--fin-up)',
    well: 'var(--fin-up-bg)',
    path: 'm424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z'
  },
  progressing: {
    label: 'In progress',
    ink: 'var(--brand-deep-blue)',
    well: 'rgba(23,61,71,0.10)',
    path: 'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm112-192 56-56-148-148v-184h-80v216l172 172Z'
  },
  info: {
    label: 'Info',
    ink: 'var(--fin-neutral)',
    well: 'var(--fin-neutral-bg)',
    path: 'M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z'
  },
  warning: {
    label: 'Warning',
    ink: 'var(--warning)',
    well: 'rgba(184,160,48,0.14)',
    path: 'm40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z'
  },
  error: {
    label: 'Error',
    ink: 'var(--error)',
    well: 'var(--error-bg)',
    path: 'M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z'
  }
};
const SAMPLE_ITEMS = [{
  id: 'e1',
  level: 'error',
  title: 'Swap couldn\u2019t be completed',
  message: 'We couldn\u2019t finalize your 100 USDC \u2192 USDT swap. No funds left your wallet.',
  time: '6 min ago',
  ctaLabel: 'View details',
  read: false
}, {
  id: 'c1',
  level: 'completed',
  title: 'Buy order completed',
  message: 'Your OTC purchase of 500 hUSD is complete and added to your balance.',
  time: '22 min ago',
  ctaLabel: 'View order',
  read: false
}, {
  id: 'p1',
  level: 'progressing',
  title: 'Swap is settling',
  message: 'Your USDC \u2192 USDT swap is confirmed. Balances are updating now.',
  time: '25 min ago',
  ctaLabel: 'View transaction',
  read: false
}, {
  id: 'i1',
  level: 'info',
  title: 'New network supported',
  message: 'You can now hold and move hUSD on Base.',
  time: 'yesterday',
  ctaLabel: 'Learn more',
  read: true
}];
const BELL_PATH = 'M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0';
const X_PATH = 'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z';
const CSS = `
.unera-notif { position: relative; display: inline-block; }
.unera-notif__bell { width: 36px; height: 36px; border-radius: 50%; border: none; background: transparent; cursor: pointer; position: relative; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
.unera-notif--on-dark .unera-notif__bell:hover { background: rgba(255,255,255,0.1); }
.unera-notif--on-dark .unera-notif__bell-icon { color: rgba(255,255,255,0.85); }
.unera-notif--on-dark .unera-notif__bell:hover .unera-notif__bell-icon { color: var(--brand-yellow); }
.unera-notif__bell:focus-visible { outline: 2px solid var(--brand-yellow); outline-offset: 2px; }
.unera-notif__bell-icon { width: 20px; height: 20px; color: var(--brand-deep-blue); transition: color 0.2s; }
.unera-notif__badge { min-width: 18px; height: 18px; padding: 0 3px; border-radius: 9px; position: absolute; top: 0; right: 0; background: var(--brand-yellow); color: var(--brand-deep-blue); font-size: 0.625rem; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid var(--brand-deep-blue); box-sizing: border-box; }
.unera-notif__panel { position: absolute; top: calc(100% + 0.75rem); right: 0; width: 400px; max-height: 70vh; background: var(--brand-white); border-radius: 0.75rem; box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08); display: none; flex-direction: column; overflow: hidden; z-index: 10002; }
.unera-notif__panel.is-open { display: flex; }
.unera-notif__head { padding: 1.25rem; flex-shrink: 0; background: color-mix(in srgb, var(--brand-cloud-blue) 30%, var(--brand-white)); border-bottom: 1px solid rgba(0,0,0,0.06); }
.unera-notif__head-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.unera-notif__title { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
.unera-notif__unread { font-size: 0.75rem; color: var(--brand-deep-blue); font-weight: 600; }
.unera-notif__actions { display: flex; align-items: center; gap: 0.75rem; }
.unera-notif__link { background: none; border: none; cursor: pointer; font-size: 0.75rem; color: var(--text-secondary); text-decoration: none; font-weight: 500; padding: 0; font-family: var(--font-body); }
.unera-notif__link:hover { text-decoration: underline; }
.unera-notif__link--all { color: var(--brand-deep-blue); font-weight: 600; }
.unera-notif__wrap { padding: 0.5rem; flex: 1; min-height: 0; overflow-y: auto; }
.unera-notif__sect { font-size: 0.688rem; font-weight: 700; color: var(--neutral-600); letter-spacing: 0.05em; padding: 0.75rem 0.75rem 0.5rem; text-transform: uppercase; }
.unera-notif__list { list-style: none; padding: 0; margin: 0; }
.unera-notif__item { display: flex; align-items: flex-start; gap: 0.625rem; padding: 0.75rem; border-radius: 0.5rem; transition: background 0.15s; font-size: 0.875rem; }
.unera-notif__item:hover { background: rgba(23,61,71,0.08); }
.unera-notif__item:hover .unera-notif__dismiss { opacity: 1; }
.unera-notif__item:not(.is-read) { box-shadow: none; }
.unera-notif__icon { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.unera-notif__icon svg { width: 14px; height: 14px; fill: currentColor; }
.unera-notif__body { flex: 1; min-width: 0; }
.unera-notif__item-title { font-size: 0.8125rem; font-weight: 500; color: var(--text-primary); margin: 0; }
.unera-notif__item.is-read .unera-notif__item-title { font-weight: 400; color: var(--neutral-600); }
.unera-notif__msg { font-size: 0.75rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0.125rem 0 0; }
.unera-notif__time { font-size: 0.6875rem; color: var(--text-secondary); display: block; margin-top: 0.125rem; }
.unera-notif__cta { font-size: 0.75rem; font-weight: 600; color: var(--brand-deep-blue); text-decoration: none; margin-top: 0.25rem; display: inline-block; }
.unera-notif__cta:hover { text-decoration: underline; }
.unera-notif__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brand-deep-blue); flex-shrink: 0; margin-top: 6px; }
.unera-notif__dismiss { width: 20px; height: 20px; min-width: 20px; border: none; background: none; cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); opacity: 0; transition: opacity 0.2s; }
.unera-notif__dismiss:hover { color: var(--error); }
.unera-notif__dismiss svg { width: 14px; height: 14px; fill: currentColor; }
.unera-notif__empty { padding: 1.5rem; text-align: center; color: var(--text-secondary); font-size: 0.875rem; }
.unera-notif__divider { height: 1px; background: rgba(0,0,0,0.06); flex-shrink: 0; }
.unera-notif__foot { padding: 0.5rem; flex-shrink: 0; }
.unera-notif__foot-btn { width: 100%; padding: 0.875rem 1.5rem; border-radius: 0.75rem; font-weight: 600; font-size: 0.938rem; display: flex; align-items: center; justify-content: center; border: 2px solid var(--border-subtle); background: var(--brand-white); color: var(--text-primary); cursor: pointer; font-family: var(--font-body); }
.unera-notif__foot-btn:hover { border-color: var(--brand-deep-blue); color: var(--brand-deep-blue); }
`;
if (typeof document !== 'undefined' && !document.getElementById('unera-notif-bell-css')) {
  const el = document.createElement('style');
  el.id = 'unera-notif-bell-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}
function NotifItem({
  item,
  onDismiss
}) {
  const lvl = LEVELS[item.level] || LEVELS.info;
  return /*#__PURE__*/React.createElement("li", {
    className: `unera-notif__item ${item.read ? 'is-read' : ''}`.trim(),
    role: "listitem",
    style: {
      '--nlvl': lvl.ink
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "unera-notif__icon",
    role: "img",
    "aria-label": lvl.label,
    style: {
      background: lvl.well,
      color: lvl.ink
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: lvl.path
  }))), /*#__PURE__*/React.createElement("div", {
    className: "unera-notif__body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "unera-notif__item-title"
  }, item.title), /*#__PURE__*/React.createElement("p", {
    className: "unera-notif__msg"
  }, item.message), /*#__PURE__*/React.createElement("time", {
    className: "unera-notif__time"
  }, item.time), item.ctaLabel ? /*#__PURE__*/React.createElement("a", {
    className: "unera-notif__cta",
    href: item.ctaUrl || '#'
  }, item.ctaLabel) : null), !item.read ? /*#__PURE__*/React.createElement("span", {
    className: "unera-notif__dot",
    "aria-hidden": "true"
  }) : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "unera-notif__dismiss",
    "aria-label": `Dismiss: ${item.title}`,
    onClick: () => onDismiss && onDismiss(item.id)
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: X_PATH
  }))));
}

/**
 * @param onDark  Render the bell tinted for the deep-blue nav (white icon, yellow hover).
 */
function NotificationBell({
  unreadCount = 3,
  items = SAMPLE_ITEMS,
  open = false,
  onDark = true,
  onBellClick,
  onMarkAllRead,
  onClearAll,
  onDismiss,
  viewAllHref = '#',
  className = '',
  ...rest
}) {
  const count = typeof unreadCount === 'number' ? unreadCount : items.filter(n => !n.read).length;
  const badge = count > 99 ? '99+' : String(count);
  const empty = !items || items.length === 0;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `unera-notif ${onDark ? 'unera-notif--on-dark' : ''} ${className}`.trim()
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "unera-notif__bell",
    "aria-haspopup": "true",
    "aria-expanded": open ? 'true' : 'false',
    "aria-label": count === 0 ? 'Notifications' : `Notifications, ${count} unread`,
    onClick: onBellClick
  }, /*#__PURE__*/React.createElement("svg", {
    className: "unera-notif__bell-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: BELL_PATH
  })), count > 0 ? /*#__PURE__*/React.createElement("span", {
    className: "unera-notif__badge",
    "aria-hidden": "true"
  }, badge) : null), /*#__PURE__*/React.createElement("div", {
    className: `unera-notif__panel ${open ? 'is-open' : ''}`.trim(),
    role: "dialog",
    "aria-label": "Notifications"
  }, /*#__PURE__*/React.createElement("div", {
    className: "unera-notif__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "unera-notif__head-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "unera-notif__title"
  }, "Notifications"), count > 0 ? /*#__PURE__*/React.createElement("span", {
    className: "unera-notif__unread"
  }, count, " unread") : null), /*#__PURE__*/React.createElement("div", {
    className: "unera-notif__actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: viewAllHref,
    className: "unera-notif__link unera-notif__link--all"
  }, "View all"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "unera-notif__link",
    onClick: onMarkAllRead
  }, "Mark all read"))), /*#__PURE__*/React.createElement("div", {
    className: "unera-notif__wrap"
  }, empty ? /*#__PURE__*/React.createElement("p", {
    className: "unera-notif__empty"
  }, "You're all caught up") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "unera-notif__sect"
  }, "NEW"), /*#__PURE__*/React.createElement("ul", {
    className: "unera-notif__list",
    role: "list",
    "aria-live": "polite"
  }, items.map(it => /*#__PURE__*/React.createElement(NotifItem, {
    key: it.id,
    item: it,
    onDismiss: onDismiss
  }))))), !empty ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "unera-notif__divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "unera-notif__foot"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "unera-notif__foot-btn",
    onClick: onClearAll
  }, "Clear all notifications"))) : null));
}
Object.assign(__ds_scope, { NotificationBell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NotificationBell.jsx", error: String((e && e.message) || e) }); }

// components/navigation/WalletPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.unera-wallet-pill {
  display: inline-flex; align-items: center; gap: 0.3125rem;
  padding: 0.125rem 0.375rem 0.125rem 0.25rem;
  background: var(--brand-white); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill); box-shadow: 0 1px 4px rgba(23,61,71,0.08);
  color: var(--text-primary); font-family: var(--font-body);
}
.unera-wallet-pill--disconnected { padding: 0.125rem; }
.unera-wallet-pill__info { display: flex; flex-direction: column; min-width: 0; padding: 0 0.125rem; cursor: pointer; }
.unera-wallet-pill__addr { font-size: var(--fs-2xs); font-weight: var(--fw-semibold); line-height: 1.2; white-space: nowrap; }
.unera-wallet-pill__bal { font-size: var(--fs-3xs); line-height: 1.2; color: var(--text-secondary); white-space: nowrap; }
.unera-wallet-pill__net {
  display: inline-flex; align-items: center; gap: 0.25rem;
  padding: 0.25rem 0.5rem; margin-left: 0.125rem;
  background: var(--neutral-200); border: none; border-radius: var(--radius-sm);
  font-family: var(--font-body); font-size: var(--fs-3xs); font-weight: var(--fw-semibold);
  color: var(--text-secondary); cursor: pointer;
}
.unera-wallet-pill__net:hover { background: color-mix(in srgb, var(--neutral-300) 70%, var(--brand-white)); }
.unera-wallet-pill__net-dot { width: 8px; height: 8px; border-radius: var(--radius-full); background: #627EEA; flex-shrink: 0; }
.unera-wallet-pill__connect {
  background: transparent; border: none; cursor: pointer; font-family: var(--font-body);
  font-size: var(--fs-2xs); font-weight: var(--fw-semibold); letter-spacing: 0.02em; text-transform: uppercase;
  color: var(--brand-deep-blue); padding: 0.45rem 0.6rem; border-radius: var(--radius-pill);
}
.unera-wallet-pill__connect:hover { background: rgba(23,61,71,0.06); }
`;
if (typeof document !== 'undefined' && !document.getElementById('unera-wallet-pill-css')) {
  const el = document.createElement('style');
  el.id = 'unera-wallet-pill-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Dual-session wallet pill for the consumer nav. `connected` shows the full
 * three-part pill (avatar+connector badge, truncated address, network switcher);
 * disconnected shows an avatar-only pill with a CONNECT affordance.
 */
function WalletPill({
  connected = false,
  address = '0x742d…3a8f',
  balance = '$10,240',
  network = 'Ethereum',
  initials = 'JS',
  onConnect,
  className = '',
  ...rest
}) {
  if (!connected) {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: `unera-wallet-pill unera-wallet-pill--disconnected ${className}`.trim()
    }, rest), /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
      initials: initials,
      size: "md"
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "unera-wallet-pill__connect",
      onClick: onConnect
    }, "Connect"));
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `unera-wallet-pill ${className}`.trim()
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    blockie: true,
    size: "md",
    badge: "\uD83E\uDD8A"
  }), /*#__PURE__*/React.createElement("span", {
    className: "unera-wallet-pill__info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "unera-wallet-pill__addr"
  }, address), /*#__PURE__*/React.createElement("span", {
    className: "unera-wallet-pill__bal"
  }, balance)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "unera-wallet-pill__net"
  }, /*#__PURE__*/React.createElement("span", {
    className: "unera-wallet-pill__net-dot",
    "aria-hidden": "true"
  }), network));
}
Object.assign(__ds_scope, { WalletPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/WalletPill.jsx", error: String((e && e.message) || e) }); }

// components/transact/SaveToAddressBook.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Self-contained "Save to address book" pattern - success CTA + modal + localStorage store.
   Belongs to EXTERNAL-TRANSFER flows only (Send / withdraw / remittance): flows where the
   user enters a recipient address worth reusing. NOT for Buy / Swap / Trade (no recipient). */

const STAB_CSS = `
.stab-block { margin: 1.25rem 0 0; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; width: 100%; }
.stab-block > [hidden] { display: none !important; }
.stab-btn, .stab-chip { width: 100%; max-width: 22rem; box-sizing: border-box; }
.stab-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  min-height: 46px; padding: 0 1.25rem; border-radius: var(--radius-md, 0.75rem);
  border: 2px solid var(--border-subtle); background: var(--brand-white);
  color: var(--text-primary); font-family: var(--font-body); font-size: 0.938rem; font-weight: 600;
  cursor: pointer; transition: border-color .2s, color .2s, background .2s;
}
.stab-btn:hover { border-color: var(--brand-deep-blue); color: var(--brand-deep-blue); }
.stab-btn:focus-visible { outline: 2px solid var(--brand-deep-blue); outline-offset: 2px; }
.stab-btn svg { width: 18px; height: 18px; fill: currentColor; flex-shrink: 0; }
.stab-chip {
  display: inline-flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.375rem;
  padding: 0.625rem 1rem; border-radius: var(--radius-md, 0.75rem);
  background: var(--fin-up-bg); color: var(--fin-up); font-size: 0.875rem; font-weight: 600; margin: 0;
}
.stab-chip svg { width: 16px; height: 16px; flex-shrink: 0; }
.stab-chip__manage {
  margin-left: 0.5rem; font-size: 0.8125rem; color: var(--brand-deep-blue); font-weight: 600; text-decoration: none;
}
.stab-chip__manage:hover { text-decoration: underline; }
.stab-chip__manage:focus-visible { outline: 2px solid var(--brand-deep-blue); outline-offset: 2px; }

/* Modal */
.stab-overlay {
  position: fixed; inset: 0; z-index: 10010; background: rgba(15,32,38,0.55);
  display: flex; align-items: center; justify-content: center; padding: 1rem;
}
.stab-modal {
  width: 100%; max-width: 400px; background: var(--brand-white); border-radius: 0.5rem;
  box-shadow: 0 24px 64px rgba(0,0,0,0.28); display: flex; flex-direction: column;
  max-height: 90vh; overflow: hidden;
}
.stab-modal__header { display: flex; align-items: flex-start; gap: 1rem; padding: 1.5rem 1.5rem 0.75rem; }
.stab-modal__header-text { flex: 1; min-width: 0; }
.stab-modal__title { font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0 0 0.25rem; }
.stab-modal__desc { font-size: 0.875rem; color: var(--text-secondary); margin: 0; line-height: 1.5; }
.stab-modal__close {
  flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%; border: none; background: var(--neutral-100);
  color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.stab-modal__close:hover { background: var(--neutral-200); color: var(--text-primary); }
.stab-modal__close svg { width: 20px; height: 20px; fill: currentColor; }
.stab-modal__body { padding: 0.75rem 1.5rem 1.25rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; }
.stab-field { display: flex; flex-direction: column; gap: 0.375rem; }
.stab-label { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
.stab-label__hint { font-weight: 400; color: var(--text-secondary); }
.stab-input, .stab-textarea {
  width: 100%; box-sizing: border-box; padding: 0.75rem 1rem; border: 2px solid var(--border-subtle);
  border-radius: 0.75rem; font-family: var(--font-body); font-size: 1rem; color: var(--text-primary); background: var(--brand-white);
}
.stab-input:focus, .stab-textarea:focus { outline: none; border-color: var(--brand-deep-blue); }
.stab-textarea { resize: vertical; min-height: 72px; line-height: 1.5; }
.stab-static {
  display: flex; align-items: center; min-height: 52px; padding: 0.75rem 1rem;
  background: var(--neutral-100); border: 2px solid var(--border-subtle); border-radius: 0.75rem;
  font-size: 0.875rem; color: var(--text-primary); word-break: break-all;
}
.stab-static--mono { font-family: ui-monospace, monospace; }
.stab-modal__hint { font-size: 0.813rem; color: var(--text-secondary); margin: 0; }
.stab-modal__footer { padding: 1rem 1.5rem 1.5rem; display: flex; gap: 0.75rem; }
.stab-modal__footer .stab-foot-btn { flex: 1; min-height: 46px; border-radius: 0.75rem; font-family: var(--font-body); font-size: 0.938rem; font-weight: 600; cursor: pointer; border: 2px solid transparent; }
.stab-foot-btn--secondary { background: var(--brand-white); border-color: var(--border-subtle); color: var(--text-primary); }
.stab-foot-btn--secondary:hover { border-color: var(--brand-deep-blue); color: var(--brand-deep-blue); }
.stab-foot-btn--primary { background: var(--brand-deep-blue); color: var(--brand-white); }
.stab-foot-btn--primary:hover { background: var(--neutral-800, #0f2026); }
`;
if (typeof document !== 'undefined' && !document.getElementById('unera-stab-css')) {
  const el = document.createElement('style');
  el.id = 'unera-stab-css';
  el.textContent = STAB_CSS;
  document.head.appendChild(el);
}
const ICON_PERSON_ADD = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 -960 960 960",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"
}));
const ICON_CHECK = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 13l4 4L19 7"
}));
const ICON_CLOSE = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 -960 960 960",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
}));
function loadBook(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch (e) {
    return [];
  }
}
function upsertEntry(key, entry) {
  const list = loadBook(key);
  const i = list.findIndex(e => (e.address || '').toLowerCase() === entry.address.toLowerCase() && e.network === entry.network);
  if (i >= 0) list[i] = {
    ...list[i],
    ...entry,
    lastUsedAt: new Date().toISOString()
  };else list.push({
    ...entry,
    id: 'addr_' + Date.now(),
    addedAt: new Date().toISOString(),
    lastUsedAt: new Date().toISOString()
  });
  localStorage.setItem(key, JSON.stringify(list));
}

/**
 * Save-to-address-book success CTA + modal. Render on the SUCCESS/receipt screen of an
 * external-transfer flow when the user sent to a freshly-entered recipient address.
 * Clicking the button opens a labelling modal; on save it persists to a localStorage
 * address book and swaps the button for a "Saved as …" confirmation chip.
 */
function SaveToAddressBook({
  address,
  network = 'Ethereum',
  addressType = 'EVM',
  storageKey = 'unera_addressBook_v1',
  manageHref = '#',
  buttonLabel = 'Save to address book',
  onSaved,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [savedLabel, setSavedLabel] = React.useState('');
  const [label, setLabel] = React.useState('');
  const [description, setDescription] = React.useState('');
  const labelRef = React.useRef(null);
  React.useEffect(() => {
    if (open && labelRef.current) {
      const t = setTimeout(() => labelRef.current.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  function openModal() {
    setLabel('');
    setDescription('');
    setOpen(true);
  }
  function confirmSave() {
    const l = label.trim();
    if (!l) {
      if (labelRef.current) labelRef.current.focus();
      return;
    }
    const entry = {
      label: l,
      description: description.trim(),
      address,
      addressType,
      network
    };
    upsertEntry(storageKey, entry);
    setSavedLabel(l);
    setSaved(true);
    setOpen(false);
    if (typeof onSaved === 'function') onSaved(entry);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "stab-block"
  }, rest), !saved && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "stab-btn",
    onClick: openModal
  }, ICON_PERSON_ADD, buttonLabel), saved && /*#__PURE__*/React.createElement("p", {
    className: "stab-chip",
    role: "status"
  }, ICON_CHECK, /*#__PURE__*/React.createElement("span", null, "Saved as \"", savedLabel, "\""), /*#__PURE__*/React.createElement("a", {
    href: manageHref,
    className: "stab-chip__manage"
  }, "Manage wallets")), open && /*#__PURE__*/React.createElement("div", {
    className: "stab-overlay",
    onClick: e => {
      if (e.target === e.currentTarget) setOpen(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stab-modal",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Save wallet"
  }, /*#__PURE__*/React.createElement("header", {
    className: "stab-modal__header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stab-modal__header-text"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "stab-modal__title"
  }, "Save wallet"), /*#__PURE__*/React.createElement("p", {
    className: "stab-modal__desc"
  }, "Label this address so you can recognize it when sending. Double-check the network before saving.")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "stab-modal__close",
    onClick: () => setOpen(false),
    "aria-label": "Close"
  }, ICON_CLOSE)), /*#__PURE__*/React.createElement("div", {
    className: "stab-modal__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stab-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "stab-label",
    htmlFor: "stab-label-input"
  }, "Label"), /*#__PURE__*/React.createElement("input", {
    ref: labelRef,
    id: "stab-label-input",
    className: "stab-input",
    type: "text",
    value: label,
    onChange: e => setLabel(e.target.value),
    maxLength: 60,
    placeholder: "e.g. Ledger (personal), Exchange hot wallet"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stab-field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stab-label"
  }, "Wallet address"), /*#__PURE__*/React.createElement("div", {
    className: "stab-static stab-static--mono"
  }, address || '–')), /*#__PURE__*/React.createElement("div", {
    className: "stab-field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stab-label"
  }, "Address type & network"), /*#__PURE__*/React.createElement("div", {
    className: "stab-static"
  }, addressType, " \xB7 ", network)), /*#__PURE__*/React.createElement("div", {
    className: "stab-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "stab-label",
    htmlFor: "stab-desc-input"
  }, "Description ", /*#__PURE__*/React.createElement("span", {
    className: "stab-label__hint"
  }, "(optional)")), /*#__PURE__*/React.createElement("textarea", {
    id: "stab-desc-input",
    className: "stab-textarea",
    value: description,
    onChange: e => setDescription(e.target.value),
    maxLength: 120,
    rows: 2,
    placeholder: "e.g. Cold storage, Exchange deposit wallet"
  })), /*#__PURE__*/React.createElement("p", {
    className: "stab-modal__hint"
  }, "No wallet signature is required to save an address.")), /*#__PURE__*/React.createElement("footer", {
    className: "stab-modal__footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "stab-foot-btn stab-foot-btn--secondary",
    onClick: () => setOpen(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "stab-foot-btn stab-foot-btn--primary",
    onClick: confirmSave
  }, "Save Wallet")))));
}
Object.assign(__ds_scope, { SaveToAddressBook });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/transact/SaveToAddressBook.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consumer-app/Nav.jsx
try { (() => {
/* Huma consumer app - top nav (the product spine). */
function Nav({
  active,
  onNav,
  connected,
  onConnect
}) {
  const UI = window.UI;
  const [txOpen, setTxOpen] = React.useState(false);
  const link = (key, label) => /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-link" + (active === key ? " active" : ""),
    onClick: () => onNav(key)
  }, label));
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav",
    "aria-label": "Main navigation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-left"
  }, /*#__PURE__*/React.createElement("button", {
    className: "nav-brand",
    onClick: () => onNav("dashboard"),
    "aria-label": "Huma home"
  }, /*#__PURE__*/React.createElement("img", {
    className: "nav-logo-img",
    src: "../../assets/logos/huma-white-text-nav.svg",
    alt: "Huma"
  })), /*#__PURE__*/React.createElement("ul", {
    className: "nav-links",
    role: "list"
  }, link("dashboard", "Dashboard"), connected ? link("wallet", "Wallet") : /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-link",
    onClick: onConnect
  }, "Connect")), /*#__PURE__*/React.createElement("li", {
    className: "nav-dropdown" + (txOpen ? " open" : ""),
    onMouseEnter: () => setTxOpen(true),
    onMouseLeave: () => setTxOpen(false)
  }, /*#__PURE__*/React.createElement("button", {
    className: "nav-link" + (active === "send" ? " active" : ""),
    "aria-haspopup": "true",
    "aria-expanded": txOpen
  }, "Transact ", /*#__PURE__*/React.createElement("span", {
    className: "nav-chev"
  }, UI.chevron)), /*#__PURE__*/React.createElement("ul", {
    className: "nav-menu",
    role: "menu"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav("send"),
    role: "menuitem"
  }, "Add Tokens")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav("send"),
    role: "menuitem"
  }, "Send Tokens")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav("send"),
    role: "menuitem"
  }, "Stake")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav("send"),
    role: "menuitem"
  }, "Exchange")))), link("centers", "Centers"))), /*#__PURE__*/React.createElement("div", {
    className: "nav-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "notif-bell",
    "aria-label": "Notifications, 3 unread",
    onClick: () => onNav("notifications")
  }, UI.bell, /*#__PURE__*/React.createElement("span", {
    className: "notif-badge"
  }, "3")), connected && /*#__PURE__*/React.createElement("span", {
    className: "wallet-pill"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-avatar wp-avatar--blockie"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-fox"
  }, "\uD83E\uDD8A")), /*#__PURE__*/React.createElement("span", {
    className: "wp-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-addr"
  }, "0x0822...7B75"), /*#__PURE__*/React.createElement("span", {
    className: "wp-bal"
  }, "2,500.00 hUSD")), /*#__PURE__*/React.createElement("button", {
    className: "wp-net"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-dot"
  }), "Ethereum"))));
}
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer-app/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consumer-app/icons.jsx
try { (() => {
/* Huma consumer-app UI kit - Material Symbols (inline SVG, fill=currentColor).
   Outlined for nav/inline; filled for activity/status wells. */
const I = {
  bell: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
  })),
  chevron: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"
  })),
  arrowUp: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"
  })),
  arrowDown: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"
  })),
  wallet: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-117.5-77.5Q700-455 700-480t-17.5-42.5Q665-540 640-540t-42.5 17.5Q580-505 580-480t17.5 42.5Q615-420 640-420t42.5-17.5Z"
  })),
  buy: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
  })),
  exchange: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z"
  })),
  explore: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m260-260 300-140 140-300-300 140-140 300Zm220-180q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
  })),
  send: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M120-160v-240l320-80-320-80v-240l760 320-760 320Z"
  })),
  portfolio: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M668.5-531.5Q680-543 680-560t-11.5-28.5Q657-600 640-600t-28.5 11.5Q600-577 600-560t11.5 28.5Q623-520 640-520t28.5-11.5ZM320-600h200v-80H320v80ZM180-120q-34-114-67-227.5T80-580q0-92 64-156t156-64h200q29-38 70.5-59t89.5-21q25 0 42.5 17.5T720-820q0 5-5 23-4 11-7.5 22.5T702-751l91 91h87v279l-113 37-67 224H480v-80h-80v80H180Z"
  })),
  yield: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z"
  })),
  heart: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
  })),
  lives: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0-240v-53q0-38.57 41.5-62.78Q83-380 150.38-380q12.16 0 23.39.5 11.23.5 22.23 2.18-8 17.32-12 35.49-4 18.16-4 37.83v64H0Zm240 0v-66q0-65 66.5-104.5T480-450q108 0 174 39.5T720-306v66H240Zm540 0v-64q0-20-3.5-38t-11.5-35q11-2 22.16-2.5 11.15-.5 22.84-.5 67.5 0 108.5 23.5T960-294v54H780ZM150-415q-29 0-49.5-20.5T80-485q0-30 20.5-50t49.5-20q30 0 50 20t20 50q0 29-20 49.5T150-415Zm660 0q-29 0-49.5-20.5T740-485q0-30 20.5-50t49.5-20q30 0 50 20t20 50q0 29-20 49.5T810-415Zm-330-65q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T595-600q0 50-34.5 85T475-480Z"
  })),
  governance: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M180-80q-24 0-42-18t-18-42v-198l135-149 43 43-118 129h600L669-441l43-43 128 146v198q0 24-18 42t-42 18H180Zm0-60h600v-115H180v115Zm262-245L283-544q-19-19-17-42.5t20-41.5l212-212q17-17 41-17t41 17l159 159q17 17 17.5 40.5T740-597L528-385q-17 17-42 18t-44-18Z"
  })),
  check: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 13l4 4L19 7"
  })),
  bolt: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m393-165 279-335H492l36-286-253 366h154l-36 255Z"
  })),
  warn: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m40-120 440-760 440 760H40Zm440-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z"
  })),
  verified: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z"
  })),
  // ─── Transaction / activity glyphs (verbatim from wallet-enhanced.html) ───
  received: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"
  })),
  bank: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Z"
  })),
  shield: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z"
  })),
  plus: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
  })),
  redeem: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M440-160v-326L216-262l-57-57 321-321 321 321-57 57-224-224v326h-80Z"
  })),
  arrowRightUp: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"
  })),
  caretUp: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z"
  })),
  eye: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19 12 19c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 5c4.756 0 8.773 2.662 10.065 7A10.524 10.524 0 0112 19c-1.473 0-2.891-.292-4.21-.818M15 12a3 3 0 11-6 0 3 3 0 016 0z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 3l18 18"
  })),
  stake: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"
  })),
  close: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })),
  // ─── Account / settings / security (Material Symbols) ───
  settings: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M433-80q-27 0-46.5-18T363-142l-9-66q-13-5-24.5-12T307-235l-62 26q-25 11-50 2t-39-32l-47-82q-14-23-8-49t27-43l53-40q-1-7-1-13.5v-27q0-6.5 1-13.5l-53-40q-21-17-27-43t8-49l47-82q14-23 39-32t50 2l62 26q11-8 23-15t24-12l9-66q4-26 23.5-44t46.5-18h94q27 0 46.5 18t23.5 44l9 66q13 5 24.5 12t22.5 15l62-26q25-11 50-2t39 32l47 82q14 23 8 49t-27 43l-53 40q1 7 1 13.5v27q0 6.5-2 13.5l53 40q21 17 27 43t-8 49l-48 82q-14 23-39 32t-50-2l-60-26q-11 8-23 15t-24 12l-9 66q-4 26-23.5 44T527-80h-94Zm49-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z"
  })),
  person: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"
  })),
  logout: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
  })),
  dashboardGrid: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Z"
  })),
  lock: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"
  })),
  key: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h472l120 120-180 180-80-60-80 60-85-60h-87q-32 54-86.5 87T280-240Z"
  })),
  qrCode: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M520-120v-80h80v80h-80Zm-80-80v-200h80v200h-80Zm320-120v-160h80v160h-80Zm-80-160v-80h80v80h-80Zm-480 0v-80h80v80h-80Zm-80-80v-80h80v80h-80Zm400-200v-80h80v80h-80Zm320 720v-160h80v160h-80ZM120-120v-280h280v280H120Zm80-80h120v-120H200v120Zm-80-360v-280h280v280H120Zm80-80h120v-120H200v120Zm360 80v-280h280v280H560Zm80-80h120v-120H640v120Zm80 480v-80h80v80h-80ZM440-440v-80h80v80h-80Zm0-200v-200h80v200h-80Z"
  })),
  search: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
  })),
  filter: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"
  })),
  edit: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
  })),
  trash: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z"
  })),
  download: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
  })),
  share: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Z"
  })),
  externalLink: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"
  })),
  calendar: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Z"
  })),
  clock: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm112-192 56-56-128-128v-184h-80v216l152 152Z"
  })),
  info: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
  })),
  errorCircle: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
  })),
  successCircle: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m424-296 282-282-56-56-226 226-114-114-56 56 170 170ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
  })),
  email: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z"
  })),
  phone: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T408-355q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T691-352l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z"
  })),
  camera: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Z"
  })),
  idCard: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M560-360h200v-80H560v80Zm0-160h200v-80H560v80ZM200-320h320v-23q0-24-13-44.5T473-420q-30-13-61.5-19.5T348-446q-32 0-63.5 6.5T223-420q-21 12-34 32.5T176-343v23Zm148-180q30 0 51-21t21-51q0-30-21-51t-51-21q-30 0-51 21t-21 51q0 30 21 51t51 21ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Z"
  })),
  card: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M80-200v-560h800v560H80Zm80-360h640v-120H160v120Zm0 280h640v-160H160v160Z"
  })),
  minus: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M200-440v-80h560v80H200Z"
  })),
  more: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"
  })),
  arrowBack: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M313-440l224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
  })),
  trendingDown: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M640-240v-80h104L536-526 376-366 80-664l56-56 240 240 160-160 264 264v-104h80v240H640Z"
  })),
  gift: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M160-80q-33 0-56.5-23.5T80-160v-280h800v280q0 33-23.5 56.5T800-80H160ZM80-520v-160q0-33 23.5-56.5T160-760h106q-3-10-4.5-19.5T260-800q0-50 35-85t85-35q26 0 47.5 11t37.5 30q16-20 37.5-30.5T550-920q50 0 85 35t35 85q0 11-1.5 20.5T664-760h96q33 0 56.5 23.5T840-680v160H80Zm380-240q17 0 28.5-11.5T500-800q0-17-11.5-28.5T460-840q-17 0-28.5 11.5T420-800q0 17 11.5 28.5T460-760Zm-80 0q0-17-11.5-28.5T340-800q-17 0-28.5 11.5T300-760q0 17 11.5 28.5T340-720q17 0 28.5-11.5T380-760Z"
  }))
};
window.UI = I;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer-app/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consumer-app/screens.jsx
try { (() => {
/* Huma consumer app - screens (Dashboard, Wallet, Centers, Send flow). */
const {
  useState
} = React;

/* ─── Dashboard ─────────────────────────────────────────────────── */
function Dashboard({
  onNav
}) {
  const UI = window.UI;
  const impact = [{
    icon: UI.portfolio,
    mod: "portfolio",
    value: "$10,240",
    label: "Total Portfolio",
    detail: "🦊 0x0822...7B75 · Ethereum",
    trend: "+$2,400 this month"
  }, {
    icon: UI.yield,
    mod: "yield",
    value: "$486.50",
    label: "Yield Generated",
    detail: "Continuous support from reserves",
    trend: "+$42 this week"
  }, {
    icon: UI.heart,
    mod: "donations",
    value: "$5,240",
    label: "Total Donations",
    detail: "3 centers supported",
    trend: "+18% this month"
  }, {
    icon: UI.lives,
    mod: "lives",
    value: "1,240+",
    label: "Lives Impacted",
    detail: "Through education, food & care",
    trend: "Growing daily",
    neutral: true
  }];
  const actions = [{
    key: "wallet",
    cls: "action-card--sky",
    icon: UI.wallet,
    title: "My Wallet",
    desc: "View balances & transactions"
  }, {
    key: "send",
    cls: "primary",
    icon: UI.buy,
    title: "Buy Stablecoins",
    desc: "Buy hUSD, USDC or USDT"
  }, {
    key: "send",
    cls: "action-card--sky",
    icon: UI.exchange,
    title: "Exchange",
    desc: "Convert between currencies"
  }, {
    key: "centers",
    cls: "action-card--sky",
    icon: UI.explore,
    title: "Explore Centers",
    desc: "Discover where to donate"
  }, {
    key: "dashboard",
    cls: "action-card--sky",
    icon: UI.governance,
    title: "Governance",
    desc: "Vote on community proposals"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "app-main"
  }, /*#__PURE__*/React.createElement("header", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("p", {
    className: "welcome-text"
  }, "Welcome back,"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Jane Smith"), /*#__PURE__*/React.createElement("p", {
    className: "page-subtitle"
  }, "One Flow. Many Lives. Track your impact and manage your contributions.")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "impact-grid"
  }, impact.map((c, i) => /*#__PURE__*/React.createElement("div", {
    className: "impact-card",
    key: i,
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("div", {
    className: "impact-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "impact-icon impact-icon--" + c.mod
  }, c.icon), /*#__PURE__*/React.createElement("span", {
    className: "info-tip",
    title: c.label
  }, "i")), /*#__PURE__*/React.createElement("div", {
    className: "impact-value"
  }, c.value), /*#__PURE__*/React.createElement("div", {
    className: "impact-label"
  }, c.label), /*#__PURE__*/React.createElement("div", {
    className: "impact-detail"
  }, c.detail), /*#__PURE__*/React.createElement("div", {
    className: "impact-trend" + (c.neutral ? " impact-trend--neutral" : "")
  }, UI.arrowUp, c.trend))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Quick Actions")), /*#__PURE__*/React.createElement("div", {
    className: "quick-actions-grid"
  }, actions.map((a, i) => /*#__PURE__*/React.createElement("button", {
    className: "action-card " + a.cls,
    key: i,
    onClick: () => onNav(a.key)
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-card-icon"
  }, a.icon), /*#__PURE__*/React.createElement("div", {
    className: "action-card-title"
  }, a.title), /*#__PURE__*/React.createElement("div", {
    className: "action-card-desc"
  }, a.desc))))));
}

/* ─── Wallet ────────────────────────────────────────────────────── */
function Wallet({
  onNav
}) {
  const UI = window.UI;
  const assets = [{
    sym: "hUSD",
    full: "US Dollar",
    icon: "🇺🇸",
    bal: "2,500.00 hUSD",
    fiat: "2,500.00 USD",
    pct: "30.3%",
    change: "+1.2%",
    fill: "husd"
  }, {
    sym: "USDC",
    full: "USD Coin",
    glyph: "$",
    bal: "1,250.00 USDC",
    fiat: "1,250.00 USD",
    pct: "15.2%",
    change: "+0.1%",
    fill: "husd"
  }, {
    sym: "USDT",
    full: "Tether USD",
    glyph: "T",
    bal: "850.00 USDT",
    fiat: "850.00 USD",
    pct: "10.3%",
    change: "0.0%",
    fill: "husd"
  }];
  const txns = [{
    date: "Today",
    items: [{
      type: "in",
      icon: UI.received,
      title: "Received from Alice Johnson",
      time: "10:32 AM",
      status: "completed",
      rail: "chain",
      token: "hUSD",
      amt: "+ $500.00",
      amtCls: "positive",
      sub: "hUSD"
    }, {
      type: "donation",
      icon: UI.heart,
      title: "Donation to Nairobi Humanity Center",
      time: "09:15 AM",
      status: "completed",
      rail: "chain",
      token: "hUSD",
      amt: "- $250.00",
      amtCls: "negative",
      sub: "hUSD"
    }, {
      type: "pending",
      icon: UI.bank,
      title: "Bank Transfer In",
      time: "08:45 AM",
      status: "pending",
      rail: "fiat",
      token: "hUSD",
      amt: "+ $1,000.00",
      amtCls: "positive",
      sub: "Est. 2-3 days"
    }, {
      type: "yield",
      icon: UI.yield,
      title: "Yield Earned · Monthly Distribution",
      time: "06:00 AM",
      status: "completed",
      rail: "chain",
      token: "hUSD",
      amt: "+ $12.50",
      amtCls: "positive",
      sub: "4.8% APY"
    }]
  }, {
    date: "Yesterday",
    items: [{
      type: "out",
      icon: UI.send,
      title: "Sent to 0x44f…9b1",
      time: "4:20 PM",
      status: "completed",
      rail: "chain",
      token: "USDC",
      amt: "- $180.00",
      amtCls: "negative",
      sub: "USDC"
    }, {
      type: "convert",
      icon: UI.exchange,
      title: "Exchanged USDC → hUSD",
      time: "11:08 AM",
      status: "completed",
      rail: "chain",
      token: "hUSD",
      amt: "+ $300.00",
      amtCls: "neutral",
      sub: "hUSD"
    }]
  }];
  function assetActions(sym) {
    return /*#__PURE__*/React.createElement("footer", {
      className: "portfolio-asset-row-actions",
      role: "group",
      "aria-label": sym + " actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "asset-action-btn"
    }, UI.plus, /*#__PURE__*/React.createElement("span", {
      className: "btn-label"
    }, "Issue")), /*#__PURE__*/React.createElement("button", {
      className: "asset-action-btn"
    }, UI.redeem, /*#__PURE__*/React.createElement("span", {
      className: "btn-label"
    }, "Redeem")), /*#__PURE__*/React.createElement("a", {
      className: "asset-action-btn",
      onClick: () => onNav("send")
    }, UI.arrowRightUp, /*#__PURE__*/React.createElement("span", {
      className: "btn-label"
    }, "Send")), /*#__PURE__*/React.createElement("a", {
      className: "asset-action-btn",
      onClick: () => onNav("send")
    }, UI.exchange, /*#__PURE__*/React.createElement("span", {
      className: "btn-label"
    }, "Exchange")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "app-main"
  }, /*#__PURE__*/React.createElement("header", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Wallet"), /*#__PURE__*/React.createElement("p", {
    className: "page-subtitle"
  }, "View your portfolio, manage assets, and track transactions")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "wallet-section-header"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Balances"), /*#__PURE__*/React.createElement("button", {
    className: "privacy-toggle",
    "aria-pressed": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "privacy-toggle-icon"
  }, UI.eye), "Show Balances")), /*#__PURE__*/React.createElement("div", {
    className: "asset-summary-panel"
  }, /*#__PURE__*/React.createElement("header", {
    className: "asset-summary-panel-head"
  }, /*#__PURE__*/React.createElement("h2", null, "Portfolio"), /*#__PURE__*/React.createElement("span", {
    className: "portfolio-trust-chip"
  }, UI.shield, "100% Backed by Reserves")), /*#__PURE__*/React.createElement("div", {
    className: "summary-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "summary-stat-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "Total Portfolio"), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, "$8,250.00"), /*#__PURE__*/React.createElement("span", {
    className: "stat-change positive"
  }, UI.arrowUp, "+3.2% this week")), /*#__PURE__*/React.createElement("div", {
    className: "summary-stat-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "Total Assets"), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, "4"), /*#__PURE__*/React.createElement("span", {
    className: "stat-detail"
  }, "3 stablecoins")), /*#__PURE__*/React.createElement("div", {
    className: "summary-stat-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "Largest Holding"), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, "hUSD"), /*#__PURE__*/React.createElement("span", {
    className: "stat-detail"
  }, "$2,500 (30.3%)"))), /*#__PURE__*/React.createElement("div", {
    className: "asset-distribution"
  }, /*#__PURE__*/React.createElement("h3", null, "Portfolio Distribution"), /*#__PURE__*/React.createElement("h4", {
    className: "portfolio-group-label"
  }, "Stablecoins"), assets.map((a, i) => /*#__PURE__*/React.createElement("article", {
    className: "portfolio-asset-row",
    key: i
  }, /*#__PURE__*/React.createElement("header", {
    className: "portfolio-asset-row-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "distribution-icon",
    "aria-hidden": "true",
    style: a.glyph ? {
      fontSize: "0.9rem",
      fontWeight: 700,
      color: "var(--brand-deep-blue)"
    } : null
  }, a.icon || a.glyph), /*#__PURE__*/React.createElement("div", {
    className: "portfolio-asset-row-identity"
  }, /*#__PURE__*/React.createElement("div", {
    className: "portfolio-asset-row-name"
  }, a.sym), /*#__PURE__*/React.createElement("div", {
    className: "portfolio-asset-row-fullname"
  }, a.full)), /*#__PURE__*/React.createElement("div", {
    className: "portfolio-asset-row-numbers"
  }, /*#__PURE__*/React.createElement("div", {
    className: "balance-amount"
  }, a.bal), /*#__PURE__*/React.createElement("div", {
    className: "portfolio-asset-row-fiat"
  }, a.fiat)), /*#__PURE__*/React.createElement("span", {
    className: "balance-change positive"
  }, UI.caretUp, a.change)), /*#__PURE__*/React.createElement("div", {
    className: "distribution-bar",
    role: "img",
    "aria-label": a.sym + ", " + a.pct + " of portfolio"
  }, /*#__PURE__*/React.createElement("div", {
    className: "distribution-bar-fill " + a.fill,
    style: {
      width: a.pct
    }
  }, a.pct)), assetActions(a.sym))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "load-more-btn"
  }, "See more", UI.chevron))), /*#__PURE__*/React.createElement("div", {
    className: "quick-actions",
    role: "group",
    "aria-label": "Wallet actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "action-btn primary",
    onClick: () => onNav("send")
  }, /*#__PURE__*/React.createElement("span", {
    className: "action-btn-icon"
  }, UI.buy), /*#__PURE__*/React.createElement("span", null, "Buy Stablecoins")), /*#__PURE__*/React.createElement("button", {
    className: "action-btn",
    onClick: () => onNav("send")
  }, /*#__PURE__*/React.createElement("span", {
    className: "action-btn-icon"
  }, UI.exchange), /*#__PURE__*/React.createElement("span", null, "Exchange")), /*#__PURE__*/React.createElement("button", {
    className: "action-btn",
    onClick: () => onNav("send")
  }, /*#__PURE__*/React.createElement("span", {
    className: "action-btn-icon"
  }, UI.send), /*#__PURE__*/React.createElement("span", null, "Send")), /*#__PURE__*/React.createElement("button", {
    className: "action-btn",
    onClick: () => onNav("send")
  }, /*#__PURE__*/React.createElement("span", {
    className: "action-btn-icon"
  }, UI.stake), /*#__PURE__*/React.createElement("span", null, "Stake")))), /*#__PURE__*/React.createElement("section", {
    id: "transaction-history",
    className: "history-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, "Activity"), /*#__PURE__*/React.createElement("p", {
    className: "card-subtitle"
  }, "All wallet activity: on-chain transfers and off-chain payments")), /*#__PURE__*/React.createElement("div", {
    className: "transaction-list"
  }, txns.map((group, gi) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: gi
  }, /*#__PURE__*/React.createElement("div", {
    className: "date-header"
  }, group.date), group.items.map((t, i) => /*#__PURE__*/React.createElement("div", {
    className: "transaction-item",
    key: i,
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("div", {
    className: "transaction-icon " + t.type,
    "aria-hidden": "true"
  }, t.icon), /*#__PURE__*/React.createElement("div", {
    className: "transaction-details"
  }, /*#__PURE__*/React.createElement("div", {
    className: "transaction-title"
  }, t.title), /*#__PURE__*/React.createElement("div", {
    className: "transaction-meta"
  }, /*#__PURE__*/React.createElement("span", null, t.time), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", {
    className: "transaction-status " + t.status
  }, t.status === "completed" ? "Completed" : "Pending"), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", {
    className: "activity-rail-badge activity-rail-badge--" + t.rail
  }, t.rail === "chain" ? "On-chain" : "Off-chain"), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", null, t.token))), /*#__PURE__*/React.createElement("div", {
    className: "transaction-amount"
  }, /*#__PURE__*/React.createElement("div", {
    className: "amount-primary " + t.amtCls
  }, t.amt), /*#__PURE__*/React.createElement("div", {
    className: "amount-secondary"
  }, t.sub)))))))));
}

/* ─── Notifications ─────────────────────────────────────────────── */
function Notifications({
  onNav
}) {
  const UI = window.UI;
  const groups = [{
    title: "New",
    items: [{
      cat: "transaction",
      icon: UI.received,
      title: "Transaction Confirmed",
      msg: "Sent 12.5 USDC · confirmed on Ethereum",
      time: "2 minutes ago",
      cta: "View transaction",
      unread: true
    }, {
      cat: "listing",
      icon: UI.explore,
      title: "New Listing Available",
      msg: "Lot 7B at Conscious Landbank is now open",
      time: "1 hour ago",
      unread: true
    }, {
      cat: "donation",
      icon: UI.heart,
      title: "Donation Receipt Ready",
      msg: "Your $100 donation to Nairobi Hope Center has been processed",
      time: "5 hours ago",
      cta: "View receipt",
      unread: true
    }]
  }, {
    title: "Earlier",
    items: [{
      cat: "system",
      icon: UI.warn,
      title: "Security Notice",
      msg: "New device login detected for your account",
      time: "Yesterday",
      cta: "View activity"
    }, {
      cat: "remittance",
      icon: UI.send,
      title: "Remittance Sent",
      msg: "You sent 50 hUSD to 0x742d...4a23 · confirmed",
      time: "2 days ago",
      cta: "View transaction"
    }, {
      cat: "verification",
      icon: UI.verified,
      title: "KYC Verified",
      msg: "Your identity verification has been completed successfully",
      time: "2 days ago",
      cta: "View status"
    }]
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "app-main"
  }, /*#__PURE__*/React.createElement("header", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Notifications"), /*#__PURE__*/React.createElement("p", {
    className: "page-subtitle"
  }, "Transactions, donations, listings and account activity, all in one place.")), /*#__PURE__*/React.createElement("div", {
    className: "section-header",
    style: {
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: "var(--text-secondary)",
      fontSize: "0.875rem"
    }
  }, "3 unread"), /*#__PURE__*/React.createElement("div", {
    className: "notif-page-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      minHeight: "36px",
      padding: "0 0.875rem",
      fontSize: "0.8125rem"
    }
  }, "Mark all read"))), /*#__PURE__*/React.createElement("div", {
    className: "notif-page-card"
  }, groups.map((g, gi) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: gi
  }, /*#__PURE__*/React.createElement("div", {
    className: "notif-group-title"
  }, g.title), g.items.map((n, i) => /*#__PURE__*/React.createElement("div", {
    className: "notif-page-item" + (n.unread ? " unread" : ""),
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "notif-cat-icon " + n.cat
  }, n.icon), /*#__PURE__*/React.createElement("div", {
    className: "notif-page-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "notif-cat-badge"
  }, n.cat), /*#__PURE__*/React.createElement("div", {
    className: "notif-page-title"
  }, n.title), /*#__PURE__*/React.createElement("div", {
    className: "notif-page-msg"
  }, n.msg), /*#__PURE__*/React.createElement("div", {
    className: "notif-page-time"
  }, n.time), n.cta && /*#__PURE__*/React.createElement("a", {
    className: "notif-page-cta",
    onClick: () => onNav(n.cat === "donation" ? "centers" : "wallet")
  }, n.cta, UI.arrowRightUp)), n.unread && /*#__PURE__*/React.createElement("span", {
    className: "notif-unread-dot",
    "aria-label": "Unread"
  })))))));
}

/* ─── Centers ───────────────────────────────────────────────────── */
function Centers({
  onNav
}) {
  const UI = window.UI;
  const centers = [{
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    cat: "Education · Nairobi",
    name: "Nairobi Hope Center",
    desc: "Schooling, meals and mentorship for 600 children across Kibera.",
    raised: 82,
    goal: "$120k"
  }, {
    img: "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=800&q=80",
    cat: "Education · Mumbai",
    name: "Mumbai Education Hub",
    desc: "Digital literacy and after-school tutoring for first-generation learners.",
    raised: 64,
    goal: "$90k"
  }, {
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    cat: "Health · São Paulo",
    name: "São Paulo Health Center",
    desc: "Primary care and maternal health for the Capão Redondo community.",
    raised: 47,
    goal: "$150k"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "app-main"
  }, /*#__PURE__*/React.createElement("header", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Humanity Centers"), /*#__PURE__*/React.createElement("p", {
    className: "page-subtitle"
  }, "Choose where your value lands. Every donation is tracked on-chain, end to end.")), /*#__PURE__*/React.createElement("div", {
    className: "centres-grid"
  }, centers.map((c, i) => /*#__PURE__*/React.createElement("div", {
    className: "centre-card",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "centre-image"
  }, /*#__PURE__*/React.createElement("img", {
    src: c.img,
    alt: c.name
  }), /*#__PURE__*/React.createElement("span", {
    className: "centre-badge"
  }, UI.verified, " Verified")), /*#__PURE__*/React.createElement("div", {
    className: "centre-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "centre-cat"
  }, c.cat), /*#__PURE__*/React.createElement("div", {
    className: "centre-name"
  }, c.name), /*#__PURE__*/React.createElement("p", {
    className: "centre-desc"
  }, c.desc), /*#__PURE__*/React.createElement("div", {
    className: "centre-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "centre-progress-fill",
    style: {
      width: c.raised + "%"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "centre-progress-meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, c.raised, "%"), " funded"), /*#__PURE__*/React.createElement("span", null, "Goal ", c.goal)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    onClick: () => onNav("send")
  }, UI.heart, " Donate"))))));
}

/* ─── Send flow (stepper) ───────────────────────────────────────── */
function SendFlow({
  onNav
}) {
  const UI = window.UI;
  const steps = ["Amount", "Recipient", "Review", "Done"];
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState("250.00");
  const [addr, setAddr] = useState("0x91a4f2c7b8e3d6a90f1c2b4e5d8a7c91b4c20000");
  const last = steps.length - 1;
  const pct = step / last * 100;
  return /*#__PURE__*/React.createElement("div", {
    className: "app-main"
  }, /*#__PURE__*/React.createElement("header", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Send Tokens")), /*#__PURE__*/React.createElement("div", {
    className: "stepper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stepper-progress",
    style: {
      width: "calc(" + pct + "% )"
    }
  }), steps.map((s, i) => {
    const state = i < step ? "done" : i === step ? "active" : "";
    return /*#__PURE__*/React.createElement("div", {
      className: "step " + state,
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "step-circle"
    }, i < step ? UI.check : i + 1), /*#__PURE__*/React.createElement("div", {
      className: "step-label"
    }, s));
  })), step === 0 && /*#__PURE__*/React.createElement("div", {
    className: "flow-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Amount to send"), /*#__PURE__*/React.createElement("div", {
    className: "amount-input-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ccy"
  }, "$"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    value: amount,
    onChange: e => setAmount(e.target.value),
    inputMode: "decimal"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Token"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    defaultValue: "hUSD \xB7 Balance 6,420.00",
    readOnly: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flow-nav"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => onNav("wallet")
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setStep(1)
  }, "Continue"))), step === 1 && /*#__PURE__*/React.createElement("div", {
    className: "flow-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Recipient address"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    value: addr,
    onChange: e => setAddr(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Note (optional)"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "What's this for?"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flow-nav"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setStep(0)
  }, "Back"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setStep(2)
  }, "Review"))), step === 2 && /*#__PURE__*/React.createElement("div", {
    className: "flow-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "You send"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "$", amount, " hUSD")), /*#__PURE__*/React.createElement("div", {
    className: "review-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "To"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "0x91a\u20260000")), /*#__PURE__*/React.createElement("div", {
    className: "review-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Network"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "Ethereum")), /*#__PURE__*/React.createElement("div", {
    className: "review-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Network fee"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "~$1.20")), /*#__PURE__*/React.createElement("div", {
    className: "review-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "They receive"), /*#__PURE__*/React.createElement("span", {
    className: "v",
    style: {
      color: "var(--fin-up)"
    }
  }, "$", amount, " hUSD")), /*#__PURE__*/React.createElement("div", {
    className: "warn-callout"
  }, UI.warn, /*#__PURE__*/React.createElement("span", null, "On-chain transfers are irreversible. Double-check the recipient address before sending.")), /*#__PURE__*/React.createElement("div", {
    className: "flow-nav"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setStep(1)
  }, "Back"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setStep(3)
  }, "Confirm & Send"))), step === 3 && /*#__PURE__*/React.createElement("div", {
    className: "flow-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "success-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "success-hero"
  }, UI.check, /*#__PURE__*/React.createElement("span", {
    className: "success-bolt"
  }, UI.bolt)), /*#__PURE__*/React.createElement("div", {
    className: "success-title"
  }, "Sent successfully"), /*#__PURE__*/React.createElement("div", {
    className: "success-sub"
  }, "$", amount, " hUSD is on its way."), /*#__PURE__*/React.createElement("div", {
    className: "success-details"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Tx ID"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "0x7f3\u2026a91")), /*#__PURE__*/React.createElement("div", {
    className: "review-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Amount"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "$", amount, " hUSD")), /*#__PURE__*/React.createElement("div", {
    className: "review-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Date"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "Jun 12, 2026 \xB7 14:08")), /*#__PURE__*/React.createElement("div", {
    className: "review-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Status"), /*#__PURE__*/React.createElement("span", {
    className: "v",
    style: {
      color: "var(--fin-up)"
    }
  }, "Completed"))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    onClick: () => onNav("wallet")
  }, "Back to wallet"))));
}
Object.assign(window, {
  Dashboard,
  Wallet,
  Centers,
  SendFlow,
  Notifications
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer-app/screens.jsx", error: String((e && e.message) || e) }); }

// unera-pages/auth-enhancements.js
try { (() => {
/* auth-enhancements.js - optional progressive-enhancement script. Stub to avoid 404 in standalone serve. */
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/auth-enhancements.js", error: String((e && e.message) || e) }); }

// unera-pages/consumer-app-nav.js
try { (() => {
/**
 * Huma V2 - Consumer app navigation system
 * Include before closing </body>: <script src="consumer-app-nav.js"></script>
 */
(function () {
  'use strict';

  function shortAddress(addr) {
    if (!addr || addr.length < 10) return addr || '';
    return addr.slice(0, 6) + '...' + addr.slice(-4);
  }
  function show(el, display) {
    if (!el) return;
    el.style.display = display || '';
  }
  function hide(el) {
    if (!el) return;
    el.style.display = 'none';
  }
  function hasDualSessionNav() {
    var display = document.getElementById('navWalletDisplay');
    return !!(display && display.querySelector('.nav-wallet-session-connected'));
  }
  function getWalletSessionConnected() {
    return localStorage.getItem('walletConnected') === 'true' || !!localStorage.getItem('walletAddress');
  }
  function getPrimaryBoundWalletShort() {
    try {
      var bound = JSON.parse(localStorage.getItem('boundWallets') || '[]');
      if (!bound.length) return '';
      var primary = bound.find(function (w) {
        return w.isPrimary;
      }) || bound[0];
      var a = primary.address || '';
      if (a.length < 10) return a;
      return a.slice(0, 6) + '...' + a.slice(-4);
    } catch (e) {
      return '';
    }
  }
  function getWalletStatusChipCopy(connected) {
    if (connected) {
      var live = localStorage.getItem('walletAddress') || '';
      return live.length > 10 ? live.slice(0, 6) + '...' + live.slice(-4) : live || 'Connected';
    }
    var saved = getPrimaryBoundWalletShort();
    return saved ? 'Saved · ' + saved + ' · Not connected' : 'No wallet connected';
  }
  function syncNavWalletFields(address, balance, network) {
    var short = shortAddress(address);
    var addrEl = document.getElementById('navWalletAddress');
    var balEl = document.getElementById('navWalletBalance');
    var netEl = document.getElementById('navNetworkLabel') || document.getElementById('navWalletNetwork');
    var dAddr = document.getElementById('drawerWalletAddress');
    var dBal = document.getElementById('drawerWalletBalance');
    var dNet = document.getElementById('drawerWalletNetwork');
    var dMeta = document.getElementById('drawerWalletMeta');
    if (addrEl) addrEl.textContent = short || '0x742d...3a8f';
    if (balEl) balEl.textContent = balance;
    if (netEl) netEl.textContent = network;
    if (dAddr) dAddr.textContent = short;
    if (dBal) dBal.textContent = balance;
    if (dNet) dNet.textContent = network;
    if (dMeta) dMeta.textContent = balance + ' · ' + network;
  }
  var NAV_CONNECT_MENU_SVG = '<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">' + '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>' + '</svg>';
  var SESSION_ONLY_MENU_IDS = ['switchWalletItem', 'disconnectWalletItem', 'switchWalletItemMobile', 'disconnectWalletItemMobile'];
  function isMyWalletMenuLink(el) {
    if (!el || el.tagName !== 'A') return false;
    var href = el.getAttribute('href') || '';
    if (href.indexOf('wallet-enhanced') !== -1) return true;
    return el.textContent.replace(/\s+/g, ' ').trim() === 'My Wallet';
  }
  function setMenuItemVisible(el, visible) {
    if (!el) return;
    el.style.display = visible ? '' : 'none';
    if (!visible) {
      el.setAttribute('aria-hidden', 'true');
      el.hidden = true;
    } else {
      el.removeAttribute('aria-hidden');
      el.hidden = false;
    }
  }
  function ensureNavConnectMenuItem(show) {
    var desktop = document.getElementById('desktopMenuContainer');
    var mobileContent = document.querySelector('#mobileUserDropdown .mobile-user-dropdown-content');
    [desktop, mobileContent].forEach(function (container) {
      if (!container) return;
      var legacyDivider = container.querySelector('[data-nav-connect-divider="true"]');
      if (legacyDivider) legacyDivider.remove();
      if (!show) {
        var stale = container.querySelector('[data-nav-connect-menu="true"]');
        if (stale) stale.remove();
        return;
      }
      var logoutLink = container.querySelector('a[onclick*="logout"]');
      if (!logoutLink) return;
      var existing = container.querySelector('[data-nav-connect-menu="true"]');
      if (existing && existing.nextElementSibling === logoutLink) return;
      if (existing) existing.remove();
      var itemClass = container.id === 'desktopMenuContainer' ? 'dropdown-item-nav' : 'mobile-dropdown-item';
      var link = document.createElement('a');
      link.href = '#';
      link.className = itemClass;
      link.setAttribute('data-nav-connect-menu', 'true');
      link.setAttribute('id', container.id === 'desktopMenuContainer' ? 'navConnectMenuItemDesktop' : 'navConnectMenuItemMobile');
      link.setAttribute('aria-label', 'Connect wallet');
      link.innerHTML = NAV_CONNECT_MENU_SVG + ' Connect wallet';
      link.addEventListener('click', function (e) {
        e.preventDefault();
        if (typeof openConnectModal === 'function') openConnectModal();
      });
      container.insertBefore(link, logoutLink);
    });
  }
  function patchUserMenuItemsForSession(connected) {
    SESSION_ONLY_MENU_IDS.forEach(function (id) {
      setMenuItemVisible(document.getElementById(id), connected);
    });
    document.querySelectorAll('#desktopMenuContainer a.dropdown-item-nav, ' + '#mobileUserDropdown a.mobile-dropdown-item').forEach(function (el) {
      if (isMyWalletMenuLink(el)) {
        setMenuItemVisible(el, connected);
      }
    });
    ensureNavConnectMenuItem(!connected);
  }
  function patchMobileDisconnectedChrome(connected) {
    var copy = getWalletStatusChipCopy(connected);

    // Top drawer wallet row is retired - the wallet now lives in the profile accordion. Keep hidden.
    var drawerWallet = document.getElementById('drawerWalletRow');
    if (drawerWallet) drawerWallet.style.display = 'none';

    // Wallet-status pill inside the mobile profile accordion (mirrors the desktop dropdown header).
    var chip = document.getElementById('mobileWalletStatusChip');
    var chipText = document.getElementById('mobileDropdownWalletAddress');
    if (chip) chip.dataset.state = connected ? 'connected' : 'disconnected';
    if (chipText) chipText.textContent = copy;
    var content = document.querySelector('#mobileUserDropdown .mobile-user-dropdown-content');
    if (!content) return;
    content.querySelectorAll('.mobile-dropdown-section').forEach(function (section) {
      var title = section.querySelector('.mobile-dropdown-section-title');
      if (title && title.textContent.trim().toUpperCase() === 'NETWORK') {
        section.setAttribute('data-session-section', 'network');
        if (connected) {
          section.removeAttribute('hidden');
          section.style.display = '';
        } else {
          section.hidden = true;
          section.style.display = 'none';
        }
      }
    });
  }

  // Copy the connected wallet address from the mobile profile wallet pill
  window.copyMobileWalletAddress = function copyMobileWalletAddress(btn) {
    if (!btn || btn.dataset.state !== 'connected') return;
    var txt = (document.getElementById('mobileDropdownWalletAddress') || {}).textContent || '';
    var addr = (txt.split('·')[0] || txt).trim();
    if (!addr) return;
    if (typeof window.copyToClipboard === 'function') {
      window.copyToClipboard(addr, 'Wallet address');
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(addr);
  };
  function patchDropdownHeaderStatusChip(connected) {
    var chip = document.getElementById('dropdownWalletStatusChip');
    var chipText = document.getElementById('dropdownWalletStatusText');
    var legacyAddr = document.getElementById('dropdownWalletAddress');
    var copy = getWalletStatusChipCopy(connected);
    if (chip) chip.dataset.state = connected ? 'connected' : 'disconnected';
    if (chipText) chipText.textContent = copy;
    if (legacyAddr) legacyAddr.textContent = connected ? copy : '';
  }
  window.applyNavWalletSession = function applyNavWalletSession() {
    if (!hasDualSessionNav()) return;
    var connected = getWalletSessionConnected();
    var display = document.getElementById('navWalletDisplay');
    if (!display) return;
    document.body.dataset.walletSession = connected ? 'connected' : 'disconnected';
    var connectedBlock = display.querySelector('.nav-wallet-session-connected');
    var disconnectedBlock = display.querySelector('.nav-wallet-session-disconnected');
    var connectBtn = document.getElementById('navConnectBtn');
    var walletLink = document.getElementById('walletNavLink');
    display.dataset.walletSession = connected ? 'connected' : 'disconnected';
    display.style.display = 'flex';
    display.setAttribute('aria-label', connected ? 'Wallet: ' + (document.getElementById('navWalletAddress')?.textContent || '') + ' on ' + (document.getElementById('navNetworkLabel')?.textContent || '') : 'Account menu, wallet not connected');
    if (connectedBlock) connectedBlock.hidden = !connected;
    if (disconnectedBlock) disconnectedBlock.hidden = connected;
    if (connectBtn) connectBtn.style.display = connected ? 'none' : 'inline-flex';
    if (walletLink) walletLink.style.display = connected ? 'inline-flex' : 'none';
    if (connected) {
      var live = localStorage.getItem('walletAddress') || '';
      var balance = localStorage.getItem('walletBalance') || '2,500.00 hUSD';
      var _rawNetwork = localStorage.getItem('walletNetwork') || localStorage.getItem('selectedNetwork') || JSON.stringify({
        id: 'base',
        label: 'Base',
        color: '#0052FF'
      });
      var network;
      try {
        var _parsedNet = JSON.parse(_rawNetwork);
        network = _parsedNet && _parsedNet.label ? _parsedNet.label : _rawNetwork;
      } catch (e) {
        network = _rawNetwork;
      }
      syncNavWalletFields(live, balance, network);
    }
    patchDropdownHeaderStatusChip(connected);
    patchMobileDisconnectedChrome(connected);
    patchUserMenuItemsForSession(connected);
    var drawerConnect = document.getElementById('drawerConnectRow');
    if (drawerConnect) {
      drawerConnect.style.display = 'none';
      drawerConnect.hidden = true;
      drawerConnect.setAttribute('aria-hidden', 'true');
    }
    if (connected && typeof applyUnsupportedNetworkState === 'function') {
      applyUnsupportedNetworkState();
    }
  };
  function initNavWalletSessionMenuHooks() {
    if (!hasDualSessionNav()) return;
    var mobileMenu = document.getElementById('mobileUserMenu');
    var desktopMenu = document.getElementById('desktopMenuContainer');
    if (typeof MutationObserver !== 'undefined') {
      var patchQueued = false;
      var observer = new MutationObserver(function () {
        if (patchQueued) return;
        patchQueued = true;
        requestAnimationFrame(function () {
          patchQueued = false;
          patchUserMenuItemsForSession(getWalletSessionConnected());
        });
      });
      if (mobileMenu) observer.observe(mobileMenu, {
        childList: true,
        subtree: true
      });
      if (desktopMenu) observer.observe(desktopMenu, {
        childList: true,
        subtree: true
      });
    }
    var origToggleMobileUser = window.toggleMobileUserDropdown;
    if (typeof origToggleMobileUser === 'function') {
      window.toggleMobileUserDropdown = function () {
        origToggleMobileUser.apply(this, arguments);
        applyNavWalletSession();
      };
    }
  }

  /* ─── Auth + wallet nav state ─────────────────────────── */
  window.syncNavAuthState = function syncNavAuthState() {
    var isLoggedIn = localStorage.getItem('unera_user') !== null || localStorage.getItem('isLoggedIn') === 'true' || localStorage.getItem('loggedIn') === 'true' || !document.body.dataset.requireLogin;
    var isConnected = localStorage.getItem('walletConnected') === 'true' || !!localStorage.getItem('walletAddress');
    var address = localStorage.getItem('walletAddress') || '';
    var balance = localStorage.getItem('walletBalance') || '292.22559 CTC';
    var _rawNetwork = localStorage.getItem('walletNetwork') || localStorage.getItem('selectedNetwork') || JSON.stringify({
      id: 'base',
      label: 'Base',
      color: '#0052FF'
    });
    var network;
    try {
      var _parsedNet = JSON.parse(_rawNetwork);
      network = _parsedNet && _parsedNet.label ? _parsedNet.label : _rawNetwork;
    } catch (e) {
      network = _rawNetwork;
    }
    var userName = localStorage.getItem('unera_user_name') || localStorage.getItem('userName') || 'Jane Smith';
    var initials = userName.split(' ').map(function (n) {
      return n[0];
    }).join('').slice(0, 2).toUpperCase();
    var walletNavItem = document.getElementById('walletNavItem');
    var connectBtn = document.getElementById('navConnectBtn');
    var walletLink = document.getElementById('walletNavLink');
    var walletDisplay = document.getElementById('navWalletDisplay');
    var bellWrapper = document.getElementById('notificationBellWrapper');
    var userProfile = document.getElementById('userProfile');
    var navAuthLinks = document.getElementById('navAuthLinks');
    var ddDisconnect = document.getElementById('disconnectWalletItem') || document.getElementById('ddDisconnectWallet');
    var ddSwitch = document.getElementById('switchWalletItem');
    var ddSwitchMobile = document.getElementById('switchWalletItemMobile');
    var drawerWallet = document.getElementById('drawerWalletRow');
    var drawerConnect = document.getElementById('drawerConnectRow');
    var drawerAuth = document.getElementById('drawerAuthRow');
    var drawerWalletLnk = document.getElementById('drawerLinkWallet') || document.getElementById('mobileWalletLink');
    var mobileConnect = document.getElementById('mobileConnectNavItem');
    if (!isLoggedIn) {
      if (walletNavItem) walletNavItem.style.display = 'none';
      if (walletDisplay) walletDisplay.style.display = 'none';
      if (bellWrapper) bellWrapper.style.display = 'none';
      if (userProfile) userProfile.style.display = 'none';
      if (navAuthLinks) navAuthLinks.style.display = 'flex';
      if (drawerAuth) drawerAuth.style.display = 'flex';
      if (drawerWallet) drawerWallet.style.display = 'none';
      if (drawerConnect) drawerConnect.style.display = 'none';
      if (drawerWalletLnk) drawerWalletLnk.style.display = 'none';
      if (mobileConnect) mobileConnect.style.display = 'none';
      return;
    }
    if (navAuthLinks) navAuthLinks.style.display = 'none';
    if (bellWrapper) bellWrapper.style.display = '';
    if (userProfile) userProfile.style.display = '';
    if (drawerAuth) drawerAuth.style.display = 'none';
    if (walletNavItem) walletNavItem.style.display = '';
    var initEl = document.getElementById('navUserInitials') || document.querySelector('.user-avatar-nav');
    var nameEl = document.getElementById('navUserName') || document.querySelector('.user-name-nav');
    if (initEl) initEl.textContent = initials || 'U';
    if (nameEl) nameEl.textContent = userName;
    if (hasDualSessionNav()) {
      if (isConnected) {
        syncNavWalletFields(address, balance, network);
        if (ddDisconnect) ddDisconnect.style.display = '';
        if (ddSwitch) ddSwitch.style.display = '';
        if (ddSwitchMobile) ddSwitchMobile.style.display = '';
      } else {
        if (ddDisconnect) ddDisconnect.style.display = 'none';
        if (ddSwitch) ddSwitch.style.display = 'none';
        if (ddSwitchMobile) ddSwitchMobile.style.display = 'none';
      }
      applyNavWalletSession();
      return;
    }
    if (isConnected) {
      if (connectBtn) {
        connectBtn.style.display = 'none';
        connectBtn.classList.add('hidden');
      }
      if (walletLink) walletLink.style.display = 'inline-flex';
      if (walletDisplay) walletDisplay.style.display = 'flex';
      if (ddDisconnect) ddDisconnect.style.display = '';
      if (ddSwitch) ddSwitch.style.display = '';
      if (ddSwitchMobile) ddSwitchMobile.style.display = '';
      if (drawerConnect) drawerConnect.style.display = 'none';
      if (drawerWallet) drawerWallet.style.display = 'flex';
      if (drawerWalletLnk) drawerWalletLnk.style.display = '';
      if (mobileConnect) mobileConnect.style.display = 'none';
      var short = shortAddress(address);
      var addrEl = document.getElementById('navWalletAddress');
      var balEl = document.getElementById('navWalletBalance');
      var netEl = document.getElementById('navNetworkLabel') || document.getElementById('navWalletNetwork');
      var dAddr = document.getElementById('drawerWalletAddress');
      var dBal = document.getElementById('drawerWalletBalance');
      var dNet = document.getElementById('drawerWalletNetwork');
      var dMeta = document.getElementById('drawerWalletMeta');
      if (addrEl) addrEl.textContent = short || '0x742d...3a8f';
      if (balEl) balEl.textContent = balance;
      if (netEl) netEl.textContent = network;
      if (dAddr) dAddr.textContent = short;
      if (dBal) dBal.textContent = balance;
      if (dNet) dNet.textContent = network;
      if (dMeta) dMeta.textContent = balance + ' · ' + network;
      if (walletDisplay) {
        walletDisplay.setAttribute('aria-label', 'Wallet: ' + short + ' on ' + network);
      }
      if (typeof applyUnsupportedNetworkState === 'function') applyUnsupportedNetworkState();
    } else {
      if (connectBtn) {
        connectBtn.style.display = 'inline-flex';
        connectBtn.classList.remove('hidden');
      }
      if (walletLink) walletLink.style.display = 'none';
      if (walletDisplay) walletDisplay.style.display = 'none';
      if (ddDisconnect) ddDisconnect.style.display = 'none';
      if (ddSwitch) ddSwitch.style.display = 'none';
      if (ddSwitchMobile) ddSwitchMobile.style.display = 'none';
      if (drawerConnect) drawerConnect.style.display = 'block';
      if (drawerWallet) drawerWallet.style.display = 'none';
      if (drawerWalletLnk) drawerWalletLnk.style.display = 'none';
      if (mobileConnect) mobileConnect.style.display = 'none';
    }
  };

  /* ─── Active state from body[data-nav-active] ─────────── */
  window.setNavActive = function setNavActive() {
    var active = document.body.dataset.navActive;
    document.querySelectorAll('.nav-link.active, .nav-dropdown-trigger.is-active-route').forEach(function (el) {
      el.classList.remove('active', 'is-active-route');
      el.removeAttribute('aria-current');
    });
    if (active) {
      var page = location.pathname.split('/').pop();
      if (active === 'dashboard') {
        var dash = document.getElementById('navLinkDashboard') || document.querySelector('.nav-links a[href*="dashboard-enhanced"]');
        if (dash) {
          dash.classList.add('active');
          dash.setAttribute('aria-current', 'page');
        }
      } else if (active === 'wallet') {
        var wl = document.getElementById('walletNavLink');
        if (wl) {
          wl.classList.add('active');
          wl.setAttribute('aria-current', 'page');
        }
      } else if (active === 'portfolio') {
        var pf = document.getElementById('portfolioNavLink');
        if (pf) {
          pf.classList.add('active');
          pf.setAttribute('aria-current', 'page');
        }
      } else if (active === 'transact') {
        var tb = document.getElementById('navDdTransactBtn');
        if (tb) tb.classList.add('is-active-route');
        var menu = document.getElementById('navDdTransactMenu');
        if (menu) {
          var match = menu.querySelector('a[href="' + page + '"]') || menu.querySelector('a[href*="' + page + '"]');
          if (match) match.setAttribute('aria-current', 'page');
        }
      } else if (active === 'centers') {
        var ct = document.getElementById('navLinkDashboard') || document.querySelector('.nav-links a[href*="dashboard-enhanced"]');
        if (ct) {
          ct.classList.add('active');
          ct.setAttribute('aria-current', 'page');
        }
      }
    }
    setUserMenuActive(document.body.dataset.userMenuActive || active || '');
  };
  function setUserMenuActive(activePage) {
    document.querySelectorAll('#desktopMenuContainer .dropdown-item-nav, #mobileUserDropdown .mobile-dropdown-item').forEach(function (el) {
      el.classList.remove('active');
      el.removeAttribute('aria-current');
    });
    if (!activePage) return;
    function markActive(selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.classList.add('active');
        el.setAttribute('aria-current', 'page');
      });
    }
    if (activePage === 'centers' || activePage === 'dashboard') {
      markActive('#desktopMenuContainer a[href*="dashboard-enhanced"], #mobileUserDropdown a[href*="dashboard-enhanced"]');
    } else if (activePage === 'wallet') {
      markActive('#desktopMenuContainer a[href*="wallet-enhanced"], #mobileUserDropdown a[href*="wallet-enhanced"]');
    } else if (activePage === 'account-settings') {
      var settings = document.getElementById('menuLinkAccountSettings');
      if (settings) {
        settings.classList.add('active');
        settings.setAttribute('aria-current', 'page');
      }
    } else if (activePage === 'address-book') {
      var ab = document.getElementById('menuLinkAddressBook');
      if (ab) {
        ab.classList.add('active');
        ab.setAttribute('aria-current', 'page');
      }
    }
  }

  /* ─── User menu (desktop dropdown + mobile accordion) ─── */
  var USER_MENU_ITEMS = [{
    section: 'ACCOUNT',
    items: [{
      label: 'My Profile',
      href: 'account-settings.html',
      icon: 'profile'
    }, {
      label: 'Account Settings',
      href: 'account-settings.html',
      icon: 'settings',
      id: 'menuLinkAccountSettings'
    }]
  }, {
    divider: true
  }, {
    label: 'My Wallet',
    href: 'wallet-enhanced.html',
    icon: 'wallet'
  }, {
    label: 'Address Book',
    href: 'payee-management.html',
    icon: 'addressbook',
    id: 'menuLinkAddressBook'
  }, {
    label: 'Donation',
    href: 'dashboard-enhanced.html',
    icon: 'dashboard'
  }, {
    divider: true
  }, {
    label: 'Switch wallet',
    action: 'switchWalletFromNav',
    id: 'switchWalletItem',
    icon: 'switch',
    hideByDefault: true
  }, {
    label: 'Disconnect Wallet',
    action: 'disconnectWallet',
    id: 'disconnectWalletItem',
    icon: 'disconnect',
    hideByDefault: true
  }, {
    label: 'Log Out',
    action: 'logout',
    icon: 'logout'
  }];
  var MENU_ICONS = {
    profile: '<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>',
    settings: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
    wallet: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    addressbook: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 19.5V5a2 2 0 012-2h13v18H6a2 2 0 01-2-2zM4 19.5A2.5 2.5 0 016.5 17H19"/><circle cx="11" cy="9.5" r="1.8"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 14c0-1.7 1.3-3 3-3s3 1.3 3 3"/>',
    dashboard: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    centers: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>',
    switch: '<path stroke-linecap="round" stroke-linejoin="round" d="M17 1l4 4-4 4"/><path stroke-linecap="round" stroke-linejoin="round" d="M3 11V9a4 4 0 014-4h14"/><path stroke-linecap="round" stroke-linejoin="round" d="M7 23l-4-4 4-4"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 13v2a4 4 0 01-4 4H3"/>',
    disconnect: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"/>',
    logout: '<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>'
  };
  function getNavBase() {
    return document.body.dataset.navBase || '';
  }
  function resolveMenuHref(href) {
    return getNavBase() + href;
  }
  function isUserMenuItemActive(item, activePage) {
    if (activePage === 'centers' && item.label === 'Donation') return true;
    if (activePage === 'dashboard' && item.label === 'Donation') return true;
    if (activePage === 'wallet' && item.label === 'My Wallet') return true;
    if (activePage === 'account-settings' && item.label === 'Account Settings') return true;
    return false;
  }

  /* Product network allowlist: mainnet + testnet demo chains.
   * Removed from product demo: polygon, arbitrum, optimism, bnb - restore when multi-chain ships. */
  var PRODUCT_NETWORKS = [{
    id: 'ethereum',
    label: 'Ethereum',
    color: '#627EEA',
    chainId: '1'
  }, {
    id: 'base',
    label: 'Base',
    color: '#0052FF',
    chainId: '8453'
  }, {
    id: 'sepolia',
    label: 'Sepolia',
    color: '#627EEA',
    chainId: '11155111',
    testnet: true
  }, {
    id: 'base-sepolia',
    label: 'Base Sepolia',
    color: '#0052FF',
    chainId: '84532',
    testnet: true
  }];
  var PRODUCT_NETWORK_IDS = PRODUCT_NETWORKS.map(function (n) {
    return n.id;
  });
  var SUPPORTED_CHAIN_IDS = PRODUCT_NETWORKS.map(function (n) {
    return n.chainId;
  });
  var REMOVED_PRODUCT_CHAIN_IDS = ['polygon', 'arbitrum', 'optimism', 'bnb'];
  var MOBILE_NETWORK_ICONS = {
    ethereum: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#627EEA"/><path d="M10 3.5L6 10.2l4 2.3 4-2.3L10 3.5z" fill="white" opacity="0.8"/><path d="M6 10.2l4 5.8 4-5.8-4 2.3-4-2.3z" fill="white"/></svg>',
    base: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#0052FF"/><path d="M10 3C6.13 3 3 6.13 3 10s3.13 7 7 7c3.63 0 6.64-2.76 6.97-6.3H10V9h7.97c-.36-3.88-3.61-7-7.97-7V3z" fill="white"/></svg>',
    sepolia: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#627EEA" opacity="0.5"/><path d="M10 3.5L6 10.2l4 2.3 4-2.3L10 3.5z" fill="white" opacity="0.8"/><path d="M6 10.2l4 5.8 4-5.8-4 2.3-4-2.3z" fill="white"/></svg>',
    'base-sepolia': '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#0052FF" opacity="0.5"/><path d="M10 4.5C7 4.5 4.5 7 4.5 10S7 15.5 10 15.5c2.6 0 4.8-1.7 5.4-4H10V10h7c0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7c1.8 0 3.4.7 4.6 1.8l-1.4 1.4C12.3 5.4 11.2 4.5 10 4.5z" fill="white"/></svg>'
  };
  function getSelectedNetworkFromStorage() {
    var raw = localStorage.getItem('selectedNetwork') || localStorage.getItem('walletNetwork') || '';
    if (!raw) return {
      id: 'base',
      label: 'Base',
      color: '#0052FF'
    };
    try {
      var parsed = JSON.parse(raw);
      if (parsed && parsed.id) return parsed;
      if (parsed && parsed.label) return {
        id: '',
        label: parsed.label,
        color: parsed.color || ''
      };
    } catch (e) {
      return {
        id: '',
        label: raw,
        color: ''
      };
    }
    return {
      id: 'base',
      label: 'Base',
      color: '#0052FF'
    };
  }
  function isProductNetwork(chainId) {
    return PRODUCT_NETWORK_IDS.indexOf(chainId) !== -1;
  }
  function getWalletNetworkDropdown() {
    return document.getElementById('walletNetworkDropdown') || document.getElementById('networkDropdown');
  }
  function getNetworkDropdownTrigger() {
    return document.querySelector('.nav-network-badge');
  }
  function renderMobileNetworkOptionsHtml() {
    var stored = getSelectedNetworkFromStorage();
    return PRODUCT_NETWORKS.map(function (net) {
      var activeClass = stored.id === net.id ? ' active' : '';
      return '<div class="mobile-network-option mobile-dropdown-item' + activeClass + '" data-chain-id="' + net.id + '" data-chain-label="' + net.label + '" data-chain-color="' + net.color + '" onclick="switchNetwork(\'' + net.id + '\',\'' + net.label + '\',\'' + net.color + '\',this)">' + (MOBILE_NETWORK_ICONS[net.id] || '') + net.label + '</div>';
    }).join('');
  }
  window.renderUserMenu = function renderUserMenu(variant, options) {
    var opts = options || {};
    var activePage = opts.activePage || '';
    var walletConnected = localStorage.getItem('walletConnected') === 'true';
    function renderItem(item, itemClass) {
      var iconSvg = item.icon ? '<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">' + (MENU_ICONS[item.icon] || '') + '</svg>' : '';
      var hideStyle = item.hideByDefault && !walletConnected ? ' style="display: none;"' : '';
      var activeClass = isUserMenuItemActive(item, activePage) ? ' active' : '';
      if (item.action) {
        var actionId = '';
        if (item.label === 'Disconnect Wallet') {
          actionId = itemClass === 'mobile-dropdown-item' ? 'disconnectWalletItemMobile' : 'disconnectWalletItem';
        } else if (item.label === 'Switch wallet') {
          actionId = itemClass === 'mobile-dropdown-item' ? 'switchWalletItemMobile' : 'switchWalletItem';
        } else if (item.id) {
          actionId = item.id;
        }
        var idStr = actionId ? ' id="' + actionId + '"' : '';
        return '<a href="#" class="' + itemClass + activeClass + '"' + idStr + hideStyle + ' onclick="' + item.action + '(); return false;">' + iconSvg + ' ' + item.label + '</a>';
      }
      var idAttr = item.id ? ' id="' + item.id + '"' : '';
      return '<a href="' + resolveMenuHref(item.href) + '" class="' + itemClass + activeClass + '"' + idAttr + hideStyle + '>' + iconSvg + ' ' + item.label + '</a>';
    }
    if (variant === 'desktop') {
      var html = '';
      USER_MENU_ITEMS.forEach(function (entry) {
        if (entry.divider) {
          html += '<div class="dropdown-divider-nav"></div>';
        } else if (entry.section) {
          html += '<div class="dropdown-section-nav"><div class="dropdown-section-title-nav">' + entry.section + '</div>';
          entry.items.forEach(function (item) {
            html += renderItem(item, 'dropdown-item-nav');
          });
          html += '</div>';
        } else {
          html += renderItem(entry, 'dropdown-item-nav');
        }
      });
      return html;
    }
    if (variant === 'mobile') {
      var menuHtml = '';
      USER_MENU_ITEMS.forEach(function (entry) {
        if (entry.divider) {
          menuHtml += '<div class="mobile-dropdown-divider"></div>';
        } else if (entry.section) {
          menuHtml += '<div class="mobile-dropdown-section"><div class="mobile-dropdown-section-title">' + entry.section + '</div>';
          entry.items.forEach(function (item) {
            menuHtml += renderItem(item, 'mobile-dropdown-item');
          });
          menuHtml += '</div>';
        } else {
          menuHtml += renderItem(entry, 'mobile-dropdown-item');
        }
      });
      return '<div class="mobile-user-profile">' + '<div class="mobile-user-profile-header" onclick="toggleMobileUserDropdown()">' + '<div class="mobile-user-info">' + '<div class="mobile-user-avatar">JS</div>' + '<div class="mobile-user-details">' + '<div class="mobile-user-name">Jane Smith</div>' + '<div class="mobile-user-email">jane@example.com</div>' + '</div>' + '</div>' + '<svg class="mobile-user-chevron" id="mobileUserChevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + '<path d="M6 9l6 6 6-6"/>' + '</svg>' + '</div>' + '<div class="mobile-user-dropdown" id="mobileUserDropdown">' + '<div class="mobile-user-dropdown-content">' + '<div class="mobile-wallet-profile">' + '<div class="mobile-wallet-chips">' + '<span class="dropdown-chip dropdown-chip--level">Regular User</span>' + '<span class="dropdown-chip dropdown-chip--verified" data-verified="true">' + '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z"/></svg>' + '<span class="dropdown-chip-verified-text">Verified</span>' + '</span>' + '</div>' + '<button type="button" class="dropdown-wallet-addr-nav mobile-wallet-status-pill" id="mobileWalletStatusChip" data-state="disconnected" aria-live="polite" onclick="if(window.copyMobileWalletAddress)window.copyMobileWalletAddress(this)">' + '<span class="dropdown-wallet-addr-icon" aria-hidden="true">🦊</span>' + '<span class="dropdown-wallet-addr-text" id="mobileDropdownWalletAddress">No wallet connected</span>' + '<svg class="dropdown-wallet-copy" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520h80v520h440v80H200Zm160-240v-480 480Z"/></svg>' + '</button>' + '</div>' + '<div class="mobile-dropdown-section">' + '<div class="mobile-dropdown-section-title">Network</div>' + renderMobileNetworkOptionsHtml() + '<div class="mobile-dropdown-divider"></div>' + '</div>' + menuHtml + '</div>' + '</div>' + '</div>';
    }
    return '';
  };
  function hydrateUserMenus() {
    var menuOpts = {
      activePage: document.body.dataset.userMenuActive || document.body.dataset.navActive || ''
    };
    var desktop = document.getElementById('desktopMenuContainer');
    if (desktop) desktop.innerHTML = renderUserMenu('desktop', menuOpts);
    var mobile = document.getElementById('mobileUserMenu');
    if (mobile) mobile.innerHTML = renderUserMenu('mobile', menuOpts);
  }

  /* ─── User dropdown (avatar + wallet address triggers) ─ */
  function setUserDropdownOpen(open) {
    var dropdown = document.getElementById('userDropdown');
    var walletTrigger = document.querySelector('.nav-wallet-trigger');
    if (dropdown) dropdown.classList.toggle('show', open);
    if (walletTrigger) walletTrigger.setAttribute('aria-expanded', String(open));
  }
  window.toggleUserDropdown = function toggleUserDropdown(event) {
    if (event) event.stopPropagation();
    if (typeof closeNotificationPanel === 'function') closeNotificationPanel();
    if (typeof closeNetworkDropdown === 'function') closeNetworkDropdown();
    var dropdown = document.getElementById('userDropdown');
    if (!dropdown) return;
    setUserDropdownOpen(!dropdown.classList.contains('show'));
  };
  window.switchWalletFromNav = function switchWalletFromNav() {
    setUserDropdownOpen(false);
    var mobile = document.getElementById('mobileUserDropdown');
    var chevron = document.getElementById('mobileUserChevron');
    if (mobile) {
      mobile.classList.remove('open');
      mobile.style.maxHeight = '';
    }
    if (chevron) chevron.classList.remove('open');
    window.openConnectModal();
  };
  window.handleUserMenuTriggerKey = function handleUserMenuTriggerKey(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleUserDropdown(event);
    } else if (event.key === 'Escape') {
      setUserDropdownOpen(false);
      event.currentTarget.focus();
    }
  };
  function initUserDropdownOutsideClick() {
    document.addEventListener('click', function (event) {
      var navWalletDisplay = document.getElementById('navWalletDisplay');
      var userDropdown = document.getElementById('userDropdown');
      if (userDropdown && userDropdown.classList.contains('show') && navWalletDisplay && !navWalletDisplay.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    });
  }
  function initUserDropdownAriaSync() {
    var userDropdown = document.getElementById('userDropdown');
    if (!userDropdown || typeof MutationObserver === 'undefined') return;
    var observer = new MutationObserver(function () {
      var walletTrigger = document.querySelector('.nav-wallet-trigger');
      if (walletTrigger) {
        walletTrigger.setAttribute('aria-expanded', String(userDropdown.classList.contains('show')));
      }
    });
    observer.observe(userDropdown, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  /* ─── Dropdown toggles ────────────────────────────────── */
  function closeNavDropdowns() {
    document.querySelectorAll('.nav-dropdown-item').forEach(function (item) {
      item.classList.remove('open');
      var btn = item.querySelector('.nav-dropdown-trigger');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }
  function initNavDropdowns() {
    document.querySelectorAll('.nav-dropdown-item').forEach(function (item) {
      var btn = item.querySelector('.nav-dropdown-trigger');
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !item.classList.contains('open');
        closeNavDropdowns();
        if (open) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
        if (e.key === 'ArrowDown' && item.classList.contains('open')) {
          e.preventDefault();
          var first = item.querySelector('.nav-dropdown-menu a');
          if (first) first.focus();
        }
      });
      var menu = item.querySelector('.nav-dropdown-menu');
      if (menu) {
        menu.addEventListener('keydown', function (e) {
          var items = Array.from(menu.querySelectorAll('a'));
          var idx = items.indexOf(document.activeElement);
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            items[(idx + 1) % items.length].focus();
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            items[(idx - 1 + items.length) % items.length].focus();
          }
          if (e.key === 'Escape') {
            closeNavDropdowns();
            btn.focus();
          }
        });
      }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-dropdown-item')) closeNavDropdowns();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNavDropdowns();
  });

  /* ─── Mobile drawer accordions (user profile + notifications) ─ */
  function measureMobileAccordionHeight(dropdown) {
    var prevMax = dropdown.style.maxHeight;
    dropdown.style.maxHeight = 'none';
    var height = dropdown.scrollHeight;
    dropdown.style.maxHeight = prevMax;
    return height;
  }
  function setMobileAccordionOpen(dropdown, chevron, open, immediate) {
    if (!dropdown) return;
    if (open) {
      dropdown.classList.add('open');
      dropdown.style.maxHeight = measureMobileAccordionHeight(dropdown) + 'px';
      if (chevron) chevron.classList.add('open');
    } else if (immediate) {
      dropdown.classList.remove('open');
      dropdown.style.maxHeight = '';
      if (chevron) chevron.classList.remove('open');
    } else {
      if (!dropdown.classList.contains('open')) {
        dropdown.style.maxHeight = '';
        if (chevron) chevron.classList.remove('open');
        return;
      }
      dropdown.style.maxHeight = measureMobileAccordionHeight(dropdown) + 'px';
      requestAnimationFrame(function () {
        dropdown.style.maxHeight = '0';
        dropdown.classList.remove('open');
        if (chevron) chevron.classList.remove('open');
      });
    }
  }
  function closeMobileUserDropdown(immediate) {
    setMobileAccordionOpen(document.getElementById('mobileUserDropdown'), document.getElementById('mobileUserChevron'), false, immediate);
  }
  function closeMobileNotificationDropdown(immediate) {
    setMobileAccordionOpen(document.getElementById('mobileNotificationDropdown'), document.getElementById('mobileNotifChevron'), false, immediate);
  }
  function closeMobileTransactAccordion(immediate) {
    setMobileAccordionOpen(document.getElementById('mobileTransactSubmenu'), document.getElementById('mobileTransactChevron'), false, immediate);
    var btn = document.getElementById('mobileTransactAccordionBtn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
  window.toggleMobileTransactAccordion = function toggleMobileTransactAccordion() {
    var panel = document.getElementById('mobileTransactSubmenu');
    var chevron = document.getElementById('mobileTransactChevron');
    var btn = document.getElementById('mobileTransactAccordionBtn');
    if (!panel) return;
    var opening = !panel.classList.contains('open');
    setMobileAccordionOpen(panel, chevron, opening);
    if (btn) btn.setAttribute('aria-expanded', String(opening));
  };
  window.closeMobileDrawerAccordions = function closeMobileDrawerAccordions() {
    closeMobileUserDropdown(true);
    closeMobileNotificationDropdown(true);
    closeMobileTransactAccordion(true);
  };
  window.toggleMobileUserDropdown = function toggleMobileUserDropdown() {
    var dropdown = document.getElementById('mobileUserDropdown');
    var chevron = document.getElementById('mobileUserChevron');
    if (!dropdown) return;
    var opening = !dropdown.classList.contains('open');
    if (opening) closeMobileNotificationDropdown(true);
    setMobileAccordionOpen(dropdown, chevron, opening);
  };
  window.toggleMobileNotificationPanel = function toggleMobileNotificationPanel() {
    var dropdown = document.getElementById('mobileNotificationDropdown');
    var chevron = document.getElementById('mobileNotifChevron');
    if (!dropdown) return;
    var opening = !dropdown.classList.contains('open');
    if (opening) closeMobileUserDropdown(true);
    setMobileAccordionOpen(dropdown, chevron, opening);
  };
  function initMobileDrawerAccordionReset() {
    var menu = document.querySelector('.mobile-menu');
    if (!menu) return;
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName !== 'class') return;
        if (!menu.classList.contains('active')) {
          closeMobileDrawerAccordions();
        } else {
          openMobileTransactAccordionDefault();
        }
      });
    });
    observer.observe(menu, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  function createMobileTransactChevron() {
    var chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevron.setAttribute('class', 'mobile-nav-accordion-chevron');
    chevron.setAttribute('id', 'mobileTransactChevron');
    chevron.setAttribute('width', '20');
    chevron.setAttribute('height', '20');
    chevron.setAttribute('viewBox', '0 0 24 24');
    chevron.setAttribute('fill', 'none');
    chevron.setAttribute('stroke', 'currentColor');
    chevron.setAttribute('stroke-width', '2');
    chevron.setAttribute('aria-hidden', 'true');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M6 9l6 6 6-6');
    chevron.appendChild(path);
    return chevron;
  }
  function openMobileTransactAccordionDefault() {
    var panel = document.getElementById('mobileTransactSubmenu');
    var chevron = document.getElementById('mobileTransactChevron');
    var trigger = document.getElementById('mobileTransactAccordionBtn');
    if (!panel || !trigger) return;
    setMobileAccordionOpen(panel, chevron, true);
    trigger.setAttribute('aria-expanded', 'true');
  }
  function initMobileTransactAccordion() {
    if (document.getElementById('mobileTransactAccordion')) {
      openMobileTransactAccordionDefault();
      return;
    }
    var navLinks = document.querySelector('.mobile-nav-links');
    if (!navLinks) return;
    var labels = navLinks.querySelectorAll('li.mobile-nav-section-label');
    var label = null;
    labels.forEach(function (el) {
      if (el.textContent.trim() === 'TRANSACT') label = el;
    });
    if (!label) return;
    var subItems = [];
    var next = label.nextElementSibling;
    while (next && next.querySelector('a.mobile-nav-sub')) {
      subItems.push(next);
      next = next.nextElementSibling;
    }
    if (subItems.length === 0) return;
    var accordionItem = document.createElement('li');
    accordionItem.className = 'mobile-nav-accordion-item';
    accordionItem.id = 'mobileTransactAccordion';
    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'mobile-nav-section-label mobile-nav-accordion-trigger';
    trigger.id = 'mobileTransactAccordionBtn';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'mobileTransactSubmenu');
    var labelText = document.createElement('span');
    labelText.textContent = 'TRANSACT';
    trigger.appendChild(labelText);
    trigger.appendChild(createMobileTransactChevron());
    var panel = document.createElement('ul');
    panel.className = 'mobile-nav-accordion-panel';
    panel.id = 'mobileTransactSubmenu';
    panel.setAttribute('role', 'list');
    subItems.forEach(function (item) {
      panel.appendChild(item);
    });
    accordionItem.appendChild(trigger);
    accordionItem.appendChild(panel);
    label.replaceWith(accordionItem);
    trigger.addEventListener('click', function () {
      toggleMobileTransactAccordion();
    });
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileTransactAccordion();
      }
    });
    openMobileTransactAccordionDefault();
  }

  /* ─── Network switcher (3-part pill - separate network badge) ─── */
  function isSelectedNetworkSupported(selected) {
    if (selected.id && isProductNetwork(selected.id)) return true;
    if (selected.label === 'Ethereum' || selected.label === 'Base' || selected.label === 'Sepolia' || selected.label === 'Base Sepolia') return true;
    var numericChain = localStorage.getItem('chainId') || '';
    if (numericChain) return SUPPORTED_CHAIN_IDS.indexOf(String(numericChain)) !== -1;
    if (selected.id || selected.label && selected.label !== 'Base') return false;
    return true;
  }
  window.applyUnsupportedNetworkState = function applyUnsupportedNetworkState() {
    var badge = document.querySelector('.nav-network-badge');
    var netLabel = document.getElementById('navNetworkLabel');
    var selected = getSelectedNetworkFromStorage();
    var supported = isSelectedNetworkSupported(selected);
    var netText = supported ? selected.label || 'Base' : 'Unsupported network';
    if (badge) badge.classList.toggle('is-unsupported', !supported);
    if (netLabel) netLabel.textContent = netText;
    if (badge) badge.setAttribute('aria-label', 'Switch network, currently ' + netText);
    var drawerNet = document.getElementById('drawerWalletNetwork');
    if (drawerNet && !supported) drawerNet.textContent = 'Unsupported network';
  };
  window.closeNetworkDropdown = function closeNetworkDropdown() {
    var dropdown = getWalletNetworkDropdown();
    var badge = document.querySelector('.nav-network-badge');
    if (dropdown) dropdown.classList.remove('show');
    if (badge) {
      badge.classList.remove('open');
      badge.setAttribute('aria-expanded', 'false');
    }
  };
  window.toggleNetworkDropdown = function toggleNetworkDropdown(event) {
    if (event) event.stopPropagation();
    if (typeof closeNotificationPanel === 'function') closeNotificationPanel();
    setUserDropdownOpen(false);
    var badge = getNetworkDropdownTrigger();
    if (!badge) return;
    var dropdown = getWalletNetworkDropdown();
    if (!dropdown) return;
    var isOpen = dropdown.classList.toggle('show');
    badge.classList.toggle('open', isOpen);
    badge.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      var firstOption = dropdown.querySelector('.network-option-nav');
      if (firstOption) firstOption.focus();
    }
  };
  window.switchNetwork = function switchNetwork(chainId, label, chainColor, optionEl) {
    document.querySelectorAll('.network-option-nav').forEach(function (el) {
      el.classList.remove('active');
      el.setAttribute('aria-selected', 'false');
    });
    var desktopMatch = document.querySelector('.network-option-nav[data-chain-id="' + chainId + '"]');
    if (desktopMatch) {
      desktopMatch.classList.add('active');
      desktopMatch.setAttribute('aria-selected', 'true');
    } else if (optionEl && optionEl.classList.contains('network-option-nav')) {
      optionEl.classList.add('active');
      optionEl.setAttribute('aria-selected', 'true');
    }
    document.querySelectorAll('.mobile-network-option').forEach(function (el) {
      el.classList.remove('active');
    });
    var mobileMatch = document.querySelector('.mobile-network-option[data-chain-id="' + chainId + '"]');
    if (mobileMatch) mobileMatch.classList.add('active');
    var netLabel = document.getElementById('navNetworkLabel');
    if (netLabel) netLabel.textContent = label;
    var navIcon = document.getElementById('navNetworkIcon');
    if (navIcon && chainColor) navIcon.style.color = chainColor;
    var badge = document.querySelector('.nav-network-badge');
    if (badge) badge.setAttribute('aria-label', 'Switch network, currently ' + label);
    var drawerNet = document.getElementById('drawerWalletNetwork');
    if (drawerNet) drawerNet.textContent = label;
    closeNetworkDropdown();
    var netMeta = PRODUCT_NETWORKS.filter(function (n) {
      return n.id === chainId;
    })[0];
    try {
      localStorage.setItem('selectedNetwork', JSON.stringify({
        id: chainId,
        label: label,
        color: chainColor,
        chainId: netMeta ? netMeta.chainId : ''
      }));
      if (netMeta && netMeta.chainId) localStorage.setItem('chainId', netMeta.chainId);
    } catch (e) {/* ignore */}
    applyUnsupportedNetworkState();
    if (typeof syncNavAuthState === 'function') syncNavAuthState();
  };
  window.handleNetworkBadgeKey = function handleNetworkBadgeKey(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleNetworkDropdown(event);
    } else if (event.key === 'Escape') {
      closeNetworkDropdown();
      event.currentTarget.focus();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      var dropdown = getWalletNetworkDropdown();
      var badge = event.currentTarget;
      if (dropdown && !dropdown.classList.contains('show')) {
        badge.classList.add('open');
        badge.setAttribute('aria-expanded', 'true');
        dropdown.classList.add('show');
      }
      var firstOption = dropdown && dropdown.querySelector('.network-option-nav');
      if (firstOption) firstOption.focus();
    }
  };
  window.handleNetworkOptionKey = function handleNetworkOptionKey(event) {
    var dropdown = getWalletNetworkDropdown();
    var options = dropdown ? Array.from(dropdown.querySelectorAll('.network-option-nav')) : [];
    var idx = options.indexOf(event.currentTarget);
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeNetworkDropdown();
      var trigger = getNetworkDropdownTrigger();
      if (trigger) trigger.focus();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      var next = options[idx + 1];
      if (next) next.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (idx === 0) {
        var triggerUp = getNetworkDropdownTrigger();
        if (triggerUp) triggerUp.focus();
      } else {
        options[idx - 1].focus();
      }
    }
  };
  window.copyNavWalletAddress = function copyNavWalletAddress() {
    var addr = localStorage.getItem('walletAddress') || '';
    if (addr && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(addr).catch(function () {/* ignore */});
    }
    closeNetworkDropdown();
  };
  function pruneNetworkDropdownOptions() {
    document.querySelectorAll('.network-option-nav').forEach(function (opt) {
      var id = opt.getAttribute('data-chain-id');
      if (REMOVED_PRODUCT_CHAIN_IDS.indexOf(id) !== -1) opt.remove();
    });
  }
  function pruneMobileNetworkOptions() {
    document.querySelectorAll('.mobile-network-option').forEach(function (opt) {
      var id = opt.getAttribute('data-chain-id');
      if (PRODUCT_NETWORK_IDS.indexOf(id) === -1) opt.remove();
    });
  }
  function cleanupChunkEMergeArtifacts() {
    var mergedTrigger = document.getElementById('navWalletNetworkTrigger');
    if (mergedTrigger) mergedTrigger.remove();
    var dropdown = getWalletNetworkDropdown();
    if (dropdown) {
      dropdown.querySelectorAll('[data-consumer-nav-wallet-section], .wallet-network-dropdown-wallet, .network-dropdown-divider-nav').forEach(function (el) {
        el.remove();
      });
      dropdown.removeAttribute('data-wallet-network-dropdown');
    }
    var walletTrigger = document.querySelector('.nav-wallet-trigger');
    if (walletTrigger) {
      walletTrigger.removeAttribute('aria-hidden');
      if (!walletTrigger.getAttribute('onclick')) {
        walletTrigger.setAttribute('onclick', 'toggleUserDropdown(event)');
      }
      if (!walletTrigger.getAttribute('onkeydown')) {
        walletTrigger.setAttribute('onkeydown', 'handleUserMenuTriggerKey(event)');
      }
    }
    var networkBadge = document.querySelector('.nav-network-badge');
    if (networkBadge) {
      networkBadge.removeAttribute('aria-hidden');
      if (!networkBadge.getAttribute('onclick')) {
        networkBadge.setAttribute('onclick', 'toggleNetworkDropdown(event)');
      }
      if (!networkBadge.getAttribute('onkeydown')) {
        networkBadge.setAttribute('onkeydown', 'handleNetworkBadgeKey(event)');
      }
    }
    var addrEl = document.getElementById('navWalletAddress');
    if (addrEl) {
      addrEl.classList.remove('nav-wallet-network-address');
      if (!addrEl.closest('.nav-wallet-trigger') && !addrEl.closest('.nav-wallet-info')) {
        var info = document.querySelector('.nav-wallet-info.nav-wallet-trigger, .nav-wallet-info');
        if (info) {
          var row = info.querySelector('.nav-wallet-address-row');
          if (row) row.insertBefore(addrEl, row.firstChild);else info.insertBefore(addrEl, info.firstChild);
        }
      }
    }
    var netEl = document.getElementById('navNetworkLabel');
    if (netEl) {
      netEl.classList.remove('nav-wallet-network-name');
      if (!netEl.closest('.nav-network-badge')) {
        var badge = document.querySelector('.nav-network-badge');
        if (badge) {
          var icon = badge.querySelector('.nav-network-icon');
          if (icon && icon.nextSibling) badge.insertBefore(netEl, icon.nextSibling);else badge.appendChild(netEl);
        }
      }
    }
  }
  function restoreNetworkFromStorage() {
    var stored = getSelectedNetworkFromStorage();
    if (!stored.id || !isProductNetwork(stored.id)) {
      applyUnsupportedNetworkState();
      return;
    }
    var desktopMatch = document.querySelector('.network-option-nav[data-chain-id="' + stored.id + '"]');
    if (desktopMatch) {
      switchNetwork(stored.id, stored.label || desktopMatch.getAttribute('data-chain-label'), stored.color || desktopMatch.getAttribute('data-chain-color'), desktopMatch);
    }
  }
  function initNetworkDropdownOutsideClick() {
    document.addEventListener('click', function (event) {
      var display = document.getElementById('navWalletDisplay');
      var dropdown = getWalletNetworkDropdown();
      if (dropdown && dropdown.classList.contains('show') && display && !display.contains(event.target)) {
        closeNetworkDropdown();
      }
    });
  }
  window.initConsumerNavWalletNetwork = function initConsumerNavWalletNetwork() {
    cleanupChunkEMergeArtifacts();
    pruneNetworkDropdownOptions();
    pruneMobileNetworkOptions();
    restoreNetworkFromStorage();
    applyUnsupportedNetworkState();
  };
  function injectDrawerWalletRowStyles() {
    if (document.getElementById('consumer-nav-drawer-wallet-styles')) return;
    var style = document.createElement('style');
    style.id = 'consumer-nav-drawer-wallet-styles';
    style.textContent = ['.mobile-drawer-wallet-row{display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.875rem;margin:0 0 0.75rem;', 'background:color-mix(in srgb,var(--brand-cloud-blue) 40%,var(--brand-white));border-radius:10px;border:1px solid var(--border-subtle)}', '.drawer-wallet-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:0.25rem}', '#drawerWalletAddress{color:var(--brand-deep-blue)!important;font-size:0.8rem;font-weight:600;line-height:1.2}', '.drawer-wallet-meta-row{display:flex;align-items:baseline;justify-content:space-between;gap:0.5rem;width:100%}', '#drawerWalletBalance{color:var(--text-secondary)!important;font-size:0.7rem;line-height:1.3;flex:1;min-width:0;', 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap}', '#drawerWalletNetwork{color:var(--text-secondary)!important;font-size:0.7rem;line-height:1.3;text-align:right;', 'flex-shrink:0;font-weight:500}'].join('');
    document.head.appendChild(style);
  }
  function stripDrawerWalletInlineColors(el) {
    if (!el || !el.style) return;
    el.style.removeProperty('color');
    el.style.removeProperty('font-size');
    el.style.removeProperty('font-weight');
  }
  function migrateDrawerWalletMetaRow(info) {
    if (!info || info.querySelector('.drawer-wallet-meta-row')) return;
    var legacyMeta = document.getElementById('drawerWalletMeta');
    if (!legacyMeta) return;
    var balance = '';
    var network = '';
    var parts = legacyMeta.textContent.split('·');
    if (parts.length >= 2) {
      balance = parts[0].trim();
      network = parts.slice(1).join('·').trim();
    } else {
      balance = legacyMeta.textContent.trim();
    }
    var metaRow = document.createElement('div');
    metaRow.className = 'drawer-wallet-meta-row';
    var balSpan = document.createElement('span');
    balSpan.id = 'drawerWalletBalance';
    balSpan.textContent = balance;
    var netSpan = document.createElement('span');
    netSpan.id = 'drawerWalletNetwork';
    netSpan.textContent = network;
    metaRow.appendChild(balSpan);
    metaRow.appendChild(netSpan);
    legacyMeta.replaceWith(metaRow);
  }
  function normalizeDrawerWalletRow() {
    var row = document.getElementById('drawerWalletRow');
    if (!row) return;
    row.querySelectorAll('button').forEach(function (btn) {
      if ((btn.getAttribute('onclick') || '').indexOf('disconnectWallet') !== -1) btn.remove();
    });
    var addr = document.getElementById('drawerWalletAddress');
    var info = addr && addr.parentElement;
    if (info) {
      info.classList.add('drawer-wallet-info');
      migrateDrawerWalletMetaRow(info);
    }
    stripDrawerWalletInlineColors(addr);
    stripDrawerWalletInlineColors(document.getElementById('drawerWalletBalance'));
    stripDrawerWalletInlineColors(document.getElementById('drawerWalletNetwork'));
    stripDrawerWalletInlineColors(document.getElementById('drawerWalletMeta'));
  }
  document.addEventListener('DOMContentLoaded', function () {
    injectDrawerWalletRowStyles();
    normalizeDrawerWalletRow();
    hydrateUserMenus();
    initConsumerNavWalletNetwork();
    initNavWalletSessionMenuHooks();
    syncNavAuthState();
    applyNavWalletSession();
    setNavActive();
    initNavDropdowns();
    initUserDropdownOutsideClick();
    initUserDropdownAriaSync();
    initNetworkDropdownOutsideClick();
    initMobileTransactAccordion();
    initMobileDrawerAccordionReset();
  });
  window.addEventListener('storage', function () {
    syncNavAuthState();
    applyNavWalletSession();
  });

  /** Prefer shared wallet-auth modal when script is loaded on the page */
  window.openConnectModal = function openConnectModalFromNav() {
    if (typeof window.openWalletAuthModal === 'function') {
      window.openWalletAuthModal({
        intent: 'connect'
      });
      return;
    }
    if (typeof window.showWalletSelectionModal === 'function') {
      window.showWalletSelectionModal();
      return;
    }
    var modal = document.getElementById('connectModal');
    if (modal) {
      window._connectScenario = 'happy';
      modal.querySelectorAll('.scenario-pill').forEach(function (p) {
        p.classList.toggle('active', p.getAttribute('data-scenario') === 'happy');
      });
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      modal.setAttribute('aria-hidden', 'false');
      var closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) setTimeout(function () {
        closeBtn.focus();
      }, 100);
    }
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/consumer-app-nav.js", error: String((e && e.message) || e) }); }

// unera-pages/donate-flow.js
try { (() => {
/* Huma - Donate flow controller (fiat + crypto + multi-centre). Prototype state is in-memory only. */
(function () {
  'use strict';

  var D = window.UNERA_DON;
  var $ = function (id) {
    return document.getElementById(id);
  };

  /* ── Demo pills (in-memory) ── */
  /* Outcomes map onto DON-CRYPTO-07 + DON-FIAT-05 states. */
  var outcome = 'success';
  var OUTCOMES = [{
    id: 'success',
    label: 'Success (default)'
  }, {
    id: 'awaiting',
    label: 'Awaiting confirmation'
  }, {
    id: 'conversion',
    label: 'Conversion pending'
  }, {
    id: 'timeout',
    label: 'Timeout (status uncertain)'
  }, {
    id: 'pay_failed',
    label: 'Payment failed'
  }, {
    id: 'expired',
    label: 'Order expired'
  }, {
    id: 'rejected',
    label: 'Wallet rejected'
  }, {
    id: 'reverted',
    label: 'Transaction reverted'
  }];
  var blocker = 'none';
  var BLOCKERS = [{
    id: 'none',
    label: 'None (default)'
  }, {
    id: 'balance',
    label: 'Insufficient balance'
  }, {
    id: 'gas',
    label: 'Insufficient gas'
  }, {
    id: 'inactive',
    label: 'Center becomes inactive'
  }, {
    id: 'server',
    label: 'Server error on submit'
  }, {
    id: 'unavailable',
    label: 'Service unavailable'
  }, {
    id: 'hp_unavailable',
    label: 'Huma Points unavailable'
  }];
  function pillGroup(mountId, items, get, set) {
    var el = $(mountId);
    el.innerHTML = items.map(function (s) {
      return '<button type="button" class="demo-btn' + (s.id === get() ? ' active' : '') + '" data-v="' + s.id + '">' + s.label + '</button>';
    }).join('');
    el.querySelectorAll('.demo-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        set(b.getAttribute('data-v'));
        pillGroup(mountId, items, get, set);
      });
    });
  }

  /* ── Flow state ── */
  /* DON-DASH-09 / AC-DON-08 - the minimum donation is $1 USD (or equivalent). */
  var MIN_USD = D.MIN_USD,
    MAX_USD = D.MAX_USD,
    MAX_CENTRES = 5;
  var method = 'fiat';
  var token = 'USDC'; // DON-CRYPTO-01 - USDC/USDT first
  var ccy = 'USD'; // DON-FIAT-04 - original fiat currency
  var cardId = null; // selected saved-card id (fiat)
  var rail = 'card'; // FE-208 (Eric, 24 Aug) - fiat rail: card | bank
  var PM_KEY = 'unera_paymentMethods_v1'; // shared with payment-methods.html - single source of truth
  /* Donation spec §1.4 puts multi-HC allocation out of scope. Retained behind ?multi=1 for TC-CRY-27->29. */
  var MULTI_ENABLED = D.qs('multi') === '1';
  var multi = false;
  var selected = []; // center ids
  var centreQuery = ''; // center search filter (step 1)
  var alloc = {}; // centreId -> token amount (multi)
  var currentStep = 1;
  var quoteRate = 1,
    rateTimer = null;
  var quote = null; // latest Uniswap quote object
  var impactExpanded = false; // step-2 "Show all impact levels" toggle (Slack feedback, 28 Aug)
  /* HC-DETAIL-05 / flow 5.1 step 8 - arrive with the HC prefilled. A suspended HC is never preselected
     (AC-DON-12): the user lands on step 1 with a safe message instead. */
  var preId = D.qs('hc');
  var preBlocked = false;
  if (preId) {
    var preHc = D.getCentre(preId);
    if (preHc.active) selected = [preHc.id];else preBlocked = true;
  }
  function tok() {
    return D.BALANCES.tokens.find(function (t) {
      return t.symbol === token;
    }) || D.BALANCES.tokens[0];
  }
  function ccyInfo() {
    return D.fiatCcy(ccy);
  }
  /* Original-currency amount -> canonical USD (§1.2 "USD is the canonical value"). */
  function toUSD(amount) {
    return method === 'fiat' ? amount * ccyInfo().rate : quote ? quote.usd : amount * D.PRICES[token];
  }

  /* ── Saved cards - read the SAME store as payment-methods.html so the list stays consistent ── */
  function loadCards() {
    try {
      var v = JSON.parse(localStorage.getItem(PM_KEY));
      return Array.isArray(v) ? v : [];
    } catch (e) {
      return [];
    }
  }
  function cardExpired(c) {
    if (!c.expMonth || !c.expYear) return false;
    var d = new Date();
    return c.expYear < d.getFullYear() || c.expYear === d.getFullYear() && c.expMonth < d.getMonth() + 1;
  }
  function cardLabel(c) {
    return c.brand + ' \u2022\u2022\u2022\u2022 ' + c.last4;
  }
  function getCard(id) {
    return loadCards().find(function (c) {
      return c.id === id;
    });
  }
  var CARD_GLYPH = {
    visa: '#1a1f71',
    mastercard: '#eb001b',
    amex: '#2e77bc',
    discover: '#e6772e'
  };
  function renderCards() {
    var wrap = $('cardSelect');
    if (!wrap) return;
    var cards = loadCards();
    var usable = cards.filter(function (c) {
      return !cardExpired(c);
    });
    // Keep/settle the selection: prefer current, else default, else first usable.
    if (!cardId || !usable.some(function (c) {
      return c.id === cardId;
    })) {
      var def = usable.find(function (c) {
        return c.isDefault;
      }) || usable[0];
      cardId = def ? def.id : null;
    }
    $('cardEmptyHint').hidden = cards.length > 0;
    wrap.innerHTML = cards.map(function (c) {
      var exp = cardExpired(c);
      var sel = c.id === cardId;
      var glyph = CARD_GLYPH[c.brand.toLowerCase()] || 'var(--brand-deep-blue)';
      return '<button type="button" class="token-chip card-chip' + (sel ? ' selected' : '') + '" role="radio" aria-checked="' + sel + '"' + (exp ? ' disabled aria-disabled="true"' : '') + ' data-card="' + c.id + '">' + '<span class="card-chip-line"><span class="card-brand-glyph" style="background:' + glyph + ';" aria-hidden="true"></span>' + D.esc(cardLabel(c)) + (c.isDefault && !exp ? '<span class="card-def-tag">Default</span>' : '') + (exp ? '<span class="card-exp-tag">Expired</span>' : '') + '</span>' + '<span class="card-chip-sub">' + D.esc(c.name) + ' \u00b7 exp ' + ('0' + c.expMonth).slice(-2) + '/' + String(c.expYear).slice(-2) + '</span>' + '</button>';
    }).join('') + '<a href="payment-methods.html" class="card-add-btn" id="addCardBtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>Add new card</a>';
    wrap.querySelectorAll('.card-chip:not([disabled])').forEach(function (b) {
      b.addEventListener('click', function () {
        cardId = b.getAttribute('data-card');
        renderCards();
        updateDonCvv();
      });
    });
  }
  function price() {
    return D.PRICES[token];
  }
  function gasUSD(eth) {
    return eth * D.PRICES.ETH;
  }
  /* USDC/USDT are ERC-20: approve + transfer. ETH/BTC are native sends: one confirmation. */
  function promptCount() {
    return method === 'fiat' ? 0 : token === 'ETH' || token === 'BTC' ? 1 : 2;
  }
  function totalTokenAmount() {
    if (multi) return selected.reduce(function (a, id) {
      return a + (parseFloat(alloc[id]) || 0);
    }, 0);
    return parseFloat($('amountInput').value) || 0;
  }
  /* Canonical USD value of the donation itself (before the processing fee is added on top). */
  function totalUSD() {
    var amt = totalTokenAmount();
    if (method === 'fiat') return Math.round(amt * ccyInfo().rate * 100) / 100;
    return quote ? quote.usd : Math.round(amt * quoteRate * 100) / 100;
  }
  /* DON-DASH-08 / AC-DON-07 - processing fee is ON TOP: total charged = donation + processing fee. */
  /* Eric, 2 Sep - the platform fee is FREE for now; keep the hook for when Finance sets a rate. */
  function feeUSD() {
    return 0;
  }
  function convFeeUSD() {
    return method === 'crypto' && quote && quote.converted ? D.conversionFee(totalUSD()) : 0;
  }
  function totalChargedUSD() {
    return Math.round((totalUSD() + feeUSD()) * 100) / 100;
  }
  function refreshQuote() {
    if (method !== 'crypto') {
      quote = null;
      return;
    }
    quote = D.uniswapQuote(token, totalTokenAmount());
    quoteRate = quote.rate;
  }

  /* ── Gates ── */
  function renderGates() {
    var st = D.getUserState();
    $('gateLogin').hidden = st !== 'public';
    $('gateKyc').hidden = st !== 'authed';
    $('flowRoot').hidden = st === 'public' || st === 'authed';
    document.querySelector('.stepper').style.opacity = $('flowRoot').hidden ? '0.4' : '1';
  }
  $('verifyNowBtn').addEventListener('click', function () {
    D.setUserState('wallet' === D.getUserState() ? 'wallet' : 'kyc');
    D.renderStatePills('userStatePills');
  });
  $('connectWalletBtn').addEventListener('click', function () {
    D.setUserState('wallet');
    D.renderStatePills('userStatePills');
  });

  /* Rich preview of a Humanity Center on step 1, revealed ONLY by the eye button on each row.
     (Eric, 27 Aug: one explicit trigger. Hover previews are undiscoverable, unavailable on touch,
     and fire accidentally while moving the pointer to click a row.) */
  var hcvTimer = null;
  var pinnedPreviewId = null;
  function showHcPreview(row, id) {
    var el = $('hcHoverCard');
    if (!el) return;
    clearTimeout(hcvTimer);
    hcvTimer = setTimeout(function () {
      var c = D.getCentre(id);
      var lives = c.livesImpacted == null ? 'Coming soon' : D.fmtNum(c.livesImpacted);
      var thumbs = (c.gallery || []).slice(0, 3).map(function (g) {
        return '<img src="' + g + '" alt="" loading="lazy">';
      }).join('');
      el.innerHTML = '<div class="hcv-hero"><img src="' + c.image + '" alt=""></div>' + '<div class="hcv-body">' + '<p class="hcv-name">' + D.esc(c.name) + '</p>' + '<p class="hcv-meta">' + D.esc(c.location) + ' \u00b7 ' + D.esc(c.category) + '</p>' + '<p class="hcv-desc">' + D.esc(c.lead || c.desc) + '</p>' + '<div class="hcv-stats"><div class="hcv-stat"><strong>' + D.fmtUSD(c.totalDonatedUSD) + '</strong><span>Total donated</span></div><div class="hcv-stat"><strong>' + lives + '</strong><span>Lives impacted</span></div></div>' + (thumbs ? '<div class="hcv-thumbs">' + thumbs + '</div>' : '') + '</div>';
      el.hidden = false;
      var r = row.getBoundingClientRect(),
        w = 320,
        h = el.offsetHeight;
      var left = r.right + 12;
      if (left + w > window.innerWidth - 8) left = r.left - w - 12;
      if (left < 8) left = Math.min(r.left, window.innerWidth - w - 8);
      el.style.left = left + 'px';
      el.style.top = Math.max(8, Math.min(r.top, window.innerHeight - h - 8)) + 'px';
    }, 0);
  }
  function hideHcPreview() {
    clearTimeout(hcvTimer);
    pinnedPreviewId = null;
    var el = $('hcHoverCard');
    if (el) el.hidden = true;
    document.querySelectorAll('.cp-eye[aria-expanded="true"]').forEach(function (b) {
      b.setAttribute('aria-expanded', 'false');
    });
  }
  document.addEventListener('click', function (e) {
    if (pinnedPreviewId && !e.target.closest('.cp-eye') && !e.target.closest('#hcHoverCard')) hideHcPreview();
  });
  document.addEventListener('scroll', hideHcPreview, true);

  /* ── Stepper ── */
  function goToStep(n, opts) {
    opts = opts || {};
    hideHcPreview();
    currentStep = n;
    ['step1', 'step2', 'step3', 'stepPay', 'stepProcessing', 'step5'].forEach(function (id) {
      $(id).classList.remove('active');
    });
    var elId = opts.processing ? 'stepProcessing' : n === 4 ? 'stepPay' : 'step' + n;
    $(elId).classList.add('active');
    document.querySelectorAll('#stepper .step').forEach(function (s) {
      var k = parseInt(s.getAttribute('data-step'), 10);
      s.classList.toggle('active', k === n && !opts.allDone);
      s.classList.toggle('completed', k < n || !!opts.allDone);
      var circle = s.querySelector('.step-circle');
      if (k < n || opts.allDone) circle.innerHTML = '<svg class="unera-checkmark" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg>';else circle.textContent = k;
    });
    $('stepper').setAttribute('aria-valuenow', n);
    $('stepperProgress').style.width = (n - 1) / 4 * 100 + '%';
    var TITLES = ['Center', 'Amount', 'Review', 'Payment', 'Done'];
    $('mStepNum').textContent = n;
    $('mStepLabel').textContent = 'Step ' + n + ' of 5';
    $('mStepTitle').textContent = opts.processing ? 'Processing' : TITLES[n - 1];
    $('mStepCounter').textContent = n + ' / 5';
    renderFlowContext(n, opts);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Move focus to the active step's heading on user-initiated navigation (steps 1-3).
    // Processing announces via its own live region; the terminal manages its own focus.
    if (!opts.processing && !opts.allDone && !opts.fail && n >= 1 && n <= 4) {
      var head = $(elId).querySelector('h2');
      if (head) {
        head.setAttribute('tabindex', '-1');
        head.focus({
          preventScroll: true
        });
      }
    }
  }
  function renderFlowContext(n, opts) {
    var fc = $('flowContext');
    var show = (n === 2 || n === 3) && !opts.processing && selected.length > 0;
    fc.hidden = !show;
    if (!show) return;
    var c = D.getCentre(selected[0]);
    var img = '<span class="fc-img" style="background-color:' + c.tint + ';"><img src="' + c.image.replace('w=800', 'w=200') + '" alt=""></span>';
    var name = multi && selected.length > 1 ? 'Split across ' + selected.length + ' centers' : D.esc(c.name) + ' · ' + D.esc(c.location);
    fc.innerHTML = img + '<span class="fc-body"><span class="fc-label">Donating to</span><span class="fc-name">' + name + '</span></span>' + '<button type="button" class="btn btn-secondary btn-sm" id="fcChangeBtn">Change center</button>';
    $('fcChangeBtn').addEventListener('click', function () {
      clearInterval(rateTimer);
      goToStep(1);
    });
  }

  /* ── STEP 1: center selection ── */
  function renderCentres() {
    var pick = $('centrePick');
    var q = (centreQuery || '').trim().toLowerCase();
    /* DON-DASH-06 / AC-DON-12 - a donation can only target an ACTIVE Humanity Center. */
    var list = D.CENTERS.filter(function (c) {
      if (!c.active) return false;
      return !q || c.name.toLowerCase().indexOf(q) !== -1 || c.country.toLowerCase().indexOf(q) !== -1 || c.category.toLowerCase().indexOf(q) !== -1;
    });
    pick.innerHTML = list.map(function (c) {
      var sel = selected.indexOf(c.id) !== -1;
      var lives = c.livesImpacted == null ? 'lives impacted coming soon' : D.fmtNum(c.livesImpacted) + ' lives impacted';
      return '<div class="centre-pick-row' + (sel ? ' selected' : '') + '" role="option" tabindex="0" aria-selected="' + sel + '" data-id="' + c.id + '">' + '<span class="cp-img" style="background-color:' + c.tint + ';" aria-hidden="true"><img src="' + c.image.replace('w=800', 'w=200') + '" alt="" loading="lazy"></span>' + '<span class="cp-body"><span class="cp-name">' + D.esc(c.name) + '</span><span class="cp-meta">' + D.esc(c.location) + ' · ' + D.fmtUSD(c.totalDonatedUSD) + ' donated · ' + lives + '</span></span>' + '<button type="button" class="cp-eye" aria-label="Preview ' + D.esc(c.name) + '" aria-expanded="false" aria-haspopup="dialog"><svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg></button>' + '<svg class="cp-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>' + '</div>';
    }).join('');
    pick.querySelectorAll('.centre-pick-row').forEach(function (row) {
      row.addEventListener('keydown', function (e) {
        if ((e.key === 'Enter' || e.key === ' ') && e.target === row) {
          e.preventDefault();
          row.click();
        }
      });
      var eye = row.querySelector('.cp-eye');
      if (eye) eye.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = row.getAttribute('data-id');
        if (pinnedPreviewId === id) {
          hideHcPreview();
          return;
        }
        hideHcPreview();
        showHcPreview(row, id);
        pinnedPreviewId = id;
        eye.setAttribute('aria-expanded', 'true');
      });
      row.addEventListener('click', function () {
        hideHcPreview();
        var id = row.getAttribute('data-id');
        if (multi) {
          var i = selected.indexOf(id);
          if (i === -1) {
            if (selected.length >= MAX_CENTRES) {
              var mh = $('multiHint');
              if (mh) {
                mh.textContent = 'You can split one donation across up to ' + MAX_CENTRES + ' centers.';
                mh.classList.add('error');
                mh.setAttribute('role', 'alert');
              }
              return;
            }
            selected.push(id);
            var mh2 = $('multiHint');
            if (mh2) {
              mh2.textContent = 'Multi-centre donations are available for crypto only in this release.';
              mh2.classList.remove('error');
              mh2.removeAttribute('role');
            }
          } else selected.splice(i, 1);
        } else {
          /* Single-select: choosing a center advances straight to step 2 (one less click).
             The "Change center" chip on steps 2-3 returns here. Multi mode keeps toggling. */
          selected = [id];
          renderCentres();
          renderAmountUI();
          goToStep(2);
          return;
        }
        renderCentres();
      });
    });
    var total = D.CENTERS.filter(function (c) {
      return c.active;
    }).length;
    var countEl = $('centreCount');
    if (countEl) countEl.textContent = q ? list.length + ' of ' + total + ' centers match "' + centreQuery.trim() + '"' : total + ' centers available';
    var emptyEl = $('centreEmpty');
    if (emptyEl) emptyEl.hidden = list.length > 0;
    var clearBtn = $('centreSearchClear');
    if (clearBtn) clearBtn.hidden = !q;
    renderSelectedChips();
    $('toStep2').disabled = selected.length === 0;
    pick.setAttribute('aria-multiselectable', multi ? 'true' : 'false');
  }
  function renderSelectedChips() {
    var wrap = $('centreSelectedChips');
    if (!wrap) return;
    if (!multi || selected.length === 0) {
      wrap.hidden = true;
      wrap.innerHTML = '';
      return;
    }
    wrap.hidden = false;
    wrap.innerHTML = selected.map(function (id) {
      var c = D.getCentre(id);
      return '<span class="centre-chip">' + D.esc(c.name) + '<button type="button" class="centre-chip-remove" data-remove="' + id + '" aria-label="Remove ' + D.esc(c.name) + '"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button></span>';
    }).join('') + '<button type="button" class="centre-chips-clear" id="centreChipsClear">Clear all</button>';
    wrap.querySelectorAll('[data-remove]').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-remove');
        var i = selected.indexOf(id);
        if (i !== -1) selected.splice(i, 1);
        renderCentres();
      });
    });
    var ca = $('centreChipsClear');
    if (ca) ca.addEventListener('click', function () {
      selected = [];
      renderCentres();
    });
  }
  var centreSearchEl = $('centreSearch');
  if (centreSearchEl) centreSearchEl.addEventListener('input', function () {
    centreQuery = this.value;
    renderCentres();
  });
  var centreSearchClearEl = $('centreSearchClear');
  if (centreSearchClearEl) centreSearchClearEl.addEventListener('click', function () {
    centreQuery = '';
    if (centreSearchEl) {
      centreSearchEl.value = '';
      centreSearchEl.focus();
    }
    renderCentres();
  });
  if (MULTI_ENABLED) {
    $('multiToggleRow').hidden = false;
    $('multiHint').hidden = false;
  }
  $('multiToggle').addEventListener('change', function () {
    multi = this.checked;
    if (multi && method === 'fiat') setMethod('crypto');
    if (!multi && selected.length > 1) selected = [selected[0]];
    renderCentres();
  });

  /* ── STEP 2: method & amount ── */
  function setMethod(m) {
    method = m;
    $('methodFiat').classList.toggle('selected', m === 'fiat');
    $('methodFiat').setAttribute('aria-checked', m === 'fiat');
    $('methodCrypto').classList.toggle('selected', m === 'crypto');
    $('methodCrypto').setAttribute('aria-checked', m === 'crypto');
    renderAmountUI();
  }
  $('methodFiat').addEventListener('click', function () {
    if (multi) {
      $('amountHint').textContent = 'Multi-centre donations are crypto-only in this release. Switch off the split to donate by card.';
      $('amountHint').classList.add('error');
      return;
    }
    setMethod('fiat');
  });
  $('methodCrypto').addEventListener('click', function () {
    setMethod('crypto');
  });

  /* FE-208 (Kevin 23 Aug / Eric 24 Aug) - fiat supports card AND bank transfer; method comes before currency.
     Eric, 4 Sep (Slack reply 20): reuse the buy method list. Every method is visible; phase 1 keeps only Card
     enabled, marked "Coming soon" on the rest so the limit reads intentional. Bank transfer stays fully built
     and previews via the release-phase demo pill (in-memory only). Wise and MoneyGram are display-only in donate. */
  var phase1CardOnly = true;
  var RAILS = [{
    id: 'card',
    l: 'Card',
    sub: 'Instant · any card currency, your card issuer converts'
  }, {
    id: 'bank',
    l: 'Bank transfer',
    sub: 'You choose the transfer currency · completes when it arrives',
    gated: true
  }, {
    id: 'wise',
    l: 'Wise',
    sub: 'Send from your Wise account',
    always: true
  }, {
    id: 'moneygram',
    l: 'MoneyGram',
    sub: 'Online or at an agent location',
    always: true
  }];
  function railDisabled(r) {
    return !!(r.always || r.gated && phase1CardOnly);
  }
  function renderRails() {
    var wrap = $('railSelect');
    if (!wrap) return;
    wrap.classList.add('rail-list');
    wrap.innerHTML = RAILS.map(function (r) {
      var dis = railDisabled(r);
      var on = r.id === rail && !dis;
      return '<button type="button" class="rail-choice' + (on ? ' selected' : '') + (dis ? ' is-soon' : '') + '" role="radio" aria-checked="' + on + '" aria-disabled="' + dis + '" data-r="' + r.id + '">' + '<span class="rail-main"><span class="rail-label">' + r.l + (dis ? ' <span class="rail-soon-badge">Coming soon</span>' : '') + '</span>' + '<span class="rail-sub">' + (dis ? 'Arrives in a later release. Card works today.' : r.sub) + '</span></span>' + '<span class="rail-check" aria-hidden="true"></span></button>';
    }).join('');
    wrap.querySelectorAll('.rail-choice').forEach(function (b) {
      b.addEventListener('click', function () {
        var r = RAILS.filter(function (x) {
          return x.id === b.getAttribute('data-r');
        })[0];
        if (!r || railDisabled(r)) return;
        rail = r.id;
        if (rail === 'card') ccy = 'USD';
        renderRails();
        renderAmountUI();
      });
    });
  }
  function setPhase1(v) {
    phase1CardOnly = v;
    var cur = RAILS.filter(function (x) {
      return x.id === rail;
    })[0];
    if (cur && railDisabled(cur)) {
      rail = 'card';
      ccy = 'USD';
    }
    renderRails();
    renderAmountUI();
  }
  (function renderPhasePills() {
    var wrap = document.getElementById('phasePills');
    if (!wrap) return;
    wrap.innerHTML = '<button type="button" class="demo-btn active" data-p="1">Phase 1 · Card only</button>' + '<button type="button" class="demo-btn" data-p="2">Phase 2 preview · + Bank transfer</button>';
    wrap.querySelectorAll('.demo-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        wrap.querySelectorAll('.demo-btn').forEach(function (x) {
          x.classList.toggle('active', x === b);
        });
        setPhase1(b.getAttribute('data-p') === '1');
      });
    });
  })();

  /* DON-CRYPTO-01 - USDC/USDT first (direct to multisig), then convertible assets (BTC/ETH). */
  function renderTokens() {
    $('tokenSelect').innerHTML = D.BALANCES.tokens.map(function (t) {
      var tag = t.settles === 'direct' ? '<span class="asset-tag is-direct">Direct</span>' : '<span class="asset-tag is-converted">Converted to USDC/USDT</span>';
      return '<button type="button" class="token-chip' + (t.symbol === token ? ' selected' : '') + '" role="radio" aria-checked="' + (t.symbol === token) + '" data-t="' + t.symbol + '">' + t.symbol + ' <span style="font-weight:400;color:var(--text-secondary);">' + t.amount.toLocaleString('en-US', {
        maximumFractionDigits: t.symbol === 'BTC' ? 5 : t.native ? 4 : 2
      }) + '</span>' + tag + '</button>';
    }).join('');
    $('tokenSelect').querySelectorAll('.token-chip').forEach(function (b) {
      b.addEventListener('click', function () {
        token = b.getAttribute('data-t');
        renderTokens();
        renderAmountUI();
      });
    });
  }
  /* DON-FIAT-04 - original fiat currency; the rail converts non-USD to USD before settlement. */
  function renderCurrencies() {
    var wrap = $('ccySelect');
    if (!wrap) return;
    wrap.innerHTML = D.FIAT.map(function (f) {
      var on = f.code === ccy;
      return '<button type="button" class="ccy-chip' + (on ? ' selected' : '') + '" role="radio" aria-checked="' + on + '" data-c="' + f.code + '">' + f.symbol + ' ' + f.code + '</button>';
    }).join('');
    wrap.querySelectorAll('.ccy-chip').forEach(function (b) {
      b.addEventListener('click', function () {
        ccy = b.getAttribute('data-c');
        renderCurrencies();
        renderAmountUI();
      });
    });
  }
  function renderAmountUI() {
    var crypto = method === 'crypto';
    var walletOk = D.is('wallet');
    $('gateWallet').hidden = !(crypto && !walletOk);
    $('cryptoTokenBlock').hidden = !(crypto && walletOk);
    $('fiatCardBlock').hidden = crypto;
    $('amountBlock').hidden = crypto && !walletOk;
    $('amountHint').classList.remove('error');
    $('amountWrap').classList.remove('input-error');
    if (crypto && walletOk) {
      quoteRate = price();
      var t = tok(),
        dp = token === 'BTC' ? 5 : t.native ? 4 : 2;
      $('amountLabel').textContent = multi ? 'Allocation per center (' + token + ')' : 'Donation amount (' + token + ')';
      $('amountPrefix').textContent = token;
      $('availLine').hidden = false;
      $('availAmt').textContent = t.amount.toLocaleString('en-US', {
        maximumFractionDigits: dp
      }) + ' ' + token;
      $('availUsd').textContent = '≈ ' + D.fmtUSD(t.amount * quoteRate, 2);
      $('amountHint').textContent = 'Donations between ' + D.fmtUSD(MIN_USD) + ' and ' + D.fmtUSD(MAX_USD) + ' (USD value) per transaction.';
      /* §1.7 - USDC/USDT need no swap; BTC/ETH are converted to USDC or USDT, never to fiat. */
      $('conversionTipText').innerHTML = t.settles === 'direct' ? '<strong>' + token + ' goes straight to the ' + D.SETTLEMENT.multisigLabel + '</strong>. No conversion needed. Its USD value is what we report and receipt.' : '<strong>' + token + ' is converted to USDC or USDT</strong> before it reaches the ' + D.SETTLEMENT.multisigLabel + '. The conversion is handled automatically at the best available rate.';
      $('gasWarnBanner').hidden = blocker !== 'gas';
      $('amountWrap').style.display = multi ? 'none' : '';
      $('amountLabel').style.display = multi ? 'none' : '';
      $('quickAmounts').style.display = multi ? 'none' : '';
      $('multiAllocBlock').hidden = !multi;
      if (multi) renderAllocRows();
    } else {
      renderRails();
      $('railCardWrap').hidden = rail !== 'card';
      $('railBankWrap').hidden = rail !== 'bank';
      if (rail === 'card') ccy = 'USD';else renderCurrencies();
      var f = ccyInfo();
      $('amountLabel').textContent = 'Donation amount (' + f.code + ')';
      $('amountLabel').style.display = '';
      $('amountPrefix').textContent = f.symbol;
      $('availLine').hidden = true;
      $('amountHint').textContent = 'Donations between ' + D.fmtUSD(MIN_USD) + ' and ' + D.fmtUSD(MAX_USD) + ' (USD value) per transaction.';
      $('conversionTipText').innerHTML = rail === 'card' ? 'Your card is charged and the donation is routed to the ' + D.SETTLEMENT.fiatAccountLabel + '. Non-USD cards are converted by your card issuer at its own rate. Fiat is never converted to crypto.' : f.code === 'USD' ? 'You transfer USD to our donation account and it is routed to the ' + D.SETTLEMENT.fiatAccountLabel + '. Fiat is never converted to crypto.' : 'You transfer ' + f.code + '. The payment rail converts it to USD before routing. We keep your original amount, the rate and the USD value on the record.';
      $('gasWarnBanner').hidden = true;
      $('amountWrap').style.display = '';
      $('quickAmounts').style.display = '';
      $('multiAllocBlock').hidden = true;
    }
    var quicks = method === 'fiat' ? ccy === 'VND' ? [250000, 500000, 1000000, 2500000] : [25, 50, 100, 250] : token === 'ETH' ? [0.01, 0.05, 0.1] : token === 'BTC' ? [0.0005, 0.001, 0.005] : [25, 50, 100, 250];
    $('quickAmounts').innerHTML = quicks.map(function (q) {
      return '<button type="button" class="quick-amt" data-q="' + q + '">' + (method === 'fiat' ? D.fmtCcy(ccy, q) : q + ' ' + token) + '</button>';
    }).join('');
    $('quickAmounts').querySelectorAll('.quick-amt').forEach(function (b) {
      b.addEventListener('click', function () {
        $('amountInput').value = b.getAttribute('data-q');
        updateAmountLive();
      });
    });
    updateAmountLive();
  }
  function renderAllocRows() {
    $('multiAllocRows').innerHTML = selected.map(function (id) {
      var c = D.getCentre(id);
      return '<div class="multi-row"><span class="cp-name">' + D.esc(c.name) + '</span>' + '<div class="input-wrapper"><span class="input-prefix">' + token + '</span><input type="text" inputmode="decimal" class="input-field" style="font-size:0.938rem;padding:0.625rem 0.5rem;" data-alloc="' + id + '" value="' + (alloc[id] || '') + '" aria-label="Amount for ' + D.esc(c.name) + '"></div>' + '</div>';
    }).join('');
    $('multiAllocRows').querySelectorAll('[data-alloc]').forEach(function (inp) {
      inp.addEventListener('input', function () {
        alloc[inp.getAttribute('data-alloc')] = inp.value;
        updateMultiTotal();
      });
    });
    updateMultiTotal();
  }
  function updateMultiTotal() {
    var t = totalTokenAmount();
    $('multiTotalLine').textContent = 'Total: ' + t.toLocaleString('en-US', {
      maximumFractionDigits: 4
    }) + ' ' + token + ' ≈ ' + D.fmtUSD(t * quoteRate, 2);
  }

  /* §6.3 - every message below is the spec's user message, verbatim, from D.ERR. */
  function validateAmount() {
    var hint = $('amountHint'),
      wrap = $('amountWrap');
    hint.classList.remove('error');
    wrap.classList.remove('input-error');
    refreshQuote();
    var amt = totalTokenAmount();
    var usd = totalUSD();
    function fail(msg) {
      hint.textContent = msg;
      hint.classList.add('error');
      hint.setAttribute('role', 'alert');
      if (!multi) wrap.classList.add('input-error');
      return false;
    }
    if (blocker === 'unavailable') return fail(D.ERR.provider);
    if (!amt || amt <= 0 || isNaN(amt)) return fail(D.ERR.invalidAmount);
    if (usd < MIN_USD || usd > MAX_USD) return fail(D.ERR.outOfRange(MAX_USD));
    if (method === 'crypto') {
      if (blocker === 'balance' || amt > tok().amount) return fail(D.ERR.insufficient(token));
      if (multi && selected.some(function (id) {
        return (parseFloat(alloc[id]) || 0) * quoteRate < MIN_USD;
      })) return fail('Each center allocation must be at least ' + D.fmtUSD(MIN_USD) + '.');
    }
    hint.removeAttribute('role');
    return true;
  }

  /* ── STEP 3: review ── */
  function row(label, value, opts) {
    opts = opts || {};
    return '<div class="summary-row' + (opts.total ? ' summary-row--total' : '') + (opts.stack ? ' summary-row--stack' : '') + '"><span class="summary-row-label">' + label + '</span><span class="summary-row-value' + (opts.mono ? ' mono' : '') + '">' + value + '</span></div>';
  }
  /* Kevin, 28 Aug - tax receipts are not issued for now; the row and its demo blocker are removed. */
  function syncQuickAmts() {
    var v = parseFloat($('amountInput').value);
    $('quickAmounts').querySelectorAll('.quick-amt').forEach(function (b) {
      b.classList.toggle('selected', parseFloat(b.getAttribute('data-q')) === v);
    });
  }
  function updateAmountLive() {
    syncQuickAmts();
    var el = $('amountLive'),
      ql = $('quoteLine');
    refreshQuote();
    if (multi) {
      el.hidden = true;
      if (ql) ql.hidden = true;
      return;
    }
    var amt = parseFloat($('amountInput').value) || 0;
    if (!amt || amt <= 0) {
      el.hidden = true;
      if (ql) ql.hidden = true;
      return;
    }
    var usd = totalUSD(),
      fee = feeUSD(),
      conv = convFeeUSD();
    /* DON-CRYPTO-02 - attribute the quote and name the route that was picked. */
    if (ql) {
      if (method === 'crypto' && quote) {
        ql.hidden = false;
        /* Eric, 2 Sep - no venue name in user copy; the conversion is our BE handler. */
        ql.innerHTML = '<strong>≈ ' + D.fmtUSD(quote.usd, 2) + '</strong> USD value' + (quote.converted ? ' · settles as <strong>' + quote.settlementAsset + '</strong>' : ' · settles as <strong>' + quote.settlementAsset + '</strong> (no swap)');
      } else if (method === 'fiat' && rail === 'bank' && ccy !== 'USD') {
        /* Kevin, 3 Sep - suggested rate for non-USD bank transfers, shown like the crypto quote. */
        ql.hidden = false;
        ql.innerHTML = '<strong>≈ ' + D.fmtUSD(usd, 2) + '</strong> USD we receive · suggested rate <strong>1 ' + ccy + ' = ' + D.fmtUSD(ccyInfo().rate, 4) + '</strong>';
      } else {
        ql.hidden = true;
      }
    }
    var rows = '';
    if (method === 'crypto') rows += '<div class="summary-row"><span class="summary-row-label">You donate</span><span class="summary-row-value">' + amt.toLocaleString('en-US', {
      maximumFractionDigits: 6
    }) + ' ' + token + '</span></div>';else if (ccy !== 'USD') rows += '<div class="summary-row"><span class="summary-row-label">You donate</span><span class="summary-row-value">' + D.fmtCcy(ccy, amt) + '</span></div>';
    rows += '<div class="summary-row"><span class="summary-row-label">Donation amount (USD)</span><span class="summary-row-value">' + D.fmtUSD(usd, 2) + '</span></div>';
    rows += '<div class="summary-row is-fee"><span class="summary-row-label">Platform fee</span><span class="summary-row-value"><span style="color:var(--fin-up);font-weight:700;letter-spacing:0.04em;">FREE</span></span></div>';
    if (conv) rows += '<div class="summary-row is-fee"><span class="summary-row-label">Conversion fee<span class="summary-row-note">' + token + ' → ' + quote.settlementAsset + '</span></span><span class="summary-row-value">' + D.fmtUSD(conv, 2) + '</span></div>';
    rows += '<div class="summary-row summary-row--total"><span class="summary-row-label">Total charged</span><span class="summary-row-value">' + D.fmtUSD(totalChargedUSD(), 2) + '</span></div>';
    var hc = D.getCentre(selected[0]);
    /* Slack feedback (Kevin, 28 Aug) - 2-3 impact lines in the summary, the rest behind "Show all". */
    var hints = (hc.impactHints || []).slice().sort(function (a, b) {
      return a.amount - b.amount;
    });
    if (hints.length) {
      var reached = null;
      hints.forEach(function (h) {
        if (usd >= h.amount) reached = h;
      });
      var lines = [];
      if (reached) lines.push({
        h: reached,
        now: true
      });
      hints.forEach(function (h) {
        if ((!reached || h.amount > reached.amount) && lines.length < 3) lines.push({
          h: h,
          now: false
        });
      });
      var shownAmts = lines.map(function (l) {
        return l.h.amount;
      });
      var rest = hints.filter(function (h) {
        return shownAmts.indexOf(h.amount) === -1;
      });
      var impactLine = function (l) {
        return '<div class="summary-row"><span class="summary-row-label">' + (l.now ? 'Your impact' : 'At ' + D.fmtUSD(l.h.amount)) + '</span>' + '<span class="summary-row-value" style="' + (l.now ? 'color:var(--fin-up);' : 'color:var(--text-secondary);font-weight:500;') + '">≈ ' + D.esc(l.h.impact) + '</span></div>';
      };
      rows += '<div class="impact-lines">' + lines.map(impactLine).join('');
      if (rest.length) {
        rows += '<div id="impactRest"' + (impactExpanded ? '' : ' hidden') + '>' + rest.map(function (h) {
          return impactLine({
            h: h,
            now: false
          });
        }).join('') + '</div>';
        rows += '<button type="button" class="impact-more-btn" id="impactMoreBtn" aria-expanded="' + impactExpanded + '">' + (impactExpanded ? 'Show fewer impact levels' : 'Show all ' + hints.length + ' impact levels') + '</button>';
      }
      rows += '</div>';
    }
    el.innerHTML = rows;
    el.hidden = false;
    var imb = $('impactMoreBtn');
    if (imb) imb.addEventListener('click', function () {
      impactExpanded = !impactExpanded;
      updateAmountLive();
    });
  }
  function renderReview() {
    refreshQuote();
    var orderRows = '';
    if (multi) {
      orderRows += selected.map(function (id) {
        var c = D.getCentre(id);
        var a = parseFloat(alloc[id]) || 0;
        return row(D.esc(c.name), a.toLocaleString('en-US', {
          maximumFractionDigits: 4
        }) + ' ' + token + ' · ≈ ' + D.fmtUSD(a * quoteRate, 2), {
          stack: true
        });
      }).join('');
      orderRows += row('Routing', 'DonationRouter · donateMulti', {});
    } else {
      var c = D.getCentre(selected[0]);
      /* Eric, 2 Sep - quick-view eye before the center name, same preview as step 1. */
      orderRows += row('Humanity Center', '<button type="button" class="cp-eye review-eye" id="reviewEyeBtn" aria-label="Preview ' + D.esc(c.name) + '" aria-expanded="false" aria-haspopup="dialog"><svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg></button><span>' + D.esc(c.name) + ' · ' + D.esc(c.location) + '</span>', {
        stack: true
      });
    }
    orderRows += row('Method', method === 'fiat' ? 'Donate by Fiat · ' + (rail === 'card' ? 'card' : 'bank transfer') : 'Donate by Crypto · ' + token);
    var amt = totalTokenAmount(),
      usd = totalUSD();
    if (method === 'fiat') {
      /* Kevin, 3 Sep - review and payment are one step; card choice / receiving account render below in the Payment block. */
      if (rail !== 'card' && ccy !== 'USD') {
        /* DON-FIAT-04 - non-USD keeps original currency, amount and rate on the record (bank transfer only). */
        orderRows += row('You donate', D.fmtCcy(ccy, amt) + ' ' + ccy);
        orderRows += row('Exchange rate', '1 ' + ccy + ' = ' + D.fmtUSD(ccyInfo().rate, 4) + ', applied by the payment rail');
      }
      orderRows += row('Donation amount (USD)', D.fmtUSD(usd, 2), {
        total: true
      });
      /* Kevin, 28 Aug - no "Destination" row: users assume it reaches the right account for the center. */
    } else {
      /* DON-CRYPTO-03 - asset, original amount, USD quote, destination type.
         FE-208 (Eric, 24 Aug) - the multisig wallet address is NOT shown; settlement is handled by the BE. */
      orderRows += row('You donate', amt.toLocaleString('en-US', {
        maximumFractionDigits: 6
      }) + ' ' + token);
      orderRows += row('USD quote', D.fmtUSD(usd, 2), {
        total: true
      });
      orderRows += row('Settlement asset', quote.settlementAsset + (quote.converted ? '<span class="summary-row-note">' + token + ' is converted before it is routed</span>' : '<span class="summary-row-note">No conversion needed</span>'));
      /* Kevin, 28 Aug - no "Destination" row here either; same reasoning as fiat. */
      orderRows += row('Network', D.SETTLEMENT.network + '<span class="summary-row-note">More networks are being added.</span>');
    }
    /* Kevin, 28 Aug - no "Tax receipt" row: we don't issue tax receipts for now. */
    $('reviewOrderRows').innerHTML = orderRows;
    var reye = $('reviewEyeBtn');
    if (reye) reye.addEventListener('click', function (e) {
      e.stopPropagation();
      var id = selected[0];
      if (pinnedPreviewId === id) {
        hideHcPreview();
        return;
      }
      hideHcPreview();
      showHcPreview(reye.closest('.summary-row'), id);
      pinnedPreviewId = id;
      reye.setAttribute('aria-expanded', 'true');
    });

    /* DON-DASH-08 / DON-CRYPTO-03 / AC-DON-07 - every fee before confirmation, processing fee ON TOP. */
    var fee = feeUSD(),
      conv = convFeeUSD();
    var costRows = row('Donation amount', D.fmtUSD(usd, 2));
    /* Eric, 2 Sep - "Platform fee", FREE for now. */
    costRows += row('Platform fee', '<span style="color:var(--fin-up);font-weight:700;letter-spacing:0.04em;">FREE</span>');
    if (method === 'fiat') {
      costRows += row('Total charged' + (ccy !== 'USD' ? ' (USD)' : ''), D.fmtUSD(totalChargedUSD(), 2), {
        total: true
      });
      if (ccy !== 'USD') costRows += row(rail === 'card' ? 'Charged to your card' : 'You transfer', D.fmtCcy(ccy, totalChargedUSD() / ccyInfo().rate) + ' ' + ccy);
    } else {
      if (conv) costRows += row('Conversion fee<span class="summary-row-note">' + token + ' → ' + quote.settlementAsset + ', via the Crypto Swap Worker</span>', D.fmtUSD(conv, 2));
      /* Eric, 2 Sep - the approval is an off-chain signature and costs nothing; only the donation
         transaction pays gas, so there is exactly one network-fee row. */
      var gd = D.GAS.donateETH;
      costRows += row('Estimated network fee<span class="summary-row-note">The exact fee is shown in your wallet when you sign the transaction.</span>', gd.toFixed(5) + ' ETH · ≈ ' + D.fmtUSD(gasUSD(gd), 2));
      costRows += row('Total charged<span class="summary-row-note">The network fee is paid separately from your wallet.</span>', D.fmtUSD(totalChargedUSD(), 2), {
        total: true
      });
    }
    costRows += '<p class="tbd-note">' + D.esc(D.FEES.note) + '</p>';
    $('reviewCostRows').innerHTML = costRows;
    $('rateLockNote').hidden = method !== 'crypto';
    if (method === 'crypto') startRateLock();
    var n = promptCount();
    $('promptCountText').innerHTML = n === 0 ? 'No wallet confirmations needed. You complete the ' + (rail === 'card' ? 'card payment' : 'bank transfer') + ' on the next step.' : n === 1 ? 'This needs <strong>1 wallet confirmation</strong>: the donation itself.' : 'This needs <strong>2 wallet signatures</strong>: an approval that costs nothing, then the donation itself.';
    $('promptCountLine').querySelector('.fee-info-btn').style.display = n >= 1 ? '' : 'none';
    $('promptTooltip').classList.remove('is-open');
    /* Renol, 4 Sep - Review and Payment are separate steps again (buy stays 2 steps, flows match).
       Fiat continues to the Payment step; crypto confirms here (payment = wallet signatures). */
    $('reviewContinueBtn').textContent = method === 'fiat' ? 'Continue to payment' : 'Confirm donation';
    var block = null;
    /* AC-DON-12 - HC went inactive mid-flow: block submission with a safe message. */
    if (blocker === 'inactive') block = {
      t: 'This Humanity Center is no longer accepting donations',
      x: 'The center was suspended while you were reviewing. Please choose another active Humanity Center.'
    };
    if (blocker === 'unavailable') block = {
      t: 'Donations are temporarily unavailable',
      x: D.ERR.provider
    };
    $('reviewBlockBanner').hidden = !block;
    if (block) {
      $('reviewBlockTitle').textContent = block.t;
      $('reviewBlockText').textContent = block.x;
    }
    $('reviewContinueBtn').disabled = !!block;
  }
  function startRateLock() {
    clearInterval(rateTimer);
    var s = 30;
    $('rateCountdown').textContent = '0:30';
    rateTimer = setInterval(function () {
      s--;
      if (s <= 0) {
        s = 30;
        quoteRate = price() * (1 + (Math.random() - 0.5) * 0.0004);
        renderReview();
        return;
      }
      $('rateCountdown').textContent = '0:' + String(s).padStart(2, '0');
    }, 1000);
  }

  /* ── Confirm -> Transaction Tracker -> terminal ── */
  var serverErrShown = false;
  var tracker = null;

  /* DON-HP-03 - the UI must NOT define Huma Points rules. This stands in for the value the
     Huma Points service returns (§7.2 /v1/huma-points/donations/:donationId); it is display only. */
  function hpFromService(usd) {
    if (blocker === 'hp_unavailable') return {
      status: 'unavailable',
      amount: null
    };
    return {
      status: 'estimated',
      amount: Math.round(usd * 0.05 * 1.5 * 10) / 10
    };
  }
  function pointsFor(usd) {
    var r = hpFromService(usd);
    return r.amount;
  }
  function impactFor(c, usd) {
    var hint = null;
    (c.impactHints || []).forEach(function (h) {
      if (usd >= h.amount) hint = h;
    });
    return hint ? hint.impact : null;
  }

  /* Small line-art scenes for the tracker's interactive "closer look" cards (Slack feedback, 28 Aug). */
  var TRK_ART = {
    blocks: '<svg class="txt-media-art" viewBox="0 0 120 48" aria-hidden="true"><rect x="22" y="14" width="20" height="20" rx="4" fill="none" style="stroke:var(--brand-deep-blue,#173d47)" stroke-width="2.5"></rect><rect x="50" y="14" width="20" height="20" rx="4" fill="none" style="stroke:var(--brand-deep-blue,#173d47)" stroke-width="2.5"></rect><rect x="78" y="14" width="20" height="20" rx="4" fill="none" style="stroke:var(--brand-deep-blue,#173d47)" stroke-width="2.5" stroke-dasharray="3 4"></rect></svg>',
    pair: '<svg class="txt-media-art" viewBox="0 0 120 48" aria-hidden="true"><circle cx="49" cy="24" r="15" fill="none" style="stroke:var(--brand-deep-blue,#173d47)" stroke-width="2.5"></circle><circle cx="71" cy="24" r="15" fill="none" style="stroke:var(--fin-up,#1a7a5e)" stroke-width="2.5"></circle></svg>',
    heart: '<svg class="txt-media-art" viewBox="0 0 120 48" aria-hidden="true"><path d="M60 39 L45.5 24.5 a9.5 9.5 0 1 1 14.5-11 a9.5 9.5 0 1 1 14.5 11 Z" fill="none" style="stroke:var(--fin-up,#1a7a5e)" stroke-width="2.5" stroke-linejoin="round"></path></svg>',
    card: '<svg class="txt-media-art" viewBox="0 0 120 48" aria-hidden="true"><rect x="38" y="10" width="44" height="28" rx="5" fill="none" style="stroke:var(--brand-deep-blue,#173d47)" stroke-width="2.5"></rect><line x1="38" y1="19" x2="82" y2="19" style="stroke:var(--brand-deep-blue,#173d47)" stroke-width="2.5"></line></svg>',
    shield: '<svg class="txt-media-art" viewBox="0 0 120 48" aria-hidden="true"><path d="M60 8 l16 6 v10 c0 9-7 15-16 18 c-9-3-16-9-16-18 V14 Z" fill="none" style="stroke:var(--brand-deep-blue,#173d47)" stroke-width="2.5" stroke-linejoin="round"></path><path d="M53 24l5 5 9-9" fill="none" style="stroke:var(--fin-up,#1a7a5e)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
  };
  function trackerConfig(donationId, c, refLabel) {
    var usd = totalUSD();
    var crypto = method === 'crypto';
    var impact = impactFor(c, usd);
    /* DON-CRYPTO-07 - named stages for awaiting signature -> submitted -> awaiting confirmation ->
       (conversion pending, convertible assets only) -> completed. Never show completed before finality. */
    var converts = crypto && quote && quote.converted;
    var settleAs = quote ? quote.settlementAsset : 'USDC';
    /* Slack feedback (Eric, 28 Aug) - the terminal "delivered" stage is merged into the stage before it. */
    var stages = crypto ? [{
      title: 'Waiting for your signature',
      sub: 'Approve in your wallet. Nothing sends until then.'
    }, {
      title: 'Submitted to the network',
      sub: 'Broadcast. Nothing more is needed from you.'
    }].concat(converts ? [{
      title: 'Network confirms your donation',
      sub: 'The blockchain writes it into a block.',
      conf: true
    }, {
      title: 'Converting to ' + settleAs + ', then delivered to the ' + D.SETTLEMENT.multisigLabel,
      sub: 'Your ' + token + ' becomes ' + settleAs + ' at the quoted route. Funds arrive and your receipt is issued.'
    }] : [{
      title: 'Network confirms, then your donation is delivered to the ' + D.SETTLEMENT.multisigLabel,
      sub: 'The blockchain writes it into a block. Funds arrive and your receipt is issued.',
      conf: true
    }]) : [{
      title: 'Payment received',
      sub: 'Your card payment went through.'
    }, {
      title: 'Checks',
      sub: 'Routine safety checks. The part that can take a few minutes.',
      conf: true
    }, {
      title: 'Routed to the settlement account, then delivered',
      sub: "Sent on to this Center's settlement account. Your receipt is issued on arrival."
    }];
    var wait = [];
    if (impact) {
      wait.push({
        eyebrow: 'Your impact',
        title: D.esc(impact),
        body: 'That is what ' + D.fmtUSD(usd, 2) + ' does at ' + D.esc(c.name) + '. It funds ' + D.esc((c.programs || []).slice(0, 2).join(' and ').toLowerCase() || 'its programs') + '.'
      });
    }
    wait.push({
      eyebrow: 'Huma Points',
      title: 'You are earning ≈ ' + pointsFor(usd) + ' Huma Points',
      body: 'Direct gifts earn <strong>1.5×</strong>, recurring <strong>3×</strong>. Points pay up to 60% of platform fees.'
    });
    wait.push({
      eyebrow: 'Where it lands',
      title: D.esc(refLabel),
      body: D.esc(c.desc || 'A Humanity Center in the network.')
    });
    wait.push({
      eyebrow: 'Verified on-chain',
      title: 'Funds arrive instantly. Impact is verified on-chain.',
      body: 'Your receipt ties to the transaction id. Anyone can verify it arrived.'
    });
    return {
      kind: 'donation',
      journey: {
        alt: 'Your donation travelling from your wallet, through the network, to the Humanity Center',
        a: crypto ? 'Your wallet' : 'Your card',
        b: 'Network',
        c: 'Center'
      },
      headline: 'Your donation is on its way',
      eta: crypto ? 'Usually takes 2–5 minutes' : 'This may take a few minutes',
      headlineDelayed: outcome === 'timeout' ? D.ERR.timeout : 'Taking a little longer than usual. Nothing to do.',
      etaDelayed: 'Still working. We will finish this for you',
      headlineFailed: "We couldn't complete this donation",
      etaFailed: 'Nothing left your ' + (crypto ? 'wallet' : 'card') + '. You can safely try again',
      headlineDone: 'Donation delivered. Thank you',
      etaDone: 'Completed',
      delayedCopy: 'Networks get busy. Your donation is safe and still queued. Nothing to resend or pay again.',
      failCopy: crypto ? 'The transaction was reverted before it reached the center. No funds left your wallet.' : 'The payment could not be completed. Your card was not charged.',
      stages: stages,
      confirmations: crypto ? {
        target: 12,
        label: 'Network is double-checking',
        everyMs: 450
      } : null,
      /* Slack feedback (Eric, 28 Aug) - all tracker flows: when the checking stage runs past 12s,
         show something to explore between the network/checks stage and the delivery. */
      interactive: {
        afterMs: 12000,
        label: 'A closer look while you wait',
        frames: crypto ? [{
          art: TRK_ART.blocks,
          title: 'The network is countersigning your donation',
          body: 'Each confirmation is one more block that agrees it happened. Twelve make it final. Busy networks just take longer.'
        }].concat(converts ? [{
          art: TRK_ART.pair,
          title: 'Then it becomes ' + settleAs,
          body: 'Our system converts your ' + token + ' at the best available rate. Automatic.'
        }] : []).concat([{
          art: TRK_ART.heart,
          title: 'Then it reaches ' + D.esc(c.name),
          body: 'Delivered to the ' + D.SETTLEMENT.multisigLabel + '. Your receipt is issued and tied to the transaction id.'
        }]) : [{
          art: TRK_ART.card,
          title: 'Your payment is in',
          body: 'The card charge went through. Nothing more is needed from you.'
        }, {
          art: TRK_ART.shield,
          title: 'Routine checks are running',
          body: 'Automatic safety checks run on every donation. They are the part that can take a few minutes.'
        }, {
          art: TRK_ART.heart,
          title: 'Then it reaches ' + D.esc(c.name),
          body: 'Routed to the settlement account in US dollars. Your receipt is issued on arrival.'
        }]
      },
      reassure: ['<strong>Your money is safe</strong>. The network is slow, not your funds.', "You can leave. We'll notify you when it's done.", 'Nothing to do right now.'],
      wait: wait,
      explain: crypto ? ['You sent your donation to the ' + D.SETTLEMENT.multisigLabel + '. The blockchain now has to agree that it happened, a bit like several banks countersigning the same transfer.', converts ? 'Because you gave ' + token + ', our system then converts it to ' + settleAs + ' automatically at the best available rate. That conversion step is why you may see a "conversion pending" status.' : 'You gave ' + token + ', so no conversion is needed. It goes straight through. Its US dollar value is what we report and what your receipt shows.', 'You do not need to sign anything else, refresh, or resend. If the network is busy it takes a few minutes longer.'] : ['Your card payment has been taken by the payment rail and is being routed to the account configured for donations. Fiat is never converted to crypto.', 'A routine safety check runs on every donation. It is automatic and needs nothing from you.', 'Once it clears, the donation is settled in US dollars and your digital receipt is issued.'],
      facts: ['Donations start at $1. Small, regular giving adds up fastest.', 'The platform fee is free, so your whole gift goes to the center.', 'Every donation is tied to a transaction id, so you can check where it went.', 'Recurring giving earns 3× Huma Points, the highest multiplier on the platform.'],
      support: {
        label: 'Contact support',
        href: 'mailto:support@unera.org'
      },
      trackHref: 'donation-history.html',
      trackLabel: 'Track in donation history',
      retryLabel: 'Start a new donation',
      retryHref: 'donate.html',
      pill: {
        label: 'Donation pending',
        href: '#main-content'
      },
      notify: {
        title: 'Donation pending',
        message: 'Your donation of ' + D.fmtUSD(usd, 2) + ' to ' + refLabel + " is on its way. We'll tell you the moment it lands.",
        ref: 'Ref ' + donationId,
        ctaUrl: 'donate.html',
        ctaLabel: 'View status'
      },
      timings: {
        stages: crypto ? converts ? [2600, 3200, 4200, 4200] : [3200, 4200, 6200] : [3200, 4200, 4200]
      },
      onFinish: function (res) {
        if (res === 'failed') {
          var failKind = ['pay_failed', 'expired', 'rejected', 'reverted'].indexOf(outcome) !== -1 ? outcome : method === 'fiat' ? 'pay_failed' : 'reverted';
          terminal(failKind, donationId);
        } else if (outcome === 'conversion') {
          terminal('conversion', donationId);
        } else {
          terminal('success', donationId);
        }
      }
    };
  }
  function confirmDonation() {
    clearInterval(rateTimer);
    if (method === 'crypto' && blocker === 'server' && !serverErrShown) {
      serverErrShown = true;
      $('reviewBlockBanner').hidden = false;
      /* §6.3 verbatim */
      $('reviewBlockTitle').textContent = D.ERR.reverted;
      $('reviewBlockText').textContent = 'Nothing was charged and nothing left your wallet.';
      $('reviewContinueBtn').textContent = 'Retry';
      return;
    }
    $('reviewBlockBanner').hidden = true;
    var donationId = 'DON-' + Math.floor(100000 + Math.random() * 899999);
    var c = D.getCentre(selected[0]);
    var refLabel = multi ? selected.length + ' centers' : c.name;
    var origin = method === 'fiat' ? ccy === 'USD' ? D.fmtUSD(totalUSD(), 2) : D.fmtCcy(ccy, totalTokenAmount()) + ' ' + ccy + ' (≈ ' + D.fmtUSD(totalUSD(), 2) + ')' : totalTokenAmount() + ' ' + token + ' (≈ ' + D.fmtUSD(totalUSD(), 2) + ')';
    /* §4.3 notification events - submitted, then awaiting confirmation. */
    D.notifyDonation('info', 'Donation submitted', 'Your donation of ' + origin + ' to ' + refLabel + ' was submitted. Total charged ' + D.fmtUSD(totalChargedUSD(), 2) + '.', 'Ref ' + donationId);
    setTimeout(function () {
      D.notifyDonation('progressing', 'Donation awaiting confirmation', 'We are waiting for final confirmation of your donation to ' + refLabel + '. Nothing is needed from you.', 'Ref ' + donationId, 'donate.html', 'View status');
    }, 1400);
    goToStep(4, {
      processing: true
    });
    if (tracker) tracker.destroy();
    tracker = window.TxTracker.mount(document.getElementById('txTrackerMount'), trackerConfig(donationId, c, refLabel));

    // Map the page's outcome demo pills onto the tracker's states.
    /* 'conversion' runs the full stage list (including "Converting to USDC/USDT") and then resolves
       into the conversion-pending terminal, so the Swap Worker step is visible end to end. */
    if (outcome === 'awaiting' || outcome === 'timeout') setTimeout(function () {
      tracker.setOutcome('delayed');
    }, 900);else if (['pay_failed', 'expired', 'rejected', 'reverted'].indexOf(outcome) !== -1) setTimeout(function () {
      tracker.setOutcome('failed');
    }, 2600);
  }
  function explorerLink(hash) {
    return '<a href="https://sepolia.etherscan.io/tx/' + hash + '" target="_blank" rel="noopener">' + D.shortHash(hash) + '</a>';
  }
  function fakeHash() {
    var s = '0x';
    var h = '0123456789abcdef';
    for (var i = 0; i < 64; i++) s += h[Math.floor(Math.random() * 16)];
    return s;
  }
  function detailRow(l, v) {
    return '<div class="success-detail-row"><span class="success-detail-label">' + l + '</span><span class="success-detail-value">' + v + '</span></div>';
  }
  function terminal(kind, donationId) {
    if (window.TxTracker && window.TxTracker.pill) window.TxTracker.pill.stop();
    var amt = totalTokenAmount(),
      usd = totalUSD();
    var c = D.getCentre(selected[0]);
    var centreLabel = multi ? selected.map(function (id) {
      var a = parseFloat(alloc[id]) || 0;
      return D.esc(D.getCentre(id).name) + ' · ' + a.toLocaleString('en-US', {
        maximumFractionDigits: 4
      }) + ' ' + token + ' · ≈ ' + D.fmtUSD(a * quoteRate, 2);
    }).join('<br>') : D.esc(c.name);
    var hash = method === 'crypto' ? fakeHash() : null;
    var hp = hpFromService(usd);
    var settleAsset = method === 'crypto' ? quote ? quote.settlementAsset : token : 'USD';
    var html = '';
    if (kind === 'bank_pending') {
      /* DON-FIAT-05 pending_payment + Kevin's expiration rule. The user still has to make the transfer. */
      var bk = D.SETTLEMENT.bank;
      var expires = new Date(Date.now() + bk.expiryHours * 36e5);
      var xfer = ccy === 'USD' ? D.fmtUSD(totalChargedUSD(), 2) : D.fmtCcy(ccy, totalChargedUSD() / ccyInfo().rate) + ' ' + ccy;
      html = terminalShell('pending', 'Waiting for your bank transfer', 'Transfer ' + xfer + ' to the account below and include the reference. Your donation completes once the transfer arrives, which can take a few days.', detailRow('Donation ID', donationId) + detailRow('Status', D.statusChip('pending_payment')) + detailRow(multi ? 'Humanity Centers' : 'Humanity Center', centreLabel) + detailRow('Donation amount (USD)', D.fmtUSD(usd, 2)) + detailRow('Platform fee', '<span style="color:var(--fin-up);font-weight:700;letter-spacing:0.04em;">FREE</span>') + detailRow('Total to transfer', xfer) + detailRow('Account holder', D.esc(bk.holder)) + detailRow('Bank', D.esc(bk.bankName)) + detailRow('IBAN', '<span class="success-detail-value mono">' + bk.iban + '</span>') + detailRow('BIC', '<span class="success-detail-value mono">' + bk.bic + '</span>') + detailRow('Reference', '<span class="success-detail-value mono">' + donationId + '</span>') + detailRow('Expires', D.fmtDate(expires.toISOString())), '<a href="donation-history.html" class="btn btn-secondary">Track in donation history</a><a href="donations.html" class="btn btn-primary">Back to Donations</a>');
      renderTerminal(html, {});
      return;
    }
    if (kind === 'conversion') {
      /* DON-CRYPTO-07 §6.3 - conversion pending. Never labelled completed. */
      D.notifyDonation('progressing', 'Donation awaiting confirmation', D.ERR.converting, 'Ref ' + donationId, 'donation-history.html', 'Track donation');
      html = terminalShell('pending', 'Conversion in progress', D.ERR.converting, detailRow('Donation ID', donationId) + detailRow('Status', D.statusChip('conversion_pending')) + detailRow(multi ? 'Humanity Centers' : 'Humanity Center', centreLabel) + detailRow('You donated', amt.toLocaleString('en-US', {
        maximumFractionDigits: 6
      }) + ' ' + token) + detailRow('USD quote', D.fmtUSD(usd, 2)) + detailRow('Converting to', settleAsset + ' <span class="summary-row-note">Crypto Swap Worker</span>')
      /* Kevin, 28 Aug - no Destination row on terminals either. */ + (hash ? detailRow('Transaction', '<span class="success-detail-value mono">' + explorerLink(hash) + '</span>') : '') + detailRow('Huma Points', hp.amount == null ? D.hpChip('unavailable') : '<span style="display:inline-flex;flex-direction:column;align-items:flex-end;gap:0.3rem;"><span>≈ ' + hp.amount + ' Huma Points</span>' + D.hpChip('estimated') + '</span>'), '<a href="donation-history.html" class="btn btn-secondary">Track in donation history</a><a href="donations.html" class="btn btn-primary">Back to Donations</a>');
      renderTerminal(html, {});
      return;
    }
    if (kind === 'success') {
      D.notifyDonation('completed', 'Donation completed', 'Your donation of ' + D.fmtUSD(usd, 2) + ' to ' + (multi ? selected.length + ' centers' : c.name) + ' is confirmed. Thank you.', 'Ref ' + donationId);
      setTimeout(function () {
        D.notifyDonation('completed', 'Huma Points updated', hp.amount == null ? 'Huma Points state for this donation is unavailable right now.' : 'Your Huma Points for this donation moved to confirmed: ' + hp.amount + ' Huma Points.', 'Ref ' + donationId, 'donations.html', 'View impact');
      }, 3800);
      html = '<div class="amount-section terminal-state flow-card-animated">' + '<div class="success-icon-animated"><svg class="unera-checkmark" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg>' + '<div class="lightning-badge"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m320-80 40-280H160l360-520h80l-40 320h240L400-80h-80Z"/></svg></div></div>' + '<h2 class="terminal-title success" tabindex="-1" id="terminalHeading">Donation complete. Thank you.</h2>'
      /* Kevin, 28 Aug - destination details are not shown; donors can assume it reaches the right account for the center. */ + '<p class="terminal-sub">' + (method === 'crypto' ? quote && quote.converted ? 'Your ' + token + ' was converted to ' + settleAsset + ' and routed to ' + (multi ? 'the centers' : 'the center') + '.' : 'Your ' + token + ' was routed to ' + (multi ? 'the centers' : 'the center') + '.' : 'Your payment was routed to ' + (multi ? 'the centers' : 'the center') + '.') + '</p>' + '<div class="success-details">' + detailRow('Donation ID', donationId) + detailRow('Date', D.fmtDate(new Date().toISOString())) + detailRow('Status', D.statusChip('completed')) + detailRow(multi ? 'Humanity Centers' : 'Humanity Center', centreLabel) + detailRow('Source', method === 'fiat' ? 'Fiat · ' + (rail === 'card' ? 'card' : 'bank transfer') : 'Crypto · ' + token) + (method === 'fiat' && getCard(cardId) ? detailRow('Card', D.esc(cardLabel(getCard(cardId)))) : '') + (method === 'fiat' && ccy !== 'USD' ? detailRow('Original amount', D.fmtCcy(ccy, amt) + ' ' + ccy + ' · rate 1 ' + ccy + ' = ' + D.fmtUSD(ccyInfo().rate, 4)) : '') + (method === 'crypto' ? detailRow('You donated', amt.toLocaleString('en-US', {
        maximumFractionDigits: 6
      }) + ' ' + token) : '') + detailRow('Donation amount (USD)', '<span style="color:var(--fin-up);font-weight:700;">' + D.fmtUSD(usd, 2) + '</span>') + detailRow('Platform fee', '<span style="color:var(--fin-up);font-weight:700;letter-spacing:0.04em;">FREE</span>') + (convFeeUSD() ? detailRow('Conversion fee', D.fmtUSD(convFeeUSD(), 2)) : '') + detailRow('Total charged', D.fmtUSD(totalChargedUSD(), 2)) + detailRow('Settlement asset', settleAsset) + (hash ? detailRow('Transaction', '<span class="success-detail-value mono">' + explorerLink(hash) + '</span>') : '')
      /* Eric, 3 Sep - amount on one line, the status chip on a second line, both right-aligned. */ + detailRow('Huma Points', hp.amount == null ? D.hpChip('unavailable') : '<span style="display:inline-flex;flex-direction:column;align-items:flex-end;gap:0.3rem;"><span>≈ ' + hp.amount + ' Huma Points</span>' + D.hpChip('estimated') + '</span>') + '</div>' + '<div class="btn-actions"><a href="donation-history.html" class="btn btn-secondary">View donation history</a><a href="explore-centres.html" class="btn btn-primary">Back to centers</a></div>' + '</div>';
      renderTerminal(html, {
        allDone: true
      });
      return;
    }
    if (kind === 'awaiting' || kind === 'timeout') {
      var subCopy = kind === 'timeout' ? D.ERR.timeout + ' Your donation stays safely pending and you can leave this page.' : method === 'crypto' ? "Your transaction was submitted. We'll notify you as soon as it's confirmed on-chain and converted to USD. You can leave this page safely." : "Your payment was received. We'll notify you as soon as the donation is confirmed and routed to the center. You can leave this page safely.";
      html = terminalShell('pending', kind === 'timeout' ? 'Still Waiting for Confirmation' : 'Donation Awaiting Confirmation', subCopy, detailRow('Donation ID', donationId) + detailRow('Status', D.statusChip('awaiting_confirmation')) + detailRow(multi ? 'Humanity Centers' : 'Humanity Center', centreLabel) + detailRow('Amount', method === 'fiat' ? D.fmtUSD(usd, 2) : amt + ' ' + token + ' · ≈ ' + D.fmtUSD(usd, 2)) + (hash ? detailRow('Transaction', '<span class="success-detail-value mono">' + explorerLink(hash) + '</span>') : ''), '<button type="button" class="btn btn-secondary" id="refreshStatusBtn">Refresh status</button><a href="donation-history.html" class="btn btn-secondary">Track in history</a><a href="donations.html" class="btn btn-primary">Back to Donations</a>');
      renderTerminal(html, {});
      var rb = $('refreshStatusBtn');
      if (rb) rb.addEventListener('click', function () {
        rb.disabled = true;
        rb.textContent = 'Checking…';
        setTimeout(function () {
          outcome = 'success';
          terminal('success', donationId);
        }, 1200);
      });
      return;
    }
    /* §6.3 - the `x` strings below are the spec's user messages, verbatim; any reassurance is appended after. */
    var fails = {
      pay_failed: {
        t: "We couldn't process the payment",
        x: D.ERR.provider,
        extra: 'Your card was not charged. You can try again or use a different card.',
        notify: true
      },
      expired: {
        t: 'This donation request expired',
        x: D.ERR.expired,
        extra: 'Nothing was charged.',
        notify: true
      },
      reverted: {
        t: "Donation couldn't be completed",
        x: D.ERR.reverted,
        extra: 'The transaction was reverted and no funds reached the Humanity Center.',
        notify: true
      },
      rejected: {
        t: 'Donation not submitted',
        x: D.ERR.rejected,
        extra: 'Nothing left your wallet.',
        notify: false
      }
    };
    var f = fails[kind];
    if (f.notify) D.notifyDonation('error', 'Donation failed', f.x, 'Ref ' + donationId, 'donate.html', 'Try again');
    /* Renol, 4 Sep - failed fiat payments retry on the Payment step; the reviewed order is kept. */
    var canRetryPay = method === 'fiat' && (kind === 'pay_failed' || kind === 'expired');
    var failActions = '<a href="explore-centres.html" class="btn btn-secondary">Back to centers</a>' + (canRetryPay ? '<button type="button" class="btn btn-primary" id="payAgainBtn">Try payment again</button>' : '<button type="button" class="btn btn-primary" onclick="location.reload()">Try again</button>');
    html = terminalShell(kind === 'rejected' ? 'pending' : 'fail', f.t, f.x + ' ' + f.extra + (f.notify ? ' If this keeps happening, contact support.' : ''), detailRow('Donation ID', donationId) + detailRow('Status', D.statusChip(kind === 'expired' ? 'expired' : kind === 'rejected' ? 'rejected' : 'failed')) + detailRow(multi ? 'Humanity Centers' : 'Humanity Center', centreLabel), failActions);
    renderTerminal(html, {
      fail: true
    });
    var pab = $('payAgainBtn');
    if (pab) pab.addEventListener('click', function () {
      serverErrShown = false;
      renderPay();
      showPayErr(f.t, f.x + ' ' + f.extra);
      goToStep(4);
    });
  }
  function terminalShell(icon, title, sub, rows, actions) {
    var iconHtml = icon === 'fail' ? '<div class="fail-icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg></div>' : '<div class="pending-icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm112-192 56-56-148-148v-184h-80v216l172 172Z"/></svg></div>';
    return '<div class="amount-section terminal-state flow-card-animated">' + iconHtml + '<h2 class="terminal-title" tabindex="-1" id="terminalHeading">' + title + '</h2>' + '<p class="terminal-sub">' + sub + '</p>' + '<div class="success-details">' + rows + '</div>' + '<div class="btn-actions">' + actions + '</div></div>';
  }
  function renderTerminal(html, opts) {
    $('step5').innerHTML = html;
    goToStep(5, {
      allDone: !!opts.allDone,
      fail: !!opts.fail
    });
    var h = $('terminalHeading');
    if (h) h.focus();
  }

  /* ── STEP 4: payment (Eric, 1 Sep - review the order, process payment, done) ── */
  var payDonationId = null;
  function showPayErr(title, text) {
    $('payErrTitle').textContent = title;
    $('payErrText').textContent = text;
    $('payErrBanner').hidden = false;
  }
  function renderPay() {
    $('payErrBanner').hidden = true;
    var isCard = rail === 'card';
    $('payCardWrap').hidden = !isCard;
    $('payBankWrap').hidden = isCard;
    $('payTitle').textContent = isCard ? 'Pay by card' : 'Make your bank transfer';
    $('confirmBtn').textContent = isCard ? 'Pay ' + D.fmtUSD(totalChargedUSD(), 2) : "I've started the transfer";
    if (isCard) {
      renderCards();
      var cvEl = document.getElementById('donCvv');
      if (cvEl) cvEl.value = '';
      updateDonCvv();
      $('payCardSummary').innerHTML = row('Donation amount (USD)', D.fmtUSD(totalUSD(), 2)) + row('Platform fee', '<span style="color:var(--fin-up);font-weight:700;letter-spacing:0.04em;">FREE</span>') + row('Total charged', D.fmtUSD(totalChargedUSD(), 2), {
        total: true
      });
    } else {
      var bk = D.SETTLEMENT.bank;
      var xfer = ccy === 'USD' ? D.fmtUSD(totalChargedUSD(), 2) : D.fmtCcy(ccy, totalChargedUSD() / ccyInfo().rate) + ' ' + ccy;
      var expires = new Date(Date.now() + bk.expiryHours * 36e5);
      $('payBankRows').innerHTML = row('You transfer', xfer, {
        total: true
      }) + row('Account holder', D.esc(bk.holder)) + row('Bank', D.esc(bk.bankName)) + row('IBAN', bk.iban, {
        mono: true
      }) + row('BIC', bk.bic, {
        mono: true
      }) + row('Reference', payDonationId + '<span class="summary-row-note">Include it so we can match your transfer.</span>', {
        mono: true
      }) + row('Expires', D.fmtDate(expires.toISOString()) + '<span class="summary-row-note">The order expires if the transfer has not arrived by then.</span>');
    }
  }
  /* Eric, 4 Sep - saved-card reuse re-enters the CVV before charging, same rule as the buy checkout. In-memory only. */
  function updateDonCvv() {
    var w = document.getElementById('donCvvWrap');
    if (!w) return;
    w.hidden = !cardId;
    var cv = document.getElementById('donCvv');
    if (cv && !cv._wired) {
      cv._wired = true;
      cv.addEventListener('input', function () {
        cv.value = cv.value.replace(/\D/g, '').slice(0, 4);
      });
    }
  }
  function payNow() {
    if (method !== 'fiat') return;
    var c = D.getCentre(selected[0]);
    var refLabel = multi ? selected.length + ' centers' : c.name;
    if (rail === 'card') {
      if (!cardId) {
        showPayErr('Add a payment card', 'You need a saved card to donate by card. Add one under Payment methods, then come back to this step.');
        return;
      }
      var cv = document.getElementById('donCvv');
      if (cv && cv.value.replace(/\D/g, '').length < 3) {
        showPayErr('Enter your card security code', 'Type the 3 or 4 digit CVV from the back of your card. We never store it.');
        cv.focus();
        return;
      }
      $('payErrBanner').hidden = true;
      if (blocker === 'server' && !serverErrShown) {
        serverErrShown = true;
        showPayErr(D.ERR.reverted, 'Nothing was charged. You can retry the payment.');
        $('confirmBtn').textContent = 'Retry payment';
        return;
      }
      confirmDonation();
    } else {
      var origin = ccy === 'USD' ? D.fmtUSD(totalUSD(), 2) : D.fmtCcy(ccy, totalTokenAmount()) + ' ' + ccy + ' (\u2248 ' + D.fmtUSD(totalUSD(), 2) + ')';
      /* FE-208 (Eric, 24 Aug) - bank transfer: no charge happens here; the order waits for the transfer. */
      D.notifyDonation('info', 'Donation submitted', 'Your bank-transfer donation of ' + origin + ' to ' + refLabel + ' was created. Transfer within ' + D.SETTLEMENT.bank.expiryHours + ' hours to complete it.', 'Ref ' + payDonationId);
      terminal('bank_pending', payDonationId);
    }
  }

  /* ── Wire steps ── */
  $('toStep2').addEventListener('click', function () {
    renderAmountUI();
    goToStep(2);
  });
  $('backTo1').addEventListener('click', function () {
    goToStep(1);
  });
  $('toStep3').addEventListener('click', function () {
    if (method === 'crypto' && !D.is('wallet')) {
      $('gateWallet').hidden = false;
      return;
    }
    if (!validateAmount()) return;
    renderReview();
    goToStep(3);
  });
  $('backTo2').addEventListener('click', function () {
    clearInterval(rateTimer);
    serverErrShown = false;
    payDonationId = null;
    goToStep(2);
  });
  $('reviewContinueBtn').addEventListener('click', function () {
    if (method === 'crypto') {
      confirmDonation();
      return;
    }
    if (!payDonationId) payDonationId = 'DON-' + Math.floor(100000 + Math.random() * 899999);
    renderPay();
    goToStep(4);
  });
  $('backTo3').addEventListener('click', function () {
    $('payErrBanner').hidden = true;
    renderReview();
    goToStep(3);
  });
  $('confirmBtn').addEventListener('click', function () {
    payNow();
  });
  $('amountInput').addEventListener('input', updateAmountLive);

  /* ── Init ── */
  D.onUserState(function () {
    renderGates();
    renderAmountUI();
  });
  D.renderStatePills('userStatePills');
  pillGroup('outcomePills', OUTCOMES, function () {
    return outcome;
  }, function (v) {
    outcome = v;
  });
  pillGroup('blockerPills', BLOCKERS, function () {
    return blocker;
  }, function (v) {
    blocker = v;
    /* §6.2 Unavailable / maintenance - neutral banner, affected actions disabled. */
    $('serviceBanner').hidden = v !== 'unavailable';
    $('toStep3').disabled = v === 'unavailable';
    if (currentStep === 2) renderAmountUI();
    if (currentStep === 3) renderReview();
  });
  renderGates();
  renderCurrencies();
  if (centreSearchEl) centreSearchEl.value = ''; // ignore any browser form-restore on reload
  centreQuery = '';
  renderCentres();
  renderTokens();
  renderAmountUI();
  /* Slack feedback (Kevin, 28 Aug) - the dashboard shortcut passes ?amt=; center cards pass ?step=2.
     Either one skips step 1 when an active center is prefilled; a valid amt also prefills the field. */
  var preAmt = parseFloat(D.qs('amt'));
  var amtOk = !isNaN(preAmt) && preAmt >= MIN_USD && preAmt <= MAX_USD;
  if (selected.length && !preBlocked && (amtOk || D.qs('step') === '2')) {
    if (amtOk) $('amountInput').value = preAmt;
    updateAmountLive();
    goToStep(2);
  }
  if (preBlocked) {
    $('preBlockedBanner').hidden = false;
    $('preBlockedTitle').textContent = D.getCentre(preId).name + ' is not accepting new donations';
  }
  var centresLink = document.getElementById('navLinkDashboard');
  if (centresLink) centresLink.classList.add('active');
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/donate-flow.js", error: String((e && e.message) || e) }); }

// unera-pages/donation-data.js
try { (() => {
/* Huma - Humanity Centers & Donation shared prototype data + user-state module.
   PRD: docs "Huma - Humanity Centers & Donation". Prototype-only; demo state is in-memory (never persisted). */
(function () {
  'use strict';

  var CENTERS = [{
    id: 'hc-nairobi',
    name: 'Kibera Community Center',
    country: 'Kenya',
    region: 'Africa',
    active: true,
    desc: 'Clean water access, primary education and school meals for families in Kibera, Nairobi.',
    programs: ['Clean Water Access', 'Primary Education', 'School Meals'],
    wallet: '0x8F3a41c29bD04c1a7E5590F21B4E6cD8a94A7B75',
    charityRegNo: 'KE-NGO-2021-04418',
    founded: 2018,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80'],
    about: 'Kibera Community Center provides quality education, clean water access and daily school meals to more than 500 children in Africa\u2019s largest informal settlement. The center pairs classroom learning with family counselling and community-led water infrastructure, so progress made in school is backed up at home.',
    programsDetail: [{
      name: 'Clean Water Access',
      desc: 'Community water kiosks and household filters serving 1,200 families.',
      cost: '≈ $9 / month per family'
    }, {
      name: 'Primary Education',
      desc: 'Classroom teaching, books and supplies for 540 enrolled children.',
      cost: '≈ $28 / month per child'
    }, {
      name: 'School Meals',
      desc: 'A hot lunch every school day. Attendance is up 22% since launch.',
      cost: '≈ $15 / month per child'
    }],
    impactHints: [{
      amount: 25,
      impact: 'Feeds 2 children for a week'
    }, {
      amount: 50,
      impact: 'School supplies for 5 children'
    }, {
      amount: 100,
      impact: 'Safe water for 3 families for a month'
    }, {
      amount: 250,
      impact: 'A teacher\u2019s monthly salary'
    }],
    lead: "In Nairobi's Kibera settlement, a school place and a clean cup of water can change the whole arc of a child's life. Your gift funds classrooms, household water filters and a hot daily meal for more than 500 children, and keeps families together while the progress made at school is backed up at home.",
    story: {
      name: "Amina, age 9",
      text: "Amina used to miss a day of school each week queuing for water. A household filter and a daily lunch changed that. She now has full attendance and reads a grade above her age. Because of donors like you, her younger brother just enrolled too."
    },
    outcomes: [{
      value: "94%",
      label: "daily attendance, up from 71%"
    }, {
      value: "1,200",
      label: "families with safe water"
    }, {
      value: "540",
      label: "children in full-time school"
    }],
    testimonial: {
      quote: "My children eat, they learn, and they are safe. That is everything.",
      who: "Grace, parent and community water steward"
    },
    galleryCaptions: ["A community water kiosk serving Kibera households", "A primary classroom in session", "A hot school lunch, served every school day"],
    need: "Kibera is one of Africa's largest informal settlements. Many children miss school to queue for water, and a single illness can undo a year of hard-won progress.",
    fundUse: [{
      label: "Classrooms, books & teachers",
      pct: 42
    }, {
      label: "Clean-water infrastructure",
      pct: 30
    }, {
      label: "Daily school meals",
      pct: 18
    }, {
      label: "Admin & independent audit",
      pct: 10
    }],
    milestones: [{
      year: "2018",
      text: "Center founded; the first 120 children enroll."
    }, {
      year: "2020",
      text: "Community water kiosks reach 1,200 families."
    }, {
      year: "2023",
      text: "Daily meals launch; attendance climbs to 94%."
    }, {
      year: "2025",
      text: "540 children are now in full-time school."
    }],
    update: {
      date: "May 2026",
      text: "Two new household-filter distribution points opened, cutting average water-collection time in half."
    },
    galleryCaptions2: ["Children reading in the library corner", "A family counselling session", "The center kitchen preparing lunch"],
    totalDonatedUSD: 412580,
    livesImpacted: 12840,
    donorCount: 3120,
    tint: '#1e4e5a',
    initials: 'KC',
    stats: {
      day: 1240,
      week: 9180,
      month: 36420,
      year: 297500
    }
  }, {
    id: 'hc-manila',
    name: 'Tondo Youth Center',
    country: 'Philippines',
    region: 'Asia',
    active: true,
    desc: 'Vocational training, youth mentorship and disaster-relief readiness in Tondo, Manila.',
    programs: ['Vocational Training', 'Youth Mentorship', 'Disaster Relief'],
    wallet: '0x2B91e07dAcC34f8b1D6a8830fE29C551Aa10D4e2',
    charityRegNo: 'PH-SEC-CN-201903442',
    founded: 2016,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80'],
    about: 'Tondo Youth Center helps young people in Manila\u2019s Tondo district move from precarious work into stable trades. Vocational workshops, one-to-one mentorship and typhoon-readiness training have reached more than 800 youth since 2016.',
    programsDetail: [{
      name: 'Vocational Training',
      desc: 'Carpentry, tailoring and digital-skills workshops with certified instructors.',
      cost: '≈ $35 / month per youth'
    }, {
      name: 'Youth Mentorship',
      desc: 'One-to-one mentoring. 120 active mentor pairs across the district.',
      cost: '≈ $18 / month per youth'
    }, {
      name: 'Disaster Relief',
      desc: 'Typhoon-readiness kits, drills and rapid-response supplies.',
      cost: '≈ $10 / month per family'
    }],
    impactHints: [{
      amount: 25,
      impact: 'Tool kit for 1 trainee'
    }, {
      amount: 50,
      impact: 'Skills training for 2 youth'
    }, {
      amount: 100,
      impact: 'A month of mentorship for 5 pairs'
    }, {
      amount: 250,
      impact: 'A full vocational course for 1 youth'
    }],
    lead: "In Manila's Tondo district, a trade and a mentor can move a young person from day-to-day survival into steady work. Your gift funds certified workshops, one-to-one mentoring and typhoon-readiness for young people ready to build a different future. More than 800 have come through since 2016.",
    story: {
      name: "Mark, age 19",
      text: "Mark left school at 15 to scavenge alongside his family. He enrolled in the center's carpentry track, was paired with a mentor, and earned a national skills certificate within a year. He now apprentices at a furniture workshop and mentors two younger trainees himself. Your gift keeps that pipeline open."
    },
    outcomes: [{
      value: "73%",
      label: "graduates in stable work or study"
    }, {
      value: "120",
      label: "active mentor pairs"
    }, {
      value: "800+",
      label: "youth reached since 2016"
    }],
    testimonial: {
      quote: "I came here with nothing but time. I left with a trade and someone who believed in me.",
      who: "Mark, carpentry graduate and peer mentor"
    },
    galleryCaptions: ["A certified carpentry workshop in session", "A mentor and trainee reviewing a project", "A typhoon-readiness drill with local families"],
    need: "Tondo is one of Manila's most densely populated districts, where many young people leave school early to earn on the streets. Without a trade or a mentor, that first job is too often their last step up.",
    fundUse: [{
      label: "Certified workshops & tools",
      pct: 45
    }, {
      label: "One-to-one mentorship",
      pct: 27
    }, {
      label: "Typhoon-readiness",
      pct: 16
    }, {
      label: "Admin & independent audit",
      pct: 12
    }],
    milestones: [{
      year: "2016",
      text: "Center opens with a single carpentry workshop and 40 trainees."
    }, {
      year: "2019",
      text: "Mentorship program launches; the first 100 graduates are certified."
    }, {
      year: "2022",
      text: "Typhoon-readiness added; the 800th young person enrolls."
    }, {
      year: "2025",
      text: "73% of graduates are now in stable work or further study."
    }],
    update: {
      date: "June 2026",
      text: "A new welding bay opened this month, adding 24 training places and a fourth certified trade."
    },
    galleryCaptions2: ["Graduates at a certification ceremony", "The tool library trainees borrow from", "A finished piece from the furniture workshop"],
    totalDonatedUSD: 268340,
    livesImpacted: 8420,
    donorCount: 2210,
    tint: '#2e6374',
    initials: 'TY',
    stats: {
      day: 860,
      week: 5940,
      month: 24710,
      year: 201800
    }
  }, {
    id: 'hc-lapaz',
    name: 'El Alto Family Center',
    country: 'Bolivia',
    region: 'South America',
    active: true,
    desc: 'Family health services, childcare and nutrition programs serving El Alto, La Paz.',
    programs: ['Family Health', 'Childcare', 'Nutrition'],
    wallet: '0x6Cd20A18fE934B2a0C7719D45Fb08E63B21C99a4',
    charityRegNo: null,
    founded: 2019,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80'],
    about: 'El Alto Family Center brings primary health services, licensed childcare and nutrition programs to families at 4,000 m in Bolivia\u2019s fastest-growing city. Mobile clinics reach neighbourhoods that have no permanent health post.',
    programsDetail: [{
      name: 'Family Health',
      desc: 'Mobile clinics offering checkups, vaccinations and referrals.',
      cost: '≈ $12 / month per family'
    }, {
      name: 'Childcare',
      desc: 'Licensed day care so parents can work. 180 places.',
      cost: '≈ $20 / month per child'
    }, {
      name: 'Nutrition',
      desc: 'Fortified meals and monthly growth monitoring for under-fives.',
      cost: '≈ $14 / month per child'
    }],
    impactHints: [{
      amount: 25,
      impact: 'Health checkups for 2 families'
    }, {
      amount: 50,
      impact: 'A week of day care for 3 children'
    }, {
      amount: 100,
      impact: 'A month of nutrition for 7 children'
    }, {
      amount: 250,
      impact: 'A full mobile-clinic day'
    }],
    lead: "At 4,000 metres in Bolivia's fastest-growing city, many El Alto neighbourhoods have no permanent health post. Your gift puts mobile clinics on the road, licensed childcare within reach of working parents, and fortified meals in front of under-fives at the moment they need them most.",
    story: {
      name: "Lucia, mother of two",
      text: "Lucia skipped checkups because the nearest clinic was a two-hour round trip. When the mobile clinic reached her block, both her children were vaccinated and enrolled in growth monitoring; her youngest has since recovered from early malnutrition. Day care now lets her work without leaving them behind."
    },
    outcomes: [{
      value: "180",
      label: "childcare places for working parents"
    }, {
      value: "3,400",
      label: "clinic visits a year"
    }, {
      value: "96%",
      label: "of under-fives on track for growth"
    }],
    testimonial: {
      quote: "The clinic came to us. For the first time, my children see a doctor before they are sick.",
      who: "Lucia, El Alto resident"
    },
    galleryCaptions: ["A mobile clinic day in an El Alto neighbourhood", "Licensed childcare so parents can work", "Monthly growth monitoring for under-fives"],
    need: "El Alto sits at 4,000 metres and grows faster than its clinics can keep up. For many families, the nearest doctor is a two-hour round trip away.",
    fundUse: [{
      label: "Mobile clinics & medicine",
      pct: 46
    }, {
      label: "Licensed childcare",
      pct: 24
    }, {
      label: "Nutrition & growth monitoring",
      pct: 20
    }, {
      label: "Admin & independent audit",
      pct: 10
    }],
    milestones: [{
      year: "2019",
      text: "Center opens; the first mobile-clinic route launches."
    }, {
      year: "2021",
      text: "Licensed day care opens with 180 places."
    }, {
      year: "2023",
      text: "Nutrition program reaches every under-five on the route."
    }, {
      year: "2025",
      text: "3,400 clinic visits delivered in a single year."
    }],
    update: {
      date: "June 2026",
      text: "A second mobile clinic joined the fleet, adding three new neighbourhoods to the weekly route."
    },
    galleryCaptions2: ["A nurse checking a newborn", "Parents at a nutrition workshop", "The childcare play area"],
    totalDonatedUSD: 189220,
    livesImpacted: 5310,
    donorCount: 1480,
    tint: '#3d6b78',
    initials: 'EA',
    stats: {
      day: 410,
      week: 3260,
      month: 15980,
      year: 141200
    }
  }, {
    id: 'hc-colombo',
    name: 'Colombo Coastal Center',
    country: 'Sri Lanka',
    region: 'Asia',
    active: true,
    desc: 'Coastal livelihood support, fisheries training and flood response on the Colombo coast.',
    programs: ['Livelihood Support', 'Fisheries Training', 'Flood Response'],
    wallet: '0x91Ee5D0cB2A44a6f8C3D9761aE00B94Dd82F16c8',
    charityRegNo: 'LK-NGO-11-0842',
    founded: 2017,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80'],
    about: 'Colombo Coastal Center supports fishing families on Sri Lanka\u2019s west coast with livelihood grants, sustainable-fisheries training and rapid flood response. After the 2024 floods the center helped rebuild 60 homes and restore 200 livelihoods.',
    programsDetail: [{
      name: 'Livelihood Support',
      desc: 'Micro-grants that keep fishing families working through lean seasons.',
      cost: '≈ $30 / month per family'
    }, {
      name: 'Fisheries Training',
      desc: 'Sustainable-catch methods and boat-safety certification.',
      cost: '≈ $22 / month per trainee'
    }, {
      name: 'Flood Response',
      desc: 'Early-warning network and pre-positioned relief stock.',
      cost: '≈ $8 / month per family'
    }],
    impactHints: [{
      amount: 25,
      impact: 'Repairs one fishing net'
    }, {
      amount: 50,
      impact: 'Safety gear for 2 boat crews'
    }, {
      amount: 100,
      impact: 'A livelihood grant instalment'
    }, {
      amount: 250,
      impact: 'Flood kits for 10 families'
    }],
    lead: "On Sri Lanka's west coast, a single storm can wipe out a fishing family's livelihood overnight. Your gift funds micro-grants that keep boats working through lean seasons, sustainable-catch training, and an early-warning network that gets families to safety before the water rises.",
    story: {
      name: "Nuwan, fisherman",
      text: "After the 2024 floods, Nuwan lost his nets and half his season. A livelihood grant and new safety gear got him back on the water within weeks; he has since trained in sustainable methods that raised both his catch and his income. Sixty homes and 200 livelihoods were rebuilt alongside his."
    },
    outcomes: [{
      value: "200",
      label: "livelihoods restored after the 2024 floods"
    }, {
      value: "60",
      label: "homes rebuilt"
    }, {
      value: "100%",
      label: "of boat crews safety-certified"
    }],
    testimonial: {
      quote: "They did not just give us relief. They gave us our work back.",
      who: "Nuwan, fishing-cooperative member"
    },
    galleryCaptions: ["A fishing family back at work after a livelihood grant", "Boat-safety and sustainable-catch training", "Pre-positioned flood-relief supplies"],
    need: "On Sri Lanka's west coast, fishing families live one storm away from losing everything. When the 2024 floods hit, hundreds lost boats, nets and homes overnight.",
    fundUse: [{
      label: "Livelihood micro-grants",
      pct: 40
    }, {
      label: "Fisheries & safety training",
      pct: 26
    }, {
      label: "Flood early-warning & relief",
      pct: 22
    }, {
      label: "Admin & independent audit",
      pct: 12
    }],
    milestones: [{
      year: "2017",
      text: "Center founded to support coastal fishing cooperatives."
    }, {
      year: "2020",
      text: "Boat-safety certification introduced."
    }, {
      year: "2024",
      text: "After the floods, 60 homes and 200 livelihoods rebuilt."
    }, {
      year: "2025",
      text: "Every partnered boat crew is now safety-certified."
    }],
    update: {
      date: "April 2026",
      text: "A new early-warning siren network went live across three fishing villages ahead of monsoon season."
    },
    galleryCaptions2: ["New nets funded by micro-grants", "A safety-training classroom session", "Volunteers packing relief kits"],
    totalDonatedUSD: 152075,
    livesImpacted: 4160,
    donorCount: 1120,
    tint: '#4a7d84',
    initials: 'CC',
    stats: {
      day: 320,
      week: 2410,
      month: 11840,
      year: 108300
    }
  }, {
    id: 'hc-accra',
    name: 'Accra Learning Hub',
    country: 'Ghana',
    region: 'Africa',
    active: true,
    desc: 'Digital literacy, adult education and small-business skills in Accra.',
    programs: ['Digital Literacy', 'Adult Education', 'Small-Business Skills'],
    wallet: '0x3Fa8B92CdE1104D7b6E0a5C4832fF19a60B7D3e9',
    charityRegNo: 'GH-DSW-4471',
    founded: 2020,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80'],
    about: 'Accra Learning Hub runs digital-literacy labs, adult evening classes and small-business clinics in central Accra. More than 400 graduates have moved into formal jobs or launched their own micro-enterprises.',
    programsDetail: [{
      name: 'Digital Literacy',
      desc: 'Computer labs with six-week foundational courses.',
      cost: '≈ $25 / month per learner'
    }, {
      name: 'Adult Education',
      desc: 'Evening literacy and numeracy classes for working adults.',
      cost: '≈ $15 / month per learner'
    }, {
      name: 'Small-Business Skills',
      desc: 'Bookkeeping, pricing and market-access clinics.',
      cost: '≈ $20 / month per trainee'
    }],
    impactHints: [{
      amount: 25,
      impact: 'Course materials for 2 learners'
    }, {
      amount: 50,
      impact: 'A month of lab time for 5 learners'
    }, {
      amount: 100,
      impact: 'An adult-education scholarship'
    }, {
      amount: 250,
      impact: 'A business starter kit'
    }],
    lead: "In central Accra, a six-week course can be the difference between an informal hustle and a formal wage. Your gift funds computer labs, evening classes for working adults, and small-business clinics. More than 400 graduates have already moved into jobs or launched their own micro-enterprises.",
    story: {
      name: "Efua, age 27",
      text: "Efua ran a market stall with no way to track her money. She took the center's bookkeeping and digital-skills courses at night; within a year she had formalised her business, opened a second stall and hired her first employee. Your gift funds the next Efua's seat in the lab."
    },
    outcomes: [{
      value: "400+",
      label: "graduates in jobs or self-employment"
    }, {
      value: "6 wks",
      label: "to a foundational digital certificate"
    }, {
      value: "68%",
      label: "of business-clinic alumni grew revenue"
    }],
    testimonial: {
      quote: "I learned to read my own numbers. Now my business works for me.",
      who: "Efua, small-business clinic graduate"
    },
    galleryCaptions: ["A digital-literacy lab session", "An evening adult-education class", "A small-business clinic in progress"],
    need: "In Accra, thousands of adults run informal businesses with no records and no way to grow. A short course can be the difference between a daily hustle and a stable wage.",
    fundUse: [{
      label: "Computer labs & courses",
      pct: 44
    }, {
      label: "Adult evening classes",
      pct: 24
    }, {
      label: "Small-business clinics",
      pct: 20
    }, {
      label: "Admin & independent audit",
      pct: 12
    }],
    milestones: [{
      year: "2020",
      text: "Learning hub opens with two computer labs."
    }, {
      year: "2022",
      text: "Evening adult-education classes launch."
    }, {
      year: "2024",
      text: "The 400th graduate moves into a formal job or business."
    }, {
      year: "2025",
      text: "68% of business-clinic alumni report higher revenue."
    }],
    update: {
      date: "May 2026",
      text: "A new coding track launched this term, with 30 learners in its first cohort."
    },
    galleryCaptions2: ["A coding-track cohort at work", "A graduation ceremony", "A market stall run by an alumna"],
    totalDonatedUSD: 98410,
    livesImpacted: 2980,
    donorCount: 860,
    tint: '#56888c',
    initials: 'AL',
    stats: {
      day: 180,
      week: 1520,
      month: 7460,
      year: 74900
    }
  }, {
    id: 'hc-dhaka',
    name: 'Dhaka Health Outreach',
    country: 'Bangladesh',
    region: 'Asia',
    active: false,
    desc: 'Mobile clinics and maternal health outreach across greater Dhaka.',
    programs: ['Mobile Clinics', 'Maternal Health'],
    wallet: '0x7D42c81fA0B34E5a9C1D2276bE55A08Cd914F6b0',
    charityRegNo: 'BD-NGOAB-2688',
    founded: 2015,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80'],
    about: 'Dhaka Health Outreach operates mobile clinics and maternal-health visits across greater Dhaka. The center is temporarily not accepting new donations; existing program commitments continue to be honoured.',
    programsDetail: [{
      name: 'Mobile Clinics',
      desc: 'Neighbourhood clinic days with a doctor, nurse and pharmacist.',
      cost: '≈ $11 / month per patient'
    }, {
      name: 'Maternal Health',
      desc: 'Pre- and post-natal home visits by trained midwives.',
      cost: '≈ $16 / month per mother'
    }],
    impactHints: [],
    lead: "Across greater Dhaka, Dhaka Health Outreach brings mobile clinics and maternal-health visits to neighbourhoods without a permanent health post. The center is temporarily not accepting new donations; existing program commitments continue to be honoured.",
    story: {
      name: "Shirin, new mother",
      text: "Shirin had no antenatal care until a center midwife began home visits on her lane. Regular checkups carried her through a safe delivery, and her newborn started life with a full immunisation record."
    },
    outcomes: [{
      value: "9,640",
      label: "lives reached to date"
    }, {
      value: "2,540",
      label: "donors since 2015"
    }, {
      value: "Paused",
      label: "new donations on hold"
    }],
    testimonial: {
      quote: "The midwife came to my home when I could not travel. My baby and I are healthy because of it.",
      who: "Shirin, Dhaka mother"
    },
    galleryCaptions: ["A neighbourhood mobile-clinic day", "A midwife on a maternal home visit", "An immunisation record for a newborn"],
    need: "Across greater Dhaka, many neighbourhoods have no permanent health post, and expectant mothers often reach care too late.",
    fundUse: [{
      label: "Mobile clinics & medicine",
      pct: 52
    }, {
      label: "Maternal home visits",
      pct: 30
    }, {
      label: "Admin & independent audit",
      pct: 18
    }],
    milestones: [{
      year: "2015",
      text: "Center founded; the first mobile-clinic route launches."
    }, {
      year: "2019",
      text: "Maternal home-visit program reaches 2,000 mothers."
    }, {
      year: "2023",
      text: "9,600+ lives reached across greater Dhaka."
    }, {
      year: "2026",
      text: "New donations paused during an independent review."
    }],
    update: {
      date: "Notice",
      text: "This center is not accepting new donations right now. Existing program commitments continue to be honoured."
    },
    galleryCaptions2: ["A clinic queue on a visit day", "Medicines packed for the route", "A maternal-health information session"],
    totalDonatedUSD: 321660,
    livesImpacted: 9640,
    donorCount: 2540,
    tint: '#6a5770',
    initials: 'DH',
    stats: {
      day: 0,
      week: 0,
      month: 8120,
      year: 187400
    }
  }, {
    id: 'hc-jakarta',
    name: "Jakarta Coastal Resilience Center",
    country: "Indonesia",
    region: "Asia",
    active: true,
    desc: "Flood defence, clean water and fishing livelihoods for coastal families in North Jakarta.",
    programs: ["Flood Defence", "Clean Water", "Livelihood Support"],
    wallet: '0x1aF4c7B2E90d35A6c8194Db772f0E4519Ac3b6D1',
    charityRegNo: 'ID-KEMENKUM-2019-8841',
    founded: 2019,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80"],
    about: "Jakarta Coastal Resilience Center helps families in North Jakarta live with rising water. The center builds community flood defences, restores clean-water access and helps fishing households diversify their income before the next tidal flood arrives.",
    programsDetail: [{
      "name": "Flood Defence",
      "desc": "Community barriers, pumps and an early-warning network for 900 households.",
      "cost": "≈ $12 / month per household"
    }, {
      "name": "Clean Water",
      "desc": "Rainwater harvesting and filters where the mains supply has failed.",
      "cost": "≈ $10 / month per family"
    }, {
      "name": "Livelihood Support",
      "desc": "Grants and training to diversify income beyond fishing.",
      "cost": "≈ $28 / month per family"
    }],
    impactHints: [{
      "amount": 25,
      "impact": "Sandbags for one home"
    }, {
      "amount": 50,
      "impact": "A household water filter"
    }, {
      "amount": 100,
      "impact": "A month of pump fuel for a block"
    }, {
      "amount": 250,
      "impact": "A livelihood grant instalment"
    }],
    lead: "In North Jakarta, the sea reaches the doorstep a little sooner every year. Your gift funds flood barriers, clean water and new ways to earn, so families can stay in the homes they have built.",
    story: {
      "name": "Sari, mother of three",
      "text": "Sari's home flooded four times last year. A community barrier and a raised water tank kept her family dry through the last high tide, and a small grant let her start a food stall on days the boats can't go out."
    },
    outcomes: [{
      "value": "900",
      "label": "households behind flood defences"
    }, {
      "value": "70%",
      "label": "fewer flood-damage claims on the block"
    }, {
      "value": "240",
      "label": "families with a second income"
    }],
    testimonial: {
      "quote": "The water still comes, but now we are ready for it. We are not starting from zero every time.",
      "who": "Sari, North Jakarta resident"
    },
    galleryCaptions: ["A community flood barrier at high tide", "A rainwater-harvesting tank", "A family food stall funded by a grant"],
    galleryCaptions2: ["Volunteers testing the early-warning siren", "A household water filter in use", "Training on income diversification"],
    need: "North Jakarta is sinking while the sea rises, and tidal floods can arrive with little warning. For families who fish, one bad flood can wipe out both home and income.",
    fundUse: [{
      "label": "Flood defence & pumps",
      "pct": 42
    }, {
      "label": "Clean-water access",
      "pct": 26
    }, {
      "label": "Livelihood grants",
      "pct": 20
    }, {
      "label": "Admin & independent audit",
      "pct": 12
    }],
    milestones: [{
      "year": "2019",
      "text": "Center opens; first community flood barrier built."
    }, {
      "year": "2021",
      "text": "Early-warning siren network goes live."
    }, {
      "year": "2023",
      "text": "Clean-water program reaches 600 families."
    }, {
      "year": "2025",
      "text": "Flood-damage claims on protected blocks fall 70%."
    }],
    update: {
      "date": "June 2026",
      "text": "A new tidal-gauge sensor now feeds the early-warning network, giving families up to two extra hours to prepare."
    },
    totalDonatedUSD: 174300,
    livesImpacted: 6120,
    donorCount: 1580,
    tint: '#2b5f6b',
    initials: 'JC',
    stats: {
      "day": 520,
      "week": 3980,
      "month": 16240,
      "year": 132400
    }
  }, {
    id: 'hc-kampala',
    name: "Kampala Girls' Education Center",
    country: "Uganda",
    region: "Africa",
    active: true,
    desc: "Scholarships, mentorship and health support keeping girls in school in Kampala.",
    programs: ["Scholarships", "Mentorship", "Health & Wellbeing"],
    wallet: '0x9C2eB47a10Df58316b0A7c4491Ee2350aB84F7c9',
    charityRegNo: 'UG-NGO-2017-3092',
    founded: 2017,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80"],
    about: "Kampala Girls' Education Center keeps girls in the classroom through the years they are most likely to drop out. Scholarships, one-to-one mentors and school health support help students finish secondary school and plan what comes next.",
    programsDetail: [{
      "name": "Scholarships",
      "desc": "School fees, uniforms and books for 320 girls.",
      "cost": "≈ $26 / month per student"
    }, {
      "name": "Mentorship",
      "desc": "Weekly mentoring and study groups led by local women.",
      "cost": "≈ $15 / month per student"
    }, {
      "name": "Health & Wellbeing",
      "desc": "School nurse, counselling and health education.",
      "cost": "≈ $11 / month per student"
    }],
    impactHints: [{
      "amount": 25,
      "impact": "Books for one student"
    }, {
      "amount": 50,
      "impact": "A term of uniforms for two girls"
    }, {
      "amount": 100,
      "impact": "A month of mentoring for a study group"
    }, {
      "amount": 250,
      "impact": "A full-year scholarship"
    }],
    lead: "In Kampala, a girl who stays in school past 14 changes the course of her whole life. Your gift funds the scholarships, mentors and health support that keep her there.",
    story: {
      "name": "Aisha, age 16",
      "text": "Aisha was about to leave school to help at home when a scholarship and a mentor stepped in. She is now top of her science class and wants to train as a nurse, and she mentors two younger girls on her street."
    },
    outcomes: [{
      "value": "91%",
      "label": "of scholars finish secondary school"
    }, {
      "value": "320",
      "label": "girls on scholarship"
    }, {
      "value": "85",
      "label": "local women mentors"
    }],
    testimonial: {
      "quote": "My mentor showed me that finishing school was possible. Now I show other girls the same thing.",
      "who": "Aisha, scholarship student"
    },
    galleryCaptions: ["A study group led by a mentor", "Students in a science lesson", "The school health corner"],
    galleryCaptions2: ["A scholarship-fund uniform handover", "A one-to-one mentoring session", "A graduation celebration"],
    need: "In many Kampala neighbourhoods, girls are the first to be pulled from school when money is tight. Each year out of the classroom makes returning far less likely.",
    fundUse: [{
      "label": "Scholarships & school costs",
      "pct": 48
    }, {
      "label": "Mentorship program",
      "pct": 24
    }, {
      "label": "Health & counselling",
      "pct": 16
    }, {
      "label": "Admin & independent audit",
      "pct": 12
    }],
    milestones: [{
      "year": "2017",
      "text": "Center opens with 60 scholarships."
    }, {
      "year": "2020",
      "text": "Peer-mentorship network launches."
    }, {
      "year": "2023",
      "text": "School health corner opens with a full-time nurse."
    }, {
      "year": "2025",
      "text": "91% of scholars now complete secondary school."
    }],
    update: {
      "date": "May 2026",
      "text": "A new careers program paired 40 senior students with women working in medicine, law and engineering."
    },
    totalDonatedUSD: 206540,
    livesImpacted: 4300,
    donorCount: 1890,
    tint: '#3a6152',
    initials: 'KG',
    stats: {
      "day": 640,
      "week": 4820,
      "month": 19800,
      "year": 158600
    }
  }, {
    id: 'hc-amman',
    name: "Amman Refuge Support Center",
    country: "Jordan",
    region: "Middle East",
    active: true,
    desc: "Skills training, childcare and health support for refugee families in Amman.",
    programs: ["Skills Training", "Childcare", "Health Support"],
    wallet: '0x4Dd18A2fC703b95E6a41c88072Bf0913Ae5C21b7',
    charityRegNo: 'JO-MOSD-2018-1174',
    founded: 2018,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80"],
    about: "Amman Refuge Support Center helps refugee families rebuild a footing in a new city. Language and vocational classes, safe childcare and primary health support give parents the room to find work and children the stability to keep learning.",
    programsDetail: [{
      "name": "Skills Training",
      "desc": "Language, digital and trade classes with job placement support.",
      "cost": "≈ $30 / month per adult"
    }, {
      "name": "Childcare",
      "desc": "Safe day care so parents can attend classes and work.",
      "cost": "≈ $20 / month per child"
    }, {
      "name": "Health Support",
      "desc": "Primary care, vaccinations and mental-health counselling.",
      "cost": "≈ $13 / month per person"
    }],
    impactHints: [{
      "amount": 25,
      "impact": "A week of childcare for one child"
    }, {
      "amount": 50,
      "impact": "Language materials for two learners"
    }, {
      "amount": 100,
      "impact": "A month of trade training"
    }, {
      "amount": 250,
      "impact": "A full job-placement course"
    }],
    lead: "For a family starting over in Amman, a new language and a safe place for the children can be the whole difference. Your gift funds the classes, childcare and care that make a fresh start possible.",
    story: {
      "name": "Omar, father of two",
      "text": "Omar arrived in Amman unable to work in his trade. Evening classes rebuilt his Arabic and certified his skills, while day care kept his children safe and learning. He now works full-time and volunteers as a class translator."
    },
    outcomes: [{
      "value": "64%",
      "label": "of trainees find work within six months"
    }, {
      "value": "210",
      "label": "childcare places"
    }, {
      "value": "5,100",
      "label": "health visits a year"
    }],
    testimonial: {
      "quote": "They gave my children somewhere safe and gave me back my trade. That is dignity.",
      "who": "Omar, center graduate and volunteer"
    },
    galleryCaptions: ["A language class in session", "The center childcare room", "A primary-health consultation"],
    galleryCaptions2: ["A trade-skills workshop", "A job-placement advice session", "A family collecting health supplies"],
    need: "Refugee families in Amman often arrive with skills they cannot yet use, and no safe place to leave their children while they rebuild. Without support, months of potential are lost.",
    fundUse: [{
      "label": "Skills & language training",
      "pct": 40
    }, {
      "label": "Childcare",
      "pct": 26
    }, {
      "label": "Health & counselling",
      "pct": 22
    }, {
      "label": "Admin & independent audit",
      "pct": 12
    }],
    milestones: [{
      "year": "2018",
      "text": "Center opens with language and childcare services."
    }, {
      "year": "2020",
      "text": "Vocational trades and job placement added."
    }, {
      "year": "2023",
      "text": "Mental-health counselling introduced."
    }, {
      "year": "2025",
      "text": "64% of trainees now find work within six months."
    }],
    update: {
      "date": "April 2026",
      "text": "A new employer partnership opened 30 apprenticeships in hospitality and construction."
    },
    totalDonatedUSD: 238900,
    livesImpacted: 7480,
    donorCount: 2110,
    tint: '#5a5570',
    initials: 'AR',
    stats: {
      "day": 710,
      "week": 5240,
      "month": 21600,
      "year": 171200
    }
  }, {
    id: 'hc-lima',
    name: "Lima Highland Health Center",
    country: "Peru",
    region: "South America",
    active: true,
    desc: "Maternal care, nutrition and mobile clinics for highland families around Lima.",
    programs: ["Maternal Care", "Nutrition", "Mobile Clinics"],
    wallet: '0x7Bc90E2a41Df6538a0C7194bB2f8043Ae61C95d3',
    charityRegNo: 'PE-SUNARP-2020-4471',
    founded: 2020,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80"],
    about: "Lima Highland Health Center brings maternal care, child nutrition and mobile clinics to families on the steep, under-served edges of the city. Trained health workers reach homes that sit hours from the nearest permanent clinic.",
    programsDetail: [{
      "name": "Maternal Care",
      "desc": "Antenatal checkups and safe-delivery support for expectant mothers.",
      "cost": "≈ $16 / month per mother"
    }, {
      "name": "Nutrition",
      "desc": "Fortified meals and growth monitoring for under-fives.",
      "cost": "≈ $14 / month per child"
    }, {
      "name": "Mobile Clinics",
      "desc": "Weekly clinic days with a doctor, nurse and pharmacist.",
      "cost": "≈ $12 / month per patient"
    }],
    impactHints: [{
      "amount": 25,
      "impact": "A month of nutrition for one child"
    }, {
      "amount": 50,
      "impact": "Antenatal care for a mother"
    }, {
      "amount": 100,
      "impact": "A mobile-clinic half-day"
    }, {
      "amount": 250,
      "impact": "A full clinic day for a hillside"
    }],
    lead: "On Lima's steep outer hills, the nearest doctor can be hours away, too far for a mother in labour or a sick child. Your gift puts trained health workers on those hills every week.",
    story: {
      "name": "Rosa, new mother",
      "text": "Rosa lives an hour's climb from the nearest clinic. A community health worker visited through her whole pregnancy, and the mobile clinic was there for a safe delivery. Her daughter is healthy and fully immunised."
    },
    outcomes: [{
      "value": "98%",
      "label": "of tracked pregnancies safely delivered"
    }, {
      "value": "2,900",
      "label": "clinic visits a year"
    }, {
      "value": "94%",
      "label": "of under-fives on track for growth"
    }],
    testimonial: {
      "quote": "The clinic climbed the hill to reach me. My daughter is alive because it did.",
      "who": "Rosa, highland resident"
    },
    galleryCaptions: ["A mobile clinic on a hillside", "A maternal home visit", "Growth monitoring for a toddler"],
    galleryCaptions2: ["A nutrition food-pack handover", "A community health worker on her rounds", "A vaccination session"],
    need: "Families on Lima's highland fringes live hours from permanent health services. For expectant mothers and small children, that distance can be dangerous.",
    fundUse: [{
      "label": "Mobile clinics & medicine",
      "pct": 44
    }, {
      "label": "Maternal care",
      "pct": 26
    }, {
      "label": "Nutrition",
      "pct": 18
    }, {
      "label": "Admin & independent audit",
      "pct": 12
    }],
    milestones: [{
      "year": "2020",
      "text": "Center opens; first mobile-clinic route launches."
    }, {
      "year": "2022",
      "text": "Maternal home-visit program begins."
    }, {
      "year": "2024",
      "text": "Nutrition program reaches every under-five on the route."
    }, {
      "year": "2025",
      "text": "98% of tracked pregnancies safely delivered."
    }],
    update: {
      "date": "May 2026",
      "text": "A second health worker joined the team, adding two more hillside neighbourhoods to the weekly route."
    },
    totalDonatedUSD: 143700,
    livesImpacted: 3960,
    donorCount: 1240,
    tint: '#4a6b78',
    initials: 'LH',
    stats: {
      "day": 380,
      "week": 2960,
      "month": 13400,
      "year": 118600
    }
  }, {
    id: 'hc-hanoi',
    name: "Hanoi Digital Futures Center",
    country: "Vietnam",
    region: "Asia",
    active: true,
    desc: "Coding, digital skills and micro-business support for young people in Hanoi.",
    programs: ["Coding & Digital Skills", "Vocational Training", "Micro-Business"],
    wallet: '0x2eA7c81fB0439D5568a0C7194Bb2f0913Ac54E6d',
    charityRegNo: 'VN-DKKD-2021-6620',
    founded: 2021,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80"],
    about: "Hanoi Digital Futures Center helps young people turn digital skills into steady income. Structured coding tracks, practical vocational courses and micro-business support open doors that a traditional CV alone often cannot.",
    programsDetail: [{
      "name": "Coding & Digital Skills",
      "desc": "Structured tracks from foundations to job-ready portfolios.",
      "cost": "≈ $28 / month per learner"
    }, {
      "name": "Vocational Training",
      "desc": "Practical courses in design, e-commerce and IT support.",
      "cost": "≈ $22 / month per learner"
    }, {
      "name": "Micro-Business",
      "desc": "Seed grants and coaching for online micro-enterprises.",
      "cost": "≈ $20 / month per founder"
    }],
    impactHints: [{
      "amount": 25,
      "impact": "A month of lab time for one learner"
    }, {
      "amount": 50,
      "impact": "Course materials for two students"
    }, {
      "amount": 100,
      "impact": "A coding scholarship instalment"
    }, {
      "amount": 250,
      "impact": "A micro-business seed grant"
    }],
    lead: "In Hanoi, a young person with the right digital skills can leapfrog into stable, well-paid work. Your gift funds the labs, courses and seed grants that make that leap possible.",
    story: {
      "name": "Linh, age 21",
      "text": "Linh taught herself the basics on a borrowed phone. A place in the coding track gave her structure, a mentor and a real portfolio; she now works remotely as a junior developer and runs a small design side-business."
    },
    outcomes: [{
      "value": "70%",
      "label": "of graduates in tech or digital work"
    }, {
      "value": "12 wks",
      "label": "to a job-ready portfolio"
    }, {
      "value": "140",
      "label": "micro-businesses launched"
    }],
    testimonial: {
      "quote": "I started on a borrowed phone. Now I write code for clients in three countries.",
      "who": "Linh, coding-track graduate"
    },
    galleryCaptions: ["A coding-track cohort at work", "A vocational design class", "A micro-business owner shipping orders"],
    galleryCaptions2: ["A mentor reviewing a portfolio", "A demo-day pitch session", "The center computer lab"],
    need: "Many talented young people in Hanoi lack the structure, hardware and networks to turn raw interest in tech into a real career.",
    fundUse: [{
      "label": "Labs, hardware & courses",
      "pct": 46
    }, {
      "label": "Vocational training",
      "pct": 22
    }, {
      "label": "Micro-business seed grants",
      "pct": 20
    }, {
      "label": "Admin & independent audit",
      "pct": 12
    }],
    milestones: [{
      "year": "2021",
      "text": "Center opens with two computer labs."
    }, {
      "year": "2023",
      "text": "Structured coding tracks and mentoring launch."
    }, {
      "year": "2024",
      "text": "Micro-business seed-grant program begins."
    }, {
      "year": "2025",
      "text": "70% of graduates now work in tech or digital roles."
    }],
    update: {
      "date": "June 2026",
      "text": "A new AI-literacy module joined the curriculum, with 45 learners in its first cohort."
    },
    totalDonatedUSD: 118200,
    livesImpacted: 2740,
    donorCount: 960,
    tint: '#3d6b6b',
    initials: 'HD',
    stats: {
      "day": 300,
      "week": 2380,
      "month": 10900,
      "year": 96400
    }
  }, {
    id: 'hc-capetown',
    name: "Cape Town Early Years Center",
    country: "South Africa",
    region: "Africa",
    active: true,
    desc: "Early-childhood education, nutrition and family support in Cape Town.",
    programs: ["Early Education", "Nutrition", "Family Support"],
    wallet: '0x8Fa2c71bE0439D5568a0C7194Bb2f0913Ae61C95',
    charityRegNo: 'ZA-NPO-2016-2288',
    founded: 2016,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80"],
    about: "Cape Town Early Years Center gives children the strongest possible start before school begins. Play-based early education, daily nutrition and family support build the foundations that shape a child's whole education.",
    programsDetail: [{
      "name": "Early Education",
      "desc": "Play-based learning and school-readiness for 240 under-sixes.",
      "cost": "≈ $24 / month per child"
    }, {
      "name": "Nutrition",
      "desc": "Two nutritious meals every day and growth monitoring.",
      "cost": "≈ $15 / month per child"
    }, {
      "name": "Family Support",
      "desc": "Parenting workshops and social-work referrals.",
      "cost": "≈ $12 / month per family"
    }],
    impactHints: [{
      "amount": 25,
      "impact": "A week of meals for two children"
    }, {
      "amount": 50,
      "impact": "Learning materials for a classroom"
    }, {
      "amount": 100,
      "impact": "A month of early education for a child"
    }, {
      "amount": 250,
      "impact": "A full term for one child"
    }],
    lead: "The years before school decide how far a child can go. Your gift funds the early learning, daily meals and family support that give Cape Town's youngest children a fair start.",
    story: {
      "name": "Thandi, age 5",
      "text": "Thandi arrived quiet and behind her peers. Two years of play-based learning and two meals a day changed that. She starts primary school this year reading simple words and bursting with questions."
    },
    outcomes: [{
      "value": "240",
      "label": "children in early education"
    }, {
      "value": "96%",
      "label": "assessed school-ready"
    }, {
      "value": "2",
      "label": "nutritious meals a day per child"
    }],
    testimonial: {
      "quote": "My daughter starts school ready and confident. I never had that start myself.",
      "who": "Nomsa, parent"
    },
    galleryCaptions: ["A play-based learning session", "The center mealtime", "A parenting workshop"],
    galleryCaptions2: ["A school-readiness assessment", "The outdoor play area", "A story-time circle"],
    need: "In under-resourced Cape Town neighbourhoods, many children reach school already behind, without the early learning and nutrition that shape their first years.",
    fundUse: [{
      "label": "Early education & staff",
      "pct": 44
    }, {
      "label": "Daily nutrition",
      "pct": 26
    }, {
      "label": "Family support",
      "pct": 18
    }, {
      "label": "Admin & independent audit",
      "pct": 12
    }],
    milestones: [{
      "year": "2016",
      "text": "Center opens with one early-learning classroom."
    }, {
      "year": "2019",
      "text": "Daily meals program launches."
    }, {
      "year": "2022",
      "text": "Family-support and parenting workshops added."
    }, {
      "year": "2025",
      "text": "96% of children now assessed school-ready."
    }],
    update: {
      "date": "May 2026",
      "text": "A new outdoor learning garden opened, giving children hands-on lessons in growing food."
    },
    totalDonatedUSD: 161900,
    livesImpacted: 3480,
    donorCount: 1360,
    tint: '#556b3a',
    initials: 'CE',
    stats: {
      "day": 430,
      "week": 3320,
      "month": 14900,
      "year": 126800
    }
  }];

  /* ── FE-208 §7.1 data-model alignment - status enum, city, category, slug ──
     The HC spec (pageId 88768526 §7.1) defines status as active | suspended | inactive | deactivated,
     plus optional city and category. The prototype seed carried only a boolean, so normalise here
     rather than restating every field on 13 records. */
  var HC_META = {
    'hc-nairobi': {
      city: 'Nairobi',
      category: 'Education',
      status: 'active'
    },
    'hc-manila': {
      city: 'Manila',
      category: 'Livelihoods',
      status: 'active'
    },
    'hc-lapaz': {
      city: 'El Alto',
      category: 'Healthcare',
      status: 'active'
    },
    'hc-colombo': {
      city: 'Colombo',
      category: 'Livelihoods',
      status: 'active'
    },
    'hc-accra': {
      city: 'Accra',
      category: 'Education',
      status: 'active'
    },
    'hc-dhaka': {
      city: 'Dhaka',
      category: 'Healthcare',
      status: 'suspended'
    },
    'hc-jakarta': {
      city: 'Jakarta',
      category: 'Climate resilience',
      status: 'active'
    },
    'hc-kampala': {
      city: 'Kampala',
      category: 'Education',
      status: 'active'
    },
    'hc-amman': {
      city: 'Amman',
      category: 'Refugee support',
      status: 'active'
    },
    'hc-lima': {
      city: 'Lima',
      category: 'Healthcare',
      status: 'active'
    },
    /* HC-DIR-02 / AC-HC-04 - lives impacted is nullable; this centre proves the "Coming soon" fallback. */
    'hc-hanoi': {
      city: 'Hanoi',
      category: 'Education',
      status: 'active',
      livesImpacted: null
    },
    'hc-capetown': {
      city: 'Cape Town',
      category: 'Food security',
      status: 'active'
    }
  };
  CENTERS.forEach(function (c) {
    var m = HC_META[c.id] || {};
    c.city = m.city || '';
    c.category = m.category || 'Community';
    c.status = m.status || (c.active ? 'active' : 'suspended');
    c.active = c.status === 'active';
    c.slug = c.id.replace(/^hc-/, '');
    if (Object.prototype.hasOwnProperty.call(m, 'livesImpacted')) c.livesImpacted = m.livesImpacted;
    c.location = c.city ? c.city + ', ' + c.country : c.country;
  });
  var HC_STATUS_LABEL = {
    active: 'Active',
    suspended: 'Suspended',
    inactive: 'Inactive',
    deactivated: 'Closed'
  };
  function categories() {
    return Array.from(new Set(CENTERS.filter(function (c) {
      return c.active;
    }).map(function (c) {
      return c.category;
    }))).sort();
  }

  /* ── Settlement configuration (Donation spec §1.7 + §7.3) ──
     Fiat settles to the Payment Rail's defined ACCOUNT (never converted to crypto).
     USDC/USDT settle DIRECTLY to the defined multisig wallet.
     BTC/ETH are converted to USDC or USDT by the Crypto Swap Worker, then routed to the same multisig. */
  var SETTLEMENT = {
    multisig: '0x5C1fD8a72E90B4d3617ac0951Ee27fB4a83D6019',
    /* FE-208 (Eric, 24 Aug) - the multisig wallet is NOT shown in UI; settlement is handled by the BE. Neutral label only. */
    multisigLabel: 'Humanity Center settlement wallet',
    fiatAccountLabel: 'Payment Rail settlement account',
    /* FE-208 (Eric, 24 Aug) - bank transfer shows the receiving account the user sends money to. Prototype details. */
    bank: {
      holder: 'Huma AG · Donations',
      bankName: 'Zürcher Kantonalbank, Zurich',
      iban: 'CH56 0483 5012 3456 7800 9',
      bic: 'ZKBKCHZZ80A',
      expiryHours: 72
    },
    network: 'Ethereum',
    /* OQ-03 - approved network list TBD */
    explorer: 'https://sepolia.etherscan.io/tx/'
  };

  /* Minimal donatable balance context - owned by Wallet Service (cached; see wallet-enhanced.html for full portfolio).
     Order follows DON-CRYPTO-01: USDC/USDT first, then convertible assets. */
  var BALANCES = {
    lastUpdated: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    tokens: [{
      symbol: 'USDC',
      name: 'USD Coin',
      amount: 1204.10,
      native: false,
      settles: 'direct'
    }, {
      symbol: 'USDT',
      name: 'Tether USD',
      amount: 610.25,
      native: false,
      settles: 'direct'
    }, {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.01840,
      native: false,
      settles: 'converted'
    }, {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 0.4200,
      native: true,
      settles: 'converted'
    }]
  };
  var PRICES = {
    hUSD: 1.0000,
    USDC: 1.0001,
    USDT: 0.9998,
    ETH: 3120.40,
    BTC: 61480.00
  };
  var GAS = {
    approveETH: 0.00042,
    donateETH: 0.00068
  }; // est. network fees, user pays

  /* ── Fees (DON-DASH-08 / DON-CRYPTO-03 / AC-DON-07) ──
     The spec mandates the fee but sets no rate. These are PROTOTYPE placeholders - TBD Finance.
     Processing fee is always applied ON TOP: total charged = donation amount + processing fee. */
  var FEES = {
    note: 'The platform fee is free for now. Any cost is shown before you confirm.',
    fiatPct: 0.029,
    fiatFixed: 0.30,
    /* card rail */
    bankPct: 0.008,
    bankFixed: 0,
    /* bank transfer - prototype rate, TBD Finance */
    cryptoPct: 0.010,
    /* platform processing fee on crypto donations */
    conversionPct: 0.003 /* Crypto Swap Worker route fee, convertible assets only */
  };
  function processingFee(source, usd, rail) {
    if (source === 'fiat') {
      if (rail === 'bank') return Math.round((usd * FEES.bankPct + FEES.bankFixed) * 100) / 100;
      return Math.round((usd * FEES.fiatPct + FEES.fiatFixed) * 100) / 100;
    }
    return Math.round(usd * FEES.cryptoPct * 100) / 100;
  }
  function conversionFee(usd) {
    return Math.round(usd * FEES.conversionPct * 100) / 100;
  }

  /* ── Fiat currencies (DON-FIAT-04). OQ-02 - MVP currency list TBD. ── */
  var FIAT = [{
    code: 'USD',
    symbol: '$',
    rate: 1,
    label: 'US Dollar'
  }, {
    code: 'EUR',
    symbol: '€',
    rate: 1.0840,
    label: 'Euro'
  }, {
    code: 'GBP',
    symbol: '£',
    rate: 1.2710,
    label: 'British Pound'
  }, {
    code: 'VND',
    symbol: '₫',
    rate: 0.0000392,
    label: 'Vietnamese Dong'
  }];
  function fiatCcy(code) {
    return FIAT.find(function (f) {
      return f.code === code;
    }) || FIAT[0];
  }

  /* ── Uniswap quote (DON-CRYPTO-02 / §7.2 /v1/prices) ──
     Compares the USDC and USDT routes and returns the higher USD-equivalent. Prototype maths. */
  function uniswapQuote(symbol, amount) {
    var px = PRICES[symbol] || 0;
    var usdc = amount * px * (PRICES.USDC / 1);
    var usdt = amount * px * (PRICES.USDT / 1);
    var direct = symbol === 'USDC' || symbol === 'USDT';
    var best = usdc >= usdt ? 'USDC' : 'USDT';
    return {
      asset: symbol,
      amount: amount,
      settlementAsset: direct ? symbol : best,
      converted: !direct,
      usd: Math.round((direct ? amount * px : Math.max(usdc, usdt)) * 100) / 100,
      rate: px,
      routes: {
        USDC: Math.round(usdc * 100) / 100,
        USDT: Math.round(usdt * 100) / 100
      },
      source: 'Uniswap'
    };
  }
  function iso(daysAgo, h) {
    var d = new Date(Date.now() - daysAgo * 864e5);
    if (h != null) d.setHours(h, 24 - daysAgo, 0, 0);
    return d.toISOString();
  }
  /* donation_history (§7.1.2): original amount/currency, USD value, processing fee, total charged,
     settlement asset/amount, destination, source, status, txHash. */
  var HISTORY = [{
    id: 'don-90412',
    hcId: 'hc-nairobi',
    source: 'crypto',
    status: 'completed',
    amount: 250,
    currency: 'USDC',
    amountUSD: 250.03,
    rate: 1.0001,
    fee: 2.50,
    conversionFee: 0,
    totalCharged: 252.53,
    settlementAsset: 'USDC',
    settlementAmount: 250.00,
    destination: 'multisig',
    txHash: '0x9b71f04c8a2e51d6b3a8f27c90e14d5a6b82c3f1a0d97e6541bc28d3f7a1904c',
    createdAt: iso(3, 14),
    receipt: 'available',
    receiptNo: 'UN-2026-004182',
    uyt: {
      amount: 12.5,
      status: 'confirmed'
    }
  }, {
    id: 'don-90371',
    hcId: 'hc-manila',
    source: 'fiat',
    status: 'completed',
    amount: 500,
    currency: 'USD',
    amountUSD: 500,
    rate: 1,
    fee: 14.80,
    conversionFee: 0,
    totalCharged: 514.80,
    settlementAsset: 'USD_FIAT',
    settlementAmount: 500,
    destination: 'fiat_account',
    txHash: null,
    createdAt: iso(11, 10),
    receipt: 'available',
    receiptNo: 'UN-2026-003967',
    uyt: {
      amount: 25.0,
      status: 'confirmed'
    }
  }, {
    id: 'don-90224',
    hcId: 'hc-nairobi',
    source: 'crypto',
    status: 'awaiting_confirmation',
    amount: 0.05,
    currency: 'ETH',
    amountUSD: 156.02,
    rate: 3120.4,
    fee: 1.56,
    conversionFee: 0.47,
    totalCharged: 157.58,
    settlementAsset: 'USDC',
    settlementAmount: null,
    destination: 'multisig',
    txHash: '0x4c81ab90de23f761c8a05b1e94d2c7f30a6b85d19e2f4c07b3a68d51c2e09af0',
    createdAt: iso(0.04),
    receipt: 'pending',
    receiptNo: null,
    uyt: {
      amount: 7.8,
      status: 'pending'
    }
  }, /* DON-CRYPTO-07 - conversion pending: submitted and confirmed on-chain, Swap Worker still converting. */
  {
    id: 'don-90188',
    hcId: 'hc-jakarta',
    source: 'crypto',
    status: 'conversion_pending',
    amount: 0.0035,
    currency: 'BTC',
    amountUSD: 215.18,
    rate: 61480,
    fee: 2.15,
    conversionFee: 0.65,
    totalCharged: 217.33,
    settlementAsset: 'USDT',
    settlementAmount: null,
    destination: 'multisig',
    txHash: '0x2f60c9a4b7138e05dc71a9f4382b06de5417ca8039fb26d7150e94c3a6b820f5',
    createdAt: iso(0.2),
    receipt: 'pending',
    receiptNo: null,
    uyt: {
      amount: 10.7,
      status: 'estimated'
    }
  }, /* DON-FIAT-04 - non-USD fiat: original currency + amount + rate preserved, USD is canonical. */
  {
    id: 'don-90055',
    hcId: 'hc-kampala',
    source: 'fiat',
    status: 'completed',
    amount: 180,
    currency: 'EUR',
    amountUSD: 195.12,
    rate: 1.084,
    fee: 5.96,
    conversionFee: 0,
    totalCharged: 185.50,
    settlementAsset: 'USD_FIAT',
    settlementAmount: 195.12,
    destination: 'fiat_account',
    txHash: null,
    createdAt: iso(21, 15),
    receipt: 'available',
    receiptNo: 'UN-2026-004071',
    uyt: {
      amount: 9.7,
      status: 'confirmed'
    }
  }, {
    id: 'don-89960',
    hcId: 'hc-lapaz',
    source: 'fiat',
    status: 'completed',
    amount: 120,
    currency: 'USD',
    amountUSD: 120,
    rate: 1,
    fee: 3.78,
    conversionFee: 0,
    totalCharged: 123.78,
    settlementAsset: 'USD_FIAT',
    settlementAmount: 120,
    destination: 'fiat_account',
    txHash: null,
    createdAt: iso(34, 16),
    receipt: 'available',
    receiptNo: 'UN-2026-002851',
    uyt: {
      amount: 6.0,
      status: 'confirmed'
    }
  }, {
    id: 'don-89712',
    hcId: 'hc-colombo',
    source: 'crypto',
    status: 'completed',
    amount: 264,
    currency: 'USDT',
    amountUSD: 263.95,
    rate: 0.9998,
    fee: 2.64,
    conversionFee: 0,
    totalCharged: 266.59,
    settlementAsset: 'USDT',
    settlementAmount: 264,
    destination: 'multisig',
    txHash: '0x7a3fe8c210b94d67a1f05c3e82d96b40c7a2e15f90d84b672c3a01e59f6d2b9c',
    createdAt: iso(58, 9),
    receipt: 'unavailable',
    receiptNo: null,
    uyt: {
      amount: 13.2,
      status: 'confirmed'
    }
  }, {
    id: 'don-89544',
    hcId: 'hc-accra',
    source: 'fiat',
    status: 'failed',
    amount: 75,
    currency: 'USD',
    amountUSD: 0,
    rate: 1,
    fee: 0,
    conversionFee: 0,
    totalCharged: 0,
    settlementAsset: 'USD_FIAT',
    settlementAmount: null,
    destination: 'fiat_account',
    txHash: null,
    createdAt: iso(71, 11),
    receipt: 'unavailable',
    receiptNo: null,
    uyt: null
  }];
  var SUMMARY = {
    totalDonatedUSD: 1485.15,
    livesImpacted: 46,
    uytConfirmed: 74.2,
    uytPending: 7.8,
    uytEstimated: 10.7,
    receipts: 5
  };

  /* ── Huma Points reward state (§7.1.4 / DON-HP-02) - display only, never calculated in FE. ── */
  var HP_STATE = {
    estimated: {
      label: 'Estimated',
      note: 'Estimated by the Huma Points service, confirmed after settlement.'
    },
    pending: {
      label: 'Pending',
      note: 'Awaiting confirmation from the Huma Points service.'
    },
    confirmed: {
      label: 'Confirmed',
      note: 'Confirmed by the Huma Points service.'
    },
    failed: {
      label: 'Not awarded',
      note: 'No Huma Points were awarded for this donation.'
    },
    unavailable: {
      label: 'Unavailable',
      note: 'Huma Points state is unavailable right now.'
    }
  };
  function hpChip(status) {
    var m = HP_STATE[status] || HP_STATE.unavailable;
    return '<span class="uyt-pill" title="' + esc(m.note) + '">' + esc(m.label) + '</span>';
  }

  /* ── §6.3 error copy - VERBATIM from the Donation spec. Single source of truth for every surface. ── */
  var MAX_USD = 50000,
    MIN_USD = 1;
  var ERR = {
    invalidAmount: 'Enter a valid donation amount.',
    outOfRange: function (max) {
      return 'Donation amount must be between $1 and ' + fmtUSD(max == null ? MAX_USD : max) + '.';
    },
    notLoggedIn: 'Log in to complete your donation.',
    kycRequired: 'Complete verification to continue with this donation.',
    walletRequired: 'Connect your wallet to donate crypto.',
    insufficient: function (sym) {
      return 'You do not have enough ' + sym + ' for this donation.';
    },
    gas: 'You may need more gas token to complete this transaction.',
    rejected: 'Donation was not submitted because the wallet request was rejected.',
    reverted: 'Unable to complete this donation. Please try again.',
    expired: 'This donation request expired. Please start a new donation.',
    provider: 'We could not process the payment right now. Please try again.',
    converting: 'Your donation is being processed. We’ll update the status when conversion is complete.',
    noReceipt: 'A receipt is not available for this donation.',
    timeout: 'This is taking longer than expected. We’ll update the status when confirmation is available.'
  };

  /* ── Demo user-state module - IN-MEMORY ONLY (resets on reload; PRD §2 access rules) ── */
  var STATES = [{
    id: 'wallet',
    label: 'KYC + wallet connected'
  }, {
    id: 'kyc',
    label: 'KYC verified'
  }, {
    id: 'authed',
    label: 'Logged in (no KYC)'
  }, {
    id: 'public',
    label: 'Public visitor'
  }];
  var userState = 'wallet'; // happy-path default
  var listeners = [];
  function setUserState(s) {
    userState = s;
    listeners.forEach(function (fn) {
      fn(s);
    });
  }
  function onUserState(fn) {
    listeners.push(fn);
  }
  function is(minState) {
    var order = ['public', 'authed', 'kyc', 'wallet'];
    return order.indexOf(userState) >= order.indexOf(minState);
  }
  function renderStatePills(mountId) {
    var el = document.getElementById(mountId);
    if (!el) return;
    el.innerHTML = STATES.map(function (s) {
      return '<button type="button" class="demo-btn' + (s.id === userState ? ' active' : '') + '" data-ustate="' + s.id + '">' + s.label + '</button>';
    }).join('');
    el.querySelectorAll('.demo-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        setUserState(b.getAttribute('data-ustate'));
        renderStatePills(mountId);
      });
    });
  }

  /* ── Helpers ── */
  function fmtUSD(n, dp) {
    return '$' + Number(n).toLocaleString('en-US', {
      minimumFractionDigits: dp == null ? 0 : dp,
      maximumFractionDigits: dp == null ? 0 : dp
    });
  }
  function fmtNum(n) {
    return Number(n).toLocaleString('en-US');
  }
  function shortAddr(a) {
    return a ? a.slice(0, 6) + '...' + a.slice(-4) : '';
  }
  function shortHash(h) {
    return h ? h.slice(0, 10) + '…' + h.slice(-4) : '';
  }
  function fmtDate(isoStr) {
    var d = new Date(isoStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ', ' + d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  }
  function getCentre(id) {
    return CENTERS.find(function (c) {
      return c.id === id;
    }) || CENTERS[0];
  }
  function qs(name) {
    return new URLSearchParams(location.search).get(name);
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  /* Status chip: label + icon, never color alone (PRD §6.4) */
  var STATUS_META = {
    completed: {
      label: 'Completed',
      cls: 'status-completed'
    },
    awaiting_confirmation: {
      label: 'Awaiting confirmation',
      cls: 'status-pending'
    },
    awaiting_signature: {
      label: 'Awaiting signature',
      cls: 'status-pending'
    },
    submitted: {
      label: 'Submitted',
      cls: 'status-pending'
    },
    conversion_pending: {
      label: 'Conversion pending',
      cls: 'status-pending'
    },
    processing: {
      label: 'Processing',
      cls: 'status-pending'
    },
    pending_payment: {
      label: 'Pending payment',
      cls: 'status-pending'
    },
    rejected: {
      label: 'Rejected by user',
      cls: 'status-warn'
    },
    failed: {
      label: 'Failed',
      cls: 'status-failed'
    },
    expired: {
      label: 'Expired',
      cls: 'status-failed'
    },
    requires_resolution: {
      label: 'Needs attention',
      cls: 'status-warn'
    }
  };
  function statusChip(status) {
    var m = STATUS_META[status] || {
      label: status,
      cls: 'status-pending'
    };
    var icons = {
      'status-completed': 'm424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z',
      'status-pending': 'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm112-192 56-56-148-148v-184h-80v216l172 172Z',
      'status-failed': 'M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z',
      'status-warn': 'm40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z'
    };
    return '<span class="don-status-chip ' + m.cls + '"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="' + icons[m.cls] + '"/></svg>' + m.label + '</span>';
  }
  /* Donation lifecycle notification (PRD §4.3.1) -> shared bell feed */
  function notifyDonation(level, title, message, ref, ctaUrl, ctaLabel) {
    if (typeof window.addNotification === 'function') {
      window.addNotification({
        level: level,
        category: 'donation',
        title: title,
        message: message,
        ref: ref,
        ctaUrl: ctaUrl || 'donation-history.html',
        ctaLabel: ctaLabel || 'View donation'
      });
    }
  }

  /* Brand graphic-device artwork (organic blobs) - the DS illustration language; no figurative photos.
     Deterministic per center so each card/hero looks distinct but on-brand. */
  var BLOB_SETS = [[{
    w: 78,
    h: 78,
    br: '60% 40% 70% 30%/40% 60% 40% 60%',
    t: -26,
    r: -14,
    o: 0.16
  }, {
    w: 52,
    h: 52,
    br: '30% 70% 30% 70%/70% 30% 70% 30%',
    b: -16,
    l: -10,
    o: 0.13
  }, {
    w: 34,
    h: 34,
    br: '50%',
    t: 14,
    l: '44%',
    o: 0.10
  }], [{
    w: 70,
    h: 70,
    br: '70% 30% 40% 60%/30% 70% 60% 40%',
    t: -22,
    r: -12,
    o: 0.15
  }, {
    w: 48,
    h: 48,
    br: '40% 60% 60% 40%/60% 40% 40% 60%',
    b: -14,
    l: '20%',
    o: 0.12
  }, {
    w: 30,
    h: 30,
    br: '50% 50% 40% 60%/40% 70% 30% 60%',
    t: 20,
    r: 12,
    o: 0.10
  }], [{
    w: 74,
    h: 74,
    br: '60% 40% 30% 70%/60% 30% 70% 40%',
    t: -18,
    l: -12,
    o: 0.15
  }, {
    w: 50,
    h: 50,
    br: '30% 60% 70% 40%/50% 60% 30% 60%',
    t: 12,
    r: 6,
    o: 0.13
  }, {
    w: 32,
    h: 32,
    br: '50% 50% 40% 60%/40% 70% 30% 60%',
    b: -12,
    l: '34%',
    o: 0.10
  }], [{
    w: 80,
    h: 80,
    br: '40% 60% 65% 35%/55% 45% 55% 45%',
    t: -28,
    r: '30%',
    o: 0.16
  }, {
    w: 46,
    h: 46,
    br: '60% 40% 30% 70%/40% 60% 40% 60%',
    b: -14,
    r: -10,
    o: 0.12
  }, {
    w: 30,
    h: 30,
    br: '50%',
    t: 18,
    l: 8,
    o: 0.10
  }], [{
    w: 72,
    h: 72,
    br: '70% 30% 50% 50%/40% 50% 50% 60%',
    b: -24,
    r: -14,
    o: 0.15
  }, {
    w: 50,
    h: 50,
    br: '40% 60% 40% 60%/60% 40% 60% 40%',
    t: -16,
    l: -8,
    o: 0.12
  }, {
    w: 28,
    h: 28,
    br: '50%',
    t: '40%',
    r: 14,
    o: 0.10
  }], [{
    w: 76,
    h: 76,
    br: '55% 45% 35% 65%/45% 55% 45% 55%',
    t: -22,
    l: '36%',
    o: 0.15
  }, {
    w: 48,
    h: 48,
    br: '30% 70% 60% 40%/60% 40% 30% 70%',
    b: -16,
    l: -10,
    o: 0.12
  }, {
    w: 32,
    h: 32,
    br: '50% 50% 60% 40%/50% 40% 60% 50%',
    t: 16,
    r: -8,
    o: 0.10
  }]];
  function blobArt(seedIndex, palette) {
    var set = BLOB_SETS[(seedIndex % BLOB_SETS.length + BLOB_SETS.length) % BLOB_SETS.length];
    var cols = palette || ['rgba(255,255,171,VAR)', 'rgba(235,252,245,VAR)', 'rgba(144,194,184,VAR)'];
    return set.map(function (b, i) {
      var pos = '';
      if (b.t != null) pos += 'top:' + (typeof b.t === 'number' ? b.t + '%' : b.t) + ';';
      if (b.b != null) pos += 'bottom:' + (typeof b.b === 'number' ? b.b + '%' : b.b) + ';';
      if (b.l != null) pos += 'left:' + (typeof b.l === 'number' ? b.l + '%' : b.l) + ';';
      if (b.r != null) pos += 'right:' + (typeof b.r === 'number' ? b.r + '%' : b.r) + ';';
      var col = cols[i % cols.length].replace('VAR', b.o);
      return '<span class="hc-blob" style="width:' + b.w + '%;height:' + b.h + '%;border-radius:' + b.br + ';background:' + col + ';' + pos + '"></span>';
    }).join('');
  }
  function centreIndex(id) {
    return CENTERS.findIndex(function (c) {
      return c.id === id;
    });
  }
  function fmtCcy(code, n) {
    var f = fiatCcy(code);
    return f.symbol + Number(n).toLocaleString('en-US', {
      minimumFractionDigits: code === 'VND' ? 0 : 2,
      maximumFractionDigits: code === 'VND' ? 0 : 2
    });
  }
  window.UNERA_DON = {
    blobArt: blobArt,
    centreIndex: centreIndex,
    CENTERS: CENTERS,
    BALANCES: BALANCES,
    PRICES: PRICES,
    GAS: GAS,
    HISTORY: HISTORY,
    SUMMARY: SUMMARY,
    STATES: STATES,
    /* FE-208 additions */
    HC_STATUS_LABEL: HC_STATUS_LABEL,
    categories: categories,
    SETTLEMENT: SETTLEMENT,
    FEES: FEES,
    processingFee: processingFee,
    conversionFee: conversionFee,
    FIAT: FIAT,
    fiatCcy: fiatCcy,
    fmtCcy: fmtCcy,
    uniswapQuote: uniswapQuote,
    HP_STATE: HP_STATE,
    hpChip: hpChip,
    ERR: ERR,
    MIN_USD: MIN_USD,
    MAX_USD: MAX_USD,
    getUserState: function () {
      return userState;
    },
    setUserState: setUserState,
    onUserState: onUserState,
    is: is,
    renderStatePills: renderStatePills,
    fmtUSD: fmtUSD,
    fmtNum: fmtNum,
    shortAddr: shortAddr,
    shortHash: shortHash,
    fmtDate: fmtDate,
    getCentre: getCentre,
    qs: qs,
    esc: esc,
    statusChip: statusChip,
    notifyDonation: notifyDonation
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/donation-data.js", error: String((e && e.message) || e) }); }

// unera-pages/js/legacy/auth-flow.js
try { (() => {
/**
 * Huma Authentication Flow Manager
 * Handles signup flow, 2FA, KYC status, and dashboard restrictions
 * 
 * Usage: Include in all auth pages and dashboard
 * <script src="auth-flow.js"></script>
 */

// ========================================
// AUTHENTICATION STATE MANAGEMENT
// ========================================

const AuthFlow = {
  // Get current user state
  getState() {
    return {
      // Email verification
      email: localStorage.getItem('signupEmail') || null,
      emailVerified: localStorage.getItem('emailVerified') === 'true',
      // User info
      firstName: localStorage.getItem('userFirstName') || null,
      lastName: localStorage.getItem('userLastName') || null,
      fullName: localStorage.getItem('userName') || null,
      // 2FA status
      twoFAEnabled: localStorage.getItem('2faEnabled') === 'true',
      twoFAMethod: localStorage.getItem('2faMethod') || null,
      twoFASkipped: localStorage.getItem('2faSkipped') === 'true',
      // KYC status
      kycStatus: localStorage.getItem('kycStatus') || 'not-started',
      // 'not-started', 'skipped', 'pending', 'completed'
      kycSkippedDate: localStorage.getItem('kycSkippedDate') || null,
      // Login state
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
      loginTimestamp: localStorage.getItem('loginTimestamp') || null,
      // Session
      sessionToken: localStorage.getItem('sessionToken') || null
    };
  },
  // Update state
  setState(key, value) {
    localStorage.setItem(key, value);
  },
  // Clear all auth data (logout)
  clearState() {
    const keys = ['signupEmail', 'emailVerified', 'userFirstName', 'userLastName', 'userName', '2faEnabled', '2faMethod', '2faSkipped', 'kycStatus', 'kycSkippedDate', 'isLoggedIn', 'loginTimestamp', 'sessionToken'];
    keys.forEach(key => localStorage.removeItem(key));
  },
  // Check if user can access a feature
  canAccess(feature) {
    const state = this.getState();
    switch (feature) {
      case 'add-money':
      case 'send':
      case 'donate':
      case 'withdraw':
        // Requires completed KYC
        return state.kycStatus === 'completed';
      case 'wallet':
      case 'explore':
        // Always accessible
        return true;
      default:
        return false;
    }
  }
};

// ========================================
// DASHBOARD RESTRICTIONS
// ========================================

const DashboardRestrictions = {
  // Initialize restrictions on dashboard load
  init() {
    const state = AuthFlow.getState();
    const urlParams = new URLSearchParams(window.location.search);
    console.log('Dashboard State:', state);

    // Show KYC banner if not completed
    if (state.kycStatus !== 'completed') {
      this.showKYCBanner(state.kycStatus);
    } else {
      this.hideKYCBanner();
    }

    // Lock features if KYC not completed
    if (state.kycStatus !== 'completed') {
      this.lockFeatures();
    }

    // Show welcome message if coming from signup
    if (urlParams.get('welcome') === 'true') {
      this.showWelcomeMessage();
    }
  },
  // Show KYC warning banner
  showKYCBanner(status) {
    const banner = document.getElementById('kycAlert');
    if (!banner) return;
    banner.style.display = 'flex';

    // Update message based on status
    const titleEl = banner.querySelector('.alert-title');
    const descEl = banner.querySelector('.alert-description');
    if (status === 'skipped') {
      titleEl.textContent = 'Complete verification to unlock all features';
      descEl.textContent = 'Add funds, make donations, and send money by verifying your identity (takes 2 minutes)';
    } else if (status === 'pending') {
      titleEl.textContent = '⏳ Verification in Progress';
      descEl.textContent = 'We\'re reviewing your documents. You\'ll be notified within 24 hours.';
      // Hide "Verify Now" button for pending
      const ctaBtn = banner.querySelector('.alert-cta');
      if (ctaBtn) ctaBtn.style.display = 'none';
    } else {
      titleEl.textContent = 'Complete your verification';
      descEl.textContent = 'Verify your identity to raise your transaction limits and use every feature';
    }
  },
  // Hide KYC banner
  hideKYCBanner() {
    const banner = document.getElementById('kycAlert');
    if (banner) {
      banner.style.display = 'none';
    }
  },
  // Lock features
  lockFeatures() {
    const restrictedActions = [{
      selector: 'a[href="add-money.html"]',
      title: 'Add Money',
      feature: 'add-money'
    }, {
      selector: 'a[href*="send"]',
      title: 'Send',
      feature: 'send'
    }, {
      selector: 'a[href*="donate"]',
      title: 'Donate',
      feature: 'donate'
    }];
    restrictedActions.forEach(action => {
      const elements = document.querySelectorAll(action.selector);
      elements.forEach(el => {
        // Add lock badge
        if (!el.querySelector('.lock-badge')) {
          const lockBadge = document.createElement('div');
          lockBadge.className = 'lock-badge';
          lockBadge.innerHTML = '🔒';
          lockBadge.setAttribute('aria-label', 'Locked - verification required');
          el.appendChild(lockBadge);
        }

        // Add locked class
        el.classList.add('locked');

        // Change opacity
        el.style.opacity = '0.6';
        el.style.cursor = 'not-allowed';

        // Update description
        const desc = el.querySelector('.action-card-desc');
        if (desc) {
          desc.textContent = 'Verification required';
          desc.style.color = 'var(--warning)';
        }

        // Prevent navigation
        el.addEventListener('click', e => {
          e.preventDefault();
          this.showVerificationRequiredModal(action.title);
        });
      });
    });
  },
  // Show verification required modal
  showVerificationRequiredModal(featureName) {
    const modal = document.createElement('div');
    modal.className = 'kyc-modal-overlay';
    modal.innerHTML = `
            <div class="kyc-modal-content" onclick="event.stopPropagation()">
                <div class="kyc-modal-icon">🔒</div>
                <h2 class="kyc-modal-title">Verification Required</h2>
                <p class="kyc-modal-text">
                    To use <strong>${featureName}</strong>, please complete identity verification.
                </p>
                
                <div class="kyc-modal-benefits">
                    <p style="font-weight: 600; margin-bottom: 0.75rem;">Takes only 2 minutes:</p>
                    <ul style="text-align: left; padding-left: 1.5rem; line-height: 1.8;">
                        <li>Upload government-issued ID</li>
                        <li>Take a quick selfie</li>
                        <li>Get approved in ~24 hours</li>
                    </ul>
                </div>
                
                <div class="kyc-modal-actions">
                    <button class="btn-primary" onclick="window.location.href='kyc-verify.html'" style="flex: 1;">
                        Verify Now
                    </button>
                    <button class="btn-secondary" onclick="DashboardRestrictions.closeModal()" style="flex: 1;">
                        Maybe Later
                    </button>
                </div>
            </div>
        `;
    modal.addEventListener('click', () => this.closeModal());
    document.body.appendChild(modal);

    // Focus trap
    setTimeout(() => {
      modal.querySelector('.btn-primary').focus();
    }, 100);
  },
  // Close modal
  closeModal() {
    const modal = document.querySelector('.kyc-modal-overlay');
    if (modal) {
      modal.remove();
    }
  },
  // Show welcome message
  showWelcomeMessage() {
    const toast = document.createElement('div');
    toast.className = 'welcome-toast';
    toast.innerHTML = `
            <div class="toast-icon">🎉</div>
            <div class="toast-content">
                <div class="toast-title">Welcome to Huma!</div>
                <div class="toast-text">Your account has been created successfully</div>
            </div>
        `;
    document.body.appendChild(toast);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      toast.classList.add('slideOut');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }
};

// ========================================
// SIGNUP FLOW MANAGER
// ========================================

const SignupFlow = {
  // Track current step
  currentStep: 1,
  // Steps configuration
  steps: {
    1: {
      name: 'email',
      next: 'verify-email.html'
    },
    2: {
      name: 'verify',
      next: 'signup_2.html?step=details&verified=true'
    },
    3: {
      name: 'details',
      next: 'setup-2fa.html'
    },
    4: {
      name: '2fa',
      next: 'kyc-verify.html?from=signup'
    },
    5: {
      name: 'kyc',
      next: 'dashboard-enhanced.html?welcome=true'
    }
  },
  // Initialize signup flow
  init(step) {
    const urlParams = new URLSearchParams(window.location.search);
    const currentStep = urlParams.get('step');
    if (currentStep === 'details') {
      // Check if email was verified
      if (localStorage.getItem('emailVerified') !== 'true') {
        window.location.href = 'signup_2.html';
        return;
      }
      this.showDetailsForm();
    } else {
      this.showEmailForm();
    }
  },
  // Show email form (step 1)
  showEmailForm() {
    console.log('Step 1: Email Entry');
  },
  // Show details form (step 3)
  showDetailsForm() {
    console.log('Step 3: Name & Password Entry');

    // Pre-fill email if available
    const email = localStorage.getItem('signupEmail');
    if (email) {
      const emailInput = document.getElementById('signupEmail');
      if (emailInput) {
        emailInput.value = email;
        emailInput.disabled = true;
      }
    }
  },
  // Proceed to next step
  nextStep(currentStepName) {
    console.log(`Step ${currentStepName} complete`);

    // Get next URL based on current step
    const stepConfig = Object.values(this.steps).find(s => s.name === currentStepName);
    if (stepConfig) {
      window.location.href = stepConfig.next;
    }
  }
};

// ========================================
// LOGIN FLOW MANAGER
// ========================================

const LoginFlow = {
  // Check if 2FA verification is needed
  async checkAndVerify2FA() {
    const state = AuthFlow.getState();
    if (state.twoFAEnabled) {
      // Show 2FA verification screen
      window.location.href = 'verify-2fa.html';
      return false; // Don't proceed to dashboard yet
    }
    return true; // Can proceed to dashboard
  },
  // Check KYC status and show reminder
  checkKYCStatus() {
    const state = AuthFlow.getState();
    if (state.kycStatus !== 'completed') {
      // Show KYC reminder modal after a delay
      setTimeout(() => {
        this.showKYCReminder();
      }, 2000);
    }
  },
  // Show KYC reminder modal
  showKYCReminder() {
    const state = AuthFlow.getState();
    if (sessionStorage.getItem('kycReminderDismissed') === 'true') {
      return; // Don't show again this session
    }
    const modal = document.createElement('div');
    modal.className = 'kyc-modal-overlay';
    modal.innerHTML = `
            <div class="kyc-modal-content" onclick="event.stopPropagation()">
                <div class="kyc-modal-icon">🎯</div>
                <h2 class="kyc-modal-title">Complete Your Profile</h2>
                <p class="kyc-modal-text">
                    Unlock all features by completing identity verification
                </p>
                
                <div class="kyc-modal-benefits" style="background: rgba(16, 185, 129, 0.05); padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0;">
                    <p style="font-weight: 600; margin-bottom: 0.75rem;">What you'll unlock:</p>
                    <ul style="text-align: left; padding-left: 1.5rem; line-height: 1.8;">
                        <li>✓ Add funds to your wallet</li>
                        <li>✓ Make donations to centers</li>
                        <li>✓ Send money to anyone</li>
                        <li>✓ Withdraw to your bank account</li>
                    </ul>
                    <p style="margin-top: 1rem; color: var(--text-secondary);">
                        ⏱️ Takes only 2 minutes
                    </p>
                </div>
                
                <div class="kyc-modal-actions">
                    <button class="btn-primary" onclick="window.location.href='kyc-verify.html'" style="flex: 1;">
                        Verify Now
                    </button>
                    <button class="btn-secondary" onclick="LoginFlow.dismissKYCReminder()" style="flex: 1;">
                        Later
                    </button>
                </div>
            </div>
        `;
    modal.addEventListener('click', () => this.dismissKYCReminder());
    document.body.appendChild(modal);
  },
  // Dismiss KYC reminder
  dismissKYCReminder() {
    sessionStorage.setItem('kycReminderDismissed', 'true');
    const modal = document.querySelector('.kyc-modal-overlay');
    if (modal) modal.remove();
  }
};

// ========================================
// PROTECTED ROUTES
// ========================================

function checkAuth() {
  const state = AuthFlow.getState();
  const currentPage = window.location.pathname.split('/').pop();

  // List of protected pages
  const protectedPages = ['dashboard-enhanced.html', 'wallet-enhanced.html', 'add-money.html', 'send-enhanced.html', 'donate.html', 'withdraw.html'];

  // Check if current page is protected
  if (protectedPages.includes(currentPage)) {
    if (!state.isLoggedIn) {
      // Not logged in - redirect to login
      console.log('Protected page - redirecting to login');
      window.location.href = `login_2.html?redirect=${encodeURIComponent(currentPage)}`;
      return false;
    }
  }
  return true;
}

// ========================================
// DISMISS ALERT FUNCTION
// ========================================

function dismissAlert() {
  const banner = document.getElementById('kycAlert');
  if (banner) {
    banner.style.display = 'none';
    sessionStorage.setItem('kycBannerDismissed', 'true');
  }
}

// ========================================
// AUTO-INITIALIZE ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop();
  console.log('Auth Flow Manager Loaded');
  console.log('Current Page:', currentPage);

  // Initialize based on page type
  if (currentPage === 'dashboard-enhanced.html') {
    // Check auth first
    if (checkAuth()) {
      DashboardRestrictions.init();
    }
  } else if (currentPage === 'login_2.html') {
    // Check if already logged in
    if (AuthFlow.getState().isLoggedIn) {
      window.location.href = 'dashboard-enhanced.html';
    }
  } else if (currentPage === 'signup_2.html') {
    SignupFlow.init();
  }

  // Log current state for debugging
  const state = AuthFlow.getState();
  console.log('Auth State:', {
    email: state.email,
    emailVerified: state.emailVerified,
    name: state.fullName,
    twoFA: state.twoFAEnabled ? `Enabled (${state.twoFAMethod})` : 'Disabled',
    kyc: state.kycStatus,
    loggedIn: state.isLoggedIn
  });
});

// ========================================
// DEMO MODE HELPERS
// ========================================

// For testing - simulate user states
window.AuthFlowDemo = {
  // Simulate complete KYC
  completeKYC() {
    localStorage.setItem('kycStatus', 'completed');
    console.log('KYC marked as completed');
    window.location.reload();
  },
  // Simulate skipped KYC
  skipKYC() {
    localStorage.setItem('kycStatus', 'skipped');
    console.log('KYC marked as skipped');
    window.location.reload();
  },
  // Simulate pending KYC
  pendingKYC() {
    localStorage.setItem('kycStatus', 'pending');
    console.log('⏳ KYC marked as pending');
    window.location.reload();
  },
  // Enable 2FA
  enable2FA() {
    localStorage.setItem('2faEnabled', 'true');
    localStorage.setItem('2faMethod', 'sms');
    console.log('2FA enabled');
  },
  // Login user
  login() {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginTimestamp', new Date().toISOString());
    localStorage.setItem('userFirstName', 'John');
    localStorage.setItem('userLastName', 'Doe');
    localStorage.setItem('userName', 'John Doe');
    localStorage.setItem('signupEmail', 'john@example.com');
    console.log('User logged in');
    window.location.reload();
  },
  // Logout user
  logout() {
    AuthFlow.clearState();
    console.log('User logged out');
    window.location.href = 'login_2.html';
  },
  // Reset everything
  reset() {
    AuthFlow.clearState();
    sessionStorage.clear();
    console.log('All state cleared');
    window.location.reload();
  },
  // Show current state
  showState() {
    console.table(AuthFlow.getState());
  }
};
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #10B981;');
console.log('%cHuma Auth Flow Manager Ready', 'font-weight: bold; font-size: 14px; color: #10B981;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #10B981;');
console.log('');
console.log('%cTesting Commands (open console):', 'font-weight: bold; color: #0EA5E9;');
console.log('  AuthFlowDemo.showState()    - View current auth state');
console.log('  AuthFlowDemo.login()        - Simulate login');
console.log('  AuthFlowDemo.completeKYC()  - Mark KYC as complete');
console.log('  AuthFlowDemo.skipKYC()      - Mark KYC as skipped (restricted)');
console.log('  AuthFlowDemo.pendingKYC()   - Mark KYC as pending');
console.log('  AuthFlowDemo.enable2FA()    - Enable 2FA');
console.log('  AuthFlowDemo.logout()       - Logout user');
console.log('  AuthFlowDemo.reset()        - Clear all data');
console.log('');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #10B981;');
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/js/legacy/auth-flow.js", error: String((e && e.message) || e) }); }

// unera-pages/js/legacy/code-input-handler.js
try { (() => {
/**
 * Reusable Code Input Handler for OTP/Verification Codes
 * Provides auto-advance, backspace navigation, and paste support
 * 
 * Usage:
 *   initCodeInputs('.code-digit'); // Initialize all code inputs
 *   initCodeInputs('#myForm .code-digit'); // Initialize specific inputs
 */

function initCodeInputs(selector = '.code-digit') {
  const inputs = document.querySelectorAll(selector);
  if (!inputs || inputs.length === 0) {
    console.warn('No code inputs found with selector:', selector);
    return;
  }

  // Auto-focus first input
  if (inputs[0]) {
    inputs[0].focus();
  }
  inputs.forEach((input, index) => {
    // Handle input event - auto-advance
    input.addEventListener('input', e => {
      const value = e.target.value;

      // Only allow numeric input
      if (!/^\d*$/.test(value)) {
        e.target.value = '';
        return;
      }

      // Keep only first character if multiple entered
      if (value.length > 1) {
        e.target.value = value.charAt(0);
      }

      // Add filled state
      if (e.target.value) {
        e.target.classList.add('filled');

        // Auto-advance to next input
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
          inputs[index + 1].select(); // Select any existing content
        }
      } else {
        e.target.classList.remove('filled');
      }
    });

    // Handle keydown - backspace navigation
    input.addEventListener('keydown', e => {
      // Backspace - move to previous input if current is empty
      if (e.key === 'Backspace') {
        if (!e.target.value && index > 0) {
          e.preventDefault();
          inputs[index - 1].focus();
          inputs[index - 1].select();
        }
      }

      // Arrow left - move to previous input
      if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        inputs[index - 1].focus();
        inputs[index - 1].select();
      }

      // Arrow right - move to next input
      if (e.key === 'ArrowRight' && index < inputs.length - 1) {
        e.preventDefault();
        inputs[index + 1].focus();
        inputs[index + 1].select();
      }
    });

    // Handle paste event
    input.addEventListener('paste', e => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
      if (pastedData.length > 0) {
        // Fill inputs starting from current position
        pastedData.split('').forEach((char, i) => {
          if (index + i < inputs.length) {
            inputs[index + i].value = char;
            inputs[index + i].classList.add('filled');
          }
        });

        // Focus the last filled input or next empty one
        const nextIndex = Math.min(index + pastedData.length, inputs.length - 1);
        inputs[nextIndex].focus();
      }
    });

    // Clear error state on focus
    input.addEventListener('focus', () => {
      inputs.forEach(inp => inp.classList.remove('error'));
    });

    // Select all content on focus for easy replacement
    input.addEventListener('focus', e => {
      e.target.select();
    });

    // Prevent non-numeric keyboard input
    input.addEventListener('keypress', e => {
      if (!/^\d$/.test(e.key) && e.key !== 'Enter') {
        e.preventDefault();
      }
    });
  });
  console.log(`Code input handler initialized for ${inputs.length} inputs`);
}

/**
 * Get the code value from code inputs
 */
function getCodeValue(selector = '.code-digit') {
  const inputs = document.querySelectorAll(selector);
  return Array.from(inputs).map(input => input.value).join('');
}

/**
 * Clear all code inputs
 */
function clearCodeInputs(selector = '.code-digit') {
  const inputs = document.querySelectorAll(selector);
  inputs.forEach(input => {
    input.value = '';
    input.classList.remove('filled', 'error');
  });
  if (inputs[0]) {
    inputs[0].focus();
  }
}

/**
 * Set error state on code inputs
 */
function setCodeInputError(selector = '.code-digit') {
  const inputs = document.querySelectorAll(selector);
  inputs.forEach(input => {
    input.classList.add('error');
  });
}

// Auto-initialize on DOM load if .code-digit elements exist
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const codeInputs = document.querySelectorAll('.code-digit');
    if (codeInputs.length > 0) {
      initCodeInputs('.code-digit');
    }
  });
} else {
  // DOM already loaded
  const codeInputs = document.querySelectorAll('.code-digit');
  if (codeInputs.length > 0) {
    initCodeInputs('.code-digit');
  }
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/js/legacy/code-input-handler.js", error: String((e && e.message) || e) }); }

// unera-pages/js/legacy/wallet-prompt.js
try { (() => {
/**
 * Wallet Prompt System
 * Reusable component for prompting users to create a wallet before transactions
 */

const WalletPrompt = {
  /**
   * Check if user has a wallet
   * @returns {boolean}
   */
  hasWallet() {
    return !!localStorage.getItem('walletAddress');
  },
  /**
   * Check if this is user's first time on a specific page
   * @param {string} page - Page identifier (convert, donate, send)
   * @returns {boolean}
   */
  isFirstVisit(page) {
    const key = `visited_${page}`;
    const hasVisited = localStorage.getItem(key);
    if (!hasVisited) {
      localStorage.setItem(key, 'true');
      return true;
    }
    return false;
  },
  /**
   * Show wallet creation modal
   * @param {Object} options - Configuration options
   */
  showModal(options) {
    const {
      title = '💳 Connect Wallet',
      message = 'Connect your wallet to continue with this action.',
      benefits = [],
      page = 'unknown',
      isFirstTime = true,
      onCreateWallet = null,
      onDismiss = null
    } = options;

    // Create modal HTML
    const modalHTML = `
            <div id="walletPromptModal" class="wallet-prompt-modal" role="dialog" aria-labelledby="walletPromptTitle" aria-modal="true">
                <div class="wallet-prompt-overlay" onclick="WalletPrompt.closeModal('${page}')"></div>
                <div class="wallet-prompt-content">
                    <button class="wallet-prompt-close" onclick="WalletPrompt.closeModal('${page}')" aria-label="Close modal">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                    
                    <div class="wallet-prompt-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="url(#walletGradient)" stroke-width="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                            <line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                        <svg width="0" height="0" style="position: absolute;">
                            <defs>
                                <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#0EA5E9;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    
                    <h2 id="walletPromptTitle" class="wallet-prompt-title">${title}</h2>
                    <p class="wallet-prompt-message">${message}</p>
                    
                    ${isFirstTime ? `
                        <div class="wallet-prompt-first-time">
                            <div class="wallet-prompt-badge">
                                First time here?
                            </div>
                            <p class="wallet-prompt-first-time-text">
                                Welcome! To get started, you'll need to connect your wallet (MetaMask or WalletConnect). 
                                This is your secure digital account that only you control.
                            </p>
                        </div>
                    ` : ''}
                    
                    ${benefits.length > 0 ? `
                        <div class="wallet-prompt-benefits">
                            <div class="wallet-prompt-benefits-title">✨ What You'll Get</div>
                            <ul class="wallet-prompt-benefits-list">
                                ${benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <div class="wallet-prompt-features">
                        <div class="wallet-prompt-feature">
                            <span class="wallet-prompt-feature-icon">⏱️</span>
                            <div class="wallet-prompt-feature-text">
                                <div class="wallet-prompt-feature-label">Quick Setup</div>
                                <div class="wallet-prompt-feature-value">3-5 minutes</div>
                            </div>
                        </div>
                        <div class="wallet-prompt-feature">
                            <span class="wallet-prompt-feature-icon">🔒</span>
                            <div class="wallet-prompt-feature-text">
                                <div class="wallet-prompt-feature-label">Your Control</div>
                                <div class="wallet-prompt-feature-value">Your keys only</div>
                            </div>
                        </div>
                        <div class="wallet-prompt-feature">
                            <span class="wallet-prompt-feature-icon">✓</span>
                            <div class="wallet-prompt-feature-text">
                                <div class="wallet-prompt-feature-label">Secure</div>
                                <div class="wallet-prompt-feature-value">Bank-level</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="wallet-prompt-actions">
                        <button class="wallet-prompt-btn wallet-prompt-btn-primary" onclick="WalletPrompt.createWallet('${page}')">
                            Connect Wallet Now
                        </button>
                        <button class="wallet-prompt-btn wallet-prompt-btn-secondary" onclick="WalletPrompt.closeModal('${page}')">
                            I'll do this later
                        </button>
                    </div>
                    
                    <div class="wallet-prompt-footer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        Your data is encrypted and never shared
                    </div>
                </div>
            </div>
        `;

    // Inject styles if not already present
    if (!document.getElementById('walletPromptStyles')) {
      const styles = document.createElement('style');
      styles.id = 'walletPromptStyles';
      styles.textContent = `
                .wallet-prompt-modal {
                    position: fixed;
                    inset: 0;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: walletPromptFadeIn 0.3s ease-out;
                }
                
                @keyframes walletPromptFadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                .wallet-prompt-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                }
                
                .wallet-prompt-content {
                    position: relative;
                    background: white;
                    border-radius: 1.5rem;
                    padding: 3rem 2.5rem;
                    max-width: 540px;
                    width: calc(100% - 2rem);
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: walletPromptSlideUp 0.3s ease-out;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                
                .wallet-prompt-content::-webkit-scrollbar {
                    display: none;
                }
                
                @keyframes walletPromptSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                .wallet-prompt-close {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    width: 36px;
                    height: 36px;
                    border: none;
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: #6B7280;
                }
                
                .wallet-prompt-close:hover {
                    background: rgba(0, 0, 0, 0.1);
                    transform: rotate(90deg);
                }
                
                .wallet-prompt-icon {
                    width: 96px;
                    height: 96px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 0 12px rgba(16, 185, 129, 0.05);
                }
                
                .wallet-prompt-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.875rem;
                    font-weight: 700;
                    text-align: center;
                    color: #1F2937;
                    margin-bottom: 0.75rem;
                    line-height: 1.2;
                }
                
                .wallet-prompt-message {
                    text-align: center;
                    color: #6B7280;
                    font-size: 1rem;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }
                
                .wallet-prompt-first-time {
                    background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(249, 115, 22, 0.08) 100%);
                    border: 1.5px solid rgba(245, 158, 11, 0.3);
                    border-radius: 1rem;
                    padding: 1.25rem;
                    margin-bottom: 1.5rem;
                }
                
                .wallet-prompt-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: linear-gradient(135deg, #F59E0B 0%, #F97316 100%);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 2rem;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 0.75rem;
                }
                
                .wallet-prompt-first-time-text {
                    color: #1F2937;
                    font-size: 0.938rem;
                    line-height: 1.6;
                    margin: 0;
                }
                
                .wallet-prompt-benefits {
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%);
                    border: 1.5px solid rgba(16, 185, 129, 0.2);
                    border-radius: 1rem;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                
                .wallet-prompt-benefits-title {
                    font-weight: 600;
                    color: #10B981;
                    font-size: 0.938rem;
                    margin-bottom: 0.75rem;
                }
                
                .wallet-prompt-benefits-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .wallet-prompt-benefits-list li {
                    color: #1F2937;
                    font-size: 0.938rem;
                    line-height: 1.8;
                    padding-left: 1.5rem;
                    position: relative;
                    text-align: left;
                }
                
                .wallet-prompt-benefits-list li::before {
                    content: '✓';
                    position: absolute;
                    left: 0;
                    color: #10B981;
                    font-weight: bold;
                }
                
                .wallet-prompt-features {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                
                .wallet-prompt-feature {
                    text-align: center;
                }
                
                .wallet-prompt-feature-icon {
                    font-size: 1.5rem;
                    display: block;
                    margin-bottom: 0.5rem;
                }
                
                .wallet-prompt-feature-label {
                    font-size: 0.75rem;
                    color: #6B7280;
                    margin-bottom: 0.25rem;
                }
                
                .wallet-prompt-feature-value {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #1F2937;
                }
                
                .wallet-prompt-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }
                
                .wallet-prompt-btn {
                    width: 100%;
                    padding: 1rem 2rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    font-size: 1rem;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: 'Inter', sans-serif;
                }
                
                .wallet-prompt-btn-primary {
                    background: linear-gradient(135deg, #10B981 0%, #0EA5E9 100%);
                    color: white;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                }
                
                .wallet-prompt-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
                }
                
                .wallet-prompt-btn-secondary {
                    background: white;
                    color: #6B7280;
                    border: 2px solid #E5E7EB;
                }
                
                .wallet-prompt-btn-secondary:hover {
                    background: #F3F4F6;
                    border-color: #D1D5DB;
                }
                
                .wallet-prompt-footer {
                    text-align: center;
                    font-size: 0.813rem;
                    color: #9CA3AF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
                
                @media (max-width: 640px) {
                    .wallet-prompt-content {
                        padding: 2rem 1.5rem;
                    }
                    
                    .wallet-prompt-title {
                        font-size: 1.5rem;
                    }
                    
                    .wallet-prompt-features {
                        grid-template-columns: 1fr;
                    }
                }
            `;
      document.head.appendChild(styles);
    }

    // Remove existing modal if present
    const existingModal = document.getElementById('walletPromptModal');
    if (existingModal) {
      existingModal.remove();
    }

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';

    // Store callback if provided
    if (onCreateWallet) {
      window._walletPromptCallback = onCreateWallet;
    }
    if (onDismiss) {
      window._walletPromptDismissCallback = onDismiss;
    }

    // Track analytics
    this._trackEvent('wallet_prompt_shown', {
      page,
      isFirstTime
    });
  },
  /**
   * Close the modal
   * @param {string} page - Page identifier
   */
  closeModal(page) {
    const modal = document.getElementById('walletPromptModal');
    if (modal) {
      modal.style.animation = 'walletPromptFadeOut 0.2s ease-out forwards';
      setTimeout(() => {
        modal.remove();
        document.body.style.overflow = '';
      }, 200);
    }

    // Call dismiss callback if exists
    if (window._walletPromptDismissCallback) {
      window._walletPromptDismissCallback();
      delete window._walletPromptDismissCallback;
    }
    this._trackEvent('wallet_prompt_dismissed', {
      page
    });
  },
  /**
   * Navigate to wallet connection (UPDATED: replaced creation with connect flow)
   * @param {string} returnPage - Page to return to after wallet connection
   */
  createWallet(returnPage) {
    // TEMPORARILY HIDDEN: Wallet creation flow
    // Now using Connect Wallet flow (Uniswap-style)

    // Store return page for after wallet connection
    localStorage.setItem('walletConnectionReturn', returnPage);

    // Track event
    this._trackEvent('wallet_connection_started', {
      from: returnPage
    });

    // Open connect wallet modal instead of navigating to creation page
    if (typeof openWalletModal === 'function') {
      openWalletModal();
    } else {
      // Fallback: redirect to wallet page which has the connect button
      window.location.href = 'wallet-enhanced.html';
    }
  },
  /**
   * Check wallet and show prompt if needed
   * @param {Object} options - Configuration options
   * @returns {boolean} - True if has wallet, false if prompt shown
   */
  checkAndPrompt(options) {
    if (this.hasWallet()) {
      return true;
    }

    // Show wallet creation suggestion (optional - user can dismiss)
    const {
      page
    } = options;
    const isFirstTime = this.isFirstVisit(page);
    this.showModal({
      ...options,
      isFirstTime
    });
    return false;
  },
  /**
   * Show dashboard banner for wallet creation
   * Only shows if KYC is already verified (KYC banner takes priority)
   */
  showDashboardBanner() {
    // Don't show if user already has wallet or dismissed the banner
    if (this.hasWallet() || localStorage.getItem('walletBannerDismissed')) {
      return;
    }

    // Priority: KYC banner shows first, wallet banner shows after KYC is verified
    const kycStatus = localStorage.getItem('kycStatus');
    if (kycStatus !== 'verified') {
      return; // Don't show wallet banner until KYC is verified
    }
    const bannerHTML = `
            <div id="walletBanner" class="wallet-banner">
                <div class="wallet-banner-content">
                    <div class="wallet-banner-icon">💳</div>
                    <div class="wallet-banner-text">
                        <div class="wallet-banner-title">Connect Your Wallet</div>
                        <div class="wallet-banner-description">Connect MetaMask or WalletConnect to unlock full features and track your impact</div>
                    </div>
                    <div class="wallet-banner-actions">
                        <button class="wallet-banner-btn" onclick="toggleConnectDropdown()">
                            Connect Wallet
                        </button>
                        <button class="wallet-banner-dismiss" onclick="WalletPrompt.dismissBanner()" aria-label="Dismiss banner">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

    // Inject banner styles if not already present
    if (!document.getElementById('walletBannerStyles')) {
      const styles = document.createElement('style');
      styles.id = 'walletBannerStyles';
      styles.textContent = `
                .wallet-banner {
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(14, 165, 233, 0.95) 100%);
                    padding: 1.25rem 2rem;
                    animation: walletBannerSlideDown 0.5s ease-out;
                    position: relative;
                    overflow: hidden;
                    z-index: 10;
                    margin-top: 0;
                    pointer-events: none;
                }
                
                .wallet-banner::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -10%;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
                    pointer-events: none;
                }
                
                @keyframes walletBannerSlideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .wallet-banner-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    position: relative;
                    z-index: 1;
                    pointer-events: auto;
                }
                
                .wallet-banner-icon {
                    font-size: 2.5rem;
                    flex-shrink: 0;
                }
                
                .wallet-banner-text {
                    flex: 1;
                }
                
                .wallet-banner-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.25rem;
                }
                
                .wallet-banner-description {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.9);
                    line-height: 1.5;
                }
                
                .wallet-banner-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .wallet-banner-btn {
                    background: white;
                    color: #10B981;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    border: none;
                    pointer-events: auto;
                    font-weight: 600;
                    font-size: 0.938rem;
                    min-height: 46px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-family: 'Inter', sans-serif;
                    white-space: nowrap;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .wallet-banner-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .wallet-banner-dismiss {
                    width: 32px;
                    height: 32px;
                    border: none;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: white;
                    flex-shrink: 0;
                    pointer-events: auto;
                }
                
                .wallet-banner-dismiss:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: rotate(90deg);
                }
                
                @media (max-width: 768px) {
                    .wallet-banner {
                        padding: 1rem;
                    }
                    
                    .wallet-banner-content {
                        flex-wrap: wrap;
                        gap: 1rem;
                    }
                    
                    .wallet-banner-icon {
                        font-size: 2rem;
                    }
                    
                    .wallet-banner-title {
                        font-size: 1rem;
                    }
                    
                    .wallet-banner-description {
                        font-size: 0.813rem;
                    }
                    
                    .wallet-banner-actions {
                        width: 100%;
                        justify-content: space-between;
                    }
                    
                    .wallet-banner-btn {
                        flex: 1;
                        font-size: 0.875rem;
                        padding: 0.688rem 1.25rem;
                        min-height: 44px;
                    }
                }
            `;
      document.head.appendChild(styles);
    }

    // Find insertion point (after nav or at top of main content)
    const nav = document.querySelector('.nav');
    const main = document.querySelector('main, .main-container, .dashboard-container');
    if (nav && nav.nextElementSibling) {
      nav.insertAdjacentHTML('afterend', bannerHTML);
    } else if (main) {
      main.insertAdjacentHTML('beforebegin', bannerHTML);
    } else {
      document.body.insertAdjacentHTML('afterbegin', bannerHTML);
    }
    this._trackEvent('wallet_banner_shown', {
      page: 'dashboard'
    });
  },
  /**
   * Dismiss the dashboard banner
   */
  dismissBanner() {
    localStorage.setItem('walletBannerDismissed', 'true');
    const banner = document.getElementById('walletBanner');
    if (banner) {
      banner.style.animation = 'walletBannerSlideUp 0.3s ease-out forwards';
      setTimeout(() => banner.remove(), 300);
    }

    // Add slideUp animation
    if (!document.getElementById('walletBannerSlideUp')) {
      const style = document.createElement('style');
      style.id = 'walletBannerSlideUp';
      style.textContent = `
                @keyframes walletBannerSlideUp {
                    from {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(-100%);
                    }
                }
            `;
      document.head.appendChild(style);
    }
    this._trackEvent('wallet_banner_dismissed', {});
  },
  /**
   * Track analytics event (placeholder for integration with analytics service)
   * @param {string} eventName
   * @param {Object} properties
   */
  _trackEvent(eventName, properties) {
    // Integration point for Google Analytics, Mixpanel, etc.
    console.log(`[WalletPrompt] ${eventName}`, properties);

    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, properties);
    // }

    // Example: Mixpanel
    // if (typeof mixpanel !== 'undefined') {
    //     mixpanel.track(eventName, properties);
    // }
  }
};

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check if returning from wallet creation
  const urlParams = new URLSearchParams(window.location.search);
  const returnedFrom = urlParams.get('from');
  if (returnedFrom === 'wallet-creation') {
    const returnPage = localStorage.getItem('walletCreationReturn');
    localStorage.removeItem('walletCreationReturn');

    // Show success message
    if (returnPage) {
      const successMessage = document.createElement('div');
      successMessage.style.cssText = `
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: linear-gradient(135deg, #10B981 0%, #0EA5E9 100%);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.75rem;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                font-weight: 600;
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
            `;
      successMessage.textContent = '✓ Wallet created successfully!';
      document.body.appendChild(successMessage);
      setTimeout(() => {
        successMessage.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => successMessage.remove(), 300);
      }, 3000);
    }
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/js/legacy/wallet-prompt.js", error: String((e && e.message) || e) }); }

// unera-pages/js/wallet/manager.js
try { (() => {
/**
 * Wallet Manager
 * Centralized wallet state management and orchestration
 */

class WalletManager {
  constructor() {
    this.walletState = {
      connected: false,
      address: null,
      chainId: null,
      provider: null,
      providerType: null,
      // 'metamask' | 'walletconnect'
      isDemo: false,
      balances: {},
      transactions: []
    };

    // Load from localStorage if exists
    this.loadFromStorage();
  }
  async connectWallet(providerType) {
    try {
      console.log(`Connecting to ${providerType}...`);
      let result;
      if (providerType === 'metamask') {
        const provider = new MetaMaskProvider();
        result = await provider.connect();
        this.metamaskProvider = provider;
      } else if (providerType === 'walletconnect') {
        const provider = new WalletConnectProviderWrapper();
        result = await provider.connect();
        this.walletConnectProvider = provider;
      } else {
        throw new Error('Unknown provider type');
      }

      // Update state
      this.walletState = {
        connected: true,
        address: result.address,
        chainId: result.chainId,
        provider: result.provider,
        providerType: providerType,
        isDemo: result.isDemo,
        balances: {},
        transactions: []
      };

      // Validate network
      this.validateNetwork(result.chainId);

      // Save to storage
      this.saveToStorage();

      // Fetch balances (mock data for prototype)
      await this.fetchBalances();

      // Fetch transaction history (mock data for prototype)
      await this.fetchTransactionHistory();
      return result;
    } catch (error) {
      console.error('Connection error:', error);
      this.handleError(error);
      throw error;
    }
  }
  validateNetwork(chainId) {
    const supportedChainIds = getSupportedChainIds();
    if (!supportedChainIds.includes(chainId)) {
      const network = getNetworkByChainId(chainId);
      const networkName = network ? network.chainName : 'Unknown';
      console.warn('Unsupported network:', networkName, chainId);
      throw {
        code: 'UNSUPPORTED_NETWORK',
        message: `Unsupported network: ${networkName}. Please switch to Ethereum, Base, or Sepolia.`,
        chainId
      };
    }
    console.log('Network validated:', chainId);
  }
  async fetchBalances() {
    try {
      // PROTOTYPE: Using mock data
      // Frontend team: Replace with real RPC calls
      const network = getNetworkByChainId(this.walletState.chainId);
      const balances = await getMockBalances(this.walletState.address, network?.key || 'ethereum');
      this.walletState.balances = balances;
      this.saveToStorage();
      console.log('Balances fetched:', balances);
    } catch (error) {
      console.error('Error fetching balances:', error);
      // Use default mock balances on error
      this.walletState.balances = {
        eth: '0.00',
        tokens: []
      };
    }
  }
  async fetchTransactionHistory() {
    try {
      // PROTOTYPE: Using mock data
      // Frontend team: Replace with backend API call
      const network = getNetworkByChainId(this.walletState.chainId);
      const transactions = await getMockTransactionHistory(this.walletState.address, network?.key || 'ethereum');
      this.walletState.transactions = transactions;
      this.saveToStorage();
      console.log('Transaction history fetched:', transactions.length, 'transactions');
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      this.walletState.transactions = [];
    }
  }
  disconnect() {
    console.log('Disconnecting wallet...');

    // Call provider-specific disconnect
    if (this.walletState.providerType === 'walletconnect' && this.walletConnectProvider) {
      this.walletConnectProvider.disconnect();
    }

    // Clear state
    this.walletState = {
      connected: false,
      address: null,
      chainId: null,
      provider: null,
      providerType: null,
      isDemo: false,
      balances: {},
      transactions: []
    };

    // Clear storage
    this.clearStorage();
    console.log('Wallet disconnected');
  }
  saveToStorage() {
    try {
      localStorage.setItem('walletAddress', this.walletState.address || '');
      localStorage.setItem('walletProvider', this.walletState.providerType || '');
      localStorage.setItem('walletConnected', this.walletState.connected ? 'true' : 'false');
      localStorage.setItem('walletChainId', this.walletState.chainId || '');
      localStorage.setItem('walletIsDemo', this.walletState.isDemo ? 'true' : 'false');
      localStorage.setItem('walletBalances', JSON.stringify(this.walletState.balances));
      localStorage.setItem('walletTransactions', JSON.stringify(this.walletState.transactions));
      localStorage.setItem('walletConnectedTimestamp', new Date().toISOString());
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }
  loadFromStorage() {
    try {
      const address = localStorage.getItem('walletAddress');
      const provider = localStorage.getItem('walletProvider');
      const connected = localStorage.getItem('walletConnected') === 'true';
      const chainId = localStorage.getItem('walletChainId');
      const isDemo = localStorage.getItem('walletIsDemo') === 'true';
      if (connected && address) {
        this.walletState.connected = connected;
        this.walletState.address = address;
        this.walletState.chainId = chainId;
        this.walletState.providerType = provider;
        this.walletState.isDemo = isDemo;

        // Load balances and transactions
        try {
          this.walletState.balances = JSON.parse(localStorage.getItem('walletBalances') || '{}');
          this.walletState.transactions = JSON.parse(localStorage.getItem('walletTransactions') || '[]');
        } catch (e) {
          this.walletState.balances = {};
          this.walletState.transactions = [];
        }
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  }
  clearStorage() {
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletProvider');
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletChainId');
    localStorage.removeItem('walletIsDemo');
    localStorage.removeItem('walletBalances');
    localStorage.removeItem('walletTransactions');
    localStorage.removeItem('walletConnectedTimestamp');
  }
  handleError(error) {
    console.error('Wallet error:', error);

    // Log specific error types
    if (error.code) {
      console.error('Error code:', error.code);
    }
    if (error.message) {
      console.error('Error message:', error.message);
    }
  }
  getState() {
    return this.walletState;
  }
  isConnected() {
    return this.walletState.connected && this.walletState.address;
  }
  getAddress() {
    return this.walletState.address;
  }
  getShortAddress() {
    if (!this.walletState.address) return '';
    const addr = this.walletState.address;
    return addr.substring(0, 6) + '...' + addr.substring(addr.length - 4);
  }
  getChainId() {
    return this.walletState.chainId;
  }
  getNetwork() {
    return getNetworkByChainId(this.walletState.chainId);
  }
  getBalances() {
    return this.walletState.balances;
  }
  getTransactions() {
    return this.walletState.transactions;
  }
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/js/wallet/manager.js", error: String((e && e.message) || e) }); }

// unera-pages/js/wallet/providers.js
try { (() => {
/* js/wallet/providers.js - optional wallet-provider shims. Stub to avoid 404 in standalone serve. */
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/js/wallet/providers.js", error: String((e && e.message) || e) }); }

// unera-pages/js/wallet/ui.js
try { (() => {
/**
 * Wallet UI Helpers
 * Functions to update UI elements, show notifications, and manage loading states
 */

// Show toast notification
function showNotification(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `wallet-toast wallet-toast-${type}`;
  toast.textContent = message;

  // Apply styles
  Object.assign(toast.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '8px',
    backgroundColor: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: '10000',
    opacity: '0',
    transform: 'translateY(-10px)',
    transition: 'all 0.3s ease'
  });
  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// Show loading state
function showLoading(message = 'Loading...') {
  const overlay = document.createElement('div');
  overlay.id = 'walletLoadingOverlay';
  overlay.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        ">
            <div style="
                background: white;
                padding: 32px 48px;
                border-radius: 12px;
                text-align: center;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            ">
                <div style="
                    width: 40px;
                    height: 40px;
                    border: 4px solid #E5E7EB;
                    border-top-color: #10B981;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 16px;
                "></div>
                <div style="
                    font-size: 16px;
                    font-weight: 500;
                    color: #1F2937;
                ">${message}</div>
            </div>
        </div>
    `;

  // Add spin animation
  const style = document.createElement('style');
  style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(style);
  document.body.appendChild(overlay);
}

// Hide loading state
function hideLoading() {
  const overlay = document.getElementById('walletLoadingOverlay');
  if (overlay) {
    overlay.remove();
  }
}

// Update wallet display in navigation
function updateWalletDisplay(address, provider) {
  const shortAddress = address.substring(0, 6) + '...' + address.substring(address.length - 4);

  // Hide connect button
  const connectBtn = document.getElementById('navConnectBtn');
  if (connectBtn) {
    connectBtn.style.display = 'none';
  }

  // Show wallet link
  const walletLink = document.getElementById('walletNavLink');
  if (walletLink) {
    walletLink.style.display = 'inline-block';
  }

  // Update user profile if exists
  const userProfile = document.getElementById('userProfile');
  if (userProfile) {
    // Find or create wallet badge in user dropdown
    const walletBadge = document.querySelector('.user-wallet-badge');
    if (walletBadge) {
      walletBadge.textContent = shortAddress;
    }
  }
  console.log('UI updated for connected wallet');
}

// Update network badge
function updateNetworkBadge(chainId) {
  const network = getNetworkByChainId(chainId);
  if (!network) return;
  const badge = document.getElementById('networkBadge');
  if (!badge) return;
  const indicator = badge.querySelector('.network-indicator');
  const name = badge.querySelector('.network-name');
  if (indicator && name) {
    name.textContent = network.chainName;

    // Color based on network
    let color = '#10B981'; // Ethereum green
    if (network.key === 'sepolia') color = '#F59E0B'; // Testnet orange
    if (network.key === 'base') color = '#0EA5E9'; // Base blue

    indicator.style.backgroundColor = color;
    badge.style.display = 'flex';
  }
}

// Update balance display
function updateBalanceDisplay(balances) {
  // Update ETH balance
  const ethBalanceEl = document.getElementById('ethBalance');
  if (ethBalanceEl && balances.eth) {
    ethBalanceEl.textContent = parseFloat(balances.eth).toFixed(4);
  }

  // Update token balances
  const tokenBalancesContainer = document.getElementById('tokenBalances');
  if (tokenBalancesContainer && balances.tokens) {
    tokenBalancesContainer.innerHTML = balances.tokens.map(token => `
            <div class="balance-card token-card">
                <div class="token-info">
                    <span class="token-logo">${token.logo || '💰'}</span>
                    <div>
                        <div class="balance-label">${token.symbol}</div>
                        <div class="token-name">${token.name}</div>
                    </div>
                </div>
                <div class="balance-value">${parseFloat(token.balance).toFixed(2)}</div>
            </div>
        `).join('');
  }
}

// Update transaction history display
function updateTransactionDisplay(transactions) {
  const container = document.getElementById('transactionHistoryContainer');
  if (!container) return;
  if (transactions.length === 0) {
    container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #9CA3AF;">
                <div style="font-size: 48px; margin-bottom: 16px;">📭</div>
                <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">No transactions yet</div>
                <div style="font-size: 14px;">Your transaction history will appear here</div>
            </div>
        `;
    return;
  }
  container.innerHTML = transactions.map(tx => {
    const formatted = formatTransaction(tx);
    const typeIcon = tx.type === 'receive' ? '↓' : tx.type === 'send' ? '↑' : '✓';
    const typeColor = tx.type === 'receive' ? '#10B981' : tx.type === 'send' ? '#EF4444' : '#3B82F6';
    return `
            <div class="transaction-row">
                <div class="transaction-type" style="color: ${typeColor};">
                    <span style="font-size: 20px;">${typeIcon}</span>
                    <span>${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</span>
                </div>
                <div class="transaction-token">
                    ${tx.amount} ${tx.token}
                </div>
                <div class="transaction-address">
                    ${tx.type === 'receive' ? 'From' : 'To'}: ${formatted.shortTo}
                </div>
                <div class="transaction-time">${formatted.timeAgo}</div>
                <div class="transaction-link">
                    <a href="${formatted.explorerUrl}" target="_blank" style="color: #10B981; text-decoration: none;">
                        View ↗
                    </a>
                </div>
            </div>
        `;
  }).join('');
}

// Show error modal
function showErrorModal(title, message, onRetry = null) {
  const modal = document.createElement('div');
  modal.id = 'walletErrorModal';
  modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        " onclick="document.getElementById('walletErrorModal').remove()">
            <div style="
                background: white;
                padding: 32px;
                border-radius: 12px;
                max-width: 400px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            " onclick="event.stopPropagation()">
                <div style="
                    font-size: 48px;
                    text-align: center;
                    margin-bottom: 16px;
                ">⚠️</div>
                <h3 style="
                    font-size: 20px;
                    font-weight: 600;
                    color: #1F2937;
                    margin-bottom: 12px;
                    text-align: center;
                ">${title}</h3>
                <p style="
                    font-size: 14px;
                    color: #6B7280;
                    margin-bottom: 24px;
                    text-align: center;
                    line-height: 1.6;
                ">${message}</p>
                <div style="
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                ">
                    ${onRetry ? `
                        <button onclick="document.getElementById('walletErrorModal').remove(); (${onRetry.toString()})()" style="
                            padding: 12px 24px;
                            background: #10B981;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            font-weight: 500;
                            cursor: pointer;
                        ">Try Again</button>
                    ` : ''}
                    <button onclick="document.getElementById('walletErrorModal').remove()" style="
                        padding: 12px 24px;
                        background: #F3F4F6;
                        color: #1F2937;
                        border: none;
                        border-radius: 8px;
                        font-weight: 500;
                        cursor: pointer;
                    ">Close</button>
                </div>
            </div>
        </div>
    `;
  document.body.appendChild(modal);
}

// Error messages for common wallet errors
const ERROR_MESSAGES = {
  4001: {
    title: 'Connection Rejected',
    message: 'You rejected the wallet connection request. Click "Try Again" to reconnect.'
  },
  4100: {
    title: 'Unauthorized',
    message: 'The requested account is not authorized. Please check your wallet settings.'
  },
  4200: {
    title: 'Unsupported Method',
    message: 'This operation is not supported by your wallet.'
  },
  4900: {
    title: 'Disconnected',
    message: 'Your wallet is disconnected. Please reconnect to continue.'
  },
  4901: {
    title: 'Wrong Network',
    message: 'Your wallet is not connected to the correct network.'
  },
  'UNSUPPORTED_NETWORK': {
    title: 'Unsupported Network',
    message: 'Please switch to Ethereum Mainnet, Base, or Sepolia in your wallet.'
  },
  'NETWORK_NOT_ADDED': {
    title: 'Network Not Found',
    message: 'This network is not configured in your wallet. Would you like to add it?'
  },
  'CONNECTION_TIMEOUT': {
    title: 'Connection Timeout',
    message: 'The connection request timed out. Please try again.'
  }
};

// Handle connection error with retry callback
function handleConnectionError(error, retryCallback = null) {
  const errorInfo = ERROR_MESSAGES[error.code] || ERROR_MESSAGES[error.message] || {
    title: 'Connection Failed',
    message: error.message || 'Failed to connect wallet. Please try again.'
  };

  // Pass retry callback to modal
  showErrorModal(errorInfo.title, errorInfo.message, retryCallback);
  console.error('Wallet connection error:', error);
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/js/wallet/ui.js", error: String((e && e.message) || e) }); }

// unera-pages/notifications-bell.js
try { (() => {
/* ============================================================================
   Huma - Notification Bell (self-contained controller)
   Single source of truth for pages that don't already implement the bell
   inline (currently wallet-edge.html, wallet-enhanced.html). Implements the
   Notification Services PRD: LEVEL model (completed/progressing/info/warning/
   error), shared feed on clb_notifications_v2, badge cap 99+, browser-tab
   unread count, "You're all caught up" empty state, arrow-key panel nav.
   Injects its own CSS so the host page needs no notification styles.
   Reads the SAME storage key + item shape as the inline implementations on the
   other pages, so notifications stay consistent app-wide.
   ============================================================================ */
(function () {
  if (window.__uneraBellLoaded) return;
  window.__uneraBellLoaded = true;

  /* ── Injected panel CSS (chrome + items + level treatment) ─────────────── */
  var css = `
    /* ── Bell button + badge - self-sufficient chrome so the bell is correct even if
       consumer-app-nav.css fails to load on a standalone serve (CLAUDE.md nav rule). ── */
    .notification-bell-wrapper { position: relative; }
    .notification-bell-btn { width: 36px; height: 36px; border-radius: 50%; border: none; background: transparent; cursor: pointer; position: relative; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
    .notification-bell-btn:hover { background: rgba(255,255,255,0.1); }
    .notification-bell-btn:hover .notif-bell-icon { color: var(--brand-yellow); }
    .notification-bell-btn:focus { outline: none; }
    .notification-bell-btn:focus-visible { outline: 2px solid var(--brand-yellow); outline-offset: 2px; }
    .notification-bell-btn .notif-bell-icon { width: 20px; height: 20px; color: rgba(255,255,255,0.85); transition: color 0.2s; }
    @keyframes notifRing { 0%,100% { transform: rotate(0); } 20% { transform: rotate(15deg); } 40% { transform: rotate(-13deg); } 60% { transform: rotate(10deg); } 80% { transform: rotate(-8deg); } }
    .notification-bell-btn.ring .notif-bell-icon { animation: notifRing 0.5s ease-in-out; }
    .notif-badge { min-width: 18px; height: 18px; padding: 0 3px; border-radius: 9px; position: absolute; top: 0; right: 0; background: var(--brand-yellow); color: var(--brand-deep-blue); font-size: 0.625rem; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid var(--brand-deep-blue); box-sizing: border-box; }
    .notif-badge[data-count="0"] { display: none; }
    /* ── Panel shell - PRD §7.5.2.2: 400px desktop / 70vh; full-width drawer < 768px.
       Compound selector + injected-last guarantees it beats any stale inline 360px. ── */
    .user-dropdown-nav.notification-panel { width: 400px; max-height: 70vh; display: flex; flex-direction: column; overflow: hidden; }
    @media (max-width: 768px) { .user-dropdown-nav.notification-panel { width: 100%; max-height: 72vh; } }
    .notification-panel .dropdown-divider-nav { flex-shrink: 0; }
    .notif-panel-header { padding: 1.25rem; flex-shrink: 0; }
    .notif-panel-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .notif-panel-title { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
    .notif-unread-label { font-size: 0.75rem; color: var(--brand-deep-blue); font-weight: 600; }
    .notif-panel-actions { display: flex; align-items: center; gap: 0.5rem; }
    .notif-action-link { background: none; border: none; cursor: pointer; font-size: 0.75rem; color: var(--text-secondary); text-decoration: none; font-weight: 500; padding: 0; }
    .notif-action-link:hover { text-decoration: underline; }
    .notif-action-link.view-all-link { color: var(--brand-deep-blue); font-weight: 600; }
    .notif-close-btn { width: 24px; height: 24px; border-radius: 50%; background: none; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; color: var(--neutral-600); transition: background 0.2s; }
    .notif-close-btn:hover { background: rgba(0, 0, 0, 0.06); }
    .notif-list-wrapper { padding: 0.5rem; flex: 1; min-height: 0; overflow-y: auto; }
    .notif-list { list-style: none; padding: 0; margin: 0; }
    .notif-item { display: flex; align-items: flex-start; gap: 0.625rem; padding: 0.75rem; border-radius: 0.5rem; transition: all 0.15s; cursor: default; font-size: 0.875rem; }
    .notif-item:hover { background: rgba(23, 61, 71, 0.08); }
    .notif-item:hover .notif-item-dismiss { opacity: 1; }
    .notif-item-icon { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .notif-item-icon svg { width: 14px; height: 14px; }
    /* LEVEL wells (PRD §3 / AC-06) */
    .notif-type-completed   { background: var(--fin-up-bg);      color: var(--fin-up); }
    .notif-type-progressing { background: rgba(23,61,71,0.10);   color: var(--brand-deep-blue); }
    .notif-type-info        { background: var(--fin-neutral-bg); color: var(--text-secondary); }
    .notif-type-warning     { background: rgba(184,160,48,0.14); color: var(--warning); }
    .notif-type-error       { background: var(--error-bg);       color: var(--error); }
    /* unread = subtle left indicator bar, level-colored (PRD §7.1) */
    .notif-item.notif-lvl-completed   { --nlvl: var(--fin-up); }
    .notif-item.notif-lvl-progressing { --nlvl: var(--brand-deep-blue); }
    .notif-item.notif-lvl-info        { --nlvl: var(--fin-neutral); }
    .notif-item.notif-lvl-warning     { --nlvl: var(--warning); }
    .notif-item.notif-lvl-error       { --nlvl: var(--error); }
    .notif-item:not(.read) { box-shadow: none; }
    .notif-item-body { flex: 1; min-width: 0; cursor: pointer; }
    .notif-item-cta { font-size: 0.75rem; font-weight: 600; color: var(--brand-deep-blue); text-decoration: none; margin-top: 0.25rem; display: inline-block; }
    .notif-item-cta:hover { text-decoration: underline; }
    .notif-item-cta:focus { outline: 2px solid var(--brand-deep-blue); outline-offset: 2px; }
    .notif-item-title { font-size: 0.8125rem; font-weight: 500; color: var(--text-primary); margin: 0; }
    .notif-item.read .notif-item-title { font-weight: 400; color: var(--neutral-600); }
    .notif-item-msg { font-size: 0.75rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0.125rem 0 0; }
    .notif-item-time { font-size: 0.6875rem; color: var(--text-secondary); display: block; margin-top: 0.125rem; }
    .notif-unread-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brand-deep-blue); flex-shrink: 0; margin-top: 6px; }
    .notif-item.read .notif-unread-dot { display: none; }
    .notif-item-dismiss { opacity: 0; width: 20px; height: 20px; min-width: 20px; border: none; background: none; cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); transition: opacity 0.2s; }
    .notif-item-dismiss:hover { color: var(--error); }
    .notif-empty { padding: 1.5rem; text-align: center; color: var(--text-secondary); font-size: 0.875rem; }
    .notif-panel-footer { padding: 0.5rem; flex-shrink: 0; }
    .notif-panel-footer .notif-footer-btn { width: 100%; padding: 0.875rem 1.5rem; border-radius: 0.75rem; font-weight: 600; font-size: 0.938rem; display: flex; align-items: center; justify-content: center; }
    .notif-panel-footer .notif-footer-btn[hidden], .notif-panel-footer[hidden], .notif-panel-divider[hidden] { display: none !important; }
  `;
  var st = document.createElement('style');
  st.id = 'unera-bell-css';
  st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  /* ── Level model (PRD §3) ──────────────────────────────────────────────── */
  var LEVEL_ICON_PATHS = {
    completed: 'm424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z',
    progressing: 'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm112-192 56-56-148-148v-184h-80v216l172 172Z',
    info: 'M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z',
    warning: 'm40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z',
    error: 'M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z'
  };
  var LEVEL_META = {
    completed: {
      label: 'Completed'
    },
    progressing: {
      label: 'In progress'
    },
    info: {
      label: 'Info'
    },
    warning: {
      label: 'Warning'
    },
    error: {
      label: 'Error'
    }
  };
  function levelOf(n) {
    return n && LEVEL_ICON_PATHS[n.level] ? n.level : 'info';
  }
  function iconPathOf(l) {
    return LEVEL_ICON_PATHS[l] || LEVEL_ICON_PATHS.info;
  }
  function levelLabelOf(l) {
    return (LEVEL_META[l] || LEVEL_META.info).label;
  }

  /* ── Shared feed (clb_notifications_v2) ────────────────────────────────── */
  var NOTIF_KEY = 'clb_notifications_v2';
  var DEFAULT = [{
    id: 'up_err_swap',
    level: 'error',
    category: 'issue',
    title: 'Swap couldn\u2019t be completed',
    message: 'We couldn\u2019t finalize your 100 USDC \u2192 USDT swap. No funds left your wallet \u2014 please try again.',
    ref: 'Ref SWP-9F2C',
    timestamp: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
    read: false,
    ctaUrl: 'exchange.html',
    ctaLabel: 'Try again'
  }, {
    id: 'up_buy_done',
    level: 'completed',
    category: 'transaction',
    title: 'Buy order completed',
    message: 'Your OTC purchase of 500 hUSD is complete and added to your balance.',
    ref: 'Order OTC-48210',
    timestamp: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    read: false,
    ctaUrl: 'wallet-enhanced.html',
    ctaLabel: 'View order'
  }, {
    id: 'up_don_pending',
    level: 'progressing',
    category: 'transaction',
    title: 'Donation pending',
    message: 'Your donation of $250.00 to Kibera Community Center is on its way. Usually takes 2\u20135 minutes \u2014 nothing to do.',
    ref: 'Ref DON-401288',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    read: false,
    ctaUrl: 'donate.html',
    ctaLabel: 'View status'
  }, {
    id: 'up_swap_prog',
    level: 'progressing',
    category: 'transaction',
    title: 'Swap is settling',
    message: 'Your USDC \u2192 USDT swap is confirmed. Balances are updating now.',
    ref: 'Tx 0x7a3f\u20262b9c',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    read: false,
    ctaUrl: 'wallet-enhanced.html',
    ctaLabel: 'View transaction'
  }, {
    id: 'up_buy_slow',
    level: 'warning',
    category: 'issue',
    title: 'Buy order is taking longer than usual',
    message: 'Your OTC purchase is still processing. We\u2019ll let you know as soon as it settles.',
    ref: 'Order OTC-48233',
    timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    read: false,
    ctaUrl: 'wallet-enhanced.html',
    ctaLabel: 'View order'
  }, {
    id: 'up_ann_base',
    level: 'info',
    category: 'announcement',
    title: 'New network supported',
    message: 'You can now hold and move hUSD on Base.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    ctaUrl: 'dashboard-enhanced.html',
    ctaLabel: 'Learn more'
  }, {
    id: 'up_swap_done',
    level: 'completed',
    category: 'transaction',
    title: 'Swap completed',
    message: 'Swapped 250 USDC \u2192 249.8 USDT. Balances updated.',
    ref: 'Tx 0x4c81\u20269af0',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    ctaUrl: 'wallet-enhanced.html',
    ctaLabel: 'View transaction'
  }, {
    id: 'up_ann_maint',
    level: 'info',
    category: 'announcement',
    title: 'Scheduled maintenance',
    message: 'hUSD services will pause for about 30 minutes on Sunday 22:00 UTC for an upgrade.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    ctaUrl: 'dashboard-enhanced.html',
    ctaLabel: 'Learn more'
  },
  /* ── FE-208 §4.3 - the six donation lifecycle events the Donation spec names:
     submitted · awaiting confirmation · completed · failed · receipt available · Huma Points updated. ── */
  {
    id: 'up_don_submitted',
    level: 'info',
    category: 'donation',
    title: 'Donation submitted',
    message: 'Your donation of 250 USDC (≈ $250.03) to Kibera Community Center was submitted. Total charged $252.53 including the processing fee.',
    ref: 'Ref DON-90412',
    timestamp: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
    read: false,
    ctaUrl: 'donation-history.html',
    ctaLabel: 'View donation'
  }, {
    id: 'up_don_awaiting',
    level: 'progressing',
    category: 'donation',
    title: 'Donation awaiting confirmation',
    message: "Your donation is being processed. We'll update the status when conversion is complete.",
    ref: 'Ref DON-90188',
    timestamp: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    read: false,
    ctaUrl: 'donation-history.html',
    ctaLabel: 'Track donation'
  }, {
    id: 'up_don_completed',
    level: 'completed',
    category: 'donation',
    title: 'Donation completed',
    message: 'Your donation of $250.03 to Kibera Community Center is confirmed. Thank you.',
    ref: 'Ref DON-90412',
    timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    read: false,
    ctaUrl: 'donation-history.html',
    ctaLabel: 'View donation'
  }, {
    id: 'up_don_points',
    level: 'completed',
    category: 'donation',
    title: 'Huma Points updated',
    message: 'Your Huma Points for donation DON-90412 moved to confirmed: 12.5 Huma Points.',
    ref: 'Ref DON-90412',
    timestamp: new Date(Date.now() - 31 * 60 * 1000).toISOString(),
    read: false,
    ctaUrl: 'donations.html',
    ctaLabel: 'View impact'
  }, {
    id: 'up_don_failed',
    level: 'error',
    category: 'donation',
    title: 'Donation failed',
    message: 'We could not process the payment right now. Please try again.',
    ref: 'Ref DON-89544',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: true,
    ctaUrl: 'donate.html',
    ctaLabel: 'Try again'
  }];
  var SEED_VERSION_KEY = 'clb_notifications_v2_seed';
  var SEED_VERSION = '208';
  var notifications = JSON.parse(localStorage.getItem(NOTIF_KEY) || 'null');
  /* Kevin, 28 Aug - tax receipts are not issued for now. Purge the retired seed from
     already-persisted feeds (surgical: this id/title only, read state untouched). */
  if (Array.isArray(notifications)) {
    var before = notifications.length;
    notifications = notifications.filter(function (n) {
      return n && n.id !== 'up_don_receipt' && n.title !== 'Tax receipt available';
    });
    if (notifications.length !== before) localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications));
  }
  if (!Array.isArray(notifications) || notifications.length === 0) {
    notifications = DEFAULT.map(function (n) {
      return JSON.parse(JSON.stringify(n));
    });
    localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications));
    localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION);
  } else if (localStorage.getItem(SEED_VERSION_KEY) !== SEED_VERSION) {
    /* Merge in seeds added since the stored feed was created, without clobbering read state. */
    var have = {};
    notifications.forEach(function (n) {
      have[n.id] = true;
    });
    DEFAULT.forEach(function (n) {
      if (!have[n.id]) notifications.push(JSON.parse(JSON.stringify(n)));
    });
    notifications.sort(function (a, b) {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications));
    localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION);
  }
  function save() {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications));
  }

  /* ── Helpers ───────────────────────────────────────────────────────────── */
  function formatRelativeTime(iso) {
    var d = new Date(iso),
      now = new Date(),
      s = Math.floor((now - d) / 1000);
    var m = Math.floor(s / 60),
      h = Math.floor(m / 60),
      day = Math.floor(h / 24);
    if (s < 60) return 'just now';
    if (m < 60) return m + ' min ago';
    if (h < 24) return h + ' hr ago';
    if (day === 1) return 'yesterday';
    if (day < 7) return day + ' days ago';
    return d.toLocaleDateString();
  }
  function updateTabTitle(c) {
    if (!window.__notifBaseTitle) window.__notifBaseTitle = document.title.replace(/^\(\d+\+?\)\s*/, '');
    document.title = c > 0 ? '(' + (c > 99 ? '99+' : c) + ') ' + window.__notifBaseTitle : window.__notifBaseTitle;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function updateNotificationBadges(count) {
    var badge = document.getElementById('notifBadge');
    var badgeMobile = document.getElementById('notifBadgeMobile');
    var bell = document.getElementById('notificationBell');
    var unreadLabel = document.getElementById('notifUnreadLabel');
    var label = count === 0 ? 'Notifications' : 'Notifications, ' + count + ' unread';
    var badgeText = count > 99 ? '99+' : String(count); /* PRD §7.5.2.3 - cap at 99+ */
    if (badge) {
      badge.textContent = badgeText;
      badge.setAttribute('data-count', count);
    }
    if (badgeMobile) {
      badgeMobile.textContent = badgeText;
      badgeMobile.setAttribute('data-count', count);
    }
    if (bell) bell.setAttribute('aria-label', label);
    if (unreadLabel) {
      unreadLabel.textContent = count === 0 ? '' : count + ' unread';
      unreadLabel.style.display = count === 0 ? 'none' : '';
    }
    updateTabTitle(count); /* PRD §7.5.2.4 - browser tab count */
  }
  function handleNotificationItemClick(e, id) {
    if (e.target.closest('a.notif-item-cta') || e.target.closest('button.notif-item-dismiss')) return;
    var n = notifications.find(function (x) {
      return x.id === id;
    });
    if (!n) return;
    markNotificationRead(id);
    if (n.ctaUrl) window.location.href = n.ctaUrl;
  }
  function renderNotificationItem(n) {
    var level = levelOf(n);
    var readClass = n.read ? ' read' : '';
    var dot = n.read ? '' : '<span class="notif-unread-dot" aria-hidden="true"></span>';
    var cta = n.ctaUrl && n.ctaLabel ? '<a href="' + esc(n.ctaUrl) + '" class="notif-item-cta" onclick="event.stopPropagation(); markNotificationRead(\'' + n.id + '\')">' + esc(n.ctaLabel) + '</a>' : '';
    return '<li class="notif-item' + readClass + ' notif-lvl-' + level + '" role="listitem" data-id="' + n.id + '">' + '<span class="notif-item-icon notif-type-' + level + '" role="img" aria-label="' + levelLabelOf(level) + '"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 -960 960 960" fill="currentColor"><path d="' + iconPathOf(level) + '"/></svg></span>' + '<div class="notif-item-body" role="button" tabindex="0" onclick="handleNotificationItemClick(event,\'' + n.id + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();handleNotificationItemClick(event,\'' + n.id + '\');}">' + '<p class="notif-item-title">' + esc(n.title) + '</p>' + '<p class="notif-item-msg">' + esc(n.message) + '</p>' + '<time class="notif-item-time" datetime="' + esc(n.timestamp) + '">' + formatRelativeTime(n.timestamp) + '</time>' + cta + '</div>' + dot + '<button type="button" class="notif-item-dismiss" aria-label="Dismiss: ' + esc(n.title) + '" onclick="event.stopPropagation(); clearNotification(\'' + n.id + '\')">' + '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>' + '</button></li>';
  }
  function renderNotificationPanel(variant) {
    var unread = notifications.filter(function (n) {
      return !n.read;
    }).length;
    updateNotificationBadges(unread);
    var ordered = notifications.slice().sort(function (a, b) {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    var itemsHtml = notifications.length === 0 ? '<li class="notif-empty">You\u2019re all caught up</li>' : ordered.map(renderNotificationItem).join('');
    if (variant === 'mobile') {
      var bellSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960" fill="currentColor"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z"/></svg>';
      var badgeDisplay = unread > 0 ? '<span class="notif-badge notif-badge-mobile" id="notifBadgeMobile" data-count="' + unread + '" aria-hidden="true">' + (unread > 99 ? '99+' : unread) + '</span>' : '';
      return '<div class="mobile-notif-profile mobile-user-profile">' + '<div class="mobile-user-profile-header" onclick="toggleMobileNotificationPanel()">' + '<div class="notif-mobile-header-left">' + '<span style="width:40px;height:40px;border-radius:50%;background:var(--brand-deep-blue);display:flex;align-items:center;justify-content:center;color:white;">' + bellSvg + '</span>' + '<span style="font-weight:600;font-size:0.938rem;color:var(--neutral-900);">Notifications</span>' + badgeDisplay + '</div>' + '<svg class="mobile-user-chevron" id="mobileNotifChevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>' + '</div>' + '<div class="mobile-user-dropdown" id="mobileNotificationDropdown"><div class="mobile-user-dropdown-content">' + (notifications.length > 0 ? '<a href="notifications.html" class="dropdown-item-nav view-all-link" style="display:flex;align-items:center;gap:0.75rem;width:100%;margin-bottom:0.5rem;">View all</a>' : '') + '<ul class="notif-list" id="mobileNotificationList" role="list" aria-live="polite">' + itemsHtml + '</ul>' + (notifications.length > 0 ? '<div class="dropdown-divider-nav"></div><button type="button" class="btn btn-secondary" onclick="clearAllNotifications()" style="width:100%;margin-bottom:0.5rem;">Clear all</button><button type="button" class="dropdown-item-nav" onclick="markAllNotificationsRead()" style="display:flex;align-items:center;gap:0.75rem;width:100%;">Mark all as read</button>' : '') + '</div></div></div>';
    }
    var list = document.getElementById('notificationList');
    if (list) list.innerHTML = itemsHtml;
    var isEmpty = notifications.length === 0;
    var clearBtn = document.getElementById('clearAllNotificationsBtn');
    var footer = document.getElementById('notifPanelFooter');
    var divider = document.getElementById('notifPanelDivider');
    if (clearBtn) clearBtn.hidden = isEmpty;
    if (footer) footer.hidden = isEmpty;
    if (divider) divider.hidden = isEmpty;
    return '';
  }
  function renderMobile() {
    var ms = document.getElementById('mobileNotificationsSection');
    if (ms) ms.innerHTML = renderNotificationPanel('mobile');
  }
  function toggleNotificationPanel() {
    var userDropdown = document.getElementById('userDropdown');
    if (userDropdown && userDropdown.classList.contains('show')) userDropdown.classList.remove('show');
    var panel = document.getElementById('notificationPanel');
    var bell = document.getElementById('notificationBell');
    if (!panel || !bell) return;
    if (panel.classList.contains('show')) {
      panel.classList.remove('show');
      bell.setAttribute('aria-expanded', 'false');
      bell.focus();
    } else {
      panel.classList.add('show');
      bell.setAttribute('aria-expanded', 'true');
      var closeBtn = panel.querySelector('.notif-close-btn');
      if (closeBtn) setTimeout(function () {
        closeBtn.focus();
      }, 50);
    }
  }
  function closeNotificationPanel() {
    var panel = document.getElementById('notificationPanel');
    var bell = document.getElementById('notificationBell');
    if (panel) panel.classList.remove('show');
    if (bell) {
      bell.setAttribute('aria-expanded', 'false');
      bell.focus();
    }
  }
  function toggleMobileNotificationPanel() {
    var dd = document.getElementById('mobileNotificationDropdown');
    var ch = document.getElementById('mobileNotifChevron');
    if (dd) dd.classList.toggle('open');
    if (ch) ch.classList.toggle('open');
  }
  function markNotificationRead(id) {
    var n = notifications.find(function (x) {
      return x.id === id;
    });
    if (n) {
      n.read = true;
      renderNotificationPanel('desktop');
      renderMobile();
      save();
    }
  }
  function markAllNotificationsRead() {
    notifications.forEach(function (n) {
      n.read = true;
    });
    renderNotificationPanel('desktop');
    renderMobile();
    save();
  }
  function clearNotification(id) {
    notifications = notifications.filter(function (n) {
      return n.id !== id;
    });
    renderNotificationPanel('desktop');
    renderMobile();
    save();
  }
  function clearAllNotifications() {
    notifications = [];
    renderNotificationPanel('desktop');
    renderMobile();
    save();
  }
  function addNotification(data) {
    notifications.unshift({
      id: 'n' + Date.now(),
      level: LEVEL_ICON_PATHS[data.level] ? data.level : 'info',
      category: data.category || 'transaction',
      title: data.title || 'Notification',
      message: data.message || '',
      ref: data.ref || '',
      timestamp: new Date().toISOString(),
      read: false,
      ctaUrl: data.ctaUrl,
      ctaLabel: data.ctaLabel
    });
    renderNotificationPanel('desktop');
    renderMobile();
    save();
    var bell = document.getElementById('notificationBell');
    if (bell) {
      bell.classList.add('ring');
      setTimeout(function () {
        bell.classList.remove('ring');
      }, 500);
    }
  }

  /* ── Arrow-key panel nav (PRD §7.5.2.6) ────────────────────────────────── */
  function wireKeyNav() {
    var np = document.getElementById('notificationPanel');
    if (!np || np._keyNavWired) return;
    np._keyNavWired = true;
    np.addEventListener('keydown', function (e) {
      if (['ArrowDown', 'ArrowUp', 'Home', 'End'].indexOf(e.key) === -1) return;
      var items = Array.prototype.slice.call(np.querySelectorAll('.notif-item-body'));
      if (!items.length) return;
      e.preventDefault();
      var idx = items.indexOf(document.activeElement),
        next;
      if (e.key === 'ArrowDown') next = items[idx < 0 ? 0 : Math.min(items.length - 1, idx + 1)];else if (e.key === 'ArrowUp') next = items[idx < 0 ? 0 : Math.max(0, idx - 1)];else if (e.key === 'Home') next = items[0];else next = items[items.length - 1];
      if (next) next.focus();
    });
  }

  /* ── Dismiss: click-outside + Escape (bound once; makes the module fully self-contained) ── */
  function wireDismiss() {
    if (window.__uneraBellDismissWired) return;
    window.__uneraBellDismissWired = true;
    document.addEventListener('click', function (e) {
      var panel = document.getElementById('notificationPanel');
      var wrap = document.getElementById('notificationBellWrapper');
      if (panel && panel.classList.contains('show') && wrap && !wrap.contains(e.target)) {
        panel.classList.remove('show');
        var bell = document.getElementById('notificationBell');
        if (bell) bell.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var panel = document.getElementById('notificationPanel');
      if (panel && panel.classList.contains('show')) closeNotificationPanel();
    });
  }

  /* ── Expose globals used by inline onclick handlers ────────────────────── */
  window.updateNotificationBadges = updateNotificationBadges;
  window.renderNotificationItem = renderNotificationItem;
  window.renderNotificationPanel = renderNotificationPanel;
  window.toggleNotificationPanel = toggleNotificationPanel;
  window.closeNotificationPanel = closeNotificationPanel;
  window.toggleMobileNotificationPanel = toggleMobileNotificationPanel;
  window.markNotificationRead = markNotificationRead;
  window.markAllNotificationsRead = markAllNotificationsRead;
  window.clearNotification = clearNotification;
  window.clearAllNotifications = clearAllNotifications;
  window.addNotification = addNotification;
  window.handleNotificationItemClick = handleNotificationItemClick;
  window.formatRelativeTime = formatRelativeTime;
  function init() {
    renderNotificationPanel('desktop');
    renderMobile();
    wireKeyNav();
    wireDismiss();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);else init();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/notifications-bell.js", error: String((e && e.message) || e) }); }

// unera-pages/shared/notification-catalog.js
try { (() => {
/**
 * Huma notification seed catalog (prototype).
 * Schema: { id, layer, category, type, title, message, timestamp, read, ctaUrl?, ctaLabel? }
 */
(function () {
  'use strict';

  var SYNC_FIELDS = ['layer', 'category', 'type', 'title', 'message', 'ctaUrl', 'ctaLabel'];
  var PRIORITY_CONSUMER_IDS = ['nkyc_retry', 'nkyc_blocked'];
  function ts(offsetMs) {
    return new Date(Date.now() - offsetMs).toISOString();
  }
  function buildStablecoinSeeds() {
    return [{
      id: 'sc_mint_complete',
      layer: 'stablecoin',
      category: 'mint_complete',
      type: 'transaction',
      title: 'Mint complete',
      message: 'Your mint of 500.00 Unera CAD is complete. Tokens are available in your wallet.',
      timestamp: ts(45 * 60 * 1000),
      read: false,
      ctaUrl: 'mint-history.html',
      ctaLabel: 'View mint history'
    }, {
      id: 'sc_redeem_complete',
      layer: 'stablecoin',
      category: 'redeem_complete',
      type: 'transaction',
      title: 'Redeem complete',
      message: '200.00 Unera CAD was burned. Your CAD payout is being processed.',
      timestamp: ts(3 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'purchase-receipt.html?status=complete&id=demo-redeem&from=redeem',
      ctaLabel: 'View receipt'
    }, {
      id: 'sc_bank_deposit',
      layer: 'stablecoin',
      category: 'bank_deposit',
      type: 'pending',
      title: 'Bank deposit received',
      message: '$500.00 CAD was deposited to your linked account. Redemption can proceed.',
      timestamp: ts(8 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'redeem-unera-cad.html',
      ctaLabel: 'Continue redeem'
    }, {
      id: 'sc_payment_failed',
      layer: 'stablecoin',
      category: 'payment_problem',
      type: 'error',
      title: 'Payment could not be processed',
      message: 'Your bank declined the $250.00 CAD payment for mint. Update your payment method and try again.',
      timestamp: ts(22 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'get-unera-cad.html',
      ctaLabel: 'Update payment'
    }, {
      id: 'sc_maintenance',
      layer: 'stablecoin',
      category: 'service_maintenance',
      type: 'system',
      title: 'Scheduled maintenance',
      message: 'Mint and redeem will be unavailable Sat 2:00–4:00 AM ET while we upgrade settlement rails.',
      timestamp: ts(2 * 24 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'proof-of-reserve-public.html',
      ctaLabel: 'Service status'
    }, {
      id: 'sc_announcement',
      layer: 'stablecoin',
      category: 'service_announcement',
      type: 'system',
      title: 'Unera Stablecoin update',
      message: 'Proof of Reserve reporting now updates hourly. See the latest reserve composition.',
      timestamp: ts(5 * 24 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'proof-of-reserve-public.html',
      ctaLabel: 'Read update'
    }];
  }
  function buildConsumerSeeds() {
    return [{
      id: 'nkyc_retry',
      layer: 'consumer',
      category: 'kyc_retry',
      type: 'verification',
      title: 'Verification needs another try',
      message: 'Additional information is needed to complete your identity check. Please resume the verification flow to resubmit.',
      timestamp: ts(18 * 60 * 1000),
      read: false,
      ctaUrl: 'kyc-verify.html',
      ctaLabel: 'Resume verification'
    }, {
      id: 'nkyc_blocked',
      layer: 'consumer',
      category: 'kyc_blocked',
      type: 'system',
      title: 'Identity verification unavailable',
      message: 'You\'re not able to complete identity verification on this account while we review it. Please contact support for next steps.',
      timestamp: ts(28 * 60 * 1000),
      read: false,
      ctaUrl: 'mailto:support@unera.ca',
      ctaLabel: 'Contact support'
    }, {
      /* FE-207 §B.6 - matches the persistent nav pending pill + Transaction Tracker */
      id: 'n_tx_pending',
      layer: 'consumer',
      category: 'donation',
      type: 'pending',
      title: 'Donation pending',
      message: 'Your donation is on its way. Usually takes 2\u20135 minutes \u2014 we\u2019ll tell you the moment it lands.',
      timestamp: ts(2 * 60 * 1000),
      read: false,
      ctaUrl: 'donate.html',
      ctaLabel: 'View status'
    },
    /* ── FE-208 §4.3 - the six donation lifecycle events the Donation spec names.
       Donation submitted · awaiting confirmation · completed · failed · receipt available ·
       Huma Points reward updated. Seeded so a cold load shows the real feed. ── */
    {
      id: 'n_don_submitted',
      layer: 'consumer',
      category: 'donation',
      type: 'transaction',
      title: 'Donation submitted',
      message: 'Your donation of 250 USDC (≈ $250.03) to Kibera Community Center was submitted. Total charged $252.53 including the processing fee.',
      timestamp: ts(9 * 60 * 1000),
      read: false,
      ctaUrl: 'donation-history.html',
      ctaLabel: 'View donation'
    }, {
      id: 'n_don_awaiting',
      layer: 'consumer',
      category: 'donation',
      type: 'pending',
      title: 'Donation awaiting confirmation',
      message: "Your 0.0035 BTC donation to Jakarta Coastal Resilience Center is being processed. We'll update the status when conversion is complete.",
      timestamp: ts(14 * 60 * 1000),
      read: false,
      ctaUrl: 'donation-history.html',
      ctaLabel: 'Track donation'
    }, {
      id: 'n_don_completed',
      layer: 'consumer',
      category: 'donation',
      type: 'donation',
      title: 'Donation completed',
      message: 'Your donation of $250.03 to Kibera Community Center is confirmed. Thank you.',
      timestamp: ts(35 * 60 * 1000),
      read: false,
      ctaUrl: 'donation-history.html',
      ctaLabel: 'View donation'
    }, {
      id: 'n_don_points',
      layer: 'consumer',
      category: 'donation',
      type: 'donation',
      title: 'Huma Points updated',
      message: 'Your Huma Points for donation DON-90412 moved to confirmed: 12.5 Huma Points.',
      timestamp: ts(31 * 60 * 1000),
      read: false,
      ctaUrl: 'donations.html',
      ctaLabel: 'View impact'
    }, {
      id: 'n_don_failed',
      layer: 'consumer',
      category: 'donation',
      type: 'error',
      title: 'Donation failed',
      message: 'We could not process the payment right now. Please try again.',
      timestamp: ts(4 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'donate.html',
      ctaLabel: 'Try again'
    }, {
      id: 'n1',
      layer: 'consumer',
      category: 'wallet_send',
      type: 'transaction',
      title: 'Transaction Confirmed',
      message: 'Sent 12.5 CTC · confirmed on Ethereum',
      timestamp: ts(5 * 24 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'wallet-enhanced.html',
      ctaLabel: 'View transaction'
    }, {
      id: 'n2',
      layer: 'consumer',
      category: 'listing',
      type: 'listing',
      title: 'New Listing Available',
      message: 'Lot 7B at Conscious Landbank is now open',
      timestamp: ts(5 * 24 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'explore-centres.html',
      ctaLabel: 'Explore centers'
    }, {
      id: 'n3',
      layer: 'consumer',
      category: 'security',
      type: 'system',
      title: 'Security Notice',
      message: 'New device login detected for your account',
      timestamp: ts(6 * 24 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'account-settings.html',
      ctaLabel: 'View activity'
    }, {
      id: 'n4',
      layer: 'consumer',
      category: 'donation',
      type: 'donation',
      title: 'Donation completed',
      message: 'Your donation of $120.00 to El Alto Family Center is confirmed. Thank you.',
      timestamp: ts(7 * 24 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'donations.html',
      ctaLabel: 'View impact'
    }, {
      id: 'n5',
      layer: 'consumer',
      category: 'remittance',
      type: 'remittance',
      title: 'Remittance Sent',
      message: '25 CTC sent to family wallet · delivered on Polygon',
      timestamp: ts(8 * 24 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'wallet-enhanced.html',
      ctaLabel: 'View transaction'
    }, {
      id: 'n6',
      layer: 'consumer',
      category: 'kyc_verified',
      type: 'verification',
      title: 'Identity Verified',
      message: 'Your KYC verification has been approved',
      timestamp: ts(9 * 24 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'kyc-verify.html',
      ctaLabel: 'View status'
    }, {
      id: 'n7',
      layer: 'consumer',
      category: 'stake_rewards',
      type: 'transaction',
      title: 'Stake Rewards',
      message: 'Earned 2.3 CTC from staking · added to wallet',
      timestamp: ts(10 * 24 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'wallet-enhanced.html',
      ctaLabel: 'View wallet'
    }, {
      id: 'n8',
      layer: 'consumer',
      category: 'listing',
      type: 'listing',
      title: 'Lot Pre-sale Opens',
      message: 'Lot 12A at Kampala Center opens for pre-sale tomorrow',
      timestamp: ts(11 * 24 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'explore-centres.html',
      ctaLabel: 'Explore centers'
    }, {
      id: 'n9',
      layer: 'consumer',
      category: 'security',
      type: 'system',
      title: 'Password Updated',
      message: 'Your account password was successfully changed',
      timestamp: ts(12 * 24 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'account-settings.html',
      ctaLabel: 'Account settings'
    }, {
      id: 'n10',
      layer: 'consumer',
      category: 'donation',
      type: 'donation',
      title: 'Recurring donation processed',
      message: 'Your monthly donation of $25.00 to Accra Learning Hub was processed. Recurring giving earns 3× Huma Points.',
      timestamp: ts(14 * 24 * 60 * 60 * 1000),
      read: false,
      ctaUrl: 'donations.html',
      ctaLabel: 'View impact'
    }];
  }
  function cloneSeed(seed) {
    return JSON.parse(JSON.stringify(seed));
  }
  function isStablecoinAppPath() {
    return /\/Stablecoin\//.test(window.location.pathname);
  }
  function resolveCtaUrl(url) {
    if (!url || url.indexOf('mailto:') === 0) return url;
    if (isStablecoinAppPath()) return url;
    if (url.indexOf('Stablecoin/') === 0) return url;
    var q = url.indexOf('?');
    var path = q >= 0 ? url.slice(0, q) : url;
    var query = q >= 0 ? url.slice(q) : '';
    var stablecoinPages = ['mint-history.html', 'get-unera-cad.html', 'redeem-unera-cad.html', 'proof-of-reserve-public.html', 'purchase-receipt.html', 'dashboard.html'];
    if (stablecoinPages.indexOf(path) !== -1 || path.indexOf('purchase-receipt.html') === 0) {
      return 'Stablecoin/' + path + query;
    }
    return url;
  }
  function matchesFilter(n, filterKey) {
    if (!filterKey || filterKey === 'all') return true;
    if (filterKey === 'unread') return !n.read;
    if (filterKey === 'stablecoin_layer') return n.layer === 'stablecoin';
    if (filterKey === 'mint_redeem') {
      return n.category === 'mint_complete' || n.category === 'redeem_complete';
    }
    if (filterKey === 'deposits') return n.category === 'bank_deposit';
    if (filterKey === 'payments') return n.category === 'payment_problem';
    if (filterKey === 'updates') {
      return typeof n.category === 'string' && n.category.indexOf('service_') === 0;
    }
    if (filterKey === 'system') {
      return n.type === 'system' && n.layer === 'consumer';
    }
    return n.type === filterKey;
  }
  function syncSeedCopy(list, seed) {
    var i = list.findIndex(function (n) {
      return n.id === seed.id;
    });
    if (i === -1) return false;
    var n = list[i];
    var payload = {};
    var changed = false;
    SYNC_FIELDS.forEach(function (key) {
      if (seed[key] !== undefined && n[key] !== seed[key]) {
        payload[key] = seed[key];
        changed = true;
      }
    });
    if (changed) {
      list[i] = Object.assign({}, n, payload);
    }
    return changed;
  }
  function mergeIntoStorage() {
    var storageKey = 'clb_notifications';
    var versionKey = 'clb_notifications_catalog_version';
    var stablecoinSeeds = buildStablecoinSeeds();
    var consumerSeeds = buildConsumerSeeds();
    var allSeeds = stablecoinSeeds.concat(consumerSeeds);
    var list = JSON.parse(localStorage.getItem(storageKey) || '[]');
    var changed = false;

    /* Kevin, 28 Aug - tax receipts are not issued for now. Drop the retired entry
       from persisted feeds (this id/title only, everything else untouched). */
    var pruned = list.filter(function (n) {
      return n && n.id !== 'n_don_receipt' && n.title !== 'Tax receipt available';
    });
    if (pruned.length !== list.length) {
      list = pruned;
      changed = true;
    }
    list.forEach(function (n) {
      if (!n.layer) {
        n.layer = 'consumer';
        changed = true;
      }
    });
    allSeeds.forEach(function (seed) {
      if (syncSeedCopy(list, seed)) changed = true;
    });
    var existingIds = new Set(list.map(function (n) {
      return n.id;
    }));
    var toAdd = allSeeds.filter(function (s) {
      return !existingIds.has(s.id);
    }).map(cloneSeed);
    if (toAdd.length > 0) {
      var priorityIdSet = new Set(PRIORITY_CONSUMER_IDS);
      var priority = PRIORITY_CONSUMER_IDS.map(function (id) {
        return toAdd.find(function (n) {
          return n.id === id;
        });
      }).filter(Boolean).map(cloneSeed);
      var rest = toAdd.filter(function (n) {
        return !priorityIdSet.has(n.id);
      }).map(cloneSeed);
      list = priority.concat(list, rest);
      changed = true;
    }
    if (changed) {
      localStorage.setItem(storageKey, JSON.stringify(list));
    }
    localStorage.setItem(versionKey, String(3));
    return list;
  }
  function getForLayer(list, layer) {
    if (!Array.isArray(list)) list = JSON.parse(localStorage.getItem('clb_notifications') || '[]');
    if (layer === 'stablecoin') {
      return list.filter(function (n) {
        return n.layer === 'stablecoin';
      });
    }
    return list.slice();
  }
  window.UNERA_NOTIFICATION_CATALOG = {
    VERSION: 3,
    STORAGE_KEY: 'clb_notifications',
    VERSION_KEY: 'clb_notifications_catalog_version',
    STABLECOIN_SEEDS: buildStablecoinSeeds(),
    CONSUMER_SEEDS: buildConsumerSeeds(),
    buildStablecoinSeeds: buildStablecoinSeeds,
    buildConsumerSeeds: buildConsumerSeeds,
    mergeIntoStorage: mergeIntoStorage,
    getForLayer: getForLayer,
    matchesFilter: matchesFilter,
    resolveCtaUrl: resolveCtaUrl,
    isStablecoinAppPath: isStablecoinAppPath
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/shared/notification-catalog.js", error: String((e && e.message) || e) }); }

// unera-pages/shared/wallet-auth.js
try { (() => {
(function () {
  'use strict';

  var DEMO_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f3a8f';
  var DEMO_WC_URI = 'wc:unera-demo-session@2?relay-protocol=irn&symKey=demo';
  var OUTCOME_ID = 'walletAuthOutcomeModal';
  var AUTH_MODAL_ID = 'walletAuthModal';
  var QR_MODAL_ID = 'walletConnectQrModal';
  var defaultCheckSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 -960 960 960" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>';
  var PROVIDER_NAMES = {
    metamask: 'MetaMask',
    walletconnect: 'WalletConnect',
    coinbase: 'Coinbase Wallet',
    brave: 'Brave Wallet',
    ledger: 'Ledger'
  };
  var EXTENSION_WALLETS = ['metamask', 'brave', 'ledger'];
  var EXTENSION_STEP_WALLETS = ['metamask', 'coinbase', 'brave'];
  var INSTALL_LINKS = {
    metamask: 'https://metamask.io/download/',
    walletconnect: 'https://walletconnect.com/',
    coinbase: 'https://www.coinbase.com/wallet/downloads',
    brave: 'https://brave.com/download/',
    ledger: 'https://www.ledger.com/ledger-live'
  };
  var EXTENSION_ICONS = {
    metamask: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M20.3 5.1L13.5 9.9l1.3-3L20.3 5.1z" fill="#E17726"/><path d="M3.7 5.1l6.7 4.9-1.2-3.1L3.7 5.1z" fill="#E27625"/></svg>',
    coinbase: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#0052FF"/><path d="M8 12h8" stroke="white" stroke-width="2"/></svg>',
    brave: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l2 9 8 6 8-6 2-9-10-5z" fill="#FB542B"/></svg>'
  };
  var _walletCardCache = new Map();
  var _activeProvider = null;
  var _toastTimer = null;
  window._walletAuthScenario = 'happy';
  window._walletAuthIntent = 'login';
  window._walletAuthReturnTo = null;
  function getScenarioFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var s = params.get('demoScenario');
    if (s && ['happy', 'wrong-network', 'not-installed', 'user-rejected'].indexOf(s) !== -1) {
      return s;
    }
    return null;
  }
  function showToast(message) {
    var el = document.getElementById('walletAuthToast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function () {
      el.classList.remove('show');
    }, 2800);
  }
  function walletAuthNotify(message, type, title, options) {
    title = title !== undefined && title !== '' ? title : 'Success';
    options = options || {};
    var modal = document.getElementById(OUTCOME_ID);
    if (!modal) return;
    var icon = document.getElementById('walletAuthOutcomeIcon');
    var messageEl = document.getElementById('walletAuthOutcomeMessage');
    var titleEl = document.getElementById('walletAuthOutcomeTitle');
    var footer = document.getElementById('walletAuthOutcomeFooter');
    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;
    if (icon) {
      icon.className = 'wallet-auth-outcome-icon';
      if (type === 'error') icon.classList.add('error');else if (type === 'warning') icon.classList.add('warning');
      icon.innerHTML = defaultCheckSvg;
    }
    if (footer) {
      var existing = footer.querySelector('.wallet-auth-action-btn');
      if (existing) existing.remove();
      if (options.actionLabel && options.actionFn) {
        var actionBtn = document.createElement('button');
        actionBtn.type = 'button';
        actionBtn.className = 'wallet-auth-action-btn';
        actionBtn.textContent = options.actionLabel;
        actionBtn.onclick = function () {
          closeWalletAuthOutcomeModal();
          options.actionFn();
        };
        footer.insertBefore(actionBtn, footer.firstChild);
      }
    }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeWalletAuthOutcomeModal() {
    var modal = document.getElementById(OUTCOME_ID);
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    var footer = document.getElementById('walletAuthOutcomeFooter');
    if (footer) {
      var actionBtn = footer.querySelector('.wallet-auth-action-btn');
      if (actionBtn) actionBtn.remove();
    }
    if (!isAnyWalletModalOpen()) {
      document.body.style.overflow = '';
    }
  }
  function isAnyWalletModalOpen() {
    var auth = document.getElementById(AUTH_MODAL_ID);
    var qr = document.getElementById(QR_MODAL_ID);
    var out = document.getElementById(OUTCOME_ID);
    return auth && auth.classList.contains('active') || qr && qr.classList.contains('active') || out && out.classList.contains('active');
  }
  function setWalletAuthScenario(scenario, btn) {
    window._walletAuthScenario = scenario;
    document.querySelectorAll('#walletAuthModal .scenario-pill').forEach(function (p) {
      p.classList.remove('active');
    });
    if (btn) btn.classList.add('active');
    applyNotInstalledState(scenario === 'not-installed');
  }
  function applyNotInstalledState(active) {
    var grid = document.getElementById('walletAuthGrid');
    if (!grid) return;
    grid.querySelectorAll('.wallet-option-card').forEach(function (card) {
      var provider = card.dataset.provider;
      var isExtension = EXTENSION_WALLETS.indexOf(provider) !== -1;
      if (active && isExtension) {
        if (!_walletCardCache.has(provider)) {
          _walletCardCache.set(provider, card.innerHTML);
        }
        card.classList.add('not-installed');
        var nameEl = card.querySelector('.wallet-name');
        if (nameEl && !card.querySelector('.wallet-not-installed-label')) {
          var link = INSTALL_LINKS[provider] || INSTALL_LINKS.metamask;
          var lbl = nameEl.textContent;
          nameEl.insertAdjacentHTML('afterend', '<span class="wallet-not-installed-label">Not installed</span>' + '<button type="button" class="wallet-install-btn" aria-label="Install ' + lbl + '" ' + 'onclick="window.open(\'' + link + '\', \'_blank\')">Install</button>');
        }
      } else {
        card.classList.remove('not-installed');
        if (_walletCardCache.has(provider)) {
          card.innerHTML = _walletCardCache.get(provider);
        }
      }
    });
  }
  function showWalletAuthStep(step) {
    ['walletAuthStepPicker', 'walletAuthStepExtension', 'walletAuthStepLoading'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.hidden = true;
    });
    if (step === 'picker') {
      var p = document.getElementById('walletAuthStepPicker');
      if (p) p.hidden = false;
    } else if (step === 'extension') {
      var e = document.getElementById('walletAuthStepExtension');
      if (e) e.hidden = false;
    } else if (step === 'loading') {
      var l = document.getElementById('walletAuthStepLoading');
      if (l) l.hidden = false;
    }
  }
  function showWalletAuthPickerStep() {
    showWalletAuthStep('picker');
  }
  function openWalletAuthModal(options) {
    options = options || {};
    var intent = options.intent || 'login';
    window._walletAuthIntent = intent;
    window._walletAuthReturnTo = options.returnTo || null;
    var urlScenario = getScenarioFromUrl();
    window._walletAuthScenario = urlScenario || 'happy';
    var modal = document.getElementById(AUTH_MODAL_ID);
    if (!modal) return;
    if (intent === 'login' || intent === 'signup') {
      var already = localStorage.getItem('isLoggedIn') === 'true';
      if (already && intent === 'login') {
        window.location.href = resolveWalletAuthRedirect('login');
        return;
      }
    }
    document.querySelectorAll('#walletAuthModal .scenario-pill').forEach(function (p) {
      p.classList.remove('active');
      if (p.dataset.scenario === window._walletAuthScenario) {
        p.classList.add('active');
      }
    });
    if (!modal.querySelector('.scenario-pill.active')) {
      var happy = modal.querySelector('.scenario-pill[data-scenario="happy"]');
      if (happy) happy.classList.add('active');
      window._walletAuthScenario = 'happy';
    }
    applyNotInstalledState(window._walletAuthScenario === 'not-installed');
    showWalletAuthPickerStep();
    var title = document.getElementById('walletAuthTitle');
    var desc = document.getElementById('walletAuthDesc');
    if (intent === 'connect') {
      if (title) title.textContent = 'Connect. Contribute. Change lives.';
      if (desc) desc.textContent = 'Huma is your gateway to impact. Select a supported wallet to authenticate and continue.';
    } else if (intent === 'signup') {
      if (title) title.textContent = 'Sign up with your wallet';
      if (desc) desc.textContent = 'Create your Huma account by connecting a supported wallet.';
    } else {
      if (title) title.textContent = 'Log in with your wallet';
      if (desc) desc.textContent = 'Huma is your gateway to impact. Select a supported wallet to authenticate and continue.';
    }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var closeBtn = document.getElementById('walletAuthCloseBtn');
    if (closeBtn) setTimeout(function () {
      closeBtn.focus();
    }, 100);
  }
  function closeWalletAuthModal() {
    var modal = document.getElementById(AUTH_MODAL_ID);
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (!isAnyWalletModalOpen()) {
      document.body.style.overflow = '';
    }
    showWalletAuthPickerStep();
  }
  function openWalletConnectQrModal() {
    var qr = document.getElementById(QR_MODAL_ID);
    if (!qr) return;
    qr.classList.add('active');
    qr.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var list = document.getElementById('wcWalletBrowseList');
    var browseBtn = document.getElementById('wcBrowseWalletsBtn');
    if (list) list.hidden = true;
    if (browseBtn) browseBtn.setAttribute('aria-expanded', 'false');
  }
  function closeWalletConnectQrModal() {
    var qr = document.getElementById(QR_MODAL_ID);
    if (!qr) return;
    qr.classList.remove('active');
    qr.setAttribute('aria-hidden', 'true');
    if (document.getElementById(AUTH_MODAL_ID) && document.getElementById(AUTH_MODAL_ID).classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else if (!isAnyWalletModalOpen()) {
      document.body.style.overflow = '';
    }
  }
  function toggleWalletConnectBrowseList() {
    var list = document.getElementById('wcWalletBrowseList');
    var btn = document.getElementById('wcBrowseWalletsBtn');
    if (!list) return;
    var open = list.hidden;
    list.hidden = !open;
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function copyWalletConnectDemoLink() {
    var uri = DEMO_WC_URI;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(uri).then(function () {
        showToast('Link copied');
      }).catch(function () {
        showToast('Copy failed. Try again');
      });
    } else {
      showToast('Link: ' + uri);
    }
  }
  function showExtensionSteps(provider) {
    _activeProvider = provider;
    var name = PROVIDER_NAMES[provider] || provider;
    var iconEl = document.getElementById('walletExtensionIcon');
    var nameEl = document.getElementById('walletExtensionName');
    var signNote = document.getElementById('walletExtensionSignNote');
    if (iconEl) iconEl.innerHTML = EXTENSION_ICONS[provider] || '';
    if (nameEl) nameEl.textContent = name;
    if (signNote) {
      signNote.hidden = window._walletAuthIntent === 'connect';
    }
    showWalletAuthStep('extension');
    setTimeout(function () {
      runWalletAuthFlow(provider);
    }, 800);
  }
  function handleWalletAuth(provider) {
    _activeProvider = provider;
    if (provider === 'walletconnect') {
      openWalletConnectQrModal();
      return;
    }
    if (EXTENSION_STEP_WALLETS.indexOf(provider) !== -1) {
      showExtensionSteps(provider);
      return;
    }
    runWalletAuthFlow(provider);
  }
  function simulateWalletConnectQrSuccess() {
    closeWalletConnectQrModal();
    runWalletAuthFlow('walletconnect');
  }
  function runWalletAuthFlow(provider) {
    var name = PROVIDER_NAMES[provider] || provider;
    var loadingText = document.getElementById('walletAuthLoadingText');
    var intent = window._walletAuthIntent;
    if (loadingText) {
      if (intent === 'connect') {
        loadingText.textContent = 'Connecting to ' + name + '…';
      } else {
        loadingText.textContent = 'Connecting to ' + name + '…';
      }
    }
    showWalletAuthStep('loading');
    setTimeout(function () {
      var scenario = window._walletAuthScenario || 'happy';
      if (scenario === 'wrong-network') {
        closeWalletAuthModal();
        closeWalletConnectQrModal();
        walletAuthNotify(name + ' is connected to an unsupported network. Huma requires Base or Sepolia. Switch your wallet to the correct network and try again.', 'warning', 'Wrong Network', {
          actionLabel: 'Try Again',
          actionFn: function () {
            openWalletAuthModal({
              intent: intent
            });
          }
        });
        showWalletAuthPickerStep();
        return;
      }
      if (scenario === 'not-installed' && EXTENSION_WALLETS.indexOf(provider) !== -1) {
        closeWalletAuthModal();
        walletAuthNotify(name + " isn't installed in this browser. Install it to continue, then come back and connect.", 'error', 'Wallet Not Found', {
          actionLabel: 'Install ' + name,
          actionFn: function () {
            window.open(INSTALL_LINKS[provider] || INSTALL_LINKS.metamask, '_blank');
            openWalletAuthModal({
              intent: intent
            });
          }
        });
        showWalletAuthPickerStep();
        return;
      }
      if (scenario === 'user-rejected') {
        closeWalletAuthModal();
        closeWalletConnectQrModal();
        walletAuthNotify('You declined the connection request in ' + name + ". No action was taken. You can try again whenever you're ready.", 'warning', 'Connection Declined', {
          actionLabel: 'Try Again',
          actionFn: function () {
            openWalletAuthModal({
              intent: intent
            });
          }
        });
        showWalletAuthPickerStep();
        return;
      }
      if (intent !== 'connect') {
        if (loadingText) loadingText.textContent = 'Approve the sign-in request in your wallet…';
        setTimeout(function () {
          finishWalletAuthSuccess(provider, name);
        }, 1200);
        return;
      }
      finishWalletAuthSuccess(provider, name);
    }, 1500);
  }
  function applyWalletStorage(provider) {
    localStorage.setItem('walletConnected', 'true');
    localStorage.setItem('walletAddress', DEMO_ADDRESS);
    localStorage.setItem('walletProvider', provider);
    localStorage.setItem('walletBalance', '292.22559 CTC');
    localStorage.setItem('walletNetwork', 'Polygon');
  }
  function applyAuthStorage(intent, provider) {
    applyWalletStorage(provider);
    if (intent === 'login' || intent === 'signup') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('unera_user', JSON.stringify({
        email: '',
        name: 'Wallet User',
        authMethod: 'wallet'
      }));
      localStorage.setItem('userName', 'Wallet User');
      if (intent === 'signup') {
        localStorage.setItem('isNewUser', 'true');
      }
    }
  }
  function syncNavAfterConnect() {
    var shortAddress = DEMO_ADDRESS.substring(0, 6) + '...' + DEMO_ADDRESS.substring(DEMO_ADDRESS.length - 4);
    var navConnect = document.getElementById('navConnectBtn');
    var walletLink = document.getElementById('walletNavLink');
    if (navConnect && walletLink) {
      navConnect.style.display = 'none';
      navConnect.classList.add('hidden');
      walletLink.style.display = 'inline-block';
    }
    var dropdownWallet = document.getElementById('dropdownWalletAddress');
    if (dropdownWallet) dropdownWallet.textContent = shortAddress;
    var mobileDropdownWallet = document.getElementById('mobileDropdownWalletAddress');
    if (mobileDropdownWallet) mobileDropdownWallet.textContent = shortAddress;
    var disconnectItem = document.getElementById('disconnectWalletItem');
    if (disconnectItem) disconnectItem.style.display = 'flex';
    var disconnectItemMobile = document.getElementById('disconnectWalletItemMobile');
    if (disconnectItemMobile) disconnectItemMobile.style.display = 'flex';
    if (typeof window.syncNavAuthState === 'function') {
      window.syncNavAuthState();
    }
    if (typeof window.updateWalletLinkState === 'function') {
      window.updateWalletLinkState();
    }
    if (typeof window.updateAuthUI === 'function') {
      window.updateAuthUI();
    }
    window.dispatchEvent(new CustomEvent('unera-wallet-auth-success', {
      detail: {
        address: DEMO_ADDRESS,
        provider: provider,
        intent: window._walletAuthIntent
      }
    }));
  }
  function resolveWalletAuthRedirect(intent) {
    if (window._walletAuthReturnTo) {
      return window._walletAuthReturnTo;
    }
    if (intent === 'signup') {
      return 'setup-2fa.html?from=wallet';
    }
    if (intent === 'login') {
      if (localStorage.getItem('2faEnabled') === 'true') {
        return 'verify-2fa.html?from=wallet';
      }
      return 'dashboard-enhanced.html?welcome=back';
    }
    return 'dashboard-enhanced.html';
  }
  function finishWalletAuthSuccess(provider, name) {
    var intent = window._walletAuthIntent || 'login';
    applyAuthStorage(intent, provider);
    syncNavAfterConnect();
    closeWalletAuthModal();
    closeWalletConnectQrModal();
    showWalletAuthPickerStep();
    if (intent === 'connect') {
      walletAuthNotify(name + ' connected successfully!', 'success', 'Success', {});
      return;
    }
    var redirect = resolveWalletAuthRedirect(intent);
    if (intent === 'signup') {
      showToast('Wallet connected. Securing your account…');
    } else {
      showToast('Welcome back. Redirecting…');
    }
    setTimeout(function () {
      window.location.href = redirect;
    }, 600);
  }
  function initWalletAuthFromUrl() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('walletAuth') === 'open') {
      var intent = params.get('intent') || 'login';
      openWalletAuthModal({
        intent: intent
      });
    }
  }
  function bindWalletAuthEvents() {
    var authModal = document.getElementById(AUTH_MODAL_ID);
    if (authModal) {
      authModal.addEventListener('click', function (e) {
        if (e.target === authModal) closeWalletAuthModal();
      });
    }
    var qrModal = document.getElementById(QR_MODAL_ID);
    if (qrModal) {
      qrModal.addEventListener('click', function (e) {
        if (e.target === qrModal) closeWalletConnectQrModal();
      });
    }
    var outcomeModal = document.getElementById(OUTCOME_ID);
    if (outcomeModal) {
      outcomeModal.addEventListener('click', function (e) {
        if (e.target === outcomeModal) closeWalletAuthOutcomeModal();
      });
    }
    var closeBtn = document.getElementById('walletAuthCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeWalletAuthModal);
    }
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var qr = document.getElementById(QR_MODAL_ID);
      if (qr && qr.classList.contains('active')) {
        closeWalletConnectQrModal();
        return;
      }
      var out = document.getElementById(OUTCOME_ID);
      if (out && out.classList.contains('active')) {
        closeWalletAuthOutcomeModal();
        return;
      }
      var auth = document.getElementById(AUTH_MODAL_ID);
      if (auth && auth.classList.contains('active')) {
        closeWalletAuthModal();
      }
    });
  }
  window.openWalletAuthModal = openWalletAuthModal;
  window.closeWalletAuthModal = closeWalletAuthModal;
  window.handleWalletAuth = handleWalletAuth;
  window.setWalletAuthScenario = setWalletAuthScenario;
  window.closeWalletAuthOutcomeModal = closeWalletAuthOutcomeModal;
  window.openWalletConnectQrModal = openWalletConnectQrModal;
  window.closeWalletConnectQrModal = closeWalletConnectQrModal;
  window.copyWalletConnectDemoLink = copyWalletConnectDemoLink;
  window.toggleWalletConnectBrowseList = toggleWalletConnectBrowseList;
  window.simulateWalletConnectQrSuccess = simulateWalletConnectQrSuccess;
  window.showWalletAuthPickerStep = showWalletAuthPickerStep;
  window.resolveWalletAuthRedirect = resolveWalletAuthRedirect;
  window.openConnectModal = function () {
    openWalletAuthModal({
      intent: 'connect'
    });
  };
  window.closeConnectModal = function (event) {
    if (event && event.target && event.target.id !== AUTH_MODAL_ID) return;
    closeWalletAuthModal();
  };
  window.handleWalletConnect = function (provider) {
    handleWalletAuth(provider);
  };
  window.setConnectScenario = function (scenario, btn) {
    setWalletAuthScenario(scenario, btn);
  };
  window.closeWCOutcomeModal = closeWalletAuthOutcomeModal;
  document.addEventListener('DOMContentLoaded', function () {
    bindWalletAuthEvents();
    initWalletAuthFromUrl();
    var urlScenario = getScenarioFromUrl();
    if (urlScenario) {
      var authModal = document.getElementById(AUTH_MODAL_ID);
      if (authModal) authModal.classList.remove('wallet-auth-modal--production');
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/shared/wallet-auth.js", error: String((e && e.message) || e) }); }

// unera-pages/token-tx-validation.js
try { (() => {
/* ============================================================================
 * Huma - Common pre-submit gas / balance validation for TOKEN transactions
 * ----------------------------------------------------------------------------
 * Shared across every on-chain token flow: Send, Swap, Trade.
 * Encodes the four common checks we must run OFF-CHAIN before we ever build a
 * wallet transaction, so we never submit something that will fail:
 *
 *   1. Can't estimate  (BLOCK) - the tx would revert regardless of gas balance.
 *                                We can't estimate gas, so we do NOT submit at
 *                                all. Tell the user exactly what to satisfy.
 *   2. Low token bal.  (BLOCK) - token balance < amount to send (erc20 transfer).
 *   3. Not enough ETH  (BLOCK) - native balance <= estimatedGas * gasPrice.
 *   4. Low ETH buffer  (WARN)  - native balance covers the estimate but NOT
 *                                estimate + 25% buffer. Warn that the tx may be
 *                                rejected for low ETH, but let them proceed if
 *                                they insist.
 *   (otherwise -> good to go.)
 *
 * NOT applicable to fiat Buy OTC (add-money.html): 0 wallet prompts, no user
 * gas, no erc20 transfer at buy time - nothing to validate on-chain.
 *
 * Prototype-only: the demo pill selector is IN-MEMORY (never persisted); a
 * refresh returns to "Passes checks". See guidelines/edge-case-demo-bar.md.
 * ========================================================================== */
(function () {
  'use strict';

  // First pill is the happy path. Order matches the feedback's 4 cases.
  var PILLS = [{
    id: null,
    label: 'Passes checks'
  }, {
    id: 'cantEstimate',
    label: 'Can\u2019t estimate'
  }, {
    id: 'tokenBalance',
    label: 'Low token balance'
  }, {
    id: 'ethGas',
    label: 'Not enough ETH (gas)'
  }, {
    id: 'ethBuffer',
    label: 'Low ETH buffer'
  }];
  function buildConfig(o) {
    var native = o.native || 'ETH'; // chain native gas token
    var verb = o.verb || 'send'; // send / swap / place this order
    var noun = o.noun || 'transaction'; // transaction / swap / order
    var bufferPct = o.bufferPct || 25;
    return {
      cantEstimate: {
        tone: 'error',
        blocking: true,
        title: 'We can\u2019t prepare this ' + noun,
        body: 'A pre-submit check shows this ' + noun + ' would fail on-chain, so we won\u2019t submit it. This is usually because your token balance is below the amount, or the token contract would reject the transfer. Resolve the flagged requirement below, then try again.',
        // Concrete "what to satisfy" list - the point of catching this off-chain.
        reqs: ['Your token balance must cover the full amount.', 'Your ' + native + ' balance must cover the estimated gas.', 'The recipient / contract must be able to accept this ' + noun + '.']
      },
      tokenBalance: {
        tone: 'error',
        blocking: true,
        title: 'Not enough token balance',
        body: 'Your token balance is lower than the amount you\u2019re trying to ' + verb + '. Lower the amount or top up, then try again.'
      },
      ethGas: {
        tone: 'error',
        blocking: true,
        title: 'Not enough ' + native + ' for gas',
        body: 'You pay network gas in ' + native + ', and your ' + native + ' balance is below the estimated gas cost. Add ' + native + ' to cover gas before you ' + verb + '.'
      },
      ethBuffer: {
        tone: 'warning',
        blocking: false,
        title: 'Your ' + native + ' may be too low for gas',
        body: 'Your ' + native + ' covers the current estimate but not the ' + bufferPct + '% safety buffer we add for gas-price swings, so the network may reject this ' + noun + '. You can proceed anyway, or add a little ' + native + ' to be safe.'
      }
    };
  }
  var _injected = false;
  function injectStyle() {
    if (_injected) return;
    _injected = true;
    var css = '.txv-banner{display:flex;align-items:flex-start;gap:0.625rem;padding:1rem;border-radius:0.75rem;margin-bottom:1.25rem;' + 'background:var(--surface-error-soft);border:1.5px solid color-mix(in srgb, var(--error) 30%, transparent);}' + '.txv-banner>svg{width:20px;height:20px;fill:var(--error);flex-shrink:0;margin-top:1px;}' + '.txv-banner.is-warning{background:var(--surface-warning-soft);border-color:color-mix(in srgb, var(--warning) 30%, transparent);}' + '.txv-banner.is-warning>svg{fill:var(--warning);}' + '.txv-banner[hidden]{display:none !important;}' + '.txv-title{font-weight:700;font-size:0.9375rem;margin-bottom:0.2rem;color:var(--text-primary);}' + '.txv-body{font-size:0.8125rem;color:var(--text-secondary);line-height:1.45;}' + '.txv-reqs{margin:0.55rem 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:0.3rem;}' + '.txv-reqs li{position:relative;padding-left:1.15rem;font-size:0.8125rem;color:var(--text-secondary);line-height:1.4;}' + '.txv-reqs li::before{content:"";position:absolute;left:0;top:0.5em;width:6px;height:6px;border-radius:50%;background:var(--error);}' + '.txv-reqs[hidden]{display:none !important;}';
    var el = document.createElement('style');
    el.setAttribute('data-txv', '');
    el.textContent = css;
    document.head.appendChild(el);
  }
  function TxValidation() {
    this.state = null;
    this.cfg = null;
    this.opts = null;
  }
  TxValidation.prototype.init = function (opts) {
    this.opts = opts || {};
    this.cfg = buildConfig(this.opts);
    injectStyle();
    this._renderPills();
    this._buildBanner();
    this.apply(null);
  };
  TxValidation.prototype._renderPills = function () {
    var self = this;
    var c = document.getElementById(this.opts.pillsId);
    if (!c) return;
    c.innerHTML = PILLS.map(function (p) {
      return '<button type="button" class="demo-btn" data-txv="' + (p.id === null ? 'null' : p.id) + '">' + p.label + '</button>';
    }).join('');
    c.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.demo-btn') : null;
      if (!b) return;
      var v = b.getAttribute('data-txv');
      self.apply(v === 'null' ? null : v);
    });
    this._syncPills();
  };
  TxValidation.prototype._syncPills = function () {
    var c = document.getElementById(this.opts.pillsId);
    if (!c) return;
    var state = this.state;
    c.querySelectorAll('.demo-btn').forEach(function (b) {
      var v = b.getAttribute('data-txv');
      b.classList.toggle('active', v === 'null' && !state || v === String(state));
    });
  };
  TxValidation.prototype._buildBanner = function () {
    var mount = document.getElementById(this.opts.mountId);
    if (!mount) return;
    mount.innerHTML = '<div id="txvBanner" class="txv-banner" role="alert" hidden>' + '<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="m40-120 440-760 440 760H40Zm440-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z"/></svg>' + '<div style="flex:1;min-width:0;">' + '<div class="txv-title" id="txvTitle">\u2014</div>' + '<div class="txv-body" id="txvBody">\u2014</div>' + '<ul class="txv-reqs" id="txvReqs" hidden></ul>' + '</div>' + '</div>';
  };

  // Set the current simulated check and refresh banner + CTA + announcer.
  TxValidation.prototype.apply = function (id) {
    this.state = id || null;
    this._syncPills();
    var cfg = this.state ? this.cfg[this.state] : null;
    var banner = document.getElementById('txvBanner');
    var titleEl = document.getElementById('txvTitle');
    var bodyEl = document.getElementById('txvBody');
    var reqsEl = document.getElementById('txvReqs');
    var ann = this.opts.announcerId ? document.getElementById(this.opts.announcerId) : null;
    if (banner) {
      if (!cfg) {
        banner.hidden = true;
      } else {
        banner.hidden = false;
        banner.classList.toggle('is-warning', cfg.tone === 'warning');
        if (titleEl) titleEl.textContent = cfg.title;
        if (bodyEl) bodyEl.textContent = cfg.body;
        if (reqsEl) {
          if (cfg.reqs && cfg.reqs.length) {
            reqsEl.innerHTML = cfg.reqs.map(function (r) {
              return '<li>' + r + '</li>';
            }).join('');
            reqsEl.hidden = false;
          } else {
            reqsEl.innerHTML = '';
            reqsEl.hidden = true;
          }
        }
      }
    }
    if (ann) ann.textContent = 'Simulating: ' + (cfg ? cfg.title : 'Passes checks');
    if (typeof this.opts.onChange === 'function') this.opts.onChange();
  };

  // Blocking = we must NOT submit (cases 1–3). The buffer warning is non-blocking.
  TxValidation.prototype.isBlocking = function () {
    var cfg = this.state ? this.cfg[this.state] : null;
    return !!(cfg && cfg.blocking);
  };
  TxValidation.prototype.currentTitle = function () {
    var cfg = this.state ? this.cfg[this.state] : null;
    return cfg ? cfg.title : null;
  };
  window.TokenTxValidation = new TxValidation();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/token-tx-validation.js", error: String((e && e.message) || e) }); }

// unera-pages/tx-tracker.js
try { (() => {
/* ============================================================================
   Huma - Transaction Tracker (FE-207 §B) · shared controller
   ----------------------------------------------------------------------------
   One implementation used by donate.html (crypto donation), add-money.html
   (fiat purchase of hUSD) and exchange.html (swap). Each page passes its own
   copy; the states, timings and chrome are identical everywhere.

   Public API
     var t = TxTracker.mount(hostEl, config)   -> renders + starts the tracker
       t.setOutcome('normal' | 'delayed' | 'failed' | 'done')
       t.destroy()
     TxTracker.pill.start({ label, href })     -> nav pending pill (#txPendingPill)
     TxTracker.pill.stop('done' | 'failed')

   States: running -> (delayed) -> done | failed.
   Everything here is prototype mock: timers only, nothing is persisted.
   ========================================================================== */
(function () {
  'use strict';

  var ICON = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>',
    cross: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    shield: '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z"/></svg>',
    bell: '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-40Z"/></svg>',
    calm: '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-172v-40q-50-11-83.5-45T307-422l35-14q14 47 48.5 74.5T480-334q52 0 88.5-26t36.5-70q0-40-27-64t-93-46q-63-21-95-49.5T358-668q0-45 30-77t78-39v-40h48v40q42 5 70 30t42 61l-35 15q-12-31-34-49.5T496-746q-49 0-77 22t-28 58q0 36 26 58t93 45q71 24 100.5 56t29.5 81q0 26-9 46.5T604-343q-17 17-41 27.5T508-302v50h-68Z"/></svg>',
    bulb: '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Z"/></svg>',
    clock: '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm112-192 56-56-148-148v-184h-80v216l172 172Z"/></svg>',
    alert: '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m40-120 440-760 440 760H40Zm440-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z"/></svg>'
  };
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function el(id) {
    return document.getElementById(id);
  }
  function mmss(sec) {
    return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0');
  }

  /* ── Illustration: value travelling wallet -> network -> destination ─────
     Donations land on a heart; purchases and swaps land on a check. */
  function illustration(kind, labels) {
    // donation lands on a heart, everything else on a check - same node geometry
    var destGlyph = kind === 'donation' ? '<path class="txt-glyph txt-leaf" transform="translate(247,29) scale(0.0229) translate(0,960)" d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>' : '<path class="txt-glyph" transform="translate(247,29) scale(0.0229) translate(0,960)" d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>';
    return '' + '<svg class="txt-illus" viewBox="0 0 300 96" role="img" aria-label="' + esc(labels.alt) + '">' + '<line class="txt-track txt-seg txt-seg-0" x1="59" y1="40" x2="133" y2="40"/>' + '<line class="txt-track txt-seg txt-seg-1" x1="167" y1="40" x2="241" y2="40"/>' + /* Kevin, 29 Aug (28 Aug thread): animated media, no mascots - value dots travel the route while the transaction runs */
    '<circle class="txt-mover txt-mover-0" cx="59" cy="40" r="3"/>' + '<circle class="txt-mover txt-mover-0 txt-mover-b" cx="59" cy="40" r="3"/>' + '<circle class="txt-mover txt-mover-1" cx="167" cy="40" r="3"/>' + '<circle class="txt-mover txt-mover-1 txt-mover-b" cx="167" cy="40" r="3"/>' + '<circle class="txt-node txt-node-0" cx="42" cy="40" r="17"/>' + '<path class="txt-glyph" transform="translate(31,29) scale(0.0229) translate(0,960)" d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Z"/>' + '<circle class="txt-node txt-node-1" cx="150" cy="40" r="17"/>' + '<path class="txt-glyph" transform="translate(139,29) scale(0.0229) translate(0,960)" d="M480-80 240-320l57-57 183 183 183-183 57 57L480-80ZM298-584l-58-56 240-240 240 240-58 56-182-182-182 182Z"/>' + '<circle class="txt-node txt-node-2" cx="258" cy="40" r="17"/>' + destGlyph + '<text class="txt-cap" x="42" y="78" text-anchor="middle">' + esc(labels.a) + '</text>' + '<text class="txt-cap" x="150" y="78" text-anchor="middle">' + esc(labels.b) + '</text>' + '<text class="txt-cap" x="258" y="78" text-anchor="middle">' + esc(labels.c) + '</text>' + '</svg>';
  }

  /* ── Persistent nav pill ───────────────────────────────────────────────── */
  var pill = function () {
    var startedAt = null,
      timer = null;
    function node() {
      return el('txPendingPill');
    }
    function render() {
      var p = node();
      if (!p || startedAt == null) return;
      var mins = Math.floor((Date.now() - startedAt) / 60000);
      var t = p.querySelector('.tx-pill-time');
      if (t) t.textContent = '· ' + (mins < 1 ? 'just now' : mins + ' min');
    }
    return {
      start: function (opts) {
        var p = node();
        if (!p) return;
        startedAt = Date.now();
        p.hidden = false;
        p.removeAttribute('data-state');
        p.setAttribute('href', opts && opts.href || '#main-content');
        var lab = p.querySelector('.tx-pill-text');
        if (lab) lab.textContent = opts && opts.label || 'Transaction pending';
        p.setAttribute('aria-label', (opts && opts.label || 'Transaction pending') + ', open status');
        render();
        clearInterval(timer);
        timer = setInterval(render, 15000);
      },
      stop: function (state) {
        var p = node();
        clearInterval(timer);
        timer = null;
        startedAt = null;
        if (!p) return;
        if (state) {
          p.setAttribute('data-state', state);
          var lab = p.querySelector('.tx-pill-text');
          var t = p.querySelector('.tx-pill-time');
          if (lab) lab.textContent = state === 'failed' ? 'Transaction failed' : 'Transaction complete';
          if (t) t.textContent = '';
          setTimeout(function () {
            p.hidden = true;
          }, 4000);
        } else {
          p.hidden = true;
        }
      }
    };
  }();

  /* ── Tracker ───────────────────────────────────────────────────────────── */
  function mount(host, cfg) {
    if (!host) return null;
    cfg = cfg || {};
    var stages = cfg.stages || [];
    var timings = cfg.timings || {};
    var stageMs = timings.stages || [];
    var uid = 'txt' + Date.now();
    var state = 'running'; // running | delayed | done | failed
    var idx = 0; // current stage index
    var startedAt = Date.now();
    var confN = 0;
    var waitIdx = 0;
    var factIdx = 0;
    var timers = [];
    function later(fn, ms) {
      var t = setTimeout(fn, ms);
      timers.push(t);
      return t;
    }
    function every(fn, ms) {
      var t = setInterval(fn, ms);
      timers.push(t);
      return t;
    }
    function clearAll() {
      timers.forEach(function (t) {
        clearTimeout(t);
        clearInterval(t);
      });
      timers = [];
    }

    /* ---- render shell ---- */
    host.innerHTML = '' + '<section class="txt" data-kind="' + esc(cfg.kind || 'transfer') + '" data-state="running" aria-live="polite">' + '<div class="txt-hero">' + illustration(cfg.kind, cfg.journey || {
      alt: 'Your transaction on its way',
      a: 'You',
      b: 'Network',
      c: 'Destination'
    }) + '<h2 class="txt-headline" id="' + uid + 'Head" tabindex="-1">' + esc(cfg.headline || 'Your transaction is on its way') + '</h2>' + '<p class="txt-eta"><span id="' + uid + 'Eta">' + esc(cfg.eta || 'Usually takes 2–5 minutes') + '</span> · <span class="txt-timer" id="' + uid + 'Timer">0:00</span> elapsed</p>' + '</div>' + '<div class="txt-banner" id="' + uid + 'Banner" role="status" hidden></div>' + '<ol class="txt-stages" id="' + uid + 'Stages">' + stages.map(function (s, i) {
      return '<li class="txt-stage" data-i="' + i + '">' + '<span class="txt-stage-marker">' + (i + 1) + '</span>' + '<span class="txt-stage-body"><span class="txt-stage-title">' + esc(s.title) + '</span>' + '<span class="txt-stage-sub">' + esc(s.sub) + '</span></span>' + '<span class="txt-stage-spin" aria-hidden="true"></span>' + '</li>';
    }).join('') + '</ol>' + (cfg.confirmations ? '<div class="txt-conf" id="' + uid + 'Conf" hidden>' + '<div class="txt-conf-head"><span class="txt-conf-label">' + esc(cfg.confirmations.label || 'Network is double-checking') + '</span>' + '<span class="txt-conf-count" id="' + uid + 'ConfCount">0 of ' + cfg.confirmations.target + '</span></div>' + '<div class="txt-conf-bar"><span class="txt-conf-fill" id="' + uid + 'ConfFill"></span></div>' + '</div>' : '') + (cfg.interactive ? '<div class="txt-media" id="' + uid + 'Media" hidden></div>' : '') + '<div class="txt-reassure">' + (cfg.reassure || []).map(function (r, i) {
      var ic = [ICON.shield, ICON.bell, ICON.calm][i] || ICON.calm;
      return '<p class="txt-reassure-row">' + ic + '<span>' + r + '</span></p>';
    }).join('') + '</div>' + (cfg.wait && cfg.wait.length ? '<div class="txt-wait">' + '<p class="txt-wait-label">While you wait</p>' + '<div class="txt-wait-card" id="' + uid + 'Wait" role="region" aria-label="While you wait"></div>' + '<div class="txt-wait-dots" id="' + uid + 'WaitDots" role="tablist" aria-label="While you wait cards"></div>' + '</div>' : '') + (cfg.explain ? '<details class="txt-what"><summary>What is happening?</summary>' + '<div class="txt-what-body">' + (cfg.explain || []).map(function (p) {
      return '<p>' + p + '</p>';
    }).join('') + '</div>' + '</details>' : '') + (cfg.facts && cfg.facts.length ? '<p class="txt-fact">' + ICON.bulb + '<span id="' + uid + 'Fact"></span></p>' : '') + '<div class="txt-actions" id="' + uid + 'Actions" hidden></div>' + (cfg.devControls === false ? '' : '<div class="txt-demo">' + '<p class="txt-demo-label">Prototype: simulate a transaction state</p>' + '<div class="txt-demo-btns" id="' + uid + 'Demo" role="group" aria-label="Transaction state selector">' + '<button type="button" class="txt-demo-btn is-on" data-o="normal">Normal (default)</button>' + '<button type="button" class="txt-demo-btn" data-o="delayed">Taking longer</button>' + '<button type="button" class="txt-demo-btn" data-o="failed">Failed</button>' + '<button type="button" class="txt-demo-btn" data-o="done">Done now</button>' + '</div>' + '</div>') + '</section>';
    var root = host.querySelector('.txt');
    var headEl = el(uid + 'Head');
    var timerEl = el(uid + 'Timer');
    var etaEl = el(uid + 'Eta');
    var bannerEl = el(uid + 'Banner');
    var confWrap = el(uid + 'Conf');
    var confCount = el(uid + 'ConfCount');
    var confFill = el(uid + 'ConfFill');
    var actionsEl = el(uid + 'Actions');
    var waitEl = el(uid + 'Wait');
    var waitDots = el(uid + 'WaitDots');
    var factEl = el(uid + 'Fact');
    var stageEls = Array.prototype.slice.call(host.querySelectorAll('.txt-stage'));
    var mediaEl = el(uid + 'Media');
    var mediaShown = false,
      mediaIdx = 0,
      confSince = null;

    /* ---- stage painting ---- */
    function paintStages() {
      stageEls.forEach(function (s, i) {
        s.classList.remove('is-done', 'is-current', 'is-failed');
        var marker = s.querySelector('.txt-stage-marker');
        if (state === 'failed' && i === idx) {
          s.classList.add('is-failed');
          marker.innerHTML = ICON.cross;
        } else if (i < idx || state === 'done') {
          s.classList.add('is-done');
          marker.innerHTML = ICON.check;
        } else if (i === idx) {
          s.classList.add('is-current');
          marker.textContent = String(i + 1);
        } else {
          marker.textContent = String(i + 1);
        }
      });
      // dots on the route illustration follow the stage progression
      var frac = stages.length > 1 ? idx / (stages.length - 1) : 1;
      ['0', '1', '2'].forEach(function (k, n) {
        var node = host.querySelector('.txt-node-' + k);
        if (!node) return;
        node.classList.toggle('is-done', state === 'done' || frac > n / 2);
        node.classList.toggle('is-current', state !== 'done' && Math.abs(frac - n / 2) < 0.26);
      });
      // connector segments: done = solid fin-up; otherwise dots keep travelling while the tx runs
      ['0', '1'].forEach(function (k, n) {
        var seg = host.querySelector('.txt-seg-' + k);
        if (!seg) return;
        var segDone = state === 'done' || frac > (n + 1) / 2;
        seg.classList.toggle('is-done', segDone);
        host.querySelectorAll('.txt-mover-' + k).forEach(function (d) {
          d.classList.toggle('is-off', segDone || state === 'done' || state === 'failed');
        });
      });
      if (confWrap) {
        var showConf = state !== 'failed' && state !== 'done' && !!stages[idx] && !!stages[idx].conf;
        confWrap.hidden = !showConf;
      }
    }

    /* ---- while-you-wait rotation ---- */
    function paintWait() {
      if (!waitEl) return;
      var c = cfg.wait[waitIdx % cfg.wait.length];
      waitEl.innerHTML = (c.eyebrow ? '<p class="txt-wait-eyebrow">' + c.eyebrow + '</p>' : '') + '<p class="txt-wait-title">' + c.title + '</p>' + '<p class="txt-wait-body">' + c.body + '</p>';
      waitDots.innerHTML = cfg.wait.map(function (_, i) {
        return '<button type="button" class="txt-wait-dot' + (i === waitIdx % cfg.wait.length ? ' is-on' : '') + '" data-w="' + i + '" aria-label="Show card ' + (i + 1) + ' of ' + cfg.wait.length + '"></button>';
      }).join('');
      waitDots.querySelectorAll('.txt-wait-dot').forEach(function (b) {
        b.addEventListener('click', function () {
          waitIdx = parseInt(b.getAttribute('data-w'), 10);
          paintWait();
        });
      });
    }
    function paintFact() {
      if (!factEl) return;
      factEl.innerHTML = cfg.facts[factIdx % cfg.facts.length];
    }

    /* ---- interactive media (cfg.interactive): revealed only when the network-check
       stage has run past cfg.interactive.afterMs (FE-207 follow-up, Eric · swap only) ---- */
    function paintMedia() {
      if (!mediaEl || !cfg.interactive) return;
      var frames = cfg.interactive.frames || [];
      if (!frames.length) return;
      var f = frames[mediaIdx];
      mediaEl.innerHTML = '<p class="txt-media-label">' + esc(cfg.interactive.label || 'A closer look while you wait') + '</p>' + '<div class="txt-media-card">' + (f.art || '') + '<p class="txt-media-title">' + f.title + '</p>' + '<p class="txt-media-body">' + f.body + '</p>' + '<div class="txt-media-nav">' + '<button type="button" class="txt-media-btn" data-m="prev"' + (mediaIdx === 0 ? ' disabled' : '') + '>Back</button>' + '<span class="txt-media-count">' + (mediaIdx + 1) + ' of ' + frames.length + '</span>' + '<button type="button" class="txt-media-btn" data-m="next"' + (mediaIdx === frames.length - 1 ? ' disabled' : '') + '>Next</button>' + '</div>' + '</div>';
      mediaEl.querySelectorAll('.txt-media-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          mediaIdx = Math.max(0, Math.min(frames.length - 1, mediaIdx + (b.getAttribute('data-m') === 'next' ? 1 : -1)));
          paintMedia();
        });
      });
    }
    function maybeShowMedia() {
      if (!mediaEl || mediaShown || !cfg.interactive) return;
      if (state === 'done' || state === 'failed') return;
      if (!stages[idx] || !stages[idx].conf) {
        confSince = null;
        return;
      }
      if (confSince == null) confSince = Date.now();
      if (Date.now() - confSince >= (cfg.interactive.afterMs || 12000)) {
        mediaShown = true;
        mediaIdx = 0;
        paintMedia();
        mediaEl.hidden = false;
      }
    }

    /* ---- terminal painting ---- */
    function setActions(list) {
      if (!actionsEl) return;
      if (!list || !list.length) {
        actionsEl.hidden = true;
        actionsEl.innerHTML = '';
        return;
      }
      actionsEl.innerHTML = list.map(function (a) {
        return '<a class="txt-link" href="' + a.href + '"' + (a.blank ? ' target="_blank" rel="noopener"' : '') + '>' + esc(a.label) + '</a>';
      }).join('');
      actionsEl.hidden = false;
    }
    function goDelayed() {
      if (state === 'done' || state === 'failed') return;
      state = 'delayed';
      root.setAttribute('data-state', 'delayed');
      headEl.textContent = cfg.headlineDelayed || 'Taking a little longer than usual. That is normal when the network is busy. Nothing to do.';
      etaEl.textContent = cfg.etaDelayed || 'Still working. We will finish this for you';
      bannerEl.innerHTML = ICON.clock + '<span>' + (cfg.delayedCopy || 'Networks get busy. Your money is safe and still queued. Nothing to resend or pay again.') + '</span>';
      bannerEl.hidden = false;
      setActions((cfg.support ? [{
        label: cfg.support.label || 'Contact support',
        href: cfg.support.href
      }] : []).concat(cfg.trackHref ? [{
        label: cfg.trackLabel || 'Track in history',
        href: cfg.trackHref
      }] : []));
      paintStages();
    }
    function goFailed() {
      if (state === 'done') return;
      clearAll();
      state = 'failed';
      root.setAttribute('data-state', 'failed');
      headEl.textContent = cfg.headlineFailed || "We couldn't complete this transaction";
      etaEl.textContent = cfg.etaFailed || 'Nothing was taken. You can safely try again';
      bannerEl.innerHTML = ICON.alert + '<span>' + (cfg.failCopy || 'The network rejected it. No funds left your wallet. Try again, or contact support.') + '</span>';
      bannerEl.hidden = false;
      if (confWrap) confWrap.hidden = true;
      if (mediaEl) mediaEl.hidden = true;
      setActions([{
        label: cfg.retryLabel || 'Try again',
        href: cfg.retryHref || '#'
      }].concat(cfg.support ? [{
        label: cfg.support.label || 'Contact support',
        href: cfg.support.href
      }] : []));
      paintStages();
      pill.stop('failed');
      if (typeof cfg.onFinish === 'function') cfg.onFinish('failed');
    }
    function goDone() {
      if (state === 'done') return;
      clearAll();
      state = 'done';
      idx = stages.length - 1;
      root.setAttribute('data-state', 'done');
      headEl.textContent = cfg.headlineDone || 'All done';
      etaEl.textContent = cfg.etaDone || 'Completed';
      bannerEl.hidden = true;
      if (mediaEl) mediaEl.hidden = true;
      if (confWrap && cfg.confirmations) {
        confWrap.hidden = true;
        confCount.textContent = cfg.confirmations.target + ' of ' + cfg.confirmations.target;
        confFill.style.width = '100%';
      }
      setActions(null);
      paintStages();
      pill.stop('done');
      if (typeof cfg.onFinish === 'function') cfg.onFinish('success');
    }

    /* ---- run ---- */
    function advance() {
      if (state === 'failed' || state === 'done') return;
      if (idx >= stages.length - 1) {
        goDone();
        return;
      }
      idx += 1;
      paintStages();
      if (typeof cfg.onStage === 'function') cfg.onStage(idx, stages[idx]);
      /* The last timings value is the dwell on the final stage before the tracker resolves. */
      if (idx >= stages.length - 1) {
        later(goDone, stageMs[idx] || 600);
        return;
      }
      later(advance, stageMs[idx] || 3500);
    }
    paintStages();
    paintWait();
    paintFact();
    function tick() {
      var s = Math.floor((Date.now() - startedAt) / 1000);
      timerEl.textContent = mmss(s);
      maybeShowMedia();
    }
    every(tick, 1000);
    if (cfg.wait && cfg.wait.length > 1) {
      every(function () {
        waitIdx += 1;
        paintWait();
      }, cfg.waitRotateMs || 6000);
    }
    if (cfg.facts && cfg.facts.length > 1) {
      every(function () {
        factIdx += 1;
        paintFact();
      }, cfg.factRotateMs || 5000);
    }
    if (cfg.confirmations) {
      every(function () {
        if (state === 'done' || state === 'failed') return;
        if (!stages[idx] || !stages[idx].conf) return;
        if (confN >= cfg.confirmations.target) return;
        confN += 1;
        confCount.textContent = confN + ' of ' + cfg.confirmations.target;
        confFill.style.width = Math.round(confN / cfg.confirmations.target * 100) + '%';
      }, cfg.confirmations.everyMs || 700);
    }
    later(advance, stageMs[0] || 3500);
    if (timings.delayedAfter) later(goDelayed, timings.delayedAfter);

    /* ---- pill + bell ---- */
    if (cfg.pill) pill.start(cfg.pill);
    if (cfg.notify && typeof window.addNotification === 'function') {
      window.addNotification({
        level: 'progressing',
        category: cfg.notify.category || 'transaction',
        title: cfg.notify.title,
        message: cfg.notify.message,
        ref: cfg.notify.ref || '',
        ctaUrl: cfg.notify.ctaUrl,
        ctaLabel: cfg.notify.ctaLabel || 'View status'
      });
    }

    /* ---- dev controls ---- */
    var demo = el(uid + 'Demo');
    if (demo) {
      demo.addEventListener('click', function (e) {
        var b = e.target.closest('.txt-demo-btn');
        if (!b) return;
        demo.querySelectorAll('.txt-demo-btn').forEach(function (x) {
          x.classList.remove('is-on');
        });
        b.classList.add('is-on');
        api.setOutcome(b.getAttribute('data-o'));
      });
    }
    var api = {
      root: root,
      get state() {
        return state;
      },
      setOutcome: function (o) {
        if (o === 'delayed') {
          clearAll();
          restartTicks();
          goDelayed();
        } else if (o === 'failed') goFailed();else if (o === 'done') goDone();else if (o === 'normal' && state === 'delayed') {
          state = 'running';
          root.setAttribute('data-state', 'running');
          headEl.textContent = cfg.headline;
          etaEl.textContent = cfg.eta;
          bannerEl.hidden = true;
          setActions(null);
          paintStages();
          later(advance, stageMs[idx] || 3500);
        }
      },
      destroy: function () {
        clearAll();
        host.innerHTML = '';
      }
    };
    function restartTicks() {
      every(tick, 1000);
      if (cfg.wait && cfg.wait.length > 1) every(function () {
        waitIdx += 1;
        paintWait();
      }, cfg.waitRotateMs || 6000);
      if (cfg.facts && cfg.facts.length > 1) every(function () {
        factIdx += 1;
        paintFact();
      }, cfg.factRotateMs || 5000);
    }
    if (headEl && cfg.focus !== false) {
      try {
        headEl.focus({
          preventScroll: true
        });
      } catch (e) {/* noop */}
    }
    return api;
  }
  window.TxTracker = {
    mount: mount,
    pill: pill,
    ICON: ICON
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/tx-tracker.js", error: String((e && e.message) || e) }); }

// unera-pages/ws-select.js
try { (() => {
/* Huma - native <select> -> wallet-scope dropdown enhancer.
   Self-contained: injects its own CSS, mirrors value back to the hidden <select>
   and fires its native 'change' so existing handlers keep working. Auto-enhances
   every <select> on load and any added later (MutationObserver). */
(function () {
  if (window.__wsSelectLoaded) return;
  window.__wsSelectLoaded = true;
  var css = '' + '.ws-sel{position:relative;display:block;width:100%;}' + '.ws-sel-trigger{display:flex;align-items:center;justify-content:space-between;gap:0.5rem;width:100%;min-height:48px;padding:0.7rem 1rem;background:var(--neutral-50,#fff);border:2px solid var(--border-subtle,rgba(23,61,71,0.13));border-radius:0.75rem;font-family:inherit;font-size:1rem;font-weight:500;color:var(--text-primary,#173d47);cursor:pointer;text-align:left;transition:border-color .15s,box-shadow .15s;}' + '.ws-sel-trigger:hover{border-color:var(--brand-deep-blue,#173d47);}' + '.ws-sel-trigger:focus-visible{outline:2px solid var(--brand-deep-blue,#173d47);outline-offset:1px;}' + '.ws-sel-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}' + '.ws-sel-chev{width:18px;height:18px;flex-shrink:0;fill:currentColor;transition:transform .2s;}' + '.ws-sel.open .ws-sel-chev{transform:rotate(180deg);}' + '.ws-sel-list{position:absolute;top:calc(100% + 6px);left:0;right:0;z-index:60;background:#fff;border:1.5px solid var(--border-subtle,rgba(23,61,71,0.13));border-radius:0.75rem;box-shadow:0 12px 32px rgba(23,61,71,0.16);padding:0.35rem;max-height:280px;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;}' + '.ws-sel-list::-webkit-scrollbar{display:none;}' + '.ws-sel-list[hidden]{display:none;}' + '.ws-sel-opt{display:block;width:100%;text-align:left;padding:0.6rem 0.75rem;border:none;background:none;border-radius:0.5rem;font-family:inherit;font-size:0.95rem;color:var(--text-primary,#173d47);cursor:pointer;min-height:40px;}' + '.ws-sel-opt:hover{background:rgba(23,61,71,0.07);}' + '.ws-sel-opt.active{background:color-mix(in srgb,var(--brand-deep-blue,#173d47) 8%,#fff);color:var(--brand-deep-blue,#173d47);font-weight:600;}' + '.ws-sel-opt:focus-visible{outline:2px solid var(--brand-deep-blue,#173d47);outline-offset:-2px;}' + '@media (prefers-reduced-motion:reduce){.ws-sel-chev,.ws-sel-list{transition:none;}}';
  var st = document.createElement('style');
  st.id = 'ws-select-css';
  st.textContent = css;
  (document.head || document.documentElement).appendChild(st);
  var CHEV = '<svg class="ws-sel-chev" viewBox="0 -960 960 960" aria-hidden="true"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>';
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function enhance(sel) {
    if (!sel || sel.__wsEnhanced || sel.multiple || sel.size && sel.size > 1 || sel.hasAttribute('data-ws-skip')) return;
    sel.__wsEnhanced = true;
    sel.style.display = 'none';
    sel.setAttribute('aria-hidden', 'true');
    sel.tabIndex = -1;
    var dd = document.createElement('div');
    dd.className = 'ws-sel';
    var tr = document.createElement('button');
    tr.type = 'button';
    tr.className = 'ws-sel-trigger';
    tr.setAttribute('aria-haspopup', 'listbox');
    tr.setAttribute('aria-expanded', 'false');
    var al = sel.getAttribute('aria-label');
    if (!al) {
      var lab = sel.closest('.form-group, .kyc-decision-field, .form-field');
      var lel = lab && lab.querySelector('label, .form-label');
      if (lel) al = lel.textContent.trim();
    }
    if (al) tr.setAttribute('aria-label', al);
    var lbl = document.createElement('span');
    lbl.className = 'ws-sel-label';
    tr.appendChild(lbl);
    tr.insertAdjacentHTML('beforeend', CHEV);
    var list = document.createElement('div');
    list.className = 'ws-sel-list';
    list.setAttribute('role', 'listbox');
    list.hidden = true;
    function syncLabel() {
      var o = sel.options[sel.selectedIndex];
      lbl.textContent = o ? o.textContent : '';
    }
    function build() {
      list.innerHTML = Array.prototype.map.call(sel.options, function (o, i) {
        return '<button type="button" role="option" aria-selected="' + (i === sel.selectedIndex) + '" class="ws-sel-opt' + (i === sel.selectedIndex ? ' active' : '') + '"' + (o.disabled ? ' disabled' : '') + ' data-i="' + i + '">' + esc(o.textContent) + '</button>';
      }).join('');
      list.querySelectorAll('.ws-sel-opt:not([disabled])').forEach(function (b) {
        b.addEventListener('click', function () {
          sel.selectedIndex = parseInt(b.getAttribute('data-i'), 10);
          sel.dispatchEvent(new Event('change', {
            bubbles: true
          }));
          syncLabel();
          build();
          closeL();
          tr.focus();
        });
      });
    }
    function openL() {
      build();
      list.hidden = false;
      tr.setAttribute('aria-expanded', 'true');
      dd.classList.add('open');
    }
    function closeL() {
      list.hidden = true;
      tr.setAttribute('aria-expanded', 'false');
      dd.classList.remove('open');
    }
    tr.addEventListener('click', function (e) {
      e.stopPropagation();
      list.hidden ? openL() : closeL();
    });
    tr.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeL();else if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && list.hidden) {
        e.preventDefault();
        openL();
        var f = list.querySelector('.ws-sel-opt');
        if (f) f.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!dd.contains(e.target)) closeL();
    });
    // keep the dropdown in sync if other code sets select.value programmatically
    sel.addEventListener('change', function () {
      syncLabel();
      if (!list.hidden) build();
    });
    dd.appendChild(tr);
    dd.appendChild(list);
    sel.parentNode.insertBefore(dd, sel.nextSibling);
    syncLabel();
  }
  function run(root) {
    (root || document).querySelectorAll('select').forEach(enhance);
  }
  window.enhanceSelects = run;
  function init() {
    run();
    if (window.MutationObserver) {
      new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          Array.prototype.forEach.call(m.addedNodes, function (n) {
            if (n.nodeType !== 1) return;
            if (n.tagName === 'SELECT') enhance(n);else if (n.querySelectorAll) n.querySelectorAll('select').forEach(enhance);
          });
        });
      }).observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);else init();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/ws-select.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.NotificationBell = __ds_scope.NotificationBell;

__ds_ns.WalletPill = __ds_scope.WalletPill;

__ds_ns.SaveToAddressBook = __ds_scope.SaveToAddressBook;

})();
