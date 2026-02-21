/**
 * Cyberpunk UI - NeoGrid Systems
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all modules
    initSystemTime();
    initNavigation();
    initStatsCounter();
    initScrollAnimations();
    initGlitchEffect();
    initContactForm();
});

/**
 * System Time Display
 */
function initSystemTime() {
    const timeElement = document.getElementById('system-time');
    if (!timeElement) return;
    
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

/**
 * Navigation
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(13, 13, 13, 0.98)';
        } else {
            navbar.style.background = 'rgba(13, 13, 13, 0.95)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Mobile toggle (placeholder for mobile menu)
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            // Add mobile menu logic here
            console.log('Mobile menu toggle');
        });
    }
}

/**
 * Stats Counter Animation
 */
function initStatsCounter() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const suffix = element.textContent.includes('%') ? '%' : '';
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * (end - start) + start);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.dataset.target) || 0;
                animateValue(element, 0, target, 2000);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => observer.observe(stat));
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .service-card, .testimonial-card, .contact-method'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
}

/**
 * Glitch Effect Enhancement
 */
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(el => {
        // Add random glitch on hover
        el.addEventListener('mouseenter', () => {
            el.style.animationDuration = '0.5s';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.animationDuration = '2s';
        });
    });
    
    // Random glitch bursts
    setInterval(() => {
        const randomGlitch = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        if (randomGlitch) {
            randomGlitch.classList.add('glitch-active');
            setTimeout(() => {
                randomGlitch.classList.remove('glitch-active');
            }, 200);
        }
    }, 5000);
}

/**
 * Contact Form
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Simulate sending
        submitBtn.innerHTML = '<i data-lucide="loader-2"></i> TRANSMITTING...';
        submitBtn.disabled = true;
        lucide.createIcons();
        
        // Add spinning animation to loader
        const loader = submitBtn.querySelector('svg');
        if (loader) {
            loader.style.animation = 'spin 1s linear infinite';
        }
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i data-lucide="check-circle"></i> TRANSMITTED';
            submitBtn.style.background = 'var(--neon-green)';
            lucide.createIcons();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                lucide.createIcons();
                form.reset();
            }, 2000);
        }, 1500);
    });
    
    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea, select');
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
 * Terminal Typing Effect (bonus)
 */
function initTerminalTyping() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;
    
    const outputs = terminalBody.querySelectorAll('.output');
    outputs.forEach((output, index) => {
        output.style.opacity = '0';
        setTimeout(() => {
            output.style.opacity = '1';
            output.style.transition = 'opacity 0.3s ease';
        }, 500 * (index + 1));
    });
}

// Add spin animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .glitch-active::before,
    .glitch-active::after {
        animation-duration: 0.2s !important;
    }
`;
document.head.appendChild(style);
