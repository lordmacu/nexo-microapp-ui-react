# Changelog

All notable changes to `@lordmacu/nexo-microapp-ui-react` are documented here.

## [0.0.1] — 2026-05-10

### Added
- **Standalone repo** extracted from `nexo-rs/agent-creator-microapp/frontend/`
  per Phase 83.13 MVP. Ships TypeScript source (no build step) consumed
  directly by downstream bundlers (vite, webpack, esbuild) via the
  `exports` map.
- 3 chat-flavoured components:
  - `<EmptyState>` — `MessageSquare`-haloed hero for empty conversation
    panels.
  - `<CmdKHint>` — Cmd+K palette discoverability toast,
    localStorage-gated.
  - `<ChatsSidebar>` — composition wrapper for the WhatsApp Web layout's
    secondary sidebar (banner-on-top + sidebar-below).
- 2 underlying UI primitives: `<Button>` (5 variants × 3 sizes) +
  `<EmptyStatePrimitive>` (icon + title + body + actions + children
  slots).
- I18n via props — `<CmdKHint>` accepts a required `translations`
  object so the lib stays locale-agnostic; consumers wire their own
  translation system (e.g. `useT` hook).
- `<ChatsSidebar>` accepts `banner` + `sidebar` `ReactNode` props
  instead of importing sibling components directly — composition
  refactor to decouple from any consumer's chat-list / banner
  implementation.

### Out of scope (deferred)
- Stateful chat surface (`<Chat>`, `<ChatHeader>`, `<ChatListItem>`,
  `<MessageBubble>`, `<Conversation>`, `<MessageComposer>`,
  `<EscalationBadge>`, `<PauseIndicator>`, etc.) — extraction tracked
  as `83.13.stateful-extraction-*` follow-ups in the upstream `nexo-rs`
  repo. Today they live in `agent-creator-microapp/frontend/src/modules/chats/`.
- Theme system / CSS vars / dark mode — the lib relies on consumer's
  Tailwind theme tokens (`accent`, `panel`, `text-primary`, etc.). A
  default theme + override system lands in a later release.
- Storybook + Playwright tests — covered by consumer's existing
  vitest harness through the vite alias.
- NPM publish automation — manual `npm publish --access public` from
  the repo root for now.
