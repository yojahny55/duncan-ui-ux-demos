/**
 * Micro-interactions Demo - UI/UX Demo
 * Emphasis on 50-100ms animations, tactile feedback, delightful details
 */

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initNavbar();
    initHeroButton();
    initToggleSwitches();
    initLikeButtons();
    initTestimonialLikes();
    initScrollAnimations();
    initProgressBars();
    initStatCounters();
    initContactForm();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Nav link active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Ripple effect
            createRipple(e, link);
        });
    });
}

// Create ripple effect
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.4s ease-out;
        pointer-events: none;
        left: ${event.clientX - rect.left - size / 2}px;
        top: ${event.clientY - rect.top - size / 2}px;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 400);
}

// Hero button loading state demo
function initHeroButton() {
    const heroBtn = document.getElementById('heroBtn');
    
    heroBtn.addEventListener('click', () => {
        if (heroBtn.classList.contains('loading') || heroBtn.classList.contains('success')) {
            return;
        }
        
        // Loading state
        heroBtn.classList.add('loading');
        
        // Simulate async action
        setTimeout(() => {
            heroBtn.classList.remove('loading');
            heroBtn.classList.add('success');
            
            showToast('Demo activated!', 'success');
            
            // Reset after delay
            setTimeout(() => {
                heroBtn.classList.remove('success');
            }, 2000);
        }, 1500);
    });
}

// Toggle switches with smooth animation
function initToggleSwitches() {
    const toggles = document.querySelectorAll('.toggle-switch');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            
            // Haptic feedback (on supported devices)
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        });
    });
}

// Like button with heart animation
function initLikeButtons() {
    const likeBtn = document.getElementById('likeBtn');
    const likeCount = document.querySelector('.like-count');
    let count = 247;
    let liked = false;
    
    likeBtn.addEventListener('click', () => {
        liked = !liked;
        likeBtn.classList.toggle('liked', liked);
        
        // Update count with animation
        count = liked ? 248 : 247;
        likeCount.style.transform = 'translateY(-5px)';
        likeCount.style.opacity = '0';
        
        setTimeout(() => {
            likeCount.textContent = count;
            likeCount.style.transform = 'translateY(5px)';
            
            setTimeout(() => {
                likeCount.style.transform = 'translateY(0)';
                likeCount.style.opacity = '1';
            }, 50);
        }, 100);
        
        // Re-render heart icon
        lucide.createIcons();
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(liked ? [10, 50, 10] : 10);
        }
    });
}

// Testimonial like buttons
function initTestimonialLikes() {
    const likeBtns = document.querySelectorAll('.testimonial-like');
    
    likeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('liked');
            lucide.createIcons();
            
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, observerOptions);
    
    // Observe about cards
    document.querySelectorAll('.about-card').forEach(card => {
        observer.observe(card);
    });
}

// Progress bars animation
function initProgressBars() {
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.dataset.progress;
                
                setTimeout(() => {
                    progressBar.style.width = `${progress}%`;
                }, 300);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.progress-bar').forEach(bar => {
        observer.observe(bar);
    });
}

// Stat counter animation
function initStatCounters() {
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-number').forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    
    const update = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    };
    
    requestAnimationFrame(update);
}

// Contact form with micro-interactions
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
        
        // Typing feedback
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (submitBtn.classList.contains('loading') || submitBtn.classList.contains('success')) {
            return;
        }
        
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            
            showToast('Message sent successfully!', 'success');
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.classList.remove('success');
                inputs.forEach(input => {
                    input.parentElement.classList.remove('has-value');
                });
            }, 2000);
        }, 1500);
    });
}

// Toast notification system
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconName = type === 'success' ? 'check' : type === 'error' ? 'x' : 'alert-triangle';
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i data-lucide="${iconName}"></i>
        </div>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close">
            <i data-lucide="x"></i>
        </button>
    `;
    
    container.appendChild(toast);
    lucide.createIcons();
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        closeToast(toast);
    });
    
    // Auto-close after 4 seconds
    setTimeout(() => {
        closeToast(toast);
    }, 4000);
}

function closeToast(toast) {
    if (!toast.classList.contains('hiding')) {
        toast.classList.add('hiding');
        setTimeout(() => {
            toast.remove();
        }, 200);
    }
}

// Add ripple keyframe animation via JS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for nav links
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

// Service card hover sound effect (optional - commented out by default)
// const serviceCards = document.querySelectorAll('.service-card');
// serviceCards.forEach(card => {
//     card.addEventListener('mouseenter', () => {
//         const audio = new Audio('data:audio/wav;base64,...'); // tiny click sound
//         audio.volume = 0.1;
//         audio.play();
//     });
// });

// Easter egg: Konami code triggers special animation
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s ease';
        showToast('🎉 You found the easter egg!', 'success');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(180deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
