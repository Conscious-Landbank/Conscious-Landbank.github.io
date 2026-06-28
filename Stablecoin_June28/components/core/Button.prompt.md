**Button** — UNERA Stablecoin's primary action control; Deep Blue fill by default, never a gradient CTA on product UI.

```jsx
<Button variant="primary">Continue</Button>
<Button variant="secondary" href="dashboard.html">Cancel</Button>
<Button variant="accent">Purchase UNERA CAD</Button>   {/* Reserve Gold — Deep-Blue surfaces only */}
```

Variants: `primary` (Deep Blue), `secondary` (outline → Deep Blue on hover), `accent` (Reserve Gold, dark surfaces only), `ghost`. Sizes `sm | md | lg`. Pass `href` to render an anchor, `icon` / `iconRight` for inline-SVG glyphs, `fullWidth`, `disabled`.
