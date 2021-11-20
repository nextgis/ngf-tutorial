import NgwMap from "@nextgis/ngw-leaflet";

import { fetchNgwLayerExtent, ngwApiToAdapterOptions } from "@nextgis/ngw-kit";

const baseUrl = "https://demo.nextgis.com";

NgwMap.create({
  baseUrl,
  target: "map",
  osm: true,
}).then((ngwMap) => {
  fetchNgwLayerExtent({ connector: ngwMap.connector, resourceId: 4110 }).then(
    (extent) => {
      ngwMap.fitBounds(extent);
    }
  );

  ngwMap.addLayer("TILE", {
    url:
      baseUrl + "/api/component/render/tile?z={z}&x={x}&y={y}&resource=" + 4111,
    attribution: `<a href=${
      baseUrl + "/resource/4110"
    } target="_blank">4111</a>`,
  });

  ngwMap.addTileLayer(
    baseUrl + "/api/component/render/tile?x={x}&y={y}&z={z}&resource=" + 4117
  );
});
