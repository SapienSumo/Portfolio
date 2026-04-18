'use strict';

// ── THEME TOGGLE ─────────────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ── MOBILE NAV ───────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});

// Close nav when a link is clicked
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  });
});

// ── HEADER SCROLL STATE ──────────────────────────────────────
const header = document.getElementById('header');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 20;
  header.classList.toggle('scrolled', scrolled);
  scrollTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// ── ACTIVE NAV LINK ──────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const observeSection = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observeSection.observe(s));

// ── PROJECT FILTER ───────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter;
      card.classList.toggle('hidden', !show);
      if (show) {
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeIn 0.3s ease forwards';
      }
    });
  });
});

// ── SCROLL REVEAL ────────────────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.expertise__card, .project-card, .timeline__item, .testimonial, .section__title, .work__intro, .hero__content'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => revealObserver.observe(el));

// ── CONTACT FORM ─────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate send (replace with real API call)
  setTimeout(() => {
    btn.textContent = 'Message Sent!';
    btn.style.background = 'var(--text-muted)';
    contactForm.reset();

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  }, 1200);
});

// ── FADE-IN KEYFRAME (injected) ───────────────────────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
