import * as React from 'react';
export interface StatusChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Requirement vocabulary: Completed, Pending, Processing, Failed, Stuck, Blacklisted, Published, Archived, Pending approval, … */
  status: string;
  /** Override the auto-mapped tone. */
  tone?: 'ok' | 'pending' | 'info' | 'bad' | 'neutral' | 'attention';
  /** Animate the dot for live/in-flight states (Processing). */
  pulse?: boolean;
}
export function StatusChip(props: StatusChipProps): JSX.Element;
export function toneFor(label: string): 'ok' | 'pending' | 'info' | 'bad' | 'neutral' | 'attention';
