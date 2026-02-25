/**
 * MK Adventure - Glassmorphism + Aurora UI
 * Premium Travel Agency
 */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initLanguageSwitch();
    initSmoothScroll();
    initNavScroll();
    initFaqAccordion();
});

/**
 * Language Switcher
 */
function initLanguageSwitch() {
    const buttons = document.querySelectorAll('.lang-toggle .lang-btn');
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
        document.querySelector(`.lang-toggle .lang-btn[data-lang="${stored}"]`)?.click();
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
                const offset = 100; // Nav height
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
    const nav = document.querySelector('.glass-nav');
    if (!nav) return;
    
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const container = nav.querySelector('.nav-container');
                if (window.scrollY > 50) {
                    container.style.background = 'rgba(15, 23, 42, 0.9)';
                    container.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
                } else {
                    container.style.background = 'var(--glass-bg)';
                    container.style.boxShadow = 'none';
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items in the same category
            const category = item.closest('.faq-category');
            const siblings = category.querySelectorAll('.faq-item');
            
            siblings.forEach(sibling => {
                if (sibling !== item && sibling.classList.contains('active')) {
                    sibling.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}
