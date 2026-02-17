/**
 * Minimal & Direct - Style #23
 * JavaScript: Minimal, essential interactions only
 * No heavy animations - just functional enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Mobile navigation toggle
    initMobileNav();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
    
    // Contact form handling
    initContactForm();
    
    // Active nav link on scroll
    initScrollSpy();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!toggle || !navLinks) return;
    
    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        toggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            history.pushState(null, null, href);
        });
    });
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-button');
        const originalText = submitBtn.innerHTML;
        
        // Show sending state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success
            submitBtn.innerHTML = '<span>Message sent</span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            submitBtn.style.background = '#22c55e';
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                lucide.createIcons();
            }, 2500);
        }, 1000);
    });
}

/**
 * Scroll Spy - Update active nav link
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    
    function updateActiveLink() {
        const scrollPos = window.scrollY + navHeight + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttle scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    updateActiveLink();
}

/**
 * Add subtle active state styling
 */
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--color-text);
    }
`;
document.head.appendChild(style);
