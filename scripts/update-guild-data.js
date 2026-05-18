import fs from "fs/promises";

const FETCH_PLAYER_DELAY_MS = 1000;
const INPUT_CSV = "./data/guild/guild-members.csv";
const RAW_OUTPUT = "./data/guild/guild-members-raw-data.json";
const PROCESSED_OUTPUT = "./data/guild/guild-members-processed-data.json";

async function loadCsv(path) {
  const text = await fs.readFile(path, "utf-8");

  const rows = text
    .trim()
    .split("\n")
    .map(r => r.split(",").map(x => x.trim()));

  const headers = rows[0];

  return rows.slice(1).map(row => {
    const obj = {};

    headers.forEach((header, i) => {

      obj[header.trim()] = row[i]?.trim();
    });

    return obj;
  });
}

async function fetchPlayer(allyCode) {
  const response = await fetch(`https://swgoh.gg/api/player/${allyCode}/`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json();
}

function extractUnits(playerData) {
  const units = {};

  for (const unit of playerData.units) {
    units[unit.name] = Number(unit.relic_tier ?? -1);
  }

  return units;
}

function processPlayer(rawPlayer) {
  const units = rawPlayer.units;

  return {
    name: rawPlayer.name,
    allyCode: rawPlayer.allyCode,
    canDoBracca: (units["Cere Junda"] || 0) >= 7 && (units["Jedi Cal Kestis"] || 0) >= 7,
    canDoTatooine: (units["Bo-Katan (Mand'alor)"] || 0) >= 7
  };
}

async function update() {
  const timestamp = new Date().toISOString();
  const guildMembers = await loadCsv(INPUT_CSV);
  const rawPlayers = [];

  for (const member of guildMembers) {
    console.log(`Fetching ${member.name}`);

    try {
      await new Promise(r => setTimeout(r, FETCH_PLAYER_DELAY_MS));
      const data = await fetchPlayer(member.allyCode);

      rawPlayers.push({
        name: member.name,
        allyCode: member.allyCode,
        units: extractUnits(data)
      });

    } catch (error) {
      console.error(`Error fetching ${member.name}`);
      console.error(error.message);
    }
  }

  const rawOutput = {
    updated: timestamp,
    players: rawPlayers
  };

  await fs.writeFile(
    RAW_OUTPUT,
    JSON.stringify(rawOutput, null, 2)
  );

  console.log("Raw data generated", rawOutput);

  const processedPlayers = rawPlayers.map(processPlayer);

  const processedOutput = {
    updated: timestamp,
    players: processedPlayers
  };

  await fs.writeFile(
    PROCESSED_OUTPUT,
    JSON.stringify(
      processedOutput,
      null,
      2
    )
  );

  console.log("Processed data generated", processedOutput);
}

update().catch(console.error);
