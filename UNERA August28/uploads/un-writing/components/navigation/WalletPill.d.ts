import * as React from 'react';

export interface WalletPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Connected session = full three-part pill; otherwise avatar-only + CONNECT. */
  connected?: boolean;
  /** Truncated address shown when connected. */
  address?: string;
  /** Balance line under the address. */
  balance?: string;
  /** Active network label (opens the switcher). */
  network?: string;
  /** Avatar initials for the disconnected session. */
  initials?: string;
  onConnect?: () => void;
}

/**
 * Dual-session wallet pill - the consumer nav's right-hand identity control.
 * @startingPoint section="Navigation" subtitle="Dual-session wallet pill" viewport="700x120"
 */
export function WalletPill(props: WalletPillProps): JSX.Element;
