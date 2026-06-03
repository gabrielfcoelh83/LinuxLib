import { useCallback, useEffect } from "react";

type ShortcutHandler = () => void;

interface ShortcutDefinition {
  handler: ShortcutHandler;
  /** Allow this shortcut to fire even when an input element is focused */
  allowInInput?: boolean;
}

type ShortcutMap = Record<string, ShortcutDefinition>;

/**
 * Registers global keyboard shortcuts.
 * Shortcuts are skipped when the user is typing in an input/textarea,
 * unless `allowInInput` is set to true for a specific key.
 */
export function useKeyboardShortcuts(shortcuts: ShortcutMap, enabled = true) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      const def = shortcuts[e.key];
      if (!def) return;

      if (isTyping && !def.allowInInput) return;

      e.preventDefault();
      def.handler();
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
