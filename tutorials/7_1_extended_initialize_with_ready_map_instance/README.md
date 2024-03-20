# 6.3. Extended. Initialize with ready map instance

This tutorial demonstrates how to integrate NextGIS Web services with an existing OpenLayers map instance.

## Theory

In this example, we showcase how to initialize and use the `@nextgis/ngw-ol` library with a pre-configured OpenLayers (ol/Map) map instance. This approach is beneficial when you have an already configured OpenLayers map and wish to enhance it with layers or other functionalities from a NextGIS Web service.

The integration process involves creating an NgwMap instance with the base URL of the NextGIS Web service and the existing OpenLayers map instance. After the integration, additional layers from the NextGIS Web service can be easily added to the OpenLayers map.

Furthermore, the same principles apply when using `@nextgis/ngw-leaflet` for Leaflet maps and `@nextgis/ngw-maplibre-gl` for MapLibre GL-based maps. These libraries allow for similar integrations, enabling you to take advantage of NextGIS features across different mapping libraries.

## Practice

- Familiarize yourself with the basic setup and usage of @nextgis/ngw-ol with OpenLayers.
- Integrate the NextGIS Web service with an OpenLayers map instance.
- Add a layer from NextGIS Web to the map and explore its functionalities.

The code example for this tutorial:

```js
import "ol/ol.css";
import Map from "ol/Map";
import Tile from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import NgwMap from "@nextgis/ngw-ol";

const map = new Map({
  target: "map",
  layers: [
    new Tile({
      source: new OSM(),
    }),
  ],
});

const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
  map,
});

ngwMap.addNgwLayer({
  id: "building",
  resource: 6569,
  adapter: "IMAGE",
  adapterOptions: {
    fit: true,
  },
});
```

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Look for the script output in the terminal.

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/7_1_extended_initialize_with_ready_map_instance) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
