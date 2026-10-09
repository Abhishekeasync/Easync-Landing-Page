"use client";

export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute -top-[20%] -right-[10%] h-[70%] w-[70%] opacity-30"
        viewBox="0 0 400 400"
        fill="none"
      >
        <defs>
          <linearGradient
            id="heroGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#7fd49b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1c4fa8" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#heroGradient)" />
      </svg>
    </div>
  );
}
