/**
 * PARALLAX STORYTELLING - UI/UX Demo #39
 * Scroll-driven, narrative, immersive, cinematic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // Parallax effect on scroll
    const hero = document.querySelector('.hero');
    const layerBack = document.querySelector('.layer-back');
    const layerMid = document.querySelector('.layer-mid');
    const layerFront = document.querySelector('.layer-front');

    window.addEventListener('scroll', () => {
        if (!hero) return;
        
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled <= heroHeight) {
            const speedBack = 0.3;
            const speedMid = 0.5;
            const speedFront = 0.7;
            
            if (layerBack) layerBack.style.transform = `translateY(${scrolled * speedBack}px)`;
            if (layerMid) layerMid.style.transform = `translateY(${scrolled * speedMid}px)`;
            if (layerFront) layerFront.style.transform = `translateY(${scrolled * speedFront}px)`;
        }
    });

    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });

    // Chapter indicator animations on scroll
    const chapters = document.querySelectorAll('.chapter-indicator');
    
    const chapterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });

    chapters.forEach(chapter => {
        chapter.style.opacity = '0';
        chapter.style.transform = 'translateY(20px)';
        chapter.style.transition = 'all 0.6s ease';
        chapterObserver.observe(chapter);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Story Received!</span><i data-lucide="check"></i>';
                submitBtn.style.background = '#22c55e';
                lucide.createIcons();
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    lucide.createIcons();
                }, 3000);
            }, 1500);
        });
    }

    // Stat number animation
    const animateNumbers = (element) => {
        const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const suffix = element.textContent.replace(/[0-9]/g, '');
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target + suffix;
            }
        };
        
        requestAnimationFrame(updateNumber);
    };

    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statObserver.observe(num));

    // Active nav link highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--color-light)';
            }
        });
    });

    // Progressive section backgrounds parallax
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        parallaxBgs.forEach(bg => {
            const section = bg.parentElement;
            const sectionTop = section.offsetTop;
            const scrolled = window.pageYOffset;
            const rate = (scrolled - sectionTop) * 0.15;
            
            if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + section.offsetHeight) {
                bg.style.transform = `translateY(${rate}px)`;
            }
        });
    });

    // Hide scroll indicator after first scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        let hidden = false;
        window.addEventListener('scroll', () => {
            if (!hidden && window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
                hidden = true;
            }
        });
    }

    console.log('✨ Parallax Storytelling Demo Loaded - UI/UX Demo #39');
});
