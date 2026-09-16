**Checkbox** is a checkbox/radio where the entire 48px row is tappable, not a bare input.

```jsx
<Checkbox label="I accept the terms" name="tos" />
<Checkbox type="radio" name="rail" label="Standard transfer" sublabel="1–2 business days · free" defaultChecked />
```

`type="radio"` for single-select rows; `sublabel` adds a secondary line. Selected rows get a Deep-Blue border + Cloud-Blue wash.
