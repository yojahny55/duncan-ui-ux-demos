/**
 * Flat Design - Interactive Features
 * Fast, clean, no-frills JavaScript
 */

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initNavbar();
    initScrollReveal();
    initContactForm();
    initSmoothScroll();
});

/**
 * Navbar - Scroll behavior
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add solid background on scroll
        if (currentScroll > 50) {
            navbar.style.borderBottomColor = '#212121';
        } else {
            navbar.style.borderBottomColor = '#212121';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu?.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
        
        // Toggle icon
        const icon = mobileMenu.querySelector('svg');
        if (navLinks.classList.contains('mobile-open')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

/**
 * Scroll Reveal - Simple fade in on scroll
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.about-card, .service-card, .testimonial-card, .stat, .flat-card'
    );
    
    // Add initial hidden state
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 200ms ease, transform 200ms ease';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Contact Form - Validation and submission
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        // Simple validation
        if (!name || !email || !message) {
            showFormFeedback(form, 'Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormFeedback(form, 'Please enter a valid email.', 'error');
            return;
        }
        
        // Simulate submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Sending...';
        submitBtn.disabled = true;
        lucide.createIcons();
        
        setTimeout(() => {
            showFormFeedback(form, 'Message sent! We\'ll be in touch.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            lucide.createIcons();
        }, 1000);
    });
}

/**
 * Show form feedback message
 */
function showFormFeedback(form, message, type) {
    // Remove existing feedback
    const existing = form.querySelector('.form-feedback');
    if (existing) existing.remove();
    
    const feedback = document.createElement('div');
    feedback.className = 'form-feedback';
    feedback.textContent = message;
    
    // Style based on type
    feedback.style.cssText = `
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 4px;
        font-weight: 600;
        font-size: 0.875rem;
        background: ${type === 'success' ? '#4CAF50' : '#F44336'};
        color: white;
    `;
    
    form.insertBefore(feedback, form.firstChild);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transition = 'opacity 150ms ease';
        setTimeout(() => feedback.remove(), 150);
    }, 3000);
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            
            if (target) {
                const navbarHeight = 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Counter animation for stats
 */
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50;
    const duration = 1000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString() + suffix;
    }, stepTime);
}

// Initialize counters when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('K')) {
                    animateCounter(stat, parseInt(text), 'K+');
                } else if (text.includes('%')) {
                    animateCounter(stat, parseFloat(text), '%');
                } else if (text.includes('.')) {
                    // Rating
                    let current = 0;
                    const target = parseFloat(text);
                    const timer = setInterval(() => {
                        current += 0.1;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        stat.textContent = current.toFixed(1);
                    }, 50);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});
