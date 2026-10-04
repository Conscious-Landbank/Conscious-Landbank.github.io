import * as React from 'react';

export interface StepperProps {
  /** Ordered step labels, e.g. ["Amount", "Recipient", "Review", "Done"]. */
  steps: string[];
  /** Zero-based index of the current step. Earlier steps render a checkmark. */
  current: number;
  style?: React.CSSProperties;
}

/**
 * Progress rail for Purchase / Redeem / KYC flows. Progression is Deep Blue, never green.
 * @startingPoint section="Core" subtitle="Deep-Blue multi-step flow rail" viewport="700x110"
 */
export function Stepper(props: StepperProps): JSX.Element;
