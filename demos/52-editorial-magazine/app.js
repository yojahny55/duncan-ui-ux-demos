/**
 * Editorial Grid / Magazine Style Demo
 * 
 * Features:
 * - Smooth scroll reveals
 * - Navbar scroll effects
 * - Mobile navigation toggle
 * - Form handling
 * - Lucide icons initialization
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all features
    initNavbar();
    initMobileNav();
    initScrollReveal();
    initContactForm();
    initNewsletterForm();
    initSmoothScroll();
});

/**
 * Navbar scroll effects
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class for shadow
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

/**
 * Mobile navigation toggle
 */
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!toggle || !navLinks) return;
    
    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Update icon
        const icon = toggle.querySelector('i');
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
            const icon = toggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

/**
 * Scroll reveal animations using Intersection Observer
 */
function initScrollReveal() {
    // Add reveal class to elements that should animate
    const revealElements = document.querySelectorAll(
        '.hero-card, .stat-card, .service-card, .testimonial, .contact-item, .footer-brand, .footer-links, .footer-newsletter'
    );
    
    revealElements.forEach(el => el.classList.add('reveal'));
    
    // Create observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
    
    // Stagger animation for grid items
    const staggerContainers = [
        { selector: '.services-grid', items: '.service-card' },
        { selector: '.about-sidebar', items: '.stat-card' },
        { selector: '.testimonials-grid', items: '.testimonial' },
        { selector: '.footer-grid', items: '> div' }
    ];
    
    staggerContainers.forEach(({ selector, items }) => {
        const container = document.querySelector(selector);
        if (container) {
            const children = container.querySelectorAll(items);
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 100}ms`;
            });
        }
    });
}

/**
 * Contact form handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Simulate form submission
        submitBtn.innerHTML = 'Sending... <i data-lucide="loader-2" class="animate-spin"></i>';
        submitBtn.disabled = true;
        lucide.createIcons();
        
        setTimeout(() => {
            submitBtn.innerHTML = 'Message Sent! <i data-lucide="check"></i>';
            submitBtn.style.background = '#22C55E';
            lucide.createIcons();
            
            // Reset form
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                lucide.createIcons();
            }, 2000);
        }, 1500);
    });
    
    // Input focus effects
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

/**
 * Newsletter form handling
 */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const input = form.querySelector('input');
        const button = form.querySelector('button');
        
        // Animate success
        button.innerHTML = '<i data-lucide="check"></i>';
        button.style.background = '#22C55E';
        lucide.createIcons();
        
        input.value = '';
        input.placeholder = 'Subscribed!';
        
        setTimeout(() => {
            button.innerHTML = '<i data-lucide="arrow-right"></i>';
            button.style.background = '';
            input.placeholder = 'your@email.com';
            lucide.createIcons();
        }, 2000);
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Add animation for drop cap on scroll
 */
function initDropCapAnimation() {
    const dropCap = document.querySelector('.drop-cap');
    
    if (!dropCap) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                dropCap.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(dropCap);
}

/**
 * Utility: Add CSS animation class
 */
function addAnimationClass(element, className, duration = 1000) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, duration);
}

// Add spin animation for loader
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    .animate-spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);
