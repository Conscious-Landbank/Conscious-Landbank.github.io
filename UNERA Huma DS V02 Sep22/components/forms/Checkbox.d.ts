import * as React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Row label (the whole row is the tap target). */
  label: React.ReactNode;
  /** Optional secondary line under the label. */
  sublabel?: React.ReactNode;
  /** `checkbox` (default) or `radio` for single-select groups. */
  type?: 'checkbox' | 'radio';
}

/**
 * Tappable checkbox / radio row.
 * @startingPoint section="Forms" subtitle="48px tappable check & radio rows" viewport="700x180"
 */
export function Checkbox(props: CheckboxProps): JSX.Element;
