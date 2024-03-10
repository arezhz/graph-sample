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

    connectedCallback() {
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
              lat: 43.662402,
              lng: -79.38891,
            },
            style: this.utlityService.getNodeStyle(NodeLabelEnum.Person),
          },
          {
            group: "nodes",
            data: {
              id: "b",
              name: "test b",
              lat: 43.662502,
              lng: -79.38881,
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

      (window as any).map = leaf.map;
      (window as any).L = leaflet.L;

      // // set your own tiles, e.g. carto
      leaflet.L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(leaf.map);
    }
  }
);
