"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export type BeforeAfterContent = {
  beforeLabel: string;
  beforeValue: string;
  afterLabel: string;
  afterValue: string;
  caption: string;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function FeaturedBeforeAfter({ data }: { data: BeforeAfterContent }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);
  const inView = useInView(rootRef, { once: true, margin: "-12% 0px" });
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<"before" | "after">("after");

  const withEasync = mode === "after";

  useEffect(() => {
    if (!inView || reduceMotion || playedRef.current) return;
    playedRef.current = true;
    setMode("before");
    const id = window.setTimeout(() => setMode("after"), 850);
    return () => window.clearTimeout(id);
  }, [inView, reduceMotion]);

  return (
    <div ref={rootRef} className="flex flex-col gap-3">
      <div
        role="tablist"
        aria-label="Compare month-end close time"
        className="inline-flex w-fit rounded-full border border-slate-800 bg-slate-900/60 p-0.5"
      >
        {(
          [
            { id: "before" as const, label: data.beforeLabel },
            { id: "after" as const, label: data.afterLabel },
          ] as const
        ).map((tab) => {
          const selected = mode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setMode(tab.id)}
              className={`relative rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                selected
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {selected ? (
                <motion.span
                  layoutId="before-after-tab"
                  className="absolute inset-0 rounded-full bg-slate-800"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              ) : null}
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
        <motion.div
          className="min-w-[5.5rem]"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: withEasync ? 0.5 : 1,
                  y: withEasync ? 0 : -2,
                }
          }
          transition={{ duration: 0.28, ease: easeOut }}
        >
          <p className="m-0 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {data.beforeLabel}
          </p>
          <p
            className={`mt-1 text-2xl font-medium tracking-tight sm:text-3xl ${
              withEasync
                ? "text-slate-500 line-through decoration-slate-600"
                : "text-white"
            }`}
          >
            {data.beforeValue}
          </p>
        </motion.div>

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: withEasync ? 1 : 0.92,
                  opacity: withEasync ? 1 : 0.45,
                }
          }
          transition={{ duration: 0.28, ease: easeOut }}
          className="mb-2 shrink-0"
          aria-hidden
        >
          <ArrowRight
            size={20}
            weight="bold"
            className={withEasync ? "text-emerald-500" : "text-slate-600"}
          />
        </motion.div>

        <motion.div
          className="min-w-[6.5rem]"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: withEasync ? 1 : 0.45,
                  y: withEasync ? -2 : 0,
                }
          }
          transition={{ duration: 0.28, ease: easeOut }}
        >
          <p
            className={`m-0 text-[10px] font-semibold uppercase tracking-wider ${
              withEasync ? "text-emerald-500" : "text-slate-600"
            }`}
          >
            {data.afterLabel}
          </p>
          <p
            className={`mt-1 text-2xl font-medium tracking-tight sm:text-3xl ${
              withEasync ? "text-white" : "text-slate-500"
            }`}
          >
            {data.afterValue}
          </p>
        </motion.div>
      </div>

      <p className="m-0 text-xs text-slate-500">{data.caption}</p>
    </div>
  );
}
