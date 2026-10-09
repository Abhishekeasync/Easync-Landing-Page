"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { WHATSAPP_HREF } from "./content";
import { Button, Container, Reveal, Section } from "./primitives";
import { WhatsAppMark } from "./WhatsAppButton";

export function CTASection() {
  return (
    <Section className="bg-white py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-slate-950 px-6 py-10 text-white sm:px-10 lg:flex-row lg:items-center">
            <div className="min-w-0 max-w-xl">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                3 months free
              </p>
              <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight sm:text-4xl">
                Put this month’s books in Easync before filing day.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                A 20-minute walkthrough of the modules that match your
                business. No card required.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto">
              <Button href="#demo" variant="dark" size="lg" className="w-full whitespace-nowrap sm:w-auto">
                Book a free demo <ArrowRight size={16} weight="bold" />
              </Button>
              {/* <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 text-center text-sm leading-none text-slate-300 no-underline hover:text-white"
              >
                <WhatsAppMark />
                Or chat on WhatsApp
              </a> */}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
