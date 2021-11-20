import NgwMap from "@nextgis/ngw-leaflet";

NgwMap.create({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
}).then((ngwMap) => {
  // // Digital Elevation Model (DEM)-style
  // ngwMap.addNgwLayer({ resource: 4117 });
  // // Hillshade-style
  // ngwMap.addNgwLayer({ resource: 4115, adapter: "TILE", opacity: 0.3 });
  // // Elevation contours-style
  // ngwMap.addNgwLayer({ resource: 4113 });
  // Vector from Order boundary-style
  ngwMap.addNgwLayer({
    fit: true,
    resource: "data-elevation-order-boundary-style",
    adapter: "GEOJSON",
    adapterOptions: { paint: { color: "red", fill: false, weight: 4 } },
  });
  // Baselayer
  ngwMap.addNgwLayer({ resource: 1665 });

  // 4117 4115 4113
  const addNgwLayerControl = ngwMap.createControl(
    {
      onAdd() {
        const elem = document.createElement("div");
        elem.className = "resource-input-block";
        elem.innerHTML = `
        <label for="resource-input">Resource id: 
          <input id="resource-input" />
        </label>
        <button style="width: 20px;">+</button>
        `;

        const input = elem.querySelector("#resource-input");
        const btn = elem.querySelector("button");

        btn.onclick = () => {
          const resource = isNaN(input.value)
            ? input.value
            : parseInt(input.value);
          ngwMap.addNgwLayer({ resource, fit: true });
          input.value = "";
        };

        return elem;
      },
    },
    { bar: true }
  );

  ngwMap.addControl(addNgwLayerControl, "top-right");
});
