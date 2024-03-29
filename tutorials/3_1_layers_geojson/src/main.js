import NgwMap from "@nextgis/ngw-leaflet";

import NgwConnector from "@nextgis/ngw-connector";
import { fetchNgwLayerFeatures } from "@nextgis/ngw-kit";

const connector = new NgwConnector({ baseUrl: "https://demo.nextgis.com" });
const bounds = [15.276, 47.035, 15.604, 47.105];

const fetchGeoJson = (resourceId) =>
  fetchNgwLayerFeatures({ connector, resourceId, intersects: bounds });

NgwMap.create({
  target: "map",
  osm: true,
  bounds,
}).then((ngwMap) => {
  // Fetch and add a GeoJSON layer to the map with specific resource ID
  fetchGeoJson(7154).then((geojson) => {
    ngwMap.addLayer("GEOJSON", {
      data: geojson,
      order: 1,
      paint: { color: "red" },
    });
  });

  // Create an empty GeoJSON layer for adding points
  // This layer is initially empty and will be populated with data later
  ngwMap.addGeoJsonLayer({
    id: "point-layer",
    type: "point",
    order: 2,
    interactive: false,
    paint: {
      weight: 4,
      color: "green",
      fillOpacity: 1,
      stroke: true,
      strokeColor: "black",
    },
  });

  // Fetch and populate the 'point-layer' with GeoJSON data from another resource
  fetchGeoJson(7152).then((geojson) => {
    ngwMap.setLayerData("point-layer", geojson);
  });
});
