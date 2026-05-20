// ============================================
// BIG BRAND MARKETING - Main JavaScript
// Premium Animation System (GSAP + Lenis)
// Inspired by reference: animation style only
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ── 0. REDUCED MOTION CHECK ──
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── 1. LENIS SMOOTH SCROLL ──
    let lenis = null;
    if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
        lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
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

    // ── 2. NAVBAR SCROLL EFFECT ──
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ── 3. MOBILE MENU TOGGLE ──
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ── 4. SMOOTH SCROLL FOR ANCHOR LINKS ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                if (lenis) {
                    lenis.scrollTo(target, { offset: -80 });
                } else {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ── 5. GSAP ANIMATION SYSTEM ──
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
        gsap.registerPlugin(ScrollTrigger);

        // ─── 5a. SPLIT TEXT BLUR REVEAL ───
        // Hero title + section titles: blur + opacity + upward movement
        if (typeof SplitType !== 'undefined') {
            // Hero h1 — animate children directly (preserves highlight-gold/purple spans)
            const heroH1 = document.querySelector('.hero h1');
            if (heroH1) {
                // Wrap loose text nodes in spans for animation
                const children = Array.from(heroH1.childNodes);
                children.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                        const wrapper = document.createElement('span');
                        wrapper.className = 'hero-word-wrap';
                        wrapper.style.display = 'inline-block';
                        wrapper.textContent = node.textContent;
                        node.replaceWith(wrapper);
                    }
                });

                // Select all animatable elements (spans, br excluded)
                const heroWords = heroH1.querySelectorAll('span, .hero-word-wrap');
                gsap.from(heroWords, {
                    y: 60,
                    opacity: 0,
                    filter: 'blur(12px)',
                    stagger: 0.12,
                    duration: 1.2,
                    delay: 0.3,
                    ease: 'power4.out'
                });
            }

            // Section heading reveal-text with blur
            document.querySelectorAll('.reveal-text').forEach(el => {
                const text = new SplitType(el, { types: 'words, chars' });
                gsap.from(text.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                    },
                    y: 50,
                    opacity: 0,
                    filter: 'blur(10px)',
                    stagger: 0.015,
                    duration: 0.9,
                    ease: 'power3.out'
                });
            });
        }

        // ─── 5b. HERO BADGE + SUB + BUTTONS ENTRANCE ───
        gsap.from('.hero-badge', {
            opacity: 0, y: 20, filter: 'blur(6px)',
            duration: 0.8, delay: 0.1, ease: 'power3.out'
        });
        gsap.from('.hero-sub', {
            opacity: 0, y: 30, filter: 'blur(6px)',
            duration: 1, delay: 0.6, ease: 'power3.out'
        });
        gsap.from('.hero-buttons', {
            opacity: 0, y: 30, filter: 'blur(4px)',
            duration: 1, delay: 0.8, ease: 'power3.out'
        });

        // ─── 5c. HERO NETWORK VISUAL ANIMATION ───
        const networkCenter = document.querySelector('.network-center');
        const networkNodes = document.querySelectorAll('.network-node');
        const networkLines = document.querySelectorAll('.network-line');

        if (networkCenter) {
            // Animate center logo
            gsap.fromTo(networkCenter,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.2, delay: 0.5, ease: 'back.out(1.7)' }
            );

            // Animate nodes staggered — use y + opacity to avoid transform conflicts
            gsap.fromTo(networkNodes,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    stagger: 0.12,
                    duration: 0.8,
                    delay: 0.9,
                    ease: 'back.out(2)'
                }
            );

            // Animate connector lines
            gsap.fromTo(networkLines,
                { opacity: 0 },
                {
                    opacity: 0.5,
                    stagger: 0.1,
                    duration: 0.6,
                    delay: 1.0,
                    ease: 'power2.out'
                }
            );

            // Continuous floating on network nodes
            networkNodes.forEach((node, i) => {
                gsap.to(node, {
                    y: `${8 + (i % 3) * 4}`,
                    duration: 2.5 + i * 0.3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: i * 0.2,
                });
            });

            // Continuous subtle rotation on center
            gsap.to(networkCenter, {
                rotation: 360,
                duration: 60,
                repeat: -1,
                ease: 'none'
            });
        }

        // ─── 5d. SECTION REVEAL — GENERIC ───
        // Animate each major section with a subtle fade-in
        gsap.utils.toArray('section:not(.hero):not(.marquee-section)').forEach(section => {
            gsap.fromTo(section.querySelectorAll('.section-header > *'), 
                { opacity: 0, y: 30, filter: 'blur(6px)' },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                    },
                    opacity: 1, y: 0, filter: 'blur(0px)',
                    stagger: 0.08,
                    duration: 0.9,
                    ease: 'power2.out'
                }
            );
        });

        // ─── 5e. SERVICE CARDS — STAGGER + GLOW ───
        gsap.fromTo('.svc-card',
            { opacity: 0, y: 80, scale: 0.92 },
            {
                scrollTrigger: {
                    trigger: '.services-grid',
                    start: 'top 85%'
                },
                opacity: 1, y: 0, scale: 1,
                duration: 1.0,
                stagger: { amount: 0.6, from: 'start' },
                ease: 'power4.out'
            }
        );

        // ─── 5f. PORTFOLIO CARDS ───
        gsap.fromTo('.port-card',
            { opacity: 0, y: 80, scale: 0.94 },
            {
                scrollTrigger: {
                    trigger: '.portfolio-grid',
                    start: 'top 85%'
                },
                opacity: 1, y: 0, scale: 1,
                duration: 1.0,
                stagger: { amount: 0.5, from: 'start' },
                ease: 'power4.out'
            }
        );

        // ─── 5g. PROCESS STEPS — STAGGER + CONNECTOR LINE ───
        const processSteps = document.querySelector('.process-steps');
        if (processSteps) {
            // Animate the connector line first
            const connector = document.querySelector('.process-connector-line');
            if (connector) {
                gsap.fromTo(connector,
                    { scaleY: 0 },
                    {
                        scrollTrigger: {
                            trigger: processSteps,
                            start: 'top 80%',
                        },
                        scaleY: 1,
                        transformOrigin: 'top center',
                        duration: 1.5,
                        ease: 'power2.inOut'
                    }
                );
            }

            // Then stagger the steps
            gsap.fromTo('.process-step',
                { opacity: 0, x: 40, filter: 'blur(4px)' },
                {
                    scrollTrigger: {
                        trigger: processSteps,
                        start: 'top 82%'
                    },
                    opacity: 1, x: 0, filter: 'blur(0px)',
                    duration: 0.9,
                    stagger: 0.18,
                    ease: 'power3.out'
                }
            );
        }

        // Founder column
        gsap.fromTo(['.founder-img-box', '.founder-quote'],
            { opacity: 0, y: 50, filter: 'blur(6px)' },
            {
                scrollTrigger: {
                    trigger: '.founder-col',
                    start: 'top 85%'
                },
                opacity: 1, y: 0, filter: 'blur(0px)',
                stagger: 0.2,
                duration: 0.9,
                ease: 'power2.out'
            }
        );

        // ─── 5h. STATS COUNTER ANIMATION ───
        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid) {
            const statNums = document.querySelectorAll('.stat-num');

            // Entrance animation
            gsap.fromTo('.stat-item',
                { opacity: 0, y: 50, scale: 0.9 },
                {
                    scrollTrigger: {
                        trigger: statsGrid,
                        start: 'top 88%',
                        onEnter: () => animateCounters(statNums),
                    },
                    opacity: 1, y: 0, scale: 1,
                    stagger: 0.12,
                    duration: 1,
                    ease: 'back.out(1.4)'
                }
            );
        }

        function animateCounters(elements) {
            elements.forEach(el => {
                const text = el.textContent.trim();
                // Parse the target value
                const hasPlus = text.includes('+');
                const hasSlash = text.includes('/');
                const hasPercent = text.includes('%');

                if (hasSlash) {
                    // e.g., "4.9/5"
                    const parts = text.split('/');
                    const target = parseFloat(parts[0]);
                    const suffix = '/' + parts[1];
                    animateSingleCounter(el, target, suffix, true);
                } else if (hasPercent) {
                    const target = parseInt(text.replace(/[^0-9]/g, ''));
                    animateSingleCounter(el, target, '%', false);
                } else {
                    const target = parseInt(text.replace(/[^0-9]/g, ''));
                    const suffix = hasPlus ? '+' : '';
                    animateSingleCounter(el, target, suffix, false);
                }
            });
        }

        function animateSingleCounter(el, target, suffix, isDecimal) {
            const obj = { val: 0 };
            gsap.to(obj, {
                val: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => {
                    if (isDecimal) {
                        el.textContent = obj.val.toFixed(1) + suffix;
                    } else {
                        el.textContent = Math.round(obj.val) + suffix;
                    }
                }
            });
        }

        // ─── 5i. CASE STUDY ───
        gsap.fromTo('.case-card',
            { opacity: 0, y: 60, filter: 'blur(4px)' },
            {
                scrollTrigger: {
                    trigger: '.case-study',
                    start: 'top 80%'
                },
                opacity: 1, y: 0, filter: 'blur(0px)',
                duration: 1,
                ease: 'power2.out'
            }
        );

        // ─── 5j. PRICING — TABS + PANELS ───
        gsap.utils.toArray('.pricing-tab').forEach((tab, index) => {
            gsap.fromTo(tab,
                { opacity: 0, x: -30, filter: 'blur(4px)' },
                {
                    scrollTrigger: {
                        trigger: '.pricing-tabs-col',
                        start: 'top 85%'
                    },
                    opacity: 1, x: 0, filter: 'blur(0px)',
                    delay: index * 0.1,
                    duration: 0.8,
                    ease: 'power2.out'
                }
            );
        });

        gsap.fromTo('.pricing-panel.active',
            { opacity: 0, x: 30, filter: 'blur(4px)' },
            {
                scrollTrigger: {
                    trigger: '.pricing-content-col',
                    start: 'top 85%'
                },
                opacity: 1, x: 0, filter: 'blur(0px)',
                duration: 0.8,
                ease: 'power2.out'
            }
        );

        // ─── 5k. FAQ ITEMS — STAGGER REVEAL ───
        gsap.fromTo('.faq-item',
            { opacity: 0, y: 30, filter: 'blur(3px)' },
            {
                scrollTrigger: {
                    trigger: '.faq-wrapper',
                    start: 'top 85%'
                },
                opacity: 1, y: 0, filter: 'blur(0px)',
                stagger: 0.08,
                duration: 0.7,
                ease: 'power2.out'
            }
        );

        // ─── 5l. UGC VIDEO CARDS — STAGGER + PLAY PULSE ───
        gsap.fromTo('.ugc-card',
            { opacity: 0, y: 100, scale: 0.9 },
            {
                scrollTrigger: {
                    trigger: '.ugc-grid',
                    start: 'top 85%'
                },
                opacity: 1, y: 0, scale: 1,
                stagger: 0.15,
                duration: 1.2,
                ease: 'power4.out'
            }
        );

        // ─── 5m. WHY CARDS — 3D STAGGER ───
        gsap.fromTo('.why-card',
            { opacity: 0, y: 60, scale: 0.94 },
            {
                scrollTrigger: {
                    trigger: '.why-grid',
                    start: 'top 85%'
                },
                opacity: 1, y: 0, scale: 1,
                stagger: { amount: 0.5, from: 'start' },
                duration: 1.0,
                ease: 'power4.out'
            }
        );

        // ─── 5n. REVIEW CARDS — STAGGER ───
        gsap.fromTo('.review-card',
            { opacity: 0, y: 50, scale: 0.95, filter: 'blur(3px)' },
            {
                scrollTrigger: {
                    trigger: '.reviews-grid',
                    start: 'top 85%'
                },
                opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
                stagger: 0.15,
                duration: 1,
                ease: 'power3.out'
            }
        );

        // ─── 5o. CONTACT COLUMNS ───
        gsap.fromTo('.contact-info-col',
            { opacity: 0, x: -50, filter: 'blur(6px)' },
            {
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 80%'
                },
                opacity: 1, x: 0, filter: 'blur(0px)',
                duration: 0.8,
                ease: 'power2.out'
            }
        );

        gsap.fromTo('.contact-form-col',
            { opacity: 0, x: 50, filter: 'blur(6px)' },
            {
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 80%'
                },
                opacity: 1, x: 0, filter: 'blur(0px)',
                duration: 0.8,
                ease: 'power2.out'
            }
        );

        // ─── 5p. FOOTER COLUMNS ───
        gsap.utils.toArray('.footer-col').forEach((col, index) => {
            gsap.fromTo(col,
                { opacity: 0, y: 30 },
                {
                    scrollTrigger: {
                        trigger: '.footer-grid',
                        start: 'top 90%'
                    },
                    opacity: 1, y: 0,
                    delay: index * 0.1,
                    duration: 0.8,
                    ease: 'power2.out'
                }
            );
        });

        // ─── 5q. SERVICE CARDS 3D TILT & CURSOR SPOTLIGHT ───
        const svcCards = document.querySelectorAll('.svc-card');
        svcCards.forEach(card => {
            const inner = card.querySelector('.svc-card-inner');
            if (!inner) return;

            // Dynamically inject the card spotlight container as the first child
            const spotlight = document.createElement('div');
            spotlight.className = 'card-spotlight';
            inner.insertBefore(spotlight, inner.firstChild);

            // Track mouse movements over each card
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // cursor x relative to card
                const y = e.clientY - rect.top;  // cursor y relative to card

                // Smoothly update spotlight position
                gsap.to(spotlight, {
                    left: x,
                    top: y,
                    duration: 0.15,
                    ease: 'power2.out'
                });

                // Calculate tilt angles based on mouse offset from center of card
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Max tilt angle of 6 degrees for a clean, professional aesthetic
                const rotateX = -((y - centerY) / centerY) * 6;
                const rotateY = ((x - centerX) / centerX) * 6;

                // Rotate the card inner container in 3D
                gsap.to(inner, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformPerspective: 1000,
                    ease: 'power2.out',
                    duration: 0.3
                });
            });

            // Smoothly restore default rotation and hide spotlight on mouse leave
            card.addEventListener('mouseleave', () => {
                gsap.to(inner, {
                    rotateX: 0,
                    rotateY: 0,
                    ease: 'power3.out',
                    duration: 0.7
                });
            });
        });

        // ─── 5r. REFRESH ON LOAD ───
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });
    }

    // ── 6. MARQUEE — SLOW SMOOTH INFINITE ──
    const marqueeContent = document.getElementById('marquee-content');
    if (marqueeContent) {
        // Clone content for seamless loop
        const clone = marqueeContent.innerHTML;
        marqueeContent.innerHTML += clone;
    }

    // ── 7. PRICING TAB SWITCHING ──
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

    // ── 8. FAQ ACCORDION ──
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const faqItem = header.parentElement;
            const faqBody = header.nextElementSibling;

            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-body').style.maxHeight = 0;
                }
            });

            faqItem.classList.toggle('active');

            if (faqItem.classList.contains('active')) {
                faqBody.style.maxHeight = faqBody.scrollHeight + 'px';
            } else {
                faqBody.style.maxHeight = 0;
            }
        });
    });

    // ── 9. CONTACT FORM HANDLING ──
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('formName').value;
            const toast = document.createElement('div');
            toast.className = 'toast-success';
            toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>Thank you, <strong>${name}</strong>! Your proposal request has been received. Our team will WhatsApp you shortly.</span>`;

            document.body.appendChild(toast);
            leadForm.reset();

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
