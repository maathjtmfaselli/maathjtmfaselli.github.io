import { HolocronBase } from "../../../services/holocron.service.js";
import { GuildMembersService } from "../../../services/guild-members.service.js";
await import("../../../js/components/data-table.js");

class GuildGoalsIndividualComplianceHolocron extends HolocronBase {

  constructor() {
    super();
    this.guildMembersService = new GuildMembersService();
  }

  getHolocronCategory() {
    return "guild";
  }
  getHolocronId() {
    return "member-compliance";
  }
  async loadData() {
    await Promise.all([
      this.loadMemberComplianceData()
    ]);
  }

  afterRender() {
//    this.decorateRoteOpsTable();
  }

  async loadMemberComplianceData() {
    const memberComplianceTable = document.querySelector("#guild-goals-individual-compliance-table");
    if (!memberComplianceTable) return;

    const memberComplianceData = await this.guildMembersService.getMemberComplianceData();

    memberComplianceTable.initialize({
      rows: [],
      columns: [
        { field: "member", label: "Jugador" },
        { field: "compliance", label: "Cumplimiento" },
        { field: "canDoZeffo", label: "Puede Hacer Zeffo" },
        { field: "hasDoneZeffo", label: "Ha Hecho Zeffo" },
        { field: "canDoMandalor", label: "Puede Hacer Mandalor" },
        { field: "hasDoneMandalor", label: "Ha Hecho Mandalor" },
        { field: "raidRank", label: "Rango Raid" }
      ],
      filters: [
        { field: "member", label: "Jugador" },
        { field: "compliance", label: "Cumplimiento" }
      ],
      onRenderComplete: () => {
        this.afterRender();
      }
    });
  }

}

customElements.define("holocron-guild-member-compliance", GuildGoalsIndividualComplianceHolocron);