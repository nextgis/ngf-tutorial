# 4.1. NgwMap. Identify

## Theory

The identification mechanism allows you to get data about items of NGW vector layers by intersection with geometry.

Identification is performed in two stages:

1. Getting a list of objects that intersect with the transmitted geometry. The geometry is a circle centered at the point where the user clicks the mouse on the map. The radius of the circle depends on the current zoom level.
2. Fetch complete information about the object of interest.

In order to indicate that identification is allowed for this resource, you need to specify `selectable` in the `adapterOptions` of this layer.

```javascript
ngwMap.addNgwLayer({
  resource: 4249,
  adapterOptions: {
    selectable: true,
  },
});
```

after that, everything is ready to subscribe to the event ["ngw:select"](https://code-api.nextgis.com/interfaces/ngw_map.NgwMapEvents.html#ngw_select)

```javascript
ngwMap.emitter.on("ngw:select", onNgwSelect);
```

After the first stage of identification is completed and a list of objects is received, you can fetch detailed information. There are several ways to do this. Using auxiliary methods: [fetchIdentifyGeoJson](https://code-api.nextgis.com/modules/ngw_kit.html#fetchIdentifyGeoJson), [fetchIdentifyItem](https://code-api.nextgis.com/modules/ngw_kit.html#fetchIdentifyItem). For convenience, these methods are integrated directly into the NgwMap class:

```javascript
function onNgwSelect(identify) {
  getFeaturePromise = ngwMap.fetchIdentifyGeoJson(identify).then((geojson) => {
    // Do something with geojson. For example, you can highlight an
    // identifiable object on the map using a new GEOJSON layer
  });
}
```

The `fetchIdentifyItem` method allows you to get more information about the layer. In the response, you will receive an object with the [toGeojson](https://code-api.nextgis.com/interfaces/ngw_kit.NgwFeatureItemResponse.html#toGeojson) method, use it to get the geometry in a convenient format:

```javascript
function onNgwSelect(identify) {
  getFeaturePromise = ngwMap.fetchIdentifyItem(identify).then((item) => {
    item.toGeojson().then((geojson) => {
      // handle geojson response
    });
  });
}
```

Here is another way that allows you to get data directly from the identification response:

```javascript
ngwMap.emitter.on("ngw:select", (e) => {
  if (e) {
    e.getIdentifyItems().then((items) => {
      const item = anyFunctionToSelectSuitableItemFromArray(items);
      item.geojson().then((feature) => {
        // Handle geojson
      });
      item.resource().then((resource) => {
        // Handle resource response. Find field aliases, for example
      });
    });
  }
});
```

When making a request to the server, it is very important to be able to cancel it. Since we do not directly call the identification request, we cannot call the cancellation method as  we with other NGW API requests.

For these purposes, the [cancelPromises](https://code-api.nextgis.com/classes/ngw_map.NgwMap.html#cancelPromises) method has been added to NgwMap:

```javascript
// stop all current identification requests on each click before making new requests
ngwMap.emitter.on("click", (e) => {
  ngwMap.cancelPromise("select", "identify");
});
```

### More examples

- [layer-select](https://code.nextgis.com/demo-examples-ngw-layer-select)
- [layer-popup](https://code.nextgis.com/demo-examples-ngw-layer-popup)
- [webmap-identification](https://code.nextgis.com/demo-examples-webmap-identification)
- [webmap-identification-multiply](https://code.nextgis.com/demo-examples-webmap-identification-multiply)

## Practice

Try rewriting the example using the `getIdentifyItems` method, which is available in the identification object.

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/4_3_ngwmap_identify) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
