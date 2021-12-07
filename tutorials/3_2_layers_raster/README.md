# 3.2. Layers. Raster

## Theory

There are several ways to add GeoJSON to the map in NgwMap

Common:

```javascript
ngwMap.addLayer("TILE", {
  url:
    baseUrl + "/api/component/render/tile?z={z}&x={x}&y={y}&resource=" + 4111,
  attribution: `<a href=${baseUrl + "/resource/4110"} target="_blank">4111</a>`,
});
```

Shortcut way:

```javascript
ngwMap.addTileLayer(
  baseUrl + "/api/component/render/tile?x={x}&y={y}&z={z}&resource=" + 4117
);
```

All options are documented [here](https://code-api.nextgis.com/interfaces/ngw_map.RasterAdapterOptions.html).

The behavior of the layer and the ways of interacting with it are identical to the one in the example [3_1_layers_geojson](tutorials/3_1_layers_geojson/README.md).

## Practice

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/3_2_layers_raster) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
