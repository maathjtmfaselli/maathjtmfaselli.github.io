export async function fetchPlayer(allyCode) {
  const response = await fetch(`https://swgoh.gg/api/player/${allyCode}/`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",

      "Accept":
        "application/json,text/plain,*/*",

      "Accept-Language":
        "en-US,en;q=0.9"
    }
  });

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
