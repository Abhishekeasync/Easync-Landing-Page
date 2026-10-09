"use client";

import { painPoints } from "./content";
import { Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";

export function Benefits() {
  return (
    <Section background="surface" className="border-b border-slate-200 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex max-w-2xl flex-col gap-4">
            <Reveal>
              <Eyebrow label="The work">What owners ask every week</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl">
                The books should answer before you pick up the phone.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-slate-600">
                Easync Books shows who owes you, what is in the godown, and
                where the month stands, without waiting on your accountant.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {painPoints.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.06}>
                <article className="flex h-full flex-col gap-4 border-t border-slate-300 pt-5">
                  <span className="font-mono text-xs text-slate-400">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-medium leading-snug tracking-tight text-slate-950">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {point.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
