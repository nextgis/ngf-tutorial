import NgwMap from "@nextgis/ngw-leaflet";

NgwMap.create({
  target: "map",
  center: [13, 56],
  zoom: 7,
  osm: true,
  // qmsId: 510,
}).then((ngwMap) => {
  // ngwMap.addBaseLayer("QMS", { qmsId: 448 });
  // ngwMap.addBaseLayer("OSM");
});
