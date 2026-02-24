/**
 * Dimensional Layering - UI/UX Demo
 * JavaScript for interactions and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initNavbar();
    initScrollAnimations();
    initParallaxDepth();
    initServiceCards();
    initContactForm();
});

/**
 * Navbar - Scroll effects and mobile toggle
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.style.boxShadow = 'var(--elevation-3)';
        } else {
            navbar.style.boxShadow = 'var(--elevation-2)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('svg');
            if (navMenu.classList.contains('active')) {
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
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Scroll-triggered animations with Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.about-content, .about-visual, .service-card, .testimonial-card, ' +
        '.stat-item, .contact-wrapper, .feature-card'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for cards
                if (entry.target.classList.contains('service-card')) {
                    const layer = entry.target.dataset.layer;
                    entry.target.style.transitionDelay = `${layer * 100}ms`;
                }
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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
 * Parallax depth effect on mouse move
 */
function initParallaxDepth() {
    const hero = document.querySelector('.hero');
    const bgLayers = document.querySelectorAll('.bg-layer');
    const visualStack = document.querySelector('.visual-stack');
    const depthShowcase = document.querySelector('.depth-showcase');
    
    // Hero parallax
    if (hero && bgLayers.length) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;
            
            bgLayers.forEach((layer, index) => {
                const depth = (index + 1) * 15;
                const x = xPercent * depth;
                const y = yPercent * depth;
                layer.style.transform = `translate(${x}px, ${y}px)`;
            });
            
            // Visual stack parallax
            if (visualStack) {
                visualStack.style.transform = `
                    rotateY(${xPercent * 5}deg) 
                    rotateX(${-yPercent * 5}deg)
                `;
            }
        });
    }
    
    // Depth showcase parallax
    if (depthShowcase) {
        const aboutSection = document.querySelector('.about');
        
        aboutSection?.addEventListener('mousemove', (e) => {
            const rect = aboutSection.getBoundingClientRect();
            const xPercent = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const yPercent = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            
            depthShowcase.style.transform = `
                rotateX(${10 - yPercent * 10}deg) 
                rotateY(${-10 + xPercent * 10}deg)
            `;
        });
        
        aboutSection?.addEventListener('mouseleave', () => {
            depthShowcase.style.transform = 'rotateX(10deg) rotateY(-10deg)';
        });
    }
}

/**
 * Service cards - Elevation on scroll position
 */
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Increase elevation on hover
            const layer = parseInt(card.dataset.layer);
            card.style.zIndex = layer + 10;
        });
        
        card.addEventListener('mouseleave', () => {
            const layer = parseInt(card.dataset.layer);
            card.style.zIndex = layer;
        });
    });
}

/**
 * Contact form handling
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('.btn');
            const originalContent = btn.innerHTML;
            
            // Simulate submission
            btn.innerHTML = '<span>Sending...</span>';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.innerHTML = '<span>Message Sent!</span><svg data-lucide="check"><use href="#"></use></svg>';
                btn.style.background = '#22C55E';
                
                // Reset form
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.background = '';
                    lucide.createIcons();
                }, 2000);
            }, 1500);
        });
        
        // Input focus elevation effect
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'translateY(0)';
            });
        });
    }
}

/**
 * Utility: Throttle function for performance
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Throttle scroll events
window.addEventListener('scroll', throttle(() => {
    // Additional scroll-based effects can be added here
}, 100));
