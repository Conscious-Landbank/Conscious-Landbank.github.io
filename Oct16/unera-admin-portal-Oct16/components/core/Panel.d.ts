import * as React from 'react';
export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  /** Remove body padding (tables, lists). */
  flush?: boolean;
  children?: React.ReactNode;
}
export function Panel(props: PanelProps): JSX.Element;
