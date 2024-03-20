const NgwConnector = require("@nextgis/ngw-connector");

// Key name for the vector layer to be created or modified
const vectorLayerKeyName = "add-feature-example-layer";

// Base URL for the NextGIS Web instance
const baseUrl = "https://sandbox.nextgis.com";

// Creating an instance of the NGW Connector with authentication details
const connector = new NgwConnector({
  baseUrl,
  auth: {
    login: "administrator",
    password: "demodemo",
  },
});

// Retrieve or create a vector layer resource and populate it with random points
connector
  .getResource(vectorLayerKeyName)
  .then((res) => {
    if (!res) {
      // If the resource does not exist, create it
      createVectorResource().then((newRes) => {
        // Once created, fill it with random features
        fillFeatures(newRes.id).then(() => {
          // Handle the success scenario
          handleSuccess(newRes.id);
        });
      });
    } else {
      // If the resource exists, fill it with random features
      fillFeatures(res.resource.id).then(() => {
        handleSuccess(res.resource.id);
      });
    }
  })
  .catch((er) => {
    handleError(er);
  });

// Function to create a new vector layer resource
function createVectorResource() {
  return connector.post("resource.collection", {
    data: {
      resource: {
        cls: "vector_layer",
        parent: {
          id: 0, // Parent ID, 0 for the root
        },
        display_name: "Add features example layer",
        keyname: vectorLayerKeyName,
        description: null,
      },
      resmeta: {
        items: {},
      },
      vector_layer: {
        srs: { id: 4326 },
        geometry_type: "POINT",
        fields: [],
      },
    },
  });
}

// Function to add a maximum of 5 random points to a vector layer
function fillFeatures(id) {
  return connector
    .get("feature_layer.feature.count", null, { id: id })
    .then(function (resp) {
      const count = resp.total_count;
      const promises = [];
      for (var i = count; i < 5; i++) {
        promises.push(addFeaturePromise(id));
      }
      return Promise.all(promises);
    });
}

// Function to create a promise for adding a single random point feature
function addFeaturePromise(resourceId) {
  return connector.post(
    "feature_layer.feature.collection",
    {
      data: {
        extensions: {},
        fields: {},
        geom: "POINT (" + getRandomPointCoord().join(" ") + ")",
      },
    },
    {
      id: resourceId,
      srs: 4326,
    },
  );
}

function getRandomPointCoord() {
  const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  return [
    Math.round(Math.random() * 180),
    Math.round(Math.random() * 90 * plusOrMinus),
  ];
}

function handleSuccess(resourceId) {
  console.log(`Find resource here: ${baseUrl}/resource/${resourceId}`);
}

function handleError(er) {
  console.error(er);
}
