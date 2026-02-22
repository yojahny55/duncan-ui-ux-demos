/**
 * Organic Biophilic UI - Interactive JavaScript
 * Nature-inspired, wellness aesthetic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initNavbar();
    initScrollAnimations();
    initFormInteractions();
    initParallaxShapes();
    initSmoothScroll();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for background effect
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.about-card, .service-mini, .testimonial-card, .service-card.featured, .contact-wrapper > *'
    );
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add initial styles and observe
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        headerObserver.observe(header);
    });
}

/**
 * Form interactions and validation
 */
function initFormInteractions() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Add focus styles
    inputs.forEach(input => {
        const wrapper = input.closest('.input-wrapper');
        const icon = wrapper.querySelector('i');
        
        input.addEventListener('focus', () => {
            wrapper.classList.add('focused');
            if (icon) {
                icon.style.color = '#228B22';
            }
        });
        
        input.addEventListener('blur', () => {
            wrapper.classList.remove('focused');
            if (icon && !input.value) {
                icon.style.color = '';
            }
        });
        
        // Keep icon colored if input has value
        input.addEventListener('input', () => {
            if (input.value && icon) {
                icon.style.color = '#228B22';
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        let isValid = true;
        const requiredFields = form.querySelectorAll('input[required], textarea[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.closest('.input-wrapper').style.borderColor = '#C67B5C';
            }
        });
        
        if (isValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Show success state
            submitBtn.innerHTML = '<i data-lucide="check-circle"></i> Message Planted!';
            submitBtn.style.background = 'linear-gradient(135deg, #9DC183, #228B22)';
            lucide.createIcons();
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                lucide.createIcons();
            }, 3000);
        }
    });
}

/**
 * Parallax effect for organic shapes
 */
function initParallaxShapes() {
    const shapes = document.querySelectorAll('.organic-shape');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.05 + (index * 0.02);
            const yOffset = scrollY * speed;
            const rotation = scrollY * 0.02;
            
            shape.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
        });
    });
    
    // Mouse movement effect for hero shapes
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;
            
            shapes.forEach((shape, index) => {
                const intensity = 20 + (index * 10);
                const xMove = xPercent * intensity;
                const yMove = yPercent * intensity;
                
                shape.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
        });
    }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

/**
 * Counter animation for stats
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const isPercent = target.includes('%');
                const isK = target.includes('K');
                
                let endValue = parseInt(target.replace(/[^0-9]/g, ''));
                let suffix = '';
                
                if (isPercent) suffix = '%';
                if (isK) suffix = 'K';
                
                let startValue = 0;
                const duration = 2000;
                const increment = endValue / (duration / 16);
                
                const updateCounter = () => {
                    startValue += increment;
                    
                    if (startValue < endValue) {
                        counter.textContent = Math.floor(startValue) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = endValue + suffix;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize counters after a short delay
setTimeout(animateCounters, 500);

/**
 * Add natural breathing animation to elements
 */
function initBreathingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes breathe {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.02);
            }
        }
        
        .plant-card:hover,
        .about-card:hover .card-icon,
        .testimonial-card:hover .author-avatar {
            animation: breathe 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
}

initBreathingAnimation();

/**
 * Add natural leaf cursor trail (subtle)
 */
function initCursorEffect() {
    const hero = document.querySelector('.hero');
    
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    let particles = [];
    const maxParticles = 5;
    
    hero.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) { // Only occasionally spawn particles
            createParticle(e.clientX, e.clientY);
        }
    });
    
    function createParticle(x, y) {
        if (particles.length >= maxParticles) {
            const oldParticle = particles.shift();
            if (oldParticle.parentNode) {
                oldParticle.remove();
            }
        }
        
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: rgba(157, 193, 131, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            animation: particleFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        setTimeout(() => {
            particle.remove();
            particles = particles.filter(p => p !== particle);
        }, 1000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFade {
            0% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            100% {
                opacity: 0;
                transform: scale(0.5) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize cursor effect for desktop only
if (window.innerWidth > 768) {
    initCursorEffect();
}
