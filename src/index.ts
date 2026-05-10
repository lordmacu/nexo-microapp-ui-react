// Public exports for `@lordmacu/nexo-microapp-ui-react`.
//
// Phase 83.13 MVP scope: 3 chat-flavoured components + 2
// underlying UI primitives. Stateful chat components
// (Chat, ChatHeader, ChatListItem, Conversation, etc.) stay
// in agent-creator-microapp until a second consumer materialises
// — extraction tracked as `83.13.stateful-extraction-*` follow-ups
// in proyecto/FOLLOWUPS.md.

export { default as EmptyState } from "./EmptyState";
export { default as CmdKHint } from "./CmdKHint";
export type { CmdKHintProps, CmdKHintTranslations } from "./CmdKHint";
export { default as ChatsSidebar } from "./ChatsSidebar";
export type { ChatsSidebarProps } from "./ChatsSidebar";

// UI primitives — re-exported so consumers that previously imported
// `Button` / `EmptyState` from agent-creator's `components/ui` barrel
// keep working when that barrel re-exports from this package.
export { default as Button } from "./primitives/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./primitives/Button";
export { default as EmptyStatePrimitive } from "./primitives/EmptyState";
export type { EmptyStateProps } from "./primitives/EmptyState";
