import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  /** Leading affix, e.g. "$". */
  prefix?: React.ReactNode;
  /** Trailing affix, e.g. "hCAD". */
  suffix?: React.ReactNode;
}

/** Labelled text field; visible label, Deep-Blue focus ring, 16px base. */
export function Input(props: InputProps): JSX.Element;
