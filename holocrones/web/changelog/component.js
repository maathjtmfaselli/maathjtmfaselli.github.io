class WebChangelogHolocron extends HTMLElement {

  constructor() {
    super();
  }

  async connectedCallback() {
    const template = await fetch("/holocrones/web/changelog/template.html")
      .then(r => r.text());

    this.innerHTML = template;

    await this.loadData();

    this.afterRender();
  }

  async loadData() {
    // Colores por categoría
    const categoryColors = {
      'web': '#3498db',       // Azul
      'gremio': '#e67e22',    // Naranja
      'holocron': '#27ae60',  // Verde
      'alzamiento': '#e74c3c', // Rojo
      'orden66': '#9b59b6',   // Morado
      'otras': '#7f8c8d'      // Gris
    };

    try {
      const response = await fetch('../data/web-changelog.json');
      const data = await response.json();

      const container = document.getElementById('changelog-container');
      container.innerHTML = '';

      data.forEach(item => {
          data.sort((a, b) => new Date(b.date) - new Date(a.date));

          const color = categoryColors[item.category.toLowerCase()] || categoryColors['otras'];
          const card = document.createElement('div');
          card.className = 'changelog-card';
          card.innerHTML = `
              <div class="card-category" style="background-color: ${color}">${item.category}</div>
              <div class="card-date">${item.date}</div>
              <div class="card-title">${item.title}</div>
              <div class="card-description">${item.description}</div>
          `;

          container.appendChild(card);
      });
    } catch (error) {
      console.error('Error cargando el changelog:', error);
      document.getElementById('changelog-container').innerHTML =
        '<p>Error al cargar las actualizaciones. Inténtalo más tarde.</p>';
    }
  }

  afterRender() {
  }
}

customElements.define("holocron-web-changelog", WebChangelogHolocron);
