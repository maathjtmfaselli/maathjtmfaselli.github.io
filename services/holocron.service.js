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

  listContainer.replaceChildren(
    ...manifests.map(createHolocronCard)
  );

  listContainer.addEventListener("click", async (e) => {
    const btn = e.target.closest(".holocron__action");
    if (!btn) return;

    await renderHolocron(holocronViewer, btn.dataset.holocron);
  });
}

function createHolocronCard(holocron) {
  const article = document.createElement("article");
  article.className = `holocron holocron--${holocron.category}`;

  const button = document.createElement("button");
  button.className = "holocron__action";
  button.dataset.holocron = `${holocron.category}/${holocron.id}`;

  const icon = document.createElement("img");
  icon.className = "holocron__icono";
  icon.alt = "";
  icon.src =
    HOLOCRON_ICONS_BY_CATEGORY[holocron.category] ||
    HOLOCRON_ICONS_BY_CATEGORY.default;

  const title = document.createElement("h3");
  title.className = "holocron__titulo truncate";
  title.textContent = holocron.title;

  button.append(icon, title);
  article.appendChild(button);

  return article;
}

function filtrarListaHolocrones(input, listadoHolocrones) {
  const search = input.value.toLowerCase();

  listadoHolocrones.forEach(h => {
    if (h.textContent.toLowerCase().includes(search)) {
      h.style.display = "";
    } else {
      h.style.display = "none";
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const holocronList = document.getElementById("holocrones-list");
  const holocronViewer = document.getElementById("holocron-viewer-content");
  if (holocronList && holocronViewer) {
    await renderLibrarySection(holocronList, holocronViewer);
    const input = document.getElementById("holocron-search");
    const holocrones = document.querySelectorAll(".holocron");

    input.addEventListener("input", () =>
      filtrarListaHolocrones(input, holocrones)
    );
    filtrarListaHolocrones(input, holocrones);
  }
  renderHolocrons();
});
