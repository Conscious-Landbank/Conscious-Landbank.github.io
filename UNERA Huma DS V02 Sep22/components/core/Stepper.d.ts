import * as React from 'react';

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ordered step labels. */
  steps: string[];
  /** Zero-based index of the active step; earlier steps render as done. */
  current?: number;
}

/**
 * Horizontal progress stepper for multi-step transactional flows.
 * @startingPoint section="Core" subtitle="Multi-step flow progress" viewport="700x140"
 */
export function Stepper(props: StepperProps): JSX.Element;
