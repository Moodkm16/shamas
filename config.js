/* ============================================================
   AURUM — config.js
   THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Save and refresh your browser to see changes.
   ============================================================ */

const CONFIG = {

  /* ── Brand ─────────────────────────────────────────────── */
  brand: {
    name:        "AURUM",
    tagline:     "Precision · Rarity · Legacy",
    established: "1990",
    location:    "Cape Town, South Africa",
  },

  /* ── Contact  ──────────────────────────────────────────────
     REQUIRED: Replace every value below with your real details.
     These are used across the site (footer, contact page, etc.).
  ──────────────────────────────────────────────────────── */
  contact: {
    email:   "enquire@yourdomain.com",  // Your business email
    address: {
      line1:   "V&A Waterfront",        // Street address or landmark
      line2:   "Cape Town, 8001",       // City and postal code
      country: "South Africa",         // Country
    },
    hours: {
      weekdays:  "09:00 – 17:00 SAST",  // Monday-Friday hours
      saturday:  "By appointment only",  // Saturday hours
      sunday:    "Closed",              // Sunday hours
    },
  },

  /* ── Homepage hero ──────────────────────────────────────── */
  hero: {
    eyebrow:  "Est. 1990 · Cape Town, South Africa",  // Appears above the main title
    line1:    "Time.",                                 // First line of hero title
    line2:    "Technology.",                           // Second line of hero title
    line3:    "Obsession.",                            // Third line (shown in gold italic)
    subtitle: "Handcrafted timepieces and precision devices for those who refuse to compromise.",  // Subtitle text
  },

  /* ── Stats bar ───────────────────────────────────────────
     REQUIRED: Replace numbers with your real figures.
     Remove this section by emptying the array: stats: []
  ──────────────────────────────────────────────────────── */
  stats: [
    { number: "35",  unit: "Years",    label: "Heritage"      },
    { number: "54",  unit: "Models",   label: "In Collection" },
    { number: "12",  unit: "Countries",label: "Distributed"   },
    { number: "2,400", unit: "Pieces",   label: "Crafted"       },
  ],

  /* ── Spotlight (homepage) ────────────────────────────────
     Set productId to match a product id below.
  ──────────────────────────────────────────────────────── */
  spotlight: {
    productId: "product-watch-1",
    badge:     "Featured",
    eyebrow:   "New Arrival",
  },

  /* ── Products ────────────────────────────────────────────
     REQUIRED: Replace every product here with your real products.
     Each product needs: id (unique), category (watch/device/audio), name, desc, price, image

     Image options:
       "img-w1" … "img-w4"  — warm gold placeholder (for watches)
       "img-d1" … "img-d3"  — cool silver placeholder (for devices)
       "img-a1" … "img-a3"  — warm amber placeholder (for audio)
       { src: "assets/images/yourphoto.webp", alt: "Description" } — real image
  ──────────────────────────────────────────────────────── */
  products: [

    /* ── Watches ────────── */
    {
      id:       "product-watch-1",
      category: "watch",
      name:     "Chronos Elite",
      desc:     "18K rose gold case with sapphire crystal. Swiss automatic movement with 72-hour power reserve. Hand-stitched alligator strap.",
      price:    "R 185,000",
      image:    "img-w1",
      badge:    "Limited Edition",
      specs: [
        { label: "Movement",      value: "Swiss Automatic"  },
        { label: "Case material", value: "18K Rose Gold"  },
        { label: "Crystal",       value: "Sapphire"  },
        { label: "Water resistance", value: "100m" },
      ],
    },
    {
      id:       "product-watch-2",
      category: "watch",
      name:     "Meridian Classic",
      desc: "Timeless design meets modern precision. Stainless steel case with exhibition caseback revealing the movement within.",
      price:    "R 48,000",
      image:    "img-w2",
    },
    {
      id:       "product-watch-3",
      category: "watch",
      name:     "Aurum Prestige",
      desc: "The flagship collection. Platinum case with diamond indices. Only 50 pieces produced annually.",
      price:    "R 320,000",
      image:    "img-w3",
      badge:    "Exclusive",
    },

    /* ── Devices ────────── */
    {
      id:       "product-device-1",
      category: "device",
      name:     "Aurum Communicator",
      desc: "Titanium-clad smartphone with ceramic backing. Limited to 500 units worldwide.",
      price:    "R 95,000",
      image:    "img-d1",
    },
    {
      id:       "product-device-2",
      category: "device",
      name:     "Precision Tablet",
      desc: "Professional-grade tablet with gold-plated chassis. Designed for creatives who demand excellence.",
      price:    "R 65,000",
      image:    "img-d2",
    },

    /* ── Audio ──────────── */
    {
      id:       "product-audio-1",
      category: "audio",
      name:     "Resonance One",
      desc: "Handcrafted wireless headphones with gold drivers. 40-hour battery life with active noise cancellation.",
      price:    "R 28,000",
      image:    "img-a1",
    },
    {
      id:       "product-audio-2",
      category: "audio",
      name:     "Aurum Soundbar",
      desc: "Premium home audio system with 24K gold-plated drivers. Dolby Atmos certified.",
      price:    "R 45,000",
      image:    "img-a2",
    },

  ],

  /* ── Theme ───────────────────────────────────────────────
     DARK CINEMATIC — dark background with gold accents.
     Change hex values to restyle the entire site.
  ──────────────────────────────────────────────────────── */
  theme: {
    /* Backgrounds — dark cinematic */
    background:  "#080808",   // main page background
    surface:     "#0e0e0e",   // cards, nav, sections
    surface2:    "#161616",   // inputs, deeper cards
    surface3:    "#1f1f1f",   // 404 number, borders

    /* Accent — gold that pops on dark */
    gold:        "#c9a45a",
    goldLight:   "#dfc07a",
    goldDark:    "#8c6e30",

    /* Text — light on dark background */
    white:       "#f0ebe0",   // primary text (cream)
    muted:       "#8a8275",   // secondary text
    dim:         "#504840",   // tertiary / disabled

    headlineFont: "'Cormorant Garamond', Georgia, serif",
    bodyFont:     "'Inter', -apple-system, sans-serif",
  },

};
