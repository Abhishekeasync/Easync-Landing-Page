import { audienceStats, INDIA_SECTION } from "./content";
import { BuiltForPanel } from "./BuiltForPanel";
import { Container, Reveal, Section } from "./primitives";
import { Eyebrow } from "./SectionHeading";

export function Audience() {
  return (
    <Section
      background="ink"
      className="border-b border-slate-800 py-20 text-white md:py-28"
    >
      <Container>
        <div className="flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-xl flex-col gap-4">
              <Reveal>
                <Eyebrow label={INDIA_SECTION.eyebrowLabel} tone="dark">
                  {INDIA_SECTION.eyebrow}
                </Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  {INDIA_SECTION.title}{" "}
                  <span className="text-slate-500">
                    {INDIA_SECTION.titleAccent}
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base leading-relaxed text-slate-400">
                  {INDIA_SECTION.description}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.08} className="w-full lg:max-w-xl">
              <dl className="m-0 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {audienceStats.map((stat) => (
                  <div
                    key={stat.value}
                    className="rounded-lg border border-slate-800 bg-slate-950/80 p-3.5"
                  >
                    <dt className="text-sm font-medium text-white">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-slate-400">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <BuiltForPanel />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
