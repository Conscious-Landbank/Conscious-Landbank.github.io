import * as React from 'react';
export type AccountState =
  | 'public' | 'kyc_not_started' | 'kyc_pending'
  | 'blocked' | 'maintenance' | 'data_unavailable';
export interface AccountStateBannerProps {
  state?: AccountState;
  onAction?: () => void;
  /** Override the preset copy if needed */
  title?: string; body?: string; cta?: string | null;
  style?: React.CSSProperties;
}
export function AccountStateBanner(props: AccountStateBannerProps): JSX.Element;
