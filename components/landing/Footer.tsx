import { WHATSAPP_DISPLAY, WHATSAPP_HREF } from "./content";
import { Container } from "./primitives";
import { WhatsAppMark } from "./WhatsAppButton";

const footerLinks = [
  // { label: "Features", href: "#features" },
  // { label: "Product", href: "#product-demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "Book a demo", href: "#demo" },
  { label: "FAQ", href: "#faq" },
  { label: "Privacy policy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-[minmax(0,1.4fr)_auto_auto] md:py-14">
          <div className="max-w-sm">
            <a href="https://easyncbooks.com" className="inline-flex shrink-0 items-center no-underline">
              <img
                src="/logos/Easync_Logo.webp"
                alt="Easync Books"
                width={490}
                height={470}
                loading="lazy"
                decoding="async"
                className="h-16 w-auto brightness-0 invert"
              />
            </a>
            <p className="mt-4 text-sm leading-relaxed">
              Compliance-first accounting for Indian MSMEs and CA firms.
          
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="py-1 text-sm text-slate-400 no-underline hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="text-sm leading-relaxed">
            <p className="m-0 text-white">Easync Books</p>
            <p className="mt-2">info@easyncbooks.com</p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 inline-flex items-center gap-2.5 text-slate-200 no-underline hover:text-white"
            >
              <WhatsAppMark size="md" />
              <span className="leading-tight">
                <span className="block text-sm">Chat on WhatsApp</span>
                <span className="mt-0.5 block text-xs text-slate-400 group-hover:text-slate-300">
                  {WHATSAPP_DISPLAY}
                </span>
              </span>
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800 py-5 pb-20 text-xs text-slate-500 sm:pb-5">
          © {new Date().getFullYear()} Easync Books. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
