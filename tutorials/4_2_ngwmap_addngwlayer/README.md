# 4.2. NgwMap. AddNgwLayer

## Theory

To add resources from NGW after the map has already been created, there is a very convenient [addNgwLayer](https://code-api.nextgis.com/classes/ngw_map.NgwMap.html#addNgwLayer) method.

```javascript
// add raster layer resourceId is the style of 7154 layer
ngwMap.addNgwLayer({ resource: 7159 });
// add vector data from layer GEOJSON source
ngwMap.addNgwLayer({
  fit: true,
  resourceId: 7154,
  adapter: "GEOJSON",
  adapterOptions: { paint: { color: "red", fill: false, weight: 4 } },
});
```

The options for adding a layer will be the same as in the example [4_1_ngwmap_resources](../4_1_ngwmap_resources/README.md). The behavior of the layer is equal to the example with the `addLayer` method [3_1_layers_geojson](tutorials/3_1_layers_geojson/README.md).

## Practice

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/4_2_ngwmap_addngwlayer) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
