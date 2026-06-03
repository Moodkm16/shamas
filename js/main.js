/* ============================================================
   AURUM — main.js
   Reads from config.js and applies everything to the page.
   Also handles: nav scroll, mobile menu, scroll-reveal,
   custom cursor, collection filters, form validation.
   No dependencies — vanilla JS only.
   ============================================================ */

(function () {
  'use strict';

  /* ─── 1. Apply config.js ────────────────────────────────
     This runs first and sets every configurable value.
     CONFIG is defined in config.js which loads before this file.
  ──────────────────────────────────────────────────────── */

  if (typeof CONFIG !== 'undefined') {
    applyConfig(CONFIG);
  }

  function applyConfig(cfg) {
    applyTheme(cfg.theme);
    applyText(cfg);
    renderStats(cfg.stats);
    renderSpotlight(cfg);
    renderAllProducts(cfg.products);
    applyContactDetails(cfg.contact);
  }

  /* Apply CSS custom properties so colours and fonts update everywhere */
  function applyTheme(t) {
    if (!t) return;
    const root = document.documentElement;
    const set = (prop, val) => val && root.style.setProperty(prop, val);

    set('--bg',          t.background);
    set('--surface',     t.surface);
    set('--surface-2',   t.surface2);
    set('--surface-3',   t.surface3);
    set('--gold',        t.gold);
    set('--gold-light',  t.goldLight);
    set('--gold-dark',   t.goldDark);
    set('--white',       t.white);
    set('--muted',       t.muted);
    set('--dim',         t.dim);
    set('--font-display',t.headlineFont);
    set('--font-body',   t.bodyFont);

    // Gold glow and border derive from --gold, recalculate when gold changes
    if (t.gold) {
      const hex = t.gold.replace('#', '');
      const r = parseInt(hex.slice(0,2),16);
      const g = parseInt(hex.slice(2,4),16);
      const b = parseInt(hex.slice(4,6),16);
      root.style.setProperty('--border',    `rgba(${r},${g},${b},0.14)`);
      root.style.setProperty('--gold-glow', `rgba(${r},${g},${b},0.08)`);
    }
  }

  /* Apply brand name, tagline, and hero text to all matching elements */
  function applyText(cfg) {
    // Helper: set textContent on first match of a selector
    const setText = (sel, val) => {
      if (!val) return;
      document.querySelectorAll(sel).forEach(el => { el.textContent = val; });
    };
    const setHTML = (sel, val) => {
      if (!val) return;
      document.querySelectorAll(sel).forEach(el => { el.innerHTML = val; });
    };

    // Brand name (logo, footer)
    setText('.logo-text',   cfg.brand?.name);
    setText('.footer-logo', cfg.brand?.name);
    setText('.footer-tagline', cfg.brand?.tagline);

    // Hero text
    setText('#cfg-hero-eyebrow',  cfg.hero?.eyebrow);
    setText('#cfg-hero-line1',    cfg.hero?.line1);
    setText('#cfg-hero-line2',    cfg.hero?.line2);
    setText('#cfg-hero-line3',    cfg.hero?.line3);
    setText('#cfg-hero-subtitle', cfg.hero?.subtitle);

    // Contact email links (href + text)
    if (cfg.contact?.email) {
      document.querySelectorAll('.cfg-contact-email').forEach(el => {
        el.textContent = cfg.contact.email;
        el.href = `mailto:${cfg.contact.email}`;
      });
    }

    // Footer address
    setText('#cfg-footer-addr1',   cfg.contact?.address?.line1);
    setText('#cfg-footer-addr2',   cfg.contact?.address?.line2);
    setText('#cfg-footer-country', cfg.contact?.address?.country);
  }

  /* Render the stats bar from CONFIG.stats */
  function renderStats(stats) {
    const container = document.getElementById('cfg-stats');
    if (!container || !stats?.length) return;

    container.innerHTML = stats.map(s => `
      <li class="stat-item reveal">
        <span class="stat-number" aria-label="${s.number} ${s.unit}">${s.number}</span>
        <span class="stat-unit" aria-hidden="true">${s.unit}</span>
        <span class="stat-label">${s.label}</span>
      </li>
    `).join('');
  }

  /* Render the homepage spotlight section from the matching product */
  function renderSpotlight(cfg) {
    const container = document.getElementById('cfg-spotlight-inner');
    if (!container) return;

    const product = cfg.products?.find(p => p.id === cfg.spotlight?.productId);
    if (!product) return;

    const badge    = cfg.spotlight?.badge  || product.badge || '';
    const eyebrow  = cfg.spotlight?.eyebrow || '';
    const imgHtml  = buildImageHtml(product, 'spotlight-media');
    const specsHtml = product.specs?.length
      ? `<ul class="spotlight-specs" aria-label="Product specifications">
          ${product.specs.map(s => `
            <li>
              <span class="spec-label">${s.label}</span>
              <span class="spec-value">${s.value}</span>
            </li>
          `).join('')}
        </ul>`
      : '';

    container.innerHTML = `
      <div class="spotlight-media reveal">
        ${imgHtml}
        ${badge ? `<div class="spotlight-badge" aria-label="${badge}">${badge}</div>` : ''}
      </div>
      <div class="spotlight-content reveal">
        ${eyebrow ? `<p class="section-eyebrow">${eyebrow}</p>` : ''}
        <h2 class="section-title">${product.name}</h2>
        <p class="spotlight-desc">${product.desc}</p>
        ${specsHtml}
        <div class="spotlight-price">
          <span class="price-label">Starting from</span>
          <span class="price-value">${product.price}</span>
        </div>
        <a href="contact.html?product=${product.id}" class="btn btn--gold">Enquire Now</a>
      </div>
    `;
  }

  /* Render product grids (collection page and any other page with cfg-products-* containers) */
  function renderAllProducts(products) {
    if (!products?.length) return;

    const categories = ['watch', 'device', 'audio'];
    categories.forEach(cat => {
      const container = document.getElementById(`cfg-products-${cat}`);
      if (!container) return;

      const filtered = products.filter(p => p.category === cat);
      container.innerHTML = filtered.map(productCardHtml).join('');
    });
  }

  /* Build a single product card HTML string */
  function productCardHtml(product) {
    const labels = { watch: 'Timepiece', device: 'Device', audio: 'Audio' };
    const imgHtml = buildImageHtml(product, 'product-card-img');
    return `
      <article class="product-card reveal is-visible" data-category="${product.category}">
        <div class="product-card-img">
          ${imgHtml}
          ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-card-body">
          <p class="product-card-cat">${labels[product.category] || product.category}</p>
          <h2 class="product-card-name">${product.name}</h2>
          <p class="product-card-desc">${product.desc}</p>
          <div class="product-card-footer">
            <span class="product-price">${product.price}</span>
            <a href="contact.html?product=${product.id}" class="btn btn--outline-gold">Enquire</a>
          </div>
        </div>
      </article>
    `;
  }

  /* Build image HTML — handles CSS class placeholders OR real image objects */
  function buildImageHtml(product, context) {
    if (!product.image) return '';
    if (typeof product.image === 'string') {
      // CSS class placeholder
      return `<div class="img-placeholder ${product.image}" role="img" aria-label="${product.name}"></div>`;
    }
    // Real image object: { src: "path.webp", alt: "description" }
    return `
      <picture>
        <img
          src="${product.image.src}"
          alt="${product.image.alt || product.name}"
          loading="lazy"
          decoding="async"
          style="width:100%;height:100%;object-fit:cover;"
        >
      </picture>
    `;
  }

  /* Apply contact details to the contact page */
  function applyContactDetails(contact) {
    if (!contact) return;
    const setText = (id, val) => {
      const el = document.getElementById(id);
      if (el && val) el.textContent = val;
    };
    setText('cfg-contact-weekdays',  contact.hours?.weekdays);
    setText('cfg-contact-saturday',  contact.hours?.saturday);
    setText('cfg-contact-sunday',    contact.hours?.sunday);
    setText('cfg-contact-addr1',     contact.address?.line1);
    setText('cfg-contact-addr2',     contact.address?.line2);
    setText('cfg-contact-country',   contact.address?.country);

    if (contact.email) {
      document.querySelectorAll('.cfg-contact-email').forEach(el => {
        el.textContent = contact.email;
        el.href = `mailto:${contact.email}`;
      });
    }
  }


  /* ─── 2. Nav: add backdrop on scroll ────────────────────── */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── 3. Mobile menu toggle ─────────────────────────────── */
  const toggle  = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* ─── 4. Scroll reveal (IntersectionObserver) ───────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal--card, .reveal--left, .reveal--right');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  }

  /* ─── 5. Custom cursor ──────────────────────────────────── */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(calc(-50% + ${mouseX}px), calc(-50% + ${mouseY}px))`;
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(calc(-50% + ${ringX}px), calc(-50% + ${ringY}px))`;
      requestAnimationFrame(animateRing);
    };
    requestAnimationFrame(animateRing);
  }

  /* ─── 6. Collection filter ──────────────────────────────── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterBtns.length && productCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        const filter = btn.dataset.filter;
        document.querySelectorAll('.product-card').forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.style.display = show ? '' : 'none';
          if (show) {
            card.classList.remove('is-visible');
            requestAnimationFrame(() => card.classList.add('is-visible'));
          }
        });
      });
    });
  }

  /* ─── 7. Newsletter form ────────────────────────────────── */
  const newsletterForm    = document.getElementById('newsletter-form');
  const newsletterSubmit  = document.getElementById('newsletter-submit');
  const newsletterSuccess = document.getElementById('newsletter-success');
  const newsletterError   = document.getElementById('newsletter-error');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async e => {
      e.preventDefault();

      const emailInput = newsletterForm.querySelector('#newsletter-email');
      const honeypot   = newsletterForm.querySelector('[name="website"]');

      if (honeypot && honeypot.value) return;

      const email = emailInput.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.classList.add('is-error');
        if (newsletterError) newsletterError.hidden = false;
        if (newsletterSuccess) newsletterSuccess.hidden = true;
        emailInput.focus();
        return;
      }

      emailInput.classList.remove('is-error');
      if (newsletterError) newsletterError.hidden = true;
      if (newsletterSubmit) { newsletterSubmit.classList.add('is-loading'); newsletterSubmit.disabled = true; }

      try {
        /* Replace YOUR_FORM_ID with your Formspree form ID */
        const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (res.ok) {
          if (newsletterSuccess) newsletterSuccess.hidden = false;
          newsletterForm.reset();
        } else {
          if (newsletterError) newsletterError.hidden = false;
        }
      } catch (err) {
        console.error('Newsletter form error:', err);
        if (newsletterError) newsletterError.hidden = false;
      }
      finally {
        if (newsletterSubmit) { newsletterSubmit.classList.remove('is-loading'); newsletterSubmit.disabled = false; }
      }
    });

    const emailInput = newsletterForm.querySelector('#newsletter-email');
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        emailInput.classList.remove('is-error');
        if (newsletterError) newsletterError.hidden = true;
      });
    }
  }

  /* ─── 8. Enquiry form ───────────────────────────────────── */
  const enquiryForm = document.getElementById('enquiry-form');

  if (enquiryForm) {
    const submit     = enquiryForm.querySelector('#enquiry-submit');
    const successMsg = document.getElementById('enquiry-success');
    const errorMsg   = document.getElementById('enquiry-error');
    const required   = enquiryForm.querySelectorAll('[required]');

    const validateField = input => {
      const group = input.closest('.field-group');
      if (!group) return true;
      const valid = input.type === 'email'
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
        : input.type === 'checkbox' ? input.checked : input.value.trim().length > 0;
      group.classList.toggle('has-error', !valid);
      return valid;
    };

    required.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.closest('.field-group')?.classList.contains('has-error')) validateField(input);
      });
      input.addEventListener('change', () => {
        if (input.closest('.field-group')?.classList.contains('has-error')) validateField(input);
      });
    });

    enquiryForm.addEventListener('submit', async e => {
      e.preventDefault();

      const honeypot = enquiryForm.querySelector('[name="website"]');
      if (honeypot && honeypot.value) return;

      let allValid = true;
      required.forEach(input => { if (!validateField(input)) allValid = false; });

      if (!allValid) {
        const firstError = enquiryForm.querySelector('.has-error input, .has-error select, .has-error textarea');
        if (firstError) firstError.focus();
        return;
      }

      if (submit) { submit.classList.add('is-loading'); submit.disabled = true; }
      if (errorMsg) errorMsg.hidden = true;

      try {
        const data = Object.fromEntries(new FormData(enquiryForm));
        delete data.website;
        /* Replace YOUR_FORM_ID with your Formspree form ID */
        const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          if (successMsg) successMsg.hidden = false;
          enquiryForm.reset();
          enquiryForm.style.display = 'none';
        } else {
          if (errorMsg) errorMsg.hidden = false;
        }
      } catch (err) {
        console.error('Enquiry form error:', err);
        if (errorMsg) errorMsg.hidden = false;
      }
      finally { if (submit) { submit.classList.remove('is-loading'); submit.disabled = false; } }
    });
  }

  /* ─── 9. Active nav link ────────────────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href')?.split('#')[0] || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ─── 10. Footer year ───────────────────────────────────── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── 11. Page fade-in ──────────────────────────────────── */
  document.body.classList.add('page-fade');

  /* ─── 12. 3D watch rotation on scroll ──────────────────── */
  (function initWatchRotation() {
    const watch   = document.getElementById('js-watch-3d');
    const section = document.getElementById('craft-section');
    if (!watch || !section) return;

    // Set hands to current time
    const hourEl = document.getElementById('js-w-hour');
    const minEl  = document.getElementById('js-w-minute');
    if (hourEl && minEl) {
      const now = new Date();
      const h   = (now.getHours() % 12) + now.getMinutes() / 60;
      const m   = now.getMinutes() + now.getSeconds() / 60;
      hourEl.style.transform = `rotate(${h * 30}deg)`;
      minEl.style.transform  = `rotate(${m * 6}deg)`;
    }

    // Sync brand name in the dial
    const logoEl = watch.querySelector('.w-logo');
    if (logoEl && typeof CONFIG !== 'undefined' && CONFIG.brand?.name) {
      logoEl.textContent = CONFIG.brand.name;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    function update() {
      const rect   = section.getBoundingClientRect();
      const totalH = window.innerHeight + section.offsetHeight;
      const p = Math.max(0, Math.min(1, 1 - rect.bottom / totalH));
      const rotY = -38 + p * 52;  // -38deg → +14deg as section scrolls past
      const rotX =  10 - p * 18;  //  10deg → -8deg
      watch.style.transform = `perspective(1400px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });

    update();
  })();

})();
