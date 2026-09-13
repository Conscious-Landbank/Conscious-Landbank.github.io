import * as React from 'react';
export interface QuoteRow { label: string; value: string; }
export interface QuoteCardProps {
  rateLabel?: string;
  rateSource?: string;        // off-chain FX provider, e.g. exchangerate-api.com
  rows?: QuoteRow[];          // fee / markup / daily-limit lines
  secondsLeft?: number;       // parent-owned countdown, 60 → 0
  expired?: boolean;          // true at 0; disables confirm, shows Refresh
  onRefresh?: () => void;
  style?: React.CSSProperties;
}
export function QuoteCard(props: QuoteCardProps): JSX.Element;
