import NgwMap from "@nextgis/ngw-leaflet";

const id = "cafe";

const ngwMap = new NgwMap({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  osm: true,
  resources: [{ resource: 6246, fit: true, id }],
});

const onMapEvent = (ev) => {
  console.log("map event", ev);
};

const toggleEventsControl = ngwMap.createToggleControl({
  html: "E",
  title: { on: "Stop event listener", off: "Start even listener" },
  addClassOn: 'toggle-on',
  onClick: (status) => {
    if (status) {
      // All events https://code-api.nextgis.com/interfaces/ngw_map.WebMapEvents.html
      ngwMap.emitter.on("moveend", onMapEvent);
    } else {
      ngwMap.emitter.off("moveend", onMapEvent);
    }
  },
});

ngwMap.addControl(toggleEventsControl, "top-left");

ngwMap.emitter.on("layer:toggle", (ev) => {
  if (ev.id === id) {
    console.log("layer:toggle", ev);
  }
});

ngwMap.emitter.on("layer-" + id + ":toggle", (ev) => {
  console.log("layer-" + id + ":toggle", ev);
});
