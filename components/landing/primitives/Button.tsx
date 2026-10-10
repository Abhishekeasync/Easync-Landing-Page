import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "dark";

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "pressable relative inline-flex cursor-pointer items-center justify-center font-medium tracking-tight no-underline select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:pointer-events-none disabled:opacity-60";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "rounded-md border border-blue-700 bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "rounded-md border border-emerald-700 bg-emerald-600 text-white hover:bg-emerald-700",
    outline:
      "rounded-md border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
    ghost: "rounded-md bg-transparent text-slate-700 hover:bg-slate-100",
    dark: "rounded-md border border-white bg-white text-slate-950 hover:bg-slate-100",
  };

  const sizes = {
    sm: "h-9 gap-1.5 px-3.5 text-sm",
    md: "h-10 gap-2 px-4 text-sm",
    lg: "h-11 gap-2 px-5 text-sm",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
