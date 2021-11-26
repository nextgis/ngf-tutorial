# 4.1. Vector. Selection

## Theory

Highlight the geometry when mouse clicking - a very common task when developing web gis applications. It's very easy to do this in NgwMap.
You just need to specify the `selectable` option when creating a vector layer.
You should also specify the `selectedPaint` option - style to which the geometry will change when it becomes selected (configured like `paint`, see [5_1_vector_painting](../5_1_vector_painting)).

```javascript
ngwMap.addGeoJsonLayer({
  selectable: true,
  selectedPaint: { color: "green" },
  selectedPaint: { color: "brown", opacity: 1 },
});
```

You can set default style settings for `paint` and `selectedPaint` via NgwMap initialization options

```javascript
NgwMap.create({
  paint: { color: "orange", opacity: 0.6 },
  selectedPaint: { color: "red", opacity: 0.9 },
});
```

To configure the behavior of selections, use the following options

- unselectOnClick - deselect if you click anywhere on the map;
- unselectOnSecondClick - deselect if you click on the same object a second time;
- selectOnHover - select when hovering the mouse cursor over an object.

To track the selection process, you can subscribe to events or use the [onSelect](https://code-api.nextgis.com/interfaces/ngw_map.VectorAdapterOptions.html#onSelect) callback function when creating a layer.

You can subscribe to the event such a way

```javascript
const layerId = 'my-layer';

ngwMap.addGeoJsonLayer({
  id: layerId
  selectable: true,
});

ngwMap.emitter.on("layer:select", (e) => {
  if (e.layer.id === layerId) {
    console.log(e);
  }
});

ngwMap.emitter.on("layer-" + layerId + ":select", (e) => {
  console.log(e);
});
```

Example of using the [onSelect](https://code-api.nextgis.com/interfaces/ngw_map.VectorAdapterOptions.html#onSelect) method

```javascript
ngwMap.addGeoJsonLayer({
  selectable: true,
  onSelect: (e) => {
    const bounds = e.getBounds();
    const center = e.getCenter();
    console.log("select", bounds, center);
    for (const f of features) {
      console.log(f);
    }
  },
});
```

When subscribing or using the callback function an [OnLayerSelectOptions](https://code-api.nextgis.com/interfaces/ngw_map.OnLayerSelectOptions.html) object will always be passed when the event is triggered.

You can also control the selection programmatically using the NgwMap methods:

- selectLayer
- unSelectLayer
- unSelectLayers

```javascript
const layer = ngwMap.addLayer("GEOJSON", { data: geojson }).then((layer) => {
  ngwMap.selectLayer(layer, ({ feature }) => feature.id === "42");
});
```

### More examples

[vector-paint](https://code.nextgis.com/demo-examples-vector-selection)
[vector-hover-selection](https://code.nextgis.com/demo-examples-vector-hover-selection)

## Practice

Look at the example:

- try changing the style for the selected geometries;
- see how changes in the selection behavior parameters affect to the work with the map ;
- catch events of select in different ways.

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

And then open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/5_2_vector_selection) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
