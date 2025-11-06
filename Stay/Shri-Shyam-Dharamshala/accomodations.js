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

// ===================== BOOKING FORM HANDLING =====================
const bookingForm = document.getElementById('bookingForm');
const checkInInput = document.getElementById('checkInDate');
const checkOutInput = document.getElementById('checkOutDate');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
checkInInput.setAttribute('min', today);
checkOutInput.setAttribute('min', today);

// Update checkout minimum date when checkin date changes
checkInInput.addEventListener('change', () => {
    const checkInDate = new Date(checkInInput.value);
    const minCheckOut = new Date(checkInDate);
    minCheckOut.setDate(minCheckOut.getDate() + 1);
    const minCheckOutStr = minCheckOut.toISOString().split('T')[0];
    checkOutInput.setAttribute('min', minCheckOutStr);
    
    // Reset checkout if it's before checkin
    if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
        checkOutInput.value = minCheckOutStr;
    }
});

// Form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('guestName').value,
        email: document.getElementById('guestEmail').value,
        phone: document.getElementById('guestPhone').value,
        checkIn: document.getElementById('checkInDate').value,
        checkOut: document.getElementById('checkOutDate').value,
        roomType: document.getElementById('roomType').value,
        guests: document.getElementById('guestCount').value,
        requests: document.getElementById('specialRequests').value
    };
    
    // Validate dates
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    
    if (checkOut <= checkIn) {
        alert('Check-out date must be after check-in date');
        return;
    }
    
    // Show success message
    showBookingSuccess(formData);
    
    // Reset form
    bookingForm.reset();
    checkInInput.setAttribute('min', today);
});

function showBookingSuccess(data) {
    const nights = Math.ceil((new Date(data.checkOut) - new Date(data.checkIn)) / (1000 * 60 * 60 * 24));
    
    const roomPrices = {
        'single': { min: 500, max: 700 },
        'double': { min: 800, max: 1200 },
        'family': { min: 1500, max: 2000 }
    };
    
    const roomNames = {
        'single': 'Single Room',
        'double': 'Double Room',
        'family': 'Family Suite'
    };
    
    const price = roomPrices[data.roomType];
    const estimatedCost = `₹${price.min * nights} - ₹${price.max * nights}`;
    
    const message = `
🎉 Booking Request Received!

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Room Type: ${roomNames[data.roomType]}
Check-in: ${formatDate(data.checkIn)}
Check-out: ${formatDate(data.checkOut)}
Nights: ${nights}
Guests: ${data.guests}
Estimated Cost: ${estimatedCost}

${data.requests ? `Special Requests: ${data.requests}` : ''}

Your booking request has been submitted. We will contact you shortly to confirm.
Thank you for choosing Shri Shyam Dharamshala!
    `;
    
    alert(message);
}

function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
}

// ===================== BOOK NOW BUTTONS =====================
document.querySelectorAll('.btn-book').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Scroll to booking form
        document.querySelector('.booking-form').scrollIntoView({ behavior: 'smooth' });
        document.getElementById('guestName').focus();
    });
});

// ===================== ROOM CARD ANIMATIONS =====================
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

// Observe room cards and facility items
document.querySelectorAll('.room-card, .facility-showcase-item, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================== CALCULATE STAY DURATION =====================
function calculateStayDuration() {
    const checkIn = new Date(checkInInput.value);
    const checkOut = new Date(checkOutInput.value);
    
    if (checkInInput.value && checkOutInput.value && checkOut > checkIn) {
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        console.log(`Stay duration: ${nights} nights`);
    }
}

checkInInput.addEventListener('change', calculateStayDuration);
checkOutInput.addEventListener('change', calculateStayDuration);

// ===================== PHONE NUMBER FORMATTING =====================
document.getElementById('guestPhone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// ===================== PREVENT PAST DATE SELECTION =====================
checkInInput.addEventListener('change', function() {
    const selectedDate = new Date(this.value);
    const todayDate = new Date(today);
    
    if (selectedDate < todayDate) {
        alert('Please select a future date');
        this.value = '';
    }
});

// ===================== ADD RIPPLE EFFECT =====================
const style = document.createElement('style');
style.textContent = `
    .btn {
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
document.head.appendChild(style);

// ===================== CONSOLE MESSAGE =====================
console.log('%c🏨 Welcome to Shri Shyam Dharamshala Accommodations', 'font-size: 16px; color: #d4a574; font-weight: bold;');
console.log('%cBook your comfortable stay today!', 'font-size: 12px; color: #8b6f47;');