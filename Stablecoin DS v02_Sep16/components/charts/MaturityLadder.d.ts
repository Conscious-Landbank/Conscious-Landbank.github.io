import * as React from 'react';
export interface MaturityBucket { label: string; pct: number; color?: string; }
export interface MaturityLadderProps { buckets: MaturityBucket[]; style?: React.CSSProperties; }
/** Horizontal bar chart of reserve holdings by maturity bucket (liquidity profile). */
export function MaturityLadder(props: MaturityLadderProps): JSX.Element;
