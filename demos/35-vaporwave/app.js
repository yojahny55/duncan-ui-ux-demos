/**
 * VAPORWAVE STYLE DEMO - JavaScript
 * Synthwave, retro-futuristic, 80s-90s nostalgia
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Initialize all modules
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
    initGlitchEffect();
    initFormHandling();
    initParallaxEffects();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', isOpen);
        
        // Update icon
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
            lucide.createIcons();
        }
    });
    
    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });
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
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger children animations
                const children = entry.target.querySelectorAll('.about-card, .service-card, .testimonial-card');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.15}s`;
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.about, .services, .testimonials, .contact').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add animate-in styles
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
 * Navbar Scroll Effect
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Add scrolled styles
    const style = document.createElement('style');
    style.textContent = `
        .navbar {
            transition: transform 0.3s ease, background 0.3s ease;
        }
        .navbar.scrolled {
            background: rgba(10, 0, 20, 0.95);
            box-shadow: 0 0 30px rgba(255, 113, 206, 0.2);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Enhanced Glitch Effect
 */
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch');
    if (!glitchText) return;
    
    // Random intense glitch occasionally
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchText.classList.add('glitch-intense');
            setTimeout(() => {
                glitchText.classList.remove('glitch-intense');
            }, 200);
        }
    }, 100);
    
    // Add intense glitch styles
    const style = document.createElement('style');
    style.textContent = `
        .glitch-intense {
            animation: glitchIntense 0.1s steps(2) infinite !important;
        }
        @keyframes glitchIntense {
            0% { transform: translate(0); }
            25% { transform: translate(-5px, 3px) skew(5deg); }
            50% { transform: translate(5px, -3px) skew(-5deg); }
            75% { transform: translate(-3px, -5px); }
            100% { transform: translate(3px, 5px); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Form Handling
 */
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalContent = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<i data-lucide="loader-2"></i><span>Sending...</span>';
        btn.disabled = true;
        lucide.createIcons();
        
        // Add loading animation
        const loader = btn.querySelector('i');
        if (loader) {
            loader.style.animation = 'spin 1s linear infinite';
        }
        
        // Simulate form submission
        setTimeout(() => {
            btn.innerHTML = '<i data-lucide="check-circle"></i><span>Message Sent!</span>';
            btn.style.background = 'linear-gradient(135deg, #05FFA1, #01CDFE)';
            lucide.createIcons();
            
            // Reset form
            form.reset();
            
            // Restore button after delay
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                btn.disabled = false;
                lucide.createIcons();
            }, 3000);
        }, 2000);
    });
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Parallax Effects
 */
function initParallaxEffects() {
    const sun = document.querySelector('.sun');
    const grid = document.querySelector('.retro-grid');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Sun parallax
        if (sun) {
            sun.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
        }
        
        // Grid parallax
        if (grid) {
            grid.style.backgroundPositionY = `${scrolled * 0.1}px`;
        }
    });
    
    // Mouse parallax on hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            if (sun) {
                sun.style.transform = `translate(calc(-50% + ${x * 20}px), calc(-50% + ${y * 20}px))`;
            }
        });
    }
}

/**
 * VHS Effect (optional enhancement)
 */
function initVHSEffect() {
    const vhsOverlay = document.createElement('div');
    vhsOverlay.className = 'vhs-overlay';
    document.body.appendChild(vhsOverlay);
    
    const style = document.createElement('style');
    style.textContent = `
        .vhs-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
            background: transparent;
        }
        .vhs-overlay::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                transparent 0%,
                rgba(255, 113, 206, 0.03) 50%,
                transparent 100%
            );
            animation: vhsScan 8s linear infinite;
        }
        @keyframes vhsScan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
    `;
    document.head.appendChild(style);
}

// Optional: Enable VHS effect
// initVHSEffect();

/**
 * Mobile Menu Styles (added dynamically)
 */
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 0, 20, 0.98);
            flex-direction: column;
            padding: 1rem 0;
            border-bottom: 1px solid rgba(1, 205, 254, 0.3);
        }
        .nav-links.active {
            display: flex;
        }
        .nav-links li {
            width: 100%;
            text-align: center;
        }
        .nav-links a {
            display: block;
            padding: 1rem;
        }
    }
`;
document.head.appendChild(mobileMenuStyle);
