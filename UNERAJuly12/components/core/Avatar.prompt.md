**Avatar** — circular identity mark. The in-product **user/account avatar is always initials** (no photo upload) on a Deep Blue tile in the display face; the **wallet identity** is a separate blockie tile with a connector badge.

```jsx
<Avatar initials="JS" size="xl" />          {/* account hero — 80px */}
<Avatar initials="JS" size="lg" />          {/* dropdown header — 48px */}
<Avatar initials="JS" size="md" />          {/* nav — 32px */}
<Avatar blockie size="sm" badge="🦊" />     {/* wallet pill identity — 28px */}
```

Sizes mirror `account-settings.html`: `sm` 28 (wallet pill), `md` 32 (nav), `lg` 48 (dropdown), `xl` 80 (account hero). Small avatars are weight 600, large 700. `blockie` renders the wallet tile gradient; `badge` adds the corner connector mark — the 🦊 MetaMask glyph is the one sanctioned emoji in the system.
