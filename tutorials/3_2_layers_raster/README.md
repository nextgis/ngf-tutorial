# 3.2. Layers. Raster

## Theory

There are several ways to add geojson to the map in NgwMap

Common

```javascript
ngwMap.addLayer("TILE", {
  url:
    baseUrl + "/api/component/render/tile?z={z}&x={x}&y={y}&resource=" + 4111,
  attribution: `<a href=${baseUrl + "/resource/4110"} target="_blank">4111</a>`,
});
```

Shortcutted

```javascript
ngwMap.addTileLayer(
  baseUrl + "/api/component/render/tile?x={x}&y={y}&z={z}&resource=" + 4117
);
```

All options are documented [here](https://code-api.nextgis.com/interfaces/ngw_map.RasterAdapterOptions.html)

## Practice

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

And then open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/3_2_layers_raster) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
