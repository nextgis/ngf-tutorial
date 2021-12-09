# 4.1. NgwMap. Resources

## Theory

NgwMap assemblies like `@nextgis/ngw-leaflet`, `@nextgis/ngw-ol` and `@nextgis/ngw-mapbox` are so convenient that we use them even where communication with NGW is not required.

In fact, [NgwMap](https://code-api.nextgis.com/classes/ngw_map.NgwMap.html) is an extension of the [WebMap](https://code-api.nextgis.com/classes/ngw_map.WebMap.html) with methods and configuration options that simplify interaction with [NextGIS Web REST API](https://docs.nextgis.ru/docs_ngweb_dev/doc/developer/toc.html#nextgis-web-rest-api).

The main task is to have an easy way to display any cartographic resources on the map and be able to interact with them.

The most basic way is to pass information about the added resources through the map initialization option [resources](https://code-api.nextgis.com/interfaces/ngw_map.NgwMapOptions.html#resources):

```javascript
NgwMap.create({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  resources: [
    // Basemap resource
    1665,
    // Digital Elevation Model (DEM)-style
    4117,
    // Hillshade-style
    { resource: 4115, adapter: "TILE", opacity: 0.3 },
    // Elevation contours-style
    4113,
    // Vector from Order boundary-style
    {
      resource: 4111,
      fit: true,
      adapter: "GEOJSON",
      adapterOptions: { paint: { color: "red", fill: false, weight: 4 } },
    },
  ],
});
```

The advantages of this approach are that the entire configuration is JSON serializable and can be easily transferred from the server or from the local state store.

The resources list may include:

- number - resource id; // also for the resource
- string - resource keyname; // also for the resource
- object - configuration of the layer to be added with the one required parameter `resource` (the comment "also for the resource" above refers to it)

Resources can be raster and vector layers and their styles, and even an entire web map. Even multiple web maps can be added at the same time. For real.

### More examples

- [ngw-layers](https://code.nextgis.com/demo-examples-ngw-layers)

## Practice

Run the example and try adding some other resources with [https://demo.nextgis.com](https://demo.nextgis.com) or your NGW (don't forget to register with CORS `http://localhost:8080` ) by ID, keyname or options.

Try changing the adapter type for a vector resource with styles to show on the map GEOJSON, TILE or IMAGE layer.

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/4_1_ngwmap_resources) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
