document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-btn');

    if (menuToggle && closeMenu && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. Sticky Navbar & Active Link Update on Scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Navigation Link Update
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add offset for the fixed header
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // If the href ends with the section id, mark as active
            if (current && link.getAttribute('href').endsWith(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animation using Intersection Observer
    // Select elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    // Prepare elements for animation CSS
    animatedElements.forEach(el => {
        const animationType = el.getAttribute('data-aos');
        el.style.opacity = '0';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        switch (animationType) {
            case 'fade-up':
                el.style.transform = 'translateY(40px)';
                break;
            case 'fade-left': // RTL layout means left is right visually, but CSS transforms apply normally
                el.style.transform = 'translateX(-40px)';
                break;
            case 'fade-right':
                el.style.transform = 'translateX(40px)';
                break;
            case 'zoom-in':
                el.style.transform = 'scale(0.95)';
                break;
            default:
                el.style.transform = 'translateY(20px)';
        }
    });

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translate(0) scale(1)';
                }, delay);
                
                // Stop observing once animated
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => animateOnScroll.observe(el));

    // 4. Set dynamic year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
