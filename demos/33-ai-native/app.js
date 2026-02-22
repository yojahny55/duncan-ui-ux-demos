// AI-Native UI - Interactive Demo
// Style 33: Chatbot, conversational, minimal chrome, streaming text

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Chat functionality
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const contactForm = document.getElementById('contactForm');

    // AI responses based on keywords
    const aiResponses = {
        services: "We offer Conversational AI, Voice Assistants, Agentic Workflows, and Knowledge Base solutions. Each is designed to integrate seamlessly with your existing systems. Would you like details on any specific service?",
        pricing: "Our pricing is based on usage and scale. We have plans starting from $99/month for startups, up to enterprise custom solutions. Shall I connect you with our sales team for a personalized quote?",
        demo: "I'd love to show you a live demo! You can either continue chatting with me here, or book a call with our team for a personalized walkthrough. What works better for you?",
        help: "I'm here to help! You can ask me about our services, pricing, technical capabilities, or anything else. What would you like to know?",
        integration: "NexusAI integrates with most popular platforms through our REST API, SDKs for Python, JavaScript, and Go, plus native connectors for Slack, Teams, and more. What platform are you looking to integrate with?",
        default: [
            "That's an interesting question! Let me help you with that. Could you tell me more about your specific use case?",
            "I'd be happy to assist. Based on what you're asking, I think our Conversational AI solution might be a great fit. Want me to explain more?",
            "Great question! Our AI is designed to handle exactly these kinds of requests. What specific outcome are you hoping to achieve?",
            "I understand what you're looking for. Let me suggest a few options that might work for your needs."
        ]
    };

    // Add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = isUser ? '<i data-lucide="user"></i>' : '<i data-lucide="bot"></i>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const messagePara = document.createElement('p');
        messagePara.textContent = content;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = 'Just now';

        contentDiv.appendChild(messagePara);
        contentDiv.appendChild(timeSpan);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        chatMessages.appendChild(messageDiv);
        
        // Re-init icons for new messages
        lucide.createIcons();
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add typing indicator
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai';
        typingDiv.id = 'typingIndicator';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = '<i data-lucide="bot"></i>';

        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'typing-indicator';
        indicatorDiv.innerHTML = '<span></span><span></span><span></span>';

        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(indicatorDiv);
        chatMessages.appendChild(typingDiv);
        
        lucide.createIcons();
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Get AI response based on message content
    function getAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
            return aiResponses.services;
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
            return aiResponses.pricing;
        } else if (lowerMessage.includes('demo') || lowerMessage.includes('try')) {
            return aiResponses.demo;
        } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
            return aiResponses.help;
        } else if (lowerMessage.includes('integrat') || lowerMessage.includes('api') || lowerMessage.includes('connect')) {
            return aiResponses.integration;
        } else {
            // Return random default response
            const defaults = aiResponses.default;
            return defaults[Math.floor(Math.random() * defaults.length)];
        }
    }

    // Simulate streaming text effect
    function streamText(element, text, callback) {
        let index = 0;
        const speed = 20; // ms per character
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        
        type();
    }

    // Add message with streaming effect
    function addStreamingMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = '<i data-lucide="bot"></i>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const messagePara = document.createElement('p');
        messagePara.textContent = '';
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.style.opacity = '0';
        timeSpan.textContent = 'Just now';

        contentDiv.appendChild(messagePara);
        contentDiv.appendChild(timeSpan);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        chatMessages.appendChild(messageDiv);
        lucide.createIcons();

        // Stream the text
        streamText(messagePara, content, () => {
            timeSpan.style.opacity = '1';
        });
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle send message
    function handleSendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        chatInput.value = '';

        // Remove any existing context cards
        const contextCards = chatMessages.querySelectorAll('.context-card');
        contextCards.forEach(card => card.remove());

        // Show typing indicator
        setTimeout(() => {
            addTypingIndicator();
        }, 300);

        // Get AI response after delay
        setTimeout(() => {
            removeTypingIndicator();
            const response = getAIResponse(message);
            addStreamingMessage(response);
        }, 1500 + Math.random() * 1000);
    }

    // Event listeners
    sendBtn.addEventListener('click', handleSendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Voice button animation
    const voiceBtn = document.querySelector('.voice-btn');
    voiceBtn.addEventListener('click', () => {
        voiceBtn.style.color = 'var(--ai-purple)';
        setTimeout(() => {
            voiceBtn.style.color = '';
        }, 1000);
    });

    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i data-lucide="check"></i><span>Message Sent!</span>';
                submitBtn.style.background = 'var(--success)';
                lucide.createIcons();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                    lucide.createIcons();
                }, 2000);
            }, 1500);
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // Intersection Observer for reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply initial styles and observe elements
    const animatedElements = document.querySelectorAll('.about-card, .service-card, .testimonial-card, .contact-method');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.querySelector('i').setAttribute('data-lucide', 
                navMenu.classList.contains('active') ? 'x' : 'menu'
            );
            lucide.createIcons();
        });
    }
});
