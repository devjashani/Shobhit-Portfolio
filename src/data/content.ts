export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sparkline: number[];
  color: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  progressPercent: number;
  highlight: string;
}

export interface ExperienceItem {
  id: string;
  index: string;
  role: string;
  company: string;
  period: string;
  location: string;
  tags: string[];
  bullets: string[];
}

export interface ValuationRange {
  method: string;
  low: number;
  mid: number;
  high: number;
  format: string;
}

export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  companyOrFocus: string;
  summary: string;
  bullets: string[];
  tags: string[];
  illustrativeNote: string;
  valuationRanges?: ValuationRange[];
  stepperSteps?: { title: string; description: string }[];
  chartData?: {
    categories: { name: string; share: number; color: string }[];
    monthlyVolume: { month: string; value: number }[];
  };
}

export interface SkillCategory {
  category: string;
  code: string;
  skills: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  code: string;
  verifiedBadge?: string;
}

export interface ResponsibilityItem {
  id: string;
  role: string;
  organization: string;
  description: string;
  tag: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Shobhit Nandwana",
    firstName: "Shobhit",
    lastName: "Nandwana",
    badge: "PGDM Finance · IMT Ghaziabad",
    eyebrow: "FINANCE / RESEARCH / INVESTMENTS",
    heroIntro:
      "Finance postgraduate (PGDM Finance, IMT Ghaziabad) and Senior Research Fellow at Campus Consortium Foundation, turning research into clear investment notes.",
    rotatingRoles: [
      "Asset Management",
      "Equity Research",
      "Investment Analysis",
      "Valuation",
      "FP&A",
    ],
    openToRoles: [
      "Asset Management",
      "Hedge Funds",
      "Private Equity",
      "Private Credit",
    ],
    cvUrl: "/Shobhit_Nandwana_CV_Revised.pdf",
    phone: "+91-7665522177",
    phoneTel: "tel:+917665522177",
    email: "shobhitnandwana2001@gmail.com",
    emailMailto: "mailto:shobhitnandwana2001@gmail.com",
    linkedIn: "linkedin.com/in/Shobhit-Nandwana",
    linkedInUrl: "https://linkedin.com/in/Shobhit-Nandwana",
    location: "India (Gurugram / Jaipur)",
  },

  heroStats: [
    {
      id: "stat-1",
      value: 10,
      suffix: "",
      label: "interns led",
      sparkline: [3, 4, 6, 8, 9, 10],
      color: "#2B4BFF",
    },
    {
      id: "stat-2",
      value: 10000,
      suffix: "+",
      label: "transactions analysed",
      sparkline: [1200, 3100, 4800, 7200, 8900, 10000],
      color: "#2B4BFF",
    },
    {
      id: "stat-3",
      value: 10,
      suffix: "+",
      label: "financial ratios applied",
      sparkline: [4, 6, 7, 8, 9, 11],
      color: "#2B4BFF",
    },
    {
      id: "stat-4",
      value: 6,
      suffix: "",
      prefix: "",
      label: "EdTech ideas toward $30M ARR",
      sparkline: [1, 2, 3, 4, 5, 6],
      color: "#2B4BFF",
    },
  ] as StatItem[],

  about: {
    summary:
      "Finance postgraduate (PGDM Finance, IMT Ghaziabad, 2024 to 2026), currently working as a Senior Research Fellow at Campus Consortium Foundation. Prior internship experience in investment research and valuation at an international family office, along with financial planning and analysis experience in Dubai and India. Comfortable with company and sector research, financial statement analysis, financial modelling and valuations, and enjoys turning research into clear investment notes. Looking to build a long term career in Asset Management, Hedge Funds, Private Equity or Private Credit.",
    education: [
      {
        degree: "PGDM (Finance)",
        institution: "Institute of Management Technology (IMT), Ghaziabad",
        period: "2024 – 2026",
        location: "Ghaziabad, India",
        progressPercent: 85,
        highlight: "Advanced Corporate Valuation, Asset Management & Investment Strategy",
      },
      {
        degree: "BBA (Finance)",
        institution: "Maharishi Arvind University, Jaipur",
        period: "2020 – 2023",
        location: "Jaipur, India",
        progressPercent: 100,
        highlight: "Foundational Corporate Accounting, Financial Markets & Statistics",
      },
    ] as EducationItem[],
    focusAreas: [
      { name: "Asset Management", code: "AM" },
      { name: "Hedge Funds", code: "HF" },
      { name: "Private Equity", code: "PE" },
      { name: "Private Credit", code: "PC" },
    ],
  },

  experience: [
    {
      id: "exp-1",
      index: "01",
      role: "Senior Research Fellow",
      company: "Campus Consortium Foundation (CCF)",
      period: "Jul 2026 – Present",
      location: "Gurugram, India",
      tags: ["Fund Research", "White Papers", "LP Evaluation"],
      bullets: [
        "Research investment opportunities and evaluate funds across AI, EdTech, Higher Education and Enterprise Software, supporting PMS strategy reviews, trust portfolio decisions and prospective LP fund evaluations.",
        "Write CCF's White Papers, Impact Reports and Definitive Guides, including a case study on Bethune-Cookman University and two guides for the BlackBeltHelp workstream.",
        "Developed 6 EdTech business ideas targeting $30M ARR across the US, India and cross-border markets, and maintain a tracker of fintech and AI funds to support screening.",
        "Build outreach lists of HR and leadership contacts across NCR technology, logistics and corporate companies, and support CCF's research documentation on SharePoint.",
      ],
    },
    {
      id: "exp-2",
      index: "02",
      role: "Research Analyst Intern",
      company: "Regarde Familia (International Family Office)",
      period: "2026",
      location: "Remote",
      tags: ["Manager Benchmarking", "Due Diligence", "Sector Research"],
      bullets: [
        "Researched and evaluated PMS, AIF and mutual fund strategies, benchmarking managers and portfolios to support investment decisions.",
        "Studied high growth sectors such as Carbon Nanotubes, Graphene and Advanced Materials, and wrote investment reports for senior stakeholders.",
        "Prepared due diligence notes and investment questionnaires, and joined meetings with VC firms and fund managers to gather market insights.",
      ],
    },
    {
      id: "exp-3",
      index: "03",
      role: "Finance Intern",
      company: "Bright Dynamics IT Consultancy LLC",
      period: "May to Aug 2025",
      location: "Dubai, UAE",
      tags: ["Financial Modelling", "FP&A", "Excel Dashboards"],
      bullets: [
        "Built financial models and venture budgets using cash flow forecasts, break even analysis and working capital reviews.",
        "Prepared FP&A and management reporting packages for senior leadership to support capital budgeting decisions.",
        "Designed Excel dashboards with VLOOKUP, pivot tables and macros for budget tracking and data consolidation.",
      ],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "proj-1",
      code: "FIG. 1 / RESEARCH",
      title: "Equity Research: Apollo Tyres and Devyani International",
      companyOrFocus: "Automotive Tyres & QSR Industry Coverage",
      summary: "Comprehensive valuation and comparative financial modeling thesis.",
      bullets: [
        "Built an investment thesis for both companies based on industry structure, competitive position and growth drivers.",
        "Analysed the companies using over 10 financial ratios, and applied DCF, EV/EBITDA and P/E valuation methods.",
        "Benchmarked them against sector peers and presented a final investment recommendation with a target price range.",
      ],
      tags: ["DCF", "EV/EBITDA", "P/E", "Peer Benchmarking"],
      illustrativeNote: "Illustrative, not actual figures",
      valuationRanges: [
        { method: "DCF Model (WACC 11.2%)", low: 480, mid: 540, high: 610, format: "₹" },
        { method: "EV / EBITDA (11.5x - 14.0x)", low: 510, mid: 565, high: 630, format: "₹" },
        { method: "P / E Multiple (22.0x - 26.5x)", low: 495, mid: 550, high: 595, format: "₹" },
        { method: "Peer 52W Benchmark Range", low: 440, mid: 535, high: 580, format: "₹" },
      ],
      stepperSteps: [
        {
          title: "Thesis",
          description: "Deconstructed industry structure, capacity expansions, raw material cyclicity, and competitive moats.",
        },
        {
          title: "Valuation",
          description: "Applied DCF, EV/EBITDA multiples, and P/E relative benchmarks across 10+ core financial ratios.",
        },
        {
          title: "Recommendation",
          description: "Synthesized valuation ranges into an actionable price corridor with clear margin of safety thresholds.",
        },
      ],
    },
    {
      id: "proj-2",
      code: "FIG. 2 / ANALYTICS",
      title: "Sales Analytics Dashboard (Tableau)",
      companyOrFocus: "Commercial Performance & Transaction Intelligence",
      summary: "Enterprise sales performance tracking across customer tiers and volume segments.",
      bullets: [
        "Designed Tableau dashboards on over 10,000 transactions to highlight revenue drivers, customer segments and key business KPIs.",
      ],
      tags: ["Tableau", "KPIs", "Data Visualisation"],
      illustrativeNote: "Illustrative placeholder data",
      chartData: {
        categories: [
          { name: "Enterprise B2B", share: 44, color: "#2B4BFF" },
          { name: "Mid-Market", share: 32, color: "#C6F432" },
          { name: "SMB Accounts", share: 16, color: "#64748B" },
          { name: "Direct Tier", share: 8, color: "#CBD5E1" },
        ],
        monthlyVolume: [
          { month: "Jan", value: 680 },
          { month: "Feb", value: 820 },
          { month: "Mar", value: 1100 },
          { month: "Apr", value: 950 },
          { month: "May", value: 1450 },
          { month: "Jun", value: 1820 },
        ],
      },
    },
  ] as ProjectItem[],

  skills: [
    {
      category: "Financial Analysis",
      code: "01 / FIN",
      skills: [
        "FP&A",
        "DCF and relative valuation",
        "equity research",
        "fund and manager analysis",
        "management reporting",
        "financial close",
      ],
    },
    {
      category: "Advanced Excel",
      code: "02 / XLS",
      skills: [
        "VLOOKUP",
        "pivot tables",
        "macros",
        "financial modelling",
        "budgeting",
        "variance analysis",
      ],
    },
    {
      category: "Dashboards & BI",
      code: "03 / BI",
      skills: ["Power BI", "Tableau"],
    },
    {
      category: "Other Tools",
      code: "04 / TOOLS",
      skills: ["Bloomberg Terminal", "SQL", "Microsoft Office Suite"],
    },
    {
      category: "Standards",
      code: "05 / ACC",
      skills: ["Ind AS / IFRS"],
    },
  ] as SkillCategory[],

  certifications: [
    {
      id: "cert-1",
      code: "CERT-01",
      title: "Bloomberg Market Concepts (BMC) & Finance Fundamentals",
      issuer: "Bloomberg LP",
      verifiedBadge: "Verified Market Proficiency",
    },
    {
      id: "cert-2",
      code: "CERT-02",
      title: "Lean Six Sigma Green Belt",
      issuer: "Grant Thornton",
      verifiedBadge: "Process Excellence",
    },
    {
      id: "cert-3",
      code: "CERT-03",
      title: "Investment Strategies & Portfolio Analysis",
      issuer: "Rice University (Coursera)",
      verifiedBadge: "Portfolio Management",
    },
    {
      id: "cert-4",
      code: "CERT-04",
      title: "J.P. Morgan Investment Banking Virtual Experience",
      issuer: "Forage",
      verifiedBadge: "M&A / DCF Modeling",
    },
  ] as CertificationItem[],

  responsibilities: [
    {
      id: "resp-1",
      role: "Senior Research Analyst",
      organization: "Campus Consortium Foundation (CCF)",
      description:
        "Lead and manage a team of 10 research interns, overseeing research assignments, quality and deliverables, and author research papers published on the CCF website.",
      tag: "Team Leadership",
    },
    {
      id: "resp-2",
      role: "Co-Founder and Finance Lead",
      organization: "Leadership Club, IMT Ghaziabad",
      description:
        "Co-founded the club and managed event budgets, financials and execution of campus initiatives.",
      tag: "Initiative & Budgeting",
    },
    {
      id: "resp-3",
      role: "Captain",
      organization: "IMT Ghaziabad Cricket Team",
      description:
        "Led the institute cricket team and coordinated preparation, strategy and match execution.",
      tag: "Strategic Leadership",
    },
  ] as ResponsibilityItem[],

  marqueeSkills: [
    "ASSET MANAGEMENT",
    "EQUITY RESEARCH",
    "DCF VALUATION",
    "EV/EBITDA MULTIPLES",
    "FP&A MODELING",
    "PRIVATE EQUITY",
    "PRIVATE CREDIT",
    "BLOOMBERG BMC",
    "TABLEAU",
    "POWER BI",
    "MACROS & ADVANCED EXCEL",
    "Ind AS / IFRS",
    "LP EVALUATION",
    "DUE DILIGENCE",
  ],
};
