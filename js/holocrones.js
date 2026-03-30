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
            initGridPriorityProgress(viewer);
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