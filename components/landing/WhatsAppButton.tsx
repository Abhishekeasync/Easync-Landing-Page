"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { WHATSAPP_HREF } from "./content";

const marks = {
  sm: { box: "size-5", icon: 13 },
  md: { box: "size-8", icon: 20 },
} as const;

export function WhatsAppMark({ size = "sm" }: { size?: keyof typeof marks }) {
  const mark = marks[size];
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[#128C7E] text-white transition-colors duration-200 group-hover:bg-[#075E54] ${mark.box}`}
    >
      <WhatsappLogo size={mark.icon} weight="fill" className="block" />
    </span>
  );
}

export function WhatsAppButton() {
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const form = document.getElementById("demo");
    if (!form) return;

    let isFormInView = false;
    const io = new IntersectionObserver(([entry]) => {
      isFormInView = entry.isIntersecting;
      if (!isFormInView) {
        setCovered(false);
      } else {
        schedule();
      }
    });
    io.observe(form);

    let frame = 0;
    const update = () => {
      if (!isFormInView) return;
      const formRect = form.getBoundingClientRect();
      const size = 48;
      const inset = 20;
      const button = {
        left: window.innerWidth - inset - size,
        right: window.innerWidth - inset,
        top: window.innerHeight - inset - size,
        bottom: window.innerHeight - inset,
      };
      const hit = !(
        button.right < formRect.left ||
        button.left > formRect.right ||
        button.bottom < formRect.top ||
        button.top > formRect.bottom
      );
      setCovered((current) => (current === hit ? current : hit));
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(form);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      aria-hidden={covered}
      tabIndex={covered ? -1 : 0}
      className={`group fixed right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-[0_8px_18px_rgba(7,94,84,0.22)] transition-[transform,opacity,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04] hover:bg-[#075E54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
        covered ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[calc(100%+0.65rem)] hidden whitespace-nowrap rounded-md bg-slate-950 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-[0_8px_16px_rgba(15,23,42,0.16)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:[@media(hover:hover)]:block"
      >
        Chat on WhatsApp
      </span>
      <WhatsappLogo size={28} weight="fill" className="block" aria-hidden="true" />
    </a>
  );
}
