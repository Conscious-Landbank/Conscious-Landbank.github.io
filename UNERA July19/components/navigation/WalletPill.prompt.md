**WalletPill** — the right-hand identity control in the consumer nav. Models UNERA's progressive Web3 onboarding: disconnected → connected.

```jsx
<WalletPill onConnect={openConnectModal} initials="JS" />          {/* logged-in, no wallet */}
<WalletPill connected address="0x742d…3a8f" balance="$10,240" network="Ethereum" />
```

Disconnected = avatar-only pill + CONNECT. Connected = three-part pill: wallet blockie with 🦊 connector badge, truncated address + balance, and a network switcher chip. Don't skip the disconnected state — it mirrors real wallet-connection anxiety.
