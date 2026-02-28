/**
 * E-Ink / Paper Style - JavaScript
 * 
 * Philosophy: Minimal JavaScript for an E-Ink aesthetic.
 * No animations, no smooth scrolling, just essential functionality.
 * Like a Kindle - instant, responsive, distraction-free.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Mobile Navigation Toggle
    initMobileNav();

    // Contact Form
    initContactForm();

    // Active nav highlighting (instant, no smooth scroll)
    initNavHighlight();

    console.log('📖 Quietude - E-Ink / Paper Style loaded');
    console.log('Philosophy: No animations. No distractions. Just content.');
});

/**
 * Mobile Navigation
 * Simple toggle - no animations (instant show/hide)
 */
function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function() {
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
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = toggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

/**
 * Contact Form
 * Simple validation - clear, direct feedback
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate required fields
        const requiredFields = ['name', 'email', 'subject', 'message'];
        const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');

        if (missingFields.length > 0) {
            alert('Please complete all fields before sending.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate sending (demo mode)
        console.log('Letter prepared:', data);
        
        // Show confirmation
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i data-lucide="check"></i> Letter Sent';
        submitBtn.disabled = true;
        lucide.createIcons();

        // Reset form
        form.reset();

        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            lucide.createIcons();
        }, 3000);
    });
}

/**
 * Navigation Highlighting
 * Highlight current section in nav (instant updates)
 */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length === 0 || navLinks.length === 0) return;

    // Use Intersection Observer for efficient tracking
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all
                navLinks.forEach(link => {
                    link.style.backgroundColor = '';
                    link.style.color = '';
                });

                // Add to current
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.style.backgroundColor = '#FFF9C4'; // highlight-yellow
                    activeLink.style.color = '#1A1A1A'; // ink-black
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px'
    });

    sections.forEach(section => observer.observe(section));
}

/**
 * Reading Progress (Optional - disabled by default for true e-ink feel)
 * Uncomment if you want to show reading progress
 */
/*
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 2px;
        background: #1A1A1A;
        z-index: 1000;
        width: 0%;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}
*/

/**
 * Accessibility: Keyboard navigation
 */
document.addEventListener('keydown', function(e) {
    // ESC closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const toggle = document.querySelector('.nav-toggle');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = toggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
            toggle.focus();
        }
    }
});

/**
 * Focus management for better accessibility
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            // Focus management for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus();
        }
    });
});
