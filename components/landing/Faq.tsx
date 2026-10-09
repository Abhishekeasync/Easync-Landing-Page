"use client";

import { faqs } from "./content";
import { Accordion, Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";

export function Faq() {
  return (
    <Section
      id="faq"
      className="border-b border-slate-200 bg-white py-20 md:py-28"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="flex flex-col gap-4">
            <Reveal>
              <Eyebrow label="FAQ">Trial, migration, and the call</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl">
                Before you book the demo.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <Accordion items={faqs.map((item) => ({ ...item }))} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
