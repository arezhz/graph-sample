import cytoscape, {
  ElementDefinition,
  ElementsDefinition,
  Stylesheet,
} from "cytoscape";
import { getInitData, graphContainerName } from "../../app/services/initial";
import { IResponseBody } from "../../app/models/i-response-body";
import { UtilityService } from "../../app/services/utility";
import graphStyles from "../../app/services/styles";
import cxtmenu from "cytoscape-cxtmenu";
import cola from "cytoscape-cola";

export default customElements.define(
  "graph-element",
  class extends HTMLElement {
    cy!: cytoscape.Core;
    utlityService;

    constructor() {
      super();
      this.utlityService = new UtilityService();
      cytoscape.use(cxtmenu);
      cytoscape.use(cola);
    }

    async connectedCallback() {
      const _self = this;
      const response: IResponseBody | IResponseBody[] = await getInitData();
      debugger
      const container =
        this.utlityService.createContainerElement(graphContainerName);
      this.appendChild(container);
      const elements:
        | ElementsDefinition
        | ElementDefinition[]
        | Promise<ElementsDefinition>
        | Promise<ElementDefinition[]>
        | undefined = {
        nodes: [],
        edges: [],
      };
      if (!Array.isArray(response)) {
        elements.nodes.push({
          group: "nodes",
          data: {
            id: response.p.start.elementId,
            name: this.utlityService.getNodeName(
              response.p.start.labels[0],
              response.p.start.properties
            ),
            ...response.p.start,
          },
          style: this.utlityService.getNodeStyle(
            response.p.start.labels[0],
            response.p.start.properties
          ),
        });
      }

      this.cy = cytoscape({
        container,
        elements,
        style: graphStyles as unknown as Stylesheet[],
        layout: {
          name: "cola",
        },
      });

      this.cy.cxtmenu({
        selector: "node",

        commands: [
          {
            content: "Expand",
            select: function (ele: any) {
              _self.expandSubNodes(ele.id());
            },
          },

          {
            content: "X",
            select: function (ele) {
              console.log(ele.data("name"));
            },
            enabled: false,
          },

          {
            content: "Text",
            select: function (ele) {
              console.log(ele);
            },
          },
        ],
      });
    }

    async expandSubNodes(id: string) {
      const response: IResponseBody[] = (await getInitData(
        id
      )) as IResponseBody[];
      if (response.length) {
        const graphBody: any[] = [];
        response.forEach((item) => {
          graphBody.push({
            group: "nodes",
            data: {
              id: item.p.end.elementId,
              name: this.utlityService.getNodeName(
                item.p.end.labels[0],
                item.p.end.properties
              ),
              ...item.p.end,
            },

            style: this.utlityService.getNodeStyle(
              item.p.end.labels[0],
              item.p.end.properties
            ),
          });

          item.p.segments.forEach((segment) => {
            graphBody.push({
              group: "edges",
              data: {
                id: segment.relationship.elementId,
                source: segment.relationship.startNodeElementId,
                target: segment.relationship.endNodeElementId,
                type: segment.relationship.type,
                properties: segment.relationship.properties,
              },
            });
          });
        });
        // this.cy.stop();
        this.cy.add(graphBody);
        this.cy
          .makeLayout({
            name: "cola",
            ready: (e: cytoscape.LayoutEventObject) => {
              e.cy.fit();
              e.cy.center();
            },
          })
          .run();
      }
    }
  }
);
