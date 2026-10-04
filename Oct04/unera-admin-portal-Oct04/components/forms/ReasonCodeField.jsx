import React from 'react';
import { Select } from './Select.jsx';
import { Input } from './Input.jsx';
/** The audit-capture block every privileged action shows: reason code (required) + notes. Keep it identical everywhere. */
export function ReasonCodeField({ codes = [], reason = '', notes = '', onReasonChange, onNotesChange, reasonError, notesRequired = false, notesError }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Select label="Reason code" required placeholder="Select a reason" options={codes} value={reason} onChange={e => onReasonChange && onReasonChange(e.target.value)} error={reasonError} hint={!reasonError ? 'Recorded in the audit log with your actor ID.' : undefined} />
      <Input label="Notes" multiline required={notesRequired} value={notes} onChange={e => onNotesChange && onNotesChange(e.target.value)} error={notesError} placeholder="Context for the reviewer: ticket, evidence, what you checked" />
    </div>
  );
}
