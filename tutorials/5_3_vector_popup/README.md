# 4.1. Vector. Popup

## Theory

Very often, when selecting a feature, you need to show attributes. A pop-up fits very well for this purpose.

The NgwMap helps to simplify the process of opening a pop-up for the selected features.

In order to enable popups, you need to specify the `popupOnSelect` parameter when creating the layer and configure it in `popupOptions`:

[PopupOptions](https://code-api.nextgis.com/interfaces/ngw_map.PopupOptions.html)

- closeButton
- fromProperties
- minWidth
- popupContent
- unselectOnClose
- createPopupContent

The content of the pop-up can be any string or HTMLElement. If the content is static, it can be set via the 'popupContent' parameter. The [createPopupContent](https://code-api.nextgis.com/interfaces/ngw_map.PopupOptions.html#createPopupContent) callback function is used for dynamic display:

```javascript
ngwMap.addGeoJsonLayer({
  selectable: true,
  popupOnSelect: true,
  popupOptions: {
    createPopupContent: (e) => {
      return Object.entries(e.feature.properties).reduce((e, [key, value]) => {
        e.innerHTML += `<div><strong>${key}:</strong>${value}</div>`;
        return e;
      }, document.createElement("div"));
    },
  },
});
```

Each time the popup is opened, the `createPopupContent` method will be called with the following event data:

Properties

- `feature` - A vector layer object in GeoJSON format.
- `layer` - Native layer for a specific adapter layers of a specific map adapter.
- `target` - The adapter in which the layer is created.
- `type` - The source of the event call. User `click`, `hover`, or programmatic `api` call.
- `visible` - Is layer on the map

Methods

- `close` - Close the pop-up programmatically.
- `getBounds` - Get the extent for the geometry on which the popup was opened.
- `getCenter` - Get the center for the geometry on which the popup was opened.
- `onClose` - the callback function that is called when the popup is closed.

  ```javascript
  createPopupContent: (e) => {
      const onZoomEnd = () => e.close();
      ngwMap.emitter.on('zoomend', onZoomEnd)
      e.onClose(() => {
        ngwMap.emitter.off('zoomend', onZoomEnd)
      })
      return createContentFunc(e);
    },
  ```

Note that 'createPopupContent' can be an asynchronous function able to load additional information about the object. User this carefully however. Always add long request handlers, request cancellation, and caching.

Documentation of [CreatePopupContentProps](https://code-api.nextgis.com/interfaces/ngw_map.CreatePopupContentProps.html).

### More examples

[ngw-layer-popup](https://code.nextgis.com/demo-examples-ngw-layer-popup)
[vector-events-position-data](https://code.nextgis.com/demo-examples-vector-events-position-data)
[vector-hover-selection](https://code.nextgis.com/demo-examples-vector-hover-selection)
[vector-popup](https://code.nextgis.com/demo-examples-vector-popup)

## Practice

- Figure out how the aliases of the fieldnames of the NGW resources are formed.
- Add a button to the popup that will cause: centering on the geometry; closing the popup.

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/5_3_vector_popup) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
