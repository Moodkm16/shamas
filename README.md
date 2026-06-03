# AURUM — Luxury Timepieces & Devices

A production-ready static website for a luxury watches, gadgets, and devices brand.
Dark cinematic design. No frameworks. No build step required.

---

## What's in the box

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, categories, spotlight, stats, pillars, newsletter |
| `collection.html` | Full product grid with category filter |
| `about.html` | Brand story and timeline |
| `contact.html` | Private enquiry form |
| `404.html` | Custom not-found page |
| `privacy.html` | POPIA-ready privacy policy placeholder |
| `terms.html` | Terms of use placeholder |
| `css/style.css` | All styles — mobile-first, CSS custom properties |
| `js/main.js` | Nav, mobile menu, scroll reveal, cursor, filters, forms |
| `robots.txt` | Search engine crawler instructions |
| `sitemap.xml` | Sitemap for search engines |

---

## How to run locally

No build step, no server required for basic viewing.

**Option 1 — Open directly in a browser**
Double-click `index.html`. Works for viewing but form submissions need a real endpoint.

**Option 2 — VS Code Live Server (recommended)**
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Site opens at `http://127.0.0.1:5500`

**Option 3 — Python (any machine)**
```bash
python -m http.server 3000
```
Then open `http://localhost:3000`

---

## Before going live — required changes

### 1. Replace brand name
Find-and-replace `AURUM` with your real brand name across all HTML files.

### 2. Replace placeholder images
Every image section has a comment like:
```html
<!-- REPLACE WITH REAL IMAGE:
  <picture>
    <source srcset="assets/images/hero.webp" type="image/webp">
    <img src="assets/images/hero.jpg" alt="..." loading="lazy">
  </picture>
-->
```
Add your real product photos to `assets/images/` and swap out the `.img-placeholder` divs.
Use WebP format for best performance. Compress images before adding.

### 3. Set up the contact form
The forms use [Formspree](https://formspree.io) — it is free for basic use.

1. Create a free account at formspree.io
2. Create a new form and copy your Form ID (looks like `xabcdefg`)
3. In `js/main.js`, find both lines that say:
   ```
   https://formspree.io/f/YOUR_FORM_ID
   ```
   Replace `YOUR_FORM_ID` with your real Formspree ID.

### 4. Update your domain
Replace all instances of `aurumworld.co.za` with your real domain in:
- All `<link rel="canonical">` tags
- All `<meta property="og:url">` tags
- `sitemap.xml`
- `robots.txt`

### 5. Update contact details
Replace placeholder email, address, and hours in `contact.html`, `about.html`, and the footer of every page.

### 6. Legal pages
`privacy.html` and `terms.html` are placeholder templates.
**Have a South African attorney review them before publishing.**

---

## Deploy to Vercel (free, recommended)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → select your repo
4. Framework: **Other** (no build config needed for static HTML)
5. Click **Deploy**

Your site will be live in under a minute at a `vercel.app` URL.

### Custom domain on Vercel
1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g. `aurumworld.co.za`)
3. Vercel shows you DNS records to add at your domain registrar
4. Add them, wait up to 48 hours for DNS to propagate
5. Vercel automatically provisions a free HTTPS certificate

---

## Environment variables

This is a static site — no server-side environment variables are needed.
The only "secret" is your Formspree Form ID, which is safe to put in client JS
(Formspree limits submissions to your configured domain).

---

## Pre-launch checklist

- [ ] All `AURUM` replaced with real brand name
- [ ] All `.img-placeholder` divs replaced with real `<picture>` / `<img>` tags
- [ ] `YOUR_FORM_ID` replaced with real Formspree ID — test form submission
- [ ] Domain updated in all canonical / OG tags and sitemap
- [ ] Contact email, address, and hours updated on all pages
- [ ] Privacy policy and terms reviewed by attorney
- [ ] Test on iPhone SE (360px width) — no horizontal scroll
- [ ] Test all nav links work
- [ ] Test mobile menu opens and closes
- [ ] Test filter buttons on collection page
- [ ] Check Lighthouse scores (target 90+ on all four metrics)
- [ ] Verify HTTPS is working after deploy

## Post-launch monitoring

- **Uptime**: [UptimeRobot](https://uptimerobot.com) (free, 5-minute checks, alerts by email)
- **Analytics**: [Plausible](https://plausible.io) or [Fathom](https://usefathom.com) — privacy-respecting, no cookie banner needed
- **Form submissions**: Check your Formspree dashboard or email inbox
- **Search Console**: Submit sitemap at [search.google.com/search-console](https://search.google.com/search-console)
