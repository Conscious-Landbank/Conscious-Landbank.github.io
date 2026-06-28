import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * `up`/`down`/`neutral` encode financial direction (auto directional arrow);
   * `success`/`warning`/`error`/`info` are status; `solid` is Deep Blue fill.
   */
  variant?: 'up' | 'down' | 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'solid';
  /** Override the leading icon (defaults to a directional arrow for up/down). */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Pill badge for money direction and status.
 * @startingPoint section="Core" subtitle="Trend & status pills" viewport="700x130"
 */
export function Badge(props: BadgeProps): JSX.Element;
