/**
 * Anti-Polish / Raw Aesthetic - Demo #47
 * Handmade, imperfect, authentic interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initFormHandling();
    initRandomRotations();
    initHoverEffects();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Update icon
        const icon = menuBtn.querySelector('svg');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
    
    // Add mobile menu styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--paper-cream);
                padding: var(--space-md);
                border-bottom: 2px dashed var(--kraft-brown);
                gap: var(--space-sm);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) navLinks.classList.remove('active');
            
            // Scroll to target
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Scroll Reveal Animation
 * Subtle reveal without smooth transitions (keeping raw aesthetic)
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.about-card, .service-item, .testimonial-card, .info-card, .contact-form'
    );
    
    // Set initial state
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = `translateY(20px) rotate(${getRandomRotation()}deg)`;
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // No transition - instant reveal (raw aesthetic)
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = '';
                }, Math.random() * 200); // Slight random delay for imperfect timing
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Get random small rotation for imperfect feel
 */
function getRandomRotation() {
    return (Math.random() - 0.5) * 4; // -2 to 2 degrees
}

/**
 * Form Handling
 */
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button[type="submit"]');
        const originalContent = button.innerHTML;
        
        // Show sending state
        button.innerHTML = '<span>Sending...</span>';
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Success state
            button.innerHTML = `
                <svg data-lucide="check" style="width: 18px; height: 18px;"></svg>
                <span>Message sent!</span>
            `;
            lucide.createIcons();
            button.style.background = '#4CAF50';
            
            // Reset form
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.style.background = '';
                button.disabled = false;
                lucide.createIcons();
            }, 3000);
        }, 1500);
    });
    
    // Add "handwritten" effect to inputs
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = `rotate(${getRandomRotation() * 0.3}deg)`;
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = '';
        });
    });
}

/**
 * Add random rotations to elements for imperfect feel
 */
function initRandomRotations() {
    const rotatingElements = document.querySelectorAll('.tape, .card-pin');
    
    rotatingElements.forEach(el => {
        const currentRotation = getComputedStyle(el).transform;
        const additionalRotation = getRandomRotation() * 2;
        el.style.transform = `${currentRotation} rotate(${additionalRotation}deg)`;
    });
}

/**
 * Hover Effects - Imperfect interactions
 */
function initHoverEffects() {
    // Service items wiggle on hover
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
    
    // Buttons get slight random rotation on hover
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        const originalTransform = btn.style.transform || '';
        
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = `${originalTransform} rotate(${getRandomRotation()}deg)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = originalTransform;
        });
    });
    
    // Social links playful interaction
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = `rotate(${-5 + Math.random() * 10}deg) scale(1.1)`;
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });
}

/**
 * Navbar scroll effect
 */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

/**
 * Easter egg - Console message
 */
console.log(`
╔══════════════════════════════════════════╗
║  🖊️ Handmade Studio                        ║
║  Anti-Polish / Raw Aesthetic Demo          ║
║                                            ║
║  "Perfectly imperfect since 2020"          ║
║                                            ║
║  UI/UX Demo #47                            ║
║  Made with ❤️ by Duncan                     ║
╚══════════════════════════════════════════╝
`);
