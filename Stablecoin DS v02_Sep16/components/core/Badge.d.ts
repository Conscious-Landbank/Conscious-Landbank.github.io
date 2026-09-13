import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** up/down/neutral = money direction; verify = on-chain proof; reserve = "fully backed". */
  variant?: 'up' | 'down' | 'neutral' | 'verify' | 'reserve';
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

/** Pill for financial direction, proof, and reserve status. Never a brand color for money. */
export function Badge(props: BadgeProps): JSX.Element;
