// Exaggerated Minimalism - UI/UX Demo
// Minimal JavaScript - less is more

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Update menu icon
            const icon = navToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // Testimonial data
    const testimonials = [
        {
            quote: '"They stripped away everything unnecessary and what remained was perfect."',
            name: 'Sarah Chen',
            role: 'CEO, Minimal Studio'
        },
        {
            quote: '"Bold. Simple. Effective. The best design decision we ever made."',
            name: 'Marcus Webb',
            role: 'Founder, Blank Space'
        },
        {
            quote: '"In a cluttered world, they gave us clarity. Pure design excellence."',
            name: 'Elena Rodriguez',
            role: 'Creative Director, Less Inc.'
        }
    ];

    // Testimonial navigation
    const navBtns = document.querySelectorAll('.nav-btn');
    const quoteEl = document.querySelector('.testimonial-quote');
    const nameEl = document.querySelector('.author-name');
    const roleEl = document.querySelector('.author-role');

    if (navBtns.length && quoteEl && nameEl && roleEl) {
        navBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Update active state
                navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update content with fade effect
                quoteEl.style.opacity = '0';
                
                setTimeout(() => {
                    quoteEl.textContent = testimonials[index].quote;
                    nameEl.textContent = testimonials[index].name;
                    roleEl.textContent = testimonials[index].role;
                    quoteEl.style.opacity = '1';
                }, 300);
            });
        });

        // Add transition for smooth fade
        quoteEl.style.transition = 'opacity 0.3s ease';
    }

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe service items and stats
    document.querySelectorAll('.service-item, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible class styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .service-item.visible,
        .stat.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Form handling
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Simple feedback
            submitBtn.innerHTML = '<span>Sent</span><i data-lucide="check"></i>';
            lucide.createIcons();
            submitBtn.disabled = true;
            
            // Reset after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                lucide.createIcons();
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
        });
    }

    // Smooth scroll for navigation links
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
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    });

    // Navbar hide on scroll (minimal distraction)
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // Add navbar transition
    navbar.style.transition = 'transform 0.3s ease';
});
