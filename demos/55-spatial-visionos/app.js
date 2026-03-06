/**
 * Spatial UI (VisionOS) - Style #55
 * Glass, depth, immersion, spatial
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all features
    initNavigation();
    initScrollEffects();
    initGazeHover();
    initParallaxDepth();
    initFormHandling();
    initMobileMenu();
});

/**
 * Navigation - Active state and smooth scroll
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active state on scroll
    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 200;
        
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
    };
    
    window.addEventListener('scroll', updateActiveNav, { passive: true });
}

/**
 * Scroll Effects - Fade in elements on scroll
 */
function initScrollEffects() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate cards and sections
    const animatedElements = document.querySelectorAll(
        '.about-card, .service-card, .testimonial-card, .contact-method'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

/**
 * Gaze Hover Effect - VisionOS-style focus
 */
function initGazeHover() {
    const interactiveElements = document.querySelectorAll(
        '.about-card, .service-card, .testimonial-card, .app-icon, .floating-card, .btn-primary, .btn-secondary'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Scale effect
            el.style.transform = el.style.transform.includes('translateY')
                ? el.style.transform
                : 'scale(1.02)';
            
            // Add glow effect
            const computedStyle = getComputedStyle(el);
            const currentShadow = computedStyle.boxShadow;
            
            if (!currentShadow.includes('rgba(0, 122, 255')) {
                el.dataset.originalShadow = currentShadow;
                el.style.boxShadow = `${currentShadow}, 0 0 30px rgba(0, 122, 255, 0.2)`;
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if (el.dataset.originalShadow) {
                el.style.boxShadow = el.dataset.originalShadow;
            }
        });
    });
}

/**
 * Parallax Depth Effect - Create depth on mouse move
 */
function initParallaxDepth() {
    const heroVisual = document.querySelector('.hero-visual');
    const floatingCards = document.querySelectorAll('.floating-card');
    const heroWindow = document.querySelector('.hero-window');
    
    if (!heroVisual) return;
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        // Parallax for floating cards
        floatingCards.forEach((card, index) => {
            const depth = (index + 1) * 10;
            const x = mouseX * depth;
            const y = mouseY * depth;
            card.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Subtle rotation for hero window
        if (heroWindow) {
            const rotateY = mouseX * 5;
            const rotateX = -mouseY * 5;
            heroWindow.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        }
    });
}

/**
 * Form Handling
 */
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;
    
    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i><span>Sending...</span>';
        submitBtn.disabled = true;
        lucide.createIcons();
        
        // Add spin animation
        const loader = submitBtn.querySelector('.spin');
        if (loader) {
            loader.style.animation = 'spin 1s linear infinite';
        }
        
        // Simulate sending
        setTimeout(() => {
            submitBtn.innerHTML = '<i data-lucide="check"></i><span>Message Sent!</span>';
            submitBtn.style.background = '#34C759';
            lucide.createIcons();
            
            // Reset form
            form.reset();
            
            // Restore button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                lucide.createIcons();
            }, 3000);
        }, 1500);
    });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileToggle || !navLinks) return;
    
    let isOpen = false;
    
    mobileToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        
        if (isOpen) {
            // Create mobile menu
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(255, 255, 255, 0.1)';
            navLinks.style.backdropFilter = 'blur(40px)';
            navLinks.style.padding = '20px';
            navLinks.style.marginTop = '10px';
            navLinks.style.borderRadius = '20px';
            navLinks.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            
            // Update icon
            mobileToggle.innerHTML = '<i data-lucide="x"></i>';
            lucide.createIcons();
        } else {
            // Hide mobile menu
            navLinks.style.display = 'none';
            
            // Update icon
            mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        }
    });
    
    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                isOpen = false;
                navLinks.style.display = 'none';
                mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }
        });
    });
}

// Add keyframe for spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);
