"use client";

import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import {
  NO_CARD_REQUIRED_NOTE,
  plans,
  PRICING_SECTION,
  SIGN_UP_URL,
  START_TRIAL_CTA_LABEL,
  type Plan,
} from "./content";
import { PricingPlanIncludes } from "./PricingPlanIncludes";
import { PricingTrialBanner } from "./PricingTrialBanner";
import { Button, Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";

const VISIBLE_FEATURES = 4;

const trialButtonClass =
  "w-full !h-auto min-h-10 whitespace-normal py-2.5 text-center leading-snug";

function PricingPlanCard({ plan }: { plan: Plan }) {
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const hasMoreFeatures = plan.features.length > VISIBLE_FEATURES;
  const visibleFeatures =
    featuresExpanded || !hasMoreFeatures
      ? plan.features
      : plan.features.slice(0, VISIBLE_FEATURES);
  const ink = plan.popular;

  return (
    <article
      className={`flex h-full min-h-0 flex-col rounded-2xl p-6 ${
        ink
          ? "bg-slate-950 text-white"
          : "border border-slate-200 bg-white text-slate-950"
      }`}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-7 items-start justify-between gap-3">
          <h3 className="text-base font-medium leading-snug">{plan.name}</h3>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
              ink
                ? "bg-white/10 text-slate-200"
                : "invisible bg-transparent text-transparent"
            }`}
            aria-hidden={!ink}
          >
            Popular
          </span>
        </div>
        <p
          className={`mt-1 min-h-10 text-sm leading-snug ${
            ink ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {plan.audience}
        </p>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-3xl font-medium tracking-tight">
            {plan.yearlyPrice}
          </span>
          <span className={`text-sm ${ink ? "text-slate-400" : "text-slate-500"}`}>
            /month
          </span>
        </div>
        <p
          className={`mt-0.5 min-h-5 font-mono text-xs leading-snug ${
            ink ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {plan.yearlyBilling}
        </p>
        <p
          className={`mt-2 min-h-8 text-sm leading-snug ${
            ink ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {plan.entities} · {plan.users}
        </p>

        <div className="mt-auto flex flex-col gap-2 pt-5">
          <Button
            href={SIGN_UP_URL}
            variant={ink ? "dark" : "outline"}
            size="md"
            className={trialButtonClass}
          >
            {START_TRIAL_CTA_LABEL}
          </Button>
          <p
            className={`m-0 text-center text-xs leading-snug ${
              ink ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {NO_CARD_REQUIRED_NOTE}
          </p>
        </div>
      </div>

      <div
        className={`mt-5 shrink-0 border-t pt-5 ${
          ink ? "border-white/10" : "border-slate-200"
        }`}
      >
        <p
          className={`text-[10px] font-semibold uppercase tracking-wider ${
            ink ? "text-slate-400" : "text-slate-500"
          }`}
        >
          What&apos;s included
        </p>
        <ul className="mt-3 flex list-none flex-col gap-2.5 p-0 text-sm">
          {visibleFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <CheckCircle
                size={16}
                weight="fill"
                className={`mt-0.5 shrink-0 ${
                  ink ? "text-emerald-400" : "text-emerald-600"
                }`}
              />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 min-h-7">
          {hasMoreFeatures ? (
            <button
              type="button"
              onClick={() => setFeaturesExpanded((open) => !open)}
              className={`text-sm font-medium underline underline-offset-2 ${
                ink
                  ? "text-slate-300 hover:text-white"
                  : "text-blue-600 hover:text-blue-700"
              }`}
              aria-expanded={featuresExpanded}
            >
              {featuresExpanded ? "View less" : "View more"}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Pricing() {
  return (
    <Section
      id="pricing"
      background="surface"
      className="border-b border-slate-200 py-20 md:py-28"
    >
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex max-w-xl flex-col gap-4">
            <Reveal>
              <Eyebrow label={PRICING_SECTION.eyebrowLabel}>
                {PRICING_SECTION.eyebrow}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl">
                {PRICING_SECTION.title}{" "}
                <span className="text-slate-500">
                  {PRICING_SECTION.titleAccent}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-slate-600">
                {PRICING_SECTION.description}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <PricingTrialBanner />
          </Reveal>

          <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan, index) => (
              <Reveal
                key={plan.name}
                delay={index * 0.05}
                direction="none"
                className="h-full min-h-0"
              >
                <PricingPlanCard plan={plan} />
              </Reveal>
            ))}
          </div>

          <PricingPlanIncludes />
        </div>
      </Container>
    </Section>
  );
}
