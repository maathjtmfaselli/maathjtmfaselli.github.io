import { HolocronBase } from "../../../services/holocron.service.js";
import { GuildMembersService } from "../../../services/guild-members.service.js";
import { RoteService } from "../../../services/rote.service.js";
await import("../../../js/components/data-table.js");

class RotePlanHolocron extends HolocronBase {

  constructor() {
    super();
    this.guildMembersService = new GuildMembersService();
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
    this.loadOpsByGuildData();
    this.loadCharacterUpgradeData();
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
        statusClass = "status--todo";
        break;
      case "IN_PROGRESS":
        statusClass = "status--in_progress";
        break;
      case "DONE":
        statusClass = "status--done";
        break;
    }

    listItem.classList.add("character", statusClass);
    listItem.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <span class="character-name">${character.name}</span>
      <span class="relic-upgraded-required">${character.relic}</span>
      <span class="player-name">Asignado a: ${character.assignedTo || "Sin asignar"}</span>
    `;

    listElement.appendChild(listItem);
  });
}

  async loadOpsByGuildData() {
    const roteOpsTable = document.querySelector("#pnjs-ops-by-guild-table");
    if (!roteOpsTable) return;

    const opsMasterData = await this.roteService.getMasterDataPnjsByOps();
    const playersRosterData = await this.guildMembersService.loadMembersRoster();
    const playerContributionCounts = this.getPlayerContributionCounts( opsMasterData, playersRosterData.members );

    roteOpsTable.initialize({
      rows: opsMasterData.map(ops => {
        const contributors = this.getPlayersWithRequiredRelic(ops.Sector, ops.Character, playersRosterData.members );
        return {
          sector: ops.Sector,
          planet: ops.Planeta,
          op: ops.Op,
          character: ops.Character,
          contributorsCount: `${contributors.length} jugadores`,
          contributors: {
            value: contributors,
            display: `${contributors.length} jugadores`
          },
        };
      }),
      columns: [
        { field: "sector", label: "Sector" },
        { field: "planet", label: "Planeta" },
        { field: "op", label: "Op" },
        { field: "character", label: "Character" },
        { field: "contributors", label: "Jugadores" }
      ],
      filters: [
        { field: "sector", label: "Sector" },
        { field: "planet", label: "Planeta" },
        { field: "op", label: "Op" },
        { field: "character", label: "Character" },
        { field: "contributors", label: "Jugador" },
        { field: "contributorsCount", label: "# Jugadores",
          options: [0, 1, 2, 3, 4]
              .map(count => ({
                value: `${count} jugadores`,
                label: `${count} jugadores`
              }))
        }
      ]
    });
  }

  getPlayersWithRequiredRelic(sector, character, playersRosterData) {
    const requiredRelic = Number(sector) + 4;

    return playersRosterData
      .filter(player => (player.units?.[character] ?? 0) >= requiredRelic)
      .map(player => player.name);
  }

  getPlayerContributionCounts(opsMasterData, playersRosterData) {
    const playerCounts = new Map();

    // Initialize every player with 0
    playersRosterData.forEach(player => {
      playerCounts.set(player.name, 0);
    });

    opsMasterData.forEach(ops => {
      const players = this.getPlayersWithRequiredRelic(
        ops.Sector,
        ops.Character,
        playersRosterData
      );

      // Only count PNJs contributed by 4 or fewer players
      if (players.length > 4) return;

      players.forEach(player => {
        playerCounts.set(
          player,
          playerCounts.get(player) + 1
        );
      });
    });

    return playerCounts;
  }

async loadCharacterUpgradeData() {

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
