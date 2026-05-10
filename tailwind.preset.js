/*
 * @lordmacu/nexo-microapp-ui-react — Tailwind preset (Phase 83.13.theme).
 *
 * Opt-in preset that maps the lib's CSS vars to Tailwind utility-class
 * tokens. Consumer adds:
 *
 *   // tailwind.config.ts
 *   import { type Config } from "tailwindcss";
 *
 *   export default {
 *     presets: [require("@lordmacu/nexo-microapp-ui-react/tailwind.preset")],
 *     content: [
 *       "./index.html",
 *       "./src/**\/*.{ts,tsx}",
 *       "./node_modules/@lordmacu/nexo-microapp-ui-react/src/**\/*.{ts,tsx}",
 *     ],
 *   } satisfies Config;
 *
 * After the preset is applied, classes like `bg-accent`, `text-text-primary`,
 * `bg-panel-alt`, `border-border-strong` resolve to `var(--nexo-microapp-*)`
 * — so flipping `<html data-theme="dark">` immediately re-themes every
 * lib component AND every consumer-side surface that uses these classes.
 *
 * Consumers that DON'T use Tailwind can either:
 *   1. Import `@lordmacu/nexo-microapp-ui-react/styles.css` AND wire the
 *      preset (recommended path).
 *   2. Use Tailwind 3.0+ arbitrary value syntax everywhere they reference
 *      lib tokens: `bg-[var(--nexo-microapp-accent)]`.
 *
 * Requires Tailwind 3.0+. JIT mode is enabled by default in v3.0+.
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        // Surfaces.
        surface: "var(--nexo-microapp-surface)",
        panel: "var(--nexo-microapp-panel)",
        "panel-alt": "var(--nexo-microapp-panel-alt)",
        "panel-hover": "var(--nexo-microapp-panel-hover)",

        // Borders.
        border: "var(--nexo-microapp-border)",
        "border-strong": "var(--nexo-microapp-border-strong)",

        // Brand accent.
        accent: "var(--nexo-microapp-accent)",
        "accent-hover": "var(--nexo-microapp-accent-hover)",
        "accent-soft": "var(--nexo-microapp-accent-soft)",

        // Text.
        "text-primary": "var(--nexo-microapp-text-primary)",
        "text-secondary": "var(--nexo-microapp-text-secondary)",
        "text-meta": "var(--nexo-microapp-text-meta)",

        // Bubbles (chat-flavoured).
        "bubble-in": "var(--nexo-microapp-bubble-in)",
        "bubble-out": "var(--nexo-microapp-bubble-out)",

        // Status semantics.
        success: "var(--nexo-microapp-success)",
        "success-soft": "var(--nexo-microapp-success-soft)",
        warning: "var(--nexo-microapp-warning)",
        "warning-soft": "var(--nexo-microapp-warning-soft)",
        danger: "var(--nexo-microapp-danger)",
        "danger-soft": "var(--nexo-microapp-danger-soft)",
        info: "var(--nexo-microapp-info)",
        "info-soft": "var(--nexo-microapp-info-soft)",
      },
    },
  },
};
