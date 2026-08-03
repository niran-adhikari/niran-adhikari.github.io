# Niran Adhikari — Data Analytics Portfolio

A minimal, animated, premium portfolio site. Plain HTML/CSS/JS — no build step,
no framework. Open `index.html` in a browser or deploy the whole folder to
any static host (GitHub Pages, Netlify, Vercel, etc.).

## File map

```
index.html          Page structure (all sections)
css/style.css        All styling, design tokens and animations
js/content.js         <-- EDIT THIS to update skills, projects, contact links
js/script.js         Rendering + animation logic (shouldn't need to touch)
assets/profile-photo.jpg   Your photo (add this file — see below)
assets/resume.pdf          Your resume (replace this file — see below)
assets/projects/           Put project screenshots here
```

## Things you'll want to update

### 1. Your photo
Add a photo file named exactly `assets/profile-photo.jpg`. Until you do,
a placeholder silhouette is shown automatically. A portrait-ish crop
(roughly 4:5) works best.

### 2. Your resume
Replace `assets/resume.pdf` with your real resume, **keeping the same
file name**. Both the "View Resume" and "Download Resume" buttons point
to this one file.

### 3. Skills, projects and contact links
Everything else content-related lives in `js/content.js`:

- `PROFILE` — your email, LinkedIn and GitHub URLs.
- `SKILLS` — the four skill cards. Add/remove/edit freely; each needs a
  `name`, a one-line `blurb`, and an `icon` (`powerbi`, `sql`, `excel` or
  `python`).
- `PROJECTS` — an array of project objects. The file includes a template
  entry showing the exact shape expected; copy it, fill in real details,
  and delete the template once you have real projects. Set `featured: true`
  (or use "Power BI" in `tools`) to make a card render larger and more
  prominent.
- `CONTACT_LINKS` — the email / LinkedIn / GitHub tiles in the Contact
  section.

No other file needs to change for routine updates — the page re-renders
these lists automatically.

## Project images

Drop dashboard/report screenshots into `assets/projects/` and reference
them from a project's `image` field in `content.js`, e.g.
`"assets/projects/sales-dashboard.png"`. If `image` is left empty, a
neutral placeholder icon is shown instead.

## Contact form

The contact form has no backend — submitting it opens the visitor's email
client with the message pre-filled (using `PROFILE.email`). If you'd
rather receive submissions directly, wire the form up to a service like
Formspree or EmailJS and update the submit handler in `js/script.js`
(`initContactForm`).

## Accessibility & performance notes

- Respects `prefers-reduced-motion` — all animation is disabled for
  visitors who request it.
- The floating background canvas and hover/parallax effects are
  decorative only (`aria-hidden`) and never block content.
- Fully responsive down to small mobile widths.
