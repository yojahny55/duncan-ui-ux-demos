/**
 * HUD / Sci-Fi FUI Demo
 * Advanced futuristic interface interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initNavigation();
    initStatCounters();
    initScrollAnimations();
    initFormHandling();
    initDataReadouts();
    initTypingEffect();
    initParallax();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const nav = document.querySelector('.hud-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            nav.style.background = 'rgba(0, 10, 20, 0.98)';
        } else {
            nav.style.background = 'linear-gradient(180deg, rgba(0, 10, 20, 0.95) 0%, rgba(0, 10, 20, 0.8) 100%)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Active section tracking
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            // Add mobile menu functionality here
            console.log('Mobile menu toggled');
        });
    }
}

/**
 * Animated stat counters
 */
function initStatCounters() {
    const statValues = document.querySelectorAll('.stat-value[data-target]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseFloat(element.dataset.target);
                animateCounter(element, target);
                counterObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    statValues.forEach(stat => counterObserver.observe(stat));
}

function animateCounter(element, target) {
    const duration = 2000;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = target * easeOutQuart;
        
        if (isDecimal) {
            element.textContent = currentValue.toFixed(1);
        } else {
            element.textContent = Math.round(currentValue);
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Scroll reveal animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .about-content, .about-visual, ' +
        '.contact-info, .contact-form-wrapper'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Add initial state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => revealObserver.observe(el));
}

/**
 * Form handling with futuristic feedback
 */
function initFormHandling() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;
        
        // Transmitting state
        submitBtn.innerHTML = `
            <span class="btn-brackets">[</span>
            <span style="animation: blink 0.5s step-end infinite;">TRANSMITTING...</span>
            <span class="btn-brackets">]</span>
        `;
        submitBtn.disabled = true;
        
        // Simulate transmission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success state
        submitBtn.innerHTML = `
            <span class="btn-brackets">[</span>
            <i data-lucide="check"></i>
            <span>TRANSMISSION COMPLETE</span>
            <span class="btn-brackets">]</span>
        `;
        submitBtn.style.color = '#00FF41';
        submitBtn.style.borderColor = '#00FF41';
        
        // Reinitialize icons
        lucide.createIcons();
        
        // Reset form
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalContent;
            submitBtn.style.color = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled = false;
            lucide.createIcons();
        }, 3000);
    });
    
    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.closest('.input-wrapper').style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.3)';
        });
        
        input.addEventListener('blur', () => {
            input.closest('.input-wrapper').style.boxShadow = '';
        });
    });
}

/**
 * Animated data readouts
 */
function initDataReadouts() {
    const readouts = document.querySelectorAll('.readout-fill');
    
    // Random fluctuation for CPU/Memory readings
    setInterval(() => {
        readouts.forEach(readout => {
            const currentFill = parseFloat(readout.style.getPropertyValue('--fill'));
            const variation = (Math.random() - 0.5) * 4; // ±2%
            let newFill = currentFill + variation;
            
            // Keep within bounds
            newFill = Math.max(20, Math.min(99, newFill));
            
            readout.style.setProperty('--fill', `${newFill}%`);
            
            // Update displayed value
            const valueEl = readout.closest('.readout').querySelector('.readout-value');
            if (valueEl) {
                valueEl.textContent = `${Math.round(newFill)}%`;
            }
        });
    }, 2000);
}

/**
 * Terminal typing effect
 */
function initTypingEffect() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    // Observe terminal for viewport entry
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add subtle glow effect to terminal on viewport entry
                const terminal = entry.target.closest('.terminal-window');
                if (terminal) {
                    terminal.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.1)';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    terminalLines.forEach(line => observer.observe(line));
}

/**
 * Subtle parallax effects
 */
function initParallax() {
    const radar = document.querySelector('.hero-radar');
    const hologram = document.querySelector('.hologram');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        if (radar) {
            radar.style.transform = `translateY(-50%) translate(${x}px, ${y}px)`;
        }
        
        if (hologram) {
            hologram.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
        }
    });
}

/**
 * Add glitch effect to elements
 */
function addGlitchEffect(element) {
    const glitchDuration = 150;
    
    element.style.animation = `glitch ${glitchDuration}ms steps(2) infinite`;
    
    setTimeout(() => {
        element.style.animation = '';
    }, glitchDuration * 3);
}

// Add glitch keyframes
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0%, 100% {
            text-shadow: 
                -2px 0 #ff0000,
                2px 0 #00ffff;
            transform: translate(0);
        }
        25% {
            text-shadow: 
                2px 0 #ff0000,
                -2px 0 #00ffff;
            transform: translate(-2px, 1px);
        }
        50% {
            text-shadow: 
                -1px 0 #ff0000,
                1px 0 #00ffff;
            transform: translate(2px, -1px);
        }
        75% {
            text-shadow: 
                1px 0 #ff0000,
                -1px 0 #00ffff;
            transform: translate(-1px, 2px);
        }
    }
`;
document.head.appendChild(glitchStyle);

/**
 * Random glitch trigger on title
 */
setInterval(() => {
    const title = document.querySelector('.title-main');
    if (title && Math.random() > 0.7) {
        addGlitchEffect(title);
    }
}, 5000);

/**
 * Radar blip random movement
 */
function animateBlips() {
    const blips = document.querySelectorAll('.blip');
    
    blips.forEach(blip => {
        // Random position within radar
        const newX = 20 + Math.random() * 60;
        const newY = 20 + Math.random() * 60;
        
        blip.style.setProperty('--x', `${newX}%`);
        blip.style.setProperty('--y', `${newY}%`);
    });
}

// Animate blips every 4 seconds
setInterval(animateBlips, 4000);

/**
 * Time display (optional - for footer or status)
 */
function updateSystemTime() {
    const timeElements = document.querySelectorAll('.transmission-time');
    
    const now = new Date();
    const utcString = now.toUTCString().split(' ')[4] + ' UTC';
    
    // Could update specific elements with current time
}

// Update time every second
setInterval(updateSystemTime, 1000);
