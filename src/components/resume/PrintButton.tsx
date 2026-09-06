"use client";

import { Printer } from "@phosphor-icons/react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="glass no-print group inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full py-2 pl-4 pr-1.5 text-sm font-medium text-text transition duration-500 ease-out-expo hover:bg-surface-2 active:scale-[0.98]"
    >
      <span>Print</span>
      <span
        aria-hidden
        className="flex size-6 items-center justify-center rounded-full bg-surface-2 transition duration-500 ease-out-expo group-hover:bg-border"
      >
        <Printer size={14} weight="regular" />
      </span>
    </button>
  );
}
