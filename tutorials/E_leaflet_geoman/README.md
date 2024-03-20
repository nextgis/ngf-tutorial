# E.1 Leaflet Geoman

This tutorial demonstrates the integration of [Leaflet Geoman](https://github.com/geoman-io/leaflet-geoman) with Leaflet maps,
specifically focusing on how it can be used in conjunction with the `@nextgis/ngw-leaflet` library.

## Theory

Leaflet Geoman provides advanced geospatial editing capabilities for Leaflet-based maps. It allows users to draw, edit, and customize various shapes on the map. Integrating Leaflet Geoman with NextGIS Web services through the @nextgis/ngw-leaflet library can greatly enhance the interactive capabilities of web mapping applications.

This example illustrates how to set up Leaflet Geoman on a map created using @nextgis/ngw-leaflet. The integration facilitates both the use of Leaflet's mapping functionalities and NextGIS Web's advanced features, offering a robust platform for building sophisticated GIS applications.

## Practice

- Learn how to integrate Leaflet Geoman with a Leaflet map.
- Explore the drawing and editing tools provided by Leaflet Geoman on the map.
- Understand the synergy between Leaflet, Leaflet Geoman, and NextGIS Web services.

The code example for this tutorial:

```js
import NgwMap from "@nextgis/ngw-leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

const bounds = [-58.39, -34.6, -58.36, -34.61];
NgwMap.create({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  osm: true,
  bounds,
}).then((ngwMap) => {
  ngwMap.mapAdapter.map.pm.addControls({
    position: "topleft",
    drawCircle: false,
  });
});
```

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/E_leaflet_geoman) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
