"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { PRICING_SECTION, SIGN_UP_URL } from "./content";
import { Button } from "./primitives";

export function PricingTrialBanner() {
  const { trialBanner } = PRICING_SECTION;

  return (
    <div
      className="flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 sm:flex-row sm:items-center sm:gap-5 sm:px-5 sm:py-3.5"
      role="note"
    >
      <div
        className="flex w-fit shrink-0 flex-col items-center justify-center rounded-lg bg-emerald-600 px-3 py-2 text-center text-white"
        aria-hidden
      >
        <span className="font-display text-2xl font-medium leading-none tracking-tight">
          {trialBanner.months}
        </span>
        <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-emerald-100">
          {trialBanner.monthsLabel}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="m-0 text-sm font-medium leading-snug text-white sm:text-base">
          {trialBanner.title}
        </p>
        <p className="m-0 mt-0.5 text-xs leading-snug text-slate-400 sm:text-sm">
          {trialBanner.detail}
        </p>
      </div>

      <Button
        href={SIGN_UP_URL}
        variant="dark"
        size="sm"
        className="w-full shrink-0 sm:w-auto"
      >
        Start trial
        <ArrowRight size={14} weight="bold" />
      </Button>
    </div>
  );
}
