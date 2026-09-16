import * as React from 'react';
export interface CompositionItem { asset?: 'bank' | 'stablecoin' | 'treasury' | 'cash'; color?: string; label?: string; pct: number; }
export interface CompositionDonutProps {
  items: CompositionItem[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: React.ReactNode;
}
/** Donut chart of reserve composition by asset type (fixed --por-* colors). */
export function CompositionDonut(props: CompositionDonutProps): JSX.Element;
