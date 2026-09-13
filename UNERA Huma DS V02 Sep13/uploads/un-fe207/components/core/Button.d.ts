import * as React from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style. `accent` (Yellow text on Deep Blue) is for warm banners only. */
  variant?: 'primary' | 'secondary' | 'accent';
  /** `md` is the 46px default; `sm` is the 36px nav-inline size. */
  size?: 'md' | 'sm';
  /** Full-width block button. */
  block?: boolean;
  /** Render as an anchor with this href instead of a <button>. */
  href?: string;
  /** Leading icon node (inline SVG, fill="currentColor"). */
  icon?: React.ReactNode;
  /** Trailing icon node. */
  iconRight?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Primary action button for Huma product UI.
 * @startingPoint section="Core" subtitle="Deep Blue primary / outline secondary / accent" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
