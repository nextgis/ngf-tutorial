import "leaflet";
// @ts-ignore
import { MarkerClusterGroup } from "leaflet.markercluster";

import NgwMap from "@nextgis/ngw-leaflet";
import {
  createGeoJsonAdapter,
  fetchNgwLayerFeatureCollection,
  fetchNgwExtent,
} from "@nextgis/ngw-kit";

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
      if (options.data && this.addData) {
        this.addData(options.data);
      }
      return this.layer;
    }
  }

  // // Method 1 - Creating a layer with pre-fetched data
  fetchNgwLayerFeatureCollection({
    connector: ngwMap.connector,
    resourceId: 6074,
  }).then((data) => {
    ngwMap.addGeoJsonLayer(
      {
        data,
        fit: true,
        paint: {
          color: "red",
          stroke: true,
          strokeColor: "white",
          radius: 4,
          fillOpacity: 1,
        },
      },
      ClusterAdapter,
    );
  });

  // Method 2 - Add data to the existing layer
  // fetchNgwExtent({ connector: ngwMap.connector, resourceId: 6074 }).then(
  //   (extent) => {
  //     extent && ngwMap.fitBounds(extent);
  //     fetchNgwLayerFeatureCollection({
  //       connector: ngwMap.connector,
  //       resourceId: 6074,
  //     }).then((data) => {
  //       ngwMap
  //         .addGeoJsonLayer(
  //           {
  //             id: "mylayer",
  //             paint: {
  //               color: "red",
  //               stroke: true,
  //               strokeColor: "white",
  //               radius: 4,
  //               fillOpacity: 1,
  //             },
  //           },
  //           ClusterAdapter,
  //         )
  //         .then(() => {
  //           ngwMap.addLayerData("mylayer", data);
  //         });
  //     });
  //   },
  // );

  // Method 3 - Creating a layer based on data from an NGW vector layer
  // ngwMap.connector.getResourceOrFail(6074).then((item) => {
  //   ngwMap.addGeoJsonLayer(
  //     {
  //       fit: true,
  //       paint: {
  //         color: "red",
  //         stroke: true,
  //         strokeColor: "white",
  //         radius: 4,
  //         fillOpacity: 1,
  //       },
  //     },
  //     createGeoJsonAdapter({
  //       webMap: ngwMap,
  //       connector: ngwMap.connector,
  //       item,
  //       layerOptions: { resource: 6074 },
  //       Adapter: ClusterAdapter,
  //     }),
  //   );
  // });
});
