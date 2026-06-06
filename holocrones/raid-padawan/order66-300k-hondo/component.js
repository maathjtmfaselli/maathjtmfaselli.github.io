import { HolocronBase } from "../../../services/holocron.service.js";

class Order66300kHondoHolocron extends HolocronBase {

  getHolocronCategory() {
    return "raid-padawan";
  }
  getHolocronId() {
    return "order66-300k-hondo";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-raid-padawan-order66-300k-hondo", Order66300kHondoHolocron);
