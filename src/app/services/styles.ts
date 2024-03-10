export default [
  {
    selector: "node",
    style: {
      content: "data(name)",
      "font-size": "8px",
      "text-valign": "bottom",
      "text-halign": "center",
      "z-index": "10",
      "background-color": "white",
      "background-image": "src/assets/unknown.png",
      "background-size": "auto",
      "background-fit": "cover",
      shape: "rectangle",
    },
  },
];

export const cyLeafletStyle = [
  {
    selector: "core",
    style: {
      "active-bg-opacity": 0,
    },
  },

  {
    selector: "node",
    style: {
      content: "data(id)",
      "background-color": "yellow",
      width: 15,
      height: 15,
    },
  },

  {
    selector: "edge",
    style: {
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      "line-color": "yellow",
      "target-arrow-color": "yellow",
    },
  },

  {
    selector: ":selected",
    style: {
      "line-color": "#0056DA",
      "target-arrow-color": "#0056DA",
      "background-color": "#0056DA",
    },
  },

  {
    selector: "node, edge",
    style: {
      "transition-property": "opacity",
      "transition-duration": "250ms",
      "transition-timing-function": "ease-in-out",
    },
  },

  {
    selector: ".leaflet-viewport",
    style: {
      opacity: 0.333,
      "transition-duration": "0ms",
    },
  },
];
