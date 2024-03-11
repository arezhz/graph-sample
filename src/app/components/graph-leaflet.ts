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
import "leaflet-tilelayer-geojson"
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

      (window as any).map = leaf.map;
      (window as any).L = leaf.L;
      // const response = await fetch("../public/iran.json");
      // // // set your own tiles, e.g. carto
      // leaf.L.tileLayer('src/asstes/osm-2020-02-10-v3.11_asia_iran.mbtiles', {
			// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			// }).addTo(leaf.map);x
      // leaf.L.tileLayer.GeoJSON('../../../public/iran.json').addTo(leaf.map);
    }
  }
);
