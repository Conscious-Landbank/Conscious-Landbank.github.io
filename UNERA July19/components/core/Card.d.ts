import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Surface tint signalling card type. `card` is plain white. */
  surface?: 'card' | 'impact' | 'action' | 'warm' | 'sky' | 'cad' | 'inverse';
  /** Adds hover lift + focus ring (use for clickable cards). */
  interactive?: boolean;
  /** Adds the top accent rule that wipes in on hover. */
  accent?: boolean;
  /** Render as an anchor with this href. */
  href?: string;
  children?: React.ReactNode;
}

/**
 * Tinted surface card with UNERA geometry.
 * @startingPoint section="Core" subtitle="Tinted surface cards + hover lift" viewport="700x260"
 */
export function Card(props: CardProps): JSX.Element;
