"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import clsx from "clsx";

/**
 * Card cover frame (same double bezel as Frame) with a soft accent highlight
 * that follows the pointer. Coordinates go straight to CSS variables, so
 * there is no React re-render per pointer move.
 */
export function SpotlightFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={clsx(
        "flex flex-col rounded-[1.25rem] bg-surface-2 p-1 ring-1 ring-border transition-shadow duration-700 ease-out-expo group-hover:shadow-soft",
        className,
      )}
    >
      <div
        className={clsx(
          "relative min-h-0 flex-1 overflow-hidden rounded-[calc(1.25rem-0.25rem)] bg-surface",
          "after:pointer-events-none after:absolute after:inset-0 after:z-10 after:opacity-0 after:transition-opacity after:duration-700 after:ease-out-expo group-hover:after:opacity-100",
          "after:bg-[radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,50%),var(--accent-soft),transparent_70%)]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
