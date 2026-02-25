/**
 * MK Adventure — V2 Bento Grid
 */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initLang();
    initScroll();
});

function initLang() {
    const btns = document.querySelectorAll('.lang-btn');
    let lang = localStorage.getItem('mk-lang') || 'es';
    
    if (lang !== 'es') applyLang(lang);
    
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            lang = btn.dataset.lang;
            applyLang(lang);
            btns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
            localStorage.setItem('mk-lang', lang);
        });
    });
    
    function applyLang(l) {
        document.querySelectorAll('.t').forEach(el => {
            if (el.dataset[l]) el.textContent = el.dataset[l];
        });
        document.documentElement.lang = l;
    }
}

function initScroll() {
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
}
