**Badge** — pill for financial direction and status; never use a brand-decoration color for money.

```jsx
<Badge variant="up">+$2,400 this month</Badge>
<Badge variant="down">−$180</Badge>
<Badge variant="neutral">Growing daily</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="success">Completed</Badge>
```

`up`/`down` auto-prepend a directional arrow (override with `icon`). `neutral` is flat/unchanged. Status variants: `success`, `warning`, `error`, `info`, plus `solid` (Deep Blue fill). Always pair money direction with the arrow — color alone is not accessible.
