"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { SIGN_UP_URL, START_TRIAL_CTA_LABEL } from "./content";
import { Button, Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";
import { WhatsAppChatCard } from "./WhatsAppChatCard";

const demoOnDarkClass =
  "pressable relative inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-white/25 bg-transparent px-5 text-sm font-medium tracking-tight text-white no-underline select-none hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto";

export function CTASection() {
  return (
    <Section className="bg-white py-20 md:py-28">
      <Container>
        <Reveal>
          <div
            className="flex flex-col gap-8 rounded-2xl bg-slate-950 px-6 py-8 text-white sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
          >
            <div className="min-w-0 max-w-xl">
              <Eyebrow label="Trial" tone="dark">
                3 months free
              </Eyebrow>
              <h2 className="mt-4 text-balance text-3xl font-medium tracking-tight sm:text-4xl">
                Put this month’s books in Easync{" "}
                <span className="text-slate-500">before filing day.</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                A 20-minute walkthrough of the modules that match your
                business. No card required.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 lg:w-auto lg:min-w-74">
              <Button
                href={SIGN_UP_URL}
                variant="dark"
                size="lg"
                className="w-full whitespace-nowrap"
              >
                {START_TRIAL_CTA_LABEL}
                <ArrowRight size={16} weight="bold" aria-hidden />
              </Button>
              <a href="#demo" className={demoOnDarkClass}>
                Book a free demo
                <ArrowRight size={16} weight="bold" aria-hidden />
              </a>
              <WhatsAppChatCard />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
