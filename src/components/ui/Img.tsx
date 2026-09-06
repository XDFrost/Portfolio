"use client";

import type { ImgHTMLAttributes, SyntheticEvent } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  alt: string;
  /** Above-the-fold image: eager, high priority, no fade-in. */
  priority?: boolean;
};

function markLoaded(el: HTMLImageElement | null) {
  if (el?.complete && el.naturalWidth > 0) el.dataset.loaded = "true";
}

/**
 * Plain <img>. The site is statically exported with image optimisation off,
 * so a plain element lets JSON point at any URL without config changes.
 * Lazy images fade in once decoded (globals.css, img[data-fade]).
 */
export function Img({ priority, alt, ...rest }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      data-fade={priority ? undefined : ""}
      ref={priority ? undefined : markLoaded}
      onLoad={priority ? undefined : (e: SyntheticEvent<HTMLImageElement>) => markLoaded(e.currentTarget)}
      {...rest}
    />
  );
}
