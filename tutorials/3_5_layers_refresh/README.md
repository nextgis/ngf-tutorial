# 3.4. Layers. Dynamic Refresh

This tutorial explains how to update a raster style dynamically in response to edits made on a NextGIS Web vector layer.

## Theory

When working with GIS applications, it's often necessary to represent data visually. Raster styles provide a way to visually interpret vector data. In dynamic applications, when a vector layer is edited (like adding or modifying features), the associated raster style can be updated to reflect these changes immediately. This ensures that the visual representation of the data is always current.

## Practice

- Learn to link a raster style with a vector layer and update it dynamically using NGW services.
- Explore techniques for ensuring that changes in vector data are immediately reflected in the raster style.
- Understand the integration of NextGIS Frontend libraries and NGW for real-time data visualization in WebGIS applications.

```js
import NgwMap from "@nextgis/ngw-leaflet";

ngwMap.onLoad().then(() => {
  // Add a map layer
  ngwMap.addNgwLayer({
    id: vectorLayerKeyName,
    resource: resource,
    adapter: "TILE",
  });

  // After adding or editing a feature in the vector layer
  ngwMap.emitter.on("click", (e) => {
    addFeature(e.lngLat).then(() => {
      // Refresh the raster style of the vector layer
      ngwMap.updateLayer(vectorLayerKeyName);
    });
  });
});
```

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/3_5_layers_refresh) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
