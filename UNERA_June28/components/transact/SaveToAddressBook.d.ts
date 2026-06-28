import * as React from 'react';

export interface SaveToAddressBookProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The recipient wallet address to save. Shown read-only in the modal. */
  address: string;
  /** Network the address belongs to (e.g. "Ethereum", "Base"). Default "Ethereum". */
  network?: string;
  /** Address family label shown in the modal. Default "EVM". */
  addressType?: string;
  /** localStorage key for the address book array. Default "unera_addressBook_v1". */
  storageKey?: string;
  /** Href for the "Manage wallets" link shown after saving. */
  manageHref?: string;
  /** CTA button text. Default "Save to address book". */
  buttonLabel?: string;
  /** Called with the saved entry after a successful save. */
  onSaved?: (entry: {
    label: string;
    description: string;
    address: string;
    addressType: string;
    network: string;
  }) => void;
}

/**
 * Save-to-address-book success CTA + labelling modal for EXTERNAL-TRANSFER flows.
 *
 * Render on the success/receipt screen of Send / withdraw / remittance when the user
 * sent to a freshly-entered recipient address. Do NOT use on Buy / Swap / Trade — those
 * act on the user's own holdings and have no recipient address to save.
 *
 * @startingPoint section="Transact" subtitle="Save recipient to address book (success CTA + modal)" viewport="700x320"
 */
export function SaveToAddressBook(props: SaveToAddressBookProps): JSX.Element;
