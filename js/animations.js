// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// GSAP Animations
gsap.from('.profile-content', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power4.out'
});

gsap.from('.social-links a', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out',
    delay: 1
});

// Glitch effect for name
const glitchText = document.querySelector('.glitch');
let glitchInterval;

glitchText.addEventListener('mouseover', () => {
    glitchInterval = setInterval(() => {
        glitchText.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff0000,
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ff00,
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #0000ff
        `;
    }, 50);
});

glitchText.addEventListener('mouseout', () => {
    clearInterval(glitchInterval);
    glitchText.style.textShadow = 'none';
});

// Parallax effect for profile image
document.addEventListener('mousemove', (e) => {
    const imageContainer = document.querySelector('.image-container');
    const { clientX, clientY } = e;
    const { left, top, width, height } = imageContainer.getBoundingClientRect();
    
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    
    imageContainer.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${y * -10}deg)
    `;
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 