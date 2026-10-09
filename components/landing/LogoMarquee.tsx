"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from "react";
import { useReducedMotion } from "framer-motion";
import type { CustomerBrand } from "./content";
import { CompanyLogo } from "./CompanyLogo";

/**
 * Motion model adapted from 21st Logo Marquee (demo 23537):
 * a ramped loop that pauses on hover and focus, and stops off-screen.
 * Visual chrome stays on the Easync ledger tokens.
 */
const RAMP = 0.19;
const SETTLE = 0.16;
const MAX_COPIES = 8;

const useIsoLayout =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function fold(x: number, loop: number) {
  const m = x % loop;
  return m > 0 ? m - loop : m;
}

function clamp(x: number, min: number, max: number) {
  return x < min ? min : x > max ? max : x;
}

function useLogoMarquee(
  gap: number,
  speed: number,
  direction: "left" | "right",
  paused: boolean,
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);
  const [copies, setCopies] = useState(4);

  const offset = useRef(0);
  const nudge = useRef(0);
  const rate = useRef(0);
  const span = useRef(0);
  const signRef = useRef(direction === "right" ? 1 : -1);
  signRef.current = direction === "right" ? 1 : -1;
  const movingRef = useRef(true);
  movingRef.current = !paused;

  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const x = offset.current - span.current;
    track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
  }, []);

  useIsoLayout(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    const measure = () => {
      const width = group.getBoundingClientRect().width;
      const loop = width > 0 ? width + gap : 0;
      const room = viewport.getBoundingClientRect().width;
      span.current = loop;
      offset.current = loop > 0 ? clamp(offset.current, -loop, loop) : 0;
      paint();
      const next =
        loop <= 0 ? 4 : clamp(Math.ceil(room / loop) + 2, 3, MAX_COPIES);
      setCopies((prev) => (prev === next ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);
    return () => observer.disconnect();
  }, [gap, paint]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let near = true;
    let frame = 0;
    let last = 0;
    let observer: IntersectionObserver | undefined;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!near) {
        last = now;
        return;
      }
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      const loop = span.current;
      if (loop <= 0) return;

      rate.current +=
        ((movingRef.current ? 1 : 0) - rate.current) * (1 - Math.exp(-dt / RAMP));

      const pull = nudge.current * (1 - Math.exp(-dt / SETTLE));
      nudge.current -= pull;

      let x = offset.current + signRef.current * speed * rate.current * dt + pull;
      if (rate.current > 0.002 && Math.abs(nudge.current) < 0.25) {
        nudge.current = 0;
        x = fold(x, loop);
      } else {
        x = clamp(x, -loop, loop);
      }
      offset.current = x;
      paint();
    };

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          near = entries[entries.length - 1]?.isIntersecting ?? true;
        },
        { rootMargin: "96px" },
      );
      observer.observe(viewport);
    }

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [paint, speed, direction]);

  const reveal = useCallback((node: HTMLElement) => {
    const viewport = viewportRef.current;
    const loop = span.current;
    if (!viewport || loop <= 0 || node === viewport) return;
    const view = viewport.getBoundingClientRect();
    const box = node.getBoundingClientRect();
    const pad = 12;
    let delta = 0;
    if (box.left < view.left + pad) delta = view.left + pad - box.left;
    else if (box.right > view.right - pad) delta = view.right - pad - box.right;
    if (delta === 0) return;
    const target = clamp(offset.current + nudge.current + delta, -loop, loop);
    nudge.current = target - offset.current;
  }, []);

  return { viewportRef, trackRef, groupRef, copies, reveal };
}

const slot =
  "flex h-24 w-36 shrink-0 items-center justify-center outline-none focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue sm:h-28 sm:w-40 lg:h-32 lg:w-44";

function LogoSlot({
  brand,
  interactive,
  onReveal,
}: {
  brand: CustomerBrand;
  interactive: boolean;
  onReveal?: (node: HTMLElement) => void;
}) {
  return (
    <li
      tabIndex={interactive ? 0 : undefined}
      className={slot}
      onFocus={interactive ? (event) => onReveal?.(event.currentTarget) : undefined}
    >
      <CompanyLogo
        name={brand.name}
        src={brand.src}
        width={brand.width}
        height={brand.height}
        markHeight={brand.markHeight}
      />
    </li>
  );
}

function splitRows(brands: readonly CustomerBrand[]) {
  const mid = Math.ceil(brands.length / 2);
  return [brands.slice(0, mid), brands.slice(mid)] as const;
}

function MovingRow({
  brands,
  direction,
  paused,
}: {
  brands: readonly CustomerBrand[];
  direction: "left" | "right";
  paused: boolean;
}) {
  const gap = 20;
  const { viewportRef, trackRef, groupRef, copies, reveal } = useLogoMarquee(
    gap,
    32,
    direction,
    paused,
  );
  const live = 1;

  return (
    <div className="relative">
      <div ref={viewportRef} className="overflow-hidden py-1">
        <div
          ref={trackRef}
          className="flex w-max items-center"
          style={{ gap, willChange: "transform" }}
        >
          {Array.from({ length: copies }, (_, copy) => (
            <ul
              key={copy}
              ref={copy === live ? groupRef : undefined}
              aria-hidden={copy === live ? undefined : true}
              className="m-0 flex w-max list-none items-center p-0"
              style={{ gap }}
            >
              {brands.map((brand) => (
                <LogoSlot
                  key={`${direction}-${brand.name}-${copy}`}
                  brand={brand}
                  interactive={copy === live}
                  onReveal={reveal}
                />
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-white to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-white to-transparent"
      />
    </div>
  );
}

function StaticRows({ brands }: { brands: readonly CustomerBrand[] }) {
  const rows = splitRows(brands);
  return (
    <div className="flex flex-col gap-1">
      {rows.map((row) => (
        <ul
          key={row[0]?.name}
          className="m-0 flex list-none flex-wrap items-center justify-center gap-x-2 gap-y-1 p-0 sm:gap-x-4"
        >
          {row.map((brand) => (
            <LogoSlot key={brand.name} brand={brand} interactive />
          ))}
        </ul>
      ))}
    </div>
  );
}

export function LogoMarquee({ brands }: { brands: readonly CustomerBrand[] }) {
  const prefersReduced = useReducedMotion();
  const [settled, setSettled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [top, bottom] = splitRows(brands);

  useEffect(() => {
    setSettled(true);
  }, []);

  if (settled && prefersReduced) return <StaticRows brands={brands} />;

  return (
    <div
      className="flex flex-col gap-1"
      onPointerEnter={(event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "touch") setPaused(true);
      }}
      onPointerDown={() => setPaused(true)}
      onPointerUp={(event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "touch") setPaused(false);
      }}
      onPointerCancel={() => setPaused(false)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <MovingRow brands={top} direction="left" paused={paused} />
      <MovingRow brands={bottom} direction="right" paused={paused} />
    </div>
  );
}
