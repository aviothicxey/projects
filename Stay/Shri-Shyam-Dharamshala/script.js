/* ===================== script.js (optimized) ===================== */
(() => {
  'use strict';

  // ---------- Elements ----------
  const htmlEl = document.documentElement;
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  const langToggle = document.getElementById('langToggle');
  const aartiTimeEl = document.getElementById('aartiTime');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const interactiveBtns = Array.from(document.querySelectorAll('.btn-primary, .btn-secondary'));

  // ---------- Language setup ----------
  // Small human-like Hindi fallback map (used only if element lacks data-hi)
  const fallbackHi = {
    'Home': 'होम',
    'About Us': 'हमारे बारे में',
    'Accommodations': 'आवास',
    'Attractions': 'आकर्षण',
    'Donations': 'दान',
    'Contact': 'संपर्क करें',
    'Welcome to Shri Shyam Dharamshala': 'श्री श्याम धर्मशाला में आपका स्वागत है',
    'A sacred abode of devotion and hospitality near Chukanadham Temple': 'चुकनाधाम मंदिर के पास भक्ति और आतिथ्य का पवित्र स्थान',
    'Book Now': 'अभी बुक करें',
    'Explore More': 'और जानें',
    'Why Choose Us': 'हमें क्यों चुनें',
    'Perfect Location': 'उपयुक्त स्थान',
    'Comfortable Rooms': 'आरामदायक कमरे',
    '24/7 Service': '24/7 सेवा',
    'Spiritual Atmosphere': 'आध्यात्मिक वातावरण',
    'Premium Facilities': 'उत्तम सुविधाएँ',
    'Trust Managed': 'ट्रस्ट द्वारा प्रबंधित',
    'Our Facilities': 'हमारी सुविधाएँ',
    'High-Speed WiFi': 'उच्च गति वाईफाई',
    'AC & Fan': 'एसी और पंखा',
    'Dining Area': 'भोजन क्षेत्र',
    'Prayer Hall': 'प्रार्थना कक्ष',
    'Hot Water': 'गर्म पानी',
    '24/7 Security': '24/7 सुरक्षा',
    'Quick Links': 'त्वरित लिंक',
    'Check Rooms': 'कमरे देखें',
    'Nearby Places': 'पास के स्थान',
    'Gallery': 'गैलरी',
    'Contact Us': 'हमसे संपर्क करें',
    '© 2024 Shri Shyam Dharamshala. Organized by Shri Shyam Baba Seva Mandal Trust. All rights reserved.':
      '© 2024 श्री श्याम धर्मशाला। श्री श्याम बाबा सेवा मंडल ट्रस्ट द्वारा संचालित। सर्वाधिकार सुरक्षित।'
  };

  // Determine initial language:
  const storedLang = localStorage.getItem('language');
  let currentLang = storedLang || (navigator.language && navigator.language.startsWith('hi') ? 'hi' : 'en');

  // Toggle language button visual state
  function setLangToggleState(lang) {
    langToggle.setAttribute('aria-pressed', String(lang === 'hi'));
    langToggle.style.opacity = lang === 'hi' ? '1' : '0.72';
  }

  function setLanguage(lang) {
    currentLang = lang;
    htmlEl.setAttribute('lang', lang);
    setLangToggleState(lang);

    // Update elements that have data-en / data-hi
    document.querySelectorAll('[data-en]').forEach(el => {
      const keyEn = el.getAttribute('data-en').trim();
      const hiVal = el.getAttribute('data-hi');
      if (lang === 'hi') {
        // prefer explicit data-hi -> fallback map -> english
        el.textContent = hiVal ? hiVal : (fallbackHi[keyEn] || keyEn);
      } else {
        el.textContent = keyEn;
      }
    });
  }

  // initialize
  setLanguage(currentLang);

  // Toggle handler
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    localStorage.setItem('language', currentLang);
    setLanguage(currentLang);
  });

  // ---------- Hamburger & nav behavior ----------
  function openMenu() {
    navMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // clicking nav links: close menu and set active
  navLinks.forEach(link => {
    link.addEventListener('click', (ev) => {
      // if it's a hash link, let CSS smooth scroll handle it by default
      // update active state
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      closeMenu();
    });
  });

  // ---------- Active nav on scroll (debounced) ----------
  let scrollTimeout = null;
  function onScrollUpdateActive() {
    let current = '';
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const offset = Math.round(window.innerHeight * 0.15);
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY >= top - offset) {
        current = sec.id;
      }
    });

    // update nav links only if needed
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isActive = href === `#${current}`;
      if (isActive) link.classList.add('active');
      else link.classList.remove('active');
    });
  }

  window.addEventListener('scroll', () => {
    if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(onScrollUpdateActive);
  }, { passive: true });

  // call once on load
  onScrollUpdateActive();

  // ---------- Aarti Timer ----------
  // Define aarti times in 24-hour form
  const aartiTimes = [
    { hour: 6, minute: 0, name_en: 'Morning Aarti', name_hi: 'सुबह की आरती' },
    { hour: 12, minute: 0, name_en: 'Noon Aarti', name_hi: 'दोपहर की आरती' },
    { hour: 18, minute: 0, name_en: 'Evening Aarti', name_hi: 'शाम की आरती' },
    { hour: 21, minute: 0, name_en: 'Night Aarti', name_hi: 'रात की आरती' }
  ];

  function formatAMPM(dateObj) {
    let h = dateObj.getHours();
    let m = dateObj.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hh = ((h + 11) % 12 + 1); // convert 0->12
    return `${String(hh).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  function updateAartiTime() {
    const now = new Date();
    // find next aarti after now
    let next = aartiTimes.find(t => (t.hour > now.getHours()) || (t.hour === now.getHours() && t.minute > now.getMinutes()));
    if (!next) next = aartiTimes[0]; // next day
    // construct a Date for display (today's date for hour; if next is earlier than now, add 1 day)
    const nextDate = new Date(now.getTime());
    nextDate.setHours(next.hour, next.minute, 0, 0);
    if (nextDate <= now) nextDate.setDate(nextDate.getDate() + 1);
    aartiTimeEl.textContent = formatAMPM(nextDate);
    // Also update label if you want localized names (kept separate if needed)
  }

  // update on load and every 30 seconds (keeps it light)
  updateAartiTime();
  setInterval(updateAartiTime, 30000);

  // ---------- Ripple effect for buttons ----------
  interactiveBtns.forEach(btn => {
    btn.addEventListener('pointerdown', (e) => {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      // cleanup
      setTimeout(() => {
        ripple.remove();
      }, 650);
    });
  });

  // ---------- Intersection Observer for fade-in (kept lightweight) ----------
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animTargets = document.querySelectorAll('.highlight-card, .facility-item, .quick-link-card');
  animTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ---------- Ensure nav visibility on resize (desktop) ----------
  function handleResize() {
    if (window.innerWidth >= 769) {
      navMenu.classList.add('open'); // desktop: always visible
      navMenu.style.display = ''; // let CSS handle layout
    } else {
      navMenu.classList.remove('open');
      navMenu.style.display = ''; // CSS fallback will hide/show
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }
  window.addEventListener('resize', handleResize);
  handleResize();

  // End IIFE
})();
