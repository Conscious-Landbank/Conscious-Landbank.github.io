/* @ds-bundle: {"format":3,"namespace":"UNERADesignSystem_679671","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Stepper","sourcePath":"components/core/Stepper.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"NotificationBell","sourcePath":"components/navigation/NotificationBell.jsx"},{"name":"WalletPill","sourcePath":"components/navigation/WalletPill.jsx"},{"name":"SaveToAddressBook","sourcePath":"components/transact/SaveToAddressBook.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"0a6fe7faf8eb","components/core/Badge.jsx":"eb0b4e080a8a","components/core/Button.jsx":"35b6cc4da92d","components/core/Card.jsx":"c54e42084d04","components/core/Stepper.jsx":"bd4bc70e7c1e","components/forms/Checkbox.jsx":"4b575421ac0b","components/forms/Input.jsx":"9cabdc9e79ee","components/forms/Select.jsx":"ea8cf29adf2b","components/navigation/NotificationBell.jsx":"a415d2752731","components/navigation/WalletPill.jsx":"554a2c357a06","components/transact/SaveToAddressBook.jsx":"33ab969b4796","ui_kits/consumer-app/Nav.jsx":"72069a455179","ui_kits/consumer-app/icons.jsx":"03613024964d","ui_kits/consumer-app/screens.jsx":"cdab6ce7e258","unera-pages/auth-enhancements.js":"637963472c00","unera-pages/consumer-app-nav.js":"8aebdb7c1739","unera-pages/js/wallet/providers.js":"5c4f1f004dcb","unera-pages/notifications-bell.js":"8d878d8fd117"},"inlinedExternals":[],"unexposedExports":[]} */

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
   Small avatars are weight 600; large avatars 700 — per source. */
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
 * Deep Blue tile in the display face (no photo upload in-product) — sizes match
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

/* Financial direction — always pair with a directional icon */
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

/* Primary — Deep Blue fill (solid; never gradient on product UI) */
.unera-btn--primary { background: var(--brand-deep-blue); color: var(--brand-white); }
.unera-btn--primary:hover:not([disabled]) { background: var(--neutral-800); box-shadow: 0 4px 12px rgba(23,61,71,0.3); }

/* Secondary — transparent, subtle border, hover to Deep Blue ink */
.unera-btn--secondary { background: transparent; color: var(--text-secondary); border-color: var(--border-subtle); }
.unera-btn--secondary:hover:not([disabled]) { border-color: var(--brand-deep-blue); color: var(--brand-deep-blue); background: rgba(23,61,71,0.02); }

/* Accent — Deep Blue fill + Yellow text (warm banners only) */
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
 * UNERA primary action button. Deep Blue fill is the product default; never
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
/* Surface tint variants — never flat grey, never rainbow */
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

/* Top accent rule that wipes in on hover (impact / centre pattern) */
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
 * Surface card with UNERA geometry (20px radius, tinted border, soft shadow).
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
 * Tappable checkbox / radio row — the entire 48px row is the hit target,
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
  font-size: var(--fs-body); /* 16px — prevents iOS zoom */
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
 * Custom select — the system bans native <select>. Keyboard-accessible
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
 * NotificationBell — the consumer nav's notification control, as a reusable
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
  }, "You\u2019re all caught up") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
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
/* Self-contained "Save to address book" pattern — success CTA + modal + localStorage store.
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
  width: 100%; max-width: 460px; background: var(--brand-white); border-radius: 1.25rem;
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
  }, ICON_CHECK, /*#__PURE__*/React.createElement("span", null, "Saved as \u201C", savedLabel, "\u201D"), /*#__PURE__*/React.createElement("a", {
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
    placeholder: "e.g. Ledger \u2014 personal, Exchange hot wallet"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stab-field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stab-label"
  }, "Wallet address"), /*#__PURE__*/React.createElement("div", {
    className: "stab-static stab-static--mono"
  }, address || '—')), /*#__PURE__*/React.createElement("div", {
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
/* UNERA consumer app — top nav (the product spine). */
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
    "aria-label": "UNERA home"
  }, /*#__PURE__*/React.createElement("img", {
    className: "nav-logo-img",
    src: "../../assets/logos/unera-white-text-nav.svg",
    alt: "UNERA"
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
  }, "Exchange")))), link("centres", "Centres"))), /*#__PURE__*/React.createElement("div", {
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
/* UNERA consumer-app UI kit — Material Symbols (inline SVG, fill=currentColor).
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
/* UNERA consumer app — screens (Dashboard, Wallet, Centres, Send flow). */
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
    detail: "3 centres supported",
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
    key: "centres",
    cls: "action-card--sky",
    icon: UI.explore,
    title: "Explore Centres",
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
  }, "One Flow. Many Lives. \u2014 Track your impact and manage your contributions.")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
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
      title: "Donation to Nairobi Humanity Centre",
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
      title: "Yield Earned — Monthly Distribution",
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
    "aria-label": a.sym + " — " + a.pct + " of portfolio"
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
  }, "All wallet activity \u2014 on-chain transfers and off-chain payments")), /*#__PURE__*/React.createElement("div", {
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
      msg: "Sent 12.5 USDC — confirmed on Ethereum",
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
      msg: "Your $100 donation to Nairobi Hope Centre has been processed",
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
      msg: "You sent 50 hUSD to 0x742d...4a23 — confirmed",
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
  }, "Transactions, donations, listings, and account activity \u2014 all in one place.")), /*#__PURE__*/React.createElement("div", {
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
    onClick: () => onNav(n.cat === "donation" ? "centres" : "wallet")
  }, n.cta, UI.arrowRightUp)), n.unread && /*#__PURE__*/React.createElement("span", {
    className: "notif-unread-dot",
    "aria-label": "Unread"
  })))))));
}

/* ─── Centres ───────────────────────────────────────────────────── */
function Centres({
  onNav
}) {
  const UI = window.UI;
  const centres = [{
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    cat: "Education · Nairobi",
    name: "Nairobi Hope Centre",
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
    name: "São Paulo Health Centre",
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
  }, "Humanity Centres"), /*#__PURE__*/React.createElement("p", {
    className: "page-subtitle"
  }, "Choose where your value lands. Every donation is tracked on-chain, end to end.")), /*#__PURE__*/React.createElement("div", {
    className: "centres-grid"
  }, centres.map((c, i) => /*#__PURE__*/React.createElement("div", {
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
  Centres,
  SendFlow,
  Notifications
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer-app/screens.jsx", error: String((e && e.message) || e) }); }

// unera-pages/auth-enhancements.js
try { (() => {
/* auth-enhancements.js — optional progressive-enhancement script. Stub to avoid 404 in standalone serve. */
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/auth-enhancements.js", error: String((e && e.message) || e) }); }

// unera-pages/consumer-app-nav.js
try { (() => {
/**
 * UNERA V2 — Consumer app navigation system
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

    // Top drawer wallet row is retired — the wallet now lives in the profile accordion. Keep hidden.
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
    display.setAttribute('aria-label', connected ? 'Wallet: ' + (document.getElementById('navWalletAddress')?.textContent || '') + ' on ' + (document.getElementById('navNetworkLabel')?.textContent || '') : 'Account menu — wallet not connected');
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
      } else if (active === 'transact') {
        var tb = document.getElementById('navDdTransactBtn');
        if (tb) tb.classList.add('is-active-route');
        var menu = document.getElementById('navDdTransactMenu');
        if (menu) {
          var match = menu.querySelector('a[href="' + page + '"]') || menu.querySelector('a[href*="' + page + '"]');
          if (match) match.setAttribute('aria-current', 'page');
        }
      } else if (active === 'centres') {
        var ct = document.getElementById('navLinkCentres') || document.querySelector('.nav-links a[href*="explore-centres"]');
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
    if (activePage === 'centres') {
      var centres = document.getElementById('menuLinkCentres');
      if (centres) {
        centres.classList.add('active');
        centres.setAttribute('aria-current', 'page');
      }
    } else if (activePage === 'dashboard') {
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
    label: 'Dashboard',
    href: 'dashboard-enhanced.html',
    icon: 'dashboard'
  }, {
    label: 'Centres',
    href: 'explore-centres.html',
    icon: 'centres',
    id: 'menuLinkCentres'
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
    centres: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>',
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
    if (activePage === 'centres' && item.label === 'Centres') return true;
    if (activePage === 'dashboard' && item.label === 'Dashboard') return true;
    if (activePage === 'wallet' && item.label === 'My Wallet') return true;
    if (activePage === 'account-settings' && item.label === 'Account Settings') return true;
    return false;
  }

  /* Product network allowlist: mainnet + testnet demo chains.
   * Removed from product demo: polygon, arbitrum, optimism, bnb — restore when multi-chain ships. */
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

  /* ─── Network switcher (3-part pill — separate network badge) ─── */
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

// unera-pages/js/wallet/providers.js
try { (() => {
/* js/wallet/providers.js — optional wallet-provider shims. Stub to avoid 404 in standalone serve. */
})(); } catch (e) { __ds_ns.__errors.push({ path: "unera-pages/js/wallet/providers.js", error: String((e && e.message) || e) }); }

// unera-pages/notifications-bell.js
try { (() => {
/* ============================================================================
   UNERA — Notification Bell (self-contained controller)
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
    /* ── Bell button + badge — self-sufficient chrome so the bell is correct even if
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
    /* ── Panel shell — PRD §7.5.2.2: 400px desktop / 70vh; full-width drawer < 768px.
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
    id: 'up_trade_fill',
    level: 'completed',
    category: 'transaction',
    title: 'Order filled',
    message: 'Your limit order to buy 1,200 USDC filled at 1.0001.',
    ref: 'Order TRD-10573',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: false,
    ctaUrl: 'trade.html',
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
  }];
  var notifications = JSON.parse(localStorage.getItem(NOTIF_KEY) || 'null');
  if (!Array.isArray(notifications) || notifications.length === 0) {
    notifications = DEFAULT.map(function (n) {
      return JSON.parse(JSON.stringify(n));
    });
    localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications));
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
    var badgeText = count > 99 ? '99+' : String(count); /* PRD §7.5.2.3 — cap at 99+ */
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
    updateTabTitle(count); /* PRD §7.5.2.4 — browser tab count */
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
