**Card** is the surface primitive: 20px radius, 2px tinted border, soft shadow, white-canvas tints.

```jsx
<Card surface="impact" interactive accent>
  <div className="impact-value">$10,240</div>
  <div>Total Portfolio</div>
</Card>
<Card surface="action" interactive href="send.html">Send Tokens</Card>
<Card surface="inverse">Dark hero panel</Card>
```

`surface`: `card` (white), `impact`, `action`, `warm`, `sky`, `cad`, `inverse` (Deep Blue). `interactive` enables the 6px hover lift + focus ring; `accent` adds the top rule that wipes in on hover. Remember: warm and light surfaces need Deep Blue ink, never white or yellow text.
