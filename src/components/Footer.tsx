import Link from "next/link";
import {
  ArrowUp,
  Butterfly,
  DribbbleLogo,
  EnvelopeSimple,
  GithubLogo,
  Globe,
  LinkedinLogo,
  MastodonLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Container } from "@/components/ui/Container";
import { getSite } from "@/lib/content";
import type { SocialIcon } from "@/lib/schema";

const icons: Record<SocialIcon, Icon> = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  x: XLogo,
  bluesky: Butterfly,
  mastodon: MastodonLogo,
  youtube: YoutubeLogo,
  dribbble: DribbbleLogo,
  email: EnvelopeSimple,
  website: Globe,
};

export function Footer() {
  const site = getSite();
  const year = new Date().getFullYear();

  return (
    <footer className="no-print border-t border-border bg-surface/50">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="max-w-[22ch] text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <ul className="flex flex-col gap-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors duration-300 hover:text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {site.socials.length ? (
            <ul className="flex flex-col gap-2.5 md:col-span-3">
              {site.socials.map((s) => {
                const IconComponent = icons[s.icon];
                const external = /^https?:/i.test(s.href);
                return (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-text"
                    >
                      <IconComponent size={16} weight="light" className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-px" />
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="text-text">{site.name}</span> {year}.{" "}
            {site.footerNote ? site.footerNote : null}
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-text"
          >
            Back to top
            <ArrowUp
              size={14}
              weight="light"
              className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </Container>
    </footer>
  );
}
