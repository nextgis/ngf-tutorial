import NgwMap from "@nextgis/ngw-leaflet";

const webMapName = "webmap";
const qmsBaseLayerName = "qmsbasemap";
const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  qmsId: [448, qmsBaseLayerName],
  resources: [{ resource: 6245, id: webMapName, useBasemap: false, fit: true }],
  controls: ["ZOOM", "ATTRIBUTION", "ToggleBaseMap"],
  controlsOptions: {
    ToggleBaseMap: {
      control: "BUTTON",
      position: "top-right",
      html: "B",
      title: "Toggle base map",
      onClick: function (a) {
        ngwMap.toggleLayer(qmsBaseLayerName);
      },
    },
  },
});
ngwMap.onLoad().then(() => {
  const toggleHeatMapControl = ngwMap.createButtonControl({
    html: "D",
    title: "Toggle DEM",
    onClick: () => {
      const ngwLayer = ngwMap.getLayer(webMapName);
      mapLayer.properties.set(
        "visibility",
        !mapLayer.properties.get("visibility")
      );
    },
  });

  ngwMap.addControl(toggleHeatMapControl, "top-right");

  // ngwMap.addControl('CONTROL', 'bottom-right', {control, options}) is same as:
  // 1 const MyControl = ngwMap.createControl(control, options);
  // 2 ngwMap.addControl(MyControl, 'bottom-right')
  ngwMap.addControl("CONTROL", "bottom-right", {
    control: {
      onAdd: () => {
        const list = document.createElement("div");
        list.className = "ngw-layers";
        const webmap = ngwMap.getLayer(webMapName);
        // find all layer from ngw webmap tree
        webmap.layer.tree
          .getDescendants()
          .reverse()
          .forEach((node) => {
            if (node.item.item_type === "layer") {
              const layerElement = document.createElement("div");

              const checkbox = document.createElement("input");
              checkbox.id = "layer-" + node.layer.id;
              checkbox.checked = node.item.layer_enabled;
              checkbox.setAttribute("type", "checkbox");
              checkbox.addEventListener("click", () => {
                node.properties.set("visibility", checkbox.checked);
              });

              const name = document.createElement("span");
              name.innerHTML = node.item.display_name;

              layerElement.appendChild(checkbox);
              layerElement.appendChild(name);
              list.appendChild(layerElement);
            }
          });
        const visibility = webmap.layer.properties.property("visibility");
        // listen any layer visibility change
        visibility.emitter.on("change-tree", (data) => {
          const itemId = data.item.layer.id;
          const checkbox = list.querySelector("#layer-" + itemId);
          checkbox.checked = data.value;
        });
        return list;
      },
    },
    options: { bar: true },
  });
});
