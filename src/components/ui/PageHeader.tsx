export function PageHeader({
  title,
  intro,
  meta,
}: {
  title: string;
  intro?: string;
  /** One mono line of real, computed facts (counts, ranges). Never decorative. */
  meta?: string;
}) {
  return (
    <header className="pb-12 sm:pb-16">
      <h1 className="text-balance text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-4 max-w-[60ch] text-pretty text-lg leading-relaxed text-muted">{intro}</p>
      ) : null}
      {meta ? <p className="mt-5 font-mono text-xs text-faint">{meta}</p> : null}
    </header>
  );
}
