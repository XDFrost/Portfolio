/** Formatting helpers for dates and reading time. All pure, safe on the server. */

const WORDS_PER_MINUTE = 200;

export function readingTime(markdown: string): string {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

/** "2026-05-14" -> "14 May 2026". Parsed as a calendar date, no timezone shift. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/** "2024-03" -> "Mar 2024", "2018" -> "2018", "Present" -> "Present". */
export function formatYearMonth(value: string): string {
  if (value === "Present") return value;
  const [y, m] = value.split("-").map(Number);
  if (!m) return String(y);
  const date = new Date(y, m - 1, 1);
  return new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(date);
}

export function yearOf(iso: string): string {
  return iso.slice(0, 4);
}

/** Group items by a key, preserving first-seen order. */
export function groupBy<T, K extends string>(items: T[], key: (item: T) => K): [K, T[]][] {
  const map = new Map<K, T[]>();
  for (const item of items) {
    const k = key(item);
    const bucket = map.get(k);
    if (bucket) bucket.push(item);
    else map.set(k, [item]);
  }
  return [...map.entries()];
}

/** Normalise a path for active-link comparison ("/about/" and "/about" match). */
export function normalizePath(p: string): string {
  if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
  return p;
}
