/**
 * Interactive Cursor Design - UI/UX Demo #50
 * Custom cursor, magnetic effects, cursor trails, click feedback
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Check for touch device or reduced motion preference
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isTouchDevice || prefersReducedMotion) {
        // Hide custom cursor elements on touch devices
        document.body.style.cursor = 'auto';
        return;
    }
    
    // Initialize cursor system
    initCustomCursor();
    initCursorTrail();
    initMagneticElements();
    initSmoothScroll();
    initFormInteractions();
});

/**
 * Custom Cursor Implementation
 */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const ease = 0.15;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor with smooth follow
    function animateCursor() {
        // Smooth interpolation
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor state management
    const cursorStates = {
        link: 'hovering',
        button: 'hovering-button',
        text: 'hovering-text',
        input: 'hovering-input',
        card: 'hovering-card',
        badge: 'hovering'
    };
    
    // Handle hover states
    document.querySelectorAll('[data-cursor]').forEach(element => {
        const cursorType = element.dataset.cursor;
        const stateClass = cursorStates[cursorType] || 'hovering';
        
        element.addEventListener('mouseenter', () => {
            cursor.classList.add(stateClass);
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove(stateClass);
        });
    });
    
    // Click feedback
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

/**
 * Cursor Trail Effect
 */
function initCursorTrail() {
    const trailContainer = document.getElementById('cursor-trail');
    if (!trailContainer) return;
    
    const trailLength = 8;
    const trailDots = [];
    const positions = [];
    
    // Create trail dots
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.opacity = (1 - i / trailLength) * 0.3;
        dot.style.transform = `scale(${1 - i / trailLength * 0.5})`;
        trailContainer.appendChild(dot);
        trailDots.push(dot);
        positions.push({ x: 0, y: 0 });
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        // Update positions with delay chain
        positions.unshift({ x: mouseX, y: mouseY });
        positions.pop();
        
        // Apply positions to trail dots
        trailDots.forEach((dot, index) => {
            const pos = positions[index];
            if (pos) {
                dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${1 - index / trailLength * 0.5})`;
                dot.style.opacity = (1 - index / trailLength) * 0.3;
            }
        });
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
}

/**
 * Magnetic Elements Effect
 */
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic');
    const magneticStrength = 0.3;
    const magneticDistance = 100;
    
    magneticElements.forEach(element => {
        let elementX = 0;
        let elementY = 0;
        let isHovering = false;
        
        element.addEventListener('mouseenter', () => {
            isHovering = true;
        });
        
        element.addEventListener('mouseleave', () => {
            isHovering = false;
            // Reset position smoothly
            gsapLike(element, { x: 0, y: 0 });
        });
        
        element.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance < magneticDistance) {
                const force = (1 - distance / magneticDistance) * magneticStrength;
                elementX = deltaX * force;
                elementY = deltaY * force;
                
                element.style.transform = `translate(${elementX}px, ${elementY}px)`;
            }
        });
    });
}

/**
 * Simple GSAP-like animation function
 */
function gsapLike(element, properties, duration = 300) {
    const startX = parseFloat(element.style.transform?.match(/translate\(([^,]+)/)?.[1]) || 0;
    const startY = parseFloat(element.style.transform?.match(/,\s*([^)]+)/)?.[1]) || 0;
    const targetX = properties.x || 0;
    const targetY = properties.y || 0;
    
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        
        const currentX = startX + (targetX - startX) * ease;
        const currentY = startY + (targetY - startY) * ease;
        
        element.style.transform = `translate(${currentX}px, ${currentY}px)`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Smooth Scroll for Navigation Links
 */
function initSmoothScroll() {
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
 * Form Interactions
 */
function initFormInteractions() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button[type="submit"]');
        const originalContent = button.innerHTML;
        
        // Show loading state
        button.innerHTML = `
            <span>Sending...</span>
            <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" opacity="0.25"></circle>
                <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
            </svg>
        `;
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            button.innerHTML = `
                <span>Message Sent!</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            button.style.background = '#22c55e';
            
            // Reset form
            form.reset();
            
            // Restore button after delay
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.style.background = '';
                button.disabled = false;
                lucide.createIcons();
            }, 2000);
        }, 1500);
    });
    
    // Input focus effects
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

/**
 * Intersection Observer for Scroll Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .testimonial-card, .feature-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations after a short delay
setTimeout(initScrollAnimations, 100);

/**
 * Click ripple effect for buttons
 */
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes animate-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    .animate-spin {
        animation: animate-spin 1s linear infinite;
    }
`;
document.head.appendChild(style);
