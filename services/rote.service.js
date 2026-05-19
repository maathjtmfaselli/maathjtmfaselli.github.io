export class RoteService {

  async loadGuildHistoricalData() {
    const res = await fetch("../data/guild/rote-historical.json");

    if (!res.ok) {
      throw new Error("Failed to load guild historical data");
    }

    return res.json();
  }

  async loadProcessedGuildData() {
    const res = await fetch("../data/guild/guild-members-processed-data.json");

    if (!res.ok) {
      throw new Error("Failed to load processed guild data");
    }

    return res.json();
  }

  validateGuildHistorical(data) {
    if (!data?.historicalResults || !Array.isArray(data.historicalResults)) {
      throw new Error("Invalid structure");
    }
  }

  getLatestCompletedEvent(data) {
    const rows = data.historicalResults;

    const completed = rows.filter(r => r.status === "completed");

    if (!completed.length) {
      throw new Error("No completed events found");
    }

    return completed.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )[0];
  }

  safeParse (value) {
    if (!value) return { completed: 0, attempted: 0, eligible: 0 };

    if (value && typeof value === 'object') {
      return {
        completed: Number(value.completed || 0),
        attempted: Number(value.attempted || 0),
        eligible: Number(value.eligible || 0)
      };
    }

    // fallback si viene como "15/33/35"
    const [completed, attempted, eligible] = value.split('/').map(v => {
      const n = Number(v);
      return isNaN(n) ? 0 : n;
    });

    return { completed, attempted, eligible };
  };

  async getLatestMetrics() {
    const guildHistoricalData = await this.loadGuildHistoricalData();
    this.validateGuildHistorical(guildHistoricalData);
    const latest = this.getLatestCompletedEvent(guildHistoricalData);

    const processedGuildData = await this.loadProcessedGuildData();

    return {
      date: latest.date,
//      guildPg: latest.guildPg,
      stars: latest.stars,
//      pgUndeployed: latest.pgUndeployed,
//      ops: latest.ops,
      corellia: this.safeParse(latest.corellia),
      kashyyyk: this.safeParse(latest.kashyyyk),
      dathomir: this.safeParse(latest.dathomir),
      reva: this.safeParse(latest.reva),
      zeffo: {
        attempted: this.safeParse(latest.zeffo).attempted,
        completed: this.safeParse(latest.zeffo).completed,
        eligible: processedGuildData.members.filter( p => p.canDoBracca ).length
      },
      mandalor: {
        attempted: this.safeParse(latest.mandalor).attempted,
        completed: this.safeParse(latest.mandalor).completed,
        eligible: processedGuildData.members.filter( p => p.canDoTatooine ).length
      },
    };
  }
}
