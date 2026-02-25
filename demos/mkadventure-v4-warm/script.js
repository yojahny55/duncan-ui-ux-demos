/* ========================================
   MK Adventure v4 — Warm/Biophilic
   Nature-inspired, organic interactions
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
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

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
    // Intersection Observer for Reveals (Disabled for better static rendering)
    // All content visible by default - animations removed to ensure reliability
    // ========================================
    // Note: Reveal animations have been disabled to ensure content is always 
    // visible in all contexts (screenshots, SSR, slow JS loading).
    // The warm design aesthetic relies on hover interactions instead.

    // ========================================
    // FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        
        summary.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.open) {
                    otherItem.open = false;
                }
            });
        });
    });

    // ========================================
    // Organic Hover Effects
    // ========================================
    if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
        const cards = document.querySelectorAll('.travel-card, .cuba-card:not(.cuba-card-main), .service-card, .blog-card, .booking-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'all 0.3s ease-out';
            });
        });
    }

    // ========================================
    // Background Shape Parallax
    // ========================================
    if (!prefersReducedMotion) {
        const shapes = document.querySelectorAll('.shape');
        
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    
                    shapes.forEach((shape, index) => {
                        const speed = 0.05 + (index * 0.02);
                        const yPos = scrollY * speed;
                        shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ========================================
    // Trust Stats Counter
    // ========================================
    const trustSection = document.querySelector('.hero-trust');
    let statsAnimated = false;
    
    if (trustSection && !prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateTrustStats();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(trustSection);
    }

    function animateTrustStats() {
        const statNums = document.querySelectorAll('.trust-item strong');
        
        statNums.forEach(stat => {
            const text = stat.textContent;
            const num = parseInt(text);
            const suffix = text.replace(/[0-9]/g, '');
            
            if (!isNaN(num)) {
                let current = 0;
                const increment = num / 40;
                const duration = 1500;
                const stepTime = duration / 40;
                
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
    // Keyboard Navigation
    // ========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.body.classList.remove('nav-open');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
            }
            
            faqItems.forEach(item => {
                item.open = false;
            });
        }
    });

    // ========================================
    // Image Lazy Load Enhancement (Non-blocking)
    // Images always visible; fade-in is purely decorative
    // ========================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    lazyImages.forEach(img => {
        // Only add fade effect for images not yet loaded
        // Don't hide images - they should always be visible
        if (!img.complete) {
            img.style.transition = 'opacity 0.4s ease';
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
});
