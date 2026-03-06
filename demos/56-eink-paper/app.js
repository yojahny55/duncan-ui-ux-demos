/* ============================================
   E-Ink / Paper Style - JavaScript
   Minimal, instant interactions (no smooth animations)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Mobile navigation toggle
    initMobileNav();

    // Form handling
    initContactForm();

    // Smooth scroll disabled for e-ink feel - instant jumps
    initInstantScroll();
});

/**
 * Mobile Navigation Toggle
 * Simple toggle without animation for e-ink aesthetic
 */
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Update toggle icon
        const icon = navToggle.querySelector('i');
        if (icon) {
            const isOpen = navMenu.classList.contains('active');
            icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
            lucide.createIcons();
        }
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });
}

/**
 * Instant Scroll Navigation
 * E-ink displays don't do smooth scrolling, so we override
 */
function initInstantScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                // Instant scroll - no smooth behavior
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'auto'
                });
            }
        });
    });
}

/**
 * Contact Form Handler
 * Simple form handling with visual feedback
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;

        // Simple state change - no animation
        submitBtn.innerHTML = '<i data-lucide="check"></i> Message Sent';
        submitBtn.disabled = true;
        lucide.createIcons();

        // Reset after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            lucide.createIcons();
            form.reset();
        }, 2000);
    });
}

/**
 * Reading Progress Indicator (Optional)
 * Shows reading progress in a minimal way
 */
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 2px;
        background: var(--ink-black);
        z-index: 1000;
        width: 0%;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

/**
 * Keyboard Navigation Enhancement
 * Better keyboard support for accessibility
 */
document.addEventListener('keydown', (e) => {
    // ESC closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu.active');
        if (navMenu) {
            navMenu.classList.remove('active');
            const navToggle = document.querySelector('.nav-toggle');
            const icon = navToggle?.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    }
});

/**
 * Reduced Motion Check
 * Respects user preferences for reduced motion
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.documentElement.style.setProperty('scroll-behavior', 'auto');
}

/**
 * Print Optimization
 * Prepares page for printing
 */
window.addEventListener('beforeprint', () => {
    // Expand all sections for print
    document.querySelectorAll('.nav-menu').forEach(menu => {
        menu.classList.remove('active');
    });
});
