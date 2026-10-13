import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { HERO_SECTION, SIGN_UP_URL } from "./content";
import { HeroGoogleReviews } from "./HeroGoogleReviews";
import { Button } from "./primitives";
import { Eyebrow } from "./SectionHeading";

export function HeroLead() {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="reveal-up">
        <Eyebrow label={HERO_SECTION.eyebrowLabel}>
          {HERO_SECTION.eyebrow}
        </Eyebrow>
      </div>

      <div className="reveal-up" style={{ animationDelay: "0.05s" }}>
        <h1 className="max-w-xl text-balance text-4xl font-medium tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.08]">
          {HERO_SECTION.title}{" "}
          <span className="text-slate-500">{HERO_SECTION.titleAccent}</span>
        </h1>
      </div>

      <div className="reveal-up" style={{ animationDelay: "0.1s" }}>
        <p className="max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
          {HERO_SECTION.description}
        </p>
      </div>

      <div className="reveal-up" style={{ animationDelay: "0.15s" }}>
        <ul className="m-0 flex list-none flex-col gap-2 p-0 text-sm text-slate-700">
          {HERO_SECTION.checks.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <CheckCircle
                size={18}
                weight="fill"
                className="shrink-0 text-emerald-600"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="reveal-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button href={SIGN_UP_URL} variant="primary" size="lg">
            Start 3-month free trial <ArrowRight size={16} weight="bold" />
          </Button>
          <Button href="#demo" variant="outline" size="lg">
            Book a free demo
          </Button>
        </div>
        <p className="mt-4 text-sm text-slate-500">{HERO_SECTION.trustLine}</p>
        <div className="mt-3">
          <HeroGoogleReviews />
        </div>
      </div>
    </div>
  );
}
