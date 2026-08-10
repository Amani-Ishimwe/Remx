# Remx — The Retention Layer for Reading-to-Learn

**Remx** is a spaced-repetition retention platform designed for technical articles, research papers, system specifications, and tutorials. It automatically extracts architectural invariants, generates structured summaries, immediate comprehension quizzes, and flashcards, and schedules reviews on an active spaced-repetition ladder (1, 3, 7, 14, and 30 day intervals).

---

## Key Features

- **Extract & Deconstruct**: Paste any article URL or markdown text. Remx extracts core invariants, trade-offs, and key architectural takeaways.
- **Immediate Retrieval Quiz Gate**: Active recall checks immediately after reading to cement the initial neural trace before the forgetting curve starts.
- **Calibrated Spaced Repetition**: 5-stage spaced interval engine (`1d → 3d → 7d → 14d → 30d (Mastery)`). Grade reviews with **Got it** or **Forgot** with interactive 3D card flipping.
- **Study Groups & Cohorts**: Shared technical deck repositories, supportive momentum statistics (decks reviewed, cards retained, active streak), and invite codes without toxic leaderboards.
- **Goal-Driven Discovery Feed**: Reading recommendations ranked strictly by relevance to your declared learning goals (with connection tags like `"fills a gap in: Kubernetes networking & eBPF"`), not engagement algorithms.
- **Strictly Monochrome Design System**: Zero color distractions. Feedback states (correct/incorrect, due statuses, streaks) use weight, motion, glyphs, and shape.

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) configured with custom monochrome tokens
- **Motion & Physics**: [Framer Motion](https://www.framer.com/motion/) for 3D card flips, micro-interactions, quiz shake/scale-pop, and route transitions
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with `localStorage` persistence
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Google Font **Epilogue** (`next/font/google`)

---

## Design System Tokens

Remx adheres to a strict monochrome palette with no accent hues:

| Token | Hex | Role |
|---|---|---|
| `--black` | `#0A0A0A` | Primary text, primary surfaces, active states |
| `--white` | `#FFFFFF` | Base background, inverted button text |
| `--gray-100` | `#F2F2F0` | Card surfaces, section fills |
| `--gray-200` | `#E4E4E1` | Borders, dividers |
| `--gray-400` | `#A8A8A3` | Muted labels, placeholders |
| `--gray-600` | `#6B6B66` | Secondary text, descriptions |
| `--gray-900` | `#0A0A0A` | Headings, heavy borders |

---

## Page Map

```
/                      Landing page (pitch, interactive 3D hero demo, retention mechanics)
/app                   Retention Studio Dashboard (due queue, streak, goals, quick paste)
/app/new               Generation Studio (paste URL/text → shimmer extraction → quiz → save)
/app/library           Deck Library (search, interval filters, SRS inspection modal)
/app/review            Review Queue (3D card flip, Got It / Forgot grading, milestone celebration)
/app/discover          Goal-Driven Discovery Feed (learning goals filter, 1-tap Remx import)
/app/groups            Study Groups Directory (create cohort, join via invite code)
/app/groups/[id]       Cohort Detail (shared deck library, member momentum, activity feed)
/app/settings          Learning Goals Manager, notification intervals, data export/reset
/pricing               Transparent Pricing Tiers (Free, Learner Pro, Study Group)
```

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/Amani-Ishimwe/Remx.git
cd Remx

# Install dependencies
npm install

# Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

---

## License

MIT © Remx
