**Card** is the surface primitive: 20px radius, 1px tinted border, soft shadow, white-canvas tints.

```jsx
<Card surface="reserve" interactive>…</Card>
<Card surface="deep">…</Card>   {/* Deep-Blue card, white ink */}
```

`surface` picks a subtle tint (`impact`, `action`, `reserve`, `verify`, `cad-hub`, `warm`, `sky`) or `deep` for a Deep-Blue card. `interactive` adds the hover lift + Deep-Blue border. Pass `href` to make the whole card a link.
