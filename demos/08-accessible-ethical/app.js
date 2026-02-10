/**
 * AccessFirst - Accessible & Ethical Design Demo
 * WCAG AAA Compliant JavaScript
 * 
 * Key Accessibility Features:
 * - Keyboard navigation support
 * - Screen reader announcements (aria-live)
 * - Reduced motion preference detection
 * - Focus management
 * - Form validation with accessible error messages
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize components
    initNavigation();
    initSmoothScroll();
    initFormValidation();
    initFocusManagement();
});

/**
 * Navigation Toggle for Mobile
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');

        // Update icon
        const icon = navToggle.querySelector('[data-lucide]');
        if (icon) {
            icon.setAttribute('data-lucide', isExpanded ? 'menu' : 'x');
            lucide.createIcons();
        }

        // Move focus to first menu item when opening
        if (!isExpanded) {
            const firstLink = navMenu.querySelector('a');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            navToggle.focus();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            }
        }
    });

    // Close menu after clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        });
    });
}

/**
 * Smooth Scroll - Respects reduced motion preference
 */
function initSmoothScroll() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            // Scroll behavior based on motion preference
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });

            // Set focus to target for screen readers
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            
            // Remove tabindex after blur to prevent styling issues
            target.addEventListener('blur', () => {
                target.removeAttribute('tabindex');
            }, { once: true });
        });
    });
}

/**
 * Form Validation with Accessible Error Messages
 */
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const validators = {
        name: {
            validate: (value) => value.trim().length >= 2,
            message: 'Please enter your full name (at least 2 characters)'
        },
        email: {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Please enter a valid email address'
        },
        message: {
            validate: (value) => value.trim().length >= 10,
            message: 'Please enter a message (at least 10 characters)'
        }
    };

    // Real-time validation on blur
    Object.keys(validators).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        const errorElement = document.getElementById(`${fieldName}-error`);

        if (field && errorElement) {
            field.addEventListener('blur', () => {
                validateField(field, validators[fieldName], errorElement);
            });

            // Clear error on input
            field.addEventListener('input', () => {
                if (field.getAttribute('aria-invalid') === 'true') {
                    validateField(field, validators[fieldName], errorElement);
                }
            });
        }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        let firstInvalidField = null;

        // Validate all required fields
        Object.keys(validators).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            const errorElement = document.getElementById(`${fieldName}-error`);

            if (field && errorElement) {
                const fieldValid = validateField(field, validators[fieldName], errorElement);
                if (!fieldValid && !firstInvalidField) {
                    firstInvalidField = field;
                    isValid = false;
                }
            }
        });

        if (!isValid && firstInvalidField) {
            // Focus first invalid field
            firstInvalidField.focus();
            
            // Announce to screen readers
            announceMessage('Please correct the errors in the form.');
        } else if (isValid) {
            // Success - show confirmation
            handleFormSuccess(form);
        }
    });
}

/**
 * Validate a single field
 */
function validateField(field, validator, errorElement) {
    const isValid = validator.validate(field.value);

    field.setAttribute('aria-invalid', !isValid);
    field.setAttribute('aria-describedby', errorElement.id);

    if (!isValid) {
        errorElement.textContent = validator.message;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

/**
 * Handle successful form submission
 */
function handleFormSuccess(form) {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.setAttribute('role', 'alert');
    successMessage.setAttribute('aria-live', 'polite');
    successMessage.innerHTML = `
        <div style="
            padding: var(--spacing-lg);
            background-color: #ECFDF5;
            border: 2px solid var(--color-success);
            border-radius: var(--radius-md);
            text-align: center;
        ">
            <p style="
                font-size: var(--font-size-large);
                font-weight: 600;
                color: var(--color-success);
                margin-bottom: var(--spacing-xs);
            ">Thank you for your message!</p>
            <p style="color: var(--color-text-secondary); margin: 0;">
                We'll get back to you within 1-2 business days.
            </p>
        </div>
    `;

    // Replace form with success message
    form.style.display = 'none';
    form.parentNode.insertBefore(successMessage, form.nextSibling);

    // Focus success message
    successMessage.focus();
}

/**
 * Announce message to screen readers
 */
function announceMessage(message) {
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'visually-hidden';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
        document.body.removeChild(announcer);
    }, 1000);
}

/**
 * Enhanced Focus Management
 */
function initFocusManagement() {
    // Add visible focus indicator for keyboard users
    let isKeyboardUser = false;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            isKeyboardUser = true;
            document.body.classList.add('keyboard-user');
        }
    });

    document.addEventListener('mousedown', () => {
        isKeyboardUser = false;
        document.body.classList.remove('keyboard-user');
    });

    // Focus trap for mobile menu
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.querySelector('.nav-toggle');

    if (navMenu && navToggle) {
        navMenu.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab' || !navMenu.classList.contains('active')) return;

            const focusableElements = navMenu.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                navToggle.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                navToggle.focus();
            }
        });
    }
}

/**
 * Intersection Observer for scroll animations
 * Only runs if user hasn't requested reduced motion
 */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.about-card, .service-item, .testimonial').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .about-card.visible,
        .service-item.visible,
        .testimonial.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}
