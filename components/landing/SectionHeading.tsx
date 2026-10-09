import type { ReactNode } from "react";

export function Eyebrow({
  label,
  children,
  tone = "light",
}: {
  label?: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const shell =
    tone === "dark"
      ? "border-white/15 bg-white/5 text-slate-300"
      : "border-slate-200 bg-white text-slate-600";
  const chip =
    tone === "dark"
      ? "bg-white text-slate-950"
      : "bg-slate-950 text-white";

  return (
    <span
      className={`inline-flex w-fit max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border py-1 pl-1 pr-3 text-xs font-medium ${shell}`}
    >
      {label ? (
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${chip}`}
        >
          {label}
        </span>
      ) : null}
      <span>{children}</span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  className = "max-w-2xl",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  className?: string;
  eyebrowClassName?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : ""} ${className}`}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="m-0 text-balance text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
