/**
 * Soft UI Evolution - Interactive Demo
 * Evolved neumorphism with accessibility focus
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all features
    initNavbar();
    initSoftInteractions();
    initScrollAnimations();
    initFormHandling();
    initAccessibility();
});

/**
 * Navbar functionality
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    let lastScroll = 0;
    
    // Scroll behavior
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(166, 180, 200, 0.3)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-soft-light), var(--shadow-soft-dark)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

/**
 * Soft UI press interactions
 */
function initSoftInteractions() {
    // Soft press effect for cards and buttons
    const interactiveElements = document.querySelectorAll('.soft-card, .btn, .nav-cta, .social-links a, .contact-icon, .about-icon, .service-icon');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Input focus effects
    const inputs = document.querySelectorAll('.soft-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .about-card,
        .service-card,
        .testimonial-card,
        .contact-wrapper > * {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .about-card,
            .service-card,
            .testimonial-card,
            .contact-wrapper > * {
                opacity: 1;
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Observe elements
    document.querySelectorAll('.about-card, .service-card, .testimonial-card, .contact-wrapper > *').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-value');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
}

/**
 * Animate numeric values
 */
function animateValue(element) {
    const text = element.textContent;
    const numericMatch = text.match(/[\d.]+/);
    
    if (!numericMatch) return;
    
    const targetValue = parseFloat(numericMatch[0]);
    const suffix = text.replace(numericMatch[0], '');
    const duration = 1500;
    const startTime = performance.now();
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = targetValue * easeProgress;
        
        if (text.includes('%')) {
            element.textContent = Math.round(currentValue) + suffix;
        } else if (text.includes(':')) {
            element.textContent = currentValue.toFixed(1) + suffix;
        } else {
            element.textContent = Math.round(currentValue) + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Form handling
 */
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i><span>Sending...</span>';
            submitBtn.disabled = true;
            lucide.createIcons();
            
            // Add spin animation
            const style = document.createElement('style');
            style.textContent = `
                .spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i data-lucide="check-circle"></i><span>Message Sent!</span>';
                submitBtn.style.background = 'var(--accent-success)';
                lucide.createIcons();
                
                // Reset form
                form.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    lucide.createIcons();
                }, 3000);
            }, 1500);
        });
        
        // Input validation styling
        const inputs = form.querySelectorAll('.soft-input');
        inputs.forEach(input => {
            input.addEventListener('invalid', function(e) {
                e.preventDefault();
                this.classList.add('error');
            });
            
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
}

/**
 * Accessibility enhancements
 */
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    
    const skipLinkStyle = document.createElement('style');
    skipLinkStyle.textContent = `
        .skip-link {
            position: fixed;
            top: -100%;
            left: var(--spacing-md);
            padding: var(--spacing-sm) var(--spacing-md);
            background: var(--accent-primary);
            color: white;
            text-decoration: none;
            border-radius: var(--radius-md);
            z-index: 9999;
            transition: top 0.3s ease;
        }
        
        .skip-link:focus {
            top: var(--spacing-md);
        }
        
        .soft-input.error {
            box-shadow: var(--shadow-soft-inset-light), var(--shadow-soft-inset-dark), 0 0 0 3px rgba(239, 68, 68, 0.3);
        }
    `;
    document.head.appendChild(skipLinkStyle);
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Announce page loaded for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    announcer.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;';
    document.body.appendChild(announcer);
    
    // Keyboard navigation for cards
    document.querySelectorAll('.service-card, .testimonial-card, .about-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
    });
    
    // Enhanced focus management
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Add keyboard nav styles
    const keyboardStyle = document.createElement('style');
    keyboardStyle.textContent = `
        body:not(.keyboard-nav) *:focus {
            outline: none;
        }
        
        body.keyboard-nav *:focus-visible {
            outline: 3px solid var(--accent-primary);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(keyboardStyle);
}
