# 4.1. No map. NgwKit

## Theory

The [@nextgis/new-kit](https://github.com/nextgis/nextgis_frontend/tree/master/packages/ngw-kit) library provides a set of utilities to simplify interaction with the vector layers data of NGW. In addition, it provides a set of tools for implementing various complex mechanics that require a sequence of more than one query or translate data into a convenient format.

[Documentation](https://code-api.nextgis.com/modules/ngw_kit.html)

To work with this library, you will need the [@nextgis/new-connector](https://github.com/nextgis/nextgis_frontend/tree/master/packages/new-connector) library.

```javascript
import NgwConnector from "@nextgis/ngw-connector";
import { fetchNgwLayerItems } from "@nextgis/ngw-kit";

const connector = new NgwConnector({ baseUrl });

fetchNgwLayerItems({
  connector,
  resourceId,
  // it is good practice to only ask for fields that will be used
  fields: ["NAME"],
  geom: false,
  filters: [["NAME", "eq", "Subway"]],
  limit: 10,
  cache: true,
});
```

### More examples

- [featch-ngw-layer-items](https://code.nextgis.com/ngw-kit-examples-featch-ngw-layer-items)

## Practice

- take a good look at the functions available in this library. Most likely, if you need something when developing your application, it is already here;
- practice with the vector layer filter;
- find a way to upload data immediately in GeoJSON format;
- 🤓 rewrite the example so that data from resource 1733 is loaded in parallel with several requests at once.

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

Look for the script output in the terminal.

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/6_2_no_map_ngw_kit) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
