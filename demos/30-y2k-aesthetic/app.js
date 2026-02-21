// Y2K Aesthetic - FutureNet Digital
// JavaScript for interactions and animations

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize all modules
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initTestimonialsSlider();
    initContactForm();
    initVisitorCounter();
    initParallaxEffects();
    initY2KEffects();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(26, 10, 46, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(255, 0, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(26, 10, 46, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Smooth scrolling
function initSmoothScroll() {
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

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Counter animation for stats
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.about-card, .service-card, .testimonial-card, .feature-list li, .contact-item, .stat-item'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Counter animation
function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const hasPlus = target.includes('+');
    const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
    
    let current = 0;
    const increment = numericValue / 50;
    const duration = 1500;
    const stepTime = duration / 50;

    const counter = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(counter);
        }
        
        let displayValue = Math.floor(current);
        if (isPercentage) {
            displayValue = current.toFixed(1) + '%';
        } else if (hasPlus) {
            displayValue = Math.floor(current) + '+';
        } else if (numericValue >= 1000) {
            displayValue = Math.floor(current / 1000) + 'K+';
        }
        
        element.textContent = displayValue;
    }, stepTime);
}

// Testimonials slider
function initTestimonialsSlider() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.nav-dots .dot');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    
    let currentIndex = 0;
    const totalSlides = dots.length;

    function updateSlider(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // On mobile, scroll to card
        if (window.innerWidth <= 768 && cards[index]) {
            cards[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider(currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider(currentIndex);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider(currentIndex);
        });
    });

    // Auto-advance
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider(currentIndex);
    }, 5000);
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit');
            const originalContent = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i data-lucide="loader-2"></i><span>Transmitting...</span>';
            submitBtn.disabled = true;
            lucide.createIcons();
            
            // Add spinning animation to loader
            const loader = submitBtn.querySelector('i');
            if (loader) {
                loader.style.animation = 'spin 1s linear infinite';
            }
            
            // Simulate sending
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success state
            submitBtn.innerHTML = '<i data-lucide="check-circle"></i><span>Message Sent!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff00, #00cc00)';
            lucide.createIcons();
            
            // Reset form
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                lucide.createIcons();
            }, 3000);
        });

        // Input focus effects
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }
}

// Visitor counter (Y2K style!)
function initVisitorCounter() {
    const counter = document.getElementById('visitorCount');
    if (!counter) return;

    // Simulate visitor count from localStorage
    let count = parseInt(localStorage.getItem('y2kVisitorCount') || '42000');
    count += Math.floor(Math.random() * 10) + 1;
    localStorage.setItem('y2kVisitorCount', count.toString());
    
    // Animate counter
    const targetCount = count;
    let currentCount = targetCount - 100;
    
    const interval = setInterval(() => {
        currentCount += Math.floor(Math.random() * 5) + 1;
        if (currentCount >= targetCount) {
            currentCount = targetCount;
            clearInterval(interval);
        }
        counter.textContent = String(currentCount).padStart(8, '0');
    }, 50);
}

// Parallax effects
function initParallaxEffects() {
    const blobs = document.querySelectorAll('.blob');
    const stars = document.querySelectorAll('.star');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
        
        stars.forEach((star, index) => {
            const speed = (index + 1) * 10;
            star.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // Scroll parallax for hero sphere
    const heroSphere = document.querySelector('.hero-sphere');
    if (heroSphere) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            heroSphere.style.transform = `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.05}deg)`;
        });
    }
}

// Y2K specific effects
function initY2KEffects() {
    // Sparkle cursor trail
    const sparkleColors = ['#ff00ff', '#00ffff', '#ff00ff', '#00ff00', '#ffff00'];
    let sparkleIndex = 0;
    
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.92) {
            createSparkle(e.clientX, e.clientY, sparkleColors[sparkleIndex]);
            sparkleIndex = (sparkleIndex + 1) % sparkleColors.length;
        }
    });

    // Glitch effect on hover for chrome text
    const chromeTexts = document.querySelectorAll('.chrome-text');
    chromeTexts.forEach(text => {
        text.addEventListener('mouseenter', () => {
            text.style.animation = 'glitch 0.3s ease';
            setTimeout(() => {
                text.style.animation = '';
            }, 300);
        });
    });

    // Add glitch keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes sparkle {
            0% { transform: scale(0) rotate(0deg); opacity: 1; }
            50% { transform: scale(1) rotate(180deg); opacity: 1; }
            100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Rainbow border animation for featured card
    const featuredCard = document.querySelector('.service-card.featured');
    if (featuredCard) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 2) % 360;
            featuredCard.style.borderColor = `hsl(${hue}, 100%, 50%)`;
        }, 50);
    }

    // Typing effect for terminal
    const typingLine = document.querySelector('.typing');
    if (typingLine) {
        const cursor = typingLine.querySelector('.cursor');
        if (cursor) {
            setInterval(() => {
                cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
            }, 530);
        }
    }
}

// Create sparkle particle
function createSparkle(x, y, color) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        background: ${color};
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        pointer-events: none;
        z-index: 9999;
        animation: sparkle 0.6s ease-out forwards;
    `;
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 600);
}

// Card hover effects
document.querySelectorAll('.about-card, .service-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Console Easter egg
console.log('%c🌐 Welcome to FutureNet Digital! 🌐', 'font-size: 24px; font-weight: bold; color: #ff00ff; text-shadow: 0 0 10px #ff00ff;');
console.log('%cYou are visitor #' + (parseInt(localStorage.getItem('y2kVisitorCount') || '42000')), 'font-size: 14px; color: #00ffff;');
console.log('%c⭐ Best viewed in 800x600 with Netscape Navigator 4.0+ ⭐', 'font-size: 12px; color: #00ff00; font-style: italic;');
