import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Trailing icon. Rendered inside its own small circle, flush with the right edge. */
  icon?: ReactNode;
  className?: string;
  download?: boolean;
}

export function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

const base =
  "group inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full font-medium transition duration-500 ease-out-expo active:scale-[0.98]";

const sizes: Record<Size, string> = {
  md: "py-2.5 text-sm",
  sm: "py-2 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-text text-bg shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_8px_24px_-12px_rgb(0_0_0/0.5)] hover:-translate-y-px hover:bg-text/90",
  secondary: "glass text-text hover:bg-surface-2",
  ghost: "text-muted hover:text-text",
};

const iconWrap: Record<Variant, string> = {
  primary: "bg-bg/20",
  secondary: "bg-surface-2 group-hover:bg-border",
  ghost: "bg-surface-2",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  download,
}: ButtonProps) {
  const padding = icon
    ? size === "md"
      ? "pl-5 pr-1.5"
      : "pl-4 pr-1.5"
    : size === "md"
      ? "px-5"
      : "px-4";

  const cls = clsx(base, sizes[size], padding, variants[variant], className);

  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden
          className={clsx(
            "flex size-6 items-center justify-center rounded-full transition duration-500 ease-out-expo group-hover:-translate-y-px group-hover:translate-x-0.5 [&>svg]:size-3.5",
            iconWrap[variant],
          )}
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  if (download || isExternalHref(href)) {
    const opensNewTab = /^https?:/i.test(href) && !download;
    return (
      <a
        href={href}
        className={cls}
        download={download || undefined}
        target={opensNewTab ? "_blank" : undefined}
        rel={opensNewTab ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
