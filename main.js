/* ============================================================
   SALMAN AWAN PORTFOLIO – main.js
   Handles: nav scroll, mobile menu, scroll reveal, form
   ============================================================ */

// ── Nav: add 'scrolled' class on scroll ──────────────────────
const nav = document.getElementById('nav');
function handleNavScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ── Theme toggle ──────────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const sunIcon = themeToggle.querySelector('.sun-icon');
const moonIcon = themeToggle.querySelector('.moon-icon');

const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  const activeTheme = document.documentElement.getAttribute('data-theme');
  setTheme(activeTheme === 'dark' ? 'light' : 'dark');
});

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (theme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

// ── Mobile menu toggle ────────────────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu(open) {
  burger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  toggleMenu(!isOpen);
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (
    mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    toggleMenu(false);
  }
});

// ── Scroll reveal (Intersection Observer) ────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

// ── Active nav link highlighting ─────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(sec => sectionObserver.observe(sec));

// ── Contact form (Web3Forms Backend integration) ──────────────
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name  = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg   = document.getElementById('fmsg').value.trim();
  const key   = form.querySelector('input[name="access_key"]').value;

  if (!name || !email || !msg) {
    formNote.textContent = '⚠ Please fill in all fields.';
    formNote.style.color = '#EF4444';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formNote.textContent = '⚠ Please enter a valid email address.';
    formNote.style.color = '#EF4444';
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const formData = {
    access_key: key,
    name: name,
    email: email,
    message: msg
  };

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(async (response) => {
    const data = await response.json();
    if (response.status === 200 || data.success) {
      form.reset();
      form.querySelector('input[name="access_key"]').value = key;
      formNote.textContent = '✓ Message sent! I\'ll get back to you soon.';
      formNote.style.color = '#2563EB';
    } else {
      formNote.textContent = `⚠ ${data.message || 'Error sending message.'}`;
      formNote.style.color = '#EF4444';
    }
  })
  .catch(() => {
    formNote.textContent = '⚠ Network error. Please try again later.';
    formNote.style.color = '#EF4444';
  })
  .finally(() => {
    btn.textContent = 'Send Message';
    btn.disabled = false;
  });
});

// ── Smooth anchor scroll (polyfill for older browsers) ────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
