/**
 * Gen Z Chaos / Maximalism
 * Chaotic, sticker-filled, collage aesthetic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all features
    initScrollAnimations();
    initStickerInteractions();
    initNavbarEffects();
    initFormEffects();
    initChaosEffects();
    initMobileMenu();
});

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe cards
    const cards = document.querySelectorAll('.about-card, .service-card, .testimonial-card');
    cards.forEach(card => observer.observe(card));
}

/**
 * Interactive sticker effects
 */
function initStickerInteractions() {
    const stickers = document.querySelectorAll('.sticker');
    
    stickers.forEach(sticker => {
        // Random initial position adjustments
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        sticker.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        
        // Add click interaction
        sticker.addEventListener('click', () => {
            sticker.style.animation = 'none';
            sticker.style.transform += ' scale(1.5) rotate(360deg)';
            
            setTimeout(() => {
                sticker.style.transform = '';
                sticker.style.animation = '';
            }, 500);
        });
    });
    
    // Create random sticker spawn on scroll
    let lastScrollY = 0;
    let stickersCreated = 0;
    const maxStickers = 5;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);
        
        if (scrollDelta > 200 && stickersCreated < maxStickers) {
            createTemporarySticker();
            stickersCreated++;
            lastScrollY = currentScrollY;
        }
    });
}

/**
 * Create temporary floating sticker
 */
function createTemporarySticker() {
    const stickerTexts = ['SLAY', 'FR FR', 'VALID', 'BET', 'GOAT', 'FIRE', 'W', 'NO CAP'];
    const colors = ['#FF00FF', '#00FF00', '#FFFF00', '#00FFFF', '#FF6B00'];
    
    const sticker = document.createElement('div');
    sticker.className = 'temp-sticker';
    sticker.textContent = stickerTexts[Math.floor(Math.random() * stickerTexts.length)];
    sticker.style.cssText = `
        position: fixed;
        left: ${Math.random() * 80 + 10}%;
        top: ${Math.random() * 80 + 10}%;
        padding: 8px 16px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        color: #000;
        font-family: 'Unbounded', sans-serif;
        font-weight: 900;
        font-size: 14px;
        border-radius: 4px;
        transform: rotate(${(Math.random() - 0.5) * 30}deg);
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
        z-index: 99;
        pointer-events: none;
        animation: stickerPop 2s ease-out forwards;
    `;
    
    document.body.appendChild(sticker);
    
    setTimeout(() => {
        sticker.remove();
    }, 2000);
}

// Add sticker pop animation
const stickerStyle = document.createElement('style');
stickerStyle.textContent = `
    @keyframes stickerPop {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        30% {
            opacity: 1;
            transform: scale(1.2) rotate(10deg);
        }
        50% {
            transform: scale(1) rotate(-5deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.8) rotate(15deg) translateY(-50px);
        }
    }
`;
document.head.appendChild(stickerStyle);

/**
 * Navbar effects
 */
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(255, 0, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Form interactions
 */
function initFormEffects() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Add chaos effect on focus
        input.addEventListener('focus', () => {
            input.style.borderColor = getRandomChaosColor();
            input.style.boxShadow = `0 0 20px ${getRandomChaosColor()}33`;
        });
        
        input.addEventListener('blur', () => {
            input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            input.style.boxShadow = 'none';
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>SENDING THE CHAOS...</span>';
        submitBtn.style.background = 'var(--chaos-cyan)';
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i data-lucide="check"></i><span>SENT! WE\'LL BE IN TOUCH</span>';
            submitBtn.style.background = 'var(--chaos-green)';
            lucide.createIcons();
            
            // Create celebration effect
            createCelebration();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                lucide.createIcons();
                form.reset();
            }, 3000);
        }, 1500);
    });
}

/**
 * Random chaos color
 */
function getRandomChaosColor() {
    const colors = ['#FF00FF', '#00FF00', '#FFFF00', '#00FFFF', '#FF6B00', '#0000FF'];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Celebration effect
 */
function createCelebration() {
    const colors = ['#FF00FF', '#00FF00', '#FFFF00', '#00FFFF', '#FF6B00'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: -20px;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            z-index: 9999;
            pointer-events: none;
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${Math.random() * 2 + 2}s ease-out forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

/**
 * Random chaos effects
 */
function initChaosEffects() {
    // Random glitch on title hover
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            heroTitle.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #FF00FF,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00FFFF,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00FF00
            `;
        });
        
        heroTitle.addEventListener('mouseleave', () => {
            heroTitle.style.textShadow = '';
        });
    }
    
    // Random color shifts on cards
    const cards = document.querySelectorAll('.about-card, .service-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const randomColor = getRandomChaosColor();
            card.style.borderColor = randomColor;
            card.style.boxShadow = `6px 6px 0 ${randomColor}`;
        });
    });
    
    // Cursor trail effect (desktop only)
    if (window.innerWidth > 768) {
        initCursorTrail();
    }
}

/**
 * Cursor trail effect
 */
function initCursorTrail() {
    const trail = [];
    const trailLength = 10;
    const colors = ['#FF00FF', '#00FF00', '#FFFF00', '#00FFFF'];
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: ${8 - i * 0.5}px;
            height: ${8 - i * 0.5}px;
            background: ${colors[i % colors.length]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i * 0.1};
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.style.left = `${x - 4}px`;
            dot.style.top = `${y - 4}px`;
            
            x += (parseFloat(nextDot.style.left) - x) * 0.3 || 0;
            y += (parseFloat(nextDot.style.top) - y) * 0.3 || 0;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

/**
 * Mobile menu
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(10, 10, 10, 0.98);
                    padding: 20px;
                    gap: 20px;
                    border-bottom: 3px solid var(--chaos-pink);
                `;
            }
        });
    }
}

/**
 * Easter egg: Konami code
 */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateChaosMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateChaosMode() {
    document.body.style.animation = 'rainbow 1s linear infinite';
    
    const chaosStyle = document.createElement('style');
    chaosStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(chaosStyle);
    
    // Create extra stickers
    for (let i = 0; i < 20; i++) {
        setTimeout(createTemporarySticker, i * 100);
    }
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}
