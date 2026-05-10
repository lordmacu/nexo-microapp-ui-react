// Chat-flavoured empty state. Wraps the shared `<EmptyState>`
// primitive with a `MessageSquare` icon halo so any chat-flavoured
// microapp gets the same hero shell.
//
// Phase 83.13 MVP — moved verbatim from
// `agent-creator-microapp/frontend/src/modules/chats/EmptyState.tsx`.

import type { ReactNode } from "react";
import { MessageSquare } from "lucide-react";

import SharedEmptyState from "./primitives/EmptyState";

export default function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <SharedEmptyState
      icon={<MessageSquare size={32} />}
      title={title}
      body={body}
      actions={action}
    />
  );
}
