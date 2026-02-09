/**
 * Dark Mode (OLED) - Interactive Features
 * Style #7 - Optimized for OLED displays
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all features
    initNavbar();
    initScrollAnimations();
    initFormInteractions();
    initMobileMenu();
    initStatsCounter();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.borderBottomColor = '#242424';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.borderBottomColor = '#1a1a1a';
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation classes
    const animateElements = document.querySelectorAll(
        '.about-card, .service-card, .testimonial-card, .section-header'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Form interactions with glow effects
 */
function initFormInteractions() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    // Input focus glow effect
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.boxShadow = '0 0 0 2px rgba(0, 128, 255, 0.3)';
        });
        
        input.addEventListener('blur', () => {
            input.style.boxShadow = 'none';
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
            Sending...
        `;
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = `
                <i data-lucide="check"></i>
                Message Sent!
            `;
            submitBtn.style.background = '#39FF14';
            submitBtn.style.color = '#000000';
            
            // Reinitialize lucide for new icon
            lucide.createIcons();
            
            // Reset after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.disabled = false;
                form.reset();
                lucide.createIcons();
            }, 2000);
        }, 1500);
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.contains('active');
        
        if (isOpen) {
            menu.classList.remove('active');
            toggle.innerHTML = '<i data-lucide="menu"></i>';
        } else {
            menu.classList.add('active');
            toggle.innerHTML = '<i data-lucide="x"></i>';
        }
        
        lucide.createIcons();
    });
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.98);
                padding: 1rem;
                border-top: 1px solid #242424;
                gap: 0;
            }
            
            .nav-menu.active li {
                padding: 0.75rem 0;
                border-bottom: 1px solid #1a1a1a;
            }
            
            .nav-menu.active a {
                display: block;
                padding: 0.5rem 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Animated stats counter
 */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-value');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

/**
 * Animate number counting
 */
function animateValue(element) {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasPlus = text.includes('+');
    const hasK = text.includes('K');
    
    let value = parseInt(text.replace(/[^0-9]/g, ''));
    const duration = 1500;
    const steps = 60;
    const stepValue = value / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    
    const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
            current = value;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (hasK) displayValue = displayValue + 'K';
        if (hasPlus) displayValue = displayValue + '+';
        if (hasPercent) displayValue = displayValue + '%';
        
        element.textContent = displayValue;
    }, stepDuration);
}

/**
 * Add subtle glow to CTA buttons on hover
 */
document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'all 0.3s ease';
    });
});

/**
 * Parallax effect for hero glow
 */
document.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.hero-glow');
    if (!glow) return;
    
    const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
    
    glow.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
});
