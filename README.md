# Shobhit Nandwana | Institutional Quant & Research Portfolio

> **Midnight Quant** — A dark, cinematic, type-driven single-page portfolio engineered for institutional roles across **Asset Management**, **Equity Research**, **Hedge Funds**, **Private Equity**, and **Private Credit**.

---

## 🏛️ Design Language: "Midnight Quant"

- **Atmosphere**: Dark, immersive, confident oversized typography inspired by high-end quant research terminals and fintech product launches.
- **Palette**:
  - Background: Obsidian Midnight `#05060A` with 3.5% film-grain texture, soft vignette, and slow-drifting blurred aurora glows (violet & cyan at 10% opacity)
  - Text: High-contrast off-white `#F1F2F6`, muted `#8A90A2`, hairlines `rgba(255, 255, 255, 0.08)`
  - Primary Accent: Electric Violet `#8B5CF6`
  - Secondary Accent: Cyan `#22D3EE`
  - Live Indicators: Mint `#34F5C5`
  - Chart Accents: Loss Coral `#FB7185` (used strictly inside charts)
  - Signature Gradient: `linear-gradient(90deg, #8B5CF6, #22D3EE)`
- **Typography**:
  - **Display Headings**: `Syne` 700/800 (Oversized, tight leading, outlined text with gradient fill)
  - **Body**: `Manrope` (Clean modern geometric sans)
  - **Metrics & Labels**: `IBM Plex Mono` (Precision terminal typography)
- **Surfaces**: Full-bleed sections, hairline rules, large whitespace, big outlined section numerals (01 to 06), glassmorphism reserved for the command palette and navigation.
- **Motion**: Cinematic Lenis smooth scrolling, scroll-linked masked text reveals, magnetic buttons, and an interactive 3D wireframe Volatility Surface.
- **Cursor**: Small white dot + difference-blend ring displaying `"VIEW"` / `"OPEN"` on hover (desktop only).

---

## 🛠️ Tech Stack

- **Core**: Vite + React 19 + TypeScript + Tailwind CSS v3
- **Motion & Smooth Scroll**: Framer Motion + Lenis Smooth Scroll
- **3D Graphics**: Three.js + `@react-three/fiber` (Lazy-loaded interactive volatility surface mesh with mouse tilt and click ripple dynamics, with a lightweight 2D canvas fallback for mobile/low-power/reduced-motion)
- **Icons**: Lucide React + Hand-crafted SVG Monograms
- **Charts**: Custom SVG football field valuation corridor chart and Tableau dashboard analytics mockups (all marked with required compliance labels: *"Illustrative, not actual figures"* / *"Illustrative placeholder data"*)

---

## 📂 Architecture

```
shobhit-portfolio-new/
├── public/
│   ├── favicon.svg                       # Dark Midnight Quant 'SN' monogram with violet-to-cyan gradient
│   └── Shobhit_Nandwana_CV_Revised.pdf   # Downloadable revised resume
├── src/
│   ├── components/
│   │   ├── hero/
│   │   │   ├── VolatilitySurface3D.tsx   # Interactive 3D wireframe mesh (Three.js / R3F)
│   │   │   ├── VolatilitySurface2D.tsx   # Lightweight 2D canvas fallback
│   │   │   └── HeroCanvas.tsx            # Lazy loader with capability detection
│   │   ├── navigation/
│   │   │   ├── TopBar.tsx                # Minimal top bar (Syne SN mark, ⌘K trigger, gradient hairline CV)
│   │   │   ├── DotRail.tsx               # Right-edge vertical dot rail with scroll-spy (01-06)
│   │   │   └── ScrollProgressLine.tsx    # Fixed top gradient progress line
│   │   ├── ui/
│   │   │   ├── CommandPalette.tsx        # Glass Cmd+K modal with full keyboard navigation
│   │   │   └── CustomCursor.tsx          # Difference blend cursor with dynamic labels
│   │   ├── icons/
│   │   │   └── LinkedInIcon.tsx          # Clean SVG LinkedIn icon
│   │   └── sections/
│   │       ├── HeroSection.tsx           # Giant Syne title, word slot cycler, stats rail, spinning badge
│   │       ├── AboutSection.tsx          # Split layout, scroll-linked word fade, education ledger, dual marquee
│   │       ├── ExperienceSection.tsx     # Pinned split layout, dynamic progress line, terminal log bullets
│   │       ├── ProjectsSection.tsx       # Pinned horizontal scroll, football field chart, Tableau mockups
│   │       ├── SkillsSection.tsx         # Typographic index, 2x2 certification matrix, leadership accordions
│   │       └── ContactSection.tsx        # "Let's talk markets", hairline contact rows, underline form, footer
│   ├── data/
│   │   └── content.ts                    # Approved, unchanged resume data
│   ├── App.tsx                           # Root container with Lenis smooth scrolling & grain overlay
│   ├── main.tsx                          # React entry point
│   └── index.css                         # Dark mode styles, film grain, vignette, outlined text
├── index.html                            # SEO meta, Open Graph, Google Fonts (Syne, Manrope, IBM Plex Mono)
├── tailwind.config.js                    # Midnight Quant design tokens & color system
├── package.json
└── vite.config.ts
```

---

## 🚀 Running & Deploying

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deployment
Output is pure static HTML/JS/CSS in `./dist/`, ready for immediate deployment to Vercel, Netlify, or AWS Amplify.

---

## 📄 License
© 2026 Shobhit Nandwana. All rights reserved.
