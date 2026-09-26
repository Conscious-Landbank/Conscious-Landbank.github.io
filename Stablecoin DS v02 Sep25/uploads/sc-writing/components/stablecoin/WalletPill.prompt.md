**WalletPill** is the progressive Web3 identity control in the nav, from disconnected to connected. It models the UNERA onboarding where the CONNECT button becomes a pill.

```jsx
<WalletPill onConnect={openConnectModal} />                                   {/* disconnected: gold CTA */}
<WalletPill connected initials="JS" address="0x742d…3a8f" balance="1,250.00 hUSD" network="Ethereum" onNetwork={openNetworkSwitcher} />
```

Disconnected renders a Signal-Yellow "Connect wallet" CTA; connected renders a **single boxed white pill**: avatar · wallet (address + balance) · network badge, matching the UNERA account-settings nav cluster. Never skip the disconnected state.
