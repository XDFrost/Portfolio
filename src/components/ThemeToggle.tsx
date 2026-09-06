"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";
import { Moon, Sun } from "@phosphor-icons/react";
import clsx from "clsx";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const reduce = useReducedMotion();

  // false during SSR and hydration, true once mounted; avoids a theme icon mismatch.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";

  /**
   * Switch theme with a short colour crossfade. `html.theme-fade` (globals.css)
   * transitions background, text, border and shadow colours on every element
   * for the duration of the change, then is removed. Instant under reduced motion.
   */
  function toggle() {
    const next = isDark ? "light" : "dark";
    const root = document.documentElement;

    if (!reduce) {
      root.classList.add("theme-fade");
      window.setTimeout(() => root.classList.remove("theme-fade"), 600);
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className={clsx(
        "flex size-9 items-center justify-center rounded-full text-muted transition duration-300 hover:bg-surface-2 hover:text-text active:scale-[0.96]",
        className,
      )}
    >
      {mounted ? (
        // Two stacked glyphs on a wrapper that turns half a circle.
        <span
          className={clsx(
            "relative flex size-[18px] items-center justify-center transition-transform duration-500 ease-out-expo",
            isDark ? "rotate-180" : "rotate-0",
          )}
        >
          <Moon
            size={18}
            weight="light"
            className={clsx("absolute transition-opacity duration-300", isDark ? "opacity-0" : "opacity-100")}
          />
          <Sun
            size={18}
            weight="light"
            className={clsx(
              "absolute rotate-180 transition-opacity duration-300",
              isDark ? "opacity-100" : "opacity-0",
            )}
          />
        </span>
      ) : (
        <span className="size-[18px]" />
      )}
    </button>
  );
}
