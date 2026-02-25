/* ============================================================
   Contact Page JavaScript
   Contact form validation, map lazy load
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initMapLazyLoad();
});

/* --- Contact Form Validation --- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('.form-group--error').forEach(g => g.classList.remove('form-group--error'));

    form.querySelectorAll('[required]').forEach(input => {
      const group = input.closest('.form-group');
      if (!input.value.trim()) {
        valid = false;
        if (group) group.classList.add('form-group--error');
      }
    });

    // Validate email
    const email = form.querySelector('input[type="email"]');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      valid = false;
      const group = email.closest('.form-group');
      if (group) group.classList.add('form-group--error');
    }

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      const lang = localStorage.getItem('mk-lang') || 'en';
      btn.textContent = lang === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!';
      btn.style.background = 'var(--success)';
      btn.style.borderColor = 'var(--success)';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }
  });
}

/* --- Map Lazy Load --- */
function initMapLazyLoad() {
  const mapContainer = document.querySelector('.map-section[data-map-src]');
  if (!mapContainer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = document.createElement('iframe');
        iframe.src = mapContainer.dataset.mapSrc;
        iframe.title = 'M&K Adventure Location';
        iframe.loading = 'lazy';
        iframe.allowFullscreen = true;
        mapContainer.appendChild(iframe);
        observer.unobserve(mapContainer);
      }
    });
  }, { rootMargin: '200px' });

  observer.observe(mapContainer);
}
