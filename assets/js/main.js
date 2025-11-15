document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcherContainer = document.getElementById('language-switcher-container');
    let currentTranslations = {};

    // --- Lógica Principal de Internacionalización ---

    // 1. Carga el archivo de un idioma específico (ej. en.json)
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`./assets/locales/${lang}.json`);
            if (!response.ok) throw new Error(`Could not load ${lang}.json`);
            currentTranslations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
            // Carga inglés como fallback en caso de error
            if (lang !== 'en') await loadTranslations('en');
        }
    }

    // 2. Aplica las traducciones cargadas a los elementos del DOM
    function applyTranslations() {
        document.querySelectorAll('[data-translate]').forEach(el => {
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

    // 3. Función principal que se llama al cambiar de idioma
    async function setLanguage(lang) {
        await loadTranslations(lang);
        applyTranslations();
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        
        // Asegura que el <select> refleje el idioma actual
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = lang;
        }
    }

    // --- Lógica para construir el Selector de Idioma Dinámicamente ---

    // 4. Crea el elemento <select> y lo añade al DOM
    function buildLanguageSelector(languages, currentLang) {
        const select = document.createElement('select');
        select.id = 'language-selector';
        // Clases de Tailwind para que se vea bien
        select.className = 'bg-gray-800 border border-gray-700 text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2';

        languages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang.code;
            option.textContent = lang.name;
            if (lang.code === currentLang) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        select.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });

        languageSwitcherContainer.appendChild(select);
    }

    // --- Inicialización ---

    // 5. Función de arranque que orquesta todo
    async function init() {
        try {
            const response = await fetch('./assets/locales/languages.json');
            if (!response.ok) throw new Error('Could not load languages.json');
            const languages = await response.json();

            const savedLang = localStorage.getItem('language') || 'es'; // Default a español
            
            // Construye el selector y luego establece el idioma inicial
            buildLanguageSelector(languages, savedLang);
            await setLanguage(savedLang);

        } catch (error) {
            console.error('Initialization failed:', error);
            // Muestra un error simple si no se pueden cargar los idiomas
            languageSwitcherContainer.innerHTML = '<span class="text-red-400 text-sm">Error loading languages</span>';
        }
    }

    // ¡Arrancamos!
    init();
});
