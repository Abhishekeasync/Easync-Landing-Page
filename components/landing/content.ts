/** Official Easync Books WhatsApp, India, digits only. */
export const WHATSAPP_NUMBER = "918287858780";

export const WHATSAPP_DISPLAY = "+91 82878 58780";

export const WHATSAPP_MESSAGE =
  "Hi Easync Books team, I'd like to learn more about your accounting software and its features.";

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const BUSINESS_TYPES = [
  "Trader / Distributor",
  "Manufacturer",
  "Service business",
  "Startup",
  "CA / Accounting firm",
] as const;

export const TURNOVER_OPTIONS = [
  "Below ₹40 lakh",
  "₹40 lakh – ₹5 crore",
  "Above ₹5 crore",
] as const;

export const ACCOUNTS_OPTIONS = [
  "Excel / manual",
  "Tally",
  "Other software",
  "Not started yet",
] as const;

export const painPoints = [
  {
    title: "Payment agle hafte kar denge.",
    body: "See exactly who owes you, how much, and for how many days. Know whom to call first.",
  },
  {
    title: "Called your accountant three times this week?",
    body: "Check sales, expenses and pending payments yourself, anytime. No calls, no waiting.",
  },
  {
    title: "Godown mein kitna maal hai?",
    body: "Track stock across every godown and branch in real time. Stop guessing, start knowing.",
  },
] as const;

export const features = [
  {
    number: "01",
    title: "GST Analysis Tool",
    body: "Upload your GST data and get a clear analysis report in minutes. Spot problems before filing day.",
    icon: "chart",
  },
  {
    number: "02",
    title: "E-invoicing & e-way bills",
    body: "Generate GST-compliant e-invoices and e-way bills from your billing, without entering data twice.",
    icon: "invoice",
  },
  {
    number: "03",
    title: "Advanced inventory",
    body: "Stock across every godown and branch, stock transfers and real stock value, always in sync.",
    icon: "warehouse",
  },
  {
    number: "04",
    title: "Aging reports",
    body: "Who owes you and who you owe, sorted by 30, 60 and 90+ days. Collect faster.",
    icon: "clock",
  },
  {
    number: "05",
    title: "TDS reports",
    body: "Every deduction tracked in one report, ready when your CA files the quarterly return.",
    icon: "table",
  },
  {
    number: "06",
    title: "Compliance reminders & audit trail",
    body: "GST, TDS and MCA due dates on your dashboard, and a record of every change in your books.",
    icon: "shield",
  },
] as const;

export type FeatureIcon = (typeof features)[number]["icon"];

export type Plan = {
  name: string;
  audience: string;
  yearlyPrice: string;
  yearlyBilling: string;
  monthlyPrice: string;
  entities: string;
  users: string;
  popular: boolean;
  features: readonly string[];
};

export const plans: readonly Plan[] = [
  {
    name: "Basic",
    audience: "For startups and small businesses",
    yearlyPrice: "₹1,250",
    yearlyBilling: "Billed ₹14,999 yearly",
    monthlyPrice: "₹1,499",
    entities: "1 entity",
    users: "2 users",
    popular: false,
    features: ["GST filings", "Inventory", "E-way bills", "Audit trail"],
  },
  {
    name: "Professional",
    audience: "For growing MSMEs that need e-invoicing",
    yearlyPrice: "₹2,333",
    yearlyBilling: "Billed ₹27,999 yearly",
    monthlyPrice: "₹2,799",
    entities: "3 entities",
    users: "4 users / entity",
    popular: true,
    features: [
      "Everything in Basic",
      "E-invoicing",
      "Direct share",
      "Multi-user access",
    ],
  },
  {
    name: "Entity",
    audience: "For business groups with multiple GSTNs",
    yearlyPrice: "₹4,083",
    yearlyBilling: "Billed ₹48,999 yearly",
    monthlyPrice: "₹4,899",
    entities: "8 entities",
    users: "6 users / entity",
    popular: false,
    features: [
      "Everything in Professional",
      "Multiple GSTNs",
      "GSTR-2B reconciliation",
      "Auto reco & auto feed",
    ],
  },
  {
    name: "CA Special",
    audience: "For CAs managing client books",
    yearlyPrice: "₹1,967",
    yearlyBilling: "Billed ₹23,600 yearly",
    monthlyPrice: "₹2,359",
    entities: "25 entities",
    users: "2 users / entity",
    popular: false,
    features: [
      "Multiple GSTNs",
      "GSTR-2B reconciliation",
      "Auto reco",
      "E-invoicing & e-way bills",
    ],
  },
];

export const faqs = [
  {
    question: "How does the 3-month free trial work?",
    answer:
      "Pick any plan and use it free for 3 months with your real business data. No card is required to start. After 3 months, choose to continue or export your data.",
  },
  {
    question: "Can I move my data from Tally or Excel?",
    answer:
      "Yes. Our team helps import your masters, opening balances and recent transactions so you do not start from zero.",
  },
  {
    question: "Do I need accounting knowledge to use it?",
    answer:
      "No. Easync Books is built for business owners. Your accountant can work in the same system for filings and compliance.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your data is encrypted, access is role-based, and every change is recorded in an audit trail.",
  },
  {
    question: "What happens on the demo call?",
    answer:
      "A 20-minute walkthrough of the features that matter to your business, and answers to your questions. No obligation.",
  },
] as const;

export const audienceStats = [
  { value: "CA-built", label: "by practising Chartered Accountants" },
  { value: "100+", label: "businesses served" },
  { value: "Cloud", label: "access from laptop or phone" },
  { value: "Multi-GSTN", label: "entities and branches, one login" },
] as const;

export const testimonials = [
  {
    quote:
      "We stopped chasing payments blindly. The aging report tells us exactly which bills to follow up on every Monday.",
    name: "Ramesh Gupta",
    role: "Proprietor",
    company: "Gupta Electricals, Delhi",
    initial: "RG",
  },
  {
    quote:
      "Month-end used to take four days. Now I reconcile bank, GST and inventory in one afternoon.",
    name: "Priya Mehta",
    role: "Finance Head",
    company: "Mehta Polymers, Ahmedabad",
    initial: "PM",
  },
  {
    quote:
      "I manage 18 clients in one login. Auto reconciliation and GSTR-2B matching alone save 30 hours a month.",
    name: "CA Shubham Teotia",
    role: "Founder",
    company: "Teotia & Co.",
    initial: "ST",
  },
] as const;

export type CustomerBrand = {
  name: string;
  /** Public path. Omit when no verified logo file exists. */
  src?: string;
  width?: number;
  height?: number;
  /** Rendered image height that equalizes the visible mark, ignoring empty canvas. */
  markHeight?: number;
};

/**
 * Customer marks from public/Companies_logo. Easync_Logo.webp is the product
 * mark and stays in the header, not in this list.
 * Names without `src` render as typographic wordmarks.
 */
export const customerLogos: readonly CustomerBrand[] = [
  {
    name: "Dharma Motors",
    src: "/Companies_logo/Dharma-motors.webp",
    width: 384,
    height: 424,
    markHeight: 111,
  },
  { name: "Prison Point" },
  {
    name: "KLK Ventures",
    src: "/Companies_logo/KLK.webp",
    width: 447,
    height: 447,
    markHeight: 109,
  },
  { name: "Thalvian Ventures" },
  {
    name: "Verdeshell",
    src: "/Companies_logo/verdeshell_logo.webp",
    width: 400,
    height: 400,
    markHeight: 61,
  },
  { name: "Marvellous" },
  {
    name: "Tryab Infra",
    src: "/Companies_logo/Tryab.webp",
    width: 707,
    height: 353,
    markHeight: 88,
  },
  {
    name: "Shiv International",
    src: "/Companies_logo/Shiv-Int.webp",
    width: 391,
    height: 123,
    markHeight: 48,
  },
  { name: "Ishu Job Works" },
  {
    name: "Wintex Trading Hub",
    src: "/Companies_logo/Wintex.webp",
    width: 500,
    height: 500,
    markHeight: 79,
  },
  { name: "Let's Aim It" },
  {
    name: "Source Wise",
    src: "/Companies_logo/sourcewise.webp",
    width: 1024,
    height: 1024,
    markHeight: 79,
  },
  {
    name: "Vyom Drones",
    src: "/Companies_logo/Vyom-Drone.webp",
    width: 250,
    height: 68,
    markHeight: 43,
  },
];
