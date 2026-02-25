/* ============================================================
   M&K Adventure - Global JavaScript
   Sticky header, mobile menu, mega menu, scroll reveals,
   language toggle, WhatsApp float, smooth scroll
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initMegaMenu();
  initScrollReveal();
  initLanguageToggle();
  initWhatsAppFloat();
  initSmoothScroll();
  initAccordions();
  lucide.createIcons();
});

/* --- Sticky Header with Scroll Shrink --- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  const threshold = 50;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > threshold) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* --- Mobile Menu Overlay --- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-active');
    mobileMenu.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Mobile accordion for services
  const accordions = mobileMenu.querySelectorAll('.mobile-menu__accordion');
  accordions.forEach(acc => {
    const trigger = acc.querySelector('.mobile-menu__accordion-trigger');
    trigger.addEventListener('click', () => {
      acc.classList.toggle('is-open');
    });
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Desktop Mega Menu --- */
function initMegaMenu() {
  const dropdown = document.querySelector('.nav__dropdown');
  if (!dropdown) return;

  const trigger = dropdown.querySelector('.nav__dropdown-trigger');
  let closeTimeout;

  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(closeTimeout);
    dropdown.classList.add('is-open');
  });

  dropdown.addEventListener('mouseleave', () => {
    closeTimeout = setTimeout(() => {
      dropdown.classList.remove('is-open');
    }, 200);
  });

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('is-open');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('is-open');
    }
  });
}

/* --- IntersectionObserver Scroll Reveals --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- EN/ES Language Toggle --- */
function initLanguageToggle() {
  const currentLang = localStorage.getItem('mk-lang') || 'en';
  applyLanguage(currentLang);

  // Desktop toggle
  document.querySelectorAll('.lang-toggle').forEach(toggle => {
    const options = toggle.querySelectorAll('.lang-toggle__option');
    options.forEach(opt => {
      opt.classList.toggle('is-active', opt.dataset.lang === currentLang);
      opt.addEventListener('click', () => {
        const lang = opt.dataset.lang;
        localStorage.setItem('mk-lang', lang);
        applyLanguage(lang);
        // Update all toggles
        document.querySelectorAll('.lang-toggle__option').forEach(o => {
          o.classList.toggle('is-active', o.dataset.lang === lang);
        });
      });
    });
  });

  // Mobile toggle buttons
  document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      localStorage.setItem('mk-lang', lang);
      applyLanguage(lang);
      document.querySelectorAll('.lang-toggle__option').forEach(o => {
        o.classList.toggle('is-active', o.dataset.lang === lang);
      });
    });
  });
}

function applyLanguage(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`) || el.getAttribute('data-en');
  });
  document.documentElement.lang = lang;
}

/* --- WhatsApp Floating Button --- */
function initWhatsAppFloat() {
  const btn = document.querySelector('.whatsapp-float');
  if (!btn) return;

  setTimeout(() => {
    btn.classList.add('is-visible');
  }, 2000);
}

/* --- Smooth Anchor Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* --- Accordions (global) --- */
function initAccordions() {
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const content = item.querySelector('.accordion__content');
      const isOpen = item.classList.contains('is-open');

      // Close siblings
      const parent = item.parentElement;
      parent.querySelectorAll('.accordion__item.is-open').forEach(sibling => {
        if (sibling !== item) {
          sibling.classList.remove('is-open');
          sibling.querySelector('.accordion__content').style.maxHeight = null;
        }
      });

      // Toggle current
      item.classList.toggle('is-open', !isOpen);
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = null;
      }
    });
  });
}
