/**
 * MK Adventure — Premium Travel Agency
 * Storytelling with Soul
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize all modules
    initScrollAnimations();
    initNavScroll();
    initLanguageSwitch();
    initSmoothScroll();
    initParallax();
});

/**
 * Scroll-triggered fade-up animations
 * Uses Intersection Observer for performance
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.anim-fade-up');
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation triggers (one-time)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Navigation scroll effect
 * Adds .scrolled class when page is scrolled
 */
function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    let ticking = false;
    
    const updateNav = () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });
    
    // Check initial state
    updateNav();
}

/**
 * Language switcher
 * Swaps content based on data-es/data-en attributes
 */
function initLanguageSwitch() {
    const buttons = document.querySelectorAll('.lang-switch .lang-btn');
    if (!buttons.length) return;
    
    let currentLang = localStorage.getItem('mk-lang') || 'es';
    
    // Apply stored language on load
    if (currentLang !== 'es') {
        applyLanguage(currentLang);
        updateButtons(currentLang);
    }
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang === currentLang) return;
            
            currentLang = lang;
            applyLanguage(lang);
            updateButtons(lang);
            localStorage.setItem('mk-lang', lang);
        });
    });
    
    function applyLanguage(lang) {
        document.querySelectorAll('.t').forEach(el => {
            const text = el.dataset[lang];
            if (text) el.textContent = text;
        });
        document.documentElement.lang = lang;
    }
    
    function updateButtons(lang) {
        buttons.forEach(b => {
            b.classList.toggle('active', b.dataset.lang === lang);
        });
    }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navHeight - 20;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Subtle parallax effect on hero
 */
function initParallax() {
    const heroImg = document.querySelector('.hero-img');
    if (!heroImg) return;
    
    // Skip on mobile for performance
    if (window.innerWidth < 768) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
                
                if (scrolled < heroHeight) {
                    const parallax = scrolled * 0.4;
                    heroImg.style.transform = `translateY(${parallax}px) scale(1.1)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Utility: Check if reduced motion is preferred
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
