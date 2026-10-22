**Select** is the custom dropdown: Huma never uses a native `<select>`. Keyboard accessible (↑ ↓ Enter Esc), with a hidden input mirroring the value for form posts.

```jsx
<Select label="Network" options={["Ethereum", "Polygon", "Arbitrum"]} defaultValue="Ethereum" />
<Select label="Currency" name="ccy" options={[{value:'hUSD',label:'hUSD'},{value:'USDC',label:'USDC'}]} onChange={setCcy} />
```

Controlled (`value`+`onChange`) or uncontrolled (`defaultValue`). Selected option gets a Yellow-tint background + Deep Blue check. Inside modals, the menu should flip up when near the footer, so clamp positioning to the viewport.
