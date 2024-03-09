import { UtilityService } from "../services/utility";
import leaflet from 'cytoscape-leaf';

export default customElements.define(
  "graph-leaflet",
  class extends HTMLElement {
    cy!: cytoscape.Core;
    utlityService;

    constructor() {
      super();
      this.utlityService = new UtilityService();
      cytoscape.use( leaflet );
    }

    connectedCallback() {
      const container = document.createElement("div");
      container.setAttribute("id", "testttttt");
      this.appendChild(container);
    }
  }
);
