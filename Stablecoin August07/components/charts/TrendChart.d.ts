import * as React from 'react';
export interface TrendChartProps {
  /** Series values in order (e.g. 90 daily reserve-ratio points). */
  data: number[];
  width?: number;
  height?: number;
  /** Line/area color (defaults to brand teal). */
  color?: string;
  /** Optional dashed reference line (e.g. the 100% floor). */
  floor?: number;
  pad?: number;
  style?: React.CSSProperties;
}
/** Compact SVG area+line trend chart for a rolling window. No libraries. */
export function TrendChart(props: TrendChartProps): JSX.Element;
