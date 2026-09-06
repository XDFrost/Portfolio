/**
 * A single slow-moving strip of the technologies from about.json.
 * Motivation: shows breadth in one glance between the two heavier sections.
 * Pauses on hover; stands still (and wraps) under prefers-reduced-motion.
 */
export function TechMarquee({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  const loop = [...items, ...items];

  return (
    <section
      aria-label="Technologies"
      className="marquee overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <ul className="marquee-track flex w-max gap-12 px-6 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-8 motion-reduce:gap-y-3">
        {loop.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= items.length ? true : undefined}
            className={
              i >= items.length
                ? "whitespace-nowrap font-mono text-sm text-muted motion-reduce:hidden"
                : "whitespace-nowrap font-mono text-sm text-muted"
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
