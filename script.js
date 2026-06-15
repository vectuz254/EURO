/* ═══════════════════════════════════════
   JOINT HANDS CHARITY — script.js
═══════════════════════════════════════ */
 
// ── NAVBAR: scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });
 
// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
 
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
 
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
 
// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});
 
// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Ease out
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(step);
}
 
// Trigger counters when in view
const counterEls = document.querySelectorAll('.impact-number, .badge-number[data-target]');
 
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });
 
counterEls.forEach(el => counterObserver.observe(el));
 
// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll(
  '.service-card, .photo-item, .impact-item, .donate-method, .about-text, .about-image'
);
 
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger slightly for grid items
      const delay = (entry.target.dataset.delay || 0);
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
 
// Add stagger delays to grid children
document.querySelectorAll('.services-grid .service-card').forEach((el, i) => {
  el.dataset.delay = i * 80;
});
document.querySelectorAll('.photo-grid .photo-item').forEach((el, i) => {
  el.dataset.delay = i * 60;
});
 
// Inject initial hidden state via JS (so it degrades gracefully without JS)
const style = document.createElement('style');
style.textContent = `
  .service-card,
  .photo-item,
  .impact-item,
  .donate-method,
  .about-text,
  .about-image {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .service-card.revealed,
  .photo-item.revealed,
  .impact-item.revealed,
  .donate-method.revealed,
  .about-text.revealed,
  .about-image.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
 
revealEls.forEach(el => revealObserver.observe(el));
 
// ── ACTIVE NAV LINK on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');
 
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchorLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
 
sections.forEach(s => sectionObserver.observe(s));
 
// Inject active link style
const navStyle = document.createElement('style');
navStyle.textContent = `.nav-links a.active:not(.nav-cta) { color: var(--gold) !important; }`;
document.head.appendChild(navStyle);
 
// ── SMOOTH HERO PARALLAX (subtle) ──
window.addEventListener('scroll', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && window.scrollY < window.innerHeight) {
    heroContent.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    heroContent.style.opacity   = 1 - window.scrollY / (window.innerHeight * 0.7);
  }
}, { passive: true });
