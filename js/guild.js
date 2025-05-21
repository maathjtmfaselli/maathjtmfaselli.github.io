
const ActivityLevel = Object.freeze({
  INACTIVO:   { key: "inactivo",   score: 0, className: "player-activity-inactivo" },
  NO_CUMPLE:  { key: "no-cumple",  score: 1, className: "player-activity-no-cumple" },
  PADAWAN:    { key: "padawan",    score: 2, className: "player-activity-padawan" },
  CABALLERO:  { key: "caballero",  score: 3, className: "player-activity-caballero" },
  MAESTRO:    { key: "maestro",    score: 4, className: "player-activity-maestro" }
});

const levels = {
  "Raid": [
    { level: ActivityLevel.INACTIVO,   condition: v => v === 0 },
    { level: ActivityLevel.NO_CUMPLE,  condition: v => v > 0 && v < 450 },
    { level: ActivityLevel.PADAWAN,    condition: v => v >= 450 && v < 1200 },
    { level: ActivityLevel.CABALLERO,  condition: v => v >= 1200 && v < 3600 },
    { level: ActivityLevel.MAESTRO,    condition: v => v >= 3600 }
  ],
  "Raid Tokens": [
    { level: ActivityLevel.INACTIVO,   condition: v => v === 0 },
    { level: ActivityLevel.NO_CUMPLE,  condition: v => v > 0 && v < 300*7 },
    { level: ActivityLevel.PADAWAN,    condition: v => v >= 300*7 && v < 450*7 },
    { level: ActivityLevel.CABALLERO,  condition: v => v >= 450*7 && v < 550*7 },
    { level: ActivityLevel.MAESTRO,    condition: v => v >= 550*7 }
  ],
  "ROTE": [
    { level: ActivityLevel.INACTIVO,   condition: v => v === 0 },
    { level: ActivityLevel.NO_CUMPLE,  condition: v => v > 0 && v < 2 },
    { level: ActivityLevel.PADAWAN,    condition: v => v >= 2 && v < 4 },
    { level: ActivityLevel.CABALLERO,  condition: v => v >= 4 && v < 6 },
    { level: ActivityLevel.MAESTRO,    condition: v => v >= 6 }
  ]
};

function parseCsvValue(raw) {
  const value = parseFloat(raw?.replace(",", "."));
  return isNaN(value) ? null : value;
}

async function loadGuildActivityData() {
  const files = [
    { file: '../csv/guild-pg.csv', key: 'PG' },
    { file: '../csv/guild-raid-tokens.csv', key: 'Raid Tokens' },
    { file: '../csv/guild-raid.csv', key: 'Raid' },
    { file: '../csv/guild-rote.csv', key: 'ROTE' },
  ];

  const playerData = new Map();

  for (const { file, key } of files) {
    try {
      const response = await fetch(file);
      const csvText = await response.text();

      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        delimiter: "\t",
      });

      const headers = parsed.meta.fields;
      const dateCols = headers.filter(h => h.match(/\d{2}\/\d{2}\/\d{4}/));

      parsed.data.forEach(row => {
        const name = row["Jugador"]?.trim();
        if (!name) return;

        if (!playerData.has(name)) {
          playerData.set(name, {
            PG: [],
            "Raid": [],
            "Raid Tokens": [],
            "ROTE": []
          });
        }

        const entry = playerData.get(name);

        if (key === "PG") {
          const values = dateCols.map(date => parseCsvValue(row[date]));
          entry.PG = values;
        } else if (key === "Raid Tokens") {
          const cumulative = dateCols.map(date => parseCsvValue(row[date]));
          const tokensGenerated = [];

          for (let i = 0; i < cumulative.length - 1; i++) {
            const current = cumulative[i];
            const next = cumulative[i + 1];
            tokensGenerated.push(
              current != null && next != null ? current - next : null
            );
          }

          entry["Raid Tokens"] = tokensGenerated;
        } else if (key === "ROTE") {
          const roteRaw = dateCols.map(date => parseCsvValue(row[date]));
          const latestPG = entry.PG?.[0];

          const normalized = roteRaw.map(v => (v != null && latestPG ? v / latestPG : null));
          entry["ROTE"] = normalized;
        } else if (key === "Raid") {
          const values = dateCols.map(date => parseCsvValue(row[date]));
          entry["Raid"] = values;
        }
      });
    } catch (err) {
      console.error(`Error cargando ${file}:`, err);
    }
  }

  return playerData;
}

function getActivityLevel(category, value) {
  if (value == null) return null;

  const strValue = typeof value === "string" ? value : value.toString();
  const parsed = parseFloat(strValue.replace(",", "."));
  if (isNaN(parsed)) return null;

  const categoryLevels = levels[category];
  if (!categoryLevels) return null; // <- solución

  return categoryLevels.find(l => l.condition(parsed))?.level || null;
}

function getClassAndValue(valor, rango) {
    if (valor === 0) {
        return `<td class="inactivo">0.00</td>`;
    } else if (valor === null || valor === undefined || valor === '') {
        return `<td></td>`;
    } else {
        return `<td class="player-activity-${rango.toLowerCase()}" title="${rango.toLowerCase()}">${valor.toFixed(2)}</td>`;
    }
}

function renderActivityTable(playerData, category, containerId, title) {
  const table = document.createElement("table");
  table.classList.add("data-table");

  const headerRow = document.createElement("tr");
  const thName = document.createElement("th");
  thName.textContent = "Jugador";
  headerRow.appendChild(thName);

  const examplePlayer = [...playerData.values()][0];
  const weeks = examplePlayer[category]?.length || 0;

  for (let i = 0; i < weeks; i++) {
    const th = document.createElement("th");
    th.textContent = `Semana ${i + 1}`;
    headerRow.appendChild(th);
  }

  const thead = document.createElement("thead");
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  for (const [name, data] of playerData.entries()) {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = name;
    tr.appendChild(tdName);

    const values = data[category] || [];
    values.forEach(val => {
      const td = document.createElement("td");

      if (val === 0) {
        td.textContent = "0";
        td.classList.add(ActivityLevel.INACTIVO.className);
      } else if (val != null && !isNaN(val)) {
        td.textContent = val.toFixed(2);
        const level = getActivityLevel(category, val);
        if (level) {
          td.classList.add(level.className);
          td.title = level.key;
        }
      } // Si es null o NaN, no mostramos nada en la celda

      tr.appendChild(td);
    });


    tbody.appendChild(tr);
  }

  table.appendChild(tbody);

  const container = document.getElementById(containerId);
  container.innerHTML = `<h3>${title}</h3>`;
  container.appendChild(table);
}

function computePlayerRanks(playerData) {
  for (const [name, data] of playerData.entries()) {
    for (const category of ["Raid", "Raid Tokens", "ROTE"]) {
      const values = data[category] || [];
      const validValues = values.filter(v => v != null && !isNaN(v));
      if (validValues.length === 0) continue;

      const avg = validValues.reduce((a, b) => a + b, 0) / validValues.length;
      const level = getActivityLevel(category, avg);
      if (level) {
        // Guardamos el rango global por categoría
        data[`rango${category.replace(" ", "")}`] = level;
      }
    }
  }
}

function renderGlobalActivityTable(playerData, containerId) {
  const table = document.createElement("table");
  table.classList.add("data-table");

  // Crear cabecera de la tabla
  const headerRow = document.createElement("tr");
  const thName = document.createElement("th");
  thName.textContent = "Jugador";
  headerRow.appendChild(thName);

  const thPG = document.createElement("th");
  thPG.textContent = "PG";
  headerRow.appendChild(thPG);

  const thRaid = document.createElement("th");
  thRaid.textContent = "Raid";
  headerRow.appendChild(thRaid);

  const thTokens = document.createElement("th");
  thTokens.textContent = "Raid Tokens";
  headerRow.appendChild(thTokens);

  const thRote = document.createElement("th");
  thRote.textContent = "RotE";
  headerRow.appendChild(thRote);

  const thead = document.createElement("thead");
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Crear cuerpo de la tabla
  const tbody = document.createElement("tbody");

  for (const [name, data] of playerData.entries()) {
    const tr = document.createElement("tr");

    // Nombre del jugador
    const tdName = document.createElement("td");
    tdName.textContent = name;
    tr.appendChild(tdName);

    // PG del jugador (solo el valor numérico de la primera semana)
    const tdPG = document.createElement("td");
    tdPG.textContent = data.PG?.[0]?.toFixed(2) || "N/A";
    tr.appendChild(tdPG);

    // Rango Raid
    const tdRaid = document.createElement("td");
    const rangoRaid = data.rangoRaid || null;
    if (rangoRaid) {
      tdRaid.classList.add(rangoRaid.className);  // Aplicamos la clase del rango de Raid
      tdRaid.title = rangoRaid.key;               // Opcional: para mostrar el tooltip del rango
    }
    tr.appendChild(tdRaid);

    // Rango Tokens
    const tdTokens = document.createElement("td");
    const rangoTokens = data.rangoRaidTokens || null;
    if (rangoTokens) {
      tdTokens.classList.add(rangoTokens.className);  // Aplicamos la clase del rango de Tokens
      tdTokens.title = rangoTokens.key;               // Opcional: para mostrar el tooltip del rango
    }
    tr.appendChild(tdTokens);

    // Rango ROTE
    const tdRote = document.createElement("td");
    const rangoRote = data.rangoROTE || null;
    if (rangoRote) {
      tdRote.classList.add(rangoRote.className);  // Aplicamos la clase del rango de ROTE
      tdRote.title = rangoRote.key;               // Opcional: para mostrar el tooltip del rango
    }
    tr.appendChild(tdRote);

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);

  // Agregar la tabla al contenedor
  const container = document.getElementById(containerId);
//  container.innerHTML = `<h3>${title}</h3>`;
  container.appendChild(table);
}


document.addEventListener("DOMContentLoaded", async () => {
  const playerData = await loadGuildActivityData();
//console.log("📊 playerData generado:", playerData);

  renderActivityTable(playerData, "PG", "guild-pg", "🧠 Poder Galáctico Semanal");
  renderActivityTable(playerData, "Raid", "guild-raids", "🐲 Raid Participación");
  renderActivityTable(playerData, "Raid Tokens", "guild-raid-tokens", "🎫 Tokens de Raid");
  renderActivityTable(playerData, "ROTE", "guild-rote", "🌌 ROTE Actividad");

  computePlayerRanks(playerData);
//console.log("📊 playerData rangos:", playerData);

  renderGlobalActivityTable(playerData, "guild-global");
  openTab('guild-global');
});
