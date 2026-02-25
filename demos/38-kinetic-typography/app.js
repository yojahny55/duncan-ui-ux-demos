// ===== Kinetic Typography - Interactive JavaScript =====
// Motion text, animated type, scroll-triggered effects

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all animations
    initNavigation();
    initScrollReveal();
    initTestimonialSlider();
    initMorphText();
    initScrambleText();
    initFormAnimations();
});

// ===== Navigation =====
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('svg');
        if (icon) {
            icon.setAttribute('data-lucide', navMenu.classList.contains('active') ? 'x' : 'menu');
            lucide.createIcons();
        }
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Scroll Reveal Animations =====
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Observer for character-by-character reveal
    const charObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chars = entry.target.querySelectorAll('.char');
                chars.forEach((char, index) => {
                    setTimeout(() => {
                        char.style.transitionDelay = `${index * 0.05}s`;
                    }, 0);
                });
                entry.target.classList.add('animate');
                charObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        charObserver.observe(el);
    });
    
    // Observer for cards and general elements
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal-up, .about-card').forEach(el => {
        cardObserver.observe(el);
    });
    
    // Observer for word-by-word reveal in testimonials
    const wordObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('active')) {
                revealWords(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.testimonial-text').forEach(el => {
        wordObserver.observe(el);
    });
}

// ===== Word-by-Word Reveal =====
function revealWords(element) {
    if (element.dataset.revealed) return;
    element.dataset.revealed = 'true';
    
    const text = element.textContent.trim();
    const words = text.split(' ');
    element.innerHTML = '';
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.animationDelay = `${index * 0.1}s`;
        element.appendChild(span);
    });
}

// ===== Testimonial Slider =====
function initTestimonialSlider() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentIndex = 0;
    let autoplayInterval;
    
    function showSlide(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active');
            dots[i]?.classList.remove('active');
            if (card.querySelector('.testimonial-text')) {
                card.querySelector('.testimonial-text').dataset.revealed = '';
            }
        });
        
        currentIndex = (index + cards.length) % cards.length;
        cards[currentIndex].classList.add('active');
        dots[currentIndex]?.classList.add('active');
        
        // Trigger word reveal for active testimonial
        setTimeout(() => {
            const activeText = cards[currentIndex].querySelector('.testimonial-text');
            if (activeText) {
                revealWords(activeText);
            }
        }, 300);
    }
    
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Event listeners
    nextBtn?.addEventListener('click', () => {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    });
    
    prevBtn?.addEventListener('click', () => {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            showSlide(index);
            startAutoplay();
        });
    });
    
    // Start autoplay
    startAutoplay();
    
    // Initial reveal
    const initialText = cards[0]?.querySelector('.testimonial-text');
    if (initialText) {
        setTimeout(() => revealWords(initialText), 500);
    }
}

// ===== Morphing Text Animation =====
function initMorphText() {
    const morphElements = document.querySelectorAll('.morph-text');
    
    morphElements.forEach(element => {
        const texts = JSON.parse(element.dataset.texts || '[]');
        if (texts.length === 0) return;
        
        let currentIndex = 0;
        
        setInterval(() => {
            // Fade out
            element.style.opacity = '0';
            element.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                element.textContent = texts[currentIndex];
                
                // Fade in
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 300);
        }, 3000);
        
        // Add transition styles
        element.style.transition = 'all 0.3s ease';
    });
}

// ===== Scramble Text Effect =====
function initScrambleText() {
    const scrambleElements = document.querySelectorAll('.scramble-text');
    const chars = '!@#$%^&*()_+{}[]|;:,.<>?/~`';
    
    scrambleElements.forEach(element => {
        const originalText = element.dataset.text || element.textContent;
        
        element.addEventListener('mouseenter', () => {
            let iterations = 0;
            const maxIterations = originalText.length;
            
            const interval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        if (char === ' ') return ' ';
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                iterations += 1/3;
                
                if (iterations >= maxIterations) {
                    clearInterval(interval);
                    element.textContent = originalText;
                }
            }, 30);
        });
    });
}

// ===== Form Animations =====
function initFormAnimations() {
    const form = document.querySelector('.contact-form');
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        // Loading state
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate submission
        setTimeout(() => {
            submitBtn.querySelector('.btn-text').textContent = 'Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
            
            // Reset after delay
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// ===== Wave Text Animation on Scroll =====
function initWaveText() {
    const waveTexts = document.querySelectorAll('.wave-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const spans = entry.target.querySelectorAll('span:not(.space)');
                spans.forEach((span, index) => {
                    span.style.animationDelay = `${index * 0.03}s`;
                    span.classList.add('wave');
                });
            }
        });
    }, { threshold: 0.5 });
    
    waveTexts.forEach(text => observer.observe(text));
}

// ===== Cursor Trail Effect (Desktop only) =====
function initCursorTrail() {
    if (window.matchMedia('(hover: hover)').matches) {
        const trail = [];
        const trailLength = 10;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: linear-gradient(135deg, #6366F1, #EC4899);
                pointer-events: none;
                z-index: 9999;
                opacity: ${1 - (i / trailLength)};
                transform: scale(${1 - (i / trailLength) * 0.5});
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(dot);
            trail.push({ el: dot, x: 0, y: 0 });
        }
        
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateTrail() {
            let x = mouseX, y = mouseY;
            
            trail.forEach((dot, index) => {
                const nextDot = trail[index + 1] || trail[0];
                dot.x += (x - dot.x) * 0.3;
                dot.y += (y - dot.y) * 0.3;
                
                dot.el.style.left = dot.x - 4 + 'px';
                dot.el.style.top = dot.y - 4 + 'px';
                
                x = dot.x;
                y = dot.y;
            });
            
            requestAnimationFrame(animateTrail);
        }
        
        animateTrail();
    }
}

// Initialize additional effects after main content loads
window.addEventListener('load', () => {
    initWaveText();
    // Uncomment for cursor trail effect:
    // initCursorTrail();
});

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const floatingLetters = document.querySelectorAll('.float-letter');
    
    if (hero && scrolled < window.innerHeight) {
        const opacity = 1 - (scrolled / window.innerHeight);
        const translateY = scrolled * 0.5;
        
        if (heroContent) {
            heroContent.style.opacity = opacity;
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
        
        floatingLetters.forEach((letter, index) => {
            const speed = 0.2 + (index * 0.1);
            letter.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});
