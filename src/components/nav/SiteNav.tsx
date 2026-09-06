import { getSite } from "@/lib/content";
import { NavClient } from "./NavClient";

export function SiteNav() {
  const site = getSite();
  return <NavClient name={site.name} items={site.nav} />;
}
