/* ========================================
   MK Adventure v3 — Motion/Parallax
   Scroll-driven cinematic experience
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ========================================
    // Scroll Progress Bar
    // ========================================
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true });

    // ========================================
    // Navigation
    // ========================================
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
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
    // Parallax Effects
    // ========================================
    if (!prefersReducedMotion) {
        const parallaxLayers = document.querySelectorAll('.parallax-layer[data-speed]');
        const cubaParallax = document.querySelector('.cuba-parallax-bg[data-speed]');
        
        function updateParallax() {
            const scrollY = window.pageYOffset;
            
            parallaxLayers.forEach(layer => {
                const speed = parseFloat(layer.dataset.speed);
                const yPos = scrollY * speed;
                layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
            
            if (cubaParallax) {
                const rect = cubaParallax.parentElement.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const speed = parseFloat(cubaParallax.dataset.speed);
                    const offset = (rect.top - window.innerHeight) * speed;
                    cubaParallax.style.transform = `translate3d(0, ${offset}px, 0)`;
                }
            }
        }
        
        // Use requestAnimationFrame for smooth parallax
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ========================================
    // Reveal Animations
    // ========================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    });

    revealElements.forEach(el => {
        if (!prefersReducedMotion) {
            revealObserver.observe(el);
        } else {
            el.classList.add('revealed');
        }
    });

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
    // Stats Counter Animation
    // ========================================
    const statsSection = document.querySelector('.booking-stats');
    let statsAnimated = false;
    
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    function animateStats() {
        const statNums = document.querySelectorAll('.stat-num[data-target]');
        
        statNums.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const duration = 2000;
            const steps = 60;
            const stepTime = duration / steps;
            let current = 0;
            const increment = target / steps;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, stepTime);
        });
    }

    // ========================================
    // FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        
        summary.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.open) {
                    otherItem.open = false;
                }
            });
        });
    });

    // ========================================
    // Travel Cards - Drag to Scroll
    // ========================================
    const travelShowcase = document.querySelector('.travel-showcase');
    
    if (travelShowcase) {
        let isDown = false;
        let startX;
        let scrollLeft;

        travelShowcase.addEventListener('mousedown', (e) => {
            isDown = true;
            travelShowcase.style.cursor = 'grabbing';
            startX = e.pageX - travelShowcase.offsetLeft;
            scrollLeft = travelShowcase.scrollLeft;
        });

        travelShowcase.addEventListener('mouseleave', () => {
            isDown = false;
            travelShowcase.style.cursor = 'grab';
        });

        travelShowcase.addEventListener('mouseup', () => {
            isDown = false;
            travelShowcase.style.cursor = 'grab';
        });

        travelShowcase.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - travelShowcase.offsetLeft;
            const walk = (x - startX) * 1.5;
            travelShowcase.scrollLeft = scrollLeft - walk;
        });

        // Set initial cursor
        travelShowcase.style.cursor = 'grab';
    }

    // ========================================
    // Tilt Effect on Cards
    // ========================================
    if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
        const tiltCards = document.querySelectorAll('.travel-card, .cuba-card, .service-card, .blog-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ========================================
    // Hero Video Handling
    // ========================================
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // Pause video when not visible
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(() => {});
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.25 });

        videoObserver.observe(heroVideo);
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
            
            // Close any open FAQ items
            faqItems.forEach(item => {
                item.open = false;
            });
        }
    });

    // ========================================
    // Preload Critical Images
    // ========================================
    const criticalImages = document.querySelectorAll('.travel-image img, .blog-image img, .cuba-parallax-bg img');
    
    criticalImages.forEach(img => {
        if (img.complete) return;
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });

    // ========================================
    // Partners Marquee - Clone for Seamless Loop
    // ========================================
    const partnersTrack = document.querySelector('.partners-track');
    
    if (partnersTrack && !prefersReducedMotion) {
        // Already duplicated in HTML, but ensure animation works
        partnersTrack.style.animationPlayState = 'running';
    }
});
