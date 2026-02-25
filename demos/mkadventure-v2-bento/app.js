// MK Adventure v2 Bento
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Language toggle
    const btns = document.querySelectorAll('.lang-btn');
    let lang = localStorage.getItem('mk-lang') || 'es';
    if (lang !== 'es') apply(lang);
    
    btns.forEach(b => b.addEventListener('click', () => {
        lang = b.dataset.lang;
        apply(lang);
        btns.forEach(x => x.classList.toggle('active', x.dataset.lang === lang));
        localStorage.setItem('mk-lang', lang);
    }));
    
    function apply(l) {
        document.querySelectorAll('.t').forEach(el => {
            if (el.dataset[l]) el.textContent = el.dataset[l];
        });
        document.documentElement.lang = l;
    }
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const el = document.querySelector(id);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
