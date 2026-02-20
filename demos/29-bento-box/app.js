/**
 * Bento Box Grid - UI/UX Demo
 * JavaScript functionality for the bento grid landing page
 */

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initNewsletterForm();
    initSmoothScroll();
    initParallaxEffects();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Navbar background on scroll
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll direction
        if (window.scrollY > lastScrollY && window.scrollY > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
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
                entry.target.classList.add('in-view');
                
                // Animate chart bars when stats card comes into view
                if (entry.target.classList.contains('stats-card')) {
                    animateChartBars(entry.target);
                }
                
                // Animate stat numbers
                if (entry.target.classList.contains('about-story')) {
                    animateNumbers(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all bento cards
    document.querySelectorAll('.bento-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe section headers
    document.querySelectorAll('.section-header').forEach(header => {
        observer.observe(header);
    });
}

/**
 * Animate chart bars
 */
function animateChartBars(container) {
    const bars = container.querySelectorAll('.chart-bar');
    bars.forEach((bar, index) => {
        bar.style.animationDelay = `${index * 0.1}s`;
    });
}

/**
 * Animate number counters
 */
function animateNumbers(container) {
    const numbers = container.querySelectorAll('.about-stat .number');
    
    numbers.forEach(numEl => {
        const text = numEl.textContent;
        const num = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        
        if (isNaN(num)) return;
        
        let current = 0;
        const increment = num / 40;
        const duration = 1000;
        const stepTime = duration / 40;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= num) {
                numEl.textContent = num + suffix;
                clearInterval(counter);
            } else {
                numEl.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    });
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success state
            submitBtn.innerHTML = '<i data-lucide="check"></i><span>Sent!</span>';
            submitBtn.classList.add('success');
            lucide.createIcons();
            
            // Reset form
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('success');
                lucide.createIcons();
            }, 3000);
        });
        
        // Add focus animations to form inputs
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }
}

/**
 * Newsletter Form Handling
 */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const input = form.querySelector('input');
            const button = form.querySelector('button');
            
            if (!input.value.trim()) return;
            
            // Show loading
            button.innerHTML = '<span class="spinner"></span>';
            button.disabled = true;
            
            // Simulate submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success
            button.innerHTML = '<i data-lucide="check"></i>';
            input.value = '';
            lucide.createIcons();
            
            // Reset after delay
            setTimeout(() => {
                button.innerHTML = '<i data-lucide="arrow-right"></i>';
                button.disabled = false;
                lucide.createIcons();
            }, 2000);
        });
    }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
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
            }
        });
    });
}

/**
 * Parallax Effects for Floating Shapes
 */
function initParallaxEffects() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

/**
 * Add CSS for additional states
 */
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .navbar {
        transition: all var(--transition-base);
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        box-shadow: var(--shadow-md);
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        background: var(--color-bg-card);
        padding: var(--spacing-lg);
        box-shadow: var(--shadow-lg);
        border-radius: 0 0 var(--bento-radius) var(--bento-radius);
    }
    
    .bento-card.in-view {
        opacity: 1;
    }
    
    .section-header {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .section-header.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    .form-group.focused label {
        color: var(--color-primary);
    }
    
    .btn.success {
        background: var(--color-success) !important;
        color: white !important;
    }
    
    .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    .nav-toggle.active svg {
        transform: rotate(90deg);
    }
    
    .nav-toggle svg {
        transition: transform var(--transition-fast);
    }
`;
document.head.appendChild(additionalStyles);

// Log demo info
console.log(`
%c🍱 Bento Box Grid Demo
%c
A modern, asymmetric grid-based layout inspired by Japanese bento boxes.
Key features:
- Asymmetric grid layouts with varying cell sizes
- Clean, Apple-inspired aesthetic
- Smooth animations and transitions
- Responsive design with fluid grid
- Lucide icons for professional look

Part of the UI/UX Demo Collection by Duncan
`, 
'font-size: 20px; font-weight: bold; color: #667eea;',
'font-size: 12px; color: #6e6e73;'
);
