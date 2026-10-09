"use client";

import { CheckCircle } from "@phosphor-icons/react";
import { plans } from "./content";
import { Button, Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";

export function Pricing() {
  return (
    <Section
      id="pricing"
      background="surface"
      className="border-b border-slate-200 py-20 md:py-28"
    >
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex max-w-xl flex-col gap-4">
              <Reveal>
                <Eyebrow label="Pricing">3 months free, then a clear bill</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-balance text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl">
                  Plans for one GSTIN or a whole practice.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base leading-relaxed text-slate-600">
                  Use your real data for 3 months. No card to start. Prices
                  exclude GST.
                </p>
              </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 0.05}>
                <article
                  className={`flex h-full flex-col rounded-2xl p-6 ${
                    plan.popular
                      ? "bg-slate-950 text-white"
                      : "border border-slate-200 bg-white text-slate-950"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-medium">{plan.name}</h3>
                    {plan.popular ? (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-200">
                        Popular
                      </span>
                    ) : null}
                  </div>
                  <p
                    className={`mt-2 min-h-10 text-sm leading-snug ${
                      plan.popular ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {plan.audience}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-3xl font-medium tracking-tight">
                      {plan.yearlyPrice}
                    </span>
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      /month
                    </span>
                  </div>
                  <p
                    className={`mt-1 font-mono text-xs ${
                      plan.popular ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {plan.yearlyBilling}
                  </p>
                  <p
                    className={`mt-4 text-sm ${
                      plan.popular ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {plan.entities} · {plan.users}
                  </p>
                  <Button
                    href="#demo"
                    variant={plan.popular ? "dark" : "outline"}
                    size="md"
                    className="mt-5 w-full"
                  >
                    Start free trial
                  </Button>
                  <ul
                    className={`mt-5 flex list-none flex-col gap-2.5 border-t p-0 pt-5 text-sm ${
                      plan.popular ? "border-white/10" : "border-slate-200"
                    }`}
                  >
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle
                          size={16}
                          weight="fill"
                          className={`mt-0.5 shrink-0 ${
                            plan.popular ? "text-emerald-400" : "text-emerald-600"
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500">
            Export your data any time. Access is role-based, and every change
            is written to the audit trail.
          </p>
        </div>
      </Container>
    </Section>
  );
}
