/**
 * Zero Interface - Minimal UI, Maximum Experience
 * JavaScript for interactions and ambient behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initNavbar();
    initVoiceInterface();
    initScrollReveal();
    initStatCounters();
    initTestimonials();
    initContactForm();
    initGestureHint();
});

/**
 * Navbar - Appears on scroll or hover near top
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');
    let lastScrollY = 0;
    let ticking = false;

    // Show navbar when scrolled past hero or hovering near top
    function updateNavbar() {
        const scrollY = window.scrollY;
        const heroHeight = heroSection?.offsetHeight || window.innerHeight;
        
        // Show navbar when scrolled past 100px or past hero section
        if (scrollY > 100 || scrollY > heroHeight * 0.5) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Show navbar on hover near top of page
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 80 && window.scrollY < 100) {
            navbar.classList.add('visible');
        }
    });

    // Hide navbar when mouse leaves top area (if not scrolled)
    navbar.addEventListener('mouseleave', () => {
        if (window.scrollY < 100) {
            setTimeout(() => {
                if (window.scrollY < 100) {
                    navbar.classList.remove('visible');
                }
            }, 500);
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Voice Interface - Simulated voice UI
 */
function initVoiceInterface() {
    const voiceBtn = document.getElementById('voiceBtn');
    const voiceOverlay = document.getElementById('voiceOverlay');
    let isListening = false;

    voiceBtn.addEventListener('click', () => {
        isListening = !isListening;
        voiceBtn.classList.toggle('active', isListening);
        voiceOverlay.classList.toggle('active', isListening);
        
        if (isListening) {
            // Simulate voice recognition
            setTimeout(() => {
                closeVoice();
            }, 4000);
        }
    });

    // Close on click outside
    voiceOverlay.addEventListener('click', (e) => {
        if (e.target === voiceOverlay) {
            closeVoice();
        }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isListening) {
            closeVoice();
        }
    });

    function closeVoice() {
        isListening = false;
        voiceBtn.classList.remove('active');
        voiceOverlay.classList.remove('active');
    }
}

/**
 * Scroll Reveal - Progressive disclosure of content
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the reveal animation
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // Also reveal service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                serviceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => serviceObserver.observe(card));
}

/**
 * Stat Counters - Animate numbers on scroll
 */
function initStatCounters() {
    const stats = document.querySelectorAll('.stat');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const valueEl = stat.querySelector('.stat-value');
                const targetValue = parseInt(stat.dataset.value, 10);
                
                animateCounter(valueEl, targetValue);
                observer.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (target - start) * easeOut);
        
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * Testimonials - Minimal carousel
 */
function initTestimonials() {
    const track = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.nav-dot');
    let currentIndex = 0;
    let autoplayInterval;

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplay();
        });
    });

    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % dots.length;
            goToSlide(nextIndex);
        }, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    startAutoplay();

    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    track.addEventListener('mouseleave', () => {
        startAutoplay();
    });

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < dots.length - 1) {
                goToSlide(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
            resetAutoplay();
        }
    }
}

/**
 * Contact Form - Minimal validation and feedback
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;
        
        // Simulate sending
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Sent</span><i data-lucide="check"></i>';
            lucide.createIcons();
            
            // Reset form
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                lucide.createIcons();
            }, 2000);
        }, 1500);
    });
}

/**
 * Gesture Hint - Show on mobile touch devices
 */
function initGestureHint() {
    const gestureHint = document.getElementById('gestureHint');
    
    // Only show on touch devices
    if ('ontouchstart' in window) {
        setTimeout(() => {
            gestureHint.classList.add('visible');
            
            setTimeout(() => {
                gestureHint.classList.remove('visible');
            }, 4000);
        }, 2000);
    }
}

/**
 * Hide scroll indicator when scrolling begins
 */
(function() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    let hasScrolled = false;
    
    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 50) {
            hasScrolled = true;
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        }
    }, { passive: true });
})();

/**
 * Ambient cursor tracking (subtle background response)
 */
(function() {
    const ambientBg = document.querySelector('.ambient-bg');
    
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            ambientBg.style.background = `
                radial-gradient(ellipse at ${20 + x * 10}% ${20 + y * 10}%, rgba(240, 240, 240, 0.8) 0%, transparent 50%),
                radial-gradient(ellipse at ${80 - x * 10}% ${80 - y * 10}%, rgba(245, 241, 232, 0.6) 0%, transparent 50%),
                #FAFAFA
            `;
        });
    }
})();

/**
 * Keyboard navigation improvements
 */
document.addEventListener('keydown', (e) => {
    // Press 'v' to toggle voice interface
    if (e.key === 'v' && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        const isInput = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
        
        if (!isInput) {
            document.getElementById('voiceBtn').click();
        }
    }
});
