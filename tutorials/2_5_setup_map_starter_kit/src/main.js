import { createWebMap } from "@nextgis/webmap";

import MapAdapter from "@nextgis/leaflet-map-adapter";
import "leaflet/dist/leaflet.css";

import { QmsKit } from "@nextgis/qms-kit";
import { NgwKit, createNgwLayerAdapter } from "@nextgis/ngw-kit";

import NgwConnector from "@nextgis/ngw-connector";

const connector = new NgwConnector({ baseUrl: "https://demo.nextgis.com" });

createWebMap({
  target: "map",
  mapAdapter: new MapAdapter(),
  zoom: 8,
  center: [-34.6, -58.48],
  starterKits: [
    new NgwKit({
      connector,
      // baseUrl: "https://demo.nextgis.com",
    }),
    new QmsKit(),
  ],
}).then((webmap) => {
  webmap.addLayer("WEBMAP", { resourceId: 6246, fit: true, useBasemap: false });
  webmap.addBaseLayer("QMS", { qmsId: 529 });
  webmap.addLayer(
    createNgwLayerAdapter({ resource: 6223 }, webmap, connector),
    { fit: true }
  );
});
