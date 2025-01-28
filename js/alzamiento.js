const topPriorityCharacters = [
  {
    name: "Ewok Scout",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_ewok_scout.png",
    relic: "Reliquia 7",
    assignedTo: "Viula"
  }
];

const charactersToUpgrade = [
  {
    name: "Ima-Gun Di",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_imagundi.png",
    relic: "Reliquia 5",
    assignedTo: "Maath"
  },
  {
    name: "Pao",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_pao.png",
    relic: "Reliquia 6",
    assignedTo: "Gita"
  },
  {
    name: "Logray",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_ewok_logray.png",
    relic: "Reliquia 7",
    assignedTo: ""
  },
  {
    name: "Kuiil",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_kuiil.png",
    relic: "Reliquia 6",
    assignedTo: "Mik Bat"
  },
  {
    name: "Kanan Jarrus",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_kanan_s3.png",
    relic: "Reliquia 6",
    assignedTo: ""
  },
  {
    name: "Greef Karga",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_greefkarga.png",
    relic: "Reliquia 7",
    assignedTo: "Maath"
  },
  {
    name: "Sargento Clon",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_trooperclonegreen.png",
    relic: "Reliquia 7",
    assignedTo: ""
  }
];

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

document.addEventListener("DOMContentLoaded", () => {
  renderCharacterList(topPriorityCharacters, "top-characters-to-upgrade-list");
  renderCharacterList(charactersToUpgrade, "characters-to-upgrade-list");
//  renderCharacterList(upgradedCharacters);
});
