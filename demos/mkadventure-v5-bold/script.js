/* ========================================
   MK Adventure v5 — Bold/Brutalist
   High contrast, sharp interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons with retry for deferred loading
    function initLucide() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
            return true;
        }
        return false;
    }
    
    // Try immediately
    if (!initLucide()) {
        // If not loaded yet, try again after a short delay
        setTimeout(initLucide, 100);
        // And again on window load as final fallback
        window.addEventListener('load', initLucide);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ========================================
    // Navigation
    // ========================================
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    
    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
            document.body.classList.toggle('nav-open');
        });
    }

    // ========================================
    // Language Switching
    // ========================================
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = 'es';

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang === currentLang) return;

            currentLang = lang;
            
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.t').forEach(el => {
                const text = el.dataset[lang];
                if (text) {
                    el.textContent = text;
                }
            });

            document.documentElement.lang = lang;
        });
    });

    // ========================================
    // Smooth Scroll
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });

                document.body.classList.remove('nav-open');
                if (navToggle) {
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // ========================================
    // FAQ Accordion
    // ========================================
    const faqBlocks = document.querySelectorAll('.faq-block');
    
    faqBlocks.forEach(block => {
        const summary = block.querySelector('summary');
        
        summary.addEventListener('click', () => {
            faqBlocks.forEach(otherBlock => {
                if (otherBlock !== block && otherBlock.open) {
                    otherBlock.open = false;
                }
            });
        });
    });

    // ========================================
    // Stats Counter (Disabled)
    // ========================================
    // Note: Counter animation disabled to ensure correct values display
    // in screenshots and static contexts. The bold typography makes
    // the numbers impactful without needing animation.

    // ========================================
    // Intersection Observer for Reveals (Disabled)
    // Content always visible - animations removed for static render reliability
    // ========================================
    // Note: Reveal animations disabled to ensure all content is visible
    // in screenshots, SSR, and slow-loading contexts. The bold brutalist
    // aesthetic relies on the strong typography and hard shadows instead.

    // ========================================
    // Keyboard Navigation
    // ========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.body.classList.remove('nav-open');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
            }
            
            faqBlocks.forEach(block => {
                block.open = false;
            });
        }
    });

    // ========================================
    // Image Lazy Load
    // ========================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    lazyImages.forEach(img => {
        // Only add transition for smooth load, don't hide images
        if (!img.complete) {
            img.style.transition = 'opacity 0.3s ease';
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
});
