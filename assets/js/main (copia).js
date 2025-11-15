// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const langEnBtn = document.getElementById('lang-en');
    const langEsBtn = document.getElementById('lang-es');
    let currentTranslations = {};

    // Función para cargar el archivo de idioma
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`./assets/locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Could not load ${lang}.json`);
            }
            currentTranslations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
            // Cargar inglés como fallback en caso de error
            const fallbackResponse = await fetch('./assets/locales/en.json');
            currentTranslations = await fallbackResponse.json();
        }
    }

    // Función para aplicar las traducciones a la página
    function applyTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (currentTranslations[key]) {
                if (el.tagName === 'META') {
                    el.setAttribute('content', currentTranslations[key]);
                } else {
                    el.innerHTML = currentTranslations[key];
                }
            }
        });
    }

    // Función principal para cambiar de idioma
    async function setLanguage(lang) {
        await loadTranslations(lang);
        applyTranslations();
        
        // Actualizar el atributo lang del HTML
        document.documentElement.lang = lang;
        
        // Actualizar estilos de los botones
        if (lang === 'en') {
            langEnBtn.classList.add('text-white', 'border-b-2', 'border-indigo-500');
            langEnBtn.classList.remove('text-gray-400');
            langEsBtn.classList.add('text-gray-400');
            langEsBtn.classList.remove('text-white', 'border-b-2', 'border-indigo-500');
        } else {
            langEsBtn.classList.add('text-white', 'border-b-2', 'border-indigo-500');
            langEsBtn.classList.remove('text-gray-400');
            langEnBtn.classList.add('text-gray-400');
            langEnBtn.classList.remove('text-white', 'border-b-2', 'border-indigo-500');
        }

        // Guardar preferencia de idioma
        localStorage.setItem('language', lang);
    }

    // Añadir listeners a los botones
    langEnBtn.addEventListener('click', () => setLanguage('en'));
    langEsBtn.addEventListener('click', () => setLanguage('es'));
    
    // Función para inicializar la página
    async function init() {
        const savedLang = localStorage.getItem('language') || 'es'; // Default a español
        await setLanguage(savedLang);
    }

    // Iniciar la aplicación
    init();
});
