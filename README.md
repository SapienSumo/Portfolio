# Paul Aliu — Portfolio

A personal portfolio site built with React and Vite.

---

## Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/) — dev server + bundler
- CSS custom properties — dark / light theme support
- No UI library — all styles written from scratch

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/Portfolio.git
cd Portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the local dev server

```bash
npm run dev
```

The site will be live at **<http://localhost:5173>** and will hot-reload on every file save.

---

## Project Structure

```text
Portfolio/
├── index.html              # Vite entry point
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            # React root
    ├── App.jsx             # Top-level layout
    ├── components/
    │   ├── Header.jsx      # Sticky nav, theme toggle, mobile menu
    │   └── Footer.jsx      # Copyright + scroll-to-top
    ├── sections/
    │   ├── Hero.jsx
    │   ├── Expertise.jsx
    │   ├── Work.jsx        # Portfolio filter
    │   ├── Experience.jsx  # Timeline
    │   ├── Testimonials.jsx
    │   └── Contact.jsx     # Contact form
    ├── hooks/
    │   ├── useTheme.js     # Dark / light mode + localStorage
    │   ├── useScrollSpy.js # Active nav link on scroll
    │   └── useScrolled.js  # Header border + scroll-to-top visibility
    ├── data/
    │   ├── projects.js     # Work section content
    │   ├── experience.js   # Timeline entries
    │   ├── testimonials.js # Client quotes
    │   └── expertise.js    # Skills cards
    └── styles/
        └── globals.css     # All global styles + CSS variables
```

---

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the local dev server at <http://localhost:5173> |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |

---

## Customising Content

All site content lives in [`src/data/`](src/data/) — no need to touch component files for copy changes:

- **Projects** → `src/data/projects.js`
- **Work experience** → `src/data/experience.js`
- **Testimonials** → `src/data/testimonials.js`
- **Skills / expertise** → `src/data/expertise.js`

Theme colours and typography tokens are in [`src/styles/globals.css`](src/styles/globals.css) under the `:root`, `[data-theme="dark"]`, and `[data-theme="light"]` blocks.
