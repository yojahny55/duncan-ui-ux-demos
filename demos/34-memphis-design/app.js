// Memphis Design - JavaScript
// Bold, geometric, playful interactions

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initNavbar();
    initScrollAnimations();
    initParallaxShapes();
    initFormInteractions();
    initMobileMenu();
    initButtonEffects();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 0 #1A1A1A';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// Scroll-triggered fade-in animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.about-card, .service-card, .testimonial-card, .section-header'
    );
    
    // Add fade-in class to elements
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const parent = entry.target.parentElement;
                if (parent) {
                    const siblings = Array.from(parent.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Parallax effect for background shapes
function initParallaxShapes() {
    const shapes = document.querySelectorAll('.memphis-shapes .shape');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            // Different speeds for different shapes
            const speed = 0.02 + (index * 0.01);
            const direction = index % 2 === 0 ? 1 : -1;
            const rotation = (scrollY * 0.02 * direction) % 360;
            
            shape.style.transform = `
                translateY(${scrollY * speed * direction}px) 
                rotate(${rotation}deg)
            `;
        });
    });
    
    // Mouse parallax for hero shapes
    const heroShapes = document.querySelectorAll('.hero-shape, .hero-card');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        heroShapes.forEach((shape, index) => {
            const depth = (index + 1) * 10;
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;
            
            shape.style.transform = `
                translate(${moveX}px, ${moveY}px)
                ${shape.dataset.rotation || ''}
            `;
        });
    });
}

// Form interactions with Memphis flair
function initFormInteractions() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateX(-3px)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'translateX(0)';
        });
    });
    
    // Form submission
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Memphis-style loading animation
            submitBtn.innerHTML = `
                <span class="loading-dots">
                    <span style="animation: bounce 0.6s infinite;">●</span>
                    <span style="animation: bounce 0.6s infinite 0.1s;">●</span>
                    <span style="animation: bounce 0.6s infinite 0.2s;">●</span>
                </span>
            `;
            submitBtn.disabled = true;
            
            // Simulate submission
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <i data-lucide="check"></i>
                    <span>Message Sent!</span>
                `;
                submitBtn.style.background = '#86CCCA';
                lucide.createIcons();
                
                // Reset after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    lucide.createIcons();
                    form.reset();
                }, 3000);
            }, 1500);
        });
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('mobile-open');
            
            if (isOpen) {
                navLinks.classList.remove('mobile-open');
                navLinks.style.cssText = '';
                mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
            } else {
                navLinks.classList.add('mobile-open');
                navLinks.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: #FFFFFF;
                    border: 3px solid #1A1A1A;
                    border-top: none;
                    padding: 1rem;
                    gap: 0.5rem;
                    box-shadow: 6px 6px 0 #1A1A1A;
                `;
                mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
            }
            lucide.createIcons();
        });
    }
}

// Button hover and click effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .nav-cta, .social-link');
    
    buttons.forEach(btn => {
        // Add click ripple effect
        btn.addEventListener('click', function(e) {
            // Create Memphis-style click effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 0;
                transform: scale(0) rotate(45deg);
                animation: memphis-ripple 0.6s ease-out;
                pointer-events: none;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add keyframe animation for ripple
    if (!document.getElementById('memphis-animations')) {
        const style = document.createElement('style');
        style.id = 'memphis-animations';
        style.textContent = `
            @keyframes memphis-ripple {
                to {
                    transform: scale(2) rotate(45deg);
                    opacity: 0;
                }
            }
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('mobile-open')) {
                navLinks.classList.remove('mobile-open');
                navLinks.style.cssText = '';
                document.querySelector('.mobile-menu').innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }
        }
    });
});

// Random shape movement on scroll
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateShapePositions();
            ticking = false;
        });
        ticking = true;
    }
});

function updateShapePositions() {
    const scrollPercent = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
    const shapes = document.querySelectorAll('.hero-shape');
    
    shapes.forEach((shape, i) => {
        const baseRotation = shape.classList.contains('hero-shape-1') ? 15 : 
                           shape.classList.contains('hero-shape-3') ? 0 : 0;
        const rotation = baseRotation + (scrollPercent * 30 * (i % 2 === 0 ? 1 : -1));
        
        if (!shape.classList.contains('hero-shape-2')) {
            shape.style.setProperty('--rotation', `${rotation}deg`);
        }
    });
}

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const colors = ['#FF71CE', '#FFCE5C', '#86CCCA', '#6A7BB4'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.borderColor = randomColor;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = '#1A1A1A';
    });
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.textContent;
                
                // Only animate numeric values
                if (!isNaN(parseInt(finalValue))) {
                    const endValue = parseInt(finalValue);
                    let startValue = 0;
                    const duration = 2000;
                    const increment = endValue / (duration / 16);
                    
                    const counter = setInterval(() => {
                        startValue += increment;
                        if (startValue >= endValue) {
                            stat.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            stat.textContent = Math.floor(startValue);
                        }
                    }, 16);
                }
                
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

animateStats();

// Console Easter egg
console.log('%c🎨 MEMPHIS DESIGN', 'font-size: 24px; font-weight: bold; color: #FF71CE; text-shadow: 2px 2px 0 #FFCE5C, 4px 4px 0 #86CCCA;');
console.log('%cBold • Playful • Radical', 'font-size: 14px; color: #6A7BB4;');
console.log('%cBreaking design rules since 1981!', 'font-size: 12px; color: #555;');
