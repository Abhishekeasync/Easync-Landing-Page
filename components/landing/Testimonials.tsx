"use client";

import { testimonials } from "./content";
import { Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";

const proof = [
  {
    value: "18 hrs",
    label: "Saved each month on invoices, GST, and payment follow-ups.",
  },
  {
    value: "3 days",
    label: "Faster month-end close, reported by firms on multiple entities.",
  },
];

export function Testimonials() {
  return (
    <Section background="surface" className="border-b border-slate-200 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex max-w-2xl flex-col gap-4">
            <Reveal>
              <Eyebrow label="Customers">Owners and CA firms</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl">
                What changes after the books are in one place.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.05}>
                <figure className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-slate-200 bg-white p-6">
                  <blockquote className="m-0 text-sm leading-relaxed text-slate-700">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="flex items-center gap-3 border-t border-slate-100 pt-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-xs font-medium text-white">
                      {item.initial}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-slate-950">
                        {item.name}
                      </span>
                      <span className="block text-xs text-slate-500">
                        {item.role}, {item.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {proof.map((item) => (
              <div
                key={item.value}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-5"
              >
                <p className="font-mono text-3xl font-medium tracking-tight text-slate-950">
                  {item.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
