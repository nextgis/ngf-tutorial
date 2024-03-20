import NgwMap from "@nextgis/ngw-leaflet";

NgwMap.create({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
}).then((ngwMap) => {
  const elem = document.createElement("div");
  elem.className = "resource-input-block";
  elem.innerHTML = `
    <label for="resource-input">Resource id: 
      <input id="resource-input" placeholder="Example: 7160 7157 7158" />
    </label>
    <button style="width: 20px;">+</button>
    <div id="layers-panel"></div>
  `;
  const input = elem.querySelector("#resource-input");
  const layersPanel = elem.querySelector("#layers-panel");
  const btn = elem.querySelector("button");

  btn.onclick = () => {
    const resource = isNaN(input.value) ? input.value : parseInt(input.value);
    ngwMap.addNgwLayer({ resource, fit: true });
    input.value = "";
  };

  // Control to add new layers
  const addNgwLayerControl = ngwMap.createControl(
    {
      onAdd() {
        return elem;
      },
    },
    { bar: true },
  );

  ngwMap.addControl(addNgwLayerControl, "top-right");

  const updateLayerControl = () => {
    layersPanel.innerHTML = ""; // Clear existing entries

    // Iterate through each layer and create a list item with delete button
    ngwMap.getLayers().forEach((layerId) => {
      const layerItem = document.createElement("div");
      layerItem.innerHTML = `Layer: ${layerId}`;
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete";
      deleteBtn.onclick = () => {
        ngwMap.removeLayer(layerId);
        updateLayerControl(); // Update the control panel after deletion
      };

      layerItem.appendChild(deleteBtn);
      layersPanel.appendChild(layerItem);
    });
  };

  ngwMap.emitter.on("layer:add", updateLayerControl);
  ngwMap.emitter.on("layer:remove", updateLayerControl);

  ngwMap.addNgwLayer({
    fit: true,
    resourceId: 7154,
    adapter: "GEOJSON",
    adapterOptions: { paint: { color: "red", fill: false, weight: 4 } },
  });
  // Baselayer
  ngwMap.addNgwLayer({ resource: 1665 });
});
