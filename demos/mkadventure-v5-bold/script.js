/* ========================================
   MK Adventure v5 — Bold/Brutalist
   High contrast, sharp interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
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
    // Stats Counter
    // ========================================
    const statsSection = document.querySelector('.hero-stats');
    let statsAnimated = false;
    
    if (statsSection && !prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    function animateStats() {
        const statNums = document.querySelectorAll('.stat-number');
        
        statNums.forEach(stat => {
            const text = stat.textContent;
            const num = parseInt(text);
            const suffix = text.replace(/[0-9]/g, '');
            
            if (!isNaN(num)) {
                let current = 0;
                const increment = num / 30;
                const stepTime = 50;
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= num) {
                        stat.textContent = text;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, stepTime);
            }
        });
    }

    // ========================================
    // Intersection Observer for Reveals
    // ========================================
    if (!prefersReducedMotion) {
        const revealElements = document.querySelectorAll('.travel-block, .cuba-block, .service-block, .blog-block, .contact-item');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 80);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            revealObserver.observe(el);
        });
    }

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
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
});
