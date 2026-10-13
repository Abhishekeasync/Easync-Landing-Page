import { DemoForm } from "./DemoForm";
import { HeroLead } from "./HeroLead";

export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid w-full min-w-0 max-w-[1120px] items-start gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,440px)] lg:gap-16 lg:py-24">
        <HeroLead />
        <div className="reveal-fade w-full" style={{ animationDelay: "0.12s" }}>
          <DemoForm />
        </div>
      </div>
    </section>
  );
}
