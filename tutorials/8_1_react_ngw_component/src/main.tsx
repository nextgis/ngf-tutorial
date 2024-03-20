import React, { useRef } from "react";
import { createRoot } from "react-dom/client";

import ReactNgwMap from "@nextgis/react-ngw-leaflet";
import {
  MapControl,
  ToggleControl,
  type MapContainerProps,
} from "@nextgis/react-ngw-map";
import { mdiTrain } from "@mdi/js";

import type { NgwMap } from "@nextgis/ngw-map";

function App() {
  const ngwMap = useRef<NgwMap>();

  const mapOptions: MapContainerProps = {
    baseUrl: "https://demo.nextgis.com",
    osm: true,
    id: "map",
    resources: [
      { resource: 6118, id: "webmap", fit: true },
      { resource: 6106, id: "railway-vector" },
    ],
    whenCreated: (n) => {
      ngwMap.current = n;
    },
  };

  const toggleLayer = (layerId: string, status: boolean) => {
    if (ngwMap.current) {
      ngwMap.current.toggleLayer(layerId, status);
    }
  };

  return (
    <ReactNgwMap {...mapOptions}>
      <ToggleControl
        html={{ on: "Hide", off: "Show" }}
        onClick={(status) => {
          toggleLayer("webmap", status);
        }}
        position={"top-right"}
        status={true}
      />
      <ToggleControl
        html={`<svg xmlns="http://www.w3.org/2000/svg" id="mdi-train" viewBox="0 0 24 24"><path d="${mdiTrain}" /></svg>`}
        addClassOff="button-turn-off"
        onClick={(status) => {
          toggleLayer("railway-vector", status);
        }}
        position={"top-right"}
        status={true}
      />
      <MapControl position="bottom-right" margin>
        <a href="https://nextgis.com" target="_blank" rel="noreferrer">
          <img src="https://nextgis.com/img/nextgis.png" alt="NextGIS" />
        </a>
      </MapControl>
    </ReactNgwMap>
  );
}

const rootNode = document.getElementById("app");
if (rootNode) {
  const root = createRoot(rootNode);
  root.render(<App />);
}
