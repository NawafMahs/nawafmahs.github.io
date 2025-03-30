document.addEventListener('DOMContentLoaded', function() {
    // Page load animation
    const content = document.querySelector('main');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    
    // Add transition properties
    content.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    
    // Fade in the content after a short delay
    setTimeout(() => {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 200);
});
