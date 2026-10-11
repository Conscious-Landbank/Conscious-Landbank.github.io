Admin action button; use the verb that names the outcome ("Retry transaction", "Record reversal"), never "Submit"/"OK".
```jsx
<Button variant="primary">Retry transaction</Button>
<Button variant="secondary" size="sm">Export CSV</Button>
<Button variant="danger" loading>Blacklist wallet</Button>
```
- `danger` / `danger-outline` only for irreversible or financially consequential actions, always behind a confirmation that captures a reason code.
- `loading` while the backend workflow is being triggered; disable rather than hide for permission-restricted users and add a `title` explaining the required role.
