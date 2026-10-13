"use client";

import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { PLAN_INCLUDES } from "./content";
import { Button, Reveal } from "./primitives";

export function PricingPlanIncludes() {
  return (
    <Reveal delay={0.12} direction="none">
      <article
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
      >
        <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-9 lg:grid-cols-[11.5rem_minmax(0,1fr)] lg:items-start lg:gap-12">
          <header className="lg:sticky lg:top-28">
            <p className="m-0 font-mono text-xs leading-snug text-slate-500">
              All tiers
            </p>
            <h3 className="m-0 mt-2 text-pretty text-lg font-medium tracking-tight text-slate-950 sm:text-xl">
              {PLAN_INCLUDES.title}
            </h3>
          </header>

          <ul
            className="m-0 grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-2"
            aria-label={PLAN_INCLUDES.title}
          >
            {PLAN_INCLUDES.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <CheckCircle
                  size={16}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-emerald-600"
                  aria-hidden
                />
                <span className="text-pretty text-sm leading-snug text-slate-700">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex flex-col gap-4 border-t border-slate-200 bg-slate-950 px-6 py-6 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8"
        >
          <p className="m-0 max-w-lg text-sm leading-relaxed text-slate-300">
            {PLAN_INCLUDES.helpText}
          </p>
          <Button
            href="#demo"
            variant="dark"
            size="md"
            className="w-full shrink-0 sm:w-auto"
          >
            {PLAN_INCLUDES.demoLinkLabel}
            <ArrowRight size={16} weight="bold" aria-hidden />
          </Button>
        </div>
      </article>
    </Reveal>
  );
}
