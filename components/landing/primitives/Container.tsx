import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full min-w-0 max-w-[1200px] px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
