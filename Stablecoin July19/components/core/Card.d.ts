import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** White-canvas tint. "deep" renders a Deep-Blue card (white ink). */
  surface?: 'card' | 'impact' | 'action' | 'sky' | 'warm' | 'reserve' | 'verify' | 'cad-hub' | 'deep';
  /** Lift + Deep-Blue border on hover. */
  interactive?: boolean;
  href?: string;
  children?: React.ReactNode;
}

/** The surface primitive: 20px radius, tinted border, soft shadow. */
export function Card(props: CardProps): JSX.Element;
