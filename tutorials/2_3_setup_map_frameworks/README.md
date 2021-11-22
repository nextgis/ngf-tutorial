# 2.3. Setup map. Frameworks

The super power of the NGF is to provide a common interface for different map and layer adapters. This means that the same code will work with different frameworks (such as `openlayers`, `leaflet`, `mapbox-gl-js`). And it's really cool!

## Theory

You probably won't have a real need to run the same code with multiple adapters in the one project at the same time. The very ability to do this is important. Although, from personal experience, there have been cases when in the middle of a project it was necessary to change the structure of the map due to rethinking tasks.

## Practice

Install one of these libraries in your project and you are ready to create interactive maps

```bash
npm i -S @nextgis/ngw-leaflet
npm i -S @nextgis/ngw-ol
npm i -S @nextgis/ngw-mapbox
```

Import NgwMap from each of these three libraries and see how the webapp changes

```javascript
import NgwMap from "@nextgis/ngw-leaflet";
```

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

And then open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_3_setup_map_frameworks) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
