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

## Theming (v0.1.0+)

The lib ships a CSS-vars based theme system + an opt-in Tailwind
preset. Wire it in two steps:

### 1. Import the CSS

In your app's entry CSS (typically loaded once at boot):

```css
/* src/styles/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Lib theme — declares 22 CSS vars under `--nexo-microapp-*`. */
@import "@lordmacu/nexo-microapp-ui-react/styles.css";

/* Your app's overrides go AFTER the lib import so cascade favours
   them. */
:root {
  /* Override single tokens to taste — only the ones you want
     different from the default. */
  --nexo-microapp-accent: #25D366;       /* WhatsApp green */
  --nexo-microapp-accent-hover: #1DA851;
}
```

### 2. (Tailwind users) wire the preset

```ts
// tailwind.config.ts
import { type Config } from "tailwindcss";

export default {
  presets: [require("@lordmacu/nexo-microapp-ui-react/tailwind.preset")],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@lordmacu/nexo-microapp-ui-react/src/**/*.{ts,tsx}",
  ],
  // ... your own theme.extend additions go here ...
} satisfies Config;
```

The preset maps utility classes (`bg-accent`, `text-text-primary`,
`bg-panel-alt`, …) onto the CSS vars — so flipping
`<html data-theme="dark">` immediately re-themes every lib component
AND any consumer-side surface that uses these classes.

### 3. Dark mode toggle

```ts
// Your settings UI / boot logic:
document.documentElement.dataset.theme = "dark";   // enable
delete document.documentElement.dataset.theme;     // disable
```

Or auto-detect once at boot (operator-side opt-in; the lib does NOT
auto-detect):

```ts
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.dataset.theme = "dark";
}
```

### 4. Tokens reference

22 tokens, all prefixed `--nexo-microapp-*`:

| Group   | Tokens                                                                |
|---------|-----------------------------------------------------------------------|
| Surfaces| `surface`, `panel`, `panel-alt`, `panel-hover`                        |
| Borders | `border`, `border-strong`                                             |
| Accent  | `accent`, `accent-hover`, `accent-soft`                               |
| Text    | `text-primary`, `text-secondary`, `text-meta`                         |
| Bubbles | `bubble-in`, `bubble-out`                                             |
| Status  | `success`/`-soft`, `warning`/`-soft`, `danger`/`-soft`, `info`/`-soft`|

Default theme mirrors agent-creator-microapp's Tailwind palette
1:1 (slate + indigo). Dark theme uses inverted slate ranges with
desaturated indigo accent.

### Consumer without Tailwind

Lib's components use named Tailwind classes (e.g. `bg-accent`).
Without the preset, those classes don't resolve. Two options:

1. (Recommended) Adopt Tailwind 3.0+ and use the preset.
2. Override every class manually via Tailwind 3.0+ arbitrary value
   syntax: `bg-[var(--nexo-microapp-accent)]`. Requires editing
   each component's source — out of scope.

Tailwind 3.0+ JIT mode is required (default in v3.0+).

## Architecture

The lib ships **TypeScript source** (`./src/index.ts`) — no `dist/`
build step. Consumers' bundlers (vite, webpack, esbuild) consume the
source directly through their own toolchain. This keeps the dev loop
tight (HMR cross-package via vite alias) and avoids version drift
between source and shipped JS.

## License

MIT
