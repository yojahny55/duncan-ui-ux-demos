/**
 * Aurora UI - Interactive JavaScript
 * Flowing animations, smooth interactions, luminous effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Navigation
    initNavigation();
    
    // Smooth scroll
    initSmoothScroll();
    
    // Scroll animations
    initScrollAnimations();
    
    // Form handling
    initContactForm();
    
    // Aurora parallax effect
    initAuroraParallax();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect on navbar
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        navToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
        lucide.createIcons();
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

/**
 * Smooth scrolling for anchor links
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
 * Scroll-triggered animations
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
                
                // Stagger children animations
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 100}ms`;
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = [
        '.hero-content',
        '.hero-visual',
        '.about-content',
        '.about-visual',
        '.section-header',
        '.service-card',
        '.testimonial-card',
        '.contact-info',
        '.contact-form-wrapper',
        '.feature-item'
    ];

    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('animate-element');
            observer.observe(el);
        });
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card.animate-element,
        .testimonial-card.animate-element,
        .feature-item.animate-element {
            transition-delay: calc(var(--index, 0) * 100ms);
        }
    `;
    document.head.appendChild(style);

    // Set stagger index for cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.setProperty('--index', index);
    });
    
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.style.setProperty('--index', index);
    });
    
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.setProperty('--index', index);
    });
}

/**
 * Contact form handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i><span>Sending...</span>';
        submitBtn.disabled = true;
        lucide.createIcons();
        
        // Add spin animation
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            .spin {
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success state
        submitBtn.innerHTML = '<i data-lucide="check"></i><span>Message Sent!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
        lucide.createIcons();
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
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
 * Aurora parallax effect on mouse move
 */
function initAuroraParallax() {
    const auroraLayers = document.querySelectorAll('.aurora-layer');
    
    // Only enable on desktop
    if (window.matchMedia('(min-width: 768px)').matches) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) / centerX;
            const moveY = (clientY - centerY) / centerY;
            
            auroraLayers.forEach((layer, index) => {
                const speed = (index + 1) * 10;
                const x = moveX * speed;
                const y = moveY * speed;
                
                layer.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // Orb glow effect on hover
    const orbCore = document.querySelector('.orb-core');
    
    if (orbCore) {
        orbCore.addEventListener('mouseenter', () => {
            orbCore.style.boxShadow = `
                0 0 80px rgba(139, 92, 246, 0.7),
                0 0 120px rgba(0, 255, 255, 0.5),
                inset 0 0 40px rgba(255, 255, 255, 0.3)
            `;
        });
        
        orbCore.addEventListener('mouseleave', () => {
            orbCore.style.boxShadow = '';
        });
    }
}

/**
 * Counter animation for stats
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Service card tilt effect
 */
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/**
 * Testimonial card hover glow position
 */
document.querySelectorAll('.testimonial-card').forEach(card => {
    const glow = card.querySelector('.testimonial-glow');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        glow.style.transform = 'translate(-50%, -50%)';
    });
});

// Console signature
console.log(
    '%c✨ Aurora UI %c Demo by Duncan',
    'background: linear-gradient(90deg, #0080FF, #8B5CF6, #FF1493); color: white; padding: 10px 15px; border-radius: 5px 0 0 5px; font-weight: bold;',
    'background: #0A0F1C; color: #00FFFF; padding: 10px 15px; border-radius: 0 5px 5px 0;'
);
