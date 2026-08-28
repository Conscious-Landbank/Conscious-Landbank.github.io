import React from 'react';

const CSS = `
.unera-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: var(--brand-deep-blue);
  color: var(--brand-white);
  font-family: var(--font-display);
  flex-shrink: 0;
  overflow: visible;
}
.unera-avatar img { width: 100%; height: 100%; border-radius: var(--radius-full); object-fit: cover; }
.unera-avatar--blockie { background: color-mix(in srgb, var(--brand-light-blue) 40%, var(--brand-deep-blue)); }
.unera-avatar__badge {
  position: absolute; bottom: -1px; right: -1px;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-full);
  background: #F6851B; /* MetaMask fox tile */
  border: 2px solid var(--brand-white);
  line-height: 1;
}
`;

if (typeof document !== 'undefined' && !document.getElementById('unera-avatar-css')) {
  const el = document.createElement('style');
  el.id = 'unera-avatar-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* Sizes mirror account-settings.html exactly:
   sm 28 (wallet pill) · md 32 (nav) · lg 48 (dropdown) · xl 80 (account hero).
   Small avatars are weight 600; large avatars 700 - per source. */
const SIZES = {
  sm: { px: 28, fs: '0.75rem',  fw: 600 },
  md: { px: 32, fs: '0.813rem', fw: 600 },
  lg: { px: 48, fs: '1.125rem', fw: 700 },
  xl: { px: 80, fs: '1.75rem',  fw: 700 },
};

/**
 * Circular identity mark. The user / account avatar is ALWAYS initials on a
 * Deep Blue tile in the display face (no photo upload in-product) - sizes match
 * account-settings.html. Pass `blockie` for the separate wallet identity tile,
 * with an optional connector `badge` (the sanctioned 🦊 MetaMask glyph).
 */
export function Avatar({
  size = 'md',
  initials,
  src,
  alt = '',
  blockie = false,
  badge,
  className = '',
  style = {},
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const badgePx = Math.max(12, Math.round(s.px * 0.4));
  return (
    <span
      className={`unera-avatar ${blockie ? 'unera-avatar--blockie' : ''} ${className}`.trim()}
      style={{ width: s.px, height: s.px, fontSize: s.fs, fontWeight: s.fw, ...style }}
      {...rest}
    >
      {src ? <img src={src} alt={alt} /> : (!blockie && initials)}
      {badge && (
        <span className="unera-avatar__badge" style={{ width: badgePx, height: badgePx, fontSize: Math.round(badgePx * 0.58) }}>
          {badge}
        </span>
      )}
    </span>
  );
}
