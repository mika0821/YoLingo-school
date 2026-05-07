// YoLingo shared UI behavior
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function closeMenu(navLinks, menuToggle) {
        if (!navLinks || !menuToggle) return;
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        document.body.classList.remove('menu-open');
    }

    function initNavigation() {
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        const navbar = document.getElementById('mainNav');
        if (!menuToggle || !navLinks) return;

        menuToggle.addEventListener('click', function (event) {
            event.stopPropagation();
            const isOpen = navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-times', isOpen);
            }
            document.body.classList.toggle('menu-open', isOpen);
        });

        navLinks.querySelectorAll('a').forEach(function (item) {
            item.addEventListener('click', function () {
                closeMenu(navLinks, menuToggle);
            });
        });

        document.addEventListener('click', function (event) {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                closeMenu(navLinks, menuToggle);
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu(navLinks, menuToggle);
            }
        });

        if (navbar) {
            const updateNavbar = function () {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            };
            updateNavbar();
            window.addEventListener('scroll', updateNavbar, { passive: true });
        }
    }

    function initRevealAnimations() {
        if (prefersReducedMotion || !('IntersectionObserver' in window)) return;
        const revealItems = document.querySelectorAll('.feature, .language-card, .benefit, .level, .plan, .contact-method');
        if (!revealItems.length) return;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

        revealItems.forEach(function (item) {
            item.classList.add('reveal-item');
            observer.observe(item);
        });
    }

    function initFaq() {
        document.querySelectorAll('.faq-item').forEach(function (item) {
            item.setAttribute('tabindex', '0');
            item.addEventListener('click', function () {
                document.querySelectorAll('.faq-item.active').forEach(function (other) {
                    if (other !== item) other.classList.remove('active');
                });
                item.classList.toggle('active');
            });
            item.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    item.click();
                }
            });
        });
    }

    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const messageField = document.getElementById('message');
        const charCount = document.getElementById('charCount');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        const loadingMessage = document.getElementById('loadingMessage');

        const updateCounter = function () {
            if (!messageField || !charCount) return;
            charCount.textContent = messageField.value.length;
            charCount.style.color = messageField.value.length > 900 ? 'var(--warning)' : 'var(--text-tertiary)';
        };

        if (messageField) {
            messageField.addEventListener('input', updateCounter);
        }

        const urlParams = new URLSearchParams(window.location.search);
        const language = urlParams.get('language');
        const plan = urlParams.get('plan');
        const service = urlParams.get('service');
        const languageSelect = document.getElementById('language');

        if (language && languageSelect) languageSelect.value = language;
        if ((plan || service) && messageField && !messageField.value) {
            const cleanValue = (plan || service).replace(/-/g, ' ');
            messageField.value = `I'm interested in the ${cleanValue} option.

`;
            updateCounter();
        }

        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
            }
            if (loadingMessage) loadingMessage.style.display = 'block';
            if (successMessage) successMessage.style.display = 'none';
            if (errorMessage) errorMessage.style.display = 'none';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (!response.ok) throw new Error('Form submission failed');

                if (loadingMessage) loadingMessage.style.display = 'none';
                if (successMessage) successMessage.style.display = 'block';
                contactForm.reset();
                updateCounter();
                window.setTimeout(function () {
                    window.location.href = 'thank-you.html';
                }, 1500);
            } catch (error) {
                if (loadingMessage) loadingMessage.style.display = 'none';
                if (errorMessage) errorMessage.style.display = 'block';
            } finally {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message & Start Your Journey';
                    submitBtn.disabled = false;
                }
            }
        });

        updateCounter();
    }

    function initThankYouCountdown() {
        const timer = document.getElementById('timer');
        const countdownContainer = document.querySelector('.countdown-container');
        if (!timer) return;

        let countdownTime = parseInt(timer.textContent, 10) || 15;
        let countdownInterval;

        const startCountdown = function () {
            window.clearInterval(countdownInterval);
            countdownInterval = window.setInterval(function () {
                countdownTime -= 1;
                timer.textContent = countdownTime;
                if (countdownTime <= 0) {
                    window.clearInterval(countdownInterval);
                    window.location.href = 'index.html';
                }
            }, 1000);
        };

        startCountdown();

        if (countdownContainer) {
            countdownContainer.addEventListener('mouseenter', function () {
                window.clearInterval(countdownInterval);
            });
            countdownContainer.addEventListener('mouseleave', startCountdown);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        initNavigation();
        initRevealAnimations();
        initFaq();
        initContactForm();
        initThankYouCountdown();
    });
}());
