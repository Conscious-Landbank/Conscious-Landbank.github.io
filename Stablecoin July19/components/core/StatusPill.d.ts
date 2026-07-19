import * as React from 'react';

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'completed' | 'pending' | 'failed' | 'processing' | 'operational';
  /** Leading status dot (used for PoR "Operational"). */
  dot?: boolean;
  /** Override the default label text. */
  children?: React.ReactNode;
}

/** Transaction / service state pill. */
export function StatusPill(props: StatusPillProps): JSX.Element;
