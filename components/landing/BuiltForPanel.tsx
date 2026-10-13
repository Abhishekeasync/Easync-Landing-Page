import {
  Briefcase,
  Buildings,
  ClipboardText,
  Factory,
  Package,
  RocketLaunch,
  Scales,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { BUILT_FOR } from "./content";

const SEGMENT_ICONS: Icon[] = [
  Package,
  Factory,
  Briefcase,
  ClipboardText,
  RocketLaunch,
  Buildings,
  Scales,
];

export function BuiltForPanel() {
  const segments = BUILT_FOR.segments;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <h3 className="m-0 text-lg font-medium tracking-tight text-white sm:text-xl">
          {BUILT_FOR.title}
        </h3>
        <p className="m-0 max-w-md text-xs leading-snug text-slate-500">
          {BUILT_FOR.entityTypes}
        </p>
      </div>

      <div
        className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Who Easync is built for"
      >
        {segments.map((segment, index) => {
          const Icon = SEGMENT_ICONS[index] ?? Package;
          const isWide = index === segments.length - 1;

          return (
            <article
              key={segment.title}
              role="listitem"
              className={`rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 transition-colors hover:border-slate-700 hover:bg-slate-900/50 ${
                isWide ? "sm:col-span-2 lg:col-span-3" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400"
                  aria-hidden
                >
                  <Icon size={20} weight="regular" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-sm font-medium leading-snug text-white">
                    {segment.title}
                  </p>
                  <p className="m-0 mt-1.5 text-xs leading-relaxed text-slate-400">
                    {segment.body}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="m-0 mt-4 border-t border-slate-800 pt-3 text-xs leading-snug text-slate-500">
        {BUILT_FOR.usedBy}
      </p>
    </div>
  );
}
