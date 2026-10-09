import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  background = "white",
  id,
}: {
  children: ReactNode;
  className?: string;
  background?: "white" | "surface" | "navy" | "ink";
  id?: string;
}) {
  const bg = {
    white: "bg-white",
    surface: "bg-surface",
    navy: "bg-navy",
    ink: "bg-slate-950",
  }[background];

  return (
    <section id={id} className={`${bg} ${className}`}>
      {children}
    </section>
  );
}
