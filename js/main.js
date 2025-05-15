// Immediate initialization to ensure translations are applied asap
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTranslations);
    } else {
        initTranslations();
    }
    
    function initTranslations() {
        if (typeof translations === 'undefined') {
            console.error('Translations not loaded. Make sure translations.js is included before main.js');
            return;
        }
        
        // Get browser language or default to English
        const userLanguage = navigator.language.split('-')[0];
        const supportedLanguages = ['en', 'fr', 'pt'];
        const initialLanguage = supportedLanguages.includes(userLanguage) ? userLanguage : 'en';
        
        // Apply initial translations
        setLanguage(initialLanguage);
        
        // Mark the active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.dataset.lang === initialLanguage) {
                btn.classList.add('active');
            }
        });
    }
})();

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language based on browser preferences or default to English
    const userLanguage = navigator.language.split('-')[0];
    const supportedLanguages = ['en', 'fr', 'pt'];
    let currentLanguage = supportedLanguages.includes(userLanguage) ? userLanguage : 'en';
    
    // Update language on button click
    const languageButtons = document.querySelectorAll('.lang-btn');
    languageButtons.forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            setLanguage(lang);
            
            // Update active button
            document.querySelectorAll('.lang-btn').forEach(button => {
                button.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Set initial language
    setLanguage(currentLanguage);
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && 
            !nav.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Calendly popup initialization
    const calendlyButton = document.getElementById('calendly-button');
    if (calendlyButton) {
        calendlyButton.addEventListener('click', function(e) {
            // Let the default link behavior handle the navigation
            // The href is now set to https://calendly.com/prodwilliamsouef/30min
            // No need for e.preventDefault() as we want the link to work normally
        });
    }
    
    // Contact form submission (placeholder for actual implementation)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form would be submitted in a real implementation.');
            // In a real implementation, you'd handle form submission via AJAX or a form service
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.padding = '0.75rem 0';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1.25rem 0';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        }
        
        lastScrollTop = scrollTop;
    });
});

// Function to set the language and update all text elements
function setLanguage(lang) {
    console.log('Changing language to:', lang);
    
    // Update document language attribute
    document.documentElement.lang = lang;
    
    // Loop through all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        console.log('Translating element with key:', key);
        
        // Check if translation exists
        if (translations[lang] && translations[lang][key]) {
            // Handle different element types appropriately
            if (element.tagName === 'INPUT') {
                if (element.type === 'submit' || element.type === 'button') {
                    element.value = translations[lang][key];
                } else {
                    element.placeholder = translations[lang][key];
                }
            } else if (element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else if (element.tagName === 'BUTTON') {
                element.textContent = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        } else if (translations['en'][key]) {
            // Fallback to English if translation doesn't exist
            console.warn('Translation not found for key:', key, 'in language:', lang, '- using English fallback');
            
            if (element.tagName === 'INPUT') {
                if (element.type === 'submit' || element.type === 'button') {
                    element.value = translations['en'][key];
                } else {
                    element.placeholder = translations['en'][key];
                }
            } else if (element.tagName === 'TEXTAREA') {
                element.placeholder = translations['en'][key];
            } else if (element.tagName === 'BUTTON') {
                element.textContent = translations['en'][key];
            } else {
                element.textContent = translations['en'][key];
            }
        }
    });
} 