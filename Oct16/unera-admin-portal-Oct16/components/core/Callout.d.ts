import * as React from 'react';
export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'info' | 'warning' | 'danger' | 'neutral';
  title?: React.ReactNode;
  children?: React.ReactNode;
}
export function Callout(props: CalloutProps): JSX.Element;
