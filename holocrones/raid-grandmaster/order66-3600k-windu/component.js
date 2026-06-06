import { HolocronBase } from "../../../services/holocron.service.js";

class Order661800kWinduHolocron extends HolocronBase {

  getHolocronCategory() {
    return "raid-grandmaster";
  }
  getHolocronId() {
    return "order66-3600k-windu";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-raid-grandmaster-order66-3600k-windu", Order661800kWinduHolocron);
