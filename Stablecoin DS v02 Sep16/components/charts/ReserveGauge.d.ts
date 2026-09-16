import * as React from 'react';
export interface ReserveGaugeProps {
  /** Current reserve ratio as a percentage, e.g. 105.2. */
  value?: number;
  /** Regulatory floor (default 100). A tick marks it on the arc. */
  floor?: number;
  /** Gauge max (default 120). */
  max?: number;
  size?: number;
  label?: string;
  /** Render for a Deep-Blue surface (light track + white ink). */
  onDark?: boolean;
}
/**
 * Semicircular reserve-ratio gauge vs the 100% floor; color-coded by health.
 * @startingPoint section="Charts" subtitle="Reserve-ratio gauge vs 100% floor" viewport="700x200"
 */
export function ReserveGauge(props: ReserveGaugeProps): JSX.Element;
