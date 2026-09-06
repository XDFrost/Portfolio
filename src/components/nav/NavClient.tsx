"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import clsx from "clsx";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EASE } from "@/components/motion/Reveal";
import { normalizePath } from "@/lib/format";
import type { Cta } from "@/lib/schema";

function isActive(pathname: string, href: string): boolean {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export function NavClient({ name, items }: { name: string; items: Cta[] }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const initials = initialsOf(name);

  // The menu remembers the path it was opened on, so navigating closes it
  // without an effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = (next: boolean) => setOpenedAt(next ? pathname : null);

  // Pill tightens slightly once the page has scrolled (motion value, no scroll listener).
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Lock page scroll while the overlay is open; close on Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenedAt(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* No view-transition-name here: Chromium renders named elements in an
          isolated layer, which leaves backdrop-filter with nothing to blur.
          The nav lives in the root snapshot and stays put on its own. */}
      <header className="no-print pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
        <div
          className={clsx(
            "glass pointer-events-auto flex h-12 origin-top items-center gap-1 rounded-full pl-2 pr-1.5 transition-transform duration-500 ease-out-expo",
            scrolled && "scale-[0.96]",
          )}
        >
          <Link
            href="/"
            className="group mr-2 flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-sm font-semibold tracking-tight transition-colors duration-300 hover:text-accent"
          >
            <span
              aria-hidden
              className="flex size-6 items-center justify-center rounded-md bg-text text-[10px] font-semibold tracking-tight text-bg transition-transform duration-500 ease-out-expo group-hover:-rotate-6"
            >
              {initials}
            </span>
            {name}
          </Link>

          <ul className="hidden items-center md:flex">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "relative isolate block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300",
                      active ? "text-text" : "text-muted hover:text-text",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    ) : null}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ThemeToggle className="ml-1" />

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="relative flex size-9 items-center justify-center rounded-full transition duration-300 hover:bg-surface-2 md:hidden"
          >
            <span
              className={clsx(
                "absolute h-px w-4 bg-text transition duration-500 ease-out-expo",
                open ? "rotate-45" : "-translate-y-[3px]",
              )}
            />
            <span
              className={clsx(
                "absolute h-px w-4 bg-text transition duration-500 ease-out-expo",
                open ? "-rotate-45" : "translate-y-[3px]",
              )}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
            className="glass-strong fixed inset-0 z-30 md:hidden"
          >
            <nav aria-label="Mobile" className="flex h-full flex-col justify-center px-8">
              <ul className="flex flex-col gap-1">
                {items.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.08 + i * 0.06, ease: EASE }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={clsx(
                          "block py-2 text-4xl font-semibold tracking-tight transition-colors duration-300",
                          active ? "text-text" : "text-muted hover:text-text",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
