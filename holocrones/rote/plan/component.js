import { HolocronBase } from "../../../services/holocron.service.js";
import { RoteService } from "../../../services/rote.service.js";
await import("../../../js/components/data-table.js");

class RotePlanHolocron extends HolocronBase {

  constructor() {
    super();
    this.roteService = new RoteService();
  }

  getHolocronCategory() {
    return "rote";
  }
  getHolocronId() {
    return "plan";
  }

  async loadData() {
//    const ops = await this.roteService.getGuildOperations();
    this.loadCharacterData();
  }

  afterRender() {
  }

  renderData() {
//    await this.roteService.getMasterDataPnjsByOps());
//    const tbody = document.querySelector("#rote-guild-ops-table tbody");

//    tbody.innerHTML = "";
//    const row = document.createElement("tr");
//    ops.forEach(op => {
//      const td = document.createElement("td");
//
//      td.className = getCellClass(op);
//
//      const tooltip = getTooltip(op);
//
//      if (tooltip) {
//        td.dataset.hover = tooltip;
//      }
//
//      row.appendChild(td);
//    });
//
//    tbody.appendChild(row);
  }

renderCharacterList(characters, listElementId) {
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

async loadCharacterData() {

const CharacterStatus = Object.freeze({
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE"
});

  try {
    const response = await fetch('../data/guild/rote-characters-to-upgrade.json');
    const data = await response.json();

    // Asignar estado a cada personaje según su categoría
    const topPriorityCharacters = data.topPriorityCharacters.map(character => ({
      ...character,
        status: character.assignedTo && character.assignedTo.trim() !== ""
          ? CharacterStatus.IN_PROGRESS
          : CharacterStatus.TODO
    }));

//    const charactersToUpgrade = data.charactersToUpgrade.map(character => ({
//      ...character,
//        status: character.assignedTo && character.assignedTo.trim() !== ""
//          ? CharacterStatus.IN_PROGRESS
//          : CharacterStatus.TODO
//    }));
//
//    const upgradedCharacters = data.upgradedCharacters.map(character => ({
//      ...character,
//      status: CharacterStatus.DONE
//    }));

    this.renderCharacterList(topPriorityCharacters, "top-priority-characters-list");
//    renderCharacterList(charactersToUpgrade, "characters-to-upgrade-list");
//    renderCharacterList(upgradedCharacters, "upgraded-characters-list");
  } catch (error) {
    console.error("Error cargando los datos del JSON:", error);
  }
}

//  function getCellClass(op) {
//    const canComplete = op.required.every(
//      req => req.available >= req.needed
//    );
//
//    if (!canComplete) {
//      return "bg--red";
//    }
//
//    const isJustEnough = op.required.some(
//      req => req.available === req.needed
//    );
//
//    return isJustEnough
//      ? "bg--green bg--special"
//      : "bg--green";
//  }
//  function getTooltip(op) {
//    return op.required
//      .map(req => {
//        return `Se necesitan ${req.needed} ${req.unit} R${req.relic} y tenemos ${req.available}`;
//      })
//      .join("\n");
//  }
}

customElements.define("holocron-rote-plan", RotePlanHolocron);
