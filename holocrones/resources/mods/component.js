import { HolocronBase } from "../../../services/holocron.service.js";

class ResourcesModsHolocron extends HolocronBase {

  getHolocronCategory() {
    return "resources";
  }
  getHolocronId() {
    return "mods";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-resources-mods", GuildPrioritiesHolocron);
