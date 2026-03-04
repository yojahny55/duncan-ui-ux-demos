/**
 * Chromatic Aberration / RGB Split Style
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initNavigation();
    initSmoothScroll();
    initGlitchEffects();
    initVHSTimestamp();
    initFormHandler();
    initScrollAnimations();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('svg');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('svg');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
}

/**
 * Smooth Scroll for Navigation Links
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
 * Random Glitch Effects
 */
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('[data-glitch]');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            triggerGlitch(element);
        });
    });
    
    // Random glitch on page elements
    setInterval(() => {
        const randomGlitch = Math.random();
        if (randomGlitch > 0.95) {
            const glitchTargets = document.querySelectorAll('.glitch-text, .rgb-text');
            const randomTarget = glitchTargets[Math.floor(Math.random() * glitchTargets.length)];
            if (randomTarget) {
                triggerIntenseGlitch(randomTarget);
            }
        }
    }, 3000);
}

function triggerGlitch(element) {
    element.style.transform = `translate(${randomRange(-2, 2)}px, ${randomRange(-2, 2)}px)`;
    element.style.filter = `hue-rotate(${randomRange(-30, 30)}deg)`;
    
    setTimeout(() => {
        element.style.transform = '';
        element.style.filter = '';
    }, 150);
}

function triggerIntenseGlitch(element) {
    const originalTransform = element.style.transform;
    
    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
        element.style.transform = `skew(${randomRange(-5, 5)}deg) translate(${randomRange(-3, 3)}px, ${randomRange(-3, 3)}px)`;
        element.style.textShadow = `
            ${randomRange(-5, 5)}px 0 #FF0000,
            ${randomRange(-5, 5)}px 0 #00FFFF
        `;
        
        glitchCount++;
        if (glitchCount > 5) {
            clearInterval(glitchInterval);
            element.style.transform = originalTransform;
            element.style.textShadow = '';
        }
    }, 50);
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * VHS Timestamp Counter
 */
function initVHSTimestamp() {
    const timestamp = document.querySelector('.timestamp');
    if (!timestamp) return;
    
    let frames = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    
    setInterval(() => {
        frames++;
        if (frames >= 30) {
            frames = 0;
            seconds++;
        }
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
        
        timestamp.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
    }, 33); // ~30fps
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

/**
 * Contact Form Handler
 */
function initFormHandler() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Glitch effect on submit
        submitBtn.innerHTML = '<span>TRANSMITTING...</span>';
        submitBtn.disabled = true;
        submitBtn.style.animation = 'glitch-flicker 0.1s infinite';
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i data-lucide="check"></i><span>SIGNAL SENT</span>';
            submitBtn.style.background = '#00FF00';
            submitBtn.style.animation = '';
            lucide.createIcons();
            
            // Reset form
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                lucide.createIcons();
            }, 2000);
        }, 1500);
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
                entry.target.classList.add('animate-in');
                
                // Add RGB split effect on entry
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('testimonial-card')) {
                    addEntryGlitch(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .contact-item, .stat-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function addEntryGlitch(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    
    // Quick RGB split effect
    element.style.boxShadow = '-3px 0 0 #FF0000, 3px 0 0 #00FFFF';
    
    setTimeout(() => {
        element.style.boxShadow = '';
    }, 200);
}

/**
 * Navbar scroll effect
 */
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

/**
 * Add RGB cursor trail effect (desktop only)
 */
if (window.matchMedia('(hover: hover)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'rgb-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #00FFFF;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        mix-blend-mode: screen;
        transition: transform 0.1s ease;
        box-shadow: -2px 0 0 #FF0000, 2px 0 0 #0000FF;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
        cursor.style.borderColor = '#FF00FF';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#00FFFF';
    });
}
