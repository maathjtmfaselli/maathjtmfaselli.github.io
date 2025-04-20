
function openTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  const clickedButton = Array.from(document.querySelectorAll(".tab-button")).find(btn => btn.getAttribute("onclick")?.includes(tabId));
  if (clickedButton) {
    clickedButton.classList.add("active");
  }
}

function initializeCollapsibleSections() {
    const headers = document.querySelectorAll('.alzamiento-section h3');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const section = header.parentElement;
            section.classList.toggle('collapsed');
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeCollapsibleSections();
});
