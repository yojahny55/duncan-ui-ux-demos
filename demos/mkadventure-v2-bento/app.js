// MK Adventure v2 Bento — Enhanced
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // Language toggle
    const btns = document.querySelectorAll('.lang-btn');
    let lang = localStorage.getItem('mk-lang') || 'es';
    if (lang !== 'es') apply(lang);

    btns.forEach(b => b.addEventListener('click', () => {
        lang = b.dataset.lang;
        apply(lang);
        btns.forEach(x => x.classList.toggle('active', x.dataset.lang === lang));
        localStorage.setItem('mk-lang', lang);
    }));

    function apply(l) {
        document.querySelectorAll('.t').forEach(el => {
            if (el.dataset[l]) el.textContent = el.dataset[l];
        });
        document.documentElement.lang = l;
    }

    // Mobile hamburger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
            hamburger.setAttribute('aria-expanded', navLinks.classList.contains('mobile-open'));
        });
        // Close on link click
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const el = document.querySelector(id);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Lenis smooth scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
    }

    // AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
    }

    // GSAP hero entrance
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.hero-main', { y: 40, opacity: 0, duration: 0.8 })
          .from('.badge', { y: 20, opacity: 0, duration: 0.5 }, '-=0.4')
          .from('.hero-main h1 span', { y: 30, opacity: 0, duration: 0.5, stagger: 0.12 }, '-=0.3')
          .from('.hero-main > p', { y: 20, opacity: 0, duration: 0.4 }, '-=0.2')
          .from('.hero-btns .btn', { y: 15, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.2')
          .from('.hero-preview', { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.3');

        // Nav scroll effect
        gsap.to('.nav-inner', {
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        });
    }
});
