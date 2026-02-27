/**
 * PixelCraft Studios - Pixel Art Style Demo
 * 8-bit/16-bit retro gaming aesthetic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize all components
    initMobileMenu();
    initScoreCounter();
    initCharacterSelect();
    initContactForm();
    initScrollEffects();
    initKeyboardControls();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Update icon
            const icon = navToggle.querySelector('.pixel-icon');
            if (mobileMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = navToggle.querySelector('.pixel-icon');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
}

/**
 * Animated Score Counter
 */
function initScoreCounter() {
    const scoreElement = document.getElementById('score');
    if (!scoreElement) return;

    let score = 0;
    const maxScore = 88888;
    
    // Increment score every 100ms for retro feel
    const scoreInterval = setInterval(() => {
        score += Math.floor(Math.random() * 100) + 10;
        
        if (score >= maxScore) {
            score = 0; // Reset for loop
        }
        
        scoreElement.textContent = score.toString().padStart(5, '0');
    }, 150);

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(scoreInterval);
    });
}

/**
 * Character Selection
 */
function initCharacterSelect() {
    const characters = document.querySelectorAll('.character');
    const statBars = document.querySelectorAll('.bar-fill');
    
    const charStats = {
        warrior: { str: 80, dex: 60, int: 40 },
        mage: { str: 30, dex: 50, int: 90 },
        rogue: { str: 50, dex: 90, int: 60 }
    };

    characters.forEach(char => {
        char.addEventListener('click', () => {
            // Remove active from all
            characters.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked
            char.classList.add('active');
            
            // Update stat bars
            const charType = char.dataset.char;
            const stats = charStats[charType];
            
            if (stats && statBars.length >= 3) {
                // Animate bars with step timing
                setTimeout(() => {
                    statBars[0].style.width = `${stats.str}%`;
                }, 0);
                setTimeout(() => {
                    statBars[1].style.width = `${stats.dex}%`;
                }, 100);
                setTimeout(() => {
                    statBars[2].style.width = `${stats.int}%`;
                }, 200);
            }

            // Play selection sound effect (visual feedback)
            flashElement(char);
        });
    });
}

/**
 * Flash element for visual feedback
 */
function flashElement(element) {
    element.style.filter = 'brightness(1.5)';
    setTimeout(() => {
        element.style.filter = 'brightness(1)';
    }, 100);
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span>SENDING...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success state
                submitBtn.innerHTML = '<i data-lucide="check" class="pixel-icon"></i><span>MESSAGE SENT!</span>';
                submitBtn.style.background = 'var(--color-success)';
                lucide.createIcons();
                
                // Reset form
                form.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    lucide.createIcons();
                }, 2000);
            }, 1500);
        });

        // Add pixel-style focus effects
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'translateX(4px)';
            });
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'translateX(0)';
            });
        });
    }
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 0 var(--color-primary)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Simple scroll reveal (instant appearance)
    const revealElements = document.querySelectorAll('.service-card, .testimonial-card, .info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.1s step-end, transform 0.1s step-end';
        observer.observe(el);
    });
}

/**
 * Keyboard Controls (Easter Egg)
 */
function initKeyboardControls() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                // Konami code completed!
                activateKonamiMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }

        // Add simple keyboard navigation hints
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            window.scrollBy({ top: window.innerHeight, behavior: 'auto' });
        }
    });
}

/**
 * Konami Code Easter Egg
 */
function activateKonamiMode() {
    // Create power-up notification
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-black);
            border: 4px solid var(--color-accent);
            padding: 2rem;
            z-index: 10000;
            text-align: center;
            font-family: 'Press Start 2P', monospace;
            animation: flashColors 0.5s step-end infinite;
        ">
            <p style="font-size: 16px; color: var(--color-accent); margin-bottom: 1rem;">+30 LIVES!</p>
            <p style="font-size: 10px; color: var(--color-white);">KONAMI CODE ACTIVATED</p>
        </div>
    `;

    // Add flash animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flashColors {
            0% { border-color: var(--color-accent); }
            25% { border-color: var(--color-primary); }
            50% { border-color: var(--color-success); }
            75% { border-color: var(--color-blue); }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Add rainbow effect to page
    document.body.style.animation = 'rainbowBg 2s step-end infinite';
    const bgStyle = document.createElement('style');
    bgStyle.textContent = `
        @keyframes rainbowBg {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
        }
    `;
    document.head.appendChild(bgStyle);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
        document.body.style.animation = '';
        style.remove();
        bgStyle.remove();
    }, 3000);
}

/**
 * Create pixelated particle effect
 */
function createPixelParticle(x, y, color) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: ${color};
        pointer-events: none;
        z-index: 9998;
    `;
    
    document.body.appendChild(particle);

    // Animate particle
    let posY = y;
    let velocityY = -5;
    let opacity = 1;

    const animate = () => {
        velocityY += 0.3; // Gravity
        posY += velocityY;
        opacity -= 0.02;

        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;

        if (opacity > 0) {
            setTimeout(animate, 50); // Step animation
        } else {
            particle.remove();
        }
    };

    animate();
}

// Optional: Click to create particles
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn')) {
        const colors = ['#e94560', '#ffc947', '#4ecca3', '#00a8e8', '#ff6b9d'];
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 40;
                const offsetY = (Math.random() - 0.5) * 40;
                const color = colors[Math.floor(Math.random() * colors.length)];
                createPixelParticle(e.clientX + offsetX, e.clientY + offsetY, color);
            }, i * 50);
        }
    }
});
