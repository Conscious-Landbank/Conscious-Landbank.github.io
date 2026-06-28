**Stepper** — progress rail for Send / Add Money / Exchange / Get-Redeem CAD flows.

```jsx
<Stepper steps={["Amount", "Recipient", "Review", "Done"]} current={2} />
```

`current` is the zero-based active index; steps before it render as completed with a fin-up checkmark, the active circle is Deep Blue (scaled 1.1×), upcoming steps are outlined. The connecting progress bar fills in Deep Blue. Collapses below 640px — pair with a mobile compact stepper. Never paint stepper numbers in fin-up green: progression is Deep Blue, money outcomes are fin-up.
