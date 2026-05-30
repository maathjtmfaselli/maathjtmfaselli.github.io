document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const target = params.get("open");

  if (!target) return;

  const btn = document.querySelector(`.holocron__action[data-key="${target}"]`);

  if (btn) {
    btn.click(); // 👈 simula el click
  }
});
