import * as React from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Inline validation message; replaces the hint and marks the control invalid. */
  error?: React.ReactNode;
  required?: boolean;
  /** Render a textarea. */
  multiline?: boolean;
  /** Mono font for identifiers (wallet addresses, ledger refs). */
  mono?: boolean;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
}
export function Input(props: InputProps): JSX.Element;
