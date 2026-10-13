"use client";

import { ArrowRight, CaretRight, List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { SIGN_IN_URL, SIGN_UP_URL } from "./content";
import { Button } from "./primitives";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Product", href: "#product-demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="border-b border-slate-800 bg-slate-950 px-4 py-2 text-center text-xs text-slate-300">
        <a
          href="#pricing"
          className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-slate-300 no-underline hover:text-white"
        >
          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-950">
            Trial
          </span>
          <span>3 months free on every plan, with data migration</span>
          <CaretRight size={12} weight="bold" className="text-slate-400" />
        </a>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-3 px-4 py-2 sm:gap-4 sm:px-6">
          <a href="https://easyncbooks.com" className="inline-flex shrink-0 items-center no-underline">
            <img
              src="/logos/Easync_Logo.webp"
              alt="Easync Books"
              width={490}
              height={470}
              decoding="async"
              className="h-16 w-auto"
            />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-slate-600 no-underline hover:bg-slate-100 hover:text-slate-950"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button href={SIGN_IN_URL} variant="ghost" size="sm">
              Login
            </Button>
            <Button href={SIGN_UP_URL} variant="primary" size="sm">
              Start a free trial <ArrowRight size={14} weight="bold" />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 md:hidden"
            aria-label="Open menu"
          >
            <List size={20} weight="bold" />
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-white p-5 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-950">
                Easync Books
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X size={18} weight="bold" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-3 text-base text-slate-800 no-underline hover:bg-slate-100"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 pt-6">
              <Button
                href={SIGN_UP_URL}
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Start a free trial <ArrowRight size={16} weight="bold" />
              </Button>
              <Button
                href={SIGN_IN_URL}
                variant="ghost"
                size="lg"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
