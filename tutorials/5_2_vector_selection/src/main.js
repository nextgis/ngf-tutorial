import NgwMap from "@nextgis/ngw-leaflet";

const bounds = [37.65972, 55.7299, 37.66735, 55.73278];

const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  bounds,
  osm: true,
});

ngwMap.addNgwLayer({
  id: "building",
  resource: 5300,
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
  resource: 5304,
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
  resource: 5298,
  adapterOptions: {
    selectable: true,
    unselectOnClick: false,
    intersects: bounds,
    paint: stationPaint,
    selectedPaint: { ...stationPaint, radius: 10 },
  },
});
