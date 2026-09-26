**StatusPill** is the transaction / service state pill (completed, pending, failed, processing, operational).

```jsx
<StatusPill status="completed" />
<StatusPill status="pending">Awaiting deposit</StatusPill>
<StatusPill status="operational" dot />   {/* PoR services */}
```

`completed` = fin-up, `pending` = warning, `failed` = error, `processing` = light-blue, `operational` = verify-teal. `dot` adds a leading status dot; children override the label.
