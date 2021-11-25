# 2.6. Setup map. Controls

A quick way to design a card with functional elements

## Theory

There are two main methods for working with controls in NgwMap: [addControl](https://code-api.nextgis.com/classes/ngw_map.WebMapControls.html#addControl) and [createControl](https://code-api.nextgis.com/classes/ngw_map.WebMapControls.html#createControl).

- The `addControl` - adds a control suitable for the current map adapter. For example, you can add third-party controls

  ```javascript
  import NgwMap from "@nextgis/ngw-leaflet";
  import "leaflet.polylinemeasure";

  NgwMap.create({
    target: "map",
    center: [104, 52],
    osm: true,
    zoom: 6,
  }).then((ngwMap) => {
    const measureControl = new L.Control.PolylineMeasure();
    ngwMap.addControl(measureControl, "top-right");
  });
  ```

  And of course add controls created by the `createControl` method.

- The `createControl` - generates an object that will be the correct control for the current map adapter. This method takes two arguments. The first one should contain two callback functions [onAdd](https://code-api.nextgis.com/interfaces/ngw_map.MapControl.html#onAdd) and [onRemove](https://code-api.nextgis.com/interfaces/ngw_map.MapControl.html#onRemove). The second one contains additional parameters that affect the appearance, such as `bar` (adds a frame) and `margin` (adds an indent).

  ```javascript
  const control = ngwMap.createControl({
    onAdd() {
      return document.createElement("div");
    },
  });
  ```

  There are also two quick access methods [createButtonControl](https://code-api.nextgis.com/classes/ngw_map.WebMap.html#createButtonControl) and [createToggleControl](https://code-api.nextgis.com/classes/ngw_map.WebMap.html#createToggleControl). The first one for creating action buttons (is a very frequent task), the second one for the on/off switch.

  ```javascript
  const toggleControl = ngwMap.createToggleControl({
    getStatus: () => webMap.isLayerVisible("any-layer-id"),
    onClick: (status) => ngwMap.toggleLayer("webmap", status),
    html: {
      on: "ON",
      off: "OFF",
    },
    title: "Toggle layer visibility",
  });
  webMap.addControl(toggleControl, "top-right");
  ```

You can assign names to controls. Then you will be able to configure these controls when initializing the map. This is convenient when working on extensions. There are only two built-in name controls: `ZOOM` and `ATTRIBUTION`.

```javascript
NgwMap.create({
  controls: ["ZOOM", "ATTRIBUTION"],
  controlsOptions: {
    ZOOM: { position: "top-left" },
    ATTRIBUTION: {
      position: "bottom-right",
      customAttribution: [
        '<a href="https://nextgis.com" target="_blank">©NextGIS</a>',
      ],
    },
  }
});
```

You can place controls in the corners of the map

```txt
top-left------------------tor-reght
|                                 |
|              MAP                |
|                                 |
bottom-left------------bottom-right
```

### More examples

[custom-layer-controls](https://code.nextgis.com/demo-examples-custom-layer-controls)

## Practice

Look at the program code of the lesson and examples on code.nextgis.com and find more ways to create controls

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

And then open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_6_setup_map_controls) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
