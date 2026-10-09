"use client";

import { Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";

export function Founder() {
  return (
    <Section className="border-b border-slate-200 bg-white py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-16">
          <Reveal>
            <figure className="m-0 max-w-[260px]">
              <img
                src="/Founder/Shubham.webp"
                alt="CA Shubham Teotia, founder of Teotia & Co."
                width={640}
                height={703}
                loading="lazy"
                decoding="async"
                className="aspect-[640/703] w-full rounded-2xl object-cover"
              />
              <figcaption className="mt-4 ml-2">
                <h3 className="text-base font-medium text-slate-950">
                  CA Shubham Teotia
                </h3>
                {/* <p className="mt-1 text-sm text-slate-500">
                  Founder, Teotia & Co.
                </p> */}
              </figcaption>
            </figure>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal>
              <Eyebrow label="Founder">A practising CA</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl">
                Built after seeing the same gaps in client books.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                Missed due dates, GSTR-2B mismatches, and owners who could not
                see their numbers without calling the firm. Easync Books is the
                workspace we wanted those clients to already have.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
