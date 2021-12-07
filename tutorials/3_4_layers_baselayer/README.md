# 3.4. Layers. Baselayer

## Theory

Basemap layers are an integral part of the map. We make working with them easier.

To control the behavior of the basemap layers, we have added several rules:

- the basemap layer is at the very bottom;
- there can only be one basemap layer at a time;

The following methods help to keep track of these rules:

- addBaseLayer
- getActiveBaseLayer
- getBaseLayers
- getBaseLayersIds
- isBaseLayer

In GNgwMap, any layer adapter can create a basemap layer. Even GeoJSON. But we've never done that:

```javascript
ngwMap.addBaseLayer("OSM"),
ngwMap.addBaseLayer("QMS", { qmsId: 529 }),
```

### More examples

[ngw-basemap](https://code.nextgis.com/demo-examples-ngw-basemap)

## Practice

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/3_4_layers_baselayer) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
