**Input** — labelled text field; label is always visible, focus ring is Deep Blue, base font 16px to stop iOS zoom.

```jsx
<Input label="Email" type="email" placeholder="you@unera.io" required />
<Input label="Amount" prefix="$" inputMode="decimal" hint="Min $10" />
<Input label="Wallet" error="Invalid address" defaultValue="0xzz" />
```

12px (0.75rem) radius, 2px border. Pass `error` to flip the border red and wire `aria-invalid`; otherwise `hint` shows. `prefix` pins a fixed glyph (currency) inside the field. Never hide the label — use `aria-label` only when a visible label is truly impossible.
