"use client";

import { useState } from "react";
import { Check, LinkSimple } from "@phosphor-icons/react";

/** Copies the current URL. The label confirms the action for a moment. */
export function CopyLink() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable (insecure context or denied). Nothing to show.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted transition duration-300 hover:bg-surface-2 hover:text-text active:scale-[0.97]"
    >
      {copied ? (
        <Check size={14} weight="bold" className="text-accent" />
      ) : (
        <LinkSimple size={14} weight="light" />
      )}
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
