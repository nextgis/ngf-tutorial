# 5.4. Vector. Filtering

## Theory

Filtering is needed to control the display of vector layer data on the map. Filters also allow to reduce the load on the map by reducing amounts of simultaneously displayed data.

```javascript
ngwMap.addGeoJsonLayer({
  filter: (e) => {
    return (
      e.feature.properties.PROP1 === val1 || e.feature.properties.PROP2 > val2
    );
  },
});
```

Very often, filtering occurs using vector layer properties. For these purposes, a special syntax has been added that allows you to form complex queries without functions. This approach allows you to store the settings of the entire scene in a format that can be transmitted in JSON format.

```javascript
ngwMap.addGeoJsonLayer({
  propertiesFilter: ["any", ["PROP1", "eq", val1], ["PROP2", "gt", val2]],
});
```

Using the properties filter allows you not only filter the data that already exists, but also form requests to the server. If you apply a `propertiesFilter` when adding a vector resource from NGW using the `addNgwLayer` method, only the necessary objects will be loaded.

```javascript
const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
});
ngwMap.addNgwLayer({
  id: "building",
  resource: 5300,
  adapterOptions: {
    fit: true,
    propertiesFilter: [
      "any",
      ["BUILDING", "eq", "apartments"],
      ["BUILDING", "eq", "commercial"],
    ],
  },
});
```

A special library [@nextgis/properties-filter](https://github.com/nextgis/nextgis_frontend/tree/master/packages/properties-filter) has been developed to filter objects by its properties.

The filter can be applied to an already created vector layer:

```javascript
ngwMap
  .addGeoJsonLayer({
    id: "geojson",
  })
  .then(() => {
    ngwMap.filterLayer("geojson", filterFunction);
  });
```

other actions on filters:

- [filterLayer](https://code-api.nextgis.com/classes/ngw_map.WebMap.html#filterLayer)
- [propertiesFilter](https://code-api.nextgis.com/classes/ngw_map.WebMap.html#propertiesFilter)
- [removeLayerFilter](https://code-api.nextgis.com/classes/ngw_map.WebMap.html#removeLayerFilter)

It is possible to set a filter by intersection with the geometry [intersects](https://code-api.nextgis.com/interfaces/ngw_map.FilterOptions.html#intersects):

```javascript
ngwMap.addGeoJsonLayer({
  intersects: [37.65972, 55.7299, 37.66735, 55.73278],
});
```

A geometry can be passed as:

- String in wkt format and EPSG:3857 coordinate system.
- Array of lon/lat tuples in EPSG:4326.
- Array of coordinates, in [west, south, east, north] order in EPSG:4326.

### More examples

- [vector-filtering](https://code.nextgis.com/demo-examples-vector-filtering)
- [ngw-layer-filtering](https://code.nextgis.com/demo-examples-ngw-layer-filtering)
- [ngw-layer-properties-filters](https://code.nextgis.com/demo-examples-ngw-layer-properties-filters)
- [vector-add-while-filtering](https://code.nextgis.com/demo-examples-vector-add-while-filtering)

## Practice

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/5_4_vector_filtering) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
