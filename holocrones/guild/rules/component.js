class GuildRulesHolocron extends HTMLElement {

  async connectedCallback() {

    try {

      const response =
        await fetch(
          "/holocrones/guild/rules/template.html"
        );

      if (!response.ok) {
        throw new Error(
          "No se pudo cargar el template"
        );
      }

      const html =
        await response.text();

      this.innerHTML = html;

    } catch (error) {

      console.error(
        "Error cargando holocrón guild-rules",
        error
      );

      this.innerHTML = `
        <section class="holocron-card">

          <p>
            Error cargando el holocrón.
          </p>

        </section>
      `;
    }
  }
}

customElements.define("holocron-guild-rules", GuildRulesHolocron);
