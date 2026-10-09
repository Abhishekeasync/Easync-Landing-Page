import { Audience } from "./Audience";
import { Benefits } from "./Benefits";
import { CTASection } from "./CTASection";
import { Faq } from "./Faq";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { Founder } from "./Founder";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Pricing } from "./Pricing";
import { ProductPreview } from "./ProductPreview";
import { Testimonials } from "./Testimonials";
import { TrustSection } from "./TrustSection";
import { WhatsAppButton } from "./WhatsAppButton";

export function FreeDemoPage() {
  return (
    <div className="break-words bg-white text-slate-950">
      <Header />
      <main>
        <Hero />
        <TrustSection />
        <Benefits />
        <Features />
        <Testimonials />
        <Audience />
        <ProductPreview />
        <Pricing />
        <Founder />
        <Faq />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
