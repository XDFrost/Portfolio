import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import { SiteNav } from "@/components/nav/SiteNav";
import { Footer } from "@/components/Footer";
import { getSite } from "@/lib/content";
import "./globals.css";

const site = getSite();

export const metadata: Metadata = {
  title: {
    default: `${site.name}, ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  metadataBase: site.url ? new URL(site.url) : undefined,
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SiteNav />
          <main className="flex-1 overflow-x-hidden pt-24 print-tight">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
