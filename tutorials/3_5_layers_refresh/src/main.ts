import NgwMap from "@nextgis/ngw-leaflet";

import type NgwConnector from "@nextgis/ngw-connector";

const vectorLayerKeyName = "add-feature-example-layer";
const baseUrl = "https://sandbox.nextgis.com";

const ngwMap = new NgwMap({
  baseUrl,
  auth: {
    login: "administrator",
    password: "demodemo",
  },
  target: "map",
  osm: true,
});

ngwMap.onLoad().then(async () => {
  ngwMap.setCursor("pointer");
  const connector = ngwMap.connector;

  // Get the resource ID of the vector layer or create a new one if it doesn't exist
  let resourceId = await getOrCreateResource(connector, vectorLayerKeyName);

  // Get the style ID for the layer or create a default style if none exists
  let styleId = await getOrCreateStyle(connector, resourceId);

  // Add the map layer with the obtained style
  setupMap(styleId);

  // Function to create a new vector resource
  function createVectorResource() {
    return connector.post("resource.collection", {
      data: {
        resource: {
          cls: "vector_layer",
          parent: {
            id: 0,
          },
          display_name: "Add features example layer",
          keyname: vectorLayerKeyName,
          description: null,
        },
        resmeta: {
          items: {},
        },
        vector_layer: {
          srs: { id: 3857 },
          geometry_type: "POINT",
          fields: [],
        },
      },
    });
  }

  // Function to add a feature to the vector layer
  function addFeature(coord: number[]) {
    return connector.post(
      "feature_layer.feature.collection",
      {
        data: {
          extensions: {},
          fields: {},
          geom: "POINT (" + coord.join(" ") + ")",
        },
      },
      {
        id: resourceId,
        srs: 4326,
        // WKT is simpler to write for a point in this case than geojson
        // geom_format:"geojson"
      },
    );
  }

  function setupMap(resource: number) {
    // Add a map layer
    ngwMap.addNgwLayer({
      id: vectorLayerKeyName,
      resource: resource,
      adapter: "TILE",
    });

    // Create an information control
    const toggleHeatMapControl = ngwMap.createControl(
      {
        onAdd() {
          const element = document.createElement("div");
          element.innerHTML = `<p>Click on the map to write new point in the <a style="display: inline" href="${baseUrl}/resource/${resourceId}" target="_blank">${resourceId}</a> layer</p>`;
          return element;
        },
        onRemove() {
          // Define any cleanup actions here
        },
      },
      { bar: true },
    );

    // Add the control to the map
    ngwMap.addControl(toggleHeatMapControl, "top-right");

    // Listener for map clicks to add new features
    ngwMap.emitter.on("click", (e) => {
      addFeature(e.lngLat).then(() => {
        ngwMap.updateLayer(vectorLayerKeyName);
      });
    });
  }

  // Helper function to get or create a resource
  async function getOrCreateResource(connector: NgwConnector, keyName: string) {
    let res = await connector.getResource(keyName);
    if (!res) {
      const newRes = await createVectorResource();
      return newRes.id;
    } else {
      return res.resource.id;
    }
  }

  // Helper function to get or create a style for the resource
  async function getOrCreateStyle(connector: NgwConnector, resourceId: number) {
    const children = await connector.getResourceChildren(resourceId);
    if (children.length) {
      return children[0].resource.id;
    } else {
      const style = await connector.post("resource.collection", {
        data: {
          resource: {
            cls: "qgis_vector_style",
            parent: { id: resourceId },
            display_name: "Default style",
          },
        },
      });
      return style.id;
    }
  }
});
