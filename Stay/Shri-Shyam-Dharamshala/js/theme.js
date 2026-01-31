// Theme Toggle (Dark Mode)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const btn = document.querySelector('.theme-toggle');
    btn.textContent = body.classList.contains('dark-mode') ? '🌙' : '☀️';
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function toggleLanguage() {
    alert('Language switching coming soon! 🌍\n\nCurrently available in English. Hindi translation will be added soon.');
}

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle').textContent = '🌙';
    }
});
