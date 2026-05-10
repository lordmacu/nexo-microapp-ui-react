// Empty state hero — large icon halo, headline, body, and
// optional action CTAs. Replaces the bespoke empty surfaces
// in chats/EmptyState.tsx + marketing/InboxEmpty.tsx.

import type { ReactNode } from "react";

export interface EmptyStateProps {
  /** Large icon (~32px lucide) rendered inside the halo. */
  icon: ReactNode;
  /** H1 — short, declarative ("Bandeja de marketing"). */
  title: string;
  /** Supporting copy (1-3 sentences). */
  body?: string;
  /** Optional action row rendered below the body. Pass any
   *  combination of CTAs / links — the component renders
   *  them as-is so callers control affinity (button,
   *  outline, etc.). */
  actions?: ReactNode;
  /** Optional content slot rendered below the actions —
   *  used for stat tiles, hint cards, etc. */
  children?: ReactNode;
}

export default function EmptyState({
  icon,
  title,
  body,
  actions,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-surface via-panel to-surface px-8 py-12 text-center">
      <div className="relative">
        <div className="absolute inset-0 -z-10 rounded-full bg-accent-soft blur-2xl" />
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-hover text-white shadow-lg shadow-accent-soft">
          {icon}
        </div>
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-text-primary">
        {title}
      </h1>
      {body && (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
          {body}
        </p>
      )}
      {actions && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {actions}
        </div>
      )}
      {children && <div className="mt-8 w-full">{children}</div>}
    </div>
  );
}
