/**
 * Claymorphism Demo - Interactive JavaScript
 * Soft 3D, playful, toy-like UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initNavbar();
    initScrollAnimations();
    initButtonBounce();
    initCheckboxToggle();
    initProgressAnimation();
    initFormInteractions();
    initParallaxShapes();
});

/**
 * Navbar scroll behavior
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle mobile menu (simplified - would expand nav on full implementation)
            mobileMenuBtn.classList.toggle('active');
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
 * Scroll-triggered reveal animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const animatedElements = document.querySelectorAll(
        '.clay-card, .section-header, .stat-item, .contact-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s, 
                              transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
}

/**
 * Button bounce effect on click
 */
function initButtonBounce() {
    const buttons = document.querySelectorAll('.clay-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.92)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1.05)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

/**
 * Toggle checkboxes in about section
 */
function initCheckboxToggle() {
    const checkboxes = document.querySelectorAll('.clay-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            checkbox.classList.toggle('checked');
            
            // Bounce animation
            checkbox.style.transform = 'scale(1.2)';
            setTimeout(() => {
                checkbox.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Make keyboard accessible
        checkbox.setAttribute('tabindex', '0');
        checkbox.setAttribute('role', 'checkbox');
        checkbox.setAttribute('aria-checked', checkbox.classList.contains('checked'));
        
        checkbox.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                checkbox.click();
                checkbox.setAttribute('aria-checked', checkbox.classList.contains('checked'));
            }
        });
    });
}

/**
 * Animate progress bar on scroll into view
 */
function initProgressAnimation() {
    const progressBars = document.querySelectorAll('.clay-progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0%';
                
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 300);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

/**
 * Form interactions with clay-like feedback
 */
function initFormInteractions() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    // Input focus effects
    const inputs = form.querySelectorAll('.clay-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 0.5rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
                <circle cx="12" cy="12" r="10" opacity="0.25"></circle>
                <path d="M12 2a10 10 0 0 1 10 10" opacity="1"></path>
            </svg>
            Sending...
        </span>`;
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 0.5rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Sent!
            </span>`;
            submitBtn.style.background = '#98FF98';
            submitBtn.style.borderColor = '#7ae87a';
            
            // Bounce effect
            submitBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
            }, 200);
            
            // Reset after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.disabled = false;
                form.reset();
                lucide.createIcons();
            }, 2000);
        }, 1500);
    });
}

/**
 * Parallax effect on hero shapes
 */
function initParallaxShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

/**
 * Add CSS for spin animation
 */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);

/**
 * Service worker for offline support (optional)
 */
if ('serviceWorker' in navigator) {
    // Could register service worker here for PWA support
}

console.log('🎨 Claymorphism Demo loaded successfully!');
console.log('✨ Soft 3D, playful, toy-like UI - perfect for educational and creative apps.');
