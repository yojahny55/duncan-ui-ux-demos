/**
 * Storytelling-Driven UI - Interactive JavaScript
 * Features: Scroll reveals, parallax, section transitions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initScrollReveal();
    initNavbarScroll();
    initParallax();
    initSmoothScroll();
    initFormInteractions();
});

/**
 * Scroll Reveal Animation
 * Reveals elements as they enter the viewport
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const revealCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(revealCallback, observerOptions);
    
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

/**
 * Navbar Scroll Effect
 * Changes navbar style on scroll
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    
    if (!navbar || !hero) return;
    
    const heroHeight = hero.offsetHeight;
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
}

/**
 * Parallax Effect for Hero
 */
function initParallax() {
    const layers = document.querySelectorAll('.parallax-layer');
    const hero = document.querySelector('.hero');
    
    if (!layers.length || !hero) return;
    
    const speeds = [0.3, 0.5, 0.2];
    
    const handleParallax = () => {
        const scrolled = window.scrollY;
        const heroRect = hero.getBoundingClientRect();
        
        // Only apply parallax when hero is visible
        if (heroRect.bottom > 0) {
            layers.forEach((layer, index) => {
                const speed = speeds[index] || 0.3;
                const yPos = scrolled * speed;
                layer.style.transform = `translateY(${yPos}px)`;
            });
        }
    };
    
    window.addEventListener('scroll', handleParallax, { passive: true });
}

/**
 * Smooth Scroll for Navigation
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
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Interactions
 */
function initFormInteractions() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;
    
    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.btn');
        const originalText = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = `
            <span>Sending your story...</span>
            <svg class="spinner" viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="30 70" stroke-linecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
        btn.disabled = true;
        
        // Simulate submission
        setTimeout(() => {
            btn.innerHTML = `
                <span>Story received!</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            `;
            btn.style.background = '#00B894';
            
            // Reset after delay
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = '';
                form.reset();
                lucide.createIcons();
            }, 3000);
        }, 2000);
    });
}

/**
 * Mobile Navigation Toggle
 */
document.querySelector('.nav-toggle')?.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    
    if (navLinks) {
        navLinks.classList.toggle('active');
        
        // Add mobile nav styles dynamically
        if (navLinks.classList.contains('active')) {
            navLinks.style.cssText = `
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                padding: 1rem;
                box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                gap: 0;
            `;
            
            navLinks.querySelectorAll('a').forEach(a => {
                a.style.cssText = `
                    color: #2D3436;
                    padding: 0.75rem 1rem;
                    display: block;
                `;
            });
        } else {
            navLinks.style.cssText = '';
            navLinks.querySelectorAll('a').forEach(a => {
                a.style.cssText = '';
            });
        }
    }
});

/**
 * Chapter Progress Indicator (optional enhancement)
 */
function initChapterProgress() {
    const sections = document.querySelectorAll('section[id]');
    const chapterMarkers = document.querySelectorAll('.chapter-marker');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Could update a progress indicator or active chapter
                console.log('Current chapter:', entry.target.id);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Initialize chapter progress
initChapterProgress();
