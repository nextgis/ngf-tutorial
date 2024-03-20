import NgwMap from "@nextgis/ngw-leaflet";

NgwMap.create({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  resources: [
    // basemap resource
    7144,
    // Graz administrative border
    {
      resource: 7159,
      adapter: "GEOJSON",
      fit: true,
      adapterOptions: {
        paint: { color: "green", fill: false, weight: 2 }
      }
    },
    // ambulance availability style
    { resource: 7160, adapter: "TILE", opacity: 0.7 },
    // ambulance station layer
    {
      resource: 7157,
      adapter: "GEOJSON",
      adapterOptions: { type: "point", paint: { type: "pin" } }
    },
    // residential areas outside 15 minute ambulance availability
    {
      resource: 7158,
      adapter: "GEOJSON",
      adapterOptions: { type: "polygon", paint: { color: "red" } }
    },
  ],
});