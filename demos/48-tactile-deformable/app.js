/**
 * Tactile Digital / Deformable UI Demo
 * Features: Jelly buttons, spring physics, squishy interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize all interactive components
    initSpringPhysics();
    initDemoPhone();
    initFormInteractions();
    initSmoothScroll();
    initParallaxBlobs();
    initNavbar();
});

/**
 * Spring Physics - Add bounce effects to interactive elements
 */
function initSpringPhysics() {
    // Add haptic-like feedback on button clicks
    const allButtons = document.querySelectorAll('.jelly-btn, .chrome-btn, .demo-jelly, .material-demo, .squishy-card');
    
    allButtons.forEach(btn => {
        btn.addEventListener('mousedown', (e) => {
            // Create ripple effect
            createSquishRipple(e, btn);
        });
        
        btn.addEventListener('mouseup', () => {
            // Add bounce-back animation
            btn.style.animation = 'none';
            btn.offsetHeight; // Trigger reflow
            btn.style.animation = 'bounceBack 400ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.animation = '';
        });
    });
    
    // Add squish keyframe dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceBack {
            0% { transform: scale(0.95); }
            40% { transform: scale(1.05); }
            60% { transform: scale(0.98); }
            80% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        
        @keyframes squishRipple {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 0.6;
            }
            100% { 
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Create squish ripple effect on button press
 */
function createSquishRipple(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        left: ${e.clientX - rect.left}px;
        top: ${e.clientY - rect.top}px;
        transform: translate(-50%, -50%) scale(0);
        animation: squishRipple 600ms ease-out forwards;
        pointer-events: none;
    `;
    
    // Ensure element has relative positioning
    const computedStyle = getComputedStyle(element);
    if (computedStyle.position === 'static') {
        element.style.position = 'relative';
    }
    element.style.overflow = 'hidden';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Demo Phone Interactions
 */
function initDemoPhone() {
    // Demo jelly buttons
    const demoButtons = document.querySelectorAll('.demo-jelly');
    demoButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Add extra squish effect
            btn.style.transform = 'translateY(3px) scale(0.92)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 100);
        });
    });
    
    // Slider thumb interaction
    const sliderThumb = document.querySelector('.slider-thumb');
    const sliderTrack = document.querySelector('.slider-track');
    const sliderFill = document.querySelector('.slider-fill');
    
    if (sliderThumb && sliderTrack && sliderFill) {
        let isDragging = false;
        
        sliderThumb.addEventListener('mousedown', () => {
            isDragging = true;
            sliderThumb.style.transform = 'translate(-50%, -50%) scale(1.2)';
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                sliderThumb.style.transform = 'translate(-50%, -50%) scale(1)';
                // Add bounce
                sliderThumb.style.animation = 'bounceBack 300ms cubic-bezier(0.34, 1.56, 0.64, 1)';
                setTimeout(() => {
                    sliderThumb.style.animation = '';
                }, 300);
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const rect = sliderTrack.getBoundingClientRect();
                let percentage = ((e.clientX - rect.left) / rect.width) * 100;
                percentage = Math.max(0, Math.min(100, percentage));
                
                sliderThumb.style.left = `${percentage}%`;
                sliderFill.style.width = `${percentage}%`;
            }
        });
        
        // Touch support
        sliderThumb.addEventListener('touchstart', (e) => {
            isDragging = true;
            sliderThumb.style.transform = 'translate(-50%, -50%) scale(1.2)';
            e.preventDefault();
        });
        
        document.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                sliderThumb.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
        
        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const touch = e.touches[0];
                const rect = sliderTrack.getBoundingClientRect();
                let percentage = ((touch.clientX - rect.left) / rect.width) * 100;
                percentage = Math.max(0, Math.min(100, percentage));
                
                sliderThumb.style.left = `${percentage}%`;
                sliderFill.style.width = `${percentage}%`;
            }
        });
    }
    
    // Toggle interaction
    const toggleBg = document.querySelector('.toggle-bg');
    const toggleKnob = document.querySelector('.toggle-knob');
    
    if (toggleBg && toggleKnob) {
        let isOn = true;
        
        toggleBg.addEventListener('click', () => {
            isOn = !isOn;
            
            // Squish effect on click
            toggleKnob.style.transform = 'scaleX(1.3)';
            
            setTimeout(() => {
                toggleKnob.style.transform = '';
                if (isOn) {
                    toggleKnob.style.marginLeft = 'auto';
                    toggleKnob.style.marginRight = '0';
                    toggleBg.style.background = 'linear-gradient(145deg, var(--jelly-pink), var(--jelly-pink-dark))';
                } else {
                    toggleKnob.style.marginLeft = '0';
                    toggleKnob.style.marginRight = 'auto';
                    toggleBg.style.background = 'linear-gradient(145deg, #D4D4D4, #A0A0A0)';
                }
            }, 100);
        });
    }
}

/**
 * Form Input Interactions - Squishy inputs
 */
function initFormInteractions() {
    const inputs = document.querySelectorAll('.squishy-input');
    
    inputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
        
        // Add typing feedback
        input.addEventListener('input', () => {
            input.style.transform = 'translateY(-2px) scale(1.01)';
            setTimeout(() => {
                input.style.transform = 'translateY(-2px)';
            }, 50);
        });
    });
    
    // Form submission with bounce effect
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i data-lucide="check"></i><span>Sent!</span>';
            submitBtn.style.background = 'linear-gradient(145deg, var(--mint), var(--mint-dark))';
            
            // Reinitialize icons
            lucide.createIcons();
            
            // Bounce effect
            submitBtn.style.animation = 'bounceBack 500ms cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            // Reset after delay
            setTimeout(() => {
                submitBtn.innerHTML = '<i data-lucide="send"></i><span>Send Message</span>';
                submitBtn.style.background = '';
                submitBtn.style.animation = '';
                lucide.createIcons();
                form.reset();
            }, 2000);
        });
    }
}

/**
 * Smooth Scroll with spring-like easing
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Add squish to clicked link
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Smooth scroll with custom easing
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - 100;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax Blobs - Subtle movement on scroll
 */
function initParallaxBlobs() {
    const blobs = document.querySelectorAll('.blob');
    
    if (blobs.length === 0) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                blobs.forEach((blob, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const yPos = scrollY * speed;
                    blob.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

/**
 * Navbar - Scroll effects
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(45, 42, 62, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Add squish effect
            mobileMenuBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                mobileMenuBtn.style.transform = '';
            }, 150);
            
            navMenu.classList.toggle('active');
        });
    }
}

/**
 * Intersection Observer for scroll animations
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add stagger effect for grid children
            const children = entry.target.querySelectorAll('.bounce-card, .clay-card, .squishy-card');
            children.forEach((child, index) => {
                child.style.animationDelay = `${index * 100}ms`;
            });
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .about-card,
    .service-card,
    .testimonial-card,
    .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    .animate-in .about-card,
    .animate-in .service-card,
    .animate-in .testimonial-card,
    .animate-in .contact-item {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate-in .about-card:nth-child(1) { transition-delay: 0ms; }
    .animate-in .about-card:nth-child(2) { transition-delay: 100ms; }
    .animate-in .about-card:nth-child(3) { transition-delay: 200ms; }
    
    .animate-in .service-card:nth-child(1) { transition-delay: 0ms; }
    .animate-in .service-card:nth-child(2) { transition-delay: 100ms; }
    .animate-in .service-card:nth-child(3) { transition-delay: 200ms; }
    .animate-in .service-card:nth-child(4) { transition-delay: 300ms; }
    
    .animate-in .testimonial-card:nth-child(1) { transition-delay: 0ms; }
    .animate-in .testimonial-card:nth-child(2) { transition-delay: 100ms; }
    .animate-in .testimonial-card:nth-child(3) { transition-delay: 200ms; }
    
    .animate-in .contact-item:nth-child(1) { transition-delay: 0ms; }
    .animate-in .contact-item:nth-child(2) { transition-delay: 100ms; }
    .animate-in .contact-item:nth-child(3) { transition-delay: 200ms; }
    
    .material-demo:hover::after {
        content: 'Press me!';
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: var(--text-secondary);
        white-space: nowrap;
    }
    
    .showcase-item {
        position: relative;
    }
`;
document.head.appendChild(animationStyles);

/**
 * Easter egg: Konami code for extra bounce
 */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            activateMaxBounce();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateMaxBounce() {
    const style = document.createElement('style');
    style.textContent = `
        .jelly-btn:hover,
        .chrome-btn:hover,
        .bounce-card:hover {
            animation: maxBounce 500ms cubic-bezier(0.34, 1.56, 0.64, 1) infinite !important;
        }
        
        @keyframes maxBounce {
            0%, 100% { transform: translateY(-8px) scale(1.05); }
            50% { transform: translateY(-16px) scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    // Show notification
    const notification = document.createElement('div');
    notification.textContent = '🎉 MAX BOUNCE ACTIVATED!';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(145deg, var(--jelly-pink), var(--jelly-pink-dark));
        color: white;
        padding: 16px 32px;
        border-radius: 16px;
        font-weight: 700;
        box-shadow: 0 6px 0 #C96A9E, 0 10px 30px rgba(255, 158, 205, 0.5);
        z-index: 9999;
        animation: bounceIn 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
    `;
    
    const bounceInStyle = document.createElement('style');
    bounceInStyle.textContent = `
        @keyframes bounceIn {
            0% { transform: translateX(-50%) scale(0); }
            50% { transform: translateX(-50%) scale(1.1); }
            100% { transform: translateX(-50%) scale(1); }
        }
    `;
    document.head.appendChild(bounceInStyle);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
