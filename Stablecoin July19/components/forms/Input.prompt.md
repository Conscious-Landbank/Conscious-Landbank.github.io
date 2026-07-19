**Input** — labelled text field; label always visible, focus ring is Deep Blue, base font 16px to stop iOS zoom.

```jsx
<Input label="Email" type="email" placeholder="you@unera.io" required />
<Input label="Amount" prefix="$" suffix="hCAD" inputMode="decimal" hint="Min $10" />
<Input label="Wallet address" error="Invalid address" />
```

`prefix` / `suffix` render inline affixes; `hint` shows helper text; `error` swaps the border + message to the error color.
