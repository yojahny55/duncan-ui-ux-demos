/**
 * Vibrant & Block-based Design - Interactive JavaScript
 * Bold, energetic, playful interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initMobileMenu();
  initContactForm();
  initParallaxShapes();
  initNavbarScroll();
  initBlockHover();
});

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.block-item, .service-card, .testimonial-card, .section-header'
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered animation delay
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  
  if (!mobileMenu) return;

  mobileMenu.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = mobileMenu.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      
      // Show nav links (if implementing mobile nav)
      if (navLinks) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(13, 13, 13, 0.98)';
        navLinks.style.padding = '2rem';
        navLinks.style.gap = '1.5rem';
      }
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
      
      if (navLinks) {
        navLinks.style.display = '';
      }
    }
  });
}

/**
 * Contact form handling
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Simulate submission
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'var(--electric-purple)';
    
    setTimeout(() => {
      submitBtn.textContent = 'Message Sent! ✓';
      submitBtn.style.background = 'var(--neon-green)';
      
      // Reset form
      setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }, 1500);
  });

  // Input focus effects
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.querySelector('label').style.color = 'var(--neon-green)';
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.querySelector('label').style.color = '';
    });
  });
}

/**
 * Parallax effect on hero shapes
 */
function initParallaxShapes() {
  const shapes = document.querySelectorAll('.shape');
  if (shapes.length === 0) return;

  let ticking = false;

  document.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        shapes.forEach((shape, index) => {
          const speed = (index + 1) * 15;
          const x = mouseX * speed;
          const y = mouseY * speed;
          shape.style.transform = `translate(${x}px, ${y}px)`;
        });

        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Navbar background on scroll
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove solid background
    if (currentScroll > 100) {
      navbar.style.background = 'rgba(5, 5, 5, 0.98)';
      navbar.style.boxShadow = '0 4px 30px rgba(57, 255, 20, 0.2)';
    } else {
      navbar.style.background = 'rgba(13, 13, 13, 0.9)';
      navbar.style.boxShadow = 'none';
    }

    // Hide/show on scroll direction
    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });
}

/**
 * Block hover effects with color shift
 */
function initBlockHover() {
  const blocks = document.querySelectorAll('.block-item');
  
  blocks.forEach(block => {
    block.addEventListener('mouseenter', () => {
      block.style.boxShadow = '0 20px 60px rgba(57, 255, 20, 0.3)';
    });
    
    block.addEventListener('mouseleave', () => {
      block.style.boxShadow = 'none';
    });
  });

  // Service cards ripple effect
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        background: rgba(57, 255, 20, 0.3);
        border-radius: 50%;
        pointer-events: none;
        width: 0;
        height: 0;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out forwards;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        width: 300px;
        height: 300px;
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Smooth scroll for anchor links
 */
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

/**
 * Add counter animation for stats (if present)
 */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

// Console welcome message
console.log('%c🚀 Vibrant & Block-based Design', 'font-size: 20px; font-weight: bold; color: #39FF14;');
console.log('%cBold. Energetic. Unforgettable.', 'font-size: 14px; color: #BF00FF;');
