import { createWebMap } from "@nextgis/webmap";

import MapAdapter from "@nextgis/ol-map-adapter";
import "ol/ol.css";
import "@nextgis/ol-map-adapter/lib/ol-map-adapter.css";

// import MapAdapter from "@nextgis/leaflet-map-adapter";
// import "leaflet/dist/leaflet.css";

// import MapAdapter from "@nextgis/maplibre-gl-map-adapter";
// import "maplibre-gl/dist/maplibre-gl.css";

createWebMap({
  target: "map",
  mapAdapter: new MapAdapter(),
  center: [13, 56],
  zoom: 6,
  controls: ["ZOOM", "ATTRIBUTION"],
  controlsOptions: {
    ZOOM: { position: "top-left" },
    ATTRIBUTION: {
      position: "bottom-right",
      customAttribution: [
        '<a href="https://nextgis.com" target="_blank">©NextGIS</a>',
      ],
    },
  },
}).then((webmap) => {
  webmap.addBaseLayer("OSM");
});
