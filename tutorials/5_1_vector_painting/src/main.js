import NgwMap from "@nextgis/ngw-leaflet";

const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  osm: true,
});

ngwMap.addNgwLayer({
  id: "building",
  resource: 5300,
  adapterOptions: {
    fit: true,
    paint: [
      { stroke: true, fillOpacity: 0.5, color: "gray" },
      [[["BUILDING", "eq", "apartments"]], { color: "purple" }],
      [[["BUILDING", "eq", "commercial"]], { color: "darkgreen", fillOpacity: 1 }],
      [[["BUILDING", "eq", "school"]], { color: "brown"}],
    ],
  },
});

ngwMap.addNgwLayer({
  id: "railway",
  resource: 5304,
  adapterOptions: {
    paint: function (feature) {
      let color = "gray";
      const prop = feature.properties;
      if (prop.RAILWAY === "tram") {
        color = "blue";
      } else if (prop.RAILWAY === "subway") {
        color = "green";
      }
      return {
        color,
        weight: 2,
        strokeOpacity: prop.TUNNEL === "yes" ? 0.7 : 1,
      };
    },
  },
});

ngwMap.addNgwLayer({
  id: "station",
  resource: 5298,
  adapterOptions: {
    paint: {
      opacity: 1,
      radius: 6,
      strokeColor: "white",
      stroke: true,
      color: [
        "match",
        ["get", "RAILWAY"],
        "tram_stop",
        "blue",
        "station",
        "orange",
        "gray", // last item is default value
      ],
    },
  },
});
