/* ========================================
   Spatial UI (VisionOS) - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initNavigation();
    initParallaxDepth();
    initScrollAnimations();
    initCarousel();
    initServiceTabs();
    initFormValidation();
    initFloatingWindows();
});

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navbar scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.15)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
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
    
    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                const isOpen = navMenu.classList.contains('active');
                icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
                lucide.createIcons();
            }
        });
    }
}

/* ========================================
   PARALLAX DEPTH EFFECT
   ======================================== */
function initParallaxDepth() {
    const floatingWindows = document.querySelectorAll('.floating-window');
    const orbs = document.querySelectorAll('.ambient-orb');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        // Parallax for floating windows
        floatingWindows.forEach((window, index) => {
            const depth = (index + 1) * 15;
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;
            
            window.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Subtle parallax for orbs
        orbs.forEach((orb, index) => {
            const depth = (index + 1) * 5;
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;
            
            orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.about-card, .service-panel, .testimonial-card, .contact-method, .footer-column'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

/* ========================================
   TESTIMONIALS CAROUSEL
   ======================================== */
function initCarousel() {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    function updateCarousel() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Auto-advance every 5 seconds
    let autoplay = setInterval(nextSlide, 5000);
    
    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoplay));
    track.addEventListener('mouseleave', () => {
        autoplay = setInterval(nextSlide, 5000);
    });
}

/* ========================================
   SERVICE TABS
   ======================================== */
function initServiceTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panel = document.querySelector('.service-panel');
    
    const tabContent = {
        design: {
            icon: 'pen-tool',
            title: 'Spatial Design',
            description: 'Create intuitive 3D interfaces with depth, glass effects, and natural light interactions that respond to user presence.',
            features: ['Glass morphism UI', 'Depth-aware layouts', 'Dynamic lighting']
        },
        develop: {
            icon: 'code-2',
            title: 'Spatial Development',
            description: 'Build immersive experiences with cutting-edge technologies. From WebXR to native visionOS apps, we bring your spatial vision to life.',
            features: ['WebXR & Reality Kit', 'Cross-platform SDKs', 'Performance optimization']
        },
        deploy: {
            icon: 'rocket',
            title: 'Global Deployment',
            description: 'Launch your spatial experiences across all platforms and devices. We handle the complexity so you can focus on innovation.',
            features: ['Multi-device support', 'Cloud infrastructure', 'Analytics integration']
        },
        support: {
            icon: 'headphones',
            title: '24/7 Support',
            description: 'Our team of spatial computing experts is always here to help. From troubleshooting to feature requests, we\'ve got you covered.',
            features: ['Dedicated success manager', 'Priority response', 'Continuous updates']
        }
    };
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            const content = tabContent[tabId];
            
            if (!content || !panel) return;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Animate panel transition
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                // Update panel content
                const iconEl = panel.querySelector('.panel-icon i');
                const titleEl = panel.querySelector('.panel-content h3');
                const descEl = panel.querySelector('.panel-content p');
                const featuresEl = panel.querySelector('.panel-features');
                
                if (iconEl) {
                    iconEl.setAttribute('data-lucide', content.icon);
                    lucide.createIcons();
                }
                if (titleEl) titleEl.textContent = content.title;
                if (descEl) descEl.textContent = content.description;
                if (featuresEl) {
                    featuresEl.innerHTML = content.features.map(f => `
                        <li>
                            <i data-lucide="check-circle-2"></i>
                            <span>${f}</span>
                        </li>
                    `).join('');
                    lucide.createIcons();
                }
                
                // Animate back in
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            }, 200);
        });
    });
}

/* ========================================
   FORM VALIDATION
   ======================================== */
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const subject = form.querySelector('#subject');
        const message = form.querySelector('#message');
        
        let isValid = true;
        
        // Simple validation
        [name, email, subject, message].forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#FF453A';
                setTimeout(() => {
                    field.style.borderColor = '';
                }, 2000);
            }
        });
        
        // Email validation
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            isValid = false;
            email.style.borderColor = '#FF453A';
            setTimeout(() => {
                email.style.borderColor = '';
            }, 2000);
        }
        
        if (isValid) {
            // Success feedback
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i data-lucide="check"></i><span>Sent!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #30D158, #32D74B)';
            lucide.createIcons();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                lucide.createIcons();
                form.reset();
            }, 3000);
        }
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

/* ========================================
   FLOATING WINDOWS INTERACTION
   ======================================== */
function initFloatingWindows() {
    const windows = document.querySelectorAll('.floating-window');
    
    windows.forEach(window => {
        // Gaze-hover effect (scale on hover)
        window.addEventListener('mouseenter', () => {
            window.style.zIndex = '10';
        });
        
        window.addEventListener('mouseleave', () => {
            window.style.zIndex = '';
        });
        
        // Window controls interaction
        const controls = window.querySelectorAll('.control');
        
        controls.forEach(control => {
            control.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if (control.classList.contains('close')) {
                    window.style.opacity = '0';
                    window.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        window.style.opacity = '1';
                        window.style.transform = '';
                    }, 2000);
                } else if (control.classList.contains('minimize')) {
                    window.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        window.style.transform = '';
                    }, 1000);
                } else if (control.classList.contains('maximize')) {
                    window.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        window.style.transform = '';
                    }, 500);
                }
            });
        });
    });
}

/* ========================================
   DEPTH LAYER PREVIEW ANIMATION
   ======================================== */
const designPreview = document.querySelector('.design-preview');

if (designPreview) {
    const layers = designPreview.querySelectorAll('.preview-layer');
    
    designPreview.addEventListener('mousemove', (e) => {
        const rect = designPreview.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        layers.forEach((layer, index) => {
            const depth = (index + 1) * 10;
            const rotateY = x * depth;
            const rotateX = -y * depth;
            const translateZ = index * 30;
            
            layer.style.transform = `
                translateZ(${translateZ}px) 
                rotateY(${rotateY}deg) 
                rotateX(${rotateX}deg)
            `;
        });
    });
    
    designPreview.addEventListener('mouseleave', () => {
        layers.forEach((layer, index) => {
            layer.style.transform = `translateZ(${index * 30}px)`;
        });
    });
}

/* ========================================
   CTA BUTTON EFFECTS
   ======================================== */
const ctaButtons = document.querySelectorAll('.btn-primary, .nav-cta');

ctaButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.boxShadow = '0 12px 32px rgba(10, 132, 255, 0.5)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = '';
    });
});

/* ========================================
   SMOOTH REVEAL ON LOAD
   ======================================== */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Staggered reveal for hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-actions');
    
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
});
