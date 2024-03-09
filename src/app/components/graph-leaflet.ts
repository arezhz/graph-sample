import cytoscape from "cytoscape";
import { graphMapContainerName } from "../services/initial";
import { UtilityService } from "../services/utility";
import leaflet from "cytoscape-leaf";

export default customElements.define(
  "graph-leaflet",
  class extends HTMLElement {
    cy!: cytoscape.Core;
    utlityService;

    constructor() {
      super();
      this.utlityService = new UtilityService();
      cytoscape.use(leaflet);
    }

    connectedCallback() {
      debugger
      const container = this.utlityService.createContainerElement(
        graphMapContainerName
      );
      this.appendChild(container);
    }
  }
);
