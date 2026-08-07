import React from 'react';

/**
 * StatusTimeline — vertical state-machine tracker for an issuance or redemption.
 * Use the user-facing status vocabulary from the *hUSD Issuance & Redemption* spec
 * (pageId 62259435, §8), NOT internal state codes:
 *   Started · Waiting for confirmation · Received · Under review · Processing ·
 *   Queued · Completed · Failed or expired · Unable to process.
 * Map item.state → done | current | pending | queued | blocked. Never expose
 * compliance reason codes; "Unable to process" is the safe blocked label.
 * Honest progress, not just a "done" celebration.
 */
export function StatusTimeline({ steps = [], style }) {
  const stateColor = {
    done:    { ring: 'var(--fin-up)', bg: 'var(--fin-up)', ink: '#fff' },
    current: { ring: 'var(--brand-deep-blue)', bg: 'var(--brand-deep-blue)', ink: '#fff' },
    pending: { ring: 'var(--neutral-300)', bg: 'var(--brand-white)', ink: 'var(--text-secondary)' },
    blocked: { ring: 'var(--error)', bg: 'var(--error)', ink: '#fff' },
    queued:  { ring: 'var(--warning)', bg: 'var(--warning)', ink: '#fff' },
  };
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, fontFamily: 'var(--font-body)', ...style }}>
      {steps.map((s, i) => {
        const c = stateColor[s.state] || stateColor.pending;
        const last = i === steps.length - 1;
        return (
          <li key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: '0.85rem', position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: c.bg,
                border: `2px solid ${c.ring}`, color: c.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {s.state === 'done' && <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>}
                {s.state === 'current' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                {s.state === 'blocked' && <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>}
                {s.state === 'queued' && <svg viewBox="0 -960 960 960" width="14" height="14" fill="currentColor"><path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Z" /></svg>}
              </span>
              {!last && <span style={{ flex: 1, width: 2, minHeight: 22, background: s.state === 'done' ? 'var(--fin-up)' : 'var(--neutral-200)', marginTop: 2 }} />}
            </div>
            <div style={{ paddingBottom: last ? 0 : '1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: s.state === 'current' ? 700 : 600,
                  color: s.state === 'pending' ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{s.label}</span>
                {s.time && <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{s.time}</span>}
              </div>
              {s.detail && <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>{s.detail}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
