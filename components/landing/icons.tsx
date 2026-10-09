"use client";

import {
  Check,
  Clock,
  FileText,
  HouseLine,
  Play,
  ShieldCheck,
  Star,
  Table,
  TrendUp,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";
import type { FeatureIcon } from "./content";

export function CheckIcon({
  size = 18,
  className,
  weight = "bold",
}: {
  size?: number;
  className?: string;
  weight?: "bold" | "duotone";
}) {
  return <Check size={size} weight={weight} className={className} />;
}

export function PlayIcon({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center text-white">
      <Play size={size} weight="fill" />
    </div>
  );
}

export function StarRow() {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={22} weight="fill" className="text-gold" />
      ))}
    </div>
  );
}

export function QuoteIcon() {
  return (
    <svg
      width="34"
      height="28"
      viewBox="0 0 34 28"
      fill="none"
      aria-hidden="true"
      className="text-quote"
    >
      <path
        d="M0 17.6V8c0-4.8 2.4-8 7.2-9.6V4c-2.4.8-3.6 3.2-3.6 6.4h3.6v7.2H0zm14.4 0V8c0-4.8 2.4-8 7.2-9.6V4c-2.4.8-3.6 3.2-3.6 6.4h3.6v7.2h-7.2z"
        fill="currentColor"
      />
    </svg>
  );
}

const featureIconMap: Record<FeatureIcon, ReactNode> = {
  chart: <TrendUp size={26} weight="bold" />,
  invoice: <FileText size={26} weight="bold" />,
  warehouse: <HouseLine size={26} weight="bold" />,
  clock: <Clock size={26} weight="bold" />,
  table: <Table size={26} weight="bold" />,
  shield: <ShieldCheck size={26} weight="bold" />,
};

export function FeatureGlyph({ icon }: { icon: FeatureIcon }) {
  return (
    <div className="text-mint">{featureIconMap[icon]}</div>
  );
}

export function LogoMark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const shell =
    tone === "light" ? "bg-white text-slate-950" : "bg-slate-950 text-white";

  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-md ${shell}`}
    >
      <Check size={16} weight="bold" />
    </div>
  );
}
