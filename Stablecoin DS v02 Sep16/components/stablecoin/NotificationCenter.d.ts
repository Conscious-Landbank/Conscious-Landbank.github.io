import * as React from 'react';
export type NotificationKind = 'success' | 'progress' | 'info' | 'alert';
export interface NotificationItem {
  id: string | number;
  kind: NotificationKind;
  title: string; body: string; time: string;
  read?: boolean;
}
export interface NotificationCenterProps {
  open?: boolean;
  items?: NotificationItem[];
  onToggle?: () => void;
  onClose?: () => void;
  onMarkAllRead?: () => void;
}
export function NotificationCenter(props: NotificationCenterProps): JSX.Element;
