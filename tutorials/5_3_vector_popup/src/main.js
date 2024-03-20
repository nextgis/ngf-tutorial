import NgwMap from "@nextgis/ngw-leaflet";

// Function to configure adapter options for NGW layers
const adapterOptions = (resourceId, opt) => {
  return Object.assign(
    {
      selectable: true, // Makes features in the layer selectable
      popupOnSelect: true, // Enables popups when a feature is selected
      popupOptions: {
        // Defines how the popup content is created
        createPopupContent: (e) => {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = "loading...";

          // Fetching data about the resource from NGW
          const getContent = ngwMap.connector
            .getResource(resourceId)
            .then((item) => {
              wrapper.innerHTML = "";
              const element = document.createElement("table");
              element.innerHTML = "<tbody>";

              // Populating the table with feature properties
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

          // Adding a handler to cancel the data fetch if the popup is closed
          e.onClose(() => {
            getContent.cancel();
          });

          // Returning the wrapper as the popup content
          return wrapper;
        },
      },
    },
    opt,
  );
};

const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  center: [24.9798, 60.189],
  zoom: 17,
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
