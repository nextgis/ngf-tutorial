import NgwMap from "@nextgis/ngw-leaflet";

NgwMap.create({
  target: "map",
  center: [104, 52],
  zoom: 7,
  osm: true,
  // qmsId: 448,
}).then((ngwMap) => {
  // ngwMap.addBaseLayer("QMS", { qmsId: 448 });
  // ngwMap.addBaseLayer("OSM");
});
