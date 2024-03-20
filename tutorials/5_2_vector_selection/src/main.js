import NgwMap from "@nextgis/ngw-leaflet";

const bounds = [-58.37, -34.64, -58.4, -34.63];

const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  bounds,
  osm: true,
});

console.log(ngwMap.getBounds())


ngwMap.addNgwLayer({
  id: "building",
  resource: 6223,
  adapterOptions: {
    selectable: true,
    unselectOnSecondClick: true,
    intersects: bounds,
    paint: { color: "brown" },
    selectedPaint: { color: "brown", opacity: 1 },
  },
});

ngwMap.addNgwLayer({
  id: "railway",
  resource: 6237,
  adapterOptions: {
    selectable: true,
    selectOnHover: true,
    intersects: bounds,
    paint: {
      weight: 2,
      color: "green",
    },
    selectedPaint: {
      weight: 4,
      color: "darkgreen",
    },
  },
});

const stationPaint = {
  opacity: 1,
  radius: 6,
  strokeColor: "white",
  stroke: true,
  color: "blue",
};

ngwMap.addNgwLayer({
  id: "station",
  resource: 6228,
  adapterOptions: {
    selectable: true,
    unselectOnClick: false,
    intersects: bounds,
    paint: stationPaint,
    selectedPaint: { ...stationPaint, radius: 10 },
  },
});
