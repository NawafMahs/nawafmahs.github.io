// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const moonIcon = themeToggleBtn.querySelector('.fa-moon');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        moonIcon.classList.remove('fa-moon');
        moonIcon.classList.add('fa-sun');
        themeToggleBtn.querySelector('span').textContent = 'Light Mode';
    }
    
    // Toggle theme when button is clicked
    themeToggleBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            moonIcon.classList.remove('fa-moon');
            moonIcon.classList.add('fa-sun');
            themeToggleBtn.querySelector('span').textContent = 'Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            moonIcon.classList.remove('fa-sun');
            moonIcon.classList.add('fa-moon');
            themeToggleBtn.querySelector('span').textContent = 'Dark Mode';
        }
    });
});
