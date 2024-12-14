function showSection(sectionId) {
    // Primero ocultamos todas las secciones
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Luego mostramos la sección activa
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
}

// Mostrar la sección por defecto al cargar
document.addEventListener('DOMContentLoaded', () => {
    showSection('reglas');
});
