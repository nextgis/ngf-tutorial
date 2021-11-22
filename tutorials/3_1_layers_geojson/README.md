# 3.1. Layers. GeoJSON

The first thing anyone wants to do when working with an interactive map is to add their favorite GroJSON to it.

## Theory

There are several ways to add geojson to the map in NgwMap

Common

```javascript
ngwMap.addLayer("GEOJSON", {
  data: geojson,
  paint: { color: "red" },
});
```

Shortcutted

```javascript
ngwMap.addGeoJsonLayer({
  data: geojson,
  type: "line",
  paint: { weight: 4, color: "purple" },
});
```

Find more information on working with vector layers in Part 6 of this tutorial.

### More examples

[geojson-layer](https://code.nextgis.com/demo-examples-geojson-layer)

## Practice

The program code of the lesson uses the `fetchGeoJson` auxiliary function. It returns a pure geojson from which layers are then created and updated.

Since the function is asynchronous and the order of the layers must be strictly defined, the `order` option is used.

By default, all layers are interactive, and events can be received from them. The `interactive` option controls this behavior

All other options in the [documentation](https://code-api.nextgis.com/interfaces/ngw_map.GeoJsonAdapterOptions.html)

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

And then open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/3_1_layers_geojson) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
