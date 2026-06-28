import * as React from 'react';

export interface SelectOption { value: string; label: React.ReactNode; }

export interface SelectProps {
  label?: React.ReactNode;
  /** Options as strings or {value,label} objects. */
  options: (string | SelectOption)[];
  /** Controlled value. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Name for the hidden input mirroring the value. */
  name?: string;
  className?: string;
}

/**
 * Custom keyboard-accessible select (the system bans native <select>).
 * @startingPoint section="Forms" subtitle="Custom dropdown — no native select" viewport="700x220"
 */
export function Select(props: SelectProps): JSX.Element;
