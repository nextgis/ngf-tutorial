# 2.1. Setup map. View

## Theory

The most important part of working with frontend libraries (for interactive cartography) is to create and configure a Web GIS instance.

One of the main missions of NextGIS Frontend library is to simplify the execution of the most frequent operations.

Even the simplest configuration will yield result. Many parameters will get a default value.

```javascript
const ngwMap = new NgwMap();
```

A list of all creation parameters for a map can be found here [NgwMapOptions](https://code-api.nextgis.com/interfaces/ngw_map.NgwMapOptions.html)

There are several ways to create a map.

1. Constructor function:

    ```javascript
    const ngwMap = new NgwMap(ngwMapOptions);
    ngwMap.onLoad().then((ngwMap) => {});
    ```

2. Using the factory method:

    ```javascript
    NgwMap.create(ngwMapOptions).then((ngwMap) => {})
    ```

The first method allows interaction with the map before it has been fully created and ready for use.

Use these methods according to the situation. The main thing to keep in mind is that creating a map is an asynchronous process.

In general, there are a lot of asynchronous methods and functions in NextGIS Frontend libs.

You should get used to the fact that methods such as `getExtent()`, `addlayer()`, `toggleLayer()` and many others are asynchronous. This is done to unify the interface between different map and layers adapters.

## Practice

let's create a map that will be initialized with certain positioning parameters on the same territory

In this example, we will create a map with position parameters. First, we will set the `center` and `zoom` level pair. Then we will pass the `bounds`. Pay attention to the restrictive parameters: `maxBounds`, `maxZoom`, `minZoom`.

After the map is created, we can change the position of the map using methods `setCenter` `setZoom` `fitBounds` or by a complex method `setView`, that can do everything at once.

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_1_setup_map_view) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
