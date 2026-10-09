export const pageWrap = "mx-auto w-full max-w-[1200px] px-6";

export const greenPill =
  "inline-flex items-center justify-center rounded-full bg-green font-bold text-white no-underline transition-all duration-200 ease-out-expo hover:bg-green-dark hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

export const outlinePill =
  "inline-flex items-center justify-center rounded-full border-2 border-navy bg-white font-bold text-navy no-underline transition-all duration-200 ease-out-expo hover:bg-surface active:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

export const whitePill =
  "inline-flex items-center justify-center rounded-full bg-white font-bold text-navy no-underline transition-all duration-200 ease-out-expo hover:bg-surface active:bg-surface-2";

export const controlClass =
  "w-full min-w-0 rounded-lg border bg-white px-3.5 py-3 text-base font-normal leading-normal text-navy outline-none placeholder:text-muted focus:border-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/25";

export function fieldControlClass(invalid: boolean) {
  return `${controlClass} ${invalid ? "border-danger" : "border-input"}`;
}
