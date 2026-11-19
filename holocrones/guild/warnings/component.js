import { GuildWarningsService } from "../../../services/guild-warning.service.js";

class GuildWarningsHolocron extends HTMLElement {

  constructor() {
    super();
    this.warningsService = new GuildWarningsService();
  }

  async connectedCallback() {
    const template = await fetch("/holocrones/guild/warnings/template.html")
      .then(r => r.text());

    this.innerHTML = template;

    await this.loadData();
  }

  async loadData() {
    const warnings = await this.warningsService.getWarnings();
//  console.log(warnings);
    this.renderWarnings(warnings);
  }

  renderWarnings(warnings) {
    const list = document.getElementById("guild-warnings-list");
    if (!list) return;

    if (!warnings.length) {
      list.innerHTML = `
        <li class="priority-item">
          Ahora mismo, NO hay miembros con Tarjetas Amarillas
        </li>
      `;
      return;
    }

    list.innerHTML = warnings
      .map(warning => this.renderWarningItem(warning))
      .join("");
  }

  renderWarningItem(warning) {
    return `
      <li class="priority-item guild-warning">
        <span class="priority-metric">${warning.member.name}</span>
        ${this.renderCanDoBraccaBadge(warning)}
        ${this.renderSuccessOnBraccaBadge(warning)}
        ${this.renderCanDoMandalorBadge(warning)}
        ${this.renderCompliesRaidBadge(warning)}
      </li>
    `;
  }

  renderCanDoBraccaBadge(warning) {
    const color = warning.canDoBracca ? "green" : "red";
    return `<img src="https://img.shields.io/badge/RequisitosZeffo-${color}" />`;
  }
  renderSuccessOnBraccaBadge(warning) {
    const color = warning.successOnBracca ? "green" : "red";
    return `<img src="https://img.shields.io/badge/CompletadoBracca-${color}" />`;
  }
  renderCanDoMandalorBadge(warning) {
    const color = warning.canDoTatooine ? "green" : "red";
    return `<img src="https://img.shields.io/badge/RequisitosMandalor-${color}" />`;
  }
  renderCompliesRaidBadge(warning) {
    const color = warning.raidCompliant ? "green" : "red";
    return `<img src="https://img.shields.io/badge/droidDestruction-${warning.raidMaxScore}k / 3000k-${color}" />`;
  }
}

customElements.define("holocron-guild-warnings", GuildWarningsHolocron);