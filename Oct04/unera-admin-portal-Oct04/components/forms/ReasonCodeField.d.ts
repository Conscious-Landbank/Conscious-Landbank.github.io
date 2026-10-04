export interface ReasonCodeFieldProps {
  codes: Array<string | { value: string; label: string }>;
  reason?: string;
  notes?: string;
  onReasonChange?: (value: string) => void;
  onNotesChange?: (value: string) => void;
  reasonError?: string;
  /** Reversals and blacklist actions require notes. */
  notesRequired?: boolean;
  notesError?: string;
}
export function ReasonCodeField(props: ReasonCodeFieldProps): JSX.Element;
