import * as React from 'react';
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /** Layer marker styling. */
  layer?: 'huma' | 'stablecoin';
  /** Renders a remove affordance (user-tag editing). */
  onRemove?: () => void;
}
export function Tag(props: TagProps): JSX.Element;
