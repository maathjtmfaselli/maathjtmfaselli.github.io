const HOLOCRON_ICONS_BY_CATEGORY = {
  guild: "img/holocron-yellow.png",
  resources: "img/holocron-blue-dark.png",
  events: "img/holocron-red.png",
  howto: "img/holocron-green.png",
  archive: "img/holocron-blue-dark.png",
  default: "img/holocron-blue-dark.png"
};

async function renderHolocron(target, holocronPath) {
  if (!target) return;

  try {
    target.innerHTML = "<p>Cargando holocrón...</p>";
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
    const element = document.createElement(`holocron-${manifest.category}-${manifest.id}`);

    target.innerHTML = "";
    target.appendChild(element);
//    target.scrollTop = 0;
  } catch (error) {
    console.error(`Error loading holocron: ${holocronPath}`, error);
    target.innerHTML = `
      <div class="holocron-error">
        Error cargando holocrón:
        ${holocronPath}
      </div>
    `;
  }
}

async function loadHolocron(slot) {
  const holocronPath = slot.dataset.holocron;
  if (!holocronPath) {
    console.error('Holocron slot without data-holocron');
    return;
  }

  const wrapper = document.createElement("div");
  await renderHolocron(wrapper, holocronPath);
  slot.replaceWith(...wrapper.childNodes);
}

async function renderHolocrons(root = document) {
  const slots = root.querySelectorAll('holocron-slot');

  for (const slot of slots) {
    await loadHolocron(slot);
  }
}

async function renderLibrarySection(listContainer, holocronViewer) {
  const registry = await fetch("../holocrones/holocron-registry.json").
    then(r => r.json());

  const manifests = await Promise.all(
    registry.holocrons.map(async ({ path }) => {
      const response = await fetch(`${path}/manifest.json`);
      return response.json();
    })
  );

  listContainer.innerHTML = manifests.map( (holocron) => {
    const icon = HOLOCRON_ICONS_BY_CATEGORY[holocron.category] || HOLOCRON_ICONS_BY_CATEGORY.default;
    return `
        <article class="holocron holocron--${holocron.category}">
          <button
            class="holocron__action"
            data-holocron="${holocron.category}/${holocron.id}"
          >
            <img
              class="holocron__icono"
              src="${icon}"
              alt=""
            >

            <h3 class="holocron__titulo truncate">
              ${holocron.title}
            </h3>
          </button>
        </article>
      `;
    })
    .join("");

  listContainer.addEventListener("click", async (e) => {
    const btn = e.target.closest(".holocron__action");
    if (!btn) return;

    await renderHolocron(holocronViewer, btn.dataset.holocron);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const holocronList = document.getElementById("holocrones-list");
  const holocronViewer = document.getElementById("holocron-viewer-content");
  if (holocronList && holocronViewer) {
    renderLibrarySection(holocronList, holocronViewer);
  }
  renderHolocrons();
});
