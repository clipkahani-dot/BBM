// ============================================
// BIG BRAND MARKETING - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // 0. LENIS SMOOTH SCROLL INIT
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            smooth: true,
        });

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        } else {
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }
    }

    // 1. NAVBAR SCROLL EFFECT
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. MOBILE MENU TOGGLE
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // 3. SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 4. GSAP SCROLL ANIMATIONS
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // SPLIT TYPE TEXT REVEAL ANIMATIONS
        if (typeof SplitType !== 'undefined') {
            const splitElements = document.querySelectorAll('.reveal-text');
            
            splitElements.forEach(el => {
                // Split text into lines, words, chars
                const text = new SplitType(el, { types: 'lines, words, chars' });
                
                // Animate chars sliding up and fading in
                gsap.from(text.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                    },
                    y: 40,
                    opacity: 0,
                    rotateX: -40,
                    stagger: 0.02,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });
        }

        // Animate Hero Section
        gsap.from(".hero-content > *", {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".hero-mockup-card, .mockup-profile", {
            opacity: 0,
            y: 50,
            stagger: 0.15,
            duration: 1,
            delay: 0.3,
            ease: "power3.out"
        });

        // Animate Section Headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.fromTo(header.children, 
                { opacity: 0, y: 30 },
                {
                    scrollTrigger: {
                        trigger: header,
                        start: "top 85%"
                    },
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power2.out"
                }
            );
        });

        // Animate Service Cards (Staggered 3D Reveal)
        gsap.fromTo(".svc-card", 
            { opacity: 0, y: 80, scale: 0.9, rotation: 1 },
            {
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 85%"
                },
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out"
            }
        );

        // Animate Portfolio Cards (Staggered Smooth Reveal)
        gsap.fromTo(".port-card", 
            { opacity: 0, y: 100, scale: 0.94, rotation: 0.5 },
            {
                scrollTrigger: {
                    trigger: ".portfolio-grid",
                    start: "top 85%"
                },
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out"
            }
        );

        // Animate Process Steps (Staggered Slide Reveal)
        gsap.fromTo(".process-step", 
            { opacity: 0, x: 50, y: 20, rotation: 0.5 },
            {
                scrollTrigger: {
                    trigger: ".process-steps",
                    start: "top 85%"
                },
                opacity: 1,
                x: 0,
                y: 0,
                rotation: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            }
        );

        // Animate Founder Box
        gsap.fromTo([".founder-img-box", ".founder-quote"], 
            { opacity: 0, y: 40 },
            {
                scrollTrigger: {
                    trigger: ".founder-col",
                    start: "top 85%"
                },
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out"
            }
        );

        // Animate Stats (Staggered Counter Entrance)
        gsap.fromTo(".stat-item", 
            { opacity: 0, y: 50, scale: 0.95 },
            {
                scrollTrigger: {
                    trigger: ".stats-grid",
                    start: "top 85%"
                },
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.1,
                duration: 1,
                ease: "back.out(1.2)"
            }
        );
        
        // Animate Case Study
        gsap.fromTo(".case-card", 
            { opacity: 0, y: 50 },
            {
                scrollTrigger: {
                    trigger: ".case-study",
                    start: "top 80%"
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }
        );

        // Animate Pricing Tabs
        gsap.utils.toArray(".pricing-tab").forEach((tab, index) => {
            gsap.fromTo(tab, 
                { opacity: 0, x: -30 },
                {
                    scrollTrigger: {
                        trigger: ".pricing-tabs-col",
                        start: "top 85%"
                    },
                    opacity: 1,
                    x: 0,
                    delay: index * 0.1,
                    duration: 0.8,
                    ease: "power2.out"
                }
            );
        });

        // Animate Pricing Panel
        gsap.fromTo(".pricing-panel.active", 
            { opacity: 0, x: 30 },
            {
                scrollTrigger: {
                    trigger: ".pricing-content-col",
                    start: "top 85%"
                },
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
            }
        );

        // Animate FAQ Items (Staggered Reveal)
        gsap.fromTo(".faq-item", 
            { opacity: 0, y: 40 },
            {
                scrollTrigger: {
                    trigger: ".faq-wrapper",
                    start: "top 85%"
                },
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out"
            }
        );

        // Animate UGC Cards (Staggered Elastic Entrance)
        gsap.fromTo(".ugc-card", 
            { opacity: 0, y: 100, scale: 0.92 },
            {
                scrollTrigger: {
                    trigger: ".ugc-grid",
                    start: "top 85%"
                },
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.15,
                duration: 1.2,
                ease: "power4.out"
            }
        );

        // Animate Why Cards (Staggered 3D Tilts)
        gsap.fromTo(".why-card", 
            { opacity: 0, y: 60, scale: 0.94, rotation: 1 },
            {
                scrollTrigger: {
                    trigger: ".why-grid",
                    start: "top 85%"
                },
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                stagger: 0.15,
                duration: 1.2,
                ease: "power4.out"
            }
        );

        // Animate Review Cards (Staggered Smooth Entrance)
        gsap.fromTo(".review-card", 
            { opacity: 0, y: 50, scale: 0.95 },
            {
                scrollTrigger: {
                    trigger: ".reviews-grid",
                    start: "top 85%"
                },
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out"
            }
        );

        // Recalculate ScrollTrigger positions once everything is loaded
        window.addEventListener("load", () => {
            ScrollTrigger.refresh();
        });

        // Animate Contact Columns
        gsap.fromTo(".contact-info-col", 
            { opacity: 0, x: -50 },
            {
                scrollTrigger: {
                    trigger: ".contact-section",
                    start: "top 80%"
                },
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
            }
        );

        gsap.fromTo(".contact-form-col", 
            { opacity: 0, x: 50 },
            {
                scrollTrigger: {
                    trigger: ".contact-section",
                    start: "top 80%"
                },
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
            }
        );

        // Animate Footer Columns
        gsap.utils.toArray(".footer-col").forEach((col, index) => {
            gsap.fromTo(col, 
                { opacity: 0, y: 30 },
                {
                    scrollTrigger: {
                        trigger: ".footer-grid",
                        start: "top 90%"
                    },
                    opacity: 1,
                    y: 0,
                    delay: index * 0.1,
                    duration: 0.8,
                    ease: "power2.out"
                }
            );
        });
    }

    // 5. PRICING TAB SWITCHING
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const pricingPanels = document.querySelectorAll('.pricing-panel');

    pricingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            pricingTabs.forEach(t => t.classList.remove('active'));
            pricingPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');

            const targetId = tab.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // 6. FAQ ACCORDION LOGIC
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const faqItem = header.parentElement;
            const faqBody = header.nextElementSibling;
            
            // Close other open items (optional, makes it an accordion)
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if(item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-body').style.maxHeight = 0;
                }
            });

            // Toggle current item
            faqItem.classList.toggle('active');

            if (faqItem.classList.contains('active')) {
                faqBody.style.maxHeight = faqBody.scrollHeight + "px";
            } else {
                faqBody.style.maxHeight = 0;
            }
        });
    });

    // 7. INFINITE MARQUEE CLONE
    const marqueeContent = document.getElementById('marquee-content');
    if (marqueeContent) {
        // Clone the content to make it scroll seamlessly
        const clone = marqueeContent.innerHTML;
        marqueeContent.innerHTML += clone;
    }

    // 8. CONTACT FORM HANDLING
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Display dynamic premium toast message
            const name = document.getElementById('formName').value;
            const toast = document.createElement('div');
            toast.className = 'toast-success';
            toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>Thank you, <strong>${name}</strong>! Your proposal request has been received. Our team will WhatsApp you shortly.</span>`;
            
            document.body.appendChild(toast);
            
            // Reset Form
            leadForm.reset();
            
            // Fade out and remove toast after 5 seconds
            setTimeout(() => {
                toast.style.transition = 'opacity 0.5s ease';
                toast.style.opacity = '0';
                setTimeout(() => {
                    toast.remove();
                }, 500);
            }, 5000);
        });
    }

});
