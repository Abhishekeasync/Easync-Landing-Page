"use client";

import {
  ArrowRight,
  ChatCircle,
  Check,
  Hexagon,
  LinkedinLogo,
  ListBullets,
} from "@phosphor-icons/react";
import {
  FOUNDER_LINKEDIN_URL,
  FOUNDER_SECTION,
  type FounderTextPart,
} from "./content";
import { Button, Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";

const pillarIcons = {
  hexagon: Hexagon,
  list: ListBullets,
  chat: ChatCircle,
} as const;

const linkedInButtonClass =
  "pressable relative inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 text-sm font-medium tracking-tight text-slate-900 no-underline select-none hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto";

const [founderDemoLead, founderDemoAction] = FOUNDER_SECTION.demoCta.includes(":")
  ? (FOUNDER_SECTION.demoCta.split(/:\s*/, 2) as [string, string])
  : [FOUNDER_SECTION.demoCta, FOUNDER_SECTION.demoCta];

function FounderParagraph({ parts }: { parts: readonly FounderTextPart[] }) {
  return (
    <p className="m-0 text-sm leading-relaxed text-slate-600 sm:text-base">
      {parts.map((part, index) =>
        part.bold ? (
          <strong key={index} className="font-medium text-slate-950">
            {part.text}
          </strong>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </p>
  );
}

function FounderPortrait() {
  return (
    <figure className="m-0 w-full max-w-[280px]">
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <img
          src={FOUNDER_SECTION.imageSrc}
          alt={FOUNDER_SECTION.imageAlt}
          width={640}
          height={703}
          loading="lazy"
          decoding="async"
          className="aspect-[640/703] w-full object-cover"
        />
      </div>
      <figcaption className="mt-4">
        <p className="m-0 text-sm font-medium text-slate-950">
          {FOUNDER_SECTION.name}
        </p>
        <p className="m-0 mt-1 text-xs text-slate-500">
          {FOUNDER_SECTION.roleLine}
        </p>
      </figcaption>
    </figure>
  );
}

export function Founder() {
  return (
    <Section
      id="founder"
      className="border-b border-slate-200 bg-white py-20 md:py-28"
    >
      <Container>
        <div
          className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16"
        >
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <FounderPortrait />
            </Reveal>
          </div>

          <div className="flex min-w-0 flex-col gap-10" aria-labelledby="founder-heading">
            <div className="flex flex-col gap-4">
              <Reveal delay={0.05}>
                <Eyebrow label={FOUNDER_SECTION.eyebrowLabel}>
                  {FOUNDER_SECTION.eyebrow}
                </Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <blockquote
                  id="founder-heading"
                  className="m-0 border-0 p-0 text-balance text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl"
                >
                  &ldquo;{FOUNDER_SECTION.titleLead}{" "}
                  <span className="text-slate-500">
                    {FOUNDER_SECTION.titleAccent}
                  </span>
                  &rdquo;
                </blockquote>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-4">
                {FOUNDER_SECTION.bodyParagraphs.map((paragraph, index) => (
                  <FounderParagraph key={index} parts={paragraph} />
                ))}
                <ul
                  className="m-0 grid list-none gap-x-8 gap-y-2 p-0 pt-2 sm:grid-cols-2"
                  aria-label="Credentials"
                >
                  {FOUNDER_SECTION.credentials.map((label) => (
                    <li key={label} className="flex items-start gap-2">
                      <Check
                        size={14}
                        weight="bold"
                        className="mt-0.5 shrink-0 text-emerald-600"
                        aria-hidden
                      />
                      <span className="text-sm leading-snug text-slate-700">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div>
              <h3 id="founder-pillars-heading" className="sr-only">
                Why founders trust Easync
              </h3>
              <ul
                className="m-0 flex list-none flex-col gap-2 p-0"
                aria-labelledby="founder-pillars-heading"
              >
                {FOUNDER_SECTION.pillars.map((pillar, index) => {
                  const Icon = pillarIcons[pillar.icon];
                  return (
                    <li key={pillar.title}>
                      <Reveal delay={0.12 + index * 0.03} className="block">
                        <article
                          className="flex gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 sm:gap-3 sm:px-3.5 sm:py-3"
                        >
                          <div
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-slate-800 ring-1 ring-slate-200"
                            aria-hidden
                          >
                            <Icon size={16} weight="bold" />
                          </div>
                          <div className="min-w-0 flex flex-col gap-0.5">
                            <h4 className="m-0 text-sm font-medium leading-snug tracking-tight text-slate-950">
                              {pillar.title}
                            </h4>
                            <p className="m-0 text-xs leading-snug text-slate-600">
                              {pillar.body}
                            </p>
                          </div>
                        </article>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Reveal delay={0.14}>
              <div
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8"
              >
                <p className="m-0 max-w-lg text-sm leading-relaxed text-slate-600">
                  {founderDemoLead}
                </p>
                <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                  <Button
                    href="#demo"
                    variant="primary"
                    size="lg"
                    className="w-full whitespace-nowrap sm:w-auto"
                  >
                    {founderDemoAction}
                    <ArrowRight size={16} weight="bold" aria-hidden />
                  </Button>
                  <a
                    href={FOUNDER_LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkedInButtonClass}
                  >
                    <LinkedinLogo
                      size={20}
                      weight="fill"
                      className="shrink-0 text-[#0A66C2]"
                      aria-hidden
                    />
                    {FOUNDER_SECTION.linkedInLabel}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
