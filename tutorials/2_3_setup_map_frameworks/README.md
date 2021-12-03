# 2.3. Setup map. Frameworks

## Theory

The super power of the NGF is to provide a common interface for different map and layer adapters. The same code will work with different mapping frameworks (such as `openlayers`, `leaflet`, `mapbox-gl-js`). And it's really cool!

Though you won't probably have to run the same code with multiple adapters in the one project at the same time, the ability to do this we believe is important. At the same tim there have been cases in our experience when it was necessary to change frameworks in the middle of a project.

## Practice

Install one of these libraries in your project and you are ready to create interactive maps:

```bash
npm i -S @nextgis/ngw-leaflet
npm i -S @nextgis/ngw-ol
npm i -S @nextgis/ngw-mapbox
```

Import NgwMap from each of these three libraries and see how the webapp changes:

```javascript
import NgwMap from "@nextgis/ngw-leaflet";
```

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_3_setup_map_frameworks) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
