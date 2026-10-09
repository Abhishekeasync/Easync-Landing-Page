import { customerLogos } from "./content";
import { LogoMarquee } from "./LogoMarquee";
import { Container, Section } from "./primitives";

export function TrustSection() {
  return (
    <Section className="border-b border-slate-200 bg-white" id="customers">
      <Container>
        <div className="flex flex-col items-center gap-4 py-8 md:py-10">
          <p className="m-0 text-center text-sm text-slate-600">
            Used by businesses and CA firms across India
          </p>
          <div className="w-full" role="region" aria-label="Customer logos">
            <LogoMarquee brands={customerLogos} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
