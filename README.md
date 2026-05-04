# Thryve Health & Wellness — Website

Cash-pay virtual hormone and wellness care for women in their 40s.  
Serving **Arizona · New Mexico · North Dakota**.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — hero, services overview, pricing, about preview, FAQ, CTA |
| `services.html` | Programs & lab menu |
| `about.html` | Provider bio (Mika NP) |
| `faq.html` | Accordion FAQ |
| `book.html` | Booking with OptiMantra embed |
| `contact.html` | General inquiry form |
| `portal.html` | Patient login portal |
| `intake.html` | 5-step new patient intake form |

## Assets

All images live in `/assets/`:
- `logo-nav.png` — header logo
- `logo-hero.png` — hero section logo
- `logo-footer.png` — footer logo
- `mika-photo.jpg` — provider photo

## Tweaks (design controls)

The homepage includes a live Tweaks panel (toggle from the toolbar in the design environment):
- `tweaks-panel.jsx` — shared panel shell (host protocol, controls)
- `tweaks-thryve.jsx` — Thryve-specific tweaks (hero copy, accent color, fonts, header visibility, etc.)

## Tech stack

- Vanilla HTML/CSS/JS — no build step required
- Google Fonts: Cormorant Garamond + Jost
- React 18 + Babel (CDN) — only used for the Tweaks panel
- Fully static — deploy to GitHub Pages, Netlify, Vercel, or any CDN

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Site will be live at `https://<username>.github.io/<repo>/`

## Design notes

- Color palette: deep forest green (`#1e3d28`) + mint (`#1D9E75`) + soft sage backgrounds
- Typography: Cormorant Garamond (headings) + Jost (body)
- Dark mode: toggle via the moon icon in the nav — preference persists via `localStorage`
- All pages share the same nav/footer markup pattern for easy updates
