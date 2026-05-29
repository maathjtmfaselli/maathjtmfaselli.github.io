async function loadHolocron(slot) {
  const holocronPath = slot.dataset.holocron;
  if (!holocronPath) {
    console.error('Holocron slot without data-holocron');
    return;
  }

  try {
    const projectBase = window.location.pathname.includes('/maathjtmfaselli.github.io/')
      ? '/maathjtmfaselli.github.io'
      : '';

    const basePath = `${projectBase}/holocrones/${holocronPath}`;

    const manifestResponse = await fetch(`${basePath}/manifest.json`);
    if (!manifestResponse.ok) {
      throw new Error(`Cannot load manifest for ${holocronPath}`);
    }
    const manifest = await manifestResponse.json();

    await import(`${basePath}/component.js`);
    const element = document.createElement(manifest.tag);

    slot.replaceWith(element);
  } catch (error) {
    console.error(`Error loading holocron: ${holocronPath}`, error);

    slot.innerHTML = `
      <div class="holocron-error">
        Error cargando holocrón:
        ${holocronPath}
      </div>
    `;
  }
}

async function initHolocrons(root = document) {
  const slots = root.querySelectorAll('holocron-slot');

  for (const slot of slots) {
    await loadHolocron(slot);
  }
}

document.addEventListener('DOMContentLoaded', () => initHolocrons());
