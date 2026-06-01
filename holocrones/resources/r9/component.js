import { HolocronBase } from "../../../services/holocron.service.js";

class ResourcesR9Holocron extends HolocronBase {

  getHolocronCategory() {
    return "resources";
  }
  getHolocronId() {
    return "r9";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-resources-r9", GuildPrioritiesHolocron);
