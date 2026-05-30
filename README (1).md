# Muhammad Salman Khalid Awan — Personal Portfolio

[![GitHub Pages](https://img.shields.io/badge/Live%20on-GitHub%20Pages-2563EB?style=flat-square&logo=github)](https://salmankhalidawan-tech.github.io)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-38BDF8?style=flat-square)](LICENSE)

> A clean, responsive, and fully static personal portfolio built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies, no build step.

---

## 📸 Preview

![Portfolio Hero Screenshot](https://via.placeholder.com/1200x600/0F172A/38BDF8?text=Muhammad+Salman+Khalid+Awan+%E2%80%93+Portfolio)

> *Replace the placeholder above with an actual screenshot once deployed.*

---

## 🔗 Live Demo

**[→ View Live Portfolio](https://salmankhalidawan-tech.github.io)**

---

## 🗂 Table of Contents

- [About](#about)
- [Sections](#sections)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Customization](#customization)
- [License](#license)

---

## About

This is the personal portfolio of **Muhammad Salman Khalid Awan**, a final-year Computer Science student specializing in Machine Learning, Natural Language Processing, and backend systems.

The portfolio was designed with a focus on:

- **Clarity and simplicity** — content is easy to scan and read
- **Professional aesthetics** — editorial typography using [Syne](https://fonts.google.com/specimen/Syne) + [DM Sans](https://fonts.google.com/specimen/DM+Sans)
- **Performance** — no frameworks, no JavaScript bundles, instant load times
- **Accessibility** — semantic HTML5, good color contrast, keyboard-navigable
- **Responsiveness** — works seamlessly on mobile, tablet, and desktop

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Name, title, tagline, and CTA buttons |
| **About** | Brief professional bio with key stats |
| **Projects** | Three featured ML/NLP/backend projects with GitHub links |
| **Skills** | Categorized skill tags across 6 domains |
| **Certificates** | Five professional certifications |
| **Contact** | Email, GitHub, LinkedIn links + a frontend contact form |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements) |
| Styling | CSS3 (Flexbox, Grid, custom properties, animations) |
| Scripting | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts — Syne & DM Sans |
| Hosting | GitHub Pages |

**Zero runtime dependencies.** No Node.js, no npm, no bundler required to run or deploy.

---

## Project Structure

```
portfolio/
├── index.html      # Full semantic HTML structure
├── style.css       # All styles — variables, layout, components, responsive
├── main.js         # Scroll reveal, nav behavior, mobile menu, form handling
└── README.md       # This file
```

---

## Getting Started

### Run locally (no server needed)

```bash
# Clone the repo
git clone https://github.com/salmankhalidawan-tech/salmankhalidawan-tech.github.io.git

# Open directly in browser
open index.html
```

That's it. No `npm install`, no build step, no environment setup.

### Optional: use a local dev server for live reload

```bash
# If you have Python installed
python -m http.server 8080

# Or use the VS Code Live Server extension
```

Then open `http://localhost:8080` in your browser.

---

## Deployment

### GitHub Pages (recommended)

1. Push this repository to GitHub as `<your-username>.github.io`
2. Go to **Settings → Pages**
3. Set **Source** to `Deploy from a branch` → `main` → `/ (root)`
4. Click **Save** — your site will be live at `https://<your-username>.github.io` within a minute

### Other static hosts

The site deploys to any static host without configuration:

- **Netlify** — drag and drop the folder at [netlify.com/drop](https://netlify.com/drop)
- **Vercel** — `vercel --prod` from the project folder
- **Cloudflare Pages** — connect your GitHub repo in the dashboard

---

## Customization

All content is in `index.html` and all styles are in `style.css`.

### Update personal details

Open `index.html` and search for the section you want to edit. Each section is clearly commented:

```html
<!-- ─── HERO ─── -->
<!-- ─── ABOUT ─── -->
<!-- ─── PROJECTS ─── -->
<!-- ─── SKILLS ─── -->
<!-- ─── CERTIFICATES ─── -->
<!-- ─── CONTACT ─── -->
```

### Change colors

All colors are defined as CSS custom properties at the top of `style.css`:

```css
:root {
  --blue:    #2563EB;   /* Primary brand color */
  --navy:    #0F172A;   /* Dark backgrounds / headings */
  --bg:      #F8FAFC;   /* Page background */
  --accent:  #38BDF8;   /* Highlight / glow color */
  --text:    #1E293B;   /* Body text */
  --muted:   #64748B;   /* Secondary text */
}
```

Change any value here and it updates everywhere on the page instantly.

### Add a new project

Copy one of the existing `<article class="card">` blocks inside the `projects__grid` div and update the title, description, tech tags, and GitHub link.

---

## Features

- ✅ Fully responsive (mobile-first breakpoints)
- ✅ Smooth scroll navigation
- ✅ Scroll-triggered fade-in animations (Intersection Observer)
- ✅ Sticky nav with scroll-state styling
- ✅ Mobile hamburger menu with animated drawer
- ✅ Active section highlighting in nav
- ✅ Frontend contact form with validation feedback
- ✅ All external links open in new tabs
- ✅ Semantic HTML for accessibility and SEO
- ✅ No JavaScript frameworks — fast and dependency-free

---

## Featured Projects

### 🤖 NLP-Based Resume Screening & Candidate Ranking System
Automated candidate-job matching using TF-IDF and cosine similarity. Full-stack app with FastAPI, PostgreSQL, and Docker.  
[→ GitHub](https://github.com/salmankhalidawan-tech/AI-Assisted-Resume-Screener-and-Candidate-Ranking-System)

### ❤️ Heart Disease Prediction using Machine Learning
End-to-end ML pipeline with Logistic Regression and Decision Trees achieving 85%+ accuracy on clinical data.  
[→ GitHub](https://github.com/salmankhalidawan-tech/Heart-Disease-Prediction)

### 🧠 Mindtrace – Health Sentiment Tracker
Flask + NLTK VADER sentiment analysis app with SQLite storage and Plotly visualizations.  
[→ GitHub](https://github.com/salmankhalidawan-tech/mindtrace)

---

## Contact

| Platform | Link |
|---|---|
| Email | [salmanawanlgu@gmail.com](mailto:salmanawanlgu@gmail.com) |
| GitHub | [salmankhalidawan-tech](https://github.com/salmankhalidawan-tech) |
| LinkedIn | [salmankhalidd](https://www.linkedin.com/in/salmankhalidd/) |

---

## License

This project is open source under the [MIT License](LICENSE). You are free to use it as a template for your own portfolio — just update the content and give a star if you found it useful. ⭐

---

<p align="center">
  Built with HTML, CSS & JavaScript · © 2025 Muhammad Salman Khalid Awan
</p>
