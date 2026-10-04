/* ===== APEX RACEWAY — SLOT CAR & RC RACING — SHARED COMPONENTS ===== */
'use strict';

/* Theme & Direction Init */
(function initTheme() {
    const html = document.documentElement;
    const saved = localStorage.getItem('ar_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) html.classList.add('dark');
    if (localStorage.getItem('ar_dir') === 'rtl') html.setAttribute('dir', 'rtl');
})();

function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    localStorage.setItem('ar_theme', html.classList.contains('dark') ? 'dark' : 'light');
    document.querySelectorAll('.theme-icon').forEach(updateThemeIcon);
}

function updateThemeIcon(el) {
    if (!el) return;
    el.className = document.documentElement.classList.contains('dark')
        ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon';
}

function toggleDir() {
    const html = document.documentElement;
    const isRTL = html.getAttribute('dir') === 'rtl';
    html.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
    localStorage.setItem('ar_dir', isRTL ? 'ltr' : 'rtl');
    document.querySelectorAll('.dir-label').forEach(el => {
        el.textContent = isRTL ? 'LTR' : 'RTL';
    });
}

/* Logo SVG */
function getLogoSVG(size = 40) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}" style="width:${size}px;height:${size}px;display:block;flex-shrink:0;">
      <circle cx="32" cy="32" r="32" fill="#0D1B2A"/>
      <circle cx="32" cy="32" r="26" stroke="#FF5F1F" stroke-width="2.5" fill="none" stroke-dasharray="6 3" opacity="0.6"/>
      <rect x="18" y="28" width="28" height="10" rx="3" fill="#FF5F1F"/>
      <rect x="24" y="24" width="12" height="8" rx="2" fill="#1a3a5c"/>
      <circle cx="22" cy="38" r="4" fill="#080f1a" stroke="#FF5F1F" stroke-width="2"/>
      <circle cx="42" cy="38" r="4" fill="#080f1a" stroke="#FF5F1F" stroke-width="2"/>
      <line x1="6" y1="30" x2="14" y2="30" stroke="#FF5F1F" stroke-width="2" stroke-linecap="round"/>
      <line x1="6" y1="34" x2="12" y2="34" stroke="#FF5F1F" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    </svg>`;
}

/* Navbar */
function injectNav() {
    const el = document.getElementById('main-nav');
    if (!el) return;
    const page = location.pathname.split('/').pop() || 'index.html';
    const links = [
        { href: 'index.html',       label: 'Home' },
        { href: 'home2.html',       label: 'Home 2' },
        { href: 'book-track.html',  label: 'Book Track' },
        { href: 'leagues.html',     label: 'Leagues & Races' },
        { href: 'pro-shop.html',    label: 'Pro Shop' },
        { href: 'contact.html',     label: 'Contact' },
    ];

    const isDark = document.documentElement.classList.contains('dark');
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

    const navLinksHTML = links.map(l => {
        const isActive = page === l.href || (page === '' && l.href === 'index.html');
        return `<a href="${l.href}" class="nav-link${isActive ? ' active' : ''}">${l.label}</a>`;
    }).join('');

    const mobileLinksHTML = links.map(l => {
        const isActive = page === l.href || (page === '' && l.href === 'index.html');
        return `<a href="${l.href}" class="mobile-nav-link${isActive ? ' active' : ''}"><i class="fas fa-chevron-right" style="font-size:.625rem;color:var(--text-light);"></i>${l.label}</a>`;
    }).join('');

    el.innerHTML = `
    <nav class="navbar" id="navbar">
        <div class="nav-inner">
            <a href="index.html" class="nav-logo" aria-label="Apex Raceway Home">
                ${getLogoSVG(40)}
                <div class="nav-logo-text">
                    <span class="brand-name">Apex Raceway</span>
                    <span class="brand-tagline">Slot Car & RC Racing</span>
                </div>
            </a>
            <div class="nav-links">${navLinksHTML}</div>
            <div class="nav-actions">
                <button onclick="toggleDir()" class="nav-icon-btn" title="Toggle Direction" aria-label="Toggle RTL/LTR">
                    <span class="dir-label" style="font-size:.6rem;font-weight:700;letter-spacing:.04em;">${isRTL ? 'RTL' : 'LTR'}</span>
                </button>
                <button onclick="toggleTheme()" class="nav-icon-btn" title="Toggle Theme" aria-label="Toggle dark mode">
                    <i class="${isDark ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon'}"></i>
                </button>
                <a href="login.html" class="btn btn-outline btn-sm" style="display:inline-flex;">Sign In</a>
                <a href="dashboard.html" class="btn btn-primary btn-sm" style="display:inline-flex;">Dashboard</a>
                <button class="hamburger" id="hamburger-btn" aria-label="Open menu" aria-expanded="false" onclick="toggleMobileDrawer()">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </nav>

    <div class="mobile-drawer-overlay" id="mobile-drawer" role="dialog" aria-modal="true" onclick="handleDrawerOverlayClick(event)">
        <div class="mobile-drawer">
            <div class="mobile-drawer-header">
                <a href="index.html" class="nav-logo" onclick="closeMobileDrawer()">
                    ${getLogoSVG(36)}
                    <div class="nav-logo-text">
                        <span class="brand-name" style="color:var(--text-heading);">Apex Raceway</span>
                        <span class="brand-tagline">Slot Car & RC Racing</span>
                    </div>
                </a>
                <button class="mobile-drawer-close" onclick="closeMobileDrawer()" aria-label="Close menu"><i class="fas fa-xmark"></i></button>
            </div>
            <div class="mobile-drawer-body">${mobileLinksHTML}</div>
            <div class="mobile-drawer-footer">
                <a href="dashboard.html" class="btn btn-primary btn-full" onclick="closeMobileDrawer()">
                    <i class="fas fa-gauge"></i> Dashboard
                </a>
                <a href="login.html" class="btn btn-outline btn-full" onclick="closeMobileDrawer()">
                    <i class="fas fa-right-to-bracket"></i> Sign In
                </a>
                <div class="mobile-drawer-controls">
                    <button onclick="toggleDir()" class="nav-icon-btn" title="Toggle Direction">
                        <span class="dir-label" style="font-size:.6rem;font-weight:700;">${isRTL ? 'RTL' : 'LTR'}</span>
                    </button>
                    <button onclick="toggleTheme()" class="nav-icon-btn" title="Toggle Theme">
                        <i class="${isDark ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon'}"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}

function handleDrawerOverlayClick(e) {
    if (e.target === document.getElementById('mobile-drawer')) closeMobileDrawer();
}
function openMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const btn = document.getElementById('hamburger-btn');
    if (!drawer) return;
    drawer.classList.add('open');
    if (btn) { btn.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    document.body.style.overflow = 'hidden';
}
function closeMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const btn = document.getElementById('hamburger-btn');
    if (!drawer) return;
    drawer.classList.remove('open');
    if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    document.body.style.overflow = '';
}
function toggleMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    drawer && drawer.classList.contains('open') ? closeMobileDrawer() : openMobileDrawer();
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const drawer = document.getElementById('mobile-drawer');
        if (drawer && drawer.classList.contains('open')) closeMobileDrawer();
    }
});

function updateNavScroll() {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', updateNavScroll, { passive: true });

/* Footer */
function injectFooter() {
    const el = document.getElementById('main-footer');
    if (!el) return;
    el.innerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="index.html" class="footer-logo-wrap" aria-label="Apex Raceway Home">
                        ${getLogoSVG(40)}
                        <div>
                            <span class="footer-brand-name">Apex Raceway</span>
                            <span class="footer-brand-sub">Slot Car & RC Racing Track</span>
                        </div>
                    </a>
                    <p>The premier indoor slot car and RC racing destination. Experience the thrill of precision racing in a state-of-the-art facility built for enthusiasts of all levels.</p>
                    <div class="footer-socials">
                        <a href="#" class="footer-social-link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="footer-social-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="footer-social-link" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        <a href="#" class="footer-social-link" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
                    </div>
                </div>
                <div>
                    <h4 class="footer-col-title">Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="home2.html">Home 2 — Premium</a></li>
                        <li><a href="book-track.html">Book Track Time</a></li>
                        <li><a href="leagues.html">Leagues & Races</a></li>
                        <li><a href="pro-shop.html">Pro Shop</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="footer-col-title">Resources</h4>
                    <ul class="footer-links">
                        <li><a href="login.html">Sign In</a></li>
                        <li><a href="signup.html">Sign Up</a></li>
                        <li><a href="dashboard.html">Racer Dashboard</a></li>
                        <li><a href="coming-soon.html">Blog & News</a></li>
                        <li><a href="coming-soon.html">Track Events</a></li>
                        <li><a href="404.html">404 Page</a></li>
                        <li><a href="coming-soon.html">Coming Soon</a></li>
                    </ul>
                </div>
                <div>
                    <div class="footer-newsletter">
                        <h4>Race Updates</h4>
                        <p>Subscribe for new race schedules, track events, and exclusive member offers.</p>
                        <form onsubmit="event.preventDefault(); alert('Subscribed! Start your engines.'); this.reset();" class="footer-newsletter-form">
                            <input type="email" placeholder="your@email.com" class="footer-newsletter-input" required>
                            <button type="submit" class="footer-newsletter-btn">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} Apex Raceway. All rights reserved.</p>
                <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Track Rules</a>
                    <a href="#">Cookies</a>
                </div>
            </div>
        </div>
    </footer>`;
}

/* Scroll to Top */
function injectScrollToTop() {
    if (document.body.classList.contains('auth-page') || document.body.classList.contains('fullscreen-page')) return;
    if (document.getElementById('scroll-to-top')) return;
    const btn = document.createElement('button');
    btn.id = 'scroll-to-top';
    btn.className = 'scroll-to-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 300), { passive: true });
}

/* Auth Page Init */
function initAuthPage() {
    const html = document.documentElement;
    const saved = localStorage.getItem('ar_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) html.classList.add('dark');
    if (localStorage.getItem('ar_dir') === 'rtl') html.setAttribute('dir', 'rtl');
    document.querySelectorAll('.theme-icon').forEach(updateThemeIcon);
    document.querySelectorAll('.dir-label').forEach(el => {
        el.textContent = html.getAttribute('dir') === 'rtl' ? 'RTL' : 'LTR';
    });
}

/* Password Visibility */
function togglePasswordVisibility(inputId, iconEl) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        iconEl.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        iconEl.className = 'fas fa-eye';
    }
}

/* FAQ Toggle */
function toggleFAQ(el) {
    const item = el.closest('.faq-item');
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item.active').forEach(f => f.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
}

/* Filter Tabs */
function switchFilter(filterValue, groupSelector) {
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-filter') === filterValue);
    });
    const cards = document.querySelectorAll(groupSelector || '.filterable-card');
    cards.forEach(card => {
        card.style.display = (filterValue === 'all' || card.getAttribute('data-category') === filterValue) ? '' : 'none';
    });
}

/* Scroll Animations */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/* Counter Animation */
function animateCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                const suffix = el.getAttribute('data-suffix') || '';
                const prefix = el.getAttribute('data-prefix') || '';
                let current = 0;
                const step = Math.max(1, Math.ceil(target / 70));
                const timer = setInterval(() => {
                    current = Math.min(current + step, target);
                    el.textContent = prefix + current.toLocaleString() + suffix;
                    if (current >= target) clearInterval(timer);
                }, 20);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}

/* Countdown Timer */
function initCountdown(targetDate) {
    function update() {
        const now = new Date().getTime();
        const dist = new Date(targetDate).getTime() - now;
        if (dist < 0) return;
        const days = Math.floor(dist / (1000*60*60*24));
        const hours = Math.floor((dist % (1000*60*60*24)) / (1000*60*60));
        const mins = Math.floor((dist % (1000*60*60)) / (1000*60));
        const secs = Math.floor((dist % (1000*60)) / 1000);
        const d = document.getElementById('cd-days');
        const h = document.getElementById('cd-hours');
        const m = document.getElementById('cd-mins');
        const s = document.getElementById('cd-secs');
        if (d) d.textContent = String(days).padStart(2,'0');
        if (h) h.textContent = String(hours).padStart(2,'0');
        if (m) m.textContent = String(mins).padStart(2,'0');
        if (s) s.textContent = String(secs).padStart(2,'0');
    }
    update();
    setInterval(update, 1000);
}

/* Main Init */
document.addEventListener('DOMContentLoaded', function () {
    injectNav();
    injectFooter();
    injectScrollToTop();
    initScrollAnimations();
    animateCounters();
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    document.querySelectorAll('.dir-label').forEach(el => {
        el.textContent = isRTL ? 'RTL' : 'LTR';
    });
    document.querySelectorAll('.theme-icon').forEach(updateThemeIcon);
    updateNavScroll();
});
