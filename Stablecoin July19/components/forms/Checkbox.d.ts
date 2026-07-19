import * as React from 'react';

export interface CheckboxProps {
  label: string;
  /** Secondary line under the label (e.g. "1–2 business days · free"). */
  sublabel?: string;
  type?: 'checkbox' | 'radio';
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  style?: React.CSSProperties;
}

/** Checkbox/radio where the entire 48px row is tappable. */
export function Checkbox(props: CheckboxProps): JSX.Element;
