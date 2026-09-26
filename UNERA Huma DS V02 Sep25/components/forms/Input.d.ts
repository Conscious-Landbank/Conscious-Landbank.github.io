import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Always-visible label (accessibility baseline). */
  label?: React.ReactNode;
  /** Helper text shown below when there is no error. */
  hint?: React.ReactNode;
  /** Error message; turns the border red and sets aria-invalid. */
  error?: React.ReactNode;
  required?: boolean;
  /** Fixed leading prefix inside the field (e.g. "$"). */
  prefix?: React.ReactNode;
}

/**
 * Labelled text input with Deep Blue focus ring.
 * @startingPoint section="Forms" subtitle="Text input · label · hint · error" viewport="700x200"
 */
export function Input(props: InputProps): JSX.Element;
