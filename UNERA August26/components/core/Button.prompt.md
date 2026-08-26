**Button** is Huma's primary action control: Deep Blue fill by default, never a gradient CTA on product UI.

```jsx
<Button variant="primary">Continue</Button>
<Button variant="secondary" href="wallet.html">Cancel</Button>
<Button variant="accent" icon={<BoltIcon/>}>Get hCAD</Button>
<Button variant="primary" block disabled>Processing…</Button>
```

Variants: `primary` (Deep Blue fill, white text), `secondary` (outline, hover to Deep Blue ink), `accent` (Deep Blue fill with Yellow text, warm banners only). Sizes: `md` (46px, default), `sm` (36px). Use `block` for full-width, `href` to render an `<a>`. Pass inline-SVG `icon` / `iconRight` (Material Symbols, `fill="currentColor"`).
