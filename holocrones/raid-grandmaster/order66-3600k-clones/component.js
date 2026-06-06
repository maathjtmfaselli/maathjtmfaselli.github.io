import { HolocronBase } from "../../../services/holocron.service.js";

class Order661800kClonesHolocron extends HolocronBase {

  getHolocronCategory() {
    return "raid-grandmaster";
  }
  getHolocronId() {
    return "order66-3600k-clones";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-raid-grandmaster-order66-3600k-clones", Order661800kClonesHolocron);
