import * as React from 'react';

export interface WalletPillProps {
  /** false → "Connect wallet" CTA; true → connected identity pill. */
  connected?: boolean;
  address?: string;
  balance?: string;
  network?: string;
  /** Account initials shown in the avatar tile (connected state). */
  initials?: string;
  onConnect?: () => void;
  onClick?: () => void;
  /** Network-badge click (opens a network switcher). */
  onNetwork?: () => void;
  style?: React.CSSProperties;
}

/**
 * Progressive Web3 identity control for the Deep-Blue nav.
 * @startingPoint section="Stablecoin" subtitle="Connect → connected wallet pill" viewport="700x120"
 */
export function WalletPill(props: WalletPillProps): JSX.Element;
