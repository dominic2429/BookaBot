/* ========================================
   BOOKABOT — INTERACTIVE SCRIPTS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile Nav Toggle ----
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // ---- CSS Parallax for Hero BG Text ----
    const heroBgText = document.querySelector('.hero-bg-text');

    if (heroBgText) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const rate = scrollY * 0.4; // Slightly faster for impact
            // Reversed: it now moves downwards as you scroll down
            heroBgText.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
        }, { passive: true });
    }

    // ---- Intersection Observer: Reveal on Scroll ----
    const revealElements = document.querySelectorAll(
        '.feature-card, .event-card, .robot-info, .robot-image-placeholder, .booking-card, .section-eyebrow, .section-title, .hero-content, .hero-visual, .cta-title, .cta-desc, .btn-accent'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // ---- Staggered animation for grid items ----
    const staggerGrids = document.querySelectorAll('.features-grid, .events-grid');
    staggerGrids.forEach(grid => {
        const cards = grid.children;
        Array.from(cards).forEach((card, i) => {
            card.style.transitionDelay = `${i * 80}ms`;
        });
    });

    // ---- Initialize Flatpickr ----
    if (typeof flatpickr !== 'undefined') {
        flatpickr("#event-date", {
            dateFormat: "d-m-Y",
            minDate: "today",
            disableMobile: "true"
        });
    }

    // ---- Custom Glassmorphism Select ----
    const customSelectWrapper = document.querySelector('.custom-select-wrapper');
    if (customSelectWrapper) {
        const selectElement = customSelectWrapper.querySelector('select');

        // Hide native select
        selectElement.style.display = 'none';

        // Create custom UI
        const customSelect = document.createElement('div');
        customSelect.className = 'custom-select';

        const customSelected = document.createElement('div');
        customSelected.className = 'custom-select-trigger';
        customSelected.textContent = selectElement.options[selectElement.selectedIndex].text;

        const customOptionsContainer = document.createElement('div');
        customOptionsContainer.className = 'custom-options';

        // Generate options
        Array.from(selectElement.options).forEach((option, index) => {
            if (index === 0) return; // Skip placeholder text in the dropdown list

            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.textContent = option.text;
            customOption.dataset.value = option.value;

            if (selectElement.value === option.value) {
                customOption.classList.add('selected');
            }

            customOption.addEventListener('click', function (e) {
                e.stopPropagation();
                customSelected.textContent = this.textContent;
                selectElement.value = this.dataset.value;
                customSelect.classList.remove('open');

                customOptionsContainer.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
            customOptionsContainer.appendChild(customOption);
        });

        customSelect.appendChild(customSelected);
        customSelect.appendChild(customOptionsContainer);
        customSelectWrapper.appendChild(customSelect);

        // Toggle dropdown
        customSelected.addEventListener('click', function (e) {
            e.stopPropagation();
            customSelect.classList.toggle('open');
        });

        // Close on outside click
        document.addEventListener('click', function () {
            customSelect.classList.remove('open');
        });
    }

    // ---- Smooth Scroll for anchor links (fallback) ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 72;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

});
