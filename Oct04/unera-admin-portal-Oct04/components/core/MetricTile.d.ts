import * as React from 'react';
export interface MetricTileProps {
  label: string;
  value: React.ReactNode;
  /** Comparison text, e.g. "+3 vs yesterday". */
  delta?: string;
  deltaDirection?: 'up' | 'down' | 'flat';
  /** Period / as-of / source line. */
  meta?: string;
  /** Tints the value in the bad tone for counts that need action (failed, stuck). */
  alert?: boolean;
  /** Makes the tile a drill-down button. */
  onClick?: () => void;
  right?: React.ReactNode;
  className?: string;
}
export function MetricTile(props: MetricTileProps): JSX.Element;
