document.addEventListener('DOMContentLoaded', () => {
    // Load HTML fragments dynamically
    function loadFragment(containerId, filePath) {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                document.getElementById(containerId).outerHTML = data;
                initializeCollapsibleSections();
            })
            .catch(error => console.error('Error loading fragment:', error));
    }

    // Load sections
    loadFragment('naboo-dynamic-section', 'index-naboo.html');
    loadFragment('alzamiento-dynamic-section', 'index-rote.html');
});

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

function initializeCollapsibleSections() {
    const headers = document.querySelectorAll('.alzamiento-section h3');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const section = header.parentElement;
            section.classList.toggle('collapsed');
        });
    });
}

