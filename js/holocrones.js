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
