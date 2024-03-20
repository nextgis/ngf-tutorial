import NgwMap from "@nextgis/ngw-leaflet";

import { fetchNgwLayerExtent } from "@nextgis/ngw-kit";

const baseUrl = "https://demo.nextgis.com";

NgwMap.create({
  baseUrl,
  target: "map",
  osm: true,
}).then((ngwMap) => {
  fetchNgwLayerExtent({ connector: ngwMap.connector, resourceId: 7141 }).then(
    (extent) => {
      ngwMap.fitBounds(extent);
    },
  );

  ngwMap.addLayer("TILE", {
    url: `${baseUrl}/api/component/render/tile?z={z}&x={x}&y={y}&resource=7149`,
    attribution: `<a href=${baseUrl}/resource/7149" target="_blank">7149</a>`,
  });

  // ngwMap.addTileLayer(
  //   baseUrl + "/api/component/render/tile?x={x}&y={y}&z={z}&resource=" + 7149
  // );
});
