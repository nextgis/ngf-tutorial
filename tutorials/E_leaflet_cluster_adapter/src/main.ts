import * as L from "leaflet";
// @ts-ignore
import { MarkerClusterGroup } from "leaflet.markercluster";

import { getCoordinates } from "@nextgis/utils";
import NgwMap from "@nextgis/ngw-leaflet";
import { fetchNgwLayerFeatureCollection } from "@nextgis/ngw-kit";

import type {
  VectorLayerAdapter,
  GeoJsonAdapterOptions,
} from "@nextgis/webmap";
import type { Type } from "@nextgis/utils";

import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { FeatureCollection, GeoJsonObject } from "geojson";

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
      this.layer = new MarkerClusterGroup();
      if (options.data && this.addData) {
        this.addData(options.data);
      }
      return this.layer;
    }

    addData(geojson: GeoJsonObject): void | Promise<void> {
      for (const [lat, lng] of getCoordinates(geojson as FeatureCollection)) {
        const myIcon = L.divIcon({ className: "my-div-icon" });

        L.marker([lat, lng], { icon: myIcon }).addTo(this.layer);
      }
    }
  }

  // // Method 1 - Creating a layer with pre-fetched data
  fetchNgwLayerFeatureCollection({
    connector: ngwMap.connector,
    resourceId: 5500,
  }).then((data) => {
    ngwMap.addGeoJsonLayer(
      {
        data,
        fit: true,
      },
      ClusterAdapter,
    );
  });
});
