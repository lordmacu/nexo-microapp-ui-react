# @lordmacu/nexo-microapp-ui-react

WhatsApp Web-inspired React component library for [Nexo](https://github.com/lordmacu/nexo-rs)
agent microapps. **OPT-IN chat helper, NOT core framework** — microapps
without conversational UIs (batch dashboards, image-gen galleries, audit
viewers) ship without it.

Out-of-tree per **Phase 83.13** (MVP): extracted from
`agent-creator-microapp/frontend/src/modules/chats/` so any future
chat-flavoured microapp can `npm install` it instead of cloning + adapting.

- **GitHub:** <https://github.com/lordmacu/nexo-microapp-ui-react>
- **Main repo:** <https://github.com/lordmacu/nexo-rs>

## Status (v0.0.1 — Phase 83.13 MVP)

3 chat components + 2 UI primitives, no theme system, no Storybook, no
tests of its own (consumer's existing tests cover via vite alias).

| Surface                | Ships in v0.0.1?        |
|------------------------|-------------------------|
| Chat-flavoured `<EmptyState>` (MessageSquare halo) | ✅ |
| Cmd+K palette `<CmdKHint>` toast                   | ✅ |
| 3-column-shell `<ChatsSidebar>` (composition wrapper) | ✅ |
| Underlying `<Button>` + `<EmptyStatePrimitive>`    | ✅ |
| Stateful chat surface (`<Chat>`, `<MessageBubble>`, …) | ❌ deferred to v0.x.y |
| Theme system / CSS vars / dark mode                | ❌ Phase 83.13.theme |
| Storybook                                          | ❌ Phase 83.13.storybook |

## Install

```bash
npm install @lordmacu/nexo-microapp-ui-react
```

Peer dependencies: `react ^18.3` and `react-dom ^18.3`. Tailwind config
must include this package's `src/` in `content` so utility classes are
not purged.

## Usage

```tsx
import {
  EmptyState,
  CmdKHint,
  ChatsSidebar,
  Button,
} from "@lordmacu/nexo-microapp-ui-react";

function MyConversationsPanel({ activeConv, conversationList }) {
  return (
    <ChatsSidebar
      banner={<MyConnectionBanner />}
      sidebar={conversationList}
    />
  );
}

function MyEmptyChat() {
  return (
    <EmptyState
      title="No conversation selected"
      body="Pick a thread from the sidebar to begin."
    />
  );
}
```

## Tailwind config requirement

The library ships utility-class strings inline (`bg-accent`,
`text-text-primary`, `rounded-2xl`, etc.). Your consumer app's
`tailwind.config.js` must scan this package's source so those classes
land in the compiled CSS:

```js
// tailwind.config.js (consumer)
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@lordmacu/nexo-microapp-ui-react/src/**/*.{ts,tsx}",
  ],
  // ... your theme + plugins ...
};
```

Color tokens (`accent`, `accent-hover`, `accent-soft`, `panel`,
`panel-alt`, `text-primary`, `text-secondary`, `text-meta`, `surface`,
`danger`) must be defined in your consumer's Tailwind theme. The lib
does not ship a theme of its own in v0.0.1 — see Phase 83.13.theme
follow-up for a default theme + CSS-var override system.

## Architecture

The lib ships **TypeScript source** (`./src/index.ts`) — no `dist/`
build step. Consumers' bundlers (vite, webpack, esbuild) consume the
source directly through their own toolchain. This keeps the dev loop
tight (HMR cross-package via vite alias) and avoids version drift
between source and shipped JS.

## License

MIT
