"use client";

import { Check } from "@phosphor-icons/react";
import { audienceStats } from "./content";
import { Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";

const useCases = [
  "Traders and distributors",
  "Manufacturers with more than one godown",
  "Service businesses",
  "Growing startups",
  "CA firms managing client books",
];

export function Audience() {
  return (
    <Section
      background="ink"
      className="border-b border-slate-800 py-20 text-white md:py-28"
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,380px)]">
          <div className="flex flex-col gap-8">
            <div className="flex max-w-xl flex-col gap-4">
              <Reveal>
                <Eyebrow label="India" tone="dark">
                  GST, TDS, and MCA in the product
                </Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  Shaped around how Indian businesses actually run.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base leading-relaxed text-slate-400">
                  A trader in one market, a manufacturer with three godowns, or
                  a CA firm with 25 clients. Same login, local compliance.
                </p>
              </Reveal>
            </div>

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 sm:grid-cols-4">
              {audienceStats.map((stat) => (
                <div key={stat.value} className="bg-slate-950 p-4">
                  <dt className="text-sm font-medium text-white">{stat.value}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-slate-400">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Reveal delay={0.1} direction="none">
            <div className="rounded-2xl border border-slate-800 p-6">
              <h3 className="text-sm font-medium text-white">Who it is for</h3>
              <ul className="mt-5 flex list-none flex-col gap-3 p-0">
                {useCases.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check
                      size={16}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
