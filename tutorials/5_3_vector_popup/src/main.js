import NgwMap from "@nextgis/ngw-leaflet";

const bounds = [37.65972, 55.7299, 37.66735, 55.73278];

const adapterOptions = (resourceId, opt) => {
  return Object.assign(
    {
      selectable: true,
      popupOnSelect: true,
      popupOptions: {
        createPopupContent: (e) => {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = "loading...";
          const getContent = ngwMap.connector
            .getResource(resourceId)
            .then((item) => {
              wrapper.innerHTML = "";
              const element = document.createElement("table");
              element.innerHTML = "<tbody>";
              // link properties field names with layer attributes names
              item.feature_layer.fields.forEach((x) => {
                if (x.grid_visibility) {
                  const value = e.feature.properties[x.keyname];
                  element.innerHTML +=
                    "<tr><th>" +
                    x.display_name +
                    "</th><td>" +
                    value +
                    "</td></tr>";
                }
              });
              element.innerHTML += "</tbody>";
              wrapper.appendChild(element);
            });
          e.onClose(() => {
            getContent.cancel();
          });
          return wrapper;
        },
      },
    },
    opt
  );
};

const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  bounds: bounds,
  osm: true,
});

ngwMap.addNgwLayer({
  id: "building",
  resource: 5300,
  adapterOptions: adapterOptions(5300, {
    unselectOnSecondClick: true,
    paint: { color: "brown" },
    selectedPaint: { color: "red" },
  }),
});

ngwMap.addNgwLayer({
  id: "railway",
  resource: 5304,
  adapterOptions: adapterOptions(5304, {
    paint: { color: "green", weight: 3 },
    selectedPaint: { color: "limegreen", weight: 4 },
  }),
});

const stationPaint = {
  opacity: 1,
  color: "orange",
  strokeColor: "white",
};
ngwMap.addNgwLayer({
  id: "station",
  resource: 5298,
  adapterOptions: adapterOptions(5298, {
    unselectOnClick: false,
    paint: Object.assign({ radius: 6 }, stationPaint),
    selectedPaint: Object.assign({ radius: 8 }, stationPaint),
  }),
});
