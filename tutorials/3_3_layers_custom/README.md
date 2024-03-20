# 3.3. Layers. Custom

## Theory

The NgwMap provides a rich arsenal for customization.

It is quite simple to create a new type of layer adapters or upgrade an existing one.

```javascript
const createCustomAdapter = (ngwMap) => {
  return class CustomAdapter extends ngwMap.mapAdapter.layerAdapters.GEOJSON {
    addLayer(options) {
      const { resourceId, ...opt } = options;
      // ...customization
      return super.addLayer(opt);
    }

    beforeRemove() {
      // ...cleaning
    }
  };
};

ngwMap.addLayer(createCustomAdapter(ngwMap), { resourceId: 7152 });
```

Pay attention to this `ngwMap.mapAdapter.layerAdapters.GEOJSON`. We inherit from the layer adapter that corresponds to the GeoJSON layer for the current map adapter. Although the `leaflet` has one behavior and the `ol` another, they will work the same way because of the common interfaces.

## Practice

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/3_3_layers_custom) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
