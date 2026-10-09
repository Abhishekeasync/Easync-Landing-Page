"use client";

import { CaretDown } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { EASE_OUT } from "../motion";

export function Accordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<string | null>(items[0]?.question ?? null);

  return (
    <div className="border-y border-slate-200">
      {items.map((item) => (
        <AccordionItem
          key={item.question}
          item={item}
          isOpen={open === item.question}
          onToggle={() =>
            setOpen(open === item.question ? null : item.question)
          }
        />
      ))}
    </div>
  );
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <h3 className="m-0 text-base font-medium">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-4 py-4 text-left text-slate-950"
        >
          <span>{item.question}</span>
          <motion.span
            animate={reduce ? undefined : { rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="shrink-0 text-slate-400"
          >
            <CaretDown size={16} weight="bold" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="m-0 max-w-xl pb-4 text-sm leading-relaxed text-slate-600">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
