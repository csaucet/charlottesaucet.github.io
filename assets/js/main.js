/* ============================================================
   NAVBAR — scroll shadow + active link
   ============================================================ */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Shadow on scroll
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});

/* ============================================================
   MOBILE MENU
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navLinksList = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});

// Close on link click
navLinksList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinksList.classList.remove('open'));
});

/* ============================================================
   FADE-IN ON SCROLL
   ============================================================ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ============================================================
   PUBLICATION FILTER
   ============================================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const pubCards = document.querySelectorAll('.pub-card');
const pubGroups = document.querySelectorAll('.pub-group');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    pubCards.forEach(card => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    // Hide group titles if all cards in group are hidden
    pubGroups.forEach(group => {
      const visible = group.querySelectorAll('.pub-card:not(.hidden)').length;
      group.style.display = visible === 0 ? 'none' : '';
    });
  });
});

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
