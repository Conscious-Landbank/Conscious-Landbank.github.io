import * as React from 'react';
/** @startingPoint section="Admin core" subtitle="Primary / secondary / ghost / danger actions" viewport="700x180" */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary (Deep Blue) · secondary (outlined) · ghost · danger (filled) · danger-outline. Danger only for consequential actions. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-outline';
  size?: 'sm' | 'md' | 'lg';
  /** Shows a spinner and disables the button while a backend workflow is being triggered. */
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
