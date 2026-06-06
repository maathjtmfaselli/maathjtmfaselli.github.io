import { HolocronBase } from "../../../services/holocron.service.js";

class Order66300kQuiGonHolocron extends HolocronBase {

  getHolocronCategory() {
    return "raid-padawan";
  }
  getHolocronId() {
    return "order66-300k-quigon";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-raid-padawan-order66-300k-quigon", Order66300kQuiGonHolocron);
