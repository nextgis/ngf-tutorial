# 4.1. Vector. Popup

## Theory

Very often, when selecting a feature, you need to show attribute information. A pop-up is very well for this purpose.

The NgwMap is helps to simplify the process of opening a pop-up for the selected features.

- popupOnSelect
- popupOptions

[PopupOptions](https://code-api.nextgis.com/interfaces/ngw_map.PopupOptions.html)

- closeButton
- fromProperties
- minWidth
- popupContent
- unselectOnClose
- createPopupContent

[createPopupContent](https://code-api.nextgis.com/interfaces/ngw_map.PopupOptions.html#createPopupContent)

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

[CreatePopupContentProps](https://code-api.nextgis.com/interfaces/ngw_map.CreatePopupContentProps.html)

Properties

- feature
- layer
- target
- type
- visible

Methods

- close
- getBounds
- getCenter
- onClose

### More examples

[ngw-layer-popup](https://code.nextgis.com/demo-examples-ngw-layer-popup)
[vector-events-position-data](https://code.nextgis.com/demo-examples-vector-events-position-data)
[vector-hover-selection](https://code.nextgis.com/demo-examples-vector-hover-selection)
[vector-popup](https://code.nextgis.com/demo-examples-vector-popup)

## Practice

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

And then open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/5_3_vector_popup) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
