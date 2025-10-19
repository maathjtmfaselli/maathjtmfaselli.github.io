function marcarEnlaceActivoCabecera() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
    // Cargar la cabecera
    fetch("index-header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("index-dynamic-header").innerHTML = data;
            marcarEnlaceActivoCabecera();
        });

    // Cargar el pie
    fetch("index-footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("index-dynamic-footer").innerHTML = data;
        });
});
