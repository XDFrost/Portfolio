import { Container } from "@/components/ui/Container";
import { PageTransition } from "@/components/motion/PageTransition";
import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TechMarquee } from "@/components/home/TechMarquee";
import { LatestPosts } from "@/components/home/LatestPosts";
import { NowContact } from "@/components/home/NowContact";
import { getAbout, getFeaturedProjects, getHome, getLatestPosts, getSite } from "@/lib/content";
import { Analytics } from "@vercel/analytics/next"

export default function HomePage() {
  const site = getSite();
  const home = getHome();
  const featured = getFeaturedProjects();
  const posts = getLatestPosts();
  const tech = getAbout().skills.flatMap((g) => g.items);

  return (
    <>
      <PageTransition>
        <div>
          <Container>
            <Hero role={site.role} hero={home.hero} />
            <FeaturedProjects
              title={site.labels.featured}
              projects={featured}
              actionLabel={`All ${site.pages.projects.title.toLowerCase()}`}
            />
          </Container>
          <TechMarquee items={tech} />
          <LatestPosts title={site.labels.latestPosts} posts={posts} actionLabel="All posts" />
          <Container>
            <NowContact now={home.now} contact={home.contact} />
          </Container>
        </div>
      </PageTransition>
      <Analytics />
    </>
  );
}
