import { HolocronBase } from "../../../services/holocron.service.js";

class Order661800kTarkinScorchHolocron extends HolocronBase {

  getHolocronCategory() {
    return "raid-grandmaster";
  }
  getHolocronId() {
    return "order66-3600k-tarkinscorch";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-raid-grandmaster-order66-3600k-tarkinscorch", Order661800kTarkinScorchHolocron);
