import cytoscape, {
  ElementDefinition,
  ElementsDefinition,
  Stylesheet,
} from "cytoscape";
import { graphMapContainerName } from "../services/initial";
import { UtilityService } from "../services/utility";
import leaflet from "cytoscape-leaf";
import { NodeLabelEnum } from "../enums/node-label.enum";
import { cyLeafletStyle } from "../../app/services/styles";
import "leaflet/dist/leaflet.css";
// import mbTiles from "../services/mbtiles";

// import * as protomaps from "protomaps";

// import { vectorGrid } from "leaflet"; 'leaflet.vectorgrid'

import vectorTileLayer from "leaflet-vector-tile-layer";
export default customElements.define(
  "graph-leaflet",
  class extends HTMLElement {
    cy!: any;
    utlityService;

    constructor() {
      super();
      this.utlityService = new UtilityService();
      cytoscape.use(leaflet);
    }

    async connectedCallback() {
      const container = this.utlityService.createContainerElement(
        graphMapContainerName
      );

      const leafContainer =
        this.utlityService.createContainerElement("cy-leaflet");
      this.appendChild(container);
      this.appendChild(leafContainer);

      const elements:
        | ElementsDefinition
        | ElementDefinition[]
        | Promise<ElementsDefinition>
        | Promise<ElementDefinition[]>
        | undefined = {
        nodes: [
          {
            group: "nodes",
            data: {
              id: "a",
              name: "test a",
              lat: 35.790817,
              lng: 51.416221,
            },
            style: this.utlityService.getNodeStyle(NodeLabelEnum.Person),
          },
          {
            group: "nodes",
            data: {
              id: "b",
              name: "test b",
              lat: 35.703684,
              lng: 51.147473,
            },
            style: this.utlityService.getNodeStyle(NodeLabelEnum.Person),
          },
        ],
        edges: [
          {
            group: "edges",
            data: {
              id: "ab",
              source: "a",
              target: "b",
            },
          },
        ],
      };

      this.cy = cytoscape({
        container,
        elements,
        style: cyLeafletStyle as unknown as Stylesheet[],
        layout: {
          name: "preset",
          fit: false,
        },
      });

      let leaf = this.cy.leaflet({
        container: document.getElementById("cy-leaflet"),
      });

      leaf.map.removeLayer(leaf.defaultTileLayer);
      const a = leaf.L.tileLayer('/src/assets/outDir/{z}/{x}/{y}.png');
      a.addTo(leaf.map);
    }
  }
);
