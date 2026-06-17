/**
 * 🎈 PartyPop Celebrations - Core JS
 * ✨ Vanilla JavaScript ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
    // 🌍 RTL & Theme systems
    initRTL();
    initTheme();

    // 🎬 Loaded class trigger
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 400);

    // 🎈 Dynamic Balloons
    initBalloons();

    // 🎊 Dynamic Confetti
    initConfetti();

    // 📈 Counters
    initCounters();

    // 🎡 Scroll Reveal Observer
    initScrollAnimations();

    // 🔗 Navigation Actions
    initActiveNav();
    initNavbarScroll();

    // 📸 Lightbox Gallery with Filter System
    initGallery();

    // ⏳ Countdown timer
    initCountdown();

    // 🚀 Back To Top Button
    initBackToTop();
});

/**
 * 🌍 RTL SYSTEM
 */
function initRTL() {
    const rtlToggle = document.getElementById('rtl-toggle');
    const htmlTag = document.documentElement;
    const currentDir = localStorage.getItem('partypop-dir') || 'ltr';

    htmlTag.setAttribute('dir', currentDir);
    if (rtlToggle) rtlToggle.checked = (currentDir === 'rtl');

    if (rtlToggle) {
        rtlToggle.addEventListener('change', (e) => {
            const newDir = e.target.checked ? 'rtl' : 'ltr';
            htmlTag.setAttribute('dir', newDir);
            localStorage.setItem('partypop-dir', newDir);

            document.body.classList.add('switching-dir');
            setTimeout(() => document.body.classList.remove('switching-dir'), 300);
        });
    }
}

/**
 * 🌘 THEME SYSTEM (Light & Dark Modes)
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('partypop-theme') || 'dark';

    body.setAttribute('data-theme', currentTheme);
    if (themeToggle) themeToggle.checked = (currentTheme === 'light');

    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('partypop-theme', newTheme);
        });
    }
}

/**
 * 🎈 DYNAMIC BALLOONS CREATION
 */
function initBalloons() {
    const containers = document.querySelectorAll('.floating-balloons-container');
    if (containers.length === 0) return;

    const colors = ['#FF4D8D', '#7C3AED', '#FFD166', '#38BDF8'];

    containers.forEach(container => {
        // Clear any old ones
        container.innerHTML = '';
        
        // Generate 10-15 balloons depending on container
        const count = container.classList.contains('hero-balloons') ? 14 : 8;
        for (let i = 0; i < count; i++) {
            const balloon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            balloon.setAttribute("class", "balloon-svg");
            balloon.setAttribute("viewBox", "0 0 40 100");

            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 95;
            const delay = Math.random() * 12;
            const duration = 12 + Math.random() * 10;
            const scale = 0.5 + Math.random() * 0.7;

            balloon.style.left = `${left}%`;
            balloon.style.animationDelay = `${delay}s`;
            balloon.style.animationDuration = `${duration}s`;
            balloon.style.transform = `scale(${scale})`;

            balloon.innerHTML = `
                <defs>
                    <radialGradient id="grad-balloon-${i}-${left.toFixed(0)}" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6"/>
                        <stop offset="50%" stop-color="${color}"/>
                        <stop offset="100%" stop-color="${color}" stop-opacity="0.8"/>
                    </radialGradient>
                </defs>
                <ellipse cx="20" cy="25" rx="14" ry="19" fill="url(#grad-balloon-${i}-${left.toFixed(0)})" />
                <polygon points="20,43 17,47 23,47" fill="${color}" />
                <path d="M 20 47 Q 17 65, 23 80 T 20 95" stroke="#E5E7EB" stroke-width="0.8" fill="none" />
            `;
            container.appendChild(balloon);
        }
    });
}

/**
 * 🎊 DYNAMIC CONFETTI BACKGROUND CREATION
 */
function initConfetti() {
    const wrappers = document.querySelectorAll('.confetti-wrapper');
    if (wrappers.length === 0) return;

    const colors = ['#FF4D8D', '#7C3AED', '#FFD166', '#38BDF8', '#22C55E'];

    wrappers.forEach(wrapper => {
        wrapper.innerHTML = '';
        const count = 35;
        for (let i = 0; i < count; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';

            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = 8 + Math.random() * 8;
            const size = 5 + Math.random() * 7;

            piece.style.backgroundColor = color;
            piece.style.left = `${left}%`;
            piece.style.width = `${size}px`;
            piece.style.height = `${size}px`;
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            piece.style.animationDelay = `${delay}s`;
            piece.style.animationDuration = `${duration}s`;
            piece.style.transform = `rotate(${Math.random() * 360}deg)`;

            wrapper.appendChild(piece);
        }
    });
}

/**
 * 📈 INCREMENTAL COUNTERS
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter-num');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const suffix = entry.target.getAttribute('data-suffix') || '';
                const duration = 2000;
                let startTimestamp = null;

                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    entry.target.innerText = Math.floor(progress * target) + suffix;
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };

                window.requestAnimationFrame(step);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/**
 * 🔗 NAVIGATION ACTIVE LINK HIGHLIGHT & SCROLL SCENE
 */
function initActiveNav() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function initNavbarScroll() {
    const nav = document.querySelector('.nav-puppet');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

/**
 * 🎡 SCROLL REVEAL SCENE
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/**
 * 📸 LIGHTBOX & MASONRY GALLERY FILTER
 */
function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Lightbox Overlay Creation
    let overlay = document.querySelector('.lightbox-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="" alt="PartyPop Lightbox" id="lightbox-img">
            </div>
        `;
        document.body.appendChild(overlay);
        
        overlay.querySelector('.lightbox-close').addEventListener('click', () => {
            overlay.classList.remove('active');
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('active');
        });
    }

    // Lightbox Image Activation
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const lightboxImg = document.getElementById('lightbox-img');
            if (img && lightboxImg) {
                lightboxImg.src = img.src;
                overlay.classList.add('active');
            }
        });
    });

    // Filtering system
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        // Trigger small animation scale-up
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

/**
 * ⏳ COUNTDOWN TIMER
 */
function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    // Set countdown to 15 days from now
    const targetDate = new Date().getTime() + (15 * 24 * 60 * 60 * 1000);

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownEl.innerHTML = `<h4>Offer Expired!</h4>`;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format single digits
        const pad = (num) => String(num).padStart(2, '0');

        countdownEl.innerHTML = `
            <div class="countdown-unit"><span>${pad(days)}</span><label>Days</label></div>
            <div class="countdown-unit"><span>${pad(hours)}</span><label>Hours</label></div>
            <div class="countdown-unit"><span>${pad(minutes)}</span><label>Mins</label></div>
            <div class="countdown-unit"><span>${pad(seconds)}</span><label>Secs</label></div>
        `;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
}

/**
 * 🚀 BACK TO TOP BUTTON
 */
function initBackToTop() {
    let btn = document.querySelector('.back-to-top');
    if (!btn) {
        btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.innerHTML = '<i class="bi bi-chevron-up" style="font-size: 1.2rem;"></i>';
        document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
