document.addEventListener('DOMContentLoaded', async () => {
    const contentContainer = document.getElementById('terms-content');
    const mainTitle = document.getElementById('main-title');

    // Por ahora, solo cargamos la versión en inglés.
    // Se puede extender para cargar diferentes idiomas si es necesario.
    const termsFile = './assets/locales/terms-en.md';

    try {
        const response = await fetch(termsFile);
        if (!response.ok) {
            throw new Error('Could not load the terms document.');
        }
        const markdownText = await response.text();
        
        // Usar la librería 'marked' para convertir Markdown a HTML
        const htmlContent = marked.parse(markdownText);
        
        // Insertar el HTML en el contenedor
        contentContainer.innerHTML = htmlContent;
        
        // El título principal está fuera del MD, así que lo mantenemos visible.
        mainTitle.style.display = 'block';

    } catch (error) {
        console.error(error);
        contentContainer.innerHTML = '<p class="text-red-400">Sorry, we could not load the terms and conditions at this time. Please try again later.</p>';
    }
});
