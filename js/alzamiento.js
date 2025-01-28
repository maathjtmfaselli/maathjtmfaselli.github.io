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

const upgradedCharacters = [
  {
    name: "Vandor Chewbacca",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_chewbacca_vandor.png",
    relic: "Reliquia 6",
    assignedTo: "Mik Bat"
  },
  {
    name: "Chirrut Imwe",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_chirrut.png",
    relic: "Reliquia 7",
    assignedTo: "Temnyy"
  },
  {
    name: "Mon Mothma",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_monmothma.png",
    relic: "Reliquia 6",
    assignedTo: "R3C0"
  },
  {
    name: "Magmatrooper",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_trooperstorm_magma.png",
    relic: "Reliquia 6",
    assignedTo: "Blas"
  },
  {
    name: "Sabine Wren",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_sabine_s3.png",
    relic: "Reliquia 5",
    assignedTo: "GRANJEDI Tito1"
  },
  {
    name: "BT-1",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_bt1.png",
    relic: "Reliquia 6",
    assignedTo: "R3C0"
  },
  {
    name: "Rose Tico",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_rose.png",
    relic: "Reliquia 7",
    assignedTo: "Temnyy"
  },
  {
    name: "Jawa Engineer",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_jawa_engineer.png",
    relic: "Reliquia 5",
    assignedTo: "Darksneer"
  },
  {
    name: "Logray",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_ewok_logray.png",
    relic: "Reliquia 5",
    assignedTo: "GRANJEDI Tito1, Marblagar, Mik Bat"
  },
  {
    name: "Dengar",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_dengar.png",
    relic: "Reliquia 7",
    assignedTo: "Maath, Lucas"
  },
  {
    name: "Colonel Starck",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_colonel_stark.png",
    relic: "Reliquia 6",
    assignedTo: "Maath"
  },
  {
    name: "Nightsister Acolyte",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_nightsister_acolyte.png",
    relic: "Reliquia 7",
    assignedTo: "Cente"
  },
  {
    name: "Hunter",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_bb_hunter.png",
    relic: "Reliquia 7",
    assignedTo: "Cente"
  },
  {
    name: "Nightsister Initiate",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_nightsister_initiate.png",
    relic: "Reliquia 5",
    assignedTo: "Mik Bat"
  },
  {
    name: "Ugnaut",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_ugnaught.png",
    relic: "Reliquia 5",
    assignedTo: "Maath"
  },
  {
    name: "IG-88",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_ig88.png",
    relic: "Reliquia 7",
    assignedTo: "Viula"
  },
  {
    name: "Wedge Antilles",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_rebelpilot_wedge.png",
    relic: "Reliquia 6",
    assignedTo: "GRANJEDI Tito1"
  },
  {
    name: "Embo",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_embo.png",
    relic: "Reliquia 6",
    assignedTo: "Cente"
  },
  {
    name: "Lobot",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_lobot.png",
    relic: "Reliquia 5",
    assignedTo: "Marblagar"
  },
  {
    name: "Imperial Probe Droid",
    image: "https://game-assets.swgoh.gg/textures/tex.charui_probedroid.png",
    relic: "Reliquia 5",
    assignedTo: "Mr Zero, Mik Bat"
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
  renderCharacterList(upgradedCharacters, "upgraded-characters-list");
});
