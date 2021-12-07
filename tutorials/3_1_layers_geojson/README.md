# 3.1. Layers. GeoJSON

## Theory

The first thing anyone wants to do when working with an interactive map is to add their favorite GeoJSON to it.

There are several ways to add geojson to the map in NgwMap.

Common:

```javascript
ngwMap.addLayer("GEOJSON", {
  data: geojson,
  paint: { color: "red" },
});
```

Shortcut way:

```javascript
ngwMap.addGeoJsonLayer({
  data: geojson,
  type: "line",
  paint: { weight: 4, color: "purple" },
});
```

Any layer added to the web map gets a unique identifier:

```javascript
ngwMap.addLayer("GEOJSON").then((layer) => {
  console.log(layer.id); // automated generated ID
});
```

You can also assign this ID manually. In this case, you will have to monitor the uniqueness of the layer identifier yourself:

```javascript
ngwMap.addLayer("GEOJSON", { id: "my-geojson-layer" }).then((layer) => {
  console.log(layer.id); // my-geojson-layer
});
```

After the layer is created, you can use this layer itself or its identifier in any of the following methods:

- addLayerData
- clearLayerData
- fitLayer
- getLayer
- getLayerId
- hideLayer
- isBaseLayer
- isLayerVisible
- propertiesFilter
- removeLayer
- removeLayerFilter
- removeLayers
- selectLayer
- setLayerData
- setLayerOpacity
- showLayer
- toggleLayer
- unSelectLayer
- unSelectLayers
- updateLayer

[WebMapLayers documentation](https://code-api.nextgis.com/classes/ngw_map.WebMapLayers.html)

```javascript
ngwMap.addLayer("GEOJSON", { id: "my-geojson-layer" }).then((layer) => {
  ngwMap.fitLayer(layer);
  ngwMap.hideLayer("my-geojson-layer");
});
```

Find more information on working with vector layers in Part 6 of this tutorial.

### More examples

[geojson-layer](https://code.nextgis.com/demo-examples-geojson-layer)

## Practice

The program code of the lesson uses the `fetchGeoJson` auxiliary function. It returns a pure GeoJSON from which layers are then created and updated.

Since the function is asynchronous and the order of the layers must be strictly defined, the `order` option is used.

By default, all layers are interactive, and events can be received from them. The `interactive` option controls this behavior.

All other options are listed in the [documentation](https://code-api.nextgis.com/interfaces/ngw_map.GeoJsonAdapterOptions.html)

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/3_1_layers_geojson) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
