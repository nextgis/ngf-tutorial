# 2.2. Setup map. QMS and OSM

## Theory

How often do you have to add a baselayer from third-party vendors when creating a map? Rarely? Often? Always? In any case, we have simplified this task to just a few configuration lines.

When initializing the map, you can specify the option:

```javascript
NgwMap.create({
  osm: true,
});
```

or:

```javascript
NgwMap.create({
  qmsId: 448,
});
```

Or when the map already exists, you can use methods to add baselayer:

```javascript
ngwMap.addBaseLayer("QMS", { qmsId: 448 });
ngwMap.addBaseLayer("OSM");
```

## Practice

Go to the website [https://qms.nextgis.com](https://qms.nextgis.com) to find a suitable service, get its ID and insert it into the `qmsId` parameter.

Try running the example with different parameters and see what changes.

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_2_setup_map_qms_and_osm) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
