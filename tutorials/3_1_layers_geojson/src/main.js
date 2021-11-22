import NgwMap from "@nextgis/ngw-leaflet";

import NgwConnector from "@nextgis/ngw-connector";
import { fetchNgwLayerFeatures } from "@nextgis/ngw-kit";

const connector = new NgwConnector({ baseUrl: "https://demo.nextgis.com" });
const bounds = [37.65972, 55.7299, 37.66735, 55.73278];

const fetchGeoJson = (resourceId) =>
  fetchNgwLayerFeatures({ connector, resourceId, intersects: bounds });

NgwMap.create({
  target: "map",
  osm: true,
  bounds,
}).then((ngwMap) => {
  fetchGeoJson(5300).then((geojson) => {
    ngwMap.addLayer("GEOJSON", {
      data: geojson,
      order: 1,
      paint: { color: "red" },
    });
  });

  ngwMap.addGeoJsonLayer({
    id: "line-layer",
    type: "line",
    order: 2,
    interactive: false,
    paint: { weight: 4, color: "purple" },
  });
  fetchGeoJson(5304).then((geojson) => {
    ngwMap.setLayerData("line-layer", geojson);
  });
});
