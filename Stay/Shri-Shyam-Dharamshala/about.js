// ===================== LANGUAGE TOGGLE =====================
const langToggle = document.getElementById('langToggle');
const htmlElement = document.documentElement;
let currentLanguage = localStorage.getItem('language') || 'en';

// Set initial language on page load
setLanguage(currentLanguage);

langToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    localStorage.setItem('language', currentLanguage);
    setLanguage(currentLanguage);
});

function setLanguage(lang) {
    currentLanguage = lang;
    htmlElement.setAttribute('lang', lang);
    langToggle.style.opacity = lang === 'hi' ? '1' : '0.6';
    
    // Update all elements with data-en and data-hi attributes
    document.querySelectorAll('[data-en][data-hi]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
}

// ===================== HAMBURGER MENU =====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.style.opacity = navMenu.style.display === 'flex' ? '1' : '0.7';
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
    });
});

// ===================== RESPONSIVE NAVBAR =====================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
    } else {
        navMenu.style.display = 'none';
    }
});

// Initialize
if (window.innerWidth <= 768) {
    navMenu.style.display = 'none';
}

// ===================== SCROLL ANIMATIONS =====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and items for fade-in effect
document.querySelectorAll('.mv-card, .timeline-item, .trustee-card, .trust-description, .trust-objectives, .connection-text, .connection-image-placeholder').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================== TIMELINE ANIMATION =====================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 0.6s ease forwards';
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animationDelay = `${index * 0.1}s`;
    timelineObserver.observe(item);
});

// ===================== TRUSTEE CARD HOVER EFFECT =====================
document.querySelectorAll('.trustee-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-6px) rotateY(2deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0deg)';
    });
});

// ===================== MV CARD ANIMATION =====================
document.querySelectorAll('.mv-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

// ===================== ADD ANIMATIONS =====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .mv-card {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }

    .trustee-card {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// ===================== SMOOTH SCROLL =====================
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

// ===================== NAVBAR ACTIVE STATE =====================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
    });
});

// ===================== COUNTER ANIMATION (Optional) =====================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===================== PARALLAX EFFECT (Optional) =====================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroAbout = document.querySelector('.hero-about');
    
    if (heroAbout) {
        heroAbout.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    }
});

// ===================== CONSOLE MESSAGE =====================
console.log('%c📖 Welcome to Shri Shyam Dharamshala - About Us', 'font-size: 16px; color: #d4a574; font-weight: bold;');
console.log('%cLearn about our mission, vision, and the people behind the service!', 'font-size: 12px; color: #8b6f47;');

// ===================== LOAD TIME TRACKING =====================
window.addEventListener('load', () => {
    console.log('%c✅ About page loaded successfully!', 'font-size: 12px; color: #8b6f47; font-weight: bold;');
});