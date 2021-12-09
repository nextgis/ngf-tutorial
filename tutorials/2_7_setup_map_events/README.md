# 2.7. Setup map. Events

## Theory

Every time something happens in NgwMap, e.g. user clicks or map zoom changes, the corresponding object sends an event which you can subscribe to with a function. It allows to react to user interaction.

Subscribe to all events via a special property:

```javascript
ngwMap.emitter.on("moveend", onMapEvent);
```

Each object has its own set of events — see [documentation](https://code-api.nextgis.com/interfaces/ngw_map.WebMapEvents.html) for details.

There are several ways to subscribe to layer events:

global:

```javascript
ngwMap.emitter.on("layer:toggle", (ev) => {
  if (ev.id === id) {
    console.log("layer:toggle", ev);
  }
});
```

or separately for each layer:

```javascript
ngwMap.emitter.on("layer-" + id + ":toggle", (ev) => {
  console.log("layer-" + id + ":toggle", ev);
});
```

### More examples

- [events](https://code.nextgis.com/demo-examples-events)

## Practice

- subscribe to different events using the `on` and `once` methods;
- learn to unsubscribe from events with `off` (this is very important).

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/2_7_setup_map_events) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
