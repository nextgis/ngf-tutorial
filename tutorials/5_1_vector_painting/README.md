# 4.1. Vector. Painting

## Theory

There are several ways to set the appears of vector layers in NgwMap: static, dynamic, by feature properties:

- Static vector layer style can be different for types of geometry: for polygon and line it is [PathPaint](https://code-api.nextgis.com/interfaces/paint.PathPaint.html) and for points it is [CirclePaint](https://code-api.nextgis.com/interfaces/paint.CirclePaint.html) or [PinPaint](https://code-api.nextgis.com/interfaces/paint.PinPaint.html). They are united by the type [GeometryPaint](https://code-api.nextgis.com/modules/paint.html#GeometryPaint) and based on a [BasePaint](https://code-api.nextgis.com/interfaces/paint.BasePaint.html) which consists of the following parameters

  - color
  - opacity
  - fill
  - fillColor
  - fillOpacity
  - stroke
  - strokeColor
  - strokeOpacity
  - weight

  ```javascript
  ngwMap.addGeoJsonLayer({
    paint: {
      color: "#9cbe3c",
      fillOpacity: 0.5,
      stroke: true,
      strokeOpacity: 1,
    },
  });
  ```

  For simplification, `color` and `opacity` parameters have been added. They are needed when fill and stroke have the same color and transparency values, otherwise you need to set them separately: `fillColor` and `strokeColor`; `fillOpacity` and `strokeOpacity`.

  Use the type parameter to specify which geometry this style is for. This is necessary for those cases when the layer is created empty. It also helps with auto-completion when working in the IDE.

- Dynamic styling method via callback function

  ```javascript
  ngwMap.addGeoJsonLayer({
    paint: function (feature) {
      let color = "gray";
      const prop = feature.properties;
      if (prop.RAILWAY === "tram") {
        color = "blue";
      } else if (prop.RAILWAY === "subway") {
        color = "green";
      }
      return {
        color,
        weight: 2,
        strokeOpacity: prop.TUNNEL === "yes" ? 0.7 : 1,
      };
    },
  });
  ```

  The function should return an object of type [GeometryPaint](https://code-api.nextgis.com/modules/paint.html#GeometryPaint)

- There are also several ways to styling through the feature properties

  - Paint classification by filter. If the first object in the list is an Paint style, then its values will be merged with the values for each filter. And will be used to style objects outside the filter. You can see how the property filter works [here (repo)](https://github.com/nextgis/nextgis_frontend/tree/master/packages/properties-filter) and [here (tutorial)](../5_4_vector_filtering).

    ```javascript
    ngwMap.addGeoJsonLayer({
      paint: [
        { stroke: true, fillOpacity: 0.5, color: "gray" },
        [[["BUILDING", "eq", "apartments"]], { color: "purple" }],
        [[["BUILDING", "eq", "school"]], { color: "brown" }],
      ],
    });
    ```

  - Map feature properties to paint properties. Only the `match` condition is being processed now. To expand the functionality for your tasks, create a [issues](https://github.com/nextgis/nextgis_frontend/issues) or write to support support@nextgis.com.

    ```javascript
    ngwMap.addGeoJsonLayer({
      paint: {
        opacity: 1,
        radius: 6,
        strokeColor: "white",
        stroke: true,
        color: [
          "match",
          ["get", "RAILWAY"],
          "tram_stop",
          "blue",
          "station",
          "orange",
          "gray", // last item is default value
        ],
      },
    });
    ```

  Both methods of styling by properties allow you to transfer layer settings in JSON format. Also suitable for the design of vector tiles.

If you create a vector layer without specifying the paint property, the default style will be used. You can set default style settings via NgwMap initialization options.

```javascript
NgwMap.create({
  paint: { color: "orange", opacity: 0.6 },
});
```

To style a point layer with icons, the [IconPaint](https://code-api.nextgis.com/interfaces/paint.IconPaint.html) style is suitable . For convenience, you can use the [@nextgis/icons](https://github.com/nextgis/nextgis_frontend/tree/master/packages/icons) library

```javascript
import { getIcon } from '@nextgis/icons';

ngwMap.addGeoJsonLayer({
    paint: getIcon({
        color: "blue",
        shape: "rect",
        size: 30,
        stroke: true,
        strokeColor: "white",
    });
});
```

### More examples

[vector-paint](https://code.nextgis.com/demo-examples-vector-paint)
[properties-paint](https://code.nextgis.com/demo-examples-properties-paint)
[expression-paint](https://code.nextgis.com/demo-examples-expression-paint)
[expression-paint-match](https://code.nextgis.com/demo-examples-expression-paint-match)
[demo-examples-icons](https://code.nextgis.com/demo-examples-icons)

## Practice

- Run the example and try different ways to design vector layers.

- Change the point layer style from circles to icons

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
````

And then open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/5_1_vector_painting) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
