**Checkbox** — checkbox/radio where the entire 48px row is tappable, not a bare input.

```jsx
<Checkbox label="I accept the terms" name="tos" />
<Checkbox type="radio" name="rail" label="Standard transfer" sublabel="1–2 business days · free" defaultChecked />
```

Checked state fills the box Deep Blue with a white tick (radio = filled dot). `sublabel` adds a secondary line. Use `type="radio"` with a shared `name` for single-select groups. Focus ring is Deep Blue.
