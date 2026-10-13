"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { SIGN_UP_URL, SWITCH_NUMBERS_CTA } from "./content";
import { Button, Reveal } from "./primitives";

export function SwitchNumbersCta() {
  return (
    <Reveal delay={0.12}>
      <div
        className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-slate-950 px-6 py-10 text-white sm:px-10 lg:flex-row lg:items-center"
      >
        <div className="min-w-0 max-w-xl">
          <p className="m-0 text-xs font-medium uppercase tracking-wider text-slate-400">
            {SWITCH_NUMBERS_CTA.eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight sm:text-4xl">
            {SWITCH_NUMBERS_CTA.title}{" "}
            <span className="text-slate-500">
              {SWITCH_NUMBERS_CTA.titleAccent}
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {SWITCH_NUMBERS_CTA.description}
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Button
            href={SIGN_UP_URL}
            variant="primary"
            size="lg"
            className="w-full whitespace-nowrap sm:w-auto"
          >
            Start 3-month free trial <ArrowRight size={16} weight="bold" />
          </Button>
          <Button
            href="#demo"
            variant="dark"
            size="lg"
            className="w-full whitespace-nowrap sm:w-auto"
          >
            Book a free demo
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
