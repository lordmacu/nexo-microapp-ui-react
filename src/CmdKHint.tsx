// First-time discoverability hint for the Cmd+K palette.
//
// Renders a small toast in the bottom-right corner of the
// dashboard once per origin (localStorage flag
// `agent-creator:cmdk:hinted:v1`). Auto-dismisses after 8s; the
// X button hides it immediately. The flag is set on mount so a
// fast-closing tab still counts as "seen" — the goal is
// awareness, not enforcement.
//
// Phase 83.13 MVP — extracted from
// `agent-creator-microapp/frontend/src/modules/chats/CmdKHint.tsx`.
// I18n strings injected via `translations` prop so the lib is
// locale-agnostic; the consumer wires them through its own
// translation system (e.g. `useT` hook).

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import Button from "./primitives/Button";

const FLAG = "agent-creator:cmdk:hinted:v1";
const AUTO_DISMISS_MS = 8000;

export interface CmdKHintTranslations {
  /** Toast title. Example: "Tip: command palette". */
  tipTitle: string;
  /** Text rendered before the kbd shortcut. Example: "Press". */
  instructionPrefix: string;
  /** Text rendered after the kbd shortcut. Example: "anytime to
   *  search conversations, pause chats, or create agents without
   *  leaving the keyboard." */
  instructionSuffix: string;
  /** ARIA label of the close button. Example: "Close tip". */
  closeLabel: string;
}

export interface CmdKHintProps {
  /** Locale-resolved strings. Required so the lib stays
   *  i18n-agnostic — the consumer's translation system (e.g.
   *  `useT` hook) wires them in. */
  translations: CmdKHintTranslations;
}

export default function CmdKHint({ translations }: CmdKHintProps) {
  // `null` = not yet decided (suppresses flicker on first paint
  // while we read localStorage); `true` = visible; `false` =
  // already shown previously / dismissed this session.
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    let already_seen = false;
    try {
      already_seen = window.localStorage.getItem(FLAG) === "1";
    } catch {
      // localStorage may throw in some private modes — treat as
      // "not seen" but skip persistence.
      already_seen = false;
    }
    if (already_seen) {
      setVisible(false);
      return;
    }
    setVisible(true);
    try {
      window.localStorage.setItem(FLAG, "1");
    } catch {
      /* private mode — fine, just won't persist across tabs */
    }
    const t = window.setTimeout(() => setVisible(false), AUTO_DISMISS_MS);
    return () => window.clearTimeout(t);
  }, []);

  if (!visible) return null;

  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toLowerCase().includes("mac");
  const combo = isMac ? "Cmd + K" : "Ctrl + K";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-40 max-w-xs bg-white border rounded-lg shadow-lg p-3 flex items-start gap-2"
    >
      <div className="flex-1">
        <div className="text-xs font-medium text-text-primary">
          {translations.tipTitle}
        </div>
        <div className="text-xs text-text-secondary mt-1">
          {translations.instructionPrefix}{""}
          <kbd className="font-mono text-[11px] border rounded px-1.5 py-0.5 bg-panel-alt text-text-primary">
            {combo}
          </kbd>
          {""}
          {translations.instructionSuffix}
        </div>
      </div>
      <Button
        variant="secondary"
        size="md"
        onClick={() => setVisible(false)}
        aria-label={translations.closeLabel}
      >
        <X size={14} />
      </Button>
    </div>
  );
}
