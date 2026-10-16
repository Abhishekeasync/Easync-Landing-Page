"use client";

import {
  ArrowsClockwise,
  Bank,
  ChartLineUp,
  Clock,
  Truck,
  Warehouse,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type KeyboardEvent } from "react";
import { EASE_OUT } from "./motion";

type ScreenId = "gstr2b" | "aging" | "banking" | "insights" | "godown" | "eway";

type ScreenConfig = {
  id: ScreenId;
  title: string;
  summary: string;
  file: string;
  alt: string;
  icon: typeof Clock;
  objectPosition?: string;
  maxHeight?: string;
};

const screens: readonly ScreenConfig[] = [
  {
    id: "gstr2b",
    title: "Match the portal with your books",
    summary:
      "Parties analysis lines up GSTR-2 tax with bills and expenses, head by head, and shows the difference.",
    file: "Gst2b.jpeg",
    alt: "Easync GSTR-2 report comparing GSTN tax with bills and expenses for each party",
    icon: ArrowsClockwise,
  },
  {
    id: "aging",
    title: "See what is still unpaid",
    summary:
      "Each bill shows the amount due, what was paid, how many days it is overdue, and whether it is paid, partly paid, or unpaid.",
    file: "Aging.jpeg",
    alt: "Easync aging report listing bills with due amounts, overdue days, and paid or unpaid status",
    icon: Clock,
  },
  {
    id: "banking",
    title: "Receipts, payments, and the close",
    summary:
      "Opening balance, receipts, payments, and net closing balance, with the month-by-month trend and where the cash sits.",
    file: "Banking Analytics.jpeg",
    alt: "Easync banking analytics with opening balance, receipts, payments, closing balance, and a monthly trend",
    icon: ChartLineUp,
  },
  {
    id: "insights",
    title: "What the accounts did",
    summary:
      "Recent credits and debits sit beside the highest balance, the busiest account, and net cash flow.",
    file: "All banking insights.jpeg",
    alt: "Easync banking activity list with an insights panel for balance, receipts, payments, and net cash flow",
    icon: Bank,
  },
  {
    id: "godown",
    title: "Every warehouse on one list",
    summary:
      "Godowns and departments, with the person in charge, their phone number, and the address.",
    file: "Godown.jpeg",
    alt: "Easync godown list with warehouse names, department heads, phone numbers, and addresses",
    icon: Warehouse,
  },
  {
    id: "eway",
    title: "Generate the e-way bill from the invoice",
    summary:
      "Open the invoice and choose Generate E-Way Bill from Select Action, next to e-invoice.",
    file: "One Click e-way bill.png",
    alt: "Easync invoice details with Generate E-Way Bill highlighted in the Select Action menu",
    icon: Truck,
    /** ponytail: asset has extra canvas below UI; crop via object position until asset is re-exported */
    objectPosition: "top",
    maxHeight: "min(72vh, 32rem)",
  },
];

function pictureSrc(file: string) {
  return `/Software_Pictures/${encodeURIComponent(file)}`;
}

export function DashboardVisual() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<ScreenId>(screens[0].id);
  const active = screens.find((screen) => screen.id === activeId) ?? screens[0];
  const ActiveIcon = active.icon;

  function move(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const key = event.key;
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(key)) {
      return;
    }
    event.preventDefault();
    const last = screens.length - 1;
    const next =
      key === "Home"
        ? 0
        : key === "End"
          ? last
          : key === "ArrowDown" || key === "ArrowRight"
            ? (index + 1) % screens.length
            : (index - 1 + screens.length) % screens.length;
    const id = screens[next].id;
    setActiveId(id);
    document.getElementById(`product-tab-${id}`)?.focus();
  }

  return (
    <div
      id="product-demo"
      className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start lg:gap-10"
    >
      <div
        role="tablist"
        aria-label="Product screens"
        aria-orientation="vertical"
        className="flex gap-1 overflow-x-auto pb-1 lg:max-h-[calc(100vh-7rem)] lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:overscroll-contain lg:pb-0"
      >
        {screens.map((screen, index) => {
          const Icon = screen.icon;
          const selected = screen.id === active.id;
          return (
            <button
              key={screen.id}
              id={`product-tab-${screen.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="product-screen"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(screen.id)}
              onKeyDown={(event) => move(event, index)}
              className={`flex w-max shrink-0 cursor-pointer flex-col items-start gap-1 rounded-lg border-l-2 px-4 py-3 text-left max-sm:min-h-11 lg:w-full ${
                selected
                  ? "border-blue-600 bg-slate-50 text-slate-950"
                  : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                <Icon size={16} weight={selected ? "bold" : "regular"} aria-hidden />
                {screen.title}
              </span>
              <span className="hidden max-w-sm text-xs leading-relaxed text-slate-500 lg:block">
                {screen.summary}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="product-screen"
        role="tabpanel"
        aria-labelledby={`product-tab-${active.id}`}
        className="w-full self-start overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05),0_24px_48px_-28px_rgba(15,23,42,0.2)] lg:sticky lg:top-24"
      >
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
          <span className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
          </span>
          <span className="flex min-w-0 items-center gap-2 text-xs font-medium text-slate-700">
            <ActiveIcon size={14} weight="bold" className="shrink-0 text-blue-600" aria-hidden />
            <span className="truncate">{active.title}</span>
          </span>
        </div>

        <p className="border-b border-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-600">
          {active.summary}
        </p>

        <div className="overflow-hidden bg-slate-100">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={active.id}
              src={pictureSrc(active.file)}
              alt={active.alt}
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              draggable={false}
              className={`block w-full ${active.maxHeight ? "object-cover object-top" : "h-auto"}`}
              style={{
                maxHeight: active.maxHeight ?? undefined,
                objectPosition: active.objectPosition ?? undefined,
              }}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
