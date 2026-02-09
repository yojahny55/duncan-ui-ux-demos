/**
 * BRUTALISM UI DEMO
 * Raw. Unpolished. Powerful.
 * 
 * JavaScript: Minimal, functional, no frameworks.
 * True to brutalist principles - no unnecessary flourishes.
 */

(function() {
    'use strict';

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('menu-open');
            const isOpen = navbar.classList.contains('menu-open');
            mobileMenuBtn.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
            lucide.createIcons();
        });
    }

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.navbar-links a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navbar.classList.remove('menu-open');
            mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });

    // ============================================
    // FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach(function(value, key) {
                data[key] = value;
            });

            // Validate
            if (!data.name || !data.email || !data.budget || !data.message) {
                showMessage('ERROR: ALL FIELDS REQUIRED.', 'error');
                return;
            }

            // Email validation (basic)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage('ERROR: INVALID EMAIL FORMAT.', 'error');
                return;
            }

            // Success simulation (replace with actual API call)
            console.log('Form submitted:', data);
            showMessage('MESSAGE SENT. WE\'LL BE IN TOUCH.', 'success');
            contactForm.reset();
        });
    }

    // ============================================
    // MESSAGE DISPLAY
    // ============================================
    function showMessage(text, type) {
        // Remove existing message
        const existing = document.querySelector('.form-message');
        if (existing) {
            existing.remove();
        }

        // Create message element
        const message = document.createElement('div');
        message.className = 'form-message';
        message.textContent = text;
        
        // Style based on type - brutalist style
        message.style.cssText = `
            padding: 16px;
            margin-top: 16px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 1px;
            border: 3px solid;
            text-align: center;
        `;

        if (type === 'error') {
            message.style.backgroundColor = '#FF0000';
            message.style.color = '#FFFFFF';
            message.style.borderColor = '#FF0000';
        } else {
            message.style.backgroundColor = '#000000';
            message.style.color = '#FFFFFF';
            message.style.borderColor = '#000000';
        }

        // Insert after form
        contactForm.appendChild(message);

        // Remove after 5 seconds (no smooth fade - brutalist)
        setTimeout(function() {
            message.remove();
        }, 5000);
    }

    // ============================================
    // MARQUEE DUPLICATION
    // ============================================
    const marqueeContent = document.querySelector('.marquee-content');
    
    if (marqueeContent) {
        // Clone content for seamless loop
        const clone = marqueeContent.cloneNode(true);
        marqueeContent.parentElement.appendChild(clone);
    }

    // ============================================
    // SCROLL REVEAL (MINIMAL)
    // No smooth animations - elements just appear
    // ============================================
    function handleScrollReveal() {
        const reveals = document.querySelectorAll('.stat-box, .service-card, .testimonial-card');
        
        reveals.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'none';
            }
        });
    }

    // Initialize elements as hidden
    const revealElements = document.querySelectorAll('.stat-box, .service-card, .testimonial-card');
    revealElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    });

    // Trigger on scroll (no debounce - raw and direct)
    window.addEventListener('scroll', handleScrollReveal);
    
    // Initial check
    handleScrollReveal();

    // ============================================
    // KEYBOARD NAVIGATION ENHANCEMENT
    // ============================================
    document.addEventListener('keydown', function(e) {
        // ESC closes mobile menu
        if (e.key === 'Escape' && navbar.classList.contains('menu-open')) {
            navbar.classList.remove('menu-open');
            mobileMenuBtn.textContent = '☰';
            mobileMenuBtn.focus();
        }
    });

    // ============================================
    // CONSOLE MESSAGE (BRUTALIST TOUCH)
    // ============================================
    console.log('%c BRUTAL.STUDIO ', 'background: #000; color: #FFF; font-size: 24px; font-weight: bold; padding: 20px;');
    console.log('%c NO FRAMEWORKS. NO GRADIENTS. NO ROUNDED CORNERS. ', 'background: #FF0000; color: #FFF; font-size: 12px; padding: 8px;');
    console.log('%c BUILT WITH RAW HTML, CSS, AND JAVASCRIPT. ', 'background: #0000FF; color: #FFF; font-size: 12px; padding: 8px;');

})();
