// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            metaTitle: "TTS Scriptor | Bring Your Stories to Life",
            metaDescription: "Instantly convert your scripts into captivating multi-voice audio with AI. Perfect for writers, content creators, and storytellers.",
            heroTitle: "Transform Your Scripts into Captivating Audio",
            heroSubtitle: "With the power of AI, convert text into narrations with multiple voices and styles in minutes.",
            heroCta: "Go to the App",
            featuresTitle: "Bring Every Character to Life",
            featuresSubtitle: "Advantages that will revolutionize the way you create.",
            feature1Title: "AI Formatting",
            feature1Desc: "Paste your raw text and let our AI structure it automatically, identifying the narrator and characters.",
            feature2Title: "High-Quality Voices",
            feature2Desc: "Access a catalog of premium voices from Azure and Google. Assign a unique voice, style, and emotion to each character.",
            feature3Title: "Integrated Audio Studio",
            feature3Desc: "Adjust timings, add background music or sound effects in our multitrack editor, and export your final masterpiece.",
            howItWorksTitle: "As Easy as 1, 2, 3",
            step1Title: "Write & Format",
            step1Desc: "Write your script or let our AI format it for you.",
            step2Title: "Assign Voices",
            step2Desc: "Choose the perfect voice and style for each character.",
            step3Title: "Synthesize & Export",
            step3Desc: "Generate the audio, fine-tune it in the studio, and download the final file.",
            finalCtaTitle: "Ready to give voice to your ideas?",
            finalCtaSubtitle: "Start creating your audio narrations today.",
            finalCtaButton: "Get Started Now",
        },
        es: {
            metaTitle: "TTS Scriptor | Da Vida a tus Historias",
            metaDescription: "Convierte instantáneamente tus guiones en audio cautivador con múltiples voces usando IA. Perfecto para escritores, creadores de contenido y narradores.",
            heroTitle: "Transforma tus Guiones en Audio Cautivador",
            heroSubtitle: "Con la potencia de la IA, convierte texto en narraciones con múltiples voces y estilos en cuestión de minutos.",
            heroCta: "Ir a la Aplicación",
            featuresTitle: "Da vida a cada personaje",
            featuresSubtitle: "Ventajas que revolucionarán tu forma de crear.",
            feature1Title: "Formateo con IA",
            feature1Desc: "Pega tu texto en bruto y deja que nuestra IA lo estructure automáticamente, identificando narrador y personajes.",
            feature2Title: "Voces de Alta Calidad",
            feature2Desc: "Accede a un catálogo de voces premium de Azure y Google. Asigna una voz, estilo y emoción únicos a cada personaje.",
            feature3Title: "Estudio de Audio Integrado",
            feature3Desc: "Ajusta los tiempos, añade música de fondo o efectos de sonido en nuestro editor multipista y exporta tu obra maestra final.",
            howItWorksTitle: "Tan fácil como 1, 2, 3",
            step1Title: "Escribe y Formatea",
            step1Desc: "Escribe tu guion o deja que nuestra IA lo formatee por ti.",
            step2Title: "Asigna Voces",
            step2Desc: "Elige la voz y el estilo perfectos para cada personaje.",
            step3Title: "Sintetiza y Exporta",
            step3Desc: "Genera el audio, ajústalo en el estudio y descarga el archivo final.",
            finalCtaTitle: "¿Listo para dar voz a tus ideas?",
            finalCtaSubtitle: "Comienza a crear tus narraciones de audio hoy mismo.",
            finalCtaButton: "Empezar Ahora",
        }
    };

    const langEnBtn = document.getElementById('lang-en');
    const langEsBtn = document.getElementById('lang-es');
    
    const setLanguage = (lang) => {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'META') {
                    el.setAttribute('content', translations[lang][key]);
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });
        
        // Update document language
        document.documentElement.lang = lang;
        
        // Update button styles
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

        // Save language preference
        localStorage.setItem('language', lang);
    };

    langEnBtn.addEventListener('click', () => setLanguage('en'));
    langEsBtn.addEventListener('click', () => setLanguage('es'));
    
    // Set initial language based on preference or default
    const savedLang = localStorage.getItem('language') || 'es'; // Default to Spanish
    setLanguage(savedLang);
});
