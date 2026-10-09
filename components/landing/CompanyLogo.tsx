"use client";

import { useEffect, useRef, useState } from "react";

type CompanyLogoProps = {
  name: string;
  src?: string;
  width?: number;
  height?: number;
  markHeight?: number;
};

function wordmarkSize(name: string) {
  const words = name.split(/\s+/);
  if (name.length > 16 || words.length > 2) {
    return "text-sm leading-[1.15] sm:text-[15px]";
  }
  if (words.length === 1) {
    return "text-base leading-none sm:text-lg";
  }
  return "text-[15px] leading-[1.15] sm:text-base";
}

function BrandWordmark({ name }: { name: string }) {
  return (
    <span
      className={`block max-w-full text-balance text-center font-display font-semibold tracking-[-0.03em] text-slate-900 ${wordmarkSize(name)}`}
    >
      {name}
    </span>
  );
}

export function CompanyLogo({
  name,
  src,
  width,
  height,
  markHeight = 56,
}: CompanyLogoProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const showImage = Boolean(src) && !failed;

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  return (
    <div
      className="flex h-full w-full items-center justify-center px-1"
      style={{ "--mark-h": `${markHeight}px` } as React.CSSProperties}
    >
      {showImage ? (
        // Brand files are already sized assets; a fixed slot handles layout.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={name}
          width={width}
          height={height}
          draggable={false}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          onLoad={(event) => {
            if (event.currentTarget.naturalWidth === 0) setFailed(true);
          }}
          className="h-[calc(var(--mark-h)*0.78)] w-auto max-w-full object-contain object-center sm:h-[calc(var(--mark-h)*0.9)] lg:h-(--mark-h)"
        />
      ) : (
        <BrandWordmark name={name} />
      )}
    </div>
  );
}
