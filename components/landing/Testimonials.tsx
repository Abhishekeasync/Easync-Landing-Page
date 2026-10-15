"use client";

import { useEffect, useState } from "react";
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

function PersonPhoto({ src, size }: { src: string; size: "md" | "sm" }) {
  const dim = size === "md" ? "h-10 w-10" : "h-9 w-9";
  return (
    <img
      src={src}
      alt=""
      className={`${dim} shrink-0 rounded-full object-cover object-center`}
    />
  );
}

function PersonMeta({
  photo,
  name,
  detail,
}: {
  photo: string;
  name: string;
  detail: string;
}) {
  return (
    <figcaption className="flex items-center gap-3 border-t border-slate-800 pt-5">
      <PersonPhoto src={photo} size="md" />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-white">{name}</span>
        <span className="block text-xs text-slate-400">{detail}</span>
      </span>
    </figcaption>
  );
}

function FeaturedStoryCard({ story }: { story: CustomerStory }) {
  return (
    <figure className="flex h-full min-h-0 flex-col justify-between gap-8 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
      <blockquote className="m-0 text-lg font-medium leading-relaxed tracking-tight text-white sm:text-xl">
        &ldquo;{story.quote}&rdquo;
      </blockquote>
      <PersonMeta
        photo={story.photo}
        name={story.name}
        detail={`${story.role} · ${story.company}`}
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
  photo,
}: {
  headline: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  photo: string;
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
        <PersonPhoto src={photo} size="sm" />
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

function CustomerCarousel() {
  const reduce = useReducedMotion();
  const total = customerStories.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (total <= 1) return;
    const id = window.setTimeout(() => {
      setIndex((current) => (current - 1 + total) % total);
    }, ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [index, total]);

  const visible = Array.from({ length: Math.min(VISIBLE, total) }, (_, offset) => {
    return customerStories[(index + offset) % total];
  });
  const [featured, ...sides] = visible;
  const slotMotion = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.45, ease: easeOut, delay: reduce ? 0 : delay },
  });

  return (
    <>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div key={featured.name} {...slotMotion(0.28)}>
          <FeaturedStoryCard story={featured} />
        </motion.div>
      </AnimatePresence>
      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {sides.map((story, slot) => (
            <motion.div
              key={story.name}
              layout
              {...slotMotion((sides.length - 1 - slot) * 0.14)}
            >
              <StoryCard {...story} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
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
            className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:items-start"
            aria-labelledby="customer-results-heading"
          >
            <CustomerCarousel />
          </div>

          <CustomerResultsCta />
        </div>
      </Container>
    </Section>
  );
}
