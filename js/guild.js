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
    { level: ActivityLevel.NO_CUMPLE,  condition: v => v > 0 && v < 450 },
    { level: ActivityLevel.PADAWAN,    condition: v => v >= 450 && v < 1200 },
    { level: ActivityLevel.CABALLERO,  condition: v => v >= 1200 && v < 3600 },
    { level: ActivityLevel.MAESTRO,    condition: v => v >= 3600 }
  ],
  "ROTE": [
    { level: ActivityLevel.INACTIVO,   condition: v => v === 0 },
    { level: ActivityLevel.NO_CUMPLE,  condition: v => v > 0 && v < 2 },
    { level: ActivityLevel.PADAWAN,    condition: v => v >= 2 && v < 3 },
    { level: ActivityLevel.CABALLERO,  condition: v => v >= 3 && v < 5 },
    { level: ActivityLevel.MAESTRO,    condition: v => v >= 5 }
  ]
};

function getActivityLevel(category, value) {
  const parsed = parseFloat(value.toString().replace(",", "."));
  if (isNaN(parsed)) return null;

  const categoryLevels = levels[category];
  return categoryLevels.find(l => l.condition(parsed))?.level || null;
}

function getGlobalActivityLevel(category, values) {
  const validValues = values
    .map(v => parseFloat((v ?? "").toString().replace(",", ".")))
    .filter(v => !isNaN(v));

  if (validValues.length === 0) return null;

  const scores = validValues.map(v => getActivityLevel(category, v)?.score ?? 0);
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

  // Redondeamos hacia el nivel más cercano
  const nearestLevel = levels[category].reduce((best, level) => {
    return Math.abs(avgScore - level.score) < Math.abs(avgScore - best.score) ? level : best;
  });

  return nearestLevel;
}

function formatCell(td, value, category) {
  const level = getActivityLevel(category, value);
  if (level) {
    td.classList.add(level.className);
    td.title = level.key;
  }
}

async function loadGuildActivityData() {
  const files = [
    { file: '../csv/guild-pg.csv', containerId: 'guild-pg', title: '🧠 Poder Galáctico Semanal', formatter: null },
    { file: '../csv/guild-raid-tokens.csv', containerId: 'guild-raid-tokens', title: '🎫 Tokens de Raid', formatter: formatRaidTokensCell },
    { file: '../csv/guild-raid.csv', containerId: 'guild-raids', title: '🐲 Raid Participación', formatter: formatRaidCell },
    { file: '../csv/guild-rote.csv', containerId: 'guild-rote', title: '🌌 ROTE Actividad', formatter: formatRoteCell },
  ];

  for (const { file, containerId, title, formatter } of files) {
    try {
      const response = await fetch(file);
      const csvText = await response.text();

      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        delimiter: "\t", // Cambia si el CSV es por comas
      });

      const data = parsed.data;
      const headers = parsed.meta.fields;
      const table = createActivityTable(data, headers, formatter);

      const container = document.getElementById(containerId);
      container.innerHTML = `<h3>${title}</h3>`;
      container.appendChild(table);

    } catch (error) {
      console.error(`Error cargando el archivo ${file}:`, error);
      const container = document.getElementById(containerId);
      container.innerHTML = `<p style="color:red;">Error cargando ${title}</p>`;
    }
  }
}

function createActivityTable(data, headers, formatCellCallback) {
  const table = document.createElement("table");
  table.classList.add("data-table");

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    headRow.appendChild(th);
  });

  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.forEach(row => {
    const tr = document.createElement("tr");

    headers.forEach((header, index) => {
      const td = document.createElement("td");
      const value = row[header] || '';
      td.textContent = value;

      if (index > 0 && formatCellCallback) {
        formatCellCallback(td, value, row, headers, index);
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  return table;
}

function formatRaidCell(td, value) {
  const level = getActivityLevel("Raid", value);
  if (level) {
    td.classList.add(level.className);
    td.title = level.key;
  }
}

function formatRaidTokensCell(td, value, row, headers, index) {
  if (index < 1 || index >= headers.length - 1) return;

  const currentDate = headers[index];
  const prevDate = headers[index + 1];

  const currentRaw = row[currentDate];
  const previousRaw = row[prevDate];

  if (!currentRaw || !previousRaw) return;

  const current = parseInt(currentRaw.replace(',', '').trim(), 10);
  const previous = parseInt(previousRaw.replace(',', '').trim(), 10);

  if (isNaN(current) || isNaN(previous)) return;

  const tokensGenerated = current - previous;

  const level = getActivityLevel("Raid Tokens", tokensGenerated);
  if (level) {
    td.classList.add(level.className);
    td.title = `${level.key} +${tokensGenerated} tokens generados`;
  }
}

function formatRoteCell(td, value, row) {
  if (!value) return;

  const rote = parseFloat(value.replace(',', '.'));
  const pgRaw = row["PG"];
  if (!pgRaw) return;

  const pg = parseFloat(pgRaw.replace(',', '.'));
  if (isNaN(rote) || isNaN(pg) || pg === 0) return;

  const despliegues = rote / pg;

  const level = getActivityLevel("ROTE", despliegues);
  if (level) {
    td.classList.add(level.className);
    td.title = `${level.key} ≈ ${despliegues.toFixed(2)} despliegues`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadGuildActivityData();
  openTab('guild-pg');
});
