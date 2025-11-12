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
    
    // Update select options
    document.querySelectorAll('option').forEach(option => {
        if (option.hasAttribute(`data-${lang}`)) {
            option.textContent = option.getAttribute(`data-${lang}`);
        }
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

// ===================== DONATION PLAN BUTTONS =====================
document.querySelectorAll('.btn-donate').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const amount = btn.getAttribute('data-amount');
        const plan = btn.getAttribute('data-plan');
        
        // Fill donation form with plan amount
        document.getElementById('donationAmount').value = amount;
        
        // Scroll to form
        document.querySelector('.donation-form-section').scrollIntoView({ behavior: 'smooth' });
        document.getElementById('donorName').focus();
        
        // Highlight the plan selection
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    });
});

// ===================== COPY TO CLIPBOARD =====================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = currentLanguage === 'en' ? '✓ Copied!' : '✓ कॉपी किया गया!';
        btn.style.background = '#27ae60';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert(currentLanguage === 'en' ? 'Failed to copy to clipboard' : 'क्लिपबोर्ड में कॉपी करने में विफल');
    });
}

// ===================== DONATION FORM HANDLING =====================
const donationForm = document.getElementById('donationForm');

donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('donorName').value,
        email: document.getElementById('donorEmail').value,
        phone: document.getElementById('donorPhone').value,
        amount: document.getElementById('donationAmount').value,
        type: document.getElementById('donationType').value,
        purpose: document.getElementById('donationPurpose').value,
        anonymous: document.getElementById('anonymousDonation').checked
    };
    
    // Validate amount
    if (formData.amount < 100) {
        alert(currentLanguage === 'en' ? 'Minimum donation amount is ₹100' : 'न्यूनतम दान राशि ₹100 है');
        return;
    }
    
    // Show success message
    showDonationSuccess(formData);
    
    // Reset form
    donationForm.reset();
});

function showDonationSuccess(data) {
    const donorName = data.anonymous ? 'Anonymous Donor' : data.name;
    const frequencyText = data.type === 'one-time' ? 'One-time' : data.type === 'monthly' ? 'Monthly' : 'Yearly';
    
    const message = `
🙏 Thank You for Your Donation! 🙏

Donor: ${donorName}
Email: ${data.email}
Amount: ₹${data.amount}
Type: ${frequencyText}
Purpose: ${data.purpose || 'General Welfare'}

Your donation has been recorded. You will receive a tax receipt and donation certificate at the provided email.

You are contributing to:
✓ Spiritual programs and meditation sessions
✓ Comfortable accommodations for devotees
✓ Community service initiatives
✓ Maintenance of sacred facilities

May your contribution be blessed! 🙏
    `;
    
    alert(message);
}

// ===================== PHONE NUMBER FORMATTING =====================
document.getElementById('donorPhone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// ===================== DONATION AMOUNT VALIDATION =====================
document.getElementById('donationAmount').addEventListener('input', function(e) {
    if (e.target.value < 0) {
        e.target.value = '';
    }
});

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

// Observe cards for fade-in effect
document.querySelectorAll('.impact-card, .plan-card, .method-card, .testimonial-card, .donation-form, .donation-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================== PLAN CARD STAGGER ANIMATION =====================
document.querySelectorAll('.plan-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

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

// ===================== HOVER EFFECT ON PLAN CARDS =====================
document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const badge = this.querySelector('.plan-badge');
        if (badge) {
            badge.style.transform = 'translateY(-5px) scale(1.05)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const badge = this.querySelector('.plan-badge');
        if (badge) {
            badge.style.transform = '';
        }
    });
});

// ===================== DONATION TYPE CHANGE HANDLER =====================
document.getElementById('donationType').addEventListener('change', function() {
    const monthlyConsent = document.getElementById('monthlyConsent');
    
    if (this.value === 'monthly' || this.value === 'yearly') {
        monthlyConsent.required = true;
        monthlyConsent.disabled = false;
    } else {
        monthlyConsent.required = false;
    }
});

// ===================== ADD ANIMATIONS CSS =====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .plan-card {
        animation: slideInUp 0.6s ease forwards;
        opacity: 0;
    }

    .plan-badge {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// ===================== DONATE NOW BUTTON RIPPLE =====================
document.querySelectorAll('.btn-donate, .btn-submit, .btn-copy').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===================== RIPPLE EFFECT CSS =====================
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn-donate, .btn-submit, .btn-copy {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===================== CONSOLE MESSAGE =====================
console.log('%c❤️ Support Shri Shyam Dharamshala Mission', 'font-size: 16px; color: #e74c3c; font-weight: bold;');
console.log('%cYour donation helps serve thousands of devotees!', 'font-size: 12px; color: #c0392b;');

// ===================== PAGE LOAD TRACKING =====================
window.addEventListener('load', () => {
    console.log('%c✅ Donations page loaded successfully!', 'font-size: 12px; color: #27ae60; font-weight: bold;');
});