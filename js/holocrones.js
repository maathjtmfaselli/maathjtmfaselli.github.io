/*
const HolocronRegistry = {
  initializers: {},
  register(name, initializer) {
    this.initializers[name] = initializer;
  },
  get(name) {
    return this.initializers[name];
  }
};

document.addEventListener("click", handleHolocronActionClick);

async function handleHolocronActionClick(event) {

  const button = event.target.closest(".holocron__action");

  if (!button) return;

  const viewer =
    document.getElementById(
      "holocron-viewer-content"
    );

  const src = button.dataset.holocron;

  const shouldLoadChangelog =
    button.dataset.loadChangelog === "true";

  await loadHolocron({
    src,
    viewer,
    shouldLoadChangelog
  });
}

async function loadHolocron({
  src,
  viewer,
  shouldLoadChangelog = false
}) {

  try {

    renderHolocronLoading(viewer);

    const html =
      await fetchHolocronContent(src);

    renderHolocron(viewer, html);

    await initializeHolocron(viewer);

    if (shouldLoadChangelog) {
      loadChangelog();
    }

  } catch (error) {

    console.error(
      `Error loading holocron ${src}`,
      error
    );

    renderHolocronError(viewer);
  }
}

async function fetchHolocronContent(src) {

  const response = await fetch(src);

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}`
    );
  }

  return await response.text();
}

function renderHolocronLoading(viewer) {

  viewer.innerHTML = `
    <p class="holocron-loading">
      Cargando holocrón...
    </p>
  `;
}

function renderHolocron(viewer, html) {

  viewer.innerHTML = html;

  viewer.scrollTop = 0;
}

function renderHolocronError(viewer) {

  viewer.innerHTML = `
    <p class="holocron-error">
      Error cargando holocrón
    </p>
  `;
}

async function initializeHolocron(viewer) {

  initGridPriorityProgress(viewer);

  await initializeHolocronModules(viewer);

  dispatchHolocronLoaded(viewer);
}

async function initializeHolocronModules(container) {

  const holocron =
    container.querySelector(
      "[data-holocron-init]"
    );

  if (!holocron) return;

  const initializerName =
    holocron.dataset.holocronInit;

  const initializer =
    HolocronRegistry.get(initializerName);

  if (!initializer) {

    console.warn(
      `Holocron initializer not found: ${initializerName}`
    );

    return;
  }

  await initializer(holocron);
}

function dispatchHolocronLoaded(viewer) {

  document.dispatchEvent(
    new CustomEvent(
      "holocron:loaded",
      {
        detail: { viewer }
      }
    )
  );
}
*/

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".holocron__action");
    if (!btn) return;

    const src = btn.dataset.holocron;
    const viewer = document.getElementById("holocron-viewer-content");
    const shouldLoadChangelog = btn.dataset.loadChangelog === "true";

    viewer.innerHTML = "<p>Cargando holocrón...</p>";

    fetch(src)
        .then(res => res.text())
        .then(html => {
            viewer.innerHTML = html;
            viewer.scrollTop = 0;
            if (shouldLoadChangelog) {
                loadChangelog();
            }
        })
        .catch(err => console.error(`Error cargando holocron ${src}`, err));
});

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const target = params.get("open");

    if (!target) return;

    const btn = document.querySelector(`.holocron__action[data-key="${target}"]`);

    if (btn) {
        btn.click(); // 👈 simula el click
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("holocron-search");
  const holocrones = document.querySelectorAll(".holocron");

  function filtrarListaHolocrones() {
    const search = input.value.toLowerCase();

    holocrones.forEach(h => {
      if (h.textContent.toLowerCase().includes(search)) {
        h.style.display = "";
      } else {
        h.style.display = "none";
      }
    });
  }

  input.addEventListener("input", filtrarListaHolocrones);

  filtrarListaHolocrones();
});
