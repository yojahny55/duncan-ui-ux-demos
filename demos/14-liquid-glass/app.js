/**
 * LIQUID GLASS - UI/UX Demo
 * Style #14: Morphing, Iridescent, Fluid Effects
 * 
 * Features:
 * - SVG path morphing animation
 * - Smooth scroll navigation
 * - Navbar scroll effects
 * - Intersection Observer animations
 * - Chromatic aberration hover effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all modules
    initNavbar();
    initSmoothScroll();
    initMorphingAnimation();
    initScrollAnimations();
    initFormHandling();
    initHoverEffects();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
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
 * SVG Morphing Animation
 * Creates fluid blob shapes that continuously morph
 */
function initMorphingAnimation() {
    const morphPath = document.querySelector('.morph-path');
    if (!morphPath) return;
    
    // Define morph shapes (blob-like paths)
    const shapes = [
        'M100,30 C140,30 170,60 170,100 C170,140 140,170 100,170 C60,170 30,140 30,100 C30,60 60,30 100,30',
        'M100,25 C150,25 175,50 175,100 C175,150 150,175 100,175 C50,175 25,150 25,100 C25,50 50,25 100,25',
        'M100,35 C130,25 175,55 175,100 C175,145 130,175 100,175 C70,175 25,145 25,100 C25,55 70,25 100,35',
        'M100,20 C145,30 180,60 170,105 C160,150 125,180 80,170 C35,160 20,125 30,80 C40,35 55,10 100,20',
        'M100,30 C135,20 165,50 175,95 C185,140 155,175 110,175 C65,175 35,150 25,105 C15,60 65,40 100,30'
    ];
    
    let currentIndex = 0;
    
    // Set initial path
    morphPath.setAttribute('d', shapes[currentIndex]);
    
    // Animate morphing
    const morphDuration = 4000; // 4 seconds per morph
    
    function animateMorph() {
        const nextIndex = (currentIndex + 1) % shapes.length;
        
        // Use CSS transition for smooth morphing
        morphPath.style.transition = `d ${morphDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        morphPath.setAttribute('d', shapes[nextIndex]);
        
        currentIndex = nextIndex;
        
        setTimeout(animateMorph, morphDuration);
    }
    
    // Start animation
    setTimeout(animateMorph, 1000);
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
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.about-card, .service-card, .testimonial-card, .stat'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 600ms ${index * 100}ms cubic-bezier(0.4, 0, 0.2, 1), 
                               transform 600ms ${index * 100}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        observer.observe(el);
    });
}

/**
 * Form handling with liquid feedback
 */
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button[type="submit"]');
        const originalContent = button.innerHTML;
        
        // Loading state
        button.innerHTML = `
            <span class="loading-spinner"></span>
            Sending...
        `;
        button.disabled = true;
        button.style.opacity = '0.7';
        
        // Simulate send (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success state
        button.innerHTML = `
            <i data-lucide="check-circle"></i>
            Message Sent!
        `;
        button.style.background = 'linear-gradient(135deg, #4cffc4, #6b9dff)';
        lucide.createIcons();
        
        // Reset form
        form.reset();
        
        // Restore button after delay
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.disabled = false;
            button.style.opacity = '1';
            button.style.background = '';
            lucide.createIcons();
        }, 3000);
    });
    
    // Input focus effects
    const inputs = form.querySelectorAll('.glass-input');
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
 * Hover effects with chromatic aberration
 */
function initHoverEffects() {
    // Glass cards liquid hover effect
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Subtle tilt effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-4px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.glass-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: ripple-effect 600ms ease-out forwards;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple keyframes if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple-effect {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
            
            .loading-spinner {
                width: 18px;
                height: 18px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top-color: #fff;
                border-radius: 50%;
                animation: spin 800ms linear infinite;
                display: inline-block;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Stats counter animation
 */
function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const value = parseInt(text.replace(/[^0-9]/g, ''));
    
    if (isNaN(value)) return;
    
    let current = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
            current = value;
            clearInterval(timer);
        }
        
        let display = Math.floor(current);
        if (display >= 1000) {
            display = (display / 1000).toFixed(0) + 'K';
        }
        
        element.textContent = display + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
    }, 16);
}

// Initialize stats animation
document.addEventListener('DOMContentLoaded', initStatsAnimation);

/**
 * Mobile menu toggle
 */
document.querySelector('.mobile-menu')?.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});
