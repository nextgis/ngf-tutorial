import NgwMap from "@nextgis/ngw-leaflet";

const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  qmsId: 448,
});

ngwMap.addNgwLayer({
  resource: 7155,
  fit: true, // Automatically fit the map view to this layer
  adapterOptions: {
    selectable: true, // Make features in this layer selectable
  },
});

// Listening to the 'ngw:select' event, which is triggered when a feature is selected
ngwMap.emitter.on("ngw:select", drawLayer);

// Variable to store the promise returned by fetchIdentifyGeoJson
let getFeaturePromise;

// Function to remove the highlight layer and cancel the getFeaturePromise if it exists
function clean() {
  if (getFeaturePromise) {
    getFeaturePromise.cancel();
  }
  ngwMap.removeLayer("highlight");
}

// Function to draw a layer highlighting the selected feature
function drawLayer(identify) {
  clean();
  // Fetch GeoJSON for the identified feature and add it as a new layer for highlighting
  getFeaturePromise = ngwMap.fetchIdentifyGeoJson(identify).then((geojson) => {
    getFeaturePromise = null;
    ngwMap.addLayer("GEOJSON", {
      id: "highlight", // ID for the highlight layer
      data: geojson,
      paint: { color: "yellow", stroke: true, fillOpacity: 0.8 },
    });
    console.log(geojson);
  });
}
