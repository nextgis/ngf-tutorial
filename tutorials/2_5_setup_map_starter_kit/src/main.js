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
  center: [104, 52],
  zoom: 6,
  starterKits: [
    new NgwKit({
      connector,
      // baseUrl: "https://demo.nextgis.com",
    }),
    new QmsKit(),
  ],
}).then((webmap) => {
  webmap.addBaseLayer("QMS", { qmsId: 506 });
  webmap.addLayer("WEBMAP", { resourceId: 4119, fit: true });

  // webmap.addLayer(
  //   createNgwLayerAdapter({ resource: 4117 }, webmap, connector),
  //   { fit: true }
  // );
});
