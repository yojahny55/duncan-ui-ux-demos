/* ============================================================
   Service Pages JavaScript
   Accordion, process steps, form validation, toggles
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initServiceFormValidation();
  initToggleGroup();
});

/* --- Service Form Validation --- */
function initServiceFormValidation() {
  const forms = document.querySelectorAll('.service-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      form.querySelectorAll('.form-group--error').forEach(g => g.classList.remove('form-group--error'));

      // Validate required fields
      form.querySelectorAll('[required]').forEach(input => {
        const group = input.closest('.form-group');
        if (!input.value.trim()) {
          valid = false;
          if (group) group.classList.add('form-group--error');
        }
      });

      // Validate email fields
      form.querySelectorAll('input[type="email"]').forEach(input => {
        if (input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          valid = false;
          const group = input.closest('.form-group');
          if (group) group.classList.add('form-group--error');
        }
      });

      if (valid) {
        // Show success feedback
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        const lang = localStorage.getItem('mk-lang') || 'en';
        btn.textContent = lang === 'es' ? '¡Enviado!' : 'Sent!';
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
  });
}

/* --- Toggle Group (Personal/Business etc.) --- */
function initToggleGroup() {
  document.querySelectorAll('.toggle-group').forEach(group => {
    const buttons = group.querySelectorAll('.toggle-group__btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        // Toggle associated content panels
        const target = btn.dataset.target;
        if (target) {
          const parent = group.closest('section') || document;
          parent.querySelectorAll('.toggle-panel').forEach(panel => {
            panel.style.display = panel.id === target ? 'block' : 'none';
          });
        }
      });
    });
  });
}
