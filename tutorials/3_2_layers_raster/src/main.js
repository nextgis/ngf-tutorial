import NgwMap from "@nextgis/ngw-leaflet";

import { fetchNgwLayerExtent, ngwApiToAdapterOptions } from "@nextgis/ngw-kit";

const baseUrl = "https://demo.nextgis.com";

NgwMap.create({
  baseUrl,
  target: "map",
  osm: true,
}).then((ngwMap) => {
  fetchNgwLayerExtent({ connector: ngwMap.connector, resourceId: 7141 }).then(
    (extent) => {
      ngwMap.fitBounds(extent);
    }
  );

  ngwMap.addLayer("TILE", {
    url:
      baseUrl + "/api/component/render/tile?z={z}&x={x}&y={y}&resource=" + 7149,
    attribution: `<a href=${
      baseUrl + "/resource/7141"
    } target="_blank">7142</a>`,
  });

  // ngwMap.addTileLayer(
  //   baseUrl + "/api/component/render/tile?x={x}&y={y}&z={z}&resource=" + 7149
  // );
});
