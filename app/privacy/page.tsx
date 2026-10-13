import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Container } from "@/components/landing/primitives";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Easync Books collects and uses information when you request a demo or contact us from our website.",
};

const sections = [
  {
    title: "Who we are",
    body: `Easync Books provides cloud accounting software for Indian businesses and CA firms. If you have questions about this policy, email us at info@easyncbooks.com.`,
  },
  {
    title: "Information we collect",
    body: `When you submit the demo request form on our website, we collect the details you provide: your name, email address, mobile number, type of business, optional description when you select "Other", and optional current accounting tool. We may also record your IP address and the time of submission for security and abuse prevention.`,
  },
  {
    title: "How we use it",
    body: `We use this information to respond to your demo request, call or email you about Easync Books, and follow up on your interest in our product. We do not sell your personal information to third parties.`,
  },
  {
    title: "Legal basis and consent",
    body: `By submitting the form, you agree that we may contact you about Easync Books using the contact details you provided. You can ask us to stop marketing contact at any time by emailing info@easyncbooks.com.`,
  },
  {
    title: "How long we keep it",
    body: `We retain demo requests and related correspondence for as long as needed to manage your inquiry, improve our services, and meet legal or regulatory obligations. When data is no longer required, we delete or anonymise it where practical.`,
  },
  {
    title: "Security",
    body: `We use reasonable technical and organisational measures to protect information we hold. No method of transmission or storage is completely secure; we cannot guarantee absolute security.`,
  },
  {
    title: "Your choices",
    body: `You may request access, correction, or deletion of your personal information, or object to certain processing, by contacting info@easyncbooks.com. We will respond within a reasonable time.`,
  },
  {
    title: "Changes",
    body: `We may update this policy from time to time. The "Last updated" date below reflects the latest version. Continued use of the website after changes means you accept the updated policy.`,
  },
];

export default function PrivacyPage() {
  const lastUpdated = "13 October 2026";

  return (
    <div className="break-words bg-white text-slate-950">
      <Header />
      <main className="border-b border-slate-200">
        <Container className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-medium text-slate-500">
              <Link href="/" className="text-slate-600 no-underline hover:text-slate-950">
                Home
              </Link>
              <span className="mx-2 text-slate-300">/</span>
              Privacy policy
            </p>
            <h1 className="mt-4 text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl">
              Privacy policy
            </h1>
            <p className="mt-3 text-sm text-slate-500">Last updated: {lastUpdated}</p>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              This policy explains how Easync Books handles personal information when you
              use our marketing website and submit a demo request.
            </p>

            <div className="mt-10 flex flex-col gap-8">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-lg font-medium tracking-tight text-slate-950">
                    {section.title}
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <p className="mt-12 border-t border-slate-200 pt-8 text-sm text-slate-500">
              Contact:{" "}
              <a
                href="mailto:info@easyncbooks.com"
                className="text-slate-700 underline underline-offset-2 hover:text-slate-950"
              >
                info@easyncbooks.com
              </a>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
