import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Diameter preset (matches account-settings.html): sm 28 · md 32 · lg 48 · xl 80 px. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Initials shown when no image / blockie (the in-product user avatar is always initials). */
  initials?: string;
  /** Image source (overrides initials). */
  src?: string;
  alt?: string;
  /** Render a wallet "blockie" gradient tile (the wallet identity, distinct from the user avatar). */
  blockie?: boolean;
  /** Corner connector badge node (e.g. the 🦊 MetaMask glyph). */
  badge?: React.ReactNode;
}

/**
 * Circular user / wallet avatar.
 * @startingPoint section="Core" subtitle="Initials user avatar · wallet blockie" viewport="700x140"
 */
export function Avatar(props: AvatarProps): JSX.Element;
