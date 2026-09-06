import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import clsx from "clsx";

const components: Components = {
  a: ({ href, children }) => {
    if (href && href.startsWith("/")) {
      return <Link href={href}>{children}</Link>;
    }
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  },
};

/** Renders a Markdown string from a JSON `body` field. Styles live in globals.css (.md). */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={clsx("md", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
