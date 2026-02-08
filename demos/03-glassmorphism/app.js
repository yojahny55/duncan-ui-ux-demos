/**
 * Glassmorphism UI Demo
 * Style #3 - Crystal Clear Solutions
 * 
 * Features:
 * - Mobile navigation toggle
 * - Smooth scroll navigation
 * - Glass card hover effects
 * - Form handling with visual feedback
 * - Intersection Observer animations
 * - Parallax background effect
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
    initParallaxOrbs();
    initNavHighlight();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!toggle || !navLinks) return;
    
    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = toggle.querySelectorAll('span');
        if (toggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
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
                const navHeight = document.querySelector('.glass-nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll-based Animations
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
                
                // Stagger children animations for grids
                if (entry.target.classList.contains('services-grid') ||
                    entry.target.classList.contains('testimonials-grid')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.animationDelay = `${index * 100}ms`;
                        child.classList.add('animate-in');
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-content, .about-image, .service-card, ' +
        '.testimonial-card, .contact-info, .contact-form, ' +
        '.services-grid, .testimonials-grid'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button[type="submit"]');
        const originalContent = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<span>Sending...</span>';
        button.disabled = true;
        button.style.opacity = '0.7';
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success state
        button.innerHTML = '<span>Message Sent! ✓</span>';
        button.style.background = 'linear-gradient(135deg, #20B2AA, #00FFFF)';
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.disabled = false;
            button.style.opacity = '1';
            button.style.background = '';
        }, 3000);
    });
    
    // Add floating label effect
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
            if (!field.value) {
                field.parentElement.classList.remove('focused');
            }
        });
    });
}

/**
 * Parallax Effect for Background Orbs
 */
function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.gradient-orb');
    if (orbs.length === 0) return;
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    let ticking = false;
    
    const updateOrbPositions = () => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollY / maxScroll;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            const yOffset = scrollProgress * 100 * speed;
            const rotation = scrollProgress * 30 * (index % 2 === 0 ? 1 : -1);
            
            orb.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
        });
        
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOrbPositions);
            ticking = true;
        }
    });
    
    // Mouse parallax effect
    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
                const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
                
                orbs.forEach((orb, index) => {
                    const speed = (index + 1) * 0.3;
                    const currentTransform = orb.style.transform || '';
                    const baseTransform = currentTransform.replace(/translate\([^)]+\)\s*/g, '');
                    
                    orb.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px) ${baseTransform}`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Navigation Highlight on Scroll
 */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    const highlightNav = () => {
        const scrollY = window.scrollY;
        const navHeight = document.querySelector('.glass-nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    // Add active link styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--text-primary);
            background: rgba(255, 255, 255, 0.15);
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Run on load
}

/**
 * Glass Card Ripple Effect
 */
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't add ripple if clicking on interactive elements
        if (e.target.tagName === 'A' || 
            e.target.tagName === 'BUTTON' || 
            e.target.tagName === 'INPUT' ||
            e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${e.clientX - rect.left - size/2}px;
            top: ${e.clientY - rect.top - size/2}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out forwards;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/**
 * Newsletter Form
 */
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = '...';
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        button.textContent = '✓';
        input.value = '';
        input.placeholder = 'Subscribed!';
        
        setTimeout(() => {
            button.textContent = originalText;
            input.placeholder = 'your@email.com';
        }, 3000);
    });
}

console.log('🔮 Glassmorphism UI Demo loaded');
console.log('Style #3 - Crystal Clear Solutions');
console.log('Built with: Frosted glass, vibrant gradients, layered depth');
