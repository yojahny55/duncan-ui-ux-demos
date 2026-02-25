/* ============================================================
   Blog Page JavaScript
   Category filter, load more
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initBlogFilters();
  initLoadMore();
});

/* --- Category Filter --- */
function initBlogFilters() {
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const cards = document.querySelectorAll('.blog-grid .blog-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.category;
      cards.forEach((card, i) => {
        const show = filter === 'all' || card.dataset.category === filter;
        if (show) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- Load More --- */
function initLoadMore() {
  const btn = document.querySelector('.load-more-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const lang = localStorage.getItem('mk-lang') || 'en';
    btn.textContent = lang === 'es' ? 'No hay más artículos' : 'No more posts';
    btn.disabled = true;
    btn.classList.remove('btn--outline');
    btn.classList.add('btn--dark');
  });
}
