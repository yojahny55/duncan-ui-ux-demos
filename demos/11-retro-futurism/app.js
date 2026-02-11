/**
 * RETRO-FUTURISM UI - JavaScript
 * Neon glows, glitch effects, synthwave vibes
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all features
    initMobileNav();
    initSmoothScroll();
    initCounterAnimation();
    initScrollAnimations();
    initNavbarScroll();
    initFormHandling();
    initGlitchEffect();
    initTerminalTyping();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = toggle.querySelector('svg');
            if (icon) {
                const isOpen = navLinks.classList.contains('active');
                icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
                lucide.createIcons();
            }
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Counter Animation for Stats
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-value[data-value]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.value);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    // Use Intersection Observer for triggering
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .about-content, .terminal-window, .contact-form, .contact-info'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Form Handling
 */
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalContent = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i data-lucide="loader-2"></i><span>TRANSMITTING...</span>';
            submitBtn.disabled = true;
            lucide.createIcons();
            
            // Add spinning animation to loader
            const loader = submitBtn.querySelector('svg');
            if (loader) {
                loader.style.animation = 'spin 1s linear infinite';
            }
            
            // Simulate transmission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success state
            submitBtn.innerHTML = '<i data-lucide="check"></i><span>TRANSMISSION_COMPLETE</span>';
            submitBtn.style.borderColor = '#27CA40';
            submitBtn.style.color = '#27CA40';
            lucide.createIcons();
            
            // Reset form
            form.reset();
            
            // Restore button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
                submitBtn.disabled = false;
                lucide.createIcons();
            }, 3000);
        });
        
        // Add focus effects
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.querySelector('label').style.color = '#00FFFF';
                input.parentElement.querySelector('label').style.textShadow = '0 0 10px #00FFFF';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.querySelector('label').style.color = '';
                input.parentElement.querySelector('label').style.textShadow = '';
            });
        });
    }
}

/**
 * Enhanced Glitch Effect on Hover
 */
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animation = 'glitch-skew 0.3s infinite linear alternate-reverse';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.animation = 'glitch-skew 4s infinite linear alternate-reverse';
        });
    });
}

/**
 * Terminal Typing Effect
 */
function initTerminalTyping() {
    const cursor = document.querySelector('.terminal-body .cursor');
    
    if (cursor) {
        // Cursor is already animated via CSS, but we can add more effects
        setInterval(() => {
            const randomColor = Math.random() > 0.95 ? '#FF006E' : '#00FFFF';
            cursor.style.color = randomColor;
        }, 1000);
    }
}

/**
 * Add CSS for spin animation
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    /* Random glitch lines - adds subtle visual noise */
    .hero::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: transparent;
        animation: random-glitch 8s linear infinite;
    }
    
    @keyframes random-glitch {
        0%, 99%, 100% { opacity: 0; }
        99.5% { 
            opacity: 0.5;
            background: linear-gradient(
                90deg,
                transparent 0%,
                rgba(0, 255, 255, 0.1) 50%,
                transparent 100%
            );
        }
    }
`;
document.head.appendChild(style);

// Console Easter Egg
console.log('%c⚡ NEON_GRID SYSTEM ONLINE ⚡', 'color: #00FFFF; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00FFFF;');
console.log('%c>> Welcome to the Grid, Runner.', 'color: #FF006E; font-size: 14px;');
console.log('%c>> All systems nominal.', 'color: #5D34D0; font-size: 12px;');
