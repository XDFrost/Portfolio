import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon?: ReactNode;
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-border bg-surface/60 p-8 sm:p-10">
      {icon ? <div className="text-faint [&>svg]:size-7">{icon}</div> : null}
      <p className="text-lg font-medium tracking-tight">{title}</p>
      {body ? <p className="max-w-[50ch] text-sm leading-relaxed text-muted">{body}</p> : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}
