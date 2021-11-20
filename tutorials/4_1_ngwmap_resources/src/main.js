import NgwMap from "@nextgis/ngw-leaflet";

NgwMap.create({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  resources: [
    // basemap resource
    1665,
    // Digital Elevation Model (DEM)-style
    4117,
    // Hillshade-style
    { resource: 4115, adapter: "TILE", opacity: 0.3 },
    // Elevation contours-style
    4113,
    // Vector from Order boundary-style
    {
      resource: 4111,
      fit: true,
      adapter: "GEOJSON",
      adapterOptions: { paint: { color: "red", fill: false, weight: 4 } },
    },
  ],
});
