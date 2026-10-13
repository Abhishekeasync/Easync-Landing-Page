"use client";

import { ArrowRight } from "@phosphor-icons/react";
import {
  CUSTOMER_RESULTS,
  SIGN_UP_URL,
  customerFeaturedStory,
  customerStories,
} from "./content";
import { FeaturedBeforeAfter } from "./FeaturedBeforeAfter";
import { Button, Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";

function PersonMeta({
  initial,
  name,
  detail,
  variant,
}: {
  initial: string;
  name: string;
  detail: string;
  variant: "dark" | "light";
}) {
  const avatar =
    variant === "dark"
      ? "bg-emerald-500/20 text-sm font-medium text-emerald-200"
      : "bg-slate-100 text-xs font-medium text-slate-700";
  const nameClass =
    variant === "dark" ? "text-sm font-medium text-white" : "text-sm font-medium text-slate-950";
  const detailClass =
    variant === "dark" ? "text-xs text-slate-400" : "text-xs text-slate-500";

  return (
    <figcaption className="flex items-center gap-3 border-t border-slate-800 pt-5">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${avatar}`}
      >
        {initial}
      </span>
      <span className="min-w-0">
        <span className={`block ${nameClass}`}>{name}</span>
        <span className={`block ${detailClass}`}>{detail}</span>
      </span>
    </figcaption>
  );
}

function FeaturedStoryCard() {
  const story = customerFeaturedStory;
  const { beforeAfter } = story;

  return (
    <figure className="flex h-full min-h-0 flex-col justify-between gap-8 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
      <div>
        <FeaturedBeforeAfter data={beforeAfter} />
        <blockquote className="m-0 mt-8 text-lg font-medium leading-relaxed tracking-tight text-white sm:text-xl">
          &ldquo;{story.quote}&rdquo;
        </blockquote>
      </div>
      <PersonMeta
        initial={story.initial}
        name={story.name}
        detail={`${story.role} · ${story.company}`}
        variant="dark"
      />
    </figure>
  );
}

function StoryCard({
  headline,
  quote,
  name,
  role,
  company,
  initial,
}: {
  headline: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initial: string;
}) {
  return (
    <figure className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6">
      <div>
        <p className="m-0 text-base font-medium tracking-tight text-emerald-700">
          {headline}
        </p>
        <blockquote className="m-0 mt-3 text-sm leading-relaxed text-slate-600">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3 border-t border-slate-100 pt-4">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-700"
        >
          {initial}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-slate-950">{name}</span>
          <span className="block text-xs text-slate-500">
            {role}, {company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function CustomerResultsCta() {
  return (
    <Reveal delay={0.14}>
      <div
        className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-200 bg-white px-6 py-6 sm:flex-row sm:items-center sm:px-8"
      >
        <p className="m-0 max-w-lg text-sm leading-relaxed text-slate-600">
          Join{" "}
          <strong className="font-medium text-slate-950">
            {CUSTOMER_RESULTS.footerBold}
          </strong>{" "}
          {CUSTOMER_RESULTS.footerRest}
        </p>
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Button
            href={SIGN_UP_URL}
            variant="primary"
            size="lg"
            className="w-full whitespace-nowrap sm:w-auto"
          >
            Start 3-month free trial <ArrowRight size={16} weight="bold" />
          </Button>
          <Button
            href="#demo"
            variant="outline"
            size="lg"
            className="w-full whitespace-nowrap sm:w-auto"
          >
            Book a free demo
          </Button>
        </div>
      </div>
    </Reveal>
  );
}

export function Testimonials() {
  return (
    <Section background="surface" className="border-b border-slate-200 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <Reveal>
              <Eyebrow label={CUSTOMER_RESULTS.eyebrowLabel}>
                {CUSTOMER_RESULTS.eyebrow}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="customer-results-heading"
                className="text-balance text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl"
              >
                {CUSTOMER_RESULTS.title}{" "}
                <span className="text-slate-500">
                  {CUSTOMER_RESULTS.titleAccent}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-slate-600">
                {CUSTOMER_RESULTS.description}
              </p>
            </Reveal>
          </div>

          <div
            className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:items-stretch"
            aria-labelledby="customer-results-heading"
          >
            <Reveal className="h-full lg:min-h-[420px]">
              <FeaturedStoryCard />
            </Reveal>
            <div className="flex flex-col gap-3">
              {customerStories.map((story, index) => (
                <Reveal key={story.name} delay={0.05 + index * 0.05} className="h-full flex-1">
                  <StoryCard {...story} />
                </Reveal>
              ))}
            </div>
          </div>

          <CustomerResultsCta />
        </div>
      </Container>
    </Section>
  );
}
