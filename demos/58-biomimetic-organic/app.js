// ============================================
// Biomimetic / Organic 2.0 - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initOrganicBackground();
    initNavbar();
    initScrollAnimations();
    initOrganismAnimation();
    initFormHandling();
});

// ============================================
// Organic Background - Generative Cells
// ============================================
function initOrganicBackground() {
    const canvas = document.getElementById('organicBg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let cells = [];
    let time = 0;
    
    // Resize canvas
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initCells();
    }
    
    // Initialize organic cells
    function initCells() {
        cells = [];
        const numCells = Math.floor((width * height) / 50000); // Density based on screen size
        
        for (let i = 0; i < numCells; i++) {
            cells.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: 30 + Math.random() * 80,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                phase: Math.random() * Math.PI * 2,
                color: getRandomColor()
            });
        }
    }
    
    // Get random organic color
    function getRandomColor() {
        const colors = [
            'rgba(0, 255, 65, 0.08)',    // Chlorophyll
            'rgba(0, 229, 255, 0.08)',   // Bioluminescent
            'rgba(255, 153, 153, 0.06)', // Cellular Pink
            'rgba(107, 33, 168, 0.06)'   // Nucleus
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Draw single cell
    function drawCell(cell) {
        const breathingScale = 1 + Math.sin(time * 0.001 + cell.phase) * 0.15;
        const radius = cell.radius * breathingScale;
        
        // Create gradient for organic feel
        const gradient = ctx.createRadialGradient(
            cell.x, cell.y, 0,
            cell.x, cell.y, radius
        );
        gradient.addColorStop(0, cell.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }
    
    // Update cell positions
    function updateCells() {
        cells.forEach(cell => {
            // Gentle floating movement
            cell.x += cell.vx + Math.sin(time * 0.0005 + cell.phase) * 0.2;
            cell.y += cell.vy + Math.cos(time * 0.0005 + cell.phase) * 0.2;
            
            // Wrap around screen
            if (cell.x < -cell.radius) cell.x = width + cell.radius;
            if (cell.x > width + cell.radius) cell.x = -cell.radius;
            if (cell.y < -cell.radius) cell.y = height + cell.radius;
            if (cell.y > height + cell.radius) cell.y = -cell.radius;
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        updateCells();
        cells.forEach(drawCell);
        
        time++;
        requestAnimationFrame(animate);
    }
    
    // Initialize
    resize();
    window.addEventListener('resize', resize);
    animate();
}

// ============================================
// Navbar Functionality
// ============================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove background on scroll
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10, 15, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 15, 26, 0.8)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }
    
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
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger children animations
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.section-badge, .about-content h2, .about-text, .feature-cell, ' +
        '.service-card, .testimonial-cell, .contact-info, .contact-form-wrapper'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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

// ============================================
// Organism Animation (Hero Visual)
// ============================================
function initOrganismAnimation() {
    const organism = document.querySelector('.organism');
    if (!organism) return;
    
    // Add mouse interaction
    document.addEventListener('mousemove', (e) => {
        const rect = organism.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 50;
        const deltaY = (e.clientY - centerY) / 50;
        
        organism.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    // Reset on mouse leave
    organism.addEventListener('mouseleave', () => {
        organism.style.transform = 'translate(0, 0)';
    });
}

// ============================================
// Form Handling
// ============================================
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button[type="submit"]');
        const originalContent = button.innerHTML;
        
        // Show loading state
        button.innerHTML = `
            <span class="loading-pulse"></span>
            <span>Sending...</span>
        `;
        button.disabled = true;
        
        // Add loading animation
        const style = document.createElement('style');
        style.textContent = `
            .loading-pulse {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: currentColor;
                animation: pulse-loading 1s ease-in-out infinite;
            }
            @keyframes pulse-loading {
                0%, 100% { transform: scale(0.8); opacity: 0.5; }
                50% { transform: scale(1.2); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Simulate form submission
        setTimeout(() => {
            button.innerHTML = `
                <i data-lucide="check"></i>
                <span>Message Sent!</span>
            `;
            lucide.createIcons();
            
            // Reset form
            form.reset();
            
            // Restore button after delay
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.disabled = false;
                lucide.createIcons();
            }, 3000);
        }, 2000);
    });
    
    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

// ============================================
// Utility: Throttle Function
// ============================================
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// Service Cards Hover Effect
// ============================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ============================================
// Stats Counter Animation
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Observe stats for animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const value = stat.textContent;
            
            // Handle different stat formats
            if (value.includes('M+')) {
                animateCounter(stat, 2);
                setTimeout(() => stat.textContent = '2M+', 2000);
            } else if (value.includes('%')) {
                animateCounter(stat, 98);
                setTimeout(() => stat.textContent = '98%', 2000);
            }
            
            statsObserver.unobserve(stat);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    if (!stat.textContent.includes('∞')) {
        statsObserver.observe(stat);
    }
});
