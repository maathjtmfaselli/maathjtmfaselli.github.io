import { HolocronBase } from "../../../services/holocron.service.js";
import { Order66Service } from "../../../services/order66.service.js";

class Order66ArchiveHolocron extends HolocronBase {

  constructor() {
    super();
    this.order66Service = new Order66Service();
  }

  getHolocronCategory() {
    return "archive";
  }
  getHolocronId() {
    return "order66";
  }

  async loadData() {
    const order66Rows = await this.order66Service.loadHistoricalData();

    this.renderOrder66Table(order66Rows, "order66-archive-table");
  }

  afterRender() {
  }

  renderOrder66Table(order66Rows, containerId) {
    if (!order66Rows?.length) return;
    if (!containerId) return;

    const headers = Object.keys(order66Rows[0]);
    const players = [...order66Rows];
    let html = `
            <thead>
                <tr>
                    <th>Jugador</th>
                    <th>Máx.</th>
    `;

    // Fechas
    for (let i = 1; i < headers.length; i++) {
        html += `<th>${headers[i]}</th>`;
    }

    html += `
                </tr>
            </thead>
            <tbody>
    `;

    players.sort((a, b) => {
        const maxA = Math.max(
            ...headers.slice(1).map(h => Number(a[h]) || 0)
        );
        const maxB = Math.max(
            ...headers.slice(1).map(h => Number(b[h]) || 0)
        );
        return maxB - maxA;
    });

    for (const row of players) {
      const playerName = row.Jugador;
      const scores = headers
          .slice(1)
          .map(h => Number(row[h]) || 0);

      const maxScore = Math.max(...scores);
      html += `
          <tr>
              <td class="player">${playerName}</td>
              <td class="max-score">${maxScore}</td>
      `;

      for (const score of scores) {
        let cssClass = "";

        if (!score || score === 0) {
          cssClass = "bg--red";
        } else if(score < 3000) {
          cssClass = "failed";
        } else if (score <= 7200) {
          cssClass = "complete";
        } else {
          cssClass = "grand-master";
        }
        if (score === maxScore) {
          cssClass += " best-score";
        }
        html += `
            <td class="${cssClass}">
                ${score || ""}
            </td>
        `;
      }

      html += `</tr>`;
    }

    html += `
            </tbody>
    `;

    document.getElementById(containerId).innerHTML = html;
  }

}

customElements.define("holocron-archive-order66", Order66ArchiveHolocron);
