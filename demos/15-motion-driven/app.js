/**
 * Motion-Driven UI Demo
 * Keywords: Animation-heavy, scroll effects, parallax, 
 * microinteractions, smooth transitions, GPU-accelerated
 * 
 * Features:
 * - Intersection Observer for scroll-triggered animations
 * - Parallax background effects
 * - Count-up animations
 * - Smooth page transitions
 * - Magnetic button effects
 * - GPU-accelerated transforms
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all motion features
    initNavbarScroll();
    initScrollAnimations();
    initParallax();
    initCountUp();
    initMagneticEffect();
    initFormInteractions();
    initSmoothScroll();
});

/**
 * Navbar scroll behavior - sticky with backdrop blur
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;
    let ticking = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        // Add/remove scrolled class based on scroll position
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Optional: Hide navbar on scroll down, show on scroll up
        // Uncomment if desired:
        // if (scrollY > lastScrollY && scrollY > 200) {
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     navbar.style.transform = 'translateY(0)';
        // }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Intersection Observer for scroll-triggered animations
 * GPU-accelerated with transform and will-change
 */
function initScrollAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // If reduced motion is preferred, make all elements visible immediately
        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }
    
    // Create observer with stagger support
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before element enters viewport
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animation
                entry.target.classList.add('visible');
                
                // Add will-change before animation starts
                entry.target.style.willChange = 'transform, opacity';
                
                // Remove will-change after animation completes
                setTimeout(() => {
                    entry.target.style.willChange = 'auto';
                }, 700); // Slightly longer than animation duration
                
                // Optionally unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Parallax effect for hero background layers
 * Uses transform: translate3d for GPU acceleration
 */
function initParallax() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    const layers = document.querySelectorAll('.parallax-layer');
    if (layers.length === 0) return;
    
    // Parallax speeds for each layer (faster = more movement)
    const speeds = [0.1, 0.15, 0.2, 0.05, 0];
    
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 800;
        
        // Only apply parallax while in hero section
        if (scrollY < heroHeight) {
            layers.forEach((layer, index) => {
                const speed = speeds[index] || 0;
                const yPos = scrollY * speed;
                
                // GPU-accelerated transform
                layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Count-up animation for statistics
 * Triggered by Intersection Observer
 */
function initCountUp() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const countElements = document.querySelectorAll('.count-up');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const numberEl = element.querySelector('.stat-number');
                const target = parseInt(element.dataset.target);
                
                if (prefersReducedMotion) {
                    // Skip animation if reduced motion is preferred
                    numberEl.textContent = target;
                } else {
                    animateValue(numberEl, 0, target, 2000);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    countElements.forEach(el => observer.observe(el));
}

/**
 * Animate number from start to end
 * Uses easeOutQuart for natural deceleration
 */
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    // Easing function - easeOutQuart
    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const currentValue = Math.round(start + (end - start) * easedProgress);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Magnetic effect for buttons and interactive elements
 * Creates subtle follow effect on mouse movement
 */
function initMagneticEffect() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * 0.15;
            const deltaY = (e.clientY - centerY) * 0.15;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Form interactions with visual feedback
 */
function initFormInteractions() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const submitBtn = form.querySelector('.btn-submit');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success (you could add a toast notification here)
        submitBtn.innerHTML = `
            <span>Message Sent!</span>
            <i data-lucide="check"></i>
        `;
        lucide.createIcons();
        submitBtn.style.background = 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)';
        
        // Reset after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = `
                <span>Send Message</span>
                <i data-lucide="send"></i>
                <div class="btn-loader">
                    <i data-lucide="loader-2"></i>
                </div>
            `;
            submitBtn.style.background = '';
            lucide.createIcons();
            form.reset();
        }, 3000);
    });
    
    // Add floating label effect
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Optional: Page visibility handling for animations
 * Pauses animations when page is not visible to save resources
 */
document.addEventListener('visibilitychange', () => {
    const orbitElement = document.querySelector('.showcase-orbit');
    const floatingCards = document.querySelectorAll('.showcase-card');
    
    if (document.hidden) {
        // Pause animations
        if (orbitElement) orbitElement.style.animationPlayState = 'paused';
        floatingCards.forEach(card => card.style.animationPlayState = 'paused');
    } else {
        // Resume animations
        if (orbitElement) orbitElement.style.animationPlayState = 'running';
        floatingCards.forEach(card => card.style.animationPlayState = 'running');
    }
});

/**
 * Optional: Scroll progress indicator
 * Uncomment to add a progress bar at the top of the page
 */
/*
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 9999;
        transform-origin: left;
        transform: scaleX(0);
        transition: transform 0.1s linear;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        progressBar.style.transform = `scaleX(${scrollPercent})`;
    }, { passive: true });
}
*/

/**
 * Console welcome message
 */
console.log(
    '%c⚡ Motion-Driven UI Demo',
    'color: #6366F1; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cBuilt with scroll-triggered animations, parallax, and GPU-accelerated transforms.',
    'color: #888; font-size: 12px;'
);
