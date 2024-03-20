# 2.4. Setup map. Map adapters

## Theory

From simple to complex. Design your web map for specific tasks from components.

While NgwMap has ready-made builds and is ready to work with NextGIS services, you can choose only what you need yourself using the `@nextgis/webmap` library.

```javascript
import { createWebMap } from "@nextgis/webmap";

import MapAdapter from "@nextgis/leaflet-map-adapter";
import "leaflet/dist/leaflet.css";

createWebMap({
  target: "map",
  mapAdapter: new MapAdapter(),
  center: [13, 56],
  zoom: 6,
}).then((webmap) => {
  webmap.addBaseLayer('OSM');
});
```

## Practice

See how you can manually register the map adapter and configure the controls.

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_4_setup_map_map_adapters) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
