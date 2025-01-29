function renderCharacterList(characters, listElementId) {
  const listElement = document.getElementById(listElementId);
  listElement.innerHTML = "";

  characters.forEach(character => {
    const listItem = document.createElement("li");

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

    renderCharacterList(data.topPriorityCharacters, "top-priority-characters-list");
    renderCharacterList(data.charactersToUpgrade, "characters-to-upgrade-list");
    renderCharacterList(data.upgradedCharacters, "upgraded-characters-list");
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
  loadCharacterData();
  loadHistoricalResults();
  initializeCollapsibleSections();
});
