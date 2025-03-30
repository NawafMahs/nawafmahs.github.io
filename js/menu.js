document.addEventListener('DOMContentLoaded', initializeMenu);

function initializeMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const closeMenuButton = document.querySelector('.close-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const menuLinks = document.querySelectorAll('.nav-links a');

    // Open/Close functions
    function openMenu() {
        navLinks.classList.add('active');
        body.classList.add('menu-open');
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Toggle menu
    mobileMenuToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu on close button
    closeMenuButton?.addEventListener('click', closeMenu);
    
    // Close menu on link click
    menuLinks.forEach(link => link.addEventListener('click', closeMenu));
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // Close on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
}