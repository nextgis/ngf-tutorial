import NgwMap from "@nextgis/ngw-leaflet";

const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  center: [24.94, 60.17],
  zoom: 16,
  osm: true,
});

ngwMap.addNgwLayer({
  id: "building",
  resource: 6569,
  adapterOptions: {
    propertiesFilter: [
      "any",
      ["BUILDING", "eq", "apartments"],
      ["BUILDING", "eq", "commercial"],
    ],
    paint: [
      { stroke: true, fillOpacity: 0.5, color: "gray" },
      [[["BUILDING", "eq", "apartments"]], { color: "purple" }],
      [
        [["BUILDING", "eq", "commercial"]],
        { color: "darkgreen", fillOpacity: 1 },
      ],
      [[["BUILDING", "eq", "school"]], { color: "brown" }],
    ],
  },
});
