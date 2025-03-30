// Simple Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    // Get menu elements
    const menuBtn = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.nav-links');
    const closeBtn = document.querySelector('.close-menu');
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.setAttribute('role', 'button');
    overlay.setAttribute('aria-label', 'Close menu');
    document.body.appendChild(overlay);
    
    // Set initial ARIA attributes
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    
    // Open menu
    function openMenu() {
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('menu-open');
        menuBtn.setAttribute('aria-expanded', 'true');
        mobileNav.setAttribute('aria-hidden', 'false');
        mobileNav.querySelector('a').focus();
    }
    
    // Close menu
    function closeMenu() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        menuBtn.focus();
    }
    
    // Handle navigation link clicks
    function handleNavLinkClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close the menu
            closeMenu();
            
            // Add a small offset for the header
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            // Scroll to the target section
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL
            history.pushState(null, null, targetId);
        }
    }
    
    // Event listeners
    menuBtn.addEventListener('click', openMenu);
    menuBtn.addEventListener('touchend', openMenu);
    
    closeBtn.addEventListener('click', closeMenu);
    closeBtn.addEventListener('touchend', closeMenu);
    
    // Close when clicking outside the menu
    overlay.addEventListener('click', function(e) {
        if (!mobileNav.contains(e.target)) {
            closeMenu();
        }
    });
    
    overlay.addEventListener('touchend', function(e) {
        if (!mobileNav.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close when escape key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Handle navigation links
    const menuItems = document.querySelectorAll('.nav-links a');
    menuItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                closeMenu();
                
                // Add a small offset for the header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // Scroll to the target section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL
                history.pushState(null, null, targetId);
            }
        });
        
        item.addEventListener('touchend', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                closeMenu();
                
                // Add a small offset for the header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // Scroll to the target section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
