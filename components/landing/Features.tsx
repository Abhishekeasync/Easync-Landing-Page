"use client";

import {
  ArrowRight,
  ChartLineUp,
  Clock,
  FileText,
  Receipt,
  ShieldCheck,
  Warehouse,
} from "@phosphor-icons/react";
import { features, type FeatureIcon } from "./content";
import { Button, Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";

const featureIconsMap = {
  chart: ChartLineUp,
  invoice: Receipt,
  warehouse: Warehouse,
  clock: Clock,
  table: FileText,
  shield: ShieldCheck,
} satisfies Record<FeatureIcon, typeof ChartLineUp>;

export function Features() {
  const [hero, second, ...rest] = features;
  const closing = rest.at(-1);
  const middle = rest.slice(0, -1);
  if (!hero || !second || !closing) return null;
  const HeroIcon = featureIconsMap[hero.icon];
  const SecondIcon = featureIconsMap[second.icon];
  const ClosingIcon = featureIconsMap[closing.icon];

  return (
    <Section
      id="features"
      className="border-b border-slate-200 bg-white py-20 md:py-28"
    >
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <Reveal>
              <Eyebrow label="Product">GST, inventory, and the audit trail</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl">
                Built for business owners. Clear enough for your CA.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-slate-600">
                Everything required to file GST, track stock across godowns,
                issue e-invoices, and keep a record of every change.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
            <Reveal className="md:col-span-4">
              <article className="flex h-full min-h-[280px] flex-col justify-between rounded-2xl bg-slate-950 p-7 text-white sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
                    <HeroIcon size={22} weight="bold" />
                  </div>
                  <span className="font-mono text-xs text-slate-500">
                    {hero.number}
                  </span>
                </div>
                <div className="mt-10 max-w-lg">
                  <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
                    {hero.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {hero.body}
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.06} className="md:col-span-2">
              <article className="flex h-full min-h-[280px] flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-800 ring-1 ring-slate-200">
                    <SecondIcon size={20} weight="bold" />
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    {second.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium tracking-tight text-slate-950">
                    {second.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {second.body}
                  </p>
                </div>
              </article>
            </Reveal>

            {middle.map((feature, index) => {
              const Icon = featureIconsMap[feature.icon];
              return (
                <Reveal
                  key={feature.number}
                  delay={0.08 + index * 0.04}
                  className="md:col-span-2"
                >
                  <article className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-800">
                        <Icon size={20} weight="bold" />
                      </div>
                      <span className="font-mono text-xs text-slate-400">
                        {feature.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-medium tracking-tight text-slate-950">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {feature.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}

            <Reveal delay={0.2} className="md:col-span-6">
              <article className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-6 sm:flex-row sm:items-center">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
                    <ClosingIcon size={20} weight="bold" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium tracking-tight text-slate-950">
                      {closing.title}
                    </h3>
                    <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-600">
                      {closing.body}
                    </p>
                  </div>
                </div>
                <Button href="#demo" variant="primary" size="md" className="shrink-0">
                  Book a 20-min demo <ArrowRight size={14} weight="bold" />
                </Button>
              </article>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
