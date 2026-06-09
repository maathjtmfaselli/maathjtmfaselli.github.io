import { HolocronBase } from "../../../services/holocron.service.js";
import { RoteService } from "../../../services/rote.service.js";
await import("../../../js/components/data-table.js");

class RotePlanningMasterDataHolocron extends HolocronBase {

  constructor() {
    super();
    this.roteService = new RoteService();
  }

  getHolocronCategory() {
    return "rote";
  }
  getHolocronId() {
    return "planning-masterdata";
  }

  async loadData() {
    const roteOpsTable = document.querySelector("#pnjs-ops-master-table");
    if (!roteOpsTable) return;

    roteOpsTable.initialize({
      rows: (await this.roteService.getMasterDataPnjsByOps()).map(data => ({
        sector: data.Sector,
        planet: data.Planeta,
        op: data.Op,
        character: data.Character
      })),
      columns: [
        { field: "sector", label: "Sector" },
        { field: "planet", label: "Planeta" },
        { field: "op", label: "Op" },
        { field: "character", label: "Character" }
      ],

      filters: [
        { field: "sector", label: "Sector" },
        { field: "planet", label: "Planeta" },
        { field: "op", label: "Op" },
        { field: "character", label: "Character" }
      ]
    });
  }

  afterRender() {
  }
}

customElements.define("holocron-rote-planning-masterdata", RotePlanningMasterDataHolocron);
