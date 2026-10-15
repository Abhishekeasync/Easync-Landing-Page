"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CUSTOMER_RESULTS,
  SIGN_UP_URL,
  customerStories,
} from "./content";
import { Button, Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";

const VISIBLE = 3;
const ROTATE_MS = 6000;
const easeOut = [0.22, 1, 0.36, 1] as const;

type CustomerStory = (typeof customerStories)[number];

function PersonPhoto({
  src,
  size,
  tone,
}: {
  src: string;
  size: "md" | "sm";
  tone: "dark" | "light";
}) {
  const dim = size === "md" ? "h-10 w-10" : "h-9 w-9";
  const ring =
    tone === "dark" ? "ring-2 ring-white/15" : "ring-1 ring-slate-200";
  return (
    <img
      src={src}
      alt=""
      className={`${dim} shrink-0 rounded-full object-cover object-center ${ring}`}
    />
  );
}

function PersonMeta({
  photo,
  name,
  detail,
  tone,
}: {
  photo: string;
  name: string;
  detail: string;
  tone: "dark" | "light";
}) {
  const border = tone === "dark" ? "border-white/10" : "border-slate-100";
  const nameClass = tone === "dark" ? "text-white" : "text-slate-950";
  const detailClass = tone === "dark" ? "text-slate-400" : "text-slate-500";

  return (
    <figcaption className={`flex items-center gap-3 border-t ${border} pt-4`}>
      <PersonPhoto src={photo} size={tone === "dark" ? "md" : "sm"} tone={tone} />
      <span className="min-w-0">
        <span className={`block text-sm font-medium ${nameClass}`}>{name}</span>
        <span className={`block text-xs ${detailClass}`}>{detail}</span>
      </span>
    </figcaption>
  );
}

function FeaturedStoryCard({ story }: { story: CustomerStory }) {
  return (
    <motion.figure
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: easeOut } },
      }}
      className="relative flex h-full min-h-[17.5rem] flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-slate-950 p-6 text-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_24px_48px_-12px_rgba(15,23,42,0.35)] ring-1 ring-inset ring-white/10 sm:min-h-[19rem] sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-pattern-dark opacity-[0.35]"
      />
      <div className="relative min-h-0 flex flex-1 flex-col gap-4">
        <p className="m-0 text-sm font-medium tracking-tight text-emerald-400">
          {story.headline}
        </p>
        <blockquote
          className="m-0 line-clamp-4 text-pretty text-lg font-medium leading-relaxed tracking-tight text-white/95 sm:line-clamp-5 sm:text-xl"
        >
          &ldquo;{story.quote}&rdquo;
        </blockquote>
      </div>
      <PersonMeta
        tone="dark"
        photo={story.photo}
        name={story.name}
        detail={`${story.role} · ${story.company}`}
      />
    </motion.figure>
  );
}

function StoryCard({ story }: { story: CustomerStory }) {
  return (
    <motion.figure
      variants={{
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: easeOut } },
      }}
      className="flex h-full flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
    >
      <div className="min-h-0">
        <p className="m-0 text-sm font-medium tracking-tight text-emerald-700">
          {story.headline}
        </p>
        <blockquote className="m-0 mt-2.5 line-clamp-3 text-pretty text-sm leading-relaxed text-slate-600">
          &ldquo;{story.quote}&rdquo;
        </blockquote>
      </div>
      <PersonMeta
        tone="light"
        photo={story.photo}
        name={story.name}
        detail={`${story.role}, ${story.company}`}
      />
    </motion.figure>
  );
}

function visibleStories(startIndex: number) {
  const total = customerStories.length;
  return Array.from({ length: Math.min(VISIBLE, total) }, (_, offset) => {
    return customerStories[(startIndex + offset) % total];
  });
}

function CarouselChrome({
  index,
  total,
  paused,
  reduce,
  onSelect,
}: {
  index: number;
  total: number;
  paused: boolean;
  reduce: boolean | null;
  onSelect: (next: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="m-0 text-xs font-medium tabular-nums text-slate-500">
        Story {index + 1} of {total}
        {paused ? <span className="text-slate-400"> · paused</span> : null}
      </p>
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:max-w-xs sm:flex-none">
        <div
          className="h-0.5 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Time until next customer story"
        >
          <div
            key={index}
            data-paused={paused || undefined}
            className={`carousel-progress h-full rounded-full bg-slate-950 ${reduce ? "carousel-progress--instant" : ""}`}
            style={
              { "--carousel-ms": `${ROTATE_MS}ms` } as CSSProperties
            }
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Customer stories">
          {customerStories.map((story, i) => {
            const active = i === index;
            return (
              <button
                key={story.name}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Show story from ${story.name}`}
                onClick={() => onSelect(i)}
                className={`h-2 rounded-full transition-[width,background-color] duration-300 ease-out ${
                  active ? "w-7 bg-slate-950" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CustomerCarousel() {
  const reduce = useReducedMotion();
  const total = customerStories.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (total <= 1 || paused) return;
    const id = window.setTimeout(() => {
      setIndex((current) => (current - 1 + total) % total);
    }, ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [index, total, paused]);

  const visible = visibleStories(index);
  const [featured, ...sides] = visible;
  const fadeMs = reduce ? 0.12 : 0.28;
  const blankMs = reduce ? 0 : 0.18;

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : blankMs + 0.04,
      },
    },
  };

  return (
    <div
      className="flex flex-col gap-5"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <CarouselChrome
        index={index}
        total={total}
        paused={paused}
        reduce={reduce}
        onSelect={setIndex}
      />

      <div className="relative min-h-[28rem] w-full min-w-0 sm:min-h-[26rem] lg:min-h-[22rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            variants={gridVariants}
            initial="hidden"
            animate="show"
            exit={{
              opacity: 0,
              transition: { duration: fadeMs, ease: easeOut },
            }}
            className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch"
          >
            <FeaturedStoryCard story={featured} />
            <div className="flex min-w-0 flex-col gap-3">
              {sides.map((story) => (
                <StoryCard key={story.name} story={story} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
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
        <div className="flex flex-col gap-10 lg:gap-12">
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
              <p className="text-pretty text-base leading-relaxed text-slate-600">
                {CUSTOMER_RESULTS.description}
              </p>
            </Reveal>
          </div>

          <div aria-labelledby="customer-results-heading">
            <CustomerCarousel />
          </div>

          <CustomerResultsCta />
        </div>
      </Container>
    </Section>
  );
}
