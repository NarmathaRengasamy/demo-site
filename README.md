# Perfox — Autonomous AI Agents Demo Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#)

A high-performance demonstration and launchpad for the **Perfox Autonomous AI Agent Platform**. Showcases autonomous enterprise workflows across industrial domains (Furniture, Automotive, Retail E-Commerce, and Industrial Tape Manufacturing) with dynamic orchestration pipelines, real-time stage verification, and the Perfox AI robot mascot.

---

## 🚀 Key Features

- **Dual-View Architecture:**
  - **Home (Screen 1):** Interactive hero visualizer, specialist agent swarm showcase, autonomous mission cards, and domain workflow switcher.
  - **Demo Preparation (Screen 2):** Single-screen desktop layout featuring the 3D Perfox robot mascot with reactive ambient lighting, floating animations, and a 6-stage telemetry verification pipeline.
- **Extensible Dynamic Workflows (Pattern A):**
  - Adding or editing use cases is centralized in `src/data/workflows.ts`.
  - Dynamic fallback pipeline stages (`createDefaultStages`) and automatic demo URL resolution via environment variables.
- **Security & Navigation Hardening:**
  - Strict open redirect protection with dynamic URL whitelist validation (`TRUSTED_DOMAINS`).
  - Production security headers (`CSP`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) configured in `vercel.json`, `vite.config.ts`, and `index.html`.
- **Responsive & Performant:**
  - Single-screen desktop fit with zero vertical scrollbars.
  - Adaptive layout for tablet (centered stacked) and mobile (compact touch-first cards).
  - Sub-2.5s production build times via Vite.

---

## 🛠 Tech Stack

| Technology         | Purpose                                                                        |
| :----------------- | :----------------------------------------------------------------------------- |
| **React 18**       | UI component architecture and hooks-driven state management                    |
| **TypeScript 5**   | Strict type-safety across workflows, pipeline stages, and navigation           |
| **Vite 5**         | Ultra-fast HMR and optimized asset bundling (configured on port `3000`)        |
| **Tailwind CSS 3** | Cyber Ember dark design system with custom GPU-accelerated keyframe animations |

---

## 📂 Project Structure

```
demo-site/
├── .env.example             # Environment variable template
├── .gitignore               # Git ignore rules (node_modules, dist, .env)
├── index.html               # Main HTML entry with Google fonts & CSP
├── package.json             # Scripts & dependencies
├── postcss.config.js        # PostCSS configuration for Tailwind
├── tailwind.config.js       # Perfox Cyber Ember color tokens & animations
├── tsconfig.json            # TypeScript compiler configuration
├── vercel.json              # Security response headers policy
├── vite.config.ts           # Vite server settings (Port 3000, 127.0.0.1, auto-open)
└── src/
    ├── App.tsx              # Root app orchestrator & URL safety checks
    ├── main.tsx             # React DOM root entry
    ├── index.css            # Cyber Ember theme, ambient blurs, keyframe animations
    ├── vite-env.d.ts        # TypeScript asset declarations (.png, .jpg)
    ├── assets/
    │   └── hero-scene.jpg   # Engine overview rendered visual scene
    ├── components/
    │   ├── common/          # BrandMarks (Fox runner, wordmark, logo lockup)
    │   ├── layout/          # Navbar, Footer, BackgroundGlow
    │   └── visuals/         # LaunchBlast rocket animation modal
    ├── data/
    │   └── workflows.ts     # Centralized usecase definitions & stages
    ├── types/
    │   └── index.ts         # TypeScript interfaces (WorkflowItem, PipelineStage)
    └── views/
        ├── LandingView.tsx      # Screen 1: Engine overview & use case cards
        └── SandboxSetupView.tsx # Screen 2: Centered 6-stage sandbox pipeline
```

---

## ⚙️ Environment Configuration

Copy `.env.example` to create your local `.env`:

```bash
cp .env.example .env
```

### Environment Variables

| Variable             | Description                                 | Default / Example                                |
| :------------------- | :------------------------------------------ | :----------------------------------------------- |
| `VITE_FURNITURE_URL` | Live URL for Furniture Shop sandbox         | `https://furniture-public-site.vercel.app`       |
| `VITE_CAR_URL`       | Live URL for Automotive Enterprises sandbox | `https://car-enterprises-public-site.vercel.app` |
| `VITE_ECOMMERCE_URL` | Live URL for E-Commerce Retail sandbox      | `https://e-commerce-public-site.vercel.app`      |
| `VITE_TAPE_URL`      | Live URL for Industrial Tape Co. sandbox    | `https://aruvi-public-site.vercel.app`           |
| `VITE_APP_ENV`       | Application environment identifier          | `development` / `production`                     |

> **Note:** Any destination URL configured here is automatically verified and added to the safe redirect whitelist at runtime.

---

## 💻 Local Development

### Prerequisites

- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Local Dev Server

```bash
npm run dev
```

The server will automatically start on **Port 3000** at [**http://127.0.0.1:3000**](http://127.0.0.1:3000) (or [http://localhost:3000](http://localhost:3000)) and open your default browser.

- To view the **Home Page** directly: `http://127.0.0.1:3000`
- To view the **Demo Setup** view directly: `http://127.0.0.1:3000/?screen=2`

### 3. Build for Production

```bash
npm run build
```

Compiles TypeScript types (`tsc`) and builds the optimized bundle into `/dist`.

### 4. Preview Production Build

```bash
npm run preview
```

Serves the production build locally on **Port 3000** ([http://127.0.0.1:3000](http://127.0.0.1:3000)) to test production performance and security headers.

---

## ➕ Adding a New Use Case

To add a new enterprise workflow in the future without modifying UI views:

1. Open [`src/data/workflows.ts`](src/data/workflows.ts).
2. Append a new workflow object to the `WORKFLOWS` array:
   ```typescript
   {
     id: 'logistics',
     title: 'Autonomous Freight Link',
     domain: 'Global Logistics & Freight',
     description: 'Autonomous multi-modal container tracking and customs clearance.',
     route: 'logistics',
     iconName: 'local_shipping',
     iconColor: '#38bdf8',
     color: 'from-[#38bdf8] to-[#6366f1]',
     bgTint: 'rgba(56, 189, 248, 0.08)',
     tag: 'Live Demo',
     agentsCount: 5,
     activeAgents: ['RouteOptimizer AI', 'CustomsClear Agent v2', 'FuelTracker'],
     challenge: 'Port congestion and delayed manifest verification.',
     resolution: 'Autonomous real-time re-routing with zero human intervention.',
     eventRate: '1,840 events/sec',
     status: 'Active',
     vercelUrl: import.meta.env.VITE_LOGISTICS_URL || 'https://logistics-demo.vercel.app',
     stages: createDefaultStages('Autonomous Freight Link')
   }
   ```
3. Add `VITE_LOGISTICS_URL` to `.env` and `.env.example`.
4. The new use case will automatically render on the Engine Overview dashboard, validate security redirects, and populate the Sandbox Preparation pipeline.

---

## 🔒 Security Best Practices

- **No Hardcoded Secrets:** Private API tokens and credentials should never be committed or prefixed with `VITE_`.
- **Safe Redirect Whitelisting:** External sandbox navigation is strictly validated against `TRUSTED_DOMAINS` and `*.vercel.app` in `App.tsx`.
- **Production Headers:** HTTP security headers (`nosniff`, `DENY` framing) protect against clickjacking, MIME-sniffing, and cross-site scripting vulnerabilities.

---

## 📄 License

© 2026 Perfox, Inc. All rights reserved. Proprietary and confidential.
