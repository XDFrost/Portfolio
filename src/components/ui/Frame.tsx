import clsx from "clsx";
import type { ReactNode } from "react";

/**
 * Double-bezel frame: a thin surface tray with a concentric inner core.
 * Every image on the site sits in one of these so covers share one language.
 */
export function Frame({
  children,
  className,
  innerClassName,
  padding = "p-1.5",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  padding?: "p-1" | "p-1.5";
}) {
  const innerRadius = padding === "p-1" ? "rounded-[calc(1.25rem-0.25rem)]" : "rounded-[calc(1.25rem-0.375rem)]";
  return (
    <div className={clsx("rounded-[1.25rem] bg-surface-2 ring-1 ring-border shadow-soft", padding, className)}>
      <div className={clsx("overflow-hidden bg-surface", innerRadius, innerClassName)}>{children}</div>
    </div>
  );
}
