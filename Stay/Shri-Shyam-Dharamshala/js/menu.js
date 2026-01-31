// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.getElementById('nav-menu');
    nav.classList.toggle('mobile-active');
}

function closeMobileMenu() {
    const nav = document.getElementById('nav-menu');
    nav.classList.remove('mobile-active');
}

// Close menu when link is clicked
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});
