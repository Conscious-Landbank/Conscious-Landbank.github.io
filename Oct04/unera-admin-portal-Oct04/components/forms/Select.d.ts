import * as React from 'react';
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  options?: Array<string | { value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  /** sm = inline filter control. */
  size?: 'sm' | 'md';
}
export function Select(props: SelectProps): JSX.Element;
