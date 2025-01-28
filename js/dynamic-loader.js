document.addEventListener("DOMContentLoaded", () => {
    // Cargar la cabecera
    fetch("index-header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("index-dynamic-header").innerHTML = data;
        });

    // Cargar el pie
    fetch("index-footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("index-dynamic-footer").innerHTML = data;
        });
});
