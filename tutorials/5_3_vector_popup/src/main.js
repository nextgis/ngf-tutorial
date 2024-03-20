import NgwMap from "@nextgis/ngw-leaflet";


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
  center: [24.94, 60.17],
  zoom: 16,
  osm: true,
});

ngwMap.addNgwLayer({
  id: "building",
  resource: 6569,
  adapterOptions: adapterOptions(6569, {
    unselectOnSecondClick: true,
    paint: { color: "brown" },
    selectedPaint: { color: "red" },
  }),
});
