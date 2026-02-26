/**
 * Swiss Modernism 2.0 - UI/UX Demo
 * 
 * JavaScript following Swiss design principles:
 * - Functional, purposeful code
 * - Clean, systematic structure
 * - No unnecessary ornamentation
 */

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initFormHandling();
    initNavbarScroll();
});

/**
 * Navigation - Mobile menu toggle
 */
function initNavigation() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            const isExpanded = navLinks.classList.toggle('active');
            mobileMenu.setAttribute('aria-expanded', isExpanded);
            
            // Update icon
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', isExpanded ? 'x' : 'menu');
                lucide.createIcons();
            }
        });
    }
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
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll-triggered animations
 * Systematic reveal following grid order
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
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.service-card, .work-item, .testimonial, .about-column, .v-block'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
        observer.observe(el);
    });
    
    // Add CSS for visible state
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Navbar scroll behavior
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 0) {
            navbar.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Form handling
 * Clean, functional validation
 */
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#FF3B30';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<span>Sending...</span>';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Sent Successfully</span><i data-lucide="check"></i>';
                    submitBtn.style.background = '#22C55E';
                    lucide.createIcons();
                    
                    // Reset form
                    setTimeout(() => {
                        form.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        lucide.createIcons();
                    }, 2000);
                }, 1000);
                
                console.log('Form data:', data);
            }
        });
        
        // Clear error state on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = '';
            });
        });
    }
}

/**
 * Stats counter animation
 */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPercentage = finalValue.includes('%');
                const numValue = parseInt(finalValue);
                
                let current = 0;
                const increment = numValue / 30;
                const duration = 1000;
                const stepTime = duration / 30;
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= numValue) {
                        target.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(current) + (isPercentage ? '%' : '');
                    }
                }, stepTime);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Initialize stats counter after DOM load
document.addEventListener('DOMContentLoaded', initStatsCounter);

/**
 * Grid block hover effect
 */
document.addEventListener('DOMContentLoaded', () => {
    const gridBlocks = document.querySelectorAll('.grid-block');
    
    gridBlocks.forEach(block => {
        block.addEventListener('mouseenter', () => {
            block.style.transform = 'scale(1.02)';
            block.style.transition = 'transform 0.2s ease';
        });
        
        block.addEventListener('mouseleave', () => {
            block.style.transform = 'scale(1)';
        });
    });
});

/**
 * Mobile navigation styles injection
 */
document.addEventListener('DOMContentLoaded', () => {
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #FFFFFF;
                padding: 24px 32px;
                border-bottom: 1px solid #000000;
                gap: 16px;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
});
