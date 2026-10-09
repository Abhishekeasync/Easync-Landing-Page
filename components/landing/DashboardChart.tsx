"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_IN_OUT, EASE_OUT } from "./motion";

const SAMPLES = [28, 34, 31, 42, 48, 44, 58, 63, 60, 78, 92];
const WIDTH = 240;
const HEIGHT = 64;

const METERS = [
  { label: "GSTR-2B", value: "99.4%", pct: 99.4, tone: "bg-emerald-400" },
  { label: "Collected", value: "72%", pct: 72, tone: "bg-blue-400" },
  { label: "In stock", value: "86%", pct: 86, tone: "bg-amber-300" },
];

function sparkPath() {
  const step = WIDTH / (SAMPLES.length - 1);
  return SAMPLES.map((sample, index) => {
    const x = index * step;
    const y = HEIGHT - (sample / 100) * (HEIGHT - 8) - 4;
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

const LINE = sparkPath();

function useCountUp(target: number, active: boolean) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setValue(target);
      return;
    }

    let start: number | null = null;
    let frame = 0;
    const duration = 1100;

    const step = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setValue(target * eased);
      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, reduce, target]);

  return reduce ? target : value;
}

export function DashboardChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const play = Boolean(reduce) || inView;
  const matched = useCountUp(14.82, play);
  const shown = matched.toFixed(2);

  return (
    <div
      ref={ref}
      className="border-b border-slate-800 bg-slate-900/60 px-4 py-4 sm:px-5"
    >
      <div className="flex min-w-0 items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="m-0 text-[11px] font-medium uppercase tracking-wider text-slate-500">
            Matched ITC · Sep 2026
          </p>
          <p
            className="m-0 mt-1 font-mono text-2xl font-semibold tabular-nums tracking-tight text-white"
            aria-label="14.82 lakh rupees matched"
          >
            <span aria-hidden="true">₹{shown}L</span>
          </p>
          <p className="m-0 mt-0.5 text-xs text-emerald-400">
            99.4% of portal invoices
          </p>
        </div>

        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-16 w-[42%] max-w-60 shrink-0"
          aria-hidden="true"
        >
          <motion.path
            d={`${LINE} L${WIDTH} ${HEIGHT} L0 ${HEIGHT} Z`}
            fill="rgb(52 211 153 / 0.16)"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: play ? 1 : 0 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.35, ease: EASE_OUT }}
          />
          <motion.path
            d={LINE}
            fill="none"
            stroke="#34d399"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: play ? 1 : 0 }}
            transition={{
              duration: reduce ? 0 : 1.15,
              ease: EASE_IN_OUT,
            }}
          />
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {METERS.map((meter, index) => (
          <div key={meter.label}>
            <div className="mb-1.5 flex min-w-0 flex-col items-start gap-0.5 text-[10px] text-slate-400 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
              <span className="whitespace-nowrap">{meter.label}</span>
              <span className="font-mono whitespace-nowrap text-slate-200">{meter.value}</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className={`h-full origin-left rounded-full ${meter.tone}`}
                style={{ width: `${meter.pct}%` }}
                initial={reduce ? false : { transform: "scaleX(0)" }}
                animate={{ transform: play ? "scaleX(1)" : "scaleX(0)" }}
                transition={{
                  duration: reduce ? 0 : 0.7,
                  delay: reduce ? 0 : 0.12 + index * 0.06,
                  ease: EASE_OUT,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
