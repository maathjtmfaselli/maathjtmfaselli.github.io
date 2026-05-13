export class RoteService {

  async loadData() {
    const res = await fetch("../data/guild/rote-historical.json");

    if (!res.ok) {
      throw new Error("Failed to load data");
    }

    return res.json();
  }

  validate(data) {
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
    const data = await this.loadData();

    this.validate(data);

    const latest = this.getLatestCompletedEvent(data);

    return {
      date: latest.date,
//      guildPg: latest.guildPg,
      stars: latest.stars,
//      pgUndeployed: latest.pgUndeployed,
//      ops: latest.ops,
      corellia: this.safeParse(latest.corellia),
      zeffo: this.safeParse(latest.zeffo),
      kashyyyk: this.safeParse(latest.kashyyyk),
      dathomir: this.safeParse(latest.dathomir),
      mandalor: this.safeParse(latest.mandalor),
      reva: this.safeParse(latest.reva),
    };
  }
}
