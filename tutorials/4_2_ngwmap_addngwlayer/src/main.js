import NgwMap from "@nextgis/ngw-leaflet";

NgwMap.create({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
}).then((ngwMap) => {
    // // ambulance availability style
    // { resource: 7160, adapter: "TILE", opacity: 0.7 },
    // // ambulance station layer
    // {
    //   resource: 7157,
    //   adapter: "GEOJSON",
    //   adapterOptions: { type: "point", paint: { type: "pin" } }
    // },
    // // residential areas outside 15 minute ambulance availability
    // {
    //   resource: 7158,
    //   adapter: "GEOJSON",
    //   adapterOptions: { type: "polygon", paint: { color: "red" } }
    // },
  ngwMap.addNgwLayer({
    fit: true,
    resourceId: 7154,
    adapter: "GEOJSON",
    adapterOptions: { paint: { color: "red", fill: false, weight: 4 } },
  });
  // Baselayer
  ngwMap.addNgwLayer({ resource: 1665 });

  // 7160 7157 7158
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
