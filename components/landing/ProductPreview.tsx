"use client";

import dynamic from "next/dynamic";
import { Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";

const DashboardVisual = dynamic(() => import("./DashboardVisual").then((mod) => mod.DashboardVisual), {
  loading: () => <div className="min-h-[500px] w-full animate-pulse rounded-xl border border-slate-200 bg-slate-50" />,
});

export function ProductPreview() {
  return (
    <Section className="border-b border-slate-200 bg-white py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-8">
          <div className="flex max-w-2xl flex-col gap-4">
            <Reveal>
              <Eyebrow label="Product">A workspace, not a slideshow</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl">
                Reconciliation, aging, e-invoicing, and stock{" "}
                <span className="text-slate-500">in one view.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-slate-600">
                Switch modules below. The sample books show how a month looks
                once GST, debtors, and godowns sit together.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <DashboardVisual />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
