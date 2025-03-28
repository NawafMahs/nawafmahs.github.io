// Language selection functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageButtons = document.querySelectorAll('.language-selector button');
    let currentLang = localStorage.getItem('language') || 'en';
    
    // Load translations
    loadTranslations(currentLang);
    
    // Set active button based on current language
    setActiveLanguageButton(currentLang);
    
    // Add click event listeners to language buttons
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Save language preference
            localStorage.setItem('language', lang);
            
            // Load translations for selected language
            loadTranslations(lang);
            
            // Update active button
            setActiveLanguageButton(lang);
        });
    });
    
    function setActiveLanguageButton(lang) {
        languageButtons.forEach(button => {
            if (button.getAttribute('data-lang') === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    function loadTranslations(lang) {
        fetch(`locales/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                document.querySelectorAll('[data-i18n]').forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (translations[key]) {
                        element.innerHTML = translations[key];
                    }
                });
                
                // Handle RTL for Arabic
                if (lang === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.body.classList.add('rtl');
                } else {
                    document.documentElement.setAttribute('dir', 'ltr');
                    document.body.classList.remove('rtl');
                }
            })
            .catch(error => {
                console.error('Error loading translations:', error);
            });
    }
});
