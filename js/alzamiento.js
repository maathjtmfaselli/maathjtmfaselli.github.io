const CharacterStatus = Object.freeze({
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE"
});

function renderCharacterList(characters, listElementId) {
  const listElement = document.getElementById(listElementId);
  listElement.innerHTML = "";

  characters.forEach(character => {
    const listItem = document.createElement("li");

    let statusClass = "";
    switch (character.status) {
      case "TODO":
        statusClass = "todo";
        break;
      case "IN_PROGRESS":
        statusClass = "in-progress";
        break;
      case "DONE":
        statusClass = "done";
        break;
    }

    listItem.classList.add("character-item", character.status.toLowerCase());
    listItem.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <span class="character-name">${character.name}</span>
      <span class="relic-upgraded-required">${character.relic}</span>
      <span class="player-name">Asignado a: ${character.assignedTo || "Sin asignar"}</span>
    `;

    listElement.appendChild(listItem);
  });
}

async function loadCharacterData() {
  try {
    const response = await fetch('../json/rote-characters.json');
    const data = await response.json();

    // Asignar estado a cada personaje según su categoría
    const topPriorityCharacters = data.topPriorityCharacters.map(character => ({
      ...character,
        status: character.assignedTo && character.assignedTo.trim() !== ""
          ? CharacterStatus.IN_PROGRESS
          : CharacterStatus.TODO
    }));

    const charactersToUpgrade = data.charactersToUpgrade.map(character => ({
      ...character,
        status: character.assignedTo && character.assignedTo.trim() !== ""
          ? CharacterStatus.IN_PROGRESS
          : CharacterStatus.TODO
    }));

    const upgradedCharacters = data.upgradedCharacters.map(character => ({
      ...character,
      status: CharacterStatus.DONE
    }));

    renderCharacterList(topPriorityCharacters, "top-priority-characters-list");
    renderCharacterList(charactersToUpgrade, "characters-to-upgrade-list");
    renderCharacterList(upgradedCharacters, "upgraded-characters-list");
  } catch (error) {
    console.error("Error cargando los datos del JSON:", error);
  }
}

async function loadHistoricalResults() {
  try {
    const response = await fetch('../json/rote-historical-results.json');
    const data = await response.json();

    const tableBody = document.querySelector("#resultados-table tbody");
    tableBody.innerHTML = "";

    data.historicalResults.forEach(result => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${result.fecha}</td>
        <td>${result.pg}</td>
        <td>${result.noDesplegados}</td>
        <td>${result.estrellas}</td>
        <td>${result.pelotones}</td>
        <td>${result.zeffo}</td>
        <td>${result.mandalor}</td>
        <td>${result.reva}</td>
      `;

      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error("Error loading historical results:", error);
  }
}

async function loadOperationsGuildData() {
  try {
    const response = await fetch('../csv/rote-pelotones.csv');
    const csvText = await response.text();

    // Convertir CSV a JSON usando PapaParse
    const parsedData = Papa.parse(csvText, {
      header: true,  // Utiliza la primera fila como claves
      skipEmptyLines: true, // Omitir líneas vacías
    });

    const data = parsedData.data; // Los datos convertidos en JSON
    const pelotonesConConteoCero = new Set();
    let planets = new Set();
    let players = new Set();
    data.forEach(row => {
        // Paso 1: Identificar los pelotones con conteo 0
      let conteo = row.Conteo ? row.Conteo.trim() : '';  // Verificamos si Conteo existe, y le quitamos espacios
      if (conteo === '0') {
        // Si el conteo es 0, agregamos el pelotón (Side + Phase + Op) a nuestro Set
        pelotonesConConteoCero.add(`${row.Side}-${row.Phase}-${row.Op}`);
//        console.log("pelotonesConConteoCero - Side " + row.Side + " Phase " + row.Phase + " Op " + row.Op)
      }

    // Paso 2: Identificar los planetas
      planets.add(row.Planeta);

      // Paso 2: Identificar los jugadores
      for (let i = 1; i <= 4; i++) {
          const jugador = row[`Jugador${i}`]?.trim();
          if (jugador) {
              players.add(jugador);
          }
      }
    });

        const planetSelect = document.querySelector("#planet-filter");
        planets.forEach(planet => {
            const option = document.createElement("option");
            option.value = planet;
            option.textContent = planet;
            planetSelect.appendChild(option);
        });

        const playerSelect = document.querySelector("#player-filter");
        players.forEach(player => {
            const option = document.createElement("option");
            option.value = player;
            option.textContent = player;
            playerSelect.appendChild(option);
        });

    // Obtener el cuerpo de la tabla donde insertaremos los datos
    const tableBody = document.querySelector("#operations-guild-table tbody");
    tableBody.innerHTML = "";  // Limpiar la tabla antes de agregar las filas

    // Iterar sobre los datos y crear las filas correspondientes
    data.forEach(row => {
      // Concatenar las columnas de jugadores
      let jugadores = [];
      for (let i = 1; i <= 4; i++) {  // Suponiendo que los jugadores están en columnas Jugador1, Jugador2, Jugador3, Jugador4
        const jugador = row[`Jugador${i}`]?.trim();
        if (jugador) {
          jugadores.push(jugador);  // Si hay un jugador, lo agregamos al arreglo
        }
      }

      // Si hay jugadores, los unimos por coma. Si no, mostramos un espacio vacío.
      jugadores = jugadores.length > 0 ? jugadores.join(', ') : '&nbsp;';

      const tableRow = document.createElement("tr");

      let conteo = row.Conteo ? row.Conteo.trim() : '';
      let rowClass = '';

      // Verificar si el conteo está vacío o nulo, y asignar verde
      if (conteo === '') {
        rowClass = 'green';  // Consideramos vacío como suficiente
        conteo = '';  // Lo dejamos vacío en la tabla
      } else {
        conteo = parseInt(conteo, 10);

        // Asignar clases según el valor de conteo
        if (conteo === 0) {
          rowClass = 'row-red';
        } else if (conteo >= 1 && conteo <= 9) {
          rowClass = 'row-yellow';
        } else if (conteo >= 10) {
          rowClass = 'row-green';
        }
      }

      const peloton = `${row.Side}-${row.Phase}-${row.Op}`;

      // Asignar la clase de color a la fila
      tableRow.classList.add(rowClass);
      tableRow.innerHTML = `
        <td>${row.Planeta}</td>
        <td>${row.Side}</td>
        <td>${row.Phase}</td>
        <td class="${pelotonesConConteoCero.has(peloton) ? 'row-red' : ''}">${row.Op}</td>
        <td>${row.Character}</td>
        <td>${conteo}</td>
        <td>${jugadores}</td>
      `;

      // Agregar la fila al cuerpo de la tabla
      tableBody.appendChild(tableRow);
    });

  } catch (error) {
    console.error("Error loading rote-pelotones data:", error);
  }
}

function filterTable() {
    const planetFilterValue = document.querySelector("#planet-filter").value.trim();
    const playerFilterValue = document.querySelector("#player-filter").value.trim();

    const tableRows = document.querySelectorAll("#operations-guild-table tbody tr");

    tableRows.forEach(row => {
        const planetCell = row.cells[0];  // La celda que contiene el planeta
        const planet = planetCell.textContent.trim(); // El valor del planeta

        const playersCell = row.cells[6];  // La celda que contiene los jugadores
        const playersText = playersCell.textContent.trim(); // Los jugadores en la celda

        let showRow = true;

        // Filtro por planeta
        if (planetFilterValue && planet !== planetFilterValue) {
            showRow = false;
        }

        // Filtro por jugador
        if (playerFilterValue && !playersText.includes(playerFilterValue)) {
            showRow = false;
        }

        // Mostrar u ocultar la fila según los filtros aplicados
        row.style.display = showRow ? "" : "none";
    });
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

function openTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  event.currentTarget.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  loadCharacterData();
  loadHistoricalResults();
  loadOperationsGuildData();
  initializeCollapsibleSections();
});
