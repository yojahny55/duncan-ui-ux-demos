/* ============================================================
   Travel Page JavaScript
   Search tabs, main content tabs, destination filters
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSearchTabs();
  initTravelTabs();
  initDestinationFilters();
  initTravelForm();
});

/* --- Search Widget Tabs --- */
function initSearchTabs() {
  const tabs = document.querySelectorAll('.search-widget__tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
    });
  });
}

/* --- Main Travel Tabs (Flights, Cruises, Packages) --- */
function initTravelTabs() {
  const tabBtns = document.querySelectorAll('.travel-tabs .tabs__btn');
  const tabPanels = document.querySelectorAll('.travel-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('is-active'));
      tabPanels.forEach(p => p.classList.remove('is-active'));
      btn.classList.add('is-active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('is-active');
    });
  });
}

/* --- Destination Filter Buttons --- */
function initDestinationFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.dest-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          requestAnimationFrame(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- Travel Inquiry Form --- */
function initTravelForm() {
  const form = document.querySelector('.travel-form');
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

    if (valid) {
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
}
