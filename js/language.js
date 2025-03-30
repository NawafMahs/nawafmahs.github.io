// Language translations
let translations = {};
let currentLang = localStorage.getItem('language') || 'en';

// Function to load language file
async function loadTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${lang} translations`);
        const data = await response.json();
        translations[lang] = data;
        return data;
    } catch (error) {
        console.error('Translation loading error:', error);
        return null;
    }
}

// Function to translate the page
function translatePage(lang) {
    if (!translations[lang]) return;

    // Update HTML lang attribute and direction
    document.documentElement.lang = lang;
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update active state of language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Translate all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        const translation = translations[lang][key];
        
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });

    // Handle RTL/LTR specific styles
    const rtlStylesheet = document.getElementById('rtl-styles');
    if (lang === 'ar') {
        if (!rtlStylesheet) {
            const link = document.createElement('link');
            link.id = 'rtl-styles';
            link.rel = 'stylesheet';
            link.href = 'css/rtl.css';
            document.head.appendChild(link);
        }
    } else if (rtlStylesheet) {
        rtlStylesheet.remove();
    }

    // Save language preference
    localStorage.setItem('language', lang);
    currentLang = lang;

    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

// Initialize translations
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load initial language
        const data = await loadTranslations(currentLang);
        if (data) {
            translatePage(currentLang);
        }

        // Load other languages in the background
        const otherLangs = ['en', 'ar', 'tr'].filter(lang => lang !== currentLang);
        await Promise.all(otherLangs.map(lang => loadTranslations(lang)));

        // Add click handlers to language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const lang = btn.dataset.lang;
                if (lang !== currentLang) {
                    if (!translations[lang]) {
                        await loadTranslations(lang);
                    }
                    translatePage(lang);
                }
            });
        });
    } catch (error) {
        console.error('Failed to initialize translations:', error);
    }
});
function switchLanguage(lang) {
    // Set direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update CSS Variables for alignment
    const root = document.documentElement;
    root.style.setProperty('--text-align', lang === 'ar' ? 'right' : 'left');
    root.style.setProperty('--float-direction', lang === 'ar' ? 'right' : 'left');
    
    // Rest of your translation logic...
    loadTranslation(lang);
    localStorage.setItem('selectedLang', lang);
    
    // Force layout recalculation
    document.body.style.visibility = 'hidden';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.visibility = 'visible';
  }