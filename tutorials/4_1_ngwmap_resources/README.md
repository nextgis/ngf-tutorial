# 4.1. NgwMap. Resources

NgwMap assemblies are so convenient that we use them even where communication with NGW was not required.

## Theory

In fact, NgwMap is an extension of the web map with methods and configuration options that simplify interaction with NGW API.

The main task is to have an easy way to display any cartographic resources on the map and be able to interact with them.

The most basic way is to pass information about the added resources through the map initialization option `resources`:

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

- number - resource id; // also for resource
- string - resource keyname; // also for resource
- object - configuration of the layer to be added with the one required parameter `resource` (the comment "also for resource" above refers to it)

Resources can be raster and vector layers and their styles, and even an entire web map. Even multiple web maps can be added at the same time. The information is 100% verified

### More examples

[ngw-layers](https://code.nextgis.com/demo-examples-ngw-layers)

## Practice

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

And then open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/4_1_ngwmap_resources) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
