// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dark mode script loaded');
    const themeToggleBtn = document.getElementById('theme-toggle');
    console.log('Theme toggle button:', themeToggleBtn);
    
    // Exit early if theme toggle button doesn't exist
    if (!themeToggleBtn) {
        console.error('Theme toggle button not found! Check if the element with ID "theme-toggle" exists.');
        return;
    }
    
    const sunIcon = themeToggleBtn.querySelector('.fa-sun');
    const moonIcon = themeToggleBtn.querySelector('.fa-moon');
    
    // Check if icons exist
    if (!sunIcon || !moonIcon) {
        console.error('Sun or moon icon not found inside the theme toggle button!');
        // Create icons if missing
        if (!sunIcon) {
            const newSunIcon = document.createElement('i');
            newSunIcon.className = 'fas fa-sun';
            themeToggleBtn.appendChild(newSunIcon);
        }
        if (!moonIcon) {
            const newMoonIcon = document.createElement('i');
            newMoonIcon.className = 'fas fa-moon';
            themeToggleBtn.appendChild(newMoonIcon);
        }
    }
    
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to update theme
    function setTheme(isDark) {
        console.log('Setting theme to:', isDark ? 'dark' : 'light');
        // Update theme attribute
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
        
        // Update icons visibility - use querySelector to get updated references
        const sunIcon = themeToggleBtn.querySelector('.fa-sun');
        const moonIcon = themeToggleBtn.querySelector('.fa-moon');
        
        if (sunIcon) sunIcon.style.display = isDark ? 'block' : 'none';
        if (moonIcon) moonIcon.style.display = isDark ? 'none' : 'block';
        
        // Add transition class
        root.classList.add('theme-transition');
        
        // Store preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Add animation to the button
        themeToggleBtn.classList.add('rotate');
        
        // Remove transition class
        setTimeout(() => {
            root.classList.remove('theme-transition');
            themeToggleBtn.classList.remove('rotate');
        }, 300);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        // If no saved preference, use system preference
        setTheme(prefersDark.matches);
    }
    
    // Toggle theme on button click using a more direct approach
    themeToggleBtn.onclick = function() {
        console.log('Theme toggle button clicked!');
        const isDark = root.getAttribute('data-theme') === 'dark';
        console.log('Current theme:', isDark ? 'dark' : 'light');
        console.log('Toggling to:', !isDark ? 'dark' : 'light');
        setTheme(!isDark);
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('theme-ripple');
        themeToggleBtn.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 1000);
        
        return false; // Prevent default action
    };
    
    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches);
        }
    });
});
