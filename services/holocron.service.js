export class HolocronBase extends HTMLElement {

  async connectedCallback() {
    await this.renderTemplate();
    await this.loadData();
    this.afterRender();
  }

  async renderTemplate() {
    const template = await fetch(`/holocrones/${this.getHolocronCategory()}/${this.getHolocronId()}/template.html`)
        .then(r => r.text());

    this.innerHTML = template;
  }

  getHolocronCategory() {
    throw new Error("getHolocronCategory() debe implementarse");
  }
  getHolocronId() {
    throw new Error("getHolocronId() debe implementarse");
  }
  async loadData() {
    throw new Error("loadData() debe implementarse");
  }
  afterRender() {
    throw new Error("afterRender() debe implementarse");
  }
}

const HOLOCRON_ICONS_BY_CATEGORY = {
  guild: "img/holocron-yellow.png",
  resources: "img/holocron-blue-dark.png",
  rote: "img/holocron-red.png",
  "raid-padawan": "img/holocron-red.png",
  "raid-knight": "img/holocron-red.png",
  "raid-grandmaster": "img/holocron-red.png",
  conquest: "img/holocron-red.png",
  journey: "img/holocron-green.png",
  archive: "img/holocron-blue-light.png",
  default: "img/holocron-blue-light.png"
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

const HOLOCRON_CATEGORIES = {
  guild: "Gremio",
  web: "Web",
  resources: "Recursos",
  "raid-grandmaster": "Asalto · Gran Maestro",
  "raid-knight": "Asalto · Caballero",
  "raid-padawan": "Asalto · Padawan",
  rote: "RotE",
  conquest: "Conquista",
  journey: "Viajes",
  archive: "Archivo"
};

async function renderLibrarySection(listContainer, holocronViewer) {
  const categoriesContainer = document.getElementById(
    "holocron-categories"
  );

  const registry = await fetch(
    "../holocrones/holocron-registry.json"
  ).then(response => {
    if (!response.ok) {
      throw new Error("Cannot load holocron registry");
    }
    return response.json();
  });

  const manifests = await Promise.all(
    registry.holocrons.map(async ({ path }) => {
      const response = await fetch(`/${path}/manifest.json`);

      if (!response.ok) {
        throw new Error(`Cannot load manifest: ${path}`);
      }

      return {
        ...await response.json(),
        path
      };
    })
  );

  let selectedCategory = "all";

  // Render category navigation.
  const categories = [
    {
      id: "all",
      label: "Todos",
      count: manifests.length
    },
    ...Object.entries(HOLOCRON_CATEGORIES)
      .map(([id, label]) => ({
        id,
        label,
        count: manifests.filter(
          holocron => holocron.category === id
        ).length
      }))
      .filter(category => category.count > 0)
  ];

  function renderCategories() {
    categoriesContainer.replaceChildren();

    categories.forEach(({ id, label, count }) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "holocron-category";
      button.dataset.category = id;
      button.setAttribute(
        "aria-pressed",
        String(selectedCategory === id)
      );

      const name = document.createElement("span");
      name.textContent = label;

      const badge = document.createElement("span");
      badge.className = "holocron-category__count";
      badge.textContent = count;
      badge.setAttribute("aria-label", `${count} holocrones`);

      button.append(name, badge);

      button.addEventListener("click", () => {
        selectedCategory = id;
        renderCategories();
        filterHolocrons();
      });

      categoriesContainer.append(button);
    });
  }

  // Render every holocron card once.
  listContainer.replaceChildren(
    ...manifests.map(createHolocronCard)
  );

  const cards = [...listContainer.querySelectorAll(".holocron")];
  const searchInput = document.getElementById("holocron-search");

  // Apply category and search filters together.
  function filterHolocrons() {
    const search = searchInput.value.trim().toLocaleLowerCase();

    cards.forEach(card => {
      const category = [...card.classList]
        .find(className => className.startsWith("holocron--"))
        ?.slice("holocron--".length);

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      const matchesSearch = card.textContent
        .toLocaleLowerCase()
        .includes(search);

      card.hidden = !(matchesCategory && matchesSearch);
    });
  }

  renderCategories();
  filterHolocrons();

  searchInput.addEventListener("input", filterHolocrons);

  // Preserve the existing viewer interaction.
  listContainer.addEventListener("click", async event => {
    const button = event.target.closest(".holocron__action");

    if (!button || !listContainer.contains(button)) return;

    await renderHolocron(
      holocronViewer,
      button.dataset.holocron
    );
  });
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

function openHolocronRequested() {
  const targetHolocron = new URLSearchParams(window.location.search).get("open");

  if (!targetHolocron) return;

  const btn = document.querySelector(`.holocron__action[data-holocron="${targetHolocron}"]`);

  if (btn) {
    btn.click(); // 👈 simula el click
  }
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
    openHolocronRequested()
  }
  renderHolocrons();
});
