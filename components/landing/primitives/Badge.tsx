import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "green",
}: {
  children: ReactNode;
  tone?: "green" | "navy" | "mint" | "blue";
}) {
  const styles = {
    green: "bg-green text-white",
    navy: "bg-navy text-white",
    mint: "bg-mint text-navy",
    blue: "bg-blue text-white",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide ${styles[tone]}`}
    >
      {children}
    </span>
  );
}
