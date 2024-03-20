# 2.6. Setup map. Controls

## Theory

A quick way to design a map with functional elements.

There are two main methods for working with controls in NgwMap: [addControl](https://code-api.nextgis.com/classes/ngw_map.WebMapControls.html#addControl) and [createControl](https://code-api.nextgis.com/classes/ngw_map.WebMapControls.html#createControl).

- `addControl` - adds a control suitable for the current map adapter. For example, you can add third-party controls:

  ```javascript
  import NgwMap from "@nextgis/ngw-leaflet";
  import "leaflet.polylinemeasure";

  NgwMap.create({
    target: "map",
    center: [13, 56],
    osm: true,
    zoom: 6,
  }).then((ngwMap) => {
    const measureControl = new L.Control.PolylineMeasure();
    ngwMap.addControl(measureControl, "top-right");
  });
  ```

  Or add controls created by the `createControl` method.

- `createControl` - generates an object that will be the correct control for the current map adapter. This method takes two arguments. The first one should contain two callback functions [onAdd](https://code-api.nextgis.com/interfaces/ngw_map.MapControl.html#onAdd) and [onRemove](https://code-api.nextgis.com/interfaces/ngw_map.MapControl.html#onRemove). The second contains additional parameters that affect the appearance, such as `bar` (adds a frame) and `margin` (adds an indentation).

  ```javascript
  const control = ngwMap.createControl({
    onAdd() {
      return document.createElement("div");
    },
  });
  ```

  There are also two quick access methods [createButtonControl](https://code-api.nextgis.com/classes/ngw_map.WebMap.html#createButtonControl) and [createToggleControl](https://code-api.nextgis.com/classes/ngw_map.WebMap.html#createToggleControl). The first one is to create action buttons (very frequent task) and the second is to add the on/off switch.

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

You can assign names to controls to be able to configure them on map initialization. This is convenient when working on extensions. There are only two built-in name controls: `ZOOM` and `ATTRIBUTION`.

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

You can place controls in the corners of the map:

```txt
top-left------------------tor-reght
|                                 |
|              MAP                |
|                                 |
bottom-left------------bottom-right
```

### More examples

- [custom-layer-controls](https://code.nextgis.com/demo-examples-custom-layer-controls)

## Practice

Check the code of the lesson and examples on code.nextgis.com to find more ways to create controls.

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_6_setup_map_controls) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
