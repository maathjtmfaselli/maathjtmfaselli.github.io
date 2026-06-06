import { HolocronBase } from "../../../services/holocron.service.js";

class Order661800kBadBatchHolocron extends HolocronBase {

  getHolocronCategory() {
    return "raid-knight";
  }
  getHolocronId() {
    return "order66-1800k-badbatch";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-raid-knight-order66-1800k-badbatch", Order661800kBadBatchHolocron);
