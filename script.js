/* ─── NAVBAR SCROLL EFFECT ─── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled shadow
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link highlight
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}, { passive: true });

/* ─── MOBILE NAV TOGGLE ─── */
const navToggle = document.getElementById('navToggle');
const navLinksMenu = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinksMenu.classList.toggle('open');
});

// Close mobile menu on link click
navLinksMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksMenu.classList.remove('open');
  });
});

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─── FADE-UP INTERSECTION OBSERVER ─── */
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling elements
        const siblings = [...entry.target.parentElement.querySelectorAll('.fade-up')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 0.07}s`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

/* ─── CONTACT FORM ─── */
function sendMessage() {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const msgEl   = document.getElementById('form-msg');
  const btn     = document.getElementById('sendBtn');

  // Basic validation
  if (!name || !email || !subject || !message) {
    msgEl.textContent = 'Please fill in all required fields.';
    msgEl.className = 'form-msg error';
    shake(btn);
    return;
  }

  if (!isValidEmail(email)) {
    msgEl.textContent = 'Please enter a valid email address.';
    msgEl.className = 'form-msg error';
    return;
  }

  // Simulate send (replace with real API / EmailJS / formspree)
  btn.disabled = true;
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" stroke-dasharray="31.4" stroke-dashoffset="31.4" style="animation:spin 1s linear infinite"/>
    </svg>
    Sending…
  `;

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = `
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Message Sent!
    `;
    msgEl.textContent = '✓ Your message has been sent! I\'ll get back to you soon.';
    msgEl.className = 'form-msg success';

    // Reset after 3s
    setTimeout(() => {
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('subject').value = '';
      document.getElementById('message').value = '';
      btn.innerHTML = `
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
        Send Message
      `;
      msgEl.textContent = '';
    }, 3000);
  }, 1500);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shake(el) {
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'shake .4s ease';
  setTimeout(() => el.style.animation = '', 400);
}

/* ─── INJECT KEYFRAMES ─── */
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { stroke-dashoffset: 0; }
  }
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(style);

/* ─── HERO FADE IN ON LOAD ─── */
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.transitionDelay = '0.1s';
    heroContent.classList.add('visible');
  }
});