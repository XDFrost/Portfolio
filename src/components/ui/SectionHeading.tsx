import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

interface Props {
  title: string;
  /** Optional one-line description, stacked under the title. */
  description?: string;
  /** Optional link shown at the end of the title row, e.g. "All projects". */
  action?: { label: string; href: string };
  as?: "h1" | "h2";
}

export function SectionHeading({ title, description, action, as = "h2" }: Props) {
  const Heading = as;
  return (
    <div className="mb-10 flex flex-col gap-3 sm:mb-12">
      <div className="flex items-end justify-between gap-6">
        <Heading className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </Heading>
        {action ? (
          <Link
            href={action.href}
            className="group inline-flex shrink-0 items-center gap-1.5 pb-1 text-sm text-muted transition-colors duration-300 hover:text-text"
          >
            {action.label}
            <ArrowRight
              size={14}
              weight="light"
              className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5"
            />
          </Link>
        ) : null}
      </div>
      {description ? (
        <p className="max-w-[60ch] leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
