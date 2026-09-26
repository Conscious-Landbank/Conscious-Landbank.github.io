**Stepper** is the progress rail for Purchase / Redeem / KYC / password-reset flows.

```jsx
<Stepper steps={["Amount", "Pay", "Review", "Done"]} current={2} />
```

Progression is **Deep Blue** (never fin-up green). Steps before `current` show a checkmark; `current` is filled; later steps are outlined. The fill bar animates over 0.5s.
