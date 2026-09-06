import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { PageTransition } from "@/components/motion/PageTransition";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageTransition>
    <Container className="flex min-h-[60dvh] flex-col items-start justify-center gap-6 py-20">
      <p className="font-mono text-sm text-faint">404</p>
      <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl">
        That page does not exist.
      </h1>
      <p className="max-w-[45ch] leading-relaxed text-muted">
        The link may be out of date, or the slug may have changed in the content files.
      </p>
      <Button href="/" variant="secondary" icon={<ArrowLeft weight="bold" />}>
        Back home
      </Button>
    </Container>
    </PageTransition>
  );
}
