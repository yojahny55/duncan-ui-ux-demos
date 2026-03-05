/**
 * Vintage Analog / Retro Film - Style 54
 * JavaScript for animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize all modules
    initNavbar();
    initScrollAnimations();
    initPolaroidEffects();
    initVHSEffect();
    initFormHandling();
    initSmoothScroll();
});

/**
 * Navbar functionality
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let lastScroll = 0;

    // Scroll behavior
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove shadow based on scroll position
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(61, 41, 20, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('mobile-open');
            const icon = mobileMenuBtn.querySelector('i');
            
            if (isOpen) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger children if needed
                const staggerChildren = entry.target.querySelectorAll('.stagger-child');
                staggerChildren.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 100}ms`;
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);

    // Observe sections and cards
    const animatedElements = document.querySelectorAll(
        '.section-header, .service-card, .testimonial-card, .about-text, .about-visual, .contact-info, .contact-form-wrapper, .film-strip'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add stagger to grid items
    document.querySelectorAll('.services-grid .service-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 80}ms`;
    });

    document.querySelectorAll('.testimonials-grid .testimonial-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
    });
}

// CSS class for animated elements
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .nav-links.mobile-open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(253, 251, 240, 0.98);
            padding: 1.5rem;
            gap: 1rem;
            border-bottom: 1px solid rgba(166, 123, 75, 0.2);
            box-shadow: 0 4px 20px rgba(61, 41, 20, 0.1);
        }
    </style>
`);

/**
 * Polaroid hover effects
 */
function initPolaroidEffects() {
    const polaroids = document.querySelectorAll('.polaroid');
    
    polaroids.forEach(polaroid => {
        polaroid.addEventListener('mouseenter', () => {
            // Add subtle light leak on hover
            const lightLeak = document.createElement('div');
            lightLeak.className = 'polaroid-light-leak';
            lightLeak.style.cssText = `
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, rgba(255, 200, 100, 0.2) 0%, transparent 70%);
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            polaroid.style.position = 'relative';
            polaroid.appendChild(lightLeak);
            
            requestAnimationFrame(() => {
                lightLeak.style.opacity = '1';
            });
        });
        
        polaroid.addEventListener('mouseleave', () => {
            const lightLeak = polaroid.querySelector('.polaroid-light-leak');
            if (lightLeak) {
                lightLeak.style.opacity = '0';
                setTimeout(() => lightLeak.remove(), 300);
            }
        });
    });
}

/**
 * VHS tracking line effect
 */
function initVHSEffect() {
    const vhsLine = document.querySelector('.hero-vhs-line');
    
    if (!vhsLine) return;
    
    // Occasionally add glitch effect
    setInterval(() => {
        if (Math.random() > 0.7) {
            vhsLine.style.height = `${Math.random() * 8 + 2}px`;
            vhsLine.style.opacity = `${Math.random() * 0.3 + 0.1}`;
            
            setTimeout(() => {
                vhsLine.style.height = '4px';
                vhsLine.style.opacity = '';
            }, 100);
        }
    }, 2000);
    
    // Random horizontal glitch
    setInterval(() => {
        if (Math.random() > 0.85) {
            const sections = document.querySelectorAll('section');
            const randomSection = sections[Math.floor(Math.random() * sections.length)];
            
            randomSection.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
            
            setTimeout(() => {
                randomSection.style.transform = '';
            }, 50);
        }
    }, 3000);
}

/**
 * Form handling
 */
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Sending...';
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
            // Success state
            submitBtn.innerHTML = '<i data-lucide="check"></i> Message Sent!';
            submitBtn.style.background = '#4A7B7C';
            submitBtn.style.borderColor = '#4A7B7C';
            lucide.createIcons();
            
            // Reset form
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                lucide.createIcons();
            }, 3000);
        }, 1500);
    });
    
    // Add vintage focus effect to inputs
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.01)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = '';
        });
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('mobile-open')) {
                navLinks.classList.remove('mobile-open');
                const icon = document.querySelector('.mobile-menu-btn i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });
}

/**
 * Add random vintage imperfections
 */
function addVintageImperfections() {
    // Randomly adjust the grain animation timing
    const filmGrain = document.querySelector('.film-grain');
    if (filmGrain) {
        setInterval(() => {
            const newDuration = 0.3 + Math.random() * 0.4;
            filmGrain.style.animationDuration = `${newDuration}s`;
        }, 5000);
    }
    
    // Randomly adjust light leak intensity
    const lightLeak = document.querySelector('.light-leak');
    if (lightLeak) {
        setInterval(() => {
            const newOpacity = 0.5 + Math.random() * 0.5;
            lightLeak.style.opacity = newOpacity;
        }, 4000);
    }
}

// Initialize vintage imperfections
addVintageImperfections();

/**
 * Stats counter animation
 */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const value = stat.textContent;
                
                // Only animate numbers
                if (value.match(/^[\d,]+\+?$/)) {
                    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
                    const suffix = value.includes('+') ? '+' : '';
                    
                    animateNumber(stat, numericValue, suffix);
                }
                
                observer.unobserve(stat);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target, suffix = '') {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;
    
    const increment = target / steps;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, stepDuration);
}

// Initialize stats counter
initStatsCounter();

console.log('🎞️ Vintage Analog / Retro Film UI loaded');
console.log('Style 54 of 54 - The final demo!');
