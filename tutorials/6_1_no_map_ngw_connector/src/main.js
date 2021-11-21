const NgwConnector  = require("@nextgis/ngw-connector");

const vectorLayerKeyName = "add-feature-example-layer";

const baseUrl = "https://sandbox.nextgis.com";

const connector = new NgwConnector({
  baseUrl,
  auth: {
    login: "administrator",
    password: "demodemo",
  },
});

// получаем или создаем ресурс с которым будем работать
// и заполняем случайными точечными данными
connector
  .getResource(vectorLayerKeyName)
  .then((res) => {
    if (!res) {
      createVectorResource().then((newRes) => {
        fillFeatures(newRes.id).then(() => {
          handleSuccess(newRes.id);
        });
      });
    } else {
      fillFeatures(res.resource.id).then(() => {
        handleSuccess(res.resource.id);
      });
    }
  })
  .catch((er) => {
    handleError(er);
  });

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
        srs: { id: 4326 },
        geometry_type: "POINT",
        fields: [],
      },
    },
  });
}

// Заполняем только пустой слой. Добавляем не больше 5 точек
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
      // Не используем geojson только из-за того что WKT проще записать для точки
      // geom_format:"geojson"
    }
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
  console.log(`Fine resource here: ${baseUrl}/resource/${resourceId}`)
}

function handleError(er) {
  console.error(er);
}
