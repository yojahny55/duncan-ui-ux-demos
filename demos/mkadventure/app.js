/**
 * MK Adventure - Premium Travel Agency
 * Minimal, purposeful JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initLanguageSwitch();
    initSmoothScroll();
    initNavScroll();
});

/**
 * Language Switcher
 */
function initLanguageSwitch() {
    const buttons = document.querySelectorAll('.lang-switch button');
    let currentLang = 'es';

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang === currentLang) return;

            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.translatable').forEach(el => {
                const text = el.dataset[lang];
                if (text) el.textContent = text;
            });

            document.documentElement.lang = lang;
            currentLang = lang;
            localStorage.setItem('mk-lang', lang);
        });
    });

    // Check stored preference
    const stored = localStorage.getItem('mk-lang');
    if (stored && stored !== 'es') {
        document.querySelector(`.lang-switch button[data-lang="${stored}"]`)?.click();
    }
}

/**
 * Smooth Scroll for Anchors
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80; // Nav height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

/**
 * Nav Background on Scroll
 */
function initNavScroll() {
    const nav = document.querySelector('.nav');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    nav.style.background = 'rgba(250, 250, 250, 0.98)';
                    nav.style.boxShadow = '0 1px 20px rgba(0,0,0,0.08)';
                } else {
                    nav.style.background = 'rgba(250, 250, 250, 0.9)';
                    nav.style.boxShadow = 'none';
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}
