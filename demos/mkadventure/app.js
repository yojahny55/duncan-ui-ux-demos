/**
 * MK Adventure - Bento Box Grid
 * Minimal, performant JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initLanguageSwitch();
    initSmoothScroll();
});

/**
 * Language Switcher
 */
function initLanguageSwitch() {
    const buttons = document.querySelectorAll('.lang-toggle .lang-btn');
    let currentLang = localStorage.getItem('mk-lang') || 'es';

    // Apply stored language on load
    if (currentLang !== 'es') {
        applyLanguage(currentLang);
        buttons.forEach(b => {
            b.classList.toggle('active', b.dataset.lang === currentLang);
        });
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang === currentLang) return;

            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            applyLanguage(lang);
            currentLang = lang;
            localStorage.setItem('mk-lang', lang);
        });
    });
}

function applyLanguage(lang) {
    document.querySelectorAll('.t').forEach(el => {
        const text = el.dataset[lang];
        if (text) el.textContent = text;
    });
    document.documentElement.lang = lang;
}

/**
 * Smooth Scroll for Anchors
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}
