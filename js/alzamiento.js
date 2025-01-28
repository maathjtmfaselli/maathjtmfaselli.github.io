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
  initializeCollapsibleSections();
});
