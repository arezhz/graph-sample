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
import aaa from 'leaflet-tilelayer-mbtiles-ts';

export default customElements.define(
  "graph-leaflet",
  class extends HTMLElement {
    cy!: any;
    utlityService;

    constructor() {
      super();
      debugger
      let mbtiles = new aaa.MBTiles("src/asstes/osm-2020-02-10-v3.11_asia_iran.mbtiles");
      debugger
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
      (window as any).L = leaf;

      // leaf.L = mbTiles(leaf.L);
      // leaf.L.tileLayer.mbtiles = new leaf.L.TileLayer.MBTiles(
      //   "src/asstes/osm-2020-02-10-v3.11_asia_iran.mbtiles"
      // );
      // leaf.L.tileLayer.mbtiles.addTo(leaf.map)

      // const response = await fetch("../public/iran.json");
      // // // set your own tiles, e.g. carto
      // leaf.L.tileLayer('src/asstes/osm-2020-02-10-v3.11_asia_iran.mbtiles', {
      // 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      // }).addTo(leaf.map);x
      // leaf.tileLayer
      //   .mbtiles("../../../public/osm-2020-02-10-v3.11_asia_iran.mbtiles")
      //   .addTo(leaf.map);
      // const a = mbTiles(
      //   "../../../public/osm-2020-02-10-v3.11_asia_iran.mbtiles",
      //   {
      //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      //   }
      // );
      // leaf.tileLayer.mbtiles.addTo(leaf.map)
    }
  }
);
