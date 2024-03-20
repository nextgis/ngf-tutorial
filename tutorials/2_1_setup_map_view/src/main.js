import NgwMap from "@nextgis/ngw-leaflet";

// const ngwMap = new NgwMap({});
// const ngwMap = NgwMap.create({});
// ngwMap.onLoad().then((ngwMap) => {});

// NgwMap.create({}).then((ngwMap) => {})

NgwMap.create({
  target: "map",
  osm: true,
  // == method one ==
  center: [140, 36],
  zoom: 5,
  // == method 2 ==
  // bounds: [97.99, 22.31, 182.02, 47.67],

  maxZoom: 16,
  minZoom: 5,
}).then((ngwMap) => {  
  setTimeout(() => {
    // == method 3 ==
    // ngwMap.setCenter([13, 56]);
    // ngwMap.setZoom(8);
    // ngwMap.fitBounds([7.75, 54.89, 18.25, 57.08]);
    // == method 4 ==
    // ngwMap.setView([13, 56], 8);
    // == method 5 ==
    ngwMap.setView({
      center: [13, 56],
      zoom: 8,
      maxBounds: [7.75, 54.89, 18.25, 57.08],
      maxZoom: 16,
      minZoom: 8,
    });
    console.log(ngwMap.getZoom());
    console.log(ngwMap.getCenter());
    console.log(ngwMap.getBounds());
  }, 3000);

  window.ngwMap = ngwMap;
});
