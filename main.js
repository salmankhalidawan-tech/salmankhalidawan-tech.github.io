/* ============================================================
   SALMAN AWAN PORTFOLIO – main.js
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

/* ── Letter-reveal hero name ──────────────────────────────────── */
const heroName = document.getElementById('heroName');
if (heroName) {
  const lines = heroName.querySelectorAll('.line');
  let globalIndex = 0;
  lines.forEach(line => {
    const text = line.textContent;
    line.textContent = '';
    text.split('').forEach(ch => {
      const span = document.createElement('span');
      span.className = 'letter' + (ch === ' ' ? ' space' : '');
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.transitionDelay = `${0.25 + globalIndex * 0.028}s`;
      line.appendChild(span);
      globalIndex++;
    });
  });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      heroName.querySelectorAll('.letter').forEach(l => l.classList.add('in'));
    });
  });
}

/* ── Interactive particle constellation background ───────────── */
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function initParticles() {
  const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 16000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.4 + 0.5
  }));
}
resizeCanvas();
initParticles();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    if (mouse.x !== null) {
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 130) {
        const force = (130 - dist) / 130 * 0.6;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(220, 230, 255, 0.55)';
    ctx.fill();
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(91, 140, 255, ${0.12 * (1 - dist / 130)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawFrame);
}

if (!prefersReducedMotion) {
  requestAnimationFrame(drawFrame);
} else {
  drawFrame();
}

/* ── Custom cursor ─────────────────────────────────────────────── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

if (!isCoarsePointer) {
  let ringX = window.innerWidth / 2, ringY = window.innerHeight / 2;
  let targetX = ringX, targetY = ringY;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX; targetY = e.clientY;
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });

  function animateRing() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .panel').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
  });
}

/* ── Magnetic buttons ──────────────────────────────────────────── */
if (!isCoarsePointer) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${relX * 0.25}px, ${relY * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0, 0)'; });
  });
}

/* ── Scroll progress bar ───────────────────────────────────────── */
const progressBar = document.getElementById('progress');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${pct}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

/* ── Nav: 'scrolled' state ──────────────────────────────────────── */
const nav = document.getElementById('nav');
function handleNavScroll() { nav.classList.toggle('scrolled', window.scrollY > 20); }
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

/* ── Mobile menu ──────────────────────────────────────────────────*/
const burger      = document.getElementById('burger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu(open) {
  burger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
burger.addEventListener('click', () => toggleMenu(!mobileMenu.classList.contains('open')));
mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('click', (e) => {
  if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !burger.contains(e.target)) {
    toggleMenu(false);
  }
});

/* ── Scroll reveal ─────────────────────────────────────────────────*/
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ── Active nav + dot nav tracking ───────────────────────────────*/
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');
const dots      = document.querySelectorAll('.dotnav__dot');

function setActiveSection(id) {
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  dots.forEach(dot => dot.classList.toggle('active', dot.dataset.target === id));
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActiveSection(entry.target.getAttribute('id'));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(sec => sectionObserver.observe(sec));

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const target = document.getElementById(dot.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Contact form (Web3Forms) ────────────────────────────────────*/
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name  = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg   = document.getElementById('fmsg').value.trim();
  const key   = form.querySelector('input[name="access_key"]').value;

  if (!name || !email || !msg) {
    formNote.textContent = 'Please fill in all fields.';
    formNote.style.color = '#F87171';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formNote.textContent = 'Please enter a valid email address.';
    formNote.style.color = '#F87171';
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ access_key: key, name, email, message: msg })
  })
  .then(async (response) => {
    const data = await response.json();
    if (response.status === 200 || data.success) {
      form.reset();
      form.querySelector('input[name="access_key"]').value = key;
      formNote.textContent = 'Message sent. I will get back to you soon.';
      formNote.style.color = '#4ADE80';
    } else {
      formNote.textContent = data.message || 'Something went wrong.';
      formNote.style.color = '#F87171';
    }
  })
  .catch(() => {
    formNote.textContent = 'Network error. Please try again later.';
    formNote.style.color = '#F87171';
  })
  .finally(() => {
    btn.textContent = 'Send message';
    btn.disabled = false;
  });
});

/* ── Smooth anchor scroll ─────────────────────────────────────────*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
