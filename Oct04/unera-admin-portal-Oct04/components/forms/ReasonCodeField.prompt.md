Reason code + notes block used in every privileged-action confirmation (retry, blacklist, rectification, publish, whitelist).
```jsx
<ReasonCodeField codes={['Duplicate issuance','Wrong rate applied','Wrong attribution wallet']} reason={r} notes={n} onReasonChange={setR} onNotesChange={setN} notesRequired />
```
