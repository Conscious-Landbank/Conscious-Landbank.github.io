**Select** is a custom dropdown; UNERA never uses a native `<select>`. Keyboard accessible (↑ ↓ Enter Esc).

```jsx
<Select label="Network" options={["Ethereum", "Polygon", "Arbitrum"]} defaultValue="Ethereum" />
<Select label="Pay with" options={[{value:'interac',label:'INTERAC'},{value:'card',label:'Card'}]} onChange={setMethod} />
```

Options are plain strings or `{value, label}`. Controlled via `value` + `onChange`, or uncontrolled via `defaultValue`.
