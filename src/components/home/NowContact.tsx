import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import type { Home } from "@/lib/schema";

export function NowContact({
  now,
  contact,
}: {
  now?: Home["now"];
  contact: Home["contact"];
}) {
  return (
    <section className="py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        {now ? (
          <Reveal className="lg:col-span-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{now.heading}</h2>
            <p className="mt-4 max-w-[55ch] text-lg leading-relaxed text-muted">{now.body}</p>
          </Reveal>
        ) : null}

        <Reveal delay={0.1} className={now ? "lg:col-span-6" : "lg:col-span-12"}>
          <div className="rounded-[1.25rem] bg-surface-2 p-1.5 ring-1 ring-border">
            <div className="flex flex-col items-start gap-5 rounded-[calc(1.25rem-0.375rem)] bg-surface p-7 shadow-[inset_0_1px_0_rgb(255_255_255/0.6)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] sm:p-9">
              <h2 className="text-2xl font-semibold tracking-tight">{contact.heading}</h2>
              {contact.body ? (
                <p className="max-w-[45ch] leading-relaxed text-muted">{contact.body}</p>
              ) : null}
              <Button href={contact.cta.href} icon={<ArrowUpRight weight="bold" />}>
                {contact.cta.label}
              </Button>
              {contact.cta.href.startsWith("mailto:") ? (
                <p className="font-mono text-xs text-faint">{contact.cta.href.slice(7)}</p>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
