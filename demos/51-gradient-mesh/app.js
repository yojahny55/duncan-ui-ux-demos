/**
 * Gradient Mesh / Aurora Evolved
 * Style #51 - UI/UX Demo
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Mobile menu toggle
    initMobileMenu();

    // Smooth scroll for navigation
    initSmoothScroll();

    // Intersection Observer for animations
    initScrollAnimations();

    // Interactive gradient mesh effect
    initInteractiveMesh();

    // Form handling
    initFormHandling();

    // Navbar scroll effect
    initNavbarScroll();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            const icon = toggle.querySelector('svg');
            if (menu.classList.contains('active')) {
                toggle.innerHTML = '<i data-lucide="x"></i>';
            } else {
                toggle.innerHTML = '<i data-lucide="menu"></i>';
            }
            lucide.createIcons();
        });
    }
}

/**
 * Smooth Scroll Navigation
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.about-card, .service-card, .testimonial-card, .section-header'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Interactive Gradient Mesh Effect
 */
function initInteractiveMesh() {
    const meshBg = document.querySelector('.gradient-mesh-bg');
    if (!meshBg) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animateMesh() {
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        const blobs = document.querySelectorAll('.mesh-blob');
        blobs.forEach((blob, index) => {
            const multiplier = (index + 1) * 10;
            const translateX = currentX * multiplier;
            const translateY = currentY * multiplier;
            
            blob.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });

        requestAnimationFrame(animateMesh);
    }

    animateMesh();
}

/**
 * Form Handling
 */
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;

        // Loading state
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i><span>Sending...</span>';
        submitBtn.disabled = true;
        lucide.createIcons();

        // Add spin animation
        const style = document.createElement('style');
        style.textContent = `
            .spin {
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success state
        submitBtn.innerHTML = '<i data-lucide="check"></i><span>Sent!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #00FF66, #00CC52)';
        lucide.createIcons();

        // Reset after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            form.reset();
            lucide.createIcons();
        }, 3000);
    });

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
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Parallax effect for hero section
 */
document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrollY < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

/**
 * Color Palette Tooltip (for debugging/development)
 */
const colorPalette = {
    cyan: '#00FFFF',
    magenta: '#FF00FF',
    yellow: '#FFFF00',
    blue: '#0066FF',
    green: '#00FF66',
    purple: '#8B5CF6',
    pink: '#EC4899',
    orange: '#F97316'
};

// Expose for console access
window.gradientMeshColors = colorPalette;

console.log('%c🌈 Gradient Mesh / Aurora Evolved', 
    'font-size: 20px; font-weight: bold; background: linear-gradient(90deg, #00FFFF, #FF00FF, #00FF66); -webkit-background-clip: text; color: transparent;');
console.log('Color palette available at: window.gradientMeshColors');
