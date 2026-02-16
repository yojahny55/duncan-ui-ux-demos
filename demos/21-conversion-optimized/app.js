/**
 * Conversion-Optimized Landing Page
 * Style #21 - Form-focused, urgency elements, high contrast CTAs
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all features
    initCountdown();
    initFormHandling();
    initScrollAnimations();
    initStatCounters();
});

/**
 * Urgency Countdown Timer
 * Creates scarcity to drive conversions
 */
function initCountdown() {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // Set countdown end time (24 hours from now for demo)
    let totalSeconds = 24 * 60 * 60; // 24 hours
    
    function updateCountdown() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            // Reset to create urgency loop
            totalSeconds = 24 * 60 * 60;
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/**
 * Form Handling with Loading States and Success Feedback
 */
function initFormHandling() {
    const form = document.getElementById('signupForm');
    const submitBtn = form.querySelector('.cta-button');
    
    // Real-time validation feedback
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateInput(input);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate API call
        await simulateSubmission();
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        form.reset();
    });
}

/**
 * Input Validation
 */
function validateInput(input) {
    const value = input.value.trim();
    const wrapper = input.closest('.input-wrapper');
    
    // Remove existing states
    wrapper.classList.remove('valid', 'error');
    
    if (input.required && !value) {
        wrapper.classList.add('error');
        return false;
    }
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            wrapper.classList.add('error');
            return false;
        }
    }
    
    if (value) {
        wrapper.classList.add('valid');
    }
    
    return true;
}

/**
 * Simulate API Submission
 */
function simulateSubmission() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
}

/**
 * Success Modal
 */
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    
    // Re-initialize icons for modal
    lucide.createIcons();
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
}

// Close modal on backdrop click
document.getElementById('successModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeModal();
    }
});

// Global function for CTA button
window.closeModal = closeModal;

/**
 * Scroll to Form Function
 */
function scrollToForm() {
    const formCard = document.querySelector('.form-card');
    formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Focus first input after scroll
    setTimeout(() => {
        formCard.querySelector('input').focus();
    }, 500);
}

window.scrollToForm = scrollToForm;

/**
 * Scroll Animations with Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .stat-item, .about-content, .contact-content'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

/**
 * Animated Stat Counters
 */
function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasDollar = text.includes('$');
    const hasPercent = text.includes('%');
    const hasB = text.includes('B');
    const hasK = text.includes('K');
    
    // Extract number
    let num = parseFloat(text.replace(/[^0-9.]/g, ''));
    const duration = 2000;
    const start = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = num * easeOut;
        
        // Format number
        let formatted = '';
        if (hasDollar) formatted += '$';
        
        if (hasB) {
            formatted += current.toFixed(1) + 'B';
        } else if (hasK) {
            formatted += Math.round(current) + 'K';
        } else if (hasPercent) {
            formatted += Math.round(current) + '%';
        } else {
            formatted += Math.round(current).toLocaleString();
        }
        
        if (hasPlus) formatted += '+';
        
        element.textContent = formatted;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Spots Left Counter (Decreasing)
 * Creates urgency by showing limited availability
 */
function updateSpotsLeft() {
    const spotsEl = document.querySelector('.spots-left strong');
    if (!spotsEl) return;
    
    // Randomly decrease spots every few minutes
    setInterval(() => {
        const current = parseInt(spotsEl.textContent.match(/\d+/)[0]);
        if (current > 1) {
            spotsEl.textContent = `Only ${current - 1} spots`;
        }
    }, 180000); // Every 3 minutes
}

/**
 * Add input validation styles
 */
const style = document.createElement('style');
style.textContent = `
    .input-wrapper.error input {
        border-color: var(--error);
    }
    .input-wrapper.error .input-icon {
        color: var(--error);
    }
    .input-wrapper.valid input {
        border-color: var(--success);
    }
    .input-wrapper.valid .input-icon {
        color: var(--success);
    }
`;
document.head.appendChild(style);
