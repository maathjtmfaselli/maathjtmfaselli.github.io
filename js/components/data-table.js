class DataTable extends HTMLElement {

  constructor() {
    super();

    this._isSearchable = false;
    this._rows = [];
    this._columns = [];
    this._filters = [];

    this._activeFilters = {};
  }

  connectedCallback() {
  }

  initialize({
    rows = [],
    columns = [],
    filters = []
  }) {
    this._rows = rows;
    this._columns = columns;
    this._filters = filters;

    this.render();
  }

  render() {
    if (!this._columns.length) return;
    this.innerHTML = `
      ${this.renderFilters()}
      <table class="data-table">
        ${this.renderHeader()}
        <tbody class="data-table-body"></tbody>
      </table>
    `;
    this.attachFilterListeners();
    this.updateRows();
  }
  updateRows() {
    const tbody = this.querySelector(".data-table-body");
    tbody.innerHTML = this.renderRows(
      this.getFilteredRows()
    );
  }
  renderHeader() {
    return `
      <thead>
        <tr>
          ${this._columns.map(c =>
            `<th>${c.label}</th>`
          ).join("")}
        </tr>
      </thead>
    `;
  }
  renderRows(rows) {
    if (!rows.length) {
      return `<tr><td colspan="${this._columns.length}">No data available</td></tr>`;
    }

    return rows.map(row => `<tr>
        ${this._columns.map(col => {
          const cell = row[col.field];
          return `<td>${this.getCellDisplayValue(cell)}</td>`;
        }).join("")}
      </tr>`).join("");
  }
  getCellDisplayValue(cell) {
    if (cell && typeof cell === "object" && "display" in cell) {
      return cell.display;
    }
    return cell ?? "";
  }
  renderFilters() {
    if (!this._filters.length) {
      return "";
    }

    return `
      <div class="data-table-filters">
        ${this._filters.map(filter => `
          <div class="filter-group">
            <label class="filter-label" for="filter-${filter.field}">
              ${filter.label}
            </label>

            <select
              id="filter-${filter.field}"
              class="filter-select"
              data-filter="${filter.field}"
            >
              <option value="">Todos</option>
          ${this.getFilterOptions(filter)
            .map(option => `
              <option value="${option.value}">
                ${option.label}
              </option>
            `)
            .join("")}
            </select>
          </div>
        `).join("")}
      </div>
    `;
  }
  getFilterOptions(filter) {
    if (filter.options) {
      return filter.options;
    }

    return this.getFilterValues(filter.field).map(value => ({
      value,
      label: value
    }));
  }
  getFilteredRows() {
    return this._rows.filter(row => {
      return Object.entries(this._activeFilters)
        .every(([field, value]) => {
          if (!value) {
            return true;
          }

          const cell = row[field];

          if (
            cell &&
            typeof cell === "object" &&
            "value" in cell
          ) {
            return Array.isArray(cell.value)
              ? cell.value.includes(value)
              : cell.value === value;
          }

          return cell === value;
        });
    });
  }
  matchesFilter(cellValue, filterValue) {
    if (Array.isArray(cellValue)) {
      return cellValue.includes(filterValue);
    }

    return cellValue === filterValue;
  }
  getFilterValues(field) {
    return [...new Set(
      this._rows
        .map(row => row[field])
        .filter(Boolean)
    )].sort();
  }
  attachFilterListeners() {
    this.querySelectorAll("select[data-filter]")
      .forEach(select => {
        select.addEventListener("change", event => {
          const field = event.target.dataset.filter;
          const value = event.target.value;
          if (value) {
            this._activeFilters[field] = value;
          } else {
            delete this._activeFilters[field];
          }
          this.updateRows();
        });
      }
    );
  }
}

customElements.define("data-table", DataTable);