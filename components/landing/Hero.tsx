"use client";

import { ArrowRight, CaretRight, CheckCircle } from "@phosphor-icons/react";
import { DemoForm } from "./DemoForm";
import { Button } from "./primitives";
import { Eyebrow } from "./SectionHeading";

const heroChecks = [
  "3-month free trial, all features",
  "Tally and Excel import",
  "CA-built GST and audit trail",
];

export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid w-full min-w-0 max-w-[1120px] items-start gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,440px)] lg:gap-16 lg:py-24">
        <div className="flex min-w-0 flex-col gap-6">
          <div className="reveal-up">
            <a href="#pricing" className="inline-flex max-w-full no-underline">
              <Eyebrow label="Trial">
                <span className="inline-flex items-center gap-1">
                  3 months free on every plan
                  <CaretRight size={14} weight="bold" />
                </span>
              </Eyebrow>
            </a>
          </div>

          <div className="reveal-up" style={{ animationDelay: "0.05s" }}>
            <h1 className="max-w-xl text-balance text-4xl font-medium tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.08]">
              Compliance-first accounting{" "}
              <span className="text-slate-500">
                for growing Indian businesses.
              </span>
            </h1>
          </div>

          <div className="reveal-up" style={{ animationDelay: "0.1s" }}>
            <p className="max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              From GSTR-2B reconciliation to e-invoicing and multi-godown
              inventory. One workspace for the books, without calling your
              accountant to find a number.
            </p>
          </div>

          <div className="reveal-up" style={{ animationDelay: "0.15s" }}>
            <ul className="m-0 flex list-none flex-col gap-2 p-0 text-sm text-slate-700">
              {heroChecks.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckCircle
                    size={18}
                    weight="fill"
                    className="shrink-0 text-emerald-600"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button href="#demo" variant="primary" size="lg">
                Book a free demo <ArrowRight size={16} weight="bold" />
              </Button>
              <Button href="#product-demo" variant="outline" size="lg">
                See the product
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Trusted by 100+ businesses and CA firms
            </p>
          </div>
        </div>

        <div className="reveal-fade w-full" style={{ animationDelay: "0.12s" }}>
          <DemoForm />
        </div>
      </div>
    </section>
  );
}
