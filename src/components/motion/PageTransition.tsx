import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * Barba-style page transition, native to Next.js: the leaving page fades and
 * lifts away, the arriving page settles in from below (see globals.css).
 * Used inside each page.tsx (never the layout, which persists across routes).
 * Elements that share a `<ViewTransition name>` across pages morph instead.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" update="none" default="none">
      {children}
    </ViewTransition>
  );
}
