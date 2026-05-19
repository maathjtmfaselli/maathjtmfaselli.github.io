export async function fetchPlayer(allyCode) {
  const response = await fetch(`https://swgoh.gg/api/player/${allyCode}/`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  return await data;
}

export function extractUnits(playerData) {
  const units = {};

  for (const unit of playerData.units) {
    units[unit.data.name] = Math.max(0, unit.data.relic_tier - 2);
  }

  return units;
}

export function processPlayer(rawPlayer) {
  const units = rawPlayer.units;
  return {
    name: rawPlayer.name,
    allyCode: rawPlayer.allyCode,
    canDoBracca: (units["Cere Junda"] || 0) >= 7 && (units["Jedi Knight Cal Kestis"] || 0) >= 7,
    canDoTatooine: (units["Bo-Katan (Mand'alor)"] || 0) >= 7
  };
}
