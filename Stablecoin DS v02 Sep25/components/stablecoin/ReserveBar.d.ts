import * as React from 'react';

export interface ReserveItem {
  /** Fixed asset-class color key. */
  asset: 'bank' | 'stablecoin' | 'treasury' | 'cash';
  label: string;
  pct: number;
  /** Optional dollar value, e.g. "$1,796,550". */
  value?: string;
}

export interface ReserveBarProps {
  items: ReserveItem[];
  showLegend?: boolean;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * Proof-of-Reserve composition bar. Asset-class colors are fixed (--por-*).
 * @startingPoint section="Stablecoin" subtitle="Reserve composition + legend" viewport="700x180"
 */
export function ReserveBar(props: ReserveBarProps): JSX.Element;
