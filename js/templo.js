//async function loadNabooHistoricalResults() {
//  try {
//    const response = await fetch('../json/rote-historical-results.json');
//    const data = await response.json();
//
//    const tableBody = document.querySelector("#resultados-table tbody");
//    tableBody.innerHTML = "";
//
//    data.historicalResults.forEach(result => {
//      const row = document.createElement("tr");
//
//      row.innerHTML = `
//        <td>${result.fecha}</td>
//        <td>${result.pg}</td>
//        <td>${result.noDesplegados}</td>
//        <td>${result.estrellas}</td>
//        <td>${result.pelotones}</td>
//        <td>${result.zeffo}</td>
//        <td>${result.mandalor}</td>
//        <td>${result.reva}</td>
//      `;
//
//      tableBody.appendChild(row);
//    });
//
//  } catch (error) {
//    console.error("Error loading historical results:", error);
//  }
//}

//async function loadNabooPnjSynergies() {
//  try {
//    const response = await fetch('../master-data/naboo-pnj-synergies.csv');
//    const csvText = await response.text();
//
//    // Convertir CSV a JSON usando PapaParse
//    const parsedData = Papa.parse(csvText, {
//      header: true,  // Utiliza la primera fila como claves
//      skipEmptyLines: true,
//    });
//
//    const data = parsedData.data; // Los datos convertidos en JSON
//    let pnjs = new Map();
//    let relicsRequired = new Map();
//    let synergies = new Map();
//
//    data.forEach(row => {
//      if (row.Personaje) {
//        const pnj = row.Personaje.trim();
//        pnjs.set(pnj, (pnjs.get(pnj) || 0) + 1);
//      }
//      if (row.Reliquia) {
//        const relicRequired = row.Reliquia.trim();
//        relicsRequired.set(relicRequired, (relicsRequired.get(relicRequired) || 0) + 1);
//      }
//      if (row.Sinergia) {
//        const synergy = row.Sinergia.trim();
//        synergies.set(synergy, (synergies.get(synergy) || 0) + 1);
//      }
//    });
//
//    // Select: Filtro por Personaje
//    const pnjSelect = document.querySelector("#pnj-filter");
//    Array.from(pnjs.entries())
//      .sort((a, b) => a[0].localeCompare(b[0]))
//      .forEach(([pnj, count]) => {
//        const option = document.createElement("option");
//        option.value = pnj;
//        option.textContent = `(${count}) ${pnj}`;
//        pnjSelect.appendChild(option);
//      });
//
//    // Select: Filtro por Reliquia
//    const relicSelect = document.querySelector("#relic-required-filter");
//    Array.from(relicsRequired.entries())
//      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
//      .forEach(([relic, count]) => {
//        const option = document.createElement("option");
//        option.value = relic;
//        option.textContent = `(${count}) ${relic}`;
//        relicSelect.appendChild(option);
//      });
//
//    // Select: Filtro por Sinergia
//    const synergySelect = document.querySelector("#synergy-filter");
//    Array.from(synergies.entries())
//      .sort((a, b) => a[0].localeCompare(b[0]))
//      .forEach(([synergy, count]) => {
//        const option = document.createElement("option");
//        option.value = synergy;
//        option.textContent = `(${count}) ${synergy}`;
//        synergySelect.appendChild(option);
//      });
//
//    // Obtener el cuerpo de la tabla donde insertaremos los datos
//    const tableBody = document.querySelector("#naboo-pnj-synergies tbody");
//    tableBody.innerHTML = "";  // Limpiar la tabla antes de agregar las filas
//
//    // Iterar sobre los datos y crear las filas correspondientes
//    data.forEach(row => {
//      const tableRow = document.createElement("tr");
//
//      // Asignar la clase de color a la fila
//      tableRow.innerHTML = `
//        <td>${row.Personaje}</td>
//        <td>${row.Reliquia}</td>
//        <td>${row.Sinergia}</td>
//      `;
//
//      // Agregar la fila al cuerpo de la tabla
//      tableBody.appendChild(tableRow);
//    });
//
//  } catch (error) {
//    console.error("Error loading naboo-pnjs-synergies master data:", error);
//  }
//}

//function filterNabooPnjSynergiesTable() {
//  const pnjFilter = document.querySelector("#pnj-filter").value;
//  const relicFilter = document.querySelector("#relic-required-filter").value;
//  const synergyFilter = document.querySelector("#synergy-filter").value;
//
//  const tableBody = document.querySelector("#naboo-pnj-synergies tbody");
//  const rows = tableBody.querySelectorAll("tr");
//
//  rows.forEach(row => {
//    const [pnjCell, relicCell, synergyCell] = row.querySelectorAll("td");
//
//    const matchesPnj = !pnjFilter || pnjCell.textContent.trim() === pnjFilter;
//    const matchesRelic = !relicFilter || relicCell.textContent.trim() === relicFilter;
//    const matchesSynergy = !synergyFilter || synergyCell.textContent.trim() === synergyFilter;
//
//    // Mostrar u ocultar la fila según filtros
//    if (matchesPnj && matchesRelic && matchesSynergy) {
//      row.style.display = "";
//    } else {
//      row.style.display = "none";
//    }
//  });
//}

document.addEventListener("DOMContentLoaded", () => {
//  loadNabooPnjSynergies();
  openTab('templo-planning');
//  loadNabooHistoricalResults();
});
