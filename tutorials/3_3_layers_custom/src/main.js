import NgwMap from "@nextgis/ngw-leaflet";
import { fetchNgwLayerFeatures, fetchNgwLayerExtent } from "@nextgis/ngw-kit";

const resourceId = 1733;

const createCustomAdapter = (ngwMap) => {
  // Defining a custom adapter class extending the default GEOJSON adapter
  return class CustomAdapter extends ngwMap.mapAdapter.layerAdapters.GEOJSON {
    addLayer(options) {
      const { resourceId, ...opt } = options;

      // Method to update layer data with features from NGW
      this.updateLayerData = () => {
        const intersects = ngwMap.getBounds();
        this.clearLayer();
        return fetchNgwLayerFeatures({
          resourceId,
          connector: ngwMap.connector,
          intersects,
          limit: 30,
        }).then((geojson) => {
          console.log("Added features: " + geojson.length);
          this.setData(geojson); // Set the fetched data as layer data
        });
      };
      ngwMap.emitter.on("moveend", this.updateLayerData); // Update data on map move
      return super.addLayer(opt);
    }

    // Cleanup before removing the layer
    beforeRemove() {
      ngwMap.emitter.off("moveend", this.updateLayerData);
    }
  };
};

// Creating a NGW map and adding a layer with the custom adapter
NgwMap.create({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  osm: true,
}).then((ngwMap) => {
  fetchNgwLayerExtent({
    connector: ngwMap.connector,
    resourceId,
  }).then((e) => {
    // Manual buffer for extent
    maxBounds = [e[0] - 1, e[1] - 1, e[2] + 1, e[3] + 1];
    ngwMap.setView({
      bounds: e,
      minZoom: 9,
      maxBounds,
    });
    ngwMap.addLayer(createCustomAdapter(ngwMap), { resourceId });
  });
});
