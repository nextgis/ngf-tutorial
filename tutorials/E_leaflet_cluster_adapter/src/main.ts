import "leaflet";
// @ts-ignore
import { MarkerClusterGroup } from "leaflet.markercluster";

import NgwMap from "@nextgis/ngw-leaflet";
import { createGeoJsonAdapter } from "@nextgis/ngw-kit";

import type {
  VectorLayerAdapter,
  GeoJsonAdapterOptions,
} from "@nextgis/webmap";
import type { Type } from "@nextgis/utils";

import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

NgwMap.create({
  baseUrl: "https://demo.nextgis.com",
  target: "map",
  osm: true,
}).then((ngwMap) => {
  const DefaultGeojsonAdapter = ngwMap.mapAdapter.layerAdapters
    .GEOJSON as Type<VectorLayerAdapter>;

  class ClusterAdapter extends DefaultGeojsonAdapter {
    // https://github.com/nextgis/nextgis_frontend/blob/969d0a366e331d52737ac5fa50d28b6d5423c3a5/packages/leaflet-map-adapter/src/layer-adapters/GeoJsonAdapter/GeoJsonAdapter.ts#L71
    addLayer(options: GeoJsonAdapterOptions) {
      Object.assign(this.options, options);
      this.layer = new MarkerClusterGroup();
      return this.layer;
    }
  }

  ngwMap.connector.getResourceOrFail(3982).then((item) => {
    ngwMap.addGeoJsonLayer(
      {
        fit: true,
        paint: {
          color: "red",
          stroke: true,
          strokeColor: "white",
          radius: 4,
          fillOpacity: 1,
        },
      },
      createGeoJsonAdapter({
        webMap: ngwMap,
        connector: ngwMap.connector,
        item,
        layerOptions: { resource: 3982 },
        Adapter: ClusterAdapter,
      }),
    );
  });
});
