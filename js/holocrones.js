document.addEventListener("click", (e) => {
    const btn = e.target.closest(".holocron__action");
    if (!btn) return;

    const src = btn.dataset.holocron;
    const viewer = document.getElementById("holocron-viewer-content");

    viewer.innerHTML = "<p>Cargando holocrón...</p>";

    fetch(src)
        .then(res => res.text())
        .then(html => {
            viewer.innerHTML = html;
            viewer.scrollTop = 0;
            initGridPriorityProgress(viewer);
        })
        .catch(err => console.error(`Error cargando holocron ${src}`, err));
});