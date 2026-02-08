/**
 * 3D & Hyperrealism - Interactive JavaScript
 * Immersive spatial effects and 3D interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavbar();
    initParallax();
    initStatCounters();
    initServiceCards();
    initTestimonialCarousel();
    initFormEffects();
    initScrollReveal();
    init3DMouseTracking();
});

/**
 * Navbar scroll effects
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Mobile toggle
    navToggle?.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('show');
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Parallax scrolling for hero layers
 */
function initParallax() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const floatingCubes = document.querySelectorAll('.floating-cube');
    const floatingSphere = document.querySelector('.floating-sphere');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Move parallax layers at different speeds
        parallaxLayers.forEach((layer, index) => {
            const speed = 0.1 * (index + 1);
            layer.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        // Move floating elements
        floatingCubes.forEach((cube, index) => {
            const speed = 0.15 * (index + 1);
            const rotation = scrollY * 0.02 * (index + 1);
            cube.style.transform = `
                translateY(${-scrollY * speed}px) 
                rotateX(${rotation}deg) 
                rotateY(${rotation * 1.5}deg)
            `;
        });
        
        if (floatingSphere) {
            floatingSphere.style.transform = `
                translateY(${-scrollY * 0.2}px) 
                scale(${1 + scrollY * 0.0005})
            `;
        }
    });
}

/**
 * Animated stat counters
 */
function initStatCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const countUp = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.value);
                countUp(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statValues.forEach(stat => observer.observe(stat));
}

/**
 * 3D service card effects
 */
function initServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        const wrapper = card.querySelector('.card-3d-wrapper');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            wrapper.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(20px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            wrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

/**
 * Testimonial carousel
 */
function initTestimonialCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    const updateCarousel = () => {
        // Hide all cards except current
        cards.forEach((card, index) => {
            card.style.display = index === currentIndex ? 'block' : 'none';
            card.classList.toggle('active', index === currentIndex);
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };
    
    const goToSlide = (index) => {
        currentIndex = (index + totalCards) % totalCards;
        updateCarousel();
    };
    
    prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-advance every 6 seconds
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 6000);
    
    // Initial state
    updateCarousel();
}

/**
 * Form input effects
 */
function initFormEffects() {
    const form = document.querySelector('.contact-form');
    const inputs = form?.querySelectorAll('input, select, textarea');
    
    inputs?.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Form submission
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Launching...';
        
        // Simulate submission
        setTimeout(() => {
            submitBtn.querySelector('.btn-text').textContent = 'Mission Complete! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-label, .section-title, .section-text, ' +
        '.feature-item, .service-card, .contact-item, ' +
        '.about-3d-card, .form-3d-frame'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

/**
 * 3D mouse tracking for hero section
 */
function init3DMouseTracking() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (!hero || !heroContent) return;
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 50;
        const moveY = (y - centerY) / 50;
        
        heroContent.style.transform = `
            translateX(${moveX}px)
            translateY(${moveY}px)
        `;
    });
    
    hero.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'translateX(0) translateY(0)';
    });
}

/**
 * Smooth scroll for CTA buttons
 */
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href?.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            target?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/**
 * Add perspective tilt to cards on touch devices
 */
if ('ontouchstart' in window) {
    document.querySelectorAll('.service-card, .testimonial-card').forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

/**
 * Preload animation - fade out loading state
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
});
