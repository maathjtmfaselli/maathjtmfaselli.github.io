import { HolocronBase } from "../../../services/holocron.service.js";

class Order66300kTarkinHolocron extends HolocronBase {

  getHolocronCategory() {
    return "raid-padawan";
  }
  getHolocronId() {
    return "order66-300k-tarkin";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-raid-padawan-order66-300k-tarkin", Order66300kTarkinHolocron);
