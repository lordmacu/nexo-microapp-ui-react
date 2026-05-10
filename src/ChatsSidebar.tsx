// Workspace shell secondary-sidebar layout for chat-flavoured
// microapps. Renders a vertical stack of `banner` + `sidebar`,
// matching the WhatsApp Web 3-column layout's left rail.
//
// Phase 83.13 MVP — extracted from
// `agent-creator-microapp/frontend/src/modules/chats/ChatsSidebar.tsx`.
// The original imported sibling components directly (`./Sidebar`,
// `./ConnectionBanner`); this version accepts them as props
// (`banner`, `sidebar`) so the lib stays decoupled from any
// specific consumer's chat-list / banner implementation. The
// runtime DOM output is identical when consumers pass the same
// children — purely a composition refactor, no behavior or
// style change.

import type { ReactNode } from "react";

export interface ChatsSidebarProps {
  /** Top banner — typically a connection-state indicator. */
  banner: ReactNode;
  /** Main sidebar content — the conversation list. */
  sidebar: ReactNode;
}

export default function ChatsSidebar({ banner, sidebar }: ChatsSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      {banner}
      {sidebar}
    </div>
  );
}
