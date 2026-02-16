/**
 * Hero-Centric Design - App.js
 * Interactions: scroll reveal, navbar scroll, smooth scroll, mobile menu
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // =====================================================
    // NAVBAR SCROLL EFFECT
    // =====================================================
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    const handleNavbarScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // =====================================================
    // MOBILE MENU TOGGLE
    // =====================================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // =====================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    });

    // =====================================================
    // SCROLL REVEAL ANIMATIONS
    // =====================================================
    const revealElements = document.querySelectorAll('.about-card, .service-card, .testimonial-card');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };

    // Add reveal class for CSS animation
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Create observer for reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // =====================================================
    // HERO PARALLAX EFFECT (subtle)
    // =====================================================
    const heroBg = document.querySelector('.hero-bg');
    
    const handleParallax = () => {
        const scrolled = window.scrollY;
        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    };

    window.addEventListener('scroll', handleParallax, { passive: true });

    // =====================================================
    // FORM HANDLING
    // =====================================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Simple validation
            const name = contactForm.querySelector('#name');
            const email = contactForm.querySelector('#email');
            
            if (!name.value.trim()) {
                showFormFeedback('Please enter your name', 'error');
                name.focus();
                return;
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showFormFeedback('Please enter a valid email', 'error');
                email.focus();
                return;
            }
            
            // Simulate submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i data-lucide="check"></i><span>Thank you!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)';
                lucide.createIcons();
                
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

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormFeedback(message, type) {
        // Create or update feedback element
        let feedback = document.querySelector('.form-feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'form-feedback';
            contactForm.insertBefore(feedback, contactForm.firstChild);
        }
        
        feedback.textContent = message;
        feedback.style.cssText = `
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            font-size: 14px;
            background: ${type === 'error' ? '#FEE2E2' : '#DCFCE7'};
            color: ${type === 'error' ? '#DC2626' : '#16A34A'};
            border: 1px solid ${type === 'error' ? '#FECACA' : '#BBF7D0'};
        `;
        
        setTimeout(() => {
            feedback.remove();
        }, 4000);
    }

    // =====================================================
    // CTA BUTTON GLOW PULSE
    // =====================================================
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 50px rgba(79, 70, 229, 0.4)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = '';
        });
    });

    // =====================================================
    // MOCKUP ANIMATION
    // =====================================================
    const mockupCards = document.querySelectorAll('.mockup-card');
    
    mockupCards.forEach((card, index) => {
        card.style.animation = `pulse 3s ease-in-out ${index * 0.5}s infinite`;
    });

    // Add keyframe animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes mockupPulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // =====================================================
    // TRUST LOGOS ANIMATION
    // =====================================================
    const trustLogos = document.querySelectorAll('.trust-logo');
    
    trustLogos.forEach((logo, index) => {
        logo.style.animationDelay = `${index * 0.1}s`;
    });

    // =====================================================
    // COUNTER ANIMATION FOR STATS (if needed)
    // =====================================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    }

    // =====================================================
    // KEYBOARD ACCESSIBILITY
    // =====================================================
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    });

    // Focus trap for mobile menu (accessibility)
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // =====================================================
    // PREFERS REDUCED MOTION
    // =====================================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--transition-fast', '0ms');
        document.documentElement.style.setProperty('--transition-base', '0ms');
        document.documentElement.style.setProperty('--transition-slow', '0ms');
        
        revealElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.transition = 'none';
        });
    }

    console.log('🚀 Hero-Centric Design initialized');
});
