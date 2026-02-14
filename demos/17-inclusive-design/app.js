/**
 * Inclusive Design Demo - JavaScript
 * WCAG AAA compliant accessibility-first interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all functionality
    initMobileNavigation();
    initAccessibilityControls();
    initSmoothScrolling();
    initFormValidation();
    initKeyboardNavigation();
    initFocusManagement();
    initReducedMotionCheck();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNavigation() {
    const toggle = document.querySelector('.mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!toggle || !navMenu) return;
    
    toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Update icon
        const icon = toggle.querySelector('[data-lucide]');
        if (icon) {
            icon.setAttribute('data-lucide', isExpanded ? 'menu' : 'x');
            lucide.createIcons();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !navMenu.contains(e.target)) {
            toggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            
            const icon = toggle.querySelector('[data-lucide]');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            toggle.focus();
            
            const icon = toggle.querySelector('[data-lucide]');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    });
}

/**
 * Accessibility Controls (Font Size, Contrast, Motion)
 */
function initAccessibilityControls() {
    const fontSizeToggle = document.getElementById('font-size-toggle');
    const contrastToggle = document.getElementById('contrast-toggle');
    const motionToggle = document.getElementById('motion-toggle');
    
    // Load saved preferences
    const savedFontSize = localStorage.getItem('a11y-large-text');
    const savedContrast = localStorage.getItem('a11y-high-contrast');
    const savedMotion = localStorage.getItem('a11y-reduce-motion');
    
    if (savedFontSize === 'true') {
        document.body.classList.add('large-text');
        fontSizeToggle?.classList.add('active');
    }
    
    if (savedContrast === 'true') {
        document.body.classList.add('high-contrast');
        contrastToggle?.classList.add('active');
    }
    
    if (savedMotion === 'true') {
        document.body.classList.add('reduce-motion');
        motionToggle?.classList.add('active');
    }
    
    // Font Size Toggle
    fontSizeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('large-text');
        fontSizeToggle.classList.toggle('active');
        
        const isLarge = document.body.classList.contains('large-text');
        localStorage.setItem('a11y-large-text', isLarge);
        
        announceChange(isLarge ? 'Large text enabled' : 'Normal text size restored');
    });
    
    // Contrast Toggle
    contrastToggle?.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        contrastToggle.classList.toggle('active');
        
        const isHighContrast = document.body.classList.contains('high-contrast');
        localStorage.setItem('a11y-high-contrast', isHighContrast);
        
        announceChange(isHighContrast ? 'High contrast mode enabled' : 'Normal contrast restored');
    });
    
    // Motion Toggle
    motionToggle?.addEventListener('click', () => {
        document.body.classList.toggle('reduce-motion');
        motionToggle.classList.toggle('active');
        
        const isReduced = document.body.classList.contains('reduce-motion');
        localStorage.setItem('a11y-reduce-motion', isReduced);
        
        // Update icon
        const icon = motionToggle.querySelector('[data-lucide]');
        if (icon) {
            icon.setAttribute('data-lucide', isReduced ? 'play-circle' : 'pause-circle');
            lucide.createIcons();
        }
        
        announceChange(isReduced ? 'Motion reduced' : 'Motion enabled');
    });
}

/**
 * Announce changes to screen readers
 */
function announceChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

/**
 * Smooth Scrolling with Reduced Motion Support
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                || document.body.classList.contains('reduce-motion');
            
            if (prefersReducedMotion) {
                target.scrollIntoView();
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Set focus to the target for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const toggle = document.querySelector('.mobile-toggle');
            if (navMenu?.classList.contains('active')) {
                toggle?.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            }
        });
    });
}

/**
 * Form Validation with Accessible Error Messages
 */
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors(form);
        
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showError(field, 'This field is required');
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                isValid = false;
                showError(field, 'Please enter a valid email address');
            }
        });
        
        if (isValid) {
            // Show success message
            showSuccess(form);
        } else {
            // Focus first error field
            const firstError = form.querySelector('.form-group.has-error input, .form-group.has-error textarea, .form-group.has-error select');
            firstError?.focus();
            
            announceChange('Form has errors. Please correct them and try again.');
        }
    });
    
    // Clear error on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('input', () => {
            clearFieldError(field);
        });
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('has-error');
    
    // Create error message
    const errorId = `${field.id}-error`;
    const error = document.createElement('span');
    error.id = errorId;
    error.className = 'form-error';
    error.setAttribute('role', 'alert');
    error.innerHTML = `<i data-lucide="alert-circle" aria-hidden="true"></i> ${message}`;
    
    formGroup.appendChild(error);
    field.setAttribute('aria-describedby', `${field.getAttribute('aria-describedby') || ''} ${errorId}`.trim());
    field.setAttribute('aria-invalid', 'true');
    
    // Initialize icon
    lucide.createIcons();
    
    // Add error styles
    field.style.borderColor = 'var(--color-error)';
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('has-error');
    
    const error = formGroup.querySelector('.form-error');
    if (error) {
        const errorId = error.id;
        const describedBy = field.getAttribute('aria-describedby')?.replace(errorId, '').trim();
        if (describedBy) {
            field.setAttribute('aria-describedby', describedBy);
        } else {
            field.removeAttribute('aria-describedby');
        }
        error.remove();
    }
    
    field.removeAttribute('aria-invalid');
    field.style.borderColor = '';
}

function clearErrors(form) {
    form.querySelectorAll('.form-group.has-error').forEach(group => {
        const field = group.querySelector('input, textarea, select');
        if (field) clearFieldError(field);
    });
}

function showSuccess(form) {
    form.innerHTML = `
        <div class="form-success" role="status">
            <div class="success-icon" aria-hidden="true">
                <i data-lucide="check-circle"></i>
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
            <button type="button" class="btn btn-primary" onclick="location.reload()">
                <i data-lucide="refresh-cw" aria-hidden="true"></i>
                Send Another Message
            </button>
        </div>
    `;
    
    // Add success styles
    const style = document.createElement('style');
    style.textContent = `
        .form-success {
            text-align: center;
            padding: var(--spacing-xl);
        }
        .success-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            margin: 0 auto var(--spacing-md);
            background: var(--color-success);
            border-radius: 50%;
        }
        .success-icon svg {
            width: 40px;
            height: 40px;
            color: white;
        }
        .form-success h3 {
            margin-bottom: var(--spacing-sm);
        }
        .form-success p {
            color: var(--color-text-secondary);
            margin-bottom: var(--spacing-lg);
        }
        .form-error {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            margin-top: var(--spacing-xs);
            color: var(--color-error);
            font-size: var(--font-size-sm);
            font-weight: 600;
        }
        .form-error svg {
            width: 16px;
            height: 16px;
        }
    `;
    document.head.appendChild(style);
    
    lucide.createIcons();
    announceChange('Your message has been sent successfully.');
    
    // Focus the success message
    form.querySelector('.form-success').focus();
}

/**
 * Enhanced Keyboard Navigation
 */
function initKeyboardNavigation() {
    // Handle Enter key on cards (for tabindex="0" elements)
    document.querySelectorAll('[tabindex="0"]').forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Menu keyboard navigation
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        const menuItems = navMenu.querySelectorAll('a');
        
        menuItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                let nextIndex;
                
                switch (e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        nextIndex = (index + 1) % menuItems.length;
                        menuItems[nextIndex].focus();
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        nextIndex = (index - 1 + menuItems.length) % menuItems.length;
                        menuItems[nextIndex].focus();
                        break;
                    case 'Home':
                        e.preventDefault();
                        menuItems[0].focus();
                        break;
                    case 'End':
                        e.preventDefault();
                        menuItems[menuItems.length - 1].focus();
                        break;
                }
            });
        });
    }
}

/**
 * Focus Management
 */
function initFocusManagement() {
    // Track focus for styling
    document.body.addEventListener('mousedown', () => {
        document.body.classList.add('using-mouse');
    });
    
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.remove('using-mouse');
        }
    });
    
    // Focus trap for modals (if any)
    // This is a utility function for future use
    window.trapFocus = (container) => {
        const focusable = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        
        container.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    };
}

/**
 * Check and respect reduced motion preference
 */
function initReducedMotionCheck() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreference = () => {
        if (mediaQuery.matches) {
            document.body.classList.add('reduce-motion');
            const motionToggle = document.getElementById('motion-toggle');
            if (motionToggle) {
                motionToggle.classList.add('active');
                const icon = motionToggle.querySelector('[data-lucide]');
                if (icon) {
                    icon.setAttribute('data-lucide', 'play-circle');
                    lucide.createIcons();
                }
            }
        }
    };
    
    handleMotionPreference();
    mediaQuery.addEventListener('change', handleMotionPreference);
}

/**
 * Intersection Observer for scroll animations (respects reduced motion)
 */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observeElements = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches 
        || document.body.classList.contains('reduce-motion');
    
    if (prefersReducedMotion) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.about-card, .service-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
};

// Add CSS for animated elements
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    body.using-mouse *:focus {
        outline: none;
        box-shadow: none;
    }
    
    body.using-mouse *:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
    }
`;
document.head.appendChild(animationStyles);

// Initialize scroll animations after page load
window.addEventListener('load', observeElements);
