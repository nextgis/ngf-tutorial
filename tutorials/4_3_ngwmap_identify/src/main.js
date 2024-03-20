import NgwMap from "@nextgis/ngw-leaflet";

const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  qmsId: 448,
});

ngwMap.addNgwLayer({
  resource: 7155,
  fit: true,
  adapterOptions: {
    selectable: true,
  },
});

ngwMap.emitter.on("ngw:select", drawLayer);

let getFeaturePromise;
function clean() {
  if (getFeaturePromise) {
    getFeaturePromise.cancel();
  }
  ngwMap.removeLayer("highlight");
};

function drawLayer(identify) {
  clean();
  getFeaturePromise = ngwMap.fetchIdentifyGeoJson(identify).then((geojson) => {
    getFeaturePromise = null;
    ngwMap.addLayer("GEOJSON", {
      id: "highlight",
      data: geojson,
      paint: { color: "yellow", stroke: true, fillOpacity: 0.8 },
    });
    console.log(geojson);
  });
};


