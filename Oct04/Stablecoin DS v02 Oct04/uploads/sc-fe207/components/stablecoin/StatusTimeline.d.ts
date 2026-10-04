import * as React from 'react';
export interface TimelineStep {
  label: string;
  /** done = past; current = active; pending = future; blocked = failed; queued = waiting (e.g. liquidity). */
  state: 'done' | 'current' | 'pending' | 'blocked' | 'queued';
  time?: string;
  detail?: string;
}
export interface StatusTimelineProps { steps: TimelineStep[]; style?: React.CSSProperties; }
/**
 * Vertical state-machine tracker for an issuance/redemption — the stage list inside the
 * FE-207 Transaction Tracker. Stage labels are plain language (crypto: Deposit seen ·
 * Network confirmations · Compliance checks · hUSD minted to your confirmed wallet;
 * fiat: Payment received · Checks · hUSD minted).
 * @startingPoint section="Stablecoin" subtitle="Issuance / redemption status timeline" viewport="700x320"
 */
export function StatusTimeline(props: StatusTimelineProps): JSX.Element;
