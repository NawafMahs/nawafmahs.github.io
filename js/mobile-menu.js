// Mobile Menu Script
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    const closeBtn = document.querySelector('.close-menu');
    const menuLinks = document.querySelectorAll('.nav-links a');
    
    // Ensure overlay exists and is properly positioned
    let overlay = document.querySelector('.mobile-menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
    }
    
    // Open menu function
    function openMenu() {
        if (!navMenu.classList.contains('active')) {
            navMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.classList.add('menu-open');
        }
    }
    
    // Close menu function
    function closeMenu() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Add event listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            openMenu();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeMenu();
            }
        });
    }
    
    // Close menu when clicking a link
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
            // Navigate to the clicked link after menu closes
            setTimeout(() => {
                window.location.href = this.getAttribute('href');
            }, 300);
        });
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
});
