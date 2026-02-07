/**
 * Minimalism & Swiss Style - Interactive Features
 * Clean, functional JavaScript following Swiss design principles
 */

(function() {
    'use strict';

    // ==========================================================================
    // Mobile Menu
    // ==========================================================================
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                mobileMenuBtn.focus();
            }
        });
    }

    // ==========================================================================
    // Smooth Scroll for Navigation Links
    // ==========================================================================
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

    // ==========================================================================
    // Scroll Reveal Animation
    // ==========================================================================
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // Elements to reveal
        const revealElements = document.querySelectorAll(
            '.about-text, .about-stats, .service-card, .testimonial, .contact-text, .contact-form'
        );

        // Add reveal class
        revealElements.forEach(function(el) {
            el.classList.add('reveal');
        });

        // Intersection Observer for scroll reveal
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(function(el) {
            revealObserver.observe(el);
        });
    }

    // ==========================================================================
    // Navbar Background on Scroll
    // ==========================================================================
    
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;

    function handleNavbarScroll() {
        const currentScrollY = window.pageYOffset;
        
        // Add subtle shadow on scroll
        if (currentScrollY > 10) {
            navbar.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    }

    // Throttle scroll events
    let scrollTicking = false;
    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            window.requestAnimationFrame(function() {
                handleNavbarScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    // ==========================================================================
    // Contact Form (Non-functional demo)
    // ==========================================================================
    
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            // Simulate submission
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(function() {
                submitButton.textContent = 'Message Sent';
                
                setTimeout(function() {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1000);
        });
    }

    // ==========================================================================
    // Active Navigation State
    // ==========================================================================
    
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(function(item) {
                    item.style.opacity = item.getAttribute('href') === '#' + sectionId ? '1' : '0.6';
                });
            }
        });
    }

    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            window.requestAnimationFrame(function() {
                updateActiveNav();
            });
        }
    });

})();
