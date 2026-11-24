# AFSAL OS — Portfolio Workstation

> A desktop operating system web portfolio for **Afsal**, an undergraduate AI/ML engineering student specializing in Deep Learning, Computer Vision, and Data Science.

![AFSAL OS Preview](/og-image.png)

---

## 🖥️ Overview

**AFSAL OS** recreates the look, feel, and tactile feedback of a modern Unix/macOS desktop environment in the browser. Every facet of the portfolio is represented as an interactive native application or system utility.

### Key Highlights
- **Realistic Boot Sequence:** Simulated kernel modules, filesystem mounting, live progress bar, and typing log sequence with fast-forward skip and `localStorage` memory.
- **Window Management System:** Draggable, minimizable, maximizable, stackable windows with z-index elevation, snapping, active states, and macOS-style dock integration.
- **Interactive Terminal (`zsh`):** Fully functional shell supporting command history (Up/Down arrows), tab autocomplete, command execution (`help`, `whoami`, `skills`, `projects`, `education`, `achievements`, `contact`, `clear`, `echo`, `date`, `sudo`, `neofetch`), and keyboard audio feedback.
- **Finder & Project Browser:** File-explorer style directory tree, search filter, category tags, modal details view, live demo links, and GitHub repository links.
- **Spotlight Search:** Quick launcher accessible globally via `Cmd + K` or `Ctrl + K`.
- **Procedural Sound Design:** Zero external audio dependencies — synthesized Web Audio API soundscapes for window opens, whoosh closes, and terminal keystrokes (disabled by default, toggleable in the top menubar).
- **3 Dynamic Wallpaper Variants:**
  1. *Particle Field* (Default): Interactive drifting particles with dynamic neural filaments.
  2. *Cosmic Gradient*: Very slow-moving radial color shift from deep blue to dark purple.
  3. *Static Geometric*: Minimalist dark isometric grid with coordinate nodes.
- **Mobile Responsive Fallback:** Clean, high-contrast mobile portfolio layout on screens `< 768px` with an instant toggle button to switch into the Desktop OS mode.
- **Real PDF Resume Download:** Wired to both the desktop shortcut `Resume.pdf` and the About Me profile card.

---

## 📁 Project Architecture & Content Customization

All personal details, projects, education, skills, and contact links are cleanly decoupled from the UI inside `src/data/`:

| File | Purpose | Description |
| :--- | :--- | :--- |
| `src/data/about.json` | Personal Bio & Stats | Name, role, bio, metrics (projects, technologies), current projects, interests, social links. |
| `src/data/projects.json` | Portfolio Projects | Title, short/full descriptions, category, tech stack tags, GitHub URLs, live demos. |
| `src/data/skills.json` | Technical Competencies | Categorized skills (Languages, Frontend, Backend, Databases, Tools, Currently Learning). |
| `src/data/education.json` | Education & Certifications | Degrees, institutions, years, descriptions, and certificate credentials with links. |
| `src/data/achievements.json` | Honors & Distinctions | Competitions, academic awards, hackathons, publications, and categories. |
| `src/data/contact.json` | Contact Information | Direct channels (Email, GitHub, LinkedIn, Kaggle), handles, URLs, and availability status. |

---

## 📄 Replacing the Resume PDF

The repository includes a valid placeholder PDF at `public/resume.pdf`.

To update it with your own CV:
1. Export your resume as a PDF.
2. Name the file `resume.pdf`.
3. Replace `public/resume.pdf` with your file.
4. Both the desktop icon `Resume.pdf` and the "Download Resume" button in the About Me app will automatically serve and download your updated CV.

---

## ✉️ Contact Form Setup (Formspree / EmailJS)

The Mail application supports live form transmission. By default, it operates in simulated **Demo Mode** with user feedback.

### Option A: Formspree (Recommended, 2 Minutes)
1. Register a free account at [Formspree.io](https://formspree.io).
2. Create a new form and copy the endpoint URL (e.g., `https://formspree.io/f/xyzabced`).
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Set the environment variable:
   ```env
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
   ```
5. Restart your dev server (`npm run dev`). The Mail app will now display `🟢 Live API Active` and send incoming messages directly to your inbox.

---

## 🚀 Quick Start & Local Development

### Prerequisites
- Node.js 18+ installed
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/afsal-os.git
cd afsal-os

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Scripts
- `npm run dev`: Launch local development server with Vite hot module replacement (HMR).
- `npm run build`: Compile and bundle production assets with chunk splitting into `dist/`.
- `npm run preview`: Preview the production build locally.

---

## 🌐 Deployment

### Deploying to Vercel
1. Push your repository to GitHub.
2. Visit [Vercel](https://vercel.com) and import your repo.
3. Framework Preset: **Vite**.
4. Root Directory: `./`.
5. Under **Environment Variables**, add `VITE_FORMSPREE_ENDPOINT` if using Formspree.
6. Click **Deploy**.

### Deploying to Netlify
1. Connect your repository on [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set `VITE_FORMSPREE_ENDPOINT` under Site Configuration > Environment variables.
5. Click **Deploy Site**.

---

## 🎨 Color Palette & Typography

- **Base Background:** `#09090c` / `#0d0d0f`
- **Surfaces:** `#141418` (subtle frosted blur with `#ffffff10` border)
- **Elevated Window Chrome:** `#1e1e24`
- **Primary Accent:** `#4f9eff` (Electric Blue)
- **Secondary Text:** `#e8e8f0` (Soft White) / `#6b6b80` (Muted)
- **Typography:** `Inter` (UI elements) and `JetBrains Mono` (Terminal, code spans, system labels)
