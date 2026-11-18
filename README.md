# SMARTTOOLS & SMARTTOOLS GROWTH CENTER
> **Fast, 100% Private, Client-Side Productivity Utilities & International Growth Engine**

[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/Vite-8.x-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20FR%20%7C%20AR%20(RTL)-indigo.svg)](#internationalization)

---

## 🌟 Overview

**SMARTTOOLS** is a high-performance web platform offering free, lightning-fast productivity utilities that run **100% inside your web browser**. 

### 🛡️ Privacy by Design
Unlike conventional online converter services that upload confidential files and documents to remote cloud servers, SMARTTOOLS utilizes native client-side web APIs (`HTML5 Canvas`, `Web Crypto API`, `FileReader`, `Blob`):
- **Zero file uploads**: Photos, passwords, text, and JSON data never leave your device.
- **Zero sign-up**: Instant access with no account creation or credit card barriers.
- **Infinite free usage**: Always free for personal and commercial usage.

---

## 🛠️ The 8 Operational Core Utilities

1. **[QR Code Generator](http://localhost:3000/tool/qr-code-generator)**: Instant client-side QR generation with customizable foreground and background colors, adjustable dimensions (up to 1024px), configurable error correction levels (L, M, Q, H), and 1-click PNG/SVG download.
2. **[Image Compressor](http://localhost:3000/tool/image-compressor)**: In-browser hardware-accelerated image compression. Convert between WebP, JPEG, and PNG, fine-tune visual quality, resize dimensions, and view live before/after byte savings (up to -90%).
3. **[Word & Character Counter](http://localhost:3000/tool/word-counter)**: Live word count, characters (with/without spaces), sentences, paragraphs, estimated reading/speaking duration, and keyword density frequency table (supports English, French, and Arabic).
4. **[Strong Password Generator](http://localhost:3000/tool/password-generator)**: Cryptographically secure randomness via `window.crypto.getRandomValues`. Customizable length (8 to 64 chars), symbol sets, ambiguity filtering, and visual entropy meter.
5. **[JSON Formatter & Validator](http://localhost:3000/tool/json-formatter-validator)**: Clean syntax validator with exact line/character error pointer, beautify (2/4 spaces) and 1-click minification.
6. **[Base64 Encoder & Decoder](http://localhost:3000/tool/base64-encoder-decoder)**: Bidirectional text converter with full Unicode UTF-8 support (prevents Arabic and accent corruption) and file-to-Data URI generator.
7. **[Color Converter & Contrast Checker](http://localhost:3000/tool/color-converter-palette)**: Real-time HEX, RGB, HSL conversion, color harmony palette generator, and WCAG AA accessibility contrast ratio tester.
8. **[Markdown Previewer & HTML Converter](http://localhost:3000/tool/markdown-to-html-previewer)**: Split-screen Markdown workspace with live visual rendering and semantic HTML export.

---

## 🚀 SMARTTOOLS GROWTH CENTER (`/growth-center`)

A private, protected control hub dedicated to automated organic marketing and international audience growth:

- **Growth Dashboard**: Live SEO score, tracked keywords count, scheduled calendar posts, and campaign tracker.
- **Technical SEO Manager**: Live SEO auditor, trilingual XML Sitemap generator, robots.txt generator, and Schema.org inspector (`WebApplication`, `FAQPage`, `BreadcrumbList`).
- **Keyword Research**: Tri-lingual keyword database (EN, FR, AR), intent classification (*Transactional, Informational, Commercial, Navigational*), automated suggestion engine, and CSV export.
- **Content Generator**: Algorithmic copywriting engine producing high-converting social posts for Facebook, Pinterest, Instagram, LinkedIn, TikTok, YouTube Shorts, and Blogs in 4 distinct tones.
- **Short Video Studio**: 15s, 30s, and 60s video storyboard scripts with 5-scene structure, on-screen text overlays, spoken voiceover, and hashtags in EN, FR, and AR.
- **Visual Creator (Canvas Studio)**: In-browser promotional image generator producing 1080×1080 (Square), 1080×1920 (Story/TikTok), 1200×630 (Banner), and 1000×1500 (Pinterest Pin) PNG assets with custom SMARTTOOLS branding.
- **30-Day Marketing Calendar**: Pre-populated editorial schedule with status workflow (*Idea, To Prepare, Draft, Ready, Published*), CSV export, and RFC 5545 **ICS Calendar export** for Google Calendar and Apple Calendar.
- **Campaign Tracker**: Multi-platform social performance logger tracking views, clicks, reactions, and calculating CTR% and engagement rates.
- **Analytics & Search Console Hub**: Privacy-preserving Google Analytics 4 configuration and Google Search Console performance CSV importer/analyzer.
- **Growth Recommendations Engine**: Prioritized heuristic suggestions cross-referencing live SEO scores, translation coverage, and audience opportunities.
- **Free Traffic Strategy**: Exhaustive organic promotion blueprints and zero-spam community guidelines for Google, Pinterest, Reddit, Facebook, TikTok, and LinkedIn.
- **Reports & System Backup**: Full system JSON backup & restore, CSV data exports, admin PIN management, and Google AdSense `ads.txt` generation.

---

## 🌐 Internationalization (i18n)

SMARTTOOLS is fully trilingual from the ground up:
- **English (`en`)**: Global tech and utility audience.
- **French (`fr`)**: Francophone markets in Europe, Canada, and Africa.
- **Arabic (`ar`)**: High-growth MENA audience with native **Right-to-Left (RTL)** layout (`dir="rtl"`) and Cairo typography.

---

## 💻 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 8](https://vitejs.dev/) with native ES modules
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Client-Side Libraries**: `qrcode`, `canvas-confetti`
- **Hosting Target**: [Cloudflare Pages](https://pages.cloudflare.com/) (Zero-cost static hosting)

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) `>= 20.0.0`
- [npm](https://www.npmjs.com/) `>= 10.0.0`

### 1. Clone the repository
```bash
git clone https://github.com/your-username/smarttools.git
cd smarttools
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run automated test suite
```bash
npm test
```

### 5. Build for production
```bash
npm run build
```
The optimized production bundle will be created in the `dist/` directory.

---

## ☁️ Deployment on Cloudflare Pages

SMARTTOOLS is pre-configured for zero-friction free deployment on Cloudflare Pages:
1. Push code to your GitHub repository.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Workers & Pages** &rarr; **Create application** &rarr; **Pages** &rarr; **Connect to Git**.
3. Select your repository:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. The included `public/_redirects` file automatically handles single-page application (SPA) routing for direct page refreshes.

---

## 🔒 Security & Privacy Notice

- **Admin Access PIN**: The Growth Center is protected by a client-side interface lock. It is designed to safeguard the marketing hub on your personal browser. Sensitive credentials or production private keys should never be committed into source code.
- **Zero Tracking of User Data**: Google Analytics only measures anonymous operational navigation events (page views, tool opened, download clicked). User texts, photos, and passwords never enter any analytics payload.

---

## 📄 Documentation

- **[DEPLOYMENT_GUIDE_FR.md](DEPLOYMENT_GUIDE_FR.md)**: Guide pas à pas en français pour publier SMARTTOOLS gratuitement sur GitHub et Cloudflare Pages.
- **[SMARTTOOLS_GROWTH_GUIDE.md](SMARTTOOLS_GROWTH_GUIDE.md)**: Manuel marketing détaillé et plan éditorial de 30 jours.

---

## 📜 License

Distributed under the MIT License. Free for personal and commercial usage.
