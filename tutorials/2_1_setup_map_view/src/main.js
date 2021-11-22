import NgwMap from "@nextgis/ngw-leaflet";

// const ngwMap = new NgwMap({});
// const ngwMap = NgwMap.create({});
// ngwMap.onLoad().then((ngwMap) => {});

// NgwMap.create({}).then((ngwMap) => {})

NgwMap.create({
  target: "map",
  osm: true,
  // == method one ==
  center: [104, 52],
  zoom: 5,
  // == method 2 ==
  // bounds: [61.83, 43.38, 146.20, 59.24]

  maxBounds: [61.83, 43.38, 146.2, 59.24],
  maxZoom: 16,
  minZoom: 5,
}).then((ngwMap) => {
  setTimeout(() => {
    // == method 3 ==
    // ngwMap.setCenter([21.5, 54.8]);
    // ngwMap.setZoom(8);
    // ngwMap.fitBounds([16.27, 53.87, 26.81, 55.73]);
    // == method 4 ==
    // ngwMap.setView([21.5, 54.8], 8);
    // == method 5 ==
    ngwMap.setView({
      center: [21.5, 54.8],
      zoom: 8,
      maxBounds: [16.27, 53.87, 26.81, 55.73],
      maxZoom: 16,
      minZoom: 8,
    });
    console.log(ngwMap.getZoom());
    console.log(ngwMap.getCenter());
    console.log(ngwMap.getBounds());
  }, 3000);

  window.ngwMap = ngwMap;
});
