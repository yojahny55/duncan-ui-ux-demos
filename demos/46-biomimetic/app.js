/**
 * BIOMIMETIC / ORGANIC 2.0 - UI/UX Demo
 * Nature-inspired, cellular, fluid, breathing, generative
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all biomimetic systems
    initFloatingCells();
    initCellCluster();
    initBioNetwork();
    initNavbar();
    initContactForm();
    initScrollAnimations();
    initParallaxCells();
});

/**
 * Floating Background Cells
 * Creates organic floating cell organisms in the background
 */
function initFloatingCells() {
    const container = document.getElementById('cellsContainer');
    if (!container) return;
    
    const cellCount = window.innerWidth < 768 ? 8 : 15;
    
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div');
        cell.className = 'floating-cell';
        
        // Random size
        const size = Math.random() * 200 + 100;
        cell.style.width = `${size}px`;
        cell.style.height = `${size}px`;
        
        // Random position
        cell.style.left = `${Math.random() * 100}%`;
        cell.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay and duration
        cell.style.animationDelay = `${Math.random() * 8}s`;
        cell.style.animationDuration = `${8 + Math.random() * 8}s`;
        
        // Random color variation
        const hue = Math.random() > 0.5 ? 140 : 190; // Green or cyan
        cell.style.background = `radial-gradient(circle at 30% 30%, 
            hsla(${hue}, 100%, 50%, 0.3), 
            transparent 70%)`;
        
        container.appendChild(cell);
    }
}

/**
 * Cell Cluster Animation
 * Creates an organic cluster of cells in the hero section
 */
function initCellCluster() {
    const cluster = document.getElementById('cellCluster');
    if (!cluster) return;
    
    const cellCount = 12;
    const centerX = 50;
    const centerY = 50;
    
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div');
        cell.className = 'cluster-cell';
        
        // Position in a rough circle with organic variation
        const angle = (i / cellCount) * Math.PI * 2 + Math.random() * 0.5;
        const radius = 25 + Math.random() * 15;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Size variation
        const size = 60 + Math.random() * 80;
        
        cell.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            transform: translate(-50%, -50%);
            animation-delay: ${i * 0.3}s;
        `;
        
        cluster.appendChild(cell);
    }
    
    // Add DNA helix strands
    const helix = document.getElementById('dnaHelix');
    if (helix) {
        for (let i = 0; i < 2; i++) {
            const strand = document.createElement('div');
            strand.className = 'dna-strand';
            strand.style.animationDelay = `${i * 3}s`;
            strand.style.left = `${45 + i * 10}%`;
            helix.appendChild(strand);
        }
    }
}

/**
 * Bio Network Visualization
 * Creates a neural network-like visualization
 */
function initBioNetwork() {
    const network = document.getElementById('bioNetwork');
    if (!network) return;
    
    const nodes = [];
    const nodeCount = 8;
    const containerSize = network.offsetWidth || 400;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = containerSize * 0.35;
        const x = containerSize / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 40;
        const y = containerSize / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 40;
        
        nodes.push({ x, y });
        
        const node = document.createElement('div');
        node.className = 'network-node';
        node.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
            animation-delay: ${i * 0.4}s;
        `;
        network.appendChild(node);
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
        const connections = Math.floor(Math.random() * 2) + 1;
        for (let j = 0; j < connections; j++) {
            const targetIndex = (i + j + 1) % nodes.length;
            const target = nodes[targetIndex];
            
            const connection = createConnection(nodes[i], target);
            network.appendChild(connection);
        }
    }
    
    // Add center node
    const centerNode = document.createElement('div');
    centerNode.className = 'network-node';
    centerNode.style.cssText = `
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, var(--chlorophyll-green), var(--bioluminescent-blue));
    `;
    network.appendChild(centerNode);
    
    // Connect center to outer nodes
    const centerPos = { x: containerSize / 2, y: containerSize / 2 };
    nodes.forEach((node, i) => {
        if (i % 2 === 0) {
            const connection = createConnection(centerPos, node);
            network.appendChild(connection);
        }
    });
}

/**
 * Create a connection line between two points
 */
function createConnection(from, to) {
    const connection = document.createElement('div');
    connection.className = 'network-connection';
    
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    connection.style.cssText = `
        left: ${from.x}px;
        top: ${from.y}px;
        width: ${length}px;
        transform: rotate(${angle}deg);
    `;
    
    return connection;
}

/**
 * Navbar Scroll Effect
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(0, 13, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 13, 26, 0.8)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

/**
 * Contact Form Handler
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Simulate submission
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Growing...';
        submitBtn.disabled = true;
        lucide.createIcons();
        
        // Add spinning animation
        const loader = submitBtn.querySelector('i');
        if (loader) {
            loader.style.animation = 'spin 1s linear infinite';
        }
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i data-lucide="check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #00FF41, #00D4FF)';
            lucide.createIcons();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
                lucide.createIcons();
            }, 2000);
        }, 1500);
    });
}

/**
 * Scroll Animations using Intersection Observer
 */
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
                
                // Animate children with stagger
                const children = entry.target.querySelectorAll('.service-card, .testimonial-card, .feature-cell');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.services, .testimonials, .about, .contact');
    sections.forEach(section => observer.observe(section));
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .feature-cell');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

/**
 * Parallax Effect for Floating Cells
 */
function initParallaxCells() {
    const cells = document.querySelectorAll('.floating-cell');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        cells.forEach((cell, index) => {
            const speed = (index % 3 + 1) * 10;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            cell.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

/**
 * Smooth Scroll for Navigation Links
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
 * Add CSS for spin animation
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .spin {
        animation: spin 1s linear infinite;
    }
    
    .animate-in {
        opacity: 1 !important;
    }
    
    /* Mobile Nav */
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(0, 13, 26, 0.98);
            padding: 1.5rem;
            border-bottom: 1px solid rgba(0, 212, 255, 0.15);
            gap: 1rem;
        }
    }
`;
document.head.appendChild(style);

/**
 * Organic Morphing Animation
 * Adds subtle morphing effect to elements
 */
function addOrganicMorph() {
    const morphElements = document.querySelectorAll('.service-icon, .author-avatar, .contact-icon');
    
    morphElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.borderRadius = `${30 + Math.random() * 20}% ${30 + Math.random() * 20}% ${30 + Math.random() * 20}% ${30 + Math.random() * 20}%`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.borderRadius = '50%';
        });
    });
}

// Initialize organic morphing
addOrganicMorph();

/**
 * Bioluminescent Glow Effect
 * Adds dynamic glow on cursor proximity
 */
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.service-card, .testimonial-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--glow-x', `${x}px`);
        card.style.setProperty('--glow-y', `${y}px`);
    });
});
