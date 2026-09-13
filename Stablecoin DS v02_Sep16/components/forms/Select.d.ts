import * as React from 'react';

export interface SelectOption { value: string; label: string; }

export interface SelectProps {
  label?: string;
  options: (string | SelectOption)[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

/** Custom keyboard-accessible dropdown. UNERA never uses a native <select>. */
export function Select(props: SelectProps): JSX.Element;
