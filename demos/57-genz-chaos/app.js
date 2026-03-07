/**
 * Gen Z Chaos / Maximalism - Interactive Features
 * Clashing colors, stickers, collage vibes, internet culture
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all features
    initSmoothScroll();
    initCounterAnimation();
    initScrollReveal();
    initRandomStickers();
    initChaosHover();
    initFormChaos();
    initNavbarScroll();
    initParallaxStickers();
    initGlitchOnScroll();
});

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Add some chaos to the scroll
                const chaos = Math.random() * 50 - 25;
                const targetPosition = target.offsetTop + chaos;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Animated counter for stats
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            // Add chaos jitter at the end
            element.style.animation = 'jitter 0.2s ease-in-out 3';
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

/**
 * Scroll reveal animations with chaos
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.about-card, .service-tile, .testimonial-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Random delay for chaotic reveal
                const delay = Math.random() * 200;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    entry.target.style.transform = `rotate(${(Math.random() - 0.5) * 4}deg)`;
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Set initial hidden state
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) rotate(-5deg)';
        el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });
    
    // Add revealed class styles
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Generate random floating stickers dynamically
 */
function initRandomStickers() {
    const stickerContainer = document.body;
    const stickerIcons = ['star', 'heart', 'zap', 'flame', 'sparkles', 'music', 'smile', 'sun', 'moon', 'cloud'];
    const colors = ['#FF00FF', '#00FF00', '#FFFF00', '#0000FF', '#00FFFF', '#FF6600'];
    
    // Add additional random stickers on scroll
    let lastScrollTop = 0;
    let stickerCount = 0;
    const maxStickers = 15;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        // Add sticker every 300px of scroll
        if (Math.abs(scrollTop - lastScrollTop) > 300 && stickerCount < maxStickers) {
            createRandomSticker();
            lastScrollTop = scrollTop;
            stickerCount++;
        }
    });
    
    function createRandomSticker() {
        const sticker = document.createElement('div');
        sticker.className = 'random-sticker';
        sticker.innerHTML = `<i data-lucide="${stickerIcons[Math.floor(Math.random() * stickerIcons.length)]}"></i>`;
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 90 + 5;
        const top = Math.random() * document.documentElement.scrollHeight;
        
        sticker.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: ${top}px;
            color: ${color};
            font-size: 2rem;
            z-index: 50;
            pointer-events: none;
            animation: float ${3 + Math.random() * 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            filter: drop-shadow(0 0 15px ${color});
            opacity: 0.7;
        `;
        
        stickerContainer.appendChild(sticker);
        lucide.createIcons({ nodes: [sticker] });
        
        // Remove after some time
        setTimeout(() => {
            sticker.style.opacity = '0';
            sticker.style.transition = 'opacity 1s';
            setTimeout(() => sticker.remove(), 1000);
        }, 10000);
    }
}

/**
 * Chaos hover effects
 */
function initChaosHover() {
    const chaosElements = document.querySelectorAll('.chaos-btn, .nav-cta, .about-card, .service-tile');
    
    chaosElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Random color shift
            const hue = Math.random() * 360;
            el.style.filter = `hue-rotate(${hue}deg)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.filter = 'none';
        });
        
        // Add click chaos
        el.addEventListener('click', (e) => {
            createClickBurst(e.clientX, e.clientY);
        });
    });
}

function createClickBurst(x, y) {
    const burst = document.createElement('div');
    burst.className = 'click-burst';
    burst.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        pointer-events: none;
        z-index: 9999;
    `;
    
    // Create particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const colors = ['#FF00FF', '#00FF00', '#FFFF00', '#00FFFF'];
        
        particle.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            animation: particle-burst 0.5s ease-out forwards;
            --angle: ${angle}rad;
        `;
        burst.appendChild(particle);
    }
    
    document.body.appendChild(burst);
    
    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-burst {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(
                    calc(-50% + cos(var(--angle)) * 50px),
                    calc(-50% + sin(var(--angle)) * 50px)
                ) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        burst.remove();
    }, 500);
}

/**
 * Form chaos effects
 */
function initFormChaos() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            // Random border color
            const colors = ['#FF00FF', '#00FF00', '#FFFF00', '#00FFFF'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            input.style.borderColor = color;
            input.style.boxShadow = `4px 4px 0 ${color}`;
        });
        
        input.addEventListener('blur', () => {
            input.style.borderColor = '#FFFFFF';
            input.style.boxShadow = 'none';
        });
        
        // Typing chaos
        input.addEventListener('input', () => {
            const rotation = (Math.random() - 0.5) * 2;
            input.style.transform = `rotate(${rotation}deg)`;
            setTimeout(() => {
                input.style.transform = 'rotate(0deg)';
            }, 100);
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.textContent = 'SENT!!! ✨';
        submitBtn.style.background = '#FF00FF';
        
        // Create celebration
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createClickBurst(x, y);
            }, i * 50);
        }
        
        setTimeout(() => {
            submitBtn.innerHTML = '<span>SEND IT</span><i data-lucide="send"></i>';
            submitBtn.style.background = '';
            lucide.createIcons({ nodes: [submitBtn] });
            form.reset();
        }, 3000);
    });
}

/**
 * Navbar scroll effects
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        }
        
        // Hide on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    navbar.style.transition = 'transform 0.3s ease, background 0.3s ease';
}

/**
 * Parallax effect for stickers
 */
function initParallaxStickers() {
    const stickers = document.querySelectorAll('.sticker');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        stickers.forEach((sticker, index) => {
            const speed = 0.1 + (index * 0.05);
            const rotation = Math.sin(scrollY * 0.01 + index) * 10;
            sticker.style.transform = `translateY(${scrollY * speed}px) rotate(${rotation}deg)`;
        });
    });
}

/**
 * Glitch effect on scroll
 */
function initGlitchOnScroll() {
    const glitchElements = document.querySelectorAll('.glitch-text, .hero-title');
    
    let glitchTimeout;
    
    window.addEventListener('scroll', () => {
        clearTimeout(glitchTimeout);
        
        glitchElements.forEach(el => {
            el.style.textShadow = `
                ${(Math.random() - 0.5) * 10}px ${(Math.random() - 0.5) * 10}px 0 #FF00FF,
                ${(Math.random() - 0.5) * 10}px ${(Math.random() - 0.5) * 10}px 0 #00FFFF
            `;
        });
        
        glitchTimeout = setTimeout(() => {
            glitchElements.forEach(el => {
                el.style.textShadow = '';
            });
        }, 100);
    });
}

/**
 * Add cursor trail effect
 */
(function initCursorTrail() {
    const trail = [];
    const trailLength = 10;
    const colors = ['#FF00FF', '#00FF00', '#FFFF00', '#00FFFF'];
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: ${10 - i * 0.5}px;
            height: ${10 - i * 0.5}px;
            background: ${colors[i % colors.length]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i * 0.1};
            transition: transform 0.1s ease-out;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(dot);
        trail.push({ element: dot, x: 0, y: 0 });
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextX = x;
            const nextY = y;
            
            dot.element.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
            
            x += (dot.x - nextX) * 0.3;
            y += (dot.y - nextY) * 0.3;
            
            dot.x = nextX;
            dot.y = nextY;
        });
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
})();

/**
 * Easter egg: Konami code
 */
(function initKonamiCode() {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let index = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === code[index]) {
            index++;
            if (index === code.length) {
                activateChaosMode();
                index = 0;
            }
        } else {
            index = 0;
        }
    });
    
    function activateChaosMode() {
        document.body.style.animation = 'rainbow-bg 0.5s linear infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow-bg {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Create massive explosion
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createClickBurst(x, y);
            }, i * 30);
        }
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
})();

console.log('%c✨ CHAOS MODE ACTIVATED ✨', 'font-size: 24px; color: #FF00FF; text-shadow: 2px 2px 0 #00FF00, 4px 4px 0 #FFFF00;');
console.log('%cTry the Konami code for extra chaos!', 'font-size: 14px; color: #00FFFF;');
