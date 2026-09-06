import clsx from "clsx";
import type { ReactNode } from "react";

export function Tag({
  children,
  active = false,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium transition duration-300",
        active
          ? "border-text bg-text text-bg"
          : "border-border bg-surface text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
