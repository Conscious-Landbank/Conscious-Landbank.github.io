import * as React from 'react';

export type NotificationLevel = 'completed' | 'progressing' | 'info' | 'warning' | 'error';

export interface NotificationItem {
  id: string | number;
  /** Drives the icon glyph, well color and unread left-bar color (PRD §3 / AC-06). */
  level: NotificationLevel;
  title: string;
  message: string;
  /** Relative time label, e.g. "22 min ago". */
  time: string;
  /** Optional reference (tx/order id) shown by transactional items. */
  ref?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  read?: boolean;
}

export interface NotificationBellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unread count for the badge (caps at "99+"; badge hidden at 0). */
  unreadCount?: number;
  /** Feed rendered in the panel; defaults to a representative platform sample. */
  items?: NotificationItem[];
  /** Whether the panel is shown. */
  open?: boolean;
  /** Tint the bell for the deep-blue nav (white icon, yellow hover). Default true. */
  onDark?: boolean;
  onBellClick?: () => void;
  onMarkAllRead?: () => void;
  onClearAll?: () => void;
  onDismiss?: (id: string | number) => void;
  viewAllHref?: string;
}

/**
 * Notification bell + panel for the consumer nav. Design-system mirror of the
 * runtime controller `unera-pages/notifications-bell.js` (the single source of
 * truth the vanilla product pages load): LEVEL model, 400px panel, 99+ badge
 * cap, level-colored unread left bar, "You're all caught up" empty state.
 * @startingPoint section="Navigation" subtitle="Notification bell + level-model panel" viewport="460x600"
 */
export function NotificationBell(props: NotificationBellProps): JSX.Element;
