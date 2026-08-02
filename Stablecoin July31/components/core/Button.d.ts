import * as React from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style. Use "accent" (Reserve Gold) ONLY on Deep-Blue surfaces. */
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Render as an anchor instead of a button. */
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  /** Inline-SVG icon node placed before the label. */
  icon?: React.ReactNode;
  /** Inline-SVG icon node placed after the label. */
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

/**
 * Deep Blue primary action control. Never a gradient CTA on product UI.
 * @startingPoint section="Core" subtitle="Primary / secondary / accent action button" viewport="700x140"
 */
export function Button(props: ButtonProps): JSX.Element;
