Semantic status chip; pass the requirement's own status word and the tone is derived (override with `tone`).
```jsx
<StatusChip status="Failed" />
<StatusChip status="Processing" pulse />
<StatusChip status="Pending approval" />
```
- Never communicate status by color alone: the chip always shows the word; add a failure reason next to Failed/Stuck rows.
