/**
 * Skeuomorphism Demo - Interactive JavaScript
 * Tactile feedback, realistic animations, 3D depth effects
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Initialize all features
  initSmoothScroll();
  initNavbarScroll();
  initMobileMenu();
  initTactileButtons();
  initServiceMeters();
  initPolaroidTilt();
  initFormInteractions();
  initScrollAnimations();
  initCompassAnimation();
});

/**
 * Smooth Scroll for Navigation Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Navbar Background on Scroll
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
      navbar.style.boxShadow = `
        0 8px 16px rgba(0,0,0,0.4),
        0 16px 32px rgba(0,0,0,0.3),
        inset 0 1px 0 rgba(255,255,255,0.1),
        inset 0 -1px 0 rgba(0,0,0,0.3)
      `;
    } else {
      navbar.style.boxShadow = `
        0 4px 8px rgba(0,0,0,0.3),
        0 8px 16px rgba(0,0,0,0.2),
        inset 0 1px 0 rgba(255,255,255,0.1),
        inset 0 -1px 0 rgba(0,0,0,0.3)
      `;
    }
    
    lastScroll = currentScroll;
  });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('mobile-open');
      
      if (isOpen) {
        navLinks.classList.remove('mobile-open');
        navLinks.style.display = 'none';
      } else {
        navLinks.classList.add('mobile-open');
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'linear-gradient(180deg, #4A2E15 0%, #3D2510 100%)';
        navLinks.style.padding = '1rem';
        navLinks.style.gap = '0.5rem';
        navLinks.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
      }
    });
  }
}

/**
 * Tactile Button Press Effects
 */
function initTactileButtons() {
  const buttons = document.querySelectorAll('.leather-btn, .metal-btn');
  
  buttons.forEach(btn => {
    // Tactile press sound simulation via visual feedback
    btn.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(2px) scale(0.98)';
      this.style.transition = 'transform 100ms ease-out';
    });
    
    btn.addEventListener('mouseup', function() {
      this.style.transform = '';
      this.style.transition = 'var(--transition-tactile)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.transition = 'var(--transition-tactile)';
    });

    // Add subtle "click" ripple effect
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: ripple-tactile 500ms ease-out forwards;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 500);
    });
  });

  // Add ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-tactile {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Service Meter Animations
 */
function initServiceMeters() {
  const meters = document.querySelectorAll('.meter-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const meter = entry.target;
        const fill = getComputedStyle(meter).getPropertyValue('--fill');
        
        // Reset and animate
        meter.style.width = '0%';
        meter.style.transition = 'none';
        
        requestAnimationFrame(() => {
          meter.style.transition = 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
          meter.style.width = fill;
        });
        
        observer.unobserve(meter);
      }
    });
  }, { threshold: 0.5 });

  meters.forEach(meter => observer.observe(meter));
}

/**
 * Polaroid Card Tilt Effect
 */
function initPolaroidTilt() {
  const polaroids = document.querySelectorAll('.polaroid-frame');
  
  polaroids.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)
        translateY(-8px)
      `;
    });
    
    card.addEventListener('mouseleave', function() {
      // Return to original rotation
      const index = Array.from(polaroids).indexOf(this);
      let rotation = '-2deg';
      if (index === 1) rotation = '1deg';
      if (index === 2) rotation = '-1deg';
      
      this.style.transform = `rotate(${rotation})`;
    });
  });
}

/**
 * Form Interactions with Tactile Feedback
 */
function initFormInteractions() {
  const inputs = document.querySelectorAll('.form-input');
  const form = document.querySelector('.contact-form');
  
  inputs.forEach(input => {
    // Focus effect - paper "indent"
    input.addEventListener('focus', function() {
      this.style.boxShadow = `
        inset 0 4px 8px rgba(0,0,0,0.1),
        0 0 0 3px rgba(212,175,55,0.3)
      `;
    });
    
    input.addEventListener('blur', function() {
      this.style.boxShadow = `
        inset 0 2px 4px rgba(0,0,0,0.05),
        0 1px 0 rgba(255,255,255,0.8)
      `;
    });

    // Typewriter effect for text
    input.addEventListener('input', function() {
      if (this.value.length > 0) {
        this.style.letterSpacing = '0.5px';
      } else {
        this.style.letterSpacing = 'normal';
      }
    });
  });

  // Form submission
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.submit-btn');
      const originalContent = submitBtn.innerHTML;
      
      // Wax seal animation effect
      submitBtn.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20">
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
          </circle>
        </svg>
        Sending...
      `;
      submitBtn.disabled = true;
      
      // Simulate send
      setTimeout(() => {
        submitBtn.innerHTML = `
          <i data-lucide="check" class="btn-icon"></i>
          Message Sent!
        `;
        submitBtn.style.background = 'linear-gradient(180deg, #27CA41 0%, #1FAE35 100%)';
        lucide.createIcons();
        
        // Reset after delay
        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          lucide.createIcons();
          form.reset();
        }, 2000);
      }, 1500);
    });
  }
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(`
    .hero-content,
    .hero-visual,
    .about-text,
    .about-visual,
    .service-card,
    .polaroid-frame,
    .contact-form-wrapper,
    .contact-info
  `);

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 600ms ease-out, transform 600ms ease-out';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger effect for grid items
        const delay = entry.target.classList.contains('service-card') || 
                     entry.target.classList.contains('polaroid-frame')
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 150
          : 0;

        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Compass Needle Animation Enhancement
 */
function initCompassAnimation() {
  const compass = document.querySelector('.compass-widget');
  
  if (compass) {
    // Add magnetic wobble on hover
    compass.addEventListener('mouseenter', () => {
      const needle = compass.querySelector('.compass-needle');
      if (needle) {
        needle.style.animation = 'needle-wobble 0.5s ease-in-out';
      }
    });

    // Parallax effect based on mouse position
    compass.addEventListener('mousemove', (e) => {
      const rect = compass.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotateX = y / 10;
      const rotateY = -x / 10;
      
      compass.style.transform = `
        perspective(500px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });

    compass.addEventListener('mouseleave', () => {
      compass.style.transform = '';
    });
  }
}

/**
 * Stat Counter Animation
 */
function animateStats() {
  const stats = document.querySelectorAll('.stat-value');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        
        // Extract number
        const num = parseFloat(text.replace(/[^0-9.]/g, ''));
        
        if (!isNaN(num)) {
          let current = 0;
          const increment = num / 50;
          const isDecimal = text.includes('.');
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              current = num;
              clearInterval(timer);
            }
            
            let display = isDecimal ? current.toFixed(1) : Math.floor(current);
            if (hasPlus) display += '+';
            if (hasPercent) display += '%';
            if (text.includes('K')) display = Math.floor(current) + 'K+';
            if (text.includes('/')) display = '24/7';
            
            stat.textContent = display;
          }, 30);
        }
        
        observer.unobserve(stat);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

// Initialize stat animation
document.addEventListener('DOMContentLoaded', animateStats);

/**
 * Add depth shadow on scroll for service cards
 */
function initDepthShadows() {
  const cards = document.querySelectorAll('.service-card');
  
  window.addEventListener('scroll', () => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const cardCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - cardCenter);
      const maxDistance = window.innerHeight / 2;
      const intensity = 1 - Math.min(distance / maxDistance, 1);
      
      const shadowBlur = 8 + intensity * 16;
      const shadowSpread = intensity * 8;
      
      card.style.boxShadow = `
        0 ${4 + intensity * 8}px ${shadowBlur}px rgba(0,0,0,${0.15 + intensity * 0.1}),
        0 ${8 + intensity * 16}px ${shadowBlur * 2}px rgba(0,0,0,${0.1 + intensity * 0.05})
      `;
    });
  });
}

document.addEventListener('DOMContentLoaded', initDepthShadows);
