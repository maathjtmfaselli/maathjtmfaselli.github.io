async function loadTwData() {
  try {
    const response = await fetch('../csv/tw-counters.csv');
    const csvText = await response.text();

    // Convertir CSV a JSON usando PapaParse
    const parsedData = Papa.parse(csvText, {
      header: true,  // Utiliza la primera fila como claves
      skipEmptyLines: true,
    });

    const tableBody = document.querySelector("#tw-table tbody");
    tableBody.innerHTML = "";

    parsedData.data.forEach(row => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
        <td>${row["Equipo Defensa"] || ""}</td>
        <td>${row["Omi Defensa"] || ""}</td>
        <td>${row["PG Defensa"] || ""}</td>
        <td>${row["Counter"] || ""}</td>
        <td>${row["Omi Counter"] || ""}</td>
        <td>${row["PG Counter"] || ""}</td>
        <td>${row["Puntos"] || ""}</td>
        <td>${row["OK KO"] || ""}</td>
        <td>${row["Observaciones"] || ""}</td>
      `;

      tableBody.appendChild(tableRow);
    });
  } catch (error) {
    console.error("Error loading tw-counters data:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  loadTwData();
});
