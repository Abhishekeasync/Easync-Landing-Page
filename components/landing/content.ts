/** Official Easync Books WhatsApp, India, digits only. */
export const WHATSAPP_NUMBER = "918287858780";

export const WHATSAPP_DISPLAY = "+91 82878 58780";

export const WHATSAPP_MESSAGE =
  "Hi Easync Books team, I'd like to learn more about your accounting software and its features.";

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const SIGN_IN_URL = "https://www.easyncbooks.com/signin";
export const SIGN_UP_URL = "https://www.easyncbooks.com/signup";

export const START_TRIAL_CTA_LABEL = "Start your 3-month free trial";
export const NO_CARD_REQUIRED_NOTE = "No card required";

export const PRICING_SECTION = {
  eyebrowLabel: "Pricing",
  eyebrow: "3 months free, then a clear bill",
  title: "Pick your plan.",
  titleAccent: "Use it free for 3 months.",
  description:
    "Run your real books on Easync before you pay a rupee. Plans for one GSTIN, a growing business group or a whole CA practice. Prices exclude GST.",
  trialBanner: {
    months: "3",
    monthsLabel: "Months",
    title: "Free on every plan",
    detail: "No card to start · Free Tally & Excel migration",
    perks: [
      {
        id: "no-card",
        label: "No card to start",
        hint: "Start the trial without payment details.",
      },
      {
        id: "migration",
        label: "Free Tally & Excel migration",
        hint: "Opening balances and masters moved at no extra cost.",
      },
    ],
  },
} as const;

export const HERO_SECTION = {
  eyebrowLabel: "CA-built",
  eyebrow: "Built by Chartered Accountants",
  title: "Compliance-first accounting",
  titleAccent: "for growing Indian businesses.",
  description:
    "Raise GST invoices, track stock and see who owes you, all in one place. Know your numbers anytime, without calling your accountant.",
  trustLine: "Trusted by 100+ businesses and CA firms",
  checks: [
    "3-month free trial, all features",
    "Free data import from Tally and Excel",
    "GST, TDS and MCA compliance built in",
  ],
} as const;

/** Hero / trust — update when live Google Business rating is confirmed */
export const GOOGLE_REVIEWS = {
  rating: 5,
  label: "5.0 on Google",
  reviewCount: "Google Reviews",
} as const;

export const OTHER_BUSINESS_TYPE = "Other";

export const BUSINESS_TYPES = [
  "Trader / Distributor",
  "Manufacturer",
  "Service business",
  "Startup",
  "CA / Accounting firm",
  OTHER_BUSINESS_TYPE,
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

export type WhySwitchWidget = "aging" | "dashboard" | "inventory";

export const WHY_SWITCH = {
  eyebrowLabel: "Why switch",
  eyebrow: "Why businesses switch to Easync",
  title: "Stop chasing your numbers.",
  titleAccent: "Easync shows them to you.",
  description:
    "Most business owners find out how their business is doing only when the accountant sends a report. Easync puts the answers you need every week on one screen, updated as you work.",
} as const;

export const SWITCH_NUMBERS_CTA = {
  eyebrow: "3 months free",
  title: "See your own numbers",
  titleAccent: "this way.",
  description: "Try it free for 3 months, or let us walk you through it.",
} as const;

export const whySwitchCards = [
  {
    problemQuote: "Payment agle hafte kar denge.",
    problemBody:
      "You hear it every week, and you're never sure how much money is actually stuck with customers.",
    solutionTitle: "Know who owes you, and since when",
    solutionBody:
      "Every customer's pending amount, sorted by how late it is. Call the oldest dues first.",
    linkLabel: "Aging reports",
    widget: "aging" as WhySwitchWidget,
    widgetTitle: "Pending from customers",
  },
  {
    problemQuote: "Called your accountant three times this week?",
    problemBody: "Just to ask last month's sales, or whether a customer has paid.",
    solutionTitle: "Your numbers, on your phone",
    solutionBody:
      "Sales, expenses and pending payments, live. Your accountant still handles the filings.",
    linkLabel: "Live dashboard",
    widget: "dashboard" as WhySwitchWidget,
    widgetTitle: "This month",
  },
  {
    problemQuote: "Godown mein kitna maal hai?",
    problemBody: "The stock register says one thing. The godown says another.",
    solutionTitle: "Stock you can trust, in every godown",
    solutionBody:
      "Live stock for each godown and branch, with transfers and real stock value.",
    linkLabel: "Advanced inventory",
    widget: "inventory" as WhySwitchWidget,
    widgetTitle: "Stock by godown",
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
    features: [
      "GST filings",
      "Inventory",
      "E-way bills",
      "Audit trail",
    ],
  },
  {
    name: "Professional",
    audience: "For growing MSMEs that need e-invoicing",
    yearlyPrice: "₹2,333",
    yearlyBilling: "Billed ₹27,999 yearly",
    monthlyPrice: "₹2,799",
    entities: "3 entities",
    users: "4 users per entity",
    popular: true,
    features: [
      "GST filings",
      "Inventory",
      "E-way bills",
      "Audit trail",
      "E-invoicing",
      "Direct share",
    ],
  },
  {
    name: "Entity",
    audience: "For business groups with multiple GSTNs",
    yearlyPrice: "₹4,083",
    yearlyBilling: "Billed ₹48,999 yearly",
    monthlyPrice: "₹4,899",
    entities: "8 entities",
    users: "6 users per entity",
    popular: false,
    features: [
      "GST filings",
      "Inventory",
      "E-way bills",
      "Audit trail",
      "E-invoicing",
      "Direct share",
      "Multiple GSTNs",
      "GSTR-2B reconciliation",
      "Auto reco",
      "Auto feed",
    ],
  },
  {
    name: "CA Special",
    audience: "For CAs managing client books",
    yearlyPrice: "₹1,967",
    yearlyBilling: "Billed ₹23,600 yearly",
    monthlyPrice: "₹2,359",
    entities: "25 client entities",
    users: "2 users per entity",
    popular: false,
    features: [
      "GST filings",
      "Inventory",
      "E-way bills",
      "Audit trail",
      "E-invoicing",
      "Direct share",
      "Multiple GSTNs",
      "GSTR-2B reconciliation",
      "Auto reco",
    ],
  },
];

export const PLAN_INCLUDES = {
  title: "Every plan includes",
  features: [
    "3-month free trial",
    "Free Tally & Excel migration",
    "GST invoices, quotations, credit & debit notes",
    "P&L, balance sheet & aging reports",
    "Cloud access on laptop & phone",
    "Role-based access",
    "Export your data anytime",
  ],
  helpText:
    "Not sure which plan fits? We'll help you choose on a free 20-minute call.",
  demoLinkLabel: "Book a free demo",
} as const;

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

export const INDIA_SECTION = {
  eyebrowLabel: "India",
  eyebrow: "GST, TDS and MCA built in",
  title: "Made for Indian businesses",
  titleAccent: "that run on GST.",
  description:
    "Whether you sell from one shop, ship from three godowns or manage books for 25 clients, Easync handles invoicing, GST, TDS and MCA compliance in one login.",
} as const;

export const audienceStats = [
  {
    value: "CA-built",
    label: "Built by practising Chartered Accountants",
  },
  { value: "100+", label: "Businesses and CA firms using Easync" },
  { value: "Anywhere", label: "Laptop or phone, office or godown" },
  {
    value: "Multi-GSTN",
    label: "All your entities and branches, one login",
  },
] as const;

export const BUILT_FOR = {
  title: "Built for",
  segments: [
    {
      title: "Traders, wholesalers & distributors",
      body: "Stock, e-way bills and customer dues",
    },
    {
      title: "Manufacturers & job-work units",
      body: "Multiple godowns, purchases and stock value",
    },
    {
      title: "Service businesses & agencies",
      body: "GST invoicing and payment tracking",
    },
    {
      title: "Consultants & professional firms",
      body: "Clean billing and TDS records",
    },
    {
      title: "Startups",
      body: "Books set up right from the first invoice",
    },
    {
      title: "Business groups",
      body: "Multiple companies and GSTNs under one login",
    },
    {
      title: "CA firms & tax consultants",
      body: "Client books, filings and reconciliations in one place",
    },
  ],
  entityTypes:
    "Proprietorships · Partnerships · LLPs · Private Limited companies",
  usedBy:
    "Used by business owners, finance heads, in-house accountants and CAs.",
} as const;

export const CUSTOMER_RESULTS = {
  eyebrowLabel: "Customers",
  eyebrow: "Customer results",
  title: "Real businesses.",
  titleAccent: "Real hours back.",
  description:
    "What changed for owners and CA firms once their books moved to Easync, in their own words.",
  footerBold: "100+ businesses and CA firms",
  footerRest: "already running their books on Easync.",
} as const;

export const customerStories = [
  {
    headline: "Records when you need them",
    quote:
      "For us, accounting is not just about recording transactions; it is about having information properly organized whenever we need to review it. Easync Books has helped us bring our day-to-day accounting activities into a much more structured system. Transactions, records, and other financial information are easier to maintain and refer back to without having to search through different files or sources. The overall experience has been straightforward, and it has helped us maintain better consistency in the way we manage our business accounts.",
    name: "Manish Gupta",
    role: "Director",
    company: "SourceWise Solutions",
    photo: "/Clients_Photos/Manish.webp",
  },
  {
    headline: "Simple and efficient",
    quote:
      "Easync Books accounting software is very helpful, user-friendly, and easy to use. It makes accounting tasks simple and efficient.",
    name: "Vishal Tripathi",
    role: "Partner",
    company: "Ishu Jobworks LLP",
    photo: "/Clients_Photos/Vishal.webp",
  },
  {
    headline: "Organized in one place",
    quote:
      "We wanted accounting software that was simple, practical, and efficient. Easync Books has met our expectations by making everyday accounting easier and keeping financial records and transactions organized in one place. Its user-friendly approach fits seamlessly into our daily operations, allowing our team to focus more on business growth and less on managing software.",
    name: "Thakur Raj Kumar Singh",
    role: "Director",
    company: "Tryab",
    photo: "/Clients_Photos/Raj%20Kumar.webp",
  },
  {
    headline: "More time for the business",
    quote:
      "As the founder of Wintex Trading Hub, I wanted an accounting solution that was simple, reliable, and easy to manage alongside our daily business operations. Easync Books has helped us keep our financial records organized, manage transactions efficiently, and maintain better visibility over our finances. Its straightforward approach makes accounting less time-consuming, allowing us to focus more on growing our business.",
    name: "Sunny Kumar Ray",
    role: "Founder",
    company: "Wintex Trading Hub",
    photo: "/Clients_Photos/Sunny.webp",
  },
] as const;

export type FounderTextPart = { text: string; bold?: boolean };

export const FOUNDER_LINKEDIN_URL =
  "https://www.linkedin.com/in/shubhamteotia/";

export const FOUNDER_SECTION = {
  eyebrowLabel: "Founder",
  eyebrow: "A practising Chartered Accountant",
  titleLead: `I built the software`,
  titleAccent: "I wished my clients already had.",
  bodyParagraphs: [
    [
      {
        text:
          "For 10+ years, I've handled GST, taxation and virtual-CFO work for startups, manufacturers and growing businesses. Every month, I saw the same problems: ",
      },
      {
        text:
          "missed due dates, GSTR-2B mismatches, bills arriving on WhatsApp, and owners who couldn't see their own numbers",
        bold: true,
      },
      { text: " without calling my firm." },
    ],
    [{ text: "Easync Books is the fix I built for them." }],
  ],
  name: "CA Shubham Teotia",
  roleLine: "Founder, Easync Books",
  credentials: [
    "Chartered Accountant, ICAI",
    "10+ years in practice",
    "GST & taxation specialist",
    "Virtual CFO for growing businesses",
  ],
  pillars: [
    {
      icon: "hexagon" as const,
      title: "Built for Indian rules",
      body:
        "GST, TDS and MCA designed in from day one, not adapted from foreign software.",
    },
    {
      icon: "list" as const,
      title: "Tested on real books",
      body: "Every feature is used on live client books before it reaches you.",
    },
    {
      icon: "chat" as const,
      title: "Support that speaks accounts",
      body: "Talk to people who understand GST and books, not just software.",
    },
  ],
  demoCta: "Talk to our team: Book a free demo",
  linkedInLabel: "Connect with Shubham on LinkedIn",
  imageSrc: "/Founder/Shubham.webp",
  imageAlt: "CA Shubham Teotia, founder of Teotia & Co.",
} as const;

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
