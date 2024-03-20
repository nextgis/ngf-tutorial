# 2.5. Setup map. Starter kit

## Theory

Another level of customization of your web map.

Starter kits allow you to integrate various functionality and settings into the operation of web maps. It is a counterbalance to inheritance.

```javascript
import { createWebMap } from "@nextgis/webmap";

import MapAdapter from "@nextgis/leaflet-map-adapter";
import "leaflet/dist/leaflet.css";

import { QmsKit } from "@nextgis/qms-kit";
import { NgwKit, createNgwLayerAdapter } from "@nextgis/ngw-kit";

createWebMap({
  target: "map",
  mapAdapter: new MapAdapter(),
  zoom: 8,
  center: [-34.6, -58.48],
  starterKits: [
    new NgwKit({
      connector,
      // baseUrl: "https://demo.nextgis.com",
    }),
    new QmsKit(),
  ],
}).then((webmap) => {
  webmap.addLayer("WEBMAP", { resourceId: 6246, fit: true, useBasemap: false });
  webmap.addBaseLayer("QMS", { qmsId: 529 });

});
```

## Practice

Take a look at the new abilities of the web map after adding starter kits.

You can use ready-made or add your own starter kits [StarterKit](https://code-api.nextgis.com/interfaces/ngw_map.StarterKit.html)

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_5_setup_map_starter_kit) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
