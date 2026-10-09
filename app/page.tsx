import type { Metadata } from "next";
import { FreeDemoPage } from "@/components/landing/FreeDemoPage";

export const metadata: Metadata = {
  title: "Easync Books – Free Demo",
  description:
    "Book a free demo of Easync Books. Compliance-first accounting for growing businesses, with 3 months free on every plan.",
};

export default function Home() {
  return <FreeDemoPage />;
}
