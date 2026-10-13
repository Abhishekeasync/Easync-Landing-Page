"use client";

import { ArrowRight, Check } from "@phosphor-icons/react";
import {
  SIGN_UP_URL,
  WHY_SWITCH,
  whySwitchCards,
  type WhySwitchWidget,
} from "./content";
import { Container, Reveal, Section } from "./primitives";
import { SwitchNumbersCta } from "./SwitchNumbersCta";
import { Eyebrow } from "./SectionHeading";

const widgetShell =
  "rounded-xl border border-slate-200 bg-white p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]";

function WidgetCaption({ title }: { title: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
      <span>{title}</span>
      <span className="normal-case tracking-normal">Sample data</span>
    </div>
  );
}

function MetricRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <li className="flex items-center justify-between gap-2">
      <span className="min-w-0 text-xs leading-snug text-slate-600">{label}</span>
      <span
        className={`shrink-0 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold tabular-nums ${
          highlight ? "text-blue-600" : "text-slate-900"
        }`}
      >
        {value}
      </span>
    </li>
  );
}

function SampleWidget({ kind, title }: { kind: WhySwitchWidget; title: string }) {
  if (kind === "aging") {
    const rows = [
      { label: "0–30 days", amount: "₹1,20,000", bar: "w-[72%] bg-emerald-500" },
      { label: "31–60 days", amount: "₹64,500", bar: "w-[38%] bg-amber-500" },
      { label: "90+ days", amount: "₹41,200", bar: "w-[24%] bg-red-500" },
    ];
    return (
      <div className={widgetShell} aria-hidden>
        <WidgetCaption title={title} />
        <ul className="mt-3 flex flex-col gap-2.5">
          {rows.map((row) => (
            <li
              key={row.label}
              className="grid grid-cols-[4.25rem_1fr_auto] items-center gap-2"
            >
              <span className="text-xs text-slate-600">{row.label}</span>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div className={`h-full rounded-full ${row.bar}`} />
              </div>
              <span className="text-xs font-semibold tabular-nums text-slate-900">
                {row.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (kind === "dashboard") {
    return (
      <div className={widgetShell} aria-hidden>
        <WidgetCaption title={title} />
        <ul className="mt-3 flex flex-col gap-2">
          <MetricRow label="Sales" value="₹8,45,200" />
          <MetricRow label="Expenses" value="₹3,12,600" />
          <MetricRow label="Payments due to you" value="₹2,25,700" highlight />
        </ul>
      </div>
    );
  }

  const rows = [
    { label: "Okhla godown", value: "1,240 units", low: false },
    { label: "Sadar Bazar shop", value: "386 units", low: false },
    { label: "Gurgaon branch", value: "42 units", low: true },
  ];
  return (
    <div className={widgetShell} aria-hidden>
      <WidgetCaption title={title} />
      <ul className="mt-3 flex flex-col gap-2">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-2">
            <span className="min-w-0 text-xs leading-snug text-slate-600">
              {row.label}
            </span>
            <span className="shrink-0 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold tabular-nums text-slate-900">
              {row.value}
              {row.low ? (
                <span className="font-medium text-red-600"> · low</span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const signupLinkClass =
  "mt-auto inline-flex w-fit items-center gap-1 pt-4 text-sm font-medium text-blue-600 no-underline transition-colors hover:text-blue-700 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export function Benefits() {
  return (
    <Section
      background="surface"
      className="border-b border-slate-200 py-20 md:py-28"
    >
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <Reveal>
              <Eyebrow label={WHY_SWITCH.eyebrowLabel}>
                {WHY_SWITCH.eyebrow}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="why-switch-heading"
                className="text-balance text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl"
              >
                {WHY_SWITCH.title}{" "}
                <span className="text-slate-500">{WHY_SWITCH.titleAccent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-slate-600">
                {WHY_SWITCH.description}
              </p>
            </Reveal>
          </div>

          <div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
            aria-labelledby="why-switch-heading"
          >
            {whySwitchCards.map((card, index) => (
              <Reveal key={card.linkLabel} delay={0.04 + index * 0.05} className="h-full">
                <article
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="bg-[#FFF1F1] px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
                    <p className="m-0 text-[10px] font-semibold uppercase tracking-wider text-red-600">
                      The problem
                    </p>
                    <p className="mt-3 text-lg font-medium tracking-tight text-slate-950">
                      &ldquo;{card.problemQuote}&rdquo;
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {card.problemBody}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
                    <p className="m-0 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                      <Check size={12} weight="bold" aria-hidden />
                      With Easync
                    </p>
                    <h3 className="mt-3 text-base font-medium tracking-tight text-slate-950">
                      {card.solutionTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {card.solutionBody}
                    </p>
                    <div className="mt-4 flex-1">
                      <SampleWidget kind={card.widget} title={card.widgetTitle} />
                    </div>
                    <a href={SIGN_UP_URL} className={signupLinkClass}>
                      {card.linkLabel}
                      <ArrowRight size={14} weight="bold" aria-hidden />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <SwitchNumbersCta />
        </div>
      </Container>
    </Section>
  );
}
